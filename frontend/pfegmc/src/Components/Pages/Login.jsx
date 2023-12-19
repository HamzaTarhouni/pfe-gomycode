import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate hook

  const handleContinue = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/checkLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Set the logged-in user data
        console.log('User role:', data.role);
        console.log('Token:', data.token);

        // Redirect based on user role
        if (data.role === 'admin') {
          navigate('/admin');
        } else if (data.role === 'user') {
          navigate('/user');
        }
      } else {
        // User does not exist or invalid password, show an error message
        console.log('Error:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div className="loginsignup-fields">
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button onClick={handleContinue} id="btn">Continue</button>
        </div>
      </div>
    </div>
  );
};
