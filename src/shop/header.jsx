import React, { useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { getDoc,doc,collection } from 'firebase/firestore';
import './styles/Header.css'

const Header = () => {
  const [shopName, setShopName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    const fetchShopInfo = async () => {
      try {
        const userId = auth.currentUser.uid;
        const userDocRef = doc(collection(db, 'shops'), userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const { shopName, logoUrl } = userDocSnapshot.data();
          setShopName(shopName);
          setLogoUrl(logoUrl);
        } else {
          console.error('Shop document does not exist');
        }
      } catch (error) {
        console.error('Error fetching shop information:', error);
      }
    };

    fetchShopInfo();
  }, []);

  return (
    <header>
      <div className="logo">
        {logoUrl ? (
          <img className='logo-img' src={logoUrl} alt="Shop Logo" />
        ) : (
          <span>No Logo Available</span>
        )}
      </div>
      <div className="shop-name">{shopName}</div>
    </header>
  );
};

export default Header;
