import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/AllAds.css'; // Adjust the import path

export default function PayApprove() {
    const [advertisements, setAdvertisements] = useState([]);

    const getAdvertisements = async () => {
        try {
            const response = await axios.get("http://localhost:8070/advertisement/get");
            setAdvertisements(response.data);
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        getAdvertisements();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/advertisement/delete/${id}`);
            alert("Advertisement deleted successfully");
            // Optionally, you can refresh the advertisement list after deletion
        } catch (error) {
            alert(error.message);
        }
    };

    const handleConfirm = async (id) => {
        try {
            await axios.put(`http://localhost:8070/advertisement/confirm/${id}`);
            alert("Advertisement payment confirmed successfully");
            getAdvertisements(); // Call getAdvertisements to refresh the list
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className='container'>
            <h1>All Advertisements</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Content</th>
                        <th>Payment</th> {/* Add Status column */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {advertisements.map(advertisement => (
                        <tr key={advertisement._id}>
                            <td>{advertisement.title}</td>
                            <td>{advertisement.description}</td>
                            <td>{advertisement.email}</td>
                            <td>{advertisement.contact}</td>
                            <td>
                                {advertisement.content.map((imagePath, index) => (
                                    <img key={index} src={`http://localhost:8070/${imagePath}`} alt={`Image ${index + 1}`} style={{ width: '100px', height: 'auto', marginRight: '5px' }} />
                                ))}
                            </td>
                            <td>
                                {advertisement.payment.map((imagePath, index) => (
                                    <img key={index} src={`http://localhost:8070/${imagePath}`} alt={`Image ${index + 1}`} style={{ width: '100px', height: 'auto', marginRight: '5px' }} />
                                ))}
                            </td>
                            <td>
                                <button className="btn btn-danger ml-2" onClick={() => handleConfirm(advertisement._id)}>Confirm</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
