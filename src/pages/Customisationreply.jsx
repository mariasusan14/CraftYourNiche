import React, { useState, useEffect } from 'react';
import { doc, getDocs, collection, query, where } from 'firebase/firestore';
import { db, auth } from '../config/firebase';

const  = () => {

  const [customisationRequests, setCustomisationRequests] = useState([]);
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
          
            const image = requestData.images[0] || 'https://creativepaint.com/cdn/shop/products/oc-9-balletwhite_2000x_97180483-e3a9-4c57-a40a-384f63156f4f_400x.png?v=1617319300'; // Assuming there is at least one image
            fetchedCustomisationRequests.push({
              requestId,
              image,
              name: requestData.productName, // You can change this to the actual field name
              status: requestData.status
            });
          });
        });

        setCustomisationRequests(fetchedCustomisationRequests);
        console.log(fetchedCustomisationRequests)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customisation requests:', error);
        setLoading(false);
      }
    };

    fetchCustomisationRequests();
    
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
          {customisationRequests.map((request, index) => (
            <tr key={index}>
              <td><img src={request.image} alt={`Customisation ${index}`} style={{ width: '50px', height: '50px' }} /></td>
              <td>{request.name}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderManagement;