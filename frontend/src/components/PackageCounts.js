// components/PackageCounts.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


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

    const downloadPdf = () => {
        const doc = new jsPDF();
    
        // Table data
        const tableData = packageCounts.map(({ packageName, userCount, price }) => {
            return [packageName, userCount, `$${price}`, `$${price * userCount}`];
        });
    
        // Table headers
        const tableHeaders = ['Package Name', 'User Count', 'Price', 'Total Price'];
    
        // Set table position and styling
        const margin = 10;
        const startY = 30;
        const tableStyle = { theme: 'grid' }; // You can customize the table style here
    
        // Add table to the PDF
        doc.autoTable({
            startY: startY,
            head: [tableHeaders],
            body: tableData,
            startY: startY,
            styles: { overflow: 'linebreak' },
            theme: 'striped',
            headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] }, // Header styles
            columnStyles: { 0: { fontStyle: 'bold' } } // Styles for specific columns
        });
    
        // Add title
        doc.setFontSize(16);
        doc.text('Package Counts', margin, margin);
    
        // Save the PDF
        doc.save('package_counts.pdf');
    };
    


    return (
        <div className="d-flex justify-content-center align-items-center vh-250" style={{ marginTop: '100px'}}>
            <div style={{ width: '90%' }}>
        <div>
            <h2>Package Counts</h2>
            <button onClick={downloadPdf}>Download as PDF</button>
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
        </div>
    </div>
    );
};

export default PackageCounts;