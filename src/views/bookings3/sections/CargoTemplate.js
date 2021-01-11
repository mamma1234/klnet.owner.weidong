/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    ButtonGroup, Button,FormGroup,Label,Input, Card, CardHeader, CardTitle, CardText} from "reactstrap";
// import BookingTemplate from './BookingTemplate';



const CargoTemplate = (props) => {
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
      cargo_type: 'Dry',
      cargo_name: 'MAC CARGO',
      chargo_hs_code: 'SAMSONG ELECTRONICS INC.',
      cargo_pack_qty: '1',
      cargo_pck_type: '20',
      cargo_net_weight: '380',
      cargo_cbm: 'CBM',
      cargo_remark: '부재시 경비실에 맡겨주세요.',
      cargo_lcl_fcl: 'FCL',
      cargo_gross_weight: '200000'
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
                            <Label className="mb-0">CARGO</Label>
                            {/* <i className="nc-icon nc-bullet-list-67" onClick={() => setOpen1(!open1)} /> */}
                            <Input type="select" name="Cargo" id="Cargo">
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
                            <CardTitle>CARGO TYPE : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.cargo_type}</CardText>
                            <CardTitle>Name : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.cargo_name}</CardText>
                            <CardTitle>HS CODE : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.cargo_hs_code}</CardText>
                            <CardTitle>PACK QTY : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.cargo_pack_qty}</CardText>
                            <CardTitle>PACK TYPE : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.cargo_pack_type}</CardText>
                            <CardTitle>Net Weight : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.cargo_net_weight}</CardText>
                            <CardTitle>CBM : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.cargo_cbm}</CardText>
                            <CardTitle>FCL/LCL : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.cargo_lcl_fcl}</CardText>
                            <CardTitle>Gross Weight : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.cargo_gross_weight}</CardText>
                            <CardTitle>Remark : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.cargo_remark}</CardText>
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
            <ModalHeader toggle={toggle}>Cargo</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <Row>
                            <Col xl="6" lg="6" md="6">
                                <FormGroup>
                                    <Label className="mb-0">Cargo Type</Label>
                                    <Input type="select" name="cargo_type" id="cargo_type" placeholder="Y" value={booking.trans_self_yn}>
                                        <option>Dry</option>
                                        <option>HIGH CUBE</option>
                                        <option>REEFER</option>
                                        <option>REEFER HIGH CUBE</option>
                                        <option>TANK</option>
                                        <option>OPEN TOP</option>
                                        <option>FLAT RACT</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xl="6" lg="6" md="6">
                                <FormGroup>
                                    <Label className="mb-0">HS CODE</Label>
                                    <Input type="text" name="cargo_hs_code" id="cargo_hs_code" placeholder="HS CODE" value={booking.cargo_hs_code} />
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Name</Label>
                                    <Input type="text" name="cargo_name" id="cargo_name" placeholder="Cargo Name" value={booking.cargo_name} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">PACK QTY</Label>
                                    <Input type="text" name="cargo_pack_qty" id="cargo_pack_qty" placeholder="Pack Qty" value={booking.cargo_pack_qty} />
                                </FormGroup>
                            </Col>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">PACK_TYPE</Label>
                                    <Input type="select" name="cargo_pck_type" id="cargo_pck_type" placeholder="Y" value={booking.cargo_pck_type}>
                                        <option>선택</option>
                                        <option>위험물</option>
                                        <option>Flexi Bag</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Net Weight</Label>
                                    <Input type="text" name="cargo_net_weight" id="cargo_net_weight" placeholder="Net Weight" value={booking.cargo_net_weight} />
                                </FormGroup>
                            </Col>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Gross Weight</Label>
                                    <Input type="text" name="cargo_gross_weight" id="cargo_gross_weight" placeholder="Gross Weight" value={booking.cargo_gross_weight} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">FCL/LCL</Label>
                                    <Input type="text" name="cargo_lcl_fcl" id="cargo_lcl_fcl" placeholder="Fcl / Lcl" value={booking.cargo_lcl_fcl} />
                                </FormGroup>
                            </Col>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">CBM</Label>
                                    <Input type="text" name="cargo_cbm" id="cargo_cbm" placeholder="CBM" value={booking.cargo_cbm} />
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Remark</Label>
                                    <Input type="text" name="cargo_remark" id="cargo_remark" placeholder="Remark" value={booking.cargo_remark} />
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

export default CargoTemplate;