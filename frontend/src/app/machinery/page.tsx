// 'use client';
// import { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Button } from '@/components/ui/button';
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// export default function EquipmentPage() {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const [machines, setMachines] = useState([]);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [showUploadDialog, setShowUploadDialog] = useState(false);
//   const [selectedMachineId, setSelectedMachineId] = useState(null);
//   const [error, setError] = useState(null);
//   const [machineTitle, setMachineTitle] = useState('');
//   const [selectedFile, setSelectedFile] = useState(null);

//   useEffect(() => {
//     async function checkAdminStatus() {
//       try {
//         const token = Cookies.get('access')

//         if (!token) {
//           setIsLoggedIn(false)
//           setIsAdmin(false)
//           return;
//         }

//         setIsLoggedIn(true);
//         const userCookie = Cookies.get('user');
//         if (userCookie) {
//           const userDetails = JSON.parse(userCookie);
//           setUser(userDetails);
//           setIsAdmin(userDetails.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL);
//         }
//       } catch (error) {
//         console.error("Error checking the user status : ", error);
//         setIsLoggedIn(false)
//         setIsAdmin(false)
//       }
//     }
//     checkAdminStatus();
//   }, []);

//   useEffect(() => {
//     fetchEquipment();
//   },[isLoggedIn]);

//   // fetching equipment data
//   const fetchEquipment = async () => {
//     try {
//       const token = Cookies.get('access');
//       const response = await fetch('http://localhost:8000/api/machinery/', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           // ...(token && { 'Authorization': `Bearer ${token}` }),
//         },
//         cache: 'no-store',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch forms');
//       }

//       const data = await response.json();
//       // console.log("forms data : ", data)
//       setMachines(data);
//       setError(null);
//     } catch (error) {
      
//       console.error("Error fetching machines:", error);
//       setError('Failed to fetch machines');
//     }
//   };

//   //Add machine
//   const handleAddMachine = async () => {
//     if (!selectedFile || !formTitle.trim()) {
//       setError('Please provide both title and file');
//       return;
//     }

//     if (!isAdmin) {
//       setError('You must be an admin to upload forms');
//       return;
//     }

//     const equipmentData = new equipmentData();
//     equipmentData.append('file', selectedFile);
//     equipmentData.append('title', formTitle.trim());

//     const token = Cookies.get('access');
//     try {
//       const response = await fetch('http://localhost:8000/api/forms/', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: equipmentData,
//       });
      
//       if (response.status === 401) {
//         setError('Your session has expired. Please log in again.');
//         setIsLoggedIn(false);
//         return;
//       }
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Upload error:', errorData);
//         throw new Error(JSON.stringify(errorData));
//       }

//       await fetchForms();
//       setShowUploadDialog(false);
//       setFormTitle('');
//       setSelectedFile(null);
//       setError(null);
//     } catch (err) {
//       console.error('Error uploading:', err);
//       setError('Failed to upload form: ' + err.message);
//     }
//   };

//   const handleDelete = async () => {
//     if (!selectedFormId) return;

//     const token = Cookies.get('access');
//     try {
//       const response = await fetch(`http://localhost:8000/api/forms/${selectedFormId}/`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete form');
//       }

//       await fetchForms();
//       setShowDeleteDialog(false);
//       setError(null);

//     } catch (err) {
//       setError('Failed to delete form');
//     }
//   };

//   const handleDownload = async (formId) => {
//     const token = Cookies.get('access');
//     try {
//       const response = await fetch(`http://localhost:8000/api/forms/${formId}/download/`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to download form');
//       }

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `form-${formId}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//       document.body.removeChild(a);
//     } catch (error) {
//       console.error('Error downloading form:', error);
//       setError('Failed to download form');
//     }
//   };

//   const handleView = async (formId) => {
//     try {
//       const response = await fetch(`http://localhost:8000/api/forms/${formId}/view/`);
      
