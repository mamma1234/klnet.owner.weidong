/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import 'assets/css/App.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    ButtonGroup, Button,FormGroup,Label,Input, Card, CardHeader, CardTitle, CardText} from "reactstrap";
// import BookingTemplate from './BookingTemplate';



const ShipperTemplate = (props) => {
//   const {
//     Template,
//     title
//   } = props;

  useEffect(() => {
    console.log("렌더링 될 때마다 수행");
  },[]);

  // Collapse Flag
  const [coll, setColl] = useState(false);
  // modal 창을 위한 state
  const [open, setOpen] = useState(false);
  const toggle = (params) => {
      (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
      setOpen(!open);
  }
  // 중요내용 부모/자식 공유를 위한 state
  const [shipperName, setShipperName] = React.useState("RG ELECTRONICS INC.");
  const [shipperId, setShipperId] = React.useState("RGE");
  const [shipperPic, setShipperPic] = React.useState("KIM KIL DONG");
  const [shipperTel, setShipperTel] = React.useState("02-3706-5114");
  const [shipperEmail, setShipperEmail] = React.useState("ADMIN@HDMU.COM");
  const [shipperFax, setShipperFax] = React.useState("02-992-2321");
  const [shipperAddress, setShipperAddress] = React.useState("RG ELETRONICS INC RG TWIN TOWERS");
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
                            <Label className="mb-0">SHIPPER</Label>
                            {/* <i className="nc-icon nc-bullet-list-67" onClick={() => setOpen1(!open1)} /> */}
                            <Input type="select" >
                                <option>LG ELECTRONICS</option>
                            </Input>
                        </FormGroup>
                    </CardHeader>
                </Card>
            </Col>
        </Row>
        {/* 보이는 영역 */}
            <Row>
                <Col xl="12" lg="12">
                    <Collapse isOpen={coll}>
                        <Card>
                            <CardBody onClick={toggle.bind(this, 'S')}>
                            <CardTitle>Shipper Name : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{shipperName}</CardText>
                            <CardTitle>Shipper ID : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{shipperId}</CardText>
                            <CardTitle>Person in Charge : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{shipperPic}</CardText>
                            <CardTitle>Tel : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{shipperTel}</CardText>
                            <CardTitle>Email : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{shipperEmail}</CardText>
                            <CardTitle>Fax : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{shipperFax}</CardText>
                            <CardTitle>Address : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{shipperAddress}</CardText>
                            </CardBody>
                        </Card>
                    </Collapse>
                </Col>
            </Row>


        {/* 모달 팝업 영역 
        xs : 한 줄
        sm : 576px 에서 다음 줄로 넘어감
        md : 768px
        lg : 992px
        xl : 1200px
        fluid : 뷰포트 전체의 너비
        */}
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="lg">
            <ModalHeader toggle={toggle}>Shipper</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <Row>
                            <Col xl="4" lg="4">
                                <FormGroup>
                                    <Input type="text" placeholder="Shipper Name" defaultValue={shipperName} onChange={(e) => setShipperName(e.target.value)} />
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4">
                                <FormGroup>
                                    <Input type="text" placeholder="Shipper ID" defaultValue={shipperId} onChange={(e) => setShipperName(e.target.value)} />
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4">
                                <FormGroup>
                                    <Input type="text" placeholder="Person in Charge" defaultValue={shipperPic} onChange={(e) => setShipperPic(e.target.value)} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl="4" lg="4">
                                <FormGroup>
                                    <Input type="text" placeholder="Tel" defaultValue={shipperTel} onChange={(e) => setShipperTel(e.target.value)} />
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4">
                                <FormGroup>
                                    <Input type="text" placeholder="Email" defaultValue={shipperEmail} onChange={(e) => setShipperEmail(e.target.value)} />
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4">
                                <FormGroup>
                                    <Input type="text" placeholder="Fax" defaultValue={shipperFax} onChange={(e) => setShipperFax(e.target.value)} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl="12" lg="12">
                                <FormGroup>
                                    <Input type="text" placeholder="Address" defaultValue={shipperAddress} onChange={(e) => setShipperAddress(e.target.value)} />
                                </FormGroup>
                            </Col>
                        </Row>
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

export default ShipperTemplate;