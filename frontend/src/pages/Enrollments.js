import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";
import { toast } from "react-toastify";
import "../styles/dashboard.css";

function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);

  const [students, setStudents] = useState([]);

  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    student_id: "",
    course_id: "",
    enrollment_date: "",
  });

  useEffect(() => {
    getEnrollments();

    getStudents();

    getCourses();
  }, []);

  const getEnrollments = async () => {
    try {
      const response = await API.get("/enrollments");

      setEnrollments(response.data.data);
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
        "/enrollments",

        form,
      );

      toast.error("Enrollment Added Successfully");

      setForm({
        student_id: "",
        course_id: "",
        enrollment_date: "",
      });

      getEnrollments();
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
          <h1>Enrollments</h1>

          <div className="form-box">
            <h2>Add Enrollment</h2>

            <form onSubmit={handleSubmit}>
              <select
                name="student_id"

                value={form.student_id}

                onChange={handleChange}

                required
              >
                <option value="">Select Student</option>

                {students.map((student) => (
                  <option
                    key={student.id}

                    value={student.id}
                  >
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
                  <option
                    key={course.id}

                    value={course.id}
                  >
                    {course.course_name}
                  </option>
                ))}
              </select>

              <input
                type="date"

                name="enrollment_date"

                value={form.enrollment_date}

                onChange={handleChange}

                required
              />

              <button
                className="add-btn"

                type="submit"
              >
                Save Enrollment
              </button>
            </form>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>

                <th>Course</th>

                <th>Enrollment Date</th>
              </tr>
            </thead>

            <tbody>
              {enrollments.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.first_name} {item.last_name}
                  </td>

                  <td>{item.course_name}</td>

                  <td>{item.enrollment_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Enrollments;
