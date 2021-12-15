/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col,FormGroup,Label,Input, Button, ListGroup, ListGroupItem} from "reactstrap";
import axios from 'axios';

const Cargo = (props) => {

    const [cargo, setCargo] = useState({});
    const [cargoTypeList, setCargoTypeList] = useState([]);
    const [cargoPackTypeList, setCargoPackTypeList] = useState([]);

    useEffect(() => {
        // Cargo Type 및 Pack Type 조회
        let params = {
            line_code: 'WDFC'
        }
        selectLineCodeCargoType(params);
        selectLineCodeCargoPackType(params);
    },[]);

    useEffect(() => {
        setCargo(props.cargo);
    },[props]);

    // 수정된 내용은 cargo 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setCargo({...cargo, [key]:e.target.value});
    }
    // 수정된 내용은 Cargo 저장
    const fncOnChangeSelect = ( e, key ) => {
        // console.log(e.target.value)
        // e.preventDefault();
        setCargo({...cargo, [key]:e.target.value});
        props.fncOnBlur( {...cargo, [key]:e.target.value} );
    }

    // 완료된 내용은 부모로 전달
    const fncOnBlur = (e) => {
        e.preventDefault();
        props.fncOnBlur( cargo );
    }

    // Cargo Type 목록조회
    const selectLineCodeCargoType = (params) => {
        axios.post(
            "/api/selectLineCodeCargoType"
            ,{ params }
            ,{}
        ).then(res=>{
            setCargoTypeList(res.data);
            if( !cargo.cargo_type ) {
                setCargo({...props.cargo, ['cargo_type']:res.data[0].cargo_type});
            }
        }).catch(err => {
            if(err.response.status) {
                // onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }
    // Cargo Pack Type 목록조회
    const selectLineCodeCargoPackType = (params) => {
        axios.post(
            "/api/selectLineCodeCargoPackType"
            ,{ params }
            ,{}
        ).then(res=>{
            setCargoPackTypeList(res.data);
            if( !cargo.cargo_pack_type ) {
                setCargo({...props.cargo, ['cargo_pack_type']:res.data[0].cargo_pack_type});
            }
        }).catch(err => {
            if(err.response.status) {
                // onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }
  return (
    <>
        <Row>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    <Label className="mb-0">Bookmark</Label>
                    <Input type="text" name="cargo_bookmark_name" id="cargo_bookmark_name"
                        placeholder="Bookmark"
                        maxLength="50"
                        value={cargo.cargo_bookmark_name?cargo.cargo_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'cargo_bookmark_name')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    <Label className="mb-0">Cargo Name</Label>
                    <Input type="text" name="cargo_name" id="cargo_name"
                        placeholder="Cargo Name"
                        maxLength="140"
                        value={cargo.cargo_name?cargo.cargo_name:''}
                        onChange={(e)=>fncOnChange(e, 'cargo_name')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    <Label className="mb-0">HS Code</Label>
                    <Input type="text" name="cargo_hs_code" id="cargo_hs_code"
                        placeholder="HS CODE"
                        maxLength="10"
                        value={cargo.cargo_hs_code?cargo.cargo_hs_code:''}
                        onChange={(e)=>fncOnChange(e, 'cargo_hs_code')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    <Label className="mb-0">Pack Qty</Label>
                    <Input type="text" name="cargo_pack_qty" id="cargo_pack_qty"
                        placeholder="Pack Qty"
                        maxLength="4"
                        value={cargo.cargo_pack_qty?cargo.cargo_pack_qty:''}
                        onChange={(e)=>fncOnChange(e, 'cargo_pack_qty')}
                        onBlur={(e)=>fncOnBlur(e)}
                        />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    <Label className="mb-0">Cargo Type</Label>
                    <Input type="select" name="cargo_type" id="cargo_type"
                        placeholder="Y"
                        maxLength="2"
                        value={cargo.cargo_type?cargo.cargo_type:''}
                        onChange={(e) => {
                            fncOnChangeSelect(e, 'cargo_type');
                        }}
                        >
                        {(cargoTypeList.length>0)?cargoTypeList.map((element,key)=>{
                            return(
                                <option key={key} value={element.cargo_type}>
                                    {"["+element.cargo_type_kr_desc+"]"+element.cargo_type_desc}
                                </option>
                            )
                        }):<></>}
                    </Input>
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    <Label className="mb-0">Pack Type</Label>
                    <Input type="select" name="cargo_pack_type" id="cargo_pack_type"
                        placeholder="Y"
                        value={cargo.cargo_pack_type?cargo.cargo_pack_type:''}
                        onChange={(e) => {
                            fncOnChangeSelect(e, 'cargo_pack_type');
                        }}
                        >
                        {(cargoPackTypeList.length>0)?cargoPackTypeList.map((element,key)=>{
                            return(
                                <option key={key} value={element.cargo_pack_type}>
                                    {element.cargo_pack_type_desc}
                                </option>
                            )
                        }):<></>}
                    </Input>
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    <Label className="mb-0">Cargo Weight</Label>
                    <Input type="text" name="cargo_weight" id="cargo_weight"
                        placeholder="Weight"
                        maxLength="10"
                        value={cargo.cargo_weight?cargo.cargo_weight:''}
                        onChange={(e)=>fncOnChange(e, 'cargo_weight')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    <Label className="mb-0">Total Weight</Label>
                    <Input type="text" name="cargo_total_weight" id="cargo_total_weight"
                        placeholder="Total Weight"
                        maxLength="10"
                        value={cargo.cargo_total_weight?cargo.cargo_total_weight:''}
                        onChange={(e)=>fncOnChange(e, 'cargo_total_weight')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    <Label className="mb-0">Total Volume</Label>
                    <Input type="text" name="cargo_total_volume" id="cargo_total_volume"
                        placeholder="Total Volume"
                        maxLength="10"
                        value={cargo.cargo_total_volume?cargo.cargo_total_volume:''}
                        onChange={(e)=>fncOnChange(e, 'cargo_total_volume')}
                        onBlur={(e)=>fncOnBlur(e)}>
                    </Input>
                </FormGroup>
            </Col>
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">Remark</Label>
                    <Input type="text" name="cargo_remark" id="cargo_remark"
                        placeholder="Remark"
                        maxLength="100"
                        value={cargo.cargo_remark?cargo.cargo_remark:''}
                        onChange={(e)=>fncOnChange(e, 'cargo_remark')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
        </Row>
    </>
    );
}

export default Cargo;