/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse, UncontrolledTooltip,
    ButtonGroup, Button,FormGroup,Label,Input, Card, CardHeader, CardTitle, CardText} from "reactstrap";
import Cargo from "./Cargo.js";
import CargoBookmark from "./CargoBookmark.js";
import AlertMessage from "../AlertMessage.js";
import axios from "axios";
import Goods from './Goods.js';

const CargoCard = (props) => {
    // Collapse Flag
    const [coll, setColl] = useState(false);
    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // Cargo
    const [booking, setBooking] = useState({});
    // Cargo Bookmark 목록
    const [cargoBookmarkList, setCargoBookmarkList] = useState([]);
    // Goods Bookmark 목록
    const [goodsBookmarkList, setGoodsBookmarkList] = useState([]);
    // Goods 입력
    const [goodsRelationList, setGoodsRelationList] = useState([]);
    // Alert을 위한 state
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState("success");
    const [message, setMessage] = useState("정상 처리되었습니다.");

    useEffect(() => {
        // 최초 조회
        selectBookingCargoBookmark();
        selectBookingCargoGoodsBookmark();
    },[]);

    useEffect(() => {
        // 초기 Seq와 현재 seq 다른 경우
        // console.log(booking.init_cargo_bookmark_seq, booking.cargo_bookmark_seq)
        // Cargo 정보는 shp_bkg_cargo 테이블로 관리함.
        // init_cargo_seq 없는 경우 신규 입력.
        if( !booking.cargo_seq && ( booking.init_cargo_bookmark_seq != booking.cargo_bookmark_seq )) {
            // console.log("계속 호출됨")
            insertCargoOfBooking();
        } else {
            if( booking.cargo_seq && (booking.init_cargo_bookmark_seq != booking.cargo_bookmark_seq )) {
                // Cargo Bookmark로 booking의 Cargo 입력하기
                updateCargoOfBooking();
            }
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

            // Cargo Bookmark seq
            let cargo_bookmark_seq = props.booking.cargo_bookmark_seq;
            let init_cargo_bookmark_seq = props.booking.init_cargo_bookmark_seq;

            setBooking({...booking, 'bkg_no':bkg_no, 'bkg_date':bkg_date
                , 'status_cus':status_cus, 'sc_no':sc_no, 'user_no':user_no
                , 'cargo_bookmark_seq':cargo_bookmark_seq
                , 'init_cargo_bookmark_seq':init_cargo_bookmark_seq
            }); // 초기화 bookmark seq 값

            // 최초 조회하기
            selectCargoOfBooking(props.booking);
        }
    },[props.booking]);

    // Cargo Bookmark 선택
    const fncSelectCargo=(e)=>{
        //   console.log(e.target.value)
        // 선택
        if( 1 > e.target.value ) {
            // setBooking({});
            if ( coll ) {
                setColl(!coll)
            }
        // 그외 데이터인 경우
        } else {
            cargoBookmarkList.map((element, key)=>{
            if( e.target.value == element.cargo_bookmark_seq) {
                // console.log(element)
                // select로 새로운 document를 세팅한다
                // 기존 Booking 정보
                setBooking({...booking
                    ,'cargo_bookmark_seq':element.cargo_bookmark_seq
                    ,'cargo_bookmark_name':element.cargo_bookmark_name
                    ,'cargo_name':element.cargo_name
                    ,'cargo_hs_code':element.cargo_hs_code
                    ,'cargo_pack_qty':element.cargo_pack_qty
                    ,'cargo_pack_type':element.cargo_pack_type
                    ,'cargo_remark':element.cargo_remark
                    ,'cargo_total_volume':element.cargo_total_volume
                    ,'cargo_total_weight':element.cargo_total_weight
                    ,'cargo_type':element.cargo_type
                    ,'cargo_weight':element.cargo_weight
                    ,'selected_yn':'Y'
                });
            }
            });
            if ( !coll ) {
                setColl(!coll);
            }
        }
    }

    // CargoOfBooking
    const selectCargoGoodsOfBooking = (booking) => {
        axios.post(
            "/api/selectCargoGoodsOfBooking"
            ,{ user_no: 'M000002'
                , booking
            }
            ,{}
        ).then(
            res => {
                setGoodsRelationList(res.data);
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // CargoOfBooking
    const selectCargoOfBooking = ( booking ) => {
        axios.post(
            "/api/selectCargoOfBooking"
            ,{ user_no: 'M000002'
                , booking
            }
            ,{}
        ).then(
            res => {
                setBooking(res.data[0]);
                selectCargoGoodsOfBooking(res.data[0]);
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Cargo Bookmark 조회
    const selectBookingCargoBookmark = () => {
        axios.post(
            "/api/selectBookingCargoBookmark"
            ,{ user_no: 'M000002' }
            ,{}
        ).then(
            res => {
                setCargoBookmarkList(res.data);
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }
    // Cargo Bookmark 조회
    const selectBookingCargoGoodsBookmark = () => {
        axios.post(
            "/api/selectBookingCargoGoodsBookmark"
            ,{ user_no: 'M000002' }
            ,{}
        ).then(
            res => {
                setGoodsBookmarkList(res.data);
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    const insertCargoOfBooking = () => {
        axios.post(
            "/api/insertCargoOfBooking"
            ,{ user_no: 'M000002'
                , booking
                , goodsRelationList
            }
            ,{}
        ).then(
            
        ).then(
            res => {
                setBooking({...booking, 'cargo_seq':res.data.rows[0].cargo_seq});
                onDismiss("success", "정상 처리되었습니다.");
                selectCargoGoodsOfBooking(booking);
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }
    const updateCargoOfBooking = () => {
        axios.post(
            "/api/updateCargoOfBooking"
            ,{ user_no: 'M000002'
                , booking
                , goodsRelationList
            }
            ,{}
        ).then(
            
        ).then(
            res => {
                setBooking({...booking, 'init_cargo_bookmark_seq':booking.cargo_bookmark_seq});
                onDismiss("success", "정상 처리되었습니다.");
                selectCargoGoodsOfBooking(booking);
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }
    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setBooking({...booking, ['selected_yn']:'N'})
        setOpen(!open);
    }

    // Alert 메세지 팝업
    const onDismiss = (color, message) => {
        setColor(color);
        setMessage(message);
        setVisible(!visible);
    }

    const fncOnBlur = (cargo) => {
        setBooking(cargo);
    }
    const fncOnBlurGoodsRelation = (goodsRelationList) => {
        setGoodsRelationList(goodsRelationList);
    }
  return (
    <>
        <Row>
            <Col xl="12" lg="12">
                <Card>
                    <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>
                        <Row className="pb-4">
                            <Col className="mt-2 mb-0 col-5" style={{fontSize:'15px',color:'#696969',fontWeight:'600'}}>CARGO</Col>
                            <Col>
                                <Input type="select"
                                    style={{height:'35px',fonztSize:'10px',border:'0',borderBottom:'1px solid silver',borderRadius:'0',textAlignLast:'center'}}
                                    onChange={(e) => {
                                        fncSelectCargo(e)
                                    }}
                                    value={booking.cargo_bookmark_seq?booking.cargo_bookmark_seq:'0'}>
                                    <option key={0} value={'0'}>
                                        Cargo 선택
                                    </option>
                                    {(cargoBookmarkList.length>0)?cargoBookmarkList.map((element,key)=>{
                                        return(
                                            <option key={key} value={element.cargo_bookmark_seq}>
                                                {element.cargo_bookmark_name}
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
                                    <CardTitle>CARGO TYPE : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.cargo_type}</CardText>
                                    <CardTitle>Cargo Name : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.cargo_name}</CardText>
                                    <CardTitle>HS Code : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.cargo_hs_code}</CardText>
                                    <CardTitle>Pack Qty : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.cargo_pack_qty}</CardText>
                                    <CardTitle>Pack Type : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.cargo_pack_type}</CardText>
                                    <CardTitle>Cargo Weight : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.cargo_weight}</CardText>
                                    <CardTitle>Total Weight : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.cargo_total_weight}</CardText>
                                    <CardTitle>Total Volume : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.cargo_total_volume}</CardText>
                                    <CardTitle>Remark : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{booking.cargo_remark}</CardText>
                                </CardBody>
                            </Row>
                        </Collapse>
                        <div className="text-right">
                            <hr style={{position:'absolute',height:'0.5px',border:'0',width:'100%',left:'0',marginTop:'19px',backgroundColor:'silver'}}/>
                            <div>
                                <CargoBookmark
                                    cargoBookmarkList={cargoBookmarkList}
                                    goodsBookmarkList={goodsBookmarkList}
                                    selectBookingCargoBookmark={selectBookingCargoBookmark}
                                    selectBookingCargoGoodsBookmark={selectBookingCargoGoodsBookmark}/>
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
            <ModalHeader toggle={toggle}>Cargo</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <Cargo
                            cargo={booking}
                            fncOnBlur={fncOnBlur}/>
                        <Goods
                            cargo={booking}
                            goodsBookmarkList={goodsBookmarkList}
                            goodsRelationList={goodsRelationList}
                            fncOnBlur={fncOnBlur}
                            fncOnBlurGoodsRelation={fncOnBlurGoodsRelation}/>
                    </CardBody>
                </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(e)=>updateCargoOfBooking()}>Save</Button>{' '}
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

export default CargoCard;