//       if (!response.ok) {
//         throw new Error('Failed to view form');
//       }

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       window.open(url, '_blank');
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error('Error viewing form:', error);
//       setError('Failed to view form');
//     }
//   };

//   return (
//     <div className="p-4">
//       {error && (
//         <Alert className="mb-4" variant="destructive">
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       {isAdmin && (
//         <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
//           <DialogTrigger asChild>
//             <Button className="mb-4">Add Form</Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Upload New Form</DialogTitle>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="title" className="text-right">Title</Label>
//                 <Input
//                   id="title"
//                   value={formTitle}
//                   onChange={(e) => setFormTitle(e.target.value)}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="file" className="text-right">File</Label>
//                 <Input
//                   id="file"
//                   type="file"
//                   onChange={(e) => setSelectedFile(e.target.files[0])}
//                   accept=".pdf,.doc,.docx"
//                   className="col-span-3"
//                 />
//               </div>
//             </div>
//             <div className="flex justify-end gap-2">
//               <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={handleFileUpload}>Upload</Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       )}

//       <div className="grid gap-4">
//         {forms.map(form => (
//           <div key={form.id} className="flex items-center justify-between p-4 border rounded">
//             <span className="font-medium">{form.title}</span>
//             <div className="flex gap-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => handleView(form.id)}
//               >
//                 <Eye className="w-4 h-4 mr-2" />
//                 View
//               </Button>
              
//               {isLoggedIn && (
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleDownload(form.id)}
//                 >
//                   <Download className="w-4 h-4 mr-2" />
//                   Download
//                 </Button>
//               )}

//               {isAdmin && (
//                 <Button
//                   variant="destructive"
//                   size="sm"
//                   onClick={() => {
//                     setSelectedFormId(form.id);
//                     setShowDeleteDialog(true);
//                   }}
//                 >
//                   Delete
//                 </Button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. This will permanently delete the form.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// }
// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Cookies from 'js-cookie';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Button } from '@/components/ui/button';
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { TextArea } from "@/components/ui/textarea";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// interface Equipment {
//   id: number;
//   name: string;
//   image: string | null;
//   quantity: number;
//   manufacturer: string;
//   model_number: string;
//   notes: string;
// }

// export default function MachineryPage() {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [equipment, setEquipment] = useState<Equipment[]>([]);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [showAddDialog, setShowAddDialog] = useState(false);
//   const [showEditDialog, setShowEditDialog] = useState(false);
//   const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [equipmentData, setEquipmentData] = useState({
//     name: '',
//     quantity: 0,
//     manufacturer: '',
//     model_number: '',
//     notes: '',
//   });
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);

//   useEffect(() => {
//     async function checkAdminStatus() {
//       try {
//         const token = Cookies.get('access');
//         if (!token) {
//           setIsLoggedIn(false);
//           setIsAdmin(false);
//           return;
//         }
//         setIsLoggedIn(true);
//         const userCookie = Cookies.get('user');
//         if (userCookie) {
//           const userDetails = JSON.parse(userCookie);
//           setIsAdmin(userDetails.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL);
//         }
//       } catch (error) {
//         console.error("Error checking admin status:", error);
//         setIsAdmin(false);
//       }
//     }
//     checkAdminStatus();
//   }, []);

//   useEffect(() => {
//     if (isLoggedIn) {
//       fetchEquipment();
//     }
//   }, [isLoggedIn]);

//   const fetchEquipment = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/api/machinery/');
//       console.log(response);
//       if (!response.ok) {
//         throw new Error('Failed to fetch equipment');
//       }
//       const data = await response.json();
//       setEquipment(data);
//       setError(null);
//     } catch (error) {
//       //console.error("Error fetching equipment:", error);
//       setError('Failed to fetch equipment');
//     }
//   };

