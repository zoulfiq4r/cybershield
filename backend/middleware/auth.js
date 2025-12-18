const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Require a valid JWT and attach user to the request
const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch fresh user data to ensure role is current
    const [rows] = await db.query('SELECT id, name, email, role FROM users WHERE id = ?', [decoded.id]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = rows[0];
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Optional auth: attach user if token exists, otherwise continue
const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [rows] = await db.query('SELECT id, name, email, role FROM users WHERE id = ?', [decoded.id]);
    if (rows.length > 0) {
      req.user = rows[0];
    }
  } catch (error) {
    // Ignore token errors in optional mode
    console.warn('Optional auth token invalid:', error.message);
  }

  next();
};

// Simple role guard
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 1) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

module.exports = {
  requireAuth,
  optionalAuth,
  requireAdmin,
};
