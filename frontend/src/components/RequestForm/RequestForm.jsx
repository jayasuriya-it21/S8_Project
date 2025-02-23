import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RequestForm.css";

const RequestForm = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
    purpose: "",
    isReturnable: false,
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedProduct = products.find((p) => p._id === formData.productId);
    if (parseInt(formData.quantity) > selectedProduct.stockRemaining) {
      alert("Requested quantity exceeds available stock!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/requests",
        { ...formData, requestDate: new Date().toISOString() },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Request submitted successfully!");
      setFormData({
        productId: "",
        quantity: "",
        purpose: "",
        isReturnable: false,
        fromDate: "",
        toDate: "",
      });
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request.");
    }
  };

  return (
    <div className="request-form-container">
      <div className="request-form-card">
        <h2>Request a Product</h2>
        <form onSubmit={handleSubmit} className="request-form">
          <select
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            required
            className="form-input"
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} ({product.stockRemaining} available)
              </option>
            ))}
          </select>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            required
            className="form-input"
            min="1"
          />
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            placeholder="Purpose of Request"
            required
            className="form-textarea"
          />
          <label>
            <input
              type="checkbox"
              name="isReturnable"
              checked={formData.isReturnable}
              onChange={handleChange}
            />
            Returnable Item
          </label>
          <input
            type="date"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
            required
            className="form-input"
          />
          {formData.isReturnable && (
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              required
              className="form-input"
            />
          )}
          <button type="submit" className="submit-btn">Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;