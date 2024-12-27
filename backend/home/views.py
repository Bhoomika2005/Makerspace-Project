from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Course
from .serializers import CourseSerializer

from django.conf import settings
from google.oauth2 import id_token
from google.auth.transport import requests
import requests as http_requests
from django.contrib.auth import get_user_model
from .models import UserSession
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    CustomTokenObtainPairSerializer, 
    CustomTokenRefreshSerializer,
    UserSerializer
)
from google.auth.transport.requests import Request
from django.shortcuts import redirect
from rest_framework.exceptions import AuthenticationFailed
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token

import jwt

User = get_user_model()

class CourseListView(APIView):
    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class CustomTokenRefreshView(TokenRefreshView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = CustomTokenRefreshSerializer

class UserDetailsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class GoogleLoginView(APIView):
    def post(self, request):
        code = request.data.get('code')
        # print("Received code:", code)
        
        try:
            # Exchange authorization code for tokens
            token_endpoint = 'https://oauth2.googleapis.com/token'
            data = {
                'code': code,
                'client_id': settings.GOOGLE_CLIENT_ID,
                'client_secret': settings.GOOGLE_CLIENT_SECRET,
                'redirect_uri': 'http://localhost:3000/auth/callback',
                'grant_type': 'authorization_code',
            }
            
            # print("Token request data:", data)
            response = http_requests.post(token_endpoint, data=data)
            # print("Google token response:", response.text)
            
            token_data = response.json()
            
            # Create a Request object for id_token verification
            request_object = requests.Request()
            
            # Verify the ID token
            id_info = id_token.verify_oauth2_token(
                token_data['id_token'],
                request_object,  # Use the request object here
                settings.GOOGLE_CLIENT_ID
            )
            
            # Verify email domain (for IITI restriction)
            email = id_info['email']
            if not email.endswith('@iiti.ac.in'):
                return Response(
                    {'error': 'Only IITI email addresses are allowed'},
                    status=status.HTTP_403_FORBIDDEN
                )
            
            # Get or create user
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'username': email.split('@')[0],
                    'first_name': id_info.get('given_name', ''),
                    'last_name': id_info.get('family_name', ''),
                }
            )

            print("user : ", user)
            
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            })
            
        except Exception as e:
            print("Error details:", str(e))
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )