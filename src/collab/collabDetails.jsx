import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import './styles/collabDetails.css';
import { addDoc, collection, doc, updateDoc,getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase'; // Import your Firebase instance

function CollabDetails() {
  const navigate = useNavigate();
  const { shopId, requestId } = useParams(); // Get the shopId and requestId from the URL parameters
  const userId=auth.currentUser.uid;
  const [resumeDetails, setResumeDetails] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    experience: '',
    skills: '',
    
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
    try {
      const responseCollectionRef = collection(db, 'collaborationResponses');
      await addDoc(responseCollectionRef, {
        userId: userId,
        shopId: shopId,
        requestId: requestId,
        fullName: resumeDetails.fullName,
        email: resumeDetails.email,
        phoneNumber: resumeDetails.phoneNumber,
        experience: resumeDetails.experience,
        skills: resumeDetails.skills
      });
      console.log('Application submitted successfully');
      navigate('/collabdash');
    } catch (error) {
      console.error('Error submitting application:', error);
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
