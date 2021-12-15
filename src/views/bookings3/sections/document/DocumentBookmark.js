/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, Card
    , CardBody, Button,FormGroup, Table, UncontrolledTooltip} from "reactstrap";
import Document from "./Document.js";
import axios from 'axios';
import AlertMessage from "../AlertMessage.js";

const DocumentBookmark = (props) => {
    // modal 창을 위한 state
    const [coll, setColl] = useState(false);
    const [open, setOpen] = useState(false);
    const [clsNm, setClsNm] = useState("");
    const [document, setDocument] = useState({});
    const [documentList, setDocumentList] = useState([]);
    // Alert을 위한 state
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState("success");
    const [message, setMessage] = useState("정상 처리되었습니다.");

    useEffect(() => {
        setDocumentList(props.documentList);
    },[props]);

    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }

    // 자식에게 받은 document
    const fncOnBlurDocument = ( document ) => {
        // console.log( "PARENT ",document );
        setDocument( document );
    }

    // 신규 추가 시
    const fncInitDocument = (e) => {
        e.preventDefault();
        setDocument({
            document_bookmark_seq: '',
            document_bookmark_name: '',
            docu_user_name: '',
            docu_user_tel: '',
            docu_user_phone: '',
            docu_user_fax: '',
            docu_user_email: '',
            docu_tax_email: ''
        });
    }

    // save
    const saveDocumentBookmark = (e) => {
        e.preventDefault();
        if( document.document_bookmark_seq ) {
            updateBookingDocumentBookmark();
        } else {
            insertBookingDocumentBookmark();
        }
    }

    // 조회
    const selectBookingDocumentBookmark = () => {
        axios.post(
            "/api/selectBookingDocumentBookmark"
            ,{ user_no: 'M000002' }
            ,{}
        ).then(
            // setDocumentList([])
        ).then(
            res => setDocumentList(res.data)
        ).then(
            onDismiss("success", "정상 조회 되었습니다.")
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // 입력
    const insertBookingDocumentBookmark = () => {
        const body =
        axios.post(
            "/api/insertBookingDocumentBookmark"
            ,{
                user_no : 'M000002',
                document
            }
            ,{}
        ).then(
            res=>{
                setDocument({});
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingDocumentBookmark();
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // 수정
    const updateBookingDocumentBookmark = () => {
        axios.post(
            "/api/updateBookingDocumentBookmark"
            ,{ 
                user_no : 'M000002',
                document 
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingDocumentBookmark();
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // 삭제
    const deleteBookingDocumentBookmark = (e) => {
        e.preventDefault();
        if( !document.document_bookmark_seq ) {
            onDismiss("danger", "삭제할 Bookmark를 선택하세요.");
            return
        }
        axios.post(
            "/api/deleteBookingDocumentBookmark"
            ,{ document }
            ,{}
        ).then(
            res=>{
                setDocument({});
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingDocumentBookmark();
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    const fncOnClick = ( element ) => {
        if( element.document_bookmark_seq != document.init_document_bookmark_seq ) {
            setDocument(element);
        }
    }

    const fncOnDoubleClick = ( element ) => {
        if( element.document_bookmark_seq != document.init_document_bookmark_seq ) {
            setDocument(element);
        }
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
            <ModalHeader toggle={toggle}>Document Bookmark</ModalHeader>
            <ModalBody className={clsNm}>
                <Row>
                    <Col>BookMark List</Col>
                </Row>
                {/* <CardBody className="pt-2 pb-2 bg-white"> */}
                <Row className="mb-3">
                    <Col xl="12" lg="12" md="12">
                        <FormGroup style={{height:'150px',overflow:'auto'}} className="mb-0">
                            <Card className="card-raised card-form-horizontal no-transition mb-0">
                                <CardBody className="bg-white p-0">
                            {/* <Row> */}
                                <Table className="mb-0" responsive hover size="sm">
                                    <thead>
                                        <tr>
                                            <th className="p-2 bg-info">No.</th>
                                            <th className="p-2 bg-info">Bookmark</th>
                                            <th className="p-2 bg-info">NAME</th>
                                            <th className="p-2 bg-info">TEL</th>
                                            <th className="p-2 bg-info">PHONE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {(documentList.length>0)?documentList.map((element,key)=>{
                                        // console.log(documentList, key, element)
                                        return(
                                            <tr scope="row" key={key} onClick={()=>fncOnClick(element)} onDoubleClick={()=>fncOnDoubleClick(element)}>
                                                <td>{element.document_bookmark_seq}</td>
                                                <td>{element.document_bookmark_name}</td>
                                                <td>{element.docu_user_name}</td>
                                                <td>{element.docu_user_tel}</td>
                                                <td>{element.docu_user_phone}</td>
                                            </tr>
                                        )
                                    }):<></>}
                                    </tbody>
                                </Table>
                            {/* </Row> */}
                                </CardBody>
                            </Card>
                        </FormGroup>
                    </Col>
                </Row>
                    <AlertMessage
                            isOpen={visible}
                            toggle={onDismiss}
                            color={color}
                            message={message}
                            />
                    <Document
                        document={document}
                        fncOnBlurDocument={fncOnBlurDocument}
                        />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(e)=>fncInitDocument(e)}>New</Button>
                <Button color="primary" onClick={(e)=>saveDocumentBookmark(e)}>Save</Button>
                <Button color="primary" onClick={(e)=>deleteBookingDocumentBookmark(e)}>Delete</Button>
                {/* <Button color="success" onClick={setParentDocument.bind(this, document)}>선택</Button> */}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>
    );
}

export default DocumentBookmark;