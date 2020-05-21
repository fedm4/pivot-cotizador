import React, {useState, useEffect, useContext} from 'react';
import moment from 'moment-timezone';
import {useParams} from 'react-router-dom';
import Table from '../../components/Table/Table';
import Panel from '../../components/Panel/Panel';
import Button from '../../components/Button/Button';
import './HistorialPresupuesto.scss';
import MainContext from '../../context/MainContext';
import useAuthBlocker from '../../hooks/useAuthBlocker/useAuthBlocker';
import useHistorialPresupuesto from '../../hooks/useHistorialPresupuesto/useHistorialPresupuesto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDownload} from '@fortawesome/free-solid-svg-icons';

const HistorialPresupuesto = () => {
  const [lista, setLista] = useState([]);
  const {pid} = useParams();
  const {setMessage}  = useContext(MainContext);
  const {isAuthorized, NotAuthorized} = useAuthBlocker('cotizador');
  const {
    getAllByPresupuestoId
  } = useHistorialPresupuesto();
  useEffect(() => {
    if(!isAuthorized) return;
    getAllByPresupuestoId(pid)
      .then(data => data.map(item => ({
        nroPresupuesto: item.presupuesto.datos.nroPresupuesto,
        cliente: item.presupuesto.datos.cliente,
        obra: item.presupuesto.datos.obra,
        fecha: moment(item.fecha).tz('America/Argentina/Buenos_Aires').format('DD-MM-YYYY hh:mm:ss'),
        version: item.version || null,
        url: (<a target="blank" href={item.url}><FontAwesomeIcon icon={faDownload} /></a>)
      })))
      .then(data => setLista(data))
      .catch(e => setMessage({message: e.message, type: 'error'}));
  }, [isAuthorized, setMessage]);
  
  if(!isAuthorized) return (<NotAuthorized />);
  return (
    <Panel title={`Historial de Presupuestos - ${pid}`}>
      <Table
        columns={['No Presupuesto', 'Cliente', 'Obra', 'Fecha', 'Version', "Descargar"]}
        data={lista}
        edit={false} 
      />
      <footer className="presupuestos-footer">
        <Button link="/presupuestos" color="red">Volver</Button>
      </footer>
    </Panel>
  );
}

export default HistorialPresupuesto;