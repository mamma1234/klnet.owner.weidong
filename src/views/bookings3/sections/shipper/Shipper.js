/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col, FormGroup,Label,Input } from "reactstrap";



const Shipper = (props) => {
    const [shipper, setShipper] = useState({});

    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    useEffect(() => {
        setShipper(props.shipper);
    },[props]);

    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setShipper({...shipper, [key]:e.target.value});
    }
    // 완료된 내용은 부모로 전달
    const fncOnBlurShipper = (e) => {
        e.preventDefault();
        props.fncOnBlurShipper( shipper );
    }
  return (
    <>
        <Row>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Bookmark Name</Label>
                    <Input type="text"
                        name=""
                        id="shipper_bookmark_name"
                        placeholder="shipper_bookmark_name"
                        maxLength="50"
                        value={shipper.shipper_bookmark_name?shipper.shipper_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'shipper_bookmark_name')}
                        onBlur={(e)=>fncOnBlurShipper(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Shipper Name1</Label>
                    <Input type="text"
                        name="shp_name1"
                        id="shp_name1"
                        placeholder="Shipper Name1"
                        maxLength="35"
                        value={shipper.shp_name1?shipper.shp_name1:''}
                        onChange={(e)=>fncOnChange(e, 'shp_name1')}
                        onBlur={(e)=>fncOnBlurShipper(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Shipper Code</Label>
                    <Input type="text"
                        name="shp_code"
                        id="shp_code"
                        placeholder="Shipper Code"
                        maxLength="35"
                        value={shipper.shp_code?shipper.shp_code:''}
                        onChange={(e)=>fncOnChange(e, 'shp_code')}
                        onBlur={(e)=>fncOnBlurShipper(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">Shipper Name2</Label>
                    <Input type="text"
                        name="shp_name1"
                        id="shp_name2"
                        placeholder="Shipper Name2"
                        maxLength="35"
                        value={shipper.shp_name2?shipper.shp_name2:''}
                        onChange={(e)=>fncOnChange(e, 'shp_name2')}
                        onBlur={(e)=>fncOnBlurShipper(e)}
                        />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Name</Label>
                    <Input type="text"
                        name="shp_user_name"
                        id="shp_user_name"
                        placeholder="Name"
                        maxLength="17"
                        value={shipper.shp_user_name?shipper.shp_user_name:''}
                        onChange={(e)=>fncOnChange(e, 'shp_user_name')}
                        onBlur={(e)=>fncOnBlurShipper(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Tel</Label>
                    <Input type="text"
                        name="shp_user_tel"
                        id="shp_user_tel"
                        placeholder="Tel"
                        maxLength="17"
                        value={shipper.shp_user_tel?shipper.shp_user_tel:''}
                        onChange={(e)=>fncOnChange(e, 'shp_user_tel')}
                        onBlur={(e)=>fncOnBlurShipper(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">E-mail</Label>
                    <Input type="text"
                        name="shp_user_email"
                        id="shp_user_email"
                        placeholder="E-mail"
                        maxLength="25"
                        value={shipper.shp_user_email?shipper.shp_user_email:''}
                        onChange={(e)=>fncOnChange(e, 'shp_user_email')}
                        onBlur={(e)=>fncOnBlurShipper(e)}
                        />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Dept</Label>
                    <Input type="text"
                        name="shp_user_dept"
                        id="shp_user_dept"
                        placeholder="Dept"
                        maxLength="35"
                        value={shipper.shp_user_dept?shipper.shp_user_dept:''}
                        onChange={(e)=>fncOnChange(e, 'shp_user_dept')}
                        onBlur={(e)=>fncOnBlurShipper(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Fax</Label>
                    <Input type="text"
                        name="shp_user_fax"
                        id="shp_user_fax"
                        placeholder="Fax"
                        maxLength="25"
                        value={shipper.shp_user_fax?shipper.shp_user_fax:''}
                        onChange={(e)=>fncOnChange(e, 'shp_user_fax')}
                        onBlur={(e)=>fncOnBlurShipper(e)}
                        />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">Address1</Label>
                    <Input type="textarea"
                        name="shp_address1"
                        id="shp_address1"
                        placeholder="ADDRESS1"
                        value={shipper.shp_address1?shipper.shp_address1:''}
                        className="text-area-2"
                        maxLength="50"
                        onChange={(e)=>fncOnChange(e, 'shp_address1')}
                        onBlur={(e)=>fncOnBlurShipper(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">Address2</Label>
                    <Input type="textarea"
                        name="shp_address2"
                        id="shp_address2"
                        placeholder="ADDRESS2"
                        value={shipper.shp_address2?shipper.shp_address2:''}
                        className="text-area-2"
                        maxLength="50"
                        onChange={(e)=>fncOnChange(e, 'shp_address2')}
                        onBlur={(e)=>fncOnBlurShipper(e)}
                        />
                </FormGroup>
            </Col>
        </Row>
    </>
    );
}

export default Shipper;