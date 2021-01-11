/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import 'assets/css/App.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody,
    ButtonGroup, Button,FormGroup,Label,Input} from "reactstrap";
// import BookingTemplate from './BookingTemplate';

function Schedule(props) {
    const [vessel, setVessel] = useState("");
    const [eta, setEta] = useState("");
    const [selector, setSelector] = useState(0);
    return (            <Row>
        <Col xl="6" lg="6">
            <FormGroup>
                <Label className="mb-0">스케줄1</Label> 
                <Input type="text" 
                    name="contractNumber"
                    id="contractNumber"
                    placeholder="Enter Number..."
                    value={props.vessel}
                    onChange={(e)=>{props.setVessel(e.target.value)}}/>
            </FormGroup>                              
        </Col>
        <Col xl="6" lg="6">
            <FormGroup>
                <Label className="mb-0">스케줄2</Label> 
                <Input type="select" name="Team" id="Team" value={selector}
                onChange={(e)=>{setSelector(e.target.value)}}>
                    <option>AAAA</option>
                    <option>BBBBB</option>
                </Input>  
        </FormGroup>                          
        </Col>
        <Col xl="6" lg="6">
            <FormGroup>
                <Label className="mb-0">ETA</Label> 
                <Input type="text"
                    name="contractNumber"
                    id="contractNumber"
                    placeholder="Enter Number..."
                    value={props.eta}
                    onChange={(e)=>{setEta(e.target.value)}}/>
        </FormGroup>                          
        </Col>
        <Col xl="6" lg="6">
            <FormGroup>
                <Label className="mb-0">CARRIER NAME</Label> 
                <Input type="text" name="contractNumber" id="contractNumber" placeholder="CARRIER NAME..." />   
        </FormGroup>                          
        </Col>
        <Col xl="6" lg="6">
            <FormGroup>
                <Label className="mb-0">PERSON IN CHARGE</Label> 
                <Input type="text" name="contractNumber" id="contractNumber" placeholder="PERSON IN CHARGE..." />   
        </FormGroup>                          
        </Col>
        <Col xl="6" lg="6">
            <FormGroup>
                <Label className="mb-0">CARRIER TEL</Label> 
                <Input type="text" name="contractNumber" id="contractNumber" placeholder="CARRIER TEL..." />   
            </FormGroup>                          
        </Col>
        <Col xl="12" lg="12" sm="12" className ="bg-light">
            <Row>
                <Col className="col-4" xl="6" lg="6">
                    <FormGroup>
                        <Label  className="mb-0">CARRIER EMAIL</Label> 
                        <Input type="text" name="contractNumber" id="contractNumber" placeholder="CARRIER EMAIL..." />   
                    </FormGroup>
                </Col>
                <Col className="col-3" xl="6" lg="6">
                    <FormGroup>
                        <Label  className="mb-0">CARRIER ADDR</Label> 
                        <Input type="text" name="contractNumber" id="contractNumber" placeholder="Enter Number..." />   
                    </FormGroup>
                </Col>
                <Col className="col-4" xl="6" lg="6">
                    <FormGroup>
                        <Label  className="mb-0">FWD NAME</Label> 
                        <Input type="text" name="contractNumber" id="contractNumber" placeholder="Enter Number..." />   
                    </FormGroup>
                </Col>
                <Col className="col-3" xl="6" lg="6">
                    <FormGroup>
                        <Label  className="mb-0">FWD TEL</Label> 
                        <Input type="text" name="contractNumber" id="contractNumber" placeholder="FWD TEL" />   
                    </FormGroup>
                </Col>
                <Col className="col-4" xl="6" lg="6">
                    <FormGroup>
                        <Label  className="mb-0">FWD EMAIL</Label> 
                        <Input type="text" name="contractNumber" id="contractNumber" placeholder="FWD EMAIL..." />   
                    </FormGroup>
                </Col>
            </Row>
        </Col>
    </Row>);
}


const Schedule11 = (props) => {
//   const {
//     Template,
//     title
//   } = props;

  useEffect(() => {
    console.log("렌더링 될 때마다 수행");
  },[]);

  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);
  const [vessel, setVessel] = useState("");
  const [eta, setEta] = useState("");
  const [selector, setSelector] = useState(0);
  return (
    <>
        <ButtonGroup className="pull-right">
            <Button close aria-label="Cancel" onClick={toggle} className="pull-right">
                <span aria-hidden>+</span>
            </Button>
        </ButtonGroup>
        <Row>CARRIER TEMPLATE</Row>
        {/* 보이는 영역 */}


        <Schedule
            vessel={vessel}
            setVessel={setVessel}
            eta={eta}
            setEta={setEta}
        />


        {/* 모달 팝업 영역 */}
        <Modal isOpen={open} toggle={toggle} className="modal-content custom-modal">
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <Schedule
                            vessel={vessel}
                            setVessel={setVessel}
                            eta={eta}
                            setEta={setEta}
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

export default Schedule11;