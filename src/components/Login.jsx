import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { mockAPI } from '../api';
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const response = mockAPI.login(email, password);
    if (response.success) {
      localStorage.setItem('user', JSON.stringify({ email }));
      navigate('/tasks');
    } else {
      setError(response.error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Please sign in to your account</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-button">
            Sign In
          </button>
        </form>
        <p className="sign-up-link">
          Don't have an account? <NavLink to={"/register"} >Sign up</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;