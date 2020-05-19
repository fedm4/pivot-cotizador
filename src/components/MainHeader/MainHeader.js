import React, {useContext, useState} from 'react';
import { animated, useSpring } from 'react-spring'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import MainContext from './../../context/MainContext';
import './MainHeader.scss';
import LogoPivot from '../../img/logo-pivot.jpg';

const MainHeader = () => {
  const {firebase} = useContext(MainContext);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuListProps=useSpring({
    height: showUserMenu ? "50px": "0px"
  });
  return (
    <header id="main-header">
      <div className="img-container">
        <img src={LogoPivot} alt="Logo Pivot" />
      </div>
      <section className="user-menu" onClick={() => setShowUserMenu(!showUserMenu)}>
        <FontAwesomeIcon icon={faUserAlt} />
        <animated.ul className="user-menu-list" style={userMenuListProps}>
          <li>
            <button type="button" onClick={e => {firebase.signOut()}}>Salir</button>
          </li>
        </animated.ul>
      </section>
    </header>
  );
};

export default MainHeader;