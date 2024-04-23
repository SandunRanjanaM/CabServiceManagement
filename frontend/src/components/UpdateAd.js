import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function UpdateAdvertisement() {
    const { id } = useParams(); // Use useParams hook to get the advertisement ID from the URL
    const [advertisement, setAdvertisement] = useState({
        title: "",
        description: "",
        email: "",
        contact: "",
        content: []
    });
    const [newImages, setNewImages] = useState([]); // State to hold newly uploaded images

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdvertisement({ ...advertisement, [name]: value });
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        setNewImages([...newImages, ...files]); // Append new images to existing newImages state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let formData = new FormData();
            
            // Append new images to formData
            if (Array.isArray(newImages) && newImages.length > 0) {
                newImages.forEach((image) => {
                    formData.append('content', image);
                });
            }
            
            // Append advertisement data to formData
            formData.append('title', advertisement.title);
            formData.append('description', advertisement.description);
            formData.append('email', advertisement.email);
            formData.append('contact', advertisement.contact);

            // Update advertisement details
            await axios.put(`http://localhost:8070/advertisement/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("Advertisement updated successfully");
            // Redirect to the advertisements list page or perform any other action
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className='container'>
            <h1>Update Advertisement</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" required name="title" value={advertisement.title} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea name="description" required value={advertisement.description} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" required  pattern="^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$" name="email" value={advertisement.email} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Contact:</label>
                    <input type="text" required pattern="0[0-9]{9}" name="contact" value={advertisement.contact} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Previous Images:</label>
                    {advertisement.content.map((imagePath, index) => (
                        <img key={index} src={`http://localhost:8070/${imagePath}`} alt={`Image ${index + 1}`} style={{ width: '100px', height: 'auto', marginRight: '5px' }} />
                    ))}
                </div>
                <div className="form-group">
                    <label>Upload New Images:</label>
                    <input type="file" name="content" onChange={handleImageChange} multiple className="form-control-file" />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}
