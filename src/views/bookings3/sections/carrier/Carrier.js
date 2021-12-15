/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col, FormGroup,Label,Input } from "reactstrap";

const Carrier = (props) => {
    const [line, setLine] = useState({});
    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    useEffect(() => {
        setLine(props.line);
    },[props]);

    // 수정된 내용은 CONSIGNEE 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setLine({...line, [key]:e.target.value});
    }

    // 완료된 내용은 부모로 전달
    const fncOnBlur = (e) => {
        e.preventDefault();
        props.fncOnBlur( line );
    }
  return (
    <>
        <Row>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Bookmark</Label>
                    <Input type="text"
                        name="line_bookmark_name"
                        id="line_bookmark_name"
                        placeholder="Bookmark"
                        maxLength="50"
                        value={line.line_bookmark_name?line.line_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'line_bookmark_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Carrier Code</Label>
                    <Input type="text" name="line_code" id="line_code"
                        placeholder="Carrier Code"
                        maxLength="35"
                        value={line.line_code?line.line_code:''}
                        onChange={(e)=>fncOnChange(e, 'line_code')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Carrier Name1</Label>
                    <Input type="text" name="line_name1" id="line_name1"
                        placeholder="Carrier Name1"
                        maxLength="35"
                        value={line.line_name1?line.line_name1:''}
                        onChange={(e)=>fncOnChange(e, 'line_name1')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Carrier Name2</Label>
                    <Input type="text" name="line_name1" id="line_name2"
                        placeholder="Carrier Name2"
                        maxLength="35"
                        value={line.line_name2?line.line_name2:''}
                        onChange={(e)=>fncOnChange(e, 'line_name2')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Name</Label>
                    <Input type="text" name="line_user_name" id="line_user_name"
                        placeholder="Name"
                        maxLength="35"
                        value={line.line_user_name?line.line_user_name:''}
                        onChange={(e)=>fncOnChange(e, 'line_user_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Tel</Label>
                    <Input type="text" name="line_user_tel" id="line_user_tel"
                        placeholder="Tel"
                        maxLength="25"
                        value={line.line_user_tel?line.line_user_tel:''}
                        onChange={(e)=>fncOnChange(e, 'line_user_tel')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">E-mail</Label>
                    <Input type="text" name="line_user_email" id="line_user_email"
                        placeholder="E-mail"
                        maxLength="25"
                        value={line.line_user_email?line.line_user_email:''}
                        onChange={(e)=>fncOnChange(e, 'line_user_email')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Dept</Label>
                    <Input type="text" name="line_user_dept" id="line_user_dept"
                        placeholder="Dept"
                        maxLength="35"
                        value={line.line_user_dept?line.line_user_dept:''}
                        onChange={(e)=>fncOnChange(e, 'line_user_dept')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Fax</Label>
                    <Input type="text" name="line_user_fax" id="line_user_fax"
                        placeholder="Fax"
                        maxLength="20"
                        value={line.line_user_fax?line.line_user_fax:''}
                        onChange={(e)=>fncOnChange(e, 'line_user_fax')}
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
                        name="line_address1"
                        id="line_address1"
                        placeholder="ADDRESS1"
                        value={line.line_address1?line.line_address1:''}
                        className="text-area-2"
                        maxLength="50"
                        onChange={(e)=>fncOnChange(e, 'line_address1')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">Address2</Label>
                    <Input type="textarea"
                        name="line_address2"
                        id="cons_adline_address2dress2"
                        placeholder="ADDRESS2"
                        value={line.line_address2?line.line_address2:''}
                        className="text-area-2"
                        maxLength="50"
                        onChange={(e)=>fncOnChange(e, 'line_address2')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
        </Row>
    </>
    );
}

export default Carrier;