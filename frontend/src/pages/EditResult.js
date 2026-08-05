import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

import "../styles/dashboard.css";
import { toast } from "react-toastify";

function EditResult() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

  const [courses, setCourses] = useState([]);

  const [teachers, setTeachers] = useState([]);

  const [result, setResult] = useState({
    student_id: "",
    course_id: "",
    teacher_id: "",
    semester: "",
    internal_marks: "",
    final_marks: "",
    total_marks: "",
    grade: "",
  });

  useEffect(() => {
    getResult();

    getStudents();

    getCourses();

    getTeachers();
  }, []);

  const getResult = async () => {
    try {
      const response = await API.get(`/results/${id}`);

      setResult(response.data.data);
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
      ...result,

      [e.target.name]: e.target.value,
    };

    if (e.target.name === "internal_marks" || e.target.name === "final_marks") {
      updated.total_marks =
        Number(updated.internal_marks || 0) + Number(updated.final_marks || 0);

      updated.grade = calculateGrade(updated.total_marks);
    }

    setResult(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/results/${id}`,

        result,
      );

      toast.error("Result Updated Successfully");

      navigate("/results");
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
          <div className="form-box">
            <h1>Edit Result</h1>

            <form onSubmit={handleSubmit}>
              <select
                name="student_id"

                value={result.student_id}

                onChange={handleChange}
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

                value={result.course_id}

                onChange={handleChange}
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

              <select
                name="teacher_id"

                value={result.teacher_id}

                onChange={handleChange}
              >
                <option value="">Select Teacher</option>

                {teachers.map((teacher) => (
                  <option
                    key={teacher.id}

                    value={teacher.id}
                  >
                    {teacher.first_name} {teacher.last_name}
                  </option>
                ))}
              </select>

              <input
                type="number"

                name="semester"

                value={result.semester}

                onChange={handleChange}

                placeholder="Semester"
              />

              <input
                type="number"

                name="internal_marks"

                value={result.internal_marks}

                onChange={handleChange}

                placeholder="Internal Marks"
              />

              <input
                type="number"

                name="final_marks"

                value={result.final_marks}

                onChange={handleChange}

                placeholder="Final Marks"
              />

              <input
                type="number"

                name="total_marks"

                value={result.total_marks}

                readOnly
              />

              <input
                type="text"

                name="grade"

                value={result.grade}

                readOnly
              />

              <button
                className="add-btn"

                type="submit"
              >
                Update Result
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditResult;
