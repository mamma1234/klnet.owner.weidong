import React from 'react';
import {Alert, Modal, ModalBody, ModalFooter} from 'reactstrap';

const AlertMessage = ( props ) => {
    const {isOpen, color, message, toggle} = props;
    return(
        <Modal isOpen={isOpen} toggle={toggle} className="no-padding" >
            <ModalBody className="no-padding ">
            <Alert className="no-alert" color={color?color:'success'}>
                {message}
            </Alert>
            </ModalBody>
        </Modal>
    )
}

export default AlertMessage;