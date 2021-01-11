/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    ButtonGroup, Button,FormGroup,Label,Input, Card, CardHeader, CardTitle, CardText,
    InputGroup, InputGroupAddon, InputGroupText}
     from "reactstrap";
import ReactDatetime from "react-datetime";
// import BookingTemplate from './BookingTemplate';



const BookingTemplate = (props) => {
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
  const [booking, setBooking] = useState({
      bkg_no: 'SITPULY004950G',
      bkg_date: '2021-01-05',
      user_no: 'JINO',
      insert_date: '2021-01-05 09:00',
      update_date: '2021-01-05 09:30',
      status_cus: 'SEND',
      send_date: '2021-01-05 09:30 30:01',
      sc_no: 'SITPULY004950G',
      res_bkg_no: 'SITPULY004950G',
      sending_count: '1',
      res_bkg_date: '2021-01-06',
      res_confirm_date: '2021-01-07',
      res_user_no: 'M112111',
      res_user_name: 'JINO',
      res_confirm_klnet_id: 'KLTEST01',
      res_remark: '이것은 부킹'
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
                        <Label className="mb-0">BOOKING</Label>
                        {/* <i className="nc-icon nc-bullet-list-67" onClick={() => setOpen1(!open1)} /> */}
                        <Input name="bookingNo" id="bookingNo" placeholder="Booking Number">
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
                    <CardTitle>Booking Number : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.bkg_no}</CardText>
                    <CardTitle>Booking Date : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.bkg_date}</CardText>
                    <CardTitle>입력자 : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.user_no}</CardText>
                    <CardTitle>입력일자 : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.insert_date}</CardText>
                    <CardTitle>수정일자 : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.update_date}</CardText>
                    <CardTitle>STATUS : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.status_cus}</CardText>
                    <CardTitle>전송일자 : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.send_date}</CardText>
                    <CardTitle>REMARK : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.res_remark}</CardText>
                </CardBody>
                <CardBody onClick={toggle.bind(this, 'S')}>
                    <CardTitle>선사부킹번호 : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.res_bkg_no}</CardText>
                    <CardTitle>송신차수 : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.sending_count}</CardText>
                    <CardTitle>선사부킹확정일자 : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.res_bkg_date}</CardText>
                    <CardTitle>선사부킹승인일자 : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.res_confirm_date}</CardText>
                    <CardTitle>선사부킹승인자 : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.res_user_name}</CardText>
                    <CardTitle>선사부킹승인 수신일자 : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.res_confirm_recv_date}</CardText>
                    <CardTitle>계약번호 : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.sc_no}</CardText>
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
            <ModalHeader toggle={toggle}>BOOKING</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <Row className="mb-3">
                            <Col className="col-12" xl="12" lg="12" sm="12">
                                <h5 className="mb-0">Booking Info</h5>
                            </Col>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Booking Number</Label>
                                    <Input type="text" name="bkg_no" id="bkg_no" placeholder="Booking Number" value={booking.bkg_no}/>
                                </FormGroup>
                            </Col>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Booking Date</Label>
                                    <Input type="text" name="bkg_date" id="bkg_date" placeholder="Booking Date" value={booking.bkg_date} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">등록자</Label>
                                    <Input type="text" name="user_no" id="user_no" placeholder="등록자" value={booking.user_no}/>
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">저장 일자</Label>
                                    <Input type="text" name="insert_date" id="insert_date" placeholder="저장 일자" value={booking.insert_date} />
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">수정 일자</Label>
                                    <Input type="text" name="update_date" id="update_date" placeholder="수정 일자" value={booking.update_date} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">현재 상태</Label>
                                    <Input type="text" name="status_cus" id="status_cus" placeholder="현재 상태" value={booking.status_cus}/>
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">송신 일자</Label>
                                    <Input type="text" name="send_date" id="send_date" placeholder="송신 일자" value={booking.send_date} />
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">계약 번호</Label>
                                    <Input type="text" name="sc_no" id="sc_no" placeholder="계약 번호" value={booking.sc_no} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col className="col-12" xl="12" lg="12" sm="12">
                                <h5 className="mb-0">Carrier Info</h5>
                            </Col>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">LINE Booking Number</Label>
                                    <Input type="text" name="res_bkg_no" id="res_bkg_no" placeholder="LINE Booking Number" value={booking.res_bkg_no}/>
                                </FormGroup>
                            </Col>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">송신 차수</Label>
                                    <Input type="text" name="sending_count" id="sending_count" placeholder="송신 차수" value={booking.sending_count} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">선사 부킹 확정 일자</Label>
                                    <Input type="text" name="res_bkg_date" id="res_bkg_date" placeholder="선사 부킹 확정 일자" value={booking.res_bkg_date}/>
                                </FormGroup>
                            </Col>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">선사 부킹 승인 일자</Label>
                                    <Input type="text" name="res_confirm_date" id="res_confirm_date" placeholder="송신 차수" value={booking.res_confirm_date} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">선사 부킹 승인자</Label>
                                    <Input type="text" name="res_user_name" id="res_user_name" placeholder="선사 부킹 승인자" value={booking.res_user_name}/>
                                </FormGroup>
                            </Col>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">선사 부킹 승인 수신 일자</Label>
                                    <Input type="text" name="res_confirm_recv_date" id="res_confirm_recv_date" placeholder="선사 부킹 승인 수신일자" value={booking.res_confirm_recv_date} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">화주부킹요청 KLNET ID</Label>
                                    <Input type="text" name="klnet_id" id="klnet_id" placeholder="화주부킹요청 KLNET ID" value={booking.klnet_id}/>
                                </FormGroup>
                            </Col>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">선사부킹승인 KLNET ID</Label>
                                    <Input type="text" name="res_confirm_klnet_id" id="res_confirm_klnet_id" placeholder="선사부킹승인 KLNET ID" value={booking.res_confirm_klnet_id} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xl="12" lg="12" md="12">
                                <FormGroup>
                                    <Label className="mb-0">선사승인 REMARK</Label>
                                    <Input type="text" name="res_remark" id="res_remark" placeholder="선사승인 REMARK" value={booking.res_remark}/>
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

export default BookingTemplate;