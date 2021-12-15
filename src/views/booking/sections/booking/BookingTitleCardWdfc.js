/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col, FormGroup, Label,Input, FormFeedback} from "reactstrap";
import * as validation from 'components/common/validation.js';
import Moment from 'moment';

import BookingBookmark from 'views/booking/sections/bookmark/BookingBookmark.js';

const BookingTitleCardWdfc = (props) => {
    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    // modal 창을 위한 state
    const [coll, setColl] = useState(false);
    const [open, setOpen] = useState(false);
    // 중요내용 부모/자식 공유를 위한 state
    const [booking, setBooking] = useState({});
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // SC NUMBER state
    const [other, setOther] = useState({});
    

    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        if( props.booking ) {
            let bkg_no = props.booking.bkg_no;
            let bkg_date = props.booking.bkg_date;
            let status_cus = props.booking.status_cus;
            let sc_no = props.booking.sc_no;
            let user_no = props.booking.user_no;
            // console.log("status_cus",status_cus)
            setBooking({...booking, 'bkg_no':bkg_no, 'bkg_date':bkg_date
                , 'status_cus':status_cus, 'sc_no':sc_no, 'user_no':user_no});

        }
    },[props.booking]);

    useEffect(()=>{
        setBooking({...booking
            , 'other_bookmark_seq':other.other_bookmark_seq
            , 'sc_no':other.sc_no
            , 'remark1':other.remark1
            , 'remark2':other.remark2});
    },[other]);

    // 모달창 팝업
    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
        // selectBooking();
    }

    // 자식에게 받은 Booking
    const fncOnBlurBooking = ( booking ) => {
        setBooking( booking );
    }

    // 입력값 useState 입력
    const fncOnChange = (e, key) => {
        setBooking({...booking, [key]:e.target.value.toUpperCase()});
        // if( 'bkg_no' === key ) {
        //     props.fncGetBkgNo(e.target.value);
        // }
        e.preventDefault();
    }

    const fncOnKeyPressBkgNo = (e) => {
        // setBooking({...booking, ['bkg_date']:booking.bkg_no.substr(0, 8)});
        if( "Enter" === e.key ) {
            // selectBooking();
            toggle();
        }
    }

    const fncBookmarkParent =(e)=>{
        props.fncBookmarkParent(e);
    }

  return (
    <>
    <Row>
        <Col xl="2" lg="2" md="12">
            <FormGroup>
                <Label className="mb-0">Req Bkg No</Label>
                <Input type="text" name="bkg_no" id="bkg_no"
                    maxLength="15"
                    readOnly
                    defaultValue={booking.bkg_no?booking.bkg_no:''}
                    // onChange={(e)=>fncOnChange(e, 'bkg_no')}
                    // onBlur={(e)=>props.fncGetBkgNo(booking.bkg_no)}
                    // onKeyPress={(e)=>fncOnKeyPressBkgNo(e)}
                    // invalid={booking.bkg_no?false:true}
                    // readOnly
                    />
                <FormFeedback>{validation.REQ_MSG}</FormFeedback>
            </FormGroup>
        </Col>  
        <Col xl="2" lg="2" md="12">
            <FormGroup>
                <Label className="mb-0">Req Bkg Date</Label>
                <Input type="text" name="sc_no" id="sc_no"
                    placeholder=""
                    maxLength="20"
                    readOnly
                    defaultValue={booking.bkg_date?Moment(booking.bkg_date).format('YYYY-MM-DD'):''}
                    // invalid={booking.bkg_date?false:true}
                />
                <FormFeedback>{validation.REQ_MSG}</FormFeedback>
            </FormGroup>
        </Col>
        <Col xl="2" lg="2" md="12">
            <FormGroup>
                <Label className="mb-0">저장</Label>
                <Input type="select" name="status_cus" id="status_cus"
                    value={booking.status_cus?booking.status_cus:''}
                    onChange={(e)=>fncOnChange(e, 'status_cus')}
                    readOnly>
                    <option value="NO">저장</option>
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
        <Col xl="3" lg="3" md="12" className="ml-auto">
        <FormGroup>
            <Label className="mb-0"></Label>
            <BookingBookmark
                fncBookmarkParent={fncBookmarkParent}
                {...props}
                />
        </FormGroup>
        </Col>
    </Row>
    </>
    );
}

export default BookingTitleCardWdfc;