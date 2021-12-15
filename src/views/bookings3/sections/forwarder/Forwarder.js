/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, FormGroup,Label,Input } from "reactstrap";

const Forwarder = (props) => {
    const [forwarder, setForwarder] = useState({});
    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    useEffect(() => {
        setForwarder(props.forwarder);
    },[props]);

    // 수정된 내용은 FORWARDER 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setForwarder({...forwarder, [key]:e.target.value});
    }

    // 완료된 내용은 부모로 전달
    const fncOnBlur = (e) => {
        e.preventDefault();
        props.fncOnBlur( forwarder );
    }
  return (
    <>
        <Row>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Bookmark</Label>
                    <Input type="text"
                        name="forwarder_bookmark_name"
                        id="forwarder_bookmark_name"
                        placeholder="Bookmark"
                        maxLength="50"
                        value={forwarder.forwarder_bookmark_name?forwarder.forwarder_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'forwarder_bookmark_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Forwarder Code</Label>
                    <Input type="text"
                        name="fwd_code"
                        id="fwd_code"
                        placeholder="Forwarder Code"
                        maxLength="35"
                        value={forwarder.fwd_code?forwarder.fwd_code:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_code')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Forwarder Name1</Label>
                    <Input type="text"
                        name="fwd_name1"
                        id="fwd_name1"
                        placeholder="Forwarder Name1"
                        maxLength="35"
                        value={forwarder.fwd_name1?forwarder.fwd_name1:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_name1')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Forwarder Name2</Label>
                    <Input type="text"
                        name="fwd_name1"
                        id="fwd_name2"
                        placeholder="Forwarder Name2"
                        maxLength="35"
                        value={forwarder.fwd_name2?forwarder.fwd_name2:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_name2')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Name</Label>
                    <Input type="text"
                        name="fwd_user_name"
                        id="fwd_user_name"
                        placeholder="Name"
                        maxLength="17"
                        value={forwarder.fwd_user_name?forwarder.fwd_user_name:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Tel</Label>
                    <Input type="text"
                        name="fwd_user_tel"
                        id="fwd_user_tel"
                        placeholder="Tel"
                        maxLength="25"
                        value={forwarder.fwd_user_tel?forwarder.fwd_user_tel:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_tel')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">E-mail</Label>
                    <Input type="text"
                        name="fwd_user_email"
                        id="fwd_user_email"
                        placeholder="E-mail"
                        maxLength="25"
                        value={forwarder.fwd_user_email?forwarder.fwd_user_email:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_email')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Dept</Label>
                    <Input type="text"
                        name="fwd_user_dept"
                        id="fwd_user_dept"
                        placeholder="Dept"
                        maxLength="35"
                        value={forwarder.fwd_user_dept?forwarder.fwd_user_dept:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_dept')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Fax</Label>
                    <Input type="text"
                        name="fwd_user_fax"
                        id="fwd_user_fax"
                        placeholder="Fax"
                        maxLength="25"
                        value={forwarder.fwd_user_fax?forwarder.fwd_user_fax:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_fax')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">Address1</Label>
                    <Input type="textarea"
                        name="fwd_address1"
                        id="fwd_address1"
                        placeholder="ADDRESS1"
                        value={forwarder.fwd_address1?forwarder.fwd_address1:''}
                        className="text-area-2"
                        maxLength="50"
                        onChange={(e)=>fncOnChange(e, 'fwd_address1')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">Address2</Label>
                    <Input type="textarea"
                        name="fwd_address2"
                        id="fwd_address2"
                        placeholder="ADDRESS2"
                        value={forwarder.fwd_address2?forwarder.fwd_address2:''}
                        className="text-area-2" maxLength="50"
                        onChange={(e)=>fncOnChange(e, 'fwd_address2')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
        </Row>
    </>
    );
}

export default Forwarder;