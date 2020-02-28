import React, {useContext, useState, useReducer, useEffect} from 'react';
import Panel from '../../components/Panel/Panel';
import Context from '../../context/MainContext';
import Spreadsheets from '../../consts/spreadsheets';
import Select from '../../components/Select/Select';
import Input from '../../components/Input/Input';
import {getAnchos, getPrecio } from '../../services/sheets';
import DataForm from './components/DataForm/DataForm';
import {initialState} from '../../consts/presupuesto';
import SistemaModal from './components/SistemaModal/SistemaModal';
import Button from '../../components/Button/Button';

const reducer = (state, action) => {
  switch(action.type) {
    case 'setData':
      return {...state, datos: {...state.datos, [action.key]: action.payload}};
    case 'setSistema':
      const sistemas = state.sistemas;
      sistemas.push({sistema: action.payload.sistema, referencia:action.payload.referencia, modulos: []});
      return {...state, sistemas};
    default:
      return state;
  }
};

const Presupuesto = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const [altura, setAltura] = useState(null);
  const [anchos, setAnchos] = useState([]);
  const [ancho, setAncho] = useState(null);
  const [planilla, setPlanilla] = useState("");
  const [precio, setPrecio] = useState(null);

  const [sistemaModal, setSistemaModal] = useState(false);
  const [moduloModal, setModuloModal] = useState(false);
  const {gapi} = useContext(Context);

  /*useEffect(() => {
        if(altura == null || tabique == null) return;
        setPlanilla(Spreadsheets[tabique][altura]);
  }, [tabique, altura]);
  useEffect(()=>{
    getAnchos(gapi, setAnchos, planilla);
  },[planilla]);*/

  return (
    <Panel title="Presupuesto">
      <form>
        <DataForm state={state} dispatch={dispatch}/>
        <Button
          handleOnClick={()=>{setSistemaModal(true)}}
        >Agregar Sistema</Button>
        <SistemaModal
          isOpen={sistemaModal}
          setIsOpen={setSistemaModal}
          state={state}
          dispatch={dispatch} 
        />
        
        <Select
          label="Alto"
          seleccionar={true}
          onChange={e=>setAltura(e.target.value)}
          options={[{label:"1.50", value:"1.50"}]}
        />
        <Select 
          label="Ancho"
          onChange={e=>setAncho(e.target.value)}
          seleccionar={true}
          options={anchos}
        />
        <button type="button" onClick={e=>getPrecio(gapi, ancho, planilla, setPrecio)}>Buscar precios</button>
        <div>{precio}</div>
      </form>
    </Panel>
  )
};

export default Presupuesto;