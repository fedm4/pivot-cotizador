import React, {useState, useEffect, useContext} from 'react';
import Table from '../../components/Table/Table';
import Panel from '../../components/Panel/Panel';
import Button from '../../components/Button/Button';
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
      .then(data => {
        setLista(data);
      })
      .catch(e => setMessage({message: e.message, type: 'error'}));
  }, []);
  
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
        <Button link="/borradores" color="yellow">Ver Borradores</Button>
        <Button color="green" className="ml-15" handleClick={e=>{}} link="/presupuesto">Nuevo</Button>
      </footer>
    </Panel>
  );
}

export default Presupuestos;