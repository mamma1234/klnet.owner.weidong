/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, Card,
    CardBody, Button,FormGroup, Table, UncontrolledTooltip,
    TabContent, TabPane, Nav, NavItem, NavLink} from "reactstrap";
import CargoWdfc from "./CargoWdfc.js";
import axios from "axios";
import classnames from 'classnames';
import GoodsBookmarkRelationWdfc from './GoodsBookmarkRelationWdfc.js';
import GoodsBookmarkWdfc from './GoodsBookmarkWdfc.js';
import * as validation from 'components/common/validation.js';

const CargoBookmark = (props) => {
    const [open, setOpen] = useState(false);
    // Cargo
    const [cargo, setCargo] = useState({});
    const [cargoBookmarkList, setCargoList] = useState([]);
    // Goods
    const [goods, setGoods] = useState([]);
    // Goods Bookmark List
    const [goodsBookmarkList, setGoodsBookmarkList] = useState([]);
    const [goodsRelationList, setGoodsRelationList] = useState([]);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // Tab
    const [activeTab, setActiveTab] = useState('1');
    const {user} = props;

    useEffect(() => {
    //   console.log("렌더링 될 때마다 수행");
        // if( car)
        // setCargo( {['cargo_type']:'1', ['cargo_pack_type']:'1'});
    },[]);

    useEffect(() => {
        setCargoList(props.cargoBookmarkList);
        setGoodsBookmarkList(props.goodsBookmarkList);
        
    }, [props.cargoBookmarkList]);

    useEffect(() => {
        if( {} === props.bookingCarog) {
            setCargo( {['cargo_type']:'1', ['cargo_pack_type']:'1'});
        } else {
            setCargo(props.bookingCarog);
        }
    }, [props.bookingCarog]);

    useEffect(() => {
        if( cargo.cargo_bookmark_seq ) {
            selectBookingCargoBookmarkRelation();
        }
    }, [cargo]);

    // Cargo Bookmark 입력하기
    const fncSaveCargoBookmark=(e)=>{
        e.preventDefault(e);
        if( !cargo.cargo_bookmark_seq || '0' === cargo.cargo_bookmark_seq ) {
            insertBookingCargoBookmark();
        } else {
            updateBookingCargoBookmark();
        }
    }

    // Insert Cargo Bookmark
    const insertBookingCargoBookmark = () => {
        const body =
        axios.post(
            "/shipper/insertBookingCargoBookmark"
            ,{
                user_no : user?user.user_no:null,
                cargo,
                goodsRelationList
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.SAVE_MSG);
                props.selectBookingCargoBookmark();
                props.selectBookingCargoGoodsBookmark();
            }
        );
    }

    // Update Cargo Bookmark
    const updateBookingCargoBookmark = () => {
        const body =
        axios.post(
            "/shipper/updateBookingCargoBookmark"
            ,{
                user_no : user?user.user_no:null,
                cargo,
                goodsRelationList
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.SAVE_MSG);
                props.selectBookingCargoBookmark();
                props.selectBookingCargoGoodsBookmark();
            }
        );
    }

    // Delete Cargo Bookmark
    const deleteBookingCargoBookmark = () => {
        if( !cargo.cargo_bookmark_seq ) {
            props.onNotiAlert("danger", "삭제할 Bookmark를 선택하세요.");
            return false;
        }
        const body =
        axios.post(
            "/shipper/deleteBookingCargoBookmark"
            ,{
                user_no : user?user.user_no:null,
                cargo
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.DEL_MSG);
                props.selectBookingCargoBookmark();
                setCargo({});
            }
        );
    }

    const fncOnBlur = (cargo) => {
        setCargo(cargo);
    }
    const fncOnBlurGoods = (goods) => {
        setGoods(goods);
    }
    const fncOnBlurGoodsRelation = (goodsRelationList) => {
        setGoodsRelationList(goodsRelationList);
    }
    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }

    // New Cargo Bookmark
    const fncInitCargoBookmark = (e) => {
        e.preventDefault();
        // cargo_type, cargo_pack_type 은 초기값
        setCargo( {['cargo_type']:'1', ['cargo_pack_type']:'1'});
        setGoodsRelationList([{'key':1}]);
    }
    // New Goods Bookmark
    const fncInitGoods = (e) => {
        e.preventDefault();
        setGoods({});
    }

    const clickTab = (tab) => {
        if(activeTab !== tab ) setActiveTab(tab);
    }

    // Cargo Bookmark 입력하기
    const fncSaveGoodsBookmark=(e)=>{
        e.preventDefault(e);
        if( !user ) {
            props.onNotiAlert("error",validation.NOTLOGIN_MSG);
        }
        if( !goods.cargo_goods_bookmark_seq || '0' === goods.cargo_goods_bookmark_seq ) {
            insertBookingCargoGoodsBookmark();
        } else {
            updateBoookingCargoGoodsBookmark();
        }
    }

    // Insert Goods Bookmark
    const insertBookingCargoGoodsBookmark = () => {
        const body =
        axios.post(
            "/shipper/insertBookingCargoGoodsBookmark"
            ,{
                user_no : user?user.user_no:null,
                goods
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.SAVE_MSG);
                props.selectBookingCargoGoodsBookmark();
            }
        );
    }

    // Update Goods Bookmark
    const updateBoookingCargoGoodsBookmark = () => {
        const body =
        axios.post(
            "/shipper/updateBoookingCargoGoodsBookmark"
            ,{
                user_no : user?user.user_no:null,
                goods
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.SAVE_MSG);
                props.selectBookingCargoGoodsBookmark();
            }
        );
    }

    // Delete Goods Bookmark
    const deleteBoookingCargoGoodsBookmark = () => {
        if( !goods.cargo_goods_bookmark_seq ) {
            props.onNotiAlert("danger", "삭제할 Bookmark를 선택하세요.");
            return false;
        }
        const body =
        axios.post(
            "/shipper/deleteBoookingCargoGoodsBookmark"
            ,{
                user_no : user?user.user_no:null,
                goods
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.SAVE_MSG);
                props.selectBookingCargoGoodsBookmark();
                setCargo({});
            }
        );
    }

    // Cargo Bookmark 조회
    const selectBookingCargoBookmarkRelation = () => {
        axios.post(
            "/shipper/selectBookingCargoBookmarkRelation"
            ,{ 
            user_no: user?user.user_no:null,
            line_code: 'WDFC',
            cargo
        }
            ,{}
        ).then(
            res => {
                setGoodsRelationList(res.data);
            }
        );
    }

    
    return (
    <>
        <Button className="pl-0 pr-0" 
            color="link" id="linebookmark"
            onClick={toggle.bind(this, 'B')}>
                <i className="fa fa-bookmark-o fa-2x" />
        </Button>
        <UncontrolledTooltip delay={0} target="linebookmark">Bookmark</UncontrolledTooltip>
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="lg">
            <ModalHeader toggle={toggle}>Cargo</ModalHeader>
            <ModalBody className={clsNm}>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active:activeTab === '1' })}
                            onClick={()=>{clickTab('1');}}
                            style={{paddingBottom: '20px'}}>
                                <h3>Cargo</h3>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active:activeTab === '2' })}
                            onClick={()=>{clickTab('2');}}
                            style={{paddingBottom: '20px'}}>
                                <h3>Goods</h3>
                            </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col>Cargo BookMark List</Col>
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
                                                        <td className="p-2 bg-info">Goods 연결</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {(cargoBookmarkList.length>0)?cargoBookmarkList.map((element,key)=>{
                                                    // console.log(cntrList, key, element)
                                                    return(
                                                        <tr scope="row" key={key} onClick={()=>{setCargo({...element})}}
                                                        style={element.cargo_bookmark_seq===cargo.cargo_bookmark_seq?{backgroundColor:'aliceblue'}:{backgroundColor:''}}>
                                                            <td>{element.cargo_bookmark_seq}</td>
                                                            <td>{element.cargo_bookmark_name}</td>
                                                            <td>{element.cargo_name}</td>
                                                            <td data-toggle="tooltip"
                                                                id={"tooltip"+key}>{element.relation_yn}
                                                            {element.relation_bookmark?<UncontrolledTooltip
                                                                delay={0}
                                                                placement="right"
                                                                target={"tooltip"+key}
                                                            >{element.relation_bookmark}</UncontrolledTooltip>:
                                                            <></>}
                                                            </td>
                                                        </tr>
                                                    )
                                                }):<></>}
                                                </tbody>
                                            </Table>
                                        </CardBody>
                                </FormGroup>
                            </Col>
                        </Row>
                        <CargoWdfc
                            cargo={cargo}
                            fncOnBlur={fncOnBlur}
                            openType={"BOOK"}
                            cargoTypeList={props.cargoTypeList}
                            cargoPackTypeList={props.cargoPackTypeList}
                            {...props}
                            />
                        <GoodsBookmarkRelationWdfc
                            goodsRelationList={goodsRelationList}
                            goodsBookmarkList={goodsBookmarkList}
                            fncOnBlurGoodsRelation={fncOnBlurGoodsRelation}
                            {...props}
                            />
                        <ModalFooter>
                            <Button color="primary" onClick={(e)=>fncInitCargoBookmark(e)}>New</Button>{' '}
                            <Button color="primary" onClick={(e)=>fncSaveCargoBookmark(e)}>Save</Button>{' '}
                            <Button color="primary" onClick={(e)=>deleteBookingCargoBookmark(e)}>Delete</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col>Goods BookMark List</Col>
                        </Row>
                        {/* <CardBody className="pt-2 pb-2 bg-white"> */}
                        <Row className="mb-3">
                            <Col xl="12" lg="12" md="12">
                                <FormGroup style={{height:'150px',overflow:'auto'}} className="mb-0">
                                    <Card className="card-raised card-form-horizontal no-transition mb-0">
                                        <CardBody className="bg-white p-0">
                                            <Table className="mb-0" responsive hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <td className="p-2 bg-info">No.</td>
                                                        <td className="p-2 bg-info">Name</td>
                                                        <td className="p-2 bg-info">DESC</td>
                                                        <td className="p-2 bg-info">Cargo 연결</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {(goodsBookmarkList.length>0)?goodsBookmarkList.map((element,key)=>{
                                                    // console.log(cntrList, key, element)
                                                    return(
                                                        <tr scope="row" key={key} onClick={()=>{setGoods(element)}}>
                                                            <td>{element.cargo_goods_bookmark_seq}</td>
                                                            <td>{element.cargo_goods_bookmark_name}</td>
                                                            <td>{element.goods_desc1}</td>
                                                            <td data-toggle="tooltip"
                                                                id={"tooltip"+key}>{element.relation_yn}
                                                            {element.relation_bookmark?<UncontrolledTooltip
                                                                delay={0}
                                                                placement="right"
                                                                target={"tooltip"+key}
                                                            >{element.relation_bookmark}</UncontrolledTooltip>:
                                                            <></>}
                                                            </td>
                                                        </tr>
                                                    )
                                                }):<></>}
                                                </tbody>
                                            </Table>
                                        </CardBody>
                                    </Card>
                                </FormGroup>
                            </Col>
                        </Row>
                        <GoodsBookmarkWdfc
                            goods={goods}
                            fncOnBlurGoods={fncOnBlurGoods}
                            {...props}
                            />
                        <ModalFooter>
                            <Button color="primary" onClick={(e)=>fncInitGoods(e)}>New</Button>{' '}
                            <Button color="primary" onClick={(e)=>fncSaveGoodsBookmark(e)}>Save</Button>{' '}
                            <Button color="primary" onClick={(e)=>deleteBoookingCargoGoodsBookmark(e)}>Delete</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </TabPane>
                </TabContent>
            </ModalBody>
            
        </Modal>
    </>
    );
}

export default CargoBookmark;