 "use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CourseCard from "../../components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Interfaces for TypeScript
interface Course {
  courseId: string;
  title: string;
  description: string;
  offeredBy: string;
  offeredTo: string;
  duration: string;
  schedule: string;
}

interface User {
  email: string;
  [key: string]: any;
}

export default function CoursePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddEditDialog, setShowAddEditDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isNewCourse, setIsNewCourse] = useState<boolean>(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    async function checkAdminStatus() {
      const token = Cookies.get("access");

      if (!token) {
        setIsLoggedIn(false);
        setIsAdmin(false);
        return;
      }

      setIsLoggedIn(true);
      const userCookie = Cookies.get("user");
      if (userCookie) {
        const userDetails: User = JSON.parse(userCookie);
        setUser(userDetails);
        setIsAdmin(userDetails.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL);
      }
    }

    checkAdminStatus();
  }, []);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     fetchCourses();
  //   }
  // }, [isLoggedIn]);
  useEffect(() => {
    fetchCourses(); // Fetch courses regardless of login status
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_URL}/api/courses/`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data: Course[] = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to fetch courses");
    }
  };
  const handleAddCourse = () => {
    setSelectedCourse({
      courseId: "", // Empty or undefined for a new course
      title: "",
      description: "",
      offeredBy: "",
      offeredTo: "",
      duration: "",
      schedule: "",
    });
    setIsNewCourse(true); // Set the flag to indicate new course
    setShowAddEditDialog(true);
  };

  // Edit Course Logic
  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsNewCourse(false); // Set the flag to indicate it's an edit
    setShowAddEditDialog(true);
  };

  // Save Function
  const handleSaveCourse = async () => {
    if (
      !selectedCourse?.title ||
      !selectedCourse?.description ||
      !selectedCourse?.courseId ||
      !selectedCourse?.offeredBy ||
      !selectedCourse?.offeredTo ||
      !selectedCourse?.duration ||
      !selectedCourse?.schedule
    ) {
      // Show alert if any required field is missing
      window.alert("All fields are required");
      return;
    }
  
    const method = isNewCourse ? "POST" : "PUT";
    const url = isNewCourse
      ? `${API_URL}/api/courses/`
      : `${API_URL}/api/courses/${selectedCourse.courseId}/`;
  
    const token = Cookies.get("access");
    if (!token) {
      setError("Authentication required");
      return;
    }
  
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token
        },
        body: JSON.stringify(selectedCourse),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save course");
      }
  
      setShowAddEditDialog(false);
      setSelectedCourse(null);
      fetchCourses(); // Reload the courses list
    } catch (error) {
      console.error("Error saving course:", error);
      setError("Failed to save course");
    }
  };
  

  // const handleAddEditCourse = async () => {
  //   if (!selectedCourse?.title || !selectedCourse?.description) {
  //     setError("Title and description are required");
  //     return;
  //   }

  //   const token = Cookies.get("access");
  //   const method = selectedCourse.courseId ? "PUT" : "POST";
  //   const url = selectedCourse.courseId
  //     ? `${API_URL}/api/courses/${selectedCourse.courseId}/`
  //     : `${API_URL}/api/courses/`;
  //     console.log("Request Body: ", JSON.stringify(selectedCourse, null, 2));

  //   try {
  //     const response = await fetch(url, {
  //       method,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(selectedCourse),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to save course");
  //     }

  //     setShowAddEditDialog(false);
  //     setSelectedCourse(null);
  //     fetchCourses();
  //   } catch (error) {
  //     console.error("Error saving course:", error);
  //     setError("Failed to save course");
  //   }
  // };

  // const addCourse = async () => {
  //   if (!selectedCourse?.courseId || !selectedCourse?.title || !selectedCourse?.description) {
  //     setError("Course ID, title, and description are required");
  //     return;
  //   }
  
  //   const token = Cookies.get("access");
  
  //   const url = `${API_URL}/api/courses/`;
  
  //   console.log("Request Body: ", JSON.stringify(selectedCourse, null, 2));
  
  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(selectedCourse),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error("Failed to add course");
  //     }
  
  //     setShowAddEditDialog(false);
  //     setSelectedCourse(null);
  //     fetchCourses(); // Fetch the updated course list
  //   } catch (error) {
  //     console.error("Error adding course:", error);
  //     setError("Failed to add course");
  //   }
  // };
  
  // const editCourse = async () => {
  //   if (!selectedCourse?.courseId || !selectedCourse?.title || !selectedCourse?.description) {
  //     setError("Course ID, title, and description are required");
  //     return;
  //   }
  
  //   const token = Cookies.get("access");
  
  //   const url = `${API_URL}/api/courses/${selectedCourse.courseId}/`;
  
  //   console.log("Request Body: ", JSON.stringify(selectedCourse, null, 2));
  
  //   try {
  //     const response = await fetch(url, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(selectedCourse),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error("Failed to update course");
  //     }
  
  //     setShowAddEditDialog(false);
  //     setSelectedCourse(null);
  //     fetchCourses(); // Fetch the updated course list
  //   } catch (error) {
  //     console.error("Error updating course:", error);
  //     setError("Failed to update course");
  //   }
  // };
  
  const handleDeleteCourse = async () => {
    if (!selectedCourse?.courseId) return;

    const token = Cookies.get("access");
    if (!token) {
      setError("Authentication required");
      return;
    }
    else 
    console.log(token);

    try {
      const response = await fetch(
        `${API_URL}/api/courses/${selectedCourse.courseId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete course");
      }

      setShowDeleteDialog(false);
      setSelectedCourse(null);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
      setError("Failed to delete course");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Courses</h1>
      {isAdmin && (
        <Button
          className="mb-4"
          onClick={handleAddCourse}
        >
          Add Course
        </Button>
      )}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid md:grid-cols-2 gap-8">
        {courses.map((course) => (
          <div key={course.courseId} className="border p-4 rounded">
            <CourseCard {...course} />
            {isAdmin && (
              <div className="flex justify-end mt-2 gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditCourse(course)} // Call handleEditCourse with the selected course
                  >
                    Edit
                  </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setSelectedCourse(course);
                    setShowDeleteDialog(true);
                  }}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add/Edit Dialog */}
     <Dialog open={showAddEditDialog} onOpenChange={setShowAddEditDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>
        {selectedCourse?.courseId ? "Edit Course" : "Add Course"}
      </DialogTitle>
    </DialogHeader>
    <div className="grid gap-4 py-4">
    <div>
  <Label htmlFor="courseId">Course ID</Label>
  <Input
    id="courseId"
    value={selectedCourse?.courseId || ""}
    onChange={(e) =>
      setSelectedCourse((prev) => ({
        ...prev,
        courseId: e.target.value,
      }as Course))
    }
    required
  />
</div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={selectedCourse?.title || ""}
          onChange={(e) =>
            setSelectedCourse((prev) => ({
              ...prev,
              title: e.target.value,
            } as Course))
          } 
        />
      </div>
      <div>
  <Label htmlFor="description">Description</Label>
  <Input
    id="description"
    value={selectedCourse?.description || ""}
    onChange={(e) =>
      setSelectedCourse((prev) => ({
        ...prev,
        description: e.target.value,
      } as Course))
    }
    required
  />
</div>

      <div>
        <Label htmlFor="offeredBy">Offered By</Label>
        <Input
          id="offeredBy"
          value={selectedCourse?.offeredBy || ""}
          onChange={(e) =>
            setSelectedCourse((prev) => ({
              ...prev,
              offeredBy: e.target.value,
            } as Course))
          }
        />
      </div>
      <div>
        <Label htmlFor="offeredTo">Offered To</Label>
        <Input
          id="offeredTo"
          value={selectedCourse?.offeredTo || ""}
          onChange={(e) =>
            setSelectedCourse((prev) => ({
              ...prev,
              offeredTo: e.target.value,
            } as Course))
          }
        />
      </div>
      <div>
        <Label htmlFor="duration">Duration</Label>
        <Input
          id="duration"
          value={selectedCourse?.duration || ""}
          onChange={(e) =>
            setSelectedCourse((prev) => ({
              ...prev,
              duration: e.target.value,
            } as Course))
          }
        />
      </div>
      <div>
        <Label htmlFor="schedule">Schedule</Label>
        <Input
          id="schedule"
          value={selectedCourse?.schedule || ""}
          onChange={(e) =>
            setSelectedCourse((prev) => ({
              ...prev,
              schedule: e.target.value,
            } as Course))
          }
        />
      </div>
    </div>
    <div className="flex justify-end gap-2">
      <Button variant="outline" onClick={() => setShowAddEditDialog(false)}>
        Cancel
      </Button>
      <Button onClick={handleSaveCourse}>Save</Button>
    </div>
  </DialogContent>
</Dialog>


      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this course? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCourse}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
