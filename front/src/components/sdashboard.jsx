import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [approvedItems, setApprovedItems] = useState([]);
  const [stockLimitData, setStockLimitData] = useState([]);
  const [usageData, setUsageData] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample Data for testing
  const sampleCategories = [
    { _id: "1", name: "Electronics" },
    { _id: "2", name: "Furniture" },
    { _id: "3", name: "Clothing" },
  ];

  const sampleApprovedItems = [
    { _id: "1", name: "Item A" },
    { _id: "2", name: "Item B" },
    { _id: "3", name: "Item C" },
  ];

  const sampleStockLimitData = [
    { date: "2025-01-01", stockLimit: 100 },
    { date: "2025-01-02", stockLimit: 90 },
    { date: "2025-01-03", stockLimit: 110 },
    { date: "2025-01-04", stockLimit: 95 },
    { date: "2025-01-05", stockLimit: 105 },
  ];

  const sampleUsageData = [
    { month: "January", usage: 120 },
    { month: "February", usage: 130 },
    { month: "March", usage: 125 },
    { month: "April", usage: 115 },
    { month: "May", usage: 110 },
  ];

  const sampleUsers = [
    { _id: "1", name: "User A", role: "Admin", status: "Approved" },
    { _id: "2", name: "User B", role: "User", status: "Pending" },
    { _id: "3", name: "User C", role: "Manager", status: "Approved" },
  ];

  useEffect(() => {
    // Simulate fetching data
    setLoading(true);
    setTimeout(() => {
      setCategories(sampleCategories);
      setApprovedItems(sampleApprovedItems);
      setStockLimitData(sampleStockLimitData);
      setUsageData(sampleUsageData);
      setUsers(sampleUsers);
      setLoading(false);
    }, 1000); // Simulating a delay for data fetching
  }, []);

  const dashboardStyle = {
    marginLeft: "270px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  };

  const cardsContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "20px",
  };

  const cardStyle = {
    background: "#fff",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    width: "30%",
    textAlign: "center",
  };

  const chartsContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  };

  const usersContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  const isValidData = (data) => Array.isArray(data) && data.length > 0;

  if (loading) return <p style={{ textAlign: "center", fontSize: "18px" }}>Loading...</p>;

  return (
    <div style={dashboardStyle}>
      {/* Categories and Approved Items */}
      <div style={cardsContainerStyle}>
        <div style={cardStyle}>
          <h3>Categories</h3>
          {categories.length > 0 ? (
            categories.map((category) => <p key={category._id}>{category.name}</p>)
          ) : (
            <p>No categories available</p>
          )}
        </div>
        <div style={cardStyle}>
          <h3>Daily Approved Items</h3>
          {approvedItems.length > 0 ? (
            approvedItems.map((item) => <p key={item._id}>{item.name}</p>)
          ) : (
            <p>No approved items available</p>
          )}
        </div>
      </div>

      {/* Stock Limit and Monthly Usage Reports */}
      <div style={chartsContainerStyle}>
        <div style={cardStyle}>
          <h3>Stock Limit</h3>
          {isValidData(stockLimitData) ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={stockLimitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="stockLimit" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>No stock limit data available</p>
          )}
        </div>
        <div style={cardStyle}>
          <h3>Monthly Usage Reports</h3>
          {isValidData(usageData) ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="usage" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>No usage report data available</p>
          )}
        </div>
      </div>

      {/* User Management */}
      <div style={cardsContainerStyle}>
        <div style={cardStyle}>
          <h3>User Management</h3>
          <div style={usersContainerStyle}>
            {users.length > 0 ? (
              users.map((user) => (
                <div key={user._id}>
                  <p>{user.name} - {user.role} - {user.status}</p>
                </div>
              ))
            ) : (
              <p>No users available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
