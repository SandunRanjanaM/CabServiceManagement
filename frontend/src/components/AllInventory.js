//AllInventory.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AllInventory() {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);

    const getInventory = () => {
        axios.get("http://localhost:8070/inventory/list")
            .then(response => {
                setInventory(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching inventory:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getInventory();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">All Inventory Items</h2>
            {loading ? (
                <div className="text-center">
                    <p>Loading...</p>
                </div>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map(item => (
                            <tr key={item._id}>
                                <td>{item.itemName}</td>
                                <td>{item.quantity}</td>
                                <td>{item.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
