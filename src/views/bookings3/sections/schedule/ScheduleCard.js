/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    Button,FormGroup,Label,Input, Card, CardTitle, CardText,
    InputGroup, InputGroupAddon, InputGroupText, UncontrolledTooltip} from "reactstrap";
import ReactDatetime from "react-datetime";
import axios from "axios";
import Schedule from "./Schedule.js";
import ScheduleBookmark from "./ScheduleBookmark.js";
import AlertMessage from "../AlertMessage.js";



const ScheduleCard = (props) => {

    // modal 창을 위한 state
    const [coll, setColl] = useState(false);
    const [open, setOpen] = useState(false);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // ScheduleBookmark
    const [scheduleList, setScheduleList] = useState([]);
    // Alert을 위한 state
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState("success");
    const [message, setMessage] = useState("정상 처리되었습니다.");
    // Booking의 Schedule 정보
    const [booking, setBooking] = useState({});

    useEffect(() => {
        // 스케줄 Bookmark 목록조회
        selectBookingScheduleBookmark();
    },[]);

    useEffect(()=>{  
        // 초기 Seq와 현재 seq 다른 경우
        // console.log(booking.init_schedule_bookmark_seq, booking.schedule_bookmark_seq)
        if( booking.init_schedule_bookmark_seq != booking.schedule_bookmark_seq ) {
            // 스케줄 Bookmark로 booking의 스케줄 입력하기
            updateScheduleBookmarkOfBooking();
        }
    },[booking]);

    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        if( props.booking.bkg_no ) {
            // console.log("props:",props.booking);
            let bkg_no = props.booking.bkg_no;
            let bkg_date = props.booking.bkg_date;
            let status_cus = props.booking.status_cus;
            let sc_no = props.booking.sc_no;
            let user_no = props.booking.user_no;

            // Schedule Bookmark seq
            let schedule_bookmark_seq = props.booking.schedule_bookmark_seq;
            let init_schedule_bookmark_seq = props.booking.init_schedule_bookmark_seq;

            setBooking({...booking, 'bkg_no':bkg_no, 'bkg_date':bkg_date
                , 'status_cus':status_cus, 'sc_no':sc_no, 'user_no':user_no
                , 'schedule_bookmark_seq':schedule_bookmark_seq
                , 'init_schedule_bookmark_seq':init_schedule_bookmark_seq
            }); // 초기화 bookmark seq 값

            // 최초 조회하기
            selectScheduleOfBooking(props.booking);
        }
    },[props.booking]);

    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }
  
    const selectBookingScheduleBookmark = () => {
        axios.post(
            "/api/selectBookingScheduleBookmark"
            ,{ user_no: 'M000002' }
            ,{}
        ).then(
            setScheduleList([])
        ).then(
            res => setScheduleList(res.data)
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    const selectScheduleOfBooking = (booking) => {
        axios.post(
            "/api/selectScheduleOfBooking"
            ,{ user_no: 'M000002'
                , booking
            }
            ,{}
        ).then(
            // setScheduleList([])
        ).then(
            res => setBooking(res.data[0])
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    const updateScheduleBookmarkOfBooking = () => {
        axios.post(
            "/api/updateScheduleBookmarkOfBooking"
            ,{ user_no: 'M000002'
                , booking
            }
            ,{}
        ).then(
            
        ).then(
            res => {
                setBooking({...booking, 'init_schedule_bookmark_seq':booking.schedule_bookmark_seq});
                onDismiss("success", "정상 처리되었습니다.");
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    const fncUpdateScheduleOfBooking = (e) => {
        e.preventDefault();
        axios.post(
            "/api/updateScheduleOfBooking"
            ,{ user_no: 'M000002'
                , booking
            }
            ,{}
        ).then(
            res => {
                onDismiss("success", "정상 처리되었습니다.");
                setOpen(!open);
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Doucment select 선택할때
    const fncSelectSchedule = (e) => {
        //   console.log(e.target.value)
        // 선택
        if( 1 > e.target.value ) {
            // setBooking({});
            if ( coll ) {
                setColl(!coll)
            }
        // 그외 데이터인 경우
        } else {
            scheduleList.map((element, key)=>{
            if( e.target.value == element.schedule_bookmark_seq) {
                // select로 새로운 document를 세팅한다
                // 기존 Booking 정보
                setBooking({...booking
                    ,'schedule_bookmark_seq':element.schedule_bookmark_seq
                    ,'schedule_bookmark_name':element.schedule_bookmark_name
                    ,'sch_pol':element.sch_pol
                    ,'sch_pol_name':element.sch_pol_name
                    ,'sch_pod':element.sch_pod
                    ,'sch_pod_name':element.sch_pod_name
                    ,'sch_por':element.sch_por
                    ,'sch_por_name':element.sch_por_name
                    ,'sch_pld':element.sch_pld
                    ,'sch_pld_name':element.sch_pld_name
                    ,'sch_etd':element.sch_etd
                    ,'sch_eta':element.sch_eta
                    ,'sch_fdp':element.sch_fdp
                    ,'sch_fdp_name':element.sch_fdp_name
                });
            }
            });
            if ( !coll ) {
                setColl(!coll);
            }
        }
    }

    // Alert 메세지 팝업
    const onDismiss = (color, message) => {
        setColor(color);
        setMessage(message);
        setVisible(!visible);
    }

    // 입력값 적용
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setBooking({...booking, [key]:e.target.value});
    }
    const fncOnBlurSchedule = (schedule) => {
        setBooking(schedule);
    }
    // date type 처리
    const fncOnChangeDate = (value, key) => {
        // Object > Date 객체로변환
        let date = new Date(value);
        // Date 객체에서 정보 추출
        let yyyy=date.getFullYear();
        let mon = date.getMonth()+1;
        let day = date.getDate();
        mon = mon > 9 ? mon : "0" + mon;
        day = day > 9 ? day : "0" + day;
        setBooking({...booking, [key]:yyyy+'-'+mon+'-'+day});
    }
    const fncOnChangeDateTime = (value, key) => {
        // Object > Date 객체로변환
        let date = new Date(value);
        // Date 객체에서 정보 추출
        let yyyy=date.getFullYear();
        let mon = date.getMonth()+1;
        let day = date.getDate();
        mon = mon > 9 ? mon : "0" + mon;
        day = day > 9 ? day : "0" + day;
        setBooking({...booking, [key]:yyyy+'-'+mon+'-'+day});
    }

  return (
    <>
    <Row>
        <Col xl="12" lg="12">
            <Card>
                {/* <CardHeader className="bg-white"> */}
                <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>  
                    <Row className="pb-4">
                        <Col className="mt-2 mb-0 col-5" style={{fontSize:'15px',color:'#696969',fontWeight:'600'}}>SCHEDULE</Col>
                        <Col>
                            <Input type="select"
                                style={{height:'35px',fonztSize:'10px',border:'0',borderBottom:'1px solid silver',borderRadius:'0',textAlignLast:'center'}}
                                onChange={(e) => {
                                    fncSelectSchedule(e)
                                }}
                                value={booking.schedule_bookmark_seq?booking.schedule_bookmark_seq:'0'}>
                                <option key={0} value={'0'}>
                                    선택
                                </option>
                                {scheduleList.length > 0 ?scheduleList.map((element,key)=>{
                                    return(
                                        <option key={key} value={element.schedule_bookmark_seq}>
                                            {element.schedule_bookmark_name}
                                        </option>
                                    )
                                })
                                :<></>}
                            </Input>
                        </Col>
                    </Row>
                    <Collapse isOpen={coll}>
                    {/* <div style={divider}/> */}
                        {/* 보이는 영역 */}
                        {/* <Card> */}
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
                                    <CardText tag="h5" className="font-weight-bold">{booking.sch_vessel_code}</CardText>
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
                        {/* </Card> */}
                    </Collapse>
                    <div className="text-right">
                        <hr style={{position:'absolute',height:'0.5px',border:'0',width:'100%',left:'0',marginTop:'19px',backgroundColor:'silver'}}/>
                        <div>
                            <ScheduleBookmark
                                scheduleList={scheduleList}
                                selectBookingScheduleBookmark={selectBookingScheduleBookmark}/>
                            <Button
                                className="btn-round btn-just-icon mr-1"
                                color="default"
                                outline
                                id="shpview"
                                onClick={toggle.bind(this, 'S')}
                                style={{position:'relative',backgroundColor:'white'}}
                            >
                            <i className="fa fa-window-restore"/>
                            </Button>
                            <UncontrolledTooltip delay={0} target="shpview">Window Input</UncontrolledTooltip>
                            <Button
                                className="btn-round btn-just-icon mr-1"
                                color="default"
                                outline
                                id="shpmore"
                                onClick={() => setColl(!coll)}
                                style={{position:'relative',backgroundColor:'white'}}
                            >
                            <i className="fa fa-ellipsis-v" />
                            </Button>
                            <UncontrolledTooltip delay={0} target="shpmore">Open</UncontrolledTooltip>
                        </div>
                    </div>
                    {/* <FormGroup>
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
                        <ScheduleBookmark
                            scheduleList={scheduleList}
                            selectBookingScheduleBookmark={selectBookingScheduleBookmark}/>
                            <Input type="select"
                                onChange={(e) => {
                                    fncSelectSchedule(e)
                                }}
                                value={booking.schedule_bookmark_seq?booking.schedule_bookmark_seq:'0'}>
                                <option key={0} value={'0'}>
                                    선택
                                </option>
                                {scheduleList.length > 0 ?scheduleList.map((element,key)=>{
                                    return(
                                        <option key={key} value={element.schedule_bookmark_seq}>
                                            {element.schedule_bookmark_name}
                                        </option>
                                    )
                                })
                                :<></>}
                            </Input>
                    </FormGroup> */}
                </CardBody>
                {/* </CardHeader> */}
            </Card>
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
                                <Input type="text"
                                    name="sch_line_code"
                                    id="sch_line_code"
                                    placeholder="LINE"
                                    value={booking.sch_line_code?booking.sch_line_code:'WDFC'}
                                    onChange={(e)=>fncOnChange(e, 'sch_line_code')}
                                    >
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col xl="6" lg="6" md="12">
                            <FormGroup>
                                <Label className="mb-0">VESSEL CODE</Label>
                                <Input type="text"
                                    name="sch_vessel_code"
                                    id="sch_vessel_code"
                                    placeholder="VESSEL"
                                    value={booking.sch_vessel_code?booking.sch_vessel_code:''}
                                    maxLength="9"
                                    onChange={(e)=>fncOnChange(e, 'sch_vessel_code')}
                                     />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xl="4" lg="4" md="12">
                            <FormGroup>
                                <Label className="mb-0">VESSEL</Label>
                                <Input type="text"
                                    name="sch_vessel_name"
                                    id="sch_vessel_name"
                                    placeholder="VESSEL NAME"
                                    maxLength="35"
                                    value={booking.sch_vessel_name?booking.sch_vessel_name:''}
                                    onChange={(e)=>fncOnChange(e, 'sch_vessel_name')}
                                    />
                            </FormGroup>
                        </Col>
                        <Col xl="4" lg="4" md="12">
                            <FormGroup>
                                <Label className="mb-0">VOYAGE</Label>
                                <Input type="text"
                                    name="sch_vessel_voyage"
                                    id="sch_vessel_voyage"
                                    placeholder="VOYAGE"
                                    maxLength="17"
                                    value={booking.sch_vessel_voyage?booking.sch_vessel_voyage:''}
                                    onChange={(e)=>fncOnChange(e, 'sch_vessel_voyage')} />
                            </FormGroup>
                        </Col>
                        <Col xl="4" lg="4" md="12">
                            <FormGroup>
                                <Label className="mb-0">SERVICE</Label>
                                <Input type="text"
                                    name="sch_svc"
                                    id="sch_svc"
                                    placeholder="SERVICE"
                                    maxLength="100"
                                    value={booking.sch_svc?booking.sch_svc:''}
                                    onChange={(e)=>fncOnChange(e, 'sch_svc')} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xl="4" lg="4" md="12">
                            <FormGroup>
                                <Label className="mb-0">CALL SIGN</Label>
                                <Input type="text"
                                    name="sch_call_sign"
                                    id="sch_call_sign"
                                    placeholder="CALL SIGN"
                                    maxLength="9"
                                    value={booking.sch_call_sign?booking.sch_call_sign:''}
                                    onChange={(e)=>fncOnChange(e, 'sch_call_sign')}/>
                            </FormGroup>
                        </Col>
                        <Col xl="4" lg="4" md="12">
                            <FormGroup>
                                <Label className="mb-0">MRN</Label>
                                <Input type="text"
                                    name="sch_mrn"
                                    id="sch_mrn"
                                    placeholder="MRN"
                                    maxLength="11"
                                    value={booking.sch_mrn?booking.sch_mrn:''}
                                    onChange={(e)=>fncOnChange(e, 'sch_mrn')} />
                            </FormGroup>
                        </Col>
                        <Col xl="4" lg="4" md="12">
                            <FormGroup>
                                <Label className="mb-0">PAYMENT</Label>
                                <Input type="select"
                                    name="shp_payment_type"
                                    id="shp_payment_type"
                                    placeholder=""
                                    value={booking.shp_payment_type?booking.shp_payment_type:''}
                                    onChange={(e)=>fncOnChange(e, 'shp_payment_type')}>
                                    <option value="">선택</option>
                                    <option value="P">선불</option>
                                    <option value="C">후불</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xl="4" lg="4" md="12">
                            <FormGroup>
                                <Label className="mb-0">선적요청일자</Label>
                                <InputGroup className="date" id="sch_srd">
                                    <ReactDatetime
                                        inputProps={{
                                        className: "form-control",
                                        placeholder: "Datetime Picker Here",
                                        }}
                                        dateFormat="YYYY-MM-DD"
                                        timeFormat={false}
                                        value={booking.sch_srd?booking.sch_srd:''}
                                        onChange={(e)=>fncOnChangeDate(e,'sch_srd')}
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
                        <Col xl="4" lg="4" md="12">
                            <FormGroup>
                                <Label className="mb-0">선적예정일시</Label>
                                <InputGroup className="date" id="sch_led">
                                    <ReactDatetime
                                        inputProps={{
                                        className: "form-control",
                                        placeholder: "Datetime Picker Here",
                                        }}
                                        dateFormat="YYYY-MM-DD"
                                        timeFormat={false}
                                        value={booking.sch_led?booking.sch_led:''}
                                        onChange={(e)=>fncOnChangeDate(e,'sch_led')}
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
                        <Col xl="4" lg="4" md="12">
                            <FormGroup>
                                <Label className="mb-0">반입마감일시</Label>
                                <InputGroup className="date" id="sch_cct">
                                    <ReactDatetime
                                        inputProps={{
                                        className: "form-control",
                                        placeholder: "Datetime Picker Here",
                                        }}
                                        dateFormat="YYYY-MM-DD"
                                        timeFormat={false}
                                        value={booking.sch_cct?booking.sch_cct:''}
                                        onChange={(e)=>fncOnChangeDateTime(e,'sch_cct')}
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
                        <Col xl="4" lg="4" md="12">
                            <FormGroup>
                                <Label className="mb-0">서류마감일시</Label>
                                <InputGroup className="date" id="sch_dct">
                                    <ReactDatetime
                                        inputProps={{
                                        className: "form-control",
                                        placeholder: "Datetime Picker Here",
                                        }}
                                        dateFormat="YYYY-MM-DD"
                                        timeFormat={false}
                                        value={booking.sch_dct?booking.sch_dct:''}
                                        onChange={(e)=>fncOnChangeDateTime(e,'sch_dct')}
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
                        <Col xl="4" lg="4" md="12">
                            <FormGroup>
                                <Label className="mb-0">선적서류마감일시</Label>
                                <InputGroup className="date" id="sch_sr_closing_time">
                                    <ReactDatetime
                                        inputProps={{
                                        className: "form-control",
                                        placeholder: "Datetime Picker Here",
                                        }}
                                        dateFormat="YYYY-MM-DD"
                                        timeFormat={false}
                                        value={booking.sch_sr_closing_time?booking.sch_sr_closing_time:''}
                                        onChange={(e)=>fncOnChangeDateTime(e,'sch_sr_closing_time')}
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
                        <Col xl="4" lg="4" md="12">
                            <FormGroup>
                                <Label className="mb-0">환적 여부</Label>
                                <Input type="select"
                                    name="sch_ts_yn"
                                    id="sch_ts_yn"
                                    placeholder="환적 여부"
                                    value={booking.sch_ts_yn?booking.sch_ts_yn:''}
                                    onChange={(e)=>fncOnChange(e, 'sch_ts_yn')}>
                                    <option key={0} value={0}>선택</option>
                                    <option key={2} value='N'>N</option>
                                    <option key={1} value='Y'>Y</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col className="col-12" xl="12" lg="12" sm="12">
                            <h5 className="mb-0">Schedule Info</h5>
                        </Col>
                    </Row>
                    <Schedule
                        schedule={booking}
                        fncOnBlurSchedule={fncOnBlurSchedule}/>
                </CardBody>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(e)=>fncUpdateScheduleOfBooking(e)}>Save</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
        <AlertMessage
            isOpen={visible}
            toggle={onDismiss}
            color={color}
            message={message}
            />
    </>
    );
}

export default ScheduleCard;