import React from 'react';
import './Button.scss';
import {Link} from 'react-router-dom';

const Button = ({children, handleOnClick, link, color, className, disabled}) => {
  return (
    link?
    <Link to={link}
      className={`button ${color} ${className}`}
    >
      {children}
    </Link>
    :
    <button className={`button ${color} ${className} ${disabled}`}
      type="button"
      disabled={disabled}
      onClick={handleOnClick}
    >
      {children}
    </button>
  )
};

export default Button;