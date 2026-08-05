import { Navigate } from "react-router-dom";

import { getUser } from "../utils/auth";

function ProtectedRoute({ children, role }) {
  const user = getUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role && user.role !== role) {
    if (user.role === "admin") {
      return <Navigate to="/dashboard" replace />;
    }

    if (user.role === "teacher") {
      return <Navigate to="/teacher-dashboard" replace />;
    }

    if (user.role === "student") {
      return <Navigate to="/student-dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
