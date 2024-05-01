// ShopCustomisationComponent.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, doc, getDocs } from 'firebase/firestore';

const ShopCustomisationComponent = ({ shopId }) => {
  const [customisationRequests, setCustomisationRequests] = useState([]);

  useEffect(() => {
    fetchCustomisationRequests();
  }, []);

  const fetchCustomisationRequests = async () => {
    try {
      const customisationRef = collection(db, `customers/${shopId}/customisationRequests`);
      const querySnapshot = await getDocs(customisationRef);
      const requests = [];
      querySnapshot.forEach((doc) => {
        requests.push({ id: doc.id, data: doc.data() });
      });
      setCustomisationRequests(requests);
    } catch (error) {
      console.error('Error fetching customisation requests:', error);
    }
  };

  const respondToRequest = async (requestId, response) => {
    // Add response handling logic here
    console.log(`Responding to request ${requestId}:`, response);
  };

  return (
    <div>
      <h2>Customisation Requests</h2>
      <ul>
        {customisationRequests.map((request) => (
          <li key={request.id}>
            <div>Request ID: {request.id}</div>
            <div>Product ID: {Object.keys(request.data)[0]}</div>
            {/* Display other request details here */}
            <button onClick={() => respondToRequest(request.id, 'Accepted')}>Accept</button>
            <button onClick={() => respondToRequest(request.id, 'Rejected')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopCustomisationComponent;
