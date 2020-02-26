import React, {useState, useEffect} from 'react';
import MainHeader from './components/MainHeader/MainHeader';
import MainContext from './context/MainContext';
import config from './config/config';
import Sidebar from './components/Sidebar/Sidebar';
import Test from './components/Test/Test';
import PivotLogo from './img/logo-pivot.jpg';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import './App.scss';
import Presupuesto from './pages/Presupuesto/Presupuesto';

const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";


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
                  <Test></Test>
                </Route>
                <Route exact path="/presupuesto">
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
          <button type="button" onClick={handleAuthClick}>
            Conectar usando Google
          </button>
        </section>
      </div>
    }
    </MainContext.Provider>
    
  );
}

export default App;
