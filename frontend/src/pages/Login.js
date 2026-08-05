import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import { toast } from "react-toastify";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post("/auth/login", loginData);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);

        localStorage.setItem("user", JSON.stringify(response.data.user));

        const role = response.data.user.role;

        if (role === "admin") {
          navigate("/dashboard");
        } else if (role === "teacher") {
          navigate("/teacher-dashboard");
        } else if (role === "student") {
          navigate("/student-dashboard");
        } else {
          toast.error("Invalid user role");
        }
      }
    } catch (error) {
      console.log(error);

      toast.error("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1>Student Management System</h1>

        <input
          type="email"

          name="email"

          placeholder="Email"

          value={loginData.email}

          onChange={handleChange}
        />

        <input
          type="password"

          name="password"

          placeholder="Password"

          value={loginData.password}

          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
