import React from 'react';
import { FaSignOutAlt,FaUser, FaEnvelope } from 'react-icons/fa';
import { auth } from '../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Navbar.css'; // Import CSS file for styling



function Navbar() {
  const navigate=useNavigate();
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/auth'); // Redirect to the authentication page after logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
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
