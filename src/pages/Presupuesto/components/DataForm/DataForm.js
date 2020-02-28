import React, {useState} from 'react';
import Input from '../../../../components/Input/Input';

import './DataForm.scss';

const DataForm = ({state, dispatch}) => {
  const handleClick = e =>dispatch({type:'setData', payload: e.target.value, key: e.target.name});
  return (
    <div className="data-form">
      <Input
        name="cliente" 
        type="text"
        className="grid-item"
        placeholder="Cliente"
        label="Cliente"
        handleChange={handleClick}
      />
      <Input
        type="text"
        name="referencia"
        className="grid-item"
        placeholder="Referencia"
        label="Referencia"
        handleChange={handleClick}
      />
      <Input
        type="text"
        name="destinatario"
        className="grid-item"
        placeholder="Destinatario"
        label="Destinatario"
        handleChange={handleClick}
      />
      <Input
        type="email"
        name="email"
        className="grid-item"
        placeholder="Email"
        label="Email"
        handleChange={handleClick}
      />
      <Input
        type="text"
        name="domicilio"
        className="grid-item"
        placeholder="Domicilio"
        label="Domicilio"
        handleChange={handleClick}
      />
      <Input
        type="text"
        name="nroPresupuesto"
        className="grid-item"
        placeholder="N° de Presupuesto"
        label="N° de Presupuesto"
        handleChange={handleClick}
      />
      <Input
        className="grid-item"
        type="text"
        name="telefono"
        placeholder="Telefono"
        label="Telefono"
        handleChange={handleClick}
      />
      <Input
        className="grid-item"
        type="text"
        name="obra"
        placeholder="Obra"
        label="Obra"
        handleChange={handleClick}
      />
      <Input
        className="grid-item"
        type="text"
        name="titulo"
        placeholder="Titulo"
        label="Titulo"
        handleChange={handleClick}
      />
      <label className="fwidth-item">
        <span>Bajada / Texto General</span>
        <textarea onChange={e=>dispatch({type:'setData', payload: e.target.value, key: 'bajada'})}></textarea>
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