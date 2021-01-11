/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    ButtonGroup, Button,FormGroup,Label,Input, Card, CardHeader, CardTitle, CardText,
    InputGroup, InputGroupAddon, InputGroupText}
     from "reactstrap";
import ReactDatetime from "react-datetime";
// import BookingTemplate from './BookingTemplate';



const ScheduleTemplate = (props) => {
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
      sch_line_code: 'KMTC',
      sch_vsl: 'KMSO',
      sch_vessel_name: 'KMTC SEOUL',
      sch_vessel_voyage: '2102S',
      sch_svc: 'FCL/FCL',
      sch_start_port_code: 'KRINC',
      sch_end_port_code: 'THLCH',
      sch_pol: 'KRINC',
      sch_pol_name: 'KOREA, INCHON',
      sch_pod: 'THLCH',
      sch_pod_name: 'THLCH THLCH THLCH',
      sch_call_sign: 'D5XY8',
      sch_mrn: '21HASL0083E',
      sch_movetype: '',
      sch_por: 'KRPUS',
      sch_por_name: 'KOREA, PUSAN',
      sch_pld: 'KRKAN',
      sch_pld_name: 'KOREA, KWANGYANG',
      sch_etd: '2021-01-05',
      sch_eta: '2021-03-05',
      sch_fdp: 'KRPPP',
      sch_fdp_name: 'KOREA, YOUNG MAN',
      sch_req: '2020-02-09 15:00',
      sch_led: '2020-02-10 13:00',
      sch_dct: '2020-02-05 12:00',
      sch_cct: '2020-02-28 12:00',
      sch_sr_closing_time: '2021-01-05 09:00',
      sch_ts_yn: 'Y'

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
                        <Label className="mb-0">SCHEDULE</Label>
                        {/* <i className="nc-icon nc-bullet-list-67" onClick={() => setOpen1(!open1)} /> */}
                        <Input type="select" name="carrier" id="carrier">
                            <option>KRPUS to CNCHH</option>
                            <option>KRKAN to CNCHH</option>
                            <option>KRINC to CNCHH</option>
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
                    <CardTitle>LINE : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.sch_line_code}</CardText>
                    <CardTitle>VESSEL : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.sch_vessel_name}</CardText>
                    <CardTitle>SERVICE : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.sch_svc}</CardText>
                    <CardTitle>POL : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.sch_pol}</CardText>
                    <CardTitle>POD : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.sch_pod}</CardText>
                    <CardTitle>ETD : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.sch_etd}</CardText>
                    <CardTitle>POR : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.sch_por}</CardText>
                    <CardTitle>PLD : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.sch_pld}</CardText>
                    <CardTitle>FDP : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.sch_fdp}</CardText>
                    </CardBody>
                    <CardBody onClick={toggle.bind(this, 'S')}>
                    <CardTitle>VESSEL CODE : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.sch_vsl}</CardText>
                    <CardTitle>VOYAGE : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.sch_vessel_voyage}</CardText>
                    <CardTitle>CALL SIGN : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.sch_call_sign}</CardText>
                    <CardTitle>POL NAME : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.sch_pol_name}</CardText>
                    <CardTitle>POD NAME : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.sch_pod_name}</CardText>
                    <CardTitle>ETA : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.sch_eta}</CardText>
                    <CardTitle>POR NAME : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.sch_por_name}</CardText>
                    <CardTitle>PLD NAME : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.sch_pld_name}</CardText>
                    <CardTitle>FDP NAME : </CardTitle>
                    <CardText tag="h5" className="font-weight-bold">{booking.sch_fdp_name}</CardText>
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
            <ModalHeader toggle={toggle}>Schedule</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <Row className="mb-3">
                            <Col className="col-12" xl="12" lg="12" sm="12">
                                <h5 className="mb-0">Vessel / Voyage Info</h5>
                            </Col>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">LINE</Label>
                                    <Input type="select" name="sch_line_code" id="sch_line_code" placeholder="LINE" value={booking.sch_line_code}>
                                        <option>APLU</option>
                                        <option>CMAL</option>
                                        <option>KMTC</option>
                                        <option>SKR</option>
                                        <option>ZIMU</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">VESSEL CODE</Label>
                                    <Input type="text" name="sch_vsl" id="sch_vsl" placeholder="VESSEL" value={booking.sch_vsl} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">VESSEL</Label>
                                    <Input type="text" name="sch_line_code" id="sch_line_code" placeholder="LINE" value={booking.sch_line_code}/>
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">VOYAGE</Label>
                                    <Input type="text" name="sch_vsl" id="sch_vsl" placeholder="VESSEL" value={booking.sch_vsl} />
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">SERVICE</Label>
                                    <Input type="text" name="sch_svc" id="sch_svc" placeholder="SERVICE" value={booking.sch_svc} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">CALL SIGN</Label>
                                    <Input type="text" name="sch_call_sign" id="sch_call_sign" placeholder="CALL SIGN" value={booking.sch_call_sign}/>
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">MRN</Label>
                                    <Input type="text" name="sch_mrn" id="sch_mrn" placeholder="MRN" value={booking.sch_mrn} />
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">MOVE</Label>
                                    <Input type="text" name="sch_movetype" id="sch_movetype" placeholder="MOVE" value={booking.sch_movetype} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">선적요청일자</Label>
                                    <Input type="text" name="sch_req" id="sch_req" placeholder="선적요청일자" value={booking.sch_req}/>
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">선적예정일시</Label>
                                    <Input type="text" name="sch_led" id="sch_led" placeholder="선적예정일시" value={booking.sch_led} />
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">반입마감일시</Label>
                                    <Input type="text" name="sch_cct" id="sch_cct" placeholder="반입마감일시" value={booking.sch_cct} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">서류마감일시</Label>
                                    <Input type="text" name="sch_dct" id="sch_dct" placeholder="서류마감일시" value={booking.sch_dct}/>
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">선적서류마감일시</Label>
                                    <Input type="text" name="sch_sr_closing_time" id="sch_sr_closing_time" placeholder="선적서류마감일시" value={booking.sch_sr_closing_time} />
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">환적 여부</Label>
                                    <Input type="text" name="sch_ts_yn" id="sch_ts_yn" placeholder="환적 여부" value={booking.sch_ts_yn} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col className="col-12" xl="12" lg="12" sm="12">
                                <h5 className="mb-0">Schedule Info</h5>
                            </Col>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">POL</Label>
                                    <Row>
                                        <Col xl="4" className="col-3 pr-1">
                                            <Input type="text" name="sch_pol" id="sch_pol" placeholder="POL" value={booking.sch_pol}/>
                                        </Col>
                                        <Col xl="8" className="col-9 pl-1">
                                            <Input type="text" name="sch_pol_name" id="sch_pol_name" placeholder="DETAIL" value={booking.sch_pol_name}/>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">POD</Label>
                                    <Row>
                                        <Col xl="4" className="col-3 pr-1">
                                            <Input type="text" name="sch_pod" id="sch_pod" placeholder="POL" value={booking.sch_pod}/>
                                        </Col>
                                        <Col xl="8" className="col-9 pl-1">
                                            <Input type="text" name="sch_pod_name" id="sch_pod_name" placeholder="DETAIL" value={booking.sch_pod_name}/>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">POR</Label>
                                    <Row>
                                        <Col xl="4" className="col-3 pr-1">
                                            <Input type="text" name="sch_por" id="sch_por" placeholder="POR" value={booking.sch_por} />
                                        </Col>
                                        <Col xl="8" className="col-9 pl-1">
                                            <Input type="text" name="sch_por_name" id="sch_por_name" placeholder="DETAIL" value={booking.sch_por_name}/>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">PLD</Label>
                                    <Row>
                                        <Col xl="4" className="col-3 pr-1">
                                            <Input type="text" name="sch_pld" id="sch_pld" placeholder="POL" value={booking.sch_pld}/>
                                        </Col>
                                        <Col xl="8" className="col-9 pl-1">
                                            <Input type="text" name="pldName" id="pldName" placeholder="DETAIL" value={booking.sch_pld_name}/>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">ETD</Label>
                                    <InputGroup className="date" id="etd">
                                        <ReactDatetime
                                            inputProps={{
                                            className: "form-control",
                                            placeholder: "Datetime Picker Here",
                                            }}
                                            dateFormat="YYYY-MM-DD"
                                            timeFormat={false}
                                            value={booking.sch_etd}
                                        />
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText>
                                                <span className="glyphicon glyphicon-calendar">
                                                <i className="fa fa-calendar" />
                                                </span>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">ETA</Label>
                                    <InputGroup className="date" id="eta">
                                        <ReactDatetime
                                            inputProps={{
                                            className: "form-control",
                                            placeholder: "Datetime Picker Here",
                                            }}
                                            dateFormat="YYYY-MM-DD"
                                            timeFormat={false}
                                            value={booking.sch_eta}
                                        />
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText>
                                                <span className="glyphicon glyphicon-calendar">
                                                <i className="fa fa-calendar" />
                                                </span>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">FINAL DESTINATION</Label>
                                    <Row>
                                        <Col xl="4" className="col-3 pr-1">
                                            <Input type="text" name="fdpCode" id="fdpCode" placeholder="FDP" value={booking.sch_fdp}/>
                                        </Col>
                                        <Col xl="8" className="col-9 pl-1">
                                            <Input type="text" name="fdpName" id="fdpName" placeholder="DETAIL" value={booking.sch_fdp_name}/>
                                        </Col>
                                    </Row>
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

export default ScheduleTemplate;