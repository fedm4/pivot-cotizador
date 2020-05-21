import React from 'react';
import SectionCard from './components/SectionCard/SectionCard';
import UsuariosIcon from './img/usuarios.svg';
import CotizadorIcon from './img/cotizador.svg';
import TesoreriaIcon from './img/tesoreria.svg';

import './MainScreen.scss';

export default () => {

    return (
        <section className="main-screen">
            <SectionCard icon={UsuariosIcon} title="Usuarios" to="/usuarios" />
            <SectionCard icon={CotizadorIcon} title="Presupuestos" to="/presupuestos" />
            <SectionCard icon={TesoreriaIcon} title="Tesorería" to="/tesoreria" />
        </section>
    );
};
