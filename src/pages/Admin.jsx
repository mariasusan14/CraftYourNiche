import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db,auth } from "../config/firebase";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate=useNavigate();
  const [shops, setShops] = useState([]);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "shops"));
      const fetchedShops = [];
      querySnapshot.forEach((doc) => {
        fetchedShops.push({ id: doc.id, ...doc.data() });
      });
      setShops(fetchedShops);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  const handleDeleteShop = async (id) => {
    try {
      await deleteDoc(doc(db, "shops", id));
      setShops(shops.filter((shop) => shop.id !== id));
      console.log("Shop deleted successfully");
    } catch (error) {
      console.error("Error deleting shop:", error);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsCollectionRef = collection(db, "reviews");
        const reviewsSnapshot = await getDocs(reviewsCollectionRef);
        const reviewsData = reviewsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/auth'); 
    } catch (error) {
      console.error('Error during logout:', error);
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
              <td>
                <img src={shop.logoUrl} alt="Shop Logo" />
              </td>
              <td>{shop.shopName}</td>
              <td>{shop.shopAddress}</td>
              <td>{shop.tagline}</td>
              <td>
                <button onClick={() => handleDeleteShop(shop.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="creview">
        <h2>Customer Reviews</h2>
        <div className="creview-list" >
          {reviews.map((review) => (
            <div key={review.id} className="creview-container">
              <div className="creview-field">
                <span className="creview-label">Name:</span>
                <span className="creview-value">{review.name}</span>
              </div>
              <div className="creview-field">
                <span className="creview-label">Email:</span>
                <span className="creview-value">{review.email}</span>
              </div>
              <div className="creview-field">
                <span className="creview-label">Phone:</span>
                <span className="creview-value">{review.phone}</span>
              </div>
              <div className="creview-message">
                <span className="creview-label">Message:</span>
                <p className="creview-value">{review.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminPage;
//src/pages/Admin.jsx
