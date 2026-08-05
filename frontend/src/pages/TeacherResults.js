import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TeacherSidebar from "../components/TeacherSidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

import "../styles/dashboard.css";

function TeacherResults() {
  const [courses, setCourses] = useState([]);

  const [students, setStudents] = useState([]);

  const [courseId, setCourseId] = useState("");

  const [examDate, setExamDate] = useState("");

  const [results, setResults] = useState({});

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
        `/teacher/results/students/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStudents(response.data.data);
      loadResults(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResult = (id, field, value) => {
    setResults({
      ...results,

      [id]: {
        ...results[id],

        [field]: value,
      },
    });
  };

  const saveResult = async (studentId) => {
    const marks = Number(results[studentId]?.marks);

    if (isNaN(marks) || marks < 0 || marks > 100) {
      toast.error("Marks must be between 0 and 100");

      return;
    }

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/teacher/results",

        {
          student_id: studentId,

          course_id: courseId,

          marks: marks,

          grade: results[studentId]?.grade || "F",

          exam_date: examDate,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.error("Result Saved");
    } catch (error) {
      console.log(error);
    }
  };
  const loadResults = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(
        `/teacher/results/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const existing = {};

      response.data.data.forEach((item) => {
        existing[item.student_id] = {
          marks: item.marks,

          grade: item.grade,
        };
      });

      setResults(existing);
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
          <h1>Teacher Results</h1>

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

            value={examDate}

            onChange={(e) => setExamDate(e.target.value)}
          />

          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>

                <th>Marks</th>

                <th>Grade</th>

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
                    <input
                      type="number"
                      min="0"

                      max="100"
                      className="marks-input"
                      value={results[student.id]?.marks || ""}

                      className="marks-input"

                      onChange={(e) =>
                        handleResult(student.id, "marks", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <select
                      className="status-select"

                      value={results[student.id]?.grade || "F"}

                      onChange={(e) =>
                        handleResult(student.id, "grade", e.target.value)
                      }
                    >
                      <option value="A">A</option>

                      <option value="B">B</option>

                      <option value="C">C</option>

                      <option value="D">D</option>

                      <option value="F">F</option>
                    </select>
                  </td>

                  <td>
                    <button
                      className="add-btn"

                      onClick={() => saveResult(student.id)}
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

export default TeacherResults;
