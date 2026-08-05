import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StudentTable from "../components/StudentTable";

import API from "../services/api";

import "../styles/dashboard.css";

function Students() {
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState("All");

  const [sort, setSort] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 5;

  // Fetch Students
  const getStudents = async () => {
    try {
      setLoading(true);

      const response = await API.get("/students");

      setStudents(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  // Delete Student
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (confirmDelete) {
      try {
        await API.delete(`/students/${id}`);

        setStudents(students.filter((student) => student.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Search + Department Filter

  const filteredStudents = students.filter((student) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      student.student_id.toLowerCase().includes(keyword) ||
      student.first_name.toLowerCase().includes(keyword) ||
      student.last_name.toLowerCase().includes(keyword) ||
      student.email.toLowerCase().includes(keyword);

    const matchesDepartment =
      department === "All" || student.department === department;

    return matchesSearch && matchesDepartment;
  });

  // Sorting

  let sortedStudents = [...filteredStudents];

  if (sort === "name") {
    sortedStudents.sort((a, b) => a.first_name.localeCompare(b.first_name));
  } else if (sort === "department") {
    sortedStudents.sort((a, b) => a.department.localeCompare(b.department));
  } else if (sort === "student_id") {
    sortedStudents.sort((a, b) => a.student_id.localeCompare(b.student_id));
  }

  // Pagination Logic

  const indexOfLastStudent = currentPage * studentsPerPage;

  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const currentStudents = sortedStudents.slice(
    indexOfFirstStudent,

    indexOfLastStudent,
  );

  const totalPages = Math.ceil(sortedStudents.length / studentsPerPage);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <div className="page-header">
            <h1>Students</h1>
            <Link to="/add-student" className="add-btn">
              Add Student
            </Link>
          </div>
          <input
            type="text"
            placeholder="Search by Student ID, Name or Email..."
            className="search-box"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);

              setCurrentPage(1);
            }}
          />

          <select
            className="department-filter"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);

              setCurrentPage(1);
            }}
          >
            <option value="All">All Departments</option>

            <option value="BCA">BCA</option>

            <option value="BBS">BBS</option>

            <option value="BIM">BIM</option>

            <option value="CSIT">CSIT</option>
          </select>

          <select
            className="department-filter"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By</option>

            <option value="name">Name</option>

            <option value="department">Department</option>

            <option value="student_id">Student ID</option>
          </select>

          {loading ? (
            <h3 className="loading">Loading Students...</h3>
          ) : (
            <StudentTable
              students={currentStudents}
              handleDelete={handleDelete}
            />
          )}

          {!loading && totalPages > 1 && (
            <div className="pagination">
              {Array.from(
                { length: totalPages },

                (_, index) => (
                  <button
                    key={index}
                    className={currentPage === index + 1 ? "active-page" : ""}
                    onClick={() => {
                      setCurrentPage(index + 1);
                    }}
                  >
                    {index + 1}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Students;
