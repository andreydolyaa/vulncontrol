import React from "react";
import { Empty } from "./Empty";
import { LoadingBlink } from "./LoadingBlink";

export const Display = ({ loading, error, children, className }) => {
  const display = () => {
    if (loading) return <Empty text={<LoadingBlink />} />;
    if (error) return <Empty text={`An error occurred`} />;
    return children;
  };

  return <div className={className}>{display()}</div>;
};
