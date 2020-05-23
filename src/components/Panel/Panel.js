import React from 'react';
import './Panel.scss';

const Panel = ({title, children, className}) => {
  return (
    <section className={`panel`}>
      <header className="panel-header">{title}</header>
      <div className={`panel-content ${className}`}>
        {children}
      </div>
    </section>
  );
};

export default Panel;