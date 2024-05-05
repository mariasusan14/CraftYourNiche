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
      await auth.signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <nav className="navbar">
    <Header/>
    <br />
      <ul className='nav-ul'>
        
        <Link to="/shopdash" style={{textDecoration: 'none', color: 'white'}}>
        <li className='nav-li'><FaHome /> Dashboard</li>
        </Link>
        <Link to="/addproduct" style={{textDecoration: 'none', color: 'white'}}>
        <li className='nav-li'><FaShoppingBag /> Products</li>
        </Link>
        <Link to="/orders" style={{textDecoration: 'none', color: 'white'}}>
        <li className='nav-li'><FaClipboardList /> Orders</li>
        </Link>
        <Link to="/inventory" style={{textDecoration: 'none', color: 'white'}}>
        <li className='nav-li'><FaBoxOpen /> Inventory</li>
        </Link> 
        {/* <li><FaChartLine /> Analytics</li> */}
        <Link to="/collabdashshop" style={{textDecoration: 'none', color: 'white'}}>
        <li className='nav-li'><FaHandsHelping /> Collaborations</li>
        </Link>
        <Link to="/customization" style={{textDecoration: 'none', color: 'white'}}>
        <li className='nav-li'><FaPaintBrush /> Customization</li>
        </Link>
        <li className='nav-li' onClick={handleLogout}><FaSignOutAlt /> Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;
