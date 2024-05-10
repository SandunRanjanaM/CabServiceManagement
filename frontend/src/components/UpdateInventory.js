// AddInventory.js

import React, { useState, useEffect } from "react";
import axios from 'axios';
import './AddInventory.css'; // Import the CSS file

export default function AddInventory() {
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [editingItemId, setEditingItemId] = useState(null); // For tracking the item being edited
    const [inventory, setInventory] = useState([]); // For storing the inventory items

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = () => {
        axios.get('http://localhost:8091/inventory/list')
            .then(res => {
                setInventory(res.data);
            })
            .catch(error => {
                console.error('Error fetching inventory:', error);
                alert('Failed to fetch inventory. Please try again.');
            });
    };

    const handleEdit = (item) => {
        setEditingItemId(item._id);
        setItemName(item.itemName);
        setQuantity(item.quantity);
        setCategory(item.category);
        setPrice(item.price);
    };

    const handleDelete = (itemId) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            axios.delete(`http://localhost:8091/inventory/delete/${itemId}`)
                .then(res => {
                    console.log(res.data);
                    alert('Item deleted successfully!');
                    fetchInventory(); // Refresh inventory list
                })
                .catch(error => {
                    console.error('Error deleting item:', error);
                    alert('Failed to delete item. Please try again.');
                });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newItem = { itemName, quantity, category, price };

        if (editingItemId) {
            axios.put(`http://localhost:8091/inventory/update/${editingItemId}`, newItem)
                .then(res => {
                    console.log(res.data);
                    alert('Item updated successfully!');
                    setEditingItemId(null);
                })
                .catch(error => {
                    console.error('Error updating item:', error);
                    alert('Failed to update item. Please try again.');
                });
        } else {
            axios.post('http://localhost:8091/inventory/add', newItem)
                .then(res => {
                    console.log(res.data);
                    alert('Item added successfully!');
                })
                .catch(error => {
                    console.error('Error adding item:', error);
                    alert('Failed to add item. Please try again.');
                });
        }

        // Clear input fields
        setItemName("");
        setQuantity(0);
        setCategory("");
        setPrice(0);

        // Refresh inventory list
        fetchInventory();
    };

    return (
        <div className="add-inventory">
            <div className="manage-inventory">
                <h2 className="text-center">Manage Inventory Items</h2>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="itemName" className="form-label">Item Name</label>
                                <input type="text" className="form-control" id="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="quantity" className="form-label">Quantity</label>
                                <input type="number" className="form-control" id="quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Category</label>
                                <input type="text" className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">{editingItemId ? "Update Item" : "Add Item"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="inventory-list">
                <h2 className="text-center">Inventory List</h2>
                <div>
                    <ul className="list-group">
                        {inventory.map(item => (
                            <li key={item._id} className="list-group-item">
                                <span><strong>Name:</strong> {item.itemName}</span><br />
                                <span><strong>Quantity:</strong> {item.quantity}</span><br />
                                <span><strong>Category:</strong> {item.category}</span><br />
                                <span><strong>Price:</strong> ${item.price.toFixed(2)}</span>
                                <div className="btn-group">
                                    <button className="btn btn-info" onClick={() => handleEdit(item)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
