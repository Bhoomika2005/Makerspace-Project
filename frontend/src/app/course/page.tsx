// with SLIDERS

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Header from "@/components/HeaderReplica";
// import Navbar from "@/components/Navbar";
// import HeaderCard from "@/components/HeaderCard";
// import { BookOpen, Plus } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
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
// import SlidingImages from "@/components/sliding_images";

// interface CourseHeader {
//   id: number;
//   title: string;
//   description: string;
// }

// interface User {
//   email: string;
//   [key: string]: any;
// }

// export default function CoursePage() {
//   const [headers, setHeaders] = useState<CourseHeader[]>([]);
//   const [selectedHeader, setSelectedHeader] = useState<CourseHeader | null>(
//     null
//   );
//   const [error, setError] = useState<string | null>(null);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [showAddEditDialog, setShowAddEditDialog] = useState(false);
//   const [isNewHeader, setIsNewHeader] = useState(false);

//   const router = useRouter();
//   const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

//   // Sample images for the sliding reels
//   const leftImages = [
//     "/images/sliding/1.jpg",
//     "/images/sliding/2.jpg",
//     "/images/sliding/3.jpg",
//     "/images/sliding/4.jpg",
//     "/images/sliding/5.jpg",
//     "/images/sliding/6.jpg",
//     "/images/sliding/7.jpg",
//     "/images/sliding/8.jpg",
//     "/images/sliding/9.jpg",
//     "/images/sliding/10.jpg",
//     "/images/sliding/11.jpg",
//     "/images/sliding/12.jpg",
//     "/images/sliding/13.jpg",
//     "/images/sliding/14.jpg",
//     "/images/sliding/15.jpg",
//     "/images/sliding/16.jpg",
//     "/images/sliding/17.jpg",
//   ];

//   const rightImages = [
//     "/images/sliding/17.jpg",
//     "/images/sliding/16.jpg",
//     "/images/sliding/15.jpg",
//     "/images/sliding/14.jpg",
//     "/images/sliding/13.jpg",
//     "/images/sliding/12.jpg",
//     "/images/sliding/11.jpg",
//     "/images/sliding/10.jpg",
//     "/images/sliding/9.jpg",
//     "/images/sliding/8.jpg",
//     "/images/sliding/7.jpg",
//     "/images/sliding/6.jpg",
//     "/images/sliding/5.jpg",
//     "/images/sliding/4.jpg",
//     "/images/sliding/3.jpg",
//     "/images/sliding/2.jpg",
//     "/images/sliding/1.jpg",
//   ];

//   useEffect(() => {
//     fetchHeaders();
//   }, []);

//   useEffect(() => {
//     async function checkAdminStatus() {
//       const token = Cookies.get("access");

//       if (!token) {
//         setIsLoggedIn(false);
//         setIsAdmin(false);
//         return;
//       }

//       setIsLoggedIn(true);
//       const userCookie = Cookies.get("user");
//       if (userCookie) {
//         const userDetails: User = JSON.parse(userCookie);
//         setUser(userDetails);
//         setIsAdmin(userDetails.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL);
//       }
//     }

//     checkAdminStatus();
//   }, []);

//   const fetchHeaders = async () => {
//     try {
//       const response = await fetch(`${API_URL}/api/courses/`);
//       if (!response.ok) throw new Error("Failed to fetch headers");
//       const data = await response.json();
//       setHeaders(data);
//     } catch (error) {
//       setError("Failed to fetch course categories");
//     }
//   };

//   const handleAddHeader = () => {
//     setSelectedHeader({ id: 0, title: "", description: "" });
//     setIsNewHeader(true);
//     setShowAddEditDialog(true);
//   };

//   const handleEditHeader = (header: CourseHeader) => {
//     setSelectedHeader(header);
//     setIsNewHeader(false);
//     setShowAddEditDialog(true);
//   };

//   const handleSaveHeader = async () => {
//     if (!selectedHeader?.title || !selectedHeader?.description) {
//       window.alert("Title and description are required");
//       return;
//     }

//     const token = Cookies.get("access");
//     if (!token) {
//       setError("Authentication required");
//       return;
//     }

//     const method = isNewHeader ? "POST" : "PUT";
//     const url = isNewHeader
//       ? `${API_URL}/api/courses/`
//       : `${API_URL}/api/courses/${selectedHeader.id}/`;

//     try {
//       const response = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(selectedHeader),
//       });

//       if (!response.ok) throw new Error("Failed to save category");
//       setShowAddEditDialog(false);
//       setSelectedHeader(null);
//       fetchHeaders();
//     } catch (error) {
//       setError("Failed to save category");
//     }
//   };

//   const handleDeleteHeader = async () => {
//     if (!selectedHeader) return;

