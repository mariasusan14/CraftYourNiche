import React from 'react';
import { FaShoppingBag,FaHome, FaClipboardList, FaBoxOpen, FaChartLine, FaUsers, FaHandsHelping, FaPaintBrush, FaIdCard, FaSignOutAlt } from 'react-icons/fa';
import './styles/navbar.css'
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><FaHome /> Dashboard</li>
        <li><FaShoppingBag /> Products</li>
        <li><FaClipboardList /> Orders</li>
        <li><FaBoxOpen /> Inventory</li>
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
