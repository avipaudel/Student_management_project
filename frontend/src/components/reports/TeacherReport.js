import { useEffect, useState } from "react";

import API from "../../services/api";

function TeacherReport() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    getTeachers();
  }, []);

  const getTeachers = async () => {
    try {
      const response = await API.get("/teachers");

      setTeachers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div>
      <h2>Teacher Report</h2>

      <button
        onClick={printReport}

        className="add-btn"
      >
        Print Report
      </button>

      <table className="data-table">
        <thead>
          <tr>
            <th>Teacher ID</th>

            <th>Name</th>

            <th>Email</th>

            <th>Phone</th>

            <th>Department</th>

            <th>Designation</th>
          </tr>
        </thead>

        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.teacher_id}</td>

              <td>
                {teacher.first_name} {teacher.last_name}
              </td>

              <td>{teacher.email}</td>

              <td>{teacher.phone}</td>

              <td>{teacher.department}</td>

              <td>{teacher.designation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherReport;
