import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer, Cell } from "recharts";
import "./YourOrders.css";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const YourOrders = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [orderTrendData, setOrderTrendData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userName, setUserName] = useState(""); // New state for username
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve username from localStorage
    const storedName = localStorage.getItem("userName");
    setUserName(storedName || "User"); // Fallback to "User" if not found

    const fetchData = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          axios.get("http://localhost:5000/api/products", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
          axios.get("http://localhost:5000/api/requests/user", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
        ]);
        setProducts(productsRes.data);
        setOrders(ordersRes.data);

        const requestStats = [
          { name: "Pending", value: ordersRes.data.filter(r => r.status === "Pending").length, fill: "#f39c12" },
          { name: "Approved", value: ordersRes.data.filter(r => r.status === "Approved").length, fill: "#00b894" },
          { name: "Rejected", value: ordersRes.data.filter(r => r.status === "Rejected").length, fill: "#e84393" },
        ];
        setRequestData(requestStats);

        const trendData = ordersRes.data.reduce((acc, order) => {
          const date = new Date(order.requestDate).toLocaleDateString();
          const existing = acc.find(item => item.date === date);
          if (existing) {
            existing.orders += 1;
          } else {
            acc.push({ date, orders: 1 });
          }
          return acc;
        }, []).sort((a, b) => new Date(a.date) - new Date(b.date));
        setOrderTrendData(trendData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeImagePopup = () => {
    setSelectedImage(null);
  };

  const formatOrderId = (id) => {
    const shortId = id.slice(-6);
    return `ORD-${shortId.toUpperCase()}`;
  };

  const handleTrackClick = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  return (
    <div className="user-dashboard">
      
      <div className="dashboard-container">

        {/* Orders Section */}
        <div className="dashboard-section">
          <h3 className="section-title">Your Orders</h3>
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Track</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{formatOrderId(order._id)}</td>
                  <td>{order.productId?.name || "Unknown"}</td>
                  <td>{order.quantity}</td>
                  <td>{order.status}</td>
                  {/* <td>
                    <a href={`/order-details/${order._id}`} className="track-link">Track</a>
                  </td> */}
                  <td>
                    <button
                      onClick={() => handleTrackClick(order._id)}
                      className="track-btn"
                    >
                      <FaEye /> Track
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div className="image-modal-overlay" onClick={closeImagePopup}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={`data:image/jpeg;base64,${selectedImage}`}
              alt="Large Product View"
              className="large-product-image"
            />
            <button onClick={closeImagePopup} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourOrders;