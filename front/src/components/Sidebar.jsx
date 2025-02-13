// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const sidebarStyle = {
    width: '230px',
    background: '#333',
    color: '#fff',
    padding: '20px',
    height: '100vh',
    position: 'fixed',
  };

  const sidebarHeaderStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px',
  };

  const linkStyle = {
    display: 'block',
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 0',
    fontSize: '18px',
    fontWeight: '500',
    borderBottom: '1px solid #555',
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: '#444',
  };

  return (
    <div style={sidebarStyle}>
      <h2 style={sidebarHeaderStyle}>Admin Dashboard</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="/dashboard" style={linkStyle}>Dashboard</Link></li>
        <li><Link to="/manage-inventory" style={linkStyle}>Manage Inventory</Link></li>
        <li><Link to="/user-management" style={linkStyle}>User Management</Link></li>
        <li><Link to="/reports" style={linkStyle}>Reports & Analytics</Link></li>
        <li><Link to="/requestlist" style={linkStyle}>User Requests</Link></li>  {/* Request List link */}
      </ul>
    </div>
  );
};

export default Sidebar;
