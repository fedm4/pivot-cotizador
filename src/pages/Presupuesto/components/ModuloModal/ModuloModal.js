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
    setPlanilla(Spreadsheets[sistema.sistema].planilla);
    setModulos(Spreadsheets[sistema.sistema].modulos.map(mod=>({label:mod.modulo, value:mod.hoja})));
  }, []);

  useEffect(() => {
    if(modulo===null) return;
    getAltos(gapi, setAltos, planilla, modulo);
  }, [modulo]);

  useEffect(() => {
    if(alto === null) return;
    getAnchos(gapi, alto, setAnchos, planilla, modulo);
  }, [alto])

  useEffect(() => {
    if(ancho === null || alto === null) return;
    getPrecio(gapi, ancho, planilla, modulo, setPrecioUnitario, alto);
  }, [ancho, alto])

  useEffect(()=>{
    const variableFix = !variable ? 1 : variable;
    setPrecioFinal(cantidad * precioUnitario * variableFix);
  }, [cantidad, precioUnitario, variable]);

  //e=>getPrecio(gapi, ancho, planilla, setPrecio)
  const handleClick = e => {
    dispatch({type: 'setModulo', sistema, payload: {modulo,cantidad,alto,ancho,variable,precioUnitario,precioFinal}});
    setIsOpen(false);
  };
  
  return (
    <Modal isOpen={isOpen} closeModal={()=>setIsOpen(false)} height="450px">
      <Input 
        className="fwidth-item"
        type="text"
        placeholder="Cantidad"
        label="Cantidad"
        handleChange={e=>setCantidad(e.target.value)}
      />
      <Select
        className="fwidth-item"
        label="Modulo"
        seleccionar={true}
        onChange={e=>setModulo(e.target.value)}
        options={modulos}
      />
      <Select
        className="fwidth-item"
        label="Alto"
        seleccionar={true}
        onChange={e=>setAlto(e.target.value)}
        options={altos}
      />
      <Select
        className="fwidth-item"
        label="Ancho"
        seleccionar={true}
        onChange={e=>setAncho(e.target.value)}
        options={anchos}
      />
      <Input
        className="fwidth-item"
        type="text"
        placeholder="Variable"
        label="Variable"
        handleChange={e=>setVariable(e.target.value)}
      />
      <Button color="blue" handleOnClick={handleClick}>Guardar</Button>
    </Modal>
  );
};

export default ModuloModal;