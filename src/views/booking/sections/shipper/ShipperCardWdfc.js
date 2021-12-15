/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect, forwardRef } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse, UncontrolledTooltip,
    Button, Card, FormGroup, Label, Form} from "reactstrap";
import axios from "axios";
import Select from "react-select";
import ShipperWdfc from './ShipperWdfc.js';
import ShipperBookmarkWdfc from './ShipperBookmarkWdfc.js';
import * as validation from 'components/common/validation.js';
import InputValid from "components/CustomInput/InputValid.js";

const ShipperCardWdfc = forwardRef((props, shipperFocus) => {
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // Collapse Flag
    const [coll, setColl] = useState(false);
    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    // Shipper
    const [shipperList, setShipperList] = useState([]);
    const [booking, setBooking] = useState({});
    const [pureBooking, setPureBooking] = useState({});
    const [openType, setOpenType] = useState("");
    const [newBn, setNewBn] = useState("");
    const {user, shipperCompanyList} = props;

    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }
    
    useEffect(() => {
        // Shipper Bookmark 목록조회
        // selectBookingShipperBookmark();
    },[]);

    useEffect(()=>{
        setColl(props.openWindow);
    },[props.openWindow]);

    useEffect(() => {
        if( booking.bkg_no ) {
            if( shipperCompanyList.length === 1 && !(booking.shp_code || booking.shp_name1|| booking.shp_user_email)) {
                axios.post(
                    "/com/getCompanyInfo",
                    { 
                        klnetId: shipperCompanyList[0].klnet_id,
                    }
                ).then(
                    res => {
                        // console.log(res.data[0]);
                        let company = res.data[0];
                        if( company ) {
                            if( "Y" === booking.user_shipper_yn ) {
                                setBooking({...booking
                                    ,['business_number']:company.REG_NO
                                    ,['shp_code']:shipperCompanyList[0].partner_code
                                    ,['shp_name1']:company.CNAME_KR
                                    ,['shp_user_email']: user.user_email})
                                props.fncBookingParent({...booking
                                    ,['business_number']:company.REG_NO
                                    ,['shp_code']:shipperCompanyList[0].partner_code
                                    ,['shp_name1']:company.CNAME_KR
                                    ,['shp_user_email']: user.user_email
                                ,});
                            } else {
                                setBooking({...booking
                                    ,['business_number']:company.REG_NO
                                    ,['shp_code']:shipperCompanyList[0].partner_code
                                    ,['shp_name1']:company.CNAME_KR})
                                props.fncBookingParent({...booking, ['business_number']:company.REG_NO, ['shp_code']:shipperCompanyList[0].partner_code, ['shp_name1']:company.CNAME_KR});
                            }
                        } else {
                            setBooking({...booking, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null})
                            props.fncBookingParent({...booking, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null});
                        }
                    }
                );
                // let company = fncselectCompanyInfo(shipperCompanyList[0].business_number);
                // setBooking({...booking, ['business_number']:company.REG_NO, ['shp_code']:shipperCompanyList[0].partner_code, ['shp_name1']:company.CNAME_KR})
                // props.fncBookingParent({...booking, ['business_number']:company.REG_NO, ['shp_code']:shipperCompanyList[0].partner_code, ['shp_name1']:company.CNAME_KR});        
            } else if( shipperCompanyList.length > 1 && !(booking.shp_code || booking.shp_name1|| booking.shp_user_email)) {
                if( user ) {
                    setBooking({...booking
                        ,['shp_user_email']: user.user_email})
                    props.fncBookingParent({...booking
                        ,['shp_user_email']: user.user_email
                    ,});
                }
            }
        }
        
    },[shipperCompanyList, booking.bkg_no]);


    // useEffect(() => {
    //     // console.log(booking.change_bn, booking.business_number.length)
    //     if( booking.business_number && booking.business_number.length=== 10
    //         && booking.business_number !== booking.init_business_number ) {
    //         axios.post(
    //             "/com/getCompanyInfo",
    //             { 
    //                 bn: booking.business_number,
    //             }
    //         ).then(
    //             res => {
    //                 // console.log(res.data[0]);
    //                 let company = res.data[0];
    //                 if( company.REG_NO ) {
    //                     setBooking({...booking, ['business_number']:company.REG_NO, ['init_business_number']:company.REG_NO, ['shp_code']:booking.shp_code, ['shp_name1']:company.CNAME_KR})
    //                     props.fncBookingParent({...booking, ['business_number']:company.REG_NO, ['init_business_number']:company.REG_NO, ['shp_code']:booking.shp_code, ['shp_name1']:company.CNAME_KR});
    //                 } else {
    //                     setBooking({...booking, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null})
    //                     props.fncBookingParent({...booking, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null});
    //                 }
    //             }
    //         );
    //     }
    //   },[booking.business_number]);

    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        if( props.booking.bkg_no ) {
            // console.log("Shipper Props:",props.booking);
            // let bkg_no = props.booking.bkg_no;
            // let bkg_date = props.booking.bkg_date;
            // let status_cus = props.booking.status_cus;
            // let sc_no = props.booking.sc_no;
            // let user_no = props.booking.user_no;

            // // Shipper Bookmark seq
            // let shipper_bookmark_seq = props.booking.shipper_bookmark_seq;
            // let init_shipper_bookmark_seq = props.booking.init_shipper_bookmark_seq;

            // setBooking({...booking, 'bkg_no':bkg_no, 'bkg_date':bkg_date
            //     , 'status_cus':status_cus, 'sc_no':sc_no, 'user_no':user_no
            //     , 'shipper_bookmark_seq':shipper_bookmark_seq
            //     , 'init_shipper_bookmark_seq':init_shipper_bookmark_seq
            // }); // 초기화 bookmark seq 값
            setBooking(props.booking);
            // 최초 조회하기
            // getShipperOfBooking(props.booking);
        }
    },[props.booking]);
    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        setShipperList(props.shipperList);
    },[props.shipperList]);

    useEffect(() => {
        // 초기 Seq와 현재 seq 다른 경우
        // console.log(booking.init_shipper_bookmark_seq, booking.shipper_bookmark_seq)
        // if( booking.init_shipper_bookmark_seq != booking.shipper_bookmark_seq ) {
            // }
        // 20210305 Card 내에서의 저장행위는 중지 하도록 한다.
        // if( "Y" === booking.selected_yn ) {
        //     // Booking의 Shipper update
        //     updateShipperOfBooking();
        // }
        // props.fncBookingParent(booking);
        if( "CARD" != openType ) {
            setPureBooking(booking);
        }
      },[booking]);



    // SHipper 조회
    const getShipperOfBooking = ( booking ) => {
        axios.post(
            "/shipper/getShipperOfBooking"
            ,{ user_no: user?user.user_no:null
                , booking
            }
            ,{}
        ).then(
            // setScheduleList([])
        ).then(
            res => setBooking(res.data[0])
        );
    }

    const fncValidation =()=> {
        if( !booking.shp_code ) return false;
        if( !booking.shp_name1) return false;
        if( !booking.shp_user_tel) return false;
        if( !booking.shp_address1 ) return false;
        if( !booking.shp_user_name ) return false;
        if( !validation.validationByteMaxLength(booking.shp_user_name, 17) ) return false;
        if( !validation.validationEmail(booking.shp_user_email) ) return false;
        if( !validation.validationByteMaxLength(booking.shp_address1, 35) ) return false;
        if( !validation.validationByteMaxLength(booking.shp_address2, 35) ) return false;
        if( !validation.validationByteMaxLength(booking.shp_address3, 35) ) return false;
        if( !validation.validationByteMaxLength(booking.shp_address4, 35) ) return false;
        if( !validation.validationByteMaxLength(booking.shp_address5, 35) ) return false;
        return true;
    }
    const updateShipperOfBooking = () => {
        if( !fncValidation() ) return false;
        axios.post(
            "/shipper/updateShipperOfBooking"
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

    const fncSelectShipper = (e) => {
        // 선택
        if( e ) {
            if( 1 > e.value ) {
                // setBooking({});
                if ( coll ) {
                    setColl(!coll)
                }
            // 그외 데이터인 경우
            } else {
                shipperList.map((element, key)=>{
                if( e.value == element.shipper_bookmark_seq) {
                    // select로 새로운 document를 세팅한다
                    // 기존 Booking 정보
                    setBooking({...booking
                        ,'shipper_bookmark_seq':element.shipper_bookmark_seq
                        ,'shipper_bookmark_name':element.shipper_bookmark_name
                        // ,'business_number':element.business_number
                        ,'shp_name1': element.shp_name1?element.shp_name1:booking.shp_name1
                        ,'shp_name2': element.shp_name1?element.shp_name2:booking.shp_name2
                        ,'shp_code': element.shp_code?element.shp_code:booking.shp_code
                        ,'shp_user_email': element.shp_user_email?element.shp_user_email:booking.shp_user_email
                        ,'selected_yn':'Y' 
                    });
    
                    props.fncBookingParent({...booking
                        ,'shipper_bookmark_seq':element.shipper_bookmark_seq
                        ,'shipper_bookmark_name':element.shipper_bookmark_name
                        // ,'business_number':element.business_number
                        ,'shp_name1': element.shp_name1?element.shp_name1:booking.shp_name1
                        ,'shp_name2': element.shp_name1?element.shp_name2:booking.shp_name2
                        ,'shp_code': element.shp_code?element.shp_code:booking.shp_code
                        ,'shp_user_email': element.shp_user_email?element.shp_user_email:booking.shp_user_email
                        ,'selected_yn':'Y' 
                    });
                }
                });
                if ( !coll ) {
                    setColl(!coll);
                }
            }
        } else {
            if( booking.shipper_bookmark_seq) {
                setBooking({...booking
                    ,'shipper_bookmark_seq': null
                    ,'shipper_bookmark_name': null
                    ,'shp_name1': null
                    ,'shp_name2': null
                    ,'shp_code': null
                    ,'shp_user_email': null
                    ,'selected_yn':'Y' 
                });

                props.fncBookingParent({...booking
                    ,'shipper_bookmark_seq': null
                    ,'shipper_bookmark_name': null
                    ,'shp_name1': null
                    ,'shp_name2': null
                    ,'shp_code': null
                    ,'shp_user_email': null
                    ,'selected_yn':'Y' 
                });
            }
        }
    }

    const fncOnBlurShipper = ( shipper ) => {
        setBooking(shipper);
        props.fncBookingParent(shipper);
    }

    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setBooking({
            ...booking,[key]:e.target.value.toUpperCase()
        });
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

    const fncOnKeyPress = async(e)=>{
        // enter 인 경우 
        if( 13 === e.charCode ) {
            if( e.target.value.length < 10) return false;
            // console.log(e.target.value.length, e.target.value, booking.init_business_number)
            if( e.target.value && e.target.value.length === 10 ) {
                let row = shipperCompanyList.find(v=>v.business_number === e.target.value)
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
                                setBooking({...booking, ['business_number']:company.REG_NO, ['shp_code']:row.partner_code, ['shp_name1']:company.CNAME_KR})
                                props.fncBookingParent({...booking, ['business_number']:company.REG_NO, ['shp_code']:row.partner_code, ['shp_name1']:company.CNAME_KR});
                            } else {
                                setBooking({...booking, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null})
                                props.fncBookingParent({...booking, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null});
                            }
                        }
                    );
                    // setBooking({...booking, ['business_number']:row.business_number, ['shp_code']:row.partner_code})
                    // props.fncBookingParent({...booking, ['business_number']:row.business_number, ['shp_code']:row.partner_code});
                } else {
                    props.onAlert("danger", "결과가 없습니다.");
                    setBooking({...booking, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null})
                    props.fncBookingParent({...booking, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null});
                }
            }
        }
    }


    const fncOnBlurBusinessNumber =(e)=> {
        // console.log(e.target.value )
        if( !e.target.value ) {
            setBooking({...booking, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null})
            props.fncBookingParent({...booking, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null});
        }
    }



    const fncSearchBn =()=>{
        // console.log(booking.business_number)
        if( !booking.business_number ) return false;
        if( booking.business_number.length < 10) return false;
            // console.log(booking.business_number.length, booking.business_number, booking.init_business_number)
            if( booking.business_number && booking.business_number.length === 10 ) {
                let row = shipperCompanyList.find(v=>v.business_number === booking.business_number)
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
                                setBooking({...booking, ['business_number']:company.REG_NO, ['shp_code']:row.partner_code, ['shp_name1']:company.CNAME_KR})
                                props.fncBookingParent({...booking, ['business_number']:company.REG_NO, ['shp_code']:row.partner_code, ['shp_name1']:company.CNAME_KR});
                            } else {
                                setBooking({...booking, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null})
                                props.fncBookingParent({...booking, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null});
                            }
                        }
                    );
                    // setBooking({...booking, ['business_number']:row.business_number, ['shp_code']:row.partner_code})
                    // props.fncBookingParent({...booking, ['business_number']:row.business_number, ['shp_code']:row.partner_code});
                } else {
                    props.onAlert("danger", "결과가 없습니다.");
                    setBooking({...booking, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null})
                    props.fncBookingParent({...booking, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null});
                }
            }
    }
  return (
    <>
        <Row id="Shipper">
            <Col xl="12" lg="12">
                <Card style={{zIndex:'85'}}>
                    <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>  
                        <Row className="pb-2">
                            <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>SHIPPER
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
                                            value={{value:booking.shipper_bookmark_seq?booking.shipper_bookmark_seq:''
                                            ,label:booking.shipper_bookmark_name?booking.shipper_bookmark_name:'선택'}}
                                            onChange={(e)=>fncSelectShipper(e?e:null)}
                                            options={shipperList}
                                            placeholder={"선택"}
                                            ref={shipperFocus}
                                            isClearable={booking.shipper_bookmark_seq?true:false}
                                        />
                                    </Col>
                                    <Col className="col-2 pl-auto pr-auto">
                                        <ShipperBookmarkWdfc
                                            shipperList={shipperList}
                                            selectBookingShipperBookmark={props.selectBookingShipperBookmark}
                                            onAlert={props.onAlert}
                                            shipperCompanyList={shipperCompanyList}
                                            {...props}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Collapse isOpen={coll}>
                        <hr className="mt-0"/>
                        <Row>
                            {/* <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label for="shp_code" className="mb-0">Shipper</Label></Col>
                                        <Col>
                                            <Select
                                                className="customSelect"
                                                classNamePrefix="customSelect"
                                                //className="react-select react-select-primary"
                                                //classNamePrefix="react-select"
                                                name="shp_code"
                                                placeholder=""
                                                value={{value:booking.shp_code?booking.shp_code:'',
                                                        // label:booking.cntr_pick_up_cy_code?lineCodeVesselPickup[lineCodeVesselPickup.findIndex(x=>x.value===container.cntr_pick_up_cy_code)].label:'선택'
                                                        label:booking.shp_code?
                                                            (shipperCompanyList.findIndex(x=>x.value===booking.shp_code)>=0)?
                                                            shipperCompanyList[shipperCompanyList.findIndex(x=>x.value===booking.shp_code)].label:
                                                                '선택':
                                                            '선택'
                                                }}
                                                onChange={(e) => setBooking({...booking, ['shp_code']:e.value, ['shp_name1']:e.label})}
                                                options={shipperCompanyList}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                styles={{
                                                    control: provided => ({...provided,border:booking.shp_code?'':('CARD'===openType||'MAIN'===openType?'1px solid red':'')}),
                                                    indicatorContainer: provided => ({...provided,color:''})
                                                }}
                                                />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col> */}
                            <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0">사업자번호</Label></Col>
                                        <Col>
                                            <InputValid 
                                                type="text"
                                                bsSize="sm"
                                                name="business_number"
                                                id="business_number"
                                                placeholder="사업자 번호 입력 후 엔터"
                                                maxLength="10"
                                                value={booking.business_number?booking.business_number:''}
                                                onChange={(e)=>fncOnChange(e, 'business_number')}
                                                onBlur={(e) => {fncOnBlurBusinessNumber(e)}}
                                                onKeyPress={(e)=>fncOnKeyPress(e)}
                                                validtype="text" 
                                                required={false} 
                                                feedid="shipper"
                                                inputgrouptext={<i className="fa fa-search " onClick={()=>fncSearchBn()}/>}
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label for="shp_code" className="mb-0">Code</Label></Col>
                                        <Col>
                                        <InputValid 
                                            type="text"
                                            bsSize="sm"
                                            name="shp_code"
                                            id="shp_code"
                                            placeholder=""
                                            maxLength="5"
                                            value={booking.shp_code?booking.shp_code:''}
                                            onChange={(e)=>fncOnChange(e, 'shp_code')}
                                            onBlur={(e) => {props.fncBookingParent(booking)}}
                                            validtype="number" 
                                            required={false} 
                                            feedid="shipper"
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
                                                bsSize="sm"
                                                name="shp_name1"
                                                id="shp_name1"
                                                placeholder=""
                                                maxLength="35"
                                                value={booking.shp_name1?booking.shp_name1:''}
                                                onChange={(e)=>fncOnChange(e, 'shp_name1')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text" 
                                                required={true} 
                                                feedid="shipper"
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
                                            bsSize="sm"
                                            name="shp_name2"
                                            id="shp_name2"
                                            placeholder=""
                                            maxLength="35"
                                            value={booking.shp_name2?booking.shp_name2:''}
                                            onChange={(e)=>fncOnChange(e, 'shp_name2')}
                                            onBlur={(e) => {props.fncBookingParent(booking)}}
                                            validtype="text" 
                                            required={false} 
                                            feedid="shipper"
                                        />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col> */}
                            {/* <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0">User</Label></Col>
                                        <Col>
                                        <InputValid 
                                            type="text"
                                            bsSize="sm"
                                            name="shp_user_name"
                                            id="shp_user_name"
                                            placeholder=""
                                            maxLength="17"
                                            value={booking.shp_user_name?booking.shp_user_name:''}
                                            onChange={(e)=>fncOnChange(e, 'shp_user_name')}
                                            onBlur={(e) => {props.fncBookingParent(booking)}}
                                            validtype="text" 
                                            required={true} 
                                            feedid="shipper"
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
                                        <InputValid 
                                            type="text"
                                            bsSize="sm"
                                            name="shp_user_tel"
                                            id="shp_user_tel"
                                            placeholder=""
                                            maxLength="17"
                                            value={booking.shp_user_tel?booking.shp_user_tel:''}
                                            onChange={(e)=>fncOnChange(e, 'shp_user_tel')}
                                            onBlur={(e) => {props.fncBookingParent(booking)}}
                                            validtype="tel" 
                                            required={true} 
                                            feedid="shipper"
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
                                        <InputValid 
                                            type="text"
                                            bsSize="sm"
                                            name="shp_user_fax"
                                            id="shp_user_fax"
                                            placeholder=""
                                            maxLength="25"
                                            value={booking.shp_user_fax?booking.shp_user_fax:''}
                                            onChange={(e)=>fncOnChange(e, 'shp_user_fax')}
                                            onBlur={(e) => {props.fncBookingParent(booking)}}
                                            validtype="tel" 
                                            required={false} 
                                            feedid="shipper"
                                        />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Dept</Label></Col>
                                        <Col>
                                            <InputValid 
                                                type="text"
                                                bsSize="sm"
                                                name="shp_user_dept"
                                                id="shp_user_dept"
                                                placeholder=""
                                                maxLength="35"
                                                value={booking.shp_user_dept?booking.shp_user_dept:''}
                                                onChange={(e)=>fncOnChange(e, 'shp_user_dept')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text" 
                                                required={false} 
                                                feedid="shipper"
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                        </Col> */}
                            <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0">E-mail</Label></Col>
                                        <Col>
                                        <InputValid 
                                            type="text"
                                            bsSize="sm"
                                            name="shp_user_email"
                                            id="shp_user_email"
                                            placeholder=""
                                            maxLength="50"
                                            value={booking.shp_user_email?booking.shp_user_email:''}
                                            onChange={(e)=>fncOnChange(e, 'shp_user_email')}
                                            onBlur={(e) => {props.fncBookingParent(booking)}}
                                            validtype="email" 
                                            required={false} 
                                            feedid="shipper"
                                        />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            {/* <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Address</Label></Col>
                                        <Col>
                                            <InputValid 
                                                type="text"
                                                bsSize="sm"
                                                name="shp_address1"
                                                id="shp_address1"
                                                placeholder=""
                                                maxLength="35"
                                                value={booking.shp_address1?booking.shp_address1:''}
                                                onChange={(e)=>fncOnChange(e, 'shp_address1')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text" 
                                                required={true} 
                                                feedid="shipper"
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
                                                bsSize="sm"
                                                name="shp_address2"
                                                id="shp_address2"
                                                placeholder=""
                                                maxLength="35"
                                                value={booking.shp_address2?booking.shp_address2:''}
                                                onChange={(e)=>fncOnChange(e, 'shp_address2')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text" 
                                                required={false} 
                                                feedid="shipper"
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
                                            bsSize="sm"
                                            name="shp_address3"
                                            id="shp_address3"
                                            placeholder=""
                                            maxLength="35"
                                            value={booking.shp_address3?booking.shp_address3:''}
                                            onChange={(e)=>fncOnChange(e, 'shp_address3')}
                                            onBlur={(e) => {props.fncBookingParent(booking)}}
                                            validtype="text" 
                                            required={false} 
                                            feedid="shipper"
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
                                                bsSize="sm"
                                                name="shp_address4"
                                                id="shp_address4"
                                                placeholder=""
                                                maxLength="35"
                                                value={booking.shp_address4?booking.shp_address4:''}
                                                onChange={(e)=>fncOnChange(e, 'shp_address4')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text" 
                                                required={false} 
                                                feedid="shipper"
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
                                                bsSize="sm"
                                                name="shp_address5"
                                                id="shp_address5"
                                                placeholder=""
                                                maxLength="35"
                                                value={booking.shp_address5?booking.shp_address5:''}
                                                onChange={(e)=>fncOnChange(e, 'shp_address5')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text" 
                                                required={false} 
                                                feedid="shipper"
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col> */}
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
            <Form>
            <ModalHeader toggle={toggle}>Shipper</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <ShipperWdfc
                            shipper={booking}
                            fncOnBlurShipper={fncOnBlurShipper}
                            openType={"CARD"}
                            fncOpenType={fncOpenType}
                            shipperCompanyList={shipperCompanyList}
                            {...props}/>
                    </CardBody>
                </ModalBody>
            <ModalFooter>
                {/* <Button  color="primary" onClick={updateShipperOfBooking}>Save</Button>{' '} */}
                <Button  color="primary" onClick={toggle}>Apply</Button>{' '}
                <Button color="secondary" onClick={fncCacelModal}>Cancel</Button>
            </ModalFooter>
            </Form>
        </Modal>
    </>
    );
});

export default ShipperCardWdfc;