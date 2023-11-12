// src/NavBar.js

import React from 'react';
import './NavBar.css';
import { useLogout } from "../hooks/useLogout";

function NavBar() {

  const { logout } = useLogout()
  const handleClick = () => {
    logout()
  }

  return (
    <nav className="navbar">
      <ul>
        <li><a href="/">Caraoke</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      <button onClick={handleClick}>Logout</button>
    </nav>
  );
}

export default NavBar;
