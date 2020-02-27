import React from 'react';

const Select = ({label, seleccionar, onChange, options}) => {
  return(
    <label>
          <span>{label}</span>
          <select onChange={e=>onChange(e)}>
            {
              seleccionar ?
              <option>- Seleccionar -</option>
              :
              null
            }
            {options.map(option => <option key={`${option.label}-${option.value}`} value={option.value}>{option.label}</option>)}
          </select>
        </label>
  );
};

export default Select;