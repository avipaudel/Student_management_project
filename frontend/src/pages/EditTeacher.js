import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

import "../styles/dashboard.css";
import { toast } from "react-toastify";
function EditTeacher() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [teacher, setTeacher] = useState({
    teacher_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    hire_date: "",
  });

  useEffect(() => {
    getTeacher();
  }, []);

  const getTeacher = async () => {
    try {
      const response = await API.get(`/teachers/${id}`);

      setTeacher(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setTeacher({
      ...teacher,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/teachers/${id}`,

        teacher,
      );

      toast.error("Teacher Updated Successfully");

      navigate("/teachers");
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
            <h1>Edit Teacher</h1>

            <form onSubmit={handleSubmit}>
              <input
                type="text"

                name="teacher_id"

                value={teacher.teacher_id}

                onChange={handleChange}

                placeholder="Teacher ID"
              />

              <input
                type="text"

                name="first_name"

                value={teacher.first_name}

                onChange={handleChange}

                placeholder="First Name"
              />

              <input
                type="text"

                name="last_name"

                value={teacher.last_name}

                onChange={handleChange}

                placeholder="Last Name"
              />

              <input
                type="email"

                name="email"

                value={teacher.email}

                onChange={handleChange}

                placeholder="Email"
              />

              <input
                type="text"

                name="phone"

                value={teacher.phone}

                onChange={handleChange}

                placeholder="Phone"
              />

              <input
                type="text"

                name="department"

                value={teacher.department}

                onChange={handleChange}

                placeholder="Department"
              />

              <input
                type="text"

                name="designation"

                value={teacher.designation}

                onChange={handleChange}

                placeholder="Designation"
              />

              <input
                type="date"

                name="hire_date"

                value={teacher.hire_date ? teacher.hire_date.slice(0, 10) : ""}

                onChange={handleChange}
              />

              <button
                type="submit"

                className="add-btn"
              >
                Update Teacher
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTeacher;
