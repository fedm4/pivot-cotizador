import React from 'react';
import './Button.scss';
import {Link} from 'react-router-dom';

const Button = ({children, handleOnClick, link}) => {
  return (
    link?
    <Link to={link}
      className="button"
    >
      {children}
    </Link>
    :
    <button className="button"
      type="button"
      onClick={handleOnClick}
    >
      {children}
    </button>
  )
};

export default Button;