import React from "react";

export const Section = ({ title }) => {
  return (
    <div className="hidden lg:flex h-16 items-center text-sm text-gray-400 font-openSans">
      {title.toUpperCase()}
    </div>
  );
};
