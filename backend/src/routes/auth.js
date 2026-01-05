import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const router = express.Router();

router.post('/v1/ankitverma969/adminLogin', async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;

    if (!emailOrMobile || !password) {
      return res.status(400).json({ error: 'Email/Mobile and password are required' });
    }

    const admin = await Admin.findOne({
      $or: [
        { email: emailOrMobile.toLowerCase() },
        { mobileNumber: emailOrMobile }
      ]
    });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        mobileNumber: admin.mobileNumber
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
