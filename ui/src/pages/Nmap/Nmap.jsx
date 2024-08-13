import React from "react";

export const Nmap = () => {
  return (
    <div className="nmap-container">
      <div className="target">
        <input type="text" placeholder="Target" />
      </div>
      <div className="options">
      <label for="fruits">Select your favorite fruits:</label>
    <select id="fruits" name="fruits" multiple>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
        <option value="mango">Mango</option>
        <option value="grapes">Grapes</option>
        <option value="pineapple">Pineapple</option>
    </select>
      </div>
    </div>
  );
};
