/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Button
    ,FormGroup,Table, UncontrolledTooltip} from "reactstrap";
import Consignee from "./Consignee.js";
import AlertMessage from "../AlertMessage.js";
import axios from "axios";



const ConsigneeTemplate = (props) => {
    // Collapse Flag
    const [coll, setColl] = useState(false);
    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    // Consignee
    const [consignee, setConsignee] = useState({});
    const [consigneeList, setConsigneeList] = useState([]);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // Alert을 위한 state
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState("success");
    const [message, setMessage] = useState("정상 처리되었습니다.");

    useEffect(() => {
        setConsigneeList(props.consigneeList);
    }, [props]);

    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    // Consignee Bookmark 입력하기
    const fncSaveConsigneeBookmark=(e)=>{
        e.preventDefault(e);
        if( !consignee.consignee_bookmark_seq || '0' === consignee.consignee_bookmark_seq ) {
            insertBookingConsigneeBookmark();
        } else {
            updateBookingConsigneeBookmark();
        }
    }

    // Insert Consignee Bookmark
    const insertBookingConsigneeBookmark = () => {
        const body =
        axios.post(
            "/api/insertBookingConsigneeBookmark"
            ,{
                user_no : 'M000002',
                consignee
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingConsigneeBookmark();
                setConsignee({});
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Update Consignee Bookmark
    const updateBookingConsigneeBookmark = () => {
        const body =
        axios.post(
            "/api/updateBookingConsigneeBookmark"
            ,{
                user_no : 'M000002',
                consignee
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingConsigneeBookmark();
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Delete Consignee Bookmark
    const deleteBookingConsigneeBookmark = () => {
        if( !consignee.consignee_bookmark_seq ) {
            onDismiss("danger", "삭제할 Bookmark를 선택하세요.");
            return false;
        }
        const body =
        axios.post(
            "/api/deleteBookingConsigneeBookmark"
            ,{
                user_no : 'M000002',
                consignee
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingConsigneeBookmark();
                setConsignee({});
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    const fncOnBlur = (consignee) => {
        setConsignee(consignee);
    }

    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }

    // New Consignee Bookmark
    const fncInitConsignee = (e) => {
        e.preventDefault();
        setConsignee({});
    }
    // Alert 메세지 팝업
    const onDismiss = (color, message) => {
        setColor(color);
        setMessage(message);
        setVisible(!visible);
    }
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
        <UncontrolledTooltip delay={0} target="shpview">Window Input</UncontrolledTooltip>
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="lg">
            <ModalHeader toggle={toggle}>Consignee</ModalHeader>
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
                                                    <th>Bookmark</th>
                                                    <th>NAME</th>
                                                    <th>TEL</th>
                                                    <th>PHONE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {(consigneeList.length > 0)?consigneeList.map((element,key)=>{
                                                // console.log(cntrList, key, element)
                                                return(
                                                    <tr scope="row" key={key} onClick={()=>{setConsignee(element)}}>
                                                        <td>{element.consignee_bookmark_seq}</td>
                                                        <td>{element.consignee_bookmark_name}</td>
                                                        <td>{element.cons_user_name}</td>
                                                        <td>{element.cons_user_tel}</td>
                                                        <td>{element.cons_user_phone}</td>
                                                    </tr>
                                                )
                                            }):
                                            <></>}
                                            </tbody>
                                        </Table>
                                    </Row>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Consignee
                            consignee={consignee}
                            fncOnBlur={fncOnBlur} />
                    </CardBody>
                </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(e)=>fncInitConsignee(e)}>New</Button>{' '}
                <Button color="primary" onClick={(e)=>fncSaveConsigneeBookmark(e)}>Save</Button>{' '}
                <Button color="primary" onClick={(e)=>deleteBookingConsigneeBookmark(e)}>Delete</Button>{' '}
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

export default ConsigneeTemplate;