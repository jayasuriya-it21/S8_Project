// src/components/AdminRequests.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function AdminRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      const res = await axios.get("http://localhost:5000/requests");
      setRequests(res.data);
    }
    fetchRequests();
  }, []);

  const handleStatusChange = async (id, status) => {
    await axios.put(`http://localhost:5000/requests/${id}`, { status });
    setRequests(requests.map((req) => (req._id === id ? { ...req, status } : req)));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Manage Requests</h2>
      <ul className="space-y-2">
        {requests.map((req) => (
          <li key={req._id} className="p-3 bg-gray-100 rounded flex justify-between items-center">
            <span>{req.material} - {req.quantity} pcs - <span className="text-blue-600">{req.status}</span></span>
            <div className="space-x-2">
              <button onClick={() => handleStatusChange(req._id, "Approved")} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">Approve</button>
              <button onClick={() => handleStatusChange(req._id, "Rejected")} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Reject</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminRequests;
