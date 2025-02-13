import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ReportsAndAnalysis = () => {
  const [stockLimitData, setStockLimitData] = useState([]);
  const [usageData, setUsageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stockLimitRes, usageRes] = await Promise.all([
          axios.get("/api/stock-limit"),
          axios.get("/api/usage-reports"),
        ]);

        setStockLimitData(Array.isArray(stockLimitRes.data) ? stockLimitRes.data : []);
        setUsageData(Array.isArray(usageRes.data) ? usageRes.data : []);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load reports. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const reportStyle = {
    marginLeft: "270px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  };

  const chartsContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  };

  const cardStyle = {
    background: "#fff",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    width: "48%",
    textAlign: "center",
    minHeight: "350px",
  };

  if (loading) return <p style={{ textAlign: "center", fontSize: "18px" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div style={reportStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Reports & Analysis</h2>

      <div style={chartsContainerStyle}>
        <div style={cardStyle}>
          <h3>Stock Limit Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stockLimitData.length ? stockLimitData : [{ date: "N/A", stockLimit: 0 }]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="stockLimit" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={cardStyle}>
          <h3>Monthly Usage Reports</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={usageData.length ? usageData : [{ month: "N/A", usage: 0 }]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="usage" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ReportsAndAnalysis;
