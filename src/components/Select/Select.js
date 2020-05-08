import React, {useEffect} from 'react';
import ReactSelect from 'react-select';

import './Select.scss';

const Select = ({label, name, onChange, options, className, _value}) => {
  const style = {
    control: base => ({
      ...base,
      height: 30,
      minHeight: 30,
      marginTop: "5px"
    }),
    valueContainer: (base) => ({
      ...base,
      fontSize: "13.3333px",
      marginTop: "-2px"
    }),
    dropdownIndicator: base => ({
      ...base,
      padding: "4px"
    })
  };
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
                styles={style}
                disabled={options.length === 0?"disabled":""}
            />
    </label>
  );
};

export default Select;
