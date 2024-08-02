import React from 'react';

const ToggleSwitch = ({ isChecked, onToggle, label1, label2 }) => {
  return (
    <div className="flex items-center text-highlight">
      <span className="mr-2">{label1}</span>
      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          checked={isChecked}
          onChange={onToggle}
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        />
        <label
          htmlFor="toggle"
          className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${isChecked ? 'bg-highlight' : 'bg-accent'}`}
        ></label>
      </div>
      <span className="ml-2">{label2}</span>
    </div>
  );
};

export default ToggleSwitch;
