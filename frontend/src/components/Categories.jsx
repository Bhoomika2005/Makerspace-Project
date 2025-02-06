import React from 'react';

const Categories = ({ categories, selectedCategory, onCategoryChange }) => {
    return (
      <div className="relative flex justify-center items-center my-8">
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {categories.map((category, index) => (
            <div key={category} className="relative">
              <button
                onClick={() => onCategoryChange(category)}
                className={`
                  relative z-10 px-6 py-2 text-sm font-medium transition-colors
                  ${selectedCategory === category 
                    ? 'text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                {category}
              </button>
              {selectedCategory === category && (
                <div className="absolute inset-0 bg-[#026bc0] transform skew-x-12 rounded-md" />
              )}
             
            </div>
          ))}
        </div>
      </div>
    );
  };
  

export default Categories;