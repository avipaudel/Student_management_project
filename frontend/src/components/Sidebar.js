import { NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaClipboardList,
  FaCalendarCheck,
  FaChartBar,
  FaUserCircle,
  FaKey,
} from "react-icons/fa";

import "../styles/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>

      <NavLink to="/dashboard">
        <FaTachometerAlt />
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/students">
        <FaUserGraduate />
        <span>Students</span>
      </NavLink>

      <NavLink to="/teachers">
        <FaChalkboardTeacher />
        <span>Teachers</span>
      </NavLink>

      <NavLink to="/courses">
        <FaBook />
        <span>Courses</span>
      </NavLink>

      <NavLink to="/enrollments">
        <FaClipboardList />
        <span>Enrollments</span>
      </NavLink>

      <NavLink to="/attendance">
        <FaCalendarCheck />
        <span>Attendance</span>
      </NavLink>

      <NavLink to="/results">
        <FaChartBar />
        <span>Results</span>
      </NavLink>

      <NavLink to="/reports">
        <FaChartBar />
        <span>Reports</span>
      </NavLink>

      <NavLink to="/profile">
        <FaUserCircle />
        <span>Profile</span>
      </NavLink>
    </div>
  );
}

export default Sidebar;
