import React, { useState, useEffect, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import Context from '../Context/Context';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const products = useContext(Context); // Assuming products are available in Context

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Fetch shopping cart items for the logged-in user
        const userId = getCurrentUserId(); // You need to implement this function
        const cartItemsQuery = query(
          collection(db, 'customers', userId, 'shoppingcart', 'products')
        );
        const querySnapshot = await getDocs(cartItemsQuery);
        const fetchedCartItems = querySnapshot.docs.map(doc => doc.data());
        setCartItems(fetchedCartItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shopping cart items:', error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const getCurrentUserId = () => {
    // Implement your logic to get the current user's ID
    // This could be from Firebase Authentication
    return 'currentUserId'; // For demonstration, replace with actual user ID
  };

  const renderCartItems = () => {
    return cartItems.map(item => (
      <tr key={item.productId}>
        <td><img src={item.url} alt={item.title} style={{ width: '50px', height: '50px' }} /></td>
        <td>{item.title}</td>
        <td>${item.price}</td>
      </tr>
    ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? renderCartItems() : <tr><td colSpan="3">Your cart is empty</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default ShoppingCart;
