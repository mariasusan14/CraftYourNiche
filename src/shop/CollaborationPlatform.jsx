import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { db, auth } from '../config/firebase';
import './styles/CollaborationShop.css';
import Navbar from '../shop/navbar';
import { collection, getDoc, doc, addDoc,setDoc,getDocs ,updateDoc} from 'firebase/firestore';

const CollaborationPlatform = () => {
  const navigate = useNavigate(); 
  const [collaborationRequests, setCollaborationRequests] = useState([]);

  useEffect(() => {
    fetchCollaborationRequests();
  }, []);

  const fetchCollaborationRequests = async () => {
    try {
      const userId = auth.currentUser.uid;
      const userDocRef = doc(db, 'collaborationRequests', userId);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const requestsSnapshot = await getDocs(collection(userDocRef, 'requests'));
        const userRequests = requestsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCollaborationRequests(userRequests);
      } else {
        console.error('User document does not exist');
      }
    } catch (error) {
      console.error('Error fetching collaboration requests:', error);
    }
  };

  const handleSubmitRequest = async (event) => {
    event.preventDefault();
    try {
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
      const userDocRef = doc(db, 'collaborationRequests', userId); 
      const userDocSnapshot = await getDoc(userDocRef);
      if (!userDocSnapshot.exists()) {
        await setDoc(userDocRef, { shopid: userId }); 
      }

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
            {/* <h2>Collaboration Requests</h2> */}
            <button className='collaboration-request-btn' onClick={handleViewCollaborationRequests}>View Collaboration Requests</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CollaborationPlatform;
