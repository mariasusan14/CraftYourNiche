// JobOpportunity.jsx

import React from 'react';
import './styles/JobOpportunities.css'; // Import CSS file for styling

const JobOpportunity = ({ job }) => {
  return (
    <div className="job">
      <h2>{job.title}</h2>
      <hr /><br />
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p>{job.description}</p>
    </div>
  );
}

export default JobOpportunity;
