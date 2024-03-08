import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getDocs, query, where } from '@firebase/firestore';
import { auth, db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaCheck, FaUserTag } from 'react-icons/fa';
import './auth.css';

const Auth = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('customer'); // Initialize userType with a default value
  const [mode, setMode] = useState('login');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const userRef = collection(db, 'user');

  const handleToggleMode = () => {
    setMode((prevMode) => (prevMode === 'login' ? 'signup' : 'login'));
    setError(null); // Clear any previous errors when toggling mode
  };

  const checkExistingAccount = async () => {
    const userQuery = query(userRef, where('email', '==', email));
    const querySnapshot = await getDocs(userQuery);

    return !querySnapshot.empty;
  };

  const validateSignUpFields = () => {
    return fullName &&email && password && confirmPassword === password;
  };

  const submitUser = async () => {
    try {
      const existingAccount = await checkExistingAccount();

      if (existingAccount) {
        setError('Account already exists. Please log in or use a different email.');
      } else if (!validateSignUpFields()) {
        setError('Please fill in all fields and ensure passwords match.');
      } else {
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Get the user's UID from the authentication result
        const userId = userCredential.user.uid;

        // Create user in Firestore with additional fields
        const userDocRef = await addDoc(userRef, {
          userId,
          fullName,
          email,
          password,
          userType,
        });

        console.log('User document created in Firestore:', userDocRef.id);
        console.log('User signed up successfully!');
        navigate(`/dashboard/${userId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Get the user's UID from the authentication result
      const userId = userCredential.user.uid;

      console.log('User logged in successfully!');
      navigate(`/dashboard/${userId}`);
    } catch (error) {
      setError('Invalid email or password. Please try again.'); // Set login error message
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="auth-container">
        <div>
          {mode === 'signup' && (
            <label className="auth-label">
              <FaUser />
              <input
                className="auth-input"
                placeholder="full name..."
                onChange={(e) => setFullName(e.target.value)}
              />
            </label>
          )}
          <label className="auth-label">
            <FaEnvelope />
            <input
              className="auth-input"
              placeholder="email..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="auth-label">
            <FaLock />
            <input
              className="auth-input"
              placeholder="password..."
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </label>
          {mode === 'signup' && (
            <label className="auth-label">
              <FaLock />
              <input
                className="auth-input"
                placeholder="confirm password..."
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          )}
          {mode === 'signup' && (
            <label className="auth-label">
              <FaUserTag />
              <select
                className="auth-input"
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="customer">Customer</option>
                <option value="shop">Shop</option>
                <option value="collab">Collaborator</option>
              </select>
            </label>
          )}
        </div>
        <div>
          <button className="auth-button " onClick={mode === 'login' ? login : submitUser}>
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </div>
        <div>
          {mode === 'login' && (
            <label className="auth-label">
              Create a new account
              <input className="auth-checkbox" type="checkbox" onChange={handleToggleMode} />
            </label>
          )}

          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Auth;
