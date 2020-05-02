import config from '../config/config';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive";

const gappsSignIn = (gapi, setIsGappsSignedIn) => {
    const handleClientLoad = () => {
        gapi.load('client:auth2', initClient);
    }
    const handleAuthClick = () => {
        gapi.auth2.getAuthInstance().signIn();
    }
    const handleSignOutClick = () => {
        gapi.auth2.getAuthInstance().signOut();
    }
    const initClient = async () => {
        try{
            await gapi.client.init({
                apiKey: config.gappsApiKey,
                clientId: config.gappsClientId,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            })
            gapi.auth2.getAuthInstance().isSignedIn.listen(setIsGappsSignedIn);
            setIsGappsSignedIn(gapi.auth2.getAuthInstance().isSignedIn.get());
        } catch(err) {
            throw err;
        }
    }
    return {
        handleClientLoad,
        handleAuthClick,
        handleSignOutClick
    }
};

export default gappsSignIn;