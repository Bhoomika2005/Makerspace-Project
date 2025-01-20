// import Image from 'next/image'

// const events = [
//   {
//     title: "Annual MakerFaire 2023",
//     date: "June 15-17, 2023",
//     description: "Showcased innovative projects from students and faculty. Featured workshops on emerging technologies.",
//     images: [
//       "/images/gallery/workshop.jpg?height=300&width=500",
//       "/images/gallery/workshop.jpg?height=300&width=500"
//     ]
//   },
//   {
//     title: "3D Printing Workshop",
//     date: "April 5, 2023",
//     description: "Hands-on workshop covering advanced techniques in 3D printing, led by industry experts.",
//     images: [
//       "/images/gallery/workshop.jpg?height=300&width=500"
//     ]
//   },
//   {
//     title: "Robotics Symposium",
//     date: "February 20-22, 2023",
//     description: "Three-day event featuring talks, demonstrations, and competitions in the field of robotics.",
//     images: [
//       "/images/gallery/workshop.jpg?height=300&width=500",
//       "/images/gallery/workshop.jpg?height=300&width=500"
//     ]
//   },
//   {
//     title: "IoT Hackathon",
//     date: "November 10-12, 2022",
//     description: "48-hour hackathon focused on developing innovative IoT solutions for real-world problems.",
//     images: [
//       "/images/gallery/workshop.jpg?height=300&width=500"
//     ]
//   }
// ]

// export default function GalleryPage() {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Events & Gallery</h1>
      
//       <div className="space-y-12">
//         {events.map((event, index) => (
//           <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="p-6">
//               <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
//               <p className="text-gray-600 mb-2">{event.date}</p>
//               <p className="text-gray-600 mb-4">{event.description}</p>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {event.images.map((image, imgIndex) => (
//                   <Image
//                     key={imgIndex}
//                     src={image}
//                     alt={`${event.title} - Image ${imgIndex + 1}`}
//                     width={500}
//                     height={300}
//                     className="w-full h-48 object-cover rounded-lg"
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Cookies from 'js-cookie';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Button } from '@/components/ui/button';
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent } from "@/components/ui/card";
// import { ChevronLeft, ChevronRight } from 'lucide-react';
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
// } from "@/components/ui/dialog";
// interface Event {
//   id: number;
//   title: string;
//   event_date: string;
//   description: string;
//   image: string | null;
// }



// export default function GalleryPage() {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [events, setEvents] = useState<Event[]>([]);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [showAddDialog, setShowAddDialog] = useState(false);
//   const [showEditDialog, setShowEditDialog] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
//   const [selectedEventId, setSelectedEventId] = useState(0);
//   const [error, setError] = useState<string | null>(null);
//   const [eventData, setEventData] = useState({
//     title: '',
//     event_date: '',
//     description: '',
//     image: null as File | null,
//   });

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
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/api/events/');
//       if (!response.ok) {
//         throw new Error('Failed to fetch events');
//       }
//       const data = await response.json();
//       setEvents(data);
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//       setError('Failed to fetch events');
//     }
//   };

//   const handleAddEvent = async () => {
//     const token = Cookies.get('access');
//     if (!token || !isAdmin) {
//       setError('You must be an admin to perform this action');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', eventData.title);
//     formData.append('event_date', eventData.event_date);
//     formData.append('description', eventData.description);
//     if (eventData.image) {
//       formData.append('image', eventData.image);
//     }

//     try {
//       const response = await fetch('http://localhost:8000/api/events/', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add event');
//       }

//       await fetchEvents();
//       setShowAddDialog(false);
//       setEventData({
//         title: '',
//         event_date: '',
//         description: '',
//         image: null,
//       });
//       setError(null);
//     } catch (error) {
//       console.error('Error adding event:', error);
//       setError('Failed to add event');
//     }
//   };

//   const handleEditEvent = async () => {
//     if (!selectedEventId) return;

