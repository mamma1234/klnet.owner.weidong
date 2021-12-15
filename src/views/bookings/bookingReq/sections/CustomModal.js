import React from 'react';
import {Modal,Button} from 'reactstrap';

export default function CustomModal(props) {
    const {open,close,title,context} = props;

    return (
        <>
        {/* classicModal */}
        <Modal isOpen={open} toggle={close}>
        <div className="modal-header">
          <button
            className="close"
            type="button"
            onClick={close}
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
            {context}
        </div>
        <div className="modal-footer">
        <div className="right-side">
            <Button className="btn-link" color="danger" type="button">
              적용
            </Button>
          </div>
          <div className="divider" />
          <div className="left-side">
            <Button
              className="btn-link"
              color="default"
              type="button"
              onClick={close}
            >
              취소
            </Button>
          </div>
          
        </div>
      </Modal>
      </>
    );
}