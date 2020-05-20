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
          return {state};
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

const usePresupuesto = () => {
    const collection = 'presupuesto';
    const {firebase} = useContext(MainContext);
    const [id, setId] = useState(null);
    const [state, dispatch] = useReducer(reducer, JSON.parse(JSON.stringify(initialState)));

    /**
     * 
     */
    const create = async () => {
        try {
            const res = await firebase.database.collection(collection)
                .add({
                    datos: state.datos,
                    sistemas: state.sistemas,
                    precioTotal: state.precioTotal
                });
            setId(res.id);
        } catch(err) {
            throw new Error(`Error creando presupuesto - ${err}`);
        }
    }

    /**
     * 
     * @param {*} id 
     */
    const getById = async(id) => {
        try{
            const ret = await firebase.collection(collection).doc(id).get();
            const data = ret.data();
            dispatch({type: 'setAll', payload: data});
            setId(id);
        }catch(err){
            throw new Error(`Error obteniendo presupuesto por id ${id} - ${err}`);
        }
    };

    return {
        create,
        dispatch,
        getById,
        state,
    };

};

export default usePresupuesto;