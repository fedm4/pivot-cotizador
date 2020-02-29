import React, {useState} from 'react';
import {getTabiqueLabel} from '../../../../consts/tabiques';
import './Sistema.scss';
import useMinimizer from '../../../../hooks/useMinimizer';
import Table from '../../../../components/Table/Table';
import Button from '../../../../components/Button/Button';
import ModuloModal from '../ModuloModal/ModuloModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

const Sistema = ({sistema, dispatch}) => {
  const [moduloModal, setModuloModal] = useState(false);
  const {hiddenClass, toggleHidden, Icon} = useMinimizer(false);

  const deleteModulo = (item) => {
    const index = sistema.modulos.findIndex(mod => {
      return mod.modulo === item.modulo &&
        mod.cantidad === item.cantidad &&
        mod.alto === item.alto &&
        mod.ancho === item.ancho;
    });
    
    if(index === -1) return;

    const clon = {...sistema};
    clon.modulos.splice(index, 1);
    dispatch({type:'deleteModulo', payload: clon});
  };

  return (
    <section className={`section-sistema ${hiddenClass}`}>
      <h3 className="title flex justify-space-between">
        <div>
          {getTabiqueLabel(sistema.sistema)} - {sistema.referencia}
          <Icon />
        </div>
        <Button
          color="red"
          handleOnClick={e=>dispatch({type:'deleteSistema', sistema: sistema.sistema, referencia: sistema.referencia})}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </h3>
      <Table
        delete={deleteModulo}
        columns={["Modulo", "Cantidad", "Alto", "Ancho", "Variable", "Precio Unitario", "Precio Final"]}
        data={sistema.modulos}
      />
      <div className="flex justify-flex-end flex-align-center mt-25">
        <Button
          color="green"
          handleOnClick={()=>{setModuloModal(true)}}
        >Agregar Modulo</Button>
      </div>
      <ModuloModal dispatch={dispatch} sistema={sistema} isOpen={moduloModal} setIsOpen={setModuloModal} />
    </section>
  );
};

export default Sistema;