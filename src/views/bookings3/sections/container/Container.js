/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col, CardBody, Collapse, Button,FormGroup,Label,Input, Card,
    InputGroupAddon, InputGroupText, InputGroup } from "reactstrap";
import ReactDatetime from "react-datetime";
import {Special} from './Special';
import axios from 'axios';



const Container = (props) => {
    const [index, setIndex] = useState('0');
    const [openSpecial, setOpenSpecial] = useState(false);
    const toggleSpecial = () => setOpenSpecial(!openSpecial);
    // Container 
    const [container, setContainer] = useState({});
    const [containerSpecialList, setContainerSpecialList] = useState([]);
    // Special
    const [specialBookmarkList, setSpecialBookmarkList] = useState([]);

    useEffect(() => {

    },[]);
    
    useEffect(() => {
        setContainer(props.container);
        setIndex(props.index);
        setContainerSpecialList(props.containerSpecialList);
        setSpecialBookmarkList(props.specialBookmarkList);
    },[props]);

    const onAddSpecial=()=>{
        setContainerSpecialList([...containerSpecialList,{'key':2, 'cntr_seq':index+1}]);
        props.fncOnBlurSpecialList([...containerSpecialList,{'key':2, 'cntr_seq':index+1}]);
    }

    // Container 자식 부모 
    const fncOnBlur=(container)=>{
        setContainer(container);
        props.fncOnBlurContainer( index, container);
    }
    // Special 자식 부모 처리
    const fncOnBlurSpecial=(index, special)=>{
        containerSpecialList[index] = special;
        setContainerSpecialList([...containerSpecialList]);
        props.fncOnBlurSpecialList([...containerSpecialList]);
    }

    // 콤보박스에서 Special Bookmark 선택한 경우
    const fncSelectSpecialList=(e, i, cntr_seq)=>{
        // Special Bookmark 정보에 선택한 정보를 입력한다.
        containerSpecialList.map((element, key)=>{
            // Special Bookmark 동일한 콤보박스 위치를 찾는다.
            if( key == i ) {
                // Special Bookmark 목록을 뒤져서
                specialBookmarkList.map(( row, i )=> {
                    // 어느걸 선택했는지를 찾는다.
                    if( e.target.value == row.container_special_bookmark_seq ) {
                        // 찾은 row를 SpecialList 정보에 넣는다.
                        console.log()
                        row.cntr_seq = cntr_seq;
                        console.log(row)
                        containerSpecialList[key] = row;
                    } 
                });
                // 해당 정보를 Relation에 입력한다
                setContainerSpecialList([...containerSpecialList]);
                props.fncOnBlurSpecialList([...containerSpecialList]);
            }
        });
    }
    const onDelContainer = ()=>{
        props.onDelContainer(index);
    }
    const onDelSpecial=(special)=>{
        props.onDelSpecial(special);
    }
  return (
    <>
        <Card body>
            <Row>
                <Col className="col-12 text-right" xl="12" lg="12">
                    <Button
                        className="p-0"
                        color="default"
                        size="sm"
                        outline
                        onClick={onDelContainer}
                    >
                    <i className="fa fa-minus" />
                    </Button>
                </Col>
            </Row>
            <ContainerForm
                container={container}
                fncOnBlur={fncOnBlur}/>
            <Card>
                <Button onClick={toggleSpecial}>Specail</Button>
                <Collapse
                    isOpen={openSpecial}>
                    <CardBody className="pt-2 pb-2 bg-white">

                            {containerSpecialList.map((element, key)=>{
                                // Special 의 cntr_seq를 확인한다.
                                if( element.cntr_seq ) {
                                    
                                } else {
                                    // Special의 cntr_seq 없다면 현재 정보로 입력해준다.
                                    element.cntr_seq = container.cntr_seq;
                                }

                                // Container와 Special 연결고리 cntr_seq로 정의한다.
                                if( element.cntr_seq == container.cntr_seq ) {
                                    return (
                                        <Row key={key}>
                                            <Col className="col-12 text-left" xl="8" lg="8">
                                                <Input type="select" key={key}
                                                    style={{height:'35px',fonztSize:'10px',border:'0',borderBottom:'1px solid silver',borderRadius:'0',textAlignLast:'center'}}
                                                    onChange={(e) => {
                                                        fncSelectSpecialList(e, key, container.cntr_seq)
                                                    }}
                                                    value={element.container_special_bookmark_seq?element.container_special_bookmark_seq:'0'}>
                                                    <option key={0} value={'0'}>
                                                        선택
                                                    </option>
                                                    {(specialBookmarkList.length>0)?specialBookmarkList.map((row,i)=>{
                                                        return(
                                                            <option key={i} value={row.container_special_bookmark_seq}>
                                                                {row.container_special_bookmark_name}
                                                            </option>
                                                        )
                                                    })
                                                    :<></>}
                                                </Input>
                                            </Col>
                                            <Col className="col-12 text-right" xl="4" lg="4">
                                                <Button
                                                    className="p-0 mr-1"
                                                    color="default"
                                                    outline
                                                    size="sm"
                                                    onClick={onAddSpecial}
                                                >
                                                <i className="fa fa-plus" />
                                                </Button>
                                            </Col>
                                            <Special
                                                key={key}
                                                index={key}
                                                special={element}
                                                fncOnBlurSpecial={fncOnBlurSpecial}
                                                onDelSpecial={onDelSpecial}
                                            />
                                        </Row>
                                    )
                                }
                            })}
                    </CardBody>
                </Collapse>
            </Card>
        </Card>
    </>
    );
}

