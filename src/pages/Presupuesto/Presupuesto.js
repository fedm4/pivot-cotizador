import React, {useContext, useState, useReducer, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Panel from '../../components/Panel/Panel';
import Context from '../../context/MainContext';
import Spreadsheets from '../../consts/spreadsheets';
import {getAnchos, getPrecio } from '../../services/sheets';
import DataForm from './components/DataForm/DataForm';
import {initialState} from '../../consts/presupuesto';
import SistemaModal from './components/SistemaModal/SistemaModal';
import Button from '../../components/Button/Button';
import Sistema from './components/Sistema/Sistema';
import {
  getPrecioTotal,
  getSistemaIndex,
  setModulo,
  getDeleteModuloData
} from '../../helpers/presupuestoReducerHelper';


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
      return state;
    case 'deleteModulo':
      return getDeleteModuloData(state, action);
    default:
      return state;
  }
};
let indexBorrador = -1;

const Presupuesto = () => {
  const {nroPresupuesto} = useParams();
  const [state, dispatch] = useReducer(reducer, JSON.parse(JSON.stringify(initialState)));
  const [sistemaModal, setSistemaModal] = useState(false);
  const {gapi} = useContext(Context);
  
  useEffect(() => {
    if(nroPresupuesto) {
      const borradores = JSON.parse(localStorage.getItem("borradores"));
      if(borradores) {
        const indexBorrador = borradores.findIndex(borrador=>borrador.datos.nroPresupuesto === nroPresupuesto);
        if(indexBorrador !== -1) {
          dispatch({type: 'setAllState', payload: borradores[indexBorrador]});
        }
      }
    }
  }, []);

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
            className="ml-15"
            color="blue"
            handleOnClick={()=>{}}
          >Generar Presupuesto</Button>
        </div>
      </form>
    </Panel>
  )
};

export default Presupuesto;