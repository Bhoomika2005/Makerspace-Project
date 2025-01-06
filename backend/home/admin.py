from django.contrib import admin
from .models import Course , FormDocument , EquipmentsModel

# Register your model
admin.site.register(Course)
admin.site.register(FormDocument)
admin.site.register(EquipmentsModel)