//     const token = Cookies.get('access');
//     if (!token || !isAdmin) {
//       setError('You must be an admin to perform this action');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', eventData.title);
//     formData.append('event_date', eventData.event_date);
//     formData.append('description', eventData.description);
//     if (eventData.image) {
//       formData.append('image', eventData.image);
//     }

//     try {
//       const response = await fetch(`http://localhost:8000/api/events/${selectedEventId}/`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update event');
//       }

//       await fetchEvents();
//       setShowEditDialog(false);
//       setEventData({
//         title: '',
//         event_date: '',
//         description: '',
//         image: null,
//       });
//       setSelectedEvent(null);
//       setError(null);
//     } catch (error) {
//       console.error('Error updating event:', error);
//       setError('Failed to update event');
//     }
//   };

//   const handleDelete = async () => {
//     if (!selectedEventId) return;

//     const token = Cookies.get('access');
//     try {
//       const response = await fetch(`http://localhost:8000/api/events/${selectedEventId}/`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete event');
//       }

//       await fetchEvents();
//       setShowDeleteDialog(false);
//       setError(null);
//     } catch (error) {
//       setError('Failed to delete event');
//     }
//   };

//   const initializeEditForm = (event: Event) => {
//     setSelectedEvent(event);
//     setEventData({
//       title: event.title,
//       event_date: event.event_date,
//       description: event.description,
//       image: null,
//     });
//     setShowEditDialog(true);
//   };

  
    

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Events & Gallery</h1>
//         {isAdmin && (
//           <Button onClick={() => setShowAddDialog(true)}>Add Event</Button>
//         )}
//       </div>

//       {error && (
//         <Alert className="mb-4" variant="destructive">
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       <div className="space-y-6">
//         {events.map(event => (
//           <Card key={event.id} className="w-full">
//             <CardContent className="p-6">
//               <div className="space-y-4">
//                 <div className="flex justify-between items-start">
//                   <div className="space-y-2">
//                     <h2 className="text-2xl font-bold">{event.title}</h2>
//                     <p className="text-gray-500">{new Date(event.event_date).toLocaleDateString()}</p>
//                   </div>
//                   {isAdmin && (
//                     <div className="flex gap-2">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => {
//                           setSelectedEventId(event.id);
//                           initializeEditForm(event);
//                         }}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         variant="destructive"
//                         size="sm"
//                         onClick={() => {
//                           setSelectedEventId(event.id);
//                           setShowDeleteDialog(true);
//                         }}
//                       >
//                         Delete
//                       </Button>
//                     </div>
//                   )}
//                 </div>

//                 <p className="text-gray-600">{event.description}</p>

//                 {event.image && (
//                   <div className="relative aspect-video w-full overflow-hidden rounded-lg">
//                     <Image
//                       src={event.image ? `http://localhost:8000${event.image}` : '/placeholder.svg?height=300&width=500'}
//                       alt={event.title}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Add New Event</DialogTitle>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="title" className="text-right">Title</Label>
//               <Input
//                 id="title"
//                 value={eventData.title}
//                 onChange={(e) => setEventData({...eventData, title: e.target.value})}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="event_date" className="text-right">Date</Label>
//               <Input
//                 id="event_date"
//                 type="date"
//                 value={eventData.event_date}
//                 onChange={(e) => setEventData({...eventData, event_date: e.target.value})}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="description" className="text-right">Description</Label>
//               <Textarea
//                 id="description"
//                 value={eventData.description}
//                 onChange={(e) => setEventData({...eventData, description: e.target.value})}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="image" className="text-right">Image</Label>
//               <Input
//                 id="image"
//                 type="file"
//                 onChange={(e) => setEventData({
//                   ...eventData,
//                   image: e.target.files ? e.target.files[0] : null
//                 })}
//                 accept="image/*"
//                 className="col-span-3"
//               />
//             </div>
//           </div>
//           <div className="flex justify-end gap-2">
//             <Button variant="outline" onClick={() => setShowAddDialog(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleAddEvent}>Add Event</Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Edit Event</DialogTitle>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-title" className="text-right">Title</Label>
//               <Input
//                 id="edit-title"
//                 value={eventData.title}
//                 onChange={(e) => setEventData({...eventData, title: e.target.value})}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-event_date" className="text-right">Date</Label>
//               <Input
//                 id="edit-event_date"
//                 type="date"
//                 value={eventData.event_date}
//                 onChange={(e) => setEventData({...eventData, event_date: e.target.value})}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-description" className="text-right">Description</Label>
//               <Textarea
//                 id="edit-description"
//                 value={eventData.description}
//                 onChange={(e) => setEventData({...eventData, description: e.target.value})}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-image" className="text-right">Image</Label>
//               <Input
//                 id="edit-image"
//                 type="file"
//                 onChange={(e) => setEventData({
//                   ...eventData,
//                   image: e.target.files ? e.target.files[0] : null
//                 })}
//                 accept="image/*"
//                 className="col-span-3"
//               />
//             </div>
//           </div>
//           <div className="flex justify-end gap-2">
//             <Button variant="outline" onClick={() => setShowEditDialog(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleEditEvent}>Save Changes</Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. This will permanently delete the event.
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
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent } from "@/components/ui/card";
// import { ChevronLeft, ChevronRight, X } from 'lucide-react';

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
// } from "@/components/ui/dialog";

