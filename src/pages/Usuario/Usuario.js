import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Panel from '../../components/Panel/Panel';
import MainContext from '../../context/MainContext';
import User from '../../models/User';
import './Usuario.scss';
import Role from '../../models/Role';
import Select from '../../components/Select/Select';
import {capitalizeFLetter} from '../../helpers/string';

const Usuarios = () => {
    const {firebase} = useContext(MainContext);
    const {id} = useParams();

    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [roles, setRoles] = useState([]);

    const handleChange = e => {
        switch(e.target.name) {
            case "email":
                setEmail(e.target.value);
                break;
            case "role":
                setRole(e.value);
                break;
            default:
                throw new Error("Error!!");
        }
    };

    useEffect(() => {
        if(!firebase) return;
        Role.getAll(firebase).then(roles => {
            const data = roles.map(role => ({label: capitalizeFLetter(role.name), value: role.name}));
            setRoles(data);
        });
    }, []);
    return (
        <Panel title="Usuario">
            <form className="user-form">
                <Input
                    name="email" 
                    type="text"
                    className="grid-item"
                    placeholder="Email"
                    label="Email"
                    value={email}
                    handleChange={handleChange}
                />
                <Select
                    className="fwidth-item"
                    label="Rol"
                    seleccionar={true}
                    onChange={handleChange}
                    options={roles}
                />
            </form>
            <footer className="panel-footer">
                {
                    id ?
                    <Button color="green" className="ml-15" handleClick={e=>{}}>Modificar</Button>
                    :
                    <Button color="green" className="ml-15" handleClick={e=>{}}>Crear</Button>
                }
                <Button color="red" className="ml-15" handleClick={e=>{}} link="/usuarios">Volver</Button>
            </footer>
            
        </Panel>
    )
}

export default Usuarios;
