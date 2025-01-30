
"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash, FileText, ChevronDown, ChevronRight } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import Header from "@/components/HeaderReplica";
import Navbar from "@/components/Navbar";

interface Project {
  id: number;
  project_name: string;
  faculty_mentors: string;
  selected_students: string;
}

interface FormData {
  project_name: string;
  faculty_mentors: string;
  selected_students: string;
}

interface UserDetails {
  email: string;
  [key: string]: any;
}

export default function ProjectsPage() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserDetails | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [showProjectDialog, setShowProjectDialog] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<FormData>({
    project_name: "",
    faculty_mentors: "",
    selected_students: ""
  });
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});

  const router = useRouter();

  const toggleRow = (id: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleRowHover = (projectId: number, isHovered: boolean) => {
    setExpandedRows(prev => ({
      ...prev,
      [projectId]: isHovered
    }));
  };

  useEffect(() => {
    async function checkAdminStatus() {
      try {
        const token = Cookies.get("access");
        if (!token) {
          setIsLoggedIn(false);
          setIsAdmin(false);
          return;
        }

        setIsLoggedIn(true);
        const userCookie = Cookies.get("user");
        if (userCookie) {
          const userDetails: UserDetails = JSON.parse(userCookie);
          setUser(userDetails);
          setIsAdmin(userDetails.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL);
        }
      } catch (error) {
        console.error("Error checking the user status:", error);
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    }
    checkAdminStatus();
  }, []);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/projects/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data: Project[] = await response.json();
      setProjects(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to fetch projects");
    }
  };

  const handleSubmit = async () => {
    const token = Cookies.get("access");
    try {
      const method = currentProject ? "PUT" : "POST";
      const url = currentProject
        ? `http://localhost:8000/api/projects/${currentProject.id}/`
        : "http://localhost:8000/api/projects/";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 401) {
        setError("Your session has expired. Please log in again.");
        setIsLoggedIn(false);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      await fetchProjects();
      setShowProjectDialog(false);
      setFormData({
        project_name: "",
        faculty_mentors: "",
        selected_students: ""
      });
      setCurrentProject(null);
      setError(null);
    } catch (err) {
      console.error("Error submitting project:", err);
      setError(`Failed to submit project: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleDelete = async () => {
    if (!selectedProjectId) return;

    const token = Cookies.get("access");
    try {
      const response = await fetch(
        `http://localhost:8000/api/projects/${selectedProjectId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      await fetchProjects();
      setShowDeleteDialog(false);
      setError(null);
    } catch (err) {
      setError("Failed to delete project");
    }
  };

  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setFormData({
      project_name: project.project_name,
      faculty_mentors: project.faculty_mentors,
      selected_students: project.selected_students
    });
    setShowProjectDialog(true);
  };

  const handleSignOut = () => {
    Cookies.remove("access");
    Cookies.remove("refresh");
    Cookies.remove("user");
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = "/";
  };

  if (isLoggedIn && !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Sorry! You do not have Admin Access !!
        </h1>
        <Button
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-800"
          onClick={() => {
            handleSignOut();
            router.push("/");
          }}
        >
          Go Back to Home Page
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-[#f8faff] relative overflow-hidden">
      <Header />
      <Navbar />

      <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        {error && (
          <div className="mb-4">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center p-5 backdrop-blur-sm">
            <FileText className="mr-2 h-6 w-6 text-[#026bc0]" />
            <h2 className="text-[#026bc0] text-2xl font-bold">Projects</h2>
          </div>
          {isAdmin && (
            <div className="relative group">
              <button
                className="bg-[#026bc0] p-2 rounded-full text-white text-xs shadow-lg hover:bg-[#0610ab] transition-colors duration-200"
                onClick={() => {
                  setCurrentProject(null);
                  setFormData({
                    project_name: "",
                    faculty_mentors: "",
                    selected_students: ""
                  });
                  setShowProjectDialog(true);
                }}
              >
                <Plus className="h-5 w-5" />
              </button>
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#0610ab] text-white text-sm rounded-md px-3 py-2 transition-all duration-200 shadow-lg whitespace-nowrap">
                Add Project
              </div>
            </div>
          )}
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm font-sans table-fixed">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="w-12 px-6 py-4 text-center font-bold text-lg text-[#026bc0]">#</th>
                  <th className="w-2/5 px-6 py-4 text-left font-bold text-lg text-[#026bc0]">Project Name</th>
                  <th className="w-1/5 px-6 py-4 text-left font-bold text-lg text-[#026bc0]">Faculty Mentors</th>
                  <th className="w-1/5 px-6 py-4 text-left font-bold text-lg text-[#026bc0]">Selected Students</th>
                  {isAdmin && (
                    <th className="w-1/5 px-6 py-4 text-center font-bold text-lg text-[#026bc0]">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <React.Fragment key={project.id}>
                    <tr 
                      className={`${
                        index % 2 === 0 ? "bg-[#f2f4ff]" : "bg-[#e7eeff]"
                      } border-t group hover:bg-white transition-all duration-300 ease-in-out`}
                      onMouseEnter={() => handleRowHover(project.id, true)}
                      onMouseLeave={() => handleRowHover(project.id, false)}
                    >
                      {/* <td className="w-12 px-4 py-4 text-center align-top">
                        <button 
                          onClick={() => toggleRow(project.id)}
                          className="transition-transform duration-300"
                        >
                          {expandedRows[project.id] ? (
                            <ChevronDown className="h-5 w-5 text-[#0610ab]" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-[#0610ab]" />
                          )}
                        </button>
                      </td> */}
                      <td className="px-6 py-4 text-center">{index + 1}</td>
                      <td className="w-1/4 px-6 py-4 text-base text-[#0610ab] align-top">{project.project_name}</td>
                      <td className="w-1/4 px-6 py-4 text-base align-top">
                        <div className="space-y-1">
                          {project.faculty_mentors.split(",").map((mentor, idx) => (
                            <div key={idx} className="line-clamp-1">{mentor.trim()}</div>
                          ))}
                        </div>
                      </td>
                      <td className="w-1/4 px-6 py-4 text-base align-top">
                        {!expandedRows[project.id] && (
                          <span className="text-gray-600">
                            +{project.selected_students.split(",").length} Students
                          </span>
                        )}
                      </td>
                      {isAdmin && (
                        <td className="w-1/4 px-6 py-4 align-top">
                          <div className="flex justify-center gap-6">
                            <button
                              className="flex items-center text-sm font-medium text-[#026bc0] hover:text-[#0610ab] transition-colors duration-200"
                              onClick={() => handleEdit(project)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </button>
                            <button
                              className="flex items-center text-sm font-medium text-red-500 hover:text-red-600 transition-colors duration-200"
                              onClick={() => {
                                setSelectedProjectId(project.id);
                                setShowDeleteDialog(true);
                              }}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>

                    {/* Expanded content */}
                    <tr className="transition-all duration-300 ease-in-out">
                      <td colSpan={isAdmin ? 5 : 4} className="p-0">
                        <div 
                          className="bg-[#eef2ff] overflow-hidden transition-all duration-300 ease-in-out"
                          style={{
                            maxHeight: expandedRows[project.id] ? '500px' : '0',
                            opacity: expandedRows[project.id] ? 1 : 0,
                          }}
                        >
                          <div className="px-6 py-4 transition-transform duration-300 ease-in-out"
                               style={{
                                 transform: expandedRows[project.id] ? 'translateY(0)' : 'translateY(-10px)'
                               }}>
                            <strong className="text-[#0610ab]">Students:</strong>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
                              {project.selected_students.split(",").map((student, idx) => (
                                <div 
                                  key={idx} 
                                  className="bg-[#cde0ff] px-3 py-1 rounded-lg text-sm"
                                >
                                  {student.trim()}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {projects.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">No projects available</p>
            </div>
          )}
        </div>

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent className="bg-white/95 backdrop-blur-sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the project.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>


        <Dialog open={showProjectDialog} onOpenChange={setShowProjectDialog}>
          <DialogContent className="bg-white/95 backdrop-blur-sm">
            <DialogHeader>
              <DialogTitle className="text-center text-xl text-[#026bc0]">
                {currentProject ? "Edit Project" : "Add New Project"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project_name" className="text-right font-medium">
                  Project Name
                </Label>
                <Input
                  id="project_name"
                  value={formData.project_name}
                  onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                  className="col-span-3"
                  placeholder="Enter project name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="faculty_mentors" className="text-right font-medium">
                  Faculty Mentors
                </Label>
                <Input
                  id="faculty_mentors"
                  value={formData.faculty_mentors}
                  onChange={(e) => setFormData({ ...formData, faculty_mentors: e.target.value })}
                  className="col-span-3"
                  placeholder="Enter faculty mentors"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="selected_students" className="text-right font-medium">
                  Selected Students
                </Label>
                <Input
                  id="selected_students"
                  value={formData.selected_students}
                  onChange={(e) => setFormData({ ...formData, selected_students: e.target.value })}
                  className="col-span-3"
                  placeholder="Enter selected students (comma-separated)"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowProjectDialog(false)}
                className="hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-[#026bc0] text-white hover:bg-[#0610ab] transition-colors duration-200"
              >
                {currentProject ? "Update" : "Create"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}