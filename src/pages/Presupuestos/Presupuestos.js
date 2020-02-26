import React from 'react';
import Table from '../../components/Table/Table';
import Panel from '../../components/Panel/Panel';
import Button from '../../components/Button/Button';
import './Presupuestos.scss';

const Presupuestos = () => {
  return (
    <Panel title="Presupuestos">
      <Table columns={['no', 'cliente']} data={[{no:1, cliente: "IRSA"}]} edit={e=>{}} />
      <footer className="presupuestos-footer">
        <Button handleClick={e=>{}} link="/presupuesto">Nuevo</Button>
      </footer>
    </Panel>
    );
}

export default Presupuestos;