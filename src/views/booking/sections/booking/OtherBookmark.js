/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, UncontrolledTooltip
    , CardBody, Button,FormGroup, Table, Label} from "reactstrap";
import axios from 'axios';
import * as validation from 'components/common/validation.js';
import InputValid from "components/CustomInput/InputValid.js";
import Select from "react-select";
//import { options } from 'headroom.js';

const OtherBookmark = (props) => {
    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    const [clsNm, setClsNm] = useState("");
    const [other, setOther] = useState({});
    const [otherList, setOtherList] = useState([]);
    const [paymentList, setPaymentList] = useState([
        {value: 'P', label: '선불'},
        {value: 'C', label: '후불'}
    ]);
    const {user, serviceList} = props;
    
    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }

    useEffect(() => {
        // selectBookingOtherBookmark();
    },[]);

    useEffect(() => {
        setOtherList(props.otherList);
    },[props.otherList]);

    useEffect(() => {
        setOther(props.booking);
    },[props.booking]);

    // 신규 추가 시
    const fncOther = () => {
        setOther({
            other_bookmark_seq: '',
            other_bookmark_name: '',
            sc_no: '',
            remark1: '',
            remark2: ''
        });
    }

    // save
    const saveOtherBookmark = () => {
        if( !user ) {
            props.onNotiAlert("error",validation.NOTLOGIN_MSG);
        }
        
        if( !other.other_bookmark_name ) return false;
        if( !other.sc_no ) return false;
        if( other.other_bookmark_seq ) {
            updateBookingOtherBookmark();
        } else {
            insertBookingOtherBookmark();
        }
    }

    // 입력
    const insertBookingOtherBookmark = () => {
        const body =
        axios.post(
            "/shipper/insertBookingOtherBookmark"
            ,{
                user_no : user.user_no,
                other
            }
            ,{}
        ).then(
            res=>{
                props.selectBookingOtherBookmark();
                props.onAlert("success", validation.SAVE_MSG);
            }
        );
    }

    // 수정
    const updateBookingOtherBookmark = () => {
        axios.post(
            "/shipper/updateBookingOtherBookmark"
            ,{ 
                user_no : user.user_no,
                other 
            }
            ,{}
        ).then(
            res=>{
                props.selectBookingOtherBookmark();
                props.onAlert("success", validation.SAVE_MSG);
            }
        );
    }

    // 삭제
    const deleteBookingOtherBookmark = (e) => {
        e.preventDefault();
        if( !other.other_bookmark_seq ) {
            props.onNotiAlert("danger", "삭제할 Bookmark를 선택하세요.");
            return false;
        }
        axios.post(
            "/shipper/deleteBookingOtherBookmark"
            ,{ other }
            ,{}
        ).then(
            res => {
                props.selectBookingOtherBookmark();
                props.onAlert("success",validation.DEL_MSG);
                setOther({});
            }
        );
    }

    const fncOnChange = (e, key) => {
        e.preventDefault();
        setOther({...other, [key]:e.target.value.toUpperCase()});
    }

    const fncSelectedOther =(e) => {
        e.preventDefault();
        props.setOther(other);
        props.updateOtherofBooking();
        setOpen(!open);
    }

  return (
    <>
        <Button className="pl-0 pr-0" 
            color="link" id="linebookmark"
            onClick={toggle.bind(this, 'B')}>
                <i className="fa fa-bookmark-o fa-2x" />
        </Button>
        <UncontrolledTooltip delay={0} target="linebookmark">Bookmark</UncontrolledTooltip>
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="lg">
            <ModalHeader toggle={toggle}>Booking Bookmark</ModalHeader>
            <ModalBody className={clsNm}>
                <Row>
                    <Col>BookMark List</Col>
                </Row>
                <Row className="mb-3">
                    <Col xl="12" lg="12" md="12">
                        <FormGroup style={{height:'150px',overflow:'auto'}} className="mb-0">
                                <CardBody className="bg-white p-0">
                                    <Table className="mb-0" responsive hover size="sm">
                                        <thead>
                                            <tr>
                                                <td className="p-2 bg-info">Bookmark</td>
                                                <td className="p-2 bg-info">Sc Number</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {otherList.map((element,key)=>{
                                            return(
                                                <tr scope="row" key={key}
                                                    onClick={()=>{setOther(element)}}
                                                    // onDoubleClick={()=>fncDoubleClick(element)}
                                                    style={element.other_bookmark_seq===other.other_bookmark_seq?{backgroundColor:'aliceblue'}:{backgroundColor:''}}
                                                    >
                                                    <td>{element.other_bookmark_name}</td>
                                                    <td>{element.sc_no}</td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </Table>
                                </CardBody>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>BookMark Input</Col>
                </Row>
                <hr className="m-2"/>
                <Row className="mb-3">
                    <Col xl="6" lg="6" md="12">
                        <FormGroup>
                            <Label className="mb-0">Bookmark Name</Label>
                            {/* <Input type="text" name="other_bookmark_name"
                                id="other_bookmark_name"
                                placeholder=""
                                maxLength="50"
                                value={other.other_bookmark_name?other.other_bookmark_name:''}
                                onChange={(e)=>fncOnChange(e, 'other_bookmark_name')}
                                invalid={other.other_bookmark_name?false:true}
                                />
                            <FormFeedback>{validation.REQ_MSG}</FormFeedback> */}

                            <InputValid 
                                type="text"
                                bsSize="sm"
                                name="other_bookmark_name"
                                id="other_bookmark_name"
                                placeholder=""
                                maxLength="50"
                                value={other.other_bookmark_name?other.other_bookmark_name:''}
                                onChange={(e)=>fncOnChange(e, 'other_bookmark_name')}
                                validtype="text" 
                                required={true}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xl="6" lg="6" md="12">
                        <FormGroup>
                            <Label className="mb-0">SC Number</Label>
                            {/* <Input type="text" name="sc_no"
                                id="sc_no" placeholder=""
                                maxLength="20"
                                value={other.sc_no?other.sc_no:''}
                                onChange={(e)=>fncOnChange(e, 'sc_no')}
                                invalid={other.sc_no?false:true}
                                />
                            <FormFeedback>{validation.REQ_MSG}</FormFeedback> */}

                            <InputValid 
                                type="text"
                                bsSize="sm"
                                name="sc_no"
                                id="sc_no"
                                placeholder=""
                                maxLength="10"
                                minLength="10"
                                value={other.sc_no?other.sc_no:''}
                                onChange={(e)=>fncOnChange(e, 'sc_no')}
                                validtype="text" 
                                required={false}
                            />
                        </FormGroup>
                    </Col>
                    <Col xl="6" lg="6" md="6">
                        <FormGroup className="mb-1">
                            <Label className="mb-0">Term</Label>
                            {/* <Input type="select" name="trans_service_code" id="trans_service_code"
                                bsSize="sm"
                                placeholder=""
                                className="pt-0 pb-0"
                                value={other.trans_service_code?other.trans_service_code:''}
                                onChange={(e)=>fncOnChange(e, 'trans_service_code')}
                                >
                                <option key={0} value={'0'}>
                                    선택
                                </option>
                                {(serviceList.length>0)?serviceList.map((element,key)=>{
                                    return(
                                        <option key={key} value={element.service_code}>
                                            {element.service_type}
                                        </option>
                                    )
                                })
                                :<></>}
                            </Input> */}
                            <Select
                                className="customSelect"
                                classNamePrefix="customSelect"
                                //className="react-select react-select-primary"
                                //classNamePrefix="react-select"
                                name="trans_service_code"
                                placeholder=""
                                value={{value:other.trans_service_code?other.trans_service_code:'',
                                        label:other.trans_service_code?
                                        (serviceList.findIndex(x=>x.value===other.trans_service_code)>=0)?
                                        serviceList[serviceList.findIndex(x=>x.value===other.trans_service_code)].label:
                                            '선택':
                                        '선택'
                                    }}
                                onChange={(value)=>setOther({...other,'trans_service_code':value.value})}
                                options={serviceList}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                
                {/* <Row className="mb-3">
                    <Col xl="12" lg="12" md="12">
                        <FormGroup>
                            <Label className="mb-0">Remark</Label>
                            <InputValid 
                                type="text"
                                bsSize="sm"
                                name="remark1"
                                id="remark1"
                                placeholder=""
                                maxLength="20"
                                value={other.remark1?other.remark1:''}
                                onChange={(e)=>fncOnChange(e, 'remark1')}
                                validtype="text" 
                                required={false}
                            />
                        </FormGroup>
                    </Col>
                    <Col xl="12" lg="12" md="12">
                        <FormGroup>
                            <InputValid 
                                type="text"
                                bsSize="sm"
                                name="remark2"
                                id="remark1"
                                placeholder=""
                                maxLength="20"
                                value={other.remark2?other.remark2:''}
                                onChange={(e)=>fncOnChange(e, 'remark2')}
                                validtype="text" 
                                required={false}
                            />
                        </FormGroup>
                    </Col>
                </Row> */}
            </ModalBody>
            <ModalFooter>
                {/* <Button color="success" onClick={(e)=>fncSelectedOther(e)}>선택</Button> */}
                <Button color="primary" onClick={fncOther}>New</Button>
                <Button color="primary" onClick={saveOtherBookmark}>Save</Button>
                <Button color="primary" onClick={(e)=>deleteBookingOtherBookmark(e)}>Delete</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>
    );
}

export default OtherBookmark;