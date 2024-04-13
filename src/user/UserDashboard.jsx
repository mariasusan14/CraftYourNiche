import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import './UserDashboard.css';
import Navbar from '../components/Navbar/Navbar';
import Profile from '../pages/Profile';
import ShoppingCart from '../pages/ShoppingCart';
import OrderManagement from '../pages/OrderManagement';
import Wishlist from '../pages/Wishlist';
import CustomerSupport from '../pages/CustomerSupport/CustomerSupport';
import ProductListing from '../pages/ProductListing/ProductListing';
import Productlist from '../components/Productlist/Productlist';

export const UserDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(null);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/auth'); // Redirect to the authentication page after logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  // Function to render the active page content
  const renderActivePage = () => {
    switch (activePage) {
      case 'profile':
        return <Profile />;
      case 'shopping-cart':
        return <ShoppingCart />;
      case 'order-management':
        return <OrderManagement />;
      case 'wishlist':
        return <Wishlist />;
      case 'customer-support':
        return <CustomerSupport />;
      case 'product-listing':
        return <Productlist product={products} />;
      default:
        return null;
    }
  };

  // Sample product data
  let products = [
    {
      id: 1,
      name: 'Product 1',
      image: 'product1.jpg',
      price: 20.99,
      rating: 4,
    },
    {
      id: 2,
      name: 'Product 2',
      image: 'product2.jpg',
      price: 25.49,
      rating: 5,
    },
    // Add more products as needed
  ];

  return (
    <div className="dash-container">
      <Navbar />
      <h1 className="page-title">Hello, Welcome to the Dashboard!</h1>
      <button className="logout-button" onClick={handleLogout}>Logout</button>

      {/* Navigation links to different pages */}
      <div className="nav-buttons">
        <button className="nav-button" onClick={() => handlePageChange('profile')}>Profile</button>
        <button className="nav-button" onClick={() => handlePageChange('shopping-cart')}>Shopping Cart</button>
        <button className="nav-button" onClick={() => handlePageChange('order-management')}>Order Management</button>
        <button className="nav-button" onClick={() => handlePageChange('wishlist')}>Wishlist</button>
        <button className="nav-button" onClick={() => handlePageChange('customer-support')}>Support</button>
        <button className="nav-button" onClick={() => handlePageChange('product-listing')}>Product Listing</button>
        <hr />
      </div>

      {/* Main section with active page */}
      <div className='dash-mainsection'>
        <div>{activePage === 'product-listing' ? 'Latest' : ''}</div>
        <hr />
        {/* Render active page content */}
        {renderActivePage()}
      </div>
    </div>
  );
};

export default UserDashboard;
