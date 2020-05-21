import {useContext, useReducer, useState} from 'react';
import MainContext from '../../context/MainContext';
import {
    setModulo,
    getDeleteModuloData,
    deleteSistema,
    getPrecioTotalUpdate,
  } from '../../helpers/presupuestoReducerHelper';
import {initialState} from '../../consts/presupuesto';

const reducer = (state, action) => {
    switch(action.type) {
      case 'setData':
        return {...state, datos: {...state.datos, [action.key]: action.payload}};
      case 'setSistema':
        const sistemas = state.sistemas;
        sistemas.push({sistema: action.payload.sistema, referencia:action.payload.referencia, modulos: []});
        return {...state, sistemas};
      case 'setAll':
          return action.payload;
      case 'setModulo':
        return setModulo(state, action);
      case 'setAllState':
        return action.payload;
      case 'deleteSistema':
        return deleteSistema(state, action.sistema, action.referencia);
      case 'deleteModulo':
        return getDeleteModuloData(state, action);
      case 'setPrecioTotal':
        return getPrecioTotalUpdate({...state});
      default:
        return state;
    }
};

const usePresupuesto = (_id) => {
    const collection = 'presupuesto';
    const {firebase, setLoading} = useContext(MainContext);
    const [id, setId] = useState(_id);
    const [state, dispatch] = useReducer(reducer, JSON.parse(JSON.stringify(initialState)));

    /**
     * 
     */
    const create = async () => {
        try {
            const res = await firebase.database.collection(collection)
                .add(state);
            setId(res.id);
        } catch(err) {
            throw new Error(`Error creando presupuesto - ${err}`);
        }
    }

    const update = async () => {
      try {
        await firebase.update(collection, id, state);
      } catch(err) {
        throw new Error(`Error actualizando presupuesto - ${err}`);
      }
    };

    /**
     * 
     */
    const getById = async() => {
        try{
            const ret = await firebase.collection(collection).doc(id).get();
            const data = ret.data();
            dispatch({type: 'setAll', payload: data});
        }catch(err){
            throw new Error(`Error obteniendo presupuesto por id ${id} - ${err}`);
        }
    };

    const getAll = async () => {
      try{
          setLoading(true);
          const snapshot = await firebase.getAll(collection);
          const ret = snapshot.docs.map(doc => {
              const data = doc.data();
              return ({
                id: doc.id,
                ...data
              });
          });
          setLoading(false);
          return ret;
      } catch(err) {
          throw new Error(`Error obteniendo presupuestos - ${err}`);
      }
    }
    
    return {
        create,
        dispatch,
        getAll,
        getById,
        id,
        state,
        update
    };

};

export default usePresupuesto;