import React, {useContext, useEffect, useState} from 'react';
import {useParams, Redirect} from 'react-router-dom';

import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Panel from '../../components/Panel/Panel';
import MainContext from '../../context/MainContext';
import User from '../../models/User';
import './Usuario.scss';
import Role from '../../models/Role';
import MultiCheckbox from '../../components/MultiCheckbox/MultiCheckbox';
import useAuthBlocker from '../../hooks/useAuthBlocker/useAuthBlocker';

const Usuarios = () => {
    const {firebase, user, setMessage} = useContext(MainContext);
    const {id} = useParams();

    const [email, setEmail] = useState("");
    const [enableSave, setEnableSave] = useState(false);
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [roles, setRoles] = useState("");
    const [rolesList, setRolesList] = useState([]);
    const [display, setDisplay] = useState(false);
    const [saving, setSaving] = useState(false);
    const [back, setBack] = useState(false);

    const {isAuthorized, NotAuthorized} = useAuthBlocker('usuarios');


    const handleInputChange = e => {
        switch(e.target.name) {
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "cPassword":
                setCPassword(e.target.value);
                break;
            default:
                return;
        }
    };

    const createUser = async () => {
        const user = new User({email, roles});
        try {
            setSaving(true);
            await user.create(firebase, password);
            setBack(true);
        } catch (err) {
            setSaving(false);
            setMessage({message: err.message, type: 'error'});
        }

    };

    const updateUser = async () => {
        const user = new User({id, email, roles});
        try{
            setSaving(true);
            await user.update(firebase, id);
            setBack(true);
        } catch (err) {
            setSaving(false);
            setMessage({message: err.message, type: 'error'});
        }
    };

    const resetPassword = () => {
        firebase.resetPassword(email);
    };

    useEffect(() => {
        if(!firebase) return;
        Role.getAll(firebase).then(roles => {
            const data = roles.reduce((acc, role) => {
                if(role.name !== "admin" || user.role === "admin") {
                    acc.push(role.name);
                }
                return acc;
            }, []);
            setRolesList(data);
        })
        .catch(err => setMessage({message: err.message, type: 'error'}));

        if(id) {
            User.getById(firebase, id).then(user => {
                setEmail(user.email);
                setRoles(user.roles);
                setDisplay(true);
            })
            .catch(err => setMessage({message: err.message, type: 'error'}));
        } else {
            setDisplay(true);
        }
    }, [firebase, id, setMessage, user.role]);

    useEffect(() => {
        if(password.length >= 6
        && password === cPassword) {
            setEnableSave(true);
        } else {
            setEnableSave(false);
        }
    }, [password, cPassword]);

    if(!isAuthorized) return (<NotAuthorized />);
    if(back) return (<Redirect to="/usuarios" />);
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
                    skeleton={!display}
                />
                <MultiCheckbox
                    data={rolesList}
                    label="Roles"
                    values={roles}
                    setter={setRoles}
                    skeleton={!display}
                />
                {
                    id ? 
                    null:
                    <React.Fragment>
                        <Input
                            name="password" 
                            type="password"
                            className="grid-item hwidth-item"
                            placeholder="Contraseña"
                            label="Contraseña"
                            value={password}
                            handleChange={handleInputChange}
                        />
                        <Input
                            name="cPassword" 
                            type="password" 
                            className="grid-item hwidth-item"
                            placeholder="Confirmar Contraseña"
                            label="Confirmar Contraseña"
                            value={cPassword}
                            handleChange={handleInputChange}
                        />
                    </React.Fragment>
                }
            </form>
            <footer className="panel-footer">
                {
                    id ?
                    <React.Fragment>
                        <Button
                            color="green"
                            className="ml-15"
                            disabled={saving ? 'disabled' : ''}
                            saving={saving}
                            handleOnClick={updateUser}
                        >
                            Modificar
                        </Button>
                        <Button color="yellow" className="ml-15" handleOnClick={resetPassword}>Resetear Contraseña</Button>
                    </React.Fragment>
                    :
                    <Button color="green" className="ml-15" disabled={enableSave || !saving ? '' : 'disabled'} handleOnClick={createUser}>Crear</Button>
                }
                <Button color="red" className="ml-15" handleClick={e=>{}} link="/usuarios">Volver</Button>
            </footer>
            
        </Panel>
    )
}

export default Usuarios;
