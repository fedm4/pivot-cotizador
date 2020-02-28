import React, {useContext, useState, useReducer, useEffect} from 'react';
import Panel from '../../components/Panel/Panel';
import Context from '../../context/MainContext';
import Spreadsheets from '../../consts/spreadsheets';
import {getAnchos, getPrecio } from '../../services/sheets';
import DataForm from './components/DataForm/DataForm';
import {initialState} from '../../consts/presupuesto';
import SistemaModal from './components/SistemaModal/SistemaModal';
import Button from '../../components/Button/Button';
import Sistema from './components/Sistema/Sistema';

const reducer = (state, action) => {
  switch(action.type) {
    case 'setData':
      return {...state, datos: {...state.datos, [action.key]: action.payload}};
    case 'setSistema':
      const sistemas = state.sistemas;
      sistemas.push({sistema: action.payload.sistema, referencia:action.payload.referencia, modulos: []});
      return {...state, sistemas};
    case 'setModulo':
      const clon = [...state.sistemas];
      const index = clon.findIndex(item => {
        return item.sistema === action.sistema.sistema &&
          item.referencia === action.sistema.referencia 
      });
      if(index === -1 ) return state;
      clon[index].modulos.push(action.payload);
      return {...state, sistemas: clon};
    default:
      return state;
  }
};

const Presupuesto = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [sistemaModal, setSistemaModal] = useState(false);
  const {gapi} = useContext(Context);

  return (
    <Panel title="Presupuesto">
      <form>
        <DataForm state={state} dispatch={dispatch}/>
        <SistemaModal
          isOpen={sistemaModal}
          setIsOpen={setSistemaModal}
          state={state}
          dispatch={dispatch} 
        />
        {
          state.sistemas.map(sistema => <Sistema key={`${sistema.sistema}${sistema.referencia}`} sistema={sistema} dispatch={dispatch}/>)
        }
        <div className="flex justify-flex-end flex-align-center">
          <Button
            handleOnClick={()=>{setSistemaModal(true)}}
          >Agregar Sistema</Button>
        </div>
      </form>
    </Panel>
  )
};

export default Presupuesto;