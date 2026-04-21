from django.urls import path
from . import views

urlpatterns = [
    path('summary/',     views.DashboardSummaryView.as_view(),    name='analytics_summary'),
    path('trend/',       views.ComplaintsTrendView.as_view(),     name='analytics_trend'),
    path('categories/',  views.CategoryBreakdownView.as_view(),   name='analytics_categories'),
    path('departments/', views.DepartmentBreakdownView.as_view(), name='analytics_departments'),
    path('wards/',       views.WardHeatmapView.as_view(),         name='analytics_wards'),
    path('status/',      views.StatusBreakdownView.as_view(),     name='analytics_status'),
]
