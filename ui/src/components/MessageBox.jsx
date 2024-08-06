import React from "react";

export const MessageBox = ({ message, status }) => {
  const isSucceeded = () => status == "succeeded";

  return (
    <div
      className={`text-center h-8 !m-0 ${
        !isSucceeded() ? "text-red-500" : "text-green-600"
      }`}
    >
      {message && (
        <div key={message.message} className="animate-appear">
          {message?.message || "Error"}
        </div>
      )}
    </div>
  );
};
