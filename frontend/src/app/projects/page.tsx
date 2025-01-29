"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText } from "lucide-react";
import Header from "@/components/HeaderReplica";
import Navbar from "@/components/Navbar";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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

        const data = await response.json();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to fetch projects");
      }
    };

    fetchProjects();
  }, []);

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
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          {projects.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white text-left text-sm shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 border-b">Project Name</th>
                    <th className="px-6 py-3 border-b">Faculty Mentors</th>
                    <th className="px-6 py-3 border-b">Selected Students</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{project.project_name}</td>
                      <td className="px-6 py-4">{project.faculty_mentors}</td>
                      <td className="px-6 py-4">
                        <ul className="list-disc pl-4">
                          {project.selected_students.split(",").map((email, index) => (
                            <li key={index}>{email}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">No projects available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
