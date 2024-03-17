import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import './UserDashboard.css'

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
      <h1>Hello, Welcome to the Dashboard!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};


