"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  Wrench,
  ChevronLeft,
  ChevronRight,
  X,
  FileEditIcon,
  Trash,
} from "lucide-react";
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
import Header from "@/components/HeaderReplica";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

interface EquipmentProduct {
  id: number;
  product: string;
}

interface Equipment {
  id: number;
  name: string;
  image: string | null;
  quantity: number;
  manufacturer: string;
  model_name: string;
  notes: string;
  products: EquipmentProduct[];
}

interface User {
  email: string;
  [key: string]: any;
}

interface ImageCarouselProps {
  products: EquipmentProduct[];
  onClose?: () => void;
  equipment: Equipment;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  products,
  onClose,
  equipment,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!products || products.length === 0) return;

    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [products]);

  const nextImage = () => {
    if (isAnimating || !products || products.length === 0) return;
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
      setIsAnimating(false);
    }, 1000);
  };

  const previousImage = () => {
    if (isAnimating || !products || products.length === 0) return;
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + products.length) % products.length
      );
      setIsAnimating(false);
    }, 1000);
  };

  const getPositionClass = (index: number) => {
    if (!products || products.length === 0) return "";
    if (index === currentIndex)
      return "translate-x-0 scale-100 opacity-100 z-10";
    if (index === (currentIndex - 1 + products.length) % products.length)
      return "-translate-x-64 scale-90 opacity-80 z-0";
    if (index === (currentIndex + 1) % products.length)
      return "translate-x-64 scale-90 opacity-80 z-0";
    return "opacity-0 scale-75 absolute";
  };

  if (!products || products.length === 0) {
    return (
      <Card className="w-full max-w-4xl bg-black/90 border-none">
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-8 p-8">
          <p className="text-white text-xl">
            No product images available for {equipment.name}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl bg-black/90 border-none">
      <div className="relative w-full h-full flex flex-col items-center justify-center gap-8 p-8">
        <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
          <div className="relative flex items-center justify-center w-full transition-transform duration-1000 ease-in-out">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`absolute transition-all duration-1000 ease-in-out ${getPositionClass(
                  index
                )}`}
              >
                <div className="relative w-96 h-64 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={`http://localhost:8000${product.product}`}
                    alt={`Product image ${index + 1} for ${equipment.name}`}
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
          {products.map((_, index) => (
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

function MachineryPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  );
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [equipmentData, setEquipmentData] = useState({
    name: "",
    image: null as File | null,
    quantity: 0,
    manufacturer: "",
    model_name: "",
    notes: "",
    products: [] as File[],
  });

  useEffect(() => {
    async function checkAdminStatus() {
      try {
        const token = Cookies.get("access");
        if (!token) {
          setIsLoggedIn(false);
          setIsAdmin(false);
          return;
        }
        setIsLoggedIn(true);
        const userCookie = Cookies.get("user");
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
      const response = await fetch("http://localhost:8000/api/machinery/");
      if (!response.ok) {
        throw new Error("Failed to fetch equipment");
      }
      const data = await response.json();
      setEquipment(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching equipment:", error);
      setError("Failed to fetch equipment");
    }
  };

  const handleAddEquipment = async () => {
    const token = Cookies.get("access");
    if (!token || !isAdmin) {
      setError("You must be an admin to perform this action");
      return;
    }

    const formData = new FormData();
    formData.append("name", equipmentData.name);
    formData.append("quantity", equipmentData.quantity.toString());
    formData.append("manufacturer", equipmentData.manufacturer);
    formData.append("model_name", equipmentData.model_name);
    formData.append("notes", equipmentData.notes);
    if (equipmentData.image) {
      formData.append("image", equipmentData.image);
    }
    equipmentData.products.forEach((product) => {
      formData.append("products", product);
    });

    try {
      const response = await fetch("http://localhost:8000/api/machinery/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to add equipment");
      }

      await fetchEquipment();
      setShowAddDialog(false);
      setEquipmentData({
        name: "",
        quantity: 0,
        manufacturer: "",
        model_name: "",
        notes: "",
        image: null,
        products: [],
      });
      setError(null);
    } catch (error) {
      console.error("Error adding equipment:", error);
      setError(
        error instanceof Error ? error.message : "Failed to add equipment"
      );
    }
  };

  const handleEditEquipment = async () => {
    if (!selectedEquipmentId) return;

    const token = Cookies.get("access");
    if (!token || !isAdmin) {
      setError("You must be an admin to perform this action");
      return;
    }

    const formData = new FormData();
    formData.append("name", equipmentData.name);
    formData.append("quantity", equipmentData.quantity.toString());
    formData.append("manufacturer", equipmentData.manufacturer);
    formData.append("model_name", equipmentData.model_name);
    formData.append("notes", equipmentData.notes);
    if (equipmentData.image) {
      formData.append("image", equipmentData.image);
    }
    equipmentData.products.forEach((product) => {
      formData.append("products", product);
    });

    try {
      const response = await fetch(
        `http://localhost:8000/api/machinery/${selectedEquipmentId}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to update equipment");
      }

      await fetchEquipment();
      setShowEditDialog(false);
      setEquipmentData({
        name: "",
        quantity: 0,
        manufacturer: "",
        model_name: "",
        notes: "",
        image: null,
        products: [],
      });
      setError(null);
    } catch (error) {
      console.error("Error updating equipment:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update equipment"
      );
    }
  };

  const handleDelete = async () => {
    if (!selectedEquipmentId) return;

    const token = Cookies.get("access");
    try {
      const response = await fetch(
        `http://localhost:8000/api/machinery/${selectedEquipmentId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to delete equipment");
      }

      await fetchEquipment();
      setShowDeleteDialog(false);
      setError(null);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to delete equipment"
      );
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
      products: [],
    });
    setShowEditDialog(true);
  };

  const removeImage = (index: number) => {
    setEquipmentData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  const handleSignOut = () => {
    Cookies.remove("access");
    Cookies.remove("refresh");
    Cookies.remove("user");
    setIsLoggedIn(false);
    router.push("/");
  };

  if (!isLoggedIn || !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Sorry! You do not have Admin Access!
        </h1>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-800"
          onClick={handleSignOut}
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
        <div className="flex justify-center items-center mb-8">
          {!isAdmin && (
            <div className="flex justify-center items-center">
              <Wrench className="mr-2 h-6 w-6 text-[#026bc0]" />
              <h2 className="text-3xl font-bold text-[#026bc0]">Equipment</h2>
            </div>
          )}
          {isAdmin && (
            <div className="flex justify-center mx-auto items-center">
              <Wrench className="mr-2 h-6 w-6 text-[#026bc0]" />
              <h2 className="text-3xl font-bold text-[#026bc0]">Equipment</h2>
            </div>
          )}

          {isAdmin && (
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <div className="relative group mx-auto">
                <DialogTrigger asChild>
                  <Button
                    size="icon"
                    className="bg-[#026bc0] p-2 rounded-full text-white text-xs shadow-lg hover:bg-[#0610ab] transition-colors duration-200"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <div className="absolute top-1/2 left-full ml-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-[#0610ab] text-white text-sm rounded-md px-3 py-2 transition-all duration-200 shadow-lg whitespace-nowrap">
                  Add Equipment
                </div>
              </div>

              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-center text-xl text-[#026bc0]">
                    Add New Equipment
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={equipmentData.name}
                      onChange={(e) =>
                        setEquipmentData({
                          ...equipmentData,
                          name: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">
                      Quantity
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={equipmentData.quantity}
                      onChange={(e) =>
                        setEquipmentData({
                          ...equipmentData,
                          quantity: Number.parseInt(e.target.value),
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="manufacturer" className="text-right">
                      Manufacturer
                    </Label>
                    <Input
                      id="manufacturer"
                      value={equipmentData.manufacturer}
                      onChange={(e) =>
                        setEquipmentData({
                          ...equipmentData,
                          manufacturer: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="model_number" className="text-right">
                      Model Name
                    </Label>
                    <Input
                      id="model_number"
                      value={equipmentData.model_name}
                      onChange={(e) =>
                        setEquipmentData({
                          ...equipmentData,
                          model_name: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">
                      Notes
                    </Label>
                    <Textarea
                      id="notes"
                      value={equipmentData.notes}
                      onChange={(e) =>
                        setEquipmentData({
                          ...equipmentData,
                          notes: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Image
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      onChange={(e) =>
                        setEquipmentData({
                          ...equipmentData,
                          image: e.target.files?.[0] || null,
                        })
                      }
                      accept="image/*"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="products" className="text-right pt-2">
                      Products
                    </Label>
                    <div className="col-span-3 space-y-4">
                      <Input
                        id="products"
                        type="file"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          setEquipmentData((prev) => ({
                            ...prev,
                            products: [...prev.products, ...files],
                          }));
                        }}
                        accept="product/*"
                        multiple
                        className="w-full"
                      />
                      {equipmentData.products.length > 0 && (
                        <div className="bg-gray-50 p-3 rounded-md">
                          <p className="text-sm text-gray-500 mb-2">
                            Selected images:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {equipmentData.products.map((file, index) => (
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
                  <Button variant={"outline"} onClick={handleAddEquipment}>
                    Add Equipment
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {error && (
          <Alert className="mb-6" variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 max-w-4xl mx-auto">
          {equipment.map((item) => (
            <Card
              key={item.id}
              className="relative w-full bg-white rounded-lg overflow-hidden shadow-md group cursor-pointer"
            >
              {/* Static Image Content (Visible by default) */}
              <div className="relative">
                <div className="bg-gradient-to-tr from-[#027cc4] to-[#0610ab] text-white p-3 text-center text-lg font-medium">
                  {item.name}
                </div>
                <div className="relative aspect-[4/3] bg-white">
                  <Image
                    src={item.image ? `http://localhost:8000${item.image}` : "/placeholder.svg?height=300&width=400"}
                    alt={item.name}
                    fill
                    className="object-contain p-3"
                  />
                </div>
              </div>

              {/* Details Content (Hidden until hover) */}
              <div
                className={`absolute top-0 left-0 w-full h-full origin-left
          transition-transform duration-500 ease-in-out
          [transform:rotateY(180deg)]
          group-hover:[transform:rotateY(0deg)]
          [transform-style:preserve-3d] bg-white`}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#219afc] to-[#0262b1] shadow-lg p-4 [backface-visibility:hidden] flex flex-col justify-between border border-gray-300 rounded-lg">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-2">
                        <span className="font-bold text-white">Quantity</span>
                        <span className="text-white">{item.quantity}</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="font-bold text-white">
                          Manufacturer
                        </span>
                        <span className="text-white">{item.manufacturer}</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="font-bold text-white">Model</span>
                        <span className="text-white">{item.model_name}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-white leading-relaxed mt-2">
                        {item.notes}
                      </p>
                    </div>
                  </div>
                  {/* Admin Controls */}
                  {isAdmin && (
                    <div className="flex justify-center gap-4 mt-4">
                      <Button
                        size="icon"
                        className="bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEquipmentId(item.id);
                          initializeEditForm(item);
                        }}
                      >
                        <FileEditIcon className="h-5 w-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEquipmentId(item.id);
                          setShowDeleteDialog(true);
                        }}
                      >
                        <Trash className="w-5 h-5" />
                      </Button>
                    </div>
                  )}
                  <div className="flex justify-center gap-4 mt-4">
                    <Button
                      size="lg"
                      className=" bg-white font-bold text-[#027cc4] hover:bg-slate-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEquipment(item);
                        setShowCarousel(true);
                      }}
                    >
                      Products
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Dialog open={showCarousel} onOpenChange={setShowCarousel}>
          <DialogContent className="max-w-none w-screen h-screen p-0 bg-black/90 backdrop-blur-md">
            <DialogTitle className="sr-only">Product Gallery</DialogTitle>
            <div className="relative w-full h-full flex items-center justify-center">
              {selectedEquipment && (
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
                    products={selectedEquipment.products}
                    equipment={selectedEquipment}
                    onClose={() => setShowCarousel(false)}
                  />
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center text-xl text-[#026bc0]">
                Edit Equipment
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={equipmentData.name}
                  onChange={(e) =>
                    setEquipmentData({ ...equipmentData, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  value={equipmentData.quantity}
                  onChange={(e) =>
                    setEquipmentData({
                      ...equipmentData,
                      quantity: Number.parseInt(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-manufacturer" className="text-right">
                  Manufacturer
                </Label>
                <Input
                  id="edit-manufacturer"
                  value={equipmentData.manufacturer}
                  onChange={(e) =>
                    setEquipmentData({
                      ...equipmentData,
                      manufacturer: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-model_name" className="text-right">
                  Model Name
                </Label>
                <Input
                  id="edit-model_name"
                  value={equipmentData.model_name}
                  onChange={(e) =>
                    setEquipmentData({
                      ...equipmentData,
                      model_name: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-notes" className="text-right">
                  Notes
                </Label>
                <Textarea
                  id="edit-notes"
                  value={equipmentData.notes}
                  onChange={(e) =>
                    setEquipmentData({
                      ...equipmentData,
                      notes: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-image" className="text-right">
                  Image
                </Label>
                <Input
                  id="edit-image"
                  type="file"
                  onChange={(e) =>
                    setEquipmentData({
                      ...equipmentData,
                      image: e.target.files?.[0] || null,
                    })
                  }
                  accept="image/*"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-images" className="text-right pt-2">
                  Products
                </Label>
                <div className="col-span-3 space-y-4">
                  <Input
                    id="edit-images"
                    type="file"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setEquipmentData((prev) => ({
                        ...prev,
                        products: [...prev.products, ...files],
                      }));
                    }}
                    accept="product/*"
                    multiple
                    className="w-full"
                  />
                  {equipmentData.products.length > 0 && (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm text-gray-500 mb-2">
                        New images to add:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {equipmentData.products.map((file, index) => (
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
              <Button variant="outline" onClick={handleEditEquipment}>
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                equipment.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default MachineryPage;