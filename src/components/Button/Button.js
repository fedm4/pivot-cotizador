import React from 'react';
import './Button.scss';
import {Link} from 'react-router-dom';

const Button = ({children, handleOnClick, link, color, className, disabled, fullwidth}) => {
  return (
    link?
    <Link to={link}
      className={`button ${color} ${className} ${disabled}`}
    >
      {children}
    </Link>
    :
    <button className={`button ${color} ${className} ${disabled} ${fullwidth?'fullwidth': ''}`}
      type="button"
      disabled={disabled}
      onClick={handleOnClick}
    >
      {children}
    </button>
  )
};

export default Button;