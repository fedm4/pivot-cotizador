import React from 'react';
import Table from '../../components/Table/Table';
import Panel from '../../components/Panel/Panel';
import Button from '../../components/Button/Button';
import './Presupuestos.scss';
import {Link} from 'react-router-dom';

const Presupuestos = () => {
  return (
    <Panel title="Presupuestos">
      <Table columns={['no', 'cliente']} data={[]} edit={e=>{}} />
      <footer className="presupuestos-footer">
        <Button link="/borradores" color="yellow">Ver Borradores</Button>
        <Button color="green" className="ml-15" handleClick={e=>{}} link="/presupuesto">Nuevo</Button>
      </footer>
    </Panel>
    );
}

export default Presupuestos;