// interface EventImage {
//   id: number;
//   image: string;
// }

// interface Event {
//   id: number;
//   title: string;
//   event_date: string;
//   description: string;
//   images: EventImage[];
// }

// const ImageCarousel = ({ images }: { images: EventImage[] }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Auto-slide functionality
//   useEffect(() => {
//     if (images.length <= 1) return;
    
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 5000); // Change slide every 5 seconds

//     return () => clearInterval(interval);
//   }, [images.length]);

//   const nextImage = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const previousImage = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   if (!images.length) return null;

//   return (
//     <div className="relative w-full max-w-3xl mx-auto h-[400px] overflow-hidden rounded-lg">
//       <div className="relative h-full w-full">
//         <Image
//           src={`http://localhost:8000${images[currentIndex].image}`}
//           alt="Event image"
//           fill
//           className="object-contain transition-opacity duration-500"
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         />
//       </div>
//       {images.length > 1 && (
//         <>
//           <Button
//             variant="outline"
//             size="icon"
//             className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
//             onClick={previousImage}
//           >
//             <ChevronLeft className="h-4 w-4" />
//           </Button>
//           <Button
//             variant="outline"
//             size="icon"
//             className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
//             onClick={nextImage}
//           >
//             <ChevronRight className="h-4 w-4" />
//           </Button>
//           <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-2">
//             {images.map((_, index) => (
//               <button
//                 key={index}
//                 className={`h-2 w-2 rounded-full transition-colors ${
//                   currentIndex === index ? 'bg-white' : 'bg-white/50'
//                 }`}
//                 onClick={() => setCurrentIndex(index)}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default function GalleryPage() {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [events, setEvents] = useState<Event[]>([]);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [showAddDialog, setShowAddDialog] = useState(false);
//   const [showEditDialog, setShowEditDialog] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
//   const [selectedEventId, setSelectedEventId] = useState(0);
//   const [error, setError] = useState<string | null>(null);
//   const [eventData, setEventData] = useState({
//     title: '',
//     event_date: '',
//     description: '',
//     images: [] as File[],
//   });
    
// useEffect(() => {
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
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/api/events/');
//       if (!response.ok) {
//         throw new Error('Failed to fetch events');
//       }
//       const data = await response.json();
//       setEvents(data);
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//       setError('Failed to fetch events');
//     }
//   };

// const handleAddEvent = async () => {
//     const token = Cookies.get('access');
//     if (!token || !isAdmin) {
//       setError('You must be an admin to perform this action');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', eventData.title);
//     formData.append('event_date', eventData.event_date);
//     formData.append('description', eventData.description);
//     eventData.images.forEach((image) => {
//       formData.append('images', image);
//     });

//     try {
//       const response = await fetch('http://localhost:8000/api/events/', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add event');
//       }

