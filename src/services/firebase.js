import app from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

const config ={
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};
/**
 * Clase Firebase, para centralizar
 * la lógica del servicio de firebase
 * en base de datos y storage
 */
class Firebase {
    constructor() {
        app.initializeApp(config);
        this.database = app.database();
        this.storage = app.storage();
        this.auth = app.auth();
    }

    /**
     * Get reference to file and return
     * @param {*} fileName 
     */
    getFileRef (fileName) {
        try {
            const fileRef = this.storage
                .ref()
                .child(`images/${fileName}`);
            return fileRef;
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Recibe una referencia de la imagen, crea
     * una referencia en storage, y la sube.
     * 
     * @param {File} file 
     */
    async subirImagen (file) {
        const fileRef = this.getFileRef(file.name);
        try {
            await fileRef.put(file);
        }catch(err) {
            console.log(err);
        }
    }

    /**
     * Borra la file del storage. 
     * Utilizado en caso de error generando 
     * reclamo.
     * @param {File} file 
     */
    async borrarImagen (file) {
        try{
            const fileRef = this.getFileRef(file.name);
            await fileRef.delete();
        }catch (err) {
            console.log(err);
        }
    }

    /**
     * 
     */
    async getFile (file) {
        if(!file) return null;
        try {
            const fileRef = this.getFileRef(file);
            return await fileRef.getDownloadURL();
        }catch(err) {
            console.log(err);
        }
    }

    /************
     * Database *
     ************/
    async create (refName, data) {
        delete data.id;
        try {
            const ret = this.database.ref(`/${refName}/`)
                .push(data);
            return ret.key;
        } catch (err) {
            //TODO: Tirar error
            throw err; 
        }
    }

    /**
     * 
     */
    async getAll (refName, setter) {
        try{
            const dataRef = await this.database.ref(`/${refName}/`);
            dataRef.on('value', snapshot => setter(snapshot.val()));
        }catch(err) {
            console.log(err);
        }
    }
    /**
     * 
     */
    async get (refName, setter) {
        try{
            const dataRef = await this.database.ref(`/${refName}/`);
            dataRef.once('value', snapshot => setter(snapshot.val()));
        }catch(err) {
            console.log(err);
        }
    }

    /********
     * Auth *
     ********/

    /**
     * 
     * @param {*} email 
     * @param {*} password 
     */
    async createUserEmail(email, password) {
        this.auth.createUserWithEmailAndPassword(email, password)
            .catch(err=>console.log(err));
    }
    async signInEmail(email, password) {
        this.auth.signInWithEmailAndPassword(email, password)
            .catch(err=>console.log(err));
    }
    signOut() {
        this.auth.signOut();
    }
    /**
     * Expose method to handle user login somewhere else
     */
    onAuthStateChanged(callback) {
        return this.auth.onAuthStateChanged(callback);
    }
}

export default new Firebase();
