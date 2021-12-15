/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, FormGroup,Label } from "reactstrap";
//import * as validation from 'components/common/validation.js';
import InputValid from "components/CustomInput/InputValid.js";

const ConsigneeWdfc = (props) => {
    
    const [consignee, setConsignee] = useState({});
    // CARD, BOOK
    const [openType, setOpenType] = useState("");
    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    useEffect(()=> {
        setConsignee(props.consignee);
    }, [props.consignee]);

    useEffect(()=> {
        setOpenType(props.openType);
    }, [props.openType]);

    useEffect(()=>{
        props.fncOpenType(openType);
    },[openType]);

    // 수정된 내용은 CONSIGNEE 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setConsignee({...consignee, [key]:e.target.value.toUpperCase()});
    }

    // 완료된 내용은 부모로 전달
    const fncOnBlur = (e) => {
        e.preventDefault();
        props.fncOnBlur( consignee );
    }

  return (
    <>
        <Row>
        {(openType === "BOOK")?
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Bookmark</Label>
                    {/* <Input type="text"
                        name="consignee_bookmark_name"
                        id="consignee_bookmark_name"
                        placeholder=""
                        maxLength="50"
                        value={consignee.consignee_bookmark_name?consignee.consignee_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'consignee_bookmark_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        invalid={consignee.consignee_bookmark_name?false:('BOOK'===openType?true:false)}
                        />
                    <FormFeedback>{validation.REQ_MSG}</FormFeedback> */}
                    <InputValid 
                        type="text"
                        name="consignee_bookmark_name"
                        id="consignee_bookmark_name"
                        placeholder=""
                        maxLength="50"
                        value={consignee.consignee_bookmark_name?consignee.consignee_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'consignee_bookmark_name')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={'BOOK'===openType?true:false} 
                    />
                </FormGroup>
            </Col>
        :<></>}
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Consignee Code</Label>
                    {/* <Input type="text"
                        name="cons_code"
                        id="cons_code"
                        placeholder=""
                        maxLength="35"
                        value={consignee.cons_code?consignee.cons_code:''}
                        onChange={(e)=>fncOnChange(e, 'cons_code')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="cons_code"
                        id="cons_code"
                        placeholder=""
                        maxLength="35"
                        value={consignee.cons_code?consignee.cons_code:''}
                        onChange={(e)=>fncOnChange(e, 'cons_code')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Consignee Name1</Label>
                    {/* <Input type="text"
                        name="cons_name1"
                        id="cons_name1"
                        placeholder=""
                        maxLength="35"
                        value={consignee.cons_name1?consignee.cons_name1:''}
                        onChange={(e)=>fncOnChange(e, 'cons_name1')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="cons_name1"
                        id="cons_name1"
                        placeholder=""
                        maxLength="35"
                        value={consignee.cons_name1?consignee.cons_name1:''}
                        onChange={(e)=>fncOnChange(e, 'cons_name1')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Consignee Name2</Label>
                    {/* <Input type="text"
                        name="cons_name2"
                        id="cons_name2"
                        placeholder=""
                        maxLength="35"
                        value={consignee.cons_name2?consignee.cons_name2:''}
                        onChange={(e)=>fncOnChange(e, 'cons_name2')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="cons_name2"
                        id="cons_name2"
                        placeholder=""
                        maxLength="35"
                        value={consignee.cons_name2?consignee.cons_name2:''}
                        onChange={(e)=>fncOnChange(e, 'cons_name2')}
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
                    {/* <Input type="text"
                        name="cons_user_name"
                        id="cons_user_name"
                        placeholder=""
                        maxLength="17"
                        value={consignee.cons_user_name?consignee.cons_user_name:''}
                        onChange={(e)=>fncOnChange(e, 'cons_user_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="cons_user_name"
                        id="cons_user_name"
                        placeholder=""
                        maxLength="35"
                        value={consignee.cons_user_name?consignee.cons_user_name:''}
                        onChange={(e)=>fncOnChange(e, 'cons_user_name')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Tel</Label>
                    {/* <Input type="text"
                        name="cons_user_tel"
                        id="cons_user_tel"
                        placeholder=""
                        maxLength="25"
                        value={consignee.cons_user_tel?consignee.cons_user_tel:''}
                        onChange={(e)=>fncOnChange(e, 'cons_user_tel')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="cons_user_tel"
                        id="cons_user_tel"
                        placeholder=""
                        maxLength="25"
                        value={consignee.cons_user_tel?consignee.cons_user_tel:''}
                        onChange={(e)=>fncOnChange(e, 'cons_user_tel')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="tel"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Fax</Label>
                    {/* <Input type="text"
                        name="cons_user_fax"
                        id="cons_user_fax"
                        placeholder=""
                        maxLength="25"
                        value={consignee.cons_user_fax?consignee.cons_user_fax:''}
                        onChange={(e)=>fncOnChange(e, 'cons_user_fax')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="cons_user_fax"
                        id="cons_user_fax"
                        placeholder=""
                        maxLength="25"
                        value={consignee.cons_user_fax?consignee.cons_user_fax:''}
                        onChange={(e)=>fncOnChange(e, 'cons_user_fax')}
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
                        name="cons_user_dept"
                        id="cons_user_dept"
                        placeholder=""
                        maxLength="35"
                        value={consignee.cons_user_dept?consignee.cons_user_dept:''}
                        onChange={(e)=>fncOnChange(e, 'cons_user_dept')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="cons_user_dept"
                        id="cons_user_dept"
                        placeholder=""
                        maxLength="35"
                        value={consignee.cons_user_dept?consignee.cons_user_dept:''}
                        onChange={(e)=>fncOnChange(e, 'cons_user_dept')}
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
                        name="cons_user_email"
                        id="cons_user_email"
                        placeholder=""
                        maxLength="25"
                        value={consignee.cons_user_email?consignee.cons_user_email:''}
                        invalid={consignee.cons_user_email?(validation.validationEmail(consignee.cons_user_email)?false:true):false}
                        onChange={(e)=>fncOnChange(e, 'cons_user_email')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                    <FormFeedback>{validation.EML_MSG}</FormFeedback> */}
                    <InputValid 
                        type="text"
                        name="cons_user_email"
                        id="cons_user_email"
                        placeholder=""
                        maxLength="50"
                        value={consignee.cons_user_email?consignee.cons_user_email:''}
                        onChange={(e)=>fncOnChange(e, 'cons_user_email')}
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
                        name="cons_address1"
                        id="cons_address1"
                        placeholder=""
                        value={consignee.cons_address1?consignee.cons_address1:''}
                        maxLength="35"
                        onChange={(e)=>fncOnChange(e, 'cons_address1')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="cons_address1"
                        id="cons_address1"
                        placeholder=""
                        maxLength="35"
                        value={consignee.cons_address1?consignee.cons_address1:''}
                        onChange={(e)=>fncOnChange(e, 'cons_address1')}
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
                        name="cons_address2"
                        id="cons_address2"
                        placeholder=""
                        value={consignee.cons_address2?consignee.cons_address2:''}
                        maxLength="35"
                        onChange={(e)=>fncOnChange(e, 'cons_address2')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="cons_address2"
                        id="cons_address2"
                        placeholder=""
                        maxLength="35"
                        value={consignee.cons_address2?consignee.cons_address2:''}
                        onChange={(e)=>fncOnChange(e, 'cons_address2')}
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
                        name="cons_address3"
                        id="cons_address3"
                        placeholder=""
                        value={consignee.cons_address3?consignee.cons_address3:''}
                        maxLength="35"
                        onChange={(e)=>fncOnChange(e, 'cons_address3')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="cons_address3"
                        id="cons_address3"
                        placeholder=""
                        maxLength="35"
                        value={consignee.cons_address3?consignee.cons_address3:''}
                        onChange={(e)=>fncOnChange(e, 'cons_address3')}
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
                        name="cons_address4"
                        id="cons_address4"
                        placeholder=""
                        value={consignee.cons_address4?consignee.cons_address4:''}
                        maxLength="35"
                        onChange={(e)=>fncOnChange(e, 'cons_address4')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="cons_address4"
                        id="cons_address4"
                        placeholder=""
                        maxLength="35"
                        value={consignee.cons_address4?consignee.cons_address4:''}
                        onChange={(e)=>fncOnChange(e, 'cons_address4')}
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
                        name="cons_address5"
                        id="cons_address5"
                        placeholder=""
                        value={consignee.cons_address5?consignee.cons_address5:''}
                        maxLength="35"
                        onChange={(e)=>fncOnChange(e, 'cons_address5')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="cons_address5"
                        id="cons_address5"
                        placeholder=""
                        maxLength="35"
                        value={consignee.cons_address5?consignee.cons_address5:''}
                        onChange={(e)=>fncOnChange(e, 'cons_address5')}
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

export default ConsigneeWdfc;