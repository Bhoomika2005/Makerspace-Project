from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid

class Course(models.Model):
    courseId = models.CharField(max_length=10, unique=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    offeredBy = models.CharField(max_length=100)
    offeredTo = models.CharField(max_length=100)
    duration = models.CharField(max_length=50)
    schedule = models.CharField(max_length=100)

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
    quantity = models.IntegerField()
    manufacturer = models.CharField(max_length=100)
    model_name = models.CharField(max_length=100)
    notes = models.TextField(blank=True)

    def __str__(self):
        return self.name

# class Event(models.Model):
#     title = models.CharField(max_length=100)
#     event_date = models.DateField()
#     description = models.TextField()
#     image = models.ImageField(upload_to='gallery/', null=True, blank=True)

class Event(models.Model):
    title = models.CharField(max_length=100)
    event_date = models.DateField()
    description = models.TextField()
    

class EventImage(models.Model):
    event = models.ForeignKey(Event, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='gallery/')