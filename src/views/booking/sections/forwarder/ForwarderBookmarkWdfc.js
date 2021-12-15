/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col
    , CardBody, Button,FormGroup, Table, UncontrolledTooltip } from "reactstrap";
import ForwarderWdfc from "./ForwarderWdfc.js";
import axios from "axios";
import * as validation from "components/common/validation.js";

const ForwarderBookmarkWdfc = (props) => {
    // modal 창을 위한 state
    //const [coll, setColl] = useState(false);
    const [open, setOpen] = useState(false);
    // Forwarder
    const [forwarder, setForwarder] = useState({});
    const [forwarderList, setForwarderList] = useState([]);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");

    const {user, forwarderCompanyList} = props;
    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }
    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    useEffect(() => {
        setForwarderList(props.forwarderList);
    }, [props.forwarderList]);

    useEffect(() => {
        setForwarder(props.booking);
    }, [props.booking]);

    // New FOrwarder Bookmark
    const fncInitForwarder = (e) => {
        e.preventDefault();
        setForwarder({});
    }

    const fncValidation =()=> {
        if( !forwarder.forwarder_bookmark_name ) return false;
        if( forwarder.fwd_user_email ) {
            if( !validation.validationEmail(forwarder.fwd_user_email) ) return false;
        }
        return true;
    }
    // Save Forwarder Bookmark
    const fncSaveForwarderBookmark = (e) => {
        e.preventDefault(e);
        if( !user ) {
            props.onAlert("error",validation.NOTLOGIN_MSG);   
            return false;
        }
        if( !fncValidation() ) return false;
        if( !forwarder.forwarder_bookmark_seq || '0' === forwarder.forwarder_bookmark_seq ) {
            insertBookingForwarderBookmark();
        } else {
            updateBookingForwarderBookmark();
        }
    }

    // Insert Forwarder Bookmark
    const insertBookingForwarderBookmark = () => {
       // const body =
        axios.post(
            "/shipper/insertBookingForwarderBookmark"
            ,{
                user_no : user?user.user_no:null,
                forwarder
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.SAVE_MSG);
                props.selectBookingForwarderBookmark();
                setForwarder({});
            }
        );
    }

    // Update Forwarder Bookmark
    const updateBookingForwarderBookmark = () => {
       // const body =
        axios.post(
            "/shipper/updateBookingForwarderBookmark"
            ,{
                user_no : user?user.user_no:null,
                forwarder
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.SAVE_MSG);
                props.selectBookingForwarderBookmark();
            }
        );
    }

    // Delete Forwarder Bookmark
    const deleteBookingForwarderBookmark = () => {
        if( !forwarder.forwarder_bookmark_seq ) {
            props.onNotiAlert("danger", "삭제할 Bookmark를 선택하세요.");
            return false;
        }
        //const body =
        axios.post(
            "/shipper/deleteBookingForwarderBookmark"
            ,{
                user_no : user?user.user_no:null,
                forwarder
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.DEL_MSG);
                props.selectBookingForwarderBookmark();
                setForwarder({});
            }
        );
    }

    const fncOnBlur = (forwarder) => {
        setForwarder(forwarder);
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
            <ModalHeader toggle={toggle}>Forwarder Bookmark</ModalHeader>
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
                                                <td className="p-2 bg-info">No.</td>
                                                <td className="p-2 bg-info">Bookmark</td>
                                                <td className="p-2 bg-info">NAME</td>
                                                <td className="p-2 bg-info">TEL</td>
                                                <td className="p-2 bg-info">EMAIL</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {(forwarderList.length>0)?forwarderList.map((element,key)=>{
                                            // console.log(cntrList, key, element)
                                            return(
                                                <tr scope="row" key={key} onClick={()=>{setForwarder(element)}}
                                                style={element.forwarder_bookmark_seq===forwarder.forwarder_bookmark_seq?{backgroundColor:'aliceblue'}:{backgroundColor:''}}>
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
                                </CardBody>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>BookMark Input</Col>
                </Row>
                <ForwarderWdfc
                    forwarder={forwarder}
                    fncOnBlur={fncOnBlur}
                    openType={"BOOK"}
                    forwarderCompanyList={forwarderCompanyList}
                    fncOpenType={fncOpenType}
                    {...props}/>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(e)=>fncInitForwarder(e)}>New</Button>
                <Button color="primary" onClick={(e)=>fncSaveForwarderBookmark(e)}>Save</Button>
                <Button color="primary" onClick={(e)=>deleteBookingForwarderBookmark(e)}>Delete</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>
    );
}

export default ForwarderBookmarkWdfc;