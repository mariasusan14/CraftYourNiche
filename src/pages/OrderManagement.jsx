import React, { useState,useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db,auth } from '../config/firebase';

const OrderManagement = () => {
  
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = auth.currentUser.uid;
        const cartDocRef = doc(db, 'orders', userId);
        
        // Check if the cart document exists
        const cartDocSnapshot = await getDoc(cartDocRef);
        if (cartDocSnapshot.exists()) {
          // If the cart document exists, fetch the cart items
          const cartData = cartDocSnapshot.data();
          const fetchedCartItems = cartData.products || [];
          setCartItems(fetchedCartItems);

          
        } else {
          console.log('Cart document does not exist for the user.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shopping cart items:', error);
        setLoading(false);
      }
    };
  
    fetchCartItems();
  }, []);

  return (
    <div>
      <h2>Order Management</h2>
      <table>
        <thead>
          <tr>            
            <th>Image</th>
            <th>Product Name</th>            
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(order => (
            <tr key={order.product.productId}>
              
              <td><img src={order.product.url} alt={order.product.title} style={{ width: '50px', height: '50px' }} /></td>
              <td>{order.product.title}</td>
              
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderManagement;
