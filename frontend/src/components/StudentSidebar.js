import { NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUser,
  FaBook,
  FaClipboardCheck,
  FaChartBar,
} from "react-icons/fa";

import "../styles/sidebar.css";

function StudentSidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Student Panel</h2>

      <ul>
        <li>
          <NavLink to="/student-dashboard">
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/student-profile">
            <FaUser />
            <span>My Profile</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/student-courses">
            <FaBook />
            <span>My Courses</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/student-attendance">
            <FaClipboardCheck />
            <span>Attendance</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/student-results">
            <FaChartBar />
            <span>Results</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default StudentSidebar;
