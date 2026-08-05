import { Link } from "react-router-dom";

function StudentTable({ students, handleDelete }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Semester</th>
          <th>Actions</th>
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

            <td>{student.semester}</td>

            <td>
              <Link to={`/edit-student/${student.id}`} className="edit-btn">
                Edit
              </Link>

              <button
                className="delete-btn"
                onClick={() => handleDelete(student.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;
