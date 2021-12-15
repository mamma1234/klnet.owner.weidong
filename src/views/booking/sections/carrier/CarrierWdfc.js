/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col, FormGroup,Label } from "reactstrap";
import InputValid from "components/CustomInput/InputValid.js";

const CarrierWdfc = (props) => {
    const [line, setLine] = useState({});
    // CARD, BOOK
    const [openType, setOpenType] = useState("");

    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    useEffect(() => {
        setLine(props.line);
    },[props.line]);

    useEffect(() => {
        setOpenType(props.openType);
    },[props.openType]);

    useEffect(()=>{
        props.fncOpenType(openType);
    },[openType]);

    // 수정된 내용은 Line 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setLine({...line, [key]:e.target.value.toUpperCase()});
    }

    // 완료된 내용은 부모로 전달
    const fncOnBlur = (e) => {
        e.preventDefault();
        props.fncOnBlur( line );
    }
  return (
    <>
        <Row>
            {(openType === "BOOK")?
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Bookmark</Label>
                    {/* <Input type="text"
                        name="line_bookmark_name"
                        id="line_bookmark_name"
                        placeholder=""
                        maxLength="50"
                        value={line.line_bookmark_name?line.line_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'line_bookmark_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        invalid={line.line_bookmark_name?false:('BOOK'===openType?true:false)}
                        />
                    <FormFeedback>{validation.REQ_MSG}</FormFeedback> */}
                    <InputValid 
                        type="text"
                        name="line_bookmark_name"
                        id="line_bookmark_name"
                        placeholder=""
                        maxLength="50"
                        value={line.line_bookmark_name?line.line_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'line_bookmark_name')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={'BOOK'===openType?true:false}
                    />
                </FormGroup>
            </Col>:<></>}
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Carrier Code</Label>
                    {/* <Input type="text" name="line_code" id="line_code"
                        placeholder=""
                        maxLength="35"
                        value={line.line_code?line.line_code:'WDFC'}
                        onChange={(e)=>fncOnChange(e, 'line_code')}
                        onBlur={(e)=>fncOnBlur(e)}
                        readOnly
                        /> */}
                    <InputValid 
                        type="text"
                        name="line_code"
                        id="line_code"
                        placeholder=""
                        maxLength="35"
                        value={line.line_code?line.line_code:'WDFC'}
                        onChange={(e)=>fncOnChange(e, 'line_code')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false}
                        readOnly
                    />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Carrier Name1</Label>
                    <InputValid 
                        type="text"
                        name="line_name1"
                        id="line_name1"
                        placeholder=""
                        maxLength="35"
                        value={line.line_name1?line.line_name1:''}
                        onChange={(e)=>fncOnChange(e, 'line_name1')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Carrier Name2</Label>
                    {/* <Input type="text" name="line_name1" id="line_name2"
                        placeholder=""
                        maxLength="35"
                        value={line.line_name2?line.line_name2:''}
                        onChange={(e)=>fncOnChange(e, 'line_name2')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="line_name2"
                        id="line_name2"
                        placeholder=""
                        maxLength="35"
                        value={line.line_name2?line.line_name2:''}
                        onChange={(e)=>fncOnChange(e, 'line_name2')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Name</Label>
                    {/* <Input type="text" name="line_user_name" id="line_user_name"
                        placeholder=""
                        maxLength="17"
                        value={line.line_user_name?line.line_user_name:''}
                        onChange={(e)=>fncOnChange(e, 'line_user_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="line_user_name"
                        id="line_user_name"
                        placeholder=""
                        maxLength="17"
                        value={line.line_user_name?line.line_user_name:''}
                        onChange={(e)=>fncOnChange(e, 'line_user_name')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Tel</Label>
                    {/* <Input type="text" name="line_user_tel" id="line_user_tel"
                        placeholder=""
                        maxLength="25"
                        value={line.line_user_tel?line.line_user_tel:''}
                        onChange={(e)=>fncOnChange(e, 'line_user_tel')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="line_user_tel"
                        id="line_user_tel"
                        placeholder=""
                        maxLength="25"
                        value={line.line_user_tel?line.line_user_tel:''}
                        onChange={(e)=>fncOnChange(e, 'line_user_tel')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="tel"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Fax</Label>
                    {/* <Input type="text" name="line_user_fax" id="line_user_fax"
                        placeholder=""
                        maxLength="20"
                        value={line.line_user_fax?line.line_user_fax:''}
                        onChange={(e)=>fncOnChange(e, 'line_user_fax')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="line_user_fax"
                        id="line_user_fax"
                        placeholder=""
                        maxLength="20"
                        value={line.line_user_fax?line.line_user_fax:''}
                        onChange={(e)=>fncOnChange(e, 'line_user_fax')}
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
                    {/* <Input type="text" name="line_user_dept" id="line_user_dept"
                        placeholder=""
                        maxLength="35"
                        value={line.line_user_dept?line.line_user_dept:''}
                        onChange={(e)=>fncOnChange(e, 'line_user_dept')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="line_user_dept"
                        id="line_user_dept"
                        placeholder=""
                        maxLength="35"
                        value={line.line_user_dept?line.line_user_dept:''}
                        onChange={(e)=>fncOnChange(e, 'line_user_dept')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">E-mail</Label>
                    {/* <Input type="email" name="line_user_email" id="line_user_email"
                        placeholder=""
                        maxLength="25"
                        value={line.line_user_email?line.line_user_email:''}
                        onChange={(e)=>fncOnChange(e, 'line_user_email')}
                        onBlur={(e)=>fncOnBlur(e)}
                        invalid={line.line_user_email?(validation.validationEmail(line.line_user_email)?false:true):false}
                        />
                    <FormFeedback>{validation.EML_MSG}</FormFeedback> */}
                    <InputValid 
                        type="text"
                        name="line_user_email"
                        id="line_user_email"
                        placeholder=""
                        maxLength="25"
                        value={line.line_user_email?line.line_user_email:''}
                        onChange={(e)=>fncOnChange(e, 'line_user_email')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="email"
                        required={false} 
                    />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">Address1</Label>
                    {/* <Input type="text"
                        name="line_address1"
                        id="line_address1"
                        placeholder=""
                        value={line.line_address1?line.line_address1:''}
                        maxLength="35"
                        onChange={(e)=>fncOnChange(e, 'line_address1')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="line_address1"
                        id="line_address1"
                        placeholder=""
                        maxLength="35"
                        value={line.line_address1?line.line_address1:''}
                        onChange={(e)=>fncOnChange(e, 'line_address1')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">Address2</Label>
                    {/* <Input type="text"
                        name="line_address2"
                        id="line_address2"
                        placeholder=""
                        value={line.line_address2?line.line_address2:''}
                        maxLength="35"
                        onChange={(e)=>fncOnChange(e, 'line_address2')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="line_address2"
                        id="line_address2"
                        placeholder=""
                        maxLength="35"
                        value={line.line_address2?line.line_address2:''}
                        onChange={(e)=>fncOnChange(e, 'line_address2')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">Address3</Label>
                    {/* <Input type="text"
                        name="line_address3"
                        id="line_address3"
                        placeholder=""
                        value={line.line_address3?line.line_address3:''}
                        maxLength="35"
                        onChange={(e)=>fncOnChange(e, 'line_address3')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="line_address3"
                        id="line_address3"
                        placeholder=""
                        maxLength="35"
                        value={line.line_address3?line.line_address3:''}
                        onChange={(e)=>fncOnChange(e, 'line_address3')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">Address4</Label>
                    {/* <Input type="text"
                        name="line_address4"
                        id="line_address4"
                        placeholder=""
                        value={line.line_address4?line.line_address4:''}
                        maxLength="35"
                        onChange={(e)=>fncOnChange(e, 'line_address4')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="line_address4"
                        id="line_address4"
                        placeholder=""
                        maxLength="35"
                        value={line.line_address4?line.line_address4:''}
                        onChange={(e)=>fncOnChange(e, 'line_address4')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">Address5</Label>
                    {/* <Input type="text"
                        name="line_address5"
                        id="line_address5"
                        placeholder=""
                        value={line.line_address5?line.line_address5:''}
                        maxLength="35"
                        onChange={(e)=>fncOnChange(e, 'line_address5')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="line_address5"
                        id="line_address5"
                        placeholder=""
                        maxLength="35"
                        value={line.line_address5?line.line_address5:''}
                        onChange={(e)=>fncOnChange(e, 'line_address5')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
        </Row>
    </>
    );
}

export default CarrierWdfc;