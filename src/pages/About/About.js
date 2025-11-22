import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="about-header">
          <h1>About CyberShield</h1>
          <p>Your educational platform for cybersecurity awareness</p>
        </div>
        
        <div className="about-content">
         <div className="about-section">
           <h2>Our Mission</h2>
            <p>
              CyberShield is designed to educate students, professionals, and everyday internet users 
             about the growing threats in the digital world. Through interactive simulations and 
              comprehensive learning materials, we aim to build a more secure digital environment.
            </p>
          </div>

         <div className="about-section">
            <h2>What We Offer</h2>
           <div className="features-list">
             <div className="feature-item">
                <h3>📚 Educational Content</h3>
               <p>Detailed explanations of common cyber attacks and prevention methods</p>
              </div>
              <div className="feature-item">
               <h3>🎮 Interactive Simulations</h3>
               <p>Safe, hands-on experience with simulated cyber attacks</p>
              </div>
             <div className="feature-item">
               <h3>🛡️ Best Practices</h3>
               <p>Practical tips to protect yourself and your organization</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Why Cybersecurity Education Matters</h2>
            <p>
              With the increasing reliance on digital technologies, understanding cybersecurity 
              is no longer optional. Our platform makes complex security concepts accessible 
              to everyone, helping to create a more security-conscious society.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;