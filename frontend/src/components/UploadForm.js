import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    
    const selectedPackage = location.state ? location.state.selectedPackage : null;

    if (!selectedPackage) {
        // Handle the case where selectedPackage is null or undefined
        return <div>No package selected.</div>;
    }

    const upload = async () => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            console.log("cab id " + selectedPackage._id);
            await axios.post(`http://localhost:8070/uploads/fileUpload/${selectedPackage._id}`, formData);
            setUploadStatus("File uploaded successfully!");
            setShowModal(true); // Open the modal on success
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadStatus("Error uploading file. Please try again.");
        }
    };

    return (
        <div className="container">
            <h3>Selected Package Details:</h3>
            <p><strong>Package Name:</strong> {selectedPackage.packageName}</p>
            <p><strong>Price:</strong> {selectedPackage.price}</p>
            <p><strong>Time Period:</strong> {selectedPackage.timePeriod}</p>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={upload}>Upload</button>
            {uploadStatus && <p>{uploadStatus}</p>}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>File has been uploaded successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UploadForm;
