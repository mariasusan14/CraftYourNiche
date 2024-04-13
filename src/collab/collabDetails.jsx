import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import './styles/collabDetails.css';
import { addDoc, collection, doc, updateDoc,getDoc } from 'firebase/firestore';
import { db } from '../config/firebase'; // Import your Firebase instance

function CollabDetails() {
  const navigate = useNavigate();
  const { shopId, requestId } = useParams(); // Get the shopId and requestId from the URL parameters
  
  const [resumeDetails, setResumeDetails] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    experience: '',
    skills: '',
    status: 'pending'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (Object.values(resumeDetails).every(value => value !== '')) {
      try {
        // Reference to the document in the requests subcollection
        const requestRef = doc(db, 'collaborationRequests', shopId, 'requests', requestId);
  
        // Get the current data of the request document
        const requestDoc = await getDoc(requestRef);
        const requestData = requestDoc.data();
  
        // Add the new response to the responses array
        const newResponses = [...requestData.responses, resumeDetails];
  
        // Update the responses array in the request document
        await updateDoc(requestRef, { responses: newResponses });
  
        // Clear form fields
        setResumeDetails({
          fullName: '',
          email: '',
          phoneNumber: '',
          experience: '',
          skills: ''
        });
  
        // Navigate back to the previous page
        navigate(-1);
      } catch (error) {
        console.error('Error adding response: ', error);
      }
    } else {
      alert('Please fill in all details.');
    }
  };
  

  const isSubmitDisabled = Object.values(resumeDetails).some(value => value === '');

  return (
    <div className="container">
      <h2>Input Details</h2>
      <hr />
      <br />
      <form onSubmit={handleSubmit}>
        <div className='form-items'>
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" name="fullName" value={resumeDetails.fullName} onChange={handleChange} />
        </div>
        <div className='form-items'>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={resumeDetails.email} onChange={handleChange} />
        </div>
        <div className='form-items'>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" value={resumeDetails.phoneNumber} onChange={handleChange} />
        </div>
        <div className='form-items'>
          <label htmlFor="experience">Experience:</label>
          <textarea id="experience" name="experience" value={resumeDetails.experience} onChange={handleChange}></textarea>
        </div>
        <div className='form-items'>
          <label htmlFor="skills">Skills:</label>
          <textarea id="skills" name="skills" value={resumeDetails.skills} onChange={handleChange}></textarea>
        </div>
        <button type="submit" disabled={isSubmitDisabled}>Submit</button>
      </form>
    </div>
  );
}

export default CollabDetails;
