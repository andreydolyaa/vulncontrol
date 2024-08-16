import React from "react";
import { TbLoader2 } from "react-icons/tb";

export const Loading = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <TbLoader2 className="animate-spin text-3xl" />
    </div>
  );
};
