//Home.js
import React from 'react';
import '../styles/Header.css'; // Make sure to adjust the path as needed

function Home() {
  return (
    <section className="home" id="home">
      <div className="home-text">
        <h1>We Have Everything <br /> Your <span>Car</span> Need</h1>
        <p>Get all the parts you need to keep your car running smoothly!</p>
        {/* Add your button here */}
        <a href="/parts" className="btn">Discover Now</a>
      </div>
    </section>
  );
}

export default Home;
