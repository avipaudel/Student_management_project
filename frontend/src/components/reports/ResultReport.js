import { useEffect, useState } from "react";

import API from "../../services/api";

function ResultReport() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    try {
      const response = await API.get("/results-report");

      setResults(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div>
      <h2>Result Report</h2>

      <button onClick={printReport} className="add-btn">
        Print Report
      </button>

      <table className="data-table">
        <thead>
          <tr>
            <th>Student</th>

            <th>Course</th>

            <th>Total Marks</th>

            <th>Grade</th>
          </tr>
        </thead>

        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.student_name}</td>

              <td>{result.course_name}</td>

              <td>{result.marks}</td>

              <td>{result.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultReport;
