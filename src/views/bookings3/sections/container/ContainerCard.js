/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse, UncontrolledTooltip,
    ButtonGroup, Button,Input, Card, Table} from "reactstrap";
import {Container} from "./Container.js";
import ContainerBookmark from "./ContainerBookmark.js";
import axios from 'axios';
import AlertMessage from "../AlertMessage.js";


const ContainerCard = (props) => {
    // Collapse Flag
    const [coll, setColl] = useState(false);
    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    // Container Bookmark List  
    const [containerBookmarkList, setContainerBookmarkList] = useState([]);
    // Special Bookmark List
    const [specialBookmarkList, setSpecialBookmarkList] = useState([]);
    // Container List
    const [containerList, setContainerList] = useState([]);
    // Container Special List
    const [containerSpecialList, setContainerSpecialList] = useState([]);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    const [booking, setBooking] = useState({});
    // Alert을 위한 state
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState("success");
    const [message, setMessage] = useState("정상 처리되었습니다.");

    useEffect(() => {
        // 최초 조회
        selectBookingContainerBookmark();
        selectBookingSpecialBookmark();
    },[]);

    useEffect(() => {
        // selected_yn === Y 이면 
        // selected 박스로 선택한건 바로 입력해준다.
        if( containerList.length > 0 ) {
            containerList.map((element, key)=>{
                if( "Y" === element.selected_yn ) {
                    fncSaveContainerList();     
                }
            });

        }
    },[containerList]);

    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        if( props.booking.bkg_no ) {
            // console.log("props:",props.booking);
            let bkg_no = props.booking.bkg_no;
            let bkg_date = props.booking.bkg_date;
            let status_cus = props.booking.status_cus;
            let sc_no = props.booking.sc_no;
            let user_no = props.booking.user_no;

            // container Bookmark seq
            let container_bookmark_seq = props.booking.container_bookmark_seq;
            let init_container_bookmark_seq = props.booking.init_container_bookmark_seq;

            setBooking({...booking, 'bkg_no':bkg_no, 'bkg_date':bkg_date
                , 'status_cus':status_cus, 'sc_no':sc_no, 'user_no':user_no
                , 'container_bookmark_seq':container_bookmark_seq
                , 'init_container_bookmark_seq':init_container_bookmark_seq
            }); // 초기화 bookmark seq 값

            // 최초 조회하기
            selectContainerOfBooking(props.booking);
            selectContainerSpecialOfBooking(props.booking);
        }
    },[props.booking]);

    // 메인 화면에서 select 선택한 경우
    const fncSelectContainer = (e)=>{
        //   console.log(e.target.value)
        // 선택
        if( 1 > e.target.value ) {
            // setBooking({});
            if ( coll ) {
                setColl(!coll)
            }
        // 그외 데이터인 경우
        } else {
            containerBookmarkList.map((element, key)=>{
            if( e.target.value == element.container_bookmark_seq) {
                // console.log(element)
                // select로 새로운 document를 세팅한다
                // 기존 Booking 정보
                setBooking({...booking
                    ,'container_bookmark_seq':element.container_bookmark_seq
                    ,'container_bookmark_name':element.container_bookmark_name
                    ,'selected_yn':'Y'
                });
                setContainerList([{
                    'container_bookmark_seq':element.container_bookmark_seq
                    ,'container_bookmark_name':element.container_bookmark_name
                    ,'cntr_code':element.cntr_code
                    ,'cntr_empty_yn':element.cntr_empty_yn
                    ,'cntr_frozen_fc':element.cntr_frozen_fc
                    ,'cntr_frozen_tmp':element.cntr_frozen_tmp
                    ,'cntr_frozen_tmp_unit':element.cntr_frozen_tmp_unit
                    ,'cntr_pick_up_cy_address1':element.cntr_pick_up_cy_address1
                    ,'cntr_pick_up_cy_address2':element.cntr_pick_up_cy_address2
                    ,'cntr_pick_up_cy_address3':element.cntr_pick_up_cy_address3
                    ,'cntr_pick_up_cy_address4':element.cntr_pick_up_cy_address4
                    ,'cntr_pick_up_cy_address5':element.cntr_pick_up_cy_address5
                    ,'cntr_pick_up_cy_code':element.cntr_pick_up_cy_code
                    ,'cntr_pick_up_cy_name1':element.cntr_pick_up_cy_name1
                    ,'cntr_pick_up_cy_name2':element.cntr_pick_up_cy_name2
                    ,'cntr_pick_up_cy_user_email':element.cntr_pick_up_cy_user_email
                    ,'cntr_pick_up_cy_user_fax':element.cntr_pick_up_cy_user_fax
                    ,'cntr_pick_up_cy_user_name':element.cntr_pick_up_cy_user_name
                    ,'cntr_pick_up_cy_user_tel':element.cntr_pick_up_cy_user_tel
                    ,'cntr_pick_up_cy_date':element.cntr_pick_up_cy_date
                    ,'cntr_pre_cooling':element.cntr_pre_cooling
                    ,'cntr_qty':element.cntr_qty
                    ,'cntr_seal_no':element.cntr_seal_no
                    ,'cntr_seq':element.cntr_seq
                    ,'cntr_size':element.cntr_size
                    ,'cntr_soc_yn':element.cntr_soc_yn
                    ,'cntr_special_type':element.cntr_special_type
                    ,'cntr_type':element.cntr_type
                    ,'cntr_vent_open':element.cntr_vent_open
                    ,'cntr_width':element.cntr_width
                    ,'selected_yn':'Y'
                }]);
            }
            });
            if ( !coll ) {
                setColl(!coll);
            }
        }
    }

    // Card 팝업 화면에서 select 선택한 경우
    const fncSelectContainerList=(e, index)=>{
        // console.log(key, element)
        // containerList[key] = element;
        setContainerList([...containerList]);
        // Container 목록과 일치하는 index 찾기
        containerList.map((element, key)=>{
            // Container의 목록과 일치한다면
            if( key == index ) {
                // Bookmark 정보에서 일치하는거 찾기
                containerBookmarkList.map((row, i)=>{
                    if( e.target.value == row.container_bookmark_seq ) {
                        // 찾은걸 list에 넣어주자.
                        containerList[key] = row;
                    }
                });
            }
        });

        setContainerList([...containerList]);
    }

    const selectBookingContainerBookmark=()=>{
        axios.post(
            "/api/selectBookingContainerBookmark"
            ,{ 
                user_no: 'M000002'
            }
            ,{}
        ).then(
            res => {
                setContainerBookmarkList(res.data);
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }
    const selectBookingSpecialBookmark=()=>{
        axios.post(
            "/api/selectBookingSpecialBookmark"
            ,{ user_no: 'M000002'
            }
            ,{}
        ).then(
            res => {
                setSpecialBookmarkList(res.data);
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Container Booking 정보 조회
    const selectContainerOfBooking=(booking)=>{
        axios.post(
            "/api/selectContainerOfBooking"
            ,{ user_no: 'M000002'
                , booking
            }
            ,{}
        ).then(
            res => {
                setContainerList(res.data);
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Container Special Booking 정보 조회
    const selectContainerSpecialOfBooking=(booking)=>{
        axios.post(
            "/api/selectContainerSpecialOfBooking"
            ,{ user_no: 'M000002'
                , booking
            }
            ,{}
        ).then(
            res => {
                setContainerSpecialList(res.data);
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
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
    const onAddContainer=()=>{
        setContainerList([...containerList,{'key':2}]);
        setContainerSpecialList([...containerSpecialList,{'key':2, 'cntr_seq':containerList.length+1}]);
    }
    const onDelContainer=(index)=>{
        // 어느 컨테이너가 삭제되었는지 cntr_seq 값을 뽑는다.
        let cntr_seq = containerList[index].cntr_seq;
        
        if( containerList.length === 1 ) {
            setContainerList([{'key':1, 'cntr_seq':1}])
        } else {
            const cntrIdx = containerList.findIndex(function(item){return item.cntr_seq === cntr_seq });
            //  Splice의 경우 return값이 아닌 splice 처리후 적용
            if(cntrIdx > -1) containerList.splice(cntrIdx,1);
            setContainerList([...containerList]);
            
            const specialIdx = containerSpecialList.findIndex(function(item){return item.cntr_seq === cntr_seq });
            containerSpecialList.splice(specialIdx,1);
            //  Splice의 경우 return값이 아닌 splice 처리후 적용
            if(specialIdx > -1) setContainerSpecialList([...containerSpecialList]);
        }
        
    }
    // Special 목록 삭제
    const onDelSpecial=(special)=>{
        // 어느 컨테이너가 삭제되었는지 cntr_seq 값을 뽑는다.
        let cntr_seq = special.cntr_seq;
        let special_seq = special.special_seq;

        if(containerSpecialList.length === 1) {
            setContainerSpecialList([{'key':1, 'cntr_seq':cntr_seq,'special_seq':1}])
        } else {
            console.log("cntr_seq",cntr_seq,"special_seq",special_seq)
            const specialIdx = containerSpecialList.findIndex(function(item){return item.cntr_seq === cntr_seq && item.special_seq === special_seq });
            containerSpecialList.splice(specialIdx,1);
            //  Splice의 경우 return값이 아닌 splice 처리후 적용
            if(specialIdx > -1) setContainerSpecialList([...containerSpecialList]);
        }
    }

    // 컨테이너 자식에게 받은 정보
    const fncOnBlurContainer=(index, container)=>{
        // console.log(key, container)
        containerList[index] = container;
        setContainerList([...containerList]);
    }
    // 컨테이너 자식에게 받은 정보
    const fncOnBlurSpecialList=(specialList)=>{
        // console.log(key, container)
        // containerList[index] = container;
        setContainerSpecialList([...specialList]);
    }
    // 컨테이너 저장
    const fncSaveContainerList=(e)=>{
        console.log("containerList>",containerList);
        console.log("containerSpecialList>",containerSpecialList);
        axios.post(
            "/api/saveContainerOfBooking"
            ,{ user_no: 'M000002'
                , booking
                , containerList
                , containerSpecialList
            }
            ,{}
        ).then(
            res => {
                onDismiss("success", "정상 처리 되었습니다.");
                // 최초 조회하기
                selectContainerOfBooking(booking);
                selectContainerSpecialOfBooking(booking);
                setBooking({...booking, 'selected_yn':'N'})
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }
  return (
    <>
        <Row>
            <Col xl="12" lg="12">
                <Card>
                    <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>
                        <Row className="pb-4">
                            <Col className="mt-2 mb-0 col-5" style={{fontSize:'15px',color:'#696969',fontWeight:'600'}}>CONTAINER</Col>
                            <Col>
                                <Input type="select"
                                    style={{height:'35px',fonztSize:'10px',border:'0',borderBottom:'1px solid silver',borderRadius:'0',textAlignLast:'center'}}
                                    onChange={(e) => {
                                        fncSelectContainer(e)
                                    }}
                                    value={booking.container_bookmark_seq?booking.container_bookmark_seq:'0'}>
                                    <option key={0} value={'0'}>
                                        선택
                                    </option>
                                    {(containerBookmarkList.length>0)?containerBookmarkList.map((element,key)=>{
                                        return(
                                            <option key={key} value={element.container_bookmark_seq}>
                                                {element.container_bookmark_name}
                                            </option>
                                        )
                                    })
                                    :<></>}
                                </Input>
                            </Col>
                        </Row>
                        {/* <ButtonGroup className="pull-right">
                            {coll ?
                                <Button close aria-label="Cancel" onClick={() => setColl(!coll)}>
                                    <span aria-hidden>&ndash;</span>
                                </Button>
                                :
                                <Button close aria-label="Cancel" onClick={() => setColl(!coll)}>
                                    <span aria-hidden>+</span>
                                </Button>
                            }
                            <Button close aria-label="Cancel" onClick={toggle.bind(this, 'S')}>
                                <span aria-hidden>&#9635;</span>
                            </Button>
                            <Button close aria-label="Cancel" onClick={toggle.bind(this, 'F')}>
                                <span aria-hidden>&#9726;</span>
                            </Button>
                        </ButtonGroup> */}
                            {/* <Label className="mb-0">Container</Label>
                            <ContainerBookmark />
                            <Input type="select" >
                                <option key="1">SAMSONG ELECTRONICS</option>
                                <option key="2">LG ELECTRONICS</option>
                            </Input> */}
                            
                        {/* 보이는 영역 */}
                        <Collapse isOpen={coll}>
                            <CardBody onClick={toggle.bind(this, 'S')}>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <td>SIZE / TYPE</td>
                                            <td>QTY</td>
                                            <td>PICK UP CY</td>
                                            <td>PICK UP CY NAME</td>
                                            <td>PICK UP DATE</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {containerList.map((element,key)=>{
                                            if( element.cntr_seq ) {

                                            } else {
                                                element.cntr_seq = key+1;
                                            }
                                            return(
                                                <tr scope="row" key={key}>
                                                    <td>{element.cntr_code}</td>
                                                    <td>{element.cntr_qty}</td>
                                                    <td>{element.cntr_pick_up_cy_code}</td>
                                                    <td>{element.cntr_pick_up_cy_name1}</td>
                                                    <td>{element.cntr_pick_up_cy_date}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Collapse>
                        <div className="text-right">
                            <hr style={{position:'absolute',height:'0.5px',border:'0',width:'100%',left:'0',marginTop:'19px',backgroundColor:'silver'}}/>
                            <div>
                                <ContainerBookmark
                                    containerBookmarkList={containerBookmarkList}
                                    specialBookmarkList={specialBookmarkList}
                                    selectBookingContainerBookmark={selectBookingContainerBookmark}
                                    selectBookingSpecialBookmark={selectBookingSpecialBookmark}
                                    />
                                <Button
                                    className="btn-round btn-just-icon mr-1"
                                    color="default"
                                    outline
                                    id="shpview"
                                    onClick={toggle.bind(this, 'S')}
                                    style={{position:'relative',backgroundColor:'white'}}
                                >
                                <i className="fa fa-window-restore"/>
                                </Button>
                                <UncontrolledTooltip delay={0} target="shpview">Window Input</UncontrolledTooltip>
                                <Button
                                    className="btn-round btn-just-icon mr-1"
                                    color="default"
                                    outline
                                    id="shpmore"
                                    onClick={() => setColl(!coll)}
                                    style={{position:'relative',backgroundColor:'white'}}
                                >
                                <i className="fa fa-ellipsis-v" />
                                </Button>
                                <UncontrolledTooltip delay={0} target="shpmore">Open</UncontrolledTooltip>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        {/* 모달 팝업 영역 
        xs : 한 줄
        sm : 576px 에서 다음 줄로 넘어감
        md : 768px
        lg : 992px
        xl : 1200px
        fluid : 뷰포트 전체의 너비
        */}
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="xl">
            <ModalHeader toggle={toggle}>Container</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <Row>
                            {(containerList.length>0)?containerList.map((element, key)=>{
                                return (
                                    <Row key={key}>
                                        <Col className="col-12 text-right" xl="8" lg="8">
                                            <Input type="select" key={key}
                                                style={{height:'35px',fonztSize:'10px',border:'0',borderBottom:'1px solid silver',borderRadius:'0',textAlignLast:'center'}}
                                                onChange={(e) => {
                                                    fncSelectContainerList(e, key)
                                                }}
                                                value={element.container_bookmark_seq?element.container_bookmark_seq:'0'}>
                                                <option key={0} value={'0'}>
                                                    선택
                                                </option>
                                                {(containerBookmarkList.length>0)?containerBookmarkList.map((row,i)=>{
                                                    return(
                                                        <option key={i} value={row.container_bookmark_seq}>
                                                            {row.container_bookmark_name}
                                                        </option>
                                                    )
                                                })
                                                :<></>}
                                            </Input>
                                        </Col>
                                        <Col className="col-12 text-right" xl="4" lg="4">
                                            <Button
                                                className="p-0 mr-1"
                                                color="default"
                                                outline
                                                size="sm"
                                                onClick={onAddContainer}
                                            >
                                            <i className="fa fa-plus" />
                                            </Button>
                                        </Col>
                                        <Container
                                            index={key}
                                            container={element}
                                            containerSpecialList={containerSpecialList}
                                            specialBookmarkList={specialBookmarkList}
                                            fncOnBlurContainer={fncOnBlurContainer}
                                            fncOnBlurSpecialList={fncOnBlurSpecialList}
                                            onDelContainer={onDelContainer}
                                            onDelSpecial={onDelSpecial}
                                            />
                                    </Row>
                                )
                            }):<></>}
                        </Row>
                    </CardBody>
                </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={fncSaveContainerList}>Save</Button>{' '}
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

export default ContainerCard;