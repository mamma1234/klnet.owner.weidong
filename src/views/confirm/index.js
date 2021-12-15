import React, { useState, useEffect } from 'react';
import { Row, Col, Button, FormGroup, Label, Input, 
    UncontrolledTooltip, Form, Container, CardBody, Card, CardHeader,
    Collapse, Badge} from "reactstrap";
// import ReactDatetime from "react-datetime";
//import Moment from 'moment'
import axios from "axios";
// reactstrap components

// core components
import WeidongNavbar from "components/Navbars/WeidongNavbar.js";
import FooterWeidong from "components/Footers/FooterWeidong.js";
import AlertModal from 'components/Modals/Alert.js';
// sections for this page
// import BookingMainWdfc from "./sections/BookingMainWdfc.js";

//import {observer} from 'mobx-react-lite';
import * as validation from 'components/common/validation.js';
import Confirm from 'components/Confirm/Confirm.js';
// import userStore from "store/UserStore.js";


// const ConfirmIndex = observer((props) => {    
// const ConfirmIndex = observer(({props, store}) => {    
// const ConfirmIndex = props => observer(({props}) => {    
export default function ConfirmIndex(props) {

// export const ConfirmIndex = observer((props) => {     
    console.log('props=',props);
    // console.log('store=',store);


  // const [clsNm, setClsNm] = useState("");
  // const [color, setColor] = useState("success");
  // const [message, setMessage] = useState("정상 처리되었습니다.");
  // const [visible, setVisible] = useState(false);
  const [dismiss, setDismiss] = useState({color:"success", message:"정상 처리되었습니다.", visible:false});
  // const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState({});
  const [cargo, setCargo] = useState([]);
  const [cargoGoods, setCargoGoods] = useState([]);
  const [cntr, setCntr] = useState([]);
  const [cntrSpecials, setCntrSpecails] = useState([]);

//   const [confirmVsBooking, setConfirmVsBooking] = useState({});
//   const [confirmVsBookingCargo, setConfirmVsBookingCargo] = useState({});
  

  
//   const [param, setParam] = useState({user_no:"M000002", res_bkg_no:"MHI27200026", res_confirm_date:""});
  const [param, setParam] = useState({user_no: props.location.state && props.location.state.user_no  ?  props.location.state.user_no || '' : '' , 
                                    res_bkg_no: props.location.state && props.location.state.res_bkg_no  ?  props.location.state.res_bkg_no || '' : '' , 
                                    res_confirm_date: props.location.state && props.location.state.res_confirm_date  ?  props.location.state.res_confirm_date || '' : '' });


  const [coll, setColl] = useState({others:false, schedule:false, shipper:false, carrier:false, trasport:false, cargo:false, container:false});
  
  const {user} = props;

  //document.documentElement.classList.remove("nav-open");
  // function that is being called on scroll of the page
 /* const checkScroll = () => {
    // it takes all the elements that have the .add-animation class on them
    const componentPosition = document.getElementsByClassName("add-animation");
    const scrollPosition = window.pageYOffset;
    for (var i = 0; i < componentPosition.length; i++) {
      var rec =
        componentPosition[i].getBoundingClientRect().top + window.scrollY + 100;
      // when the element with the .add-animation is in the scroll view,
      // the .animated class gets added to it, so it creates a nice fade in animation
      if (scrollPosition + window.innerHeight >= rec) {
        componentPosition[i].classList.add("animated");
        // when the element with the .add-animation is not in the scroll view,
        // the .animated class gets removed from it, so it creates a nice fade out animation
      } else if (scrollPosition + window.innerHeight * 0.8 < rec) {
        componentPosition[i].classList.remove("animated");
      }
    }
  };*/

  useEffect(() => {
   /* document.body.classList.add("presentation-page");
    window.addEventListener("scroll", checkScroll);
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;*/

   // console.log('useEffect onload');

    if ( param.user_no.length > 0 && param.res_bkg_no.length > 0 ) {
        selectShpConfirm();
    }

    return function cleanup() {
    //  document.body.classList.remove("presentation-page");
    //  window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const selectShpConfirm = ( ) => {
    axios.post(
        "/shipper/selectShpConfirm"
        , param //,{ user_no: 'M000002', param }
        ,{}
    ).then( res => {
        if(res.data && res.data.length > 0) {
            // console.log('res.data=',res.data);
          setConfirm(res.data[0]);
          selectShpConfirmCargo(res.data[0].user_no, res.data[0].res_bkg_no, res.data[0].res_confirm_date, res.data[0].line_code);
          selectShpConfirmCntr(res.data[0].user_no, res.data[0].res_bkg_no, res.data[0].res_confirm_date, res.data[0].line_code, res.data[0].sch_vessel_name);
          selectShpConfirmCntrSpecial(res.data[0].user_no, res.data[0].res_bkg_no, res.data[0].res_confirm_date);
        //   console.log(">>>>>",Object.keys(coll).map(k=>({[k]:true})));
        //   console.log("COLL ",coll);
          setColl(Object.assign(...Object.keys(coll).map(k=>({[k]:true}))));
        } else {
          onDismiss("danger", "조회된 결과가 없습니다.");
        }
      }).catch(err => {
        if(err.response.status) {
            onDismiss("danger", "오류가 발생했습니다.");
        }
    });
  }



  const selectShpConfirmCargo = ( user_no, res_bkg_no, res_confirm_date, line_code ) => {
    axios.post(
        "/shipper/selectShpConfirmCargo"
        , { user_no, res_bkg_no, res_confirm_date, line_code }
        ,{}
    ).then( res => {
        // console.log('res.data', res.data);
        if(res.data && res.data.length > 0) {
            setCargo(res.data);
            selectShpConfirmCargoGoods(res.data[0].user_no, res.data[0].res_bkg_no, res.data[0].res_confirm_date, res.data[0].cargo_seq);
        //   setColl(Object.assign(...Object.keys(coll).map(k=>({[k]:true}))));

        console.log('res.data=',res.data);

        } 
      }).catch(err => {
        if(err.response.status) {
            onDismiss("danger", "오류가 발생했습니다.");
        }
    });
  }
  const selectShpConfirmCargoGoods = ( user_no, res_bkg_no, res_confirm_date, cargo_seq ) => {
    axios.post(
        "/shipper/selectShpConfirmCargoGoods"
        , { user_no, res_bkg_no, res_confirm_date, cargo_seq }
        ,{}
    ).then( res => {
        // console.log('res.data', res.data);
        if(res.data && res.data.length > 0) {
            setCargoGoods(res.data);
        //   setColl(Object.assign(...Object.keys(coll).map(k=>({[k]:true}))));

        console.log('res.data=',res.data);

        } 
      }).catch(err => {
        if(err.response.status) {
            onDismiss("danger", "오류가 발생했습니다.");
        }
    });
  }

  const selectShpConfirmCntr = ( user_no, res_bkg_no, res_confirm_date, line_code, sch_vessel_name ) => {
    axios.post(
        "/shipper/selectShpConfirmCntr"
        , { user_no, res_bkg_no, res_confirm_date, line_code, sch_vessel_name }
        ,{}
    ).then( res => {
        // console.log('res.data', res.data);
        if(res.data && res.data.length > 0) {
          setCntr(res.data);
        //   setColl(Object.assign(...Object.keys(coll).map(k=>({[k]:true}))));
        } 
      }).catch(err => {
        if(err.response.status) {
            onDismiss("danger", "오류가 발생했습니다.");
        }
    });
  }

  const selectShpConfirmCntrSpecial = ( user_no, res_bkg_no, res_confirm_date ) => {
    axios.post(
        "/shipper/selectShpConfirmCntrSpecial"
        , { user_no, res_bkg_no, res_confirm_date }
        ,{}
    ).then( res => {
        // console.log('res.data', res.data);
        if(res.data && res.data.length > 0) {
          setCntrSpecails(res.data);
        //   setColl(Object.assign(...Object.keys(coll).map(k=>({[k]:true}))));
        } 
      }).catch(err => {
        if(err.response.status) {
            onDismiss("danger", "오류가 발생했습니다.");
        }
    });
  }

  const onChange = ( event ) => {
     
    // console.log(event);

    

    const { target: {id, value} } = event;

    //  console.log('id=', id , ', value=', value);

    if (id === 'res_bkg_no') {
        setParam(prevState => ({...prevState, res_bkg_no:value}));
    } else if (id === 'res_confirm_date') {
        setParam(prevState => ({...prevState, res_confirm_date:value}));
    }

  }
  const onDismiss = (color, message) => {
    setDismiss({color:color, message:message, visible:!dismiss.visible});
  }  

  const renderLabel = (id, source, target) => {
    const style = {textDecoration:"underline", color:"blue"};
    return (
        <>
        <Label className="form-control-sm form-control mb-0"  style={source !== target ? style : {}} id={id}>{source ? source:''}</Label>
        { source !== target &&
            <UncontrolledTooltip placement="top" target={id}>{target ? target:''}</UncontrolledTooltip>}
        </>
    );
  }

    const sendBooking = async(status)=> {
        
        if( !user ) {
            props.onAlert("error",validation.NOTLOGIN_MSG);   
            return false;
        }


        if( !confirm.res_bkg_no ) return false;
        if( "N" === confirm.bkg_exists_yn) {
            props.onAlert("error","Confirm에 대한 Requset(Booking) 정보가 없습니다. 취소 불가합니다.");   
            return false;
        }
        // booking의 document 정보와 다르면 Confirm 메세지 
        let title = "["+confirm.bkg_no+"]" ;
        let message = "["+ confirm.bkg_no+"] Booking 을(를) 취소 하시겠습니까?";
        let result = await Confirm({
            title: title,
            message: message,
            confirmText: "SEND",
            cancleText: 'Cancel',
        });
        console.log( confirm.status_cus, 'RA' === confirm.status_cus )
        if ( true === result ) {
            if( !('RA' === confirm.status_cus) ) {
                props.onAlert("error","부킹취소는 승인 인 경우에만 가능합니다.");
                return false;
            }

            // 취소인 경우
            axios.post(
                "/shipper/sendBooking"
                ,{
                user_no : user?user.user_no:null,
                klnet_id: user.klnet_id,
                status : 'CANCEL',
                booking :{
                    bkg_no: confirm.bkg_no,
                    bkg_date: confirm.bkg_date,
                    user_no: confirm.user_no
                }
                }
                ,{}
            ).then(
                // INSERT 결과값 넣기
                res => {
                    props.onAlert("success",validation.SEND_MSG);
                    selectShpConfirm();
                }   
            );
        }
    }

  return (
    <>
        <WeidongNavbar {...props}/>
        <div className="bg-white page-header page-header-xss" id="general"/>
        <div className="section section-white">
            <Form>
                <Container>
                    <CardBody className="pt-2 pb-2 bg-white">
        			<Row>
			            <Col className="ml-auto mr-auto" xl="12" lg="12" md="12" sm="12" >
				            <h1 className="mt-1 text-start" style={{
				                background:
				                    "url(" + require("assets/img/bu_contitle_bar.gif") + ") no-repeat"
				                  }}>
				            	<small>Comfirm (Booking)</small>
				            </h1>
			            </Col>
			         </Row>
                        <Row className="mt-0">
                            <Col className="text-right">
                                <Button id="bkg_search" color="default" outline type="button" className="mr-1"
                                    onClick={(e)=>selectShpConfirm()}>SEARCH</Button>
                                <UncontrolledTooltip delay={0} target="bkg_search">Search</UncontrolledTooltip>
                                <Button id="bkg_cancel" color="default" outline type="button" className="mr-1"
                                    onClick={(e)=>sendBooking('CANCEL')}>CANCEL</Button>
                                <UncontrolledTooltip delay={0} target="bkg_cancel">취소문서 전송</UncontrolledTooltip>
                            </Col>
                            
                        </Row>
                        <hr className="mt-2"/>
                        <Row>

                            {/* Title */}
                            <Col xl="12" lg="12" className="pl-4 pr-4 pb-3">
                                <Row>
                                    <Col xl="3" lg="3" md="12">
                                        <FormGroup>
                                            <Label className="mb-0">Booking Number</Label>
                                            <Input type="text" name="res_bkg_no" id="res_bkg_no"
                                                maxLength="15"
                                                defaultValue={param.res_bkg_no}
                                                onChange={onChange}

                                                // onChange={(e)=>fncOnChange(e, 'bkg_no')}
                                                // onBlur={(e)=>fncOnBlurBooking(e)}
                                                // onKeyPress={(e)=>fncOnKeyPressBkgNo(e)}
                                            />
                                        </FormGroup>
                                    </Col>  
                                    <Col xl="3" lg="3" md="12">
                                        <FormGroup>
                                            <Label className="mb-0">Confirm Date</Label>
                                            <Input type="text" name="res_confirm_date" id="res_confirm_date"
                                                maxLength="15"
                                                defaultValue={param.res_confirm_date}
                                                onChange={onChange}

                                                // onChange={(e)=>fncOnChange(e, 'bkg_no')}
                                                // onBlur={(e)=>fncOnBlurBooking(e)}
                                                // onKeyPress={(e)=>fncOnKeyPressBkgNo(e)}
                                            />
                                        </FormGroup>
                                    </Col>  
                                    <Col xl="3" lg="3" md="12">
                                        <FormGroup>
                                            <Label className="mb-0">현재 상태</Label>
                                            <Input type="text" name="status_cus" id="status_cus"
                                                defaultValue={ 
                                                    (() => {
                                                    switch(confirm.status_cus) {
                                                        case 'S9': return '전송';
                                                        case 'RA': return '승인';
                                                        case 'S4': return '정정전송';
                                                        case 'S1': return '취소전송';
                                                        case 'EJ': return '거절';
                                                        case 'EC': return '취소승인';
                                                        case 'NO': return '저장';
                                                        case 'EA': return '승인취소';
                                                        default: return ''; break;
                                                    }
                                                    }).call(this)
                                                }
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                            <Row>
                                <Row style={{zIndex:'200'}}>
                                    <nav id="cd-vertical-nav">
                                        <ul>
                                            <li>
                                                <a href="#!"
                                                data-number="10"
                                                //href="#headers"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setColl(Object.assign(...Object.keys(coll).map(k=>({[k]:true}))));
                                                }}
                                                >
                                                <span className="cd-dot bg-success" />
                                                <span className="cd-label bg-success"><i className="fa fa-window-restore"/>Open All</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!"
                                                data-number="1"
                                                //href="#headers"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    document.getElementById("general").scrollIntoView({
                                                    behavior: "smooth",
                                                    block: "start",
                                                    inline: "nearest",
                                                    });
                                                }}
                                                >
                                                <span className="cd-dot bg-secondary" />
                                                <span className="cd-label">TOP</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!"
                                                data-number="6"
                                                //href="#projects"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setColl({...coll, 'others':true});
                                                    document.getElementById("others").scrollIntoView({
                                                    behavior: "smooth",
                                                    block: "start",
                                                    inline: "nearest",
                                                    });
                                                }}
                                                >
                                                <span className="cd-dot bg-secondary" />
                                                <span className="cd-label">Booking</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!"
                                                data-number="7"
                                                //href="#projects"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setColl({...coll, 'schedule':true});
                                                    document.getElementById("schedule").scrollIntoView({
                                                    behavior: "smooth",
                                                    block: "start",
                                                    inline: "nearest",
                                                    });
                                                }}
                                                >
                                                <span className="cd-dot bg-secondary" />
                                                <span className="cd-label">Schedule</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!"
                                                data-number="2"
                                                //href="#features"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setColl({...coll, 'carrier':true});
                                                    document.getElementById("carrier").scrollIntoView({
                                                    behavior: "smooth",
                                                    block: "start",
                                                    inline: "nearest",
                                                    });
                                                }}
                                                >
                                                <span className="cd-dot bg-secondary" />
                                                <span className="cd-label">Carrier</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!"
                                                data-number="3"
                                                //href="#features"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setColl({...coll, 'shipper':true});
                                                    document.getElementById("shipper").scrollIntoView({
                                                    behavior: "smooth",
                                                    block: "start",
                                                    inline: "nearest",
                                                    });
                                                }}
                                                >
                                                <span className="cd-dot bg-secondary" />
                                                <span className="cd-label">Shipper</span>
                                                </a>
                                            </li>
                                            {/* <li>
                                                <a href="#!"
                                                data-number="4"
                                                //href="#features"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    // setOpenConsignee(true);
                                                    document.getElementById("consignee").scrollIntoView({
                                                    behavior: "smooth",
                                                    block: "start",
                                                    inline: "nearest",
                                                    });
                                                }}
                                                >
                                                <span className="cd-dot bg-secondary" />
                                                <span className="cd-label">Consignee</span>
                                                </a>
                                            </li> */}
                                            {/* <li>
                                                <a href="#!"
                                                data-number="5"
                                                //href="#teams"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    // setOpenForwarder(true);
                                                    document.getElementById("Forwarder").scrollIntoView({
                                                    behavior: "smooth",
                                                    block: "start",
                                                    inline: "nearest",
                                                    });

                                                }}
                                                >
                                                <span className="cd-dot bg-secondary" />
                                                <span className="cd-label">Forwarder</span>
                                                </a>
                                            </li> */}
                                            <li>
                                                <a href="#!"
                                                data-number="6"
                                                //href="#projects"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setColl({...coll, 'transport':true});
                                                    document.getElementById("transport").scrollIntoView({
                                                    behavior: "smooth",
                                                    block: "start",
                                                    inline: "nearest",
                                                    });
                                                }}
                                                >
                                                <span className="cd-dot bg-secondary" />
                                                <span className="cd-label">Transport</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!"
                                                data-number="6"
                                                //href="#projects"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setColl({...coll, 'cargo':true});
                                                    document.getElementById("cargo").scrollIntoView({
                                                    behavior: "smooth",
                                                    block: "start",
                                                    inline: "nearest",
                                                    });
                                                }}
                                                >
                                                <span className="cd-dot bg-secondary" />
                                                <span className="cd-label">Cargo</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!"
                                                data-number="7"
                                                //href="#projects"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setColl({...coll, 'container':true});
                                                    document.getElementById("container").scrollIntoView({
                                                    behavior: "smooth",
                                                    block: "start",
                                                    inline: "nearest",
                                                    });
                                                }}
                                                >
                                                <span className="cd-dot bg-secondary" />
                                                <span className="cd-label">Container</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </Row>
                            </Row>
                            {/* OTHERS */}
                            <Col xl="6" lg="6">
                                <Row>
                                    <Col xl="12" lg="12">
                                        <Card id="others">
                                            {/* <CardHeader className="bg-white"> */}
                                            <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>
                                                <Row className="pb-2">
                                                    <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>BOOKING</Col>
                                                </Row>
                                                {/* 보이는 영역 */}
                                                <Collapse isOpen={coll.others}>
                                                    <hr className="mt-0"/>
                                                    <Row>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Req Bkg</Label></Col>
                                                                    <Col><Label className="form-control-sm form-control mb-0">{confirm.bkg_no?confirm.bkg_no:''}</Label></Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Contract Number</Label></Col>
                                                                    <Col>{renderLabel("sc_no", confirm.sc_no, confirm.t_sc_no)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Remark</Label></Col>
                                                                    <Col>
                                                                        <Row className="mb-1"><Col><Label className="form-control-sm form-control mb-0">{confirm.res_remark1?confirm.res_remark1:''}</Label></Col></Row>
                                                                        <Row className="mb-1"><Col><Label className="form-control-sm form-control mb-0">{confirm.res_remark2?confirm.res_remark2:''}</Label></Col></Row>
                                                                    </Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </Collapse>
                                                <div className="text-center" onClick={() => setColl(prevState => ({...prevState, others:!coll.others}))}>
                                                    <div>
                                                        <Button className="p-0" color="link" id="linemore" onClick={() => setColl(prevState => ({...prevState, others:!coll.others}))} style={{height:'21px'}}>
                                                            {coll.others?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
                                                        </Button>
                                                        <UncontrolledTooltip delay={0} target="linemore">{coll.others?'Close':'Open'}</UncontrolledTooltip>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>

                            {/* SCHEDULE */}
                            <Col xl="6" lg="6">
                                <Row>
                                    <Col xl="12" lg="12">
                                        <Card id="schedule">
                                            <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>
                                                <Row className="pb-2">
                                                    <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>SCHEDULE</Col>
                                                </Row>
                                                <Collapse isOpen={coll.schedule}>
                                                    <hr className="mt-0"/>
                                                    <Row>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Vessel</Label></Col>
                                                                    <Col>{renderLabel("sch_vessel_name", confirm.sch_vessel_name, confirm.t_sch_vessel_name)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Voyage</Label></Col>
                                                                    <Col>{renderLabel("sch_vessel_voyage", confirm.sch_vessel_voyage, confirm.t_sch_vessel_voyage)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Call Sign</Label></Col>
                                                                    <Col>{renderLabel("sch_call_sign", confirm.sch_call_sign, confirm.t_sch_call_sign)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">On board</Label></Col>
                                                                    <Col>{renderLabel("sch_led", confirm.sch_led, confirm.t_sch_led)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Doc Close</Label></Col>
                                                                    <Col>{renderLabel("sch_dct", confirm.sch_dct, confirm.t_sch_dct)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Carry Close</Label></Col>
                                                                    <Col>{renderLabel("sch_cct", confirm.sch_cct, confirm.t_sch_cct)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">T.S Y/N</Label></Col>
                                                                    <Col>{renderLabel("sch_ts_yn", confirm.sch_ts_yn, confirm.t_sch_ts_yn)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">POL</Label></Col>
                                                                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="pr-1">{renderLabel("sch_pol", confirm.sch_pol, confirm.t_sch_pol)}</Col>
                                                                    <Col xs="7" xl="7" lg="7" md="7" sm="7" className="pl-1">{renderLabel("sch_pol_name", confirm.sch_pol_name, confirm.t_sch_pol_name)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">POD</Label></Col>
                                                                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="pr-1">{renderLabel("sch_pod", confirm.sch_pod, confirm.t_sch_pod)}</Col>
                                                                    <Col xs="7" xl="7" lg="7" md="7" sm="7" className="pl-1">{renderLabel("sch_pod_name", confirm.sch_pod_name, confirm.t_sch_pod_name)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">POR</Label></Col>
                                                                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="pr-1">{renderLabel("sch_por", confirm.sch_por, confirm.t_sch_por)}</Col>
                                                                    <Col xs="7" xl="7" lg="7" md="7" sm="7" className="pl-1">{renderLabel("sch_por_name", confirm.sch_por_name, confirm.t_sch_por_name)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">PLD</Label></Col>
                                                                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="pr-1">{renderLabel("sch_pld", confirm.sch_pld, confirm.t_sch_pld)}</Col>
                                                                    <Col xs="7" xl="7" lg="7" md="7" sm="7" className="pl-1">{renderLabel("sch_pld_name", confirm.sch_pld_name, confirm.t_sch_pld_name)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">FDP</Label></Col>
                                                                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="pr-1">{renderLabel("sch_fdp", confirm.sch_fdp, confirm.t_sch_fdp)}</Col>
                                                                    <Col xs="7" xl="7" lg="7" md="7" sm="7" className="pl-1">{renderLabel("sch_fdp_name", confirm.sch_fdp_name, confirm.t_sch_fdp_name)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">ETD</Label></Col>
                                                                    <Col>{renderLabel("sch_etd", confirm.sch_etd, confirm.t_sch_etd)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">ETA</Label></Col>
                                                                    <Col>{renderLabel("sch_eta", confirm.sch_eta, confirm.t_sch_eta)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>                                                  
                                                    </Row>
                                                </Collapse>
                                                <div className="text-center" onClick={() => setColl(prevState => ({...prevState, schedule:!coll.schedule}))}>
                                                    <div>
                                                        <Button className="p-0" color="link" id="linemore" onClick={() => setColl(prevState => ({...prevState, schedule:!coll.schedule}))} style={{height:'21px'}}>
                                                            {coll.schedule?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
                                                        </Button>
                                                        <UncontrolledTooltip delay={0} target="linemore">{coll.schedule?'Close':'Open'}</UncontrolledTooltip>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>

                            {/* SHIPPER */}
                            <Col xl="6" lg="6">
                                <Row>
                                    <Col xl="12" lg="12">
                                        <Card id="shipper">
                                            <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>
                                                <Row className="pb-2">
                                                    <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>SHIPPER</Col>
                                                </Row>
                                                {/* 보이는 영역 */}
                                                <Collapse isOpen={coll.shipper}>
                                                    <hr className="mt-0"/>
                                                    <Row>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Name</Label></Col>
                                                                    <Col>
                                                                        <Row className="mb-1"><Col>{renderLabel("shp_name1", confirm.shp_name1, confirm.t_shp_name1)}</Col></Row>
                                                                        <Row className="mb-1"><Col>{renderLabel("shp_name2", confirm.shp_name2, confirm.t_shp_name2)}</Col></Row>
                                                                    </Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Code</Label></Col>
                                                                    <Col>{renderLabel("shp_code", confirm.shp_code, confirm.t_shp_code)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Address</Label></Col>
                                                                    <Col>
                                                                        <Row className="mb-1"><Col>{renderLabel("shp_address1", confirm.shp_address1, confirm.t_shp_address1)}</Col></Row>
                                                                        <Row className="mb-1"><Col>{renderLabel("shp_address2", confirm.shp_address2, confirm.t_shp_address2)}</Col></Row>
                                                                        <Row className="mb-1"><Col>{renderLabel("shp_address3", confirm.shp_address3, confirm.t_shp_address3)}</Col></Row>
                                                                        <Row className="mb-1"><Col>{renderLabel("shp_address4", confirm.shp_address4, confirm.t_shp_address4)}</Col></Row>
                                                                        <Row className="mb-1"><Col>{renderLabel("shp_address5", confirm.shp_address5, confirm.t_shp_address5)}</Col></Row>
                                                                    </Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>                                                        
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Payment</Label></Col>
                                                                    <Col>
                                                                    {renderLabel("shp_payment_type", 
                                                                        (() => {
                                                                        switch(confirm.shp_payment_type) {
                                                                            case 'P': return 'Prepaid';
                                                                            case 'C': return 'Collected';
                                                                            default: return ''; break;
                                                                        }
                                                                        }).call(this),  
                                                                        (() => {
                                                                        switch(confirm.t_shp_payment_type) {
                                                                            case 'P': return 'Prepaid';
                                                                            case 'C': return 'Collected';
                                                                            default: return ''; break;
                                                                        }
                                                                        }).call(this)
                                                                    )}
                                                                    </Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                </Collapse>
                                                <div className="text-center" onClick={() => setColl(prevState => ({...prevState, shipper:!coll.shipper}))}>
                                                    <div>
                                                        <Button className="p-0" color="link" id="linemore" onClick={() => setColl(prevState => ({...prevState, shipper:!coll.shipper}))} style={{height:'21px'}}>
                                                            {coll.shipper?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
                                                        </Button>
                                                        <UncontrolledTooltip delay={0} target="linemore">{coll.shipper?'Close':'Open'}</UncontrolledTooltip>
                                                    </div>
                                                </div>
                                            </CardBody>
                                            {/* </CardHeader> */}
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>

                            {/* CARRIER */}
                            <Col xl="6" lg="6">
                                <Row>
                                    <Col xl="12" lg="12">
                                        <Card id="carrier">
                                            {/* <CardHeader className="bg-white"> */}
                                            <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>
                                                <Row className="pb-2">
                                                    <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>CARRIER</Col>
                                                </Row>
                                                {/* 보이는 영역 */}
                                                <Collapse isOpen={coll.carrier}>
                                                    <hr className="mt-0"/>
                                                    <Row>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Name</Label></Col>
                                                                    <Col>
                                                                        <Row className="mb-1"><Col>{renderLabel("line_name1", confirm.line_name1, confirm.t_line_name1)}</Col></Row>
                                                                        <Row className="mb-1"><Col>{renderLabel("line_name2", confirm.line_name2, confirm.t_line_name2)}</Col></Row>
                                                                    </Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>                                                        
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Code</Label></Col>
                                                                    <Col>{renderLabel("line_code", confirm.line_code, confirm.t_line_code)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Dept</Label></Col>
                                                                    <Col>{renderLabel("line_user_dept", confirm.line_user_dept, confirm.t_line_user_dept)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Person</Label></Col>
                                                                    <Col>{renderLabel("line_user_name", confirm.line_user_name, confirm.t_line_user_name)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Tel</Label></Col>
                                                                    <Col>{renderLabel("line_user_tel", confirm.line_user_tel, confirm.t_line_user_tel)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Fax</Label></Col>
                                                                    <Col>{renderLabel("line_user_fax", confirm.line_user_fax, confirm.t_line_user_fax)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Email</Label></Col>
                                                                    <Col>{renderLabel("line_user_email", confirm.line_user_email, confirm.t_line_user_email)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Address</Label></Col>
                                                                    <Col>
                                                                        <Row className="mb-1"><Col>{renderLabel("line_address1", confirm.line_address1, confirm.t_line_address1)}</Col></Row>
                                                                        <Row className="mb-1"><Col>{renderLabel("line_address2", confirm.line_address2, confirm.t_line_address2)}</Col></Row>
                                                                        <Row className="mb-1"><Col>{renderLabel("line_address3", confirm.line_address3, confirm.t_line_address3)}</Col></Row>
                                                                        <Row className="mb-1"><Col>{renderLabel("line_address4", confirm.line_address4, confirm.t_line_address4)}</Col></Row>
                                                                        <Row className="mb-1"><Col>{renderLabel("line_address5", confirm.line_address5, confirm.t_line_address5)}</Col></Row>
                                                                    </Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </Collapse>
                                                <div className="text-center" onClick={() => setColl(prevState => ({...prevState, carrier:!coll.carrier}))}>
                                                    <div>
                                                        <Button className="p-0" color="link" id="linemore" onClick={() => setColl(prevState => ({...prevState, carrier:!coll.carrier}))} style={{height:'21px'}}>
                                                            {coll.carrier?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
                                                        </Button>
                                                        <UncontrolledTooltip delay={0} target="linemore">{coll.carrier?'Close':'Open'}</UncontrolledTooltip>
                                                    </div>
                                                </div>
                                            </CardBody>
                                            {/* </CardHeader> */}
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                            
                            {/* TRANSPORT */}
                            <Col xl="6" lg="6">
                                <Row>
                                    <Col xl="12" lg="12">
                                        <Card id="trasport">
                                            {/* <CardHeader className="bg-white"> */}
                                            <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>
                                                <Row className="pb-2">
                                                    <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>TRANSPORT</Col>
                                                </Row>
                                                {/* 보이는 영역 */}
                                                <Collapse isOpen={coll.trasport}>
                                                    <hr className="mt-0"/>
                                                    <Row>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Haulage</Label></Col>
                                                                    <Col>{renderLabel("line_address5",                                                                         (() => {
                                                                        switch(confirm.trans_self_yn) {
                                                                            case 'Y': return 'Merchant haulage';
                                                                            case 'N': return 'Carrier haulage';
                                                                            default: return ''; break;
                                                                        }
                                                                        }).call(this), 
                                                                        (() => {
                                                                            switch(confirm.t_trans_self_yn) {
                                                                                case 'Y': return 'Merchant haulage';
                                                                                case 'N': return 'Carrier haulage';
                                                                                default: return ''; break;
                                                                            }
                                                                            }).call(this)
                                                                        )}
                                                                    </Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                <Row>
                                                                    <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Service</Label></Col>
                                                                    <Col>{renderLabel("trans_service_name", confirm.trans_service_name, confirm.t_trans_service_name)}</Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </Collapse>
                                                <div className="text-center" onClick={() => setColl(prevState => ({...prevState, trasport:!coll.trasport}))}>
                                                    <div>
                                                        <Button className="p-0" color="link" id="linemore" onClick={() => setColl(prevState => ({...prevState, trasport:!coll.trasport}))} style={{height:'21px'}}>
                                                            {coll.trasport?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
                                                        </Button>
                                                        <UncontrolledTooltip delay={0} target="linemore">{coll.trasport?'Close':'Open'}</UncontrolledTooltip>
                                                    </div>
                                                </div>
                                            </CardBody>
                                            {/* </CardHeader> */}
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>

                            {/* CARGO */}
                            <Col xl="12" lg="12">
                                <Row>
                                    <Col xl="12" lg="12">
                                        <Card id="cargo">
                                            {/* <CardHeader className="bg-white"> */}
                                            <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>
                                                <Row className="pb-2">
                                                    <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>CARGO</Col>
                                                </Row>
                                                {/* 보이는 영역 */}
                                                <Collapse isOpen={coll.cargo}>
                                                    <hr className="mt-0"/>
                                                    <Row>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                {
                                                                    cargo.map((data, index)=>(
                                                                        <Row key={index.toString()}>
                                                                        <Col xl="12" lg="12" md="12">
                                                                            <FormGroup className="mb-1">
                                                                                <Row>
                                                                                <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Cargo Type</Label></Col>
                                                                                    <Col>{renderLabel("cargo_type_name"+"_"+index.toString(), data.cargo_type_name, data.t_cargo_type_name)}</Col>
                                                                                </Row>
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col xl="12" lg="12" md="12">
                                                                            <FormGroup className="mb-1">
                                                                                <Row>
                                                                                <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Pkg Qty</Label></Col>
                                                                                    <Col>{renderLabel("cargo_pack_qty"+"_"+index.toString(), data.cargo_pack_qty, data.t_cargo_pack_qty)}</Col>
                                                                                </Row>
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col xl="12" lg="12" md="12">
                                                                            <FormGroup className="mb-1">
                                                                                <Row>
                                                                                <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Pkg Type</Label></Col>
                                                                                    <Col>{renderLabel("cargo_pack_type_name"+"_"+index.toString(), data.cargo_pack_type_name, data.t_cargo_pack_type_name)}</Col>
                                                                                </Row>
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col xl="12" lg="12" md="12">
                                                                            <FormGroup className="mb-1">
                                                                                <Row>
                                                                                <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1"><Label className="mb-0">Total Weight</Label></Col>
                                                                                    <Col>{renderLabel("cargo_total_weight"+"_"+index.toString(), data.cargo_total_weight, data.t_cargo_total_weight)}</Col>
                                                                                </Row>
                                                                            </FormGroup>
                                                                        </Col>
                                                                        { index < cargo.length-1 && <hr className="border-secondary"/> }
                                                                        </Row>
                                                                    ))
                                                                }
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            {cargoGoods.map((data,index) =>
                                                            <Card className="no-transition" style={{border:'1px solid silver'}} key={index}>
                                                                <CardHeader className="pt-1 pb-1">
                                                                    <Label className="mt-2" style={{fontWeight:'bold',fontSize:'15px',color:'#696969'}}>{index+1}. Goods</Label>
                                                                </CardHeader>
                                                                <CardBody className="pt-3 pb-3">
                                                                    <Row className="mb-1"><Col>{renderLabel("goods_desc1"+"_"+index.toString(), data.goods_desc1, data.t_goods_desc1)}</Col></Row>
                                                                    <Row className="mb-1"><Col>{renderLabel("goods_desc2"+"_"+index.toString(), data.goods_desc2, data.t_goods_desc2)}</Col></Row>
                                                                    <Row className="mb-1"><Col>{renderLabel("goods_desc3"+"_"+index.toString(), data.goods_desc3, data.t_goods_desc3)}</Col></Row>
                                                                    <Row className="mb-1"><Col>{renderLabel("goods_desc4"+"_"+index.toString(), data.goods_desc4, data.t_goods_desc4)}</Col></Row>
                                                                    <Row className="mb-1"><Col>{renderLabel("goods_desc5"+"_"+index.toString(), data.goods_desc5, data.t_goods_desc5)}</Col></Row>
                                                                </CardBody>
                                                            </Card>
                                                            )}
                                                        </Col>
                                                    </Row>
                                                </Collapse>
                                                <div className="text-center" onClick={() => setColl(prevState => ({...prevState, cargo:!coll.cargo}))}>
                                                    <div>
                                                        <Button className="p-0" color="link" id="linemore" onClick={() => setColl(prevState => ({...prevState, cargo:!coll.cargo}))} style={{height:'21px'}}>
                                                            {coll.cargo?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
                                                        </Button>
                                                        <UncontrolledTooltip delay={0} target="linemore">{coll.cargo?'Close':'Open'}</UncontrolledTooltip>
                                                    </div>
                                                </div>
                                            </CardBody>
                                            {/* </CardHeader> */}
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                            
                            {/* CONTAINER */}
                            <Col xl="12" lg="12">
                                <Row>
                                    <Col xl="12" lg="12">
                                        <Card id="container">
                                            {/* <CardHeader className="bg-white"> */}
                                            <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>
                                                <Row className="pb-2">
                                                    <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>CONTAINER</Col>
                                                </Row>
                                                {/* 보이는 영역 */}
                                                <Collapse isOpen={coll.container}>
                                                    <hr className="mt-0"/>
                                                    <Row>
                                                        <Col xl="12" lg="12" md="12">
                                                            <FormGroup className="mb-1">
                                                                {
                                                                    cntr.map((cntr, index)=>(
                                                                        <Row key={index.toString()}>
                                                                    <Col>
                                                                    <Card className="no-transition" style={{border:'1px solid silver'}} key={index}>
                                                                        <CardHeader className="pt-1 pb-1">
                                                                            <Label className="mt-2" style={{fontWeight:'bold',fontSize:'15px',color:'#696969'}}>{index+1}. {cntr.cntr_code}</Label>
                                                                        </CardHeader>
                                                                        <CardBody className="pt-3 pb-3">
                                                                            <Row>
                                                                                <Col xl="4" lg="4" md="4">
                                                                                    <FormGroup>
                                                                                        <Label className="mb-0">Size / Type</Label>
                                                                                        <Row className="mb-1"><Col>{renderLabel("cntr_code"+"_"+index.toString(), cntr.cntr_code, cntr.t_cntr_code)}</Col></Row>
                                                                                    </FormGroup>
                                                                                </Col>
                                                                                <Col xl="4" lg="4" md="4">
                                                                                    <FormGroup>
                                                                                        <Label className="mb-0">Qty</Label>
                                                                                        <Row className="mb-1"><Col>{renderLabel("cntr_qty"+"_"+index.toString(), cntr.cntr_qty, cntr.t_cntr_qty)}</Col></Row>
                                                                                    </FormGroup>
                                                                                </Col>
                                                                                <Col xl="4" lg="4" md="4">
                                                                                    <FormGroup>
                                                                                        <Label className="mb-0">SOC</Label>
                                                                                        <Row className="mb-1"><Col>{renderLabel("cntr_soc_yn"+"_"+index.toString(), cntr.cntr_soc_yn, cntr.t_cntr_soc_yn)}</Col></Row>
                                                                                    </FormGroup>
                                                                                </Col>
                                                                                <Col xl="6" lg="6" md="6">
                                                                                    <FormGroup>
                                                                                        <Label className="mb-0">Frozen Tmp</Label>
                                                                                        <Row className="mb-1"><Col>{renderLabel("cntr_frozen_tmp"+"_"+index.toString(), cntr.cntr_frozen_tmp, cntr.t_cntr_frozen_tmp)}</Col></Row>
                                                                                    </FormGroup>
                                                                                </Col>
                                                                                { (cntr.cntr_code.indexOf('RE') >0)?
                                                                                <Col xl="6" lg="6" md="6" style={{textAlign: 'center'}}>
                                                                                    <Badge color="danger" size="large" style={{marginTop: '20px', fontSize: '12px'}}>*  냉동 CNTR 픽업지: 선광종합물류  *</Badge>
                                                                                </Col>:<></>
                                                                                }
                                                                            </Row>
                                                                            <Row>
                                                                                <Col xl="6" lg="6" md="12">
                                                                                    <FormGroup>
                                                                                        <Label className="mb-0">Pick Up CY</Label>
                                                                                        <Row className="mb-1"><Col>{renderLabel("cntr_pick_up_cy_code"+"_"+index.toString(), cntr.pickup_cy_name, cntr.t_pickup_cy_name)}</Col></Row>
                                                                                    </FormGroup>
                                                                                </Col>
                                                                                <Col xl="6" lg="6" md="12">
                                                                                    <FormGroup>
                                                                                        <Label className="mb-0">Pick Up Date</Label>
                                                                                        <Row className="mb-1"><Col>{renderLabel("cntr_pick_up_date"+"_"+index.toString(), cntr.cntr_pick_up_date, cntr.t_cntr_pick_up_date)}</Col></Row>
                                                                                    </FormGroup>
                                                                                </Col>
                                                                            </Row>
                                                                            { '3' === confirm.trans_service_code ?
                                                                            <>
                                                                                <Row>
                                                                                    <Col xl="6" lg="6" md="12">
                                                                                        <FormGroup>
                                                                                            <Label className="mb-0">CFS Name</Label>
                                                                                            <Row className="mb-1"><Col>{renderLabel("cntr_cfs_name1"+"_"+index.toString(), cntr.cntr_cfs_name1, cntr.t_cntr_cfs_name1)}</Col></Row>
                                                                                        </FormGroup>
                                                                                    </Col>
                                                                                    <Col xl="6" lg="6" md="12">
                                                                                        <FormGroup>
                                                                                            <Label className="mb-0"></Label>
                                                                                            <Row className="mb-1"><Col>{renderLabel("cntr_cfs_name2"+"_"+index.toString(), cntr.cntr_cfs_name2, cntr.t_cntr_cfs_name2)}</Col></Row>
                                                                                        </FormGroup>
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row>
                                                                                    <Col xl="12" lg="12" md="12">
                                                                                        <FormGroup className="mb-1">
                                                                                            <Label className="mb-0">CFS Address</Label>
                                                                                            <Row className="mb-1"><Col>{renderLabel("cntr_cfs_address"+"_"+index.toString(), cntr.cntr_cfs_address1, cntr.t_cntr_cfs_address1)}</Col></Row>
                                                                                            <Row className="mb-1"><Col>{renderLabel("cntr_cfs_address"+"_"+index.toString(), cntr.cntr_cfs_address2, cntr.t_cntr_cfs_address2)}</Col></Row>
                                                                                            <Row className="mb-1"><Col>{renderLabel("cntr_cfs_address"+"_"+index.toString(), cntr.cntr_cfs_address3, cntr.t_cntr_cfs_address3)}</Col></Row>
                                                                                            <Row className="mb-1"><Col>{renderLabel("cntr_cfs_address"+"_"+index.toString(), cntr.cntr_cfs_address4, cntr.t_cntr_cfs_address4)}</Col></Row>
                                                                                            <Row className="mb-1"><Col>{renderLabel("cntr_cfs_address"+"_"+index.toString(), cntr.cntr_cfs_address5, cntr.t_cntr_cfs_address5)}</Col></Row>
                                                                                        </FormGroup>
                                                                                    </Col>
                                                                                </Row>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <Row>
                                                                                    <Col xl="6" lg="6" md="12">
                                                                                        <FormGroup>
                                                                                            <Label className="mb-0">CY Name</Label>
                                                                                            <Row className="mb-1"><Col>{renderLabel("cntr_pick_up_cy_name1"+"_"+index.toString(), cntr.cntr_pick_up_cy_name1, cntr.t_cntr_pick_up_cy_name1)}</Col></Row>
                                                                                        </FormGroup>
                                                                                    </Col>
                                                                                    <Col xl="6" lg="6" md="12">
                                                                                        <FormGroup>
                                                                                            <Label className="mb-0"></Label>
                                                                                            <Row className="mb-1"><Col>{renderLabel("cntr_pick_up_cy_name2"+"_"+index.toString(), cntr.cntr_pick_up_cy_name2, cntr.t_cntr_pick_up_cy_name2)}</Col></Row>
                                                                                        </FormGroup>
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row>
                                                                                    <Col xl="12" lg="12" md="12">
                                                                                        <FormGroup className="mb-1">
                                                                                            <Label className="mb-0">Pick Up Cy Address</Label>
                                                                                            <Row className="mb-1"><Col>{renderLabel("cntr_pick_up_cy_address1"+"_"+index.toString(), cntr.cntr_pick_up_cy_address1, cntr.t_cntr_pick_up_cy_address1)}</Col></Row>
                                                                                            <Row className="mb-1"><Col>{renderLabel("cntr_pick_up_cy_address2"+"_"+index.toString(), cntr.cntr_pick_up_cy_address2, cntr.t_cntr_pick_up_cy_address2)}</Col></Row>
                                                                                            <Row className="mb-1"><Col>{renderLabel("cntr_pick_up_cy_address3"+"_"+index.toString(), cntr.cntr_pick_up_cy_address3, cntr.t_cntr_pick_up_cy_address3)}</Col></Row>
                                                                                            <Row className="mb-1"><Col>{renderLabel("cntr_pick_up_cy_address4"+"_"+index.toString(), cntr.cntr_pick_up_cy_address4, cntr.t_cntr_pick_up_cy_address4)}</Col></Row>
                                                                                            <Row className="mb-1"><Col>{renderLabel("cntr_pick_up_cy_address5"+"_"+index.toString(), cntr.cntr_pick_up_cy_address5, cntr.t_cntr_pick_up_cy_address5)}</Col></Row>
                                                                                        </FormGroup>
                                                                                    </Col>
                                                                                </Row>
                                                                            </>
                                                                            }
                                                                            <Row>
                                                                                <Col xl="6" lg="6" md="12">
                                                                                    <FormGroup>
                                                                                        <Label className="mb-0">Drop off CY name</Label>
                                                                                        <Row className="mb-1"><Col>{renderLabel("cntr_drop_off_cy_name1"+"_"+index.toString(), cntr.cntr_drop_off_cy_name1, cntr.t_cntr_drop_off_cy_name1)}</Col></Row>
                                                                                    </FormGroup>
                                                                                </Col>
                                                                                <Col xl="6" lg="6" md="12">
                                                                                    <FormGroup>
                                                                                        <Label className="mb-0"></Label>
                                                                                        <Row className="mb-1"><Col>{renderLabel("cntr_drop_off_cy_name2"+"_"+index.toString(), cntr.cntr_drop_off_cy_name2, cntr.t_cntr_drop_off_cy_name2)}</Col></Row>
                                                                                    </FormGroup>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row>
                                                                                <Col xl="12" lg="12" md="12">
                                                                                    <FormGroup className="mb-1">
                                                                                        <Label className="mb-0">Drop off CY Address</Label>
                                                                                        <Row className="mb-1"><Col>{renderLabel("cntr_drop_off_cy_address1"+"_"+index.toString(), cntr.cntr_drop_off_cy_address1, cntr.t_cntr_drop_off_cy_address1)}</Col></Row>
                                                                                        <Row className="mb-1"><Col>{renderLabel("cntr_drop_off_cy_address2"+"_"+index.toString(), cntr.cntr_drop_off_cy_address2, cntr.t_cntr_drop_off_cy_address2)}</Col></Row>
                                                                                        <Row className="mb-1"><Col>{renderLabel("cntr_drop_off_cy_address3"+"_"+index.toString(), cntr.cntr_drop_off_cy_address3, cntr.t_cntr_drop_off_cy_address3)}</Col></Row>
                                                                                        <Row className="mb-1"><Col>{renderLabel("cntr_drop_off_cy_address4"+"_"+index.toString(), cntr.cntr_drop_off_cy_address4, cntr.t_cntr_drop_off_cy_address4)}</Col></Row>
                                                                                        <Row className="mb-1"><Col>{renderLabel("cntr_drop_off_cy_address5"+"_"+index.toString(), cntr.cntr_drop_off_cy_address5, cntr.t_cntr_drop_off_cy_address5)}</Col></Row>
                                                                                    </FormGroup>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row>
                                                                                <Col xl="12" lg="12" md="12">
                                                                                    <FormGroup className="mb-1">
                                                                                        <Label className="mb-0">Remark</Label>
                                                                                        <Row className="mb-1"><Col>{renderLabel("cntr_remark", cntr.cntr_remark, cntr.t_cntr_remark)}</Col></Row>
                                                                                    </FormGroup>
                                                                                </Col>
                                                                            </Row>
                                                                            {cntrSpecials.map((element, key)=>{
                                                                                if( cntr.cntr_seq === element.cntr_seq ) {
                                                                                    return(
                                                                                    <Row key={key}>
                                                                                        <Col xl="6" lg="6" md="6">
                                                                                            <FormGroup>
                                                                                                <Label className="mb-0">UNDG</Label>
                                                                                                <Row className="mb-1"><Col>{renderLabel("special_undg"+"_"+index.toString(), element.special_undg, element.special_undg)}</Col></Row>
                                                                                            </FormGroup>
                                                                                        </Col>
                                                                                        <Col xl="6" lg="6" md="6">
                                                                                            <FormGroup>
                                                                                                <Label className="mb-0">IMDG</Label>
                                                                                                <Row className="mb-1"><Col>{renderLabel("special_imdg"+"_"+index.toString(), element.special_imdg, element.special_imdg)}</Col></Row>
                                                                                            </FormGroup>
                                                                                        </Col>
                                                                                    </Row>
                                                                                    )
                                                                                }
                                                                            })}
                                                                        </CardBody>
                                                                    </Card>
                                                                    </Col>
                                                                    </Row>
                                                                    ))
                                                                }
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </Collapse>
                                                <div className="text-center" onClick={() => setColl(prevState => ({...prevState, container:!coll.container}))}>
                                                    <div>
                                                        <Button className="p-0" color="link" id="linemore" onClick={() => setColl(prevState => ({...prevState, container:!coll.container}))} style={{height:'21px'}}>
                                                            {coll.container?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
                                                        </Button>
                                                        <UncontrolledTooltip delay={0} target="linemore">{coll.container?'Close':'Open'}</UncontrolledTooltip>
                                                    </div>
                                                </div>
                                            </CardBody>
                                            {/* </CardHeader> */}
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                    </CardBody>
                </Container>
            </Form>
            <AlertModal 
                open={dismiss.visible}
                close={()=>setDismiss({...dismiss, 'visible':false})}
                status ={dismiss.color}
                message = {dismiss.message} />
        </div>
        <FooterWeidong />


    </>
  );
}
// );

// export default ConfirmIndex;

