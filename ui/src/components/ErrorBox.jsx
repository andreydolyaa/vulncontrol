import React from "react";

export const ErrorBox = ({ error }) => {
  return (
    <div className="text-center h-8 !m-0 text-red-500">
      {error && (
        <div className="animate-appear">{error?.message || "Error"}</div>
      )}
    </div>
  );
};
