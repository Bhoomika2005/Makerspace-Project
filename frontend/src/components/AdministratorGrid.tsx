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

const AdministratorGrid: React.FC<AdministratorGridProps> = ({
  admins,
  isAdmin,
  onEdit,
  onDelete,
}) => {
  if (!admins || admins.length === 0) {
    return (
      <p className="text-center text-gray-500">No Administrators found.</p>
    );
  }

  // Extract only the first word of the role
  const getRoleKey = (role: string) => role.split(" ")[0];

  // Categorize based on role
  const dean = admins.find((admin) => getRoleKey(admin.role) === "Dean");
  const conveners = admins.filter(
    (admin) => getRoleKey(admin.role) === "Convener"
  );
  // const coConveners = admins.filter(
  //   (admin) => getRoleKey(admin.role) === "Co-convener"
  // );
  const convenersMakerspace = admins.filter(
    (admin) => admin.role === "Convener MakerSpace"
  );
  const convenersCentralWorkshop = admins.filter(
    (admin) => admin.role === "Convener Central Workshop"
  );
  const coConvenersMakerspace = admins.filter(
    (admin) => admin.role === "Co-Convener MakerSpace"
  );
  const coConvenersCELITE = admins.filter(
    (admin) => admin.role === "Co-Convener CELITE"
  );
  const workshopSuperintendents = admins.filter((admin) =>
    ["Workshop", "Assistant"].includes(getRoleKey(admin.role))
  );

  // Function to render rows with equal spacing
  const renderRow = (title: string, items: Faculty[]) => {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-center text-[#026bc0]">
          {title}
        </h3>
        <div
          className={`grid ${
            items.length === 1 
              ? 'flex justify-center' 
              : `grid-cols-1 md:grid-cols-2 xl:grid-cols-${Math.min(items.length, 3)}`
          } gap-4 md:gap-8 justify-items-center mx-auto`}
        >
          {items.map((admin) => (
            <div key={admin.id} className="p-2 md:p-4 flex justify-center">
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
      <h3 className="text-2xl font-bold text-center text-[#026bc0]">{title}</h3>
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
    <div className="space-y-8 md:space-y-12 p-4 md:p-8">
      {dean && renderCenteredRow("Dean of Education & Outreach", dean)}
      {convenersMakerspace.length > 0 && 
      renderRow("Convenors Makerspace", convenersMakerspace)}
    {convenersCentralWorkshop.length > 0 && 
      renderRow("Convenors Central Workshop", convenersCentralWorkshop)}
      {coConvenersMakerspace.length > 0 && 
      renderRow("Co-Conveners MakerSpace", coConvenersMakerspace)}
    {coConvenersCELITE.length > 0 && 
      renderRow("Co-Conveners CELITE", coConvenersCELITE)}
      {workshopSuperintendents.length > 0 &&
        renderRow("Workshop Superintendents", workshopSuperintendents)}
    </div>
  );
};

export default AdministratorGrid;
