// JobOpportunity.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './styles/JobOpportunities.css'; // Import CSS file for styling

const JobOpportunity = ({ job }) => {
  return (
    <div className="job">
      <h2>{job.title}</h2>
      <hr /><br />
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p>{job.description}</p>
      <Link to="/details">
        <button className="apply-button">Apply</button>
      </Link>
    </div>
  );
}

export default JobOpportunity;