//       await fetchEvents();
//       setShowAddDialog(false);
//       setEventData({
//         title: '',
//         event_date: '',
//         description: '',
//         images: [],
//       });
//       setError(null);
//     } catch (error) {
//       console.error('Error adding event:', error);
//       setError('Failed to add event');
//     }
//     };
    
// const handleEditEvent = async () => {
//     if (!selectedEventId) return;

//     const token = Cookies.get('access');
//     if (!token || !isAdmin) {
//       setError('You must be an admin to perform this action');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', eventData.title);
//     formData.append('event_date', eventData.event_date);
//     formData.append('description', eventData.description);
//     eventData.images.forEach((image) => {
//       formData.append('images', image);
//     });

//     try {
//       const response = await fetch(`http://localhost:8000/api/events/${selectedEventId}/`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update event');
//       }

//       await fetchEvents();
//       setShowEditDialog(false);
//       setEventData({
//         title: '',
//         event_date: '',
//         description: '',
//         images: [],
//       });
//       setSelectedEvent(null);
//       setError(null);
//     } catch (error) {
//       console.error('Error updating event:', error);
//       setError('Failed to update event');
//     }
//     };
    
// const handleDelete = async () => {
//     if (!selectedEventId) return;

//     const token = Cookies.get('access');
//     try {
//       const response = await fetch(`http://localhost:8000/api/events/${selectedEventId}/`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete event');
//       }

//       await fetchEvents();
//       setShowDeleteDialog(false);
//       setError(null);
//     } catch (error) {
//       setError('Failed to delete event');
//     }
//   };

//   const removeImage = (index: number) => {
//     setEventData(prev => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index),
//     }));
//     };
    
// const initializeEditForm = (event: Event) => {
//     setSelectedEvent(event);
//     setEventData({
//       title: event.title,
//       event_date: event.event_date,
//       description: event.description,
//       images: [],
//     });
//     setShowEditDialog(true);
//   };

// return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Events & Gallery</h1>
//         {isAdmin && (
//           <Button onClick={() => setShowAddDialog(true)}>Add Event</Button>
//         )}
//       </div>

//       {error && (
//         <Alert className="mb-4" variant="destructive">
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       <div className="space-y-6">
//         {events.map(event => (
//           <Card key={event.id} className="w-full">
//             <CardContent className="p-6">
//               <div className="space-y-4">
//                 <div className="flex justify-between items-start">
//                   <div className="space-y-2">
//                     <h2 className="text-2xl font-bold">{event.title}</h2>
//                     <p className="text-gray-500">{new Date(event.event_date).toLocaleDateString()}</p>
//                   </div>
//                   {isAdmin && (
//                     <div className="flex gap-2">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => {
//                           setSelectedEventId(event.id);
//                           initializeEditForm(event);
//                         }}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         variant="destructive"
//                         size="sm"
//                         onClick={() => {
//                           setSelectedEventId(event.id);
//                           setShowDeleteDialog(true);
//                         }}
//                       >
//                         Delete
//                       </Button>
//                     </div>
//                   )}
//                 </div>

//                 <p className="text-gray-600">{event.description}</p>

