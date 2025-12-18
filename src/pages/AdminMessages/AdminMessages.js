import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminMessages.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AdminMessages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Guard: only admins
    if (!token || user.role !== 1) {
      navigate('/login');
      return;
    }
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/api/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to load messages');
      }
      setMessages(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const markReviewed = async (id) => {
    try {
      setActionMessage('');
      const response = await fetch(`${API_URL}/api/messages/${id}/review`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update message');
      }
      setActionMessage('Marked as reviewed');
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, reviewed: 1 } : msg))
      );
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="admin-messages">
      <div className="container">
        <div className="admin-header">
          <h1>Inbox</h1>
          <p>Messages sent by users from the Contact page</p>
        </div>

        {error && <div className="admin-error">{error}</div>}
        {actionMessage && <div className="admin-success">{actionMessage}</div>}

        {loading ? (
          <div className="admin-placeholder">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="admin-placeholder">No messages yet.</div>
        ) : (
          <div className="messages-list">
            {messages.map((msg) => (
              <div key={msg.id} className="message-card">
                <div className="message-meta">
                  <div>
                    <h3>{msg.name}</h3>
                    <p>{msg.email}</p>
                    {msg.user_email && <p className="muted">User: {msg.user_email}</p>}
                  </div>
                  <div className={`badge ${msg.reviewed ? 'reviewed' : 'new'}`}>
                    {msg.reviewed ? 'Reviewed' : 'New'}
                  </div>
                </div>
                <p className="message-body">{msg.message}</p>
                <div className="message-footer">
                  <span>{new Date(msg.created_at).toLocaleString()}</span>
                  {!msg.reviewed && (
                    <button className="btn btn-primary" onClick={() => markReviewed(msg.id)}>
                      Mark Reviewed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
