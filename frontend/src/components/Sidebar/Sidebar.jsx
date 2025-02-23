import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const role = localStorage.getItem("role");

  return (
    <div className="sidebar">
      <h2 className="sidebar-header">{role === "admin" ? "Admin Dashboard" : "User Dashboard"}</h2>
      <ul className="sidebar-list">
        {role === "admin" ? (
          <>
            <li><Link to="/admin-dashboard" className="sidebar-link">Dashboard</Link></li>
            <li><Link to="/manage-inventory" className="sidebar-link">Manage Inventory</Link></li>
            <li><Link to="/user-management" className="sidebar-link">User Management</Link></li>
            <li><Link to="/request-list" className="sidebar-link">User Requests</Link></li>
            <li><Link to="/order-tracking" className="sidebar-link">Order Tracking</Link></li>
            <li><Link to="/profile" className="sidebar-link">Profile</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/user-dashboard" className="sidebar-link">Dashboard</Link></li>
            <li><Link to="/request-product" className="sidebar-link">Request Product</Link></li>
            <li><Link to="/order-tracking" className="sidebar-link">Order Tracking</Link></li>
            <li><Link to="/profile" className="sidebar-link">Profile</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;