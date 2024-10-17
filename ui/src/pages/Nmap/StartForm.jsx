import React, { useEffect } from "react";

export const StartForm = ({ start, formData, onFormChange }) => {
  return (
    <form className="target w-full border border-red-400" onSubmit={start}>
      <input
        type="text"
        placeholder="Target"
        className="w-96"
        name="target"
        onChange={onFormChange}
      />

      <div className="nmap-args">
        {Object.keys(formData.args).map((arg) => {
          return (
            <label key={arg} className="mr-5">
              <input
                type="checkbox"
                name={arg}
                checked={formData.args[arg]}
                onChange={onFormChange}
              />
              {arg}
            </label>
          );
        })}
      </div>
      <button>Scan</button>
    </form>
  );
};
