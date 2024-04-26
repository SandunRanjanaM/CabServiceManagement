import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/AllAds.css';
import jsPDF from 'jspdf';

export default function AllAds() {
    const [advertisements, setAdvertisements] = useState([]);
    const [clickCounts, setClickCounts] = useState(() => {
        const storedClickCounts = localStorage.getItem('clickCounts');
        return storedClickCounts ? JSON.parse(storedClickCounts) : {};
    });

    useEffect(() => {
        async function getAdvertisements() {
            try {
                const response = await axios.get("http://localhost:8070/advertisement/");
                setAdvertisements(response.data);
            } catch (error) {
                alert(error.message);
            }
        }
        getAdvertisements();
    }, []);

    useEffect(() => {
        localStorage.setItem('clickCounts', JSON.stringify(clickCounts));
    }, [clickCounts]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/advertisement/delete/${id}`);
            alert("Advertisement deleted successfully");
        } catch (error) {
            alert(error.message);
        }
    };

    const handleAdClick = (id) => {
        const updatedClickCounts = { ...clickCounts };
        updatedClickCounts[id] = (updatedClickCounts[id] || 0) + 1;
        setClickCounts(updatedClickCounts);
    };

    const generatePaymentReceipt = (advertisement) => {
        const pdf = new jsPDF();
        pdf.text("Payment Confirmation Successful", 10, 10);
        pdf.text(`Advertisement Title: ${advertisement.title}`, 10, 20);
        pdf.text(`User Email: ${advertisement.email}`, 10, 30);
        pdf.save("payment_receipt.pdf");
    };

    return (
        <div className='container'>
            <h1>All Advertisements</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Content</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {advertisements.map(advertisement => (
                        <tr key={advertisement._id}>
                            <td>{advertisement.title}</td>
                            <td>{advertisement.description}</td>
                            <td>{advertisement.email}</td>
                            <td>{advertisement.contact}</td>
                            <td>
                                {advertisement.content.map((imagePath, index) => (
                                    <img key={index} src={`http://localhost:8070/${imagePath}`} alt={`Image ${index + 1}`} style={{ width: '100px', height: 'auto', marginRight: '5px' }} />
                                ))}
                            </td>
                            <td>{advertisement.status}</td>
                            <td>
                                {advertisement.status !== "Paid" && advertisement.status !== "Pending" && (
                                    <>
                                        <Link to={`/update/${advertisement._id}`} className="btn btn-primary">Update</Link>
                                        <Link to={`/delete/${advertisement._id}`} className="btn btn-danger ml-2">Delete</Link>
                                    </>
                                )}

                                {advertisement.status === "Approved" && (
                                    <Link to={`/pay/${advertisement._id}`} className="btn btn-success ml-2">Pay</Link>
                                )}

                                {advertisement.status === "Paid" && (
                                    <>
                                        <button className="btn btn-info ml-2" onClick={() => handleAdClick(advertisement._id)}>User Clicks : {clickCounts[advertisement._id] || 0}</button>
                                        <button className="btn btn-secondary ml-2" onClick={() => generatePaymentReceipt(advertisement)}>Download Report</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
