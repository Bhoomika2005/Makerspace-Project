from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import *

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            'courseId',
            'title',
            'description',
            'offeredBy',
            'offeredTo',
            'duration',
            'schedule',
        ]


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
        fields = ['title', 'file', 'uploaded_at']

class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = ['name', 'image', 'quantity', 'manufacturer', 'model_number', 'notes']