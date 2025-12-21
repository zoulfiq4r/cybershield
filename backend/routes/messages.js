const express = require('express');
const db = require('../config/db');
const { optionalAuth, requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/', optionalAuth, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide name, email, and message' });
    }

    const userId = req.user ? req.user.id : null;

    await db.query(
      'INSERT INTO messages (user_id, name, email, message) VALUES (?, ?, ?, ?)',
      [userId, name, email, message]
    );

    res.status(201).json({ message: 'Message received' });
  } catch (error) {
    console.error('Create message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT m.id, m.name, m.email, m.message, m.reviewed, m.created_at, u.email as user_email FROM messages m LEFT JOIN users u ON m.user_id = u.id ORDER BY m.created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('List messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/:id/review', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(
      'UPDATE messages SET reviewed = 1 WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ message: 'Message marked as reviewed' });
  } catch (error) {
    console.error('Review message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
