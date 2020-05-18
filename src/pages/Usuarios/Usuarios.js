import React, {useContext, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import Button from '../../components/Button/Button';
import Panel from '../../components/Panel/Panel';
import Table from '../../components/Table/Table';
import MainContext from '../../context/MainContext';
import User from '../../models/User';

const Usuarios = () => {
    const {firebase, setMessage, user} = useContext(MainContext);
    const [lista, setLista] = useState([]);
    
    useEffect(() => {
        if(!firebase) return;
        User.getAll(firebase).then(data => setLista(data.map(item => ({id: item.id, email: item.email}))))
            .catch(err => {setMessage({message: err.message, type: 'error'})});
    }, []);
    
    if(user.roles.indexOf('usuarios') === -1) return (<div>No tenes permisos para acceder acas</div>);
    return (
        <Panel title="Usuarios">
            <Table columns={['ID', 'email']} data={lista} editLink={{to: '/usuario/', key: 'id'}} />
            <footer className="panel-footer">
                <Button color="green" className="ml-15" handleClick={e=>{}} link="/usuario">Nuevo</Button>
            </footer>
        </Panel>
    )
}

export default Usuarios;
