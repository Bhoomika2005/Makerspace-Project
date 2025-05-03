from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import (
    Course,
    CourseHeader,
    FormDocument,
    EquipmentsModel,
    UserSession,
    Event,
    EventImage,
    Project,
    EquipmentProduct,
)
from .serializers import (
    CourseSerializer,
    CourseHeaderSerializer,
    FormDocumentSerializer,
    EquipmentSerializer,
    EventSerializer,
    ProjectSerializer,
    EquipmentProductSerializer,
)

from django.conf import settings
from google.oauth2 import id_token
from google.auth.transport import requests
import requests as http_requests
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from .serializers import (
    CustomTokenObtainPairSerializer,
    CustomTokenRefreshSerializer,
    UserSerializer,
)
from google.oauth2 import id_token
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.shortcuts import get_object_or_404
import os
from django.http import FileResponse
from rest_framework import permissions

User = get_user_model()


class CourseListView(APIView):
    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["first_name"] = user.first_name
        token["last_name"] = user.last_name
        token["email"] = user.email

        return token


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
        code = request.data.get("code")
        # print("Received code:", code)

        try:
            # Exchange authorization code for tokens
            token_endpoint = "https://oauth2.googleapis.com/token"
            data = {
                "code": code,
                "client_id": settings.GOOGLE_CLIENT_ID,
                "client_secret": settings.GOOGLE_CLIENT_SECRET,
                # "redirect_uri": "http://localhost:3000/auth/callback",
                "redirect_uri": "https://makerspace.iiti.ac.in/auth/callback",
                "grant_type": "authorization_code",
            }

            # print("Token request data:", data)
            response = http_requests.post(token_endpoint, data=data)
            # print("Google token response:", response.text)

            token_data = response.json()

            # Create a Request object for id_token verification
            request_object = requests.Request()

            # Verify the ID token
            id_info = id_token.verify_oauth2_token(
                token_data["id_token"],
                request_object,  # Use the request object here
                settings.GOOGLE_CLIENT_ID,
                clock_skew_in_seconds=10,
            )

            # Verify email domain (for IITI restriction)
            email = id_info["email"]
            if not email.endswith("@iiti.ac.in"):
                return Response(
                    {"error": "Only IITI email addresses are allowed"},
                    status=status.HTTP_403_FORBIDDEN,
                )

            # Get or create user
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    "username": email.split("@")[0],
                    "first_name": id_info.get("given_name", ""),
                    "last_name": id_info.get("family_name", ""),
                },
            )

            # print("user : ", user)

            # token = Token.objects.create(user = user)
            token, created = Token.objects.get_or_create(user=user)

            # print("token : ", token)

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)

            refresh["username"] = user.username
            refresh["first_name"] = user.first_name
            refresh["last_name"] = user.last_name
            refresh["email"] = user.email

            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                    },
                }
            )

        except Exception as e:
            print("Error details:", str(e))
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


def get_content_type(file_path):
    file_name, file_extension = os.path.splitext(file_path)

    content_types = {
        ".pdf": "application/pdf",
        ".doc": "application/msword",
        ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }

    return content_types.get(file_extension.lower(), "application/octet-stream")


