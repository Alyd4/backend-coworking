const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all non-admin users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({ where: { isAdmin: false } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single non-admin user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id, isAdmin: false } });
    if (!user) {
      return res.status(404).json({ error: 'User not found or is an admin' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new non-admin user
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const isAdmin = false;
    const user = await User.create({ email, password, isAdmin });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
    
  }
});

// Update a non-admin user
router.put('/:id', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { id: req.params.id, isAdmin: false } });
    if (!user) {
      return res.status(404).json({ error: 'User not found or is an admin' });
    }
    user.email = email || user.email;
    if (password) user.password = password;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a non-admin user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id, isAdmin: false } });
    if (!user) {
      return res.status(404).json({ error: 'User not found or is an admin' });
    }
    await user.destroy();
    res.json({ message: 'Non-admin user deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
