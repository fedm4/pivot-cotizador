import React, {useContext, useState} from 'react';
import {animated, useSpring} from 'react-spring';

import Input from '../Input/Input';
import Button from '../Button/Button';
import MainContext from './../../context/MainContext';
import './LoginForm.scss';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {firebase} = useContext(MainContext);

    const doLogin = () => firebase.signInEmail(email, password);

    const formProps = useSpring({
        top: '15vh',
        from : {top: '-40vh'},
        delay: '0.5s'
    });

    return (
        <React.Fragment>
            <div className="overlay"></div>
            <animated.form style={formProps} id="login-form">
                <header className="login-header">
                    <h1>Login</h1>
                </header>
                <div className="inputs-container">
                    <Input value={email}
                        handleChange={e => setEmail(e.target.value)}
                        label="Email"
                        placeholder="email@pivot.com.ar"
                        type="email"
                        className="login-input"
                        name="email"
                    />
                    <Input value={password}
                        handleChange={e => setPassword(e.target.value)}
                        label="Password"
                        placeholder="Password"
                        type="password"
                        className="login-input"
                        name="password"
                    />
                    <Button
                        handleOnClick={doLogin}
                        color="green"
                        className="login-button"
                    >
                        Ingresar
                    </Button>
                </div>
            </animated.form>
        </React.Fragment>
    )
}

export default LoginForm;
