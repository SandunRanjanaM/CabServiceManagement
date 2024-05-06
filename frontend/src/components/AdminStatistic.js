import React, { useRef, useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';
import axios from 'axios';
import '../styles/AdminStatistic.css';

const AdminStatistic = () => {
  const [statistics, setStatistics] = useState({
    approved: 0,
    rejected: 0,
    pending: 0,
    paid: 0,
    totalPaidAmount: 0
  });

  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const barChartRef = useRef(null);
  const barChartInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8070/advertisement');
        const advertisements = response.data;

        const approvedCount = advertisements.filter(ad => ad.status === 'Approved').length;
        const rejectedCount = advertisements.filter(ad => ad.status === 'Rejected').length;
        const pendingCount = advertisements.filter(ad => ad.status === 'Pending').length;
        const paidCount = advertisements.filter(ad => ad.status === 'Paid').length;

        let totalPaidAmount = 0;
        advertisements.forEach(ad => {
          if (ad.status === 'Paid') {
            totalPaidAmount += ad.duration * 50; // Assuming each paid ad costs $50 per week
          }
        });

        setStatistics({
          approved: approvedCount,
          rejected: rejectedCount,
          pending: pendingCount,
          paid: paidCount,
          totalPaidAmount: totalPaidAmount
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (statistics) {
      renderChart();
      renderBarChart();
    }
  }, [statistics]);

  const renderChart = () => {
    if (chartInstance.current) {
      chartInstance.current.data.datasets[0].data = [statistics.approved, statistics.rejected, statistics.pending, statistics.paid];
      chartInstance.current.update();
    } else {
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Approved', 'Rejected', 'Pending', 'Paid'],
          datasets: [{
            label: 'Advertisement Statistics',
            data: [statistics.approved, statistics.rejected, statistics.pending, statistics.paid],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)', // Dark turquoise
                'rgba(255, 99, 132, 0.2)', // Dark salmon
                'rgba(255, 206, 86, 0.2)', // Dark gold
                'rgba(54, 162, 235, 0.2)', // Dark sky blue
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  };

  const renderBarChart = () => {
    if (barChartInstance.current) {
      barChartInstance.current.data.labels = ['Each Paid ad costs per week', 'Total Paid Amount'];
      barChartInstance.current.data.datasets[0].data = [50, statistics.totalPaidAmount];
      barChartInstance.current.update();
    } else {
      const ctx = barChartRef.current.getContext('2d');
      barChartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Each Paid ad costs per week', 'Total Paid Amount'],
          datasets: [{
            label: 'Payment Details',
            data: [50, statistics.totalPaidAmount],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  };

  return (
    <div className="container9">
      <div className="statistics">
        <h2>Advertisement Managing Statistics</h2>
        <p>Approved Advertisements : {statistics.approved}</p>
        <p>Rejected Advertisements : {statistics.rejected}</p>
        <p>Payment Confirmation Pending Advertisements : {statistics.pending}</p>
        <p>Paid Advertisements : {statistics.paid}</p>
        <p>Each Paid ad costs per week : $50</p>
        <p>Total Paid Amount : ${statistics.totalPaidAmount}</p>
      </div>
      <div>
        <canvas id="pieChartCanvas" ref={chartRef}></canvas>
      </div>
      <div>
        <canvas id="barChartCanvas" ref={barChartRef}></canvas>
      </div>

    </div>
  );
};

export default AdminStatistic;
