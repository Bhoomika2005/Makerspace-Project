import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')  # Replace 'backend.settings' with your project settings module
django.setup()

from home.models import Faculty  # Replace 'your_app' with the app where the Faculty model is defined
# List of Teaching Assistants
tas = [
    "Avani Ravindra Wanjari", "Rajat Vishwakarma", "Tejal Ravindra Uplenchwar", "Ankit Kumar Gupta", 
    "VEMPATI RISHI", "Vardhan Santosh Bhalgat", "V Purushothaman", "Akasapu Chandrika nagavalli", 
    "Divyam Pandey", "Tejas Chaudhari", "Sameer Lakkad", "Arruri Sathwik", "Akshit Raizada", 
    "Ishita Umredkar", "Anant Sonekar", "Amara Venkata Ram Charan", "Aditya Suwalka", "Bhawna Chaudhary", 
    "GIRIDHAR A P", "Mahak Kokate", "Jugal Shah", "Gaurav", "Gouriveni Gokul", "Renu Bhagat", "Tannu", 
    "Kumari Sunita", "Vennela", "Arjun S Nair", "Soham Mondal", "Shashank Sharma", "Mihir Hemani", 
    "Khushi Rohilla", "Manvendra Tripathi"
]


# Populate the Faculty model
for name in tas:
    Faculty.objects.get_or_create(
        name=name,
        category='TA',
        year=2023  # Only for TAs
    )

print("Teaching Assistants added successfully!")