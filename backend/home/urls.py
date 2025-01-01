from django.urls import path
from .views import (
    CourseListCreateView, 
    CourseDetailView, 
    CustomTokenObtainPairView, 
    CustomTokenRefreshView, 
    UserDetailsView, 
    GoogleLoginView, 
    FormListCreateView, 
    FormDetailView, 
    FormDownloadView, 
    FormViewerView
)

urlpatterns = [
    # Courses
    path('courses/', CourseListCreateView.as_view(), name='course-list-create'),
    path('courses/<str:courseId>/', CourseDetailView.as_view(), name='course-detail'),

    # Tokens
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),

    # User
    path('user/', UserDetailsView.as_view(), name='user_details'),
    path('auth/google/callback/', GoogleLoginView.as_view(), name='google-callback'),

    # Forms
    path('forms/', FormListCreateView.as_view(), name='form-list-create'),
    path('forms/<int:pk>/', FormDetailView.as_view(), name='form-detail'),
    path('forms/<int:pk>/download/', FormDownloadView.as_view(), name='form-download'),
    path('forms/<int:pk>/view/', FormViewerView.as_view(), name='form-view'),
]
