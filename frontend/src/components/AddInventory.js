import React, { useState } from "react";
import axios from 'axios';

const AddInventory = () => {
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newItem = { itemName, quantity, category, price };
            await axios.post('http://localhost:8091/inventory/add', newItem);
            alert('Item added successfully!');
            // Clear input fields after successful addition
            setItemName("");
            setQuantity(0);
            setCategory("");
            setPrice(0);
        } catch (error) {
            console.error('Error adding item:', error);
            alert('Failed to add item. Please try again.');
        }
    };

    // Ensure quantity is non-negative
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (newQuantity >= 0) {
            setQuantity(newQuantity);
        }
    };

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>Add Inventory Item</h2>
            <form onSubmit={handleSubmit}>
                <label style={labelStyle}>Item Name:</label>
                <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} style={inputStyle} required />
                
                <label style={labelStyle}>Quantity:</label>
                <input type="number" value={quantity} onChange={handleQuantityChange} style={inputStyle} required />
                
                <label style={labelStyle}>Category:</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle} required />
                
                <label style={labelStyle}>Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} style={inputStyle} required />
                
                <button type="submit" style={buttonStyle}>Add Item</button>
            </form>
        </div>
    );
};

// Internal CSS styles
const containerStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px', // Adjust the value as needed
  };
  

const titleStyle = {
  fontSize: '1.5rem',
  marginBottom: '20px',
  color: '#333',
  textAlign: 'center',
  paddingRight: '150px',

};

const labelStyle = {
  fontWeight: 'bold',
  marginBottom: '8px',
  color: '#555',
};

const inputStyle = {
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '100%',
  fontSize: '1rem',
};

const buttonStyle = {
  padding: '12px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  width: '100%',
  fontSize: '1rem',
  marginTop: '20px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
};

export default AddInventory;
