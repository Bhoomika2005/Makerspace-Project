from django.urls import path
from .views import *

urlpatterns = [
    path('courses/', CourseListView.as_view(), name='course-list'),
    # path('api/courses/', CourseListView.as_view(), name='course-list'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('user/', UserDetailsView.as_view(), name='user_details'),
    
    path('auth/google/callback/', GoogleLoginView.as_view(), name='google-callback'),
    path('forms/' , FormListCreateView.as_view() , name='form-list-create'),
    path('forms/<int:pk>/' , FormDetailView.as_view() , name='form-detail'),
    path('forms/<int:pk>/download/', FormDownloadView.as_view(), name='form-download'),
    path('forms/<int:pk>/view/', FormViewerView.as_view(), name='form-view'),
]
