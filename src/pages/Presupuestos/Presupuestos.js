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
import Modal from '../../components/Modal/Modal';

const Presupuestos = () => {
  const [lista, setLista] = useState([]);
  const {
    loading,
    setMessage,
    handleAuthClick,
    handleSignOutClick,
    isGappsSignedIn
  }  = useContext(MainContext);
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
  }, []);
  
  if(!isAuthorized) return (<NotAuthorized />);
  if(!isGappsSignedIn) {
    return (
      <Modal
        isOpen={true}
        contentCentered={true}
        height={250}
        type="error"
        title="Conectar a Google Apps"
        overlay={false}
      >
        <Button type="button" borderless={true} handleOnClick={handleAuthClick} color="green" fullwidth={true}>
          Conectar
        </Button>
      </Modal>
    );
  }
  return (
    <Panel title="Presupuestos">
      <Table
        columns={['No Presupuesto', "Cliente", "Obra", "Título", "Historial"]}
        data={lista}
        editLink={{to:'/presupuesto/', key: 'id'}}
        loading={loading}
        exclude={['id']}
      />
      <footer className="presupuestos-footer">
        <Button color="green" className="ml-15" link="/presupuesto">Nuevo</Button>
      </footer>
    </Panel>
  );
}

export default Presupuestos;