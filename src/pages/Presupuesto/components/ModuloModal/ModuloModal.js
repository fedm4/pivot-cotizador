import React, {useContext, useState, useEffect} from 'react';
import Context from '../../../../context/MainContext';
import Modal from '../../../../components/Modal/Modal';
import Select from '../../../../components/Select/Select';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import {getAnchos, getPrecio, getAltos } from '../../../../services/sheets';
import Spreadsheets from '../../../../consts/spreadsheets';

const ModuloModal = ({sistema, isOpen, setIsOpen, state, dispatch}) => {
  const [modulo, setModulo] = useState(null);
  const [cantidad, setCantidad] = useState(0);
  const [alto, setAlto] = useState(null);
  const [ancho, setAncho] = useState(null);
  const [variable, setVariable] = useState(null);
  const [precioUnitario, setPrecioUnitario] = useState(0);
  const [precioFinal, setPrecioFinal] = useState(0);
  
  const [modulos, setModulos] = useState([]);
  const [altos, setAltos] = useState([]);
  const [anchos, setAnchos] = useState([]);
  const [planilla, setPlanilla] = useState(null);

  const {gapi} = useContext(Context);

  useEffect(() => {
    setPlanilla(Spreadsheets[sistema].planilla);
    setModulos(Spreadsheets[sistema].modulos.map(mod=>({label:mod.modulo, value:mod.hoja})));
  }, []);

  useEffect(() => {
    if(modulo===null) return;
    getAltos(gapi, setAltos, planilla, modulo);
  }, [modulo]);

  //e=>getPrecio(gapi, ancho, planilla, setPrecio)
  const handleClick = e => {
    dispatch({type: 'setModulo', payload: {modulo,cantidad,alto,ancho,variable,precioUnitario,precioFinal}});
    setIsOpen(false);
  };
  
  return (
    <Modal isOpen={isOpen} closeModal={()=>setIsOpen(false)} height="200px">
      <Select
        label="Modulo"
        seleccionar={true}
        onChange={e=>setModulo(e.target.value)}
        options={modulos}
      />
      <Select
        label="Alto"
        seleccionar={true}
        onChange={e=>setAlto(e.target.value)}
        options={altos}
      />
      <Button handleOnClick={handleClick}>Guardar</Button>
    </Modal>
  );
};

export default ModuloModal;