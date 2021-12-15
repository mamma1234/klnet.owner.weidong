/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse, UncontrolledTooltip,
    Button,Input, Card, CardTitle, CardText} from "reactstrap";
import Consignee from "./Consignee.js";
import ConsigneeBookmark from "./ConsigneeBookmark.js";
import AlertMessage from "../AlertMessage.js";
import axios from "axios";


const ConsigneeCard = (props) => {

    // Collapse Flag
    const [coll, setColl] = useState(false);
    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // Consignee
    const [booking, setBooking] = useState({});
    const [consigneeList, setConsigneeList] = useState({});
    // Alert을 위한 state
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState("success");
    const [message, setMessage] = useState("정상 처리되었습니다.");

    useEffect(() => {
        // 최초 조회
        selectBookingConsigneeBookmark();
    },[]);

    useEffect(() => {
        // 초기 Seq와 현재 seq 다른 경우
        // console.log(booking.init_consignee_bookmark_seq, booking.consignee_bookmark_seq)
        if( booking.init_consignee_bookmark_seq != booking.consignee_bookmark_seq ) {
            // Consignee Bookmark로 booking의 Consignee 입력하기
            updateConsigneeOfBooking();
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

            // Consignee Bookmark seq
            let consignee_bookmark_seq = props.booking.consignee_bookmark_seq;
            let init_consignee_bookmark_seq = props.booking.init_consignee_bookmark_seq;

            setBooking({...booking, 'bkg_no':bkg_no, 'bkg_date':bkg_date
                , 'status_cus':status_cus, 'sc_no':sc_no, 'user_no':user_no
                , 'consignee_bookmark_seq':consignee_bookmark_seq
                , 'init_consignee_bookmark_seq':init_consignee_bookmark_seq
            }); // 초기화 bookmark seq 값

            // 최초 조회하기
            selectConsigneeOfBooking(props.booking);
        }
    },[props.booking]);

    // Consignee Bookmark 선택
    const fncSelectConsignee=(e)=>{
        //   console.log(e.target.value)
        // 선택
        if( 1 > e.target.value ) {
            // setBooking({});
            if ( coll ) {
                setColl(!coll)
            }
        // 그외 데이터인 경우
        } else {
            consigneeList.map((element, key)=>{
            if( e.target.value == element.consignee_bookmark_seq) {
                // console.log(element)
                // select로 새로운 document를 세팅한다
                // 기존 Booking 정보
                setBooking({...booking
                    ,'consignee_bookmark_seq':element.consignee_bookmark_seq
                    ,'consignee_bookmark_name':element.consignee_bookmark_name
                    ,'cons_name1':element.cons_name1
                    ,'cons_name2':element.cons_name2
                    ,'cons_code':element.cons_code
                    ,'cons_user_email':element.cons_user_email
                    ,'cons_user_fax':element.cons_user_fax
                    ,'cons_user_name':element.cons_user_name
                    ,'cons_user_tel':element.cons_user_tel
                    ,'cons_user_dept':element.cons_user_dept
                    ,'cons_address1':element.cons_address1
                    ,'cons_address2':element.cons_address2
                    ,'cons_address3':element.cons_address3
                    ,'cons_address4':element.cons_address4
                    ,'cons_address5':element.cons_address5
                });
            }
            });
            if ( !coll ) {
                setColl(!coll);
            }
        }
    }

    // ConsigneeOfBooking
    const selectConsigneeOfBooking = ( booking ) => {
        axios.post(
            "/api/selectConsigneeOfBooking"
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

    // Consignee Bookmark 조회
    const selectBookingConsigneeBookmark = () => {
        axios.post(
            "/api/selectBookingConsigneeBookmark"
            ,{ user_no: 'M000002' }
            ,{}
        ).then(
            res => {
                setConsigneeList(res.data);
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    const updateConsigneeOfBooking = () => {
        axios.post(
            "/api/updateConsigneeOfBooking"
            ,{ user_no: 'M000002'
                , booking
            }
            ,{}
        ).then(
            
        ).then(
            res => {
                setBooking({...booking, 'init_consignee_bookmark_seq':booking.consignee_bookmark_seq});
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

    const fncOnBlur = (consignee) => {
        setBooking(consignee);
    }
  return (
    <>
        <Row>
            <Col xl="12" lg="12">
                <Card>
                    {/* <CardHeader className="bg-white"> */}
                    <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>
                        <Row className="pb-4">
                            <Col className="mt-2 mb-0 col-5" style={{fontSize:'15px',color:'#696969',fontWeight:'600'}}>CONSIGNEE</Col>
                            <Col>
                                <Input type="select"
                                    style={{height:'35px',fonztSize:'10px',border:'0',borderBottom:'1px solid silver',borderRadius:'0',textAlignLast:'center'}}
                                    onChange={(e) => {
                                        fncSelectConsignee(e)
                                    }}
                                    value={booking.consignee_bookmark_seq?booking.consignee_bookmark_seq:'0'}>
                                    <option key={0} value={'0'}>
                                        선택
                                    </option>
                                    {consigneeList.length > 0 ?consigneeList.map((element,key)=>{
                                        return(
                                            <option key={key} value={element.consignee_bookmark_seq}>
                                                {element.consignee_bookmark_name}
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
                                    <CardTitle>Consignee Name1 : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.cons_name1}</CardText>
                                    <CardTitle>Consignee Name2 : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.cons_name2}</CardText>
                                    <CardTitle>Consignee Code : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.cons_code}</CardText>
                                    <CardTitle>Name : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.cons_user_name}</CardText>
                                    <CardTitle>Tel : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.cons_user_tel}</CardText>
                                    <CardTitle>E-mail : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.cons_user_email}</CardText>
                                    <CardTitle>Fax : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.cons_user_fax}</CardText>
                                    <CardTitle>Address : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.cons_address1}</CardText>
                                </CardBody>
                            </Row>
                        </Collapse>
                        <div className="text-right">
                            <hr style={{position:'absolute',height:'0.5px',border:'0',width:'100%',left:'0',marginTop:'19px',backgroundColor:'silver'}}/>
                            <div>
                                <ConsigneeBookmark
                                    consigneeList={consigneeList}
                                    selectBookingConsigneeBookmark={selectBookingConsigneeBookmark}/>
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
            <ModalHeader toggle={toggle}>Consignee</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <Consignee
                            consignee={booking}
                            fncOnBlur={fncOnBlur}
                            />
                    </CardBody>
                </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(e)=>updateConsigneeOfBooking()}>Save</Button>{' '}
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

export default ConsigneeCard;