from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid

# Parent model for course headers
class CourseHeader(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title

class Course(models.Model):
    courseId = models.CharField(max_length=10, unique=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    offeredBy = models.CharField(max_length=100)
    offeredTo = models.CharField(max_length=100)
    duration = models.CharField(max_length=50)
    schedule = models.CharField(max_length=100)
    course_header = models.ForeignKey(CourseHeader, on_delete=models.CASCADE, related_name="courses")
    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Auto-generate course_id if not provided
        if not self.courseId:
            self.courseId = str(uuid.uuid4())[:8]
        super().save(*args, **kwargs)


class UserSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    refresh_token = models.CharField(max_length=255, unique=True)
    access_token = models.CharField(max_length=255, unique=True)
    refresh_token_expires_at = models.DateTimeField()
    access_token_expires_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    @classmethod
    def create_tokens(cls, user):
        # Generate tokens
        access_token = str(uuid.uuid4())
        refresh_token = str(uuid.uuid4())
        
        # Set expiration times
        access_token_expires_at = timezone.now() + timezone.timedelta(hours=1)
        refresh_token_expires_at = timezone.now() + timezone.timedelta(days=90)
        
        # Create session
        session = cls.objects.create(
            user=user,
            access_token=access_token,
            refresh_token=refresh_token,
            access_token_expires_at=access_token_expires_at,
            refresh_token_expires_at=refresh_token_expires_at
        )
        
        return {
            'access_token': access_token,
            'refresh_token': refresh_token,
            'access_token_expires_at': access_token_expires_at,
            'refresh_token_expires_at': refresh_token_expires_at
        }


class FormDocument(models.Model):
    title = models.CharField(max_length=100)
    file = models.FileField(upload_to='forms/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class EquipmentsModel(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='equipment_images/', null=True, blank=True)
    quantity = models.IntegerField(blank=True)
    manufacturer = models.CharField(max_length=100, blank=True)
    model_name = models.CharField(max_length=100, blank=True)
    notes = models.TextField(blank=True)

    def _str_(self):
        return self.name

class EquipmentProduct(models.Model):
    equipment = models.ForeignKey(EquipmentsModel, related_name='products', on_delete=models.CASCADE)
    product = models.ImageField(upload_to='equipment_product/')




class Faculty(models.Model):

    CATEGORY_CHOICES = [
        ('TA', 'Teaching Assistant'),
        ('Faculty Mentors', 'Faculty Mentors'),
        ('Lab Technician', 'Lab Technician'),
        ('Administrators', 'Administrators'),
    ]
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    email = models.EmailField()
    location = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to='faculty_images/', blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='Faculty Mentors')
    year = models.IntegerField(blank=True, null=True)  # Only for TA

    def save(self, *args, **kwargs):
        if self.category != 'TA':
            self.year = None  # Ensure year is only set for TAs
        super().save(*args, **kwargs)
    def __str__(self):
        return self.name
# class Event(models.Model):
#     title = models.CharField(max_length=100)
#     event_date = models.DateField()
#     description = models.TextField()
#     image = models.ImageField(upload_to='gallery/', null=True, blank=True)

class Event(models.Model):
    title = models.CharField(max_length=100)
    event_date = models.DateField(blank=True)
    description = models.TextField(blank=True)
    

class EventImage(models.Model):
    event = models.ForeignKey(Event, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='gallery/')

class Project(models.Model):
    project_name = models.CharField(max_length=255)
    faculty_mentors = models.TextField()
    selected_students = models.TextField()  # store emails as a comma-separated string
    image = models.ImageField(upload_to='project_images/', blank=True, null=True)
    def __str__(self):
        return self.project_name