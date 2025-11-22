import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
       <div className="hero-content">
          <h1>Protect Your Digital World</h1>
         <p>Learn about cybersecurity threats through interactive simulations and educational content</p>
          <div className="hero-buttons">
           <Link to="/simulator" className="btn btn-primary">Try Simulator</Link>
           <Link to="/attacks" className="btn btn-danger">Learn About Attacks</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>What You'll Learn</h2>
          <div className="feature-grid">
           <div className="feature-card">
              <div className="feature-icon">🕵️</div>
             <h3>Common Cyber Attacks</h3>
              <p>Understand phishing, XSS, SQL injection, DDoS, and other common threats</p>
            </div>
           <div className="feature-card">
              <div className="feature-icon">🔧</div>
              <h3>Prevention Techniques</h3>
             <p>Learn best practices to protect yourself and your organization</p>
            </div>
            <div className="feature-card">
             <div className="feature-icon">🎮</div>
             <h3>Interactive Demos</h3>
              <p>Safe, educational simulations of real-world cyber attacks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <h2>Why Cybersecurity Matters</h2>
          <div className="stats-grid">
           <div className="stat-card">
              <h3>95%</h3>
             <p>of cybersecurity breaches are due to human error</p>
            </div>
            <div className="stat-card">
             <h3>$4.45M</h3>
              <p>average cost of a data breach in 2023</p>
            </div>
           <div className="stat-card">
              <h3>323,972</h3>
              <p>average number of attack attempts per organization in 2023</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;