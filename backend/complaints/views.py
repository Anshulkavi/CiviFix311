from rest_framework import generics, status, permissions, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import FilterSet, CharFilter, ChoiceFilter, DateFromToRangeFilter
import django_filters

from .models import Complaint, Category, Department, Upvote, StatusHistory
from .serializers import (
    ComplaintListSerializer, ComplaintDetailSerializer,
    CategorySerializer, DepartmentSerializer,
    StatusUpdateSerializer, ConfirmResolutionSerializer,
)
from users.permissions import IsOfficerOrAbove, IsAdminOrDeptHead
from notifications.tasks import send_status_notification


class ComplaintFilter(FilterSet):
    status     = CharFilter(field_name='status')
    category   = CharFilter(field_name='category__name', lookup_expr='icontains')
    department = CharFilter(field_name='department__name', lookup_expr='icontains')
    ward       = CharFilter(field_name='ward', lookup_expr='icontains')
    priority   = CharFilter(field_name='priority')
    created_after  = django_filters.DateFilter(field_name='created_at', lookup_expr='date__gte')
    created_before = django_filters.DateFilter(field_name='created_at', lookup_expr='date__lte')

    class Meta:
        model  = Complaint
        fields = ['status', 'priority', 'ward', 'is_escalated']


class ComplaintListCreateView(generics.ListCreateAPIView):
    """
    GET  /api/complaints/   — list (filtered by role)
    POST /api/complaints/   — citizen creates complaint
    """
    parser_classes     = [MultiPartParser, FormParser, JSONParser]
    filter_backends    = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class    = ComplaintFilter
    search_fields      = ['title', 'description', 'complaint_id', 'address']
    ordering_fields    = ['created_at', 'upvote_count', 'priority']
    ordering           = ['-created_at']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ComplaintDetailSerializer
        return ComplaintListSerializer

    def get_queryset(self):
        user = self.request.user
        qs   = Complaint.objects.select_related(
            'citizen', 'assigned_to', 'category', 'department'
        ).prefetch_related('upvotes')

        if user.is_citizen:
            # Full transparency: citizens browse all open complaints (map & upvotes align with list)
            return qs
        if user.is_field_officer:
            return qs.filter(assigned_to=user)
        if user.is_dept_head:
            return qs.filter(department=user.department)
        return qs  # admin sees all


class ComplaintDetailView(generics.RetrieveUpdateAPIView):
    """GET/PATCH /api/complaints/<id>/"""
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    serializer_class = ComplaintDetailSerializer

    def get_queryset(self):
        user = self.request.user
        qs = Complaint.objects.select_related(
            'citizen', 'assigned_to', 'category', 'department'
        ).prefetch_related('history__changed_by')
        # Citizens can open any complaint (map, links); list view still filters to own.
        if user.is_citizen:
            return qs
        if user.is_field_officer:
            return qs.filter(assigned_to=user)
        if user.is_dept_head:
            return qs.filter(department=user.department)
        return qs  # admin: all

    def perform_update(self, serializer):
        obj = serializer.instance
        user = self.request.user
        if user.is_citizen and obj.citizen_id != user.id:
            raise PermissionDenied('You can only edit your own complaints.')
        serializer.save()


class StatusUpdateView(APIView):
    """PATCH /api/complaints/<id>/status/  — officer updates status"""
    permission_classes = [IsOfficerOrAbove]

    def patch(self, request, pk):
        complaint  = generics.get_object_or_404(Complaint, pk=pk)
        serializer = StatusUpdateSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        old_status = complaint.status
        new_status = serializer.validated_data['status']

        # Save history
        StatusHistory.objects.create(
            complaint  = complaint,
            changed_by = request.user,
            old_status = old_status,
            new_status = new_status,
            note       = serializer.validated_data.get('note', ''),
        )

        complaint.status = new_status
        if new_status == Complaint.Status.RESOLVED:
            complaint.resolved_at = timezone.now()
        if 'after_photo' in request.FILES:
            complaint.after_photo = request.FILES['after_photo']
        complaint.save()

        # Async notify citizen
        send_status_notification(complaint.id, old_status, new_status)

        return Response(ComplaintDetailSerializer(complaint, context={'request': request}).data)