class IsAdminEmail(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.email == settings.ADMIN_EMAIL


class FormListCreateView(APIView):
    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        # return [IsAuthenticated()]
        return [IsAdminEmail()]

    def get(self, request):
        forms = FormDocument.objects.all()
        serializer = FormDocumentSerializer(forms, many=True)
        return Response(serializer.data)

    def post(self, request):
        try:
            serializer = FormDocumentSerializer(data=request.data)
            if serializer.is_valid():
                form_doc = serializer.save()

                # if 'file' in request.FILES:
                #     form_doc.file = request.FILES['file']

                # form_doc.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class FormDetailView(APIView):
    def get_permissions(self):
        if self.request.method in ["DELETE"]:
            return [IsAdminEmail()]
        elif self.request.method in ["GET"]:
            return [IsAuthenticated()]
        return [AllowAny()]

    def get_object(self, pk):
        try:
            return FormDocument.objects.get(pk=pk)
        except FormDocument.DoesNotExist:
            return None

    def get(self, request, pk):
        form = self.get_object(pk)
        serializer = FormDocumentSerializer(form)
        return Response(serializer.data)

    def delete(self, request, pk):
        form = self.get_object(pk)
        print(self.request.user)
        if form.file and os.path.exists(form.file.path):
            os.remove(form.file.path)
        form.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FormDownloadView(APIView):
    permission_classes = [IsAuthenticated]

    # print("download called")
    def get(self, request, pk):
        try:
            form = get_object_or_404(FormDocument, pk=pk)

            # print("form : ", form)

            if not form.file:
                return Response(
                    {"error": "No file associated with this form"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            if not os.path.exists(form.file.path):
                return Response(
                    {"error": "File not found"}, status=status.HTTP_404_NOT_FOUND
                )

            content_type = get_content_type(form.file.path)

            response = FileResponse(
                open(form.file.path, "rb"), content_type=content_type
            )
            response["Content-Disposition"] = (
                f'attachment; filename="{os.path.basename(form.file.name)}"'
            )
            return response

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class FormViewerView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        try:
            form = get_object_or_404(FormDocument, pk=pk)

            if not form.file:
                return Response(
                    {"error": "No file associated with this form"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            if not os.path.exists(form.file.path):
                return Response(
                    {"error": "File not found"}, status=status.HTTP_404_NOT_FOUND
                )

            content_type = get_content_type(form.file.path)

            viewable_types = ["application/pdf"]
            content_disposition = (
                "inline" if content_type in viewable_types else "attachment"
            )

            response = FileResponse(
                open(form.file.path, "rb"), content_type=content_type
            )
            response["Content-Disposition"] = content_disposition
            return response

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import generics
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView


class CourseListCreateView(ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save()


class CourseDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self):
        return generics.get_object_or_404(
            Course, course_header_id=self.kwargs["header_id"], id=self.kwargs["id"]
        )


from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import generics
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView


class CourseListCreateView(ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save()


# class CourseDetailView(RetrieveUpdateDestroyAPIView):
#     queryset = Course.objects.all()
#     serializer_class = CourseSerializer
#     permission_classes = [IsAuthenticatedOrReadOnly]

#     def get_object(self):
#         return generics.get_object_or_404(Course, courseId=self.kwargs['courseId'])

# @api_view(["GET"])
# def course_headers(request):
#     headers = CourseHeader.objects.all()
#     serializer = CourseHeaderSerializer(headers, many=True)
#     return Response(serializer.data)

# @api_view(["GET"])
# def courses_by_header(request, header_id):
#     # Check if CourseHeader exists before querying courses
#     if not CourseHeader.objects.filter(id=header_id).exists():
#         return Response({"error": "Course header not found"}, status=404)


#     # Fetch courses linked to this CourseHeader
#     courses = Course.objects.filter(course_header_id=header_id)
#     serializer = CourseSerializer(courses, many=True)
#     return Response(serializer.data)
class CourseHeaderListCreateView(generics.ListCreateAPIView):
    queryset = CourseHeader.objects.all()
    serializer_class = CourseHeaderSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save()


# View for listing courses under a specific course header
class CoursesByHeaderView(generics.ListAPIView, generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        # Use different serializers based on the HTTP method
        if self.request.method == "GET" and "header_id" in self.kwargs:
            return CourseSerializer  # For listing courses
        return CourseHeaderSerializer  # For handling single course header (PUT, PATCH, DELETE)

    def get_queryset(self):
        if self.request.method == "GET" and "header_id" in self.kwargs:
            header_id = self.kwargs["header_id"]
            return Course.objects.filter(
                course_header_id=header_id
            )  # Fetch courses under specific header
        return (
            CourseHeader.objects.all()
        )  # Fetch all course headers (for PUT/PATCH/DELETE)

    def get_object(self):
        # This method is used for GET, PUT, PATCH, DELETE for individual CourseHeader
        if self.request.method in ["PUT", "PATCH", "DELETE"]:
            return generics.get_object_or_404(CourseHeader, id=self.kwargs["header_id"])
        return super().get_object()


# View for retrieving, updating, or deleting a specific course header
class CourseHeaderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CourseHeader.objects.all()
    serializer_class = CourseHeaderSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self):
        return generics.get_object_or_404(
            CourseHeader, course_header_id=self.kwargs["pk"]
        )


class IsAdminOrReadOnly(IsAdminUser):
    def has_permission(self, request, view):
        if request.method in ["GET", "HEAD", "OPTIONS"]:
            return True
        return super().has_permission(request, view)


class EquipmentListCreateView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        equipment = EquipmentsModel.objects.all()
        serializer = EquipmentSerializer(equipment, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EquipmentSerializer(data=request.data)
        if serializer.is_valid():
            equipment = serializer.save()

            # Handle multiple images
            products = request.FILES.getlist("products")
            for product in products:
                EquipmentProduct.objects.create(equipment=equipment, product=product)

            # Get updated event with images
            updated_serializer = EquipmentSerializer(equipment)
            return Response(updated_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EquipmentDetailView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self, pk):
        try:
            return EquipmentsModel.objects.get(pk=pk)
        except EquipmentsModel.DoesNotExist:
            return None

    def get(self, request, pk):
        equipment = self.get_object(pk)
        if equipment is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = EquipmentSerializer(equipment)
        return Response(serializer.data)

    def put(self, request, pk):
        # print("hi")
        # print(self.request.user)
        equipment = self.get_object(pk)
        if equipment is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        new_products = request.FILES.getlist("products")
        for product in new_products:
            EquipmentProduct.objects.create(equipment=equipment, product=product)
        serializer = EquipmentSerializer(equipment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            updated_serializer = EquipmentSerializer(equipment)
            return Response(updated_serializer.data)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        equipment = self.get_object(pk)
        if equipment is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if equipment.image:
            if os.path.isfile(equipment.image.path):
                os.remove(equipment.image.path)
        equipment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


from .models import Faculty
from .serializers import FacultySerializer


class FacultyListView(APIView):
    def get(self, request):
        faculty = Faculty.objects.all()
        serializer = FacultySerializer(faculty, many=True)
        return Response(serializer.data)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import FacultySerializer
from rest_framework.exceptions import NotFound


@api_view(["POST"])
def add_faculty(request):
    if request.method == "POST":
        print(request.data)
        serializer = FacultySerializer(data=request.data)
        print(serializer)

        if serializer.is_valid():
            category = serializer.validated_data.get("category")
            year = serializer.validated_data.get("year", None)

            if category == "TA" and year is None:
                return Response(
                    {"year": "Year is required for Teaching Assistants."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if category != "TA" and year is not None:
                serializer.validated_data.pop(
                    "year"
                )  # Ensure non-TAs do not store 'year'

            serializer.save()  # Save the new faculty data
            return Response(
                serializer.data, status=status.HTTP_201_CREATED
            )  # Respond with created data

        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )  # Validation failed


class EditFaculty(APIView):
    def get_object(self, pk):
        try:
            return Faculty.objects.get(pk=pk)
        except Faculty.DoesNotExist:
            raise NotFound(detail="Faculty not found", code=404)

    def put(self, request, pk, format=None):
        faculty = self.get_object(pk)
        serializer = FacultySerializer(
            faculty, data=request.data, partial=True
        )  # Allow partial updates

        if serializer.is_valid():
            category = serializer.validated_data.get("category", faculty.category)
            year = serializer.validated_data.get("year", None)

            if category == "TA" and year is None:
                return Response(
                    {"year": "Year is required for Teaching Assistants."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if category != "TA" and "year" in serializer.validated_data:
                serializer.validated_data.pop(
                    "year"
                )  # Prevent 'year' update for non-TAs

            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteFaculty(APIView):
    def get_object(self, pk):
        try:
            return Faculty.objects.get(pk=pk)
        except Faculty.DoesNotExist:
            raise NotFound(detail="Faculty not found", code=404)

    def delete(self, request, pk, format=None):
        faculty = self.get_object(pk)
        faculty.delete()  # Delete the faculty member
        return Response(
            status=status.HTTP_204_NO_CONTENT
        )  # No content in the response as it's a deletion


class EventListCreateView(APIView):
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

    def post(self, request):
        event_data = {
            "title": request.data.get("title"),
            "event_date": request.data.get("event_date"),
            "description": request.data.get("description"),
        }

        serializer = EventSerializer(data=event_data)
        if serializer.is_valid():
            event = serializer.save()

            # Handle multiple images
            images = request.FILES.getlist("images")
            for image in images:
                EventImage.objects.create(event=event, image=image)

            # Get updated event with images
            updated_serializer = EventSerializer(event)
            return Response(updated_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventDetailView(APIView):
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self, pk):
        return get_object_or_404(Event, pk=pk)

    def put(self, request, pk):
        event = self.get_object(pk)
        event_data = {
            "title": request.data.get("title"),
            "event_date": request.data.get("event_date"),
            "description": request.data.get("description"),
        }

        serializer = EventSerializer(event, data=event_data)
        if serializer.is_valid():
            event = serializer.save()

            # Handle new images
            new_images = request.FILES.getlist("images")
            for image in new_images:
                EventImage.objects.create(event=event, image=image)

            # Get updated event with images
            updated_serializer = EventSerializer(event)
            return Response(updated_serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        event = self.get_object(pk)
        # This will automatically delete related images due to CASCADE
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


from rest_framework import viewsets


def projects(request):
    projects = Project.objects.all().values(
        "id", "project_name", "faculty_mentors", "selected_students"
    )
    return Response(list(projects))


class ProjectListCreateView(APIView):
    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]  # Public read access
        return [IsAdminEmail()]  # Admin required for create

    def get(self, request):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)

    def post(self, request):
        try:
            serializer = ProjectSerializer(data=request.data)
            if serializer.is_valid():
                project = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# Retrieve or delete a specific project
class ProjectDetailView(APIView):
    def get_permissions(self):
        if self.request.method == "DELETE":
            return [IsAdminEmail()]  # Only admins can delete
        elif self.request.method in ["GET", "PUT"]:
            return [IsAuthenticated()]  # Authenticated users can view and edit
        return [AllowAny()]  # Public access for other methods

    def get_object(self, pk):
        try:
            return Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            return None

    def get(self, request, pk):
        project = self.get_object(pk)
        if project is None:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProjectSerializer(project)
        return Response(serializer.data)

    def put(self, request, pk):
        project = self.get_object(pk)
        if project is None:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProjectSerializer(project, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        project = self.get_object(pk)
        if project is None:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class EquipmentProductGetView(generics.ListAPIView):
    queryset = EquipmentProduct.objects.all()
    serializer_class = EquipmentProductSerializer

    def get_queryset(self):
        queryset = EquipmentProduct.objects.all()
        return queryset