import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

import "../styles/dashboard.css";
import { toast } from "react-toastify";

function AddTeacher() {
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState({
    teacher_id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    designation: "",
    hire_date: "",
  });

  const handleChange = (e) => {
    setTeacher({
      ...teacher,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/teachers",

        teacher,
      );

      toast.error("Teacher Added Successfully");

      navigate("/teachers");
    } catch (error) {
      console.log(error);

      toast.error("Failed to add teacher");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <div className="form-box">
            <h1>Add Teacher</h1>

            <form onSubmit={handleSubmit}>
              <input
                type="text"

                name="teacher_id"

                placeholder="Teacher ID"

                value={teacher.teacher_id}

                onChange={handleChange}

                required
              />

              <input
                type="text"

                name="first_name"

                placeholder="First Name"

                value={teacher.first_name}

                onChange={handleChange}

                required
              />

              <input
                type="text"

                name="last_name"

                placeholder="Last Name"

                value={teacher.last_name}

                onChange={handleChange}

                required
              />

              <input
                type="email"

                name="email"

                placeholder="Email"

                value={teacher.email}

                onChange={handleChange}

                required
              />

              <input
                type="password"

                name="password"

                placeholder="Password"

                value={teacher.password}

                onChange={handleChange}

                required
              />

              <input
                type="text"

                name="phone"

                placeholder="Phone"

                value={teacher.phone}

                onChange={handleChange}
              />

              <input
                type="text"

                name="department"

                placeholder="Department"

                value={teacher.department}

                onChange={handleChange}
              />

              <input
                type="text"

                name="designation"

                placeholder="Designation"

                value={teacher.designation}

                onChange={handleChange}
              />

              <label>Hire Date</label>

              <input
                type="date"

                name="hire_date"

                value={teacher.hire_date}

                onChange={handleChange}
              />

              <button
                type="submit"

                className="add-btn"
              >
                Add Teacher
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTeacher;
