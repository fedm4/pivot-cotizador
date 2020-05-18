import React from 'react';
import Skeleton from 'react-loading-skeleton';

import './MultiCheckbox.scss';

const MultiCheckbox = ({data, label, values, setter, skeleton}) => {
    const handleChange = e => {
        if(e.target.checked) {
            setter([...values, e.target.value]);
        } else {
            console.log(values.filter(item => item != e.target.value));
            setter(values.filter(item => item != e.target.value));
        }
    };
    return (
        <section className="multicheckbox">
            <header className="multicheckbox-header">{label}</header>
            {
                skeleton ? 
                <Skeleton height={30}/>
                :
                data.map(item => (
                    <label className='multicheckbox-label' key={`${label}-${item}`}>
                        <input
                            onChange={handleChange}
                            type="checkbox"
                            value={item}
                            checked={ values.indexOf(item) !== -1 }
                        /> {item} 
                    </label>
                ))
            }
        </section>
    )
}

export default MultiCheckbox;
