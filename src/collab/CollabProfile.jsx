import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db , auth} from '../config/firebase'; // Import your Firebase instance
import './styles/CollabProfile.css'

const CollabProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user profile data from Firestore when the component mounts
    const fetchUserProfile = async () => {
      try {
        const userId = auth.currentUser.uid; 
        const userDocRef = doc(db, 'user', userId);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setName(userData.fullName);
          setEmail(userData.email);
          setBio(userData.bio || ''); 
        } else {
          console.error('User document does not exist');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = auth.currentUser.uid; 
      const userDocRef = doc(db, 'user', userId);
      await setDoc(userDocRef, {
        fullName: name,
        email: email,
        bio: bio
      }, { merge: true }); 

      console.log('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
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
