'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Facultynewcard from '@/components/Facultynewcard'
import { Textarea } from "@/components/ui/textarea"; // Removed: `bio` dependency
import {
  Card,
  CardContent,
} from "@/components/ui/card";
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

import Header from '@/components/HeaderReplica';
import Navbar from '@/components/Navbar';

interface Faculty {
  id: number;
  name: string;
  role: string;
  image: string | null;
  location: string;
  email: string;
}

export default function FacultyPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [selectedFacultyId, setSelectedFacultyId] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [facultyData, setFacultyData] = useState({
    name: '',
    role: '',
    image: null as File | null,
    email: '',
    location: '',

  });

  useEffect(() => {
    async function checkAdminStatus() {
      try {
        const token = Cookies.get('access');
        if (!token) {
          setIsLoggedIn(false);
          setIsAdmin(false);
          return;
        }
        setIsLoggedIn(true);
        const userCookie = Cookies.get('user');
        if (userCookie) {
          const userDetails = JSON.parse(userCookie);
          setIsAdmin(userDetails.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      }
    }
    checkAdminStatus();
  }, []);

  useEffect(() => {
    fetchFaculty();
  }, []);
  useEffect(() => {
    console.log('Updated selectedFacultyId:', selectedFacultyId);
}, [selectedFacultyId]);

  const fetchFaculty = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/faculty/');
      if (!response.ok) {
        throw new Error('Failed to fetch faculty');
      }
      const data = await response.json();
      setFaculty(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching faculty:", error);
      setError('Failed to fetch faculty');
    }
  };

  const handleAddFaculty = async () => {
    console.log(facultyData);
    console.log(facultyData.name);
    console.log(facultyData.email);
    console.log(facultyData.image);
    
    const token = Cookies.get('access');
    if (!token || !isAdmin) {
      setError('You must be an admin to perform this action');
      return;
    }

    const formData = new FormData();
    formData.append('name', facultyData.name);
    formData.append('role', facultyData.role);
    formData.append('email', facultyData.email);
    formData.append('location', facultyData.location);
    if (facultyData.image) {
      formData.append('image', facultyData.image);
    }
   //hello
   console.log("key, value");
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    console.log(token); 
    try {
      const response = await fetch('http://localhost:8000/api/faculty/add/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      console.log(formData);
      

      if (!response.ok) {
        throw new Error('Failed to add faculty');
      }

      await fetchFaculty();
      setShowAddDialog(false);
      setFacultyData({
        name: '',
        role: '',
        email: '',
        location: '',
        image: null,
      });
      setSelectedFaculty(null);
      setError(null);
    } catch (error) {
      console.error('Error adding faculty:', error);
      setError('Failed to add faculty');
    }
  };

  const handleEditFaculty = async () => {
    if (!selectedFacultyId){
      alert('not id selected');
    return;
    }
    console.log(selectedFacultyId);

    const token = Cookies.get('access');
    if (!token || !isAdmin) {
      setError('You must be an admin to perform this action');
      return;
    }

    const formData = new FormData();
    formData.append('name', facultyData.name);
    formData.append('role', facultyData.role);
    formData.append('email', facultyData.email);
    formData.append('location', facultyData.location);
    if (facultyData.image) {
      formData.append('image', facultyData.image);
    }

    try {
      const response = await fetch(`http://localhost:8000/api/faculty/edit/${selectedFacultyId}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update faculty');
      }

      await fetchFaculty();
      setShowEditDialog(false);
      setFacultyData({
        name: '',
        role: '',
        email: '',
        location: '',
        image: null,
      });
      setSelectedFaculty(null);
      setSelectedFacultyId(0);
      setError(null);
    } catch (error) {
      console.error('Error updating faculty:', error);
      setError('Failed to update faculty');
    }
  };

  const handleDelete = async () => {
    if (!selectedFacultyId) return;

    const token = Cookies.get('access');
    try {
      const response = await fetch(`http://localhost:8000/api/faculty/delete/${selectedFacultyId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete faculty');
      }

      await fetchFaculty();
      setShowDeleteDialog(false);
      setError(null);
    } catch (error) {
      setError('Failed to delete faculty');
    }
  };

  const initializeEditForm = (faculty: Faculty) => {
    
    setSelectedFaculty(faculty);
    // setSelectedFacultyId(faculty.id);
    setSelectedFacultyId(faculty.id);
    console.log(faculty);
    console.log(faculty.id);
    console.log(selectedFacultyId);
    setFacultyData({
      name: faculty.name,
      role: faculty.role,
      email: faculty.email,
      location: faculty.location,
      image: null,
    });
    setShowEditDialog(true);
  };

  return (
    <>
    <div>
      <Header/>
      <Navbar/>
    
        <div className="max-w-7xl mx-auto p-6">
      {error && (
        <div className="text-red-500 mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {faculty.map((item) => (
          <Facultynewcard
            key={item.id}
            name={item.name}
            role={item.role}
            image={item.image}
            email={item.email}
            location={item.location}
          />
        ))}
      </div>
    </div>
    {/* <Footer/> */}
    </div>
    </>
  );
}
