import React, {useEffect, useState} from 'react';
import {animated, useSpring} from 'react-spring';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import './Modal.scss';

const Modal = ({isOpen, closeModal, contentCentered, children, height, type}) => {
   const [title, setTitle] = useState(null);
   const modalProps = useSpring({
        height: height+'px',
        from: {top: isOpen ? '-40vh': '15vh', delay: '0.5s'},
        to:{top: isOpen ? '15vh': '-40vh'},
        delay: '0.5s'
    });
    useEffect(() => {
      switch(type) {
        case "error":
          setTitle('Ups! Algo salió mal.');
          break;
        case "warning":
          setTitle('Info');
          break;
        case "success":
          setTitle('Exito!');
          break;
        default:
          setTitle(null);
      }
    }, [type]);
    if(!isOpen) return null;
    return (
      <React.Fragment>
        <div className="overlay"></div>
        <animated.section className={`modal`} style={modalProps}>
          <header className={`${type}`}>
            {title}     
            <button onClick={closeModal} type="button" className="close-icon">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </header>
          <article className={`content ${contentCentered ? 'center': ''}`}>
            {children}
          </article>
        </animated.section>
      </React.Fragment>
  );
};

export default Modal;
