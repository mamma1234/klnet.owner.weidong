/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, FormGroup,Label } from "reactstrap";
//import * as validation from 'components/common/validation.js';
import InputValid from "components/CustomInput/InputValid.js";
//import Select from "react-select";
import axios from 'axios';

const ForwarderWdfc = (props) => {
    const [forwarder, setForwarder] = useState({});
    const [openType, setOpenType] = useState("");
    const {forwarderCompanyList, user} = props;
    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    useEffect(() => {
        setForwarder(props.forwarder);
    },[props.forwarder]);

    useEffect(() => {
        setOpenType(props.openType);
    },[props.openType]);

    useEffect(()=>{
        props.fncOpenType(openType);
    },[openType]);

    // 수정된 내용은 FORWARDER 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setForwarder({...forwarder, [key]:e.target.value.toUpperCase()});
    }

    // 완료된 내용은 부모로 전달
    const fncOnBlur = (e) => {
        // e.preventDefault();
        props.fncOnBlur( forwarder );
    }

    const fncOnBlurBusinessNumber =(e)=> {
        // console.log(e.target.value )
        if( !e.target.value ) {
            setForwarder({...forwarder, ['fwd_business_number']:null, ['fwd_klnet_id']:null, ['fwd_code']:null, ['fwd_name1']:null})
            props.fncBookingParent({...forwarder, ['fwd_business_number']:null, ['fwd_klnet_id']:null, ['fwd_code']:null, ['fwd_name1']:null});
        }
    }

    const fncOnKeyPress = async(e)=>{
        // enter 인 경우 
        if( 13 === e.charCode ) {
            if( e.target.value.length < 10) return false;
            if( e.target.value && e.target.value.length === 10 ) {
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
                                setForwarder({
                                    ...forwarder, 
                                    ['fwd_business_number']:company.REG_NO, 
                                    ['fwd_code']:row.partner_code, 
                                    ['fwd_name1']:company.CNAME_KR,
                                })
                                props.fncBookingParent({
                                    ...forwarder, 
                                    ['fwd_business_number']:company.REG_NO, 
                                    ['fwd_code']:row.partner_code, 
                                    ['fwd_name1']:company.CNAME_KR
                                });
                            } else {
                                setForwarder({...forwarder, ['fwd_business_number']:null, ['fwd_code']:null, ['fwd_name1']:null})
                                props.fncBookingParent({...forwarder, ['fwd_business_number']:null, ['fwd_code']:null, ['fwd_name1']:null});
                            }
                        }
                    );
                } else {
                    props.onAlert("danger", "결과가 없습니다.");
                    setForwarder({...forwarder, ['fwd_business_number']:null, ['fwd_code']:null, ['fwd_name1']:null})
                    props.fncBookingParent({...forwarder, ['fwd_business_number']:null, ['fwd_code']:null, ['fwd_name1']:null});
                }
            }
        }
    }

    const fncSearchBn =()=>{
        
        if( !forwarder.fwd_business_number ) return false;
        if( forwarder.fwd_business_number.length < 10) return false;
        if( forwarder.fwd_business_number && forwarder.fwd_business_number.length === 10 ) {
            let row = forwarderCompanyList.find(v=>v.business_number === forwarder.fwd_business_number)
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
                            setForwarder({...forwarder, ['fwd_business_number']:company.REG_NO, ['fwd_code']:row.partner_code, ['fwd_name1']:company.CNAME_KR})
                            props.fncBookingParent({...forwarder, ['fwd_business_number']:company.REG_NO, ['fwd_code']:row.partner_code, ['fwd_name1']:company.CNAME_KR});
                        } else {
                            setForwarder({...forwarder, ['fwd_business_number']:null, ['fwd_code']:null, ['fwd_name1']:null})
                            props.fncBookingParent({...forwarder, ['fwd_business_number']:null, ['fwd_code']:null, ['fwd_name1']:null});
                        }
                    }
                );
            } else {
                props.onAlert("danger", "결과가 없습니다.");
                setForwarder({...forwarder, ['fwd_business_number']:null, ['fwd_code']:null, ['fwd_name1']:null})
                props.fncBookingParent({...forwarder, ['fwd_business_number']:null, ['fwd_code']:null, ['fwd_name1']:null});
            }
        }
    }
  return (
    <>
        <Row>
        {(openType === "BOOK")?
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Bookmark</Label>
                    {/* <Input type="text"
                        name="forwarder_bookmark_name"
                        id="forwarder_bookmark_name"
                        placeholder=""
                        maxLength="50"
                        value={forwarder.forwarder_bookmark_name?forwarder.forwarder_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'forwarder_bookmark_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        invalid={forwarder.forwarder_bookmark_name?false:('BOOK'===openType?true:false)}
                        />
                    <FormFeedback>{validation.REQ_MSG}</FormFeedback> */}

                    <InputValid 
                        type="text"
                        name="forwarder_bookmark_name"
                        id="forwarder_bookmark_name"
                        placeholder=""
                        maxLength="50"
                        value={forwarder.forwarder_bookmark_name?forwarder.forwarder_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'forwarder_bookmark_name')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={'BOOK'===openType?true:false} 
                    />
                </FormGroup>
            </Col>
        :<></>}
        {(openType === "BOOK")?<></>:
        <Col xl="12" lg="12" md="12">
            <Label className="mb-0">사업자 번호</Label>
            <InputValid 
                type="text"
                name="fwd_business_number"
                id="fwd_business_number"
                placeholder="사업자 번호 입력 후 엔터"
                maxLength="10"
                value={forwarder.fwd_business_number?forwarder.fwd_business_number:''}
                onChange={(e)=>fncOnChange(e, 'fwd_business_number')}
                onBlur={(e) => {fncOnBlurBusinessNumber(e)}}
                onKeyPress={(e)=>fncOnKeyPress(e)}
                validtype="text" 
                required={false} 
                feedid="forwarder"
                inputgrouptext={<i className="fa fa-search " onClick={()=>fncSearchBn()}/>}
            />
        </Col>
        }
        </Row>
        <Row>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Forwarder Code</Label>
                    <InputValid 
                        type="text"
                        name="fwd_code"
                        id="fwd_code"
                        placeholder=""
                        maxLength="5"
                        value={forwarder.fwd_code?forwarder.fwd_code:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_code')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="number"
                        required={false} 
                    />
                </FormGroup>
            </Col> 
            




            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Forwarder Name1</Label>
                    <InputValid 
                        type="text"
                        name="fwd_name1"
                        id="fwd_name1"
                        placeholder=""
                        maxLength="35"
                        value={forwarder.fwd_name1?forwarder.fwd_name1:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_name1')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            {/*<Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Forwarder Name2</Label>
                    <InputValid 
                        type="text"
                        name="fwd_name2"
                        id="fwd_name2"
                        placeholder=""
                        maxLength="35"
                        value={forwarder.fwd_name2?forwarder.fwd_name2:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_name2')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col> */}
        </Row>
        <Row>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Name</Label>
                    {/* <Input type="text"
                        name="fwd_user_name"
                        id="fwd_user_name"
                        placeholder=""
                        maxLength="17"
                        value={forwarder.fwd_user_name?forwarder.fwd_user_name:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="fwd_user_name"
                        id="fwd_user_name"
                        placeholder=""
                        maxLength="17"
                        value={forwarder.fwd_user_name?forwarder.fwd_user_name:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_name')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={("Y" === forwarder.user_forwarder_yn)?true:(forwarder.fwd_user_tel||forwarder.fwd_user_dept||forwarder.fwd_user_email||forwarder.fwd_user_fax)?true:false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Tel</Label>
                    {/* <Input type="text"
                        name="fwd_user_tel"
                        id="fwd_user_tel"
                        placeholder=""
                        maxLength="25"
                        value={forwarder.fwd_user_tel?forwarder.fwd_user_tel:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_tel')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="fwd_user_tel"
                        id="fwd_user_tel"
                        placeholder=""
                        maxLength="25"
                        value={forwarder.fwd_user_tel?forwarder.fwd_user_tel:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_tel')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={("Y" === forwarder.user_forwarder_yn)?true:false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Fax</Label>
                    {/* <Input type="text"
                        name="fwd_user_fax"
                        id="fwd_user_fax"
                        placeholder=""
                        maxLength="25"
                        value={forwarder.fwd_user_fax?forwarder.fwd_user_fax:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_fax')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="fwd_user_fax"
                        id="fwd_user_fax"
                        placeholder=""
                        maxLength="25"
                        value={forwarder.fwd_user_fax?forwarder.fwd_user_fax:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_fax')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="tel"
                        required={false} 
                    />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Dept</Label>
                    {/* <Input type="text"
                        name="fwd_user_dept"
                        id="fwd_user_dept"
                        placeholder=""
                        maxLength="35"
                        value={forwarder.fwd_user_dept?forwarder.fwd_user_dept:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_dept')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="fwd_user_dept"
                        id="fwd_user_dept"
                        placeholder=""
                        maxLength="35"
                        value={forwarder.fwd_user_dept?forwarder.fwd_user_dept:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_dept')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">E-mail</Label>
                    {/* <Input type="text"
                        name="fwd_user_email"
                        id="fwd_user_email"
                        placeholder=""
                        maxLength="25"
                        value={forwarder.fwd_user_email?forwarder.fwd_user_email:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_email')}
                        onBlur={(e)=>fncOnBlur(e)}
                        invalid={forwarder.fwd_user_email?(validation.validationEmail(forwarder.fwd_user_email)?false:true):false}
                        />
                    <FormFeedback>{validation.EML_MSG}</FormFeedback> */}
                    <InputValid 
                        type="text"
                        name="fwd_user_email"
                        id="fwd_user_email"
                        placeholder=""
                        maxLength="50"
                        value={forwarder.fwd_user_email?forwarder.fwd_user_email:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_email')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="email"
                        required={false} 
                    />
                </FormGroup>
            </Col>
        </Row>
        {/* <Row>
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">Address1</Label>
                    <InputValid 
                        type="text"
                        name="fwd_address1"
                        id="fwd_address1"
                        placeholder=""
                        maxLength="35"
                        value={forwarder.fwd_address1?forwarder.fwd_address1:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_address1')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">Address2</Label>
                    <InputValid 
                        type="text"
                        name="fwd_address2"
                        id="fwd_address2"
                        placeholder=""
                        maxLength="35"
                        value={forwarder.fwd_address2?forwarder.fwd_address2:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_address2')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">Address3</Label>
                    <InputValid 
                        type="text"
                        name="fwd_address3"
                        id="fwd_address3"
                        placeholder=""
                        maxLength="35"
                        value={forwarder.fwd_address3?forwarder.fwd_address3:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_address3')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">Address4</Label>
                    <InputValid 
                        type="text"
                        name="fwd_address4"
                        id="fwd_address4"
                        placeholder=""
                        maxLength="35"
                        value={forwarder.fwd_address4?forwarder.fwd_address4:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_address4')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">Address5</Label>
                    <InputValid 
                        type="text"
                        name="fwd_address5"
                        id="fwd_address5"
                        placeholder=""
                        maxLength="35"
                        value={forwarder.fwd_address5?forwarder.fwd_address5:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_address5')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
        </Row> */}
    </>
    );
}

export default ForwarderWdfc;