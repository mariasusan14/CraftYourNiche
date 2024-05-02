import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const shippingChargePercentage = 0.02;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = auth.currentUser.uid;
        const cartDocRef = doc(db, 'cart', userId);
        
        // Check if the cart document exists
        const cartDocSnapshot = await getDoc(cartDocRef);
        if (cartDocSnapshot.exists()) {
          // If the cart document exists, fetch the cart items
          const cartData = cartDocSnapshot.data();
          const fetchedCartItems = cartData.products || [];
          setCartItems(fetchedCartItems);

          // Calculate total price
          let totalPrice = fetchedCartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
          // Add shipping charge
          totalPrice += totalPrice * shippingChargePercentage;
          setTotal(totalPrice);
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

  const renderCartItems = () => {
    return cartItems.map(item => (
      <tr key={item.product.productId}>
        <td><img src={item.product.url} alt={item.product.title} style={{ width: '50px', height: '50px' }} /></td>
        <td>{item.product.title}</td>
        <td>{item.quantity}</td>
        <td>Rs{item.product.price * item.quantity}</td>
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
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? renderCartItems() : <tr><td colSpan="4">Your cart is empty</td></tr>}
          {total > 0 && (
            <tr>
              <td colSpan="3">Shipping Charge (2%):</td>
              <td>Rs{(total * shippingChargePercentage).toFixed(2)}</td>
            </tr>
          )}
          <tr>
            <td colSpan="3"><strong>Total:</strong></td>
            <td><strong>Rs{total.toFixed(2)}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShoppingCart;
