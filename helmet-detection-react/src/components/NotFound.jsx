import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{display: 'flex',height: '80vh',alignItems: 'center',justifyContent: 'center',flexDirection: 'column'}}>
      <h1 style={{fontSize: 48, marginBottom: 8}}>404</h1>
      <p style={{fontSize: 18, marginBottom: 16}}>Page not found.</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default NotFound;
