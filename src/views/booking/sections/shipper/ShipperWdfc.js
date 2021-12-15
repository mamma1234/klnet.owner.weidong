/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col, FormGroup,Label,Input, FormFeedback, Form } from "reactstrap";
import InputValid from 'components/CustomInput/InputValid.js';
import axios from 'axios';

const ShipperWdfc = (props) => {
    const [shipper, setShipper] = useState({});
    // openType CARD, BOOK 에 따라 Bookmark 명 visible
    const [openType, setOpenType] = useState("");

    const {shipperCompanyList, user} = props;
    useEffect(() => {
        // console.log(validation, validation.emailMsg)
        // console.log("렌더링 될 때마다 수행");
    },[]);

    // useEffect(() => {
    //     console.log("aaaaabxxxxxxxx", props.shipper )
    //     setShipper(props.shipper);
    //     setOpenType(props.openType);
    // },[props]);

    useEffect(() => {
        setShipper(props.shipper);
    },[props.shipper]);

    useEffect(() => {
        setOpenType(props.openType);
    },[props.openType]);

    useEffect(()=>{
        props.fncOpenType(openType);
    },[openType]);

    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        // console.log(e.target.value)
        setShipper({...shipper, [key]:e.target.value.toUpperCase()});
    }
    // 완료된 내용은 부모로 전달
    const fncOnBlurShipper = (e) => {
        // e.preventDefault();
        // console.log(shipper)
        props.fncOnBlurShipper( shipper );
    }
    const fncOnKeyPress = async(e)=>{
        // enter 인 경우 
        if( 13 === e.charCode ) {
            if( e.target.value.length < 10) return false;
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
                                setShipper({...shipper, ['business_number']:company.REG_NO, ['shp_code']:row.partner_code, ['shp_name1']:company.CNAME_KR})
                                props.fncBookingParent({...shipper, ['business_number']:company.REG_NO, ['shp_code']:row.partner_code, ['shp_name1']:company.CNAME_KR});
                            } else {
                                setShipper({...shipper, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null})
                                props.fncBookingParent({...shipper, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null});
                            }
                        }
                    );
                    // setShipper({...shipper, ['business_number']:row.business_number, ['shp_code']:row.partner_code})
                    // props.fncBookingParent({...shipper, ['business_number']:row.business_number, ['shp_code']:row.partner_code});
                } else {
                    props.onAlert("danger", "결과가 없습니다.");
                    setShipper({...shipper, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null})
                    props.fncBookingParent({...shipper, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null});
                }
            }
        }
    }


    const fncOnBlurBusinessNumber =(e)=> {
        // console.log(e.target.value )
        if( !e.target.value ) {
            setShipper({...shipper, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null})
            props.fncBookingParent({...shipper, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null});
        }
    }



    const fncSearchBn =()=>{
        
        if( !shipper.business_number ) return false;
        if( shipper.business_number.length < 10) return false;
        if( shipper.business_number && shipper.business_number.length === 10 ) {
            let row = shipperCompanyList.find(v=>v.business_number === shipper.business_number)
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
                            setShipper({...shipper, ['business_number']:company.REG_NO, ['shp_code']:row.partner_code, ['shp_name1']:company.CNAME_KR})
                            props.fncBookingParent({...shipper, ['business_number']:company.REG_NO, ['shp_code']:row.partner_code, ['shp_name1']:company.CNAME_KR});
                        } else {
                            setShipper({...shipper, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null})
                            props.fncBookingParent({...shipper, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null});
                        }
                    }
                );
                // setShipper({...shipper, ['business_number']:row.business_number, ['shp_code']:row.partner_code})
                // props.fncBookingParent({...shipper, ['business_number']:row.business_number, ['shp_code']:row.partner_code});
            } else {
                props.onAlert("danger", "결과가 없습니다.");
                setShipper({...shipper, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null})
                props.fncBookingParent({...shipper, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null});
            }
        }
    }
  return (
    <>
    <Row>
    {(openType === 'BOOK')?
        <Col xl="12" lg="12" md="12">
            <FormGroup>
                <Label className="mb-0">Bookmark Name</Label>
                <InputValid 
                    type="text"
                    name="shipper_bookmark_name"
                    id="shipper_bookmark_name"
                    placeholder=""
                    maxLength="50"
                    value={shipper.shipper_bookmark_name?shipper.shipper_bookmark_name:''}
                    onChange={(e)=>fncOnChange(e, 'shipper_bookmark_name')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="text"
                    required={'BOOK'===openType?true:false} 
                />
            </FormGroup>
        </Col>
    :<></>}
    </Row>
    <Row>
        {/* <Col xl="12" lg="12" md="12">
            <FormGroup>
                <Label className="mb-0">Shipper</Label>
                <Select
                    className="customSelect"
                    classNamePrefix="customSelect"
                    //className="react-select react-select-primary"
                    //classNamePrefix="react-select"
                    name="shp_code"
                    placeholder=""
                    value={{value:shipper.shp_code?shipper.shp_code:'',
                            // label:shipper.shp_code?lineCodeVesselPickup[lineCodeVesselPickup.findIndex(x=>x.value===container.cntr_pick_up_cy_code)].label:'선택'
                            label:shipper.shp_code?
                                (shipperCompanyList.findIndex(x=>x.value===shipper.shp_code)>=0)?
                                shipperCompanyList[shipperCompanyList.findIndex(x=>x.value===shipper.shp_code)].label:
                                    '선택':
                                '선택'
                    }}
                    onChange={(e) => setShipper({...shipper, ['shp_code']:e.value, ['shp_name1']:e.label})}
                    options={shipperCompanyList}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    styles={{
                        control: provided => ({...provided,border:shipper.shp_code?'':('CARD'===openType||'MAIN'===openType?'1px solid red':'')}),
                        indicatorContainer: provided => ({...provided,color:''})
                    }}
                    />
            </FormGroup>
        </Col> */}
        {(openType === 'BOOK')?<></>:
        <Col xl="12" lg="12" md="12">
            <FormGroup className="mb-1">
                <FormGroup>
                <Label className="mb-0">사업자 번호</Label>
                <InputValid 
                    type="text"
                    bsSize="sm"
                    name="business_number"
                    id="business_number"
                    placeholder="사업자 번호 입력 후 엔터"
                    maxLength="10"
                    value={shipper.business_number?shipper.business_number:''}
                    onChange={(e)=>fncOnChange(e, 'business_number')}
                    onBlur={(e) => {fncOnBlurBusinessNumber(e)}}
                    onKeyPress={(e)=>fncOnKeyPress(e)}
                    validtype="text" 
                    required={true} 
                    feedid="shipper"
                    inputgrouptext={<i className="fa fa-search " onClick={()=>fncSearchBn()}/>}
                />
            </FormGroup>
            </FormGroup>
        </Col>}
        <Col xl="12" lg="12" md="12">
            <FormGroup>
                <Label className="mb-0">Shipper Code</Label>
                <InputValid 
                    type="text"
                    name="shp_code"
                    id="shp_code"
                    placeholder=""
                    maxLength="5"
                    value={shipper.shp_code?shipper.shp_code:''}
                    onChange={(e)=>fncOnChange(e, 'shp_code')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="number"
                    required={'CARD'===openType?true:false} 
                />
            </FormGroup>
        </Col>
         <Col xl="12" lg="12" md="12">
            <FormGroup>
                <Label className="mb-0">Shipper Name1</Label>
                <InputValid 
                    type="text"
                    name="shp_name1"
                    id="shp_name1"
                    placeholder=""
                    maxLength="35"
                    value={shipper.shp_name1?shipper.shp_name1:''}
                    onChange={(e)=>fncOnChange(e, 'shp_name1')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="text"
                    required={'CARD'===openType?true:false} 
                />
            </FormGroup>
        </Col>
        {/*<Col xl="6" lg="6" md="12">
            <FormGroup>
                <Label className="mb-0">Shipper Name2</Label>
                <InputValid 
                    type="text"
                    name="shp_name2"
                    id="shp_name2"
                    placeholder=""
                    maxLength="35"
                    value={shipper.shp_name2?shipper.shp_name2:''}
                    onChange={(e)=>fncOnChange(e, 'shp_name2')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="text"
                    required={false} 
                />
            </FormGroup>
        </Col> */}
    </Row>
    {/* <Row>
        <Col xl="4" lg="4" md="12">
            <FormGroup>
                <Label className="mb-0">Name</Label>
                <InputValid 
                    type="text"
                    name="shp_user_name"
                    id="shp_user_name"
                    placeholder=""
                    maxLength="17"
                    value={shipper.shp_user_name?shipper.shp_user_name:''}
                    onChange={(e)=>fncOnChange(e, 'shp_user_name')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="text"
                    required={'CARD'===openType?true:false} 
                />
            </FormGroup>
        </Col>
        <Col xl="4" lg="4" md="12">
            <FormGroup>
                <Label className="mb-0">Tel</Label>
                <InputValid 
                    type="text"
                    name="shp_user_tel"
                    id="shp_user_tel"
                    placeholder=""
                    maxLength="17"
                    value={shipper.shp_user_tel?shipper.shp_user_tel:''}
                    onChange={(e)=>fncOnChange(e, 'shp_user_tel')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="tel"
                    required={'CARD'===openType?true:false} 
                />
            </FormGroup>
        </Col>
        <Col xl="4" lg="4" md="12">
            <FormGroup>
                <Label className="mb-0">Fax</Label>
                <InputValid 
                    type="text"
                    name="shp_user_fax"
                    id="shp_user_fax"
                    placeholder=""
                    maxLength="25"
                    value={shipper.shp_user_fax?shipper.shp_user_fax:''}
                    onChange={(e)=>fncOnChange(e, 'shp_user_fax')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="tel"
                    required={false} 
                />
            </FormGroup>
        </Col>
    </Row> */}
    <Row>
        {/* <Col xl="6" lg="6" md="12">
            <FormGroup>
                <Label className="mb-0">Dept</Label>
                <InputValid 
                    type="text"
                    name="shp_user_dept"
                    id="shp_user_dept"
                    placeholder=""
                    maxLength="35"
                    value={shipper.shp_user_dept?shipper.shp_user_dept:''}
                    onChange={(e)=>fncOnChange(e, 'shp_user_dept')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="text"
                    required={false} 
                />
            </FormGroup>
        </Col> */}
        <Col xl="12" lg="12" md="12">
            <FormGroup>
                <Label className="mb-0">E-mail</Label>
                <InputValid 
                    type="text"
                    name="shp_user_email"
                    id="shp_user_email"
                    placeholder=""
                    maxLength="50"
                    value={shipper.shp_user_email?shipper.shp_user_email:''}
                    onChange={(e)=>fncOnChange(e, 'shp_user_email')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
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
                    name="shp_address1"
                    id="shp_address1"
                    placeholder=""
                    maxLength="35"
                    value={shipper.shp_address1?shipper.shp_address1:''}
                    onChange={(e)=>fncOnChange(e, 'shp_address1')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="text"
                    required={'CARD'===openType?true:false} 
                />
            </FormGroup>
        </Col>
        <Col xl="12" lg="12" md="12">
            <FormGroup>
                <Label className="mb-0">Address2</Label>
                <InputValid 
                    type="text"
                    name="shp_address2"
                    id="shp_address2"
                    placeholder=""
                    maxLength="35"
                    value={shipper.shp_address2?shipper.shp_address2:''}
                    onChange={(e)=>fncOnChange(e, 'shp_address2')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
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
                    name="shp_address3"
                    id="shp_address3"
                    placeholder=""
                    maxLength="35"
                    value={shipper.shp_address3?shipper.shp_address3:''}
                    onChange={(e)=>fncOnChange(e, 'shp_address3')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
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
                    name="shp_address4"
                    id="shp_address4"
                    placeholder=""
                    maxLength="35"
                    value={shipper.shp_address4?shipper.shp_address4:''}
                    onChange={(e)=>fncOnChange(e, 'shp_address4')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
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
                    name="shp_address5"
                    id="shp_address5"
                    placeholder=""
                    maxLength="35"
                    value={shipper.shp_address5?shipper.shp_address5:''}
                    onChange={(e)=>fncOnChange(e, 'shp_address5')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="text"
                    required={false} 
                />
            </FormGroup>
        </Col>
    </Row> */}
    </>
    );
}

export default ShipperWdfc;