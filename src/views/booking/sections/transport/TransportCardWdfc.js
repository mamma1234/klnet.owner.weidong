/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect, forwardRef } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    Button, Card,  FormGroup,Label, UncontrolledTooltip} from "reactstrap";
import TransportWdfc from "./TransportWdfc.js";
import Select from "react-select";
import TransportBookmarkWdfc from "./TransportBookmarkWdfc.js";
import axios from "axios";
import * as validation from 'components/common/validation.js';
import InputValid from "components/CustomInput/InputValid.js";


const TransportCardWdfc = forwardRef((props, transportFocus) => {
    
    // Collapse Flag
    const [coll, setColl] = useState(false);
    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // TransPort
    const [booking, setBooking] = useState({});
    const [openType, setOpenType] = useState("");
    const [pureBooking, setPureBooking] = useState({});

    const [transportList, setTransportList] = useState([]);
    const [transSelfList, setTransSelfList] = useState([
        {value:'Y', label:'자가운송'},
        {value:'N', label:'라인운송'},
    ])

    const {user} = props;
    

    useEffect(() => {
        // 최초조회
        // selectBookingTransportBookmark();
    },[]);

    useEffect(()=>{
        setColl(props.openWindow);
    },[props.openWindow]);

    // 20210305 Card 내에서의 저장행위는 중지 하도록 한다.
    useEffect(() => {
        // if( "Y" === booking.selected_yn ) {
        //     // Transport Bookmark로 booking의 Transport 입력하기
        //     updateTransportOfBooking();
        // }
        if( "CARD" != openType ) {
            setPureBooking(booking);
        }
    },[booking]);

    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        if( props.booking.bkg_no ) {
            setBooking(props.booking);
        }
    },[props.booking]);
    useEffect(()=>{
        setTransportList(props.transportList);
    },[props.transportList]);

    // Transport Bookmark 선택
    const fncSelectTransport=(value)=>{
          if( value ) {
              // 선택
              if( 1 > value.value ) {
                  // setBooking({});
                  if ( coll ) {
                      setColl(!coll)
                  }
              // 그외 데이터인 경우
              } else {
                  transportList.map((element, key)=>{
                  if( value.value == element.transport_bookmark_seq) {
                      // console.log(element)
                      // select로 새로운 document를 세팅한다
                      // 기존 Booking 정보
                      setBooking({...booking
                          ,'transport_bookmark_seq':element.transport_bookmark_seq
                          ,'transport_bookmark_name':element.transport_bookmark_name
                          // name1이 존재하면 name2도 같이 세팅 2021.10.19
                          ,'trans_name1':element.trans_name1?element.trans_name1:booking.trans_name1
                          ,'trans_name2':element.trans_name1?element.trans_name2:booking.trans_name2
                          ,'trans_code':element.trans_code?element.trans_code:booking.trans_code
                          ,'trans_self_yn':element.trans_self_yn?element.trans_self_yn:booking.trans_self_yn
                          ,'trans_user_fax':element.trans_user_fax?element.trans_user_fax:booking.trans_user_fax
                          ,'trans_user_name':element.trans_user_name?element.trans_user_name:booking.trans_user_name
                          ,'trans_user_tel':element.trans_user_tel?element.trans_user_tel:booking.trans_user_tel
                          ,'trans_user_email':element.trans_user_email?element.trans_user_email:booking.trans_user_email
                          // ,'trans_fac_name':element.trans_fac_name?element.trans_fac_name:booking.trans_fac_name
                          // ,'trans_fac_area_name':element.trans_fac_area_name?element.trans_fac_area_name:booking.trans_fac_area_name
                          // ,'trans_remark':element.trans_remark?element.trans_remark:booking.trans_remark
                          ,'selected_yn':'Y'
                      });
                      props.fncBookingParent({...booking
                          ,'transport_bookmark_seq':element.transport_bookmark_seq
                          ,'transport_bookmark_name':element.transport_bookmark_name
                          // name1이 존재하면 name2도 같이 세팅 2021.10.19
                          ,'trans_name1':element.trans_name1?element.trans_name1:booking.trans_name1
                          ,'trans_name2':element.trans_name1?element.trans_name2:booking.trans_name2
                          ,'trans_code':element.trans_code?element.trans_code:booking.trans_code
                          ,'trans_self_yn':element.trans_self_yn?element.trans_self_yn:booking.trans_self_yn
                          ,'trans_user_fax':element.trans_user_fax?element.trans_user_fax:booking.trans_user_fax
                          ,'trans_user_name':element.trans_user_name?element.trans_user_name:booking.trans_user_name
                          ,'trans_user_tel':element.trans_user_tel?element.trans_user_tel:booking.trans_user_tel
                          ,'trans_user_email':element.trans_user_email?element.trans_user_email:booking.trans_user_email
                          // ,'trans_fac_name':element.trans_fac_name?element.trans_fac_name:booking.trans_fac_name
                          // ,'trans_fac_area_name':element.trans_fac_area_name?element.trans_fac_area_name:booking.trans_fac_area_name
                          // ,'trans_remark':element.trans_remark?element.trans_remark:booking.trans_remark
                          ,'selected_yn':'Y'
                      });
                  }
                  });
                  if ( !coll ) {
                      setColl(!coll);
                  }
              }
          } else {
            if( booking.transport_bookmark_seq) {
                // console.log(element)
                // select로 새로운 document를 세팅한다
                // 기존 Booking 정보
                setBooking({...booking
                    ,'transport_bookmark_seq': null
                    ,'transport_bookmark_name': null
                    // name1이 존재하면 name2도 같이 세팅 2021.10.19
                    ,'trans_name1': null
                    ,'trans_name2': null
                    ,'trans_code': null
                    ,'trans_self_yn': null
                    ,'trans_user_fax': null
                    ,'trans_user_name': null
                    ,'trans_user_tel': null
                    ,'trans_user_email': null
                    ,'selected_yn':'Y'
                });
                props.fncBookingParent({...booking
                    ,'transport_bookmark_seq': null
                    ,'transport_bookmark_name': null
                    // name1이 존재하면 name2도 같이 세팅 2021.10.19
                    ,'trans_name1': null
                    ,'trans_name2': null
                    ,'trans_code': null
                    ,'trans_self_yn': null
                    ,'trans_user_fax': null
                    ,'trans_user_name': null
                    ,'trans_user_tel': null
                    ,'trans_user_email': null
                    ,'selected_yn':'Y'
                });
            }
          }
    }

    // TransportOfBooking
    const selectTransportOfBooking = ( booking ) => {
        axios.post(
            "/shipper/selectTransportOfBooking"
            ,{ user_no: user?user.user_no:null
                , booking
            }
            ,{}
        ).then(
            res => setBooking(res.data[0])
        );
    }

    const fncValidation =()=> {
        if( booking.trans_user_email ) {
            if( !validation.validationEmail(booking.trans_user_email) ) return false;
        }
        return true;
    }
    const updateTransportOfBooking = () => {
        if( !fncValidation() ) return false;
        axios.post(
            "/shipper/updateTransportOfBooking"
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

    const fncOnBlur = (transport) => {
        setBooking(transport);
        props.fncBookingParent(transport);
    }

    // 수정된 내용은 Trans 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setBooking({...booking, [key]:e.target.value.toUpperCase()});
    }

    // 수정된 내용은 Trans 저장
    const fncOnChangeSelect = ( e, key ) => {
        // console.log(e.target.value)
        // e.preventDefault();
        setBooking({...booking, [key]:e.value});
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
        <Row id="Transport">
            <Col xl="12" lg="12">
                <Card style={{zIndex:'70'}}>
                    <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>  
                        <Row className="pb-2">
                            <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>TRANSPORT
                                <Button className="pl-1" color="link" id="lineview" onClick={toggle.bind(this, 'S')}><i className="fa fa-pencil-square-o fa-2x"/></Button>
                                <UncontrolledTooltip delay={0} target="lineview">Input</UncontrolledTooltip>
                            </Col>
                            <Col>
                                <Row>
                                    <Col className="col-10 pr-0">
                                        <Select
                                            className="react-select react-select-primary"
                                            classNamePrefix="react-select"
                                            name="carrierbookmark"
                                            value={{value:booking.transport_bookmark_seq?booking.transport_bookmark_seq:''
                                            ,label:booking.transport_bookmark_name?booking.transport_bookmark_name:'선택'}}
                                            onChange={(value)=>fncSelectTransport(value?value:null)}
                                            options={transportList}
                                            placeholder={"선택"}
                                            ref={transportFocus}
                                            isClearable={booking.transport_bookmark_seq?true:false}
                                        />
                                    </Col>
                                    <Col className="col-2 pl-auto pr-auto">
                                        {/* <Button className="pl-0 pr-0" color="link" id="linebookmark" onClick={toggle.bind(this, 'B')}><i className="fa fa-bookmark-o fa-2x" /></Button> */}
                                        <TransportBookmarkWdfc
                                            transportList={transportList}
                                            selectBookingTransportBookmark={props.selectBookingTransportBookmark}
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
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Haulage</Label></Col>
                                            <Col>
                                                <Select
                                                    className="customSelect"
                                                    classNamePrefix="customSelect"
                                                    //className="react-select react-select-primary"
                                                    //classNamePrefix="react-select"
                                                    name="trans_self_yn"
                                                    placeholder=""
                                                    value={{value:booking.trans_self_yn?booking.trans_self_yn:'',
                                                        label:booking.trans_self_yn?transSelfList[transSelfList.findIndex(x=>x.value===booking.trans_self_yn)].label:'선택'}
                                                    }
                                                    onChange={(value)=>{fncOnChangeSelect(value, 'trans_self_yn');props.fncBookingParent({...booking,'trans_self_yn':value.value});}}
                                                    // onBlur={(e)=>props.fncBookingParent(booking)}
                                                    options={transSelfList}
                                                    styles={{
                                                        control: provided => ({...provided,border:!booking.trans_self_yn?'1px solid red':'' }),
                                                        indicatorContainer: provided => ({...provided,color:''})
                                                    }}
                                                />
                                                <InputValid
                                                    hidden
                                                    type="text"
                                                    name="trans_self_yn"
                                                    id="trans_self_yn"
                                                    placeholder=""
                                                    maxLength="20"
                                                    value={booking.trans_self_yn?booking.trans_self_yn:''}
                                                    validtype="select"
                                                    required={booking.trans_self_yn?false:true} 
                                                    feedid="transport"
                                                    readOnly
                                                />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                                <Col xl="12" lg="12" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Code</Label></Col>
                                            <Col>
                                            {/* <Input type="text" name="trans_code" id="trans_code"
                                                bsSize="sm"
                                                placeholder=""
                                                maxLength="10"
                                                value={booking.trans_code?booking.trans_code:''}
                                                onChange={(e)=>fncOnChange(e, 'trans_code')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="trans_code"
                                                id="trans_code"
                                                placeholder=""
                                                maxLength="10"
                                                bsSize="sm"
                                                value={booking.trans_code?booking.trans_code:''}
                                                onChange={(e)=>fncOnChange(e, 'trans_code')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="transport"
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
                                            {/* <Input type="text" name="trans_name1"
                                                bsSize="sm"
                                                id="trans_name1"
                                                placeholder=""
                                                maxLength="35"
                                                value={booking.trans_name1?booking.trans_name1:''}
                                                onChange={(e)=>fncOnChange(e, 'trans_name1')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="trans_name1"
                                                id="trans_name1"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.trans_name1?booking.trans_name1:''}
                                                onChange={(e)=>fncOnChange(e, 'trans_name1')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={('Y'===booking.trans_self_yn)?true:false} 
                                                feedid="transport"
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
                                            {/* <Input type="text" name="trans_name1" id="trans_name2"
                                                bsSize="sm"
                                                placeholder=""
                                                maxLength="35"
                                                value={booking.trans_name2?booking.trans_name2:''}
                                                onChange={(e)=>fncOnChange(e, 'trans_name2')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="trans_name2"
                                                id="trans_name2"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.trans_name2?booking.trans_name2:''}
                                                onChange={(e)=>fncOnChange(e, 'trans_name2')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="transport"
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
                                            {/* <Input type="text" name="trans_user_name" id="trans_user_name"
                                                bsSize="sm"
                                                placeholder=""
                                                maxLength="17"
                                                value={booking.trans_user_name?booking.trans_user_name:''}
                                                onChange={(e)=>fncOnChange(e, 'trans_user_name')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="trans_user_name"
                                                id="trans_user_name"
                                                placeholder=""
                                                maxLength="17"
                                                bsSize="sm"
                                                value={booking.trans_user_name?booking.trans_user_name:''}
                                                onChange={(e)=>fncOnChange(e, 'trans_user_name')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={('Y'===booking.trans_self_yn)?true:(booking.trans_user_email||booking.trans_user_fax||booking.trans_user_tel)?true:false} 
                                                feedid="transport"
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
                                            {/* <Input type="text" name="trans_user_tel" id="trans_user_tel"
                                                bsSize="sm"
                                                placeholder=""
                                                maxLength="25"
                                                value={booking.trans_user_tel?booking.trans_user_tel:''}
                                                onChange={(e)=>fncOnChange(e, 'trans_user_tel')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="trans_user_tel"
                                                id="trans_user_tel"
                                                placeholder=""
                                                maxLength="25"
                                                bsSize="sm"
                                                value={booking.trans_user_tel?booking.trans_user_tel:''}
                                                onChange={(e)=>fncOnChange(e, 'trans_user_tel')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="tel"
                                                required={('Y'===booking.trans_self_yn)?true:false} 
                                                feedid="transport"
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
                                            {/* <Input type="text" name="trans_user_fax" id="trans_user_fax"
                                                bsSize="sm"
                                                placeholder=""
                                                maxLength="25"
                                                value={booking.trans_user_fax?booking.trans_user_fax:''}
                                                onChange={(e)=>fncOnChange(e, 'trans_user_fax')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="trans_user_fax"
                                                id="trans_user_fax"
                                                placeholder=""
                                                maxLength="25"
                                                bsSize="sm"
                                                value={booking.trans_user_fax?booking.trans_user_fax:''}
                                                onChange={(e)=>fncOnChange(e, 'trans_user_fax')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="tel"
                                                required={false} 
                                                feedid="transport"
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
                                            {/* <Input type="text" name="trans_user_email" id="trans_user_email"
                                                bsSize="sm"
                                                placeholder=""
                                                maxLength="25"
                                                value={booking.trans_user_email?booking.trans_user_email:''}
                                                onChange={(e)=>fncOnChange(e, 'trans_user_email')}
                                                invalid={booking.trans_user_email?(validation.validationEmail(booking.trans_user_email)?false:true):false}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                />
                                            <FormFeedback>{validation.EML_MSG}</FormFeedback> */}
                                            <InputValid 
                                                type="text"
                                                name="trans_user_email"
                                                id="trans_user_email"
                                                placeholder=""
                                                maxLength="50"
                                                bsSize="sm"
                                                value={booking.trans_user_email?booking.trans_user_email:''}
                                                onChange={(e)=>fncOnChange(e, 'trans_user_email')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="email"
                                                required={false} 
                                                feedid="transport"
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
            <ModalHeader toggle={toggle}>Transport</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <TransportWdfc
                            transport={booking}
                            fncOnBlur={fncOnBlur}
                            openType={"CARD"}
                            fncOpenType={fncOpenType}
                            {...props}/>
                    </CardBody>
                </ModalBody>
            <ModalFooter>
                {/* <Button color="primary" onClick={updateTransportOfBooking}>Save</Button>{' '} */}
                <Button color="primary" onClick={toggle}>Apply</Button>{' '}
                <Button color="secondary" onClick={fncCacelModal}>Cancel</Button>
                
            </ModalFooter>
        </Modal>
    </>
    );
});

export default TransportCardWdfc;