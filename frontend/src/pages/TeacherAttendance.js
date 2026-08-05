import { useEffect, useState } from "react";

import TeacherSidebar from "../components/TeacherSidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";
import { toast } from "react-toastify";
import "../styles/dashboard.css";

function TeacherAttendance() {
  const [courses, setCourses] = useState([]);

  const [students, setStudents] = useState([]);

  const [courseId, setCourseId] = useState("");

  const [date, setDate] = useState("");

  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(
        "/teacher/courses",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCourses(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStudents = async (id) => {
    setCourseId(id);

    try {
      const token = localStorage.getItem("token");

      const response = await API.get(
        `/teacher/attendance/students/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("Selected Course ID:", id);
      console.log("Students:", response.data.data);

      setStudents(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = (id, status) => {
    setAttendance({
      ...attendance,

      [id]: status,
    });
  };

  const saveAttendance = async (studentId) => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/teacher/attendance",

        {
          student_id: studentId,

          course_id: courseId,

          attendance_date: date,

          status: attendance[studentId] || "Present",
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.error("Attendance Saved");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">
      <TeacherSidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <h1>Teacher Attendance</h1>

          <select
            className="course-select"

            onChange={(e) => getStudents(e.target.value)}
          >
            <option>Select Course</option>

            {courses.map((course) => (
              <option
                key={course.id}

                value={course.id}
              >
                {course.course_name}
              </option>
            ))}
          </select>

          <input
            className="date-input"
            type="date"

            value={date}

            onChange={(e) => setDate(e.target.value)}
          />

          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>

                <th>Status</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>
                    {student.first_name} {student.last_name}
                  </td>

                  <td>
                    <select
                      className="status-select"
                      onChange={(e) => handleStatus(student.id, e.target.value)}
                    >
                      <option value="Present">Present</option>

                      <option value="Absent">Absent</option>
                    </select>
                  </td>

                  <td>
                    <button
                      className="add-btn"

                      onClick={() => saveAttendance(student.id)}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TeacherAttendance;
