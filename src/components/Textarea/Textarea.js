import React from 'react';
import './Textarea.scss';

const Textarea = ({label, name, handleChange, value}) => {
    return (
        <label className="fwidth-item">
            <span>{label}</span>
            <textarea name={name} value={value} onChange={handleChange}></textarea>
        </label>
    )
}

export default Textarea;
