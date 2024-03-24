import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import './UserDashboard.css'
import Navbar from '../components/Navbar/Navbar';
import Productlist from '../components/Productlist/Productlist';


export const UserDashboard = () => {
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
    <div>
      <Navbar/>
      
      <h1>Hello, Welcome to the Dashboard!</h1>

      <button onClick={handleLogout}>Logout</button>
      <div className='dash-mainsection'>
      <div>Latest</div>
      <hr/>
      <div className='dash-mainsection--latestproducts'>
        <Productlist/>
       
          

  
      </div>

    </div>
    </div>
  );
};


