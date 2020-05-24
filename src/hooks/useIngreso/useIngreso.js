import {useEffect, useState} from 'react';
import useBaseModel from '../useBaseModel/useBaseModel';
import initialState, {estados} from '../../consts/ingreso';

const reducer = (state, action) => {
    switch(action.type) {
      case 'setData':
        return {...state, datos: {...state.datos, [action.key]: action.payload}};
      case 'setAll':
          return action.payload;
      default:
        return state;
    }
};

export default (_id) => {
    const collection = 'ingreso';
    const {
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
    } = useBaseModel({initialState, _id, collection});
    const [triggerCreate, setTriggerCreate] = useState(false);
    const _create = () => {
        handleInputChange({target: {name: 'fechaCreacion', value: Date.now()}});
        setTriggerCreate(true);
    };

    const _uploadFile = (file, targetName) => {
        uploadFile(file, targetName, 'ingresos');
    };

    useEffect(()=> {
        if(triggerCreate) create();
    }, [triggerCreate]);

    return {
        create: _create,
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
        uploadFile: _uploadFile,
        estados
    };
};
