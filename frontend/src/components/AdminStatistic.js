import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminStatistic.css'; // Adjust the import path

const AdminStatistic = () => {
    const [statistics, setStatistics] = useState({
        approved: 0,
        rejected: 0,
        pending: 0,
        paid:0
    });

    useEffect(() => {
        fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
        try {
            const response = await axios.get('http://localhost:8070/advertisement');
            const advertisements = response.data;

            // Count advertisements by status
            const approvedCount = advertisements.filter(ad => ad.status === 'Approved').length;
            const rejectedCount = advertisements.filter(ad => ad.status === 'Rejected').length;
            const pendingCount = advertisements.filter(ad => ad.status === 'Pending').length;
            const paidCount = advertisements.filter(ad => ad.status === 'Paid').length;


            setStatistics({
                approved: approvedCount,
                rejected: rejectedCount,
                pending: pendingCount,
                paid: paidCount
            });
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    return (
        <div className="container">
            <div className="statistics">
                <h2>Advertisement Managing Statistics</h2>
                <p>Approved: {statistics.approved}</p>
                <p>Rejected: {statistics.rejected}</p>
                <p>Pending: {statistics.pending}</p>
                <p>Paid: {statistics.paid}</p>
            </div>
        </div>
    );
};

export default AdminStatistic;
