/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Button
    ,FormGroup,Table, UncontrolledTooltip, Card, Input, FormFeedback} from "reactstrap";
import axios from "axios";
import * as validation from 'components/common/validation.js';
import Select from "react-select";


const BookingBookmark = (props) => {
    // Collapse Flag
    //const [coll, setColl] = useState(false);
    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    // Bookmark
    const [bookmark, setBookmark] = useState([]);
    const [bookmarkList, setBookmarkList] = useState([]);
    const [relationList, setRelationList] = useState([]);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // Alert을 위한 state
    //const [openAlert, setOpenAlert] = useState(false);
    //const [status, setStatus] = useState("");
    //const [message, setMessage] = useState("");
    const {booking, otherList, scheduleList, lineList, shipperList, consigneeList, forwarderList, transportList, cargoBookmarkList, containerBookmarkList, user} = props;

    useEffect(() => {
        // setConsigneeList(props.consigneeList);
    }, [props]);

    useEffect(() => {
        if( user && user.user_no ) {
            selectBookingBkgBookmark();
        }
    },[user]);

    // useEffect(()=>{
    //     props.fncBookmarkList(bookmarkList);
    // },[bookmarkList]);

    useEffect(() => {
        fncGetRelation();
    },[relationList]);

    // useEffect(() => {
    //     console.log(bookmark)
        
    // },[bookmark]);

    // select Bkg Bookmark
    const selectBookingBkgBookmark = () => {
        //const body =
        axios.post(
            "/shipper/selectBookingBkgBookmark"
            ,{
                user_no : user?user.user_no:null,
                booking: booking,
            }
            ,{}
        ).then(
            res=>{
                setBookmarkList(res.data);
            }
        );
    }

    const fncSelectBookmark =(row)=>{
        setBookmark( row );
        selectBookingBkgBookmarkRelation( row );
    }

    const selectBookingBkgBookmarkRelation =( bookmark )=>{
        //const body =
        axios.post(
            "/shipper/selectBookingBkgBookmarkRelation"
            ,{
                user_no: user?user.user_no:null,
                bookmark: bookmark,
            }
            ,{}
        ).then(
            res=>{
                setRelationList(res.data);
                // fncGetRelation();
            }
        );
    }
    // Bookmark 입력하기
    const fncSaveBookmark=(e)=>{
        if( user && !user.user_no ) {
            props.onNotiAlert("danger", validation.NOTLOGIN_MSG);
            return false;
        }
        if( !bookmark.bookmark_name ) return false;
        if( relationList.length < 1 ) {
            props.onNotiAlert("danger", "Bookmark 사용안함된 내용이 없습니다.")
            return false;
        }
        // e.preventDefault(e);
        //const body =
        axios.post(
            "/shipper/saveBookingBkgBookmark"
            ,{
                user_no: user?user.user_no:null,
                bookmark: bookmark,
                relationList: relationList
            }
            ,{}
        ).then(
            res=>{
                // onAlert("success", "저장 되었습니다.");
                selectBookingBkgBookmark();
            }
        );
    }
    const deleteBookmark=(e)=>{
        // e.preventDefault(e);
        if( !bookmark.bookmark_name ) {
            props.onNotiAlert("danger", "삭제할 대상을 사용안함하세요.");
            return false;
        }
        //const body =
        axios.post(
            "/shipper/deleteBookmark"
            ,{
                user_no: user?user.user_no:null,
                bookmark: bookmark,
            }
            ,{}
        ).then(
            res=>{
                // onAlert("success", "삭제 되었습니다.");
                selectBookingBkgBookmark();
                fncInitBookmark();
            }
        );
    }
    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }

    // New Bookmark
    const fncInitBookmark =(e)=> {
        // e.preventDefault();
        setBookmark({});
        setRelationList([]);
    }

    const fncOnChange =(e, key)=> {
        // e.preventDefault();
        setBookmark({...bookmark, [key]:e.target.value.toUpperCase()});
    }
    const fncOnchangeRelation =(e, key)=> {
        // relationList 정보에 취합
        let row = relationList.find( function( item ) {
            return item.reference_type == key;
        });
        console.log(row, e);
        if( row ) {
            row.reference_seq = e?e.value:'';
            row.bookmark_name = e?e.label:'';
            
        } else {
            relationList.push({
                'reference_type': key,
                'reference_seq': e.value,
                'bookmark_name': e.label,
            });
        }
        setRelationList([...relationList]);
        
        // console.log(relationList)
        // bookmark 정보에 취합
        
        // relationList.splice(relationList.indexOf(key), {[key]:e.value})
        // console.log(relationList)
    }

    const fncGetRelation =()=>{
        let obj = Object();
        if( relationList.length > 0 ) {
            relationList.forEach( function( element ) {
                if( 'BOOKING' === element.reference_type ) {
                    obj.other_bookmark_name = element.bookmark_name;
                    obj.other_reference_seq = element.reference_seq;
                }
                if( 'SCHEDULE' === element.reference_type ) {
                    obj.schedule_bookmark_name = element.bookmark_name;
                    obj.schedule_reference_seq = element.reference_seq;
                }
                if( 'CARRIER' === element.reference_type ) {
                    obj.carrier_bookmark_name = element.bookmark_name;
                    obj.carrier_reference_seq = element.reference_seq;
                }
                if( 'SHIPPER' === element.reference_type ) {
                    obj.shipper_bookmark_name = element.bookmark_name;
                    obj.shipper_reference_seq = element.reference_seq;
                }
                // if( 'CONSIGNEE' === element.reference_type ) {
                //     obj.consignee_bookmark_name = element.bookmark_name;
                //     obj.consignee_reference_seq = element.reference_seq;
                // }
                if( 'FORWARDER' === element.reference_type ) {
                    obj.forwarder_bookmark_name = element.bookmark_name;
                    obj.forwarder_reference_seq = element.reference_seq;
                }
                if( 'TRANSPORT' === element.reference_type ) {
                    obj.transport_bookmark_name = element.bookmark_name;
                    obj.transport_reference_seq = element.reference_seq;
                }
                if( 'CARGO' === element.reference_type ) {
                    obj.cargo_bookmark_name = element.bookmark_name;
                    obj.cargo_reference_seq = element.reference_seq;
                }
                if( 'CONTAINER' === element.reference_type ) {
                    obj.container_bookmark_name = element.bookmark_name;
                    obj.container_reference_seq = element.reference_seq;
                }
            });
        } else {
            obj = {};
        }
        let merge = Object.assign(bookmark, obj);
        // console.log("merge : ",merge)
        setBookmark({...merge});
    }

  return (
    <>
        <Row>
            <Col className="col-10 pr-0" style={{zIndex:'120'}}>
                <Select
                    className="react-select react-select-primary"
                    classNamePrefix="react-select"
                    name="bookingBookmark"
                    value={{
                        value:booking.bookmark_seq?booking.bookmark_seq:'',
                        label:booking.bookmark_name?booking.bookmark_name:'선택'
                    }}
                    onChange={(e)=>props.fncBookmarkParent(e)}
                    options={bookmarkList}
                    placeholder={"선택"}
                    isClearable={booking.bookmark_seq?booking.bookmark_seq:false}
                    />
            </Col>
            <Col className="col-2 pl-auto pr-auto">
                <Button className="pl-0 pr-0" 
                    color="link" id="linebookmark"
                    onClick={toggle.bind(this, 'B')}>
                        <i className="fa fa-bookmark-o fa-2x" />
                </Button>
            </Col>
        </Row>
        <UncontrolledTooltip delay={0} target="linebookmark">Bookmark</UncontrolledTooltip>
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="lg">
            <ModalHeader toggle={toggle}>Bookmark</ModalHeader>
                <ModalBody className={clsNm}>
                    <Row className="mb-3">
                        <Col xl="4" lg="4" md="12">
                            <Row>
                                <Col>Bookmark List</Col>
                            </Row>
                            <FormGroup style={{height:'550px',overflow:'auto'}} className="mb-0">
                                    <CardBody className="bg-white p-0">
                                        <Table className="mb-0" responsive hover size="sm">
                                            <thead>
                                                <tr>
                                                    <td className="p-2 bg-info">Name</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {(bookmarkList.length > 0)?bookmarkList.map((element,key)=>{
                                                // console.log(cntrList, key, element)
                                                return(
                                                    <tr scope="row" key={key} onClick={()=>{fncSelectBookmark(element)}}
                                                    style={element.bookmark_seq===bookmark.bookmark_seq?{backgroundColor:'aliceblue'}:{backgroundColor:''}}>
                                                        <td>{element.bookmark_name}</td>
                                                    </tr>
                                                )
                                            }):
                                            <></>}
                                            </tbody>
                                        </Table>
                                    </CardBody>
                            </FormGroup>
                        </Col>
                        <Col xl="8" lg="8" md="12">
                            <Row>
                                <Col>Bookmark</Col>
                            </Row>
                            
                            <Row id="Transport">
                                <Col xl="12" lg="12">
                                    <Card style={{zIndex:'70'}} className="card-raised card-form-horizontal no-transition mb-0">
                                        <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>
                                            <Row className="pb-2">
                                                <Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>Bookmark Name
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col className="col-10 pr-0">
                                                            <Input
                                                                type="text" name="bookmark_name" id="bookmark_name"
                                                                placeholder=""
                                                                maxLength="35"
                                                                value={bookmark.bookmark_name?bookmark.bookmark_name:''}
                                                                onChange={(e)=>fncOnChange(e, 'bookmark_name')}
                                                                invalid={bookmark.bookmark_name?false:true}
                                                            />
                                                            <FormFeedback>{validation.REQ_MSG}</FormFeedback>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row className="pb-2">
                                                <Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>BOOKING
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col className="col-10 pr-0">
                                                            <Select
                                                                className="react-select react-select-primary"
                                                                classNamePrefix="react-select"
                                                                name="bookingbookmark"
                                                                value={{
                                                                    value:bookmark.other_reference_seq?bookmark.other_reference_seq:'',
                                                                    label:bookmark.other_bookmark_name?bookmark.other_bookmark_name:'사용안함',
                                                                }}
                                                                onChange={(value)=>fncOnchangeRelation(value?value:null, 'BOOKING')}
                                                                options={otherList}
                                                                placeholder={"사용안함"}
                                                                isClearable={bookmark.other_reference_seq?true:false}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row className="pb-2">
                                                <Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>SCHEDULE
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col className="col-10 pr-0">
                                                            <Select
                                                                className="react-select react-select-primary"
                                                                classNamePrefix="react-select"
                                                                name="schedulebookmark"
                                                                value={{
                                                                    value:bookmark.schedule_reference_seq?bookmark.schedule_reference_seq:'',
                                                                    label:bookmark.schedule_bookmark_name?bookmark.schedule_bookmark_name:'사용안함',
                                                                }}
                                                                onChange={(value)=>fncOnchangeRelation(value?value:null, 'SCHEDULE')}
                                                                options={scheduleList}
                                                                placeholder={"사용안함"}
                                                                isClearable={bookmark.schedule_reference_seq?true:false}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row className="pb-2">
                                                <Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>CARRIER
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col className="col-10 pr-0">
                                                            <Select
                                                                className="react-select react-select-primary"
                                                                classNamePrefix="react-select"
                                                                name="carrierbookmark"
                                                                value={{
                                                                    value:bookmark.carrier_reference_seq?bookmark.carrier_reference_seq:'',
                                                                    label:bookmark.carrier_bookmark_name?bookmark.carrier_bookmark_name:'사용안함',
                                                                }}
                                                                onChange={(value)=>fncOnchangeRelation(value?value:null, 'CARRIER')}
                                                                options={lineList}
                                                                placeholder={"사용안함"}
                                                                isClearable={bookmark.carrier_reference_seq?true:false}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row className="pb-2">
                                                <Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>SHIPPER
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col className="col-10 pr-0">
                                                            <Select
                                                                className="react-select react-select-primary"
                                                                classNamePrefix="react-select"
                                                                name="shipperbookmark"
                                                                value={{
                                                                    value:bookmark.shipper_reference_seq?bookmark.shipper_reference_seq:'',
                                                                    label:bookmark.shipper_bookmark_name?bookmark.shipper_bookmark_name:'사용안함',
                                                                }}
                                                                onChange={(value)=>fncOnchangeRelation(value?value:null, 'SHIPPER')}
                                                                options={shipperList}
                                                                placeholder={"사용안함"}
                                                                isClearable={bookmark.shipper_reference_seq?true:false}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            {/* <Row className="pb-2">
                                                <Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>CONSIGNEE
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col className="col-10 pr-0">
                                                            <Select
                                                                className="react-select react-select-primary"
                                                                classNamePrefix="react-select"
                                                                name="consigneebookmark"
                                                                value={{
                                                                    value:bookmark.consignee_reference_seq?bookmark.consignee_reference_seq:'',
                                                                    label:bookmark.consignee_bookmark_name?bookmark.consignee_bookmark_name:'사용안함',
                                                                }}
                                                                onChange={(value)=>fncOnchangeRelation(value?value:null, 'CONSIGNEE')}
                                                                options={consigneeList}
                                                                placeholder={"사용안함"}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row> */}
                                            <Row className="pb-2">
                                                <Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>FORWARDER
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col className="col-10 pr-0">
                                                            <Select
                                                                className="react-select react-select-primary"
                                                                classNamePrefix="react-select"
                                                                name="carrierbookmark"
                                                                value={{
                                                                    value:bookmark.forwarder_reference_seq?bookmark.forwarder_reference_seq:'',
                                                                    label:bookmark.forwarder_bookmark_name?bookmark.forwarder_bookmark_name:'사용안함',
                                                                }}
                                                                onChange={(value)=>fncOnchangeRelation(value?value:null, 'FORWARDER')}
                                                                options={forwarderList}
                                                                placeholder={"사용안함"}
                                                                isClearable={bookmark.forwarder_reference_seq?true:false}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row className="pb-2">
                                                <Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>TRANSPORT
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col className="col-10 pr-0">
                                                            <Select
                                                                className="react-select react-select-primary"
                                                                classNamePrefix="react-select"
                                                                name="transportbookmark"
                                                                value={{
                                                                    value:bookmark.transport_reference_seq?bookmark.transport_reference_seq:'',
                                                                    label:bookmark.transport_bookmark_name?bookmark.transport_bookmark_name:'사용안함',
                                                                }}
                                                                onChange={(value)=>fncOnchangeRelation(value?value:null, 'TRANSPORT')}
                                                                options={transportList}
                                                                placeholder={"사용안함"}
                                                                isClearable={bookmark.transport_reference_seq?true:false}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row className="pb-2">
                                                <Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>CARGO
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col className="col-10 pr-0">
                                                            <Select
                                                                className="react-select react-select-primary"
                                                                classNamePrefix="react-select"
                                                                name="cargobookmark"
                                                                value={{
                                                                    value:bookmark.cargo_reference_seq?bookmark.cargo_reference_seq:'',
                                                                    label:bookmark.cargo_bookmark_name?bookmark.cargo_bookmark_name:'사용안함',
                                                                }}
                                                                onChange={(value)=>fncOnchangeRelation(value?value:null, 'CARGO')}
                                                                options={cargoBookmarkList}
                                                                placeholder={"사용안함"}
                                                                isClearable={bookmark.cargo_reference_seq?true:false}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row className="pb-2">
                                                <Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>CONTAINER
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col className="col-10 pr-0">
                                                            <Select
                                                                className="react-select react-select-primary"
                                                                classNamePrefix="react-select"
                                                                name="containerbookmark"
                                                                value={{
                                                                    value:bookmark.container_reference_seq?bookmark.container_reference_seq:'',
                                                                    label:bookmark.container_bookmark_name?bookmark.container_bookmark_name:'사용안함',
                                                                }}
                                                                onChange={(value)=>fncOnchangeRelation(value?value:null, 'CONTAINER')}
                                                                options={containerBookmarkList}
                                                                placeholder={"사용안함"}
                                                                isClearable={bookmark.container_reference_seq?true:false}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(e)=>fncInitBookmark(e)}>New</Button>{' '}
                <Button color="primary" onClick={(e)=>fncSaveBookmark(e)}>Save</Button>{' '}
                <Button color="primary" onClick={(e)=>deleteBookmark(e)}>Delete</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>
    );
}

export default BookingBookmark;