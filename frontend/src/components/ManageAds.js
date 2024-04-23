import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/ManageAds.css'; // Adjust the import path

export default function ManageAds() {
    const [advertisements, setAdvertisements] = useState([]);

    // Define getAdvertisements function
    const getAdvertisements = async () => {
        try {
            const response = await axios.get("http://localhost:8070/advertisement/");
            setAdvertisements(response.data);
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        // Call getAdvertisements function inside useEffect
        getAdvertisements();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/advertisement/mdelete/${id}`);
            alert("Advertisement deleted successfully");
            // Optionally, you can refresh the advertisement list after deletion
            getAdvertisements(); // Call getAdvertisements to refresh the list
        } catch (error) {
            alert(error.message);
        }
    };

    const handleApprove = async (id) => {
        try {
            // Your code to send a request to approve the advertisement
            alert("Advertisement approved successfully");
            // Refresh the advertisement list after approval
            getAdvertisements(); // Call getAdvertisements to refresh the list
        } catch (error) {
            alert(error.message);
        }
    };

    const handleReject = async (id) => {
        try {
            // Your code to send a request to reject the advertisement
            alert("Advertisement rejected successfully");
            // Refresh the advertisement list after rejection
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
                                <Link to={`/mupdate/${advertisement._id}`} className="btn btn-primary">Update</Link>
                                <Link to={`/mdelete/${advertisement._id}`} className="btn btn-danger ml-2">Delete</Link> {/* Navigate to DeleteAd.js */}
                                <button className="btn btn-success ml-2" onClick={() => handleApprove(advertisement._id)}>Approve</button>
                                <button className="btn btn-warning ml-2" onClick={() => handleReject(advertisement._id)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
