import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RequestList.css";

const RequestList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/requests", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setRequests(res.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await axios.put(
        `http://localhost:5000/api/requests/${id}`,
        { status: action },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setRequests(requests.map((req) => (req._id === id ? { ...req, status: action } : req)));
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  const approvedRequests = requests.filter((req) => req.status === "Approved");
  const rejectedRequests = requests.filter((req) => req.status === "Rejected");
  const pendingRequests = requests.filter((req) => req.status === "Pending");

  return (
    <div className="request-list">
      <h3>Pending Requests</h3>
      <RequestTable requests={pendingRequests} handleAction={handleAction} />
      <h3>Approved Requests</h3>
      <RequestTable requests={approvedRequests} handleAction={handleAction} />
      <h3>Rejected Requests</h3>
      <RequestTable requests={rejectedRequests} handleAction={handleAction} />
    </div>
  );
};

const RequestTable = ({ requests, handleAction }) => (
  <table className="request-table">
    <thead>
      <tr>
        <th>Username</th>
        <th>Product</th>
        <th>Quantity</th>
        <th>Purpose</th>
        <th>Returnable</th>
        <th>From Date</th>
        <th>To Date</th>
        <th>Request Date</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {requests.map((request) => (
        <tr key={request._id}>
          <td>{request.userId.username}</td>
          <td>{request.productId.name}</td>
          <td>{request.quantity}</td>
          <td>{request.purpose}</td>
          <td>{request.isReturnable ? "Yes" : "No"}</td>
          <td>{new Date(request.fromDate).toLocaleDateString()}</td>
          <td>{request.isReturnable ? new Date(request.toDate).toLocaleDateString() : "N/A"}</td>
          <td>{new Date(request.requestDate).toLocaleString()}</td>
          <td>{request.status}</td>
          <td>
            {request.status === "Pending" && (
              <>
                <button onClick={() => handleAction(request._id, "Approved")} className="approve-btn">Approve</button>
                <button onClick={() => handleAction(request._id, "Rejected")} className="reject-btn">Reject</button>
              </>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default RequestList;