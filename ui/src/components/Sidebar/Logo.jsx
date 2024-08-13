import React from "react";
import { PiVirus } from "react-icons/pi";

export const Logo = () => {
  return (
    <div className="flex items-center justify-center flex-col lg:flex-row lg:justify-start h-20 my-6 lg:mb-0 lg:mt-8">
      <PiVirus className="text-4xl m-0 lg:mr-2 text-greenish" />
      <h1 className="flex items-center text-2xl lg:text-3xl font-medium">
        <div>V</div>
        <div className="hidden lg:block">uln</div>
        <div>C</div>
        <div className="hidden lg:block">ontrol</div>
      </h1>
    </div>
  );
};
