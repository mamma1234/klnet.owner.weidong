/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    ButtonGroup, Button,FormGroup,Label,Input, Card, CardHeader, CardTitle, CardText,
    InputGroup, InputGroupAddon, InputGroupText}
     from "reactstrap";
import ReactDatetime from "react-datetime";
// import BookingTemplate from './BookingTemplate';



const DocumentTemplate = (props) => {
//   const {
//     Template,
//     title
//   } = props;

  useEffect(() => {
    console.log("렌더링 될 때마다 수행");
  },[]);

//   const divider = {
//     width: "100%",
//     borderTop: "1px solid",
//     paddingTop: "10px",
//     paddingBottom: "10px",
//   };

  // modal 창을 위한 state
  const [coll, setColl] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = (params) => {
      (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
      setOpen(!open);
  }
  // 중요내용 부모/자식 공유를 위한 state
//   const [vessel, setVessel] = React.useState("WEST SIDE");
//   const [voyage, setVoyage] = React.useState("52/W"); 
//   const [term, setTerm] = React.useState("CY -> CY");
//   const [pol, setPol] = React.useState("KRPUS");
//   const [etd, setEtd] = React.useState("20201225");
//   const [pod, setPod] = React.useState("CNCHH");
//   const [eta, setEta] = React.useState("20210110");
  const [booking, setBooking] = useState({
      docu_user_name: 'BTS',
      docu_user_tel: '070-2344-9911',
      docu_user_phone: '010-2828-9797',
      docu_user_fax: '02-1242-2451',
      docu_user_email: 'docu@klnet.co.kr',
      docu_tax_email: 'docu_tax@klnet.co.kr'
  });
  // 전체화면 css 적용을 위한 state
  const [clsNm, setClsNm] = useState("");
  return (
    <>
    <Row>
        <Col xl="12" lg="12">
            <Card className="no-transition">
                <CardHeader className="bg-white">
                    <FormGroup>
                    <ButtonGroup className="pull-right">
                        {coll ?
                            <Button close aria-label="Cancel" onClick={() => setColl(!coll)}>
                                <span aria-hidden>&ndash;</span>
                            </Button>
                            :
                            <Button close aria-label="Cancel" onClick={() => setColl(!coll)}>
                                <span aria-hidden>+</span>
                            </Button>
                        }
                        <Button close aria-label="Cancel" onClick={toggle.bind(this, 'S')}>
                            <span aria-hidden>&#9635;</span>
                        </Button>
                        <Button close aria-label="Cancel" onClick={toggle.bind(this, 'F')}>
                            <span aria-hidden>&#9726;</span>
                        </Button>
                    </ButtonGroup>
                        <Label className="mb-0">DOCUMENT</Label>
                        {/* <i className="nc-icon nc-bullet-list-67" onClick={() => setOpen1(!open1)} /> */}
                        <Input type="select" name="carrier" id="carrier">
                            <option>담당자 1</option>
                            <option>담당자 2</option>
                            <option>담당자 3</option>
                        </Input>
                    </FormGroup>
                </CardHeader>
            </Card>
        </Col>
    </Row>
        <Collapse isOpen={coll}>
        {/* <div style={divider}/> */}
            {/* 보이는 영역 */}
            <Card>
                <Row xl="6" lg="6" sm="12">
                    <CardBody onClick={toggle.bind(this, 'S')}>
                        <CardTitle>담당자 : </CardTitle>
                        <CardText tag="h5" className="font-weight-bold">{booking.docu_user_name}</CardText>
                        <CardTitle>Tel : </CardTitle>
                        <CardText tag="h5" className="font-weight-bold">{booking.docu_user_tel}</CardText>
                        <CardTitle>Phone : </CardTitle>
                        <CardText tag="h5" className="font-weight-bold">{booking.docu_user_phone}</CardText>
                        <CardTitle>Fax : </CardTitle>
                        <CardText tag="h5" className="font-weight-bold">{booking.docu_user_fax}</CardText>
                        <CardTitle>E-mail : </CardTitle>
                        <CardText tag="h5" className="font-weight-bold">{booking.docu_user_email}</CardText>
                        <CardTitle>Tax E-mail : </CardTitle>
                        <CardText tag="h5" className="font-weight-bold">{booking.docu_tax_email}</CardText>
                    </CardBody>
                </Row>
            </Card>
        </Collapse>
        {/* 모달 팝업 영역 
        xs : 한 줄
        sm : 576px 에서 다음 줄로 넘어감
        md : 768px
        lg : 992px
        xl : 1200px
        fluid : 뷰포트 전체의 너비
        */}
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="lg">
            <ModalHeader toggle={toggle}>Document</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <Row className="mb-3">
                            <Col className="col-12" xl="12" lg="12" sm="12">
                                <h5 className="mb-0">DOCUMENT</h5>
                            </Col>
                            <Col xl="12" lg="12" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Name</Label>
                                    <Input type="text" name="docu_user_name" id="docu_user_name" placeholder="담당자명" value={booking.docu_user_name}>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Tel</Label>
                                    <Input type="text" name="docu_user_tel" id="docu_user_tel" placeholder="Tel" value={booking.docu_user_tel} />
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Phone</Label>
                                    <Input type="text" name="docu_user_phone" id="docu_user_phone" placeholder="Phone" value={booking.docu_user_phone}/>
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Fax</Label>
                                    <Input type="text" name="docu_user_fax" id="docu_user_fax" placeholder="Fax" value={booking.docu_user_fax} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">E-mail</Label>
                                    <Input type="text" name="docu_user_email" id="docu_user_email" placeholder="E-mail" value={booking.docu_user_email}/>
                                </FormGroup>
                            </Col>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Tax E-mail</Label>
                                    <Input type="text" name="docu_tax_email" id="docu_tax_email" placeholder="Tax E-mail" value={booking.docu_tax_email} />
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>
                </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>Do Something</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>
    );
}

export default DocumentTemplate;