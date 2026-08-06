import { NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUser,
  FaBook,
  FaClipboardCheck,
  FaChartBar,
} from "react-icons/fa";

import "../styles/sidebar.css";

function TeacherSidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Teacher Panel</h2>

      <ul>
        <li>
          <NavLink to="/teacher-dashboard">
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/teacher-profile">
            <FaUser />
            <span>My Profile</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/teacher-courses">
            <FaBook />
            <span>My Courses</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/teacher-attendance">
            <FaClipboardCheck />
            <span>Attendance</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/teacher-results">
            <FaChartBar />
            <span>Results</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default TeacherSidebar;
