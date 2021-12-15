/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import 'assets/css/App.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    ButtonGroup, Button,FormGroup,Label,Input, Card, CardHeader, CardTitle, CardText} from "reactstrap";
// import BookingTemplate from './BookingTemplate';



const CarrierTemplate = (props) => {
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
  const [carrierKname, setCarrierKname] = React.useState("위동해운(주)");
  const [carrierName, setCarrierName] = React.useState("WDF");
  const [carrierCode, setCarrierCode] = React.useState("WDFC");
  const [carrierTel, setCarrierTel] = React.useState("02-3706-5114");
  const [carrierEmail, setCarrierEmail] = React.useState("ADMIN@HDMU.COM");
  const [carrierFax, setCarrierFax] = React.useState("02-734-8496");
  const [manager, setManager] = React.useState("홍길동");
  const [carrierAddress, setCairrerAddress] = React.useState("서울특별시 종로구 율곡로 194 현대그룹빌딩");
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
                            <Label className="mb-0">CARRIER</Label>
                            {/* <i className="nc-icon nc-bullet-list-67" onClick={() => setOpen1(!open1)} /> */}
                            <Input type="select" >
                                <option>위동해운</option>
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
                    <Col xl="12" lg="12">
                        <Card>
                            <CardBody onClick={toggle.bind(this, 'S')}>
                            <CardTitle>Carrier Name : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{carrierName}</CardText>
                            <CardTitle>Carrier Code : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{carrierCode}</CardText>
                            <CardTitle>Carrier KName : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{carrierKname}</CardText>
                            <CardTitle>Tel : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{carrierTel}</CardText>
                            <CardTitle>Email : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{carrierEmail}</CardText>
                            <CardTitle>Fax : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{carrierFax}</CardText>
                            <CardTitle>Manager : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{manager}</CardText>
                            <CardTitle>Address : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{carrierAddress}</CardText>
                            </CardBody>
                        </Card>                     
                    </Col>
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
            <ModalHeader toggle={toggle}>Carrier</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
                    <Row>
                        <Col xl="4" lg="4">
                            <FormGroup>
                                <Input type="text" placeholder="Carrier Code" defaultValue={carrierCode} onChange={(e) => setCarrierCode(e.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col xl="4" lg="4">
                            <FormGroup>
                                <Input type="text" placeholder="Carrier Name" defaultValue={carrierName} onChange={(e) => setCarrierName(e.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col xl="4" lg="4">
                            <FormGroup>
                                <Input type="text" placeholder="Carrier Korean Name" defaultValue={carrierKname} onChange={(e) => setCarrierKname(e.target.value)} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl="4" lg="4">
                            <FormGroup>
                                <Input type="text" placeholder="Tel" defaultValue={carrierTel} onChange={(e) => setCarrierTel(e.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col xl="4" lg="4">
                            <FormGroup>
                                <Input type="text" placeholder="Email" defaultValue={carrierEmail} onChange={(e) => setCarrierEmail(e.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col xl="4" lg="4">
                            <FormGroup>
                                <Input type="text" placeholder="Fax" defaultValue={carrierFax} onChange={(e) => setCarrierFax(e.target.value)} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className ="bg-light">
                        <Col xl="4" lg="4">
                            <FormGroup>
                                <Input type="text" placeholder="Manager" defaultValue={manager} onChange={(e) => setManager(e.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col xl="8" lg="8">
                            <FormGroup>
                                <Input type="text" placeholder="Address" defaultValue={carrierAddress} onChange={(e) => setCairrerAddress(e.target.value)} />
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

export default CarrierTemplate;