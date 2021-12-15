/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col, FormGroup,Label,Input, Form } from "reactstrap";
import axios from "axios";
//import * as validation from 'components/common/validation.js';
import InputValid from "components/CustomInput/InputValid.js";
import Select from "react-select";


const BookingWdfc = (props) => {
    const [booking, setBooking] = useState({});
    const [incotermsList, setIncotermsList] = useState([]);
    // const [defaultIncoterms, setDefaultIncoterms] = useState("");
    const [serviceList, setServiceList] = useState([]);
    const [paymentList, setPaymentList] = useState([
        {value: 'P', label: '선불'},
        {value: 'C', label: '후불'}
    ]);
    // const [openType, setOpenType] = useState("");
    // const {user, openType} = props;
    const {openType, user} = props;

    useEffect(() => {

    },[]);

    useEffect(() => {
        if( 0 < incotermsList.length ) {
            incotermsList.map( (element, key ) =>{
                if ( 0 === key && !booking.incoterms_code)
                    setBooking({...booking, ['incoterms_code']:element.incoterms_code});
            });
        }
    },[incotermsList]);

    useEffect(() => {
        setServiceList(props.serviceList);
    },[props.serviceList]);

    useEffect(() => {
        setBooking(props.booking);
    },[props.booking]);

    // useEffect(()=>{
    //     props.fncOpenType(openType);
    // }, [openType]);

    // 수정된 내용은 Booking 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setBooking({...booking, [key]:e.target.value.toUpperCase()});
    }

    const fncOnChangeSelect = ( e, key ) => {
        setBooking({...booking, [key]:e.target.value.toUpperCase()});
        props.fncOnBlurBooking({...booking, [key]:e.target.value.toUpperCase()});
    }

    // 조회
    const selectLineCodeIncoterms = () => {
        axios.post(
            "/shipper/selectLineCodeIncoterms"
            ,{ user_no: 'M000002' }
            ,{}
        ).then(
            setIncotermsList([])
        ).then(
            res => setIncotermsList(res.data)
        );
    }


