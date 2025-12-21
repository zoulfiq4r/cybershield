const jwt = require('jsonwebtoken');
const db = require('../config/db');

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

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
    console.warn('Optional auth token invalid:', error.message);
  }

  next();
};

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
