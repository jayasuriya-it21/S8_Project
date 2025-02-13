import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const AdminDashboardPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
      <div className="content">
        <h1>Admin Dashboard</h1>
        <p>Here you can manage inventory, users, and view reports.</p>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
