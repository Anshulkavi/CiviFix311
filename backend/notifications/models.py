# models.py
from django.db import models
from django.conf import settings


class Notification(models.Model):
    class Type(models.TextChoices):
        COMPLAINT_SUBMITTED = 'submitted',  'Complaint Submitted'
        STATUS_UPDATED      = 'status',     'Status Updated'
        ASSIGNED            = 'assigned',   'Complaint Assigned'
        ESCALATED           = 'escalated',  'Complaint Escalated'
        RESOLVED            = 'resolved',   'Complaint Resolved'

    recipient    = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                                     related_name='notifications')
    complaint_id = models.IntegerField(null=True, blank=True)
    type         = models.CharField(max_length=20, choices=Type.choices)
    title        = models.CharField(max_length=200)
    message      = models.TextField()
    is_read      = models.BooleanField(default=False)
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
