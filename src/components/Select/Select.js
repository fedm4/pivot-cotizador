import React, {useState} from 'react';
import ReactSelect from 'react-select';
import Skeleton from 'react-loading-skeleton';

import './Select.scss';

const Select = ({label, name, onChange, options, className, _value, skeleton}) => {
  const [value, setValue] = useState(_value ? _value : null);
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
  const handleChange = e => {
    setValue(e.value);
    onChange(e);
  };

  return(
    <label className={className}>
          <span>{label}</span>
          {
            skeleton ? 
            <Skeleton height={30} />
            :
            <ReactSelect
                  className="select"
                  name={name}
                  onChange={handleChange}
                  options={options}
                  placeholder="Seleccionar"
                  value={{label: value, value}}
                  styles={style}
                  disabled={options.length === 0?"disabled":""}
              />
          }
    </label>
  );
};

export default Select;
