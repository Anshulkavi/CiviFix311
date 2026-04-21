from django.contrib import admin
from .models import Complaint, Category, Department, StatusHistory, Upvote


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone']
    search_fields = ['name']


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'department', 'is_active']
    list_filter  = ['department', 'is_active']


class StatusHistoryInline(admin.TabularInline):
    model       = StatusHistory
    extra       = 0
    readonly_fields = ['changed_by', 'old_status', 'new_status', 'note', 'changed_at']


@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):
    list_display  = ['complaint_id', 'title', 'status', 'priority', 'department',
                     'citizen', 'assigned_to', 'upvote_count', 'created_at']
    list_filter   = ['status', 'priority', 'department', 'is_escalated']
    search_fields = ['complaint_id', 'title', 'citizen__username']
    readonly_fields = ['complaint_id', 'created_at', 'updated_at']
    inlines       = [StatusHistoryInline]
    date_hierarchy = 'created_at'
