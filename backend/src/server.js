import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import resumeRoutes from './routes/resume.js';
import projectRoutes from './routes/projects.js';
import Admin from './models/Admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use(authRoutes);
app.use(dashboardRoutes);
app.use(resumeRoutes);
app.use(projectRoutes);

const initializeAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: 'hpvankitverma1@gmail.com' });

    if (!existingAdmin) {
      const admin = new Admin({
        email: 'hpvankitverma1@gmail.com',
        mobileNumber: '9646042004',
        password: 'AnkitS@3053'
      });

      await admin.save();
      console.log('Default admin created');
    } else {
      console.log('Admin already exists');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
};

app.listen(PORT, async () => {
  await initializeAdmin();
  console.log(`Server running on port ${PORT}`);
});
