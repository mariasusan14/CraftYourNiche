import React, { useEffect, useState } from 'react';
import JobOpportunity from './JobOpportunity';
import './styles/CollabDash.css';
import Navbar from './navbar';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase'; 
import './styles/CollabDash.css';

const CollabDash = () => {
  const [jobOpportunities, setJobOpportunities] = useState([]);

  useEffect(() => {
    fetchJobOpportunities();
  }, []);

  const fetchJobOpportunities = async () => {
    try {
      const jobData = [];
      const collaborationRequestsQuerySnapshot = await getDocs(collection(db, 'collaborationRequests'));
     
      // Iterate over each document in the collaborationRequests collection
      for (const collabDoc of collaborationRequestsQuerySnapshot.docs) {
        const requestsCollectionRef = collection(collabDoc.ref, 'requests');
        const requestsQuerySnapshot = await getDocs(query(requestsCollectionRef, where('status', '==', 'open')));

        // Iterate over each document in the requests subcollection
        requestsQuerySnapshot.forEach((requestDoc) => {
          const requestData = requestDoc.data();
          // Extract required fields and add them to the jobData array
          const job = {
            requestid: requestData.requestid,
            shopid: requestData.shopid,
            title: requestData.projectTitle,
            // company: requestData.companyName, // Add your company name if available
            description: requestData.projectDescription,
            skills: requestData.requiredSkills,
            deadline: requestData.deadline // Convert Firebase Timestamp to JavaScript Date
          };
          jobData.push(job);
        });
      }
      
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