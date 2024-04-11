import React, { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import './styles/ViewResponses.css'; // Import CSS file

const ViewResponses = ({ requestId }) => {
  const [responses, setResponses] = useState([]);
  const [contactInfo, setContactInfo] = useState({}); // State to manage contact details for each response

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const userId = auth.currentUser.uid;
      const requestDocRef = doc(db, 'collaborationRequests', userId, 'requests', requestId);
      const requestDocSnapshot = await getDoc(requestDocRef);
      const requestData = requestDocSnapshot.data();
      
      if (requestData) {
        const filteredResponses = requestData.responses.filter(response => response.status !== 'rejected');
        setResponses(filteredResponses);
      }
    } catch (error) {
      console.error('Error fetching responses:', error);
    }
  };

  const handleAcceptResponse = async (responseId) => {
    try {
      const userId = auth.currentUser.uid;
      const requestDocRef = doc(db, 'collaborationRequests', userId, 'requests', requestId);
      const requestDocSnapshot = await getDoc(requestDocRef);
      const requestData = requestDocSnapshot.data();
      
      if (requestData) {
        const updatedResponses = requestData.responses.map(response => {
          if (response.id === responseId) {
            return { ...response, status: 'accepted' };
          }
          return response;
        });
        
        await updateDoc(requestDocRef, { responses: updatedResponses });
        setResponses(updatedResponses.filter(response => response.status !== 'rejected'));
      }
    } catch (error) {
      console.error('Error accepting response:', error);
    }
  };
  
  const handleRejectResponse = async (responseId) => {
    try {
      const userId = auth.currentUser.uid;
      const requestDocRef = doc(db, 'collaborationRequests', userId, 'requests', requestId);
      const requestDocSnapshot = await getDoc(requestDocRef);
      const requestData = requestDocSnapshot.data();
  
      if (requestData) {
        const updatedResponses = requestData.responses.map(response => {
          if (response.id === responseId) {
            return { ...response, status: 'rejected' };
          }
          return response;
        });
  
        await updateDoc(requestDocRef, { responses: updatedResponses });
        setResponses(updatedResponses.filter(response => response.status !== 'rejected'));
      }
    } catch (error) {
      console.error('Error rejecting response:', error);
    }
  };

  const handleContactResponse = (responseId, email, phoneNumber) => {
    // Set contactInfo state for the corresponding response
    setContactInfo(prevContactInfo => ({
      ...prevContactInfo,
      [responseId]: { email, phoneNumber }
    }));
  };

  return (
    <div className="view-responses">
      <h2>Responses</h2>
      {responses.map((response) => (
        <div className="response-card" key={response.id}>
          <div className="response-details">
            <p>Name: {response.fullName}</p>
            <p>Skills: {response.skills}</p>
            <p>Experience: {response.experience}</p>
            {/* Display other response details */}
          </div>
          <div className="response-actions">
            {response.status !== 'accepted' && (
              <React.Fragment>
                <button onClick={() => handleAcceptResponse(response.id)}>Accept</button>
                <button onClick={() => handleRejectResponse(response.id)}>Reject</button>
              </React.Fragment>
            )}
            {response.status === 'accepted' && (
              <button onClick={() => handleContactResponse(response.id, response.email, response.phoneNumber)}>Contact</button>
            )}
          </div>
          {contactInfo[response.id] && ( // Render contact info if exists for the response
            <div className="contact-info">
              <p>Email: {contactInfo[response.id].email}</p>
              <p>Phone Number: {contactInfo[response.id].phoneNumber}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ViewResponses;
