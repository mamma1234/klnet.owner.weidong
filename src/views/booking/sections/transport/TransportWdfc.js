/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, FormGroup,Label,Input } from "reactstrap";
//import * as validation from 'components/common/validation.js';
import InputValid from "components/CustomInput/InputValid.js";


const TransportWdfc = (props) => {
    const [transport, setTransport] = useState({});
    const [openType, setOpenType] = useState("");

    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    useEffect(()=>{
        props.fncOpenType(openType);
    },[openType]);

    useEffect(()=> {
        setTransport(props.transport);
        if( !props.transport.trans_self_yn ) {
            setTransport({...props.transport, ['trans_self_yn']:'Y'});
        }
    }, [props.transport]);

    useEffect(()=> {
        setOpenType(props.openType);
    }, [props.openType]);

    // 수정된 내용은 Trans 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setTransport({...transport, [key]:e.target.value.toUpperCase()});
    }

    // 수정된 내용은 Trans 저장
    const fncOnChangeSelect = ( e, key ) => {
        // console.log(e.target.value)
        // e.preventDefault();
        setTransport({...transport, [key]:e.target.value});
        props.fncOnBlur( {...transport, [key]:e.target.value} );
    }

    // 완료된 내용은 부모로 전달
    const fncOnBlur = (e) => {
        e.preventDefault();
        props.fncOnBlur( transport );
    }
  return (
    <>
        <Row>
            {(openType === 'BOOK')?
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">Bookmark</Label>
                    {/* <Input type="text" name="transport_bookmark_name" id="transport_bookmark_name"
                        placeholder=""
                        maxLength="50"
                        value={transport.transport_bookmark_name?transport.transport_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'transport_bookmark_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        invalid={transport.transport_bookmark_name?false:('BOOK'===openType?true:false)}
                        >
                    </Input>
                    <FormFeedback>{validation.REQ_MSG}</FormFeedback> */}
                    <InputValid 
                        type="text"
                        name="transport_bookmark_name"
                        id="transport_bookmark_name"
                        placeholder=""
                        maxLength="50"
                        value={transport.transport_bookmark_name?transport.transport_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'transport_bookmark_name')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={'BOOK'===openType?true:false} 
                    />
                </FormGroup>
            </Col>:<></>}
        </Row>
        <Row>
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">Haulage</Label>
                    <Input type="select" name="trans_self_yn" id="trans_self_yn"
                        placeholder=""
                        value={transport.trans_self_yn?transport.trans_self_yn:''}
                        onChange={(e) => {
                            fncOnChangeSelect(e, 'trans_self_yn');
                        }}>
                        <option key={0} value={'0'}>
                            선택
                        </option>
                        <option value='Y'>자가운송</option>
                        <option value='N'>라인운송</option>
                    </Input>
                </FormGroup>
            </Col>

            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">Transport Code</Label>
                    {/* <Input type="text" name="trans_code" id="trans_code"
                        placeholder=""
                        maxLength="10"
                        value={transport.trans_code?transport.trans_code:''}
                        onChange={(e)=>fncOnChange(e, 'trans_code')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="trans_code"
                        id="trans_code"
                        placeholder=""
                        maxLength="10"
                        value={transport.trans_code?transport.trans_code:''}
                        onChange={(e)=>fncOnChange(e, 'trans_code')}
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
                    <Label className="mb-0">Transport Name1</Label>
                    {/* <Input type="text" name="trans_name1"
                        id="trans_name1"
                        placeholder=""
                        maxLength="35"
                        value={transport.trans_name1?transport.trans_name1:''}
                        onChange={(e)=>fncOnChange(e, 'trans_name1')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="trans_name1"
                        id="trans_name1"
                        placeholder=""
                        maxLength="35"
                        value={transport.trans_name1?transport.trans_name1:''}
                        onChange={(e)=>fncOnChange(e, 'trans_name1')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={('Y'===transport.trans_self_yn)?true:false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Transport Name2</Label>
                    {/* <Input type="text" name="trans_name1" id="trans_name2"
                        placeholder=""
                        maxLength="35"
                        value={transport.trans_name2?transport.trans_name2:''}
                        onChange={(e)=>fncOnChange(e, 'trans_name2')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="trans_name2"
                        id="trans_name2"
                        placeholder=""
                        maxLength="35"
                        value={transport.trans_name2?transport.trans_name2:''}
                        onChange={(e)=>fncOnChange(e, 'trans_name2')}
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
                    <Label className="mb-0">Name</Label>
                    {/* <Input type="text" name="trans_user_name" id="trans_user_name"
                        placeholder=""
                        maxLength="17"
                        value={transport.trans_user_name?transport.trans_user_name:''}
                        onChange={(e)=>fncOnChange(e, 'trans_user_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="trans_user_name"
                        id="trans_user_name"
                        placeholder=""
                        maxLength="17"
                        value={transport.trans_user_name?transport.trans_user_name:''}
                        onChange={(e)=>fncOnChange(e, 'trans_user_name')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={('Y'===transport.trans_self_yn)?true:(transport.trans_user_email||transport.trans_user_fax||transport.trans_user_tel)?true:false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Tel</Label>
                    {/* <Input type="text" name="trans_user_tel" id="trans_user_tel"
                        placeholder=""
                        maxLength="25"
                        value={transport.trans_user_tel?transport.trans_user_tel:''}
                        onChange={(e)=>fncOnChange(e, 'trans_user_tel')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="trans_user_tel"
                        id="trans_user_tel"
                        placeholder=""
                        maxLength="25"
                        value={transport.trans_user_tel?transport.trans_user_tel:''}
                        onChange={(e)=>fncOnChange(e, 'trans_user_tel')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="tel"
                        required={('Y'===transport.trans_self_yn)?true:false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">E-mail</Label>
                    {/* <Input type="text" name="trans_user_email" id="trans_user_email"
                        placeholder=""
                        maxLength="25"
                        value={transport.trans_user_email?transport.trans_user_email:''}
                        onChange={(e)=>fncOnChange(e, 'trans_user_email')}
                        onBlur={(e)=>fncOnBlur(e)}
                        invalid={validation.validationEmail(transport.trans_user_email)?false:('CARD'===openType?true:(transport.trans_user_email?(validation.validationEmail(transport.trans_user_email)?false:true):false))}
                        />
                    <FormFeedback>{validation.EML_MSG}</FormFeedback> */}
                    <InputValid 
                        type="text"
                        name="trans_user_email"
                        id="trans_user_email"
                        placeholder=""
                        maxLength="50"
                        value={transport.trans_user_email?transport.trans_user_email:''}
                        onChange={(e)=>fncOnChange(e, 'trans_user_email')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="email"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Fax</Label>
                    {/* <Input type="text" name="trans_user_fax" id="trans_user_fax"
                        placeholder=""
                        maxLength="25"
                        value={transport.trans_user_fax?transport.trans_user_fax:''}
                        onChange={(e)=>fncOnChange(e, 'trans_user_fax')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="trans_user_fax"
                        id="trans_user_fax"
                        placeholder=""
                        maxLength="25"
                        value={transport.trans_user_fax?transport.trans_user_fax:''}
                        onChange={(e)=>fncOnChange(e, 'trans_user_fax')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="tel"
                        required={false} 
                    />
                </FormGroup>
            </Col>
        </Row>
    </>
    );
}

export default TransportWdfc;