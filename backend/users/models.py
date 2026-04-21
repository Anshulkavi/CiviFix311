from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        CITIZEN       = 'citizen',       'Citizen'
        FIELD_OFFICER = 'field_officer',  'Field Officer'
        DEPT_HEAD     = 'dept_head',      'Department Head'
        ADMIN         = 'admin',          'Admin'

    class ApprovalStatus(models.TextChoices):
        ACTIVE   = 'active',   'Active'     # Citizens - instant access
        PENDING  = 'pending',  'Pending'    # Officers/Heads waiting approval
        APPROVED = 'approved', 'Approved'   # Officers/Heads approved by admin
        REJECTED = 'rejected', 'Rejected'   # Rejected by admin

    role        = models.CharField(max_length=20, choices=Role.choices, default=Role.CITIZEN)
    phone       = models.CharField(max_length=15, blank=True)
    avatar      = models.ImageField(upload_to='avatars/', blank=True, null=True)
    department  = models.ForeignKey(
        'complaints.Department', null=True, blank=True,
        on_delete=models.SET_NULL, related_name='officers'
    )
    ward        = models.CharField(max_length=100, blank=True)
    is_verified = models.BooleanField(default=False)
    created_at  = models.DateTimeField(auto_now_add=True)

    # Approval workflow fields
    approval_status = models.CharField(
        max_length=10,
        choices=ApprovalStatus.choices,
        default=ApprovalStatus.ACTIVE
    )
    rejection_reason = models.TextField(blank=True, null=True)
    approved_by = models.ForeignKey(
        'self',
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='approved_users'
    )
    approved_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'{self.username} ({self.role})'

    @property
    def is_citizen(self):       return self.role == self.Role.CITIZEN
    @property
    def is_field_officer(self): return self.role == self.Role.FIELD_OFFICER
    @property
    def is_dept_head(self):     return self.role == self.Role.DEPT_HEAD
    @property
    def is_admin(self):         return self.role == self.Role.ADMIN
