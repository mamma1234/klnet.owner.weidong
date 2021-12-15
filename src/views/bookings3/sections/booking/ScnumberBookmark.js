/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Button,FormGroup, Table, Label, Input} from "reactstrap";
import axios from 'axios';

const ScnumberBookmark = (props) => {
    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    const [clsNm, setClsNm] = useState("");
    const [scnumber, setScnumber] = useState({});
    const [scnumberList, setScnumberList] = useState([]);
    
    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
        getScnumberBookmark();
    }

    useEffect(() => {
        getScnumberBookmark();
    },[]);

    useEffect(() => {
        setScnumber(props.scnumber);
    },[props]);

    // 자식에게 받은 document
    const fncChangedDocument = ( scnumber ) => {
        setScnumber( scnumber );
    }

    // 신규 추가 시
    const fncScnumber = () => {
        setScnumber({
            scnumber_bookmark_seq: '',
            scnumber_bookmark_name: '',
            sc_number: '',
            remark1: '',
            remark2: ''
        });
    }

    // save
    const saveScnumberBookmark = () => {
        if( scnumber.scnumber_bookmark_seq ) {
            updateScnumberBookmark();
        } else {
            insertScnumberBookmark();
        }
    }

    // 조회
    const getScnumberBookmark = () => {
        axios.post(
            "/api/getScnumberBookmark"
            ,{ user_no: 'TEST0' }
            ,{}
        ).then(
            setScnumberList([])
        ).then(
            res => setScnumberList(res.data)
        ).catch(err => {
            if(err.response.status === 403||err.response.status === 401) {
                alert(err);
            }
        });
    }

    // 입력
    const insertScnumberBookmark = () => {
        const body =
        axios.post(
            "/api/insertScnumberBookmark"
            ,{
                user_no : 'TEST0',
                scnumber
            }
            ,{}
        ).then(
            setScnumberList([])
        ).then(
            getScnumberBookmark()
        ).catch(err => {
            if(err.response.status === 403||err.response.status === 401) {
                alert(err);
            }
        });
    }

    // 수정
    const updateScnumberBookmark = () => {
        axios.post(
            "/api/updateScnumberBookmark"
            ,{ 
                user_no : 'TEST0',
                scnumber 
            }
            ,{}
        ).then(
            setScnumberList([])
        ).then(
            getScnumberBookmark()
        ).catch(err => {
            if(err.response.status === 403||err.response.status === 401) {
                alert(err);
            }
        });
    }

    // 삭제
    const deleteScnumberBookmark = () => {
        axios.post(
            "/api/deleteScnumberBookmark"
            ,{ scnumber }
            ,{}
        ).then(
            // setCalendarData([])
        ).then(
            // res => setCalendarData(res.data)
        ).catch(err => {
            if(err.response.status === 403||err.response.status === 401) {
                alert(err);
            }
        });
    }

    const fncOnChange = (key, value, e) => {
        e.preventDefault();
        setScnumber({...scnumber, [key]:value});
    }


  // 전체화면 css 적용을 위한 state
  return (
    <>
        <Button close aria-label="Cancel" onClick={toggle.bind(this, 'S')}>
            <span aria-hidden>&#10084;</span>
        </Button>
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="lg">
            <ModalHeader toggle={toggle}>Sc Number Bookmark</ModalHeader>
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
                                                <th>Sc Number</th>
                                                <th>NAME</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {scnumberList.map((element,key)=>{
                                            return(
                                                <tr scope="row" key={key} onClick={()=>{setScnumber(element)}}>
                                                    <td>{element.scnumber_bookmark_seq}</td>
                                                    <td>{element.sc_number}</td>
                                                    <td>{element.scnumber_bookmark_name}</td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </Table>
                                </Row>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xl="6" lg="6" md="12">
                            <FormGroup>
                                <Label className="mb-0">SC Number</Label>
                                <Input type="text" name="sc_number"
                                    id="sc_number" placeholder="SC NUMBER"
                                    value={scnumber?scnumber.sc_number:''}
                                    maxLength="20"
                                    onChange={(e)=>fncOnChange('sc_number' , e.target.value, e)}
                                    onBlur={(e)=>fncChangedDocument(e)}
                                    />
                            </FormGroup>
                        </Col>
                    <Col xl="6" lg="6" md="12">
                        <FormGroup>
                            <Label className="mb-0">Name</Label>
                            <Input type="text" name="scnumber_bookmark_name"
                                id="scnumber_bookmark_name" placeholder="NAME"
                                maxLength="50"
                                value={scnumber?scnumber.scnumber_bookmark_name:''}
                                onChange={(e)=>fncOnChange('scnumber_bookmark_name' , e.target.value, e)}
                                onBlur={(e)=>fncChangedDocument(e)}
                                />
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xl="12" lg="12" md="12">
                            <FormGroup>
                                <Label className="mb-0">Remark1</Label>
                                <Input type="text" name="remark1"
                                    id="remark1" placeholder="REMARK 1"
                                    value={scnumber?scnumber.remark1:''}
                                    maxLength="70"
                                    onChange={(e)=>fncOnChange('remark1' , e.target.value, e)}
                                    onBlur={(e)=>fncChangedDocument(e)}
                                    />
                            </FormGroup>
                        </Col>
                        <Col xl="12" lg="12" md="12">
                            <FormGroup>
                                <Label className="mb-0">Phone</Label>
                                <Input type="text" name="remark2"
                                    id="remark2" placeholder="REMARK 2"
                                    value={scnumber?scnumber.remark2:''}
                                    maxLength="70"
                                    onChange={(e)=>fncOnChange('remark2' , e.target.value, e)}
                                    onBlur={(e)=>fncChangedDocument(e)}
                                    />
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={fncScnumber}>New</Button>
                <Button color="primary" onClick={saveScnumberBookmark}>Save</Button>
                <Button color="primary" onClick={deleteScnumberBookmark}>Delete</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>
    );
}

export default ScnumberBookmark;