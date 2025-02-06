import React from 'react';

const Categories = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="relative flex justify-center items-center mt-8">
      <div className="flex">
        {categories.map((category, index) => (
          <div key={category} className="relative">
            <div 
              onClick={() => onCategoryChange(category)}
              className={`
                h-10 transform skew-x-[-20deg] flex items-center justify-center cursor-pointer px-6
                ${selectedCategory === category ? 'bg-[#026bc0]' : 'bg-gray-200'}
                ${index === 0 ? 'rounded-l-xl' : ''}
                ${index === categories.length - 1 ? 'rounded-r-xl' : ''}
                overflow-hidden
              `}
            >
              <span className={`
                transform skew-x-[20deg] text-sm font-medium
                ${selectedCategory === category ? 'text-white' : 'text-gray-600 hover:text-gray-900'}
              `}>
               {category === 'Lab Technician' ? 'Lab Technicians' : category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
