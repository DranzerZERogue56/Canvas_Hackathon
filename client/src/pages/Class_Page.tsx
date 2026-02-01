import React, { useState, useEffect } from "react";
import { getCourses, Course } from "../api.ts";

export default function ClassPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses()
      .then(data => setCourses(data))
      .catch(err => console.error("Error fetching courses:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="courses-container">
      {courses.map(course => (
        <div key={course.id} className="course-box">
          <h2>{course.name}</h2>
          <p>{course.start_at}</p>
          <p>{course.time_zone}</p>
        </div>
      ))}
    </div>
  );
}

export { ClassPage };