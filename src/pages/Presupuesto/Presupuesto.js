import React, {useContext, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Panel from '../../components/Panel/Panel';
import Context from '../../context/MainContext';
import {createPresupuestoFile } from '../../services/sheets';
import DataForm from './components/DataForm/DataForm';
import SistemaModal from './components/SistemaModal/SistemaModal';
import Button from '../../components/Button/Button';
import Sistema from './components/Sistema/Sistema';

import useAuthBlocker from '../../hooks/useAuthBlocker/useAuthBlocker';
import MainContext from '../../context/MainContext';
import usePresupuesto from '../../hooks/usePresupuesto/usePresupuesto';
import useHistorialPresupuesto from '../../hooks/useHistorialPresupuesto/useHistorialPresupuesto';

const Presupuesto = () => {
  const {id: paramId} = useParams();
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
    state,
    id,
    update
  } = usePresupuesto(paramId);
  const {create: createHistorial} = useHistorialPresupuesto(paramId);

  useEffect(() => {
    dispatch({type: 'setPrecioTotal'});
  }, [state.datos.marcacion, dispatch])

  useEffect(() => {
    if(paramId) {
      getById()
        .catch(e => setMessage({message: e.message, type: 'error'}));
    }
  }, []);

  const guardar = () => {
    setSaving(true);
    if(!id && !paramId) {
      create()
        .then(()=>setSaving(false))
        .then(()=>setMessage({message: 'Presupuesto guardado', type:'success'}))
        .catch(e => {
          setMessage({message: e.message, type: 'error'});
        });
    } else {
      update()
        .then(()=>setSaving(false))
        .then(() => setMessage({message: 'Presupuesto guardado', type:'success'}))
        .catch(e => setMessage({message: e.message, type:'error'}));
    }
  };

  const handleGenerarPresupuesto = async () => {
    setWriting(true);
    try{
      const url = await createPresupuestoFile(gapi, state);
      await createHistorial(id, url, state);
      setMessage({message: 'Presupuesto generado exitosamente', type: 'success'});
    } catch(err) {
      setMessage({message: err.message, type:'error'});
    }
    setWriting(false);
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
          <Button
            className="ml-15"
            color="red"
            link="/presupuestos"
          >Volver</Button>
        </div>
      </form>
    </Panel>
  )
};

export default Presupuesto;