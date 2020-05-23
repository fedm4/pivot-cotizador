import useBaseModel from '../useBaseModel/useBaseModel';

import {useContext, useReducer, useState} from 'react';
import MainContext from '../../context/MainContext';
import {
    setModulo,
    getDeleteModuloData,
    deleteSistema,
    getPrecioTotalUpdate,
  } from '../../helpers/presupuestoReducerHelper';
import {initialState as _initialState} from '../../consts/presupuesto';

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
    const initialState = JSON.parse(JSON.stringify(_initialState));
    const {
      create,
        dispatch,
        getAll,
        getById,
        id,
        state,
        update
    } = useBaseModel({reducer, initialState, _id, collection});

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