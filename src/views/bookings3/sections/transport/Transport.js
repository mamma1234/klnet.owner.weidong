/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, FormGroup,Label,Input } from "reactstrap";



const TransPort = (props) => {
    const [transport, setTransport] = useState({});

    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    useEffect(()=> {
        setTransport(props.transport);
        if( !props.transport.trans_self_yn ) {
            setTransport({...props.transport, ['trans_self_yn']:'Y'});
        }
    }, [props]);


    // 수정된 내용은 CONSIGNEE 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setTransport({...transport, [key]:e.target.value});
    }

    // 수정된 내용은 CONSIGNEE 저장
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
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">Bookmark</Label>
                    <Input type="text" name="transport_bookmark_name" id="transport_bookmark_name"
                        placeholder="Bookmark"
                        maxLength="50"
                        value={transport.transport_bookmark_name?transport.transport_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'transport_bookmark_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        >
                    </Input>
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">자가운송</Label>
                    <Input type="select" name="trans_self_yn" id="trans_self_yn"
                        placeholder="Y"
                        value={transport.trans_self_yn?transport.trans_self_yn:'Y'}
                        onChange={(e) => {
                            fncOnChangeSelect(e, 'trans_self_yn');
                        }}>
                        <option>Y</option>
                        <option>N</option>
                    </Input>
                </FormGroup>
            </Col>

            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">Translate Code</Label>
                    <Input type="text" name="trans_code" id="trans_code"
                        placeholder="Translate Code"
                        maxLength="10"
                        value={transport.trans_code?transport.trans_code:''}
                        onChange={(e)=>fncOnChange(e, 'trans_code')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Translate Name1</Label>
                    <Input type="text" name="trans_name1"
                        id="trans_name1"
                        placeholder="Translate Name1"
                        maxLength="35"
                        value={transport.trans_name1?transport.trans_name1:''}
                        onChange={(e)=>fncOnChange(e, 'trans_name1')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Translate Name2</Label>
                    <Input type="text" name="trans_name1" id="trans_name2"
                        placeholder="Translate Name2"
                        maxLength="35"
                        value={transport.trans_name2?transport.trans_name2:''}
                        onChange={(e)=>fncOnChange(e, 'trans_name2')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">Name</Label>
                    <Input type="text" name="trans_user_name" id="trans_user_name"
                        placeholder="Name"
                        maxLength="17"
                        value={transport.trans_user_name?transport.trans_user_name:''}
                        onChange={(e)=>fncOnChange(e, 'trans_user_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Tel</Label>
                    <Input type="text" name="trans_user_tel" id="trans_user_tel"
                        placeholder="Tel"
                        maxLength="25"
                        value={transport.trans_user_tel?transport.trans_user_tel:''}
                        onChange={(e)=>fncOnChange(e, 'trans_user_tel')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">E-mail</Label>
                    <Input type="text" name="trans_user_email" id="trans_user_email"
                        placeholder="E-mail"
                        maxLength="25"
                        value={transport.trans_user_email?transport.trans_user_email:''}
                        onChange={(e)=>fncOnChange(e, 'trans_user_email')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Fax</Label>
                    <Input type="text" name="trans_user_fax" id="trans_user_fax"
                        placeholder="Fax"
                        maxLength="25"
                        value={transport.trans_user_fax?transport.trans_user_fax:''}
                        onChange={(e)=>fncOnChange(e, 'trans_user_fax')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">공장 지역명</Label>
                    <Input type="text" name="trans_fac_area_name" id="trans_fac_area_name"
                        placeholder="공장 지역명"
                        maxLength="20"
                        value={transport.trans_fac_area_name?transport.trans_fac_area_name:''}
                        onChange={(e)=>fncOnChange(e, 'trans_fac_area_name')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="8" lg="8" md="12">
                <FormGroup>
                    <Label className="mb-0">공장명</Label>
                    <Input type="text" name="trans_fac_name" id="trans_fac_name"
                        placeholder="공장명"
                        maxLength="50"
                        value={transport.trans_fac_name?transport.trans_fac_name:''}
                        onChange={(e)=>fncOnChange(e, 'trans_fac_name')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">Remark</Label>
                    <Input type="text" name="trans_remark" id="trans_remark"
                        placeholder="Remark"
                        maxLength="100"
                        value={transport.trans_remark?transport.trans_remark:''}
                        onChange={(e)=>fncOnChange(e, 'trans_remark')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
        </Row>
    </>
    );
}

export default TransPort;