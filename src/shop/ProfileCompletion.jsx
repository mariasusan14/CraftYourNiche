import React, { useState, useEffect } from 'react';
import './styles/ProfileCompletion.css'
import Navbar from './navbar';

const ProfileCompletion = () => {
  // State to track profile completion progress
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [shopName, setShopName] = useState('');
  const [tagline, setTagline] = useState('');
  const [logo, setLogo] = useState(null);
  const [shopAddress, setShopAddress] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  // Function to update profile completion progress
  
  const updateProfileCompletion = () => {
    let filledFields = 0;
    if (shopName !== '') filledFields++;
    if (tagline !== '') filledFields++;
    if (logo !== null) filledFields++;
    if (shopAddress !== '') filledFields++;
    const progress = filledFields * 25;
    setIsComplete(filledFields === 4);
    setProfileCompletion(progress);
  };
  // useEffect hook to update profile completion whenever any field changes
  useEffect(() => {
    updateProfileCompletion();
  }, [shopName, tagline, logo, shopAddress]);

  // Function to handle logo upload
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    setLogo(file);
  };

  // Function to submit profile completion form
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to submit profile completion data (shopName, tagline, logo, shopAddress)
    // You can perform form validation here before submitting
    if (isComplete) {
      // Navigate to dashboard page
      window.location.href = '/dashboard';
      console.log('Navigating to dashboard...');
    } else {
      console.log('Please complete all fields.');
    }
  };

  return (
    <div className="container">
      
      <section className="profile-completion">
      <br />
      <br />
      <h2>Profile Completion</h2>
      <hr />
      <div className="progress-bar">
        <div className="progress" style={{ width: `${profileCompletion}%` }}></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="verification-steps">
          {/* Shop Name */}
          <div className="verification-step">
            <label htmlFor="shopName">Shop Name:</label>
            <input
              type="text"
              id="shopName"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              required
            />
          </div>
          {/* Tagline */}
          <div className="verification-step">
            <label htmlFor="tagline">Tagline:</label>
            <input
              type="text"
              id="tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              required
            />
          </div>
          {/* Logo Upload */}
          <div className="verification-step">
            <label htmlFor="logo">Upload Logo:</label>
            <input
              type="file"
              id="logo"
              accept="image/*"
              onChange={handleLogoUpload}
              required
            />
          </div>
          {/* Shop Address */}
          <div className="verification-step">
            <label htmlFor="shopAddress">Shop Address:</label>
            <input
              type="text"
              id="shopAddress"
              value={shopAddress}
              onChange={(e) => setShopAddress(e.target.value)}
              required
            />
          </div>
        </div>
        {/* Submit Button */}
        <button type="submit" className={isComplete ? 'complete-button' : 'incomplete-button'} disabled={!isComplete}>
          Complete Profile
        </button>
      </form>
      
    </section>
    </div>
    
  );
};

export default ProfileCompletion;
