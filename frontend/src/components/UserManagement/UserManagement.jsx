import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(res.data);
    } catch (err) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      setError("Failed to delete user");
      console.error("Error deleting user:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (id) => {
    const userToUpdate = users.find((user) => user._id === id);
    const newStatus = userToUpdate.status === "Active" ? "Blocked" : "Active";
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setUsers(users.map((user) => (user._id === id ? res.data : user)));
    } catch (err) {
      setError("Failed to update user status");
      console.error("Error updating user status:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.phone && user.phone.includes(searchQuery)) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function getNumbersFromString(str) {
    return str.match(/\d+/g)?.join('') || '';
  }


  // Format User ID to resemble PAN card (e.g., ABCDE1234F)
  const formatUserId = (id) => {
    if (!id || id.length < 10) return id; // Fallback for invalid IDs
    // const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";
    const part1 = Array(3)
      .fill()
      .map(() => digits[Math.floor(Math.random() * digits.length)])
      .join("");
    const part2 = id.slice(-3); // Last 4 digits of MongoDB _id
    const part3 = digits[Math.floor(Math.random() * digits.length)];
    const part4 = getNumbersFromString(id).slice(-3); // Last 4 digits of MongoDB _id
    return `BIT-US-${part4}`.toUpperCase();
  };

  return (
    <div className="user-management">
      <div className="user-management-header">
        <h2 className="user-management-title">User Management</h2>
        <input
          type="text"
          placeholder="Search by Name, Email, Phone, or Department"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {loading && <div className="loading-overlay">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      <table className="user-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="user-id">{formatUserId(user._id)}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone || "N/A"}</td>
                <td>{user.department}</td>
                <td className={user.status === "Active" ? "status-active" : "status-blocked"}>
                  {user.status}
                </td>
                <td>
                  <button onClick={() => deleteUser(user._id)} className="delete-btn" disabled={loading}>
                    Delete
                  </button>
                  {/* <button
                    onClick={() => toggleUserStatus(user._id)}
                    className={user.status === "Active" ? "block-btn" : "unblock-btn"}
                    disabled={loading}
                  >
                    {user.status === "Active" ? "Block" : "Unblock"}
                  </button> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-users">
                No matching users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;