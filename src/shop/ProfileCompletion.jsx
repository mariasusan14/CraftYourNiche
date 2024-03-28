import React, { useState, useEffect } from 'react';
import { db,auth } from '../config/firebase'; 
import { setDoc,doc,collection } from 'firebase/firestore';
import './styles/ProfileCompletion.css';

const ProfileCompletion = () => {
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [shopName, setShopName] = useState('');
  const [tagline, setTagline] = useState('');
  const [logo, setLogo] = useState(null);
  const [shopAddress, setShopAddress] = useState('');
  const [acceptCustomisation, setAcceptCustomisation] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const userid=auth.currentUser.uid;
  useEffect(() => {
    updateProfileCompletion();
  }, [shopName, tagline, logo, shopAddress, acceptCustomisation]);

  const updateProfileCompletion = () => {
    let filledFields = 0;
    if (shopName !== '') filledFields++;
    if (tagline !== '') filledFields++;
    if (logo !== null) filledFields++;
    if (shopAddress !== '') filledFields++;
    if (acceptCustomisation !== '') filledFields++;
    const progress = filledFields * 20;
    setIsComplete(filledFields === 5);
    setProfileCompletion(progress);
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    setLogo(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const shopData = {
        shopName,
        tagline,
        shopAddress,
        acceptCustomisation
      };
      // Reference to the 'shops' collection and document with the user ID as the document ID
      const useref = collection(db, 'shops');
      const docRef = doc(useref, userid);
      // Set the shop data in Firestore
      await setDoc(docRef, shopData);
  
      if (isComplete) {
        // Navigate to dashboard page if profile is complete
        window.location.href = '/shopdash';
        console.log('Navigating to dashboard...');
      } else {
        console.log('Please complete all fields.');
      }
    } catch (error) {
      console.error('Error saving shop data:', error);
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
            <div className="verification-step">
              <label htmlFor="acceptCustomisation">Accept Customisation:</label>
              <select
                id="acceptCustomisation"
                value={acceptCustomisation}
                onChange={(e) => setAcceptCustomisation(e.target.value)}
                required
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <button type="submit" className={isComplete ? 'complete-button' : 'incomplete-button'} disabled={!isComplete}>
            Complete Profile
          </button>
        </form>
      </section>
    </div>
  );
};

export default ProfileCompletion;