return (
    <>
    <Form>
        <Row className="mb-3">
            <Col className="col-12" xl="12" lg="12" sm="12">
                <h5 className="mb-0">Requset Booking Info</h5>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Req Bkg No</Label>
                    <InputValid 
                        type="text"
                        bsSize="sm"
                        name="bkg_no"
                        id="bkg_no"
                        placeholder=""
                        maxLength="15"
                        value={booking.bkg_no?booking.bkg_no:''}
                        onChange={(e)=>fncOnChange(e, 'bkg_no')}
                        onBlur={()=>props.fncOnBlurBooking(booking)}
                        validtype="text" 
                        required={true}
                    />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Req Bkg Date</Label>
                    <InputValid 
                        type="text"
                        bsSize="sm"
                        name="bkg_date"
                        id="bkg_date"
                        placeholder=""
                        maxLength="12"
                        value={booking.bkg_date?booking.bkg_date:''}
                        onChange={(e)=>fncOnChange(e, 'bkg_date')}
                        onBlur={()=>props.fncOnBlurBooking(booking)}
                        validtype="text" 
                        required={false}
                        readOnly
                    />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">SC Number</Label>
                    <InputValid 
                        type="text"
                        bsSize="sm"
                        name="sc_no"
                        id="sc_no"
                        placeholder=""
                        maxLength="10"
                        minLength="10"
                        value={booking.sc_no?booking.sc_no:''}
                        onChange={(e)=>fncOnChange(e, 'sc_no')}
                        onBlur={()=>props.fncOnBlurBooking(booking)}
                        validtype="engNumber" 
                        required={false}
                    />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Term</Label>
                    {/* <Input type="select" name="trans_service_code" id="trans_service_code"
                        placeholder=""
                        value={booking.trans_service_code?booking.trans_service_code:''}
                        onChange={(e)=>fncOnChangeSelect(e, 'trans_service_code')}
                        // onBlur={() => {props.fncOnBlurBooking(booking)}}
                        >
                        <option key={0} value={'0'}>
                            선택
                        </option>
                        {(serviceList.length>0)?serviceList.map((element,key)=>{
                            return(
                                <option key={key} value={element.service_code}>
                                    {element.service_type}
                                </option>
                            )
                        })
                        :<></>}
                    </Input> */}
                    <Select
                        className="customSelect"
                        classNamePrefix="customSelect"
                        //className="react-select react-select-primary"
                        //classNamePrefix="react-select"
                        name="trans_service_code"
                        placeholder=""
                        value={{value:booking.trans_service_code?booking.trans_service_code:'',
                                label:booking.trans_service_code?
                                (serviceList.findIndex(x=>x.value===booking.trans_service_code)>=0)?
                                serviceList[serviceList.findIndex(x=>x.value===booking.trans_service_code)].label:
                                    '선택':
                                '선택'
                            }}
                        onChange={(value)=>setBooking({...booking,'trans_service_code':value.value})}
                        onBlur={(e)=>props.fncOnBlurBooking(booking)}
                        options={serviceList}
                        styles={{
                            control: provided => ({...provided,border:!booking.trans_service_code?'1px solid red':'' }),
                            indicatorContainer: provided => ({...provided,color:''})
                        }}
                        />
                    <InputValid
                        hidden
                        type="text"
                        name="trans_service_code"
                        id="trans_service_code"
                        placeholder=""
                        maxLength="3"
                        value={booking.trans_service_code?booking.trans_service_code:''}
                        validtype="select"
                        required={true} 
                    />
                </FormGroup>
            </Col>
            {/* <Col xl="4" lg="4" md="12">
                <FormGroup className="mb-1">
                <Label className="mb-0">Payment</Label>
                <Select
                    className="customSelect"
                    classNamePrefix="customSelect"
                    name="shp_payment_type"
                    placeholder=""
                    value={{value:booking.shp_payment_type?booking.shp_payment_type:'',
                            label:booking.shp_payment_type?
                                (paymentList.findIndex(x=>x.value===booking.shp_payment_type)>=0)?
                                paymentList[paymentList.findIndex(x=>x.value===booking.shp_payment_type)].label:
                                    '선택':
                                '선택'   
                        }
                    }
                    onChange={(value)=>setBooking({...booking,'shp_payment_type':value.value})}
                    onBlur={(e)=>props.fncOnBlurBooking(booking)}
                    options={paymentList}
                    styles={{
                        control: provided => ({...provided,border:!booking.shp_payment_type?'1px solid red':'' }),
                        indicatorContainer: provided => ({...provided,color:''})
                    }}
                    />
                    <InputValid
                        hidden
                        type="text"
                        name="shp_payment_type"
                        id="shp_payment_type1"
                        placeholder=""
                        maxLength="3"
                        value={booking.shp_payment_type?booking.shp_payment_type:''}
                        validtype="text"
                        required={true} 
                        feedid="booking"
                        readOnly
                    />
                </FormGroup>
            </Col> */}
        </Row>
        {/* <Row className="mb-3">
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">REMARK1</Label>
                    <InputValid 
                        type="text"
                        bsSize="sm"
                        name="remark1"
                        id="remark1"
                        placeholder=""
                        maxLength="70"
                        value={booking.remark1?booking.remark1:''}
                        onChange={(e)=>fncOnChange(e, 'remark1')}
                        onBlur={()=>props.fncOnBlurBooking(booking)}
                        validtype="text" 
                        required={false}
                    />
                </FormGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">REMARK2</Label>
                    <InputValid 
                        type="text"
                        bsSize="sm"
                        name="remark2"
                        id="remark2"
                        placeholder=""
                        maxLength="70"
                        value={booking.remark2?booking.remark2:''}
                        onChange={(e)=>fncOnChange(e, 'remark2')}
                        onBlur={()=>props.fncOnBlurBooking(booking)}
                        validtype="text" 
                        required={false}
                    />
                </FormGroup>
            </Col>
        </Row> */}
        <Row className="mb-3">
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">현재 상태</Label>
                    <Input type="select" name="status_cus" id="status_cus" placeholder=""
                        value={booking.status_cus?booking.status_cus:''}
                        readOnly>
                        <option value="NO">현재상태</option>
                        <option value="S0">저장</option>
                        <option value="S9">전송</option>
                        <option value="S4">정정전송</option>
                        <option value="S1">취소전송</option>
                        <option value="BC">승인</option>
                        <option value="RJ">거절</option>
                        <option value="CC">취소승인</option>
                        <option value="RC">승인취소</option>
                    </Input>
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">전송 일자</Label>
                    <Input type="text" name="send_date" id="send_date" placeholder=""
                        defaultValue={booking.send_date?booking.send_date:''}
                        readOnly/>
                </FormGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col className="col-12" xl="12" lg="12" sm="12">
                <h5 className="mb-0">Carrier Info</h5>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Carrier Booking Number</Label>
                    <Input type="text" name="res_bkg_no" id="res_bkg_no"
                        placeholder=""
                        maxLength="35"
                        defaultValue={booking.res_bkg_no?booking.res_bkg_no:''}
                        readOnly
                        />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">송신 차수</Label>
                    <Input type="text" name="sending_count" id="sending_count"
                        placeholder=""
                        defaultValue={booking.sending_count?booking.sending_count:''}
                        readOnly/>
                </FormGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">선사 부킹 확정 일자</Label>
                    <Input type="text" name="res_bkg_date" id="res_bkg_date"
                        placeholder=""
                        defaultValue={booking.res_bkg_date?booking.res_bkg_date:''}
                        readOnly/>
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">선사 부킹 승인 일자</Label>
                    <Input type="text" name="res_confirm_date" id="res_confirm_date"
                        placeholder=""
                        defaultValue={booking.res_confirm_date?booking.res_confirm_date:''}
                        readOnly />
                </FormGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">선사 부킹 승인자</Label>
                    <Input type="text" name="res_user_name" id="res_user_name"
                        placeholder=""
                        defaultValue={booking.res_user_name?booking.res_user_name:''}
                        readOnly/>
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">선사 부킹 승인 수신 일자</Label>
                    <Input type="text" name="res_confirm_recv_date" id="res_confirm_recv_date"
                        placeholder=""
                        defaultValue={booking.res_confirm_recv_date?booking.res_confirm_recv_date:''}
                        readOnly />
                </FormGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">화주부킹요청 KLNET ID</Label>
                    <Input type="text" name="klnet_id" id="klnet_id"
                        placeholder=""
                        maxLength="9"
                        defaultValue={booking.klnet_id?booking.klnet_id:''}
                        readOnly/>
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">선사부킹승인 KLNET ID</Label>
                    <Input type="text" name="res_confirm_klnet_id" id="res_confirm_klnet_id"
                        placeholder=""
                        maxLength="9"
                        defaultValue={booking.res_confirm_klnet_id?booking.res_confirm_klnet_id:''}
                        readOnly />
                </FormGroup>
            </Col>
        </Row>
        {/* <Row className="mb-3">
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">선사승인 REMARK</Label>
                    <Input type="textarea" name="res_remark1" id="res_remark1"
                        placeholder=""
                        maxLength="70"
                        defaultValue={booking.res_remark1?booking.res_remark1:''}
                        readOnly
                        className="text-area-2"/>
                </FormGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">선사승인 REMARK</Label>
                    <Input type="textarea" name="res_remark2" id="res_remark2"
                        placeholder=""
                        maxLength="70"
                        defaultValue={booking.res_remark2?booking.res_remark2:''}
                        readOnly
                        className="text-area-2"/>
                </FormGroup>
            </Col>
        </Row> */}
        </Form>
    </>
);
}

export default BookingWdfc;