import React, {useContext, useEffect, useState} from 'react';
import Button from '../../components/Button/Button';
import Panel from '../../components/Panel/Panel';
import Table from '../../components/Table/Table';
import MainContext from '../../context/MainContext';
import User from '../../models/User';

const Usuarios = () => {
    const {firebase} = useContext(MainContext);
    const [lista, setLista] = useState([]);
    useEffect(() => {
        if(!firebase) return;
        User.getAll(firebase).then(data => setLista(data))
            .catch(err => {throw new Error(err)});
    }, []);
    useEffect(()=> console.log(lista), [lista]);
    return (
        <Panel title="Usuarios">
            <Table columns={['ID', 'email', "rol"]} data={lista} editLink={{to: '/usuario/', key: 'id'}} />
            <footer className="panel-footer">
                <Button color="green" className="ml-15" handleClick={e=>{}} link="/usuario">Nuevo</Button>
            </footer>
        </Panel>
    )
}

export default Usuarios;
