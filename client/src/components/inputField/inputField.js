import React from 'react';

const InputField = ({ label, type, id, placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-highlight text-sm font-bold mb-2">{label}</label>
      <input
        id={id}
        className="shadow appearance-none border border-accent rounded w-full py-2 px-3 text-white leading-tight bg-primary focus:outline-none focus:shadow-outline focus:border-highlight"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
