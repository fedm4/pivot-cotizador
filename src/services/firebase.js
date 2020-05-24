import app from 'firebase/app';
import 'firebase/firestore';
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
        this.database = app.firestore();
        this.storage = app.storage();
        this.auth = app.auth();
    }

    /***********
     * STORAGE *
     ***********/

    getFileRef (fileName, folder) {
        try {
            const fileRef = this.storage
                .ref()
                .child(`${folder}/${fileName}`);
            return fileRef;
        } catch (err) {
            throw err;
        }
    }

    async uploadFile (file, fileName, folder) {
        const fileRef = this.getFileRef(fileName, folder);
        try {
            const data = await fileRef.put(file);
            return data.ref.getDownloadURL();
        }catch(err) {
            throw err;
        }
    }

    async deleteFile (file, folder) {
        try{
            const fileRef = this.getFileRef(file, folder);
            await fileRef.delete();
        }catch (err) {
            throw err;
        }
    }

    async getFile (file, folder) {
        if(!file) return null;
        try {
            const fileRef = this.getFileRef(file, folder);
            return await fileRef.getDownloadURL();
        }catch(err) {
            throw err;
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
        try {
            return await this.auth.createUserWithEmailAndPassword(email, password);
        } catch (err) {
            throw err;
        }
    }
    async signInEmail(email, password) {
        this.auth.signInWithEmailAndPassword(email, password)
            .catch(err=> {throw err;});
    }
    signOut() {
        this.auth.signOut();
    }
    async resetPassword(email) {
        this.auth.sendPasswordResetEmail(email);
    }
    /**
     * Expose method to handle user login somewhere else
     */
    onAuthStateChanged(callback) {
        return this.auth.onAuthStateChanged(callback);
    }

    /************
     * DATABASE *
     ************/
    async insert (collection, data) {
        try {
            if(!collection || !data || typeof data !== 'object') throw new Error("lala");
            const docRef = await this.database.collection(collection)
                .add(data);
            return docRef.id;
        } catch (err) {
            throw new Error(`Error inserting on ${collection} - ${err}`);
        }
    }
    
    async update(collection, id, data) {
        try{
            await this.database.collection(collection).doc(id).update(data);
        }catch (err) {
            throw new Error(`Error updating on ${collection} - ${err}`);
        }
    }

    collection(collection) {
        return this.database.collection(collection);
    }
    async getAll(collection) {
        try {
            const querySnapshot = await this.database.collection(collection).get();
            return querySnapshot;
        } catch(err) {
            throw new Error(`Error getting on ${collection} - ${err}`);
        }
    }
}

export default new Firebase();
