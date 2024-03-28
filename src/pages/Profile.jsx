
import React, { useState } from 'react';

const Profile = () => {
  const [userName, setUserName] = useState('John Doe');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [email, setEmail] = useState('johndoe@example.com');
  const [shippingAddress, setShippingAddress] = useState('123 Shipping Street, City, Country');

  const handleUpdateProfile = () => {
    // Logic for updating profile
    // You can send the updated data to your backend or perform any other necessary action here
    console.log("Profile updated:", { userName, phoneNumber, email, shippingAddress });
  };

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Shipping Address:</label>
        <textarea value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} />
      </div>
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
}

export default Profile;
