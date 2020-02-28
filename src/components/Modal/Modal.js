import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import './Modal.scss';

const Modal = ({isOpen, closeModal, children}) => {
  
    if(!isOpen) return null;
    return (
      <section className="modal">
        <button onClick={closeModal} type="button" className="close-icon">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        {children}
      </section>
  );
};

export default Modal;