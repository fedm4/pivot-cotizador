import React, {useContext, useState, useReducer, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Panel from '../../components/Panel/Panel';
import Context from '../../context/MainContext';
import {createPresupuestoFile } from '../../services/sheets';
import DataForm from './components/DataForm/DataForm';
import SistemaModal from './components/SistemaModal/SistemaModal';
import Button from '../../components/Button/Button';
import Sistema from './components/Sistema/Sistema';
import PulseLoader from '../../components/PulseLoader/PulseLoader';

import useAuthBlocker from '../../hooks/useAuthBlocker/useAuthBlocker';
import MainContext from '../../context/MainContext';
import usePresupuesto from '../../hooks/usePresupuesto/usePresupuesto';

const Presupuesto = () => {
  const {id} = useParams();
  const {setMessage} = useContext(MainContext);
  const [sistemaModal, setSistemaModal] = useState(false);
  const [writing, setWriting] = useState(false);
  const [saving, setSaving] = useState(false);
  const {gapi} = useContext(Context);
  const {isAuthorized, NotAuthorized} = useAuthBlocker('cotizador');
  const {
    create,
    dispatch,
    getById,
    state} = usePresupuesto();


  useEffect(() => {
    dispatch({type: 'setPrecioTotal'});
  }, [state.datos.marcacion])

  const guardar = () => {
    setSaving(true);
    if(id) {
      create()
        .then(()=>setSaving(false))
        .catch(e => {
          setMessage({message: e.message, type: 'error'});
          setSaving(false);
        });
    } else {
      setMessage({message: 'Not implemented', type:'error'});
    }
  };

  const handleGenerarPresupuesto = async () => {
    setWriting(true);
    await createPresupuestoFile(gapi, state, setWriting);
  };

  if(!isAuthorized) return (<NotAuthorized />);
  return (
    <Panel title="Presupuesto">
      <form>
        <DataForm state={state} dispatch={dispatch}/>
        <SistemaModal
          isOpen={sistemaModal}
          setIsOpen={setSistemaModal}
          state={state}
          dispatch={dispatch} 
        />
        {
          state.sistemas.map((sistema, index) => <Sistema key={`${sistema.sistema}-${index}-${sistema.referencia}`} sistema={sistema} dispatch={dispatch}/>)
        }
        <div className="flex justify-flex-end flex-align-center">
          <h4>Precio Total: ${state.precioTotal}</h4>
        </div>
        <div className="flex justify-flex-end flex-align-center">
          <Button
            color="green"
            handleOnClick={()=>{setSistemaModal(true)}}
          >Agregar Sistema</Button>
          <Button
            className="ml-15"
            color="yellow"
            handleOnClick={guardar}
            saving={saving}
          >Guardar</Button>
          <Button
            disabled={writing?'disabled':''}
            className="ml-15"
            color="blue"
            handleOnClick={handleGenerarPresupuesto}
            saving={writing}
          >Generar Presupuesto</Button>
        </div>
      </form>
    </Panel>
  )
};

export default Presupuesto;