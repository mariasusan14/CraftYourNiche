import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import './styles/CollabRequests.css';

const CollabRequests = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const userId = auth.currentUser.uid;
        
        const userApplicationsQuery = query(collection(db, 'collaborationResponses'), where('userId', '==', userId));
        const userApplicationsSnapshot = await getDocs(userApplicationsQuery);
        const userApplicationsData = [];
        for (const docSnap of userApplicationsSnapshot.docs) {
          const { shopId, requestId, status,projectTitle } = docSnap.data();
          

          // Fetch shopName from shops collection
          const shopDocRef = doc(db, 'shops', shopId);
          const shopDocSnapshot = await getDoc(shopDocRef);
          

          const shopName = shopDocSnapshot.exists() ? shopDocSnapshot.data().shopName : ''; 
          userApplicationsData.push({
            shopName,
            projectTitle,
            status
          });
        }

        setApplications(userApplicationsData);
      } catch (error) {
        console.error('Error fetching collaboration requests:', error);
      }
    };

    fetchApplications();
  }, []);

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
          {applications.map((application, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{application.projectTitle}</td>
              <td>{application.shopName}</td>
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
};

export default CollabRequests;
