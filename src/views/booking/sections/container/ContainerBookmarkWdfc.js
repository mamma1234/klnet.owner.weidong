/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,
    Col, CardBody, Button,FormGroup, Table, UncontrolledTooltip,
    Nav, NavItem, TabContent, TabPane, NavLink, Card} from "reactstrap";
import {ContainerForm} from "./ContainerWdfc.js";
import DoorWdfc from "./DoorWdfc.js";
import axios from "axios";
import classnames from 'classnames';
//import SpeicalBookmarkRelation from './SpecialBookmarkRelation.js';
import * as validation from 'components/common/validation.js';

const ContainerBookmarkWdfc = (props) => {
    
    // Collapse Flag
    const [coll, setColl] = useState(false);

    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    // Container
    const [container, setContainer] = useState({'cntr_soc_yn':'N'});
    const [containerBookmarkList, setContainerBookmarkList] = useState([]);
    // Special
    const [special, setSpecial] = useState({});
    const [specialBookmarkList, setSpecialBookmarkList] = useState([]);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // Tab
    const [activeTab, setActiveTab] = useState('1');
    // Container 와 Special Bookmark 관계 목록
    const [specialBookmarkRelationList, setSpecialBookmarkRelationList] = useState([{'key':1}]);
    const {user} = props;
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
        setContainer( {'cntr_soc_yn':'N'});
        setSpecialBookmarkRelationList([{'key':1}]);
    }

    const validationContainer=()=>{
        if( !container.container_bookmark_name ) return false;
        return true;
    }
    // Container Bookmark 저장
    const fncSaveContainerBookmark=(e)=>{
        e.preventDefault(e);
        if( !user ) {
            props.onNotiAlert("danger", "로그인을 해주세요.");
            return false;
        }
        if( !validationContainer() ) return false;
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
            "/shipper/insertBoookingContainerBookmark"
            ,{
                user_no : user?user.user_no:null,
                container,
                specialBookmarkRelationList
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.SAVE_MSG);
                props.selectBookingContainerBookmark();
                props.selectBookingSpecialBookmark();
            }
        );
    }

    // Update Container Bookmark
    const updateBoookingContainerBookmark = () => {
        const body =
        axios.post(
            "/shipper/updateBoookingContainerBookmark"
            ,{
                user_no : user?user.user_no:null,
                container,
                specialBookmarkRelationList
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.SAVE_MSG);
                props.selectBookingContainerBookmark();
                props.selectBookingSpecialBookmark();
            }
        );
    }

    // Container Bookmark 삭제
    const fncDeleteContainerBookmark=(e)=>{
        const body =
        axios.post(
            "/shipper/deleteBookingContainerBookmark"
            ,{
                user_no : user?user.user_no:null,
                container,
                // goodsRelationList
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.DEL_MSG);
                props.selectBookingContainerBookmark();
                props.selectBookingSpecialBookmark();
                setContainer({});
            }
        );
    }

    const fncInitSpecialBookmark=(e)=>{
        e.preventDefault();
        // 초기값
        setSpecial( {['cargo_type']:'1', ['cargo_pack_type']:'1'});
        // setGoodsRelationList([{'key':1}]);
    }

    const validationSpecial=()=>{
        if( !special.container_special_bookmark_name ) return false;
        return true;
    }
    // Special Bookmark 저장
    const fncSaveSpecialBookmark=(e)=>{
        e.preventDefault(e);
        if( !user ) {
            props.onAlert("error",validation.NOTLOGIN_MSG);   
            return false;
        }
        if( !validationSpecial() ) return false;
        if( !special.container_special_bookmark_seq || '0' === special.container_special_bookmark_seq ) {
            insertBookingSpecialBookmark();
        } else {
            updateBookingSpecialBookmark();
        }
    }
    // Insert Special Bookmark
    const insertBookingSpecialBookmark = () => {
        axios.post(
            "/shipper/insertBookingSpecialBookmark"
            ,{
                user_no : user?user.user_no:null,
                special,
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.SAVE_MSG);
                props.selectBookingSpecialBookmark();
            }
        );
    }

    // Update Special Bookmark
    const updateBookingSpecialBookmark = () => {
        axios.post(
            "/shipper/updateBookingSpecialBookmark"
            ,{
                user_no : user?user.user_no:null,
                special,
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.SAVE_MSG);
                props.selectBookingSpecialBookmark();
            }
        );
    }

    // Container Bookmark 삭제
    const fncDeleteSpecialBookmark=(e)=>{
        axios.post(
            "/shipper/deleteBookingSpecialBookmark"
            ,{
                user_no : user?user.user_no:null,
                special,
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.SAVE_MSG);
                props.selectBookingSpecialBookmark();
            }
        );
    }

    // Container Special Relation Bookmark 조회
    const selectBookingContainerSpecialBookmarkRelation = () => {
        axios.post(
            "/shipper/selectBookingContainerSpecialBookmarkRelation"
            ,{ 
            user_no: user?user.user_no:null,
            container
        }
            ,{}
        ).then(
            res => {
                setSpecialBookmarkRelationList(res.data);
            }
        );
    }
    const clickTab = (tab) => {
        if(activeTab !== tab ) setActiveTab(tab);
    }
    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
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

    const fncOnBlurDoor =(door)=>{
        console.log(door)
        setContainer(door)
    }
  return (
    <>
        <Button className="pl-0 pr-0" 
            color="link" id="linebookmark"
            onClick={toggle.bind(this, 'B')}>
                <i className="fa fa-bookmark-o fa-2x" />
        </Button>
        <UncontrolledTooltip delay={0} target="linebookmark">Bookmark</UncontrolledTooltip>
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="xl">
            <ModalHeader toggle={toggle}>Container</ModalHeader>
                <ModalBody className={clsNm}>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active:activeTab === '1' })}
                                onClick={()=>{clickTab('1');}}
                                style={{paddingBottom: '20px'}}>
                                    <h3>Container</h3>
                            </NavLink>
                        </NavItem>
                        {/* <NavItem>
                            <NavLink
                                className={classnames({ active:activeTab === '2' })}
                                onClick={()=>{clickTab('2');}}
                                style={{paddingBottom: '20px'}}>
                                    <h3>Door</h3>
                            </NavLink>
                        </NavItem> */}
                    </Nav>
                    <TabContent activeTab={activeTab} >
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
                                                            <td className="p-2 bg-info">No.</td>
                                                            <td className="p-2 bg-info">Bookmark</td>
                                                            <td className="p-2 bg-info">SIZE/TYPE</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {containerBookmarkList.map((element,key)=>{
                                                        return(
                                                            <tr scope="row" key={key} onClick={()=>{setContainer(element)}}
                                                            style={element.container_bookmark_seq===container.container_bookmark_seq?{backgroundColor:'aliceblue'}:{backgroundColor:''}}>
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
                            <Row>
                                <Col md="3">
                                    <ContainerForm
                                        container={container}
                                        fncOnBlur={fncOnBlur}
                                        openType={"BOOK"}
                                        {...props}
                                        />
                                </Col>
                                <Col md="9">
                                    <DoorWdfc
                                        door={container}
                                        booking={props.booking}
                                        openType={"BOOK"}
                                        fncOnBlurDoor={fncOnBlurDoor}
                                        {...props}
                                    />
                                </Col>
                            </Row>
                            <ModalFooter>
                                <Button color="primary" onClick={(e)=>fncInitContainerBookmark(e)}>New</Button>{' '}
                                <Button color="primary" onClick={(e)=>fncSaveContainerBookmark(e)}>Save</Button>{' '}
                                <Button color="primary" onClick={(e)=>fncDeleteContainerBookmark(e)}>Delete</Button>{' '}
                                <Button color="secondary" onClick={toggle}>Cancel</Button>
                            </ModalFooter>
                        </TabPane>
                        {/* <TabPane tabId="2">
                            <Row>
                                <Col>Door Bookmark</Col>
                            </Row>
                            <Row className="mb-3">
                                <Col xl="12" lg="12" md="12">
                                    <FormGroup style={{height:'150px',overflow:'auto'}} className="mb-0">
                                        <Card className="card-raised card-form-horizontal no-transition mb-0">
                                            <CardBody className="bg-white p-0">
                                                <Table hover size="sm">
                                                    <thead>
                                                        <tr>
                                                            <td className="p-2 bg-info">No.</td>
                                                            <td className="p-2 bg-info">Bookmark</td>
                                                            <td className="p-2 bg-info">UNDG</td>
                                                            <td className="p-2 bg-info">IMDG</td>
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
                            <DoorWdfc
                                door={props.door}
                                booking={props.booking}
                                openType={"BOOK"}
                                fncOnBlurDoor={fncOnBlurDoor}
                                {...props}
                            />
                            <ModalFooter>
                                <Button color="primary" onClick={(e)=>fncInitSpecialBookmark(e)}>New</Button>{' '}
                                <Button color="primary" onClick={(e)=>fncSaveSpecialBookmark(e)}>Save</Button>{' '}
                                <Button color="primary" onClick={(e)=>fncDeleteSpecialBookmark(e)}>Delete</Button>{' '}
                                <Button color="secondary" onClick={toggle}>Cancel</Button>
                            </ModalFooter>
                        </TabPane> */}
                    </TabContent>
                </ModalBody>
        </Modal>
        
    </>
    );
}

export default ContainerBookmarkWdfc;