import React from 'react';
import './Input.scss'

const Input = ({value, handleChange, label, placeholder, type, className, name}) => {
  return (
    <label className={className}>
      <span className="label">{label}</span>
      <input
        className="input"
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={handleChange}
        value={value}
      />
    </label>
  );
};

export default Input;