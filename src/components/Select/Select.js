import React, {useEffect, useState} from 'react';
import ReactSelect from 'react-select';
import Creatable from 'react-select/creatable';
import Skeleton from 'react-loading-skeleton';

import './Select.scss';

const Select = ({label, name, onChange, options, className, _value, skeleton, allowCreate}) => {
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

  useEffect(() => {
    setValue(_value);
  }, [_value]);

  return(
    <label className={className}>
          <span>{label}</span>
          {
            skeleton ? 
            <Skeleton height={30} />
            :
            allowCreate ?
            <Creatable
                  className="select"
                  name={name}
                  onChange={handleChange}
                  options={options}
                  placeholder="Seleccionar"
                  value={{label: value, value}}
                  styles={style}
                  disabled={options.length === 0?"disabled":""}
            />
            :
            <ReactSelect
                  className="select"
                  name={name}
                  onChange={handleChange}
                  options={options}
                  placeholder="Seleccionar"
                  value={options.filter(option => option.value === value)}
                  styles={style}
                  disabled={options.length === 0?"disabled":""}
              />
          }
    </label>
  );
};

export default Select;
