import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import './UserDashboard.css';
import Profile from '../pages/Profile';
import ShoppingCart from '../pages/Shoppingcart1';
import OrderManagement from '../pages/OrderManagement';

import CustomerSupport from '../pages/CustomerSupport/CustomerSupport';
import ProductListing from '../pages/ProductListing/ProductListing';
import Product from '../pages/ProductPage/Product';
import CustomisationComponent from '../pages/customisation/CustomisationUser';

export const UserDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('product-listing'); 

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/auth'); 
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
      case 'customer-support':
        return <CustomerSupport/>;
      case 'product-listing':
        return <ProductListing/>;
      default:
        return null;
    }
  };



  return (
    <div className="dash-container">
      <h1 className="page-title">Hello, Welcome to the Dashboard!</h1>
      <button className="logout-button" onClick={handleLogout}>Logout</button>

      {/* Navigation links to different pages */}
      <div className="nav-buttons">
        <button className="nav-button" onClick={() => handlePageChange('profile')}>Profile</button>
        <button className="nav-button" onClick={() => handlePageChange('shopping-cart')}>Shopping Cart</button>
        <button className="nav-button" onClick={() => handlePageChange('order-management')}>Order Mngmt</button>
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
