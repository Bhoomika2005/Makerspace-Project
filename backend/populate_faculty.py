import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')  # Replace 'backend.settings' with your project settings module
django.setup()

from home.models import Faculty  # Replace 'your_app' with the app where the Faculty model is defined

# List of faculty data to add
faculty_data = [
    {"name": "Vijay A. S", "role": "Member", "email": "vijay_as@iiti.ac.in", "location": "", "image": None},
    {"name": "Sumit Gautam", "role": "Member", "email": "sumit.gautam@iiti.ac.in", "location": "", "image": None},
    {"name": "Pravarthana Dhanapal", "role": "Member", "email": "dpravarthana@iiti.ac.in", "location": "", "image": None},
    {"name": "Jayaprakash Murugesan", "role": "Member", "email": "jayaprakash@iiti.ac.in", "location": "", "image": None},
    {"name": "Eswara Prasad Korimilli", "role": "Member", "email": "eswar@iiti.ac.in", "location": "", "image": None},
    {"name": "Dr. Onkar Game", "role": "Member", "email": "ogame@iiti.ac.in", "location": "", "image": None},
    {"name": "Dr. Narendranath Patra", "role": "Member", "email": "naren@iiti.ac.in", "location": "", "image": None},
    {"name": "Dr. Gourab Sil", "role": "Member", "email": "gourabsil@iiti.ac.in", "location": "", "image": None},
    {"name": "Dr. Dan Sathiaraj", "role": "Member", "email": "dansathiaraj@iiti.ac.in", "location": "", "image": None},
    {"name": "Dr. Ayan Mondal", "role": "Member", "email": "ayanm@iiti.ac.in", "location": "", "image": None},
    {"name": "Devendra Laxmanrao Deshmukh", "role": "Member", "email": "dldeshmukh@iiti.ac.in", "location": "", "image": None},
    {"name": "Ashish Rajak", "role": "Member", "email": "a.rajak@iiti.ac.in", "location": "", "image": None},
    {"name": "Anand Petare", "role": "Member", "email": "acpetare@iiti.ac.in", "location": "", "image": None},
]

# Add faculty data to the database
for faculty in faculty_data:
    obj, created = Faculty.objects.get_or_create(
        name=faculty['name'],
        role=faculty['role'],
        email=faculty['email'],
        location="IIT INDORE",
        image=faculty['image']
    )
    if created:
        print(f"Added: {faculty['name']}")
    else:
        print(f"Skipped: {faculty['name']} (already exists)")
