import { NavLink, useNavigate } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUser,
  FaBook,
  FaClipboardCheck,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

import "../styles/sidebar.css";

function StudentSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">SMS</h2>

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

      <button className="logout-btn" onClick={logout}>
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </div>
  );
}

export default StudentSidebar;
