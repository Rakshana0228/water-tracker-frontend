// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

function Profile() {
  const [goal, setGoal] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userId) {
      axios.get(`http://localhost:5000/api/goals/${user.userId}`)
        .then(res => {
          if (res.data.goal) setGoal(res.data.goal);
        })
        .catch(err => console.error('Error fetching goal:', err));
    }
  }, []);

  const saveGoal = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.userId) {
      alert('User not found. Please login.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/goals', {
        userId: user.userId,
        goal
      });
      alert('Goal saved successfully!');
    } catch (err) {
      console.error('Error saving goal:', err);
      alert('Error saving goal');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>Set Your Daily Water Goal</h2>
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Enter goal in ml"
          required
        />
        <button onClick={saveGoal}>Save Goal</button>
      </div>
    </div>
  );
}

export default Profile;
