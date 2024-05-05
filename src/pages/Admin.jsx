import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from "../config/firebase";
import "./Admin.css";

function AdminPage() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'shops'));
      const fetchedShops = [];
      querySnapshot.forEach((doc) => {
        fetchedShops.push({ id: doc.id, ...doc.data() });
      });
      setShops(fetchedShops);
    } catch (error) {
      console.error('Error fetching shops:', error);
    }
  };

  const handleDeleteShop = async (id) => {
    try {
      await deleteDoc(doc(db, 'shops', id));
      setShops(shops.filter((shop) => shop.id !== id));
      console.log('Shop deleted successfully');
    } catch (error) {
      console.error('Error deleting shop:', error);
    }
  };

  return (
    <div className="admin-page">
      <h2>Admin Page</h2>
      <table className="shop-table">
        <thead>
          <tr>
            <th>Shop Logo</th>
            <th>Shop Name</th>
            <th>Shop Address</th>
            <th>Tagline</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {shops.map((shop) => (
            <tr key={shop.id}>
              <td><img src={shop.logoUrl} alt="Shop Logo" /></td>
              <td>{shop.shopName}</td>
              <td>{shop.shopAddress}</td>
              <td>{shop.tagline}</td>
              <td><button onClick={() => handleDeleteShop(shop.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
//src/pages/Admin.jsx