import { useEffect, useState } from "react";

import API from "../../services/api";

function StudentReport() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      const response = await API.get("/students");

      setStudents(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div>
      <h2>Student Report</h2>

      <button
        onClick={printReport}

        className="add-btn"
      >
        Print Report
      </button>

      <table className="data-table">
        <thead>
          <tr>
            <th>Student ID</th>

            <th>Name</th>

            <th>Email</th>

            <th>Department</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.student_id}</td>

              <td>
                {student.first_name} {student.last_name}
              </td>

              <td>{student.email}</td>

              <td>{student.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentReport;
