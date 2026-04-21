import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'civicfix.settings')
django.setup()

from complaints.models import Department, Category

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
    d, created = Department.objects.get_or_create(name=name, defaults={'description': desc, 'email': email, 'phone': phone})
    print(f'Department: {name} (id={d.id}) {"CREATED" if created else "exists"}')

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
    c, created = Category.objects.get_or_create(name=cname, defaults={'department': dept, 'icon': icon, 'description': f'{cname} related complaints'})
    print(f'Category: {cname} (id={c.id}, dept={dept.id}) {"CREATED" if created else "exists"}')

print('\nDone! All departments and categories seeded.')
