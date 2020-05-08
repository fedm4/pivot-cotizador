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
    const {firebase, user} = useContext(MainContext);
    const {id} = useParams();

    const [email, setEmail] = useState("");
    const [enableSave, setEnableSave] = useState(false);
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [role, setRole] = useState("");
    const [roles, setRoles] = useState([]);

    const handleInputChange = e => {
        switch(e.target.name) {
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
            case "cPassword":
                setCPassword(e.target.value);
        }
    };
    const handleRoleChange = e => {
        setRole(e.value);
    }

    useEffect(() => {
        if(!firebase) return;
        Role.getAll(firebase).then(roles => {
            const data = roles.reduce((acc, role) => {
                if(role.name !== "admin" || user.role === "admin") {
                    acc.push({label: capitalizeFLetter(role.name), value: role.name});
                }
                return acc;
            }, []);
            setRoles(data);
        });
    }, []);
    useEffect(() => {
        if(password.length >= 6
        && password === cPassword) {
            setEnableSave(true)
        } else {
            setEnableSave(false);
        }
    }, [password, cPassword]);
    return (
        <Panel title="Usuario">
            <form className="user-form">
                <Input
                    name="email" 
                    type="text"
                    className="grid-item hwidth-item"
                    placeholder="Email"
                    label="Email"
                    value={email}
                    handleChange={handleInputChange}
                />
                <Input
                    name="password" 
                    type="password"
                    className="grid-item hwidth-item"
                    placeholder="Contraseña"
                    label="Contraseña"
                    value={email}
                    handleChange={handleInputChange}
                />
                <Input
                    name="cPassword" 
                    type="password"
                    className="grid-item hwidth-item"
                    placeholder="Confirmar Contraseña"
                    label="Confirmar Contraseña"
                    value={email}
                    handleChange={handleInputChange}
                />
                <Select
                    className="hwidth-item"
                    label="Rol"
                    seleccionar={true}
                    onChange={handleRoleChange}
                    options={roles}
                />
            </form>
            <footer className="panel-footer">
                {
                    id ?
                    <Button color="green" className="ml-15" handleClick={e=>{}}>Modificar</Button>
                    :
                    <Button color="green" className="ml-15" disabled={enableSave ? '' : 'disabled'} handleClick={e=>alert("jofejo")}>Crear</Button>
                }
                <Button color="red" className="ml-15" handleClick={e=>{}} link="/usuarios">Volver</Button>
            </footer>
            
        </Panel>
    )
}

export default Usuarios;
