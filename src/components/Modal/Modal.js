import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import './Modal.scss';

const Modal = ({isOpen, closeModal, children, height, width}) => {
  
    if(!isOpen) return null;
    return (
      <div>
        <div className="overlay"></div>
        <section className="modal" style={{height, width}}>
          <button onClick={closeModal} type="button" className="close-icon">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          {children}
        </section>
      </div>
  );
};

export default Modal;