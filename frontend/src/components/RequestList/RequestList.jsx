import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RequestList.css";

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

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
    if (action === "Rejected") {
      setCurrentRequestId(id);
      setShowRejectModal(true);
      return;
    }

    try {
      const updateData = { status: action };
      await axios.put(
        `http://localhost:5000/api/requests/${id}`,
        updateData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      const updatedRequests = requests.map((req) =>
        req._id === id ? { ...req, status: action } : req
      );
      setRequests(updatedRequests);
      alert(`Request ${action.toLowerCase()} successfully!`);
    } catch (error) {
      console.error("Error updating request:", error);
      alert("Failed to update request.");
    }
  };

  const handleRejectSubmit = async () => {
    if (!rejectReason.trim()) {
      alert("Please enter a rejection reason.");
      return;
    }

    try {
      const updateData = { 
        status: "Rejected",
        rejectionReason: rejectReason 
      };
      await axios.put(
        `http://localhost:5000/api/requests/${currentRequestId}`,
        updateData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      const updatedRequests = requests.map((req) =>
        req._id === currentRequestId 
          ? { ...req, status: "Rejected", rejectionReason: rejectReason }
          : req
      );
      setRequests(updatedRequests);
      alert("Request rejected successfully!");
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("Failed to reject request.");
    } finally {
      setShowRejectModal(false);
      setRejectReason("");
      setCurrentRequestId(null);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset page after search
  };

  const displayedRequests = requests.filter((req) => {
    const matchesSearch =
      (req.userId?.username?.toLowerCase() || "").includes(searchQuery) ||
      (req.productId?.name?.toLowerCase() || "").includes(searchQuery) ||
      (req._id?.toLowerCase() || "").includes(searchQuery);

    const matchesStatus = 
      statusFilter === "All" || req.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(displayedRequests.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRequests = displayedRequests.slice(startIndex, startIndex + rowsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="request-list">
      <div className="request-list-header">
        <h2>Request List</h2>
        <div className="filters">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by username or product"
            className="search-input"
          />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="status-filter"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>
      
      <RequestTable requests={paginatedRequests} handleAction={handleAction} />

      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          className="pagination-btn"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className="pagination-btn"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {showRejectModal && (
        <div className="reject-modal">
          <div className="reject-modal-content">
            <h3>Reason for Rejection</h3>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              rows="4"
            />
            <div className="modal-buttons">
              <button onClick={handleRejectSubmit} className="approve-btn">
                Submit
              </button>
              <button 
                onClick={() => setShowRejectModal(false)} 
                className="reject-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const formatOrderId = (id) => {
  const shortId = id.slice(-6);
  return `ORD-${shortId.toUpperCase()}`;
};

const RequestTable = ({ requests, handleAction }) => (
  <table className="request-table">
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Username</th>
        <th>Product</th>
        <th>Quantity</th>
        <th>Purpose</th>
        <th>Returnable</th>
        <th>From Date</th>
        <th>To Date</th>
        <th>Request Date</th>
        <th>Status</th>
        <th>Rejection Reason</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {requests.length > 0 ? (
        requests.map((request) => (
          <tr key={request._id}>
            <td>{formatOrderId(request._id)}</td>
            <td>{request.userId?.username || "Unknown"}</td>
            <td>{request.productId?.name || "Unknown"}</td>
            <td>{request.quantity}</td>
            <td>{request.purpose}</td>
            <td>{request.isReturnable ? "Yes" : "No"}</td>
            <td>{new Date(request.fromDate).toLocaleDateString()}</td>
            <td>{request.isReturnable ? new Date(request.toDate).toLocaleDateString() : "N/A"}</td>
            <td>{new Date(request.requestDate).toLocaleString()}</td>
            <td>{request.status}</td>
            <td>{request.status === "Rejected" ? request.rejectionReason || "Not specified" : "N/A"}</td>
            <td>
              <div className="action-buttons">
                {request.status !== "Pending" && (
                  <button onClick={() => handleAction(request._id, "Pending")} className="pending-btn">
                    Pending
                  </button>
                )}
                {request.status !== "Approved" && (
                  <button onClick={() => handleAction(request._id, "Approved")} className="approve-btn">
                    Approve
                  </button>
                )}
                {request.status !== "Rejected" && (
                  <button onClick={() => handleAction(request._id, "Rejected")} className="reject-btn">
                    Reject
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="12" style={{ textAlign: "center", padding: "20px", color: "#7f8c8d" }}>
            No requests found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

export default RequestList;
