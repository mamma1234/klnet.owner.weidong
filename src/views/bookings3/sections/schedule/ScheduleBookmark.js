/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, Card, CardBody
    , Button,FormGroup, Table, UncontrolledTooltip} from "reactstrap";
import Schedule from "./Schedule.js";
import AlertMessage from "../AlertMessage.js";
import axios from 'axios';


const ScheduleBookmark = (props) => {
    // modal 창을 위한 state
    const [coll, setColl] = useState(false);
    const [open, setOpen] = useState(false);
    // 스케줄
    const [schedule, setSchedule] = useState({});
    // 스케줄 목록
    const [scheduleList, setScheduleList] = useState({});
    // Alert을 위한 state
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState("success");
    const [message, setMessage] = useState("정상 처리되었습니다.");

    useEffect(() => {
        setScheduleList(props.scheduleList);
    },[props]);

    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }

    const fncInitSchedule = (e) => {
        e.preventDefault();
        setSchedule({});
    }

    const fncSaveScheduleBookmark = (e) => {
        e.preventDefault();
        if( !schedule.schedule_bookmark_seq || '0' === schedule.schedule_bookmark_seq ) {
            insertBookingScheduleBookmark();
        } else {
            updateBookingScheduleBookmark();
        }
    }

    // 입력
    const insertBookingScheduleBookmark = () => {
        const body =
        axios.post(
            "/api/insertBookingScheduleBookmark"
            ,{
                user_no : 'M000002',
                schedule
            }
            ,{}
        ).then(
            res=>{
                setSchedule({});
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingScheduleBookmark();
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // 수정
    const updateBookingScheduleBookmark = () => {
        axios.post(
            "/api/updateBookingScheduleBookmark"
            ,{ 
                user_no : 'M000002',
                schedule 
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingScheduleBookmark();
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // 삭제
    const deleteBookingScheduleBookmark = (e) => {
        e.preventDefault();
        if( !schedule.schedule_bookmark_seq ) {
            onDismiss("danger", "삭제할 Bookmark를 선택하세요.");
            return false;
        }
        axios.post(
            "/api/deleteBookingScheduleBookmark"
            ,{ schedule }
            ,{}
        ).then(
            res=>{
                setSchedule({});
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingScheduleBookmark();
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }
    // Alert 메세지 팝업
    const onDismiss = (color, message) => {
        setColor(color);
        setMessage(message);
        setVisible(!visible);
    }

    const fncOnBlurSchedule = (schedule) => {
        setSchedule(schedule);
    }

  // 전체화면 css 적용을 위한 state
  const [clsNm, setClsNm] = useState("");
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
            <ModalHeader toggle={toggle}>Schedule</ModalHeader>
            <ModalBody className={clsNm}>
                <Row>
                    <Col>BookMark List</Col>
                </Row>
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
                                                <th className="p-2 bg-info">Bookmark</th>
                                                <th className="p-2 bg-info">POL</th>
                                                <th className="p-2 bg-info">ETD</th>
                                                <th className="p-2 bg-info">POD</th>
                                                <th className="p-2 bg-info">ETA</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {(0 < scheduleList.length )?scheduleList.map((element,key)=>{
                                            // console.log(cntrList, key, element)
                                            return(
                                                <tr scope="row" key={key} onClick={()=>{setSchedule(element)}}>
                                                    <td>{element.schedule_bookmark_name}</td>
                                                    <td>{element.sch_pol}</td>
                                                    <td>{element.sch_etd}</td>
                                                    <td>{element.sch_pod}</td>
                                                    <td>{element.sch_eta}</td>
                                                </tr>
                                            )
                                        }):<tr scope="row"></tr>}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                            {/* </Row> */}
                        </FormGroup>
                    </Col>
                </Row>
                <Schedule
                    schedule={schedule}
                    fncOnBlurSchedule={fncOnBlurSchedule} />
                {/* </CardBody> */}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(e)=>fncInitSchedule(e)}>New</Button>
                <Button color="primary" onClick={(e)=>fncSaveScheduleBookmark(e)}>Save</Button>
                <Button color="primary" onClick={(e)=>deleteBookingScheduleBookmark(e)}>Delete</Button>
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

export default ScheduleBookmark;