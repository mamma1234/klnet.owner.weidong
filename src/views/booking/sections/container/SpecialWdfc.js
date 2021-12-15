/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, FormGroup,Label} from "reactstrap";
//import * as validation from 'components/common/validation.js';
import axios from 'axios';
import InputValid from "components/CustomInput/InputValid.js";

const SpecialWdfc = (props) => {
    const [index, setIndex] = useState(0);
    const [special, setSpecial] = useState({});
    const [openType, setOpenType] = useState("");
    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    useEffect(() => {
        setSpecial(props.special);
        setIndex(props.index);
        setOpenType(props.openType);
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
    <Row>
        <SpecialForm
            special={special}
            fncOnBlur={fncOnBlurSpecial}
            openType={openType}
            {...props}
            />
        {/* <Col className="col-12 text-right">
            <Button
                className="p-0"
                color="default"
                size="sm"
                outline
                onClick={onDelSpecial}
            >
            <i className="fa fa-minus" />
            </Button>
        </Col> */}
    </Row>
    );

}


const SpecialForm = (props) => {
    
    const [special, setSpecial] = useState({});
    const [openType, setOpenType] = useState("");
    const [dangerList, setDangerList] = useState([]);
    
    
    useEffect(() => {
        // let params = {
        //     line_code: 'WDFC'
        // }
        // selectLineCodeDanger(params);
    },[]);

    useEffect(() => {
        // console.log(props.special);
        setSpecial(props.special);
        setOpenType(props.openType);
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
        setSpecial({...special, [key]:e.target.value.toUpperCase()});
    }

    const selectLineCodeDanger=( params )=>{
        axios.post(
            "/shipper/selectLineCodeDanger"
            ,{ 
                params
            }
            ,{}
        ).then(
            res => {
                setDangerList(res.data);
            }
        );
    }
    return (
      <>
        {("BOOK" === openType)?<Row>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Bookmark Name</Label>
                    {/* <Input type="text" name="container_special_bookmark_name" id="container_special_bookmark_name"
                        value={special.container_special_bookmark_name?special.container_special_bookmark_name:''}
                        maxLength="50"
                        onChange={(e)=>fncOnChange(e, 'container_special_bookmark_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        invalid={special.container_special_bookmark_name?false:('BOOK'===openType?true:false)}
                        />
                    <FormFeedback>{validation.REQ_MSG}</FormFeedback> */}

                    <InputValid 
                        type="text"
                        name="container_special_bookmark_name"
                        id="container_special_bookmark_name"
                        placeholder=""
                        maxLength="50"
                        value={special.container_special_bookmark_name?special.container_special_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'container_special_bookmark_name')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={'BOOK'===openType?true:false} 
                    />
                </FormGroup>
            </Col>
        </Row>:<></>}
        <Row>
        {/* <Col xl="12" lg="12" md="12">
            <Select
                className="react-select react-select-primary"
                classNamePrefix="react-select"
                name="special_undg"
                value={{value:special.special_undg,label:special.label}}
                onChange={(value)=>setSpecial({...special,'special_undg':value.special_undg,'special_undg_name':value.label})}
                // onChange={(value)=>fncOnChangeSelect(value, 'sch_pol')}
                options={dangerList}
                // invalid={schedule.sch_pol?false:('CARD'===openType?true:false)}
                // onBlur={(e)=>fncOnBlurSchedule(e)}
                // placeholder={placeholder}
                />
            </Col> */}
            <Col xl="4" lg="4">
                <FormGroup>
                    <Label className="mb-0">CLASS</Label>
                    {/* <Input type="text" placeholder=""
                        maxLength="7"
                        value={special.special_imdg?special.special_imdg:''}
                        onChange={(e)=>fncOnChange(e, 'special_imdg')}
                        onBlur={(e)=>fncOnBlur(e)}
                        bsSize={("MAIN"===openType)?'sm':null}
                        /> */}
                    <InputValid 
                        type="text"
                        name="special_imdg"
                        id="special_imdg"
                        placeholder=""
                        maxLength="7"
                        value={special.special_imdg?special.special_imdg:''}
                        onChange={(e)=>fncOnChange(e, 'special_imdg')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        bsSize={("MAIN"===openType)?'sm':null}
                        required={'BOOK'===openType?true:false} 
                        feedid="container"
                    />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4">
                <FormGroup>
                    <Label className="mb-0">UNDG</Label>
                    {/* <Input type="text" placeholder=""
                        maxLength="4"
                        value={special.special_undg?special.special_undg:''}
                        onChange={(e)=>fncOnChange(e, 'special_undg')}
                        onBlur={(e)=>fncOnBlur(e)}
                        bsSize={("MAIN"===openType)?'sm':null}
                        /> */}
                    <InputValid 
                        type="number"
                        name="special_undg"
                        id="special_undg"
                        placeholder=""
                        maxLength="4"
                        value={special.special_undg?special.special_undg:''}
                        onChange={(e)=>fncOnChange(e, 'special_undg')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        bsSize={("MAIN"===openType)?'sm':null}
                        required={'BOOK'===openType?true:false} 
                        feedid="container"
                    />
                </FormGroup>
            </Col>
            
        </Row>
      </>
    );
}

export {SpecialWdfc, SpecialForm};