class UpvoteView(APIView):
    """POST /api/complaints/<id>/upvote/  — citizen toggles upvote"""

    def post(self, request, pk):
        complaint = generics.get_object_or_404(Complaint, pk=pk)
        upvote, created = Upvote.objects.get_or_create(
            complaint=complaint, citizen=request.user
        )
        if not created:
            upvote.delete()
            complaint.upvote_count = max(0, complaint.upvote_count - 1)
            complaint.save(update_fields=['upvote_count'])
            return Response({
                'upvoted': False,
                'count': complaint.upvote_count,
                'upvote_count': complaint.upvote_count,
                'has_upvoted': False,
            })

        complaint.upvote_count += 1
        # Auto-escalate priority if highly upvoted
        if complaint.upvote_count >= 50 and complaint.priority == 'low':
            complaint.priority = 'medium'
        elif complaint.upvote_count >= 100 and complaint.priority == 'medium':
            complaint.priority = 'high'
        complaint.save(update_fields=['upvote_count', 'priority'])
        return Response({
            'upvoted': True,
            'count': complaint.upvote_count,
            'upvote_count': complaint.upvote_count,
            'has_upvoted': True,
        })


class ConfirmResolutionView(APIView):
    """POST /api/complaints/<id>/confirm/  — citizen confirms resolution"""

    def post(self, request, pk):
        complaint = generics.get_object_or_404(Complaint, pk=pk, citizen=request.user)

        if complaint.status != Complaint.Status.RESOLVED:
            return Response(
                {'error': 'Complaint is not in RESOLVED state.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ConfirmResolutionSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        complaint.citizen_rating   = serializer.validated_data['rating']
        complaint.citizen_feedback = serializer.validated_data.get('feedback', '')
        complaint.status           = Complaint.Status.CLOSED
        complaint.confirmed_at     = timezone.now()
        complaint.save()

        StatusHistory.objects.create(
            complaint  = complaint,
            changed_by = request.user,
            old_status = Complaint.Status.RESOLVED,
            new_status = Complaint.Status.CLOSED,
            note       = 'Citizen confirmed resolution.',
        )

        return Response({'message': 'Thank you! Complaint closed.', 'complaint_id': complaint.complaint_id})


class AssignComplaintView(APIView):
    """PATCH /api/complaints/<id>/assign/  — dept head assigns officer"""
    permission_classes = [IsAdminOrDeptHead]

    def patch(self, request, pk):
        from users.models import User
        complaint   = generics.get_object_or_404(Complaint, pk=pk)
        officer_id  = request.data.get('officer_id')
        officer     = generics.get_object_or_404(User, pk=officer_id, role='field_officer')

        complaint.assigned_to = officer
        complaint.save(update_fields=['assigned_to'])

        send_status_notification(complaint.id, complaint.status, 'assigned')
        return Response({'message': f'Assigned to {officer.get_full_name()}'})


class MapComplaintsView(generics.ListAPIView):
    """GET /api/complaints/map/ — public map pins (no auth required)"""
    serializer_class   = ComplaintListSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Complaint.objects.filter(
            latitude__isnull=False, longitude__isnull=False
        ).exclude(status='closed').only(
            'id', 'complaint_id', 'title', 'status', 'priority',
            'latitude', 'longitude', 'ward', 'upvote_count', 'before_photo'
        )


class CategoryListView(generics.ListAPIView):
    serializer_class   = CategorySerializer
    permission_classes = [permissions.AllowAny]
    queryset           = Category.objects.filter(is_active=True).select_related('department')


class DepartmentListView(generics.ListAPIView):
    serializer_class   = DepartmentSerializer
    permission_classes = [permissions.AllowAny]
    queryset           = Department.objects.all()
