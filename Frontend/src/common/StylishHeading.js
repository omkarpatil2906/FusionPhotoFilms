import React from 'react';

const StylishHeading = ({ title }) => {
  return (
    <div className="w-full text-center  px-4">
      <div className="flex flex-col items-center max-w-4xl mx-auto">
        {/* Top decorative line */}
        <div className="w-24 h-px bg-gray-400 mb-3" />
        
        {/* Heading */}
        
        
        {/* Bottom decorative line */}
        <div className="w-24 h-px bg-gray-400" />
      </div>
    </div>
  );
};

export default StylishHeading;