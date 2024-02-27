// Navbar.jsx
import React from 'react';
import './Navbar.css';

// ... rest of the component

export const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav-logo">CapCraft</div>
      <ul className="nav-menu">
        <li>Home</li>
        <li>Explore</li>
        <li>About</li>
        <li className='nav-contact'>Contact</li>
      </ul>
    </div>
  );
};

export default Navbar;
