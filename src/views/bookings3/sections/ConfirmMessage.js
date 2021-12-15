import React from 'react';
import {Modal, Button} from 'reactstrap';
import PropTypes from 'prop-types';

const ConfirmMessage = ( {
    onClose,
    message,
    title,
    confirmText,
    cancleText,
    buttonsComponent,
} ) => {
    // const { title, message, confirmText, cancelText } = props;
    // const [classic, setClassic] = React.useState(false);
    if ( buttonsComponent ) {
        const CustomComponent = buttonsComponent;
        buttonsComponent = <CustomComponent onClose={onClose} />;
    }
    return (
        <Modal isOpen toggle={()=>onClose(false)}>
            <div className="modal-header">
                <button
                    className="close"
                    type="button"
                    onClick={()=> onClose(false)}
                    >
                <span>×</span>
            </button>
                <h5
                    className="modal-title text-center"
                    id="exampleModalLabel"
                    >
                {title}
                </h5>
            </div>
            <div className="modal-body">
                {message}
            </div>
            <div className="modal-footer">
                <div className="left-side">
                    <Button
                        className="btn-link"
                        color="default"
                        type="button"
                        onClick={()=> onClose(true)}
                        >
                    {confirmText}
                    </Button>
                </div>
            <div className="divider" />
                <div className="right-side">
                    <Button className="btn-link"
                        color="danger"
                        type="button" 
                        onClick={()=> onClose(false)}>
                    {cancleText}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

ConfirmMessage.propTypes = {
    onClose: PropTypes.func.isRequired,
    message: PropTypes.node,
    title: PropTypes.node,
    confirmText: PropTypes.node,
    cancleText: PropTypes.node,
    buttonsComponent: PropTypes.func
}

export default ConfirmMessage;