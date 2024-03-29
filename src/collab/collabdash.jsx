// CollabDash.jsx

import React from 'react';
import JobOpportunity from './JobOpportunity'; // Importing the JobOpportunity component
import './styles/CollabDash.css'; // Import CSS file for styling
import Navbar from './navbar';

const CollabDash = () => {
  // Dummy data for job opportunities
  const jobOpportunities = [
    {
        title: 'Handicraft Designer',
        company: 'Artisan Creations',
        location: 'New Delhi, India',
        description: 'We are looking for a talented handicraft designer to create unique and innovative designs for our product range. Candidates should have experience in various handicraft techniques such as pottery, weaving, and wood carving.'
      },
      {
        title: 'Artisan Coordinator',
        company: 'Craftworks Collective',
        location: 'Portland, OR',
        description: 'Craftworks Collective is seeking an artisan coordinator to oversee the production process of handmade crafts. Responsibilities include coordinating with artisans, managing inventory, and ensuring quality standards are met.'
      },
      {
        title: 'Handicraft Sales Representative',
        company: 'Global Handmade',
        location: 'Paris, France',
        description: 'Global Handmade is hiring a sales representative to promote and sell handmade handicrafts to retail stores and online platforms. Candidates should have excellent communication skills and a passion for artisanal products.'
      }
    // Add more dummy job objects as needed
  ];

  return (
    <div className="main">
    <Navbar/>
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
}

export default CollabDash;
