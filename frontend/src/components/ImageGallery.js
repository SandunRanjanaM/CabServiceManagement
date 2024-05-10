import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageGallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get('http://localhost:8070/uploads/getAllImages');
            console.log('Response from server:', response.data); // Log the response data
            setImages(response.data); // Assuming response.data contains an array of image URLs
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };
    
    return (
        <div className="image-gallery">
            {images.length === 0 ? (
                <p>No images available</p>
            ) : (
                images.map((image, index) => (
                    <div key={index} className="card">
                        <img src={image.url} alt={`Image ${index}`} className="content-image" width='200' height='200' />
                    </div>
                ))
            )}
        </div>
    );
};

export default ImageGallery;
