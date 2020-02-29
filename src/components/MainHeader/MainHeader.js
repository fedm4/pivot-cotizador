import React, {useContext} from 'react';
import MainContext from '../../context/MainContext';
import Button from '../Button/Button';
import './MainHeader.scss';
import LogoPivot from '../../img/logo-pivot.jpg';

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
        null
        :
        <Button handleOnClick={handleSignOutClick}
          color="red"
          id="signout-button"
          className="g-button">Sign Out</Button>
      }
    </header>
  );
};

export default MainHeader;