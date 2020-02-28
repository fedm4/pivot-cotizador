import React from 'react';
import {getTabiqueLabel} from '../../../../consts/tabiques';
import './Sistema.scss';
import useMinimizer from '../../../../hooks/useMinimizer';

const Sistema = ({sistema}) => {
  const {hiddenClass, toggleHidden, Icon} = useMinimizer(false);
  return (
    <section className="section-sistema">
      <h3 className="title">
        {getTabiqueLabel(sistema.sistema)} - {sistema.referencia}
        <Icon />
      </h3>
    </section>
  );
};

export default Sistema;