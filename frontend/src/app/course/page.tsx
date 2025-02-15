"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/HeaderReplica";
import Navbar from "@/components/Navbar";
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
    const [selectedHeader, setSelectedHeader] = useState<CourseHeader | null>(null);
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
                setIsAdmin(userDetails.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL);
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
                    <div className="flex items-center p-5 backdrop-blur-sm">
                        <BookOpen className="mr-2 h-6 w-6 text-[#026bc0]" />
                        <h2 className="text-[#026bc0] text-2xl font-bold">Course Categories</h2>
                    </div>

                    {isAdmin && (
                        <div className="relative group mx-12">
                            <Button
                                size="icon"
                                className="bg-[#026bc0] p-2 rounded-full text-white text-xs shadow-lg hover:bg-[#0610ab] transition-colors duration-200"
                                onClick={handleAddHeader}
                            >
                                <Plus className="h-5 w-5" />
                            </Button>
                            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#0610ab] text-white text-sm rounded-md px-3 py-2 transition-all duration-200 shadow-lg whitespace-nowrap">
                                Add a new category
                            </div>
                        </div>
                    )}
                </div>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center mt-10">
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
                    <DialogContent>
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
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete this category? This action cannot
                                be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteHeader} className="bg-red-500 hover:bg-red-600 text-white">
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}