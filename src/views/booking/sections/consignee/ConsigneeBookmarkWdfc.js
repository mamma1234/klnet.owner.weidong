/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Button
    ,FormGroup,Table, UncontrolledTooltip} from "reactstrap";
import ConsigneeWdfc from "./ConsigneeWdfc.js";
import axios from "axios";
import * as validation from 'components/common/validation.js';


const ConsigneeBookmarkWdfc = (props) => {
    // Collapse Flag
    const [coll, setColl] = useState(false);
    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    // Consignee
    const [consignee, setConsignee] = useState({});
    const [consigneeList, setConsigneeList] = useState([]);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    const {user} = props;

    useEffect(() => {
        setConsigneeList(props.consigneeList);
        
    }, [props]);

    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    const fncValidation=()=>{
        if( !consignee.consignee_bookmark_name ) return false;
        if( consignee.cons_user_email ) {
            if( !validation.validationEmail(consignee.cons_user_email) ) return false;
        }
        return true;
    }
    // Consignee Bookmark 입력하기
    const fncSaveConsigneeBookmark=(e)=>{
        e.preventDefault(e);
        if( !user ) {
            props.onAlert("error",validation.ERR_MSG);
            return false;
        }
        if( !fncValidation() ) return false;
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
            "/shipper/insertBookingConsigneeBookmark"
            ,{
                user_no : user?user.user_no:null,
                consignee
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.SAVE_MSG);
                props.selectBookingConsigneeBookmark();
                setConsignee({});
            }
        );
    }

    // Update Consignee Bookmark
    const updateBookingConsigneeBookmark = () => {
        const body =
        axios.post(
            "/shipper/updateBookingConsigneeBookmark"
            ,{
                user_no : user?user.user_no:null,
                consignee
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.SAVE_MSG);
                props.selectBookingConsigneeBookmark();
            }
        );
    }

    // Delete Consignee Bookmark
    const deleteBookingConsigneeBookmark = () => {
        if( !consignee.consignee_bookmark_seq ) {
            props.onNotiAlert("danger", "삭제할 Bookmark를 선택하세요.");
            return false;
        }
        const body =
        axios.post(
            "/shipper/deleteBookingConsigneeBookmark"
            ,{
                user_no : user?user.user_no:null,
                consignee
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.DEL_MSG);
                props.selectBookingConsigneeBookmark();
                setConsignee({});
            }
        );
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
            <ModalHeader toggle={toggle}>Consignee Bookmark</ModalHeader>
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
                                                    <td className="p-2 bg-info">PHONE</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {(consigneeList.length > 0)?consigneeList.map((element,key)=>{
                                                // console.log(cntrList, key, element)
                                                return(
                                                    <tr scope="row" key={key} onClick={()=>{setConsignee(element)}}
                                                    style={element.consignee_bookmark_seq===consignee.consignee_bookmark_seq?{backgroundColor:'aliceblue'}:{backgroundColor:''}}>
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
                                    </CardBody>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>BookMark Input</Col>
                    </Row>
                    <hr className="m-2"/>
                    <ConsigneeWdfc
                        consignee={consignee}
                        fncOnBlur={fncOnBlur}
                        openType={"BOOK"}
                        fncOpenType={fncOpenType}/>
                </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(e)=>fncInitConsignee(e)}>New</Button>{' '}
                <Button color="primary" onClick={(e)=>fncSaveConsigneeBookmark(e)}>Save</Button>{' '}
                <Button color="primary" onClick={(e)=>deleteBookingConsigneeBookmark(e)}>Delete</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>
    );
}

export default ConsigneeBookmarkWdfc;