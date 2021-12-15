import React from 'react';
import {Alert, Modal, ModalBody, //ModalFooter
} from 'reactstrap';

const AlertMessage = ( props ) => {
    const {color, message} = props;
    
    return(
        <Modal {...props} className="no-padding" size="lg">
            <ModalBody className="no-padding ">
            <Alert color={color} className="no-alert">
                {message}
            </Alert>
            </ModalBody>
        </Modal>
    )
}

export default AlertMessage;