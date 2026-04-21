from django.db import models
from django.conf import settings
from django.utils import timezone
from datetime import timedelta


class Department(models.Model):
    name        = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    email       = models.EmailField(blank=True)
    phone       = models.CharField(max_length=15, blank=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    name        = models.CharField(max_length=100)
    department  = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='categories')
    icon        = models.CharField(max_length=50, default='tag')  # icon name
    description = models.TextField(blank=True)
    is_active   = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = 'categories'

    def __str__(self):
        return f'{self.name} ({self.department.name})'


def complaint_id_generator():
    from datetime import date
    year  = date.today().year
    count = Complaint.objects.filter(created_at__year=year).count() + 1
    return f'CMP-{year}-{count:04d}'


class Complaint(models.Model):
    class Status(models.TextChoices):
        PENDING     = 'pending',     'Pending'
        IN_PROGRESS = 'in_progress', 'In Progress'
        RESOLVED    = 'resolved',    'Resolved'
        CLOSED      = 'closed',      'Closed'
        ESCALATED   = 'escalated',   'Escalated'
        REJECTED    = 'rejected',    'Rejected'

    class Priority(models.TextChoices):
        LOW    = 'low',    'Low'
        MEDIUM = 'medium', 'Medium'
        HIGH   = 'high',   'High'
        URGENT = 'urgent', 'Urgent'

    # Identification
    complaint_id = models.CharField(max_length=20, unique=True, editable=False)

    # Core
    title       = models.CharField(max_length=200)
    description = models.TextField()
    category    = models.ForeignKey(Category,   on_delete=models.PROTECT, related_name='complaints')
    department  = models.ForeignKey(Department, on_delete=models.PROTECT, related_name='complaints')
    status      = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    priority    = models.CharField(max_length=10, choices=Priority.choices, default=Priority.MEDIUM)

    # People
    citizen         = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                                        related_name='complaints_submitted')
    assigned_to     = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,
                                        null=True, blank=True, related_name='complaints_assigned')

    # Location
    address   = models.TextField()
    ward      = models.CharField(max_length=100, blank=True)
    latitude  = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    # Photos
    before_photo = models.ImageField(upload_to='complaints/before/', blank=True, null=True)
    after_photo  = models.ImageField(upload_to='complaints/after/',  blank=True, null=True)

    # Community
    upvote_count = models.PositiveIntegerField(default=0)

    # SLA
    sla_deadline  = models.DateTimeField(null=True, blank=True)
    is_escalated  = models.BooleanField(default=False)
    escalated_at  = models.DateTimeField(null=True, blank=True)

    # Citizen feedback
    citizen_rating   = models.PositiveSmallIntegerField(null=True, blank=True)  # 1-5
    citizen_feedback = models.TextField(blank=True)
    confirmed_at     = models.DateTimeField(null=True, blank=True)

    # Timestamps
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)
    resolved_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.complaint_id} – {self.title}'

    def save(self, *args, **kwargs):
        if not self.complaint_id:
            self.complaint_id = complaint_id_generator()
        if not self.department_id and self.category_id:
            self.department = self.category.department
        super().save(*args, **kwargs)

        # `created_at` is set by Django right before the actual DB insert, so it
        # may be None inside our overridden save method before `super().save()`.
        if not self.sla_deadline and self.created_at:
            self.sla_deadline = self.created_at + timedelta(hours=settings.SLA_HOURS)
            # Avoid full re-save of related objects; just persist SLA.
            super().save(update_fields=["sla_deadline"])

    @property
    def is_sla_breached(self):
        if self.sla_deadline and self.status not in [self.Status.RESOLVED, self.Status.CLOSED]:
            return timezone.now() > self.sla_deadline
        return False


class Upvote(models.Model):
    complaint = models.ForeignKey(Complaint, on_delete=models.CASCADE, related_name='upvotes')
    citizen   = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('complaint', 'citizen')


class StatusHistory(models.Model):
    complaint  = models.ForeignKey(Complaint, on_delete=models.CASCADE, related_name='history')
    changed_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    old_status = models.CharField(max_length=20)
    new_status = models.CharField(max_length=20)
    note       = models.TextField(blank=True)
    changed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-changed_at']
