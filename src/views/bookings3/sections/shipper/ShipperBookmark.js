/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody
    , Button,FormGroup, Card, Table}
     from "reactstrap";
import Shipper from "./Shipper.js";
import AlertMessage from "../AlertMessage.js";
import axios from 'axios';

const ShipperBookmark = (props) => {
    
    // modal 창을 위한 state
    const [coll, setColl] = useState(false);
    const [open, setOpen] = useState(false);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // Shipper
    const [shipper, setShipper] = useState({});
    const [shipperList, setShipperList] = useState([]);
    // Alert을 위한 state
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState("success");
    const [message, setMessage] = useState("정상 처리되었습니다.");

    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }
    
    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    useEffect(() => {
        setShipperList(props.shipperList);
    }, [props]);

    // New Shipper Bookmark
    const fncInitShipper = (e) => {
        e.preventDefault();
        setShipper({});
    }
    // Save Shipper Bookmark
    const fncSaveShipperBookmark = (e) => {
        e.preventDefault(e);
        if( !shipper.shipper_bookmark_seq || '0' === shipper.shipper_bookmark_seq ) {
            insertBookingShipperBookmark();
        } else {
            updateBookingShipperBookmark();
        }
    }

    // Insert Shipper Bookmark
    const insertBookingShipperBookmark = () => {
        const body =
        axios.post(
            "/api/insertBookingShipperBookmark"
            ,{
                user_no : 'M000002',
                shipper
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingShipperBookmark();
                setShipper({});
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Update Shipper Bookmark
    const updateBookingShipperBookmark = () => {
        const body =
        axios.post(
            "/api/updateBookingShipperBookmark"
            ,{
                user_no : 'M000002',
                shipper
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingShipperBookmark();
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Delete Shipper Bookmark
    const deleteBookingShipperBookmark = () => {
        if( !shipper.shipper_bookmark_seq ) {
            onDismiss("danger", "삭제할 Bookmark를 선택하세요.");
            return false;
        }
        const body =
        axios.post(
            "/api/deleteBookingShipperBookmark"
            ,{
                user_no : 'M000002',
                shipper
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingShipperBookmark();
                setShipper({});
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    const fncOnBlurShipper = (shipper) => {
        setShipper(shipper);
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
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="lg">
            <ModalHeader toggle={toggle}>Shipper Bookmark</ModalHeader>
            <ModalBody className={clsNm}>
                {/* <CardBody className="pt-2 pb-2 bg-white"> */}
                    <Row className="mb-3">
                        <Col xl="12" lg="12" md="12">
                            <FormGroup style={{height:'150px',overflow:'auto'}} className="mb-0">
                                {/* <Row> */}
                                <Card className="card-raised card-form-horizontal no-transition mb-0">
                                    <CardBody className="bg-white p-0">
                                        <Table className="mb-0" responsive hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th className="p-2 bg-info">No.</th>
                                                    <th className="p-2 bg-info">Bookmark</th>
                                                    <th className="p-2 bg-info">NAME</th>
                                                    <th className="p-2 bg-info">TEL</th>
                                                    <th className="p-2 bg-info">EMAIL</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {(shipperList.length>0)?shipperList.map((element,key)=>{
                                                // console.log(cntrList, key, element)
                                                return(
                                                    <tr scope="row" key={key} onClick={()=>{setShipper(element)}}>
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
                                </Card>
                                {/* </Row> */}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Shipper
                        shipper={shipper}
                        fncOnBlurShipper={fncOnBlurShipper}/>
                {/* </CardBody> */}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(e)=>fncInitShipper(e)}>New</Button>
                <Button color="primary" onClick={(e)=>fncSaveShipperBookmark(e)}>Save</Button>
                <Button color="primary" onClick={(e)=>deleteBookingShipperBookmark(e)}>Delete</Button>
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

export default ShipperBookmark;