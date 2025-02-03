
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Cookies from "js-cookie"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Plus,ChevronLeft, ChevronRight, X, ImageIcon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Header from "@/components/HeaderReplica"
import Navbar from "@/components/Navbar"

import { useRouter } from "next/navigation"

interface EventImage {
  id: number
  image: string
}

interface Event {
  id: number
  title: string
  event_date: string
  description: string
  images: EventImage[]
}

interface User {
  email: string;
  [key: string]: any;
}


const ImageCarousel = ({ images, onClose, event }: { images: EventImage[]; onClose?: () => void; event: Event }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 2000); // Automatically transition every 2 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop back to the first image
      setIsAnimating(false);
    }, 1000); // Match animation duration
  };

  const previousImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      setIsAnimating(false);
    }, 1000); // Match animation duration
  };

  const getPositionClass = (index: number) => {
  if (index === currentIndex) return "translate-x-0 scale-100 opacity-100 z-10"; // Current image
  if (index === (currentIndex - 1 + images.length) % images.length)
    return "-translate-x-[16rem] scale-90 opacity-50 z-0"; // Left image
  if (index === (currentIndex + 1) % images.length)
    return "translate-x-[16rem] scale-90 opacity-50 z-0"; // Right image

  // Ensure no black space by keeping images hidden properly
  return "opacity-0 scale-75 absolute"; // Hide other images but keep them ready off-screen
};


  if (!images.length) return null;

  return (
    <Card className="w-full max-w-[90vw] bg-black/90 border-none">
      <div className="relative w-full h-full flex flex-col items-center justify-center gap-8 p-8">
        <div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
          <div
            className={`relative flex items-center justify-center w-full transition-transform duration-1000 ease-[cubic-bezier(0.25, 1, 0.5, 1)]`}
          >
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.25, 1, 0.5, 1)] ${getPositionClass(
                  index
                )}`}
              >
                <div className="relative w-[600px] h-[400px] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={`http://localhost:8000${image.image}`}
                    alt="Gallery image"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full z-20"
            onClick={previousImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full z-20"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentIndex === index ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};


export default function GalleryPage() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [selectedEventId, setSelectedEventId] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [showCarousel, setShowCarousel] = useState(false)
  const [eventData, setEventData] = useState({
    title: "",
    event_date: "",
    description: "",
    images: [] as File[],
  })

  useEffect(() => {
    async function checkAdminStatus() {
      try {
        const token = Cookies.get("access")
        if (!token) {
          setIsLoggedIn(false)
          setIsAdmin(false)
          return
        }
        setIsLoggedIn(true)
        const userCookie = Cookies.get("user")
        if (userCookie) {
          const userDetails = JSON.parse(userCookie)
          setIsAdmin(userDetails.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL)
        }
      } catch (error) {
        console.error("Error checking admin status:", error)
        setIsAdmin(false)
      }
    }
    checkAdminStatus()
  }, [])

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/events/")
      if (!response.ok) {
        throw new Error("Failed to fetch events")
      }
      const data = await response.json()
      setEvents(data)
      setError(null)
    } catch (error) {
      console.error("Error fetching events:", error)
      setError("Failed to fetch events")
    }
  }

  const handleAddEvent = async () => {
    const token = Cookies.get("access")
    if (!token || !isAdmin) {
      setError("You must be an admin to perform this action")
      return
    }

    const formData = new FormData()
    formData.append("title", eventData.title)
    formData.append("event_date", eventData.event_date)
    formData.append("description", eventData.description)
    eventData.images.forEach((image) => {
      formData.append("images", image)
    })

    try {
      const response = await fetch("http://localhost:8000/api/events/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to add event")
      }

      await fetchEvents()
      setShowAddDialog(false)
      setEventData({
        title: "",
        event_date: "",
        description: "",
        images: [],
      })
      setError(null)
    } catch (error) {
      console.error("Error adding event:", error)
      setError("Failed to add event")
    }
  }

  const handleEditEvent = async () => {
    if (!selectedEventId) return

    const token = Cookies.get("access")
    if (!token || !isAdmin) {
      setError("You must be an admin to perform this action")
      return
    }

    const formData = new FormData()
    formData.append("title", eventData.title)
    formData.append("event_date", eventData.event_date)
    formData.append("description", eventData.description)
    eventData.images.forEach((image) => {
      formData.append("images", image)
    })

    try {
      const response = await fetch(`http://localhost:8000/api/events/${selectedEventId}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to update event")
      }

      await fetchEvents()
      setShowEditDialog(false)
      setEventData({
        title: "",
        event_date: "",
        description: "",
        images: [],
      })
      setSelectedEvent(null)
      setError(null)
    } catch (error) {
      console.error("Error updating event:", error)
      setError("Failed to update event")
    }
  }

  const handleDelete = async () => {
    if (!selectedEventId) return

    const token = Cookies.get("access")
    try {
      const response = await fetch(`http://localhost:8000/api/events/${selectedEventId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete event")
      }

      await fetchEvents()
      setShowDeleteDialog(false)
      setError(null)
    } catch (error) {
      setError("Failed to delete event")
    }
  }

  const initializeEditForm = (event: Event) => {
    setSelectedEvent(event)
    setEventData({
      title: event.title,
      event_date: event.event_date,
      description: event.description,
      images: [],
    })
    setShowEditDialog(true)
  }

    const removeImage = (index: number) => {
    setEventData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    };

    const handleSignOut = () => {
      Cookies.remove("access");
      Cookies.remove("refresh");
      Cookies.remove("user");
  
      setIsLoggedIn(false);
      setUser(null);
      window.location.href = "/";
    };
  
    if (isLoggedIn && !isAdmin) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Sorry! You do not have Admin Access !!
          </h1>
          <Button
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-800"
            onClick={() => {
              handleSignOut();
              router.push("/");
            }}
          >
            Go Back to Home Page
          </Button>
        </div>
      );
    }

  return (
    <div>
      <Header />
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex justify-between items-center ">
            <ImageIcon className="mr-2 h-6 w-6 text-[#026bc0]" />
            <h1 className="text-2xl font-bold text-[#026bc0]">
              Events & Gallery
            </h1>
          </div>

          {isAdmin && (
            <div className="relative group">
              <button
                className="bg-[#026bc0] p-2 rounded-full text-white text-xs shadow-lg hover:bg-[#0610ab] transition-colors duration-200"
                onClick={() => setShowAddDialog(true)}
              >
                <Plus className="h-5 w-5" />
              </button>
              <div className="absolute top-1/2 mx-2 right-full transform -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-[#0610ab] text-white text-sm rounded-md px-3 py-2 transition-all duration-200 shadow-lg whitespace-nowrap">
                Add Event
              </div>
            </div>
          )}
        </div>

        {error && (
          <Alert className="mb-6" variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => {
                setSelectedEvent(event);
                setShowCarousel(true);
              }}
            >
              <CardContent className="p-4 space-y-4">
                <div className="aspect-video relative overflow-hidden rounded-md">
                  {event.images && event.images.length > 0 ? (
                    <Image
                      src={`http://localhost:8000${event.images[0].image}`}
                      alt={event.title}
                      fill
                      className="object-cover hover:scale-110 transform transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-xl line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="text-lg text-gray-500">
                    {new Date(event.event_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="h-1 w-12 bg-gradient-to-tr from-[#027cc4] to-[#0610ab] mt-2 rounded-lg"></div>
                <div>
                  <p className="text-gray-600 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  {isAdmin && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEventId(event.id);
                          initializeEditForm(event);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEventId(event.id);
                          setShowDeleteDialog(true);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Image Carousel Modal */}
        <Dialog open={showCarousel} onOpenChange={setShowCarousel}>
          <DialogContent className="max-w-none w-screen h-screen p-0 bg-black/90 backdrop-blur-md">
            <DialogTitle className="sr-only">Image Gallery</DialogTitle>
            <div className="relative w-full h-full flex items-center justify-center">
              {selectedEvent && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full z-50"
                    onClick={() => setShowCarousel(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <ImageCarousel
                    images={selectedEvent.images}
                    event={selectedEvent}
                    onClose={() => setShowCarousel(false)}
                  />
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent
            className="sm:max-w-[600px]"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            <DialogHeader>
              <DialogTitle className="text-center text-xl text-[#026bc0]">
                Add New Event
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={eventData.title}
                  onChange={(e) =>
                    setEventData({ ...eventData, title: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event_date" className="text-right">
                  Date
                </Label>
                <Input
                  id="event_date"
                  type="date"
                  value={eventData.event_date}
                  onChange={(e) =>
                    setEventData({ ...eventData, event_date: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={eventData.description}
                  onChange={(e) =>
                    setEventData({ ...eventData, description: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="images" className="text-right pt-2">
                  Images
                </Label>
                <div className="col-span-3 space-y-4">
                  <Input
                    id="images"
                    type="file"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setEventData((prev) => ({
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
                      <p className="text-sm text-gray-500 mb-2">
                        Selected images:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {eventData.images.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-white px-3 py-1 rounded-md shadow-sm"
                          >
                            <span className="text-sm truncate max-w-[200px]">
                              {file.name}
                            </span>
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
              <Button
                variant={"outline"}
                onClick={() => setShowAddDialog(false)}
              >
                Cancel
              </Button>
              <Button variant={"outline"} onClick={handleAddEvent}>
                Add Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent
            className="sm:max-w-[600px]"
            style={{ maxHeight: "600px", overflowY: "auto" }}
          >
            <DialogHeader>
              <DialogTitle className="text-center text-xl text-[#026bc0]">
                Edit Event
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={eventData.title}
                  onChange={(e) =>
                    setEventData({ ...eventData, title: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-event_date" className="text-right">
                  Date
                </Label>
                <Input
                  id="edit-event_date"
                  type="date"
                  value={eventData.event_date}
                  onChange={(e) =>
                    setEventData({ ...eventData, event_date: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  value={eventData.description}
                  onChange={(e) =>
                    setEventData({ ...eventData, description: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              {/* Handle image uploads similarly */}
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-images" className="text-right pt-2">
                  Images
                </Label>
                <div className="col-span-3 space-y-4">
                  <Input
                    id="edit-images"
                    type="file"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setEventData((prev) => ({
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
                      <p className="text-sm text-gray-500 mb-2">
                        New images to add:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {eventData.images.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-white px-3 py-1 rounded-md shadow-sm"
                          >
                            <span className="text-sm truncate max-w-[200px]">
                              {file.name}
                            </span>
                            <button
                              onClick={() => removeImage(index)} // Remove function for uploaded image
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
              <Button
                variant="outline"
                onClick={() => setShowEditDialog(false)}
              >
                Cancel
              </Button>
              <Button variant="outline" onClick={handleEditEvent}>
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                event and all associated images.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}