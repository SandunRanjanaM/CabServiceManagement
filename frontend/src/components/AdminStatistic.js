import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminStatistic = () => {
    const [statistics, setStatistics] = useState({
        approved: 0,
        rejected: 0,
        pending: 0
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

            setStatistics({
                approved: approvedCount,
                rejected: rejectedCount,
                pending: pendingCount
            });
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    return (
        <div>
            <h2>Advertisement Managing Statistics</h2>
            <p>Approved: {statistics.approved}</p>
            <p>Rejected: {statistics.rejected}</p>
            <p>Pending: {statistics.pending}</p>
        </div>
    );
};

export default AdminStatistic;
