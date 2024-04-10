import React, { useEffect, useState } from 'react';
import JobOpportunity from './JobOpportunity';
import './styles/CollabDash.css';
import Navbar from './navbar';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../config/firebase'; 
import './styles/CollabDash.css'
const CollabDash = () => {
  const [jobOpportunities, setJobOpportunities] = useState([]);

  useEffect(() => {
    fetchJobOpportunities();
  }, []);

  const fetchJobOpportunities = async () => {
    try {
      const jobData = [];
      const collaborationRequestsQuerySnapshot = await getDocs(collection(db, 'collaborationRequests'));
     
      // Create an array to store all the promises for fetching requests subcollections
      const requestsPromises = [];
  
      // Iterate over each document in the collaborationRequests collection
      collaborationRequestsQuerySnapshot.forEach((collabDoc) => {
        const requestsCollectionRef = collection(collabDoc.ref, 'requests');
        const requestPromise = getDocs(requestsCollectionRef).then((requestsQuerySnapshot) => {
          // Iterate over each document in the requests subcollection
          requestsQuerySnapshot.forEach((requestDoc) => {
            const requestData = requestDoc.data();
            
            // Extract required fields and add them to the jobData array
            const job = {
              requestid: requestData.requestid,
              shopid :requestData.shopid,
              title: requestData.projectTitle,
              // company: requestData.companyName, // Add your company name if available
              description: requestData.projectDescription,
              skills: requestData.requiredSkills,
              deadline: requestData.deadline // Convert Firebase Timestamp to JavaScript Date
            };
            jobData.push(job);
          });
        });
        requestsPromises.push(requestPromise);
      });
  
      // Wait for all promises to resolve before updating the state
      await Promise.all(requestsPromises);
  
      // Set the job opportunities array after fetching data
      setJobOpportunities(jobData);
    } catch (error) {
      console.error('Error fetching job opportunities:', error);
    }
  };
  

  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <div className="heading">
          <h1>Job Opportunities</h1>
        </div>
        <div className="job-list">
          {jobOpportunities.map((job, index) => (
            <JobOpportunity key={index} job={job} />
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default CollabDash;
