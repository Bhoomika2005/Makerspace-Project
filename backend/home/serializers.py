from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import Course , FormDocument

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User 
        fields = ['id','username','first_name' , 'last_name' ,'password']


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
        """
        Create a token for the given user. This method is called automatically
        by the superclass, and here we can add custom claims to the token.
        """
        token = RefreshToken.for_user(user)
        return token

class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh_token = RefreshToken(attrs['refresh'])
        access_token = refresh_token.access_token
        user = self.context['request'].user
        print(user)
        access_token['username'] = user.username
        access_token['email'] = user.email
        access_token['id'] = user.id
        data['access'] = str(access_token)
        return data
    

class FormDocumentSerializer(serializers.ModelSerializer):
    class Meta :
        model = FormDocument
        fields = '__all__'