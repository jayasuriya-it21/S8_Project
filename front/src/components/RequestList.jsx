import React, { useState } from 'react';

// Inline styling for request list and table layout
const requestListStyle = {
  padding: '20px',
  marginLeft: '250px', // To create space for the sidebar
  backgroundColor: '#f4f4f4',
  minHeight: '100vh',
  fontFamily: 'Arial, sans-serif',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
};

const tableHeaderStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '10px 0',
  textAlign: 'center',
};

const tableCellStyle = {
  padding: '10px',
  textAlign: 'center',
  borderBottom: '1px solid #ddd',
};

const actionButtonStyle = {
  padding: '6px 12px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  margin: '0 5px',
  transition: 'background-color 0.3s ease',
};

const rejectButtonStyle = {
  ...actionButtonStyle,
  backgroundColor: '#f44336', // Red for Reject
};

const deleteButtonStyle = {
  ...actionButtonStyle,
  backgroundColor: '#9E9E9E', // Gray for Delete
};

const RequestList = () => {
  const [requests, setRequests] = useState([
    { username: 'John Doe', product: 'Laptop', quantity: 2, returned: 'Non-returned', date: '2025-02-12 14:30', action: '' },
    { username: 'Jane Smith', product: 'Monitor', quantity: 1, returned: 'Returned', date: '2025-02-13 09:20', action: '' },
  ]); // Sample data for requests

  const handleApprove = (index) => {
    const updatedRequests = [...requests];
    updatedRequests[index].action = 'Approved';
    setRequests(updatedRequests);
  };

  const handleReject = (index) => {
    const updatedRequests = [...requests];
    updatedRequests[index].action = 'Rejected';
    setRequests(updatedRequests);
  };

  const handleDelete = (index) => {
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1); // Delete request permanently
    setRequests(updatedRequests);
  };

  return (
    <div style={requestListStyle}>
      <h3>Request List</h3>

      {/* Table to display the requests */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Username</th>
            <th style={tableHeaderStyle}>Product</th>
            <th style={tableHeaderStyle}>Quantity</th>
            <th style={tableHeaderStyle}>Date & Time</th>
            <th style={tableHeaderStyle}>Type of Item (Returned / Non-returned)</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>{request.username}</td>
              <td style={tableCellStyle}>{request.product}</td>
              <td style={tableCellStyle}>{request.quantity}</td>
              <td style={tableCellStyle}>{request.date}</td>
              <td style={tableCellStyle}>{request.returned}</td> {/* Direct display of user input */}
              <td style={tableCellStyle}>
                {request.action ? (
                  <span>{request.action}</span>
                ) : (
                  <>
                    <button 
                      style={actionButtonStyle} 
                      onClick={() => handleApprove(index)}>
                      Approve
                    </button>
                    <button 
                      style={rejectButtonStyle} 
                      onClick={() => handleReject(index)}>
                      Reject
                    </button>
                    <button 
                      style={deleteButtonStyle} 
                      onClick={() => handleDelete(index)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestList;