//   const handleAddEquipment = async () => {
//     const token = Cookies.get('access');
//     if (!token || !isAdmin) {
//       setError('You must be an admin to perform this action');
//       return;
//     }

//     const equipmentData = new equipmentData();
//     Object.entries(equipmentData).forEach(([key, value]) => {
//       equipmentData.append(key, value.toString());
//     });
//     if (selectedImage) {
//       equipmentData.append('image', selectedImage);
//     }

//     try {
//       const response = await fetch('http://localhost:8000/api/machinery/', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: equipmentData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add equipment');
//       }

//       await fetchEquipment();
//       setShowAddDialog(false);
//       setError(null);
//     } catch (error) {
//       console.error('Error adding equipment:', error);
//       setError('Failed to add equipment');
//     }
//   };

//   const handleDelete = async () => {
//     if (!selectedEquipment) return;

//     const token = Cookies.get('access');
//     try {
//       const response = await fetch(`http://localhost:8000/api/machinery/${selectedEquipment.id}/`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete equipment');
//       }

//       await fetchEquipment();
//       setShowDeleteDialog(false);
//       setError(null);
//     } catch (error) {
//       setError('Failed to delete equipment');
//     }
//   };

//   const handleEdit = (equipment: Equipment) => {
//     setSelectedEquipment(equipment);
//     setEquipmentData({
//       name: equipment.name,
//       quantity: equipment.quantity,
//       manufacturer: equipment.manufacturer,
//       model_number: equipment.model_number,
//       notes: equipment.notes,
//     });
//     setShowEditDialog(true);
//   };

