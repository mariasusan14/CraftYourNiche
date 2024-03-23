import React from 'react';
import { FaShoppingBag,FaHome, FaClipboardList, FaBoxOpen, FaChartLine, FaUsers, FaHandsHelping, FaPaintBrush, FaIdCard, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './styles/navbar.css'
import Header from './header';
const Navbar = () => {
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
     
        <li><FaIdCard /> Verification</li>
        <li><FaSignOutAlt /> Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;
