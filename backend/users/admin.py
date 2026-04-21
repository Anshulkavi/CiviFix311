from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display  = ['username', 'email', 'first_name', 'last_name', 'role', 'department', 'is_active']
    list_filter   = ['role', 'is_active', 'is_verified']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering      = ['-date_joined']

    fieldsets = UserAdmin.fieldsets + (
        ('CivicFix Info', {
            'fields': ('role', 'phone', 'avatar', 'department', 'ward', 'is_verified')
        }),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ('CivicFix Info', {
            'fields': ('email', 'first_name', 'last_name', 'role', 'phone', 'department')
        }),
    )
