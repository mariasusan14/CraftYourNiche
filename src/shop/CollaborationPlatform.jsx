import React, { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase';
import './styles/CollaborationShop.css';
import Navbar from '../shop/navbar';
import { collection, getDocs, doc, addDoc, getDoc,updateDoc } from 'firebase/firestore';

const CollaborationPlatform = () => {
  const [collaborationRequests, setCollaborationRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetchCollaborationRequests();
  }, []);

  const fetchCollaborationRequests = async () => {
    try {
      const userId = auth.currentUser.uid;
      const userDocRef = doc(collection(db, 'collaborationRequests'), userId);

      const requestsSnapshot = await getDocs(collection(userDocRef, 'requests'));
      const userRequests = requestsSnapshot.docs.map(doc => ({ id: doc.id, requestid: doc.id, ...doc.data() }));

      const allRequests = [...userRequests];
      setCollaborationRequests(allRequests);
    } catch (error) {
      console.error('Error fetching collaboration requests:', error);
    }
  };

  const handleSubmitRequest = async (event) => {
    event.preventDefault();
    try {
      // Extract form data
      const newRequest = {
        shopid: auth.currentUser.uid,
        projectTitle: event.target.projectTitle.value,
        projectDescription: event.target.projectDescription.value,
        requiredSkills: event.target.requiredSkills.value,
        deadline: event.target.deadline.value,
        status: 'open',
        responses: [],
        requestid: '' // Initialize requestid
      };
  
      // Get the current user's UID
      const userId = auth.currentUser.uid;
  
      // Reference to the "collaborationRequests" collection
      const useref = collection(db, 'collaborationRequests');
  
      // Reference to the document with userId as the ID in the "collaborationRequests" collection
      const userDocRef = doc(useref, userId);
  
      // Reference to the "requests" subcollection of the user's document
      const requestsCollectionRef = collection(userDocRef, 'requests');
  
      // Add a new document with the specified data in the "requests" subcollection
      const newRequestRef = await addDoc(requestsCollectionRef, newRequest);
  
      // Update the newRequest object with the requestid
      newRequest.requestid = newRequestRef.id;
  
      // Update the document in the "requests" subcollection with the requestid
      await updateDoc(newRequestRef, { requestid: newRequestRef.id });
  
      // Clear form fields
      event.target.reset();
  
      // Fetch updated collaboration requests
      fetchCollaborationRequests();
    } catch (error) {
      console.error('Error submitting collaboration request:', error);
    }
  };
  

  const handleViewResponses = (request) => {
    setSelectedRequest(request);
    fetchResponses(request.id);
  };

  const fetchResponses = async (requestId) => {
    try {
      const requestDocRef = doc(collection(db, 'collaborationRequests', auth.currentUser.uid, 'requests'), requestId);
      const requestDocSnapshot = await getDoc(requestDocRef);
      const requestResponses = requestDocSnapshot.data()?.responses || [];
      setResponses(requestResponses);
    } catch (error) {
      console.error('Error fetching responses:', error);
    }
  };

  const handleAcceptResponse = (response) => {
    // Logic to accept the response
  };

  const handleRejectResponse = (response) => {
    // Logic to reject the response
  };

  return (
    <div className="collab-container">
      <Navbar />
      <div className="collab">
        <section className="collaboration-platform">
          <div className="collaboration-request-form">
            <h2>Post Collaboration Request</h2>
            <hr/>
            <form onSubmit={handleSubmitRequest}>
              <div className="form-group">
                <label htmlFor="projectTitle">Project Title:</label>
                <input type="text" id="projectTitle" required />
              </div>
              <div className="form-group">
                <label htmlFor="projectDescription">Project Description:</label>
                <textarea id="projectDescription" required />
              </div>
              <div className="form-group">
                <label htmlFor="requiredSkills">Required Skills:</label>
                <input type="text" id="requiredSkills" required />
              </div>
              <div className="form-group">
                <label htmlFor="deadline">Deadline:</label>
                <input type="date" id="deadline" required />
              </div>
              <button type="submit">Post Request</button>
            </form>
          </div>
          <div className="collaboration-requests">
            <h2>Collaboration Requests</h2>
            <ul>
              {collaborationRequests.map((request) => (
                <li key={request.id}>
                  <div className="request-details">
                    <h3>{request.projectTitle}</h3>
                    <p>{request.projectDescription}</p>
                    <p>Required Skills: {request.requiredSkills}</p>
                    <p>Deadline: {request.deadline}</p>
                    <button onClick={() => handleViewResponses(request)}>View Responses</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {selectedRequest && (
            <div className="responses-modal">
              <h2>Responses for {selectedRequest.projectTitle}</h2>
              <ul>
                {responses.map((response) => (
                  <li key={response.id}>
                    <div className="response-details">
                      <p>Collaborator: {response.collaboratorName}</p>
                      <p>Contact: {response.collaboratorContact}</p>
                      <p>Message: {response.message}</p>
                    </div>
                    <div className="response-actions">
                      <button onClick={() => handleAcceptResponse(response)}>Accept</button>
                      <button onClick={() => handleRejectResponse(response)}>Reject</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CollaborationPlatform;
