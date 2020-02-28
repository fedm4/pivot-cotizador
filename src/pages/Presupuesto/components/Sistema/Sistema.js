import React, {useState} from 'react';
import {getTabiqueLabel} from '../../../../consts/tabiques';
import './Sistema.scss';
import useMinimizer from '../../../../hooks/useMinimizer';
import Table from '../../../../components/Table/Table';
import Button from '../../../../components/Button/Button';
import ModuloModal from '../ModuloModal/ModuloModal';

const Sistema = ({sistema, dispatch}) => {
  const [moduloModal, setModuloModal] = useState(false);
  const {hiddenClass, toggleHidden, Icon} = useMinimizer(false);
  return (
    <section className={`section-sistema ${hiddenClass}`}>
      <h3 className="title">
        {getTabiqueLabel(sistema.sistema)} - {sistema.referencia}
        <Icon />
      </h3>
      <Table
        delete={true}
        columns={["Modulo", "Cantidad", "Alto", "Ancho", "Variable", "Precio Unitario", "Precio Final"]}
        data={sistema.modulos}
      />
      <div className="flex justify-flex-end flex-align-center mt-25">
        <Button
          handleOnClick={()=>{setModuloModal(true)}}
        >Agregar Modulo</Button>
      </div>
      <ModuloModal dispatch={dispatch} sistema={sistema} isOpen={moduloModal} setIsOpen={setModuloModal} />
    </section>
  );
};

export default Sistema;