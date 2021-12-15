/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, Button,FormGroup, Label,Input, UncontrolledTooltip} from "reactstrap";
import axios from "axios";
import Booking from "./Booking.js";
import OtherBookmark from './OtherBookmark.js';
import AlertMessage from "../AlertMessage.js";


const BookingCard = (props) => {
    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    // modal 창을 위한 state
    const [coll, setColl] = useState(false);
    const [open, setOpen] = useState(false);
    // Alert을 위한 state
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState("success");
    const [message, setMessage] = useState("정상 처리되었습니다.");
    // 중요내용 부모/자식 공유를 위한 state
    const [booking, setBooking] = useState({});
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // SC NUMBER state
    const [other, setOther] = useState({});

    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        let bkg_no = props.booking.bkg_no;
        let bkg_date = props.booking.bkg_date;
        let status_cus = props.booking.status_cus;
        let sc_no = props.booking.sc_no;
        let user_no = props.booking.user_no;
        setBooking({...booking, 'bkg_no':bkg_no, 'bkg_date':bkg_date
            , 'status_cus':status_cus, 'sc_no':sc_no, 'user_no':user_no});
    },[props]);

    useEffect(()=>{
        setBooking({...booking
            , 'other_bookmark_seq':other.other_bookmark_seq
            , 'sc_no':other.sc_no
            , 'remark1':other.remark1
            , 'remark2':other.remark2});
    },[other]);

    // 모달창 팝업
    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
        selectBooking();
    }

    // Alert 메세지 팝업
    const onDismiss = (color, message) => {
        setColor(color);
        setMessage(message);
        setVisible(!visible);
    }



    // 자식에게 받은 Booking
    const fncOnBlurBooking = ( booking ) => {
        setBooking( booking );
    }

    // 입력값 useState 입력
    const fncOnChange = (e, key) => {
        e.preventDefault();
        setBooking({...booking, [key]:e.target.value});
    }

    const fncOnKeyPressBkgNo = (e) => {
        // setBooking({...booking, ['bkg_date']:booking.bkg_no.substr(0, 8)});
        if( "Enter" === e.key ) {
            // selectBooking();
            toggle();
        }
    }

    // 조회
    const selectBooking = () => {
        // console.log(booking)
        const body =
        axios.post(
            "/api/selectBooking"
            ,{
                user_no : 'M000002',
                booking
            }
            ,{}
        ).then(
            // onDismiss("success", "정상 조회 되었습니다.")
        ).then(
            res => {
                const result =  res.data;
                if( 0 < result.length ) {
                    setBooking(result[0]);
                } else {
                    setBooking({});
                }
                props.fncBookingPrarms(booking);
            }   
        ).catch(err => {
            if(err.response.status === 403||err.response.status === 401) {
                onDismiss("danger","오류가 발생 했습니다.")
            }
        });
    }

    // 입력
    const insertBooking = (e) => {
        // console.log(booking)
        e.preventDefault();
        const body =
        axios.post(
            "/api/insertBooking"
            ,{
            user_no : 'M000002',
            booking
            }
            ,{}
        ).then(
            // INSERT 결과값 넣기
            res => {
                setBooking(res.data.rows[0]);
                props.fncBookingPrarms(res.data.rows[0]);
                onDismiss("success","부킹(이)가 새로 생성되었습니다.");
            }   
        ).catch(err => {
            if(err.response.status === 403||err.response.status === 401) {
                onDismiss("danger","오류가 발생 했습니다.");
            }
        });
    }
  return (
    <>
    <Row>
        <Col xl="3" lg="3" md="12">
            <FormGroup>
                <Label className="mb-0">Booking Number</Label>
                <Input type="text" name="bkg_no" id="bkg_no"
                    maxLength="15"
                    value={booking.bkg_no?booking.bkg_no:''}
                    onChange={(e)=>fncOnChange(e, 'bkg_no')}
                    // onBlur={(e)=>fncOnBlurBooking(e)}
                    onKeyPress={(e)=>fncOnKeyPressBkgNo(e)}
                    />
            </FormGroup>
        </Col>  
        <Col xl="3" lg="3" md="12">
            <FormGroup>
                <Label className="mb-0">계약 번호</Label>
                <Input type="text" name="sc_no" id="sc_no"
                    placeholder="계약 번호"
                    maxLength="20"
                    defaultValue={booking.sc_no?booking.sc_no:''}
                />
            </FormGroup>
        </Col>
        <Col xl="3" lg="3" md="12">
            <FormGroup>
                <Label className="mb-0">저장</Label>
                <Input type="select" name="status_cus" id="status_cus"
                    value={booking.status_cus?booking.status_cus:''}
                    onChange={(e)=>fncOnChange(e, 'status_cus')}
                    >
                    <option value="NO">저장</option>
                    <option value="S0">저장</option>
                    <option value="S9">전송</option>
                    <option value="S4">정정전송</option>
                    <option value="S1">취소전송</option>
                    <option value="BC">승인</option>
                    <option value="RJ">거절</option>
                    <option value="CC">취소승인</option>
                    <option value="RC">승인취소</option>
                </Input>
            </FormGroup>
        </Col>
        <Col  xl="3" lg="3" className="text-right">
            <Button id="bkg_new" color="info" outline type="button" className="mr-1" onClick={(e)=>insertBooking(e)}>NEW</Button>
            <UncontrolledTooltip delay={0} target="bkg_new">Booking 신규 생성</UncontrolledTooltip>
        </Col>
    </Row>
    <AlertMessage
        isOpen={visible}
        toggle={onDismiss}
        color={color}
        message={message}
        />

{/*         
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
                        <Row>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Booking Number</Label>
                                    <Input type="text" name="bkg_no" id="bkg_no" placeholder="Booking Number"
                                        value={booking.bkg_no?booking.bkg_no:''}
                                        onChange={(e)=>fncOnChange(e, 'bkg_no')}
                                        // onBlur={(e)=>fncOnBlurBooking(e)}
                                        onKeyPress={(e)=>fncOnKeyPressBkgNo(e)}
                                         />
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">계약 번호
                                        <OtherBookmark
                                            other={other}
                                            setOther={setOther}
                                            updateOtherofBooking={(e)=>updateOtherofBooking()}
                                            // onBlur={(e)=>fncOnBlurBooking(e)}
                                            />
                                    </Label>
                                    <Input type="text" name="sc_no" id="sc_no" placeholder="계약 번호"
                                        defaultValue={booking.sc_no?booking.sc_no:''} />
                                    
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">현재 상태</Label>
                                    <Input type="select" name="status_cus" id="status_cus"
                                        value={booking.status_cus?booking.status_cus:''}
                                        onChange={(e)=>fncOnChange(e, 'status_cus')}
                                        >
                                        <option value="NO">현재상태</option>
                                        <option value="S0">저장</option>
                                        <option value="S9">전송</option>
                                        <option value="S4">정정전송</option>
                                        <option value="S1">취소전송</option>
                                        <option value="BC">승인</option>
                                        <option value="RJ">거절</option>
                                        <option value="CC">취소승인</option>
                                        <option value="RC">승인취소</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                    </FormGroup>
                </CardHeader>
            </Card>
        </Col>
    </Row>
        <Collapse isOpen={coll}>
        {/* <div style={divider}/>
            <Card>
                <Row xl="12" lg="12" sm="12">
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
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="lg">
            <ModalHeader toggle={toggle}>BOOKING</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <Booking
                            booking={booking}
                            fncOnBlurBooking={fncOnBlurBooking}
                            />
                    </CardBody>
                </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={insertBooking}>New</Button>{' '}
                <Button color="primary" onClick={updateBooking}>Save</Button>{' '}
                <Button color="primary" onClick={deleteBooking}>Delete</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
        <AlertMessage
            isOpen={visible}
            toggle={onDismiss}
            color={color}
            message={message}
            /> */}
    </>
    );
}

export default BookingCard;