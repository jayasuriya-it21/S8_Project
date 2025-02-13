import React, { useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '9876543210', department: 'IT', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '8765432109', department: 'HR', status: 'Blocked' }
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', department: '', status: 'Active' });
  const [searchQuery, setSearchQuery] = useState('');

  // Add User Function
  const addUser = () => {
    if (newUser.name && newUser.email && newUser.phone && newUser.department) {
      setUsers([...users, { id: users.length + 1, ...newUser }]);
      setNewUser({ name: '', email: '', phone: '', department: '', status: 'Active' });
    }
  };

  // Delete User Function
  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // Block/Unblock User Function
  const toggleUserStatus = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: user.status === 'Active' ? 'Blocked' : 'Active' } : user
    ));
  };

  // Filter Users based on Search Query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>User Management</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Name, Email, Phone, or Department"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '20px' }}
      />

      {/* Add User Form */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '5px', flex: '1' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '5px', flex: '1' }}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '5px', flex: '1' }}
        />
        <input
          type="text"
          placeholder="Department"
          value={newUser.department}
          onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '5px', flex: '1' }}
        />
        <button
          onClick={addUser}
          style={{ padding: '8px 12px', border: 'none', backgroundColor: '#28a745', color: 'white', cursor: 'pointer', borderRadius: '5px' }}
        >
          Add User
        </button>
      </div>

      {/* User Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Phone</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Department</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Status</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user.id}>
                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{user.id}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{user.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{user.email}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{user.phone}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{user.department}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center', color: user.status === 'Active' ? 'green' : 'red' }}>
                  {user.status}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                  <button
                    onClick={() => deleteUser(user.id)}
                    style={{ backgroundColor: '#dc3545', color: 'white', padding: '6px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => toggleUserStatus(user.id)}
                    style={{ backgroundColor: user.status === 'Active' ? 'orange' : 'blue', color: 'white', padding: '6px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                  >
                    {user.status === 'Active' ? 'Block' : 'Unblock'}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '10px', color: 'red' }}>No matching users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
