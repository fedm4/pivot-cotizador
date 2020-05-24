import React from 'react';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import './Confirm.scss';

const Confirm = ({children, isOpen, closeModal, title, accept, cancel}) => {
    return (
        <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            title={title}
            contentCentered={true}
            type="error"
            height={250}
        >
            <div className="confirm-message">{children}</div>
            {
                accept.isLink ?
                <Button color="green" link={accept.action}>Aceptar</Button>
                :
                <Button color="green" handleOnClick={accept.action}>Aceptar</Button>
            }
            <Button color="red" className="ml-15" handleOnClick={cancel?cancel:closeModal}>Cancelar</Button>
        </Modal>
    )
}

export default Confirm;
