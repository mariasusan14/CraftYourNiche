import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/CollabProfile.css'; // Import CSS file for styling

const CollabProfile = () => {
  // State variables to store user profile information
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [bio, setBio] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

  // State variable to track whether the user is in edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit updated profile data to the server
    console.log('Profile updated:', { name, email, bio });
    // You can make an API request to update the user's profile data
    setIsEditing(false); // Exit edit mode after submission
  };

  return (
    <div className="user-profile">
    <h1>Profile</h1>
    <br /><hr /><br />
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
          <div className="btn">
          <button className='save-btn' type="submit">Save</button>
          <button className='cancel-btn' type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div>          
          <div>
            <p><strong>Name:</strong> {name}</p>
            <br />
            <p><strong>Email:</strong> {email}</p>
            <br />
            <p><strong>Bio:</strong> {bio}</p>
            <br />
          </div>
          <div className="btn">
          <Link to="/collabdash">
            <button className="back-btn">Back</button>
          </Link>
          <button className='edit-btn' onClick={() => setIsEditing(true)}>Edit</button>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default CollabProfile;
