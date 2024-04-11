import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom'; // Import useHistory to handle navigation
import { db, auth } from '../config/firebase';
import './styles/CollaborationShop.css';
import Navbar from '../shop/navbar';
// import CollaborationRequests from './CollaborationRequests';
import { collection, getDocs, doc, addDoc, updateDoc } from 'firebase/firestore';

const CollaborationPlatform = () => {
  const navigate = useNavigate(); // Get the history object
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
      const userRequests = requestsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCollaborationRequests(userRequests);
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
        requestid: ''
      };
  
      const userId = auth.currentUser.uid;
      const useref = collection(db, 'collaborationRequests');
      const userDocRef = doc(useref, userId);
      const requestsCollectionRef = collection(userDocRef, 'requests');
      const newRequestRef = await addDoc(requestsCollectionRef, newRequest);
      newRequest.requestid = newRequestRef.id;
      await updateDoc(newRequestRef, { requestid: newRequestRef.id });
  
      event.target.reset();
      fetchCollaborationRequests();
    } catch (error) {
      console.error('Error submitting collaboration request:', error);
    }
  };

  // Function to navigate to collaboration requests page
  const handleViewCollaborationRequests = () => {
    navigate('/viewcollabrequests');
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
            <button onClick={handleViewCollaborationRequests}>View Collaboration Requests</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CollaborationPlatform;
