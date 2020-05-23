import React, {useContext, useEffect, useState} from 'react';
import './Ingresos.scss';
import useIngreso from '../../hooks/useIngreso/useIngreso';
import useAuthBlocker from '../../hooks/useAuthBlocker/useAuthBlocker';
import MainContext from '../../context/MainContext';

import Panel from '../../components/Panel/Panel';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';

const Ingresos = () => {
    const {getAll} = useIngreso();
    const {isAuthorized, NotAuthorized} = useAuthBlocker('ingresos');
    const [lista, setLista] = useState([]);
    const {setMessage} = useContext(MainContext);

    const verAdjunto = (id) => {
        setMessage({message:'No implementado', type: 'error'});
    };

    useEffect(() => {
        getAll()
            .then(data => data.map(item => ({
                ...item, 
                adjuntos: (<Button className="link" handleClick={() => verAdjunto(item.id)}>Ver Adjuntos</Button>)
            })))
            .then(data => setLista(data))
            .catch(e => setMessage({message:e.message, type: 'error'}));
    }, []);

    if(!isAuthorized) return (<NotAuthorized />);
    return (
        <Panel title="Ingresos">
            <Table columns={[
                    'nombre', 
                    'monto',
                    'obra',
                    'fecha Creacion',
                    'fecha Pago',
                    'estado',
                    'referencia',
                    'adjuntos'
                ]}
                data={lista}
                editLink={{to: '/tesoreria/ingreso/', key: 'id'}}
                order={['nombre', 'monto', 'obra', 'fechaCreacion', 'fechaPago', 'estado', 'referencia', 'adjuntos']}
                timeFields={['fechaCreacion', 'fechaPago']}
            />
            <footer className="panel-footer">
                <Button color="green" className="ml-15" handleClick={e=>{}} link="/tesoreria/ingreso">Nuevo</Button>
            </footer>
        </Panel>
    )
}

export default Ingresos;
