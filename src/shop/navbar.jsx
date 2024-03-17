import React from 'react';
import { FaShoppingBag,FaHome, FaClipboardList, FaBoxOpen, FaChartLine, FaUsers, FaHandsHelping, FaPaintBrush, FaIdCard, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './styles/navbar.css'
const Navbar = () => {
  return (
    <nav className="navbar">
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
        <li><FaPaintBrush /> Customization</li>
        <li><FaIdCard /> Verification</li>
        <li><FaSignOutAlt /> Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;
