import React, { useState } from 'react';
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement login logic here
    
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <h2><center>Sign in</center></h2>
      <br></br>
      <p>Log in by entering your email address and password.</p>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br></br>
        <button 
        className="login-btn" 
        type="submit">Log in</button>
      </form>
      <br></br>
      <p>
        <a href="#">Forgot password?</a>
      </p>
      <br></br>
      <p>
        Don't have an account? <a href="signup">Sign up here</a>
      </p>
    </div>
  );
}

export default Login;
