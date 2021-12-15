/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col, FormGroup,Label,Input, Form } from "reactstrap";
import axios from "axios";


const Booking = (props) => {
    const [booking, setBooking] = useState({});
    const [incotermsList, setIncotermsList] = useState([]);
    const [defaultIncoterms, setDefaultIncoterms] = useState("");

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
        setBooking(props.booking);
        if( 1 > incotermsList.length ) {
            selectLineCodeIncoterms();
        }
        // // incoterms_code 초기화
        // if( 0 < incotermsList.length ) {
        //     incotermsList.map( (element, key ) =>{
        //         if ( 0 === key && !booking.incoterms_code)
        //             setBooking({...booking, ['incoterms_code']:element.incoterms_code});
        //     });
        // }
    },[props]);

    // 수정된 내용은 DOCUMENT로 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setBooking({...booking, [key]:e.target.value});
    }

    // 완료된 내용은 부모로 전달
    const fncOnBlurBooking = (e) => {
        e.preventDefault();
        props.fncOnBlurBooking( booking );
    }

    // 조회
    const selectLineCodeIncoterms = () => {
        axios.post(
            "/api/selectLineCodeIncoterms"
            ,{ user_no: 'M000002' }
            ,{}
        ).then(
            setIncotermsList([])
        ).then(
            res => setIncotermsList(res.data)
        ).catch(err => {
            if(err.response.status === 403||err.response.status === 401) {
                alert(err);
            }
        });
    }
return (
    <>
    <Form>
        <Row className="mb-3">
            <Col className="col-12" xl="12" lg="12" sm="12">
                <h5 className="mb-0">Booking Info</h5>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Booking Number</Label>
                    <Input type="text" name="bkg_no" id="bkg_no"
                        placeholder="Booking Number"
                        maxLength="15"
                        value={booking.bkg_no?booking.bkg_no:''}
                        onChange={(e) => {fncOnChange( e, 'bkg_no' )}}
                        onBlur={(e) => {fncOnBlurBooking(e)}}/>
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">계약 번호</Label>
                    <Input type="text" name="sc_no" id="sc_no" placeholder="계약 번호"
                        value={booking.sc_no?booking.sc_no:''}
                        maxLength="20"
                        onChange={(e) => {fncOnChange(e, 'sc_no')}}
                        onBlur={(e) => {fncOnBlurBooking(e)}}
                    />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Booking Date</Label>
                    <Input type="text" name="bkg_date" id="bkg_date"
                        placeholder="Booking Date"
                        maxLength="8"
                        defaultValue={booking.bkg_date?booking.bkg_date:''}
                        readOnly/>
                </FormGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">LINE</Label>
                    <Input type="select" name="line_code" id="line_code" placeholder="LINE"
                        defaultValue={booking.line_code?booking.line_code:''} >
                        <option value="WDFC">위동훼리</option>
                    </Input>
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">INCOTERMS 2000 거래조건</Label>
                    <Input type="select" name="incoterms_code" id="incoterms_code" placeholder="INCOTERMS 2000 거래조건"
                        value={booking.incoterms_code?booking.incoterms_code:defaultIncoterms}
                        onChange={(e)=>fncOnChange(e, 'incoterms_code')}
                        onBlur={(e)=>fncOnBlurBooking(e)}
                         >
                        {incotermsList.map((element,key)=>{
                            return(
                                <option key={key} value={element.incoterms_code}>
                                    {element.incoterms_code}
                                </option>
                            )
                        })}
                    </Input>
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Load Type</Label>
                    <Input type="select" name="load_type" id="load_type" placeholder="LCL / FCL"
                        value={booking.load_type?booking.load_type:''}
                        onChange={(e)=>fncOnChange(e, 'load_type')}
                        onBlur={(e)=>fncOnBlurBooking(e)}
                         >
                        <option value="F">FCL</option>
                        <option value="L">LCL</option>
                    </Input>
                </FormGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">REMARK1</Label>
                    <Input type="textarea" name="remark1" id="remark1" placeholder="비 고 1"
                        className="text-area-2"
                        maxLength="70"
                        value={booking.remark1?booking.remark1:''}
                        onChange={(e)=>fncOnChange(e, 'remark1')}
                        onBlur={(e)=>fncOnBlurBooking(e)}
                        />
                </FormGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">REMARK2</Label>
                    <Input type="textarea" name="remark2" id="remark2" placeholder="비 고 2"
                        className="text-area-2"
                        maxLength="70"
                        value={booking.remark2?booking.remark2:''}
                        onChange={(e)=>fncOnChange(e, 'remark2')}
                        onBlur={(e)=>fncOnBlurBooking(e)}
                        />
                </FormGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">현재 상태</Label>
                    <Input type="select" name="status_cus" id="status_cus" placeholder="현재 상태"
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
                    <Label className="mb-0">송신 일자</Label>
                    <Input type="text" name="send_date" id="send_date" placeholder="송신 일자"
                        defaultValue={booking.send_date?booking.send_date:''}
                        readOnly/>
                </FormGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">등록자</Label>
                    <Input type="text" name="user_no" id="user_no" placeholder="등록자"
                        defaultValue={booking.user_no?booking.user_no:''}
                        readOnly
                        />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">저장 일자</Label>
                    <Input type="text" name="insert_date" id="insert_date" placeholder="저장 일자"
                        defaultValue={booking.insert_date?booking.insert_date:''}
                        readOnly
                        />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">수정 일자</Label>
                    <Input type="text" name="update_date" id="update_date" placeholder="수정 일자"
                        defaultValue={booking.update_date?booking.update_date:''}
                        readOnly
                        />
                </FormGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col className="col-12" xl="12" lg="12" sm="12">
                <h5 className="mb-0">Carrier Info</h5>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">LINE Booking Number</Label>
                    <Input type="text" name="res_bkg_no" id="res_bkg_no"
                        placeholder="LINE Booking Number"
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
                        placeholder="송신 차수"
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
                        placeholder="선사 부킹 확정 일자"
                        defaultValue={booking.res_bkg_date?booking.res_bkg_date:''}
                        readOnly/>
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">선사 부킹 승인 일자</Label>
                    <Input type="text" name="res_confirm_date" id="res_confirm_date"
                        placeholder="송신 차수"
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
                        placeholder="선사 부킹 승인자"
                        defaultValue={booking.res_user_name?booking.res_user_name:''}
                        readOnly/>
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">선사 부킹 승인 수신 일자</Label>
                    <Input type="text" name="res_confirm_recv_date" id="res_confirm_recv_date"
                        placeholder="선사 부킹 승인 수신일자"
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
                        placeholder="화주부킹요청 KLNET ID"
                        maxLength="9"
                        defaultValue={booking.klnet_id?booking.klnet_id:''}/>
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">선사부킹승인 KLNET ID</Label>
                    <Input type="text" name="res_confirm_klnet_id" id="res_confirm_klnet_id"
                        placeholder="선사부킹승인 KLNET ID"
                        maxLength="9"
                        defaultValue={booking.res_confirm_klnet_id?booking.res_confirm_klnet_id:''}
                        readOnly />
                </FormGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">선사승인 REMARK</Label>
                    <Input type="textarea" name="res_remark1" id="res_remark1"
                        placeholder="선사승인 REMARK1"
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
                        placeholder="선사승인 REMARK2"
                        maxLength="70"
                        defaultValue={booking.res_remark2?booking.res_remark2:''}
                        readOnly
                        className="text-area-2"/>
                </FormGroup>
            </Col>
        </Row>
        </Form>
    </>
);
}

export default Booking;