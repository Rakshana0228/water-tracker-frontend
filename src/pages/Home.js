import React from 'react';
import './Home.css';

function Home() {
  return (
    <div>
      <div className="main-header">Water Intake Monitor</div>

      <div className="home-container">
        <h2>“Drinking water is essential to a healthy lifestyle.”</h2>
        <p>“Hydrate like you mean it!”</p>

        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="droplet"
            style={{
              left: `${Math.random() * 100}vw`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
