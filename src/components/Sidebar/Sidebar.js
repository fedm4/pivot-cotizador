import React, {useReducer} from 'react';
import {Link} from 'react-router-dom';
import './Sidebar.scss';

const reducer = (state, action) => {
  switch(action.type) {
    case 'setPresupuestos':
      return {presupuestos: "active"};
    default:
      return state;
  }
};

const Sidebar = () => {
  const [state , dispatch] = useReducer(reducer, {presupuestos:""});
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <Link className={`${state.presupuestos}`} onClick={()=>dispatch({type:'setPresupuestos'})} to="/presupuestos">Presupuestos</Link>
      </nav>
    </aside>
  )
};

export default Sidebar;