from django.urls import path
from . import views

urlpatterns = [
    path('',                            views.ComplaintListCreateView.as_view(), name='complaint_list_create'),
    path('map/',                        views.MapComplaintsView.as_view(),       name='complaint_map'),
    path('categories/',                 views.CategoryListView.as_view(),        name='category_list'),
    path('departments/',                views.DepartmentListView.as_view(),      name='department_list'),
    path('<int:pk>/',                   views.ComplaintDetailView.as_view(),     name='complaint_detail'),
    path('<int:pk>/status/',            views.StatusUpdateView.as_view(),        name='complaint_status'),
    path('<int:pk>/upvote/',            views.UpvoteView.as_view(),              name='complaint_upvote'),
    path('<int:pk>/confirm/',           views.ConfirmResolutionView.as_view(),   name='complaint_confirm'),
    path('<int:pk>/assign/',            views.AssignComplaintView.as_view(),     name='complaint_assign'),
]
