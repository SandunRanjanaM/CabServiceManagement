// ViewForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const ViewForm = () => {
    const [cabs, setCabs] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const { id } = useParams(); // Get the id parameter from the URL

    useEffect(() => {
        axios.get("http://localhost:8070/cab")
            .then(response => {
                setCabs(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handlePackageSelection = (packageName) => {
        // Send a request to the server to update the count of users for the selected package
        axios.post("http://localhost:8070/cab/select", { packageName })
            .then(response => {
                console.log('Package selected:', packageName);
                setSuccessMessage(`Package "${packageName}" selected successfully!`);
                // Optionally, you can update the UI or display a message after selecting the package
            })
            .catch(error => {
                console.error('Error selecting package:', error);
            });
    };

    return (
        <div>
            {successMessage && <p>{successMessage}</p>}
            <table>
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
                    {cabs.map(cab => (
                        <tr key={cab._id}>
                            <td>{cab.packageName}</td>
                            <td>{cab.description}</td>
                            <td>{cab.price}</td>
                            <td>{cab.timePeriod}</td>
                            <td>
                                {/* Render the "Select" button */}
                                <button onClick={() => handlePackageSelection(cab.packageName)}>Select</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewForm;
