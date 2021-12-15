/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse, UncontrolledTooltip,
    Button, Card, FormGroup, Label} from "reactstrap";
import CarrierWdfc from "./CarrierWdfc.js";
import CarrierBookmarkWdfc from './CarrierBookmarkWdfc.js';
import Select from "react-select";
import axios from "axios";
import * as validation from 'components/common/validation.js';
import InputValid from "components/CustomInput/InputValid.js";

const CarrierCardWdfc = (props) => {
    // Collapse Flag
    const [coll, setColl] = useState(false);
    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // Line
    const [booking, setBooking] = useState({});
    const [pureBooking, setPureBooking] = useState({});
    const [lineList, setLineList] = useState([]);
    const [openType, setOpenType] = useState("");
    const {user} = props;

    useEffect(() => {
        // Line Bookmark 최초조회
        // selectBookingLineBookmark();
    },[]);

    useEffect(()=>{
        setColl(props.openWindow);
    },[props.openWindow]);

    // 20210305 Card 내에서의 저장행위는 중지 하도록 한다.
    useEffect(() => {
        if( "CARD" != openType ) {
            setPureBooking(booking);
        }
    },[booking]);

    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        if( props.booking ) {
            setBooking(props.booking);
        }
    },[props.booking]);
    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        setLineList(props.lineList);
    },[props.lineList]);

    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        setColl(props.openWindow);
    },[props.openWindow]);

    // Line Bookmark 선택
    const fncSelectLine=(e)=>{
        //   console.log(e.target.value)
        // 선택
        if( 1 > e.value ) {
            // setBooking({});
            if ( coll ) {
                setColl(!coll)
            }
        // 그외 데이터인 경우
        } else {
            lineList.map((element, key)=>{
            if( e.value == element.line_bookmark_seq) {
                // console.log(element)
                // select로 새로운 document를 세팅한다
                // 기존 Booking 정보
                setBooking({...booking
                    ,'line_bookmark_seq':element.line_bookmark_seq
                    ,'line_bookmark_name':element.line_bookmark_name
                    ,'line_name1':element.line_name1
                    ,'line_name2':element.line_name2
                    ,'line_code':element.line_code
                    ,'line_user_email':element.line_user_email
                    ,'line_user_fax':element.line_user_fax
                    ,'line_user_name':element.line_user_name
                    ,'line_user_tel':element.line_user_tel
                    ,'line_user_dept':element.line_user_dept
                    ,'line_address1':element.line_address1
                    ,'line_address2':element.line_address2
                    ,'line_address3':element.line_address3
                    ,'line_address4':element.line_address4
                    ,'line_address5':element.line_address5
                    ,'selected_yn':'Y'
                });
                props.fncBookingParent({...booking
                    ,'line_bookmark_seq':element.line_bookmark_seq
                    ,'line_bookmark_name':element.line_bookmark_name
                    ,'line_name1':element.line_name1
                    ,'line_name2':element.line_name2
                    ,'line_code':element.line_code
                    ,'line_user_email':element.line_user_email
                    ,'line_user_fax':element.line_user_fax
                    ,'line_user_name':element.line_user_name
                    ,'line_user_tel':element.line_user_tel
                    ,'line_user_dept':element.line_user_dept
                    ,'line_address1':element.line_address1
                    ,'line_address2':element.line_address2
                    ,'line_address3':element.line_address3
                    ,'line_address4':element.line_address4
                    ,'line_address5':element.line_address5
                    ,'selected_yn':'Y'
                });
            }
            });
            if ( !coll ) {
                setColl(!coll);
            }
        }
    }

    // LineOfBooking
    const selectLineOfBooking = ( booking ) => {
        axios.post(
            "/shipper/selectLineOfBooking"
            ,{ user_no: user?user.user_no:null
                , booking
            }
            ,{}
        ).then(
            res => setBooking(res.data[0])
        );
    }

    const fncValidation =()=> {
        if( booking.line_user_email ) {
            if( !validation.validationEmail(booking.line_user_email) ) return false;
        }
        return true;
    }
    const updateLineOfBooking = () => {
        if( !fncValidation() ) return false;

        axios.post(
            "/shipper/updateLineOfBooking"
            ,{ user_no: user?user.user_no:null
                , booking
            }
            ,{}
        ).then(
            
        ).then(
            res => {
                setBooking({...booking, 'selected_yn':'N'});
                // onDismiss("success", "정상 처리되었습니다.");
            }
        );
    }

    const fncOnBlur = (line) => {
        setBooking(line);
        props.fncBookingParent(line);
    }

    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }
    // 수정된 내용은 Line 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setBooking({...booking, [key]:e.target.value.toUpperCase()});
    }

    // Cancel 버튼 적용을 위한 작업
    const fncOpenType = ( openType )=> {
        setOpenType(openType);
    }
    const fncCacelModal =()=>{
        setBooking( pureBooking );
        props.fncBookingParent( pureBooking );
        toggle();
    }
  return (
    <>
        <Row id="Carrier">
            <Col xl="12" lg="12">
                <Card style={{zIndex:'90'}}>
                    <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>  
                        <Row className="pb-2">
                            <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>CARRIER
                                <Button className="pl-1" color="link" id="lineview" onClick={toggle.bind(this, 'S')}><i className="fa fa-pencil-square-o fa-2x"/></Button>
                                <UncontrolledTooltip delay={0} target="lineview">Input</UncontrolledTooltip>
                            </Col>
                            <Col>
                                <Row>
                                    <Col className="col-10 pr-0">
                                        <Select
                                            className="react-select react-select-primary"
                                            classNamePrefix="react-select"
                                            name="lineBookmark"
                                            value={{value:booking.line_bookmark_seq?booking.line_bookmark_seq:''
                                            ,label:booking.line_bookmark_name?booking.line_bookmark_name:'선택'}}
                                            onChange={(e)=>fncSelectLine(e?e:null)}
                                            options={lineList}
                                            placeholder={"선택"}
                                            />
                                    </Col>
                                    <Col className="col-2 pl-auto pr-auto">
                                        <CarrierBookmarkWdfc
                                            lineList={lineList}
                                            selectBookingLineBookmark={props.selectBookingLineBookmark}
                                            onAlert={props.onAlert}
                                            {...props}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Collapse isOpen={coll}>
                            <hr className="mt-0"/>
                            <Row>
                                <Col xl="12" lg="12" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Code</Label></Col>
                                            <Col>
                                            {/* <Input type="text" name="line_code" id="line_code"
                                                bsSize="sm"
                                                placeholder=""
                                                maxLength="35"
                                                value={booking.line_code?booking.line_code:''}
                                                onChange={(e)=>fncOnChange(e, 'line_code')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                readOnly
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="line_code"
                                                id="line_code"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.line_code?booking.line_code:''}
                                                onChange={(e)=>fncOnChange(e, 'line_code')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false}
                                                readOnly
                                            />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl="12" lg="12" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Name</Label></Col>
                                            <Col>
                                            {/* <Input type="text" name="line_name1" id="line_name1"
                                                bsSize="sm"
                                                placeholder=""
                                                maxLength="35"
                                                value={booking.line_name1?booking.line_name1:''}
                                                onChange={(e)=>fncOnChange(e, 'line_name1')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="line_name1"
                                                id="line_name1"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.line_name1?booking.line_name1:''}
                                                onChange={(e)=>fncOnChange(e, 'line_name1')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false}
                                                feedid="carrier"
                                            />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                                <Col xl="12" lg="12" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0"></Label></Col>
                                            <Col>
                                            {/* <Input type="text" name="line_name2" id="line_name2"
                                                bsSize="sm"
                                                placeholder=""
                                                maxLength="35"
                                                value={booking.line_name2?booking.line_name2:''}
                                                onChange={(e)=>fncOnChange(e, 'line_name2')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="line_name2"
                                                id="line_name2"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.line_name2?booking.line_name2:''}
                                                onChange={(e)=>fncOnChange(e, 'line_name2')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false}
                                                feedid="carrier"
                                            />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl="12" lg="12" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0">User</Label></Col>
                                            <Col>
                                            {/* <Input type="text" name="line_user_name" id="line_user_name"
                                                bsSize="sm"
                                                placeholder=""
                                                maxLength="17"
                                                value={booking.line_user_name?booking.line_user_name:''}
                                                onChange={(e)=>fncOnChange(e, 'line_user_name')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="line_user_name"
                                                id="line_user_name"
                                                placeholder=""
                                                maxLength="17"
                                                bsSize="sm"
                                                value={booking.line_user_name?booking.line_user_name:''}
                                                onChange={(e)=>fncOnChange(e, 'line_user_name')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false}
                                                feedid="carrier"
                                            />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                                <Col xl="12" lg="12" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Tel</Label></Col>
                                            <Col>
                                            {/* <Input type="text" name="line_user_tel" id="line_user_tel"
                                                bsSize="sm"
                                                placeholder=""
                                                maxLength="25"
                                                value={booking.line_user_tel?booking.line_user_tel:''}
                                                onChange={(e)=>fncOnChange(e, 'line_user_tel')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="line_user_tel"
                                                id="line_user_tel"
                                                placeholder=""
                                                maxLength="25"
                                                bsSize="sm"
                                                value={booking.line_user_tel?booking.line_user_tel:''}
                                                onChange={(e)=>fncOnChange(e, 'line_user_tel')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                validtype="tel"
                                                required={false}
                                                feedid="carrier"
                                            />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                                <Col xl="12" lg="12" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Fax</Label></Col>
                                            <Col>
                                            {/* <Input type="text" name="line_user_fax" id="line_user_fax"
                                                bsSize="sm"
                                                placeholder=""
                                                maxLength="20"
                                                value={booking.line_user_fax?booking.line_user_fax:''}
                                                onChange={(e)=>fncOnChange(e, 'line_user_fax')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="line_user_fax"
                                                id="line_user_fax"
                                                placeholder=""
                                                maxLength="20"
                                                bsSize="sm"
                                                value={booking.line_user_fax?booking.line_user_fax:''}
                                                onChange={(e)=>fncOnChange(e, 'line_user_fax')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                validtype="tel"
                                                required={false}
                                                feedid="carrier"
                                            />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl="12" lg="12" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Dept</Label></Col>
                                            <Col>
                                            {/* <Input type="text" name="line_user_dept" id="line_user_dept"
                                                bsSize="sm"
                                                placeholder=""
                                                maxLength="35"
                                                value={booking.line_user_dept?booking.line_user_dept:''}
                                                onChange={(e)=>fncOnChange(e, 'line_user_dept')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="line_user_dept"
                                                id="line_user_dept"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.line_user_dept?booking.line_user_dept:''}
                                                onChange={(e)=>fncOnChange(e, 'line_user_dept')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false}
                                                feedid="carrier"
                                            />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                                <Col xl="12" lg="12" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0">E-mail</Label></Col>
                                            <Col>
                                            {/* <Input type="email"
                                                bsSize="sm"
                                                name="line_user_email" id="line_user_email"
                                                placeholder=""
                                                maxLength="25"
                                                value={booking.line_user_email?booking.line_user_email:''}
                                                onChange={(e)=>fncOnChange(e, 'line_user_email')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                invalid={booking.line_user_email?(validation.validationEmail(booking.line_user_email)?false:true):false}
                                                />
                                            <FormFeedback>{validation.EML_MSG}</FormFeedback> */}
                                            <InputValid 
                                                type="text"
                                                name="line_user_email"
                                                id="line_user_email"
                                                placeholder=""
                                                maxLength="25"
                                                bsSize="sm"
                                                value={booking.line_user_email?booking.line_user_email:''}
                                                onChange={(e)=>fncOnChange(e, 'line_user_email')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                validtype="email"
                                                required={false}
                                                feedid="carrier"
                                            />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl="12" lg="12" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Address</Label></Col>
                                            <Col>
                                            {/* <Input type="text"
                                                bsSize="sm"
                                                name="line_address1"
                                                id="line_address1"
                                                placeholder=""
                                                value={booking.line_address1?booking.line_address1:''}
                                                maxLength="35"
                                                onChange={(e)=>fncOnChange(e, 'line_address1')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="line_address1"
                                                id="line_address1"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.line_address1?booking.line_address1:''}
                                                onChange={(e)=>fncOnChange(e, 'line_address1')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false}
                                                feedid="carrier"
                                            />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                                <Col xl="12" lg="12" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0"></Label></Col>
                                            <Col>
                                            {/* <Input type="text"
                                                bsSize="sm"
                                                name="line_address2"
                                                id="cons_adline_address2dress2"
                                                placeholder=""
                                                value={booking.line_address2?booking.line_address2:''}
                                                maxLength="35"
                                                onChange={(e)=>fncOnChange(e, 'line_address2')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="line_address2"
                                                id="line_address2"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.line_address2?booking.line_address2:''}
                                                onChange={(e)=>fncOnChange(e, 'line_address2')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false}
                                                feedid="carrier"
                                            />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                                <Col xl="12" lg="12" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0"></Label></Col>
                                            <Col>
                                            {/* <Input type="text"
                                                bsSize="sm"
                                                name="line_address3"
                                                id="cons_adline_address2dress3"
                                                placeholder=""
                                                value={booking.line_address3?booking.line_address3:''}
                                                maxLength="35"
                                                onChange={(e)=>fncOnChange(e, 'line_address3')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="line_address3"
                                                id="line_address3"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.line_address3?booking.line_address3:''}
                                                onChange={(e)=>fncOnChange(e, 'line_address3')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false}
                                                feedid="carrier"
                                            />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                                <Col xl="12" lg="12" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0"></Label></Col>
                                            <Col>
                                            {/* <Input type="text"
                                                bsSize="sm"
                                                name="line_address4"
                                                id="cons_adline_address2dress4"
                                                placeholder=""
                                                value={booking.line_address4?booking.line_address4:''}
                                                maxLength="35"
                                                onChange={(e)=>fncOnChange(e, 'line_address4')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="line_address4"
                                                id="line_address4"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.line_address4?booking.line_address4:''}
                                                onChange={(e)=>fncOnChange(e, 'line_address4')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false}
                                                feedid="carrier"
                                            />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                                <Col xl="12" lg="12" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0"></Label></Col>
                                            <Col>
                                            {/* <Input type="text"
                                                bsSize="sm"
                                                name="line_address5"
                                                id="cons_adline_address2dress5"
                                                placeholder=""
                                                value={booking.line_address5?booking.line_address5:''}
                                                maxLength="35"
                                                onChange={(e)=>fncOnChange(e, 'line_address5')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="line_address5"
                                                id="line_address5"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.line_address5?booking.line_address5:''}
                                                onChange={(e)=>fncOnChange(e, 'line_address5')}
                                                onBlur={(e)=>{props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false}
                                                feedid="carrier"
                                            />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Collapse>
                        <div className="text-center" onClick={() => setColl(!coll)}>
                            <div>         
                                <Button className="p-0" color="link" id="linemore" onClick={() => setColl(!coll)} style={{height:'21px'}}>
                                    {coll?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
                                </Button>
                                <UncontrolledTooltip delay={0} target="linemore">{coll?'Close':'Open'}</UncontrolledTooltip>
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
            <ModalHeader toggle={toggle}>Carrier</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <CarrierWdfc
                            line={booking}
                            fncOnBlur={fncOnBlur}
                            openType={"CARD"}
                            fncOpenType={fncOpenType}
                            {...props}/>
                    </CardBody>
                </ModalBody>
            <ModalFooter>
                {/* <Button color="primary" onClick={updateLineOfBooking}>Save</Button>{' '} */}
                <Button color="primary" onClick={toggle}>Apply</Button>{' '}
                <Button color="secondary" onClick={fncCacelModal}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>
    );
}

export default CarrierCardWdfc;