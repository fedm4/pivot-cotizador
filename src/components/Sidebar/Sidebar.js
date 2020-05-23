import React, {useContext, useEffect, useReducer} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {animated, useSpring} from 'react-spring';
import MainContext from './../../context/MainContext';

import './Sidebar.scss';

const reducer = (state, action) => {
  if(!action.key) return {};
  return {[action.key]: 'active'};
};

const Sidebar = () => {
  let location = useLocation();
  const [state , dispatch] = useReducer(reducer, {presupuestos:""});
  const {
    handleAuthClick,
    handleSignOutClick,
    isGappsSignedIn,
    user
  } = useContext(MainContext);

  const tesoreriaSubmenuProps = useSpring({height:state.tesoreria?90:0, from:{height: state.tesoreria?0:90, duration: 150}});

  useEffect(() => {
    let key;
    switch(location.pathname.split("/")[1]) {
      case "presupuestos":
        key = "presupuestos";
        break;
      case "presupuesto":
        key = "presupuestos";
        break;
      case "usuarios":
        key = "usuarios";
        break;
      case "usuario":
        key = "usuarios";
        break;
      case "tesoreria":
        key = "tesoreria";
        break;
      default:
        break;
    }
    dispatch({key});
  }, [location.pathname]);
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {
          user.roles.indexOf('cotizador') !== -1 ?
          <Link className={`menu-item ${state.presupuestos}`} onClick={()=>dispatch({key:'presupuestos'})} to="/presupuestos">
            <span className="link">Presupuestos</span>
          </Link>
          :
          null          
        }
        {
          user.roles.indexOf('usuarios') !== -1 ?
          <Link
            className={`menu-item ${state.usuarios}`} 
            onClick={()=>dispatch({key:'usuarios'})}
            to="/usuarios">
            <span className="link">Usuarios</span>
          </Link>
          :
          null
        }
        {
          user.roles.indexOf('egresos') !== -1 ||
          user.roles.indexOf('ingresos') !== -1 ?
          <div
            className={`menu-item ${state.tesoreria}`}
            to="/tesoreria"
          >
            <Link className="link"
              onClick={()=>dispatch({key: 'tesoreria'})}
              to="/tesoreria"
            >
              Tesorería
            </Link>
            <animated.ul style={tesoreriaSubmenuProps}>
              {
                user.roles.indexOf('ingresos') !== -1 ?
                <li>
                  <Link className="sublink" to="/tesoreria/ingresos">Ingresos</Link>
                </li>
                :null
              }
              {
                user.roles.indexOf('egresos') !== -1 ?
                <li>
                  <Link className="sublink" to="/tesoreria/egresos">Egresos</Link>
                </li>
                :null
              }
            </animated.ul>
          </div>
          :
          null
        }
      </nav>
    </aside>
  )
};

export default Sidebar;