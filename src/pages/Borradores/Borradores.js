import React, {useContext, useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import MainContext from '../../context/MainContext';
import Table from '../../components/Table/Table';
import Panel from '../../components/Panel/Panel';
import Button from '../../components/Button/Button';
import './Borradores.scss';

const Borradores = () => {
  const [borradores, setBorradores] = useState([]);
  const [lista, setLista] = useState([]);
  const {user} = useContext(MainContext);

  useEffect(()=>{
    const borradores = JSON.parse(localStorage.getItem("borradores"));
    if(!borradores) return;
    setBorradores(borradores);
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

  const deleteBorrador = data => {
    const clon = [...borradores];
    const index = clon.findIndex(borrador => borrador.datos.nroPresupuesto === data.nroPresupuesto);
    if(index === -1) return;
    clon.splice(index, 1);
    setBorradores(clon);
    localStorage.setItem("borradores", JSON.stringify(clon));
  };

  if(user.roles.indexOf('cotizador') === -1) return (<div>No tenes permiso para estar aca</div>);
  return (
    <Panel title="Borradores">
      <Table
        columns={['Nro Presupuesto', 'Cliente']}
        data={lista}
        editLink={{to:"/borrador/", key: "nroPresupuesto"}}
        delete={deleteBorrador}
      />
    </Panel>
    );
}

export default Borradores;