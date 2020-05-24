import {useEffect, useContext, useReducer, useState} from 'react';
import MainContext from '../../context/MainContext';

const _reducer = (state, action) => {
    let files;
    switch(action.type) {
      case 'setData':
        return {...state, [action.key]: action.payload};
      case 'setAll':
          return action.payload;
      case 'setFile':
          files = state[action.key];
          files.push(action.file);
          return {...state, [action.key]: files};
      case 'removeFile':
          files = state[action.key];
          return {...state, [action.key]: state[action.key].filter(item => action.file !== item.name)};
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
    const [changesSaved, setChangesSaved] = useState(true);
    const {firebase, setLoading} = useContext(MainContext);

    /************************
     * State update methods *
     ************************/
    const handleInputChange = e => {
        setChangesSaved(false);
        dispatch({type: 'setData', key: e.target.name, payload: e.target.value});
    };
    
    const handleSelectChange = (e, key) => {
        setChangesSaved(false);
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
        setChangesSaved(false);
        const fileName = renameFile(file);
        return firebase.uploadFile(file, fileName, folder)
            .then(url => ({url, name: fileName}))
            .then(file => dispatch({type: 'setFile', key: targetName, file}))
            .catch(e => { throw e; })
            .finally(() => setUploading(false));
        
    };
    const deleteFile = async (file, folder, targetName) => {
        try {
            setChangesSaved(false);
            await firebase.deleteFile(file, folder);
            dispatch({type: 'removeFile', key: targetName, file});
        }catch(err) {
            throw err;
        }
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
            setChangesSaved(true);
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
            setChangesSaved(true);
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
                    .catch(e => { throw e; })
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
        uploadFile,
        deleteFile,
        changesSaved,
        setChangesSaved
    };
}