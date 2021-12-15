/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,
    Col, CardBody, Button,FormGroup, Table, UncontrolledTooltip,
    Nav, NavItem, TabContent, TabPane, NavLink, Card} from "reactstrap";
import {ContainerForm} from "./Container.js";
import {SpecialForm} from "./Special.js";
import AlertMessage from "../AlertMessage.js";
import axios from "axios";
import classnames from 'classnames';
import SpeicalBookmarkRelation from './SpecialBookmarkRelation.js';


const ContainerBookmark = (props) => {
    
    // Collapse Flag
    const [coll, setColl] = useState(false);

    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    // Container
    const [container, setContainer] = useState({});
    const [containerBookmarkList, setContainerBookmarkList] = useState([]);
    // Special
    const [special, setSpecial] = useState({});
    const [specialBookmarkList, setSpecialBookmarkList] = useState([]);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // Alert을 위한 state
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState("success");
    const [message, setMessage] = useState("정상 처리되었습니다.");
    // Tab
    const [activeTab, setActiveTab] = useState('1');
    // Container 와 Special Bookmark 관계 목록
    const [specialBookmarkRelationList, setSpecialBookmarkRelationList] = useState([{'key':1}]);
    
    // Container Bookmark 초기화
    useEffect(() => {
        setContainerBookmarkList(props.containerBookmarkList);
        setSpecialBookmarkList(props.specialBookmarkList);
    },[props]);

    useEffect(()=>{
        if( container.container_bookmark_seq ) {
            selectBookingContainerSpecialBookmarkRelation();
        }
    },[container]);

    const fncInitContainerBookmark=(e)=>{
        e.preventDefault();
        // 초기값
        setContainer( {['cargo_type']:'1', ['cargo_pack_type']:'1'});
        setSpecialBookmarkRelationList([{'key':1}]);
    }

    // Container Bookmark 저장
    const fncSaveContainerBookmark=(e)=>{
        e.preventDefault(e);
        if( !container.container_bookmark_seq || '0' === container.container_bookmark_seq ) {
            insertBoookingContainerBookmark();
        } else {
            updateBoookingContainerBookmark();
        }
    }

    // Insert Container Bookmark
    const insertBoookingContainerBookmark = () => {
        const body =
        axios.post(
            "/api/insertBoookingContainerBookmark"
            ,{
                user_no : 'M000002',
                container,
                specialBookmarkRelationList
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingContainerBookmark();
                props.selectBookingSpecialBookmark();
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Update Container Bookmark
    const updateBoookingContainerBookmark = () => {
        const body =
        axios.post(
            "/api/updateBoookingContainerBookmark"
            ,{
                user_no : 'M000002',
                container,
                specialBookmarkRelationList
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingContainerBookmark();
                props.selectBookingSpecialBookmark();
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Container Bookmark 삭제
    const fncDeleteContainerBookmark=(e)=>{
        const body =
        axios.post(
            "/api/deleteBookingContainerBookmark"
            ,{
                user_no : 'M000002',
                container,
                // goodsRelationList
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingContainerBookmark();
                props.selectBookingSpecialBookmark();
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    const fncInitSpecialBookmark=(e)=>{
        e.preventDefault();
        // 초기값
        setSpecial( {['cargo_type']:'1', ['cargo_pack_type']:'1'});
        // setGoodsRelationList([{'key':1}]);
    }
    // Special Bookmark 저장
    const fncSaveSpecialBookmark=(e)=>{
        e.preventDefault(e);
        if( !special.container_special_bookmark_seq || '0' === special.container_special_bookmark_seq ) {
            insertBookingSpecialBookmark();
        } else {
            updateBookingSpecialBookmark();
        }
    }
    // Insert Special Bookmark
    const insertBookingSpecialBookmark = () => {
        const body =
        axios.post(
            "/api/insertBookingSpecialBookmark"
            ,{
                user_no : 'M000002',
                special,
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingSpecialBookmark();
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Update Special Bookmark
    const updateBookingSpecialBookmark = () => {
        const body =
        axios.post(
            "/api/updateBookingSpecialBookmark"
            ,{
                user_no : 'M000002',
                special,
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingSpecialBookmark();
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Container Bookmark 삭제
    const fncDeleteSpecialBookmark=(e)=>{
        const body =
        axios.post(
            "/api/deleteBookingSpecialBookmark"
            ,{
                user_no : 'M000002',
                special,
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingSpecialBookmark();
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Container Special Relation Bookmark 조회
    const selectBookingContainerSpecialBookmarkRelation = () => {
        axios.post(
            "/api/selectBookingContainerSpecialBookmarkRelation"
            ,{ 
            user_no: 'M000002',
            container
        }
            ,{}
        ).then(
            res => {
                setSpecialBookmarkRelationList(res.data);
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }
    const clickTab = (tab) => {
        if(activeTab !== tab ) setActiveTab(tab);
    }
    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }
    // Alert 메세지 팝업
    const onDismiss = (color, message) => {
        setColor(color);
        setMessage(message);
        setVisible(!visible);
    }
    const fncOnBlur = (container) => {
        setContainer(container);
    }
    const fncOnBlurSpeical = (special) => {
        setSpecial(special);
    }
    const fncOnBlurSpecialRelation=(specialBookmarkRelationList)=>{
        setSpecialBookmarkRelationList(specialBookmarkRelationList);
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
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="xl">
            <ModalHeader toggle={toggle}>Conatiner</ModalHeader>
                <ModalBody className={clsNm}>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active:activeTab === '1' })}
                                onClick={()=>{clickTab('1');}}>
                                    Container
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active:activeTab === '2' })}
                                onClick={()=>{clickTab('2');}}>
                                    Special
                                </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col>Container BookMark List</Col>
                            </Row>
                            <Row className="mb-3">
                                <Col xl="12" lg="12" md="12">
                                    <FormGroup style={{height:'150px',overflow:'auto'}} className="mb-0">
                                        <Card className="card-raised card-form-horizontal no-transition mb-0">
                                            <CardBody className="bg-white p-0">
                                                <Table hover size="sm">
                                                    <thead>
                                                        <tr>
                                                            <td>No.</td>
                                                            <td>Bookmark</td>
                                                            <td>SIZE/TYPE</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {containerBookmarkList.map((element,key)=>{
                                                        return(
                                                            <tr scope="row" key={key} onClick={()=>{setContainer(element)}}>
                                                                <td>{element.container_bookmark_seq}</td>
                                                                <td>{element.container_bookmark_name}</td>
                                                                <td>{element.cntr_code_name}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                    </tbody>
                                                </Table>
                                            </CardBody>
                                        </Card>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <ContainerForm
                                container={container}
                                fncOnBlur={fncOnBlur}
                                />
                            <SpeicalBookmarkRelation
                                specialBookmarkList={specialBookmarkList}
                                specialBookmarkRelationList={specialBookmarkRelationList}
                                fncOnBlurSpecialRelation={fncOnBlurSpecialRelation}/>
                            <ModalFooter>
                                <Button color="primary" onClick={(e)=>fncInitContainerBookmark(e)}>New</Button>{' '}
                                <Button color="primary" onClick={(e)=>fncSaveContainerBookmark(e)}>Save</Button>{' '}
                                <Button color="primary" onClick={(e)=>fncDeleteContainerBookmark(e)}>Delete</Button>{' '}
                                <Button color="secondary" onClick={toggle}>Cancel</Button>
                            </ModalFooter>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col>Special BookMark List</Col>
                            </Row>
                            <Row className="mb-3">
                                <Col xl="12" lg="12" md="12">
                                    <FormGroup style={{height:'150px',overflow:'auto'}} className="mb-0">
                                        <Card className="card-raised card-form-horizontal no-transition mb-0">
                                            <CardBody className="bg-white p-0">
                                                <Table hover size="sm">
                                                    <thead>
                                                        <tr>
                                                            <td>No.</td>
                                                            <td>Bookmark</td>
                                                            <td>UNDG</td>
                                                            <td>IMDG</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {specialBookmarkList.map((element,key)=>{
                                                        return(
                                                            <tr scope="row" key={key} onClick={()=>{setSpecial(element)}}>
                                                                <td>{element.container_special_bookmark_seq}</td>
                                                                <td>{element.container_special_bookmark_name}</td>
                                                                <td>{element.special_undg}</td>
                                                                <td>{element.special_imdg}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                    </tbody>
                                                </Table>
                                            </CardBody>
                                        </Card>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <SpecialForm
                                special={special}
                                fncOnBlur={fncOnBlurSpeical}
                                />
                            <ModalFooter>
                                <Button color="primary" onClick={(e)=>fncInitSpecialBookmark(e)}>New</Button>{' '}
                                <Button color="primary" onClick={(e)=>fncSaveSpecialBookmark(e)}>Save</Button>{' '}
                                <Button color="primary" onClick={(e)=>fncDeleteSpecialBookmark(e)}>Delete</Button>{' '}
                                <Button color="secondary" onClick={toggle}>Cancel</Button>
                            </ModalFooter>
                        </TabPane>
                    </TabContent>
                </ModalBody>
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

export default ContainerBookmark;