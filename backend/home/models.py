from django.db import models

# Create your models here.

class Equipment(models.Model):
    name = models.CharField(max_length=200)
    quantity = models.IntegerField()
    manufacturer = models.CharField(max_length=100)
    model_number = models.CharField(max_length=100)
    is_available = models.BooleanField(default=True)
    last_maintenance = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True)
    image = models.ImageField(upload_to='equipment_images/', null=True, blank=True)


    def __str__(self):
        return f"{self.name} - {self.model_number}"

    class Meta:
        ordering = ['id']