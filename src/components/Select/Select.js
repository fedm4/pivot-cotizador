import React, {useEffect} from 'react';
import ReactSelect from 'react-select';

import './Select.scss';

const Select = ({label, name, onChange, options, className, _value}) => {
  useEffect(()=>console.log(options), [options]);
  return(
    <label className={className}>
          <span>{label}</span>
          <ReactSelect
                className="select"
                name={name}
                onChange={onChange}
                options={options}
                placeholder="Seleccionar"
                value={_value}
                disabled={options.length === 0?"disabled":""}
            />
    </label>
  );
};

export default Select;
