import React from 'react';
import { FaSignOutAlt,FaUser, FaEnvelope } from 'react-icons/fa';
import { auth } from '../config/firebase';
import { Link } from 'react-router-dom';
import './styles/Navbar.css'; // Import CSS file for styling

const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/auth'); // Redirect to the authentication page after logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

function Navbar() {
  return (
    <div className="collab-navbar">
        
      {/* Profile icon */}
      <div className="navbar-item">
      <Link to="/collabprofile" style={{textDecoration: 'none', color: 'white'}}>
        <FaUser/>
        </Link>
      </div>
      {/* Requests icon */}
      <div className="navbar-item">
      <Link to="/collabrequests" style={{textDecoration: 'none', color: 'white'}}>
      <FaEnvelope />
        </Link>
        
      </div>
      {/* Logout icon */}
      <div className="navbar-item" onClick={handleLogout}>
        <FaSignOutAlt/>
      </div>
    </div>
  );
}

export default Navbar;
