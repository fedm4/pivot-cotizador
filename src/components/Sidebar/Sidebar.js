import React, {useContext, useReducer} from 'react';
import {Link} from 'react-router-dom';
import Button from './../Button/Button';
import MainContext from './../../context/MainContext';
import {
  ADMIN,
  TESORERIA,
  COTIZADOR
} from '../../consts/roles';

import './Sidebar.scss';

const reducer = (state, action) => {
  switch(action.type) {
    case 'setPresupuestos':
      return {presupuestos: "active"};
    case 'setUsuarios':
      return {usuarios: "active"};
    default:
      return state;
  }
};

const Sidebar = () => {
  const [state , dispatch] = useReducer(reducer, {presupuestos:""});
  const {
    firebase,
    handleAuthClick,
    handleSignOutClick,
    isGappsSignedIn
  } = useContext(MainContext);

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {
          isGappsSignedIn ?
          <React.Fragment>
            <Link className={`${state.presupuestos}`} onClick={()=>dispatch({type:'setPresupuestos'})} to="/presupuestos">Presupuestos</Link>
            <Button handleOnClick={handleSignOutClick}
              color="red"
              id="signout-button"
              className="g-button"
              fullwidth={true}
            >
              Desconectar
            </Button>
          </React.Fragment>
          :
          <Button type="button" handleOnClick={handleAuthClick} color="green" fullwidth={true}>
            Conectar
          </Button>          
        }
        <Link className={`${state.usuarios}`}  onClick={()=>dispatch({type:'setUsuarios'})} to="/usuarios">Usuarios</Link>
      </nav>
    </aside>
  )
};

export default Sidebar;