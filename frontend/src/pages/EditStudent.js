import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

import "../styles/dashboard.css";
import { toast } from "react-toastify";

function EditStudent() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [student, setStudent] = useState({
    student_id: "",
    first_name: "",
    last_name: "",
    gender: "",
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
  });

  // Get student data

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await API.get(`/students/${id}`);

        const studentData = response.data.data;

        if (studentData) {
          setStudent({
            ...studentData,

            dob: studentData.dob ? studentData.dob.substring(0, 10) : "",

            admission_date: studentData.admission_date
              ? studentData.admission_date.substring(0, 10)
              : "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudent();
  }, [id]);

  // Input change

  const handleChange = (e) => {
    setStudent({
      ...student,

      [e.target.name]: e.target.value,
    });
  };

  // Update student

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.put(`/students/${id}`, student);

      console.log(response.data);

      toast.error("Student Updated Successfully");

      navigate("/students");
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error("Update Failed");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <h1>Edit Student</h1>

          <form className="student-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="student_id"
              value={student.student_id}
              placeholder="Student ID"
              onChange={handleChange}
            />

            <input
              type="text"
              name="first_name"
              value={student.first_name}
              placeholder="First Name"
              onChange={handleChange}
            />

            <input
              type="text"
              name="last_name"
              value={student.last_name}
              placeholder="Last Name"
              onChange={handleChange}
            />

            <input
              type="text"
              name="gender"
              value={student.gender}
              placeholder="Gender"
              onChange={handleChange}
            />

            <input
              type="date"
              name="dob"
              value={student.dob}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              value={student.email}
              placeholder="Email"
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              value={student.phone}
              placeholder="Phone"
              onChange={handleChange}
            />

            <input
              type="text"
              name="address"
              value={student.address}
              placeholder="Address"
              onChange={handleChange}
            />

            <input
              type="text"
              name="department"
              value={student.department}
              placeholder="Department"
              onChange={handleChange}
            />

            <input
              type="number"
              name="semester"
              value={student.semester}
              placeholder="Semester"
              onChange={handleChange}
            />

            <input
              type="text"
              name="roll_no"
              value={student.roll_no}
              placeholder="Roll No"
              onChange={handleChange}
            />

            <input
              type="date"
              name="admission_date"
              value={student.admission_date}
              onChange={handleChange}
            />

            <input
              type="text"
              name="guardian_name"
              value={student.guardian_name}
              placeholder="Guardian Name"
              onChange={handleChange}
            />

            <input
              type="text"
              name="guardian_phone"
              value={student.guardian_phone}
              placeholder="Guardian Phone"
              onChange={handleChange}
            />

            <button type="submit">Update Student</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditStudent;
