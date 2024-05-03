import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [countryCode, setCountryCode] = useState('+1'); // Default country code

  useEffect(() => {
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
          // Extract country code from phone number
          const extractedCountryCode = userData.phoneNumber.split(' ')[0];
          setCountryCode(extractedCountryCode);
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

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleShippingAddressChange = (e) => {
    setShippingAddress(e.target.value);
  };

  const handleCountryCodeChange = (value) => {
    setCountryCode(value);
  };

  const handleUpdateProfile = async () => {
    try {
      const userId = auth.currentUser.uid;
      const userDocRef = doc(db, 'user', userId);
      const formattedPhoneNumber = `${countryCode} ${phoneNumber}`; // Combine country code and phone number
      await setDoc(userDocRef, {
        userName,
        phoneNumber: formattedPhoneNumber,
        email,
        shippingAddress
      }, { merge: true });

      toast.success('Profile updated successfully');
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
        <PhoneInput
          country={'us'}
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
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

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default Profile;
