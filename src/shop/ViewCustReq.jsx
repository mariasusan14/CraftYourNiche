import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Link } from 'react-router-dom';

const ViewCustomisationRequest = () => {
  const { userId, shopId, requestId } = useParams();
  const [request, setRequest] = useState(null);
  const [replyDescription, setReplyDescription] = useState('');
  const [cost, setCost] = useState('');
  const [costBreakupDescription, setCostBreakupDescription] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    const fetchCustomisationRequest = async () => {
      try {
        const requestDoc = await getDoc(doc(db, `customisation/${userId}/customisationRequests/${shopId}`));
        if (requestDoc.exists()) {
          const requestData = requestDoc.data();
          setRequest(requestData[requestId]);
        } else {
          console.error('Customisation request not found.');
        }
      } catch (error) {
        console.error('Error fetching customisation request:', error);
      }
    };

    fetchCustomisationRequest();
  }, [userId, shopId, requestId]);

  const handleAccept = async () => {
    try {
      const updatedData = {
        status: 'accepted',
        replyDescription,
        cost: Number(cost),
        costBreakupDescription
      };
      await updateCustomisationRequest(updatedData);
      console.log('Customisation request accepted successfully!');
      // Clear fields
      setReplyDescription('');
      setCost('');
      setCostBreakupDescription('');
    } catch (error) {
      console.error('Error accepting customisation request:', error);
    }
  };
  
  const handleReject = async () => {
    try {
      const updatedData = {
        status: 'rejected',
        replyDescription: rejectionReason
      };
      await updateCustomisationRequest(updatedData);
      console.log('Customisation request rejected successfully!');
      // Clear fields
      setRejectionReason('');
    } catch (error) {
      console.error('Error rejecting customisation request:', error);
    }
  };
  
  const updateCustomisationRequest = async (updatedData) => {
    try {
      const requestRef = doc(db, `customisation/${userId}/customisationRequests/${shopId}`);
      const docSnapshot = await getDoc(requestRef);
      if (docSnapshot.exists()) {
        const requestData = docSnapshot.data();
        if (requestData && requestId && requestData[requestId]) {
          const existingData = requestData[requestId];
          const updatedRequestData = { ...existingData, ...updatedData };
          await updateDoc(requestRef, { [requestId]: updatedRequestData });
          console.log('Customisation request updated successfully!');
        } else {
          console.error('Request not found or requestId is invalid.');
        }
      } else {
        console.error('Document does not exist.');
      }
    } catch (error) {
      console.error('Error updating customisation request:', error);
    }
  };

  if (!request) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Customisation Request</h2>
      <p><strong>Request ID:</strong> {requestId}</p>
      <p><strong>User ID:</strong> {userId}</p>
      <p><strong>Shop ID:</strong> {shopId}</p>
      <p><strong>Product ID:</strong> {request.productId}</p>
      <p><strong>Status:</strong> {request.status}</p>
      <p><strong>Color:</strong> {request.color}</p>
      <p><strong>Size:</strong> {request.size}</p>
      <p><strong>Material:</strong> {request.material}</p>
      <p><strong>Engraving:</strong> {request.engraving}</p>
      <p><strong>Design:</strong> {request.design}</p>
      <p><strong>Add Ons:</strong> {request.addOns}</p>
      <p><strong>Customization Instructions:</strong> {request.customizationInstructions}</p>
      <div>
        <strong>Images:</strong>
        {request.images.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Image ${index}`} style={{ width: '100px', height: '100px', margin: '5px' }} />
        ))}
      </div>
      {request.status !== 'rejected' && (
        <div>
          <div>
            <label>Reply Description:</label>
            <input type="text" value={replyDescription} onChange={(e) => setReplyDescription(e.target.value)} />
          </div>
          <div>
            <label>Cost:</label>
            <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} />
          </div>
          <div>
            <label>Cost Breakup Description:</label>
            <input type="text" value={costBreakupDescription} onChange={(e) => setCostBreakupDescription(e.target.value)} />
          </div>
          <Link to ="/customization">
          <button onClick={handleAccept}>Accept</button>
          </Link>
        </div>
      )}
      {request.status !== 'accepted' && (
        <div>
          <div>
            <label>Rejection Reason:</label>
            <input type="text" value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} />
          </div>
          <Link to ="/customization">
          <button onClick={handleReject}>Reject</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ViewCustomisationRequest;
