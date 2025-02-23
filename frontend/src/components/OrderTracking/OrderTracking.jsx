import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBox, FaTruck, FaCheckCircle } from "react-icons/fa";
import "./OrderTracking.css";

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const endpoint = role === "admin" ? "/api/requests" : "/api/requests/user";
        const res = await axios.get(`http://localhost:5000${endpoint}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setOrders(res.data.filter((order) => order.status === "Approved"));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [role]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/requests/${id}`,
        { trackingStatus: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setOrders(orders.map((order) => (order._id === id ? { ...order, trackingStatus: newStatus } : order)));
      if (selectedOrder && selectedOrder._id === id) {
        setSelectedOrder({ ...selectedOrder, trackingStatus: newStatus });
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Shipped":
        return <FaTruck className="status-icon shipped" />;
      case "Delivered":
        return <FaCheckCircle className="status-icon delivered" />;
      default:
        return <FaBox className="status-icon pending" />;
    }
  };

  return (
    <div className="order-tracking">
      <h2 className="tracking-title">Order Tracking</h2>
      <div className="tracking-container">
        <div className="order-list">
          {orders.map((order) => (
            <div
              key={order._id}
              className={`order-card ${selectedOrder?._id === order._id ? "selected" : ""}`}
              onClick={() => setSelectedOrder(order)}
            >
              <div className="order-header">
                {getStatusIcon(order.trackingStatus || "Pending")}
                <h3>Order #{order._id.slice(-6)}</h3>
              </div>
              <p><strong>Product:</strong> {order.productId.name}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Status:</strong> {order.trackingStatus || "Pending"}</p>
              {role === "admin" && (
                <select
                  value={order.trackingStatus || "Pending"}
                  onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                  className="status-select"
                  onClick={(e) => e.stopPropagation()} // Prevents card click
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              )}
            </div>
          ))}
          {orders.length === 0 && (
            <div className="no-orders">No approved orders to track yet.</div>
          )}
        </div>
        <div className="tracking-details">
          {selectedOrder ? (
            <div className="details-card">
              <h3 className="details-title">Order #{selectedOrder._id.slice(-6)}</h3>
              <div className="details-info">
                <p><strong>Product:</strong> {selectedOrder.productId.name}</p>
                <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
                <p><strong>Requested On:</strong> {new Date(selectedOrder.requestDate).toLocaleString()}</p>
              </div>
              <div className="tracking-timeline">
                <div className={`timeline-step ${selectedOrder.trackingStatus === "Pending" ? "active" : "completed"}`}>
                  <FaBox className="timeline-icon" />
                  <span>Pending</span>
                </div>
                <div className={`timeline-step ${selectedOrder.trackingStatus === "Shipped" ? "active" : selectedOrder.trackingStatus === "Delivered" ? "completed" : ""}`}>
                  <FaTruck className="timeline-icon" />
                  <span>Shipped</span>
                </div>
                <div className={`timeline-step ${selectedOrder.trackingStatus === "Delivered" ? "active" : ""}`}>
                  <FaCheckCircle className="timeline-icon" />
                  <span>Delivered</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="details-placeholder">Select an order to view tracking details</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;