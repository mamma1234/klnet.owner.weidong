/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect, forwardRef } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse, UncontrolledTooltip,
    Button, Card, FormGroup, Label} from "reactstrap";
import axios from "axios";
import Select from "react-select";
import ConsigneeWdfc from "./ConsigneeWdfc.js";
import * as validation from 'components/common/validation.js';
import ConsigneeBookmarkWdfc from "./ConsigneeBookmarkWdfc.js";
import InputValid from "components/CustomInput/InputValid.js";


const ConsigneeCardWdfc = forwardRef((props, consigneeFocus) => {

    // Collapse Flag
    const [coll, setColl] = useState(false);
    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // Consignee
    const [booking, setBooking] = useState({});
    const [openType, setOpenType] = useState("");
    const [pureBooking, setPureBooking] = useState({});
    const [consigneeList, setConsigneeList] = useState({});
    const {user} = props;

    useEffect(() => {
        // 최초 조회
        // selectBookingConsigneeBookmark();
    },[]);

    // 20210305 Card 내에서의 저장행위는 중지 하도록 한다.
    useEffect(() => {
        // if( "Y" === booking.selected_yn ) {
        //     // Consignee Bookmark로 booking의 Consignee 입력하기
        //     updateConsigneeOfBooking();
        // }
        if( "CARD" != openType ) {
            setPureBooking(booking);
        }
    },[booking]);

    useEffect(()=>{
        setColl(props.openWindow);
    },[props.openWindow]);

    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        if( props.booking.bkg_no ) {
            setBooking(props.booking);
        }
    },[props.booking]);
    useEffect(()=>{
        setConsigneeList(props.consigneeList);
    },[props.consigneeList]);

    // Consignee Bookmark 선택
    const fncSelectConsignee=(e)=>{
        //   console.log(e.target.value)
        // 선택
        if( 1 > e.value ) {
            // setBooking({});
            if ( coll ) {
                setColl(!coll)
            }
        // 그외 데이터인 경우
        } else {
            consigneeList.map((element, key)=>{
            if( e.value == element.consignee_bookmark_seq) {
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
                    ,'selected_yn':'Y'
                });
                props.fncBookingParent({...booking
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
                    ,'selected_yn':'Y'
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
            "/shipper/selectConsigneeOfBooking"
            ,{ user_no: user?user.user_no:null
                , booking
            }
            ,{}
        ).then(
            res => setBooking(res.data[0])
        );
    }

    const fncValidation=()=>{
        if( booking.cons_user_email ) {
            if( !validation.validationEmail(booking.cons_user_email) ) return false;
        }
        return true;
    }
    const updateConsigneeOfBooking = () => {
        if( !fncValidation() ) return false;
        axios.post(
            "/shipper/updateConsigneeOfBooking"
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
    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }

    const fncOnBlur = (consignee) => {
        setBooking(consignee);
        props.fncBookingParent(consignee);
    }
    // 수정된 내용은 CONSIGNEE 저장
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
        <Row id="Consignee">
            <Col xl="12" lg="12">
                <Card style={{zIndex:'80'}}>
                    <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>  
                        <Row className="pb-2">
                            <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>CONSIGNEE
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
                                            value={{value:booking.consignee_bookmark_seq?booking.consignee_bookmark_seq:''
                                            ,label:booking.consignee_bookmark_name?booking.consignee_bookmark_name:'선택'}}
                                            onChange={(e)=>fncSelectConsignee(e?e:null)}
                                            options={consigneeList}
                                            placeholder={"선택"}
                                            ref={consigneeFocus}
                                        />
                                    </Col>
                                    <Col className="col-2 pl-auto pr-auto">
                                        <ConsigneeBookmarkWdfc
                                            consigneeList={consigneeList}
                                            selectBookingConsigneeBookmark={props.selectBookingConsigneeBookmark}
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
                                            {/* <Input type="text"
                                                bsSize="sm"
                                                name="cons_code"
                                                id="cons_code"
                                                placeholder=""
                                                maxLength="35"
                                                value={booking.cons_code?booking.cons_code:''}
                                                onChange={(e)=>fncOnChange(e, 'cons_code')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                /> */}

                                            <InputValid 
                                                type="text"
                                                name="cons_code"
                                                id="cons_code"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.cons_code?booking.cons_code:''}
                                                onChange={(e)=>fncOnChange(e, 'cons_code')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="consignee"
                                            />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                                <Col xl="12" lg="12" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Name</Label></Col>
                                            <Col>
                                            {/* <Input type="text"
                                                bsSize="sm"
                                                name="cons_name1"
                                                id="cons_name1"
                                                placeholder=""
                                                maxLength="35"
                                                value={booking.cons_name1?booking.cons_name1:''}
                                                onChange={(e)=>fncOnChange(e, 'cons_name1')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="cons_name1"
                                                id="cons_name1"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.cons_name1?booking.cons_name1:''}
                                                onChange={(e)=>fncOnChange(e, 'cons_name1')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="consignee"
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
                                                name="cons_name2"
                                                id="cons_name2"
                                                placeholder=""
                                                maxLength="35"
                                                value={booking.cons_name2?booking.cons_name2:''}
                                                onChange={(e)=>fncOnChange(e, 'cons_name2')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="cons_name2"
                                                id="cons_name2"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.cons_name2?booking.cons_name2:''}
                                                onChange={(e)=>fncOnChange(e, 'cons_name2')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="consignee"
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
                                            {/* <Input type="text"
                                                bsSize="sm"
                                                name="cons_user_name"
                                                id="cons_user_name"
                                                placeholder=""
                                                maxLength="17"
                                                value={booking.cons_user_name?booking.cons_user_name:''}
                                                onChange={(e)=>fncOnChange(e, 'cons_user_name')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="cons_user_name"
                                                id="cons_user_name"
                                                placeholder=""
                                                maxLength="17"
                                                bsSize="sm"
                                                value={booking.cons_user_name?booking.cons_user_name:''}
                                                onChange={(e)=>fncOnChange(e, 'cons_user_name')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="consignee"
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
                                            {/* <Input type="text"
                                                bsSize="sm"
                                                name="cons_user_tel"
                                                id="cons_user_tel"
                                                placeholder=""
                                                maxLength="25"
                                                value={booking.cons_user_tel?booking.cons_user_tel:''}
                                                onChange={(e)=>fncOnChange(e, 'cons_user_tel')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="cons_user_tel"
                                                id="cons_user_tel"
                                                placeholder=""
                                                maxLength="25"
                                                bsSize="sm"
                                                value={booking.cons_user_tel?booking.cons_user_tel:''}
                                                onChange={(e)=>fncOnChange(e, 'cons_user_tel')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="tel"
                                                required={false} 
                                                feedid="consignee"
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
                                            {/* <Input type="text"
                                                bsSize="sm"
                                                name="cons_user_fax"
                                                id="cons_user_fax"
                                                placeholder=""
                                                maxLength="25"
                                                value={booking.cons_user_fax?booking.cons_user_fax:''}
                                                onChange={(e)=>fncOnChange(e, 'cons_user_fax')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="cons_user_fax"
                                                id="cons_user_fax"
                                                placeholder=""
                                                maxLength="25"
                                                bsSize="sm"
                                                value={booking.cons_user_fax?booking.cons_user_fax:''}
                                                onChange={(e)=>fncOnChange(e, 'cons_user_fax')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="tel"
                                                required={false} 
                                                feedid="consignee"
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
                                            {/* <Input type="text"
                                                bsSize="sm"
                                                name="cons_user_dept"
                                                id="cons_user_dept"
                                                placeholder=""
                                                maxLength="35"
                                                value={booking.cons_user_dept?booking.cons_user_dept:''}
                                                onChange={(e)=>fncOnChange(e, 'cons_user_dept')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="cons_user_dept"
                                                id="cons_user_dept"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.cons_user_dept?booking.cons_user_dept:''}
                                                onChange={(e)=>fncOnChange(e, 'cons_user_dept')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="consignee"
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
                                            {/* <Input type="text"
                                                bsSize="sm"
                                                name="cons_user_email"
                                                id="cons_user_email"
                                                placeholder=""
                                                maxLength="25"
                                                value={booking.cons_user_email?booking.cons_user_email:''}
                                                onChange={(e)=>fncOnChange(e, 'cons_user_email')}
                                                invalid={booking.cons_user_email?(validation.validationEmail(booking.cons_user_email)?false:true):false}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                />
                                            <FormFeedback>{validation.EML_MSG}</FormFeedback> */}

                                            <InputValid 
                                                type="text"
                                                name="cons_user_email"
                                                id="cons_user_email"
                                                placeholder=""
                                                maxLength="50"
                                                bsSize="sm"
                                                value={booking.cons_user_email?booking.cons_user_email:''}
                                                onChange={(e)=>fncOnChange(e, 'cons_user_email')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="email"
                                                required={false} 
                                                feedid="consignee"
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
                                                name="cons_address1"
                                                id="cons_address1"
                                                placeholder=""
                                                value={booking.cons_address1?booking.cons_address1:''}
                                                maxLength="35"
                                                onChange={(e)=>fncOnChange(e, 'cons_address1')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="cons_address1"
                                                id="cons_address1"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.cons_address1?booking.cons_address1:''}
                                                onChange={(e)=>fncOnChange(e, 'cons_address1')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="consignee"
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
                                                name="cons_address2"
                                                id="cons_address2"
                                                placeholder=""
                                                value={booking.cons_address2?booking.cons_address2:''}
                                                maxLength="35"
                                                onChange={(e)=>fncOnChange(e, 'cons_address2')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="cons_address2"
                                                id="cons_address2"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.cons_address2?booking.cons_address2:''}
                                                onChange={(e)=>fncOnChange(e, 'cons_address2')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="consignee"
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
                                                name="cons_address3"
                                                id="cons_address3"
                                                placeholder=""
                                                value={booking.cons_address3?booking.cons_address3:''}
                                                maxLength="35"
                                                onChange={(e)=>fncOnChange(e, 'cons_address3')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="cons_address3"
                                                id="cons_address3"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.cons_address3?booking.cons_address3:''}
                                                onChange={(e)=>fncOnChange(e, 'cons_address3')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="consignee"
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
                                                name="cons_address4"
                                                id="cons_address4"
                                                placeholder=""
                                                value={booking.cons_address4?booking.cons_address4:''}
                                                maxLength="35"
                                                onChange={(e)=>fncOnChange(e, 'cons_address4')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="cons_address4"
                                                id="cons_address4"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.cons_address4?booking.cons_address4:''}
                                                onChange={(e)=>fncOnChange(e, 'cons_address4')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="consignee"
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
                                                name="cons_address5"
                                                id="cons_address5"
                                                placeholder=""
                                                value={booking.cons_address5?booking.cons_address5:''}
                                                maxLength="35"
                                                onChange={(e)=>fncOnChange(e, 'cons_address5')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="cons_address5"
                                                id="cons_address5"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.cons_address5?booking.cons_address5:''}
                                                onChange={(e)=>fncOnChange(e, 'cons_address5')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="consignee"
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
            <ModalHeader toggle={toggle}>Consignee</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <ConsigneeWdfc
                            consignee={booking}
                            fncOnBlur={fncOnBlur}
                            openType={"CARD"}
                            fncOpenType={fncOpenType}
                            {...props}
                            />
                    </CardBody>
                </ModalBody>
            <ModalFooter>
                {/* <Button color="primary" onClick={(e)=>updateConsigneeOfBooking()}>Save</Button>{' '} */}
                <Button color="primary" onClick={toggle}>Apply</Button>
                <Button color="secondary" onClick={fncCacelModal}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>
    );
});

export default ConsigneeCardWdfc;