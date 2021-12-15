/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Button
    ,FormGroup, Table, UncontrolledTooltip} from "reactstrap";
import CarrierWdfc from "./CarrierWdfc.js";
import axios from "axios";
import * as validation from 'components/common/validation.js';


const CarrierBookmarkWdfc = (props) => {
    
    // Collapse Flag
    const [coll, setColl] = useState(false);
    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    const [line, setLine] = useState({});
    const [lineList, setLineList] = useState([]);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    const {user} = props;

    useEffect(() => {
        setLineList(props.lineList);
    }, [props]);

    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    const fncValidation =()=> {
        if( !line.line_bookmark_name ) return false;
        if( line.line_user_email ) {
            if( !validation.validationEmail(line.line_user_email) ) return false;
        }
        return true;
    }
    // Carrier Bookmark 입력하기
    const fncSaveLineBookmark=(e)=>{
        e.preventDefault(e);
        if( !user ) {
            props.onNotiAlert("error",validation.NOTLOGIN_MSG);   
            return false;
        }
        if( !fncValidation() ) return false;
        if( !line.line_bookmark_seq || '0' === line.line_bookmark_seq ) {
            insertBookingLineBookmark();
        } else {
            updateBookingLineBookmark();
        }
    }

    // Insert Line Bookmark
    const insertBookingLineBookmark = () => {
        const body =
        axios.post(
            "/shipper/insertBookingLineBookmark"
            ,{
                user_no : user?user.user_no:null,
                line
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.SAVE_MSG);
                props.selectBookingLineBookmark();
                setLine({});
            }
        );
    }

    // Update Line Bookmark
    const updateBookingLineBookmark = () => {
        const body =
        axios.post(
            "/shipper/updateBookingLineBookmark"
            ,{
                user_no : user?user.user_no:null,
                line
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.SAVE_MSG);
                props.selectBookingLineBookmark();
            }
        );
    }

    // Delete Line Bookmark
    const deleteBookingLineBookmark = () => {
        if( !line.line_bookmark_seq ) {
            props.onNotiAlert("danger", "삭제할 Bookmark를 선택하세요.");
            return false;
        }
        const body =
        axios.post(
            "/shipper/deleteBookingLineBookmark"
            ,{
                user_no : user?user.user_no:null,
                line
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.DEL_MSG);
                props.selectBookingLineBookmark();
                setLine({});
            }
        );
    }

    const fncOnBlur = (line) => {
        setLine(line);
    }

    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }

    // New Line Bookmark
    const fncInitLine = (e) => {
        e.preventDefault();
        setLine({'line_code':'WDFC'});
    }
    const fncOpenType =()=>{}

  return (
    <>
        <Button className="pl-0 pr-0" 
            color="link" id="linebookmark"
            onClick={toggle.bind(this, 'B')}>
                <i className="fa fa-bookmark-o fa-2x" />
        </Button>
        <UncontrolledTooltip delay={0} target="linebookmark">Bookmark</UncontrolledTooltip>
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="lg">
            <ModalHeader toggle={toggle}>Carrier</ModalHeader>
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
                                        {(lineList.length>0)?lineList.map((element,key)=>{
                                            // console.log(cntrList, key, element)
                                            return(
                                                <tr scope="row" key={key} onClick={()=>{setLine(element)}}
                                                style={element.line_bookmark_seq===line.line_bookmark_seq?{backgroundColor:'aliceblue'}:{backgroundColor:''}}>
                                                    <td>{element.line_bookmark_seq}</td>
                                                    <td>{element.line_bookmark_name}</td>
                                                    <td>{element.line_user_name}</td>
                                                    <td>{element.line_user_tel}</td>
                                                    <td>{element.line_user_phone}</td>
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
                <hr className="m-2"/>
                <CarrierWdfc
                    line={line}
                    fncOnBlur={fncOnBlur}
                    openType={"BOOK"}
                    fncOpenType={fncOpenType}/>
                </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(e)=>fncInitLine(e)}>New</Button>{' '}
                <Button color="primary" onClick={(e)=>fncSaveLineBookmark(e)}>Save</Button>{' '}
                <Button color="primary" onClick={(e)=>deleteBookingLineBookmark(e)}>Delete</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>
    );
}

export default CarrierBookmarkWdfc;