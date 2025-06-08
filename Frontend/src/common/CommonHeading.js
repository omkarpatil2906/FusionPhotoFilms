import React from "react";

export default function CommonHeading(header) {
  return (
    <div className="relative mb-6 lg:mb-10 px-4 max-w-5xl mx-auto">

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="w-full border-t border-[#1c7e80] mb-1 opacity-60"></div>
        <div className="w-full border-t border-[#1c7e80] mt-1 opacity-60"></div>
      </div>

      <div className="relative flex justify-center">
        <span className="bg-white px-10 py-1 shadow-lg  shadow-slate-200">
          <h1 className="text-sm md:text-3xl lg:text-4xl  text-[#1c7e80] font-raleway tracking-widest uppercase">
            {header}
          </h1>
        </span>
      </div>
    </div>
  );
}


