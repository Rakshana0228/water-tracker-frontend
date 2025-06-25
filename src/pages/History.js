import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './History.css';

function History() {
  const [history, setHistory] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.userId;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/intake/${userId}`);
        setHistory(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (userId) fetchHistory();
  }, [userId]);

  return (
    <div className="page-background">
      <div className="history-container">
        <h2>Water Intake History</h2>
        <ul>
          {history.map((entry, i) => (
            <li key={i}>
              {entry.value}ml - {entry.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default History;