//                 {event.images && event.images.length > 0 && (
//                   <ImageCarousel images={event.images} />
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
//   <DialogContent className="sm:max-w-[600px]"> {/* Increased max-width */}
//     <DialogHeader>
//       <DialogTitle>Add New Event</DialogTitle>
//     </DialogHeader>
//     <div className="grid gap-4 py-4">
//       <div className="grid grid-cols-4 items-center gap-4">
//         <Label htmlFor="title" className="text-right">Title</Label>
//         <Input
//           id="title"
//           value={eventData.title}
//           onChange={(e) => setEventData({...eventData, title: e.target.value})}
//           className="col-span-3"
//         />
//       </div>
//       <div className="grid grid-cols-4 items-center gap-4">
//         <Label htmlFor="event_date" className="text-right">Date</Label>
//         <Input
//           id="event_date"
//           type="date"
//           value={eventData.event_date}
//           onChange={(e) => setEventData({...eventData, event_date: e.target.value})}
//           className="col-span-3"
//         />
//       </div>
//       <div className="grid grid-cols-4 items-center gap-4">
//         <Label htmlFor="description" className="text-right">Description</Label>
//         <Textarea
//           id="description"
//           value={eventData.description}
//           onChange={(e) => setEventData({...eventData, description: e.target.value})}
//           className="col-span-3"
//         />
//       </div>
//       <div className="grid grid-cols-4 items-start gap-4"> {/* Changed to items-start */}
//         <Label htmlFor="images" className="text-right pt-2">Images</Label>
//         <div className="col-span-3 space-y-4">
//           <Input
//             id="images"
//             type="file"
//             onChange={(e) => {
//               const files = Array.from(e.target.files || []);
//               setEventData(prev => ({
//                 ...prev,
//                 images: [...prev.images, ...files],
//               }));
//             }}
//             accept="image/*"
//             multiple
//             className="w-full"
//           />
//           {eventData.images.length > 0 && (
//             <div className="bg-gray-50 p-3 rounded-md">
//               <p className="text-sm text-gray-500 mb-2">Selected images:</p>
//               <div className="flex flex-wrap gap-2">
//                 {eventData.images.map((file, index) => (
//                   <div key={index} className="flex items-center bg-white px-3 py-1 rounded-md shadow-sm">
//                     <span className="text-sm truncate max-w-[200px]">{file.name}</span>
//                     <button
//                       onClick={() => removeImage(index)}
//                       className="ml-2 text-gray-400 hover:text-red-500"
//                       type="button"
//                     >
//                       <X className="h-4 w-4" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//     <div className="flex justify-end gap-2 mt-4">
//       <Button variant="outline" onClick={() => setShowAddDialog(false)}>
//         Cancel
//       </Button>
//       <Button onClick={handleAddEvent}>Add Event</Button>
//     </div>
//   </DialogContent>
// </Dialog>

//       <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Edit Event</DialogTitle>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-title" className="text-right">Title</Label>
//               <Input
//                 id="edit-title"
//                 value={eventData.title}
//                 onChange={(e) => setEventData({...eventData, title: e.target.value})}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-event_date" className="text-right">Date</Label>
//               <Input
//                 id="edit-event_date"
//                 type="date"
//                 value={eventData.event_date}
//                 onChange={(e) => setEventData({...eventData, event_date: e.target.value})}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-description" className="text-right">Description</Label>
//               <Textarea
//                 id="edit-description"
//                 value={eventData.description}
//                 onChange={(e) => setEventData({...eventData, description: e.target.value})}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-images" className="text-right">Add Images</Label>
//               <Input
//                 id="edit-images"
//                 type="file"
//                 onChange={(e) => {
//                   const files = Array.from(e.target.files || []);
//                   setEventData(prev => ({
//                     ...prev,
//                     images: [...prev.images, ...files],
//                   }));
//                 }}
//                 accept="image/*"
//                 multiple
//                 className="col-span-3"
//               />
//             </div>
//             {eventData.images.length > 0 && (
//               <div className="col-span-3 col-start-2">
//                 <p className="text-sm text-gray-500 mb-2">New images to add:</p>
//                 <div className="flex flex-wrap gap-2">
//                   {eventData.images.map((file, index) => (
//                     <div key={index} className="relative group">
//                       <div className="px-2 py-1 bg-gray-100 rounded text-sm">
//                         {file.name}
//                         <button
//                           onClick={() => removeImage(index)}
//                           className="ml-2 text-red-500 hover:text-red-700"
//                         >
//                           <X className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {selectedEvent?.images && selectedEvent.images.length > 0 && (
//               <div className="col-span-3 col-start-2">
//                 <p className="text-sm text-gray-500 mb-2">Current images:</p>
//                 <div className="grid grid-cols-2 gap-2">
//                   {selectedEvent.images.map((img, index) => (
//                     <div key={index} className="relative aspect-video">
//                       <Image
//                         src={`http://localhost:8000${img.image}`}
//                         alt={`Event image ${index + 1}`}
//                         fill
//                         className="object-cover rounded"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="flex justify-end gap-2">
//             <Button variant="outline" onClick={() => setShowEditDialog(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleEditEvent}>Save Changes</Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. This will permanently delete the event and all associated images.
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

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
} from "@/components/ui/dialog";

