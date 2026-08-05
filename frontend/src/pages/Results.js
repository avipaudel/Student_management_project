import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";
import { toast } from "react-toastify";

function Results() {
  const [results, setResults] = useState([]);

  const [students, setStudents] = useState([]);

  const [courses, setCourses] = useState([]);

  const [teachers, setTeachers] = useState([]);

  const [form, setForm] = useState({
    student_id: "",
    course_id: "",
    teacher_id: "",
    semester: "",
    internal_marks: "",
    final_marks: "",
    total_marks: "",
    grade: "",
  });

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this result?",
    );

    if (confirmDelete) {
      try {
        await API.delete(`/results/${id}`);

        setResults(results.filter((item) => item.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getResults();

    getStudents();

    getCourses();

    getTeachers();
  }, []);

  const getResults = async () => {
    try {
      const response = await API.get("/results-report");
      console.log(response.data.data);

      setResults(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStudents = async () => {
    const response = await API.get("/students");

    setStudents(response.data.data);
  };

  const getCourses = async () => {
    const response = await API.get("/courses");

    setCourses(response.data.data);
  };

  const getTeachers = async () => {
    const response = await API.get("/teachers");

    setTeachers(response.data.data);
  };

  const calculateGrade = (marks) => {
    if (marks >= 90) return "A+";
    else if (marks >= 80) return "A";
    else if (marks >= 70) return "B+";
    else if (marks >= 60) return "B";
    else if (marks >= 50) return "C";
    else return "F";
  };

  const handleChange = (e) => {
    let updated = {
      ...form,

      [e.target.name]: e.target.value,
    };

    if (e.target.name === "internal_marks" || e.target.name === "final_marks") {
      const total =
        Number(updated.internal_marks || 0) + Number(updated.final_marks || 0);

      updated.total_marks = total;

      updated.grade = calculateGrade(total);
    }

    setForm(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/results",

        form,
      );

      toast.error("Result Added Successfully");

      setForm({
        student_id: "",
        course_id: "",
        teacher_id: "",
        semester: "",
        internal_marks: "",
        final_marks: "",
        total_marks: "",
        grade: "",
      });

      getResults();
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
          <h1>Results</h1>

          <div className="form-box">
            <h2>Add Result</h2>

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

              <select
                name="teacher_id"
                value={form.teacher_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Teacher</option>

                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.first_name} {teacher.last_name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="semester"
                placeholder="Semester"
                value={form.semester}
                onChange={handleChange}
              />

              <input
                type="number"
                name="internal_marks"
                placeholder="Internal Marks"
                value={form.internal_marks}
                onChange={handleChange}
              />

              <input
                type="number"
                name="final_marks"
                placeholder="Final Marks"
                value={form.final_marks}
                onChange={handleChange}
              />

              <input
                type="number"
                name="total_marks"
                value={form.total_marks}
                readOnly
              />

              <input type="text" name="grade" value={form.grade} readOnly />

              <button className="add-btn" type="submit">
                Save Result
              </button>
            </form>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>

                <th>Course</th>

                <th>Total</th>

                <th>Grade</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {results.map((item) => (
                <tr key={item.id}>
                  <td>{item.student_name}</td>

                  <td>{item.course_name}</td>

                  <td>{item.marks}</td>

                  <td>{item.grade}</td>

                  <td>
                    <Link to={`/edit-result/${item.id}`} className="edit-btn">
                      Edit
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
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

export default Results;
