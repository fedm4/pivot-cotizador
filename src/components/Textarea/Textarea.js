import React from 'react';
import Skeleton from 'react-loading-skeleton';
import './Textarea.scss';

const Textarea = ({label, name, handleChange, value, skeleton}) => {
    return (
        <label className="fwidth-item">
            <span>{label}</span>
            {
                skeleton ? 
                <Skeleton height={150} />
                :
                <textarea name={name} value={value} onChange={handleChange}></textarea>
            }
        </label>
    )
}

export default Textarea;
