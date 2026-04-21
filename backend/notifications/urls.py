from django.urls import path
from . import views

urlpatterns = [
    path('',            views.NotificationListView.as_view(), name='notifications'),
    path('unread/',     views.UnreadCountView.as_view(),      name='unread_count'),
    path('read/',       views.MarkReadView.as_view(),         name='mark_all_read'),
    path('<int:pk>/read/', views.MarkReadView.as_view(),      name='mark_one_read'),
]
