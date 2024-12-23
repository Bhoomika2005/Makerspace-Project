from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import EquipmentViewSet

#from .views import EquipmentViewSet

# urlpatterns = [
#     path('',views.getData),
# ]


router = DefaultRouter()
router.register(r'equipment', views.EquipmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]