const ContainerForm = (props) => {
    
    const [container, setContainer] = useState({});
    // CODE 조회 line_code_cntr_sztp
    const [lineCodeCntrSztp, setLineCodeCntrSztp] = useState([]);
    // CODE 조회 line_code_vessel_pickup
    const [lineCodeVesselPickup, setLineCodeVesselPickup] = useState([]);
    
    useEffect(() => {
        // Cargo Type 및 Pack Type 조회
        // let params = {
        //     line_code: 'WDFC'
        // }
        // selectLineCodeVesselPickup(params);
        // selectLineCodeCntrSztp(params);
    },[]);

    useEffect(() => {
      setContainer(props.container);
    },[props]);
    
    // Container Size Type 목록조회
    const selectLineCodeCntrSztp = (params) => {
        axios.post(
            "/api/selectLineCodeCntrSztp"
            ,{ params }
            ,{}
        ).then(res=>{
            setLineCodeCntrSztp(res.data);
            // if( !container.cntr_code ) {
            //     setContainer({...container
            //         , ['cntr_code']:res.data[0].cntr_code
            //         , ['cntr_length']:res.data[0].cmt_length
            //         , ['cntr_height']:res.data[0].cmt_height
            //         , ['cntr_width']:res.data[0].cmt_width});
            // }
        }).catch(err => {
            if(err.response.status) {
                // onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Container Size Type 목록조회
    const selectLineCodeVesselPickup = (params) => {
        axios.post(
            "/api/selectLineCodeVesselPickup"
            ,{ params }
            ,{}
        ).then(res=>{
            setLineCodeVesselPickup(res.data);
            // if( !container.cntr_pick_up_cy_code ) {
            //     setContainer({...props.container, ['cntr_pick_up_cy_code']:res.data[0].cntr_pick_up_cy_code});
            // }
        }).catch(err => {
            if(err.response.status) {
                // onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // 수정된 내용은 Cargo 저장
    const fncOnChangeSelect = ( e, key ) => {
        // console.log(e.target.value)
        // e.preventDefault();
        if ( 'cntr_code' === key ) {
            let code = e.target.value;
            lineCodeCntrSztp.map((row,key)=>{
                if( code == row.cntr_code ) {
                    let length = row.cmt_length;
                    let height = row.cmt_height;
                    let width = row.cmt_width;
                    setContainer({...container
                        , ['cntr_code']:code
                        , ['cntr_length']:length
                        , ['cntr_height']:height
                        , ['cntr_width']:width});
                    props.fncOnBlur({...container
                        , ['cntr_code']:code
                        , ['cntr_length']:length
                        , ['cntr_height']:height
                        , ['cntr_width']:width});
                }
            })
        } else {
            setContainer({...container, [key]:e.target.value});
            props.fncOnBlur( {...container, [key]:e.target.value} );
        }
    }
    // 완료된 내용은 부모로 전달
    const fncOnBlur = (e) => {
        e.preventDefault();
        props.fncOnBlur( container );
    }
    // 수정된 내용은 container 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setContainer({...container, [key]:e.target.value});
    }
    // date type 처리
    const fncOnChangeDate = (value, key) => {
        // Object > Date 객체로변환
        let date = new Date(value);
        // Date 객체에서 정보 추출
        let yyyy=date.getFullYear();
        let mon = date.getMonth()+1;
        let day = date.getDate();
        mon = mon > 9 ? mon : "0" + mon;
        day = day > 9 ? day : "0" + day;
        setContainer({...container, [key]:yyyy+mon+day});
        // props.fncOnBlurSchedule( {...schedule, [key]:yyyy+'-'+mon+'-'+day} );
    }
    return (
      <>
        <Row>
            <Col xl="3" lg="3" md="6">
                <FormGroup>
                    <Label className="mb-0">Bookmark Name</Label>
                    <Input type="text" name="container_bookmark_name" id="container_bookmark_name"
                        maxLength="50"
                        value={container.container_bookmark_name?container.container_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'container_bookmark_name')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="3" lg="3" md="6">
                <FormGroup>
                    <Label className="mb-0">SIZE / TYPE</Label>
                    <Input type="select" name="cntr_code" id="cntr_code"
                        placeholder="Y"
                        value={container.cntr_code?container.cntr_code:''}
                        onChange={(e) => {
                            fncOnChangeSelect(e, 'cntr_code');
                        }}
                        >
                        <option key={0} value={'0'}>선택</option>
                        {(lineCodeCntrSztp.length>0)?lineCodeCntrSztp.map((element,key)=>{
                            return(
                                <option key={key} value={element.cntr_code}>
                                    {element.cntr_code_name}
                                </option>
                            )
                        }):<></>}
                    </Input>
                </FormGroup>
            </Col>
            <Col xl="3" lg="3" md="6">
                <FormGroup>
                    <Label className="mb-0">LENGTH</Label>
                    <Input type="text" placeholder="LENGTH"
                        value={container.cntr_length?container.cntr_length:''}
                        maxLength="15"
                        onChange={(e)=>fncOnChange(e, 'cntr_length')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="3" lg="3" md="6">
                <FormGroup>
                    <Label className="mb-0">WIDTH</Label>
                    <Input type="text" placeholder="WIDTH"
                        maxLength="15"
                        value={container.cntr_width?container.cntr_width:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_width')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="3" lg="3" md="6">
                <FormGroup>
                    <Label className="mb-0">HEIGHT</Label>
                    <Input type="text" placeholder="HEIGHT"
                        maxLength="15"
                        value={container.cntr_height?container.cntr_height:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_height')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    <Label className="mb-0">QTY</Label>
                    <Input type="text" placeholder="QTY"
                        maxLength="15"
                        value={container.cntr_qty?container.cntr_qty:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_qty')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    <Label className="mb-0">SOC</Label>
                    <Input type="select" placeholder="Y"
                        value={container.cntr_soc_yn?container.cntr_soc_yn:''}
                        onChange={(e) => {
                            fncOnChangeSelect(e, 'cntr_soc_yn');
                        }}>
                        <option key="1">선택</option>
                        <option key="2">Y</option>
                        <option key="3">N</option>
                    </Input>
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    <Label className="mb-0">SEAL NO</Label>
                    <Input type="text" placeholder="SEAL NO"
                        maxLength="20"
                        value={container.cntr_seal_no?container.cntr_seal_no:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_seal_no')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    <Label className="mb-0">FROZEN TMP</Label>
                    <Input type="text" placeholder="FROZEN TMP"
                        maxLength="15"
                        value={container.cntr_frozen_tmp?container.cntr_frozen_tmp:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_frozen_tmp')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    <Label className="mb-0">FROZEN UIT</Label>
                    <Input type="text" placeholder="FROZEN UNIT"
                        maxLength="3"
                        value={container.cntr_frozen_tmp_unit?container.cntr_frozen_tmp_unit:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_frozen_tmp_unit')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="6">
                <FormGroup>
                    <Label className="mb-0">FROZEN FC</Label>
                    <Input type="text" placeholder="FROZEN FC"
                        maxLength="3"
                        value={container.cntr_frozen_fc?container.cntr_frozen_fc:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_frozen_fc')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="6" lg="3" md="6">
                <FormGroup>
                    <Label className="mb-0">EMPTY</Label>
                    <Input type="select" placeholder="EMPTY YN"
                        value={container.cntr_empty_yn?container.cntr_empty_yn:''}
                        onChange={(e) => {
                            fncOnChangeSelect(e, 'cntr_empty_yn');
                        }}>
                        <option key="1">선택</option>
                        <option key="2">Y</option>
                        <option key="3">N</option>
                    </Input>
                </FormGroup>
            </Col>
            <Col xl="6" lg="3" md="6">
                <FormGroup>
                    <Label className="mb-0">SPECIAL TYPE</Label>
                    <Input type="text" placeholder="SPECIAL TYPE"
                        maxLength="2"
                        value={container.cntr_special_type?container.cntr_special_type:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_special_type')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="6" lg="3" md="6">
                <FormGroup>
                    <Label className="mb-0">VENT OPEN</Label>
                    <Input type="text" placeholder="VENT OPEN"
                        maxLength="3"
                        value={container.cntr_vent_open?container.cntr_vent_open:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_vent_open')}
                        onBlur={(e)=>fncOnBlur(e)}>
                    </Input>
                </FormGroup>
            </Col>
            <Col xl="6" lg="3" md="6">
                <FormGroup>
                    <Label className="mb-0">PRE COOLING</Label>
                    <Input type="text" placeholder="PRE COOLING"
                        maxLength="3"
                        value={container.cntr_pre_cooling?container.cntr_pre_cooling:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_pre_cooling')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="3" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">PICK UP CY</Label>
                    <Input type="select" name="cntr_pick_up_cy_code" id="cntr_pick_up_cy_code"
                        placeholder="Y"
                        value={container.cntr_pick_up_cy_code?container.cntr_pick_up_cy_code:''}
                        onChange={(e) => {
                            fncOnChangeSelect(e, 'cntr_pick_up_cy_code');
                        }}
                        >
                        <option key={0} value={'0'}>선택</option>
                        {(lineCodeVesselPickup.length>0)?lineCodeVesselPickup.map((element,key)=>{
                            return(
                                <option key={key} value={element.pickup_cy_code}>
                                    [{element.vessel_code}] {element.pickup_cy_name}
                                </option>
                            )
                        }):<></>}
                    </Input>
                </FormGroup>
            </Col>
            <Col xl="3" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">PICK UP DATE</Label>
                    <Input type="text" placeholder="PICK UP DATE"
                        value={container.cntr_pick_up_cy_date?container.cntr_pick_up_cy_date:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_pick_up_cy_date')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
                <InputGroup className="date" id="cntr_pick_up_cy_date">
                        <ReactDatetime
                            inputProps={{
                            className: "form-control",
                            placeholder: "Datetime Picker Here",
                            }}
                            dateFormat="YYYYMMDD"
                            timeFormat={false}
                            value={container.cntr_pick_up_cy_date?container.cntr_pick_up_cy_date:''}
                            onChange={(e)=>fncOnChangeDate(e,'cntr_pick_up_cy_date')}
                        />
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <span className="glyphicon glyphicon-calendar">
                                <i className="fa fa-calendar" />
                                </span>
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
            </Col>
            <Col xl="3" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">CY NAME1</Label>
                    <Input type="text" placeholder="CY NAME1"
                        maxLength="35"
                        value={container.cntr_pick_up_cy_name1?container.cntr_pick_up_cy_name1:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_pick_up_cy_name1')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="3" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">CY NAME2</Label>
                    <Input type="text" placeholder="CY NAME2"
                        maxLength="35"
                        value={container.cntr_pick_up_cy_name2?container.cntr_pick_up_cy_name2:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_pick_up_cy_name2')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">PICK UP CY ADDRESS1</Label>
                    <Input type="textarea" placeholder="PICK UP CY ADDRESS1"
                        maxLength="35"
                        value={container.cntr_pick_up_cy_address1?container.cntr_pick_up_cy_address1:''} className="text-area-2" maxLength="50"
                        onChange={(e)=>fncOnChange(e, 'cntr_pick_up_cy_address1')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">PICK UP CY ADDRESS2</Label>
                    <Input type="textarea" placeholder="PICK UP CY ADDRESS2"
                        maxLength="35"
                        value={container.cntr_pick_up_cy_address2?container.cntr_pick_up_cy_address2:''} className="text-area-2" maxLength="50"
                        onChange={(e)=>fncOnChange(e, 'cntr_pick_up_cy_address2')}
                        onBlur={(e)=>fncOnBlur(e)}/>
                </FormGroup>
            </Col>
        </Row>
      </>
    );
}

export {Container, ContainerForm};