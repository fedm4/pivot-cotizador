import React, {useContext, useState, useReducer, useEffect} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import Panel from '../../components/Panel/Panel';
import Context from '../../context/MainContext';
import Spreadsheets from '../../consts/spreadsheets';
import {getAnchos, getPrecio, createPresupuestoFile } from '../../services/sheets';
import DataForm from './components/DataForm/DataForm';
import {initialState} from '../../consts/presupuesto';
import SistemaModal from './components/SistemaModal/SistemaModal';
import Button from '../../components/Button/Button';
import Sistema from './components/Sistema/Sistema';
import PulseLoader from '../../components/PulseLoader/PulseLoader';
import {
  getPrecioTotal,
  getSistemaIndex,
  setModulo,
  getDeleteModuloData,
  deleteSistema,
  getPrecioTotalUpdate,
} from '../../helpers/presupuestoReducerHelper';
import useAuthBlocker from '../../hooks/useAuthBlocker/useAuthBlocker';

const reducer = (state, action) => {
  switch(action.type) {
    case 'setData':
      return {...state, datos: {...state.datos, [action.key]: action.payload}};
    case 'setSistema':
      const sistemas = state.sistemas;
      sistemas.push({sistema: action.payload.sistema, referencia:action.payload.referencia, modulos: []});
      return {...state, sistemas};
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
let indexBorrador = -1;

const Presupuesto = () => {
  const {nroPresupuesto} = useParams();
  const [state, dispatch] = useReducer(reducer, JSON.parse(JSON.stringify(initialState)));
  const [sistemaModal, setSistemaModal] = useState(false);
  const [writing, setWriting] = useState(false);
  const {gapi, user} = useContext(Context);
  const decodedNroPresupuesto = decodeURIComponent(nroPresupuesto);
  const {isAuthorized, NotAuthorized} = useAuthBlocker('cotizador');

  useEffect(() => {
    if(decodedNroPresupuesto) {
      const borradores = JSON.parse(localStorage.getItem("borradores"));
      if(borradores) {
        const indexBorrador = borradores.findIndex(borrador=>borrador.datos.nroPresupuesto === decodedNroPresupuesto);
        if(indexBorrador !== -1) {
          dispatch({type: 'setAllState', payload: borradores[indexBorrador]});
        }
      }
    }
  }, []);

  useEffect(() => {
    console.log("update marcacion")
    dispatch({type: 'setPrecioTotal'});
  }, [state.datos.marcacion])

  const guardarBorrador = ()=>{
    if(state.datos.nroPresupuesto === ""){
      alert("Necesita Nro de Presupuesto para guardar borrador");
      return;
    }
    const borradores = JSON.parse(localStorage.getItem("borradores")) || [];
    if(indexBorrador === -1) {
      //buscar borrador
      indexBorrador = borradores.findIndex(borrador=>borrador.datos.nroPresupuesto === state.datos.nroPresupuesto);
      if(indexBorrador === -1){
        borradores.push(state);
      }else {
        borradores[indexBorrador] = state;
      }
    }
    localStorage.setItem("borradores", JSON.stringify(borradores));
    alert("Borrador Guardado");
  };

  const handleGenerarPresupuesto = async () => {
    setWriting(true);
    await createPresupuestoFile(gapi, state, setWriting);
  };

  if(!isAuthorized) return (<NotAuthorized />);
  return (
    <Panel title="Presupuesto">
      <PulseLoader show={writing}></PulseLoader>
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
          <h4>Precio Total: ${state.precioTotal}</h4>
        </div>
        <div className="flex justify-flex-end flex-align-center">
          <Button
            color="green"
            handleOnClick={()=>{setSistemaModal(true)}}
          >Agregar Sistema</Button>
          <Button
            className="ml-15"
            color="yellow"
            handleOnClick={()=>{guardarBorrador()}}
          >Guardar Borrador</Button>
          <Button
            disabled={writing?'disabled':''}
            className="ml-15"
            color="blue"
            handleOnClick={handleGenerarPresupuesto}
          >Generar Presupuesto</Button>
        </div>
      </form>
    </Panel>
  )
};

export default Presupuesto;