import React, { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase';
import { getDoc, doc, updateDoc, getDocs,query,where,collection } from 'firebase/firestore';
import './styles/ViewResponses.css'; // Import CSS file

const ViewResponses = ({ requestId }) => {
  const [responses, setResponses] = useState([]);
  // const [contactInfo, setContactInfo] = useState({}); // State to manage contact details for each response

  useEffect(() => {
    fetchResponses();
  }, []);
 
  const fetchResponses = async () => {
    try {
      

        const userApplicationsQuery = query(collection(db, 'collaborationResponses'), where('requestId', '==', requestId));
        const userApplicationsSnapshot = await getDocs(userApplicationsQuery);
        const allResponses = [];
        for (const docSnap of userApplicationsSnapshot.docs) {
          const { email, experience, skills,status ,fullName,phoneNumber} = docSnap.data();
      
          allResponses.push({
            id: docSnap.id, // Example combination of properties for a unique key
            email, 
            experience, 
            skills, 
            status,
            fullName,
            phoneNumber
        });
        
        }       
        setResponses(allResponses)
    } catch (error) {
      console.error('Error fetching responses:', error);
    }
  
  };

  const handleAcceptResponse = async (responseId) => {
    try {
      
      const responseDocRef = doc(db, 'collaborationResponses', responseId); 
      const responseDocSnapshot = await getDoc(responseDocRef);
      const responseData = responseDocSnapshot.data();
      if (responseData) {
        await updateDoc(responseDocRef, { status: 'accepted' });
        fetchResponses(); // Update the UI with the new status
      }
    } catch (error) {
      console.error('Error accepting response:', error);
    }
  };
  
  
  const handleRejectResponse = async (responseId) => {
    try {
      const requestDocRef = doc(db, 'collaborationResponses', responseId);
      const requestDocSnapshot = await getDoc(requestDocRef);
      const requestData = requestDocSnapshot.data();
  
      if (requestData) {
        await updateDoc(requestDocRef, { status: 'rejected' });
        fetchResponses(); // Call fetchResponses to update the UI with the new status
      }
    } catch (error) {
      console.error('Error rejecting response:', error);
    }
  };
  

  // const handleContactResponse = (responseId, email, phoneNumber) => {
  //   // Set contactInfo state for the corresponding response
  //   setContactInfo(prevContactInfo => ({
  //     ...prevContactInfo,
  //     [responseId]: { email, phoneNumber }
  //   }));
  // };

  return (
    <div className="view-responses">
      <h2>Responses</h2>
      {responses
      .filter(response => response.status !== 'rejected')
      .map((response) => (
        <div className="response-card" key={response.id}>
          <div className="response-details">
            <p>Name: {response.fullName}</p>
            <p>Skills: {response.skills}</p>
            <p>Experience: {response.experience}</p>
            <p>Phone Number: {response.phoneNumber}</p>
            <p>Email: {response.email}</p>
            {/* Display other response details */}
          </div>
          <div className="response-actions">
            {response.status !== 'accepted' && (
              <React.Fragment>
                <button onClick={() => handleAcceptResponse(response.id)}>Accept</button>
                <button onClick={() => handleRejectResponse(response.id)}>Reject</button>
              </React.Fragment>
            )}
            {/* {response.status === 'accepted' && (
              <button onClick={() => handleContactResponse(response.id, response.email, response.phoneNumber)}>Contact</button>
            )} */}
          </div>
          {/* {contactInfo[response.id] && ( // Render contact info if exists for the response
            <div className="contact-info">
              <p>Email: {contactInfo[response.id].email}</p>
              <p>Phone Number: {contactInfo[response.id].phoneNumber}</p>
            </div>
          )} */}
        </div>
      ))}
    </div>
  );
};

export default ViewResponses;
