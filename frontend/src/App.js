import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

import Teachers from "./pages/Teachers";
import AddTeacher from "./pages/AddTeacher";
import EditTeacher from "./pages/EditTeacher";

import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";

import Enrollments from "./pages/Enrollments";

import Attendance from "./pages/Attendance";

import Results from "./pages/Results";

import Reports from "./pages/Reports";

import Profile from "./pages/Profile";

import ChangePassword from "./pages/ChangePassword";

import EditResult from "./pages/EditResult";

import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherProfile from "./pages/TeacherProfile";
import TeacherCourses from "./pages/TeacherCourses";
import TeacherAttendance from "./pages/TeacherAttendance";
import TeacherResults from "./pages/TeacherResults";

import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import StudentCourses from "./pages/StudentCourses";
import StudentAttendance from "./pages/StudentAttendance";
import StudentResults from "./pages/StudentResults";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}

        <Route path="/" element={<Login />} />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Students */}

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-student"
          element={
            <ProtectedRoute role="admin">
              <AddStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-student/:id"
          element={
            <ProtectedRoute role="admin">
              <EditStudent />
            </ProtectedRoute>
          }
        />

        {/* Teachers - Admin Only */}

        <Route
          path="/teachers"
          element={
            <ProtectedRoute role="admin">
              <Teachers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-teacher"
          element={
            <ProtectedRoute role="admin">
              <AddTeacher />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-teacher/:id"
          element={
            <ProtectedRoute role="admin">
              <EditTeacher />
            </ProtectedRoute>
          }
        />

        {/* Courses - Admin Only */}

        <Route
          path="/courses"
          element={
            <ProtectedRoute role="admin">
              <Courses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-course"
          element={
            <ProtectedRoute role="admin">
              <AddCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-course/:id"
          element={
            <ProtectedRoute role="admin">
              <EditCourse />
            </ProtectedRoute>
          }
        />

        {/* Enrollment - Admin Only */}

        <Route
          path="/enrollments"
          element={
            <ProtectedRoute role="admin">
              <Enrollments />
            </ProtectedRoute>
          }
        />

        {/* Attendance */}

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />

        {/* Results */}

        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        />

        {/* Reports - Admin Only */}

        <Route
          path="/reports"
          element={
            <ProtectedRoute role="admin">
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Profile */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Change Password */}

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-result/:id"

          element={
            <ProtectedRoute>
              <EditResult />
            </ProtectedRoute>
          }
        />
        {/* ================= Teacher ================= */}

        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute role="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher-profile"
          element={
            <ProtectedRoute role="teacher">
              <TeacherProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher-courses"
          element={
            <ProtectedRoute role="teacher">
              <TeacherCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher-attendance"
          element={
            <ProtectedRoute role="teacher">
              <TeacherAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher-results"
          element={
            <ProtectedRoute role="teacher">
              <TeacherResults />
            </ProtectedRoute>
          }
        />
        {/* ================= Student ================= */}

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-profile"
          element={
            <ProtectedRoute role="student">
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-courses"
          element={
            <ProtectedRoute role="student">
              <StudentCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-attendance"
          element={
            <ProtectedRoute role="student">
              <StudentAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-results"
          element={
            <ProtectedRoute role="student">
              <StudentResults />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="top-right"

        autoClose={3000}
      />
    </BrowserRouter>
  );
}

export default App;
