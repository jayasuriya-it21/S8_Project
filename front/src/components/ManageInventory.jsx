import React, { useEffect, useState } from "react";

const ManageInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingItem, setEditingItem] = useState(null); // ID of the item being edited
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 0,
    price: 0,
    stockRemaining: 0,
    lastUpdated: new Date().toLocaleString(),
  });

  useEffect(() => {
    // Sample Inventory Data
    setInventory([
      { _id: "1", name: "Laptop", quantity: 50, price: 500, lastUpdated: new Date().toLocaleString(), stockRemaining: 50 },
      { _id: "2", name: "Chair", quantity: 200, price: 30, lastUpdated: new Date().toLocaleString(), stockRemaining: 200 },
      { _id: "3", name: "Shirt", quantity: 150, price: 15, lastUpdated: new Date().toLocaleString(), stockRemaining: 150 },
    ]);
  }, []);

  const handleDelete = (id) => {
    setInventory((prevInventory) => prevInventory.filter((item) => item._id !== id));
  };

  const handleEdit = (id) => {
    const itemToEdit = inventory.find((item) => item._id === id);
    setNewItem({ ...itemToEdit });
    setEditingItem(id); // Set the current editing item ID
  };

  const handleSave = () => {
    const updatedInventory = inventory.map((item) =>
      item._id === editingItem
        ? {
            ...item,
            lastUpdated: new Date().toLocaleString(),
            name: newItem.name,
            price: newItem.price,
            stockRemaining: newItem.stockRemaining,
            quantity: newItem.quantity,
          }
        : item
    );
    setInventory(updatedInventory);
    setEditingItem(null); // Stop editing
    setNewItem({ name: "", quantity: 0, price: 0, stockRemaining: 0 }); // Reset form
  };

  const handleAddProduct = () => {
    const newProduct = {
      _id: Math.random().toString(), // Generate a unique ID for the new item
      name: newItem.name,
      quantity: newItem.quantity,
      price: newItem.price,
      lastUpdated: new Date().toLocaleString(),
      stockRemaining: newItem.stockRemaining,
    };

    setInventory((prevInventory) => [...prevInventory, newProduct]);
    setNewItem({ name: "", quantity: 0, price: 0, stockRemaining: 0 }); // Reset the input fields after adding
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.price.toString().includes(searchQuery) ||
      item.stockRemaining.toString().includes(searchQuery)
  );

  return (
    <div style={{ padding: "20px", marginLeft: "270px" }}>
      <h3>Manage Inventory</h3>

      {/* Search Input */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name, price, or stock"
          value={searchQuery}
          onChange={handleSearch}
          style={{
            padding: "8px",
            width: "300px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            marginBottom: "10px",
          }}
        />
      </div>

      {/* Edit Product Form - Shows only when editing an item */}
      {editingItem && (
        <div style={{ marginBottom: "20px" }}>
          <h4>Update Product</h4>
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleNewItemChange}
            placeholder="Product Name"
            style={inputStyle}
          />
          <input
            type="number"
            name="quantity"
            value={newItem.quantity}
            onChange={handleNewItemChange}
            placeholder="Quantity"
            style={inputStyle}
          />
          <input
            type="number"
            name="price"
            value={newItem.price}
            onChange={handleNewItemChange}
            placeholder="Price"
            style={inputStyle}
          />
          <input
            type="number"
            name="stockRemaining"
            value={newItem.stockRemaining}
            onChange={handleNewItemChange}
            placeholder="Stock Remaining"
            style={inputStyle}
          />
          <button
            onClick={handleSave}
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Update Product
          </button>
        </div>
      )}

      {/* Add New Product Form */}
      {!editingItem && (
        <div style={{ marginBottom: "20px" }}>
          <h4>Add New Product</h4>
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleNewItemChange}
            placeholder="Product Name"
            style={inputStyle}
          />
          <input
            type="number"
            name="quantity"
            value={newItem.quantity}
            onChange={handleNewItemChange}
            placeholder="Quantity"
            style={inputStyle}
          />
          <input
            type="number"
            name="price"
            value={newItem.price}
            onChange={handleNewItemChange}
            placeholder="Price"
            style={inputStyle}
          />
          <input
            type="number"
            name="stockRemaining"
            value={newItem.stockRemaining}
            onChange={handleNewItemChange}
            placeholder="Stock Remaining"
            style={inputStyle}
          />
          <button
            onClick={handleAddProduct}
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add Product
          </button>
        </div>
      )}

      {/* Inventory Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
            <th style={tableHeaderStyle}>Item Name</th>
            <th style={tableHeaderStyle}>Quantity</th>
            <th style={tableHeaderStyle}>Price</th>
            <th style={tableHeaderStyle}>Stock Remaining</th>
            <th style={tableHeaderStyle}>Last Updated</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.length > 0 ? (
            filteredInventory.map((item) => (
              <tr key={item._id} style={tableRowStyle}>
                <td style={tableCellStyle}>{item.name}</td>
                <td style={tableCellStyle}>{item.quantity}</td>
                <td style={tableCellStyle}>${item.price}</td>
                <td style={tableCellStyle}>{item.stockRemaining}</td>
                <td style={tableCellStyle}>{item.lastUpdated}</td>
                <td style={tableCellStyle}>
                  <button
                    onClick={() => handleEdit(item._id)}
                    style={editButtonStyle}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={deleteButtonStyle}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "10px" }}>No matching items found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle = { padding: "10px", borderBottom: "2px solid #ddd" };
const tableRowStyle = { borderBottom: "1px solid #ddd" };
const tableCellStyle = { padding: "10px" };
const inputStyle = { padding: "8px", marginBottom: "10px", width: "300px", borderRadius: "4px", border: "1px solid #ddd" };
const editButtonStyle = { backgroundColor: "#4CAF50", color: "#fff", padding: "5px 10px", border: "none", borderRadius: "4px", cursor: "pointer", marginRight: "10px" };
const deleteButtonStyle = { backgroundColor: "#f44336", color: "#fff", padding: "5px 10px", border: "none", borderRadius: "4px", cursor: "pointer" };

export default ManageInventory;
