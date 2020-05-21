import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import Table from '../../components/Table/Table';
import Panel from '../../components/Panel/Panel';
import Button from '../../components/Button/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArchive} from '@fortawesome/free-solid-svg-icons';

import './Presupuestos.scss';
import MainContext from '../../context/MainContext';
import useAuthBlocker from '../../hooks/useAuthBlocker/useAuthBlocker';
import usePresupuesto from '../../hooks/usePresupuesto/usePresupuesto';

const Presupuestos = () => {
  const [lista, setLista] = useState([]);
  const {loading, setMessage}  = useContext(MainContext);
  const {isAuthorized, NotAuthorized} = useAuthBlocker('cotizador');
  const {getAll} = usePresupuesto();

  useEffect(() => {
    getAll()
      .then(data => data.map(item => ({
          id: item.id,
          noPresupuesto: item.datos.nroPresupuesto,
          cliente: item.datos.cliente,
          obra: item.datos.obra,
          titulo: item.datos.titulo,
          historial: <Link to={`/presupuesto/${item.id}/historial/`}><FontAwesomeIcon icon={faArchive} /></Link>
       }))
      )
      .then(data => setLista(data))
      .catch(e => setMessage({message: e.message, type: 'error'}));
  }, [getAll, setMessage]);
  
  if(!isAuthorized) return (<NotAuthorized />);
  return (
    <Panel title="Presupuestos">
      <Table
        columns={['Id', 'No Presupuesto', "Cliente", "Obra", "Título", "Historial"]}
        data={lista}
        editLink={{to:'/presupuesto/', key: 'id'}}
        loading={loading}
      />
      <footer className="presupuestos-footer">
        <Button color="green" className="ml-15" link="/presupuesto">Nuevo</Button>
      </footer>
    </Panel>
  );
}

export default Presupuestos;