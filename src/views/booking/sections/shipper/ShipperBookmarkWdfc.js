/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody
    , Button,FormGroup, Table, UncontrolledTooltip} from "reactstrap";
import ShipperWdfc from "./ShipperWdfc.js";
import axios from 'axios';
import * as validation from 'components/common/validation.js';

const ShipperBookmarkWdfc = (props) => {
    
    // modal 창을 위한 state
    //const [coll, setColl] = useState(false);
    const [open, setOpen] = useState(false);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // Shipper
    const [shipper, setShipper] = useState({});
    const [shipperList, setShipperList] = useState([]);
    const {user, shipperCompanyList} = props;

    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }
    
    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    useEffect(() => {
        setShipperList(props.shipperList);
    }, [props.shipperList]);

    useEffect(() => {
        setShipper(props.booking);
    }, [props.booking]);

    // New Shipper Bookmark
    const fncInitShipper = (e) => {
        e.preventDefault();
        setShipper({});
    }

    const fncValidation =()=> {
        if( !shipper.shipper_bookmark_name ) return false;
        if( shipper.shp_user_email ) {
            if( !validation.validationEmail(shipper.shp_user_email) ) return false;
        }
        return true;
    }
    // Save Shipper Bookmark
    const fncSaveShipperBookmark = (e) => {
        e.preventDefault(e);
        if( !user ) {
            props.onNotiAlert("error",validation.NOTLOGIN_MSG);   
            return false;
        }
        if (!fncValidation()) return false;
        if( !shipper.shipper_bookmark_seq || '0' === shipper.shipper_bookmark_seq ) {
            insertBookingShipperBookmark();
        } else {
            updateBookingShipperBookmark();
        }
    }

    // Insert Shipper Bookmark
    const insertBookingShipperBookmark = () => {
        //const body =
        axios.post(
            "/shipper/insertBookingShipperBookmark"
            ,{
                user_no : user?user.user_no:null,
                shipper
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.SAVE_MSG);
                props.selectBookingShipperBookmark();
                setShipper({});
            }
        );
    }

    // Update Shipper Bookmark
    const updateBookingShipperBookmark = () => {
        //const body =
        axios.post(
            "/shipper/updateBookingShipperBookmark"
            ,{
                user_no : user?user.user_no:null,
                shipper
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.SAVE_MSG);
                props.selectBookingShipperBookmark();
            }
        );
    }

    // Delete Shipper Bookmark
    const deleteBookingShipperBookmark = () => {
        if( !shipper.shipper_bookmark_seq ) {
            props.onNotiAlert("danger", "삭제할 Bookmark를 선택하세요.");
            return false;
        }
        //const body =
        axios.post(
            "/shipper/deleteBookingShipperBookmark"
            ,{
                user_no : user?user.user_no:null,
                shipper
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.DEL_MSG);
                props.selectBookingShipperBookmark();
                setShipper({});
            }
        );
    }

    const fncOnBlurShipper = (shipper) => {
        setShipper(shipper);
    }

   const fncOpenType =()=>{
        
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
            <ModalHeader toggle={toggle}>Shipper Bookmark</ModalHeader>
            <ModalBody className={clsNm}>
                {/* <CardBody className="pt-2 pb-2 bg-white"> */}
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
                                        {(shipperList.length>0)?shipperList.map((element,key)=>{
                                            // console.log(cntrList, key, element)
                                            return(
                                                <tr scope="row" key={key} onClick={()=>{setShipper(element)}}
                                                style={element.shipper_bookmark_seq===shipper.shipper_bookmark_seq?{backgroundColor:'aliceblue'}:{backgroundColor:''}}>
                                                    <td>{element.shipper_bookmark_seq}</td>
                                                    <td>{element.shipper_bookmark_name}</td>
                                                    <td>{element.shp_user_name}</td>
                                                    <td>{element.shp_user_tel}</td>
                                                    <td>{element.shp_user_email}</td>
                                                </tr>
                                            )
                                        }):<></>}
                                        </tbody>
                                    </Table>
                                </CardBody>
                                {/* </Row> */}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>BookMark Input</Col>
                </Row>
                <hr className="m-2"/>
                <ShipperWdfc
                    shipper={shipper}
                    fncOnBlurShipper={fncOnBlurShipper}
                    openType={"BOOK"}
                    fncOpenType={fncOpenType}
                    shipperCompanyList={shipperCompanyList}/>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(e)=>fncInitShipper(e)}>New</Button>
                <Button color="primary" onClick={(e)=>fncSaveShipperBookmark(e)}>Save</Button>
                <Button color="primary" onClick={(e)=>deleteBookingShipperBookmark(e)}>Delete</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>
    );
}

export default ShipperBookmarkWdfc;