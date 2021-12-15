/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect, forwardRef } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse, UncontrolledTooltip,
    Button,Card, FormGroup, Label} from "reactstrap";
import CargoWdfc from "./CargoWdfc.js";
import CargoBookmarkWdfc from "./CargoBookmarkWdfc.js";
import axios from "axios";
import Select from "react-select";
import GoodsWdfc from './GoodsWdfc.js';
//import * as validation from 'components/common/validation.js';
import InputValid from "components/CustomInput/InputValid.js";

const CargoCardWdfc = forwardRef((props, cargoFocus) => {
    // Collapse Flag
    const [coll, setColl] = useState(false);
    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // Cargo
    const [booking, setBooking] = useState({});
    // Cargo
    const [cargo, setCargo] = useState({});
    // Cargo Bookmark 목록
    const [cargoBookmarkList, setCargoBookmarkList] = useState([]);
    // Goods Bookmark 목록
    const [goodsBookmarkList, setGoodsBookmarkList] = useState([]);
    // Goods 입력
    const [goodsRelationList, setGoodsRelationList] = useState([]);
    // 콤보박스
    const [cargoTypeList, setCargoTypeList] = useState([]);
    const [cargoPackTypeList, setCargoPackTypeList] = useState([]);
    const [serviceCode, setServiceCode] = useState("");
    const {user, dangerTrue} = props;

    useEffect(() => {
        if( user && user.user_no ) {
            selectBookingCargoGoodsBookmark();
            // Cargo Type 및 Pack Type 조회
            let params = {
                line_code: 'WDFC'
            }
            selectLineCodeCargoType(params);
            selectLineCodeCargoPackType(params);
        }
    },[user]);

    useEffect(()=>{
        setColl(props.openWindow);
    },[props.openWindow]);

    // 20210305 Card 내에서의 저장행위는 중지 하도록 한다.
    useEffect(() => {
        // console.log("props.cargo")
        setCargo({
            ...cargo,
            ...props.cargo
        });
    },[props.cargo]);

    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        if( props.booking.bkg_no ) {
            // console.log(props.booking.bookmark_yn, props.booking.bookmark_seq)
            // 전체북마크로 수정하는 경우
            if( "Y" === props.booking.bookmark_yn && props.booking.bookmark_seq ) {
                if( props.booking.cargo_bookmark_seq ) {
                    setBooking(props.booking);
                    setCargo(props.booking);
                    props.fncCargoParent(props.booking);
                    selectBookingCargoBookmarkRelation( props.booking );
                }
            } else if ( "D" === props.booking.bookmark_yn ) {
                setCargo({...cargo
                    ,'cargo_bookmark_seq': null
                    ,'cargo_bookmark_name': null
                    ,'cargo_pack_qty': null
                    ,'cargo_pack_type': null
                    ,'cargo_pack_type_name': null
                    ,'cargo_total_volume': null
                    ,'cargo_type': null
                    ,'cargo_type_name': null
                    ,'cargo_weight': null
                    // ,'cargo_selected_yn':'Y'
                });

                props.fncCargoParent({...cargo
                    ,'cargo_bookmark_seq': null
                    ,'cargo_bookmark_name': null
                    ,'cargo_pack_qty': null
                    ,'cargo_pack_type': null
                    ,'cargo_pack_type_name': null
                    ,'cargo_total_volume': null
                    ,'cargo_type': null
                    ,'cargo_type_name': null
                    ,'cargo_weight': null
                    // ,'cargo_selected_yn':'Y'
                });

                setGoodsRelationList([{}]);
                props.fncGoodsParent([{}]);
            }else {
                setBooking(props.booking);
                // if( props.booking.bkg_no != booking.bkg_no ) {
                //     selectCargoOfBooking(props.booking);
                //     setBooking(props.booking);
                // }
            }

        // console.log(">>>>>>",cargo);
        }
    },[props.booking]);


    useEffect(() => {
        if( props.booking.trans_service_code ) {
            setServiceCode(props.booking.trans_service_code);
        }
    },[props.booking.trans_service_code]);

    useEffect(()=>{
        setCargoBookmarkList(props.cargoBookmarkList);
    },[props.cargoBookmarkList]);

    useEffect(()=>{
        // props.fncGoodsParent(goodsRelationList);
    }, [goodsRelationList]);

    // Cargo Bookmark 선택
    const fncSelectCargo=(e)=>{
        //   console.log(e.target.value)
        // 선택
        if( e ) {
            if( 1 > e.value ) {
                // setBooking({});
                if ( coll ) {
                    setColl(!coll)
                }
            // 그외 데이터인 경우
            } else {
                cargoBookmarkList.map((element, key)=>{
                if( e.value == element.cargo_bookmark_seq) {
                    // console.log(element)
                    // select로 새로운 document를 세팅한다
                    // 기존 Booking 정보
                    let cargo_type_name = '';
                    cargoTypeList.map((row, i ) => {
                        if( element.cargo_type == row.cargo_type ) {
                            cargo_type_name = "["+row.cargo_type_kr_desc+"]"+row.cargo_type_desc;
                        }
                    });
                    let cargo_pack_type_name = '';
                    cargoPackTypeList.map((row, i ) => {
                        if( element.cargo_pack_type == row.cargo_pack_type ) {
                            cargo_pack_type_name = row.cargo_pack_type_desc;
                        }
                    });
    
    
    
                    setCargo({...cargo
                        ,'cargo_bookmark_seq': element.cargo_bookmark_seq
                        ,'cargo_bookmark_name': element.cargo_bookmark_name
                        // ,'cargo_name':element.cargo_name
                        // ,'cargo_hs_code':element.cargo_hs_code
                        ,'cargo_pack_qty': element.cargo_pack_qty?element.cargo_pack_qty:cargo.cargo_pack_qty
                        ,'cargo_pack_type': element.cargo_pack_type?element.cargo_pack_type:cargo.cargo_pack_type
                        ,'cargo_pack_type_name': cargo_pack_type_name?cargo_pack_type_name:cargo.cargo_pack_type_name
                        // ,'cargo_remark':element.cargo_remark
                        ,'cargo_total_volume': element.cargo_total_volume?element.cargo_total_volume:cargo.cargo_total_volume
                        // ,'cargo_total_weight':element.cargo_total_weight
                        ,'cargo_type': element.cargo_type?element.cargo_type:cargo.cargo_type
                        ,'cargo_type_name': cargo_type_name?cargo_type_name:cargo.cargo_type_name
                        ,'cargo_weight': element.cargo_weight?element.cargo_weight:cargo.cargo_weight
                        // ,'cargo_selected_yn':'Y'
                    });
    
                    props.fncCargoParent({...cargo
                        ,'cargo_bookmark_seq': element.cargo_bookmark_seq
                        ,'cargo_bookmark_name': element.cargo_bookmark_name
                        // ,'cargo_name':element.cargo_name
                        // ,'cargo_hs_code':element.cargo_hs_code
                        ,'cargo_pack_qty': element.cargo_pack_qty?element.cargo_pack_qty:cargo.cargo_pack_qty
                        ,'cargo_pack_type': element.cargo_pack_type?element.cargo_pack_type:cargo.cargo_pack_type
                        ,'cargo_pack_type_name': cargo_pack_type_name?cargo_pack_type_name:cargo.cargo_pack_type_name
                        // ,'cargo_remark':element.cargo_remark
                        ,'cargo_total_volume': element.cargo_total_volume?element.cargo_total_volume:cargo.cargo_total_volume
                        // ,'cargo_total_weight':element.cargo_total_weight
                        ,'cargo_type': element.cargo_type?element.cargo_type:cargo.cargo_type
                        ,'cargo_type_name': cargo_type_name?cargo_type_name:cargo.cargo_type_name
                        ,'cargo_weight': element.cargo_weight?element.cargo_weight:cargo.cargo_weight
                        // ,'cargo_selected_yn':'Y'
                    });
    
                    selectBookingCargoBookmarkRelation( element );
                    
                }
                });
                if ( !coll ) {
                    setColl(!coll);
                }
            }
        } else {
            if( cargo.cargo_bookmark_seq) {

                setCargo({...cargo
                    ,'cargo_bookmark_seq': null
                    ,'cargo_bookmark_name': null
                    ,'cargo_pack_qty': null
                    ,'cargo_pack_type': null
                    ,'cargo_pack_type_name': null
                    ,'cargo_total_volume': null
                    ,'cargo_type': null
                    ,'cargo_type_name': null
                    ,'cargo_weight': null
                    // ,'cargo_selected_yn':'Y'
                });

                props.fncCargoParent({...cargo
                    ,'cargo_bookmark_seq': null
                    ,'cargo_bookmark_name': null
                    ,'cargo_pack_qty': null
                    ,'cargo_pack_type': null
                    ,'cargo_pack_type_name': null
                    ,'cargo_total_volume': null
                    ,'cargo_type': null
                    ,'cargo_type_name': null
                    ,'cargo_weight': null
                    // ,'cargo_selected_yn':'Y'
                });

                setGoodsRelationList([{}]);
                props.fncGoodsParent([{}]);
                
            }
        }
    }





    // Cargo Bookmark 조회
    const selectBookingCargoGoodsBookmark = () => {
        axios.post(
            "/shipper/selectBookingCargoGoodsBookmark"
            ,{ user_no: user?user.user_no:null }
            ,{}
        ).then(
            res => {
                setGoodsBookmarkList(res.data);
            }
        );
    }

    // Cargo Type 목록조회
    const selectLineCodeCargoType = (params) => {
        axios.post(
            "/shipper/selectLineCodeCargoType"
            ,{ params }
            ,{}
        ).then(res=>{
            // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",res.data)
            setCargoTypeList(res.data);
            // if( !cargo.cargo_type ) {
            //     setCargo({...booking, ['cargo_type']:res.data[0].cargo_type});
            // }
        });
    }
    // Cargo Pack Type 목록조회
    const selectLineCodeCargoPackType = (params) => {
        axios.post(
            "/shipper/selectLineCodeCargoPackType"
            ,{ params }
            ,{}
        ).then(res=>{
            setCargoPackTypeList(res.data);
            // if( !cargo.cargo_pack_type ) {
            //     setCargo({...booking, ['cargo_pack_type']:res.data[0].cargo_pack_type});
            // }
        });
    }

    // Cargo Bookmark 조회
    const selectBookingCargoBookmarkRelation = ( cargo ) => {
        axios.post(
            "/shipper/selectBookingCargoBookmarkRelation"
            ,{ 
            user_no: user?user.user_no:null,
            cargo
        }
            ,{}
        ).then(
            res => {
                if( 0 < res.data.length ) {
                    setGoodsRelationList(res.data);
                    props.fncGoodsParent(res.data);
                }
            }
        );
    }

    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('');
        setOpen(!open);
    }

    const fncOnBlur = (cargo) => {
        // setCargo(cargo);
        props.fncCargoParent( cargo );
    }
    const fncOnBlurGoodsRelation = (goodsRelationList) => {
        props.fncCargoParent( cargo );
        setGoodsRelationList(goodsRelationList);
        props.fncGoodsParent(goodsRelationList);
    }
    // 수정된 내용은 cargo 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setCargo({...cargo, [key]:e.target.value.toUpperCase()});
    }
    // 수정된 내용은 Cargo 저장
    const fncOnChangeSelect = ( e, key ) => {
        // console.log(booking.line_code, key, e.cargo_type)
        if( e ) {
            if( 'cargo_type' === key ) {
                if( "WDFC"=== booking.line_code && ("3" === e.cargo_type || "4" === e.cargo_type) ) {
                    props.onNotiAlert("danger", "위험물 또는 OOG 부킹은 별도 문의 바랍니다.");
                    return false;
                }
                setCargo({...cargo, 'cargo_type':e.cargo_type});
                props.fncCargoParent({...cargo, 'cargo_type':e.cargo_type});
            }
            if( 'cargo_pack_type' === key ) {
                setCargo({...cargo, 'cargo_pack_type':e.cargo_pack_type});
                props.fncCargoParent({...cargo, 'cargo_pack_type':e.cargo_pack_type});
            }
        } else {
            setCargo({...cargo, [key]:null});
            props.fncCargoParent({...cargo, [key]:null});
        }
    }
  return (
    <>
        <Row id="Cargo">
            <Col xl="12" lg="12">
                <Card>
                    <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>  
                        <Row className="pb-2">
                            <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>CARGO
                                <Button className="pl-1" color="link" id="lineview" onClick={toggle.bind(this, 'S')}><i className="fa fa-pencil-square-o fa-2x"/></Button>
                                <UncontrolledTooltip delay={0} target="lineview">Input</UncontrolledTooltip>
                            </Col>
                            <Col>
                                <Row>
                                    <Col className="col-10 pr-0" style={{zIndex:'15'}}>
                                        <Select
                                            className="react-select react-select-primary"
                                            classNamePrefix="react-select"
                                            name="cargoBookmark"
                                            value={{
                                                value:cargo.cargo_bookmark_seq?cargo.cargo_bookmark_seq:'',
                                                label:cargo.cargo_bookmark_name?cargo.cargo_bookmark_name:'선택'
                                            }}
                                            onChange={(e)=>fncSelectCargo(e?e:null)}
                                            options={cargoBookmarkList}
                                            placeholder={"선택"}
                                            ref={cargoFocus}
                                            isClearable={cargo.cargo_bookmark_seq?true:false}
                                        />
                                    </Col>
                                    <Col className="col-2 pl-auto pr-auto">
                                        <CargoBookmarkWdfc
                                            cargoBookmarkList={cargoBookmarkList}
                                            goodsBookmarkList={goodsBookmarkList}
                                            selectBookingCargoBookmark={props.selectBookingCargoBookmark}
                                            selectBookingCargoGoodsBookmark={selectBookingCargoGoodsBookmark}
                                            cargoTypeList={cargoTypeList}
                                            cargoPackTypeList={cargoPackTypeList}
                                            onAlert={props.onAlert}
                                            bookingCarog={cargo}
                                            {...props}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Collapse isOpen={coll}>
                            <hr className="mt-0"/>
                            <div >

                                <Row>
                                    <Col xl="12" lg="12" md="12" style={{zIndex:'12'}}>
                                        <FormGroup className="mb-1">
                                            <Row>
                                                <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Type</Label></Col>
                                                <Col>
                                                <Select 
                                                    className="customSelect"
                                                    classNamePrefix="customSelect"
                                                    //className="react-select react-select-primary"
                                                    //classNamePrefix="react-select"
                                                    name="cargo_type"
                                                    placeholder=""
                                                    value={{value:cargo.cargo_type?cargo.cargo_type:'',
                                                            label:cargo.cargo_type?
                                                            (cargoTypeList.findIndex(x=>x.cargo_type===cargo.cargo_type)>=0)?
                                                            cargoTypeList[cargoTypeList.findIndex(x=>x.cargo_type===cargo.cargo_type)].label:
                                                                '선택':
                                                            '선택'
                                                    }}
                                                    onChange={(value)=>fncOnChangeSelect(value, 'cargo_type')}
                                                    options={cargoTypeList}
                                                    isClearable={cargo.cargo_type?true:false}
                                                    />
                                                {/* <FormFeedback>{validation.REQ_MSG}</FormFeedback> */}
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl="12" lg="12" md="12" style={{zIndex:'10'}}>
                                        <FormGroup className="mb-1">
                                            <Row>
                                                <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Pack Type</Label></Col>
                                                <Col>
                                                <Select 
                                                    className="customSelect"
                                                    classNamePrefix="customSelect"
                                                    //className="react-select react-select-primary"
                                                    //classNamePrefix="react-select"
                                                    name="cargo_pack_type"
                                                    placeholder=""
                                                    value={{value:cargo.cargo_pack_type?cargo.cargo_pack_type:''
                                                    ,label:cargo.cargo_pack_type?
                                                        (cargoPackTypeList.findIndex(x=>x.cargo_pack_type===cargo.cargo_pack_type)>=0)?
                                                            cargoPackTypeList[cargoPackTypeList.findIndex(x=>x.cargo_pack_type===cargo.cargo_pack_type)].label:
                                                            '선택':
                                                        '선택'}}
                                                    onChange={(value)=>fncOnChangeSelect(value, 'cargo_pack_type')}
                                                    options={cargoPackTypeList}
                                                    styles={{
                                                        control: provided => ({...provided,border:!cargo.cargo_pack_type&& '3' === serviceCode?'1px solid red':'' }),
                                                        indicatorContainer: provided => ({...provided,color:''})
                                                    }}
                                                    isClearable={cargo.cargo_pack_type?true:false}
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
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </Col>
                                    <Col xl="12" lg="12" md="12">
                                        <FormGroup className="mb-1">
                                            <Row>
                                                <Col className="pr-0 pt-1 col-2"><Label className="mb-0">PackQty</Label></Col>
                                                <Col>
                                                <InputValid 
                                                    type="text"
                                                    name="cargo_pack_qty"
                                                    id="cargo_pack_qty"
                                                    placeholder=""
                                                    maxLength="4"
                                                    bsSize="sm"
                                                    value={cargo.cargo_pack_qty?cargo.cargo_pack_qty:''}
                                                    onChange={(e)=>fncOnChange(e, 'cargo_pack_qty')}
                                                    onBlur={(e) => {props.fncCargoParent(cargo)}}
                                                    validtype="number"
                                                    required={('3' === serviceCode)?true:false} 
                                                    feedid="cargo"
                                                />
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl="12" lg="12" md="12">
                                        <FormGroup className="mb-1">
                                            <Row>
                                                <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Weight</Label></Col>
                                                <Col>
                                                {/* <Input type="text" name="cargo_weight" id="cargo_weight"
                                                    bsSize="sm"
                                                    placeholder=""
                                                    maxLength="10"
                                                    value={cargo.cargo_weight?cargo.cargo_weight:''}
                                                    onChange={(e)=>fncOnChange(e, 'cargo_weight')}
                                                    onBlur={(e) => {props.fncCargoParent(cargo)}}
                                                    /> */}
                                                <InputValid 
                                                    type="text"
                                                    name="cargo_weight"
                                                    id="cargo_weight"
                                                    placeholder=""
                                                    maxLength="10"
                                                    bsSize="sm"
                                                    value={cargo.cargo_weight?cargo.cargo_weight:''}
                                                    onChange={(e)=>fncOnChange(e, 'cargo_weight')}
                                                    onBlur={(e) => {props.fncCargoParent(cargo)}}
                                                    validtype="number"
                                                    required={false} 
                                                    feedid="cargo"
                                                    inputgrouptext="kg"
                                                />
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </Col>
                                    <Col xl="12" lg="12" md="12">
                                        <FormGroup className="mb-1">
                                            <Row>
                                                <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Volume</Label></Col>
                                                <Col>
                                                {/* <Input type="text" name="cargo_total_volume" id="cargo_total_volume"
                                                    bsSize="sm"
                                                    placeholder=""
                                                    maxLength="10"
                                                    value={cargo.cargo_total_volume?cargo.cargo_total_volume:''}
                                                    onChange={(e)=>fncOnChange(e, 'cargo_total_volume')}
                                                    onBlur={(e) => {props.fncCargoParent(cargo)}}
                                                    /> */}
                                                <InputValid 
                                                    type="text"
                                                    name="cargo_total_volume"
                                                    id="cargo_total_volume"
                                                    placeholder=""
                                                    maxLength="10"
                                                    bsSize="sm"
                                                    value={cargo.cargo_total_volume?cargo.cargo_total_volume:''}
                                                    onChange={(e)=>fncOnChange(e, 'cargo_total_volume')}
                                                    onBlur={(e) => {props.fncCargoParent(cargo)}}
                                                    validtype="number"
                                                    required={false} 
                                                    feedid="cargo"
                                                    inputgrouptext="CBM"
                                                />
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </div>
                            <hr />
                            <GoodsWdfc 
                                zIndex={1}
                                cargo={booking}
                                goodsRelationList={goodsRelationList}
                                goodsBookmarkList={goodsBookmarkList}
                                fncOnBlur={fncOnBlur}
                                fncOnBlurGoodsRelation={fncOnBlurGoodsRelation}
                                openType="MAIN"
                                {...props}/>
                        </Collapse>
                        <div className="text-center" onClick={() => setColl(!coll)}>
                            <div>         
                                <Button className="p-0" color="link" id="linemore" onClick={() => setColl(!coll)} style={{height:'21px'}}>
                                    {coll?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
                                </Button>
                                <UncontrolledTooltip delay={0} target="linemore">{coll?'Close':'Open'}</UncontrolledTooltip>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        {/* 모달 팝업 영역 
        xs : 한 줄
        sm : 576px 에서 다음 줄로 넘어감
        md : 768px
        lg : 992px
        xl : 1200px
        fluid : 뷰포트 전체의 너비
        */}
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="lg">
            <ModalHeader toggle={toggle}>Cargo</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <CargoWdfc
                            zIndex={20}
                            cargo={cargo}
                            fncOnBlur={fncOnBlur}
                            openType={"CARD"}
                            cargoTypeList={cargoTypeList}
                            cargoPackTypeList={cargoPackTypeList}
                            serviceCode={serviceCode}
                            {...props}/>
                        <hr className="border-secondary"/>
                        <GoodsWdfc
                            zIndex={1}
                            cargo={booking}
                            goodsBookmarkList={goodsBookmarkList}
                            goodsRelationList={goodsRelationList}
                            fncOnBlur={fncOnBlur}
                            fncOnBlurGoodsRelation={fncOnBlurGoodsRelation}
                            openType="CARD"
                            {...props}/>
                    </CardBody>
                </ModalBody>
            <ModalFooter>
                {/* <Button color="primary" onClick={(e)=>updateCargoOfBooking()}>Save</Button>{' '} */}
                <Button color="primary" onClick={(e)=>toggle}>Apply</Button>{' '}
                {/* <Button color="secondary" onClick={toggle}>Cancel</Button> */}
            </ModalFooter>
        </Modal>
    </>
    );
});

export default CargoCardWdfc;