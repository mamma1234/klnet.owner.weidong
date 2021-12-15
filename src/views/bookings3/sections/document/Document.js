/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col, FormGroup,Label,Input } from "reactstrap";



const Document = (props) => {
    const [document, setDocument] = useState({});
    // useEffect(() => {
    //     console.log("렌더링 될 때마다 수행");
    // },[]);

    useEffect(() => {
        // console.log("<><><><>",props.document)
        setDocument(props.document);
    },[props]);

    // 수정된 내용은 DOCUMENT로 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setDocument({...document, [key]:e.target.value});
    }

    // 완료된 내용은 부모로 전달
    const fncOnBlurDocument = (e) => {
        e.preventDefault();
        props.fncOnBlurDocument( document );
    }
return (
    <>
        <Row className="mb-3">
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Bookmark</Label>
                    <Input type="text" name="document_bookmark_name"
                        id="document_bookmark_name" placeholder="Bookmark"
                        maxLength="50"
                        value={document.document_bookmark_name?document.document_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'document_bookmark_name')}
                        onBlur={(e)=>fncOnBlurDocument(e)}/>
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">User Name</Label>
                    <Input type="text" name="docu_user_name"
                        id="docu_user_name" placeholder="담당자명"
                        maxLength="35"
                        value={document.docu_user_name?document.docu_user_name:''}
                        onChange={(e)=>fncOnChange(e, 'docu_user_name')}
                        onBlur={(e)=>fncOnBlurDocument(e)}/>
                </FormGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Tel</Label>
                    <Input type="tel" name="docu_user_tel"
                        id="docu_user_tel" placeholder="Tel"
                        maxLength="25"
                        value={document.docu_user_tel?document.docu_user_tel:''}
                        onChange={(e)=>fncOnChange(e, 'docu_user_tel')}
                        onBlur={(e)=>fncOnBlurDocument(e)}/>
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Phone</Label>
                    <Input type="tel" name="docu_user_phone"
                        id="docu_user_phone" placeholder="Phone"
                        maxLength="15"
                        value={document.docu_user_phone?document.docu_user_phone:''}
                        onChange={(e)=>fncOnChange(e, 'docu_user_phone')}
                        onBlur={(e)=>fncOnBlurDocument(e)}/>
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Fax</Label>
                    <Input type="tel" name="docu_user_fax"
                        id="docu_user_fax" placeholder="Fax"
                        maxLength="15"
                        value={document.docu_user_fax?document.docu_user_fax:''}
                        onChange={(e)=>fncOnChange(e, 'docu_user_fax')}
                        onBlur={(e)=>fncOnBlurDocument(e)}/>
                </FormGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">E-mail</Label>
                    <Input type="email" name="docu_user_email"
                        id="docu_user_email" placeholder="E-mail"
                        maxLength="25"
                        value={document.docu_user_email?document.docu_user_email:''}
                        onChange={(e)=>fncOnChange(e, 'docu_user_email')}
                        onBlur={(e)=>fncOnBlurDocument(e)}/>
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Tax E-mail</Label>
                    <Input type="email" name="docu_tax_email"
                        id="docu_tax_email" placeholder="Tax E-mail"
                        maxLength="30"
                        value={document.docu_tax_email?document.docu_tax_email:''}
                        onChange={(e)=>fncOnChange(e, 'docu_tax_email')}
                        onBlur={(e)=>fncOnBlurDocument(e)}/>
                </FormGroup>
            </Col>
        </Row>
    </>
);
}

export default Document;