/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    ButtonGroup, Button,FormGroup,Label,Input, Card, CardHeader, CardTitle, CardText} from "reactstrap";
// import BookingTemplate from './BookingTemplate';



const ForwarderTemplate = (props) => {
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
  const [booking, setBooking] = useState({
      fwd_name1: 'SGE',
      fwd_name2: 'SAMSONG ELECTRONICS INC.',
      fwd_code: 'SGE',
      fwd_user_name: 'KIM KIL DONG',
      fwd_user_tel: '02-2315-2318',
      fwd_user_email: 'kildong@samsong.co.kr',
      fwd_address1: 'RG ELETRONICS INC RG TWIN TOWERS',
      fwd_address2: '5 Floor',
      fwd_address3: '',
      fwd_address4: '',
      fwd_address5: '',
      fwd_user_dept: '',
      fwd_user_fax: '02-211-2458',
      fwd_payment_type: 'CARD'
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
                            <Label className="mb-0">FORWARDER</Label>
                            {/* <i className="nc-icon nc-bullet-list-67" onClick={() => setOpen1(!open1)} /> */}
                            <Input type="select" name="carrier" id="carrier">
                                <option>SAMSONG ELECTRONICS</option>
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
                            <CardTitle>Forwarder Name1 : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.fwd_name1}</CardText>
                            <CardTitle>Forwarder Name2 : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.fwd_name2}</CardText>
                            <CardTitle>Forwarder Code : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.fwd_code}</CardText>
                            <CardTitle>Name : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.fwd_user_name}</CardText>
                            <CardTitle>Tel : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.fwd_user_tel}</CardText>
                            <CardTitle>E-mail : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.fwd_user_email}</CardText>
                            <CardTitle>Fax : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.fwd_user_fax}</CardText>
                            <CardTitle>Address : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.fwd_address1}</CardText>
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
            <ModalHeader toggle={toggle}>Forwarder</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <Row>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Forwarder Name1</Label>
                                    <Input type="text" name="fwd_name1" id="fwd_name1" placeholder="Forwarder Name1" value={booking.fwd_name1} />
                                </FormGroup>
                            </Col>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Forwarder Code</Label>
                                    <Input type="text" name="fwd_code" id="fwd_code" placeholder="Forwarder Code" value={booking.fwd_code} />
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Forwarder Name2</Label>
                                    <Input type="text" name="fwd_name1" id="fwd_name2" placeholder="Forwarder Name2" value={booking.fwd_name2}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Name</Label>
                                    <Input type="text" name="fwd_user_name" id="fwd_user_name" placeholder="Name" value={booking.fwd_user_name} />
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Tel</Label>
                                    <Input type="text" name="fwd_user_tel" id="fwd_user_tel" placeholder="Tel" value={booking.fwd_user_tel} />
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">E-mail</Label>
                                    <Input type="text" name="fwd_user_email" id="fwd_user_email" placeholder="E-mail" value={booking.fwd_user_email} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Dept</Label>
                                    <Input type="text" name="fwd_user_dept" id="fwd_user_dept" placeholder="Dept" value={booking.fwd_user_dept} />
                                </FormGroup>
                            </Col>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Fax</Label>
                                    <Input type="text" name="fwd_user_fax" id="fwd_user_fax" placeholder="Fax" value={booking.fwd_user_fax} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl="6" lg="6" md="6">
                                <FormGroup>
                                    <Label className="mb-0">Address1</Label>
                                    <Input type="textarea" name="fwd_address1" id="fwd_address1" placeholder="ADDRESS1" value={booking.fwd_address1} className="text-area-2" maxLength="50"/>
                                </FormGroup>
                            </Col>
                            <Col xl="6" lg="6" md="6">
                                <FormGroup>
                                    <Label className="mb-0">Address2</Label>
                                    <Input type="textarea" name="fwd_address2" id="fwd_address2" placeholder="ADDRESS2" value={booking.fwd_address2} className="text-area-2" maxLength="50"/>
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

export default ForwarderTemplate;