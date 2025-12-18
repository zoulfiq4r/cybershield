import React, { useState } from 'react';
import './Contact.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: '', error: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setStatus({ loading: false, success: '', error: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: '', error: '' });

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setStatus({ loading: false, success: 'Message sent! An admin will review it shortly.', error: '' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: '', error: err.message || 'Something went wrong' });
    }
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

            {status.error && <div className="form-error">{status.error}</div>}
            {status.success && <div className="form-success">{status.success}</div>}

            <button type="submit" className="btn btn-primary" disabled={status.loading}>
              {status.loading ? 'Sending...' : 'Send Message'}
            </button>
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
