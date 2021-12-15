/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect, forwardRef } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse, UncontrolledTooltip,
    Button, Card, FormGroup, Label} from "reactstrap";
import axios from "axios";
import Select from "react-select";
import ForwarderWdfc from './ForwarderWdfc.js';
import * as validation from 'components/common/validation.js';
import ForwarderBookmarkWdfc from './ForwarderBookmarkWdfc.js';
import InputValid from "components/CustomInput/InputValid.js";


const ForwarderCardWdfc = forwardRef((props, forwarderFocus) => {
    // Collapse Flag
    const [coll, setColl] = useState(false);
    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // Forwarder
    const [booking, setBooking] = useState({});
    const [forwarderList, setForwarderList] = useState([]);
    const [openType, setOpenType] = useState("");
    const [pureBooking, setPureBooking] = useState({});
    const {user, forwarderCompanyList} = props;

    useEffect(() => {
        // FORWARDER BOOKMARK 조회
        // selectBookingForwarderBookmark();
    },[]);

    useEffect(() => {
        // console.log( "FD : ",booking, forwarderCompanyList.length === 1 )
        if( booking.bkg_no ) {
            // 단건 일땐 오라클에서 명칭 조회해서 세팅
            if( forwarderCompanyList.length === 1 && !(booking.fwd_code || booking.fwd_user_tel || booking.fwd_user_name || booking.fwd_user_email || booking.fwd_name1)) {
                // console.log( forwarderCompanyList[0].value, forwarderCompanyList[0].label )
                axios.post(
                    "/com/getCompanyInfo",
                    { 
                        klnetId: forwarderCompanyList[0].klnet_id,
                    }
                ).then(
                    res => {
                        // console.log(res.data[0]);
                        let company = res.data[0];
                        if( company ) {
                            // 포워더 인 경우 EMAIL 자동세팅
                            if("Y" === booking.user_forwarder_yn && user) {
                                // console.log("FOWRdeR ",booking)
                                setBooking({...booking
                                    ,['fwd_user_name']:user.user_name
                                    ,['fwd_user_tel']:user.user_tel
                                    ,['fwd_user_email']:user.user_email
                                    ,['fwd_business_number']: company.REG_NO
                                    ,['fwd_code']:forwarderCompanyList[0].partner_code
                                    ,['fwd_name1']:company.CNAME_KR});
                                props.fncBookingParent({...booking
                                    ,['fwd_user_name']:user.user_name
                                    ,['fwd_user_tel']:user.user_tel
                                    ,['fwd_user_email']:user.user_email
                                    ,['fwd_business_number']: company.REG_NO
                                    ,['fwd_code']:forwarderCompanyList[0].partner_code
                                    ,['fwd_name1']:company.CNAME_KR});
                            } else {
                                // FORWARDER 아닌 경우 그냥 기본정보만 세팅
                                setBooking({...booking
                                    ,['fwd_business_number']: company.REG_NO
                                    ,['fwd_code']:forwarderCompanyList[0].partner_code
                                    ,['fwd_name1']:company.CNAME_KR});
                                props.fncBookingParent({...booking
                                    ,['fwd_business_number']: company.REG_NO
                                    ,['fwd_code']:forwarderCompanyList[0].partner_code
                                    ,['fwd_name1']:company.CNAME_KR});
                            }
                        } else {
                            setBooking({...booking
                                ,['fwd_user_name']:user.user_name
                                ,['fwd_user_tel']:user.user_tel
                                ,['fwd_user_email']:user.user_email
                                ,['fwd_business_number']:null, ['shp_code']:null, ['shp_name1']:null});
                            props.fncBookingParent({...booking
                                ,['fwd_user_name']:user.user_name
                                ,['fwd_user_tel']:user.user_tel
                                ,['fwd_user_email']:user.user_email
                                ,['fwd_business_number']:null, ['shp_code']:null, ['shp_name1']:null});
                        }
                    }
                );
                // 다건인 경우엔 그냥 포워더 정보만 세팅
            } else if ( forwarderCompanyList.length > 1 && user) {
                if("Y" === booking.user_forwarder_yn && user) {
                    console.log("FOWRdeR ",booking)
                    setBooking({...booking
                        ,['fwd_user_name']:user.user_name
                        ,['fwd_user_tel']:user.user_tel
                        ,['fwd_user_email']:user.user_email});
                    props.fncBookingParent({...booking
                        ,['fwd_user_name']:user.user_name
                        ,['fwd_user_tel']:user.user_tel
                        ,['fwd_user_email']:user.user_email});
                }
            }
        }
    },[forwarderCompanyList , booking.bkg_no]);

    useEffect(() => {
        // 20210305 Card 내에서의 저장행위는 중지 하도록 한다.
        // if( "Y" === booking.selected_yn ) {
        //     // Forwarder Bookmark로 booking의 Forwarder 입력하기
        //     updateForwarderOfBooking();
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
            // console.log("Forwarderspq:",props.booking);
            // let bkg_no = props.booking.bkg_no;
            // let bkg_date = props.booking.bkg_date;
            // let status_cus = props.booking.status_cus;
            // let sc_no = props.booking.sc_no;
            // let user_no = props.booking.user_no;

            // // Forwarder Bookmark seq
            // let forwarder_bookmark_seq = props.booking.forwarder_bookmark_seq;
            // let init_forwarder_bookmark_seq = props.booking.init_forwarder_bookmark_seq;

            // setBooking({...booking, 'bkg_no':bkg_no, 'bkg_date':bkg_date
            //     , 'status_cus':status_cus, 'sc_no':sc_no, 'user_no':user_no
            //     , 'forwarder_bookmark_seq':forwarder_bookmark_seq
            //     , 'init_forwarder_bookmark_seq':init_forwarder_bookmark_seq
            // }); // 초기화 bookmark seq 값

            // // 최초 조회하기
            // selectForwarderOfBooking(props.booking);
            setBooking(props.booking);
        }
    },[props.booking]);
    useEffect(()=>{
        setForwarderList(props.forwarderList)
    },[props.forwarderList]);

    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }

    // 
    const fncSelectForwarder = ( e ) =>{
        if( e ) {
            if( 1 > e.value ) {
                // setBooking({});
                if ( coll ) {
                    setColl(!coll)
                }
            // 그외 데이터인 경우
            } else {
                forwarderList.map((element, key)=>{
                if( e.value == element.forwarder_bookmark_seq) {
                    // console.log(element)
                    // select로 새로운 document를 세팅한다
                    // 기존 Booking 정보
                    setBooking({...booking
                        ,'forwarder_bookmark_seq': element.forwarder_bookmark_seq
                        ,'forwarder_bookmark_name': element.forwarder_bookmark_name
                        ,'fwd_name1': element.fwd_name1?element.fwd_name1:booking.fwd_name1
                        ,'fwd_name2': element.fwd_name2?element.fwd_name2:booking.fwd_name2
                        ,'fwd_code': element.fwd_code?element.fwd_code:booking.fwd_code
                        ,'fwd_user_email': element.fwd_user_email?element.fwd_user_email:booking.fwd_user_email
                        ,'fwd_user_fax': element.fwd_user_fax?element.fwd_user_fax:booking.fwd_user_fax
                        ,'fwd_user_name': element.fwd_user_name?element.fwd_user_name:booking.fwd_user_name
                        ,'fwd_user_tel': element.fwd_user_tel?element.fwd_user_tel:booking.fwd_user_tel
                        ,'fwd_user_dept': element.fwd_user_dept?element.fwd_user_dept:booking.fwd_user_dept
                        ,'selected_yn': 'Y'
                    });
                    props.fncBookingParent({...booking
                        ,'forwarder_bookmark_seq': element.forwarder_bookmark_seq
                        ,'forwarder_bookmark_name': element.forwarder_bookmark_name
                        ,'fwd_name1': element.fwd_name1?element.fwd_name1:booking.fwd_name1
                        ,'fwd_name2': element.fwd_name2?element.fwd_name2:booking.fwd_name2
                        ,'fwd_code': element.fwd_code?element.fwd_code:booking.fwd_code
                        ,'fwd_user_email': element.fwd_user_email?element.fwd_user_email:booking.fwd_user_email
                        ,'fwd_user_fax': element.fwd_user_fax?element.fwd_user_fax:booking.fwd_user_fax
                        ,'fwd_user_name': element.fwd_user_name?element.fwd_user_name:booking.fwd_user_name
                        ,'fwd_user_tel': element.fwd_user_tel?element.fwd_user_tel:booking.fwd_user_tel
                        ,'fwd_user_dept': element.fwd_user_dept?element.fwd_user_dept:booking.fwd_user_dept
                        ,'selected_yn':'Y'
                    });
                }
                });
                if ( !coll ) {
                    setColl(!coll);
                }
            }

        } else {
            if( booking.forwarder_bookmark_seq) {
                // console.log(element)
                // select로 새로운 document를 세팅한다
                // 기존 Booking 정보
                setBooking({...booking
                    ,'forwarder_bookmark_seq': null
                    ,'forwarder_bookmark_name': null
                    ,'fwd_name1': null
                    ,'fwd_name2': null
                    ,'fwd_code': null
                    ,'fwd_user_email': null
                    ,'fwd_user_fax': null
                    ,'fwd_user_name': null
                    ,'fwd_user_tel': null
                    ,'fwd_user_dept': null
                    ,'selected_yn': 'Y'
                });
                props.fncBookingParent({...booking
                    ,'forwarder_bookmark_seq': null
                    ,'forwarder_bookmark_name': null
                    ,'fwd_name1': null
                    ,'fwd_name2': null
                    ,'fwd_code': null
                    ,'fwd_user_email': null
                    ,'fwd_user_fax': null
                    ,'fwd_user_name': null
                    ,'fwd_user_tel': null
                    ,'fwd_user_dept': null
                    ,'selected_yn':'Y'
                });
            }
        }
    }

    //
    const selectForwarderOfBooking = ( booking ) => {
        axios.post(
            "/shipper/selectForwarderOfBooking"
            ,{ user_no: user?user.user_no:null
                , booking
            }
            ,{}
        ).then(
            res => setBooking(res.data[0])
        );
    }

    const fncValidation =()=> {
        if( booking.fwd_user_email ) {
            if( !validation.validationEmail(booking.fwd_user_email) ) return false;
        }
        return true;
    }
    const updateForwarderOfBooking = () => {
        if( !fncValidation() ) return false;

        axios.post(
            "/shipper/updateForwarderOfBooking"
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

    //
    const fncOnBlur = (forwarder) => {
        setBooking( forwarder );
        props.fncBookingParent(forwarder);
    }

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

    const fncSearchBn =()=>{
        console.log(booking.fwd_business_number)
        if( !booking.fwd_business_number ) return false;
        if( booking.fwd_business_number.length < 10) return false;
            if( booking.fwd_business_number && booking.fwd_business_number.length === 10 ) {
                let row = forwarderCompanyList.find(v=>v.business_number === booking.fwd_business_number)
                if( row ) {
                    axios.post(
                        "/com/getCompanyInfo",
                        { 
                            klnetId: row.klnet_id,
                        }
                    ).then(
                        res => {
                            // console.log(res.data[0]);
                            let company = res.data[0];
                            if( company.REG_NO ) {
                                setBooking({...booking, ['fwd_business_number']:company.REG_NO, ['fwd_code']:row.partner_code, ['fwd_name1']:company.CNAME_KR})
                                props.fncBookingParent({...booking, ['fwd_business_number']:company.REG_NO, ['fwd_code']:row.partner_code, ['fwd_name1']:company.CNAME_KR});
                            } else {
                                setBooking({...booking, ['fwd_business_number']:null, ['fwd_code']:null, ['fwd_name1']:null})
                                props.fncBookingParent({...booking, ['fwd_business_number']:null, ['fwd_code']:null, ['fwd_name1']:null});
                            }
                        }
                    );
                    // setBooking({...booking, ['business_number']:row.business_number, ['shp_code']:row.partner_code})
                    // props.fncBookingParent({...booking, ['business_number']:row.business_number, ['shp_code']:row.partner_code});
                } else {
                    props.onAlert("danger", "결과가 없습니다.");
                    setBooking({...booking, ['fwd_business_number']:null, ['shp_code']:null, ['fwd_name1']:null})
                    props.fncBookingParent({...booking, ['fwd_business_number']:null, ['fwd_code']:null, ['fwd_name1']:null});
                }
            }
    }

    const fncOnBlurBusinessNumber =(e)=> {
        // console.log(e.target.value )
        if( !e.target.value ) {
            setBooking({...booking, ['fwd_business_number']:null, ['fwd_code']:null, ['fwd_name1']:null})
            props.fncBookingParent({...booking, ['fwd_business_number']:null, ['fwd_code']:null, ['fwd_name1']:null});
        }
    }

    const fncOnKeyPress = async(e)=>{
        // enter 인 경우 
        if( 13 === e.charCode ) {
            if( e.target.value.length < 10) return false;
            console.log(e.target.value.length, e.target.value, booking.fwd_business_number)
            if( e.target.value && e.target.value.length === 10
                && booking.fwd_business_number != booking.business_number ) {
                let row = forwarderCompanyList.find(v=>v.business_number === e.target.value)
                if( row ) {
                    axios.post(
                        "/com/getCompanyInfo",
                        { 
                            klnetId: row.klnet_id,
                        }
                    ).then(
                        res => {
                            // console.log(res.data[0]);
                            let company = res.data[0];
                            if( company.REG_NO ) {
                                setBooking({...booking, ['fwd_business_number']:company.REG_NO, ['fwd_code']:row.partner_code, ['fwd_name1']:company.CNAME_KR})
                                props.fncBookingParent({...booking, ['fwd_business_number']:company.REG_NO, ['fwd_code']:row.partner_code, ['fwd_name1']:company.CNAME_KR});
                            } else {
                                setBooking({...booking, ['fwd_business_number']:null, ['fwd_code']:null, ['fwd_name1']:null})
                                props.fncBookingParent({...booking, ['fwd_business_number']:null, ['fwd_code']:null, ['fwd_name1']:null});
                            }
                        }
                    );
                    // setBooking({...booking, ['business_number']:row.business_number, ['shp_code']:row.partner_code})
                    // props.fncBookingParent({...booking, ['business_number']:row.business_number, ['shp_code']:row.partner_code});
                } else {
                    props.onAlert("danger", "결과가 없습니다.");
                    setBooking({...booking, ['fwd_business_number']:null, ['fwd_code']:null, ['fwd_name1']:null})
                    props.fncBookingParent({...booking, ['fwd_business_number']:null, ['fwd_code']:null, ['fwd_name1']:null});
                }
            }
        }
    }
  return (
    <>
        <Row id="Forwarder">
            <Col xl="12" lg="12">
                <Card style={{zIndex:'75'}}>
                    {/* <CardHeader className="bg-white"> */}
                    <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>  
                        <Row className="pb-2">
                            <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>FORWARDER
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
                                            value={{value:booking.forwarder_bookmark_seq?booking.forwarder_bookmark_seq:''
                                            ,label:booking.forwarder_bookmark_name?booking.forwarder_bookmark_name:'선택'}}
                                            onChange={(e)=>fncSelectForwarder(e?e:null)}
                                            options={forwarderList}
                                            placeholder={"선택"}
                                            ref={forwarderFocus}
                                            isClearable={booking.forwarder_bookmark_seq?true:false}
                                        />
                                    </Col>
                                    <Col className="col-2 pl-auto pr-auto">
                                        <ForwarderBookmarkWdfc
                                            forwarderList={forwarderList}
                                            selectBookingForwarderBookmark={props.selectBookingForwarderBookmark}
                                            onAlert={props.onAlert}
                                            forwarderCompanyList={forwarderCompanyList}
                                            {...props}
                                            />
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
                                            {/* <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Forwarder</Label></Col>
                                            <Col>
                                                <Select
                                                    className="customSelect"
                                                    classNamePrefix="customSelect"
                                                    //className="react-select react-select-primary"
                                                    //classNamePrefix="react-select"
                                                    name="shp_code"
                                                    placeholder=""
                                                    value={{value:booking.fwd_code?booking.fwd_code:'',
                                                            // label:booking.cntr_pick_up_cy_code?lineCodeVesselPickup[lineCodeVesselPickup.findIndex(x=>x.value===container.cntr_pick_up_cy_code)].label:'선택'
                                                            label:booking.fwd_code?
                                                                (forwarderCompanyList.findIndex(x=>x.value===booking.fwd_code)>=0)?
                                                                forwarderCompanyList[forwarderCompanyList.findIndex(x=>x.value===booking.fwd_code)].label:
                                                                    '선택':
                                                                '선택'
                                                    }}
                                                    onChange={(e) => setBooking({...booking, ['fwd_code']:e.value, ['fwd_name1']:e.label})}
                                                    onBlur={(e) => {props.fncBookingParent(booking)}}
                                                    options={forwarderCompanyList}
                                                    // styles={{
                                                    //     control: provided => ({...provided,border:booking.fwd_code?'':('CARD'===openType||'MAIN'===openType?'1px solid red':'')}),
                                                    //     indicatorContainer: provided => ({...provided,color:''})
                                                    // }}
                                                />
                                            </Col> */}
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0">사업자번호</Label></Col>
                                            <Col>
                                                <InputValid 
                                                    type="text"
                                                    bsSize="sm"
                                                    name="fwd_business_number"
                                                    id="fwd_business_number"
                                                    placeholder="사업자 번호 입력 후 엔터"
                                                    maxLength="10"
                                                    value={booking.fwd_business_number?booking.fwd_business_number:''}
                                                    onChange={(e)=>fncOnChange(e, 'fwd_business_number')}
                                                    onBlur={(e) => {fncOnBlurBusinessNumber(e)}}
                                                    onKeyPress={(e)=>fncOnKeyPress(e)}
                                                    validtype="text" 
                                                    required={false} 
                                                    feedid="forwarder"
                                                    inputgrouptext={<i className="fa fa-search " onClick={()=>fncSearchBn()}/>}
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
                                            <InputValid 
                                                type="text"
                                                name="fwd_code"
                                                id="fwd_code"
                                                placeholder=""
                                                maxLength="5"
                                                bsSize="sm"
                                                value={booking.fwd_code?booking.fwd_code:''}
                                                onChange={(e)=>fncOnChange(e, 'fwd_code')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="number"
                                                required={false} 
                                                feedid="forwarder"
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
                                            <InputValid 
                                                type="text"
                                                name="fwd_name1"
                                                id="fwd_name1"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.fwd_name1?booking.fwd_name1:''}
                                                onChange={(e)=>fncOnChange(e, 'fwd_name1')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="forwarder"
                                            />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                                {/* <Col xl="12" lg="12" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0"></Label></Col>
                                            <Col>
                                            <InputValid 
                                                type="text"
                                                name="fwd_name2"
                                                id="fwd_name2"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.fwd_name2?booking.fwd_name2:''}
                                                onChange={(e)=>fncOnChange(e, 'fwd_name2')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="forwarder"
                                            />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col> */}
                            </Row>
                            <Row>
                                <Col xl="12" lg="12" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0">User</Label></Col>
                                            <Col>
                                            {/* <Input type="text"
                                                bsSize="sm"
                                                name="fwd_user_name"
                                                id="fwd_user_name"
                                                placeholder=""
                                                maxLength="17"
                                                value={booking.fwd_user_name?booking.fwd_user_name:''}
                                                onChange={(e)=>fncOnChange(e, 'fwd_user_name')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="fwd_user_name"
                                                id="fwd_user_name"
                                                placeholder=""
                                                maxLength="17"
                                                bsSize="sm"
                                                value={booking.fwd_user_name?booking.fwd_user_name:''}
                                                onChange={(e)=>fncOnChange(e, 'fwd_user_name')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={("Y" === booking.user_forwarder_yn)?true:(booking.fwd_user_tel||booking.fwd_user_dept||booking.fwd_user_email||booking.fwd_user_fax)?true:false} 
                                                feedid="forwarder"
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
                                                name="fwd_user_tel"
                                                id="fwd_user_tel"
                                                placeholder=""
                                                maxLength="25"
                                                value={booking.fwd_user_tel?booking.fwd_user_tel:''}
                                                onChange={(e)=>fncOnChange(e, 'fwd_user_tel')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="fwd_user_tel"
                                                id="fwd_user_tel"
                                                placeholder=""
                                                maxLength="25"
                                                bsSize="sm"
                                                value={booking.fwd_user_tel?booking.fwd_user_tel:''}
                                                onChange={(e)=>fncOnChange(e, 'fwd_user_tel')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={("Y" === booking.user_forwarder_yn)?true:false} 
                                                feedid="forwarder"
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
                                                name="fwd_user_fax"
                                                id="fwd_user_fax"
                                                placeholder=""
                                                maxLength="25"
                                                value={booking.fwd_user_fax?booking.fwd_user_fax:''}
                                                onChange={(e)=>fncOnChange(e, 'fwd_user_fax')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="fwd_user_fax"
                                                id="fwd_user_fax"
                                                placeholder=""
                                                maxLength="25"
                                                bsSize="sm"
                                                value={booking.fwd_user_fax?booking.fwd_user_fax:''}
                                                onChange={(e)=>fncOnChange(e, 'fwd_user_fax')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="forwarder"
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
                                                name="fwd_user_dept"
                                                id="fwd_user_dept"
                                                placeholder=""
                                                maxLength="35"
                                                value={booking.fwd_user_dept?booking.fwd_user_dept:''}
                                                onChange={(e)=>fncOnChange(e, 'fwd_user_dept')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="fwd_user_dept"
                                                id="fwd_user_dept"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.fwd_user_dept?booking.fwd_user_dept:''}
                                                onChange={(e)=>fncOnChange(e, 'fwd_user_dept')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="forwarder"
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
                                            <InputValid 
                                                type="text"
                                                name="fwd_user_email"
                                                id="fwd_user_email"
                                                placeholder=""
                                                maxLength="50"
                                                bsSize="sm"
                                                value={booking.fwd_user_email?booking.fwd_user_email:''}
                                                onChange={(e)=>fncOnChange(e, 'fwd_user_email')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="email"
                                                required={false} 
                                                feedid="forwarder"
                                            />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                            {/* <Row>
                                <Col xl="12" lg="12" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Address</Label></Col>
                                            <Col>
                                            <InputValid 
                                                type="text"
                                                name="fwd_address1"
                                                id="fwd_address1"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.fwd_address1?booking.fwd_address1:''}
                                                onChange={(e)=>fncOnChange(e, 'fwd_address1')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="forwarder"
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
                                            <InputValid 
                                                type="text"
                                                name="fwd_address2"
                                                id="fwd_address2"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.fwd_address2?booking.fwd_address2:''}
                                                onChange={(e)=>fncOnChange(e, 'fwd_address2')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="forwarder"
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
                                            <InputValid 
                                                type="text"
                                                name="fwd_address3"
                                                id="fwd_address3"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.fwd_address3?booking.fwd_address3:''}
                                                onChange={(e)=>fncOnChange(e, 'fwd_address3')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="forwarder"
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
                                            <InputValid 
                                                type="text"
                                                name="fwd_address4"
                                                id="fwd_address4"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.fwd_address4?booking.fwd_address4:''}
                                                onChange={(e)=>fncOnChange(e, 'fwd_address4')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="forwarder"
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
                                            <InputValid 
                                                type="text"
                                                name="fwd_address5"
                                                id="fwd_address5"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.fwd_address5?booking.fwd_address5:''}
                                                onChange={(e)=>fncOnChange(e, 'fwd_address5')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="forwarder"
                                            />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row> */}
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
            <ModalHeader toggle={toggle}>Forwarder</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <ForwarderWdfc
                            forwarder={booking}
                            fncOnBlur={fncOnBlur}
                            openType={"CARD"}
                            fncOpenType={fncOpenType}
                            forwarderCompanyList={forwarderCompanyList}
                            {...props}/>
                    </CardBody>
                </ModalBody>
            <ModalFooter>
                {/* <Button color="primary" onClick={updateForwarderOfBooking}>Save</Button>{' '} */}
                <Button color="primary" onClick={toggle}>Apply</Button>{' '}
                <Button color="secondary" onClick={fncCacelModal}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>
    );
});

export default ForwarderCardWdfc;