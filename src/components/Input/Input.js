import React from 'react';

const Input = ({value, handleChange, label, placeholder, type}) => {
  return (
    <label>
      <span className="label">{label}</span>
      <input
        placeholder={placeholder}
        type={type}
        onChange={handleChange}
        value={value}
      />
    </label>
  );
};

export default Input;