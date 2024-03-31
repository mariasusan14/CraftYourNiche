// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase'; // Import your Firebase configuration
import './styles/CollaborationShop.css'; // Import CSS file for styling
import Navbar from '../shop/navbar';
import { collection, getDocs, doc, addDoc,getDoc } from 'firebase/firestore';

// Define the CollaborationPlatform component
const CollaborationPlatform = () => {
  // State to manage collaboration requests and responses
  const [collaborationRequests, setCollaborationRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responses, setResponses] = useState([]);

  // useEffect hook to fetch collaboration requests on component mount
  useEffect(() => {
    fetchCollaborationRequests();
  }, []);


 // Function to fetch collaboration requests from Firestore
const fetchCollaborationRequests = async () => {
  try {
    const userId = auth.currentUser.uid; // Get the current user's UID
    const userDocRef = doc(collection(db, 'collaborationRequests'), userId); // Reference to the document with userId as the ID in the "collaborationRequests" collection

    // Fetch collaboration requests from the "requests" subcollection of the current user
    const requestsSnapshot = await getDocs(collection(userDocRef, 'requests'));
    const userRequests = requestsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Combine collaboration requests and user-specific requests
    const allRequests = [...userRequests];
    
    // Set the collaboration requests state
    setCollaborationRequests(allRequests);
  } catch (error) {
    console.error('Error fetching collaboration requests:', error);
  }
};


  // Function to handle submission of collaboration request form
  const handleSubmitRequest = async (event) => {
    event.preventDefault();
    try {
      // Extract form data
      const newRequest = {
        projectTitle: event.target.projectTitle.value,
        projectDescription: event.target.projectDescription.value,
        requiredSkills: event.target.requiredSkills.value,
        deadline: event.target.deadline.value,
        status: 'open',
        responses: []
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
      await addDoc(requestsCollectionRef, newRequest);

      // Clear form fields
      event.target.reset();

      // Fetch updated collaboration requests
      fetchCollaborationRequests();
    } catch (error) {
      console.error('Error submitting collaboration request:', error);
    }
  };

  // Function to handle viewing responses for a specific request
  const handleViewResponses = (request) => {
    setSelectedRequest(request);
  };

  // Function to handle accepting a response
  const handleAcceptResponse = (response) => {
    // Logic to accept the response
  };

  // Function to handle rejecting a response
  const handleRejectResponse = (response) => {
    // Logic to reject the response
  };

  // JSX rendering
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
