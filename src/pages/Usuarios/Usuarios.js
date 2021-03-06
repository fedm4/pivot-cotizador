import React, {useContext, useEffect, useState} from 'react';
import Button from '../../components/Button/Button';
import Panel from '../../components/Panel/Panel';
import Table from '../../components/Table/Table';
import MainContext from '../../context/MainContext';
import User from '../../models/User';
import useAuthBlocker from '../../hooks/useAuthBlocker/useAuthBlocker';

const Usuarios = () => {
    const {firebase, setMessage} = useContext(MainContext);
    const [lista, setLista] = useState([]);
    const {isAuthorized, NotAuthorized} = useAuthBlocker('usuarios');
    
    useEffect(() => {
        if(!firebase) return;
        User.getAll(firebase).then(data => setLista(data.map(item => ({id: item.id, email: item.email}))))
            .catch(err => {setMessage({message: err.message, type: 'error'})});
    }, [firebase, setMessage]);
    
    if(!isAuthorized) return (<NotAuthorized />);
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
