import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/ManageAds.css';

export default function ManageAds() {
    const [advertisements, setAdvertisements] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State variable for search query

    useEffect(() => {
        getAdvertisements();
    }, []);

    const getAdvertisements = async () => {
        try {
            const response = await axios.get("http://localhost:8070/advertisement/");
            setAdvertisements(response.data);
        } catch (error) {
            alert(error.message);
        }
    };

    // Filtering advertisements based on search query and email field
    const filteredAdvertisements = advertisements.filter(advertisement =>
        advertisement.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/advertisement/mdelete/${id}`);
            alert("Advertisement deleted successfully");
            getAdvertisements();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleApprove = async (id) => {
        try {
            await axios.put(`http://localhost:8070/advertisement/approve/${id}`);
            alert("Advertisement approved successfully");
            getAdvertisements();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.put(`http://localhost:8070/advertisement/reject/${id}`);
            alert("Advertisement rejected successfully");
            getAdvertisements();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className='container'>
            {/* Search bar */}
            <input
                type="text"
                placeholder="Search by email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />

            <h1>All Advertisements</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Duration</th>
                        <th>Publish Date</th>
                        <th>Content</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAdvertisements.map(advertisement => (
                        <tr key={advertisement._id}>
                            <td>{advertisement.title}</td>
                            <td>{advertisement.description}</td>
                            <td>{advertisement.email}</td>
                            <td>{advertisement.contact}</td>
                            <td>{advertisement.duration}</td>
                            <td>{new Date(advertisement.publishDate).toLocaleDateString()}</td>
                            <td>
                                {advertisement.content.map((imagePath, index) => (
                                    <img key={index} src={`http://localhost:8070/${imagePath}`} alt={`Image ${index + 1}`} style={{ width: '100px', height: 'auto', marginRight: '5px' }} />
                                ))}
                            </td>
                            <td>{advertisement.status}</td>
                            <td>
                                {advertisement.status !== "Paid" && (
                                <>
                                    <Link to={`/mupdate/${advertisement._id}`} className="btn btn-primary" style={{ marginBottom: '10px' }}>Update</Link>
                                </>
                                )}
                                <Link to={`/mdelete/${advertisement._id}`} className="btn btn-danger ml-2" style={{ marginBottom: '10px' }} >Delete</Link>
                                {(advertisement.status !== "Paid" && advertisement.status !== "Pending") && (
                                    <>
                                        <button className="btn btn-success ml-2" onClick={() => handleApprove(advertisement._id)}>Approve</button>
                                        <button className="btn btn-warning ml-2" onClick={() => handleReject(advertisement._id)}>Reject</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
