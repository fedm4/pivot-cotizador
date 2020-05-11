import React, {useEffect} from 'react';
import ReactSelect from 'react-select';
import Skeleton from 'react-loading-skeleton';

import './Select.scss';

const Select = ({label, name, onChange, options, className, _value, skeleton}) => {
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
  useEffect(()=>console.log(_value), [_value]);
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
                  onChange={onChange}
                  options={options}
                  placeholder="Seleccionar"
                  value={{label: _value, value: _value}}
                  styles={style}
                  disabled={options.length === 0?"disabled":""}
              />
          }
    </label>
  );
};

export default Select;
