// src/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import './HomePage.css';

function HomePage() {
  return (
    <div>
      <NavBar />
      <div className="image-overlay-container">
        <img src="/blog-hero.jpg" alt="A descriptive text for the image" className="full-width-image" />
        <div className="button-group">
          <Link to="/drive" className="action-button">For Drivers</Link>
          <Link to="/passenger" className="action-button">For Passengers</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
