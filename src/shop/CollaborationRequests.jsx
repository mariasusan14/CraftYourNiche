import React, { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import './styles/CollaborationRequests.css';
import ViewResponses from './ViewResponses';
import { Link } from 'react-router-dom';

const CollaborationRequests = () => {
  const [collaborationRequests, setCollaborationRequests] = useState([]);

  useEffect(() => {
    fetchCollaborationRequests();
  }, []);

  const fetchCollaborationRequests = async () => {
    try {
      const userId = auth.currentUser.uid;
      const userDocRef = doc(collection(db, 'collaborationRequests'), userId);
      const requestsSnapshot = await getDocs(collection(userDocRef, 'requests'));
      const userRequests = requestsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), showResponses: false }));
      setCollaborationRequests(userRequests);
    } catch (error) {
      console.error('Error fetching collaboration requests:', error);
    }
  };

  const handleViewResponses = (requestId) => {
    setCollaborationRequests(prevRequests => prevRequests.map(request => {
      if (request.id === requestId) {
        return { ...request, showResponses: !request.showResponses };
      }
      return request;
    }));
  };

  const handleCloseRequest = async (requestId) => {
    try {
      const userId = auth.currentUser.uid;
      const userDocRef = doc(collection(db, 'collaborationRequests'), userId);
      const requestDocRef = doc(collection(userDocRef, 'requests'), requestId);
      
      await updateDoc(requestDocRef, { status: 'closed' });
      
      setCollaborationRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));
    } catch (error) {
      console.error('Error closing request:', error);
    }
  };

  return (
    <div className="collaboration-requests-page">
      <h2>Collaboration Requests</h2>
      <ul>
        {collaborationRequests.map((request) => (
          <li key={request.id}>
            <div className="request-details">
              <h3>{request.projectTitle}</h3>
              <p>{request.projectDescription}</p>
              <p>Required Skills: {request.requiredSkills}</p>
              <p>Deadline: {request.deadline}</p>
              <button onClick={() => handleViewResponses(request.id)}>View Responses</button>
              <button onClick={() => handleCloseRequest(request.id)}>Close Request</button>
              
              {request.showResponses && <ViewResponses requestId={request.id} />}
              
            </div>
          </li>
        ))}
      </ul>
      <Link to="/collabdashshop">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default CollaborationRequests;
