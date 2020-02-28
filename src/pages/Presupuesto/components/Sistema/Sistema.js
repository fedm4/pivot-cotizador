import React from 'react';
import {getTabiqueLabel} from '../../../../consts/tabiques';
import './Sistema.scss';

const Sistema = ({sistema}) => {

  return (
    <section className="section-sistema">
      <h3>{getTabiqueLabel(sistema.sistema)} - {sistema.referencia}</h3>
    </section>
  );
};

export default Sistema;