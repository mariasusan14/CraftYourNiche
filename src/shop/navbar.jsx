import React from 'react';
import { FaShoppingBag,FaHome, FaClipboardList, FaBoxOpen, FaChartLine, FaUsers, FaHandsHelping, FaPaintBrush, FaIdCard, FaSignOutAlt } from 'react-icons/fa';
import { Link,useNavigate } from 'react-router-dom';
import './styles/navbar.css'
import { auth } from '../config/firebase';
import Header from './header';
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Sign out the user using Firebase authentication
      await auth.signOut();

      // Redirect to the login page or any other page after logout
      navigate('/auth');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <nav className="navbar">
    <Header/>
    <br />
      <ul>
        <li><FaHome /> Dashboard</li>
        <Link to="/addproduct" style={{textDecoration: 'none', color: 'white'}}>
        <li><FaShoppingBag /> Products</li>
        </Link>
        <Link to="/orders" style={{textDecoration: 'none', color: 'white'}}>
        <li><FaClipboardList /> Orders</li>
        </Link>
        <Link to="/inventory" style={{textDecoration: 'none', color: 'white'}}>
        <li><FaBoxOpen /> Inventory</li>
        </Link>        
        
        
        <li><FaChartLine /> Analytics</li>
        <li><FaUsers /> Customers</li>
        <li><FaHandsHelping /> Collaborations</li>
        <Link to="/customization" style={{textDecoration: 'none', color: 'white'}}>
        <li><FaPaintBrush /> Customization</li>
        </Link>
        <Link to="/verification" style={{textDecoration: 'none', color: 'white'}}>
        <li><FaIdCard /> Verification</li>
        </Link>
        
        <li onClick={handleLogout}><FaSignOutAlt /> Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;
