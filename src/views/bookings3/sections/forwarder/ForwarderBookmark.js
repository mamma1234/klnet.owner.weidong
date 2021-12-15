/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col
    , CardBody, Button,FormGroup, Table, UncontrolledTooltip } from "reactstrap";
import Forwarder from "./Forwarder.js";
import axios from "axios";
import AlertMessage from "../AlertMessage.js";

const ForwarderBookmark = (props) => {
    // modal 창을 위한 state
    const [coll, setColl] = useState(false);
    const [open, setOpen] = useState(false);
    // Forwarder
    const [forwarder, setForwarder] = useState({});
    const [forwarderList, setForwarderList] = useState([]);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // Alert을 위한 state
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState("success");
    const [message, setMessage] = useState("정상 처리되었습니다.");

    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }
    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    useEffect(() => {
        setForwarderList(props.forwarderList);
    }, [props]);

    // New FOrwarder Bookmark
    const fncInitForwarder = (e) => {
        e.preventDefault();
        setForwarder({});
    }

    // Save Forwarder Bookmark
    const fncSaveForwarderBookmark = (e) => {
        e.preventDefault(e);
        if( !forwarder.forwarder_bookmark_seq || '0' === forwarder.forwarder_bookmark_seq ) {
            insertBookingForwarderBookmark();
        } else {
            updateBookingForwarderBookmark();
        }
    }

    // Insert Forwarder Bookmark
    const insertBookingForwarderBookmark = () => {
        const body =
        axios.post(
            "/api/insertBookingForwarderBookmark"
            ,{
                user_no : 'M000002',
                forwarder
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingForwarderBookmark();
                setForwarder({});
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Update Forwarder Bookmark
    const updateBookingForwarderBookmark = () => {
        const body =
        axios.post(
            "/api/updateBookingForwarderBookmark"
            ,{
                user_no : 'M000002',
                forwarder
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingForwarderBookmark();
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Delete Forwarder Bookmark
    const deleteBookingForwarderBookmark = () => {
        if( !forwarder.forwarder_bookmark_seq ) {
            onDismiss("danger", "삭제할 Bookmark를 선택하세요.");
            return false;
        }
        const body =
        axios.post(
            "/api/deleteBookingForwarderBookmark"
            ,{
                user_no : 'M000002',
                forwarder
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingForwarderBookmark();
                setForwarder({});
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    const fncOnBlur = (forwarder) => {
        setForwarder(forwarder);
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
            <ModalHeader toggle={toggle}>Forwarder Bookmark</ModalHeader>
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
                                                <th>EMAIL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {(forwarderList.length>0)?forwarderList.map((element,key)=>{
                                            // console.log(cntrList, key, element)
                                            return(
                                                <tr scope="row" key={key} onClick={()=>{setForwarder(element)}}>
                                                    <td>{element.forwarder_bookmark_seq}</td>
                                                    <td>{element.forwarder_bookmark_name}</td>
                                                    <td>{element.fwd_user_name}</td>
                                                    <td>{element.fwd_user_tel}</td>
                                                    <td>{element.fwd_user_email}</td>
                                                </tr>
                                            )
                                        }):<></>}
                                        </tbody>
                                    </Table>
                                </Row>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Forwarder
                        forwarder={forwarder}
                        fncOnBlur={fncOnBlur}/>
                </CardBody>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(e)=>fncInitForwarder(e)}>New</Button>
                <Button color="primary" onClick={(e)=>fncSaveForwarderBookmark(e)}>Save</Button>
                <Button color="primary" onClick={(e)=>deleteBookingForwarderBookmark(e)}>Delete</Button>
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

export default ForwarderBookmark;