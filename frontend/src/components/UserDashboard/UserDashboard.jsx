import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="user-dashboard">
      <h2>Welcome, User</h2>
      <div className="dashboard-section">
        <h3>Available Products</h3>
        <ul className="product-list">
          {products.map((product) => (
            <li key={product._id} className="product-item">
              {product.name} - {product.stockRemaining} pcs - <a href="/request-product">Request</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="dashboard-section">
        <h3>Your Orders</h3>
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
                <td>{order._id}</td>
                <td>{order.productId.name}</td>
                <td>{order.quantity}</td>
                <td>{order.status}</td>
                <td><a href="/order-tracking">Track</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;