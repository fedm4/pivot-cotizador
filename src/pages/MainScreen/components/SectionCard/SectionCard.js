import React from 'react';
import {Link} from 'react-router-dom';
import './SectionCard.scss';

export default ({icon, title, to}) => {
    return (
        <Link className="section-card" to={to}>
            <img src={icon} className="section-card-icon" alt="section card icon" />
            <h2 className="section-card-title">{title}</h2>
        </Link>
    );
};
