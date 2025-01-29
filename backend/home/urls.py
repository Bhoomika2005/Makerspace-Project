from django.urls import path
from .views import *
from . import views

urlpatterns = [
    # Courses
    path("courses/", CourseHeaderListCreateView.as_view(), name="course-headers"),  # List or create CourseHeaders
    path("courses/<int:header_id>/", CoursesByHeaderView.as_view(), name="courses-by-header"),  # List courses under a specific header
    # path("courses/<int:pk>/", CourseHeaderDetailView.as_view(), name="course-header-detail"),  # Retrieve, update, or delete a specific CourseHeader
    #  path("courses/", course_headers, name="course-headers"),  # Fetch all course headers
    # path("courses/<int:header_id>/", courses_by_header, name="courses-by-header"),  # Fetch courses under a header
    # path("courses/detail/<int:pk>/", course_detail, name="course-detail"),  # Fetch single course details
    path('courses/<int:header_id>/list/', CourseListCreateView.as_view(), name='course-list-create'),
    path('courses/<int:header_id>/<int:id>/', CourseDetailView.as_view(), name='course-detail'),

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

    #machinery
    path('machinery/', EquipmentListCreateView.as_view(), name='equipment-list-create'),
    path('machinery/<int:pk>/', EquipmentDetailView.as_view(), name='equipment-detail'),
    
    #faculty
    path('faculty/', FacultyListView.as_view(), name='faculty-list'),
    path('faculty/add/', views.add_faculty, name='add_faculty'),
    path('faculty/edit/<int:pk>/', views.EditFaculty.as_view(), name='edit_faculty'),
    path('faculty/delete/<int:pk>/', views.DeleteFaculty.as_view(), name='delete_faculty'),

    #events
    path('events/', EventListCreateView.as_view(), name='event-list-create'),
    path('events/<int:pk>/', EventDetailView.as_view(), name='event-detail'),


]
