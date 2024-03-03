import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from '@firebase/firestore';
import { auth, db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import './auth.css'

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState('login');

    const navigate = useNavigate();
    const userRef = collection(db, 'user');

    const handleToggleMode = () => {
        setMode((prevMode) => (prevMode === 'login' ? 'signup' : 'login'));
    };

    const submitUser = async () => {
        try {
            const userDocRef = await addDoc(userRef, { email, password });
            await createUserWithEmailAndPassword(auth, email, password);

            console.log('User document created in Firestore:', userDocRef.id);
            console.log('User signed up successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in successfully!');
            navigate(`/dashboard/${auth.currentUser.uid}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="auth-container">
            <div>
                {mode === 'signup' && (
                    <label className="auth-label">
                        Full Name:
                        <input className="auth-input" placeholder="full name..." />
                    </label>
                )}
                <label className="auth-label">
                    Email:
                    <input
                        className="auth-input"
                        placeholder="email..."
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label className="auth-label">
                    Password:
                    <input
                        className="auth-input"
                        placeholder="password..."
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                </label>
                {mode === 'signup' && (
                    <label className="auth-label">
                        Confirm Password:
                        <input className="auth-input" placeholder="repeat password..." type="password" />
                    </label>
                )}
                {mode === 'signup' && (
                    <label className="auth-label">
                        User Type:
                        <select className="auth-input">
                            <option value="customer">Customer</option>
                            <option value="shop">Shop</option>
                            <option value="collab">Collaborator</option>
                        </select>
                    </label>
                )}
            </div>
            <div>
                <button className="auth-button" onClick={mode === 'login' ? login : submitUser}>
                    {mode === 'login' ? 'Login' : 'Sign Up'}
                </button>
            </div>
            <div>
            {mode === 'login' && (
                <label className="auth-label">
                    Don't have an account:
                    <input className="auth-checkbox" type="checkbox" onChange={handleToggleMode} />
                </label>
                )}
                
            </div>
        </div>
    );
};

export default Auth;
