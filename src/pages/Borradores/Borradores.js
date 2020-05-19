import React, {useContext, useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import MainContext from '../../context/MainContext';
import Table from '../../components/Table/Table';
import Panel from '../../components/Panel/Panel';
import Button from '../../components/Button/Button';
import './Borradores.scss';
import useAuthBlocker from '../../hooks/useAuthBlocker/useAuthBlocker';

const Borradores = () => {
  const [borradores, setBorradores] = useState([]);
  const [lista, setLista] = useState([]);
  const {user} = useContext(MainContext);
  const {isAuthorized, NotAuthorized} = useAuthBlocker('cotizador');

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

  if(!isAuthorized) return (<NotAuthorized />);
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