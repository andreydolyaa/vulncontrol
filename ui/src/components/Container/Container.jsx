import React from "react";

export const Container = ({ children, center = false }) => {
  return (
    <div className={`main-container ${center ? "center" : null}`}>
      {children}
    </div>
  );
};
