import React, { useState } from 'react';

const Rating = ({ value, onChange }) => {
  // Handle hover and rating selection
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (index) => setHovered(index + 1); 
  const handleMouseLeave = () => setHovered(null); 

  const handleClick = (index) => {
    onChange(index + 1); 
  };

  return (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          fill={index < (hovered ?? value) ? "yellow" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`w-8 h-8 cursor-pointer transition-colors duration-300 ${index < (hovered ?? value) ? "text-yellow-500" : "text-gray-300"}`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 17.27l6.18 3.73-1.64-7.03 5.45-4.73-7.19-.61L12 2 9.2 8.63l-7.18.61 5.45 4.73-1.64 7.03L12 17.27z"
          />
        </svg>
      ))}
    </div>
  );
};

export default Rating;

