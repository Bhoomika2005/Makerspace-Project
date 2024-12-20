"use client";

import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";

interface Course {
  courseId: string;
  title: string;
  description: string;
  offeredBy: string;
  offeredTo: string;
  duration: string;
  schedule: string;
}

export default function CoursePage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/courses/")
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Courses</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <CourseCard
              key={course.courseId || index} // Use courseId if it's unique, otherwise fallback to index
              courseId={course.courseId}
              title={course.title}
              description={course.description}
              offeredBy={course.offeredBy}
              offeredTo={course.offeredTo}
              duration={course.duration}
              schedule={course.schedule}
            />
          ))
        ) : (
          <CourseCard
            key="DEFAULT001"
            courseId="DEFAULT001"
            title="Sample Course"
            description="This is a default course shown when no courses are available."
            offeredBy="Default Department"
            offeredTo="All Students"
            duration="4 weeks"
            schedule="Mondays and Wednesdays, 10 AM - 12 PM"
          />
        )}
      </div>
    </div>
  );
}
