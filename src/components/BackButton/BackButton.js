import React, {useState} from 'react';
import Button from '../Button/Button';
import Confirm from '../Confirm/Confirm';

const BackButton = ({link, enabled}) => {
    const [isOpen,setIsOpen] = useState(false);

    return (
        <React.Fragment>
        {
            enabled ?
            <React.Fragment>
                <Confirm
                    isOpen={isOpen}
                    closeModal={e => setIsOpen(false)}
                    title="Volver"
                    accept={{isLink: true, action: link}}
                >
                    Si vuelve atrás puede perder todos sus cambios sin guardar
                </Confirm>
                <Button color="red" handleOnClick={e => setIsOpen(true)} className="ml-15">Volver</Button>
            </React.Fragment>
            :
            <Button color="red" link={link} className="ml-15">Volver</Button>
        }
        </React.Fragment>
    )
}

export default BackButton;
