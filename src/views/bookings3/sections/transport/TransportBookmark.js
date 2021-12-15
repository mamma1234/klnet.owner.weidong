/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody,
    Button,FormGroup,Table, UncontrolledTooltip} from "reactstrap";
import Transport from "./Transport.js";
import AlertMessage from "../AlertMessage.js";
import axios from "axios";


const TransportBookmark = (props) => {

    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    // Transport
    const [transport, setTransport] = useState({});
    const [transportList, setTransportList] = useState([]);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // Alert을 위한 state
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState("success");
    const [message, setMessage] = useState("정상 처리되었습니다.");

    useEffect(() => {
        setTransportList(props.transportList);
    }, [props]);

    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    // Transport Bookmark 입력하기
    const fncSaveTransportBookmark=(e)=>{
        e.preventDefault(e);
        if( !transport.transport_bookmark_seq || '0' === transport.transport_bookmark_seq ) {
            insertBookingTransportBookmark();
        } else {
            updateBookingTransportBookmark();
        }
    }

    // Insert Transport Bookmark
    const insertBookingTransportBookmark = () => {
        const body =
        axios.post(
            "/api/insertBookingTransportBookmark"
            ,{
                user_no : 'M000002',
                transport
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingTransportBookmark();
                setTransport({});
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Update Transport Bookmark
    const updateBookingTransportBookmark = () => {
        const body =
        axios.post(
            "/api/updateBookingTransportBookmark"
            ,{
                user_no : 'M000002',
                transport
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingTransportBookmark();
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Delete Transport Bookmark
    const deleteBookingTransportBookmark = () => {
        if( !transport.transport_bookmark_seq ) {
            onDismiss("danger", "삭제할 Bookmark를 선택하세요.");
            return false;
        }
        const body =
        axios.post(
            "/api/deleteBookingTransportBookmark"
            ,{
                user_no : 'M000002',
                transport
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingTransportBookmark();
                setTransport({});
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    const fncOnBlur = (transport) => {
        setTransport(transport);
    }

    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }

    // New Transport Bookmark
    const fncInitTransport = (e) => {
        e.preventDefault();
        setTransport({});
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
            <ModalHeader toggle={toggle}>Transport</ModalHeader>
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
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {(transportList.length>0)?transportList.map((element,key)=>{
                                                // console.log(cntrList, key, element)
                                                return(
                                                    <tr scope="row" key={key} onClick={()=>{setTransport(element)}}>
                                                        <td>{element.transport_bookmark_seq}</td>
                                                        <td>{element.transport_bookmark_name}</td>
                                                        <td>{element.trans_user_name}</td>
                                                        <td>{element.trans_user_tel}</td>
                                                    </tr>
                                                )
                                            }):<></>}
                                            </tbody>
                                        </Table>
                                    </Row>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Transport
                            transport={transport}
                            fncOnBlur={fncOnBlur}/>
                    </CardBody>
                </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(e)=>fncInitTransport(e)}>New</Button>{' '}
                <Button color="primary" onClick={(e)=>fncSaveTransportBookmark(e)}>Save</Button>{' '}
                <Button color="primary" onClick={(e)=>deleteBookingTransportBookmark(e)}>Delete</Button>{' '}
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

export default TransportBookmark;