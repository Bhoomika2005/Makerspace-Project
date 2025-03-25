import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Calendar,
  Users,
  Building2,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { FaEdit, FaTrash } from "react-icons/fa";

export const ModernSplitCard = ({
  courseId,
  title,
  description,
  offeredBy,
  offeredTo,
  duration,
  schedule,

  onEdit,
  onDelete,
  isAdmin,
}) => {

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50 overflow-hidden relative w-[70%] mx-auto">
      {/* Quarter Circle in the top-right corner */}
      {/* <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-br-full opacity-10" /> */}
      <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#027cc4] to-[#0610ab]opacity-10 rounded-full" />
      </div>

      <div className="absolute top-4 right-4 flex space-x-2">
        {isAdmin && (
          <>
            <div className="relative group">
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="bg-transparent border-none hover:bg-transparent focus:outline-none"
              >
                <FaEdit className="text-[#027cc4]" />
              </Button>
              <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#0610ab] text-white text-xs rounded px-2 py-1 transition">
                Edit
              </div>
            </div>
            <div className="relative group">
              <Button
                variant="outline"
                size="sm"
                onClick={onDelete}
                className="bg-transparent border-none hover:bg-transparent focus:outline-none"
              >
                <FaTrash className="text-red-600" />
              </Button>
              <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#0610ab] text-white text-xs rounded px-2 py-1 transition">
                Delete
              </div>
            </div>
          </>
        )}
      </div>

      <div className="grid md:grid-cols-3 h-full">
        {/* Left Column - Primary Info */}
        <div className="md:col-span-1 bg-gradient-to-br from-[#027cc4] to-[#0610ab] p-6 text-white">
          <span className="inline-block px-2 py-1 bg-blue-500 rounded text-sm mb-4">
            {courseId}
          </span>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-blue-100 text-sm">
            {description || "No description available"}
          </p>
        </div>

        {/* Right Column - Details */}
        <div className="md:col-span-2 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Building2 className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-500">Department</p>
                <p className="text-gray-900">{offeredBy || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-500">Students</p>
                <p className="text-gray-900">{offeredTo || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-500">Duration</p>
                <p className="text-gray-900">{duration || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-500">Schedule</p>
                <p className="text-gray-900">{schedule || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Stacked Accent Card
export const StackedAccentCard = ({
  courseId,
  title,
  description,
  offeredBy,
  offeredTo,
  duration,
  schedule,
}) => {
  return (
    <Card className="relative overflow-hidden border-t-4 border-blue-600">
      <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16">
        <div className="absolute inset-0 bg-blue-600 opacity-10 rounded-full" />
      </div>

      <CardHeader className="relative">
        <div className="flex items-center gap-4 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {courseId}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
            {duration || "N/A"}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-2">
          {description || "No description available"}
        </p>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {offeredBy || "N/A"}
                </p>
                <p className="text-xs text-gray-500">Department</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {offeredTo || "N/A"}
                </p>
                <p className="text-xs text-gray-500">Students</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{schedule || "N/A"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Interactive Expandable Card
export const ExpandableCard = ({
  courseId,
  title,
  description,
  offeredBy,
  offeredTo,
  duration,
  schedule,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card className="transform transition-all duration-300 hover:shadow-lg">
      <CardHeader
        className="cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-sm font-medium">
                {courseId}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </CardHeader>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-96" : "max-h-0"
        }`}
      >
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            {description || "No description available"}
          </p>

          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Department
                  </p>
                  <p className="text-gray-900">{offeredBy || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Students</p>
                  <p className="text-gray-900">{offeredTo || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Duration</p>
                  <p className="text-gray-900">{duration || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Schedule</p>
                  <p className="text-gray-900">{schedule || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
