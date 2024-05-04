import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage() {
    const [advertisement, setAdvertisement] = useState(null);

    useEffect(() => {
        // Function to fetch advertisements from the backend
        const fetchAdvertisements = async () => {
            try {
                const response = await axios.get("http://localhost:8070/advertisement/");
                const paidAdvertisements = response.data.filter(ad => ad.status === "Paid");
                if (paidAdvertisements.length > 0) {
                    // Randomly select an advertisement from the filtered list
                    const randomIndex = Math.floor(Math.random() * paidAdvertisements.length);
                    setAdvertisement(paidAdvertisements[randomIndex]);
                } else {
                    // No paid advertisements found
                    setAdvertisement(null);
                }
            } catch (error) {
                console.error("Error fetching advertisement:", error);
            }
        };
    
        // Fetch advertisements when the component mounts
        fetchAdvertisements();
    
        // Set up a timer to fetch advertisements every 5 seconds
        const timerId = setInterval(fetchAdvertisements, 5 * 1000); // 5 seconds interval
    
        // Clean up the timer when the component unmounts
        return () => clearInterval(timerId);
    }, []);
    

    // Render the advertisement pop-up if an advertisement is available
    return (
        <div>
            {advertisement && (
                <Link to="/" className="advertisement-top-bar">
                    <h2>{advertisement.title}</h2>
                    <p>{advertisement.description}</p>
                    <img src={`http://localhost:8070/${advertisement.content[0]}`} alt={advertisement.title} />
                </Link>
            )}
        </div>
    );
}

export default HomePage;
