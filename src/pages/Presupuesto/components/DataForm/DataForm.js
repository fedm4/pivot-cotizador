import React, {useState} from 'react';
import Input from '../../../../components/Input/Input';

import './DataForm.scss';

import useMinimizer from '../../../../hooks/useMinimizer';

const DataForm = ({state, dispatch}) => {
  const [hidden, setHidden] = useState(true);
  const {hiddenClass, toggleHidden, Icon} = useMinimizer(true);
  const handleChange = e =>dispatch({type:'setData', payload: e.target.value, key: e.target.name});
  return (
    <div className={`data-form ${hiddenClass}`}>
      <h3 className="title">
        Datos
        <Icon />
      </h3>
      <Input
        name="cliente" 
        type="text"
        className="grid-item"
        placeholder="Cliente"
        label="Cliente"
        value={state.datos.cliente}
        handleChange={handleChange}
      />
      <Input
        type="text"
        name="referencia"
        className="grid-item"
        placeholder="Referencia"
        label="Referencia"
        value={state.datos.referencia}
        handleChange={handleChange}
      />
      <Input
        type="text"
        name="destinatario"
        className="grid-item"
        placeholder="Destinatario"
        label="Destinatario"
        value={state.datos.destinatario}
        handleChange={handleChange}
      />
      <Input
        type="email"
        name="email"
        className="grid-item"
        placeholder="Email"
        label="Email"
        value={state.datos.email}
        handleChange={handleChange}
      />
      <Input
        type="text"
        name="domicilio"
        className="grid-item"
        placeholder="Domicilio"
        label="Domicilio"
        value={state.datos.domicilio}
        handleChange={handleChange}
      />
      <Input
        type="text"
        name="nroPresupuesto"
        className="grid-item"
        placeholder="N° de Presupuesto"
        label="N° de Presupuesto"
        value={state.datos.nroPresupuesto}
        handleChange={handleChange}
      />
      <Input
        className="grid-item"
        type="text"
        name="telefono"
        placeholder="Telefono"
        label="Telefono"
        value={state.datos.telefono}
        handleChange={handleChange}
      />
      <Input
        className="grid-item"
        type="text"
        name="obra"
        placeholder="Obra"
        label="Obra"
        value={state.datos.obra}
        handleChange={handleChange}
      />
      <Input
        className="grid-item"
        type="text"
        name="titulo"
        placeholder="Titulo"
        label="Titulo"
        value={state.datos.titulo}
        handleChange={handleChange}
      />
      <Input
        className="grid-item"
        type="text"
        name="marcacion"
        placeholder="1.25"
        label="Marcación"
        value={state.datos.marcacion}
        handleChange={handleChange}
      />
      <label className="fwidth-item">
        <span>Bajada / Texto General</span>
        <textarea value={state.datos.bajada} onChange={e=>dispatch({type:'setData', payload: e.target.value, key: 'bajada'})}></textarea>
      </label>
      <label className="fwidth-item">
        <span>Pie</span>
        <textarea value={state.datos.pie} onChange={e=>dispatch({type:'setData', payload: e.target.value, key: 'pie'})}>								
        </textarea>
      </label>
    </div>
  )
};
export default DataForm;