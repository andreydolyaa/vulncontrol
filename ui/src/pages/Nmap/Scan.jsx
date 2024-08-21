import React from "react";

export const Scan = ({ messages }) => {
  return (
    <div className="terminal bg-gra">
      <pre>
        {messages.map((message, index) => (
          <div key={index}>{message || "\u00a0"}</div>
        ))}
      </pre>
    </div>
  );
};
