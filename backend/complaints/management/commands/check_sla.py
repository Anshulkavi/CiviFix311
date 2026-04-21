from django.core.management.base import BaseCommand
from notifications.tasks import check_sla_breaches


class Command(BaseCommand):
    help = 'Check for SLA breaches and escalate complaints'

    def handle(self, *args, **kwargs):
        count = check_sla_breaches()
        self.stdout.write(self.style.SUCCESS(f'Escalated {count} complaints.'))
