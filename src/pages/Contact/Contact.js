import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! This is a demo form.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact">
      <div className="container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>Have questions or feedback? We'd love to hear from you!</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <div className="info-item">
              <h3>📧 Email</h3>
              <p>zoulfiqar.kanso@gmail.com</p>
            </div>
            <div className="info-item">
              <h3>🌐 Website</h3>
              <p>www.cybershield-learning.com</p>
            </div>
            <div className="info-item">
              <h3>🏢 Address</h3>
              <p>Computer Science Department<br/>Nabatiyeh Campus</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send us a Message</h2>
            
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>

        <div className="resources-section">
          <h2>Additional Cybersecurity Resources</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <h3>OWASP Foundation</h3>
              <p>Open Web Application Security Project</p>
              <a href="https://owasp.org" target="_blank" rel="noopener noreferrer">Visit Website</a>
            </div>
            <div className="resource-card">
              <h3>CISA Cybersecurity</h3>
              <p>Cybersecurity & Infrastructure Security Agency</p>
              <a href="https://www.cisa.gov" target="_blank" rel="noopener noreferrer">Visit Website</a>
            </div>
            <div className="resource-card">
              <h3>Khan Academy</h3>
              <p>Cybersecurity Courses</p>
              <a href="https://www.khanacademy.org" target="_blank" rel="noopener noreferrer">Visit Website</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;