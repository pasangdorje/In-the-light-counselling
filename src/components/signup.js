import React, { useState } from 'react';
import "../styles/signup.css";

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement sign-up logic here
    
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="signup-container">
      <h2><center>Sign up</center></h2>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="input-field">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="email">Email address</label>
          <div className="input-icon">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="input-icon">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="input-group">
          <label className="checkbox-container">
            <input type="checkbox" required />
            By creating an account, you are agree to the Terms of Service and Privacy Policy.
          </label>
        </div>
        <br></br>
      <button className="signup-btn"  type="submit">Sign Up</button>
      </form>
      <br></br>      
      <p>
        Already have an account? <a href="login">Log in here</a>
      </p>
    </div>
  );
}

export default SignUp;
