import React from 'react';
import Skeleton from 'react-loading-skeleton';

import './Input.scss'

const Input = ({value, handleChange, label, placeholder, type, className, name, skeleton}) => {
  const onChange = e => {
    if(type === "date"){
      handleChange({...e, target: {...e.target, value: new Date(e.target.value).getTime()}})
    }else {
      handleChange(e);
    }
  };

  return (
    <label className={className}>
      <span className="label">{label}</span>
      {
        skeleton ? 
        <Skeleton height={30}/>
        :
        <input
          className="input"
          name={name}
          placeholder={placeholder}
          type={type}
          onChange={handleChange}
          value={value}
        />
      }
    </label>
  );
};

export default Input;