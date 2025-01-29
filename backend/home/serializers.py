from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import Course,CourseHeader, FormDocument , EquipmentsModel, Event, EventImage

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"

class CourseHeaderSerializer(serializers.ModelSerializer):
    courses = CourseSerializer(many=True, read_only=True)  # Include related courses

    class Meta:
        model = CourseHeader
        fields = ["id", "title", "description", "courses"]  # Include child courses

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
        return super().update(instance, validated_data)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        access = refresh.access_token
        access['username'] = self.user.username
        access['email'] = self.user.email
        access['id'] = self.user.id
        data['refresh'] = str(refresh)
        data['access'] = str(access)
        return data

    @classmethod
    def get_token(cls, user):
        token = RefreshToken.for_user(user)
        return token


class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh_token = RefreshToken(attrs['refresh'])
        access_token = refresh_token.access_token
        user = self.context['request'].user
        access_token['username'] = user.username
        access_token['email'] = user.email
        access_token['id'] = user.id
        data['access'] = str(access_token)
        return data


class FormDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormDocument
        # fields = ['title', 'file', 'uploaded_at']
        fields = '__all__'


class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipmentsModel
         # fields = ['name', 'image', 'quantity', 'manufacturer', 'model_name', 'notes']
        fields = '__all__'

class AdminEquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipmentsModel
        fields = '__all__'

        # fields = ['name', 'image', 'quantity', 'manufacturer', 'model_name', 'notes']

from .models import Faculty

class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = ['id', 'name', 'role', 'email', 'location', 'image']
# class EventSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Event
#         # fields = ['title', 'event_date', 'description', 'image']
#         fields = '__all__'

class EventImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventImage
        fields = ['id', 'image']

class EventSerializer(serializers.ModelSerializer):
    images = EventImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Event
        fields = '__all__'
