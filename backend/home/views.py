from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Equipment
from .serializers import EquipmentSerializer, AdminEquipmentSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdminOrReadOnly
from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser, FormParser



# Create your views here.

# @api_view(['GET'])
# def getData(request):
#     details = {'Name':'Bhoomika'}
#     return Response(details)


# class EquipmentViewSet(viewsets.ModelViewSet):
#     queryset = Equipment.objects.all()
#     permission_classes = [IsAdminOrReadOnly]
#     parser_classes = (MultiPartParser, FormParser)


#     def get_serializer_class(self):
#         if self.request.user.is_staff:
#             return AdminEquipmentSerializer
#         return EquipmentSerializer

#     def get_queryset(self):
#         queryset = Equipment.objects.all()
#         manufacturer = self.request.query_params.get('manufacturer', None)
#         if manufacturer is not None:
#             queryset = queryset.filter(manufacturer=manufacturer)
#         return queryset
    
# from rest_framework import viewsets, permissions
# from .models import Equipment
# from .serializers import EquipmentSerializer, AdminEquipmentSerializer

# class EquipmentViewSet(viewsets.ModelViewSet):
#     queryset = Equipment.objects.all()
    
#     def get_serializer_class(self):
#         if self.request.user.is_staff:
#             return AdminEquipmentSerializer
#         return EquipmentSerializer

#     def get_permissions(self):
#         if self.action in ['create', 'update', 'partial_update', 'destroy']:
#             permission_classes = [permissions.IsAdminUser]
#         else:
#             permission_classes = [permissions.AllowAny]
#         return [permission() for permission in permission_classes]


class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Equipment.objects.all()
    
    def get_serializer_class(self):
        if self.request.user.is_staff:
            return AdminEquipmentSerializer
        return EquipmentSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAdminUser]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]

