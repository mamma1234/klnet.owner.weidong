/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    Button,Input, Card, CardTitle, CardText, UncontrolledTooltip} from "reactstrap";
import Transport from "./Transport.js";
import TransportBookmark from "./TransportBookmark.js";
import AlertMessage from "../AlertMessage.js";
import axios from "axios";


const TransportCard = (props) => {
    
    // Collapse Flag
    const [coll, setColl] = useState(false);
    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // TransPort
    const [booking, setBooking] = useState({});
    const [transportList, setTransportList] = useState([]);
    // Alert을 위한 state
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState("success");
    const [message, setMessage] = useState("정상 처리되었습니다.");

    useEffect(() => {
        // 최초조회
        selectBookingTransportBookmark();
    },[]);

    useEffect(() => {
        // 초기 Seq와 현재 seq 다른 경우
        // console.log(booking.init_transport_bookmark_seq, booking.transport_bookmark_seq)
        if( booking.init_transport_bookmark_seq != booking.transport_bookmark_seq ) {
            // Transport Bookmark로 booking의 Transport 입력하기
            updateTransportOfBooking();
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

            // Transport Bookmark seq
            let transport_bookmark_seq = props.booking.transport_bookmark_seq;
            let init_transport_bookmark_seq = props.booking.init_transport_bookmark_seq;

            setBooking({...booking, 'bkg_no':bkg_no, 'bkg_date':bkg_date
                , 'status_cus':status_cus, 'sc_no':sc_no, 'user_no':user_no
                , 'transport_bookmark_seq':transport_bookmark_seq
                , 'init_transport_bookmark_seq':init_transport_bookmark_seq
            }); // 초기화 bookmark seq 값

            // 최초 조회하기
            selectTransportOfBooking(props.booking);
        }
    },[props.booking]);

    // Transport Bookmark 선택
    const fncSelectTransport=(e)=>{
        //   console.log(e.target.value)
        // 선택
        if( 1 > e.target.value ) {
            // setBooking({});
            if ( coll ) {
                setColl(!coll)
            }
        // 그외 데이터인 경우
        } else {
            transportList.map((element, key)=>{
            if( e.target.value == element.transport_bookmark_seq) {
                // console.log(element)
                // select로 새로운 document를 세팅한다
                // 기존 Booking 정보
                setBooking({...booking
                    ,'transport_bookmark_seq':element.transport_bookmark_seq
                    ,'transport_bookmark_name':element.transport_bookmark_name
                    ,'trans_name1':element.trans_name1
                    ,'trans_name2':element.trans_name2
                    ,'trans_code':element.trans_code
                    ,'trans_self_yn':element.trans_self_yn
                    ,'trans_user_fax':element.trans_user_fax
                    ,'trans_user_name':element.trans_user_name
                    ,'trans_user_tel':element.trans_user_tel
                    ,'trans_user_email':element.trans_user_email
                    ,'trans_fac_name':element.trans_fac_name
                    ,'trans_fac_area_name':element.trans_fac_area_name
                    ,'trans_remark':element.trans_remark
                });
            }
            });
            if ( !coll ) {
                setColl(!coll);
            }
        }
    }

    // TransportOfBooking
    const selectTransportOfBooking = ( booking ) => {
        axios.post(
            "/api/selectTransportOfBooking"
            ,{ user_no: 'M000002'
                , booking
            }
            ,{}
        ).then(
            res => setBooking(res.data[0])
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Transport Bookmark 조회
    const selectBookingTransportBookmark = () => {
        axios.post(
            "/api/selectBookingTransportBookmark"
            ,{ user_no: 'M000002' }
            ,{}
        ).then(
            res => {
                setTransportList(res.data);
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    const updateTransportOfBooking = () => {
        axios.post(
            "/api/updateTransportOfBooking"
            ,{ user_no: 'M000002'
                , booking
            }
            ,{}
        ).then(
            
        ).then(
            res => {
                setBooking({...booking, 'init_transport_bookmark_seq':booking.transport_bookmark_seq});
                onDismiss("success", "정상 처리되었습니다.");
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }
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

    const fncOnBlur = (transport) => {
        setBooking(transport);
    }
  return (
    <>
        <Row>
            <Col xl="12" lg="12">
                <Card>
                    <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>
                        <Row className="pb-4">
                            <Col className="mt-2 mb-0 col-5" style={{fontSize:'15px',color:'#696969',fontWeight:'600'}}>TRANSPORT</Col>
                            <Col>
                                <Input type="select"
                                    style={{height:'35px',fonztSize:'10px',border:'0',borderBottom:'1px solid silver',borderRadius:'0',textAlignLast:'center'}}
                                    onChange={(e) => {
                                        fncSelectTransport(e)
                                    }}
                                    value={booking.transport_bookmark_seq?booking.transport_bookmark_seq:'0'}>
                                    <option key={0} value={'0'}>
                                        선택
                                    </option>
                                    {transportList.length > 0 ?transportList.map((element,key)=>{
                                        return(
                                            <option key={key} value={element.transport_bookmark_seq}>
                                                {element.transport_bookmark_name}
                                            </option>
                                        )
                                    })
                                    :<></>}
                                </Input>
                            </Col>
                        </Row>
                        <Collapse isOpen={coll}>
                            <Row xl="6" lg="6" sm="12">
                                <CardBody onClick={toggle.bind(this, 'S')}>
                                    <CardTitle>자가운송 : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.trans_self_yn}</CardText>
                                    <CardTitle>Name : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.trans_name1}</CardText>
                                    <CardTitle>Translate Code : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.trans_code}</CardText>
                                    <CardTitle>Name : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.trans_user_name}</CardText>
                                    <CardTitle>Tel : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.trans_user_tel}</CardText>
                                    <CardTitle>E-mail : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.trans_user_email}</CardText>
                                    <CardTitle>Fax : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.trans_user_fax}</CardText>
                                    <CardTitle>공장 지역 명 : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.trans_fac_area_name}</CardText>
                                    <CardTitle>공장 명 : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.trans_fac_name}</CardText>
                                    <CardTitle>Remark : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.trans_remark}</CardText>
                                </CardBody>
                            </Row>
                        </Collapse>
                        <div className="text-right">
                            <hr style={{position:'absolute',height:'0.5px',border:'0',width:'100%',left:'0',marginTop:'19px',backgroundColor:'silver'}}/>
                            <div>
                                <TransportBookmark
                                    transportList={transportList}
                                    selectBookingTransportBookmark={selectBookingTransportBookmark}/>
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
            <ModalHeader toggle={toggle}>Transport</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <Transport
                            transport={booking}
                            fncOnBlur={fncOnBlur}/>
                    </CardBody>
                </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={updateTransportOfBooking}>Save</Button>{' '}
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

export default TransportCard;