interface EventImage {
  id: number;
  image: string;
}

interface Event {
  id: number;
  title: string;
  event_date: string;
  description: string;
  images: EventImage[];
}

const ImageCarousel = ({ images }: { images: EventImage[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection('slide-left');
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => {
      setIsTransitioning(false);
      setSlideDirection('');
    }, 500);
  };

  const previousImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection('slide-right');
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setTimeout(() => {
      setIsTransitioning(false);
      setSlideDirection('');
    }, 500);
  };

  if (!images.length) return null;

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-lg">
      <style jsx>{`
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideOutLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        @keyframes slideRight {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
      `}</style>
      <div className="relative h-full w-full">
        <div className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
          slideDirection === 'slide-left' ? 'animate-[slideOutLeft_0.5s_ease-in-out]' : 
          slideDirection === 'slide-right' ? 'animate-[slideOutRight_0.5s_ease-in-out]' : ''
        }`}>
          <Image
            src={`http://localhost:8000${images[
              currentIndex === 0 ? images.length - 1 : currentIndex - 1
            ].image}`}
            alt="Previous image"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
          slideDirection === 'slide-left' ? 'animate-[slideLeft_0.5s_ease-in-out]' : 
          slideDirection === 'slide-right' ? 'animate-[slideRight_0.5s_ease-in-out]' : ''
        }`}>
          <Image
            src={`http://localhost:8000${images[currentIndex].image}`}
            alt="Current image"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
      {images.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={previousImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full transition-colors ${
                  currentIndex === index ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => {
                  if (index > currentIndex) {
                    setSlideDirection('slide-left');
                  } else if (index < currentIndex) {
                    setSlideDirection('slide-right');
                  }
                  setCurrentIndex(index);
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default function GalleryPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedEventId, setSelectedEventId] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [eventData, setEventData] = useState({
    title: '',
    event_date: '',
    description: '',
    images: [] as File[],
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
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/events/');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError('Failed to fetch events');
    }
  };

const handleAddEvent = async () => {
    const token = Cookies.get('access');
    if (!token || !isAdmin) {
      setError('You must be an admin to perform this action');
      return;
    }

    const formData = new FormData();
    formData.append('title', eventData.title);
    formData.append('event_date', eventData.event_date);
    formData.append('description', eventData.description);
    eventData.images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await fetch('http://localhost:8000/api/events/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add event');
      }

      await fetchEvents();
      setShowAddDialog(false);
      setEventData({
        title: '',
        event_date: '',
        description: '',
        images: [],
      });
      setError(null);
    } catch (error) {
      console.error('Error adding event:', error);
      setError('Failed to add event');
    }
    };
    
const handleEditEvent = async () => {
    if (!selectedEventId) return;

    const token = Cookies.get('access');
    if (!token || !isAdmin) {
      setError('You must be an admin to perform this action');
      return;
    }

    const formData = new FormData();
    formData.append('title', eventData.title);
    formData.append('event_date', eventData.event_date);
    formData.append('description', eventData.description);
    eventData.images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await fetch(`http://localhost:8000/api/events/${selectedEventId}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      await fetchEvents();
      setShowEditDialog(false);
      setEventData({
        title: '',
        event_date: '',
        description: '',
        images: [],
      });
      setSelectedEvent(null);
      setError(null);
    } catch (error) {
      console.error('Error updating event:', error);
      setError('Failed to update event');
    }
    };
    
const handleDelete = async () => {
    if (!selectedEventId) return;

    const token = Cookies.get('access');
    try {
      const response = await fetch(`http://localhost:8000/api/events/${selectedEventId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      await fetchEvents();
      setShowDeleteDialog(false);
      setError(null);
    } catch (error) {
      setError('Failed to delete event');
    }
  };

  const removeImage = (index: number) => {
    setEventData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    };
    
const initializeEditForm = (event: Event) => {
    setSelectedEvent(event);
    setEventData({
      title: event.title,
      event_date: event.event_date,
      description: event.description,
      images: [],
    });
    setShowEditDialog(true);
  };

return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Events & Gallery</h1>
        {isAdmin && (
          <Button onClick={() => setShowAddDialog(true)}>Add Event</Button>
        )}
      </div>

      {error && (
        <Alert className="mb-4" variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-8">
        {events.map(event => (
          <Card key={event.id} className="w-full overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{event.title}</h2>
                    <p className="text-gray-500">{new Date(event.event_date).toLocaleDateString()}</p>
                  </div>
                  {isAdmin && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedEventId(event.id);
                          initializeEditForm(event);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setSelectedEventId(event.id);
                          setShowDeleteDialog(true);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
                <p className="text-gray-600">{event.description}</p>
              </div>
              {event.images && event.images.length > 0 && (
                <ImageCarousel images={event.images} />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input
                id="title"
                value={eventData.title}
                onChange={(e) => setEventData({...eventData, title: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event_date" className="text-right">Date</Label>
              <Input
                id="event_date"
                type="date"
                value={eventData.event_date}
                onChange={(e) => setEventData({...eventData, event_date: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea
                id="description"
                value={eventData.description}
                onChange={(e) => setEventData({...eventData, description: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="images" className="text-right pt-2">Images</Label>
              <div className="col-span-3 space-y-4">
                <Input
                  id="images"
                  type="file"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setEventData(prev => ({
                      ...prev,
                      images: [...prev.images, ...files],
                    }));
                  }}
                  accept="image/*"
                  multiple
                  className="w-full"
                />
                {eventData.images.length > 0 && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-500 mb-2">Selected images:</p>
                    <div className="flex flex-wrap gap-2">
                      {eventData.images.map((file, index) => (
                        <div key={index} className="flex items-center bg-white px-3 py-1 rounded-md shadow-sm">
                          <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                          <button
                            onClick={() => removeImage(index)}
                            className="ml-2 text-gray-400 hover:text-red-500"
                            type="button"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent}>Add Event</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-title" className="text-right">Title</Label>
              <Input
                id="edit-title"
                value={eventData.title}
                onChange={(e) => setEventData({...eventData, title: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-event_date" className="text-right">Date</Label>
              <Input
                id="edit-event_date"
                type="date"
                value={eventData.event_date}
                onChange={(e) => setEventData({...eventData, event_date: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">Description</Label>
              <Textarea
                id="edit-description"
                value={eventData.description}
                onChange={(e) => setEventData({...eventData, description: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="edit-images" className="text-right pt-2">Images</Label>
              <div className="col-span-3 space-y-4">
                <Input
                  id="edit-images"
                  type="file"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setEventData(prev => ({
                      ...prev,
                      images: [...prev.images, ...files],
                    }));
                  }}
                  accept="image/*"
                  multiple
                  className="w-full"
                />
                {eventData.images.length > 0 && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-500 mb-2">New images to add:</p>
                    <div className="flex flex-wrap gap-2">
                      {eventData.images.map((file, index) => (                        
                        <div key={index} className="flex items-center bg-white px-3 py-1 rounded-md shadow-sm">
                          <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                          <button
                            onClick={() => removeImage(index)}
                            className="ml-2 text-gray-400 hover:text-red-500"
                            type="button"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {selectedEvent?.images && selectedEvent.images.length > 0 && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-500 mb-2">Current images:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedEvent.images.map((img, index) => (
                        <div key={index} className="relative aspect-video">
                          <Image
                            src={`http://localhost:8000${img.image}`}
                            alt={`Event image ${index + 1}`}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditEvent}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the event and all associated images.
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