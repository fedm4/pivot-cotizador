import React, {useState, useEffect} from 'react';

import LoginForm from './components/LoginForm/LoginForm';
import MainHeader from './components/MainHeader/MainHeader';
import MainContext from './context/MainContext';
import Sidebar from './components/Sidebar/Sidebar';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import Presupuestos from './pages/Presupuestos/Presupuestos';
import Presupuesto from './pages/Presupuesto/Presupuesto';
import Borradores from './pages/Borradores/Borradores';
import Usuarios from './pages/Usuarios/Usuarios';
import Usuario from './pages/Usuario/Usuario';
import gappsSignInService from './services/gappsSignIn';
import firebase from './services/firebase';

import './App.scss';
import Role from './models/Role';

const App = () => {
  const gapi = window.gapi;
  const [isGappsSignedIn, setIsGappsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  
  const {
    handleClientLoad,
    handleAuthClick,
    handleSignOutClick
  } = gappsSignInService(gapi, setIsGappsSignedIn);

  useEffect(()=>{
    handleClientLoad();
    firebase.onAuthStateChanged(user => {
      if(user && user.email){
        setUser({
          debug: user,
          email: user.email,
          emailVerified: user.emailVerified
        });
      }else {
        setUser(null);
      }
    });
  }, []);
  useEffect(()=>console.log(user), [user]);
  /*useEffect(() => {
    if(!firebase) return;
    //Role.getAll(firebase);
  }, []);*/
  return (
    <MainContext.Provider
      value={
        {
          handleAuthClick,
          handleSignOutClick,
          isGappsSignedIn,
          gapi,
          firebase,
          user
        }
      }
    >
      <React.Fragment>
        <MainHeader></MainHeader>
        <main>
          <BrowserRouter>

            {
              !user ?
              <LoginForm />
              :
              <React.Fragment>
                <Sidebar></Sidebar>
                <section className="main-content">
                  <Switch>
                    <Route exact path="/usuarios">
                      <Usuarios />
                    </Route>
                    <Route exact path="/usuario">
                      <Usuario />
                    </Route>
                    <Route exact path="/usuario/:id">
                      <Usuario />
                    </Route>
                    
                    <Route exact path="/">
                      <Presupuestos></Presupuestos>
                    </Route>
                    <Route exact path="/presupuestos">
                      <Presupuestos></Presupuestos>
                    </Route>
                    <Route exact path="/presupuesto">
                      <Presupuesto></Presupuesto>
                    </Route>
                    <Route exact path="/borradores">
                      <Borradores></Borradores>
                    </Route>
                    <Route exact path="/borrador/:nroPresupuesto">
                      <Presupuesto></Presupuesto>
                    </Route>
                  </Switch>
                </section>
              </React.Fragment>
            }
          </BrowserRouter>
        </main>
      </React.Fragment>
    </MainContext.Provider>
    
  );
}

export default App;
