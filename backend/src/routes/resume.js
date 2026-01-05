import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import Resume from '../models/Resume.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'resume-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and DOCX files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

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

router.post('/v1/ankitverma969/uploadResume', verifyToken, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const existingResume = await Resume.findOne();
    if (existingResume) {
      if (fs.existsSync(existingResume.path)) {
        fs.unlinkSync(existingResume.path);
      }
      await Resume.deleteOne({ _id: existingResume._id });
    }

    const resume = new Resume({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      uploadedBy: req.adminId
    });

    await resume.save();

    res.json({
      success: true,
      message: 'Resume uploaded successfully',
      resume: {
        id: resume._id,
        originalName: resume.originalName,
        size: resume.size,
        uploadedAt: resume.uploadedAt
      }
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload resume' });
  }
});

router.get('/v1/ankitverma969/getResume', async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ uploadedAt: -1 });

    if (!resume) {
      return res.status(404).json({ error: 'No resume found' });
    }

    res.json({
      success: true,
      resume: {
        id: resume._id,
        originalName: resume.originalName,
        mimetype: resume.mimetype,
        size: resume.size,
        uploadedAt: resume.uploadedAt
      }
    });
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({ error: 'Failed to get resume' });
  }
});

router.get('/v1/ankitverma969/downloadResume', async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ uploadedAt: -1 });

    if (!resume) {
      return res.status(404).json({ error: 'No resume found' });
    }

    if (!fs.existsSync(resume.path)) {
      return res.status(404).json({ error: 'Resume file not found' });
    }

    res.download(resume.path, resume.originalName);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to download resume' });
  }
});

router.get('/v1/ankitverma969/viewResume', async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ uploadedAt: -1 });

    if (!resume) {
      return res.status(404).json({ error: 'No resume found' });
    }

    if (!fs.existsSync(resume.path)) {
      return res.status(404).json({ error: 'Resume file not found' });
    }

    res.setHeader('Content-Type', resume.mimetype);
    res.setHeader('Content-Disposition', 'inline; filename="' + resume.originalName + '"');

    const fileStream = fs.createReadStream(resume.path);
    fileStream.pipe(res);
  } catch (error) {
    console.error('View error:', error);
    res.status(500).json({ error: 'Failed to view resume' });
  }
});

router.delete('/v1/ankitverma969/deleteResume', verifyToken, async (req, res) => {
  try {
    const resume = await Resume.findOne();

    if (!resume) {
      return res.status(404).json({ error: 'No resume found' });
    }

    if (fs.existsSync(resume.path)) {
      fs.unlinkSync(resume.path);
    }

    await Resume.deleteOne({ _id: resume._id });

    res.json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete resume' });
  }
});

export default router;
