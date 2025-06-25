import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tracker.css';

function Tracker() {
  const [amount, setAmount] = useState('');
  const [entries, setEntries] = useState([]);
  const [goalMsg, setGoalMsg] = useState('');
  const [goal, setGoal] = useState(3000);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.userId;

  const fetchGoal = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/goals/${userId}`);
      if (res.data && res.data.goal) {
        setGoal(res.data.goal);
      }
    } catch {
      console.log('No existing goal found.');
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/intake/${userId}`);
      setEntries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchGoal();
      fetchHistory();
    }
  }, [userId]);

  useEffect(() => {
    const total = entries.reduce((acc, curr) => acc + curr.value, 0);
    setGoalMsg(total >= goal
      ? "🎉 You've reached your daily water goal!"
      : `Keep going! ${goal - total}ml left to reach your goal.`);
  }, [entries, goal]);

 const handleAdd = async () => {
  if (amount && !isNaN(amount)) {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.userId;

    if (!userId) {
      alert('User not found. Please login again.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/intake', {
        userId,
        value: parseInt(amount)
      });

      const newEntry = response.data;
      setEntries([...entries, newEntry]);
      setAmount('');
    } catch (error) {
      console.error('Error adding intake:', error);
      alert('Error adding intake. Please login again.');
    }
  }
};


  return (
    <div className="page-background">
      <div className="tracker-container">
        <div className="tracker-box">
          <h2>Track Your Water Intake</h2>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount in ml"
          />
          <button onClick={handleAdd}>Add</button>
          <div className="goal-reminder">{goalMsg}</div>
          <p>Total Entries: {entries.length}</p>
        </div>

        <div className="chart-container">
          <h3>Intake Chart</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
            {entries.map((entry, i) => (
              <div
                key={i}
                className="bar"
                title={`${entry.value} ml\n${entry.time}`}
                style={{
                  height: `${entry.value / 10}px`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tracker;
