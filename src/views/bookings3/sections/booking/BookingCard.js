/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    UncontrolledTooltip, Button,FormGroup, Label,Input, Card, CardHeader, CardTitle, CardText} from "reactstrap";
import axios from "axios";
import Booking from "./Booking.js";
import OtherBookmark from './OtherBookmark.js';
import AlertMessage from "../AlertMessage.js";
import * as validation from 'components/common/validation.js';


const BookingCard = (props) => {

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
    const [otherList, setOtherList] = useState([]);

    useEffect(()=>{
        // Bookmark 목록 조회
        selectBookingOtherBookmark();
    },[]);

    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        if( props.booking.bkg_no ) {
            let bkg_no = props.booking.bkg_no;
            let bkg_date = props.booking.bkg_date;
            let status_cus = props.booking.status_cus;
            let sc_no = props.booking.sc_no;
            let user_no = props.booking.user_no;
    
            let other_bookmark_seq = props.booking.other_bookmark_seq;
            let init_other_bookmark_seq = props.booking.init_other_bookmark_seq;
            setBooking({...booking, 'bkg_no':bkg_no, 'bkg_date':bkg_date
                , 'status_cus':status_cus, 'sc_no':sc_no, 'user_no':user_no
                , 'other_bookmark_seq':other_bookmark_seq
                , 'init_other_bookmark_seq':init_other_bookmark_seq});
        }
    },[props.booking]);

    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        // 초기 Seq와 현재 seq 다른 경우
        // console.log(booking.init_schedule_bookmark_seq, booking.schedule_bookmark_seq)
        if( booking.init_other_bookmark_seq != booking.other_bookmark_seq ) {
            // 스케줄 Bookmark로 booking의 스케줄 입력하기
            updateBooking();
        }
    },[booking]);

    // 모달창 팝업
    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
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

    const fncOnKeyPressBkgNo = (e) => {
        // setBooking({...booking, ['bkg_date']:booking.bkg_no.substr(0, 8)});
        if( "Enter" === e.key ) {
            toggle();
        }
    }

    // Other select 선택할때
    const fncSelectOther = (e) => {
        //   console.log(e.target.value)
        // 선택
        if( 1 > e.target.value ) {
            // setBooking({});
            if ( coll ) {
                setColl(!coll)
            }
        // 그외 데이터인 경우
        } else {
            otherList.map((element, key)=>{
                if( e.target.value == element.other_bookmark_seq) {
                    // select로 새로운 document를 세팅한다
                    // 기존 Booking 정보
                    setBooking({...booking
                        ,'other_bookmark_seq':element.other_bookmark_seq
                        ,'other_bookmark_name':element.other_bookmark_name
                        ,'sc_no':element.sc_no
                        ,'remark1':element.remark1
                        ,'remark2':element.remark2
                    });
                }
            });
            if ( !coll ) {
                setColl(!coll);
            }
        }
    }

    // 조회
    const selectBookingOtherBookmark = () => {
        axios.post(
            "/api/selectBookingOtherBookmark"
            ,{ user_no: 'M000002' }
            ,{}
        ).then(
            res => {
                setOtherList(res.data);
                // onDismiss("success", "정상 처리 되었습니다.");
            }
        ).catch(err => {
            if(err.response.status === 403||err.response.status === 401) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // 입력
    const insertBooking = () => {
        // console.log(booking)
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

    // 수정
    const updateBooking = () => {
        const body =
        axios.post(
            "/api/updateBooking"
            ,{
            user_no : 'M000002',
            booking
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success","적용되었습니다.");
            }
        ).catch(err => {
            if(err.response.status === 403||err.response.status === 401) {
                onDismiss("danger","오류가 발생 했습니다.");
            }
        });
    }

    // 수정 Booking other 정보로
    const updateOtherofBooking = () => {
        const body =
        axios.post(
            "/api/updateOtherofBooking"
            ,{
            user_no : 'M000002',
            booking
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success","적용되었습니다.");
            }
        ).catch(err => {
            if(err.response.status === 403||err.response.status === 401) {
                onDismiss("danger","오류가 발생 했습니다.")
            }
        });
    }

    // 삭제
    const deleteBooking = () => {
        // console.log(booking)
        const body =
        axios.post(
            "/api/deleteBooking"
            ,{
            user_no : 'M000002',
            booking
            }
            ,{}
        ).then(
            res=>{
                setBooking({});
                onDismiss("danger",validation.DEL_MSG);
            }
        ).then(
            // selectBookingDocumentBookmark()
        ).catch(err => {
            if(err.response.status === 403||err.response.status === 401) {
                onDismiss("danger","오류가 발생 했습니다.")
            }
        });
    }
  return (
    <>
    <Row>
        <Col xl="12" lg="12">
            <Card>
                <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>  
                    <Row className="pb-4">
                        <Col className="mt-2 mb-0 col-5" style={{fontSize:'15px',color:'#696969',fontWeight:'600'}}>계약 번호</Col>
                        <Col>
                            <Input type="select"
                                style={{height:'35px',fonztSize:'10px',border:'0',borderBottom:'1px solid silver',borderRadius:'0',textAlignLast:'center'}}
                                onChange={(e) => {
                                    fncSelectOther(e)
                                }}
                                value={booking.other_bookmark_seq?booking.other_bookmark_seq:'0'}>
                                <option key={0} value={'0'}>
                                    선택
                                </option>
                                {otherList.length > 0 ?otherList.map((element,key)=>{
                                    return(
                                        <option key={key} value={element.other_bookmark_seq}>
                                            {element.other_bookmark_name}
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
                        <Card>
                            <Row xl="12" lg="12" sm="12">
                                <CardBody onClick={toggle.bind(this, 'S')}>
                                    <CardTitle>Booking Number : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.bkg_no}</CardText>
                                    <CardTitle>Booking Date : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.bkg_date}</CardText>
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
                                    <CardTitle>계약번호 : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.sc_no}</CardText>
                                    <CardTitle>송신차수 : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.sending_count}</CardText>                                    
                                </CardBody>
                            </Row>
                        </Card>
                    </Collapse>
                    <div className="text-right">
                        <hr style={{position:'absolute',height:'0.5px',border:'0',width:'100%',left:'0',marginTop:'19px',backgroundColor:'silver'}}/>
                        <div>
                            <OtherBookmark
                                otherList={otherList}
                                selectBookingOtherBookmark={selectBookingOtherBookmark}/>
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
                </CardBody>
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
            />
    </>
    );
}

export default BookingCard;