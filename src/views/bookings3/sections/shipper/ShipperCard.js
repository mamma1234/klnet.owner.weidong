/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse, UncontrolledTooltip,
    Button, Input, Card, CardTitle, CardText} from "reactstrap";
import axios from "axios";
import Shipper from './Shipper.js';
import AlertMessage from "../AlertMessage.js";
import ShipperBookmark from './ShipperBookmark.js';

const ShipperCard = (props) => {
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // Collapse Flag
    const [coll, setColl] = useState(false);
    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    // Alert을 위한 state
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState("success");
    const [message, setMessage] = useState("정상 처리되었습니다.");
    // Shipper
    const [shipperList, setShipperList] = useState([]);
    const [booking, setBooking] = useState({});

    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }
    
    useEffect(() => {
      // Shipper Bookmark 목록조회
      selectBookingShipperBookmark();
    },[]);

    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        if( props.booking.bkg_no ) {
            // console.log("Shipper Props:",props.booking);
            let bkg_no = props.booking.bkg_no;
            let bkg_date = props.booking.bkg_date;
            let status_cus = props.booking.status_cus;
            let sc_no = props.booking.sc_no;
            let user_no = props.booking.user_no;

            // Shipper Bookmark seq
            let shipper_bookmark_seq = props.booking.shipper_bookmark_seq;
            let init_shipper_bookmark_seq = props.booking.init_shipper_bookmark_seq;

            setBooking({...booking, 'bkg_no':bkg_no, 'bkg_date':bkg_date
                , 'status_cus':status_cus, 'sc_no':sc_no, 'user_no':user_no
                , 'shipper_bookmark_seq':shipper_bookmark_seq
                , 'init_shipper_bookmark_seq':init_shipper_bookmark_seq
            }); // 초기화 bookmark seq 값

            // 최초 조회하기
            getShipperOfBooking(props.booking);
        }
    },[props.booking]);

    useEffect(() => {
        // 초기 Seq와 현재 seq 다른 경우
        // console.log(booking.init_shipper_bookmark_seq, booking.shipper_bookmark_seq)
        if( booking.init_shipper_bookmark_seq != booking.shipper_bookmark_seq ) {
            // Booking의 Shipper update
            updateShipperOfBooking();
        }
      },[booking]);

    // SHipper Bookmark 조회
    const selectBookingShipperBookmark = () => {
        axios.post(
            "/api/selectBookingShipperBookmark"
            ,{ user_no: 'M000002' }
            ,{}
        ).then(
            setShipperList([])
        ).then(
            res => setShipperList(res.data)
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // SHipper Bookmark 조회
    const getShipperOfBooking = ( booking ) => {
        axios.post(
            "/api/getShipperOfBooking"
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

    const updateShipperOfBooking = () => {
        axios.post(
            "/api/updateShipperOfBooking"
            ,{ user_no: 'M000002'
                , booking
            }
            ,{}
        ).then(
            
        ).then(
            res => {
                setBooking({...booking, 'init_shipper_bookmark_seq':booking.shipper_bookmark_seq});
                onDismiss("success", "정상 처리되었습니다.");
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    const fncSelectShipper = (e) => {
        // 선택
        if( 1 > e.target.value ) {
            // setBooking({});
            if ( coll ) {
                setColl(!coll)
            }
        // 그외 데이터인 경우
        } else {
            shipperList.map((element, key)=>{
            if( e.target.value == element.shipper_bookmark_seq) {
                // select로 새로운 document를 세팅한다
                // 기존 Booking 정보
                setBooking({...booking
                    ,'shipper_bookmark_seq':element.shipper_bookmark_seq
                    ,'shipper_bookmark_name':element.shipper_bookmark_name
                    ,'shp_name1':element.shp_name1
                    ,'shp_name2':element.shp_name2
                    ,'shp_code':element.shp_code
                    ,'shp_user_name':element.shp_user_name
                    ,'shp_user_tel':element.shp_user_tel
                    ,'shp_user_email':element.shp_user_email
                    ,'shp_address1':element.shp_address1
                    ,'shp_address2':element.shp_address2
                    ,'shp_address3':element.shp_address3
                    ,'shp_address4':element.shp_address4
                    ,'shp_address5':element.shp_address5
                    ,'shp_user_dept':element.shp_user_dept
                    ,'shp_user_fax':element.shp_user_fax
                    ,'shp_payment_type':element.shp_payment_type
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

    const fncOnBlurShipper = ( shipper ) => {
        setBooking(shipper);
    }
  return (
    <>
        <Row>
            <Col xl="12" lg="12">
                <Card>
                    {/* <CardHeader className="bg-white"> */}
                    <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>
                        <Row className="pb-4">
                            <Col className="mt-2 mb-0 col-5" style={{fontSize:'15px',color:'#696969',fontWeight:'600'}}>SHIPPER</Col>
                            <Col>
                                <Input type="select"
                                    style={{height:'35px',fonztSize:'10px',border:'0',borderBottom:'1px solid silver',borderRadius:'0',textAlignLast:'center'}}
                                    onChange={(e) => {
                                        fncSelectShipper(e)
                                    }}
                                    value={booking.shipper_bookmark_seq?booking.shipper_bookmark_seq:'0'}>
                                    <option key={0} value={'0'}>
                                        선택
                                    </option>
                                    {shipperList.length > 0 ?shipperList.map((element,key)=>{
                                        return(
                                            <option key={key} value={element.shipper_bookmark_seq}>
                                                {element.shipper_bookmark_name}
                                            </option>
                                        )
                                    })
                                    :<></>}
                                </Input>
                            </Col>
                        </Row>
                        {/* 보이는 영역 */}
                        <Collapse isOpen={coll}>
                            <Row xl="6" lg="6" sm="12">
                                <CardBody onClick={toggle.bind(this, 'S')}>
                                    <CardTitle>Shipper Name1 : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.shp_name1}</CardText>
                                    <CardTitle>Shipper Name2 : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.shp_name2}</CardText>
                                    <CardTitle>Shipper Code : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.shp_code}</CardText>
                                    <CardTitle>Name : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.shp_user_name}</CardText>
                                    <CardTitle>Tel : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.shp_user_tel}</CardText>
                                    <CardTitle>E-mail : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.shp_user_email}</CardText>
                                    <CardTitle>Fax : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.shp_user_fax}</CardText>
                                    <CardTitle>Address : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.shp_address1}</CardText>
                                </CardBody>
                            </Row>
                        </Collapse>
                        <div className="text-right">
                            <hr style={{position:'absolute',height:'0.5px',border:'0',width:'100%',left:'0',marginTop:'19px',backgroundColor:'silver'}}/>
                            <div>
                                <ShipperBookmark
                                    shipperList={shipperList}
                                    selectBookingShipperBookmark={selectBookingShipperBookmark}/>
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
            <ModalHeader toggle={toggle}>Shipper</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <Shipper
                            shipper={booking}
                            fncOnBlurShipper={fncOnBlurShipper}/>
                    </CardBody>
                </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={updateShipperOfBooking}>Save</Button>{' '}
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

export default ShipperCard;