//     const token = Cookies.get("access");
//     if (!token) {
//       setError("Authentication required");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `${API_URL}/api/courses/${selectedHeader.id}/`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) throw new Error("Failed to delete category");
//       setShowDeleteDialog(false);
//       setSelectedHeader(null);
//       fetchHeaders();
//     } catch (error) {
//       setError("Failed to delete category");
//     }
//   };

//   const handleSignOut = () => {
//     Cookies.remove("access");
//     Cookies.remove("refresh");
//     Cookies.remove("user");
//     setIsLoggedIn(false);
//     setUser(null);
//     window.location.href = "/";
//   };

//   if (isLoggedIn && !isAdmin) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//         <h1 className="text-2xl font-bold text-red-600 mb-4">
//           Sorry! You do not have Admin Access !!
//         </h1>
//         <Button
//           className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-800"
//           onClick={() => {
//             handleSignOut();
//             router.push("/");
//           }}
//         >
//           Go Back to Home Page
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen w-full relative">

//       {/* Left sliding images - Position fixed */}
//       <div className="fixed left-0 top-0 bottom-0 w-1/6 overflow-hidden z-10">
//         <SlidingImages
//           side="left"
//           images={leftImages}
//           containerClass="h-full w-full"
//         />
//       </div>

//       {/* Right sliding images - Position fixed */}
//       <div className="fixed right-0 top-0 bottom-0 w-1/6 overflow-hidden z-10">
//         <SlidingImages
//           side="right"
//           images={rightImages}
//           containerClass="h-full w-full"
//         />
//       </div>

//       <div className="relative z-20">
//         {/* Header and Navbar at top */}
//         <Header />
//         <Navbar />

//         {/* Content area with margin to avoid overlap with sliders */}
//         <div className="mx-auto" style={{ width: "68%", marginLeft: "16.6%" }}>
//           <div className="py-8">
//             <div className="flex items-center mb-6">
//               <BookOpen className="mr-2 h-6 w-6 text-[#026bc0]" />
//               <h2 className="text-[#026bc0] text-2xl font-bold">
//                 Course Categories
//               </h2>

//               {isAdmin && (
//                 <div className="relative group ml-auto">
//                   <Button
//                     size="icon"
//                     className="bg-[#026bc0] p-2 rounded-full text-white text-xs shadow-lg hover:bg-[#0610ab] transition-colors duration-200"
//                     onClick={handleAddHeader}
//                   >
//                     <Plus className="h-5 w-5" />
//                   </Button>
//                   <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#0610ab] text-white text-sm rounded-md px-3 py-2 transition-all duration-200 shadow-lg whitespace-nowrap">
//                     Add a new category
//                   </div>
//                 </div>
//               )}
//             </div>

//             {error && <div className="text-red-500 mb-4">{error}</div>}

//             {/* Course cards grid - 2 per row */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {headers.map((header) => (
//                 <HeaderCard
//                   key={header.id}
//                   header={header}
//                   isAdmin={isAdmin}
//                   handleEditHeader={handleEditHeader}
//                   setSelectedHeader={setSelectedHeader}
//                   setShowDeleteDialog={setShowDeleteDialog}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Dialogs */}
//       <Dialog open={showAddEditDialog} onOpenChange={setShowAddEditDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>
//               {isNewHeader ? "Add Category" : "Edit Category"}
//             </DialogTitle>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div>
//               <Label htmlFor="title">Title</Label>
//               <Input
//                 id="title"
//                 value={selectedHeader?.title || ""}
//                 onChange={(e) =>
//                   setSelectedHeader((prev) => ({
//                     ...prev!,
//                     title: e.target.value,
//                   }))
//                 }
//               />
//             </div>
//             <div>
//               <Label htmlFor="description">Description</Label>
//               <Input
//                 id="description"
//                 value={selectedHeader?.description || ""}
//                 onChange={(e) =>
//                   setSelectedHeader((prev) => ({
//                     ...prev!,
//                     description: e.target.value,
//                   }))
//                 }
//               />
//             </div>
//           </div>
//           <div className="flex justify-end gap-2">
//             <Button
//               variant="outline"
//               onClick={() => setShowAddEditDialog(false)}
//             >
//               Cancel
//             </Button>
//             <Button onClick={handleSaveHeader}>Save</Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
//             <AlertDialogDescription>
//               Are you sure you want to delete this category? This action cannot
//               be undone.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={handleDeleteHeader}
//               className="bg-red-500 hover:bg-red-600 text-white"
//             >
//               Delete
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// }