//   return (
//     <div className="p-4">
//       {error && (
//         <Alert className="mb-4" variant="destructive">
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       {isAdmin && (
//         <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
//           <DialogTrigger asChild>
//             <Button className="mb-4">Add Equipment</Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px]">
//             <DialogHeader>
//               <DialogTitle>Add New Equipment</DialogTitle>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="name" className="text-right">Name</Label>
//                 <Input
//                   id="name"
//                   value={equipmentData.name}
//                   onChange={(e) => setEquipmentData({...equipmentData, name: e.target.value})}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="quantity" className="text-right">Quantity</Label>
//                 <Input
//                   id="quantity"
//                   type="number"
//                   value={equipmentData.quantity}
//                   onChange={(e) => setEquipmentData({...equipmentData, quantity: parseInt(e.target.value)})}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="manufacturer" className="text-right">Manufacturer</Label>
//                 <Input
//                   id="manufacturer"
//                   value={equipmentData.manufacturer}
//                   onChange={(e) => setEquipmentData({...equipmentData, manufacturer: e.target.value})}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="model_number" className="text-right">Model Number</Label>
//                 <Input
//                   id="model_number"
//                   value={equipmentData.model_number}
//                   onChange={(e) => setEquipmentData({...equipmentData, model_number: e.target.value})}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="notes" className="text-right">Notes</Label>
//                 <TextArea
//                   id="notes"
//                   value={equipmentData.notes}
//                   onChange={(e) => setEquipmentData({...equipmentData, notes: e.target.value})}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="image" className="text-right">Image</Label>
//                 <Input
//                   id="image"
//                   type="file"
//                   onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
//                   accept="image/*"
//                   className="col-span-3"
//                 />
//               </div>
//             </div>
//             <div className="flex justify-end gap-2">
//               <Button variant="outline" onClick={() => setShowAddDialog(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={() => handleAddEquipment()}>Add Equipment</Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       )}

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {equipment.map(item => (
//           <div key={item.id} className="border rounded-lg p-4 space-y-4">
//             <div className="aspect-square relative overflow-hidden rounded-md">
//               <Image
//                 src={item.image || '/placeholder.svg?height=300&width=300'}
//                 alt={item.name}
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold">{item.name}</h3>
//               <p className="text-sm text-gray-500">Model: {item.model_number}</p>
//               <p className="text-sm text-gray-500">Manufacturer: {item.manufacturer}</p>
//               <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
//               <p className="text-sm text-gray-600 mt-2">{item.notes}</p>
//             </div>
//             {isAdmin && (
//               <div className="flex gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleEdit(item)}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   variant="destructive"
//                   size="sm"
//                   onClick={() => {
//                     setSelectedEquipment(item);
//                     setShowDeleteDialog(true);
//                   }}
//                 >
//                   Delete
//                 </Button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Edit Equipment</DialogTitle>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-name" className="text-right">Name</Label>
//               <Input
//                 id="edit-name"
//                 value={equipmentData.name}
//                 onChange={(e) => setEquipmentData({...equipmentData, name: e.target.value})}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-quantity" className="text-right">Quantity</Label>
//               <Input
//                 id="edit-quantity"
//                 type="number"
//                 value={equipmentData.quantity}
//                 onChange={(e) => setEquipmentData({...equipmentData, quantity: parseInt(e.target.value)})}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-manufacturer" className="text-right">Manufacturer</Label>
//               <Input
//                 id="edit-manufacturer"
//                 value={equipmentData.manufacturer}
//                 onChange={(e) => setEquipmentData({...equipmentData, manufacturer: e.target.value})}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-model_number" className="text-right">Model Number</Label>
//               <Input
//                 id="edit-model_number"
//                 value={equipmentData.model_number}
//                 onChange={(e) => setEquipmentData({...equipmentData, model_number: e.target.value})}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-notes" className="text-right">Notes</Label>
//               <TextArea
//                 id="edit-notes"
//                 value={equipmentData.notes}
//                 onChange={(e) => setEquipmentData({...equipmentData, notes: e.target.value})}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-image" className="text-right">Image</Label>
//               <Input
//                 id="edit-image"
//                 type="file"
//                 onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
//                 accept="image/*"
//                 className="col-span-3"
//               />
//             </div>
//           </div>
//           <div className="flex justify-end gap-2">
//             <Button variant="outline" onClick={() => setShowEditDialog(false)}>
//               Cancel
//             </Button>
//             <Button onClick={() => handleAddEquipment()}>Save Changes</Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. This will permanently delete the equipment.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextArea } from "@/components/ui/textarea";
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
  model_number: string;
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
    model_number: '',
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

    const equipmentData = new FormData();
    Object.entries(equipmentData).forEach(([key, value]) => {
      if (key === 'image' && value instanceof File) {
        equipmentData.append(key, value);
      } else if (key !== 'image') {
        equipmentData.append(key, value.toString());
      }
    });

    try {
      const response = await fetch('http://localhost:8000/api/machinery/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: equipmentData,
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
        model_number: '',
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

    const equipmentData = new FormData();
    Object.entries(equipmentData).forEach(([key, value]) => {
      if (key === 'image' && value instanceof File) {
        equipmentData.append(key, value);
      } else if (key !== 'image') {
        equipmentData.append(key, value.toString());
      }
    });

    try {
      const response = await fetch(`http://localhost:8000/api/machinery/${selectedEquipmentId}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: equipmentData,
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
        model_number: '',
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
      model_number: equipment.model_number,
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
                <Label htmlFor="model_number" className="text-right">Model Number</Label>
                <Input
                  id="model_number"
                  value={equipmentData.model_number}
                  onChange={(e) => setEquipmentData({...equipmentData, model_number: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">Notes</Label>
                <TextArea
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
                      src={item.image || '/placeholder.svg?height=300&width=300'}
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
                      <span className="font-semibold">Model Number:</span>
                      <span className="ml-2">{item.model_number}</span>
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
              <Label htmlFor="edit-model_number" className="text-right">Model Number</Label>
              <Input
                id="edit-model_number"
                value={equipmentData.model_number}
                onChange={(e) => setEquipmentData({...equipmentData, model_number: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-notes" className="text-right">Notes</Label>
              <TextArea
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

