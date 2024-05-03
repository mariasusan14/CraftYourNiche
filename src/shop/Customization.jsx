import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

const CustomisationShopComponent = () => {
  const [customisationRequests, setCustomisationRequests] = useState([]);

  useEffect(() => {
    fetchCustomisationRequests();
  }, []);

  const fetchCustomisationRequests = async () => {
    try {
      const customisationRequestsData = [];
      const querySnapshot = await getDocs(collection(db, 'customisation'));
      querySnapshot.forEach((doc) => {
        customisationRequestsData.push({ id: doc.id, ...doc.data() });
      });
      setCustomisationRequests(customisationRequestsData);
    } catch (error) {
      console.error('Error fetching customisation requests:', error);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      // Update the status of the customisation request to accepted
      const requestRef = doc(db, 'customisation', requestId);
      await updateDoc(requestRef, { status: 'accepted' });
      // You can also update other fields like reply description, cost, etc.
      console.log('Customisation request accepted successfully!');
    } catch (error) {
      console.error('Error accepting customisation request:', error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      // Update the status of the customisation request to rejected
      const requestRef = doc(db, 'customisation', requestId);
      await updateDoc(requestRef, { status: 'rejected' });
      // You can also update other fields like rejection reason, reply description, etc.
      console.log('Customisation request rejected successfully!');
    } catch (error) {
      console.error('Error rejecting customisation request:', error);
    }
  };

  return (
    <div>
      <h2>Customisation Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Product ID</th>
            <th>Customer ID</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customisationRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.productId}</td>
              <td>{request.customerId}</td>
              <td>{request.status}</td>
              <td>
                <button onClick={() => handleAcceptRequest(request.id)}>Accept</button>
                <button onClick={() => handleRejectRequest(request.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomisationShopComponent;
