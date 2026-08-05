import { useEffect, useState } from "react";

import API from "../../services/api";

function AttendanceReport() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    getAttendance();
  }, []);

  const getAttendance = async () => {
    try {
      const response = await API.get("/attendance");
      console.log(response.data);
      console.log(response.data.data);

      setAttendance(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div>
      <h2>Attendance Report</h2>

      <button onClick={printReport} className="add-btn">
        Print Report
      </button>

      <table className="data-table">
        <thead>
          <tr>
            <th>Student</th>

            <th>Course</th>

            <th>Date</th>

            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((item) => (
            <tr key={item.id}>
              <td>{item.student_name}</td>

              <td>{item.course_name}</td>

              <td>{item.attendance_date}</td>

              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceReport;
