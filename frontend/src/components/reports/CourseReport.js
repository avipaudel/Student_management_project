import { useEffect, useState } from "react";

import API from "../../services/api";

function CourseReport() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const response = await API.get("/courses");

      setCourses(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div>
      <h2>Course Report</h2>

      <button
        onClick={printReport}

        className="add-btn"
      >
        Print Report
      </button>

      <table className="data-table">
        <thead>
          <tr>
            <th>Course Code</th>

            <th>Course Name</th>

            <th>Department</th>

            <th>Credits</th>

            <th>Semester</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.course_code}</td>

              <td>{course.course_name}</td>

              <td>{course.department}</td>

              <td>{course.credits}</td>

              <td>{course.semester}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseReport;
