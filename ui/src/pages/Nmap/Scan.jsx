import React from "react";

export const Scan = ({messages}) => {
  return (
    <pre>
      {messages.map((message, index) => (
        <pre key={index}>{message || "\u00a0"}</pre>
      ))}
    </pre>
  );
};
