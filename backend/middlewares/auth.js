// authroute.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// Check if the user exists based on email
router.post('/check-login', asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If the user doesn't exist, send a response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // User exists, send the role in the response
    res.json({ role: user.role });
  } catch (error) {
    next(error);
  }
}));

// Middleware for authentication
const auth = asyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Invalid or missing token format');
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded); // Log the decoded token

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error); // Log the error
    return res.status(401).json({ error: 'Unauthorized access' });
  }
});

// Middleware to check if the user is an admin
const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== 'admin') {
    throw new Error('You are not Admin');
  } else {
    next();
  }
});

module.exports = { auth, isAdmin, router };
