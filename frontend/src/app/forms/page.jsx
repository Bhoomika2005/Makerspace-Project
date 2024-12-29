'use client';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Eye } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function FormsPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [forms, setForms] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [error, setError] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    async function checkAdminStatus() {
      try {
        const token = Cookies.get('access')

        if (!token) {
          setIsLoggedIn(false)
          setIsAdmin(false)
          return;
        } 

        setIsLoggedIn(true);
        const userCookie = Cookies.get('user');
        if (userCookie) {
          const userDetails = JSON.parse(userCookie);
          setUser(userDetails);
          setIsAdmin(userDetails.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL);
        }
      } catch (error) {
        console.error("Error checking the user status : ", error);
        setIsLoggedIn(false)
        setIsAdmin(false)
      }
    }
    checkAdminStatus();
  }, []);

  useEffect(() => {
    fetchForms();
  },[isLoggedIn]);

  const fetchForms = async () => {
    try {
      const token = Cookies.get('access');
      const response = await fetch('http://localhost:8000/api/forms/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch forms');
      }

      const data = await response.json();
      // console.log("forms data : ", data)
      setForms(data);
      setError(null);
    } catch (error) {
      
      console.error("Error fetching forms:", error);
      setError('Failed to fetch forms');
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile || !formTitle.trim()) {
      setError('Please provide both title and file');
      return;
    }

    if (!isAdmin) {
      setError('You must be an admin to upload forms');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('title', formTitle.trim());

    const token = Cookies.get('access');
    try {
      const response = await fetch('http://localhost:8000/api/forms/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (response.status === 401) {
        setError('Your session has expired. Please log in again.');
        setIsLoggedIn(false);
        return;
      }
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Upload error:', errorData);
        throw new Error(JSON.stringify(errorData));
      }

      await fetchForms();
      setShowUploadDialog(false);
      setFormTitle('');
      setSelectedFile(null);
      setError(null);
    } catch (err) {
      console.error('Error uploading:', err);
      setError('Failed to upload form: ' + err.message);
    }
  };

  const handleDelete = async () => {
    if (!selectedFormId) return;

    const token = Cookies.get('access');
    try {
      const response = await fetch(`http://localhost:8000/api/forms/${selectedFormId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete form');
      }

      await fetchForms();
      setShowDeleteDialog(false);
      setError(null);

    } catch (err) {
      setError('Failed to delete form');
    }
  };

  const handleDownload = async (formId) => {
    const token = Cookies.get('access');
    try {
      const response = await fetch(`http://localhost:8000/api/forms/${formId}/download/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to download form');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `form-${formId}.pdf`; 
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading form:', error);
      setError('Failed to download form');
    }
  };

  const handleView = async (formId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/forms/${formId}/view/`);
      
      if (!response.ok) {
        throw new Error('Failed to view form');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error viewing form:', error);
      setError('Failed to view form');
    }
  };

  return (
    <div className="p-4">
      {error && (
        <Alert className="mb-4" variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isAdmin && (
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogTrigger asChild>
            <Button className="mb-4">Add Form</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Form</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input
                  id="title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">File</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  accept=".pdf,.doc,.docx"
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleFileUpload}>Upload</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <div className="grid gap-4">
        {forms.map(form => (
          <div key={form.id} className="flex items-center justify-between p-4 border rounded">
            <span className="font-medium">{form.title}</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleView(form.id)}
              >
                <Eye className="w-4 h-4 mr-2" />
                View
              </Button>
              
              {isLoggedIn && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(form.id)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              )}

              {isAdmin && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setSelectedFormId(form.id);
                    setShowDeleteDialog(true);
                  }}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the form.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}