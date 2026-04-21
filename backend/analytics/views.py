from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count, Avg, Q
from django.db.models.functions import TruncDate, TruncMonth
from django.utils import timezone
from datetime import timedelta

from complaints.models import Complaint, Department, Category
from users.permissions import IsAdminOrDeptHead


class DashboardSummaryView(APIView):
    """Overall stats for admin dashboard."""

    def get(self, request):
        user = request.user
        qs   = Complaint.objects.all()
        if user.is_dept_head:
            qs = qs.filter(department=user.department)
        elif user.is_field_officer:
            qs = qs.filter(assigned_to=user)

        total      = qs.count()
        pending    = qs.filter(status='pending').count()
        inprog     = qs.filter(status='in_progress').count()
        resolved   = qs.filter(status='resolved').count()
        closed     = qs.filter(status='closed').count()
        escalated  = qs.filter(is_escalated=True).count()

        resolved_qs = qs.filter(resolved_at__isnull=False)
        avg_resolution_hours = None
        if resolved_qs.exists():
            from django.db.models import ExpressionWrapper, DurationField, F
            durations = resolved_qs.annotate(
                duration=ExpressionWrapper(
                    F('resolved_at') - F('created_at'),
                    output_field=DurationField()
                )
            ).aggregate(avg=Avg('duration'))
            if durations['avg']:
                avg_resolution_hours = round(durations['avg'].total_seconds() / 3600, 1)

        resolution_rate = round((closed / total * 100), 1) if total > 0 else 0

        return Response({
            'total':               total,
            'pending':             pending,
            'in_progress':         inprog,
            'resolved':            resolved,
            'closed':              closed,
            'escalated':           escalated,
            'resolution_rate':     resolution_rate,
            'avg_resolution_hours': avg_resolution_hours,
        })


class ComplaintsTrendView(APIView):
    """Daily complaint count for last 30 days."""

    def get(self, request):
        days  = int(request.query_params.get('days', 30))
        since = timezone.now() - timedelta(days=days)
        qs    = Complaint.objects.filter(created_at__gte=since)
        if request.user.is_dept_head:
            qs = qs.filter(department=request.user.department)

        data = (
            qs.annotate(date=TruncDate('created_at'))
              .values('date')
              .annotate(count=Count('id'))
              .order_by('date')
        )
        return Response(list(data))


class CategoryBreakdownView(APIView):
    """Complaints count per category."""

    def get(self, request):
        qs = Complaint.objects.all()
        if request.user.is_dept_head:
            qs = qs.filter(department=request.user.department)

        data = (
            qs.values('category__name', 'category__icon')
              .annotate(count=Count('id'))
              .order_by('-count')
        )
        return Response(list(data))


class DepartmentBreakdownView(APIView):
    """Complaints per department with resolution rate."""
    permission_classes = [IsAdminOrDeptHead]

    def get(self, request):
        data = (
            Complaint.objects.values('department__name')
              .annotate(
                  total=Count('id'),
                  resolved=Count('id', filter=Q(status__in=['resolved','closed'])),
                  escalated=Count('id', filter=Q(is_escalated=True)),
              )
              .order_by('-total')
        )
        result = []
        for row in data:
            rate = round(row['resolved'] / row['total'] * 100, 1) if row['total'] else 0
            result.append({**row, 'resolution_rate': rate})
        return Response(result)


class WardHeatmapView(APIView):
    """Complaints count per ward for map heatmap."""

    def get(self, request):
        data = (
            Complaint.objects.exclude(ward='')
              .values('ward')
              .annotate(count=Count('id'))
              .order_by('-count')
        )
        return Response(list(data))


class StatusBreakdownView(APIView):
    """Pie chart: complaints by status."""

    def get(self, request):
        qs = Complaint.objects.all()
        if request.user.is_dept_head:
            qs = qs.filter(department=request.user.department)
        data = qs.values('status').annotate(count=Count('id'))
        return Response(list(data))
