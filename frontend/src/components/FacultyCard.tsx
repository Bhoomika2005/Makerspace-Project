// components/FacultyCard.tsx
import React from "react";

interface FacultyCardProps {
  name: string;
  role: string;
  email: string;
  location?: string; // Optional property
  image: string;
}

const FacultyCard: React.FC<FacultyCardProps> = ({
  name,
  role,
  email,
  location,
  image,
}) => {
  return (
    <div className="flex items-center p-4 bg-blue-50 rounded-lg shadow-md">
      <img
        src={image}
        alt={`${name}'s photo`}
        className="w-24 h-24 rounded-full object-cover"
      />
      <div className="ml-4">
        <h2 className="text-lg font-semibold text-blue-800">{name}</h2>
        <p className="text-sm text-gray-600">{role}</p>
        <p className="text-sm text-blue-600">{email}</p>
        {location && <p className="text-sm text-gray-500">{location}</p>}
      </div>
    </div>
  );
};

export default FacultyCard;
