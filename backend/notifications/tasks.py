"""
Notification tasks — called asynchronously after status changes.
In production, use Celery. For now, runs synchronously but non-blocking in views.
"""
from django.core.mail import send_mail
from django.conf import settings


def send_status_notification(complaint_id, old_status, new_status):
    """
    Send in-app + email notification when complaint status changes.
    Called after API responds to officer (non-blocking pattern).
    """
    try:
        from complaints.models import Complaint
        from .models import Notification

        complaint = Complaint.objects.select_related('citizen', 'assigned_to').get(id=complaint_id)

        status_messages = {
            'assigned':    ('Complaint Assigned',         f'Your complaint {complaint.complaint_id} has been assigned to an officer.'),
            'in_progress': ('Complaint In Progress',      f'Work has started on your complaint {complaint.complaint_id}.'),
            'resolved':    ('Complaint Resolved',         f'Your complaint {complaint.complaint_id} has been resolved. Please confirm.'),
            'closed':      ('Complaint Closed',           f'Your complaint {complaint.complaint_id} is now closed. Thank you!'),
            'escalated':   ('Complaint Escalated',        f'Your complaint {complaint.complaint_id} has been escalated for urgent attention.'),
            'rejected':    ('Complaint Rejected',         f'Your complaint {complaint.complaint_id} has been rejected. Please contact support.'),
        }

        title, message = status_messages.get(
            new_status,
            ('Status Updated', f'Your complaint {complaint.complaint_id} status changed to {new_status}.')
        )

        # In-app notification for citizen
        Notification.objects.create(
            recipient    = complaint.citizen,
            complaint_id = complaint.id,
            type         = new_status if new_status in Notification.Type.values else 'status',
            title        = title,
            message      = message,
        )

        # Email to citizen
        if complaint.citizen.email:
            send_mail(
                subject      = f'[CivicFix 311] {title}',
                message      = f'Hello {complaint.citizen.get_full_name()},\n\n{message}\n\nTrack your complaint at: http://localhost:3000/complaints/{complaint.complaint_id}\n\nRegards,\nCivicFix 311 Team',
                from_email   = settings.EMAIL_HOST_USER or 'noreply@civicfix.in',
                recipient_list = [complaint.citizen.email],
                fail_silently = True,
            )

        # Notify assigned officer (if new assignment)
        if new_status == 'assigned' and complaint.assigned_to:
            Notification.objects.create(
                recipient    = complaint.assigned_to,
                complaint_id = complaint.id,
                type         = 'assigned',
                title        = 'New Complaint Assigned',
                message      = f'Complaint {complaint.complaint_id} – "{complaint.title}" has been assigned to you.',
            )

    except Exception as e:
        print(f'[Notification Error] {e}')


def check_sla_breaches():
    """
    Run periodically (e.g. via cron or Celery beat) to escalate SLA breaches.
    Call from management command: python manage.py check_sla
    """
    from django.utils import timezone
    from complaints.models import Complaint
    from .models import Notification

    breached = Complaint.objects.filter(
        sla_deadline__lt=timezone.now(),
        is_escalated=False,
        status__in=['pending', 'in_progress']
    )

    for complaint in breached:
        complaint.is_escalated = True
        complaint.escalated_at = timezone.now()
        complaint.status       = Complaint.Status.ESCALATED
        complaint.save(update_fields=['is_escalated', 'escalated_at', 'status'])

        # Notify dept head
        if complaint.department:
            from users.models import User
            dept_heads = User.objects.filter(
                role='dept_head', department=complaint.department
            )
            for head in dept_heads:
                Notification.objects.create(
                    recipient    = head,
                    complaint_id = complaint.id,
                    type         = 'escalated',
                    title        = 'SLA Breach — Complaint Escalated',
                    message      = f'Complaint {complaint.complaint_id} has breached SLA and needs immediate attention.',
                )

    return breached.count()
