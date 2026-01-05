import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const router = express.Router();

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.get('/v1/ankitverma969/adminDashboard', verifyToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select('-password');

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({
      success: true,
      admin,
      dashboardData: {
        message: 'Welcome to Admin Dashboard',
        createdAt: admin.createdAt
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
