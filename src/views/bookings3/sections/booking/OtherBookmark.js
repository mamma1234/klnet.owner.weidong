/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, UncontrolledTooltip
    , CardBody, Button,FormGroup, Table, Label, Input} from "reactstrap";
import axios from 'axios';
import AlertMessage from "../AlertMessage.js";

const OtherBookmark = (props) => {
    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    const [clsNm, setClsNm] = useState("");
    const [other, setOther] = useState({});
    const [otherList, setOtherList] = useState([]);
    // Alert을 위한 state
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState("success");
    const [message, setMessage] = useState("정상 처리되었습니다.");
    
    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
        
    }

    useEffect(() => {
        // selectBookingOtherBookmark();
    },[]);

    useEffect(() => {
        setOtherList(props.otherList);
    },[props]);

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
        if( other.other_bookmark_seq ) {
            updateBookingOtherBookmark();
        } else {
            insertBookingOtherBookmark();
        }
    }

    // // 조회
    // const selectBookingOtherBookmark = () => {
    //     axios.post(
    //         "/api/selectBookingOtherBookmark"
    //         ,{ user_no: 'M000002' }
    //         ,{}
    //     ).then(
    //         res => {
    //             setOtherList(res.data);
    //             // onDismiss("success", "정상 처리 되었습니다.");
    //         }
    //     ).catch(err => {
    //         if(err.response.status === 403||err.response.status === 401) {
    //             onDismiss("danger", "오류가 발생했습니다.");
    //         }
    //     });
    // }

    // 입력
    const insertBookingOtherBookmark = () => {
        const body =
        axios.post(
            "/api/insertBookingOtherBookmark"
            ,{
                user_no : 'M000002',
                other
            }
            ,{}
        ).then(
            res=>{
                props.selectBookingOtherBookmark();
                onDismiss("success", "정상 처리 되었습니다.");
            }
        ).catch(err => {
            if(err.response.status === 403||err.response.status === 401) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // 수정
    const updateBookingOtherBookmark = () => {
        axios.post(
            "/api/updateBookingOtherBookmark"
            ,{ 
                user_no : 'M000002',
                other 
            }
            ,{}
        ).then(
            res=>{
                props.selectBookingOtherBookmark();
                onDismiss("success", "정상 처리 되었습니다.");
            }
        ).catch(err => {
            if(err.response.status === 403||err.response.status === 401) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // 삭제
    const deleteBookingOtherBookmark = (e) => {
        e.preventDefault();
        if( !other.other_bookmark_seq ) {
            onDismiss("danger", "삭제할 Bookmark를 선택하세요.");
            return false;
        }
        axios.post(
            "/api/deleteBookingOtherBookmark"
            ,{ other }
            ,{}
        ).then(
            res => {
                props.selectBookingOtherBookmark();
                onDismiss("success", "정상 처리 되었습니다.");
            }
        ).catch(err => {
            if(err.response.status === 403||err.response.status === 401) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    const fncOnChange = (e, key) => {
        e.preventDefault();
        setOther({...other, [key]:e.target.value});
    }

    const fncSelectedOther =(e) => {
        e.preventDefault();
        props.setOther(other);
        props.updateOtherofBooking();
        setOpen(!open);
    }

    // Alert 메세지 팝업
    const onDismiss = (color, message) => {
        setColor(color);
        setMessage(message);
        setVisible(!visible);
    }
  // 전체화면 css 적용을 위한 state
  return (
    <>
        <Button
            className="btn-round btn-just-icon mr-1"
            color="default"
            outline
            id="shbookmark"
            onClick={toggle.bind(this, 'B')}
            style={{position:'relative',backgroundColor:'white'}}
        >
            <i className="fa fa-bookmark-o" />
        </Button>
        <UncontrolledTooltip delay={0} target="shbookmark">Bookmark</UncontrolledTooltip>
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="lg">
            <ModalHeader toggle={toggle}>Sc Number Bookmark</ModalHeader>
            <ModalBody className={clsNm}>
                <CardBody className="pt-2 pb-2 bg-white">
                    <Row className="mb-3">
                        <Col xl="12" lg="12" md="12">
                            <FormGroup>
                                <Row>
                                    <Table hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Sc Number</th>
                                                <th>NAME</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {otherList.map((element,key)=>{
                                            return(
                                                <tr scope="row" key={key}
                                                    onClick={()=>{setOther(element)}}
                                                    // onDoubleClick={()=>fncDoubleClick(element)}
                                                    >
                                                    <td>{element.other_bookmark_seq}</td>
                                                    <td>{element.sc_no}</td>
                                                    <td>{element.other_bookmark_name}</td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </Table>
                                </Row>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xl="6" lg="6" md="12">
                            <FormGroup>
                                <Label className="mb-0">SC Number</Label>
                                <Input type="text" name="sc_no"
                                    id="sc_no" placeholder="SC NUMBER"
                                    maxLength="20"
                                    value={other.sc_no?other.sc_no:''}
                                    onChange={(e)=>fncOnChange(e, 'sc_no')}
                                    />
                            </FormGroup>
                        </Col>
                    <Col xl="6" lg="6" md="12">
                        <FormGroup>
                            <Label className="mb-0">Name</Label>
                            <Input type="text" name="other_bookmark_name"
                                id="other_bookmark_name"
                                placeholder="NAME"
                                maxLength="50"
                                value={other.other_bookmark_name?other.other_bookmark_name:''}
                                onChange={(e)=>fncOnChange(e, 'other_bookmark_name')}
                                />
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xl="12" lg="12" md="12">
                            <FormGroup>
                                <Label className="mb-0">Remark1</Label>
                                <Input type="text" name="remark1"
                                    id="remark1"
                                    placeholder="REMARK 1"
                                    maxLength="70"
                                    value={other.remark1?other.remark1:''}
                                    onChange={(e)=>fncOnChange(e, 'remark1')}
                                    />
                            </FormGroup>
                        </Col>
                        <Col xl="12" lg="12" md="12">
                            <FormGroup>
                                <Label className="mb-0">Phone</Label>
                                <Input type="text" name="remark2"
                                    id="remark2"
                                    placeholder="REMARK 2"
                                    maxLength="70"
                                    value={other.remark2?other.remark2:''}
                                    onChange={(e)=>fncOnChange(e, 'remark2')}
                                    />
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={(e)=>fncSelectedOther(e)}>선택</Button>
                <Button color="primary" onClick={fncOther}>New</Button>
                <Button color="primary" onClick={saveOtherBookmark}>Save</Button>
                <Button color="primary" onClick={(e)=>deleteBookingOtherBookmark(e)}>Delete</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
        <AlertMessage
            isOpen={visible}
            toggle={onDismiss}
            color={color}
            message={message}
            />
    </>
    );
}

export default OtherBookmark;