import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileDownload} from '@fortawesome/free-solid-svg-icons';
import './Attachment.scss';

const Attachment = ({url, name}) => {
    return (
        <div className="attachment-container">
            <a className="attachment-link" href={url}><FontAwesomeIcon icon={faFileDownload} /></a>
            <span className="attachment-name">{name}</span>
        </div>
    )
}

export default Attachment;
