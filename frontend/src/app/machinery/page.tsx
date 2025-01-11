'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

interface Equipment {
  id: number;
  name: string;
  image: string | null;
  quantity: number;
  manufacturer: string;
  model_name: string;
  notes: string;
}

export default function MachineryPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [equipmentData, setEquipmentData] = useState({
    name: '',
    image: null as File | null,
    quantity: 0,
    manufacturer: '',
    model_name: '',
    notes: '',
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
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/machinery/');
      if (!response.ok) {
        throw new Error('Failed to fetch equipment');
      }
      const data = await response.json();
      setEquipment(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching equipment:", error);
      setError('Failed to fetch equipment');
    }
  };

  const handleAddEquipment = async () => {
    const token = Cookies.get('access');
    if (!token || !isAdmin) {
      setError('You must be an admin to perform this action');
      return;
    }

    // const equipmentData = new FormData();
    // Object.entries(equipmentData).forEach(([key, value]) => {
    //   if (key === 'image' && value instanceof File) {
    //     equipmentData.append(key, value);
    //   } else if (key !== 'image') {
    //     equipmentData.append(key, value.toString());
    //   }
    // });

    const formData = new FormData();
    formData.append('name', equipmentData.name);
    formData.append('quantity', equipmentData.quantity.toString());
    formData.append('manufacturer', equipmentData.manufacturer);
    formData.append('model_name', equipmentData.model_name);
    formData.append('notes', equipmentData.notes);
    if (equipmentData.image) {
      formData.append('image', equipmentData.image);
    }



    console.log("data : ", equipmentData)

    try {
      const response = await fetch('http://localhost:8000/api/machinery/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add equipment');
      }

      await fetchEquipment();
      setShowAddDialog(false);
      setEquipmentData({
        name: '',
        quantity: 0,
        manufacturer: '',
        model_name: '',
        notes: '',
        image: null,
      });
      setSelectedEquipment(null);
      setError(null);
    } catch (error) {
      console.error('Error adding equipment:', error);
      setError('Failed to add equipment');
    }
  };

  const handleEditEquipment = async () => {
    if (!selectedEquipmentId) return;

    const token = Cookies.get('access');
    if (!token || !isAdmin) {
      setError('You must be an admin to perform this action');
      return;
    }

    // const equipmentData = new FormData();
    // Object.entries(equipmentData).forEach(([key, value]) => {
    //   if (key === 'image' && value instanceof File) {
    //     equipmentData.append(key, value);
    //   } else if (key !== 'image') {
    //     equipmentData.append(key, value.toString());
    //   }
    // });

    const formData = new FormData();
    formData.append('name', equipmentData.name);
    formData.append('quantity', equipmentData.quantity.toString());
    formData.append('manufacturer', equipmentData.manufacturer);
    formData.append('model_name', equipmentData.model_name);
    formData.append('notes', equipmentData.notes);
    if (equipmentData.image) {
      formData.append('image', equipmentData.image);
    }

    try {
      const response = await fetch(`http://localhost:8000/api/machinery/${selectedEquipmentId}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update equipment');
      }

      await fetchEquipment();
      setShowEditDialog(false);
      setEquipmentData({
        name: '',
        quantity: 0,
        manufacturer: '',
        model_name: '',
        notes: '',
        image: null,
      });
      setSelectedEquipment(null);
      setError(null);
    } catch (error) {
      console.error('Error updating equipment:', error);
      setError('Failed to update equipment');
    }
  };

  const handleDelete = async () => {
    if (!selectedEquipmentId) return;

    const token = Cookies.get('access');
    try {
      const response = await fetch(`http://localhost:8000/api/machinery/${selectedEquipmentId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete equipment');
      }

      await fetchEquipment();
      setShowDeleteDialog(false);
      setError(null);
    } catch (error) {
      setError('Failed to delete equipment');
    }
  };

  const initializeEditForm = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setEquipmentData({
      name: equipment.name,
      quantity: equipment.quantity,
      manufacturer: equipment.manufacturer,
      model_name: equipment.model_name,
      notes: equipment.notes,
      image: null,
    });
    setShowEditDialog(true);
  };

  return (
    <div className="p-4">
      {error && (
        <Alert className="mb-4" variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isAdmin && (
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="mb-4">Add Equipment</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Equipment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name"
                  value={equipmentData.name}
                  onChange={(e) => setEquipmentData({...equipmentData, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={equipmentData.quantity}
                  onChange={(e) => setEquipmentData({...equipmentData, quantity: parseInt(e.target.value)})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="manufacturer" className="text-right">Manufacturer</Label>
                <Input
                  id="manufacturer"
                  value={equipmentData.manufacturer}
                  onChange={(e) => setEquipmentData({...equipmentData, manufacturer: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="model_name" className="text-right">Model Name</Label>
                <Input
                  id="model_name"
                  value={equipmentData.model_name}
                  onChange={(e) => setEquipmentData({...equipmentData, model_name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">Notes</Label>
                <Textarea
                  id="notes"
                  value={equipmentData.notes}
                  onChange={(e) => setEquipmentData({...equipmentData, notes: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">Image</Label>
                <Input
                  id="image"
                  type="file"
                  onChange={(e) => setEquipmentData({...equipmentData, image: e.target.files?.[0] || null})}
                  accept="image/*"
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEquipment}>Add Equipment</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {equipment.map(item => (
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
                    <div>
                      <span className="font-semibold">Name:</span>
                      <span className="ml-2">{item.name}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Quantity:</span>
                      <span className="ml-2">{item.quantity}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Manufacturer:</span>
                      <span className="ml-2">{item.manufacturer}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Model Name:</span>
                      <span className="ml-2">{item.model_name}</span>
                    </div>
                    {isAdmin && (
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>{setSelectedEquipmentId(item.id); initializeEditForm(item)}}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setSelectedEquipmentId(item.id);
                            setShowDeleteDialog(true);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6 border-l">
                  <h4 className="font-semibold mb-2 border-b pb-1">Description</h4>
                  <p className="text-sm text-gray-600">{item.notes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Equipment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">Name</Label>
              <Input
                id="edit-name"
                value={equipmentData.name}
                onChange={(e) => setEquipmentData({...equipmentData, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-quantity" className="text-right">Quantity</Label>
              <Input
                id="edit-quantity"
                type="number"
                value={equipmentData.quantity}
                onChange={(e) => setEquipmentData({...equipmentData, quantity: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-manufacturer" className="text-right">Manufacturer</Label>
              <Input
                id="edit-manufacturer"
                value={equipmentData.manufacturer}
                onChange={(e) => setEquipmentData({...equipmentData, manufacturer: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-model_name" className="text-right">Model Name</Label>
              <Input
                id="edit-model_name"
                value={equipmentData.model_name}
                onChange={(e) => setEquipmentData({...equipmentData, model_name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-notes" className="text-right">Notes</Label>
              <Textarea
                id="edit-notes"
                value={equipmentData.notes}
                onChange={(e) => setEquipmentData({...equipmentData, notes: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-image" className="text-right">Image</Label>
              <Input
                id="edit-image"
                type="file"
                onChange={(e) => setEquipmentData({...equipmentData, image: e.target.files?.[0] || null})}
                accept="image/*"
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditEquipment}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the equipment.
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

