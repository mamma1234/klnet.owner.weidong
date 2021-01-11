/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import 'assets/css/App.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody,
    ButtonGroup, Button,FormGroup,Label,Input} from "reactstrap";
// import BookingTemplate from './BookingTemplate';

const ModalExample = (props) => {
  const {
    Template,
    title
  } = props;

  useEffect(() => {
    console.log("렌더링 될 때마다 수행");
  },[]);

  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);
  const [bkgNo, setBkgNo] = useState("");
  const [vessel, setVessel] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [selector, setSelector] = useState(0);
  const [bkgDate, setBkgDate] = useState("");
  const [voyage, setVoyage] = useState("");
  const [status, setStatus] = useState("");
  const [remark, setRemark] = useState("");
  return (
    <>
        <ButtonGroup className="pull-right">
            <Button close aria-label="Cancel" onClick={toggle} className="pull-right">
                <span aria-hidden>+</span>
            </Button>
        </ButtonGroup>
        <Row>{title}</Row>
        {/* 보이는 영역 */}
        <Row>
            <Template
                bkgNo={bkgNo}
                setBkgNo={setBkgNo}
                vessel={vessel}
                setVessel={setVessel}
                orderNo={orderNo}
                setOrderNo={setOrderNo}
                selector={selector}
                setSelector={setSelector}
                bkgDate={bkgDate}
                setBkgDate={setBkgDate}
                voyage={voyage}
                setVoyage={setVoyage}
                status={status}
                setStatus={setStatus}
                remark={remark}
                setRemark={setRemark}
                />
        </Row>
        {/* 모달 팝업 영역 */}
        <Modal isOpen={open} toggle={toggle} className="modal-content custom-modal">
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <Template
                            vessel={vessel}
                            setVessel={setVessel}
                            orderNo={orderNo}
                            setOrderNo={setOrderNo}
                            selector={selector}
                            setSelector={setSelector}
                            bkgDate={bkgDate}
                            setBkgDate={setBkgDate}
                            voyage={voyage}
                            setVoyage={setVoyage}
                            status={status}
                            setStatus={setStatus}
                            remark={remark}
                            setRemark={setRemark}
                            />

                    </CardBody>
                </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>
    );
}

export default ModalExample;