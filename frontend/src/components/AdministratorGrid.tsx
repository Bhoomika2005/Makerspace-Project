import React from "react";
import Facultynewcard from "./Facultynewcard";

interface Faculty {
  id: number;
  name: string;
  role: string;
  image: string | null;
  location: string;
  email: string;
  category: string;
}

interface AdministratorGridProps {
  admins: Faculty[];
  isAdmin: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const AdministratorGrid: React.FC<AdministratorGridProps> = ({ admins, isAdmin, onEdit, onDelete }) => {
  if (!admins || admins.length === 0) {
    return <p className="text-center text-gray-500">No Administrators found.</p>;
  }

  // Extract only the first word of the role
  const getRoleKey = (role: string) => role.split(" ")[0];

  // Categorize based on role
  const dean = admins.find((admin) => getRoleKey(admin.role) === "Dean");
  const conveners = admins.filter((admin) => getRoleKey(admin.role) === "Convener").slice(0, 4);
  const coConveners = admins.filter((admin) => getRoleKey(admin.role) === "Co-convener").slice(0, 4);
  const workshopSuperintendents = admins.filter((admin) =>
    ["Workshop", "Assistant"].includes(getRoleKey(admin.role))
  ).slice(0, 4);

  // Function to render a row with responsive layout and increased spacing
  const renderRow = (title: string, items: Faculty[]) => {
    // Calculate grid columns based on number of items (up to 4)
    const columnClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
    };
    
    const colsClass = columnClasses[Math.min(items.length, 4) as 1 | 2 | 3 | 4];
    
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-center text-[#026bc0]">{title}</h3>
        {/* Increased gap from gap-8 to gap-12 for more horizontal spacing */}
        <div className={`grid ${colsClass} gap-12 mx-auto`}>
          {items.map((admin) => (
            // Added more padding and margin for better spacing
            <div key={admin.id} className="p-4 flex justify-center">
              <Facultynewcard
                {...admin}
                onEdit={() => onEdit(admin.id)}
                onDelete={() => onDelete(admin.id)}
                isAdmin={isAdmin}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Function to center a single item (like Dean)
  const renderCenteredRow = (title: string, item: Faculty) => (
    <div className="space-y-8">
      <h3 className="text-lg font-bold text-center text-[#026bc0]">{title}</h3>
      <div className="flex justify-center">
        <Facultynewcard
          {...item}
          onEdit={() => onEdit(item.id)}
          onDelete={() => onDelete(item.id)}
          isAdmin={isAdmin}
        />
      </div>
    </div>
  );

  return (
 
    <div className="space-y-12 p-8">
      {/* Row 1: Dean (1 card, centered) */}
      {dean && renderCenteredRow("Dean of Education & Outreach", dean)}

      {/* Row 2: Conveners (max 4) */}
      {conveners.length > 0 && renderRow("Conveners", conveners)}

      {/* Row 3: Co-Conveners (max 4) */}
      {coConveners.length > 0 && renderRow("Co-Conveners", coConveners)}

      {/* Row 4: Workshop Superintendents (max 4) */}
      {workshopSuperintendents.length > 0 && 
        renderRow("Workshop Superintendents", workshopSuperintendents)}
    </div>
  );
};

export default AdministratorGrid;