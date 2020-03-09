import React, {useState, useEffect} from 'react';
import MainHeader from './components/MainHeader/MainHeader';
import MainContext from './context/MainContext';
import config from './config/config';
import Sidebar from './components/Sidebar/Sidebar';
import Button from './components/Button/Button';
import Test from './components/Test/Test';
import PivotLogo from './img/logo-pivot.jpg';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import './App.scss';
import Presupuestos from './pages/Presupuestos/Presupuestos';
import Presupuesto from './pages/Presupuesto/Presupuesto';
import Borradores from './pages/Borradores/Borradores';


const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive";


const App = () => {
  const gapi = window.gapi;

  useEffect(()=>{
    handleClientLoad();
  }, []);
  
  const [isSignedIn, setIsSignedIn] = useState(false);
  const handleClientLoad = () => {
    gapi.load('client:auth2', initClient);
  }
  
  const initClient = async () => {
    try{
      await gapi.client.init({
        apiKey: config.gappsApiKey,
        clientId: config.gappsClientId,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      })
      gapi.auth2.getAuthInstance().isSignedIn.listen(setIsSignedIn);
      setIsSignedIn(gapi.auth2.getAuthInstance().isSignedIn.get());
    } catch(err) {
      throw err;
    }
  }
  const handleAuthClick = (event) => {
    console.log(gapi)
    gapi.auth2.getAuthInstance().signIn();
  }
  const handleSignOutClick = (event) => {
    gapi.auth2.getAuthInstance().signOut();
  }

  return (
    <MainContext.Provider
      value={
        {
          handleAuthClick,
          handleSignOutClick,
          isSignedIn,
          gapi
        }
      }
    >
    {
      isSignedIn ?
      <div>
        <MainHeader></MainHeader>
        <main>
          <BrowserRouter>
            <Sidebar></Sidebar>
            <section className="main-content">
              <Switch>
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
          </BrowserRouter>
        </main>
      </div>
      : 
      <div className="overlay">
        <section className="connect-modal">
          <img src={PivotLogo} />
          <Button type="button" handleOnClick={handleAuthClick} color="green">
            Conectar usando Google
          </Button>
        </section>
      </div>
    }
    </MainContext.Provider>
    
  );
}

export default App;
