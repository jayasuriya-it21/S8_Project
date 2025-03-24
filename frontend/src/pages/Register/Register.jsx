import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    password: "",
    adminKey: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, phone, department, password } = formData;

    if (!name || !email || !phone || !department || !password) {
      alert("All required fields must be filled.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Registration successful! Please log in.");
      console.log("Registered as:", response.data.role); // Debug role
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error.response?.data || error);
      alert(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-heading">Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="register-input"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="register-input"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="register-input"
            required
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="register-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="register-input"
            required
          />
          <input
            type="text"
            name="adminKey"
            placeholder="Admin Key (optional)"
            value={formData.adminKey}
            onChange={handleChange}
            className="register-input"
          />
          <button type="submit" className="register-btn">Register</button>
        </form>
        <p className="register-switch-text">
          Already have an account? <a href="/login" className="register-link">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;