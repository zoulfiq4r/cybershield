import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  
  // Don't show footer on login page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <footer className="footer">
     <div className="container">
        <div className="footer-content">
          <p>&copy; 2025 CyberShield. Educational Cybersecurity Platform.</p>
         <p>Built with React for CSCI426 Advanced Web Programming</p>
        </div>
      </div>
    </footer>
  );
};


export default Footer;