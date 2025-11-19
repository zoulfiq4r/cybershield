import React, { useState } from 'react';
import './AttackLibrary.css';

const AttackLibrary = () => {
  const [selectedAttack, setSelectedAttack] = useState(null);

  const attacks = [
    {
      id: 1,
      name: "Phishing",
      icon: "🎣",
      description: "Fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity.",
      howItWorks: "Attackers send deceptive emails or messages that appear legitimate, tricking users into revealing passwords, credit card numbers, or other sensitive data.",
      prevention: "Verify sender addresses, don't click suspicious links, use multi-factor authentication.",
      example: "Fake login page that looks like your bank's website."
    },
    {
      id: 2,
      name: "XSS (Cross-Site Scripting)",
      icon: "📜",
      description: "Injecting malicious scripts into web pages viewed by other users.",
      howItWorks: "Attackers inject client-side scripts into web pages, which execute when users visit the page.",
      prevention: "Validate and sanitize user input, use Content Security Policy headers.",
      example: "Malicious script in a comment section that steals user cookies."
    },
    {
      id: 3,
      name: "SQL Injection",
      icon: "💉",
      description: "Injecting malicious SQL code to manipulate databases.",
      howItWorks: "Attackers insert SQL commands into input fields to access, modify, or delete database content.",
      prevention: "Use parameterized queries, input validation, and ORM frameworks.",
      example: "Entering ' OR '1'='1 in a login form to bypass authentication."
    },
    {
      id: 4,
      name: "DDoS Attack",
      icon: "🌊",
      description: "Overwhelming a server with traffic to make it unavailable.",
      howItWorks: "Multiple compromised systems flood the target with excessive requests.",
      prevention: "Use DDoS protection services, rate limiting, and load balancing.",
      example: "Botnet flooding a website with millions of requests per second."
    },
    {
      id: 5,
      name: "Man-in-the-Middle",
      icon: "👂",
      description: "Intercepting communication between two parties.",
      howItWorks: "Attackers position themselves between the user and the application to eavesdrop or alter communication.",
      prevention: "Use HTTPS, VPNs, and certificate pinning.",
      example: "Public WiFi eavesdropping on unencrypted connections."
    },
    {
      id: 6,
      name: "Malware",
      icon: "🦠",
      description: "Malicious software designed to harm or exploit systems.",
      howItWorks: "Software that infects systems through downloads, email attachments, or vulnerabilities.",
      prevention: "Use antivirus software, keep systems updated, avoid suspicious downloads.",
      example: "Ransomware that encrypts files and demands payment."
    }
  ];

  return (
    <div className="attack-library">
      <div className="container">
        <div className="library-header">
          <h1>Cyber Attack Library</h1>
          <p>Learn about common cybersecurity threats and how to protect yourself</p>
        </div>

        <div className="attack-grid">
          {attacks.map(attack => (
            <div 
              key={attack.id} 
              className={`attack-card ${selectedAttack?.id === attack.id ? 'selected' : ''}`}
              onClick={() => setSelectedAttack(attack)}
            >
              <div className="attack-icon">{attack.icon}</div>
              <h3>{attack.name}</h3>
              <p>{attack.description}</p>
            </div>
          ))}
        </div>

        {selectedAttack && (
          <div className="attack-details">
            <h2>{selectedAttack.icon} {selectedAttack.name}</h2>
            <div className="detail-sections">
              <div className="detail-section">
                <h4>How It Works</h4>
                <p>{selectedAttack.howItWorks}</p>
              </div>
              <div className="detail-section">
                <h4>Prevention</h4>
                <p>{selectedAttack.prevention}</p>
              </div>
              <div className="detail-section">
                <h4>Example</h4>
                <p>{selectedAttack.example}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttackLibrary;