import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

import "../styles/dashboard.css";

function AddStudent() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    student_id: "",
    first_name: "",
    last_name: "",
    gender: "Male",
    dob: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    semester: "",
    roll_no: "",
    admission_date: "",
    guardian_name: "",
    guardian_phone: "",
    profile_image: "default.png",
    password: "",
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/students", student);

      toast.error("Student Added Successfully");

      navigate("/students");
    } catch (error) {
      console.log(error);

      toast.error("Failed to add student");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <h1>Add Student</h1>

          <form className="student-form" onSubmit={handleSubmit}>
            {Object.keys(student).map(
              (key) =>
                key !== "profile_image" && (
                  <input
                    key={key}
                    type={
                      key === "dob" || key === "admission_date"
                        ? "date"
                        : key === "password"
                          ? "password"
                          : "text"
                    }
                    name={key}
                    placeholder={key.replaceAll("_", " ")}
                    value={student[key]}
                    onChange={handleChange}
                    required
                  />
                ),
            )}

            <button type="submit">Add Student</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
