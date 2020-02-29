import React, {useState, useEffect} from 'react';
import Table from '../../components/Table/Table';
import Panel from '../../components/Panel/Panel';
import Button from '../../components/Button/Button';
import './Borradores.scss';

const Borradores = () => {
  const [borradores, setBorradores] = useState([]);
  const [lista, setLista] = useState([]);
  useEffect(()=>{
    setBorradores(JSON.parse(localStorage.getItem("borradores")));
  }, []);
  useEffect(()=>{
    const lista = borradores.map(borrador => {
      return {
        nroPresupuesto: borrador.datos.nroPresupuesto,
        cliente: borrador.datos.cliente
      };
    });
    setLista(lista);
  }, [borradores]);
  return (
    <Panel title="Borradores">
      <Table columns={['Nro Presupuesto', 'Cliente']} data={lista} editLink={{to:"/borrador/", key: "nroPresupuesto"}} />
    </Panel>
    );
}

export default Borradores;