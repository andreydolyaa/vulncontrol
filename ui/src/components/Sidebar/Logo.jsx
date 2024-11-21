import React from "react";
import { PiVirus } from "react-icons/pi";

export const Logo = () => {
  return (
    <div className="flex items-center justify-center flex-col lg:flex-row lg:justify-start h-20 my-6 lg:mb-0 lg:mt-8">
      <PiVirus className="logo-svg text-3xl m-0 lg:mr-3 " />
      <h1 className="flex items-center text-2xl mt-1 lg:mt-0 lg:text-3xl font-medium">
        <div>V</div>
        <div className="hidden lg:block">uln</div>
        <div>C</div>
        <div className="hidden lg:block">ontrol</div>
      </h1>
    </div>
  );
};
