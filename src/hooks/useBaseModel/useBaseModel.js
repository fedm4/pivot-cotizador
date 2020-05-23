import {useEffect, useContext, useReducer, useState} from 'react';
import MainContext from '../../context/MainContext';

const _reducer = (state, action) => {
    switch(action.type) {
      case 'setData':
        return {...state, [action.key]: action.payload};
      case 'setAll':
          return action.payload;
      default:
        return state;
    }
};

export default ({reducer, initialState, _id, collection, onload=true}) => {
    const [state, dispatch] = useReducer(reducer ? reducer : _reducer, initialState);
    const [id, setId] = useState(_id);
    const [display, setDisplay] = useState(true);
    const [saving, setSaving] = useState(false);
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
        handleInputChange,
        handleSelectChange
    };
}