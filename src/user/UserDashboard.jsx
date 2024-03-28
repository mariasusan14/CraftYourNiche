import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import './UserDashboard.css';
import Navbar from '../components/Navbar/Navbar';

// Importing the Productlist component
import Productlist from '../components/Productlist/Productlist';

export const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/auth'); // Redirect to the authentication page after logout
    } catch (error) {
      console.error('Error during logout:', error);
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
    <div>
      <Navbar />
      <h1>Hello, Welcome to the Dashboard!</h1>
      <button onClick={handleLogout}>Logout</button>

      {/* Navigation links to different pages */}
      <div>
        <button onClick={() => navigate('/profile')}>Profile</button>
        <button onClick={() => navigate('/shopping-cart')}>Shopping Cart</button>
        <button onClick={() => navigate('/order-management')}>Order Management</button>
        <button onClick={() => navigate('/wishlist')}>Wishlist</button>
        <button onClick={() => navigate('/customer-support')}>Customer Support</button>
        <button onClick={() => navigate('/product-listing')}>Product Listing</button>
        <hr />
      </div>

      {/* Main section with latest products */}
      <div className='dash-mainsection'>
        <div>Latest</div>
        <hr />
        <div className='dash-mainsection--latestproducts'>
          {/* Passing product data to Productlist component */}
          <Productlist product={products} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
