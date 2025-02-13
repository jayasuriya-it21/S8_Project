import React from 'react';

const navbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#333',
  color: '#fff',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  marginRight: '20px',
};

const Navbar = () => (
  <div style={navbarStyle}>
    <div style={{ fontSize: '20px' }}>Inventory Management</div>
    <div>
      <a href="/user" style={linkStyle}>User Dashboard</a>
      <a href="/admin" style={linkStyle}>Admin Dashboard</a>
    </div>
  </div>
);

export default Navbar;
