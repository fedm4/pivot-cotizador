import React, {useContext, useState, useEffect} from 'react';
import Panel from '../../components/Panel/Panel';
import Context from '../../context/MainContext';
import Spreadsheets from '../../consts/spreadsheets';
import Tabiques from '../../consts/tabiques';
import Select from '../../components/Select/Select';
import Input from '../../components/Input/Input';
import {getAnchos, getPrecio } from '../../services/sheets';


const Presupuesto = () => {
  const [tabique, setTabique] = useState(null);
  const [altura, setAltura] = useState(null);
  const [anchos, setAnchos] = useState([]);
  const [ancho, setAncho] = useState(null);
  const [planilla, setPlanilla] = useState("");
  const [precio, setPrecio] = useState(null);
  const [obra, setObra] = useState("");
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
        <Input
          type="text"
          placeholder="Obra"
          label="Obra"
          value={obra}
          handleChange={e=>setObra(e.target.value)}
        />
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