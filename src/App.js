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
import User from './models/User';
import Modal from './components/Modal/Modal';

const App = () => {
  const gapi = window.gapi;
  const [isGappsSignedIn, setIsGappsSignedIn] = useState(false);
  const [user, setUser] = useState(new User({
    id: null,
    email: null,
    roles: []
  }));
  const [message, setMessage] = useState({message: null, type: null});
  
  const {
    handleClientLoad,
    handleAuthClick,
    handleSignOutClick
  } = gappsSignInService(gapi, setIsGappsSignedIn);

  useEffect(()=>{
    handleClientLoad();
    firebase.onAuthStateChanged(user => {
      if(user && user.email){
        const _user = new User({
          id: user.uid,
          email: user.email,
          roles: []
        });
        _user.getCurrentRoles(firebase)
          .then(roles => {setUser(new User({..._user, roles}))})
          .catch(e => setMessage({message: e.message, type: 'error'}));
      }else {
        setUser(null);
      }
    });
  }, []);

  return (
    <MainContext.Provider
      value={
        {
          handleAuthClick,
          handleSignOutClick,
          isGappsSignedIn,
          gapi,
          firebase,
          user,
          setMessage
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
                    <Route exact path="/" >
                      <div>Bienvenido</div>
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
      <Modal
        isOpen={message.message}
        contentCentered={true}
        closeModal={e => setMessage({message: null, type: null})}
        height={200} width={350}
        type={message.type}
      >
        {message.message}
      </Modal>
    </MainContext.Provider>
    
  );
}

export default App;
