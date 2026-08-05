import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="navbar">
      <h3>Student Management System</h3>

      <div className="navbar-right">
        <div className="profile-section">
          <FaUserCircle className="profile-icon" />
          <span>{user ? user.full_name : "User"}</span>
        </div>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
