/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, FormGroup,Label,Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import ReactDatetime from "react-datetime";
import axios from 'axios';

const Schedule = (props) => {
    const [schedule, setSchedule] = useState({});
    // OUT LINE PORT
    const [outLinePortList, setOutLinePortList] = useState([]);
    // IN LINE PORT
    const [inLinePortList, setInLinePortList] = useState([]);
    useEffect(() => {
        // 위동 PORT 목록조회
        let params = {
            line_code: 'WDFC',
            key: 'out'
        }
        selectLinePort(params);
        // 위동 PORT 목록조회
        params = {
            line_code: 'WDFC',
            key: 'in'
        }
        selectLinePort(params);
    },[]);

    useEffect(()=>{
        setSchedule(props.schedule);
    },[props]);

    // useEffect(()=>{
    //     if(outLinePortList.length > 0 ) {
    //         if( !schedule.sch_pol_name ) {
    //             setSchedule({...schedule, ['sch_pol']: outLinePortList[0].port_code, ['sch_pol_name']: outLinePortList[0].port_name})
    //         }
    //     }
    // },[outLinePortList])

    // useEffect(()=>{
    //     if(inLinePortList.length > 0 ) {
    //         console.log(schedule.sch_pol_name)
    //         if( !schedule.sch_pod_name ) {
    //             setSchedule({...schedule, ['sch_pod']: inLinePortList[0].port_code, ['sch_pod_name']: inLinePortList[0].port_name})
    //         }
    //     }
    // },[inLinePortList])

    // 수정된 내용은 DOCUMENT로 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setSchedule({...schedule, [key]:e.target.value});
    }

    const fncOnChangeSelect = ( e, key ) => {
        // console.log(key)
        e.preventDefault();
        if( 'sch_pol' === key ) {
            outLinePortList.map((element, key ) => {
                if( e.target.value == element.port_code ) {
                    setSchedule({...schedule, ['sch_pol']:e.target.value , ['sch_pol_name']:element.port_name});
                }
            });
        }
        if( 'sch_por' === key ) {
            outLinePortList.map((element, key ) => {
                if( e.target.value == element.port_code ) {
                    setSchedule({...schedule, ['sch_por']:e.target.value , ['sch_por_name']:element.port_name});
                }
            });
        }
        if( 'sch_pod' === key ) {
            inLinePortList.map((element, key ) => {
                if( e.target.value == element.port_code ) {
                    setSchedule({...schedule, ['sch_pod']:e.target.value , ['sch_pod_name']:element.port_name});
                }
            });
        }
        if( 'sch_pld' === key ) {
            inLinePortList.map((element, key ) => {
                if( e.target.value == element.port_code ) {
                    setSchedule({...schedule, ['sch_pld']:e.target.value , ['sch_pld_name']:element.port_name});
                }
            });
        }
        if( 'sch_fdp' === key ) {
            inLinePortList.map((element, key ) => {
                if( e.target.value == element.port_code ) {
                    setSchedule({...schedule, ['sch_fdp']:e.target.value , ['sch_fdp_name']:element.port_name});
                }
            });
        }
        
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
        setSchedule({...schedule, [key]:yyyy+mon+day});
        props.fncOnBlurSchedule( {...schedule, [key]:yyyy+mon+day} );
    }

    // 완료된 내용은 부모로 전달
    const fncOnBlurSchedule = (e) => {
        e.preventDefault();
        props.fncOnBlurSchedule( schedule );
    }

    const selectLinePort = (params) => {
        
        axios.post(
            "/api/selectLinePort"
            ,{ params }
            ,{}
        ).then(res=>{
            if( 'out' === params.key ) {
                setOutLinePortList(res.data);
            } else if ( 'in' === params.key ) {
                setInLinePortList(res.data);
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
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Bookmark Name</Label>
                    <Input type="text" 
                        name="schedule_bookmark_name"
                        id="schedule_bookmark_name"
                        placeholder="Bookmark Name"
                        maxLength="50"
                        value={schedule.schedule_bookmark_name?schedule.schedule_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'schedule_bookmark_name')}
                        onBlur={(e)=>fncOnBlurSchedule(e)}
                        />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">POL</Label>
                    <Row>
                        <Col xl="5" className="col-4 pr-1">
                            <Input type="select" 
                                name="sch_pol"
                                id="sch_pol"
                                placeholder="POL"
                                value={schedule.sch_pol?schedule.sch_pol:''}
                                onChange={(e)=>fncOnChangeSelect(e, 'sch_pol')}
                                onBlur={(e)=>fncOnBlurSchedule(e)}
                                >
                                <option key={0} value={0}>선택</option>
                                {outLinePortList.length > 0 ?outLinePortList.map((element,key)=>{
                                    return(
                                        <option key={key} value={element.port_code}>
                                            {element.port_code}
                                        </option>
                                    )
                                })
                                :<></>}
                            </Input>
                        </Col>
                        <Col xl="7" className="col-8 pl-1">
                            <Input type="text"
                                name="sch_pol_name"
                                id="sch_pol_name"
                                placeholder="DETAIL"
                                maxLength="35"
                                value={schedule.sch_pol_name?schedule.sch_pol_name:''}
                                onChange={(e)=>fncOnChange(e, 'sch_pol_name')}
                                onBlur={(e)=>fncOnBlurSchedule(e)}
                                />
                        </Col>
                    </Row>
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">POD</Label>
                    <Row>
                        <Col xl="5" className="col-4 pr-1">
                            <Input type="select"
                                name="sch_pod"
                                id="sch_pod"
                                placeholder="POL"
                                value={schedule.sch_pod?schedule.sch_pod:''}
                                onChange={(e)=>fncOnChangeSelect(e,'sch_pod')}
                                onBlur={(e)=>fncOnBlurSchedule(e)}
                                >
                                    <option key={0} value={0}>선택</option>
                                {inLinePortList.length > 0 ?inLinePortList.map((element,key)=>{
                                    return(
                                        <option key={key} value={element.port_code}>
                                            {element.port_code}
                                        </option>
                                    )
                                })
                                :<></>}
                            </Input>
                        </Col>
                        <Col xl="7" className="col-8 pl-1">
                            <Input type="text"
                                name="sch_pod_name"
                                id="sch_pod_name"
                                placeholder="DETAIL"
                                maxLength="50"
                                value={schedule.sch_pod_name?schedule.sch_pod_name:''}
                                onChange={(e)=>fncOnChange(e,'sch_pod_name')}
                                onBlur={(e)=>fncOnBlurSchedule(e)}
                                />
                        </Col>
                    </Row>
                </FormGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">POR</Label>
                    <Row>
                        <Col xl="5" className="col-4 pr-1">
                            <Input type="select"
                                name="sch_por"
                                id="sch_por"
                                placeholder="POR"
                                value={schedule.sch_por?schedule.sch_por:''}
                                onChange={(e)=>fncOnChangeSelect(e,'sch_por')}
                                onBlur={(e)=>fncOnBlurSchedule(e)}
                                >
                                <option key={0} value={0}>선택</option>
                                {outLinePortList.length > 0 ?outLinePortList.map((element,key)=>{
                                    return(
                                        <option key={key} value={element.port_code}>
                                            {element.port_code}
                                        </option>
                                    )
                                })
                                :<></>}
                            </Input>
                        </Col>
                        <Col xl="7" className="col-8 pl-1">
                            <Input type="text"
                                name="sch_por_name"
                                id="sch_por_name"
                                placeholder="DETAIL"
                                maxLength="50"
                                value={schedule.sch_por_name?schedule.sch_por_name:''}
                                onChange={(e)=>fncOnChange(e,'sch_por_name')}
                                onBlur={(e)=>fncOnBlurSchedule(e)}
                                />
                        </Col>
                    </Row>
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">PLD</Label>
                    <Row>
                        <Col xl="5" className="col-4 pr-1">
                            <Input type="select"
                                name="sch_pld"
                                id="sch_pld"
                                placeholder="POL"
                                value={schedule.sch_pld?schedule.sch_pld:''}
                                onChange={(e)=>fncOnChangeSelect(e,'sch_pld')}
                                onBlur={(e)=>fncOnBlurSchedule(e)}
                                >
                                    <option key={0} value={0}>선택</option>
                                {inLinePortList.length > 0 ?inLinePortList.map((element,key)=>{
                                    return(
                                        <option key={key} value={element.port_code}>
                                            {element.port_code}
                                        </option>
                                    )
                                })
                                :<></>}
                            </Input>
                        </Col>
                        <Col xl="7" className="col-8 pl-1">
                            <Input type="text"
                                name="sch_pld_name"
                                id="sch_pld_name"
                                placeholder="DETAIL"
                                maxLength="50"
                                value={schedule.sch_pld_name?schedule.sch_pld_name:''}
                                onChange={(e)=>fncOnChange(e,'sch_pld_name')}
                                onBlur={(e)=>fncOnBlurSchedule(e)}
                                />
                        </Col>
                    </Row>
                </FormGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">ETD</Label>
                    <InputGroup className="date" id="etd">
                        <ReactDatetime
                            inputProps={{
                            className: "form-control",
                            placeholder: "Datetime Picker Here",
                            }}
                            dateFormat="YYYYMMDD"
                            timeFormat={false}
                            value={schedule.sch_etd?schedule.sch_etd:''}
                            onChange={value=>fncOnChangeDate(value,'sch_etd')}
                            // onBlur={(e)=>fncOnBlurSchedule(e)}
                        />
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <span className="glyphicon glyphicon-calendar">
                                <i className="fa fa-calendar" />
                                </span>
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">ETA</Label>
                    <InputGroup className="date" id="eta">
                        <ReactDatetime
                            inputProps={{
                            className: "form-control",
                            placeholder: "Datetime Picker Here",
                            }}
                            dateFormat="YYYYMMDD"
                            timeFormat={false}
                            value={schedule.sch_eta?schedule.sch_eta:''}
                            onChange={(e)=>fncOnChangeDate(e,'sch_eta')}
                        />
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <span className="glyphicon glyphicon-calendar">
                                <i className="fa fa-calendar" />
                                </span>
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">FINAL DESTINATION</Label>
                    <Row>
                        <Col xl="5" className="col-3 pr-1">
                            <Input type="select"
                                name="sch_fdp"
                                id="sch_fdp"
                                placeholder="POL"
                                value={schedule.sch_fdp?schedule.sch_fdp:''}
                                onChange={(e)=>fncOnChangeSelect(e,'sch_fdp')}
                                onBlur={(e)=>fncOnBlurSchedule(e)}
                                >
                                    <option key={0} value={0}>선택</option>
                                {inLinePortList.length > 0 ?inLinePortList.map((element,key)=>{
                                    return(
                                        <option key={key} value={element.port_code}>
                                            {element.port_code}
                                        </option>
                                    )
                                })
                                :<></>}
                            </Input>
                        </Col>
                        <Col xl="7" className="col-9 pl-1">
                            <Input type="text"
                                name="sch_fdp_name"
                                id="sch_fdp_name"
                                placeholder="DETAIL"
                                maxLength="50"
                                value={schedule.sch_fdp_name?schedule.sch_fdp_name:''}
                                onChange={(e)=>fncOnChange(e,'sch_fdp_name')}
                                onBlur={(e)=>fncOnBlurSchedule(e)}/>
                        </Col>
                    </Row>
                </FormGroup>
            </Col>
        </Row>
    </>
    );
}

export default Schedule;