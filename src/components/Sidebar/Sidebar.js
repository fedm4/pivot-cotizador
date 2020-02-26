import React from 'react';
import {Link} from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <Link to="/presupuestos">Presupuestos</Link>
      </nav>
    </aside>
  )
};

export default Sidebar;