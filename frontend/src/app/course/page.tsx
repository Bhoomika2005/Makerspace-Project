"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CourseCard from "../../components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ModernSplitCard,
  StackedAccentCard,
  ExpandableCard,
} from "@/components/carddesign";

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

import Header from "@/components/HeaderReplica";
import Navbar from "@/components/Navbar";
import { BookOpen, FileText, Plus } from "lucide-react";
import { isDataView } from "util/types";

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

  const handleDeleteCourse = async () => {
    if (!selectedCourse?.courseId) return;

    const token = Cookies.get("access");
    if (!token) {
      setError("Authentication required");
      return;
    } else console.log(token);

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
    <div>
      <Header/>
      <Navbar/>
    
    <div className="container mx-auto px-4 py-8">
    <div className="flex justify-between items-center mb-8">
    <div className="flex items-center p-5 backdrop-blur-sm">
            <BookOpen className="mr-2 h-6 w-6 text-[#026bc0]" />
            <h2 className="text-[#026bc0] text-2xl font-bold">Our Courses</h2>
          </div>
  {/* <h1 className=" text-[#026bc0] text-2xl font-bold ml-8 ">Our Courses</h1> */}
  {isAdmin && (
    <div className="relative group mx-12">
    <Button
      size="icon"
      className="bg-[#026bc0] p-2 rounded-full text-white text-xs shadow-lg hover:bg-[#0610ab] transition-colors duration-200"
      onClick={handleAddCourse}
    >
      <Plus className="h-5 w-5" />
    </Button>
  
    {/* Tooltip */}
    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#0610ab] text-white text-sm rounded-md px-3 py-2 transition-all duration-200 shadow-lg whitespace-nowrap">
      Add a new course
    </div>
  </div>
  
  )}
</div>


      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid md:grid-cols-1 gap-8">
        {courses.map((course) => (
          <div key={course.courseId} className="relative w-full">
            {/* Choose one of the card variants: */}
            <ModernSplitCard {...course} 
          onEdit={() => handleEditCourse(course)}

            onDelete={() => handleDeleteCourse}
            isAdmin={isAdmin}
            />

            {/* <StackedAccentCard {...course} /> */}

            {/* <ExpandableCard {...course} /> */}

            {/* {isAdmin && (
              <div className="absolute top-8 right-80 flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  
                  onClick={() => handleEditCourse(course)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white text-red-600"
                  onClick={() => {
                    setSelectedCourse(course);
                    setShowDeleteDialog(true);
                  }}
                >
                  Delete
                </Button>
              </div>
            )} */}
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
                  setSelectedCourse(
                    (prev) =>
                      ({
                        ...prev,
                        courseId: e.target.value,
                      } as Course)
                  )
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
                  setSelectedCourse(
                    (prev) =>
                      ({
                        ...prev,
                        title: e.target.value,
                      } as Course)
                  )
                }
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={selectedCourse?.description || ""}
                onChange={(e) =>
                  setSelectedCourse(
                    (prev) =>
                      ({
                        ...prev,
                        description: e.target.value,
                      } as Course)
                  )
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
                  setSelectedCourse(
                    (prev) =>
                      ({
                        ...prev,
                        offeredBy: e.target.value,
                      } as Course)
                  )
                }
              />
            </div>
            <div>
              <Label htmlFor="offeredTo">Offered To</Label>
              <Input
                id="offeredTo"
                value={selectedCourse?.offeredTo || ""}
                onChange={(e) =>
                  setSelectedCourse(
                    (prev) =>
                      ({
                        ...prev,
                        offeredTo: e.target.value,
                      } as Course)
                  )
                }
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={selectedCourse?.duration || ""}
                onChange={(e) =>
                  setSelectedCourse(
                    (prev) =>
                      ({
                        ...prev,
                        duration: e.target.value,
                      } as Course)
                  )
                }
              />
            </div>
            <div>
              <Label htmlFor="schedule">Schedule</Label>
              <Input
                id="schedule"
                value={selectedCourse?.schedule || ""}
                onChange={(e) =>
                  setSelectedCourse(
                    (prev) =>
                      ({
                        ...prev,
                        schedule: e.target.value,
                      } as Course)
                  )
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowAddEditDialog(false)}
            >
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
              Are you sure you want to delete this course? This action cannot be
              undone.
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
    {/* <Footer/> */}
    </div>
  );
}
