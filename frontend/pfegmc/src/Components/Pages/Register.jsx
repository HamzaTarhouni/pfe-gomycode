import React, { useState } from 'react';
import './Register.css';

export const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstname, lastname, email, password, mobile }),
      });

      const data = await response.json();

      if (response.ok) {
        // Inscription réussie, redirigez ou faites quelque chose d'autre
        setSuccessMessage('Registration successful');
        setErrorMessage(''); // Clear any previous error message
      } else {
        // Gestion des erreurs d'inscription
        setErrorMessage(`Registration failed: ${data.message}`);
        setSuccessMessage(''); // Clear any previous success message
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred during registration');
      setSuccessMessage(''); // Clear any previous success message
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Register</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='First Name' value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
          <input type="text" placeholder='Last Name' value={lastname} onChange={(e) => setLastname(e.target.value)} required />
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="text" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
        </div>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button onClick={handleRegister} id="btn">Register</button>
        
       
      </div>
    </div>
  );
};
