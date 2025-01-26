'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Facultynewcard from '@/components/Facultynewcard';
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
import { Plus, Users } from 'lucide-react';

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
        <Alert className="mb-6" variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
<div className="mb-8 flex justify-between items-center">
<div className="flex items-center p-5 backdrop-blur-sm">
            <Users className="mr-2 h-6 w-6 text-[#026bc0]" />
            <h2 className="text-[#026bc0] text-2xl font-bold">Faculty Members </h2>
          </div>
{/* <h1 className=" text-[#026bc0] text-2xl font-bold"> <Users size={20} />Our Faculty Members</h1> */}
      {isAdmin && (
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        
          <div className="relative group ">
                <DialogTrigger asChild>
                  <Button
                    size="icon"
                    className="bg-[#026bc0] p-2 rounded-full text-white text-xs shadow-lg hover:bg-[#0610ab] transition-colors duration-200"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <div className="absolute top-1/2 left-full ml-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-[#0610ab] text-white text-sm rounded-md px-3 py-2 transition-all duration-200 shadow-lg whitespace-nowrap">
                Add New Faculty
                </div>
              </div>
    
         
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Faculty</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name"
                  value={facultyData.name}
                  onChange={(e) => setFacultyData({...facultyData, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Role</Label>
                <Input
                  id="role"
                  value={facultyData.role}
                  onChange={(e) => setFacultyData({...facultyData, role: e.target.value})}
                  className="col-span-3"
                />
              </div>
             
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input
                  id="email"
                  value={facultyData.email}
                  onChange={(e) => setFacultyData({...facultyData, email: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">location</Label>
                <Input
                  id="location"
                  value={facultyData.location}
                  onChange={(e) => setFacultyData({...facultyData, location: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">Image</Label>
                <Input
                  id="image"
                  type="file"
                  onChange={(e) => setFacultyData({...facultyData, image: e.target.files?.[0] || null})}
                  accept="image/*"
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddFaculty}>Add Faculty</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      </div>

      {/* Edit Faculty Dialog */}
      {selectedFaculty && (
  <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
   
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Faculty</DialogTitle>
      </DialogHeader>

      {/* Edit Faculty Form */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={facultyData.name}
            onChange={(e) => setFacultyData({ ...facultyData, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            value={facultyData.role}
            onChange={(e) => setFacultyData({ ...facultyData, role: e.target.value })}
          />
        </div>
       
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={facultyData.email}
            onChange={(e) => setFacultyData({ ...facultyData, email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">location</Label>
          <Input
            id="location"
            value={facultyData.location}
            onChange={(e) => setFacultyData({ ...facultyData, location: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setFacultyData({ ...facultyData, image: e.target.files ? e.target.files[0] : null })}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={() => setShowEditDialog(false)}>
          Cancel
        </Button>
        <Button onClick={handleEditFaculty}>Save Changes</Button>
      </div>
    </DialogContent>
  </Dialog>
)}


      {/* <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {faculty.map(item => (
          <Card key={item.id} className="overflow-hidden w-full">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 h-full">
                <div className="p-6 space-y-4">
                  <div className="aspect-square relative overflow-hidden rounded-md mb-4">
                    <Image
                      src={item.image ? `http://localhost:8000${item.image}` : '/placeholder.svg?height=300&width=500'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg font-medium">{item.name}</div>
                    <div>{item.email}</div>
                    <div>{item.role}</div>
                    <div>{item.location}</div>
                  </div>
                </div>
                {isAdmin && (
                  <div className="flex flex-col justify-between p-6 space-y-4">
                    <Button variant="outline" onClick={() => {setSelectedFacultyId(item.id); initializeEditForm(item);}}>
                      
                      Edit
                    </Button>
                    <Button variant="outline" onClick={() => { setSelectedFacultyId(item.id); setShowDeleteDialog(true); }}>
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div> */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {faculty.map((item) => (
    <div key={item.id}>
      <Facultynewcard
        name={item.name}
        role={item.role}
        image={item.image}
        email={item.email}
        location={item.location}
        onEdit={() => {
          setSelectedFacultyId(item.id);
          initializeEditForm(item);
        }}
        onDelete={() => {
          setSelectedFacultyId(item.id);
          setShowDeleteDialog(true);
        }}
        isAdmin={isAdmin}
      />
    </div>
  ))}
</div>



      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </div>
    {/* <Footer/> */}
    </>
  );
}