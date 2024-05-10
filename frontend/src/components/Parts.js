import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import posterImage from '../img/poster2.jpg'; // Import the poster image
import { CartContext } from './CartContext'; // Import the CartContext
import './part.css';

export default function AllInventory() {
    const [inventory, setInventory] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { addToCart } = useContext(CartContext); // Access addToCart function from CartContext

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

    const handleAddToCart = (item) => {
        addToCart(item); // Call addToCart function with the item to add it to the cart
        const itemName = item.itemName;
        alert(`${itemName} added to cart!`); // Display pop-up message
        console.log(`Item added to cart: ${itemName}`);
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredInventory = inventory.filter(item => {
        return item.itemName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <section className="parts-container container">
            <div className="poster">
                <img src={posterImage} alt="Car Parts" />
                <div className="content">
                    <h1>Enhance Your Vehicle's Performance</h1>
                    <p>Explore our collection of premium aftermarket car parts.</p>
                    <button className="btn btn-primary">Shop Now</button>
                </div>
            </div>
            <div className="all-inventory">
                <h2 className="inventory-title">All Inventory Items</h2>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        className="search-input"
                    />
                </div>
                <ul className="inventory-list">
                    {filteredInventory.map(item => (
                        <li key={item._id} className="inventory-item">
                            <div className="item-details">
                                <p><strong>Name:</strong> {item.itemName}</p>
                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                <p><strong>Price:</strong> {item.price}</p>
                                <p><strong>Category:</strong> {item.category}</p>
                            </div>
                            <button className="btn add-to-cart-btn" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
