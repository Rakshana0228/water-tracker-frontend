import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
      <Link to="/tracker">Tracker</Link>
      <Link to="/history">History</Link>
      <Link to="/profile">Profile</Link>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Navbar;
