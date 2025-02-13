import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/sdashboard";
import ManageInventory from "./components/ManageInventory";
import UserManagement from "./components/UserManagement";
import ReportsAndAnalytics from "./components/ReportsAndAnalytics";
import RequestList from "./components/RequestList";
import UserDashboard from "./components/userdashboard";

const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const ProtectedRoute = ({ element, allowedRoles }) => {
  const role = localStorage.getItem("role"); // Get role from storage

  if (!role) {
    return <Navigate to="/login" replace />; // Redirect if not logged in
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to={role === "admin" ? "/dashboard" : "/userdashboard"} replace />;
  }

  return element;
};

const MainLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div style={{ display: "flex" }}>
      {!isAuthPage && <Sidebar />}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} allowedRoles={["admin"]} />} />
          <Route path="/manage-inventory" element={<ProtectedRoute element={<ManageInventory />} allowedRoles={["admin"]} />} />
          <Route path="/user-management" element={<ProtectedRoute element={<UserManagement />} allowedRoles={["admin"]} />} />
          <Route path="/reports" element={<ProtectedRoute element={<ReportsAndAnalytics />} allowedRoles={["admin"]} />} />
          <Route path="/requestlist" element={<ProtectedRoute element={<RequestList />} allowedRoles={["admin"]} />} />
          <Route path="/userdashboard" element={<ProtectedRoute element={<UserDashboard />} allowedRoles={["user"]} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
