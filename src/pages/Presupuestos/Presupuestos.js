import React, {useState, useEffect, useContext} from 'react';
import Table from '../../components/Table/Table';
import Panel from '../../components/Panel/Panel';
import Button from '../../components/Button/Button';
import './Presupuestos.scss';
import {Link} from 'react-router-dom';
import MainContext from '../../context/MainContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const Presupuestos = () => {
  const [lista, setLista] = useState([]);
  const {gapi}  = useContext(MainContext);
  useEffect(() => {
    const folderId = '1jGXdMGlHqCh4Zbewz9J-i1xOnTOLx4re';
    gapi.client.load('drive', 'v2', async ()=>{
      gapi.client.drive.files.list({
        q: `'${folderId}' in parents`
      }).then(response => {
        console.log(response);
        const data = response.result.items.map(item => {
          const [nroPresupuesto, cliente, fecha] = item.title.split('-');
          return {
            nroPresupuesto,
            cliente, 
            link: (<a href={`${item.alternateLink}`}><FontAwesomeIcon icon={faCopy} /></a>)
          }
        });
        setLista(data);
      });
    });
  }, []);
  return (
    <Panel title="Presupuestos">
      <Table columns={['No Presupuesto', 'Cliente', "Descargar"]} data={lista} edit={false} />
      <footer className="presupuestos-footer">
        <Button link="/borradores" color="yellow">Ver Borradores</Button>
        <Button color="green" className="ml-15" handleClick={e=>{}} link="/presupuesto">Nuevo</Button>
      </footer>
    </Panel>
    );
}

export default Presupuestos;