import React, {useContext, useState, useReducer, useEffect} from 'react';
import Panel from '../../components/Panel/Panel';
import Context from '../../context/MainContext';
import Spreadsheets from '../../consts/spreadsheets';
import Tabiques from '../../consts/tabiques';
import Select from '../../components/Select/Select';
import Input from '../../components/Input/Input';
import {getAnchos, getPrecio } from '../../services/sheets';
import DataForm from './components/DataForm/DataForm';


const footerTextTemplate = `ESTOS PRECIOS NO INCLUYEN IVA								
PRECIOS DEL DIA EN PESOS								
FORMA DE PAGO								
Anticipo 60% con la aceptación del presupuesto.						
Saldo 30% por certif. contra entrega de materiales en obra. Ajustable s/var.índ. de refer CAC Base Abril 2019						
Saldo 10% por certificacion contra avance  de montaje . Ajustable idem						
Plazo de ejecucion: A CONVENIR`;

const initialState = {
  datos: {
    cliente: "",
    referencia: "",
    destinatario: "",
    email: "",
    domicilio: "",
    nroPresupuesto: "",
    telefono: "",
    obra: "",
    titulo: "",
    bajada: "",
    pie: footerTextTemplate
  },
  sistemas: [
    /*{
      sistema: 'bath32',
      modulos: [
        {
          modulo: "divisorio 1,50 macizo",
          cantidad: 2,
          alto: 1,50,
          ancho: 0.30,
          variable: 0,
          precioUnitario: 1000,
          precioFinal: 2000
        }
      ]
    }*/
  ],
  precioTotal: 0
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'setData':
      console.log({...state, data: {...state.data, [action.key]: action.payload}})
      return {...state, data: {...state.data, [action.key]: action.payload}};
    default:
      return state;
  }
};

const Presupuesto = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const [tabique, setTabique] = useState(null);
  const [altura, setAltura] = useState(null);
  const [anchos, setAnchos] = useState([]);
  const [ancho, setAncho] = useState(null);
  const [planilla, setPlanilla] = useState("");
  const [precio, setPrecio] = useState(null);

  const [sistemaModal, setSistemaModal] = useState(false);
  const [moduloModal, setModuloModal] = useState(false);
  const {gapi} = useContext(Context);

  useEffect(() => {
        if(altura == null || tabique == null) return;
        setPlanilla(Spreadsheets[tabique][altura]);
  }, [tabique, altura]);
  useEffect(()=>{
    getAnchos(gapi, setAnchos, planilla);
  },[planilla]);

  return (
    <Panel title="Presupuesto">
      <form>
        <DataForm state={state} dispatch={dispatch}/>
        <Select
          label="Tabique"
          seleccionar={true}
          onChange={e=>setTabique(e.target.value)}
          options={Tabiques}
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