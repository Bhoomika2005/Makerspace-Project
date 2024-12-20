from django.db import models

class Course(models.Model):
    course_id = models.CharField(max_length=10, unique=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    offered_by = models.CharField(max_length=100)
    offered_to = models.CharField(max_length=100)
    duration = models.CharField(max_length=50)
    schedule = models.CharField(max_length=100)

    def __str__(self):
        return self.title
