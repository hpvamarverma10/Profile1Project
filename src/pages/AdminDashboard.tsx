import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, File, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface AdminData {
  id: string;
  email: string;
  mobileNumber: string;
  createdAt: string;
}

interface ResumeData {
  id: string;
  originalName: string;
  size: number;
  uploadedAt: string;
}

export default function AdminDashboard() {
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('adminToken');

        if (!token) {
          navigate('/v1/ankitverma969/adminLogin');
          return;
        }

        const response = await fetch('http://localhost:5000/v1/ankitverma969/adminDashboard', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Failed to load dashboard');
          if (response.status === 401) {
            localStorage.removeItem('adminToken');
            navigate('/v1/ankitverma969/adminLogin');
          }
          return;
        }

        setAdmin(data.admin);
        await fetchResume();
      } catch (err) {
        setError('Connection error. Make sure backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const fetchResume = async () => {
    try {
      const response = await fetch('http://localhost:5000/v1/ankitverma969/getResume');
      const data = await response.json();

      if (response.ok) {
        setResume(data.resume);
      }
    } catch (err) {
      console.log('No resume uploaded yet');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error('Only PDF and DOCX files are allowed');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/v1/ankitverma969/uploadResume', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Failed to upload resume');
        return;
      }

      setResume(data.resume);
      toast.success('Resume uploaded successfully');
    } catch (err) {
      toast.error('Connection error. Failed to upload resume.');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleDeleteResume = async () => {
    if (!confirm('Are you sure you want to delete the current resume?')) {
      return;
    }

    setDeleting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/v1/ankitverma969/deleteResume', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Failed to delete resume');
        return;
      }

      setResume(null);
      toast.success('Resume deleted successfully');
    } catch (err) {
      toast.error('Connection error. Failed to delete resume.');
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/v1/ankitverma969/adminLogin');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6">
          {admin && (
            <Card>
              <CardHeader>
                <CardTitle>Welcome, Admin</CardTitle>
                <CardDescription>Your profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-lg font-medium">{admin.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mobile Number</p>
                    <p className="text-lg font-medium">{admin.mobileNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="text-lg font-medium">
                      {new Date(admin.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Resume / CV Management</CardTitle>
              <CardDescription>
                Upload your resume in PDF or DOCX format (Max 10MB)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resume ? (
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3">
                      <File className="text-blue-600" size={24} />
                      <div>
                        <p className="font-medium">{resume.originalName}</p>
                        <p className="text-sm text-gray-500">
                          {formatFileSize(resume.size)} • Uploaded on{' '}
                          {new Date(resume.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={handleDeleteResume}
                      disabled={deleting}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 size={16} />
                      {deleting ? 'Deleting...' : 'Delete'}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500 mb-4">No resume uploaded yet</p>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    id="resume-upload"
                    className="hidden"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                  <label htmlFor="resume-upload">
                    <Button
                      type="button"
                      disabled={uploading}
                      asChild
                    >
                      <span className="cursor-pointer">
                        <Upload size={16} />
                        {uploading ? 'Uploading...' : resume ? 'Replace Resume' : 'Upload Resume'}
                      </span>
                    </Button>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
