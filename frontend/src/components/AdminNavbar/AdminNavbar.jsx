import React from "react";
import { logout } from "../../utils/auth";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const role = localStorage.getItem("role");

  return (
    <div className="navbar">
      <div className="navbar-title">Consumable Management</div>
      <div>
        {role === "user" && <a href="/user-dashboard" className="nav-link">User Dashboard</a>}
        {role === "admin" && <a href="/admin-dashboard" className="nav-link">Admin Dashboard</a>}
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default AdminNavbar;