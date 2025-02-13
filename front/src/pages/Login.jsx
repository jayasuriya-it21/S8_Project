import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Mock authentication (Replace with API validation)
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("role", "admin");
      navigate("/dashboard"); // Redirect to Admin Dashboard
    } else if (email === "user@gmail.com" && password === "user123") {
      localStorage.setItem("role", "user");
      navigate("/userdashboard"); // Redirect to User Dashboard
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form onSubmit={handleLogin} style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "white" }}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
