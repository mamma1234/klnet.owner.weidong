/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col,FormGroup,Label} from "reactstrap";
//import * as validation from 'components/common/validation.js';
//import { invalid } from 'moment';
import Select from "react-select";
import InputValid from "components/CustomInput/InputValid.js";

const CargoWdfc = (props) => {

    const [cargo, setCargo] = useState({});
    const [cargoTypeList, setCargoTypeList] = useState([]);
    const [cargoPackTypeList, setCargoPackTypeList] = useState([]);
    const [openType, setOpenType] = useState("");
    const {dangerTrue, serviceCode} = props;
    useEffect(() => {
        
    },[]);

    // useEffect(() => {
    //     setOpenType(props.openType);
    //     setCargoTypeList(props.cargoTypeList);
    //     setCargoPackTypeList(props.cargoPackTypeList);
    //     setCargo(props.cargo);
    // },[props]);

    useEffect(() => {
        setCargo(props.cargo);
    },[props.cargo]);

    useEffect(() => {
        setCargoPackTypeList(props.cargoPackTypeList);
    },[props.cargoPackTypeList]);

    useEffect(() => {
        setCargoTypeList(props.cargoTypeList);
    },[props.cargoTypeList]);

    useEffect(() => {
        setOpenType(props.openType);
    },[props.openType]);

    // 수정된 내용은 cargo 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setCargo({...cargo, [key]:e.target.value.toUpperCase()});
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

    const fncCargoType =(value)=> {
        if( value ) {
            if( "WDFC"=== props.booking.line_code && ("3" === value.cargo_type || "4" === value.cargo_type) ) {
                    props.onNotiAlert("danger", "위험물 또는 OOG 부킹은 별도 문의 바랍니다.");
                    return false;
                }
            setCargo({...cargo,'cargo_type':value.cargo_type})
        } else {
            setCargo({...cargo,'cargo_type':null})
        }
    }

  return (
    <>
        <Row>
            {(openType === "BOOK")?
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Bookmark</Label>
                    {/* <Input type="text" name="cargo_bookmark_name" id="cargo_bookmark_name"
                        placeholder=""
                        maxLength="50"
                        value={cargo.cargo_bookmark_name?cargo.cargo_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'cargo_bookmark_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        invalid={cargo.cargo_bookmark_name?false:('BOOK'===openType?true:false)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="cargo_bookmark_name"
                        id="cargo_bookmark_name"
                        placeholder=""
                        maxLength="50"
                        value={cargo.cargo_bookmark_name?cargo.cargo_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'cargo_bookmark_name')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={'BOOK'===openType?true:false} 
                    />
                </FormGroup>
            </Col>
            :<></>}
            
        </Row>
        <Row>
        <Col xl="6" lg="6" md="12">
            <FormGroup>
                <Label className="mb-0">Type</Label>
                    <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        name="cargo_type"
                        value={{value:cargo.cargo_type?cargo.cargo_type:'선택',
                            label:cargo.cargo_type?
                                (cargoTypeList.findIndex(x=>x.value===cargo.cargo_type)>=0)?
                                cargoTypeList[cargoTypeList.findIndex(x=>x.value===cargo.cargo_type)].label:
                                    '선택':
                                '선택'
                        }}
                        onChange={(value)=> fncCargoType(value)}
                        options={cargoTypeList}
                        invalid={cargo.cargo_type?false:('CARGO'===openType?true:false)}
                        onBlur={(e)=>fncOnBlur(e)}
                        isClearable={cargo.cargo_type?true:false}
                        />
            </FormGroup>
        </Col>
        <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Pack Type</Label>
                    <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        name="cargo_pack_type"
                        value={{value:cargo.cargo_pack_type?cargo.cargo_pack_type:''
                        ,label:cargo.cargo_pack_type?
                                                    (cargoPackTypeList.findIndex(x=>x.cargo_pack_type===cargo.cargo_pack_type)>=0)?
                                                        cargoPackTypeList[cargoPackTypeList.findIndex(x=>x.cargo_pack_type===cargo.cargo_pack_type)].label:
                                                        '선택':
                                                    '선택'}}
                        onChange={(value)=>setCargo({...cargo,'cargo_pack_type':value?value.cargo_pack_type:null})}
                        options={cargoPackTypeList}
                        onBlur={(e)=>fncOnBlur(e)}
                        styles={{
                            control: provided => ({...provided,border:!cargo.cargo_pack_type&& '3' === serviceCode?'1px solid red':'' }),
                            indicatorContainer: provided => ({...provided,color:''})
                        }}
                        isClearable={cargo.cargo_pack_type?true:false}
                        // placeholder={placeholder}
                    />
                    <InputValid
                        hidden
                        type="text"
                        name="cargo_pack_type_ch"
                        id="cargo_pack_type_ch"
                        placeholder=""
                        maxLength="20"
                        value={cargo.cargo_pack_type?cargo.cargo_pack_type:''}
                        validtype="select"
                        required={('3' === serviceCode)?true:false} 
                        feedid="cargo"
                        readOnly
                    />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Pack Qty</Label>
                    <InputValid 
                        type="text"
                        name="cargo_pack_qty"
                        id="cargo_pack_qty"
                        placeholder=""
                        maxLength="4"
                        value={cargo.cargo_pack_qty?cargo.cargo_pack_qty:''}
                        onChange={(e)=>fncOnChange(e, 'cargo_pack_qty')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="number"
                        required={('3' === serviceCode)?true:false} 
                        feedid="cargo"
                    />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Cargo Weight</Label>
                    {/* <Input type="text" name="cargo_weight" id="cargo_weight"
                        placeholder=""
                        maxLength="10"
                        value={cargo.cargo_weight?cargo.cargo_weight:''}
                        onChange={(e)=>fncOnChange(e, 'cargo_weight')}
                        onBlur={(e)=>fncOnBlur(e)}
                        invalid={cargo.cargo_weight?false:('CARGO'===openType?true:false)}
                        />
                    <FormFeedback>{validation.REQ_MSG}</FormFeedback> */}
                    <InputValid 
                        type="text"
                        name="cargo_weight"
                        id="cargo_weight"
                        placeholder=""
                        maxLength="10"
                        value={cargo.cargo_weight?cargo.cargo_weight:''}
                        onChange={(e)=>fncOnChange(e, 'cargo_weight')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="number"
                        required={false} 
                        inputgrouptext="kg"
                    />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Total Volume</Label>
                    {/* <Input type="text" name="cargo_total_volume" id="cargo_total_volume"
                        placeholder=""
                        maxLength="10"
                        value={cargo.cargo_total_volume?cargo.cargo_total_volume:''}
                        onChange={(e)=>fncOnChange(e, 'cargo_total_volume')}
                        onBlur={(e)=>fncOnBlur(e)}>
                    </Input> */}
                    <InputValid 
                        type="text"
                        name="cargo_total_volume"
                        id="cargo_total_volume"
                        placeholder=""
                        maxLength="10"
                        value={cargo.cargo_total_volume?cargo.cargo_total_volume:''}
                        onChange={(e)=>fncOnChange(e, 'cargo_total_volume')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="number"
                        required={false} 
                        inputgrouptext="CBM"
                    />
                </FormGroup>
            </Col>
        </Row>
    </>
    );
}

export default CargoWdfc;