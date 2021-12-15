/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col, Badge, CardHeader, Collapse,FormGroup,Label,Input, Card,
    InputGroupAddon, InputGroupText, InputGroup, CardBody } from "reactstrap";
import ReactDatetime from "react-datetime";
import {SpecialWdfc} from './SpecialWdfc';
import axios from 'axios';
import Moment from 'moment';
import * as validation from 'components/common/validation.js';
import InputValid from "components/CustomInput/InputValid.js";
import Select from "react-select";


const ContainerWdfc = (props) => {
    const [index, setIndex] = useState('0');
    const [openSpecial, setOpenSpecial] = useState(false);
    const toggleSpecial = () => setOpenSpecial(!openSpecial);
    // Container 
    const [container, setContainer] = useState({});
    const [containerSpecialList, setContainerSpecialList] = useState([]);
    // Container Bookmark List  
    const [containerBookmarkList, setContainerBookmarkList] = useState([]);
    // Special
    const [specialBookmarkList, setSpecialBookmarkList] = useState([]);
    // OPEN_TYPE CARD, BOOK
    const [openType, setOpenType] = useState("");
    const {dangerTrue} = props;

    useEffect(() => {

    },[]);
    
    useEffect(() => {
        setContainer(props.container);
    },[props.container]);

    useEffect(() => {
        setOpenType(props.openType);
    },[props.openType]);

    useEffect(() => {
        setIndex(props.index);
    },[props.index]);

    useEffect(() => {
        setContainerBookmarkList( props.containerBookmarkList);
    },[props.containerBookmarkList]);

    useEffect(() => {
        setSpecialBookmarkList(props.specialBookmarkList);
    },[props.specialBookmarkList]);

    useEffect(() => {
        setContainerSpecialList(props.containerSpecialList);
    },[props.containerSpecialList]);


    const onAddSpecial=()=>{
        setContainerSpecialList([...containerSpecialList,{'key':2, 'cntr_seq':index+1}]);
        props.fncOnBlurSpecialList([...containerSpecialList,{'key':2, 'cntr_seq':index+1}]);
    }

    // Container 자식 부모 
    const fncOnBlur=(container)=>{
        // console.log("2: ",index, container  )
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
                    if( e.value == row.container_special_bookmark_seq ) {
                        // 찾은 row를 SpecialList 정보에 넣는다.
                        row.cntr_seq = cntr_seq;
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
        <Col>
            <Card className="no-transition" style={{border:'1px solid silver', paddingBottom:'25px'}} >
                <CardHeader className="pt-1 pb-1">
                    <Row>
                    <Col className="col-3">
                        <Label className="mb-0">Container</Label>
                        <Select
                            className="customSelect"
                            classNamePrefix="customSelect"
                            //className="react-select react-select-primary"
                            //classNamePrefix="react-select"
                            name="container_bookmark"
                            placeholder=""
                            value={{value:container.container_bookmark_seq?container.container_bookmark_seq:'',
                                    // label:container.container_bookmark_seq?containerBookmarkList[containerBookmarkList.findIndex(x=>x.value===container.container_bookmark_seq)].label:'선택'
                                    label:container.container_bookmark_seq?
                                            (containerBookmarkList.findIndex(x=>x.container_bookmark_seq===container.container_bookmark_seq)>=0)?
                                            containerBookmarkList[containerBookmarkList.findIndex(x=>x.container_bookmark_seq===container.container_bookmark_seq)].label:
                                                '선택':
                                            '선택'
                            }}
                            onChange={(e) => props.fncSelectContainerList(e, index)}
                            options={containerBookmarkList}
                            isClearable={container.container_bookmark_seq?true:false}
                            />
                    </Col>
                    <Col>
                        <button
                            className="close pt-3"
                            type="button"
                            onClick={() => onDelContainer()}
                            >×</button>
                    </Col>
                    </Row>
                </CardHeader>
                <CardBody className="pt-3 pb-3">
                    <ContainerForm
                        container={container}
                        fncOnBlur={fncOnBlur}
                        openType={openType}
                        {...props}/>
                
                {/* <hr className="border-secondary"/> */}
                <Row>
                    <Col xl="12" lg="12">
                    {containerSpecialList.map((element, key)=>{
                        // Special 의 cntr_seq를 확인한다.
                        if( element.cntr_seq ) {
                            
                        } else {
                            // Special의 cntr_seq 없다면 현재 정보로 입력해준다.
                            element.cntr_seq = container.cntr_seq;
                        }

                        // Container와 Special 연결고리 cntr_seq로 정의한다.
                        // console.log( "SPECIAL CNT >>" , element.cntr_seq,container.cntr_seq )
                        if( element.cntr_seq == container.cntr_seq ) {
                            // console.log("SPECIAL  : ",dangerTrue, index)
                            return (
                                <Collapse isOpen={dangerTrue} key={index}>
                                <Row>
                                    <Col xl="4" lg="4">
                                    <FormGroup>
                                        <Label className="mb-0">SPECIAL</Label>
                                        <Input type="select" key={key}
                                            // style={{height:'35px',fonztSize:'10px',border:'0',borderBottom:'1px solid silver',borderRadius:'0',textAlignLast:'center'}}
                                            onChange={(e) => {
                                                fncSelectSpecialList(e, key, container.cntr_seq)
                                            }}
                                            // bsSize={("MAIN"===openType)?'sm':null}
                                            className={("MAIN"===openType)?"pt-0 pb-0":null}
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
                                        {/* <Select
                                            className="customSelect"
                                            classNamePrefix="customSelect"
                                            //className="react-select react-select-primary"
                                            //classNamePrefix="react-select"
                                            name="container_special_bookmark"
                                            placeholder=""
                                            value={{value:element.container_special_bookmark_seq?element.container_special_bookmark_seq:'',
                                                    label:element.container_special_bookmark_seq?specialBookmarkList[specialBookmarkList.findIndex(x=>x.value===element.container_special_bookmark_seq)].label:'선택'}
                                            }
                                            onChange={(e) => fncSelectSpecialList(e, key, container.cntr_seq)}
                                            options={specialBookmarkList}
                                            // styles={{
                                            //     control: provided => ({...provided,border:!booking.trans_service_code?'1px solid red':'' }),
                                            //     indicatorContainer: provided => ({...provided,color:''})
                                            // }}
                                            /> */}
                                        </FormGroup>
                                    </Col>
                                    <Col xl="8" lg="8">
                                        <SpecialWdfc
                                            key={key}
                                            index={key}
                                            special={element}
                                            fncOnBlurSpecial={fncOnBlurSpecial}
                                            onDelSpecial={onDelSpecial}
                                            openType={openType}
                                        />
                                    </Col>
                                </Row>
                                </Collapse>
                            )
                        }
                    })}
                    </Col>
                </Row>
                </CardBody>
            </Card>
        </Col>
    </>
    );
}

const ContainerForm = (props) => {
    
    const [container, setContainer] = useState({});
    // CODE 조회 line_code_cntr_sztp
    const [lineCodeCntrSztp, setLineCodeCntrSztp] = useState([]);
    // CODE 조회 line_code_vessel_pickup
    const [lineCodeVesselPickup, setLineCodeVesselPickup] = useState([]);
    // CODE 조회 line_code_vessel_cfs
    const [lineCodeVesselCfs, setLineCodeVesselCfs] = useState([]);
    // openType CARD, BOOK
    const [openType, setOpenType] = useState("");
    const [cntrTypeReefer, setCntrTypeReefer] = useState( false );
    const [ynList, setYnList] = useState([
        {value:'Y', label:'Y'},
        {value:'N', label:'N'}
    ]);

    const [doorInput, setDoorInput] = useState(false);
    const [serviceCode, setServiceCode] = useState('');


    useEffect(() => {
        // Cargo Type 및 Pack Type 조회
        let params = {
            line_code: 'WDFC'
        }
        selectLineCodeCntrSztp(params);
    },[]);

    useEffect(() => {
      setContainer(props.container);
      setOpenType(props.openType);

      if( props.container ) {
          if ( props.container.cntr_code && props.container.cntr_code.indexOf("RE") !== -1 ) {
            setCntrTypeReefer( true );
          } else {
            setCntrTypeReefer( false );
          }
      }
    },[props.container]);
    
    useEffect(()=>{
        // serviceCode: 픽업지는 CY -> CY 또는 CFS -> CY 인 경우에 따라 달라진다.
        if( serviceCode && '3' === serviceCode ) {
            // CFS 인 경우
            if( props.booking.sch_vessel_name
                && props.booking.sch_pod
                && props.booking.sch_pol ) {
                let params = {
                    line_code: props.booking.line_code,
                    sch_vessel_name: props.booking.sch_vessel_name,
                    sch_pol: props.booking.sch_pol,
                    sch_pod: props.booking.sch_pod,
                }
                selectLineCodeVesselPortCfs(params);
            }
        } else {
            // CY 인 경우
            if( !cntrTypeReefer ) {
                if( props.booking.sch_vessel_name ) {
                    let params = {
                        line_code: props.booking.line_code,
                        sch_vessel_name: props.booking.sch_vessel_name
                    }
                    selectLineCodeVesselPickup(params);
                }
            }
        }
    }, [props.booking.sch_vessel_name]);

    useEffect(() => {
        // serviceCode: 픽업지는 CY -> CY 또는 CFS -> CY 인 경우에 따라 달라진다.
        if( serviceCode && '3' === serviceCode ) {
            // CFS 인 경우
            if( props.booking.sch_vessel_name
                && props.booking.sch_pod
                && props.booking.sch_pol ) {
                let params = {
                    line_code: props.booking.line_code,
                    sch_vessel_name: props.booking.sch_vessel_name,
                    sch_pol: props.booking.sch_pol,
                    sch_pod: props.booking.sch_pod,
                }
                selectLineCodeVesselPortCfs(params);
            }
        }
    },[props.booking.sch_pol]);

    useEffect(() => {
        // serviceCode: 픽업지는 CY -> CY 또는 CFS -> CY 인 경우에 따라 달라진다.
        if( serviceCode && '3' === serviceCode ) {
            // CFS 인 경우
            if( props.booking.sch_vessel_name
                && props.booking.sch_pod
                && props.booking.sch_pol ) {
                let params = {
                    line_code: props.booking.line_code,
                    sch_vessel_name: props.booking.sch_vessel_name,
                    sch_pol: props.booking.sch_pol,
                    sch_pod: props.booking.sch_pod,
                }
                selectLineCodeVesselPortCfs(params);
            }
        }
    },[props.booking.sch_pod]);
    
    useEffect(()=>{
        // reefer 인 경우
        if(  cntrTypeReefer ) {
            if( container.cntr_code ) {
                // 20211029 reefer 인 경우
                let params = {
                    line_code: props.booking.line_code,
                    cntr_code: container.cntr_code
                }
                selectLineCodeSztpPickup(params);
            }
        } else {
        // reefer 아닌 경우
            let params = {
                line_code: props.booking.line_code,
                sch_vessel_name: props.booking.sch_vessel_name
            }
            selectLineCodeVesselPickup(params);
        }
    }, [cntrTypeReefer])


    useEffect(()=>{
        // console.log( props.booking.trans_self_yn )
        if( "Y" === props.booking.trans_self_yn ) {
            setDoorInput(false);
            // setContainer({...container, ['cntr_door_code']:null, ['cntr_door_name1']:null, ['cntr_door_name2']:null
            // , ['cntr_door_date']:null, ['cntr_door_user_name']:null
            // , ['cntr_door_user_dept']:null, ['cntr_door_user_fax']:null
            // , ['cntr_door_user_tel']:null, ['cntr_door_user_email']:null
            // , ['cntr_door_address1']:null, ['cntr_door_address2']:null, ['cntr_door_address3']:null, ['cntr_door_address4']:null, 'cntr_door_address5':null
            // , ['cntr_remark1']:null,['cntr_remark2']:null, ['cntr_remark3']:null, ['cntr_remark4']:null, ['cntr_remark5']:null
            // });
            // props.fncOnBlur( {...container, ['cntr_door_code']:null, ['cntr_door_name1']:null, ['cntr_door_name2']:null
            // , 'cntr_door_date':null, ['cntr_door_user_name']:null
            // , 'cntr_door_user_dept':null, ['cntr_door_user_fax']:null
            // , 'cntr_door_user_tel':null, ['cntr_door_user_email']:null
            // , 'cntr_door_address1':null, ['cntr_door_address2']:null, ['cntr_door_address3']:null, ['cntr_door_address4']:null, 'cntr_door_address5':null
            // , 'cntr_remark1':null, ['cntr_remark2']:null, ['cntr_remark3']:null, ['cntr_remark4']:null,['cntr_remark5']:null
            // });
        } else if ("N" === props.booking.trans_self_yn ) {
            setDoorInput(true);
        }
    }, [props.booking.trans_self_yn]);

    // 20210809 servicecode 변경에 따라 CFS 일경우 항목 변경
    // VESSEL 명 , POL, POD 변경에 따라 바뀌어야 한다.
    useEffect(() => {
        if( props.booking.trans_service_code ) {
            setServiceCode(props.booking.trans_service_code);
            if ( '3' === props.booking.trans_service_code ) {
                if( props.booking.sch_vessel_name
                    && props.booking.sch_pod
                    && props.booking.sch_pol ) {
                    let params = {
                        line_code: props.booking.line_code,
                        sch_vessel_name: props.booking.sch_vessel_name,
                        sch_pol: props.booking.sch_pol,
                        sch_pod: props.booking.sch_pod,
                    }
                    selectLineCodeVesselPortCfs(params);
                }
            }
        }
    },[props.booking.trans_service_code]);






    // Container Size Type 목록조회
    const selectLineCodeCntrSztp = (params) => {
        axios.post(
            "/shipper/selectLineCodeCntrSztp"
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
        });
    }

    // Container VESSEL PICKUP CY 목록조회
    const selectLineCodeVesselPickup = (params) => {
        axios.post(
            "/shipper/selectLineCodeVesselPickup"
            ,{ params }
            ,{}
        ).then(res=>{
            setLineCodeVesselPickup(res.data);
            // pickup cy 조회의 경우 Vessel 정보가 변경될때 같이 변경되어야 한다.
            // Vessel 정보가 변경될 경우 기존 코드값과 일치하는게 없으면
            // cntr_pick_up_cy_code 초기화
            if( res.data.length > 0 && container.cntr_pick_up_cy_code ) {
                
                let row = res.data.find( function( item ) {
                    return item.pickup_cy_code === container.cntr_pick_up_cy_code;
                });
                if( !row ) {
                    setContainer({
                        ...container,
                        ['cntr_pick_up_cy_code']: null,
                        ['cntr_pick_up_cy_code']: null,
                        ['cntr_pick_up_cy_name1']: null,
                        ['cntr_pick_up_cy_name2']: null,
                        ['cntr_pick_up_cy_address1']: null,
                    });
                    props.fncOnBlur({
                        ...container,
                        ['cntr_pick_up_cy_code']: null,
                        ['cntr_pick_up_cy_code']: null,
                        ['cntr_pick_up_cy_name1']: null,
                        ['cntr_pick_up_cy_name2']: null,
                        ['cntr_pick_up_cy_address1']: null,
                    });
                }
            }
        });
    }
    

    // sztp는 container reefer 인 경우
    const selectLineCodeSztpPickup = (params) => {
        axios.post(
            "/shipper/selectLineCodeSztpPickup"
            ,{ params }
            ,{}
        ).then(res=>{
            setLineCodeVesselPickup(res.data);
            // pickup cy 조회의 경우 Vessel 정보가 변경될때 같이 변경되어야 한다.
            // Vessel 정보가 변경될 경우 기존 코드값과 일치하는게 없으면
            // cntr_pick_up_cy_code 초기화
            if( res.data.length > 0 && container.cntr_pick_up_cy_code ) {
                
                let row = res.data.find( function( item ) {
                    return item.pickup_cy_code === container.cntr_pick_up_cy_code;
                });
                if( !row ) {
                    setContainer({
                        ...container,
                        ['cntr_pick_up_cy_code']: null,
                        ['cntr_pick_up_cy_code']: null,
                        ['cntr_pick_up_cy_name1']: null,
                        ['cntr_pick_up_cy_name2']: null,
                        ['cntr_pick_up_cy_address1']: null,
                    });
                    props.fncOnBlur({
                        ...container,
                        ['cntr_pick_up_cy_code']: null,
                        ['cntr_pick_up_cy_code']: null,
                        ['cntr_pick_up_cy_name1']: null,
                        ['cntr_pick_up_cy_name2']: null,
                        ['cntr_pick_up_cy_address1']: null,
                    });
                }
            }
        });
    }

    // Booking Service VESSEL PICKUP CY 목록조회
    const selectLineCodeVesselPortCfs = (params) => {
        // if( params.line_code && params.sch_vessel_name && params.sch_pod && params.sch_poll) {
            axios.post(
                "/shipper/selectLineCodeVesselPortCfs"
                ,{ params }
                ,{}
            ).then(res=>{
                setLineCodeVesselCfs(res.data);
            });
        // }
    }

    // 수정된 내용은 Cargo 저장
    const fncOnChangeSelect = ( e, key ) => {
        // console.log("ㅋㅋㅋㅋㅋㅋ : ")
        // e.preventDefault();
        if ( 'cntr_code' === key ) {
            let code = e.value;

            // WDFC 인 경우 Size Type Reefer 인 경우 Frozen Tmp 입력하도록
            // console.log( props.booking.line_code, code, ("WDFC" === props.booking.line_cde 
            // && (code === '22RE' || code === '42RE' || code === '45RE')))
            if(  (code.indexOf("RE") !== -1 ) ) {
                setCntrTypeReefer( true );
                
                setContainer({...container, ['cntr_code']:code});
                props.fncOnBlur( {...container, ['cntr_code']:code} );
            } else {
                setCntrTypeReefer( false );
                // if( container.cntr_frozen_tmp) {
                    setContainer({
                        ...container,
                        ['cntr_frozen_tmp']:null,
                        ['cntr_frozen_tmp_unit']:null,
                        ['cntr_code']:code
                    });
                    props.fncOnBlur({
                        ...container,
                        ['cntr_frozen_tmp']:null,
                        ['cntr_frozen_tmp_unit']:null,
                        ['cntr_code']:code
                    });
                // }
                }
        } else if ( 'cntr_pick_up_cy_code' === key ) {
            
            // own_line_code_vessel_pickup 테이블 정보로  세팅해준다.
            // cntr_pick_up_cy_code, cntr_pick_up_cy_name1, cntr_pick_up_cy_address1
            let row = lineCodeVesselPickup.find( function( item ) {
                return item.pickup_cy_code === e.value;
            });
            if( row ) {
                setContainer({...container
                    , ['cntr_pick_up_cy_code']:row.pickup_cy_code
                    , ['cntr_pick_up_cy_name1']:row.pickup_cy_name
                    , ['cntr_pick_up_cy_name2']:null
                    , ['cntr_pick_up_cy_address1']:row.pickup_cy_addr
                    , ['cntr_pick_up_cy_address2']:null
                    , ['cntr_pick_up_cy_address3']:null
                    , ['cntr_pick_up_cy_address4']:null
                    , ['cntr_pick_up_cy_address5']:null
                    , ['cntr_cfs_code']:null
                    , ['cntr_cfs_name1']:null
                    , ['cntr_cfs_name2']:null
                    , ['cntr_cfs_address1']:null
                    , ['cntr_cfs_address2']:null
                    , ['cntr_cfs_address3']:null
                    , ['cntr_cfs_address4']:null
                    , ['cntr_cfs_address5']:null
                });
                props.fncOnBlur({...container
                    , ['cntr_pick_up_cy_code']:row.pickup_cy_code
                    , ['cntr_pick_up_cy_name1']:row.pickup_cy_name
                    , ['cntr_pick_up_cy_name2']:null
                    , ['cntr_pick_up_cy_address1']:row.pickup_cy_addr
                    , ['cntr_pick_up_cy_address2']:null
                    , ['cntr_pick_up_cy_address3']:null
                    , ['cntr_pick_up_cy_address4']:null
                    , ['cntr_pick_up_cy_address5']:null
                    , ['cntr_cfs_code']:null
                    , ['cntr_cfs_name1']:null
                    , ['cntr_cfs_name2']:null
                    , ['cntr_cfs_address1']:null
                    , ['cntr_cfs_address2']:null
                    , ['cntr_cfs_address3']:null
                    , ['cntr_cfs_address4']:null
                    , ['cntr_cfs_address5']:null
                });
            }
        } else if ( 'cntr_cfs_code' === key ) {
            // own_line_code_vessel_pickup 테이블 정보로  세팅해준다.
            // cntr_pick_up_cy_code, cntr_pick_up_cy_name1, cntr_pick_up_cy_address1
            let row = lineCodeVesselCfs.find( function( item ) {
                return item.cfs_code === e.value;
            });
            if( row ) {
                setContainer({...container
                    , ['cntr_cfs_code']:row.cfs_code
                    , ['cntr_cfs_name1']:row.cfs_name
                    , ['cntr_cfs_name2']:null
                    , ['cntr_cfs_address1']:row.cfs_address
                    , ['cntr_cfs_address2']:null
                    , ['cntr_cfs_address3']:null
                    , ['cntr_cfs_address4']:null
                    , ['cntr_cfs_address5']:null
                    , ['cntr_pick_up_cy_code']:null
                    , ['cntr_pick_up_cy_name1']:null
                    , ['cntr_pick_up_cy_name2']:null
                    , ['cntr_pick_up_cy_address1']:null
                    , ['cntr_pick_up_cy_address2']:null
                    , ['cntr_pick_up_cy_address3']:null
                    , ['cntr_pick_up_cy_address4']:null
                    , ['cntr_pick_up_cy_address5']:null
                });
                props.fncOnBlur({...container
                    , ['cntr_cfs_code']:row.cfs_code
                    , ['cntr_cfs_name1']:row.cfs_name
                    , ['cntr_cfs_name2']:null
                    , ['cntr_cfs_address1']:row.cfs_address
                    , ['cntr_cfs_address2']:null
                    , ['cntr_cfs_address3']:null
                    , ['cntr_cfs_address4']:null
                    , ['cntr_cfs_address5']:null
                    , ['cntr_pick_up_cy_code']:null
                    , ['cntr_pick_up_cy_name1']:null
                    , ['cntr_pick_up_cy_name2']:null
                    , ['cntr_pick_up_cy_address1']:null
                    , ['cntr_pick_up_cy_address2']:null
                    , ['cntr_pick_up_cy_address3']:null
                    , ['cntr_pick_up_cy_address4']:null
                    , ['cntr_pick_up_cy_address5']:null
                });
            }
        }else {
            setContainer({...container, [key]:e.value});
            props.fncOnBlur( {...container, [key]:e.value} );
        }
    }
    // 완료된 내용은 부모로 전달
    const fncOnBlur = (e) => {
        // e.preventDefault();
        // console.log("1> ",container)
        props.fncOnBlur( container );
    }
    // 수정된 내용은 container 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setContainer({...container, [key]:e.target.value.toUpperCase()});
    }
    // date type 처리
    const fncOnChangeDate = (value, key) => {
        // Object > Date 객체로변환
        let date = new Date(value);
        let yyyy = '';
        let mon  = '';
        let day  = '';

        if( Object.prototype.toString.call(date) === '[object Date]' ) {
            // date
            if( isNaN(date.getFullYear())) {
                // date is not valid
                yyyy = '';
                mon  = '';
                day  = '';
            } else {
                // date is valid
                // Date 객체에서 정보 추출
                yyyy=date.getFullYear();
                mon = date.getMonth()+1;
                day = date.getDate();
                mon = mon > 9 ? mon : "0" + mon;
                day = day > 9 ? day : "0" + day;
            }
        } else {
            // not a date
            yyyy = '';
            mon  = '';
            day  = '';
        }
        setContainer({...container, [key]:yyyy+mon+day});
        props.fncOnBlur( {...container, [key]:yyyy+mon+day} );
    }


    const fncOnPressDateInput =(e) => {
        if( "Backspace" === e.key ) {
            setContainer({...container, ['cntr_pick_up_cy_date_name']:null, ['cntr_pick_up_cy_date']:null});
            fncOnBlur(e);
        }
    }
    const fncOnChangeDateInput =(data, key)=> {
        let value = '';
        if( data ) {
            value = data.replace(/[^0-9]/g, '');
            if( value.length === 8 ) {
                let dateTime = Moment(value,'YYYYMMDD');
                if( dateTime.isValid() ) {
                    setContainer({
                        ...container,
                        ['cntr_pick_up_cy_date_name']:dateTime.format('YYYY-MM-DD'),
                        ['cntr_pick_up_cy_date']:dateTime.format('YYYYMMDD')
                    });
                    // props.fncOnBlur({
                    //     ...container,
                    //     ['cntr_pick_up_cy_date_name']:dateTime.format('YYYY-MM-DD'),
                    //     ['cntr_pick_up_cy_date']:dateTime.format('YYYYMMDD')
                    // });
                } else {
                    setContainer({
                        ...container,
                        ['cntr_pick_up_cy_date_name']:value,
                        ['cntr_pick_up_cy_date']:value
                    });
                    // props.fncOnBlur({
                    //     ...container,
                    //     ['cntr_pick_up_cy_date_name']:value,
                    //     ['cntr_pick_up_cy_date']:value
                    // });
                }
            } else {
                setContainer({
                    ...container,
                    ['cntr_pick_up_cy_date_name']:value,
                    ['cntr_pick_up_cy_date']:value,
                });
                // props.fncOnBlur({
                //     ...container,
                //     ['cntr_pick_up_cy_date_name']:value,
                //     ['cntr_pick_up_cy_date']:value
                // });
            }
        } else {
            setContainer({
                ...container,
                ['cntr_pick_up_cy_date_name']:null,
                ['cntr_pick_up_cy_date']:null,
            });
            // props.fncOnBlur({
            //     ...container,
            //     ['cntr_pick_up_cy_date_name']:null,
            //     ['cntr_pick_up_cy_date']:null,
            // });
        }
    }
    return (
      <>
        {("BOOK" === openType)?<Row>
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">Bookmark Name</Label>
                    {/* <Input type="text" name="container_bookmark_name" id="container_bookmark_name"
                        maxLength="50"
                        value={container.container_bookmark_name?container.container_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'container_bookmark_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        invalid={container.container_bookmark_name?false:('BOOK'===openType?true:false)}
                        />
                    <FormFeedback>{validation.REQ_MSG}</FormFeedback> */}

                    <InputValid 
                        type="text"
                        name="container_bookmark_name"
                        id="container_bookmark_name"
                        placeholder=""
                        maxLength="50"
                        value={container.container_bookmark_name?container.container_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'container_bookmark_name')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={'BOOK'===openType?true:false} 
                    />
                </FormGroup>
            </Col>
        </Row>:<></>}
        <Row>
            <Col xl={("BOOK" === openType)?"12":"4"} lg={("Y" === openType)?"12":"4"} md="12" sm="12">
                <FormGroup>
                    <Label className="mb-0">Size / Type</Label>
                    {/* <Input type="select" name="cntr_code" id="cntr_code"
                        placeholder=""
                        bsSize={("MAIN"===openType)?'sm':null}
                        className={("MAIN"===openType)?"pt-0 pb-0":null}
                        value={container.cntr_code?container.cntr_code:''}
                        onChange={(e) => {
                            fncOnChangeSelect(e, 'cntr_code');
                        }}
                        // onBlur={(e)=>fncOnBlur(e)}
                        invalid={container.cntr_code?false:('CARD'===openType||'MAIN'===openType?true:false)}
                        >
                        <option key={0} value={'0'}>선택</option>
                        {(lineCodeCntrSztp.length>0)?lineCodeCntrSztp.map((element,key)=>{
                            return(
                                <option key={key} value={element.cntr_code}>
                                    {element.cntr_code_name}
                                </option>
                            )
                        }):<></>}
                    </Input> */}



                    <Select
                        className="customSelect"
                        classNamePrefix="customSelect"
                        //className="react-select react-select-primary"
                        //classNamePrefix="react-select"
                        name="cntr_code"
                        placeholder=""
                        value={{value:container.cntr_code?container.cntr_code:'',
                                // label:container.cntr_code?lineCodeCntrSztp[lineCodeCntrSztp.findIndex(x=>x.cntr_code===container.cntr_code)].label:'선택'
                                label:container.cntr_code?
                                    (lineCodeCntrSztp.findIndex(x=>x.cntr_code===container.cntr_code)>=0)?
                                    lineCodeCntrSztp[lineCodeCntrSztp.findIndex(x=>x.cntr_code===container.cntr_code)].label:
                                        '선택':
                                    '선택'
                        }}
                        onChange={(e) => fncOnChangeSelect(e, 'cntr_code')}
                        options={lineCodeCntrSztp}
                        styles={{
                            control: provided => ({...provided,border:container.cntr_code?'':(('CARD'===openType||'MAIN'===openType)?'1px solid red':'') ,maxHeight:'3px'}),
                            indicatorContainer: provided => ({...provided,color:'',height:'3px'})
                        }}
                        />
                        <InputValid
                            hidden
                            type="text"
                            name="cntr_code1"
                            id="cntr_code1"
                            placeholder=""
                            maxLength="20"
                            value={container.cntr_code?container.cntr_code:''}
                            validtype="select"
                            required={container.cntr_code?'':'CARD'===openType||'MAIN'===openType?true:false} 
                            feedid="container"
                            readOnly
                        />
                    {/* <FormFeedback feedid="container">{validation.REQ_MSG}</FormFeedback> */}
                </FormGroup>
            </Col>
            <Col xl={("BOOK" === openType)?"12":"4"} lg={("Y" === openType)?"12":"4"} md="12" sm="12">
                <FormGroup>
                    <Label className="mb-0">Qty</Label>
                    {/* <Input type="text" placeholder=""
                        maxLength="4"
                        bsSize={("MAIN"===openType)?'sm':null}
                        value={container.cntr_qty?container.cntr_qty:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_qty')}
                        onBlur={(e)=>fncOnBlur(e)}
                        invalid={container.cntr_qty?false:('CARD'===openType||'MAIN'===openType?true:false)}
                        />
                    <FormFeedback>{validation.REQ_MSG}</FormFeedback> */}

                    <InputValid 
                        type="text"
                        name="cntr_qty"
                        id="cntr_qty"
                        // bsSize={("MAIN"===openType)?'sm':null}
                        placeholder=""
                        maxLength="4"
                        value={container.cntr_qty?container.cntr_qty:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_qty')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={'CARD'===openType||'MAIN'===openType?true:false} 
                        feedid="container"
                    />
                </FormGroup>
            </Col>
            <Col xl={("BOOK" === openType)?"12":"4"} lg={("Y" === openType)?"12":"4"} md="12" sm="12">
                <FormGroup>
                    <Label className="mb-0">SOC</Label>
                    {/* <Input type="select" placeholder=""
                        bsSize={("MAIN"===openType)?'sm':null}
                        className={("MAIN"===openType)?"pt-0 pb-0":null}
                        value={container.cntr_soc_yn?container.cntr_soc_yn:''}
                        onChange={(e) => {
                            fncOnChangeSelect(e, 'cntr_soc_yn');
                        }}>
                        <option key="1">선택</option>
                        <option key="2">Y</option>
                        <option key="3">N</option>
                    </Input> */}

                    <Select
                        isDisabled={true}
                        className="customSelect"
                        classNamePrefix="customSelect"
                        name="cntr_soc_yn"
                        placeholder=""
                        value={{value:container.cntr_soc_yn?container.cntr_soc_yn:'',
                                label:container.cntr_soc_yn?
                                    (ynList.findIndex(x=>x.value===container.cntr_soc_yn)>=0)?
                                    ynList[ynList.findIndex(x=>x.value===container.cntr_soc_yn)].label:
                                        '선택':
                                    '선택'
                        }}
                        onChange={(e) => fncOnChangeSelect(e, 'cntr_soc_yn')}
                        options={ynList}
                        // styles={{
                        //     control: provided => ({...provided,border:container.cntr_code?'':('CARD'===openType||'MAIN'===openType?'1px solid red':'')?'1px solid red':'' }),
                        //     indicatorContainer: provided => ({...provided,color:''})
                        // }}
                        />
                </FormGroup>
            </Col>
        </Row>

        <Row>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    {
                        ("BOOK" === openType)?<></>:
                        (serviceCode && '3' === serviceCode ) 
                        ?
                            <>
                                <Label className="mb-0">반입 CFS</Label>
                                <Select
                                    className="customSelect"
                                    classNamePrefix="customSelect"
                                    name="cntr_cfs_code"
                                    placeholder=""
                                    value={{value:container.cntr_cfs_code?container.cntr_cfs_code:'',
                                            label:container.cntr_cfs_code?
                                                (lineCodeVesselCfs.findIndex(x=>x.value===container.cntr_cfs_code)>=0)?
                                                lineCodeVesselCfs[lineCodeVesselCfs.findIndex(x=>x.value===container.cntr_cfs_code)].label:
                                                    '선택':
                                                '선택'
                                    }}
                                    onChange={(e) => fncOnChangeSelect(e, 'cntr_cfs_code')}
                                    options={lineCodeVesselCfs}
                                    styles={{
                                        control: provided => ({...provided,border:container.cntr_cfs_code?'':('CARD'===openType||'MAIN'===openType?'1px solid red':'')}),
                                        indicatorContainer: provided => ({...provided,color:''})
                                    }}
                                    />
                                <InputValid
                                    hidden
                                    type="text"
                                    name="cntr_cfs_code1"
                                    id="cntr_cfs_code1"
                                    placeholder=""
                                    maxLength="20"
                                    value={container.cntr_cfs_code?container.cntr_cfs_code:''}
                                    validtype="select"
                                    required={container.cntr_cfs_code?'':'CARD'===openType||'MAIN'===openType?true:false} 
                                    feedid="container"
                                    readOnly
                                />
                            </>
                        :
                            <>
                                <Label className="mb-0">Pick Up CY</Label>
                                <Select
                                    className="customSelect"
                                    classNamePrefix="customSelect"
                                    //className="react-select react-select-primary"
                                    //classNamePrefix="react-select"
                                    name="cntr_pick_up_cy_code"
                                    placeholder=""
                                    value={{value:container.cntr_pick_up_cy_code?container.cntr_pick_up_cy_code:'',
                                            // label:container.cntr_pick_up_cy_code?lineCodeVesselPickup[lineCodeVesselPickup.findIndex(x=>x.value===container.cntr_pick_up_cy_code)].label:'선택'
                                            label:container.cntr_pick_up_cy_code?
                                                (lineCodeVesselPickup.findIndex(x=>x.value===container.cntr_pick_up_cy_code)>=0)?
                                                lineCodeVesselPickup[lineCodeVesselPickup.findIndex(x=>x.value===container.cntr_pick_up_cy_code)].label:
                                                    '선택':
                                                '선택'
                                    }}
                                    onChange={(e) => fncOnChangeSelect(e, 'cntr_pick_up_cy_code')}
                                    options={lineCodeVesselPickup}
                                    styles={{
                                        control: provided => ({...provided,border:container.cntr_pick_up_cy_code?'':('CARD'===openType||'MAIN'===openType?'1px solid red':'')}),
                                        indicatorContainer: provided => ({...provided,color:''})
                                        
                                    }}
                                    />
                                <InputValid
                                    hidden
                                    type="text"
                                    name="cntr_pick_up_cy_code1"
                                    id="cntr_pick_up_cy_code1"
                                    placeholder=""
                                    maxLength="20"
                                    value={container.cntr_pick_up_cy_code?container.cntr_pick_up_cy_code:''}
                                    validtype="select"
                                    required={container.cntr_pick_up_cy_code?'':'CARD'===openType||'MAIN'===openType?true:false} 
                                    feedid="container"
                                    readOnly
                                />
                            </>
                    }
                </FormGroup>
            </Col>
            {("BOOK" === openType)?<></>:
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Pick Up Date</Label>
                    <InputValid 
                        type="text"
                        name="date_test"
                        id="date_test"
                        // bsSize={("MAIN"===openType)?'sm':null}
                        placeholder="날짜을(를) 입력하세요. (예: 20210101)"
                        maxLength="10"
                        value={container.cntr_pick_up_cy_date_name?container.cntr_pick_up_cy_date_name:''}
                        onChange={(e)=>fncOnChangeDateInput(e.target.value, 'cntr_pick_up_cy_date_name')}
                        onKeyDown={(e)=>fncOnPressDateInput(e)}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="yyyymmdd"
                        required={container.cntr_pick_up_cy_date_name?'':'CARD'===openType||'MAIN'===openType?true:false} 
                        feedid="container"
                        autoComplete="off"
                    />
                </FormGroup>
            </Col>}
            {/* <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">CY Name</Label>
                    <InputValid 
                        type="text"
                        name="cntr_pick_up_cy_name1"
                        id="cntr_pick_up_cy_name1"
                        bsSize={("MAIN"===openType)?'sm':null}
                        placeholder=""
                        maxLength="35"
                        value={container.cntr_pick_up_cy_name1?container.cntr_pick_up_cy_name1:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_pick_up_cy_name1')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false}
                        feedid="container"
                    />
                </FormGroup>
            </Col> */}
            {/* <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0"></Label>
                    <InputValid 
                        type="text"
                        name="cntr_pick_up_cy_name2"
                        id="cntr_pick_up_cy_name2"
                        bsSize={("MAIN"===openType)?'sm':null}
                        placeholder=""
                        maxLength="35"
                        value={container.cntr_pick_up_cy_name2?container.cntr_pick_up_cy_name2:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_pick_up_cy_name2')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false}
                        feedid="container"
                    />
                </FormGroup>
            </Col> */}
        </Row>
        <Row>
            <Col xl="12" lg="12" md="12">
                <Collapse isOpen={cntrTypeReefer}>
                    <Row>

                        <Col xl={("BOOK" === openType)?"12":"6"} lg={("BOOK" === openType)?"12":"6"} md="12">
                            <FormGroup>
                                <Label className="mb-0">Frozen Tmp</Label>
                                <InputValid 
                                    type="text"
                                    name="cntr_frozen_tmp"
                                    id="cntr_frozen_tmp"
                                    // bsSize={("MAIN"===openType)?'sm':null}
                                    placeholder=""
                                    maxLength="15"
                                    value={container.cntr_frozen_tmp?container.cntr_frozen_tmp:''}
                                    onChange={(e)=>fncOnChange(e, 'cntr_frozen_tmp')}
                                    onBlur={(e) => {fncOnBlur(e)}}
                                    validtype="text"
                                    required={false} 
                                    feedid="container"
                                    inputgrouptext="&#8451;"
                                />
                            </FormGroup>
                        </Col>
                        <Col xl={("BOOK" === openType)?"12":"6"} lg={("BOOK" === openType)?"12":"6"} md="12" style={{textAlign: 'center'}}>
                            <Badge color="danger" size="large" style={{marginTop: '25px', fontSize: '15px'}}>*  냉동 CNTR 픽업지: 선광종합물류  *</Badge>
                            {/* <Label style={{paddingTop: '30px', color:'danger'}}>*  냉동 CNTR 픽업지: 선광종합물류  *</Label> */}
                        </Col>
                    </Row>
                </Collapse>
            </Col>
            
        </Row>


     
      </>
    );
}

export {ContainerWdfc, ContainerForm};