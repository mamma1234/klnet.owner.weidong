import React from 'react';
import 'assets/css/App.css';
import {Modal,ModalHeader,ModalBody,ModalFooter,Button} from 'reactstrap';
export default function CustomModal(props) {
    const {isOpen,close,title,context,clsNm} = props;

    return (
        <>
        {/* classicModal */}
        <Modal isOpen={isOpen} toggle={close}
          size="lg"
          autoFocus={true}
          //centered={true}
        className={clsNm}
        >
        <ModalHeader toggle={close}>
          <span style={{fontWeight:'bold'}}>{title}</span></ModalHeader>
          <ModalBody className={clsNm}>   
          {context}               
          </ModalBody>
        <ModalFooter>
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
        </ModalFooter>
     </Modal>
      </>
    );
}