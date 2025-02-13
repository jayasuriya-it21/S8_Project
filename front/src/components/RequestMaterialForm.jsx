import React, { useState } from 'react';

const formStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const inputStyle = {
  padding: '10px',
  marginBottom: '10px',
  width: '100%',
  borderRadius: '4px',
  border: '1px solid #ddd',
};

const submitButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const RequestMaterialForm = () => {
  const [material, setMaterial] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Material Requested: ${material}`);
  };

  return (
    <div style={formStyle}>
      <h3>Request Material</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter material name"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={submitButtonStyle}>Submit Request</button>
      </form>
    </div>
  );
};

export default RequestMaterialForm;
