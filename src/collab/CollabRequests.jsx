import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/CollabRequests.css'
const CollabRequests = () => {
  // Dummy data for job application statuses
  const [applications, setApplications] = useState([
    { id: 1, jobPost: 'Handicraft Designer', company: 'Artisan Creations', status: 'Pending' },
    { id: 2, jobPost: 'Artisan Coordinator', company: 'Craftworks Collective', status: 'Accepted' },
    { id: 3, jobPost: 'Handicraft Sales Representative', company: 'Global Handmade', status: 'Rejected' },
    // Add more dummy application statuses as needed
  ]);

  return (
    <div className='collabreq-container'>
      <h1 className='collabreq-heading'>Collaboration Requests</h1>
      <br /><hr />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Job Post</th>
            <th>Company</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(application => (
            <tr key={application.id}>
              <td>{application.id}</td>
              <td>{application.jobPost}</td>
              <td>{application.company}</td>
              <td>{application.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Link to="/collabdash">
        <button className="bk-button">Back</button>
      </Link>
    </div>
  );
}

export default CollabRequests;
