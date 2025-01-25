"use client"

import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Eye, Download, Trash, FileText } from "lucide-react"
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import Header from "@/components/HeaderReplica"
import Navbar from "@/components/Navbar"

export default function FormsPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [forms, setForms] = useState([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [selectedFormId, setSelectedFormId] = useState(null)
  const [error, setError] = useState(null)
  const [formTitle, setFormTitle] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)

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
          setUser(userDetails)
          setIsAdmin(userDetails.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL)
        }
      } catch (error) {
        console.error("Error checking the user status:", error)
        setIsLoggedIn(false)
        setIsAdmin(false)
      }
    }
    checkAdminStatus()
  }, [])

  useEffect(() => {
    fetchForms()
  }, []) //Removed isLoggedIn from dependency array

  const fetchForms = async () => {
    try {
      const token = Cookies.get("access")
      const response = await fetch("http://localhost:8000/api/forms/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch forms")
      }

      const data = await response.json()
      setForms(data)
      setError(null)
    } catch (error) {
      console.error("Error fetching forms:", error)
      setError("Failed to fetch forms")
    }
  }

  const handleFileUpload = async () => {
    if (!selectedFile || !formTitle.trim()) {
      setError("Please provide both title and file")
      return
    }

    if (!isAdmin) {
      setError("You must be an admin to upload forms")
      return
    }

    const formData = new FormData()
    formData.append("file", selectedFile)
    formData.append("title", formTitle.trim())

    const token = Cookies.get("access")
    try {
      const response = await fetch("http://localhost:8000/api/forms/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (response.status === 401) {
        setError("Your session has expired. Please log in again.")
        setIsLoggedIn(false)
        return
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(JSON.stringify(errorData))
      }

      await fetchForms()
      setShowUploadDialog(false)
      setFormTitle("")
      setSelectedFile(null)
      setError(null)
    } catch (err) {
      console.error("Error uploading:", err)
      setError("Failed to upload form: " + err.message)
    }
  }

  const handleDelete = async () => {
    if (!selectedFormId) return

    const token = Cookies.get("access")
    try {
      const response = await fetch(`http://localhost:8000/api/forms/${selectedFormId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete form")
      }

      await fetchForms()
      setShowDeleteDialog(false)
      setError(null)
    } catch (err) {
      setError("Failed to delete form")
    }
  }

  const handleDownload = async (formId) => {
    const token = Cookies.get("access")
    try {
      const response = await fetch(`http://localhost:8000/api/forms/${formId}/download/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to download form")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `form-${formId}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading form:", error)
      setError("Failed to download form")
    }
  }

  const handleView = async (formId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/forms/${formId}/view/`)

      if (!response.ok) {
        throw new Error("Failed to view form")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      window.open(url, "_blank")
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error viewing form:", error)
      setError("Failed to view form")
    }
  }

  return (
    <div className="min-h-screen bg-[#f8faff] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-[#026bc0]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 -left-12 w-72 h-72 bg-[#0610ab]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-[#026bc0]/5 rounded-full blur-3xl"></div>
      </div>

      <Header />
      <Navbar />

      <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        {error && (
          <div className="mb-4">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center p-5 backdrop-blur-sm">
            <FileText className="mr-2 h-6 w-6 text-[#026bc0]" />
            <h2 className="text-[#026bc0] text-2xl font-bold">Forms Available </h2>
          </div>
          {isAdmin && (
            <div className="relative group">
              <button
                className="bg-[#026bc0] p-2 rounded-full text-white text-xs shadow-lg hover:bg-[#0610ab] transition-colors duration-200"
                onClick={() => setShowUploadDialog(true)}
              >
                <Plus className="h-5 w-5" />
              </button>
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#0610ab] text-white text-sm rounded-md px-3 py-2 transition-all duration-200 shadow-lg whitespace-nowrap">
                Add Form
              </div>
            </div>
          )}
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8">
          <table className="w-full border-collapse text-sm font-sans">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="w-[70%] px-6 py-4 text-left font-bold text-lg text-[#026bc0]">Form Title</th>
                <th className="w-[30%] px-6 py-4 text-center font-bold text-lg text-[#026bc0]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form, index) => (
                <tr
                  key={form.id}
                  className={`${
                    index % 2 === 0 ? "bg-[#f2f4ff]" : "bg-[#e7eeff]"
                  } border-t hover:bg-white`}
                >
                  <td className="px-6 py-4 text-base text-[#0610ab]">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-[#026bc0] opacity-70" />
                      {form.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-6">
                      <button
                        className="flex items-center text-sm font-medium text-[#026bc0] hover:text-[#0610ab] transition-colors duration-200"
                        onClick={() => handleView(form.id)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </button>
                      {isLoggedIn && (
                        <button
                          className="flex items-center text-sm font-medium text-[#026bc0] hover:text-[#0610ab] transition-colors duration-200"
                          onClick={() => handleDownload(form.id)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </button>
                      )}
                      {isAdmin && (
                        <button
                          className="flex items-center text-sm font-medium text-red-500 hover:text-red-600 transition-colors duration-200"
                          onClick={() => {
                            setSelectedFormId(form.id)
                            setShowDeleteDialog(true)
                          }}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {forms.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">No forms available</p>
            </div>
          )}
        </div>

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent className="bg-white/95 backdrop-blur-sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the form.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogContent className="bg-white/95 backdrop-blur-sm">
            <DialogHeader>
              <DialogTitle className="text-center text-xl text-[#026bc0]">Upload New Form</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right font-medium">
                  Title
                </Label>
                <Input
                  id="title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="col-span-3"
                  placeholder="Enter form title"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right font-medium">
                  File
                </Label>
                <div className="col-span-3">
                  <Input
                    id="file"
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    accept=".pdf,.doc,.docx"
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowUploadDialog(false)} className="hover:bg-gray-100">
                Cancel
              </Button>
              <Button
                onClick={handleFileUpload}
                className="bg-[#026bc0] text-white hover:bg-[#0610ab] transition-colors duration-200"
              >
                Upload
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