// without SLIDERS

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/HeaderReplica";
import Navbar from "@/components/navbar";
import HeaderCard from "@/components/HeaderCard";
import { BookOpen, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

interface CourseHeader {
  id: number;
  title: string;
  description: string;
}

interface User {
  email: string;
  [key: string]: any;
}

export default function CoursePage() {
  const [headers, setHeaders] = useState<CourseHeader[]>([]);
  const [selectedHeader, setSelectedHeader] = useState<CourseHeader | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddEditDialog, setShowAddEditDialog] = useState(false);
  const [isNewHeader, setIsNewHeader] = useState(false);

  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    fetchHeaders();
  }, []);

  useEffect(() => {
    async function checkAdminStatus() {
      const token = Cookies.get("access");

      if (!token) {
        setIsLoggedIn(false);
        setIsAdmin(false);
        return;
      }

      setIsLoggedIn(true);
      const userCookie = Cookies.get("user");
      if (userCookie) {
        const userDetails: User = JSON.parse(userCookie);
        setUser(userDetails);
        // setIsAdmin(userDetails.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL);
        const adminEmails =
          process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || [];

        setIsAdmin(adminEmails.includes(userDetails.email));
      }
    }

    checkAdminStatus();
  }, []);

  const fetchHeaders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/courses/`);
      if (!response.ok) throw new Error("Failed to fetch headers");
      const data = await response.json();
      setHeaders(data);
    } catch (error) {
      setError("Failed to fetch course categories");
    }
  };

  const handleAddHeader = () => {
    setSelectedHeader({ id: 0, title: "", description: "" });
    setIsNewHeader(true);
    setShowAddEditDialog(true);
  };

  const handleEditHeader = (header: CourseHeader) => {
    setSelectedHeader(header);
    setIsNewHeader(false);
    setShowAddEditDialog(true);
  };

  const handleSaveHeader = async () => {
    if (!selectedHeader?.title || !selectedHeader?.description) {
      window.alert("Title and description are required");
      return;
    }

    const token = Cookies.get("access");
    if (!token) {
      setError("Authentication required");
      return;
    }

    const method = isNewHeader ? "POST" : "PUT";
    const url = isNewHeader
      ? `${API_URL}/api/courses/`
      : `${API_URL}/api/courses/${selectedHeader.id}/`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(selectedHeader),
      });

      if (!response.ok) throw new Error("Failed to save category");
      setShowAddEditDialog(false);
      setSelectedHeader(null);
      fetchHeaders();
    } catch (error) {
      setError("Failed to save category");
    }
  };

  const handleDeleteHeader = async () => {
    if (!selectedHeader) return;

    const token = Cookies.get("access");
    if (!token) {
      setError("Authentication required");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/courses/${selectedHeader.id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete category");
      setShowDeleteDialog(false);
      setSelectedHeader(null);
      fetchHeaders();
    } catch (error) {
      setError("Failed to delete category");
    }
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
        <h1 className="text-2xl font-bold text-red-600 mb-4 text-center px-4">
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
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="flex items-center p-3 sm:p-5 backdrop-blur-sm mb-4 sm:mb-0">
            <BookOpen className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-[#026bc0]" />
            <h2 className="text-[#026bc0] text-xl sm:text-2xl font-bold">
              Course Categories
            </h2>
          </div>

          {isAdmin && (
            <div className="relative group mx-6 sm:mx-12">
              <Button
                size="icon"
                className="bg-[#026bc0] p-2 rounded-full text-white text-xs shadow-lg hover:bg-[#0610ab] transition-colors duration-200"
                onClick={handleAddHeader}
              >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#0610ab] text-white text-xs sm:text-sm rounded-md px-2 py-1 sm:px-3 sm:py-2 transition-all duration-200 shadow-lg whitespace-nowrap">
                Add a new category
              </div>
            </div>
          )}
        </div>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center mt-6 sm:mt-10 sm:ml-14">
          {headers.map((header) => (
            <HeaderCard
              key={header.id}
              header={header}
              isAdmin={isAdmin}
              handleEditHeader={handleEditHeader}
              setSelectedHeader={setSelectedHeader}
              setShowDeleteDialog={setShowDeleteDialog}
            />
          ))}
        </div>

        <Dialog open={showAddEditDialog} onOpenChange={setShowAddEditDialog}>
          <DialogContent className="max-w-sm sm:max-w-md mx-auto">
            <DialogHeader>
              <DialogTitle>
                {isNewHeader ? "Add Category" : "Edit Category"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={selectedHeader?.title || ""}
                  onChange={(e) =>
                    setSelectedHeader((prev) => ({
                      ...prev!,
                      title: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={selectedHeader?.description || ""}
                  onChange={(e) =>
                    setSelectedHeader((prev) => ({
                      ...prev!,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowAddEditDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveHeader}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent className="max-w-sm sm:max-w-md mx-auto">
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this category? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
              <AlertDialogCancel className="mt-2 sm:mt-0">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteHeader}
                className="bg-red-500 hover:bg-red-600 text-white"
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
