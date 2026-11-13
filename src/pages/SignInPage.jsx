import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalState } from '../context/StateContext';
import './SignInPage.css';

export default function SignInPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { dispatch } = useGlobalState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (isRegistering && !name.trim()) {
      setError('Please enter your name.');
      return;
    }

    const userData = {
      name: isRegistering ? name.trim() : email.split('@')[0],
      email: email.trim(),
      id: `usr_${Date.now()}`
    };

    dispatch({ type: 'SET_USER', payload: userData });
    navigate(-1);
  };

  return (
    <div className="signin-container">
      <Link to="/" className="signin-logo-link">
        <div className="signin-logo">
          amazon<span>.in</span>
        </div>
      </Link>

      <div className="signin-card">
        <h1 className="signin-title">
          {isRegistering ? 'Create Account' : 'Sign in'}
        </h1>

        {error && (
          <div style={{ color: '#b12704', fontSize: '13px', marginBottom: '12px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="signin-form">
          {isRegistering && (
            <div className="form-group">
              <label className="form-label" htmlFor="name">Your name</label>
              <input
                id="name"
                type="text"
                className="form-input"
                placeholder="First and last name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email or mobile phone number</label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder={isRegistering ? 'At least 6 characters' : ''}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signin-submit-btn">
            {isRegistering ? 'Continue' : 'Sign in'}
          </button>

          <p className="signin-terms">
            By continuing, you agree to Amazon's <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.
          </p>
        </form>
      </div>

      <div className="signin-divider">
        <span className="divider-line" />
        <span className="divider-text">
          {isRegistering ? 'Already have an account?' : 'New to Amazon?'}
        </span>
        <span className="divider-line" />
      </div>

      <button
        type="button"
        className="create-account-btn"
        onClick={() => {
          setIsRegistering(!isRegistering);
          setError('');
        }}
      >
        {isRegistering ? 'Sign in with your Amazon account' : 'Create your Amazon account'}
      </button>

      <div className="signin-footer">
        <div className="signin-footer-links">
          <a href="#">Conditions of Use</a>
          <a href="#">Privacy Notice</a>
          <a href="#">Help</a>
        </div>
        <p>© 1996-2026, Amazon.com, Inc. or its affiliates</p>
      </div>
    </div>
  );
}
