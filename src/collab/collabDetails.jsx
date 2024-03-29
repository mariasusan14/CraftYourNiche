import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './styles/collabDetails.css';

function CollabDetails() {
  const navigate = useNavigate(); 
  const [resumeDetails, setResumeDetails] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    experience: '',
    skills: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (Object.values(resumeDetails).every(value => value !== '')) {
      
      console.log('Submitted resume details:', resumeDetails);
      
      navigate('/collabdash');
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
