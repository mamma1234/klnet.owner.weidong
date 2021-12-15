/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, FormGroup,Label,Input } from "reactstrap";

const Consignee = (props) => {
    
    const [consignee, setConsignee] = useState({});
    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    useEffect(()=> {
        setConsignee(props.consignee);
    }, [props]);

    // 수정된 내용은 CONSIGNEE 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setConsignee({...consignee, [key]:e.target.value});
    }

    // 완료된 내용은 부모로 전달
    const fncOnBlur = (e) => {
        e.preventDefault();
        props.fncOnBlur( consignee );
    }
  return (
    <>
        <Row>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Bookmark</Label>
                    <Input type="text"
                        name="consignee_bookmark_name"
                        id="consignee_bookmark_name"
                        placeholder="Bookmark"
                        maxLength="50"
                        value={consignee.consignee_bookmark_name?consignee.consignee_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'consignee_bookmark_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Consignee Code</Label>
                    <Input type="text"
                        name="cons_code"
                        id="cons_code"
                        placeholder="Consignee Code"
                        maxLength="35"
                        value={consignee.cons_code?consignee.cons_code:''}
                        onChange={(e)=>fncOnChange(e, 'cons_code')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Consignee Name1</Label>
                    <Input type="text"
                        name="cons_name1"
                        id="cons_name1"
                        placeholder="Consignee Name1"
                        maxLength="35"
                        value={consignee.cons_name1?consignee.cons_name1:''}
                        onChange={(e)=>fncOnChange(e, 'cons_name1')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Consignee Name2</Label>
                    <Input type="text"
                        name="cons_name2"
                        id="cons_name2"
                        placeholder="Consignee Name2"
                        maxLength="35"
                        value={consignee.cons_name2?consignee.cons_name2:''}
                        onChange={(e)=>fncOnChange(e, 'cons_name2')}
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
                        name="cons_user_name"
                        id="cons_user_name"
                        placeholder="Name"
                        maxLength="17"
                        value={consignee.cons_user_name?consignee.cons_user_name:''}
                        onChange={(e)=>fncOnChange(e, 'cons_user_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Tel</Label>
                    <Input type="text"
                        name="cons_user_tel"
                        id="cons_user_tel"
                        placeholder="Tel"
                        maxLength="25"
                        value={consignee.cons_user_tel?consignee.cons_user_tel:''}
                        onChange={(e)=>fncOnChange(e, 'cons_user_tel')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">E-mail</Label>
                    <Input type="text"
                        name="cons_user_email"
                        id="cons_user_email"
                        placeholder="E-mail"
                        maxLength="25"
                        value={consignee.cons_user_email?consignee.cons_user_email:''}
                        onChange={(e)=>fncOnChange(e, 'cons_user_email')}
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
                        name="cons_user_dept"
                        id="cons_user_dept"
                        placeholder="Dept"
                        maxLength="35"
                        value={consignee.cons_user_dept?consignee.cons_user_dept:''}
                        onChange={(e)=>fncOnChange(e, 'cons_user_dept')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Fax</Label>
                    <Input type="text"
                        name="cons_user_fax"
                        id="cons_user_fax"
                        placeholder="Fax"
                        maxLength="25"
                        value={consignee.cons_user_fax?consignee.cons_user_fax:''}
                        onChange={(e)=>fncOnChange(e, 'cons_user_fax')}
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
                        name="cons_address1"
                        id="cons_address1"
                        placeholder="ADDRESS1"
                        value={consignee.cons_address1?consignee.cons_address1:''}
                        className="text-area-2"
                        maxLength="50"
                        onChange={(e)=>fncOnChange(e, 'cons_address1')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">Address2</Label>
                    <Input type="textarea"
                        name="cons_address2"
                        id="cons_address2"
                        placeholder="ADDRESS2"
                        value={consignee.cons_address2?consignee.cons_address2:''}
                        className="text-area-2"
                        maxLength="50"
                        onChange={(e)=>fncOnChange(e, 'cons_address2')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
        </Row>
    </>
    );
}

export default Consignee;