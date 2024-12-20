import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')  # Replace 'backend.settings' with your project settings module
django.setup()

from django.core.management import call_command
from home.models import Course

def main():
    # Step 1: Run makemigrations
    print("Running makemigrations...")
    call_command('makemigrations', 'home')

    # Step 2: Apply migrations
    print("Applying migrations...")
    call_command('migrate')

    # Step 3: Populate the database with courses
    print("Populating the database with courses...")
    courses = [
        {
            "course_id": "IC152",
            "title": "Introduction to Computing",
            "description": "A fundamental course for first-year students.",
            "offered_by": "CSE Department",
            "offered_to": "1st Year Students",
            "duration": "4 weeks",
            "schedule": "Tuesdays and Thursdays, 2-4 PM",
        },
        {
            "course_id": "ME355",
            "title": "Advanced Manufacturing",
            "description": "A detailed course for mechanical engineering.",
            "offered_by": "Mechanical Department",
            "offered_to": "3rd Year Mechanical Students",
            "duration": "6 weeks",
            "schedule": "Mondays and Wednesdays, 3-5 PM",
        },
    ]

    for course_data in courses:
        Course.objects.get_or_create(**course_data)
    print("Database population complete!")

if __name__ == "__main__":
    main()
