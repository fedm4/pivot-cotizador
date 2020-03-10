import React from 'react';
import './PulseLoader.scss';
const PulseLoader = ({show}) => {
  if(!show) return null;
  return (
    <div className="pulse-loader-container">
      <div className="overlay"></div>
      <div className="pulse-loader"></div>
    </div>
  )
};

export default PulseLoader;