import React, {useState} from 'react';
import Modal from '../../../../components/Modal/Modal';
import Select from '../../../../components/Select/Select';
import Button from '../../../../components/Button/Button';
import Tabiques from '../../../../consts/tabiques';
import Input from '../../../../components/Input/Input';

const SistemaModal = ({isOpen, setIsOpen, state, dispatch}) => {
  const [referencia, setReferencia] = useState("");
  const [sistema, setSistema] = useState(null);
  const handleClick = e => {
    dispatch({type: 'setSistema', payload: {sistema, referencia}});
    setIsOpen(false);
  }
  return (
    <Modal isOpen={isOpen} closeModal={()=>setIsOpen(false)} height="200px">
      <Select
        className="fwidth-item"
        label="Tabique"
        seleccionar={true}
        onChange={e=>setSistema(e.target.value)}
        options={Tabiques}
      />
      <Input 
        className="fwidth-item"
        type="text"
        placeholder="Referencia"
        label="Referencia"
        handleChange={e=>setReferencia(e.target.value)}
      />
      <Button handleOnClick={handleClick}>Guardar</Button>
    </Modal>
  );
};

export default SistemaModal;