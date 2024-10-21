import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';


const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard'); // Redirect to dashboard if logged in
    }
  }, [navigate]);

  return (
    <div className="home-page">
      <h1>Welcome to the Task Management App</h1>
      <p>Please log in or register to manage your tasks.</p>
      <div className="home-buttons">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
