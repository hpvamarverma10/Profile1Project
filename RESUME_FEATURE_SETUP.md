# Resume/CV Upload Feature - Setup Guide

## Overview
This feature allows you to upload, view, and download your Resume/CV from the Admin Dashboard, and visitors can access it from the homepage.

## Backend Setup

### 1. MongoDB Configuration
Make sure MongoDB is running locally or update the connection string in `backend/.env`:

```bash
cd backend
cp .env.example .env
```

Edit the `.env` file with your configuration:
```
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_very_secure_secret_key_here
PORT=5000
```

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Start Backend Server
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies
```bash
cd ..
npm install
```

### 2. Start Frontend Server
```bash
npm run dev
```

The frontend will run on `http://localhost:8080`

## How to Use

### Admin Dashboard - Upload Resume

1. Navigate to: `http://localhost:8080/v1/ankitverma969/adminLogin`

2. Login with credentials:
   - Email: `hpvankitverma1@gmail.com`
   - Password: `AnkitS@3053`

3. Once logged in, you'll see the "Resume / CV Management" section

4. Click "Upload Resume" and select your PDF or DOCX file (Max 10MB)

5. The file will be uploaded and stored in `backend/uploads/` directory

6. You can replace or delete the resume anytime

### Frontend - View/Download Resume

1. Navigate to the homepage: `http://localhost:8080`

2. In the hero section, select "Resume / CV" from the dropdown

3. Two buttons will appear:
   - **View**: Opens the resume in a new browser tab (inline view)
   - **Download**: Downloads the resume file to your device

## Features

### Admin Dashboard
- Upload resume in PDF or DOCX format
- View current resume details (filename, size, upload date)
- Replace existing resume with a new one
- Delete current resume
- File validation (type and size)
- Real-time upload progress feedback

### Frontend
- Automatic detection of resume availability
- View resume in browser (inline for PDF)
- Download resume with original filename
- Error handling if no resume is uploaded
- Toast notifications for user feedback

## API Endpoints

### Public Endpoints
- `GET /v1/ankitverma969/getResume` - Get resume metadata
- `GET /v1/ankitverma969/viewResume` - View resume inline
- `GET /v1/ankitverma969/downloadResume` - Download resume file

### Protected Endpoints (Require Authentication)
- `POST /v1/ankitverma969/uploadResume` - Upload new resume
- `DELETE /v1/ankitverma969/deleteResume` - Delete current resume

## File Storage

- Uploaded files are stored in: `backend/uploads/`
- Only one resume can exist at a time
- Uploading a new resume automatically deletes the old one
- Files are named with timestamp to avoid conflicts

## Supported File Types

- PDF (.pdf)
- Microsoft Word (.docx, .doc)

## File Size Limit

Maximum file size: 10MB

## Security

- File upload requires admin authentication
- File type validation on both frontend and backend
- File size validation
- Secure file naming to prevent path traversal
- Only one resume per portfolio to prevent abuse

## Troubleshooting

### Backend not connecting to MongoDB
- Make sure MongoDB is running: `mongod`
- Check connection string in `.env`

### File upload fails
- Check file type (must be PDF or DOCX)
- Check file size (must be less than 10MB)
- Make sure backend server is running
- Check backend console for errors

### View/Download buttons don't work
- Make sure a resume is uploaded from the admin dashboard
- Check browser console for errors
- Verify backend server is running on port 5000

### Resume not appearing on frontend
- Upload a resume from the admin dashboard first
- Refresh the homepage
- Check browser console for errors
