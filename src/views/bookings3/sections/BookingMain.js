import React , { useState, useEffect } from "react";
import {
  Row,
  Col,
//   Card,
  CardBody,
  UncontrolledTooltip,
  Container,
  Form,ModalHeader, ModalBody,
  Button,
  Modal,
  ModalFooter,
} from "reactstrap";
// import BookingTemplate from './BookingTemplate.js';
import ScheduleCard from './schedule/ScheduleCard.js';
import CarrierCard from './carrier/CarrierCard.js';
import ShipperCard from './shipper/ShipperCard.js';
import DocumentCard from "./document/DocumentCard.js";
import ForwarderCard from "./forwarder/ForwarderCard.js";
import ConsigneeCard from "./consignee/ConsigneeCard.js";
import TransportCard from "./transport/TransportCard.js";
import CargoCard from "./cargo/CargoCard.js";
import ContainerCard from "./container/ContainerCard.js";
import BookingCard from "./booking/BookingCard.js";
import BookingTitleCard from "./booking/BookingTitleCard.js";
import './Booking.css';
import 'assets/css/App.css';
import axios from 'axios';
import Report from '../../../components/Report/Report.js';

function BookingMain( props ) {
    const [booking, setBooking] = useState({});

    const [reportView, setReportView] = useState("");
    const [reportPop, setReportPop] = useState(false);
    const [params, setParams] = useState({
        bkg_no:'2021012000001',
        bkg_date:'20210120'
    });
    useEffect(()=>{
        selectBookingBookmarkOfBooking();
    },[params])

    // 조회
    const selectBookingBookmarkOfBooking = () => {
        const body =
        axios.post(
            "/api/selectBookingBookmarkOfBooking"
            ,{
                user_no : 'M000002',
                booking:{
                    bkg_no : params.bkg_no,
                    bkg_date : params.bkg_date,
                }
            }
            ,{}
        ).then(
            // onDismiss("success", "정상 조회 되었습니다.")
        ).then(
            // INSERT 결과값 넣기
            res => {
                const result =  res.data;
                // console.log(result[0])
                if( 0 < result.length ) {
                    setBooking(result[0]);
                } else {
                    setBooking({});
                }
            }   
        ).catch(err => {
            if(err.response.status === 403||err.response.status === 401) {
                // onDismiss("danger","오류가 발생 했습니다.")
            }
        });
    }

    const fncBookingPrarms = (booking) => {
        if( params.bkg_no != booking.bkg_no ) {
            setParams({params, 'bkg_no':booking.bkg_no, 'bkg_date':booking.bkg_date});
        }
    }


    const fncREPORT=()=> {

        var obj = new Object();
        obj.user_no = 'M000002';
        obj.bkg_date = '20210120';
        obj.bkg_no = '2021012000001';
        var json = JSON.stringify(obj);

        let form = document.reportForm;
        form.action = '/blank';
        form.target = 'popReport'; // window.open() 의 두번째 변수와 동일해야.
        form.file_id.value = 'SEAWAYBILL_server';
        form.file_path.value = 'TEST_0222';
        form.name.value = 'FILENAME';
        form.connection.value = 'pgsql';
        form.parameters.value = json;
        window.open("", 'popReport','_blank', 'width=750px', 'height=950px');
        form.submit();
    }

    return (
        <div className="section section-white">
            <Form>
                <Container>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <Row>
                            <Col className="ml-auto mr-auto" xl="10" lg="10" md="10" sm="10">
                                <h4 className="mt-1 text-center">
                                    <small>Booking</small>
                                </h4>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col className="text-right">
                            {/* <Report
                                // system_id
                                system_id='TEST2'
                                // system_id
                                file_id='SEAWAYBILL.jrxml'
                                // japser file경로
                                file_path='TEST_0222'
                                // download 당시 파일명
                                file_name='테스트파일'
                                // jasper report DB 접속 정보
                                connect='pgsql'
                                // user_no
                                user_id='M000002'
                                // jasper report DB 쿼리 변수
                                parameters={{
                                'user_no':'M000002',
                                'bkg_date':'20210120',
                                'bkg_no':'2021012000001'
                                }}
                                // parameters 에 정의된 변수 중 필수값 체크
                                // key(필수값):value(안내문구)
                                // 값이 null 이거나 undefined 또는 '' 이면 체크됨
                                validation={{
                                'bkg_no':'부킹번호를 입력해주세요.'
                                }}></Report> */}

                                
                                {/* <Button id="bkg_view" color="info" outline type="button" className="mr-1" onClick={fncPreview}>REVIEW</Button>
                                <UncontrolledTooltip delay={0} target="bkg_view">미리보기</UncontrolledTooltip> */}
                                <Button id="bkg_save" color="info" outline type="button" className="mr-1">SAVE</Button>
                                <UncontrolledTooltip delay={0} target="bkg_save">임시저장</UncontrolledTooltip>
                                <Button id="bkg_send" color="info" outline type="button" className="mr-1">SEND</Button>
                                <UncontrolledTooltip delay={0} target="bkg_send">SR문서 전송</UncontrolledTooltip>
                                <Button id="bkg_cancel" color="info" outline type="button" className="mr-1">CANCEL</Button>
                                <UncontrolledTooltip delay={0} target="bkg_cancel">취소</UncontrolledTooltip>
                                <Button onClick={fncREPORT}>리포트뷰</Button>
                            </Col>
                        </Row>
                        <hr className="mt-2"/>
                        <Row>
                            <Col xl="12" lg="12" className="pl-4 pr-4">
                                <BookingTitleCard
                                    booking={booking}
                                    fncBookingPrarms={fncBookingPrarms}
                                    />
                            </Col>
                            <Col xl="6" lg="6">
                                <ScheduleCard
                                    booking={booking}/>
                            </Col>
                            <Col xl="6" lg="6">
                                <DocumentCard
                                    booking={booking}/>
                            </Col>
                            <Col xl="6" lg="6">
                                <ShipperCard
                                    booking={booking}/>
                            </Col>
                            <Col xl="6" lg="6">
                                <ForwarderCard
                                    booking={booking}/>
                            </Col>
                            <Col xl="6" lg="6">
                                <ConsigneeCard
                                    booking={booking}/>
                            </Col>
                            <Col xl="6" lg="6">
                                <CarrierCard
                                    booking={booking}/>
                            </Col>
                            <Col xl="6" lg="6">
                                <CargoCard
                                    booking={booking}/>
                            </Col>
                            <Col xl="6" lg="6">
                                <TransportCard
                                    booking={booking}/>
                            </Col>
                            <Col xl="6" lg="6">
                                <ContainerCard
                                    booking={booking}/>
                            </Col>
                            <Col xl="6" lg="6">
                                <BookingCard
                                    booking={booking}
                                    fncBookingPrarms={fncBookingPrarms}
                                    />
                            </Col>
                        </Row>
                    </CardBody>
                </Container>
            </Form>
            <form id="reportForm" name="reportForm" method="post">
                <input type="hidden" name="system_id"   value="plismplus" />
                <input type="hidden" name="user_id"     value="M000008" />
                <input type="hidden" name="file_type"   value="pdf" />
                <input type="hidden" name="file_id"     value="" />
                <input type="hidden" name="file_path"   value="" />
                <input type="hidden" name="name"        value="" />
                <input type="hidden" name="connection"  value="pgsql" />
                <input type="hidden" name="parameters" id="parameters"/>
            </form>
        </div>
    )
}

export default BookingMain;