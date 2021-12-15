/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody
    , Button,FormGroup, Table, UncontrolledTooltip} from "reactstrap";
import ScheduleWdfc from "./ScheduleWdfc.js";
import axios from 'axios';
import * as validation from 'components/common/validation.js';


const ScheduleBookmarkWdfc = (props) => {
    // modal 창을 위한 state
   // const [coll, setColl] = useState(false);
    const [open, setOpen] = useState(false);
    // 스케줄
    const [schedule, setSchedule] = useState({});
    // 스케줄 목록
    const [scheduleList, setScheduleList] = useState({});
    const {user} = props;

    useEffect(() => {
        setScheduleList(props.scheduleList);
    },[props.scheduleList]);

    useEffect(() => {
        setSchedule(props.booking);
    },[props.booking]);

    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }

    const fncInitSchedule = (e) => {
        e.preventDefault();
        setSchedule({});
    }

    const fncValidation=()=>{
        if( !schedule.schedule_bookmark_name ) return false;
        return true;
    }
    const fncSaveScheduleBookmark = (e) => {
        e.preventDefault();
        if( !user ) {
            props.onNotiAlert("error",validation.NOTLOGIN_MSG);   
            return false;
        }
        if( !fncValidation() ) return false;
        if( !schedule.schedule_bookmark_seq || '0' === schedule.schedule_bookmark_seq ) {
            insertBookingScheduleBookmark();
        } else {
            updateBookingScheduleBookmark();
        }
    }

    // 입력
    const insertBookingScheduleBookmark = () => {
        //const body =
        axios.post(
            "/shipper/insertBookingScheduleBookmark"
            ,{
                user_no : user?user.user_no:null,
                schedule
            }
            ,{}
        ).then(
            res=>{
                setSchedule({});
                props.onAlert("success", validation.SAVE_MSG);
                props.selectBookingScheduleBookmark();
            }
        );
    }

    // 수정
    const updateBookingScheduleBookmark = () => {
        axios.post(
            "/shipper/updateBookingScheduleBookmark"
            ,{ 
                user_no : user?user.user_no:null,
                schedule 
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success",validation.SAVE_MSG);
                props.selectBookingScheduleBookmark();
            }
        );
    }

    // 삭제
    const deleteBookingScheduleBookmark = (e) => {
        e.preventDefault();
        if( !schedule.schedule_bookmark_seq ) {
            props.onNotiAlert("danger", "삭제할 Bookmark를 선택하세요.");
            return false;
        }
        axios.post(
            "/shipper/deleteBookingScheduleBookmark"
            ,{ schedule }
            ,{}
        ).then(
            res=>{
                setSchedule({});
                props.onAlert("success", validation.DEL_MSG);
                props.selectBookingScheduleBookmark();
            }
        );
    }

    const fncOnBlurSchedule = (schedule) => {
        setSchedule(schedule);
    }

    const fncOpenType=()=>{
        
    }

  // 전체화면 css 적용을 위한 state
  const [clsNm, setClsNm] = useState("");
  return (
    <>
        <Button className="pl-0 pr-0" 
            color="link" id="linebookmark"
            onClick={toggle.bind(this, 'B')}>
                <i className="fa fa-bookmark-o fa-2x" />
        </Button>
        <UncontrolledTooltip delay={0} target="linebookmark">Bookmark</UncontrolledTooltip>
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="lg">
            <ModalHeader toggle={toggle}>Schedule Bookmark</ModalHeader>
            <ModalBody className={clsNm}>
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
                                                <td className="p-2 bg-info">Bookmark</td>
                                                <td className="p-2 bg-info">POL</td>
                                                <td className="p-2 bg-info">POD</td>
                                                <td className="p-2 bg-info">FDP</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {(0 < scheduleList.length )?scheduleList.map((element,key)=>{
                                            // console.log(cntrList, key, element)
                                            return(
                                                <tr scope="row" key={key} onClick={()=>{setSchedule(element)}}
                                                style={element.schedule_bookmark_seq===schedule.schedule_bookmark_seq?{backgroundColor:'aliceblue'}:{backgroundColor:''}}>
                                                    <td>{element.schedule_bookmark_name}</td>
                                                    <td>{element.sch_pol}</td>
                                                    <td>{element.sch_pod}</td>
                                                    <td>{element.sch_fdp}</td>
                                                </tr>
                                            )
                                        }):<tr scope="row"></tr>}
                                        </tbody>
                                    </Table>
                                </CardBody>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>BookMark Input</Col>
                </Row>
                <hr className="m-2"/>
                <ScheduleWdfc
                    schedule={schedule}
                    fncOnBlurSchedule={fncOnBlurSchedule}
                    openType={"BOOK"}
                    fncOpenType={fncOpenType}
                    outLinePortList={props.outLinePortList}
                    inLinePortList={props.inLinePortList}
                    lineVesselList={props.lineVesselList}
                    {...props}/>
                {/* </CardBody> */}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(e)=>fncInitSchedule(e)}>New</Button>
                <Button color="primary" onClick={(e)=>fncSaveScheduleBookmark(e)}>Save</Button>
                <Button color="primary" onClick={(e)=>deleteBookingScheduleBookmark(e)}>Delete</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>
    );
}

export default ScheduleBookmarkWdfc;