import React, { useState,useEffect } from 'react';
import { doc, getDoc,getDocs,collection,query,where } from 'firebase/firestore';
import { db,auth } from '../config/firebase'; 

const OrderManagement = () => {
  
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = auth.currentUser.uid;
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const fetchedCartItems = [];
        querySnapshot.forEach((doc) => {
          const cartData = doc.data();
          const products = cartData.products || [];
          fetchedCartItems.push(...products);
        });
        setCartItems(fetchedCartItems);
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
