import React from "react";

export const StartForm = ({ start, onFormChange }) => {
  return (
    <form className="target w-full border border-red-400" onSubmit={start}>
      <input
        type="text"
        placeholder="Target"
        className="w-96"
        name="target"
        onChange={onFormChange}
      />
      <button>Scan</button>
    </form>
  );
};
