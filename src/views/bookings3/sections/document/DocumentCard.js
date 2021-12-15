/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse, UncontrolledTooltip,
    Button, Input, Card, CardTitle, CardText} from "reactstrap";
import axios from 'axios';
import Confirm from '../../../../components/Confirm/Confirm.js';
import Document from "./Document.js";
import AlertMessage from "../AlertMessage.js";
import DocumentBookmark from "./DocumentBookmark.js";


const DocumentCard = (props) => {
    
    // modal 창을 위한 state
    const [coll, setColl] = useState(false);
    const [open, setOpen] = useState(false);
    const [documentList, setDocumentList] = useState([]);
    const [booking, setBooking] = useState({});
    // Alert을 위한 state
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState("success");
    const [message, setMessage] = useState("정상 처리되었습니다.");

    useEffect(() => {
        // Document Bookmark 조회
        selectBookingDocumentBookmark();
    },[]);

    useEffect(() => {
        // bookmark seq 다르면 update 수행
        // console.log(booking.init_document_bookmark_seq , booking.document_bookmark_seq)
        if( booking.init_document_bookmark_seq != booking.document_bookmark_seq ) {
            updateDocumentOfBooking();
        }
    },[booking]);


    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        if( props.booking.bkg_no ) {
            let bkg_no = props.booking.bkg_no;
            let bkg_date = props.booking.bkg_date;
            let status_cus = props.booking.status_cus;
            let sc_no = props.booking.sc_no;
            let user_no = props.booking.user_no;
            // Bookmark Seq
            let document_bookmark_seq = props.booking.document_bookmark_seq;
            let init_document_bookmark_seq = props.booking.init_document_bookmark_seq;
            let document_bookmark_name = props.booking.document_bookmark_name;
            setBooking({...booking, 'bkg_no':bkg_no, 'bkg_date':bkg_date
                , 'status_cus':status_cus, 'sc_no':sc_no, 'user_no':user_no
                , 'document_bookmark_seq':document_bookmark_seq
                , 'document_bookmark_name':document_bookmark_name
                , 'init_document_bookmark_seq': init_document_bookmark_seq}); // 초기화 bookmark seq 값
            // 최초 조회하기
            selectDocumentOfBooking(props.booking);
        }

    },[props.booking]);

    const toggle = async(params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('');
        
        // console.log( "INIT "+booking.init_document_bookmark_seq , "SEQ "+booking.document_bookmark_seq )
        // 상세화면이 열릴때
        if( !open ) {
            // console.log(booking)
            // document정보를 바꿨다면
            if( booking.init_document_bookmark_seq != booking.document_bookmark_seq ) {
                // booking의 document 정보와 다르면 Confirm 메세지 
                let title = "["+booking.bkg_no+"] BOOKING 정보를 수정합니다." ;
                let message = "현재 DOCUMENT를 ["+ booking.document_bookmark_name+"] 정보로 수정하시겠습니까?";
                let result = await Confirm({
                    title: title,
                    message: message,
                    confirmText: "Update",
                    cancleText: 'Cancle',
                });
                if ( true === result ) {
                    setOpen(!open);
                    selectDocumentOfBooking();
                }
            } else {
                setOpen(!open);
            }
        } else {
            setOpen(!open);
        }
    }


    // Document Bookmark 조회
    const selectBookingDocumentBookmark = () => {
        axios.post(
            "/api/selectBookingDocumentBookmark"
            ,{ user_no: 'M000002' }
            ,{}
        ).then(
            setDocumentList([])
        ).then(
            res => setDocumentList(res.data)
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Booking의 Document 조회
    const selectDocumentOfBooking = (booking) => {
        // console.log("dfsdfsfsdfsdfsdfsdfdsfsdfsdfsdf ",booking);
        axios.post(
            "/api/selectDocumentOfBooking"
            ,{ user_no: 'M000002'
                ,booking 
            }
            ,{}
        ).then(
            res => setBooking(res.data[0])
        ).then(
            // onDismiss("success", "정상 조회 되었습니다.")
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Booking의 Document 조회
    const updateDocumentOfBooking = () => {
        // console.log(booking)
        axios.post(
            "/api/updateDocumentOfBooking"
            ,{ 
                user_no : 'M000002',
                booking 
            }
            ,{}
        ).then(
            setOpen(false)
        ).then(
            setBooking({...booking, 'init_document_bookmark_seq':booking.document_bookmark_seq})
        ).then(
            onDismiss("success", "정상 처리 되었습니다.")
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

  // 자식에게 받은 document
  const fncOnBlurDocument = ( document ) => {
    // console.log(document)
    setBooking( document );
  }

  // Doucment select 선택할때
  const fncSelectDocument = (e) => {
    //   console.log(e.target.value)
    // 선택
    if( 1 > e.target.value ) {
        // setBooking({});
        if ( coll ) {
            setColl(!coll)
        }
    // 그외 데이터인 경우
    } else {
        documentList.map((element, key)=>{
            if( e.target.value == element.document_bookmark_seq) {
                // select로 새로운 document를 세팅한다
                // console.log( element );
                // 기존 Booking 정보
                setBooking({...booking
                    ,'docu_tax_email':element.docu_tax_email
                    ,'docu_user_email':element.docu_user_email
                    ,'docu_user_fax':element.docu_user_fax
                    ,'docu_user_name':element.docu_user_name
                    ,'docu_user_phone':element.docu_user_phone
                    ,'docu_user_tel':element.docu_user_tel
                    ,'document_bookmark_name':element.document_bookmark_name
                    ,'document_bookmark_seq':element.document_bookmark_seq});
                }
            });
        if ( !coll ) {
            setColl(!coll);
        }
    }
  }

    // DocumentBookmark 에서 목록을 수정한 경우
    const setParentDocumentList = (documentList) => {
        setDocumentList(documentList);
    }

    // DocumentBookMark 에서 선택한 경우
    const setParentDocument = async (document) => {
        // console.log("PARENT");
        let bkg_no = booking.bkg_no;
        let bkg_date = booking.bkg_date;
        let status_cus = booking.status_cus;
        let sc_no = booking.sc_no;
        let user_no = booking.user_no;
        // Bookmark Seq
        let init_seq = booking.document_bookmark_seq;
        setBooking({...document, 'bkg_no':bkg_no, 'bkg_date':bkg_date
            , 'status_cus':status_cus, 'sc_no':sc_no, 'user_no':user_no});
        if( document.document_bookmark_seq != init_seq) {
            // booking의 document 정보와 다르면 Confirm 메세지 
            let title = "["+booking.bkg_no+"] BOOKING 정보를 수정합니다." ;
            let message = "현재 DOCUMENT를 ["+ document.document_bookmark_name+"] 정보로 수정하시겠습니까?";
            let result = await Confirm({
                title: title,
                message: message,
                confirmText: "Update",
                cancleText: 'Cancle',
            });
            if ( true === result ) {
                setOpen(!open);
            }
        }
            
    }

    // Alert 메세지 팝업
    const onDismiss = (color, message) => {
        setColor(color);
        setMessage(message);
        setVisible(!visible);
    }

  // 전체화면 css 적용을 위한 state
  const [clsNm, setClsNm] = useState("");
  return (
    <>
    <Row>
        <Col xl="12" lg="12">
            <Card>
                <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>  
                    <Row className="pb-4">
                        <Col className="mt-2 mb-0 col-5" style={{fontSize:'15px',color:'#696969',fontWeight:'600'}}>DOCUMENT</Col>
                        <Col>
                            <Input type="select"
                                value={booking.document_bookmark_seq?booking.document_bookmark_seq:'0'}
                                style={{height:'35px',fonztSize:'10px',border:'0',borderBottom:'1px solid silver',borderRadius:'0',textAlignLast:'center'}}
                                onChange={(e) => {
                                    fncSelectDocument(e)
                                }}>
                                <option key={0} value='0'>
                                    선택
                                </option>
                                {documentList.length > 0 ?documentList.map((element,key)=>{
                                    return(
                                        <option key={key} value={element.document_bookmark_seq}>
                                            {element.document_bookmark_name}
                                        </option>
                                    )
                                })
                                :<></>}
                            </Input>
                        </Col>
                    </Row>
                    <Collapse isOpen={coll}>
                        {/* 보이는 영역 */}
                        <Row xl="6" lg="6" sm="12">
                            <CardBody onClick={toggle.bind(this, 'S')}>
                                <CardTitle>담당자 : </CardTitle>
                                <CardText tag="h5" className="font-weight-bold">{booking.docu_user_name}</CardText>
                                <CardTitle>Tel : </CardTitle>
                                <CardText tag="h5" className="font-weight-bold">{booking.docu_user_tel}</CardText>
                                <CardTitle>Phone : </CardTitle>
                                <CardText tag="h5" className="font-weight-bold">{booking.docu_user_phone}</CardText>
                                <CardTitle>Fax : </CardTitle>
                                <CardText tag="h5" className="font-weight-bold">{booking.docu_user_fax}</CardText>
                                <CardTitle>E-mail : </CardTitle>
                                <CardText tag="h5" className="font-weight-bold">{booking.docu_user_email}</CardText>
                                <CardTitle>Tax E-mail : </CardTitle>
                                <CardText tag="h5" className="font-weight-bold">{booking.docu_tax_email}</CardText>
                            </CardBody>
                        </Row>
                    </Collapse>
                    <div className="text-right">
                        <hr style={{position:'absolute',height:'0.5px',border:'0',width:'100%',left:'0',marginTop:'19px',backgroundColor:'silver'}}/>
                        <div>
                            <DocumentBookmark
                                // setParentDocument={setParentDocument}
                                // setParentDocumentList={setParentDocumentList}
                                documentList={documentList}
                                selectBookingDocumentBookmark={selectBookingDocumentBookmark}
                                />
                            <Button
                                className="btn-round btn-just-icon mr-1"
                                color="default"
                                outline
                                id="shpview"
                                onClick={toggle.bind(this, 'S')}
                                style={{position:'relative',backgroundColor:'white'}}
                            >
                            <i className="fa fa-window-restore"/>
                            </Button>
                            <UncontrolledTooltip delay={0} target="shpview">Window Input</UncontrolledTooltip>
                            <Button
                                className="btn-round btn-just-icon mr-1"
                                color="default"
                                outline
                                id="shpmore"
                                onClick={() => setColl(!coll)}
                                style={{position:'relative',backgroundColor:'white'}}
                            >
                            <i className="fa fa-ellipsis-v" />
                            </Button>
                            <UncontrolledTooltip delay={0} target="shpmore">Open</UncontrolledTooltip>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    </Row>
        
        {/* 모달 팝업 영역 
        xs : 한 줄
        sm : 576px 에서 다음 줄로 넘어감
        md : 768px
        lg : 992px
        xl : 1200px
        fluid : 뷰포트 전체의 너비
        */}
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="lg">
            <ModalHeader toggle={toggle}>Document</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">

                        <Document
                            document={booking}
                            fncOnBlurDocument={fncOnBlurDocument}
                            />
                    </CardBody>
                </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={updateDocumentOfBooking}>Save</Button>
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

export default DocumentCard;