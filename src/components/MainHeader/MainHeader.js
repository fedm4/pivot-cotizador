import React, {useContext} from 'react';
import MainContext from '../../context/MainContext';
import './MainHeader.scss';
import LogoPivot from './logo-pivot.jpg';

const MainHeader = () => {
  const {
    handleAuthClick,
    handleSignOutClick,
    isSignedIn
  } = useContext(MainContext);
  return (
    <header id="main-header">
      <div className="img-container">
        <img src={LogoPivot} alt="Logo Pivot" />
      </div>
      {
        !isSignedIn ?
        <button onClick={handleAuthClick}
          id="authorize-button"
          className="g-button">Authorize</button>
        :
        <button onClick={handleSignOutClick}
          id="signout-button"
          className="g-button">Sign Out</button>
      }
    </header>
  );
};

export default MainHeader;