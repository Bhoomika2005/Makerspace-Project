from django.contrib import admin
from .models import Course ,CourseHeader, FormDocument , EquipmentsModel,Faculty , Event , EventImage,Project

# Register your model
admin.site.register(Course)
admin.site.register(CourseHeader)
admin.site.register(FormDocument)
admin.site.register(EquipmentsModel)
admin.site.register(Faculty)
admin.site.register(Event)
admin.site.register(EventImage)
admin.site.register(Project)
