import {useEffect, useContext, useReducer, useState} from 'react';
import MainContext from '../../context/MainContext';

const _reducer = (state, action) => {
    switch(action.type) {
      case 'setData':
        return {...state, [action.key]: action.payload};
      case 'setAll':
          return action.payload;
      case 'setFile':
          let files = state[action.key];
          files.push(action.file);
          return {...state, [action.key]: files};
      case 'removeFile':
          throw new Error("Not Implemented");
      default:
        return state;
    }
};

export default ({reducer, initialState, _id, collection, onload=true}) => {
    const [state, dispatch] = useReducer(reducer ? reducer : _reducer, initialState);
    const [id, setId] = useState(_id);
    const [display, setDisplay] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const {firebase, setLoading, setMessage} = useContext(MainContext);

    /************************
     * State update methods *
     ************************/
    const handleInputChange = e => {
        dispatch({type: 'setData', key: e.target.name, payload: e.target.value});
    };
    
    const handleSelectChange = (e, key) => {
        dispatch({type: 'setData', key, payload: e.value})
    };

    /*******************
     * Storage Methods *
     *******************/
    const renameFile = (file) => {
        const name = file.name;
        const lastDot = name.lastIndexOf('.');
        
        const fileName = name.substring(0, lastDot);
        const ext = name.substring(lastDot + 1);
        return `${fileName}${Date.now()}.${ext}`;
    }
    const uploadFile = (file, targetName, folder) => {
        setUploading(true);
        const fileName = renameFile(file); 
        firebase.uploadFile(file, fileName, folder)
            .then(url => ({url, name: fileName}))
            .then(file => dispatch({type: 'setFile', key: targetName, file}))
            .then(() => {if(id) { update(); }})
            .catch(e => setMessage({message: e.message, type: 'error'}))
            .finally(() => setUploading(false));
        
    };
    /********************
     * Database Methods *
     ********************/
    const create = async () => {
        try {
            setSaving(true);
            const res = await firebase.database.collection(collection)
                .add(state);
            setId(res.id);
        } catch(err) {
            throw new Error(`Error creando ${collection} - ${err}`);
        } finally{
            setSaving(false);
        }
    }

    const update = async () => {
        try {
            setSaving(true);
            await firebase.update(collection, id, state);
        } catch(err) {
            throw new Error(`Error actualizando ${collection} - ${err}`);
        } finally {
            setSaving(false);
        }
    };

    const getById = async() => {
        try{
            const ret = await firebase.collection(collection).doc(id).get();
            const data = ret.data();
            dispatch({type: 'setAll', payload: data});
        }catch(err){
            throw new Error(`Error obteniendo ${collection} por id ${id} - ${err}`);
        }
    };

    const getAll = async (getId = true) => {
      try{
          setLoading(true);
          const snapshot = await firebase.getAll(collection);
          const ret = snapshot.docs.map(doc => {
              const data = doc.data();
              if(getId) {
                  return ({
                    id: doc.id,
                    ...data
                  });
              }
              return data;
          });
          setLoading(false);
          return ret;
      } catch(err) {
          throw new Error(`Error obteniendo toda la collección ${collection} - ${err}`);
      }
    }

    /*******************
     * Default on load *
     *******************/
    if(onload) {
        useEffect(() => {
            if(id) {
                setDisplay(false);
                getById()
                    .catch(e => setMessage({message: e.message, type: 'error'}))
                    .finally(() => setDisplay(true));
            }
        }, []);
    }

    return {
        create,
        dispatch,
        getAll,
        getById,
        id,
        state,
        update,
        display,
        saving,
        uploading,
        handleInputChange,
        handleSelectChange,
        uploadFile
    };
}