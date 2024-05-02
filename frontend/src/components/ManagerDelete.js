import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Importing useParams and useNavigate
import '../styles/ManagerDelete.css'; // Adjust the import path


export default function DeleteAdvertisement() {
    const { id } = useParams(); // Using useParams hook to get the advertisement ID from the URL
    const navigate = useNavigate(); // Using useNavigate hook to access navigation functionality

    const [advertisement, setAdvertisement] = useState({
        title: "",
        description: "",
        email: "",
        contact: "",
        duration: "",
        publishDate: "",
        content: []
    });

    useEffect(() => {
        async function getAdvertisement() {
            try {
                const response = await axios.get(`http://localhost:8070/advertisement/get/${id}`);
                setAdvertisement(response.data.advertisement);
            } catch (error) {
                alert(error.message);
            }
        }
        getAdvertisement();
    }, [id]);

    const handleDelete = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        try {
            await axios.delete(`http://localhost:8070/advertisement/mdelete/${id}`);
            alert("Advertisement deleted successfully");
            navigate('/manage'); // Navigate to the home page or any other appropriate route after deletion
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className='container'>
            <h1>Delete Advertisement</h1>
            <form onSubmit={handleDelete}>
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" value={advertisement.title} readOnly className="form-control" />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea value={advertisement.description} readOnly className="form-control" />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={advertisement.email} readOnly className="form-control" />
                </div>
                <div className="form-group">
                    <label>Contact:</label>
                    <input type="text" value={advertisement.contact} readOnly className="form-control" />
                </div>
                <div className="form-group">
                    <label>Duration:</label>
                    <input type="number" value={advertisement.duration} readOnly className="form-control" />
                </div>
                <div className="form-group">
                    <label>Publish Date:</label>
                    <input type="date" value={advertisement.publishDate} readOnly className="form-control" />
                </div>
                <div className="form-group">
                    <label>Content:</label>
                    {advertisement.content.map((imagePath, index) => (
                        <img key={index} src={`http://localhost:8070/${imagePath}`} alt={`Image ${index + 1}`} style={{ width: '100px', height: 'auto', marginRight: '5px' }} />
                    ))}
                </div>
                <button type="submit" className="btn btn-danger">Delete</button>
            </form>
        </div>
    );
}
