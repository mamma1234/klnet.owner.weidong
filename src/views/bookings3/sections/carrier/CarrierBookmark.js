/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Button
    ,FormGroup, Table, UncontrolledTooltip} from "reactstrap";
import Carrier from "./Carrier.js";
import AlertMessage from "../AlertMessage.js";
import axios from "axios";


const CarrierBookmark = (props) => {
    
    // Collapse Flag
    const [coll, setColl] = useState(false);
    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    const [line, setLine] = useState({});
    const [lineList, setLineList] = useState([]);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // Alert을 위한 state
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState("success");
    const [message, setMessage] = useState("정상 처리되었습니다.");

    useEffect(() => {
        setLineList(props.lineList);
    }, [props]);

    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    // Carrier Bookmark 입력하기
    const fncSaveLineBookmark=(e)=>{
        e.preventDefault(e);
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
            "/api/insertBookingLineBookmark"
            ,{
                user_no : 'M000002',
                line
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingLineBookmark();
                setLine({});
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Update Line Bookmark
    const updateBookingLineBookmark = () => {
        const body =
        axios.post(
            "/api/updateBookingLineBookmark"
            ,{
                user_no : 'M000002',
                line
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingLineBookmark();
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Delete Line Bookmark
    const deleteBookingLineBookmark = () => {
        if( !line.line_bookmark_seq ) {
            onDismiss("danger", "삭제할 Bookmark를 선택하세요.");
            return false;
        }
        const body =
        axios.post(
            "/api/deleteBookingLineBookmark"
            ,{
                user_no : 'M000002',
                line
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingLineBookmark();
                setLine({});
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
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
        setLine({});
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
            <ModalHeader toggle={toggle}>Carrier</ModalHeader>
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
                                            {(lineList.length>0)?lineList.map((element,key)=>{
                                                // console.log(cntrList, key, element)
                                                return(
                                                    <tr scope="row" key={key} onClick={()=>{setLine(element)}}>
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
                                    </Row>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Carrier
                            line={line}
                            fncOnBlur={fncOnBlur}/>
                    </CardBody>
                </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(e)=>fncInitLine(e)}>New</Button>{' '}
                <Button color="primary" onClick={(e)=>fncSaveLineBookmark(e)}>Save</Button>{' '}
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

export default CarrierBookmark;