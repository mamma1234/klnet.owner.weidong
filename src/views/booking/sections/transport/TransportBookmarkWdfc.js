/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody,
    Button,FormGroup,Table, UncontrolledTooltip} from "reactstrap";
import TransportWdfc from "./TransportWdfc.js";
import axios from "axios";
import * as validation from 'components/common/validation.js';

const TransportBookmark = (props) => {

    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    // Transport
    const [transport, setTransport] = useState({});
    const [transportList, setTransportList] = useState([]);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    const {user} = props;

    useEffect(() => {
        setTransportList(props.transportList);
    }, [props.transportList]);

    useEffect(() => {
        // console.log("aaaaa", props.booking)
        setTransport(props.booking);
    }, [props.booking]);

    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    const fncValidation =()=> {
        if( transport.trans_user_email ) {
            if( !validation.validationEmail(transport.trans_user_email) ) return false;
        }
        return true;
    }
    // Transport Bookmark 입력하기
    const fncSaveTransportBookmark=(e)=>{
        e.preventDefault(e);
        if( !user ) {
            props.onNotiAlert("error",validation.NOTLOGIN_MSG);   
            return false;
        }
        if( !fncValidation() ) return false;
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
            "/shipper/insertBookingTransportBookmark"
            ,{
                user_no : user?user.user_no:null,
                transport
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.SAVE_MSG);
                props.selectBookingTransportBookmark();
                setTransport({});
            }
        );
    }

    // Update Transport Bookmark
    const updateBookingTransportBookmark = () => {
        const body =
        axios.post(
            "/shipper/updateBookingTransportBookmark"
            ,{
                user_no : user?user.user_no:null,
                transport
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.SAVE_MSG);
                props.selectBookingTransportBookmark();
            }
        );
    }

    // Delete Transport Bookmark
    const deleteBookingTransportBookmark = () => {
        if( !transport.transport_bookmark_seq ) {
            props.onNotiAlert("danger", "삭제할 Bookmark를 선택하세요.");
            return false;
        }
        const body =
        axios.post(
            "/shipper/deleteBookingTransportBookmark"
            ,{
                user_no : user?user.user_no:null,
                transport
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.DEL_MSG);
                props.selectBookingTransportBookmark();
                setTransport({});
            }
        );
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
    const fncOpenType=()=>{}

  return (
    <>
        <Button className="pl-0 pr-0" 
            color="link" id="linebookmark"
            onClick={toggle.bind(this, 'B')}>
                <i className="fa fa-bookmark-o fa-2x" />
        </Button>
        <UncontrolledTooltip delay={0} target="linebookmark">Bookmark</UncontrolledTooltip>
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
                                                    <td className="p-2 bg-info">No.</td>
                                                    <td className="p-2 bg-info">Bookmark</td>
                                                    <td className="p-2 bg-info">NAME</td>
                                                    <td className="p-2 bg-info">TEL</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {(transportList.length>0)?transportList.map((element,key)=>{
                                                // console.log(cntrList, key, element)
                                                return(
                                                    <tr scope="row" key={key} onClick={()=>{setTransport(element)}}
                                                    style={element.transport_bookmark_seq===transport.transport_bookmark_seq?{backgroundColor:'aliceblue'}:{backgroundColor:''}}>
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
                        <TransportWdfc
                            transport={transport}
                            fncOnBlur={fncOnBlur}
                            openType={"BOOK"}
                            fncOpenType={fncOpenType}
                            {...props}/>
                    </CardBody>
                </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(e)=>fncInitTransport(e)}>New</Button>{' '}
                <Button color="primary" onClick={(e)=>fncSaveTransportBookmark(e)}>Save</Button>{' '}
                <Button color="primary" onClick={(e)=>deleteBookingTransportBookmark(e)}>Delete</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>
    );
}

export default TransportBookmark;