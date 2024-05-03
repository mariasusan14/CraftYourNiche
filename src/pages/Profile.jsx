import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase'; // Import your Firebase instance

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  useEffect(() => {
    // Fetch user profile data from Firestore when the component mounts
    const fetchUserProfile = async () => {
      try {
        const userId = auth.currentUser.uid;
        const userDocRef = doc(db, 'user', userId);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserName(userData.userName);
          setPhoneNumber(userData.phoneNumber);
          setEmail(userData.email);
          setShippingAddress(userData.shippingAddress);
        } else {
          console.error('User document does not exist');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleShippingAddressChange = (e) => {
    setShippingAddress(e.target.value);
  };

  const handleUpdateProfile = async () => {
    try {
      const userId = auth.currentUser.uid;
      const userDocRef = doc(db, 'user', userId);
      await setDoc(userDocRef, {
        userName,
        phoneNumber,
        email,
        shippingAddress
      }, { merge: true });

      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={userName} onChange={handleUserNameChange} />
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label>Shipping Address:</label>
        <textarea value={shippingAddress} onChange={handleShippingAddressChange} />
      </div>
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
}

export default Profile;
