import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

function DashboardCharts({ stats }) {
  const genderData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [stats.maleStudents, stats.femaleStudents],
      },
    ],
  };

  const overviewData = {
    labels: ["Students", "Departments"],
    datasets: [
      {
        label: "Overview",
        data: [stats.totalStudents, stats.totalDepartments],
      },
    ],
  };

  return (
    <div className="chart-container">
      <div className="chart-card">
        <h3>Gender Distribution</h3>

        <Pie data={genderData} />
      </div>

      <div className="chart-card">
        <h3>System Overview</h3>

        <Bar data={overviewData} />
      </div>
    </div>
  );
}

export default DashboardCharts;
