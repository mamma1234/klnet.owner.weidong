/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    ButtonGroup, Button,FormGroup,Label,Input, Card, CardHeader, Table, CardTitle} from "reactstrap";
import axios from "axios";


const Special = (props) => {
    const [index, setIndex] = useState(0);
    const [special, setSpecial] = useState({});
    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    useEffect(() => {
        setSpecial(props.special);
        setIndex(props.index);
    },[props]);

    // Special 정보 입력
    const fncOnBlurSpecial=(special)=>{
        setSpecial(special);
        props.fncOnBlurSpecial(index, special);
    }
    // Special 삭제
    const onDelSpecial=()=>{
        props.onDelSpecial(special);
    }

  return (
    <Card className="no-transition">
        <Row>
            <Col className="col-12 text-right" xl="11" lg="11">
                <Button
                    className="p-0"
                    color="default"
                    size="sm"
                    outline
                    onClick={onDelSpecial}
                >
                <i className="fa fa-minus" />
                </Button>
            </Col>
        </Row>
        <SpecialForm
            special={special}
            fncOnBlur={fncOnBlurSpecial}
            />
    </Card>
    );
}


const SpecialForm = (props) => {
    
    const [special, setSpecial] = useState({});
    
    
    useEffect(() => {
        
    },[]);

    useEffect(() => {
      setSpecial(props.special);
    },[props]);
    

    // 수정된 내용은 Cargo 저장
    const fncOnChangeSelect = ( e, key ) => {
        setSpecial({...special, [key]:e.target.value});
        // props.fncOnBlur( {...container, [key]:e.target.value} );
    }
    // 완료된 내용은 부모로 전달
    const fncOnBlur = (e) => {
        e.preventDefault();
        props.fncOnBlur( special );
    }
    // 수정된 내용은 container 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setSpecial({...special, [key]:e.target.value});
    }
    return (
      <>
        <Row>
            <Col xl="3" lg="3" md="6">
                <FormGroup>
                    <Label className="mb-0">Bookmark Name</Label>
                    <Input type="text" name="container_special_bookmark_name" id="container_special_bookmark_name"
                        value={special.container_special_bookmark_name?special.container_special_bookmark_name:''}
                        maxLength="50"
                        onChange={(e)=>fncOnChange(e, 'container_special_bookmark_name')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    <Label className="mb-0">UNDG</Label>
                    <Input type="text" placeholder="UNDG"
                        maxLength="4"
                        value={special.special_undg?special.special_undg:''}
                        onChange={(e)=>fncOnChange(e, 'special_undg')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    <Label className="mb-0">IMDG</Label>
                    <Input type="text" placeholder="IMDG"
                        maxLength="7"
                        value={special.special_imdg?special.special_imdg:''}
                        onChange={(e)=>fncOnChange(e, 'special_imdg')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    <Label className="mb-0">IGNITION</Label>
                    <Input type="text" placeholder="IGNINITION"
                        maxLength="15"
                        value={special.special_ignition?special.special_ignition:''}
                        onChange={(e)=>fncOnChange(e, 'special_ignition')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    {/* 발화점종류 Ignition point Type(C:Celsius, F:Fahrenheit) */}
                    <Label className="mb-0">IGNITION TYPE</Label>
                    <Input type="select" placeholder="IGNITION TYPE"
                        maxLength="35"
                        value={special.special_ignition_type?special.special_ignition_type:''}
                        onChange={(e)=>fncOnChange(e, 'special_ignition_type')}
                        onBlur={(e)=>fncOnBlur(e)}>
                        <option key={0} value=''>선택</option>
                        <option key={1} value='C'>Celsius</option>
                        <option key={2} value='F'>Fahrenheit</option>
                    </Input>
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    <Label className="mb-0">GROSS WEIGHT</Label>
                    <Input type="text" placeholder="GROSS WEIGHT"
                        value={special.special_gross_weight?special.special_gross_weight:''}
                        maxLength="19"
                        onChange={(e)=>fncOnChange(e, 'special_gross_weight')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    <Label className="mb-0">NET WEIGHT</Label>
                    <Input type="text" placeholder="NET WEIGHT"
                        maxLength="19"
                        value={special.special_net_weight?special.special_net_weight:''}
                        onChange={(e)=>fncOnChange(e, 'special_net_weight')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    <Label className="mb-0">OUT PACK TYPE</Label>
                    <Input type="text" placeholder="OUT PACK TYPE"
                        maxLength="10"
                        value={special.special_out_pack_type?special.special_out_pack_type:''}
                        onChange={(e)=>fncOnChange(e, 'special_out_pack_type')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    <Label className="mb-0">OUT PACK COUNT</Label>
                    <Input type="text" placeholder="OUT PACK COUNT"
                        maxLength="10"
                        value={special.special_out_pack_cnt?special.special_out_pack_cnt:''}
                        onChange={(e)=>fncOnChange(e, 'special_out_pack_cnt')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    {/* 외부포장위험물등급 Dagerous Goods grdade(III-very strong,II-strong,I-weak) */}
                    <Label className="mb-0">OUT PACK GRADE</Label>
                    <Input type="select" placeholder="OUT PACK GRADE"
                        maxLength="3"
                        value={special.special_out_pack_grade?special.special_out_pack_grade:''}
                        onChange={(e)=>fncOnChange(e, 'special_out_pack_grade')}
                        onBlur={(e)=>fncOnBlur(e)}>
                            <option value=''>선택</option>
                            <option value='3'>III-very strong</option>
                            <option value='2'>II-strong</option>
                            <option value='1'>I-weak</option>
                    </Input>
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    {/* 위험물포장그룹코드 1:Great danger, 2:Medium danger 3:Minor danger */}
                    <Label className="mb-0">PACK GROUP</Label>
                    <Input type="select" placeholder="PACK GROUP"
                        value={special.special_pack_group?special.special_pack_group:''}
                        onChange={(e)=>fncOnChange(e, 'special_pack_group')}
                        onBlur={(e)=>fncOnBlur(e)}>
                        <option value=''>선택</option>
                        <option value='1'>Great danger</option>
                        <option value='2'>Medium danger</option>
                        <option value='3'>Minor danger</option>
                    </Input>
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">TECH NAME</Label>
                    <Input type="text" placeholder="TECH NAME"
                        maxLength="70"
                        value={special.special_tech_name?special.special_tech_name:''}
                        onChange={(e)=>fncOnChange(e, 'special_tech_name')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    {/* 해양오염물질여부 NP:비해양오염물지, P:해양오염물질, PP:심각한해양오염물질 */}
                    <Label className="mb-0">POLLUTANT</Label>
                    <Input type="select" placeholder="POLLUTANT"
                        value={special.special_pollutant?special.special_pollutant:''}
                        onChange={(e)=>fncOnChange(e, 'special_pollutant')}
                        onBlur={(e)=>fncOnBlur(e)}>
                        <option value=''>선택</option>
                        <option value='NP'>비해양오염물지</option>
                        <option value='P'>해양오염물질</option>
                        <option value='PP'>심각한해양오염물질</option>
                    </Input>
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">SHIPPING NAME</Label>
                    <Input type="text" placeholder="SHIPPING NAME"
                        maxLength="70"
                        value={special.special_shipping_name?special.special_shipping_name:''}
                        onChange={(e)=>fncOnChange(e, 'special_shipping_name')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">USER NAME</Label>
                    <Input type="text" placeholder="USER NAME"
                        maxLength="17"
                        value={special.special_user_name?special.special_user_name:''}
                        onChange={(e)=>fncOnChange(e, 'special_user_name')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">DEPT</Label>
                    <Input type="text" placeholder="DEPT"
                        value={special.special_user_dept?special.special_user_dept:''}
                        onChange={(e)=>fncOnChange(e, 'special_user_dept')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">TEL</Label>
                    <Input type="text" placeholder="TEL"
                        maxLength="50"
                        value={special.special_user_tel?special.special_user_tel:''}
                        onChange={(e)=>fncOnChange(e, 'special_user_tel')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">FAX</Label>
                    <Input type="text" placeholder="FAX"
                        maxLength="50"
                        value={special.special_user_fax?special.special_user_fax:''}
                        onChange={(e)=>fncOnChange(e, 'special_user_fax')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">EMAIL</Label>
                    <Input type="text" placeholder="EMAIL"
                        maxLength="25"
                        value={special.special_user_email?special.special_user_email:''}
                        onChange={(e)=>fncOnChange(e, 'special_user_email')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
        </Row>
      </>
    );
}

export {Special, SpecialForm};