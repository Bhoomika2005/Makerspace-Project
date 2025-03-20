import React from "react";

const Categories = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="relative flex justify-center items-center mt-4 md:mt-8 overflow-x-auto px-4">
      <div className="flex flex-wrap md:flex-nowrap justify-center">
        {categories.map((category, index) => (
          <div key={category} className="relative  my-1 mx-0.5">
            <div
              onClick={() => onCategoryChange(category)}
              className={`
                h-10 transform skew-x-[-20deg] flex items-center justify-center cursor-pointer px-3 md:px-6
                ${
                  selectedCategory === category ? "bg-[#026bc0]" : "bg-gray-200"
                }
                ${index === 0 ? "rounded-l-xl" : ""}
                ${index === categories.length - 1 ? "rounded-r-xl" : ""}
                overflow-hidden
              `}
            >
              <span
                className={`
                transform skew-x-[20deg] text-xs md:text-sm font-medium whitespace-nowrap
                ${
                  selectedCategory === category
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900"
                }
              `}
              >
                {category === "Lab Technician"
                  ? "Lab Engineers"
                  : category === "Teaching Assistant"
                  ? "Teaching Assistants"
                  : category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
