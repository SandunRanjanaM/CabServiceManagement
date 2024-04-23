// components/PackageCounts.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PackageCounts = () => {
    const [packageCounts, setPackageCounts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8070/cab")
            .then(response => {
                setPackageCounts(response.data);
            })
            .catch(error => {
                console.error('Error fetching package counts:', error);
            });
    }, []);

    const handlePackageSelection = (packageName) => {
        axios.post("http://localhost:8070/cab/select", { packageName })
            .then(response => {
                const { message, totalPrice } = response.data;
                console.log(message);
                console.log('Total Price:', totalPrice);
                // Optionally, you can update the UI or display a message after selecting the package
            })
            .catch(error => {
                console.error('Error selecting package:', error);
            });
    };

    return (
        <div>
            <h2>Package Counts</h2>
            <table>
                <thead>
                    <tr>
                        <th>Package Name</th>
                        <th>User Count</th>
                        <th>Price</th>
                        <th>Total Price</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {packageCounts.map(({ _id, packageName, userCount, price }) => (
                        <tr key={_id}>
                            <td>{packageName}</td>
                            <td>{userCount}</td>
                            <td>${price}</td>
                            <td>${price * userCount}</td>
                            <td>
                                {/* Render the "Select" button */}
                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PackageCounts;
