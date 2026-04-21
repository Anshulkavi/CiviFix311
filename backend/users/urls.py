from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('register/',        views.RegisterView.as_view(),        name='register'),
    path('login/',           views.LoginView.as_view(),           name='login'),
    path('token/refresh/',   TokenRefreshView.as_view(),          name='token_refresh'),
    path('profile/',         views.ProfileView.as_view(),         name='profile'),
    path('change-password/', views.ChangePasswordView.as_view(),  name='change_password'),
    path('users/',           views.UserListView.as_view(),        name='user_list'),
    path('users/<int:pk>/',  views.UserDetailView.as_view(),      name='user_detail'),

    # Approval workflow endpoints
    path('approvals/',                   views.PendingApprovalsListView.as_view(), name='approvals_list'),
    path('approvals/<int:pk>/approve/',  views.ApproveUserView.as_view(),          name='approve_user'),
    path('approvals/<int:pk>/reject/',   views.RejectUserView.as_view(),           name='reject_user'),
    path('approvals/count/',             views.ApprovalCountView.as_view(),        name='approval_count'),

    # Departments list for registration
    path('departments/',     views.DepartmentListView.as_view(),  name='departments_list'),
]
