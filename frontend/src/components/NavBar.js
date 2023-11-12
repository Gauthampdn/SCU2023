// src/NavBar.js

import React from 'react';
import './NavBar.css';
function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="/">Caraoke</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
