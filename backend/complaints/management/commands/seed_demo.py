"""Seed departments, categories, users, and sample complaints for demo (run once per DB)."""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from complaints.models import Department, Category, Complaint

User = get_user_model()


class Command(BaseCommand):
    help = 'Create default departments and complaint categories'

    def handle(self, *args, **options):
        depts = {
            'Public Works': ('Handles roads, potholes, and infrastructure', 'pwd@indore.gov.in', '0731-2501234'),
            'Water Department': ('Water supply and pipeline issues', 'water@indore.gov.in', '0731-2501235'),
            'Sanitation': ('Garbage collection and sanitation', 'sanitation@indore.gov.in', '0731-2501236'),
            'Electrical': ('Street lighting and electrical issues', 'electrical@indore.gov.in', '0731-2501237'),
            'Drainage': ('Drainage and sewage issues', 'drainage@indore.gov.in', '0731-2501238'),
            'Horticulture': ('Parks, gardens, and green spaces', 'horticulture@indore.gov.in', '0731-2501239'),
            'Anti-Encroachment': ('Encroachment removal', 'encroachment@indore.gov.in', '0731-2501240'),
            'Traffic': ('Traffic signals and management', 'traffic@indore.gov.in', '0731-2501241'),
        }
        for name, (desc, email, phone) in depts.items():
            _, created = Department.objects.get_or_create(
                name=name, defaults={'description': desc, 'email': email, 'phone': phone}
            )
            self.stdout.write(f'{"+" if created else " "} {name}')

        cats = [
            ('Roads & Potholes', 'Public Works', 'road'),
            ('Water Supply', 'Water Department', 'water_drop'),
            ('Garbage & Sanitation', 'Sanitation', 'delete'),
            ('Street Lighting', 'Electrical', 'lightbulb'),
            ('Drainage Issue', 'Drainage', 'water'),
            ('Parks & Gardens', 'Horticulture', 'park'),
            ('Encroachment', 'Anti-Encroachment', 'fence'),
            ('Traffic & Signals', 'Traffic', 'traffic'),
        ]
        for cname, dname, icon in cats:
            dept = Department.objects.get(name=dname)
            _, created = Category.objects.get_or_create(
                name=cname,
                defaults={'department': dept, 'icon': icon, 'description': f'{cname} related complaints'},
            )
            self.stdout.write(f'{"+" if created else " "} category: {cname}')

        # Create demo users
        self.stdout.write('\n--- Creating Demo Users ---')
        users_data = [
            {'username': 'admin', 'password': 'admin123', 'first_name': 'Admin', 'last_name': 'User',
             'email': 'admin@civicfix.com', 'role': User.Role.ADMIN, 'approval_status': User.ApprovalStatus.ACTIVE,
             'is_active': True, 'is_staff': True, 'is_superuser': True},

            {'username': 'officer1', 'password': 'test1234', 'first_name': 'Rahul', 'last_name': 'Sharma',
             'email': 'officer1@civicfix.com', 'role': User.Role.FIELD_OFFICER, 'department_name': 'Public Works',
             'approval_status': User.ApprovalStatus.APPROVED, 'is_active': True, 'phone': '9876543210'},

            {'username': 'officer2', 'password': 'test1234', 'first_name': 'Amit', 'last_name': 'Kumar',
             'email': 'officer2@civicfix.com', 'role': User.Role.FIELD_OFFICER, 'department_name': 'Water Department',
             'approval_status': User.ApprovalStatus.APPROVED, 'is_active': True, 'phone': '9876543211'},

            {'username': 'depthead1', 'password': 'test1234', 'first_name': 'Priya', 'last_name': 'Verma',
             'email': 'depthead1@civicfix.com', 'role': User.Role.DEPT_HEAD, 'department_name': 'Sanitation',
             'approval_status': User.ApprovalStatus.APPROVED, 'is_active': True, 'phone': '9876543212'},

            {'username': 'citizen1', 'password': 'test1234', 'first_name': 'Raj', 'last_name': 'Patel',
             'email': 'citizen1@civicfix.com', 'role': User.Role.CITIZEN,
             'approval_status': User.ApprovalStatus.ACTIVE, 'is_active': True, 'phone': '9876543213'},

            {'username': 'citizen2', 'password': 'test1234', 'first_name': 'Sita', 'last_name': 'Singh',
             'email': 'citizen2@civicfix.com', 'role': User.Role.CITIZEN,
             'approval_status': User.ApprovalStatus.ACTIVE, 'is_active': True, 'phone': '9876543214'},

            {'username': 'pending1', 'password': 'test1234', 'first_name': 'Vikram', 'last_name': 'Joshi',
             'email': 'pending1@civicfix.com', 'role': User.Role.FIELD_OFFICER, 'department_name': 'Electrical',
             'approval_status': User.ApprovalStatus.PENDING, 'is_active': False, 'phone': '9876543215'},
        ]

        for user_data in users_data:
            username = user_data['username']
            if User.objects.filter(username=username).exists():
                self.stdout.write(f'  {username} already exists')
                continue

            dept_name = user_data.pop('department_name', None)
            password = user_data.pop('password')

            if dept_name:
                user_data['department'] = Department.objects.get(name=dept_name)

            user = User.objects.create_user(password=password, **user_data)
            self.stdout.write(f'+ {username} ({user.role})')

        # Create sample complaints
        self.stdout.write('\n--- Creating Sample Complaints ---')
        complaints_data = [
            {'title': 'Pothole on MG Road', 'description': 'Large pothole near High Court junction causing traffic issues.',
             'category': 'Roads & Potholes', 'status': 'pending', 'priority': 'high',
             'address': 'MG Road, Near High Court, Indore', 'ward': '14', 'assigned_to': 'officer1'},

            {'title': 'Water leakage in Vijay Nagar', 'description': 'Continuous water leakage from main pipeline.',
             'category': 'Water Supply', 'status': 'in_progress', 'priority': 'urgent',
             'address': 'Vijay Nagar, Sector B, Indore', 'ward': '22', 'assigned_to': 'officer2'},

            {'title': 'Garbage not collected for 3 days', 'description': 'Garbage piling up near residential area.',
             'category': 'Garbage & Sanitation', 'status': 'pending', 'priority': 'medium',
             'address': 'Rau, Ward 45, Indore', 'ward': '45'},

            {'title': 'Street light not working', 'description': 'Street light pole damaged after storm.',
             'category': 'Street Lighting', 'status': 'in_progress', 'priority': 'medium',
             'address': 'Scheme No. 78, Indore', 'ward': '33', 'assigned_to': 'officer1'},

            {'title': 'Drainage overflow', 'description': 'Drainage water overflowing on main road.',
             'category': 'Drainage Issue', 'status': 'resolved', 'priority': 'high',
             'address': 'AB Road, Near Treasure Island, Indore', 'ward': '18', 'assigned_to': 'officer1'},

            {'title': 'Park maintenance needed', 'description': 'Park equipment broken and grass overgrown.',
             'category': 'Parks & Gardens', 'status': 'pending', 'priority': 'low',
             'address': 'Central Park, Scheme 94, Indore', 'ward': '55'},

            {'title': 'Illegal encroachment on footpath', 'description': 'Vendors blocking entire footpath.',
             'category': 'Encroachment', 'status': 'in_progress', 'priority': 'medium',
             'address': 'Sarafa Bazaar, Indore', 'ward': '8'},

            {'title': 'Traffic signal malfunction', 'description': 'Traffic light stuck on red causing congestion.',
             'category': 'Traffic & Signals', 'status': 'resolved', 'priority': 'urgent',
             'address': 'RNT Marg, Indore', 'ward': '12', 'assigned_to': 'officer1'},

            {'title': 'Broken road tiles', 'description': 'Footpath tiles broken and dangerous.',
             'category': 'Roads & Potholes', 'status': 'closed', 'priority': 'low',
             'address': 'Palasia Square, Indore', 'ward': '25', 'assigned_to': 'officer1'},

            {'title': 'SLA breached complaint', 'description': 'Old complaint not resolved for weeks.',
             'category': 'Water Supply', 'status': 'escalated', 'priority': 'urgent',
             'address': 'Old Palasia, Indore', 'ward': '19', 'assigned_to': 'officer2'},
        ]

        citizen = User.objects.filter(role=User.Role.CITIZEN).first()
        if citizen:
            for comp_data in complaints_data:
                category_name = comp_data.pop('category')
                assigned_to_username = comp_data.pop('assigned_to', None)

                category = Category.objects.filter(name=category_name).first()
                if not category:
                    continue

                comp_data['category'] = category
                comp_data['department'] = category.department
                comp_data['citizen'] = citizen

                if assigned_to_username:
                    assigned_user = User.objects.filter(username=assigned_to_username).first()
                    if assigned_user:
                        comp_data['assigned_to'] = assigned_user

                complaint, created = Complaint.objects.get_or_create(
                    title=comp_data['title'],
                    defaults=comp_data
                )
                if created:
                    self.stdout.write(f'+ {complaint.complaint_id}: {complaint.title}')

        self.stdout.write(self.style.SUCCESS('\nDone! Demo data seeded successfully.'))
