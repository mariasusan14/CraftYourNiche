import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc } from '@firebase/firestore';
import { auth, db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState('login'); // 'login' or 'signup'
    
    const navigate = useNavigate();
    const userref = collection(db, 'user');

    const handleToggleMode = () => {
        setMode((prevMode) => (prevMode === 'login' ? 'signup' : 'login'));
    };

    const submitUser = async () => {
        try {
            const userDocRef = await addDoc(userref, { email, password });
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
        <div>
            <div>
                <label>
                    Don't have an account:
                    <input type="checkbox" onChange={handleToggleMode} />
                    {mode === 'login' ? 'Login' : 'Sign Up'}
                </label>
            </div>
            <div>
                <label>
                Email :
                    <input
                        placeholder="email..."
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Password :
                    <input
                        placeholder="password..."
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                </label>                          
                
                {mode === 'signup' && (
                    <label>
                    Full Name :
                        <input placeholder="full name..." />                       
                        
                    </label>
                )}
                {mode === 'signup' && (
                    <label>  
                    Confirm Password :                      
                        <input placeholder="repeat password..." type="password" />
                        
                    </label>
                )}
                {mode === 'signup' && (
                    <label> 
                    User Type :                      
                        <input placeholder="user type"  />
                    </label>
                )}
                <button onClick={mode === 'login' ? login : submitUser}>
                    {mode === 'login' ? 'Login' : 'Sign Up'}
                </button>
            </div>
        </div>
    );
};

export default Auth;
