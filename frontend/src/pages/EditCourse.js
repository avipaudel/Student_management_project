import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

import "../styles/dashboard.css";
import { toast } from "react-toastify";

function EditCourse() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [course, setCourse] = useState({
    course_code: "",
    course_name: "",
    department: "",
    semester: "",
    credits: "",
  });

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    try {
      const response = await API.get(`/courses/${id}`);

      setCourse(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setCourse({
      ...course,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/courses/${id}`,

        course,
      );

      toast.error("Course Updated Successfully");

      navigate("/courses");
    } catch (error) {
      console.log(error);

      toast.error("Update Failed");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <div className="form-box">
            <h1>Edit Course</h1>

            <form onSubmit={handleSubmit}>
              <input
                type="text"

                name="course_code"

                placeholder="Course Code"

                value={course.course_code}

                onChange={handleChange}
              />

              <input
                type="text"

                name="course_name"

                placeholder="Course Name"

                value={course.course_name}

                onChange={handleChange}
              />

              <input
                type="text"

                name="department"

                placeholder="Department"

                value={course.department}

                onChange={handleChange}
              />

              <input
                type="number"

                name="semester"

                placeholder="Semester"

                value={course.semester}

                onChange={handleChange}
              />

              <input
                type="number"

                name="credits"

                placeholder="Credits"

                value={course.credits}

                onChange={handleChange}
              />

              <button
                type="submit"

                className="add-btn"
              >
                Update Course
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
