import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import './Analysis.css'; // Import the Analysis.css file

const Analysis = () => {
    const [dailyRides, setDailyRides] = useState([]);
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);
    const [weeklyUsage, setWeeklyUsage] = useState([]);

    useEffect(() => {
        // Fetch daily rides data
        axios.get('/api/rides/daily')
            .then(response => {
                setDailyRides(response.data);
            })
            .catch(error => {
                console.error('Error fetching daily rides data:', error);
            });

        // Fetch monthly revenue data
        axios.get('/api/revenue/monthly')
            .then(response => {
                setMonthlyRevenue(response.data);
            })
            .catch(error => {
                console.error('Error fetching monthly revenue data:', error);
            });

        // Fetch weekly usage data
        axios.get('/api/usage/weekly')
            .then(response => {
                setWeeklyUsage(response.data);
            })
            .catch(error => {
                console.error('Error fetching weekly usage data:', error);
            });
    }, []);

    return (
        <div className="analysis-container">
            <h1 className="analysis-heading"><t/> System Performance Analysis <t/></h1>

            <div className="chart-container">
                <h2 className="chart-heading">Daily Rides</h2>
                <div className="chart-wrapper">
                    <LineChart width={800} height={400} data={dailyRides} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="rides" stroke="#8884d8" />
                    </LineChart>
                </div>
            </div>

            <div className="chart-container">
                <h2 className="chart-heading">Monthly Revenue</h2>
                <div className="chart-wrapper">
                    <BarChart width={800} height={400} data={monthlyRevenue} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#8884d8" />
                    </BarChart>
                </div>
            </div>

            <div className="chart-container">
                <h2 className="chart-heading">Weekly Usage</h2>
                <div className="chart-wrapper">
                    <BarChart width={800} height={400} data={weeklyUsage} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="usage" fill="#82ca9d" />
                    </BarChart>
                </div>
            </div>
        </div>
    );
};

export default Analysis;
