import React, { useState } from 'react';
import './Simulator.css';

const Simulator = () => {
  const [activeSimulator, setActiveSimulator] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [phishingAnswer, setPhishingAnswer] = useState('');
  const [phishingResult, setPhishingResult] = useState('');

  const checkPasswordStrength = (pwd) => {
    setPassword(pwd);
    let strength = 'Weak';
    let score = 0;
    
   if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
   if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    
    if (score === 4) strength = 'Very Strong';
   else if (score === 3) strength = 'Strong';
    else if (score === 2) strength = 'Medium';
    
    setPasswordStrength(strength);
  };

  const checkPhishingEmail = (answer) => {
    setPhishingAnswer(answer);
    if (answer === 'phishing') {
      setPhishingResult('✅ Correct! This is a phishing email. The sender address is suspicious and it creates unnecessary urgency.');
    } else {
      setPhishingResult('❌ Incorrect. This is actually a phishing email. Look at the sender address and the urgent tone.');
    }
  };

  const simulators = [
    {
      id: 'password',
      title: 'Password Strength Tester',
      icon: '🔐',
      component: (
        <div className="simulator-content">
          <h3>Test Your Password Strength</h3>
          <input
            type="text"
            placeholder="Enter a password to test"
            value={password}
            onChange={(e) => checkPasswordStrength(e.target.value)}
            className="password-input"
          />
          {passwordStrength && (
            <div className={`strength-result ${passwordStrength.toLowerCase().replace(' ', '-')}`}>
              Strength: {passwordStrength}
            </div>
          )}
          <div className="password-tips">
            <h4>Strong Password Tips:</h4>
            <ul>
              <li>Use at least 12 characters</li>
              <li>Include uppercase and lowercase letters</li>
              <li>Add numbers and special characters</li>
              <li>Avoid common words and patterns</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'phishing',
      title: 'Phishing Email Quiz',
      icon: '🎣',
      component: (
        <div className="simulator-content">
          <h3>Can You Spot the Phishing Email?</h3>
          <div className="email-example">
            <div className="email-header">
              <strong>From:</strong> security@your-bank-verify.com<br/>
              <strong>Subject:</strong> URGENT: Your Account Will Be Suspended!
            </div>
            <div className="email-body">
              <p>Dear Customer,</p>
              <p>We've detected suspicious activity on your account. To prevent suspension, 
              you must verify your identity immediately by clicking the link below:</p>
              <p><a href="#verify">https://your-bank-security-verify.com/login</a></p>
              <p>This must be completed within 24 hours.</p>
              <p>Bank Security Team</p>
            </div>
          </div>
          <div className="quiz-options">
            <button 
              className={`btn ${phishingAnswer === 'legit' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => checkPhishingEmail('legit')}
            >
              Legitimate Email
            </button>
            <button 
              className={`btn ${phishingAnswer === 'phishing' ? 'btn-danger' : 'btn-secondary'}`}
              onClick={() => checkPhishingEmail('phishing')}
            >
              Phishing Email
            </button>
          </div>
          {phishingResult && (
            <div className="quiz-result">
              {phishingResult}
            </div>
          )}
        </div>
      )
    },
    {
      id: 'xss',
      title: 'XSS Demo',
      icon: '📜',
      component: (
        <div className="simulator-content">
          <h3>Cross-Site Scripting (XSS) Demonstration</h3>
          <p>This is a safe demonstration of how XSS works. Try entering this harmless script:</p>
          <code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code>
          <div className="xss-demo">
            <p><strong>Simulated User Input:</strong> Hello! &lt;script&gt;alert('XSS')&lt;/script&gt;</p>
            <p><strong>What happens:</strong> The script would execute in your browser if this were a vulnerable site</p>
            <p><strong>Safe output:</strong> Hello! &lt;script&gt;alert('XSS')&lt;/script&gt;</p>
          </div>
          <div className="prevention-tips">
            <h4>XSS Prevention:</h4>
            <ul>
              <li>Validate and sanitize all user input</li>
              <li>Use Content Security Policy (CSP) headers</li>
              <li>Escape user content before rendering</li>
              <li>Use modern frameworks that auto-escape content</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="simulator">
      <div className="container">
        <div className="simulator-header">
          <h1>Interactive Cybersecurity Simulators</h1>
          <p>Learn through safe, hands-on experiences with common cyber threats</p>
        </div>

        <div className="simulator-grid">
         {simulators.map(sim => (
           <div 
             key={sim.id}
              className={`simulator-card ${activeSimulator === sim.id ? 'active' : ''}`}
             onClick={() => setActiveSimulator(sim.id)}
            >
             <div className="simulator-icon">{sim.icon}</div>
             <h3>{sim.title}</h3>
            </div>
          ))}
        </div>

        {activeSimulator && (
          <div className="simulator-display">
            {simulators.find(sim => sim.id === activeSimulator)?.component}
          </div>
        )}

        {!activeSimulator && (
          <div className="simulator-placeholder">
            <p>Select a simulator from above to begin learning!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Simulator;