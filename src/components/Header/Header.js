import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Don't show header on login page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          🛡️ CyberShield
        </Link>
        <nav className="nav">
         <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
         <Link to="/attacks" className={location.pathname === '/attacks' ? 'active' : ''}>Attack Library</Link>
         <Link to="/simulator" className={location.pathname === '/simulator' ? 'active' : ''}>Simulator</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
          {isAuthenticated && user.role === 1 && (
            <Link to="/admin/messages" className={location.pathname === '/admin/messages' ? 'active' : ''}>
              Admin
            </Link>
          )}
          {isAuthenticated ? (
            <div className="auth-section">
              <span className="user-name">👤 {user.name || user.email}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="login-link">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
