import React from 'react';
import { Link } from 'react-router-dom';
import './styles/JobOpportunities.css'; // Import CSS file for styling

const JobOpportunity = ({ job }) => {
  console.log("hii");
  console.log(job);
  return (
    <div className="job">
      {console.log(job.title)}
      <h2>{job.title}</h2>
      <hr /><br />
      {/* <p><strong>Company:</strong> {job.company}</p> */}
      <p>{job.description}</p>
      <p><strong>Skills Required:</strong> {job.skills}</p>
      <p><strong>Deadline:</strong> {job.deadline}</p>
      <Link to={`/details/${job.shopid}/${job.requestid}`}> {/* Link to CollabDetails with shopId */}
        <button className="apply-button">Apply</button>
      </Link>
    </div>
  );
}

export default JobOpportunity;