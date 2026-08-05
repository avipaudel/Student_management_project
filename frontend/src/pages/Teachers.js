import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

import "../styles/dashboard.css";

function Teachers() {
  const [teachers, setTeachers] = useState([]);

  const [search, setSearch] = useState("");

  const getTeachers = async () => {
    try {
      const response = await API.get("/teachers");

      setTeachers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?",
    );

    if (confirmDelete) {
      try {
        await API.delete(`/teachers/${id}`);

        setTeachers(teachers.filter((teacher) => teacher.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const keyword = search.toLowerCase();

    return (
      teacher.teacher_id.toLowerCase().includes(keyword) ||
      teacher.first_name.toLowerCase().includes(keyword) ||
      teacher.last_name.toLowerCase().includes(keyword) ||
      teacher.email.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <div className="page-header">
            <h1>Teachers</h1>

            <Link to="/add-teacher" className="add-btn">
              Add Teacher
            </Link>
          </div>

          <input
            type="text"

            className="search-box"

            placeholder="Search Teacher..."

            value={search}

            onChange={(e) => setSearch(e.target.value)}
          />

          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>

                <th>Name</th>

                <th>Email</th>

                <th>Department</th>

                <th>Designation</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>{teacher.teacher_id}</td>

                  <td>
                    {teacher.first_name} {teacher.last_name}
                  </td>

                  <td>{teacher.email}</td>

                  <td>{teacher.department}</td>

                  <td>{teacher.designation}</td>

                  <td>
                    <Link
                      to={`/edit-teacher/${teacher.id}`}

                      className="edit-btn"
                    >
                      Edit
                    </Link>

                    <button
                      className="delete-btn"

                      onClick={() => handleDelete(teacher.id)}
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

export default Teachers;
