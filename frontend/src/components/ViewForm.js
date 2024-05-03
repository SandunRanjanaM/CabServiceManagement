import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Modal, Button, Form } from 'react-bootstrap';
import UploadFile from './UploadFile';

const ViewForm = () => {
    const [cabs, setCabs] = useState([]);
    const [filteredCabs, setFilteredCabs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false); // New state for success pop-up
    const { id } = useParams();

    useEffect(() => {
        axios.get("http://localhost:8070/cab")
            .then(response => {
                setCabs(response.data); 
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        const filtered = cabs.filter(cab =>
            cab.packageName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCabs(filtered);
    }, [cabs, searchTerm]);

    const handlePackageSelection = (packageName) => {
        axios.post("http://localhost:8070/cab/select", { packageName })
            .then(response => {
                console.log('Package selected:', packageName);
            ////    {*setSuccessMessage(`Package "${packageName}" selected successfully!`);*}
                setShowModal(true);
                const selected = filteredCabs.find(cab => cab.packageName === packageName);
                setSelectedPackage(selected);
            })
            .catch(error => {
                console.error('Error selecting package:', error);
            });
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedPackage(null);
    };

    const handleUploadSuccess = () => {
        setSuccessMessage("Photo uploaded successfully!");
        setShowSuccessPopup(true); // Show the success pop-up
        setShowModal(false); // Close the initial modal
        setTimeout(() => {
            setShowSuccessPopup(false); // Close the success pop-up after a delay
            setSuccessMessage(""); // Clear the success message
        }, 2000); // Adjust the delay time as needed
    };
    

    return (
        <div className="container d-flex justify-content-center align-items-center vh-250" style={{ marginTop: '100px'}}> 
            <div style={{ width: '90%' }}>
                <Form.Group controlId="search">
                    <Form.Control
                        type="text"
                        placeholder="Search by package name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ 
                            border: '2px solid #ccc',
                            borderRadius: '5px',
                            padding: '10px',
                            width: '100%',
                            boxSizing: 'border-box',
                            fontSize: '16px',
                            marginBottom: '10px'
                        }}
                    />
                </Form.Group>
    
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Package Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Time Period</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCabs.map(cab => (
                            <tr key={cab._id}>
                                <td>{cab.packageName}</td>
                                <td>{cab.description}</td>
                                <td>{cab.price}</td>
                                <td>{cab.timePeriod}</td>
                                <td>
                                    <button onClick={() => handlePackageSelection(cab.packageName)}>Select</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <Modal show={showModal} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload File</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedPackage && (
                            <div>
                                <h3>Selected Package Details:</h3>
                                <p><strong>Package Name:</strong> {selectedPackage.packageName}</p>
                                <p><strong>Price:</strong> {selectedPackage.price}</p>
                                <p><strong>Time Period:</strong> {selectedPackage.timePeriod}</p>
                            </div>
                        )}
                        <UploadFile onUploadSuccess={handleUploadSuccess} />
                        {successMessage && <p>{successMessage}</p>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Success pop-up */}
                <Modal show={showSuccessPopup} onHide={() => setShowSuccessPopup(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Photo uploaded successfully!</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowSuccessPopup(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default ViewForm;
