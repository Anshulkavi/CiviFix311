from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import update_session_auth_hash
from django.utils import timezone
from .models import User
from .serializers import (
    UserSerializer, RegisterSerializer,
    CustomTokenObtainPairSerializer, ChangePasswordSerializer
)
from .permissions import IsAdminUser, IsAdminOrDeptHead
from notifications.models import Notification


class RegisterView(generics.CreateAPIView):
    queryset           = User.objects.all()
    serializer_class   = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class   = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if not user.check_password(serializer.data['old_password']):
                return Response({'old_password': 'Wrong password.'}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(serializer.data['new_password'])
            user.save()
            update_session_auth_hash(request, user)
            return Response({'message': 'Password updated successfully.'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserListView(generics.ListAPIView):
    """Admin: list all users. Dept Head: list officers in dept."""
    serializer_class   = UserSerializer
    permission_classes = [IsAdminOrDeptHead]

    def get_queryset(self):
        user = self.request.user
        qs   = User.objects.all()
        role = self.request.query_params.get('role')
        if user.is_dept_head:
            qs = qs.filter(department=user.department)
        if role:
            qs = qs.filter(role=role)
        return qs


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class   = UserSerializer
    permission_classes = [IsAdminUser]
    queryset           = User.objects.all()


# ══════════════════════════════════════════════════════════
# APPROVAL WORKFLOW VIEWS
# ══════════════════════════════════════════════════════════

class PendingApprovalsListView(generics.ListAPIView):
    """Admin only: List all users with pending approval status."""
    serializer_class   = UserSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return User.objects.filter(
            approval_status=User.ApprovalStatus.PENDING
        ).order_by('-created_at')


class ApproveUserView(APIView):
    """Admin only: Approve a pending user."""
    permission_classes = [IsAdminUser]

    def post(self, request, pk):
        try:
            user = User.objects.get(pk=pk, approval_status=User.ApprovalStatus.PENDING)
        except User.DoesNotExist:
            return Response(
                {'error': 'User not found or not pending approval.'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Approve the user
        user.approval_status = User.ApprovalStatus.APPROVED
        user.is_active = True
        user.approved_by = request.user
        user.approved_at = timezone.now()
        user.save()

        # Create notification
        Notification.objects.create(
            recipient=user,
            type='status',
            title='Account Approved!',
            message='Congratulations! Aapka account approve ho gaya. Ab login kar sako.'
        )

        return Response({
            'message': f'{user.first_name} {user.last_name} approve ho gaya!',
            'user': UserSerializer(user).data
        })


class RejectUserView(APIView):
    """Admin only: Reject a pending user."""
    permission_classes = [IsAdminUser]

    def post(self, request, pk):
        try:
            user = User.objects.get(pk=pk, approval_status=User.ApprovalStatus.PENDING)
        except User.DoesNotExist:
            return Response(
                {'error': 'User not found or not pending approval.'},
                status=status.HTTP_404_NOT_FOUND
            )

        reason = request.data.get('reason', '')

        # Reject the user
        user.approval_status = User.ApprovalStatus.REJECTED
        user.is_active = False
        user.rejection_reason = reason
        user.save()

        # Create notification
        Notification.objects.create(
            recipient=user,
            type='status',
            title='Registration Rejected',
            message='Aapka registration reject ho gaya.'
        )

        return Response({
            'message': f'{user.first_name} {user.last_name} reject kar diya.'
        })


class ApprovalCountView(APIView):
    """Admin only: Get count of pending approvals."""
    permission_classes = [IsAdminUser]

    def get(self, request):
        count = User.objects.filter(
            approval_status=User.ApprovalStatus.PENDING
        ).count()
        return Response({'pending_count': count})


class DepartmentListView(generics.ListAPIView):
    """Public endpoint: List all departments for registration form."""
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        from complaints.models import Department
        departments = Department.objects.all().values('id', 'name')
        return Response(list(departments))
