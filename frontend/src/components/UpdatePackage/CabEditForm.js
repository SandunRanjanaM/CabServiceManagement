import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CabEditForm.css'; // Import CSS file

const CabEditForm = ({ cabId }) => {
    const [packageName, setPackageName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [timePeriod, setTimePeriod] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/get/${cabId}`); // Adjust endpoint as per your backend
                const cabData = response.data.cab; // Assuming response.data contains cab data
                setPackageName(cabData.packageName);
                setDescription(cabData.description);
                setPrice(cabData.price);
                setTimePeriod(cabData.timePeriod);
            } catch (error) {
                console.error('Error fetching cab data:', error);
            }
        };

        fetchData(); // Call fetchData function
    }, [cabId]); // Fetch data whenever cabId changes

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/update/${cabId}`, {
                packageName,
                description,
                price,
                timePeriod
            });
            alert('Cab updated successfully!');
        } catch (error) {
            console.error('Error updating cab:', error);
            alert('Error updating cab. Please try again.');
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <label>
                Package Name:
                <input type="text" value={packageName} onChange={(e) => setPackageName(e.target.value)} />
            </label>
            <label>
                Description:
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label>
                Price:
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </label>
            <label>
                Time Period:
                <input type="text" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} />
            </label>
            <button type="submit">Update</button>
        </form>
    );
};

export default CabEditForm;
