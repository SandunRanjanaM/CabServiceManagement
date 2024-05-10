import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ImageGallery.css';

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [approvedImages, setApprovedImages] = useState({}); // Track approved images by index
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8070/cab")
            .then(response => {
                setImages(response.data); 
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8070/uploads/getAllImages');
                console.log('Response from server:', response.data);
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const handleDownload = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = 'image';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleApprove = (index, packageName) => {
        const newApprovedImages = { ...approvedImages };
        newApprovedImages[index] = {
            approved: true,
            timestamp: new Date().toLocaleString() // Add the current date and time
        }; 
        setApprovedImages(newApprovedImages);

        axios.post("http://localhost:8070/cab/select", { packageName })
            .then(response => console.log(response.data.message))
            .catch(error => console.error('Error selecting package:', error));
    };

    return (
        <div className="image-gallery">
            {images.length === 0 ? (
                <p>No images available</p>
            ) : (
                images.map((image, index) => (
                    <div key={index} className="card">
                        <div className="card-image">
                            <img src={image.url} alt={`Image ${index}`} className="content-image" />
                            {approvedImages[index] && <span className="approved-icon">✔</span>}
                        </div>
                        <div className="card-details">
                            <h3>{image.packageName}</h3>
                            <p>{image.description}</p>
                        </div>
                        <div className="button-group">
                            <button onClick={() => handleDownload(image.url)} className="download-button">Download</button>
                            <button onClick={() => handleApprove(index, image.packageName)} className="approve-button">Approve</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ImageGallery;
