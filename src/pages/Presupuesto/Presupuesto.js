import React, {useContext, useState, useEffect} from 'react';
import Panel from '../../components/Panel/Panel';
import Context from '../../context/MainContext';
import Spreadsheets from '../../consts/spreadsheets';

const getAnchos = async (gapi, setAnchos, planilla) => {
  try {
    if(!planilla) return;
    const results = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: planilla,
      range: 'DIVISORIOS 1,50!C23:C108',
    });
    console.log(results.result.values);
    const anchos = results.result.values.filter(item => item != "" && item != null);
    setAnchos(anchos);
  } catch (err) {
    throw err;
  }
};

const getPrecio = async (gapi, ancho, planilla, setPrecio) => {
  try {
    if(!planilla) return;
    const results = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: planilla,
      range: 'DIVISORIOS 1,50!C23:108',
    });
    console.log(results.result.values);
    const fila = results.result.values.filter(fila=> fila[0] == ancho);
    const item =fila[fila.length-1]; 
    console.log(item[item.length-1]);
    setPrecio(item[item.length-1]);
  } catch (err) {
    throw err;
  }
} 

const Presupuesto = () => {
  const [tabique, setTabique] = useState(null);
  const [altura, setAltura] = useState(null);
  const [anchos, setAnchos] = useState([]);
  const [ancho, setAncho] = useState(null);
  const [planilla, setPlanilla] = useState("");
  const [precio, setPrecio] = useState(null);
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
        <label>
          <span className="label"></span>
          <input type="text" />
        </label>
        <label>
          <span></span>
          <select onChange={e=>setTabique(e.target.value)}>
            <option>- Seleccionar -</option>
            <option value="bath32Macizos">Bath32 Macizos</option>
            <option value="bath32Reforzados">Bath32 Placas Reforzadas</option>
          </select>
        </label>
        <label>
          <span>Alto</span>
          <select onChange={e=>setAltura(e.target.value)}>
            <option>- Seleccionar -</option>
            <option>1.50</option>
          </select>
        </label>
        <label>
           <span>Ancho</span>
           <select onChange={e=>setAncho(e.target.value)}>
            {anchos.map(ancho => <option key={ancho} value={ancho}>{ancho}</option>)}
           </select>
        </label>
        <button type="button" onClick={e=>getPrecio(gapi, ancho, planilla, setPrecio)}>Buscar precios</button>
        <div>{precio}</div>
      </form>
    </Panel>
  )
};

export default Presupuesto;