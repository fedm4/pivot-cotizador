import React from 'react';
import './Button.scss';
import {Link} from 'react-router-dom';
import ellipsis from './img/ellipsis.gif';

const Button = ({children, handleOnClick, link, color, className, disabled, fullwidth, saving}) => {
  return (
    link?
    <Link to={link}
      className={`button ${color} ${className} ${disabled} ${saving ? 'saving': ''}`}
    >
      {children}
    </Link>
    :
    <button className={`button ${color} ${className} ${disabled} ${fullwidth?'fullwidth': ''} ${saving ? 'saving': ''}`}
      type="button"
      disabled={disabled}
      onClick={handleOnClick}
    >
      {
        saving?
        <img src={ellipsis} alt="ellipsis" className="ellipsis" />
        :
        children
      }
    </button>
  )
};

export default Button;