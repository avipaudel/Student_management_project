import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

import "../styles/dashboard.css";

import { toast } from "react-toastify";
function Attendance() {
  const [attendance, setAttendance] = useState([]);

  const [students, setStudents] = useState([]);

  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    student_id: "",
    course_id: "",
    attendance_date: "",
    status: "Present",
  });

  useEffect(() => {
    getAttendance();

    getStudents();

    getCourses();
  }, []);

  const getAttendance = async () => {
    try {
      const response = await API.get("/attendance");

      setAttendance(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStudents = async () => {
    try {
      const response = await API.get("/students");

      setStudents(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCourses = async () => {
    try {
      const response = await API.get("/courses");

      setCourses(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/attendance",

        form,
      );

      toast.error("Attendance Added Successfully");

      setForm({
        student_id: "",
        course_id: "",
        attendance_date: "",
        status: "Present",
      });

      getAttendance();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <h1>Attendance</h1>

          <div className="form-box">
            <h2>Add Attendance</h2>

            <form onSubmit={handleSubmit}>
              <select
                name="student_id"
                value={form.student_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Student</option>

                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.first_name} {student.last_name}
                  </option>
                ))}
              </select>

              <select
                name="course_id"
                value={form.course_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Course</option>

                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.course_name}
                  </option>
                ))}
              </select>

              <input
                type="date"
                name="attendance_date"
                value={form.attendance_date}
                onChange={handleChange}
                required
              />

              <select name="status" value={form.status} onChange={handleChange}>
                <option>Present</option>

                <option>Absent</option>
              </select>

              <button className="add-btn" type="submit">
                Save Attendance
              </button>
            </form>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>

                <th>Course</th>

                <th>Date</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((item) => (
                <tr key={item.id}>
                  <td>{item.student_name}</td>

                  <td>{item.course_name}</td>

                  <td>{item.attendance_date}</td>

                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
