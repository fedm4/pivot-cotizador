import React from 'react';
import './Panel.scss';

const Panel = ({title, children}) => {
  return (
    <section className="panel">
      <header className="panel-header">{title}</header>
      <div className="panel-content">
        {children}
      </div>
    </section>
  );
};

export default Panel;