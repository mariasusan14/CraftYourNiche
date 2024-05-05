import React, { useState, useEffect } from 'react';
import { doc, getDocs, collection, query, where } from 'firebase/firestore';
import { db, auth } from '../config/firebase';

const OrderManagement = () => {
  const [customisationRequests, setCustomisationRequests] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomisationRequests = async () => {
      try {
        const userId = auth.currentUser.uid;

        // Fetch customisation requests
        const customisationRef = collection(db, 'customisation', userId, 'customisationRequests');
        const customisationSnapshot = await getDocs(customisationRef);
        const fetchedCustomisationRequests = [];

        customisationSnapshot.forEach((doc) => {
          const customisationData = doc.data();
          const requestIdMap = customisationData;

          Object.keys(requestIdMap).forEach((requestId) => {
            const requestData = requestIdMap[requestId];
            const image = requestData.images[0] || 'https://creativepaint.com/cdn/shop/products/oc-9-balletwhite_2000x_97180483-e3a9-4c57-a40a-384f63156f4f_400x.png';
            fetchedCustomisationRequests.push({
              requestId,
              image,
              name: requestData.productName,
              status: requestData.status
            });
          });
        });

        setCustomisationRequests(fetchedCustomisationRequests);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customisation requests:', error);
        setLoading(false);
      }
    };

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

    fetchCustomisationRequests();
    fetchCartItems();
  }, []);

  return (
    <div>
      <h2>Order Management</h2>
      <div>
        <h3>Customisation Requests</h3>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {customisationRequests.map((request, index) => (
              <tr key={`customisation-${index}`}>
                <td>
                  <img src={request.image} alt={`Customisation ${index}`} style={{ width: '50px', height: '50px' }} />
                </td>
                <td>{request.name}</td>
                <td>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3>Shopping Cart Items</h3>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((order, index) => (
              <tr key={`cart-item-${index}`}>
                <td>
                  <img src={order.product.url} alt={order.product.title} style={{ width: '50px', height: '50px' }} />
                </td>
                <td>{order.product.title}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
