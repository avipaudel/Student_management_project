import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import { getUser } from "../utils/auth";

import StudentSidebar from "../components/StudentSidebar";
import TeacherSidebar from "../components/TeacherSidebar";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import "../styles/changePassword.css";

function ChangePassword() {
  const user = getUser();
  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await API.put(
        "/auth/change-password",

        passwordData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        toast.error("Password changed successfully");

        navigate("/profile");
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="dashboard">
      {user.role === "admin" && <Sidebar />}

      {user.role === "teacher" && <TeacherSidebar />}

      {user.role === "student" && <StudentSidebar />}

      <div className="main">
        <Navbar />

        <div className="content">
          <div className="password-box">
            <h2>Change Password</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="password"

                name="oldPassword"

                placeholder="Old Password"

                value={passwordData.oldPassword}

                onChange={handleChange}
              />

              <input
                type="password"

                name="newPassword"

                placeholder="New Password"

                value={passwordData.newPassword}

                onChange={handleChange}
              />

              <button type="submit">Update Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
