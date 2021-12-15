import React, { useState, useEffect } from 'react';
import { Row, Col, Button, FormGroup, Label, Input, 
    UncontrolledTooltip, Form, Container, CardBody, Card, CardHeader,
    Collapse} from "reactstrap";
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

export default function BlIndex(props) {


    
    const [dismiss, setDismiss] = useState({color:"success", message:"정상 처리되었습니다.", visible:false});
    // const [open, setOpen] = useState(false);
    const [bl, setBl] = useState({});
    const [cargo, setCargo] = useState([]);
    //const [markList, setMarkList] = useState([]);
    //const [goodsList, setGoodsList] = useState([]);
    const [cntr, setCntr] = useState([]);
//   const [param, setParam] = useState({user_no:"M000002", mbl_no:"WDFCGBA03590270", issue_date:""});
    const [param, setParam] = useState({user_no: props.location.state && props.location.state.user_no  ?  props.location.state.user_no || '' : '',
                                        mbl_no: props.location.state && props.location.state.mbl_no  ? props.location.state.mbl_no || '' : '', 
                                        issue_date: props.location.state && props.location.state.issue_date ? props.location.state.issue_date || '' : ''});
    const [coll, setColl] = useState({others:false, schedule:false, shipper:false, carrier:false, notify:false, consignee:false, cargo:false, container:false});
    

    //document.documentElement.classList.remove("nav-open");
    // function that is being called on scroll of the page
    const checkScroll = () => {
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
    };

    useEffect(() => {
        // 메뉴 확인
        props.fncClickMenu("NAV_BL");

        document.body.classList.add("presentation-page");
        window.addEventListener("scroll", checkScroll);
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;

        if ( param.user_no.length > 0 && param.mbl_no.length > 0 ) {
            selectShpBl();
        }

        return function cleanup() {
            document.body.classList.remove("presentation-page");
            window.removeEventListener("scroll", checkScroll);
        };
    }, []);

    const selectShpBl = ( ) => {
        axios.post(
            "/shipper/selectShpBl"
            , param //,{ user_no: 'M000002', param }
            ,{}
        ).then( res => {
            if(res.data && res.data.length > 0) {
            setBl(res.data[0]);
            selectShpBlCargo(res.data[0].user_no, res.data[0].mbl_no, res.data[0].issue_date, res.data[0].line_code);
            selectShpBlCntr(res.data[0].user_no, res.data[0].mbl_no, res.data[0].issue_date);
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

    const selectShpBlCargo = ( user_no, mbl_no, issue_date, line_code ) => {
        axios.post(
            "/shipper/selectShpBlCargo"
            , { user_no, mbl_no, issue_date, line_code }
            ,{}
        ).then( res => {
            
            if(res.data && res.data.length > 0) {
            setCargo(res.data);
            //   setColl(Object.assign(...Object.keys(coll).map(k=>({[k]:true}))));


            // console.log('type=',cargo);

            } 
        }).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    const selectShpBlCntr = ( user_no, mbl_no, issue_date ) => {
        axios.post(
            "/shipper/selectShpBlCntr"
            , { user_no, mbl_no, issue_date }
            ,{}
        ).then( res => {
        //console.log('res.data', res.data);
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

    const onChange = ( event ) => {
        
        // console.log(event);

        const { target: {id, value} } = event;

        if (id === 'mbl_no') {
            setParam(prevState => ({...prevState, mbl_no:value}));
        } else if (id === 'issue_date') {
            setParam(prevState => ({...prevState, issue_date:value}));
        } else {
            setParam(prevState => ({...prevState, mbl_no:value}));
        }

        

        // console.log('value=', value);
        

        // console.log('param=', param);
    }

    const onDismiss = (color, message) => {
        setDismiss({color:color, message:message, visible:!dismiss.visible});
    }  

    const renderLabel = (id, source, target) => {
        const style = {textDecoration:"underline", color:"blue"};
        return (
        // <>
            <Label className="form-control-sm form-control mb-0"  style={source !== target ? style : {}} id={id}>{source ? source:''}</Label>
        // { source !== target &&
            //   <UncontrolledTooltip placement="top" target={id}>{target ? target:''}</UncontrolledTooltip>}
        //   </>
        );
    }
    
    const confitmShpBl = () => {
        axios.post("/shipper/confitmShpBl",{klnet_id:props.user?props.user.klnet_id:'',param:param}).then( res => {
            if(res.data.code ==="S") {
                if(res.data.data.indexOf('success') > -1 ) {
                    setBl({...bl,status_cus:'FA'});
                    props.onNotiAlert("success","BL 확정 요청 전송되었습니다.");
                } else {
                    //console.log("에러",res.data);
                    props.onNotiAlert("danger","해당 BL확정 처리에 에러가 발생하였습니다.");
                }
            }else {
                props.onNotiAlert("danger",res.data.data);
            }
        });
    }

    const fncReportViewer = ()=>{
        if( !(bl.user_no && bl.mbl_no && bl.issue_date ) ) {
            props.onNotiAlert("danger","BL 먼저 조회 하세요.");
            return false;
        }
        var obj = new Object();
        obj.user_no = bl.user_no;
        obj.mbl_no = bl.mbl_no;
        obj.issue_date = bl.issue_date;
        var json = JSON.stringify(obj);
        let form = document.reportForm;
        //form.action = '/reportView';
        form.action = '/shipper/reportViewer';
        form.target = 'popReport'; // window.open() 의 두번째 변수와 동일해야.
        form.file_id.value = 'weidong_bl';
        form.file_path.value = 'WEIDONG';
        form.name.value = 'FILENAME';
        form.connection.value = 'pgsql';
        form.parameters.value = json;
        window.open('', 'popReport', 'width=1050px, height=850px');
        form.submit();
    }

    const confitmShpBlDown =(path,name)=> {
        var filepath =  '/DATA2/BLIMAGE/'+path+'/';
        axios.post("/api/boardFIleDownLoad",{filePath:filepath,fileName:name},{responseType:'arraybuffer',headers:{'Content-Type':'application/json','Accept':'application/pdf'}}).then(res => { 
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href=url;
            link.setAttribute('download',name);
            document.body.appendChild(link);
            link.click();
        });
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
                                        <h1 className="mt-1 text-start" style={{background:"url(" + require("assets/img/bu_contitle_bar.gif") + ") no-repeat"}}>
                                            <small>BL</small>
                                        </h1>
                                    </Col>
                                </Row>
                                <Row className="mt-0">
                                    <Col className="text-right">
                                        {(param && (bl.status_cus !=='FA' && bl.status_cus !=='SF')) &&
                                        <>
                                            <Button 
                                                id="bl_confirm" 
                                                color="default" 
                                                outline 
                                                type="button" 
                                                className="mr-1"
                                                onClick={(e)=>confitmShpBl()}>BL확정</Button>
                                            <UncontrolledTooltip delay={0} target="bl_confirm">BL확정</UncontrolledTooltip>
                                        </>}
                                        {(param && bl.status_cus ==='FA'&& bl.imagebl_path && bl.imagebl_name) &&
                                        <>
                                            <Button 
                                                id="bl_confirm_dw"
                                                color="default"
                                                outline
                                                type="button"
                                                className="mr-1"
                                                onClick={(e)=>confitmShpBlDown(bl.imagebl_path,bl.imagebl_name)}>BL DownLoad</Button>
                                            <UncontrolledTooltip delay={0} target="bl_confirm_dw">BL DownLoad</UncontrolledTooltip>
                                        </>}
                                            <Button id="bl_report" color="default" outline type="button" className="mr-1" onClick={(e)=>fncReportViewer()}>CHECK BL</Button>
                                            <UncontrolledTooltip delay={0} target="bl_report">CHECK BL</UncontrolledTooltip>
                                            <Button id="bkg_search" color="default" outline type="button" className="mr-1" onClick={(e)=>selectShpBl()}>SEARCH</Button>
                                            <UncontrolledTooltip delay={0} target="bkg_search">Search</UncontrolledTooltip>
                                    </Col>
                                </Row>
                                <hr className="mt-2"/>
                                <Row>
                                    {/* Title */}
                                    <Col xl="12" lg="12" className="pl-4 pr-4 pb-3">
                                        <Row>
                                            <Col xl="3" lg="3" md="12">
                                                <FormGroup>
                                                    <Label className="mb-0">Master BL Number</Label>
                                                    <Input type="text" name="mbl_no" id="mbl_no"
                                                        maxLength="15"
                                                        defaultValue={param.mbl_no}
                                                        onChange={onChange}
                                                        // onChange={(event)=>{this.onChange(this.event)}}
                                                        // onChange={(e)=>fncOnChange(e, 'bkg_no')}
                                                        // onBlur={(e)=>fncOnBlurBooking(e)}
                                                        // onKeyPress={(e)=>fncOnKeyPressBkgNo(e)}
                                                    />
                                                </FormGroup>
                                            </Col>  
                                            <Col xl="3" lg="3" md="12">
                                                <FormGroup>
                                                    <Label className="mb-0">Issue Date</Label>
                                                    <Input type="text" name="issue_date" id="issue_date"
                                                        maxLength="15"
                                                        defaultValue={param.issue_date}
                                                        onChange={onChange}
                                                        // onChange={(event)=>{this.onChange(this.event)}}
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
                                                            switch(bl.status_cus) {
                                                                case 'RA': return '승인';
                                                                case 'EJ': return '거절';
                                                                case 'EC': return '취소승인';
                                                                case 'EA': return '승인취소';
                                                                case 'FA': return '확정';
                                                                case 'SF': return '확정요청';
                                                                default: return ''; break;
                                                            }
                                                            }).call(this)
                                                        }/>
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
                                                            }}>
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
                                                            }}>
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
                                                            }}>
                                                            <span className="cd-dot bg-secondary" />
                                                            <span className="cd-label">Other</span>
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
                                                            }}>
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
                                                            }}>
                                                            <span className="cd-dot bg-secondary"/>
                                                            <span className="cd-label">Shipper</span>
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
                                                            }}>
                                                            <span className="cd-dot bg-secondary" />
                                                            <span className="cd-label">Carrier</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#!"
                                                            data-number="6"
                                                            //href="#projects"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setColl({...coll, 'notify':true});
                                                                document.getElementById("notify").scrollIntoView({
                                                                behavior: "smooth",
                                                                block: "start",
                                                                inline: "nearest",
                                                                });
                                                            }}>
                                                            <span className="cd-dot bg-secondary" />
                                                            <span className="cd-label">Notify</span>
                                                        </a>
                                                    </li>
                                                    <li>
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
                                                            }}>
                                                            <span className="cd-dot bg-secondary" />
                                                            <span className="cd-label">Consignee</span>
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
                                                            }}>
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
                                                            }}>
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
                                                <Card id="others" style={{border:'1px solid silver',borderRadius:'10px'}}>
                                                    <CardBody className="pt-3 pb-0" >
                                                        <Row className="pb-4">
                                                            <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>OTHER</Col>
                                                        </Row>
                                                        {/* 보이는 영역 */}
                                                        <Collapse isOpen={coll.others}>
                                                            <hr className="mt-0"/>
                                                            <Row>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">Issue Date</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                <Label className="form-control-sm form-control mb-0">{bl.issue_date?bl.issue_date:''}</Label>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">Currency</Label></Col>
                                                                            <Col>
                                                                                <Label className="form-control-sm form-control mb-0">{bl.currency_code?bl.currency_code:''}</Label>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">Exchange Rate</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                <Label className="form-control-sm form-control mb-0">{bl.exchange_rate?bl.exchange_rate:''}</Label>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">Incoterms</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                <Label className="form-control-sm form-control mb-0">{bl.incoterms_code?bl.incoterms_code:''}</Label>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">SR No</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                <Label className="form-control-sm form-control mb-0">{bl.sr_no?bl.sr_no:''}</Label>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">Service</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                {renderLabel("trans_service_name", bl.trans_service_name, bl.t_trans_service_name)}
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">MRN</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                <Label className="form-control-sm form-control mb-0">{bl.mrn?bl.mrn:''}</Label>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">Ocean Freight</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                <Label className="form-control-sm form-control mb-0">{bl.line_payment_type_name?bl.line_payment_type_name:''}</Label>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">BL Issue Loc Code</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                <Label className="form-control-sm form-control mb-0">{bl.bl_issue_code?bl.bl_issue_code:''}</Label>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">BL Issue Loc Name</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                <Label className="form-control-sm form-control mb-0">{bl.bl_issue_name?bl.bl_issue_name:''}</Label>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">Qty of Original BL</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                <Label className="form-control-sm form-control mb-0">{bl.org_issue_bl_qty?bl.org_issue_bl_qty:''}</Label>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                        </Collapse>
                                                    </CardBody>
                                                    <div className="text-center" onClick={() => setColl(prevState => ({...prevState, others:!coll.others}))}>
                                                        <div>
                                                            <Button className="p-0" color="link" id="othermore" onClick={() => setColl(prevState => ({...prevState, others:!coll.others}))} style={{height:'21px',marginBottom:'4px',width:'100%'}}>
                                                                {coll.others?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
                                                            </Button>
                                                            <UncontrolledTooltip delay={0} target="othermore">{coll.others?'Close':'Open'}</UncontrolledTooltip>
                                                        </div>
                                                    </div>
                                                    {/* </CardHeader> */}
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Col>
                                    {/* SCHEDULE */}
                                    <Col xl="6" lg="6">
                                        <Row>
                                            <Col xl="12" lg="12">
                                                <Card id="schedule" style={{border:'1px solid silver',borderRadius:'10px'}}>
                                                    {/* <CardHeader className="bg-white"> */}
                                                    <CardBody className="pt-3 pb-0" >
                                                        <Row className="pb-4">
                                                            <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>SCHEDULE</Col>
                                                        </Row>
                                                        <Collapse isOpen={coll.schedule}>
                                                            <hr className="mt-0"/>
                                                            <Row>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">Vessel</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                {renderLabel("sch_vessel_name", bl.sch_vessel_name, bl.t_sch_vessel_name)}
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">Voyage</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                {renderLabel("sch_vessel_name", bl.sch_vessel_voyage, bl.t_sch_vessel_voyage)}
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">POL</Label>
                                                                            </Col>
                                                                            <Col xs="3" xl="3" lg="3" md="3" sm="3" className="pr-1">
                                                                                {renderLabel("sch_pol", bl.sch_pol, bl.t_sch_pol)}
                                                                            </Col>
                                                                            <Col xs="7" xl="7" lg="7" md="7" sm="7" className="pl-1">
                                                                                {renderLabel("sch_pol_name", bl.sch_pol_name, bl.t_sch_pol_name)}
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">POD</Label>
                                                                            </Col>
                                                                            <Col xs="3" xl="3" lg="3" md="3" sm="3" className="pr-1">
                                                                                {renderLabel("sch_pod", bl.sch_pod, bl.t_sch_pod)}
                                                                            </Col>
                                                                            <Col xs="7" xl="7" lg="7" md="7" sm="7" className="pl-1">
                                                                                {renderLabel("sch_pod_name", bl.sch_pod_name, bl.t_sch_pod_name)}
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">POR</Label>
                                                                            </Col>
                                                                            <Col xs="3" xl="3" lg="3" md="3" sm="3" className="pr-1">
                                                                                {renderLabel("sch_por", bl.sch_por, bl.t_sch_por)}
                                                                            </Col>
                                                                            <Col xs="7" xl="7" lg="7" md="7" sm="7" className="pl-1">
                                                                                {renderLabel("sch_por_name", bl.sch_por_name, bl.t_sch_por_name)}
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">PLD</Label>
                                                                            </Col>
                                                                            <Col xs="3" xl="3" lg="3" md="3" sm="3" className="pr-1">
                                                                                {renderLabel("sch_pld", bl.sch_pld, bl.t_sch_pld)}
                                                                            </Col>
                                                                            <Col xs="7" xl="7" lg="7" md="7" sm="7" className="pl-1">
                                                                                {renderLabel("sch_pld_name", bl.sch_pld_name, bl.t_sch_pld_name)}
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">FDP</Label>
                                                                            </Col>
                                                                            <Col xs="3" xl="3" lg="3" md="3" sm="3" className="pr-1">
                                                                                {renderLabel("sch_fdp", bl.sch_fdp, bl.t_sch_fdp)}
                                                                            </Col>
                                                                            <Col xs="7" xl="7" lg="7" md="7" sm="7" className="pl-1">
                                                                                {renderLabel("sch_fdp_name", bl.sch_fdp_name, bl.t_sch_fdp_name)}
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">On Board Date</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                <Label className="form-control-sm form-control mb-0">{bl.sch_obd}</Label>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">ETD</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                <Label className="form-control-sm form-control mb-0">{bl.sch_etd}</Label>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>                                                  
                                                            </Row>
                                                        </Collapse>
                                                    </CardBody>
                                                    <div className="text-center" onClick={() => setColl(prevState => ({...prevState, schedule:!coll.schedule}))}>
                                                        <div>
                                                            <Button className="p-0" color="link" id="schmore" onClick={() => setColl(prevState => ({...prevState, schedule:!coll.schedule}))} style={{height:'21px',marginBottom:'4px',width:'100%'}}>
                                                                {coll.schedule?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
                                                            </Button>
                                                            <UncontrolledTooltip delay={0} target="schmore">{coll.schedule?'Close':'Open'}</UncontrolledTooltip>
                                                        </div>
                                                    </div>
                                                    {/* </CardHeader> */}
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Col>

                                    {/* SHIPPER */}
                                    <Col xl="6" lg="6">
                                        <Row>
                                            <Col xl="12" lg="12">
                                                <Card id="shipper" style={{border:'1px solid silver',borderRadius:'10px'}}>
                                                    {/* <CardHeader className="bg-white"> */}
                                                    <CardBody className="pt-3 pb-0" >
                                                        <Row className="pb-4">
                                                            <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>SHIPPER</Col>
                                                        </Row>
                                                        {/* 보이는 영역 */}
                                                        <Collapse isOpen={coll.shipper}>
                                                            <hr className="mt-0"/>
                                                            <Row>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">Name</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                <Row className="mb-1">
                                                                                    <Col>{renderLabel("shp_name1", bl.shp_name1, bl.t_shp_name1)}</Col>
                                                                                </Row>
                                                                                <Row className="mb-1">
                                                                                    <Col>{renderLabel("shp_name2", bl.shp_name2, bl.t_shp_name2)}</Col>
                                                                                </Row>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">Code</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                <Label className="form-control-sm form-control mb-0">{bl.shp_code?bl.shp_code:''}</Label>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">Address</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("shp_address1", bl.shp_address1, bl.t_shp_address1)}
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("shp_address2", bl.shp_address2, bl.t_shp_address2)}
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("shp_address3", bl.shp_address3, bl.t_shp_address3)}
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("shp_address4", bl.shp_address4, bl.t_shp_address4)}
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("shp_address5", bl.shp_address5, bl.t_shp_address5)}
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                        </Collapse>
                                                    </CardBody>
                                                    <div className="text-center" onClick={() => setColl(prevState => ({...prevState, shipper:!coll.shipper}))}>
                                                        <div>
                                                            <Button className="p-0" color="link" id="shipmore" onClick={() => setColl(prevState => ({...prevState, shipper:!coll.shipper}))} style={{height:'21px',marginBottom:'4px',width:'100%'}}>
                                                                {coll.shipper?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
                                                            </Button>
                                                            <UncontrolledTooltip delay={0} target="shipmore">{coll.shipper?'Close':'Open'}</UncontrolledTooltip>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Col>
                                    {/* CARRIER */}
                                    <Col xl="6" lg="6">
                                        <Row>
                                            <Col xl="12" lg="12">
                                                <Card id="carrier" style={{border:'1px solid silver',borderRadius:'10px'}}>
                                                    {/* <CardHeader className="bg-white"> */}
                                                    <CardBody className="pt-3 pb-0" >
                                                        <Row className="pb-4">
                                                            <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>CARRIER</Col>
                                                        </Row>
                                                        {/* 보이는 영역 */}
                                                        <Collapse isOpen={coll.carrier}>
                                                            <hr className="mt-0"/>
                                                            <Row>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">Name</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("line_name1", bl.line_name1, bl.t_line_name1)}
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("line_name2", bl.line_name2, bl.t_line_name2)}
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">Code</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                {renderLabel("line_code", bl.line_code, bl.t_line_code)}
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">Dept</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                {renderLabel("line_user_dept", bl.line_user_dept, bl.t_line_user_dept)}
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">Person</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                {renderLabel("line_user_name", bl.line_user_name, bl.t_line_user_name)}
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">Address</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("line_address1", bl.line_address1, bl.t_line_address1)}
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("line_address2", bl.line_address2, bl.t_line_address2)}
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("line_address3", bl.line_address3, bl.t_line_address3)}
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("line_address4", bl.line_address4, bl.t_line_address4)}
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("line_address5", bl.line_address5, bl.t_line_address5)}
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                        </Collapse>
                                                    </CardBody>
                                                    <div className="text-center" onClick={() => setColl(prevState => ({...prevState, carrier:!coll.carrier}))}>
                                                        <div>
                                                            <Button className="p-0" color="link" id="carriermore" onClick={() => setColl(prevState => ({...prevState, carrier:!coll.carrier}))} style={{height:'21px',marginBottom:'4px',width:'100%'}}>
                                                                {coll.carrier?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
                                                            </Button>
                                                            <UncontrolledTooltip delay={0} target="carriermore">{coll.carrier?'Close':'Open'}</UncontrolledTooltip>
                                                        </div>
                                                    </div>
                                                
                                                    {/* </CardHeader> */}
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Col>

                                    {/* NOTIFY */}
                                    <Col xl="6" lg="6">
                                        <Row>
                                            <Col xl="12" lg="12">
                                                <Card id="notify" style={{border:'1px solid silver',borderRadius:'10px'}}>
                                                    {/* <CardHeader className="bg-white"> */}
                                                    <CardBody className="pt-3 pb-0" >
                                                        <Row className="pb-4">
                                                            <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>NOTIFY</Col>
                                                        </Row>
                                                        {/* 보이는 영역 */}
                                                        <Collapse isOpen={coll.notify}>
                                                            <hr className="mt-0"/>
                                                            <Row>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">Name</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("noti1_name1", bl.noti1_name1, bl.t_noti_name1)}
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("noti1_name2", bl.noti1_name2, bl.t_noti_name2)}
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">Code</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                {renderLabel("noti1_code", bl.noti1_code, bl.t_noti_code)}
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">Address</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("noti1_address1", bl.noti1_address1, bl.t_noti_address1)}
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("noti1_address2", bl.noti1_address2, bl.t_noti_address2)}
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("noti1_address3", bl.noti1_address3, bl.t_noti_address3)}
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("noti1_address4", bl.noti1_address4, bl.t_noti_address4)}
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("noti1_address5", bl.noti1_address5, bl.t_noti_address5)}
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                        </Collapse>
                                                    </CardBody>
                                                    <div className="text-center" onClick={() => setColl(prevState => ({...prevState, notify:!coll.notify}))}>
                                                        <div>
                                                            <Button className="p-0" color="link" id="notimore" onClick={() => setColl(prevState => ({...prevState, notify:!coll.notify}))} style={{height:'21px',marginBottom:'4px',width:'100%'}}>
                                                                {coll.notify?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
                                                            </Button>
                                                            <UncontrolledTooltip delay={0} target="notimore">{coll.notify?'Close':'Open'}</UncontrolledTooltip>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Col>
                                    {/* CONSIGNEE */}
                                    <Col xl="6" lg="6">
                                        <Row>
                                            <Col xl="12" lg="12">
                                                <Card id="consignee" style={{border:'1px solid silver',borderRadius:'10px'}}>
                                                    {/* <CardHeader className="bg-white"> */}
                                                    <CardBody className="pt-3 pb-0" >
                                                        <Row className="pb-4">
                                                            <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>CONSIGNEE</Col>
                                                        </Row>
                                                        {/* 보이는 영역 */}
                                                        <Collapse isOpen={coll.consignee}>
                                                            <hr className="mt-0"/>
                                                            <Row>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">Name</Label></Col>
                                                                            <Col>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("cons_name1", bl.cons_name1, bl.t_cons_name1)}
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("cons_name2", bl.cons_name2, bl.t_cons_name2)}
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                        <Row>
                                                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="pr-0 pt-1">
                                                                                <Label className="mb-0">Address</Label>
                                                                            </Col>
                                                                            <Col>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("cons_address1", bl.cons_address1, bl.t_cons_address1)}
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("cons_address2", bl.cons_address2, bl.t_cons_address2)}
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("cons_address3", bl.cons_address3, bl.t_cons_address3)}
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("cons_address4", bl.cons_address4, bl.t_cons_address4)}
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className="mb-1">
                                                                                    <Col>
                                                                                        {renderLabel("cons_address5", bl.cons_address5, bl.t_cons_address5)}
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                        </Collapse>
                                                    </CardBody>
                                                    <div className="text-center" onClick={() => setColl(prevState => ({...prevState, consignee:!coll.consignee}))}>
                                                        <div>
                                                            <Button className="p-0" color="link" id="consmore" onClick={() => setColl(prevState => ({...prevState, consignee:!coll.consignee}))} style={{height:'21px',marginBottom:'4px',width:'100%'}}>
                                                                {coll.consignee?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
                                                            </Button>
                                                            <UncontrolledTooltip delay={0} target="consmore">{coll.consignee?'Close':'Open'}</UncontrolledTooltip>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Col>
                                    {/* CARGO */}
                                    <Col xl="12" lg="12" id="cargo">
                                        <Row>
                                            <Col xl="12" lg="12">
                                                <Card style={{border:'1px solid silver',borderRadius:'10px'}}>
                                                    {/* <CardHeader className="bg-white"> */}
                                                    <CardBody className="pt-3 pb-0" >
                                                        <Row className="pb-4">
                                                            <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>CARGO</Col>
                                                        </Row>
                                                        {/* 보이는 영역 */}
                                                        <Collapse isOpen={coll.cargo}>
                                                            <hr className="mt-0"/>
                                                            <Row>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                    {cargo.map((data, index)=>(
                                                                        <Row key={index.toString()}>
                                                                            <Col xl="3" lg="12" md="12">
                                                                                <FormGroup className="mb-1">
                                                                                    <Row>
                                                                                        <Col xl="4" className="pr-0 pt-1 col-3">
                                                                                            <Label className="mb-0">Pkg Qty</Label>
                                                                                        </Col>
                                                                                        <Col>
                                                                                            <Row className="mb-1">
                                                                                                <Col>
                                                                                                    {renderLabel("cargo_pack_qty"+"_"+index.toString(), data.cargo_pack_qty, data.t_cargo_pack_qty)}
                                                                                                </Col>
                                                                                            </Row>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </FormGroup>
                                                                            </Col>
                                                                            <Col xl="3" lg="12" md="12">
                                                                                <FormGroup>
                                                                                    <Row>
                                                                                        <Col xl="4" className="pr-0 pt-1 col-3">
                                                                                            <Label className="mb-0">Pkg Type</Label>
                                                                                        </Col>
                                                                                        <Col>
                                                                                            <Row className="mb-1">
                                                                                                <Col>
                                                                                                    {renderLabel("cargo_pack_type_name"+"_"+index.toString(), data.cargo_pack_type_name, data.t_cargo_pack_type_name)}
                                                                                                </Col>
                                                                                            </Row>
                                                                                        </Col>
                                                                                        {/* <Col>
                                                                                            <Row>
                                                                                                <Col className="col-8 pr-1">
                                                                                                    <Input type="input" bsSize="sm" className="pt-0 pb-0" value={data.cargo_pack_type?data.cargo_pack_type:''}>
                                                                                                    </Input>
                                                                                                </Col>
                                                                                                <Col className="col-4 pl-1">
                                                                                                    <Input type="number" bsSize="sm" name="cargo_pack_qty" id="cargo_pack_qty" placeholder="" value={data.cargo_pack_qty?data.cargo_pack_qty:''}
                                                                                                    maxLength="8"
                                                                                                        />
                                                                                                </Col>
                                                                                            </Row>
                                                                                        </Col> */}
                                                                                    </Row>
                                                                                </FormGroup>
                                                                            </Col>
                                                                            <Col xl="6" lg="12" md="12">
                                                                                <Row>
                                                                                    <Col xl="6" className="col-12">
                                                                                        <FormGroup className="mb-1">
                                                                                            <Row>
                                                                                                <Col xl="5" className="pr-0 pt-1 col-3">
                                                                                                    <Label className="mb-0">Total weight</Label>
                                                                                                </Col>
                                                                                                <Col>
                                                                                                    <Row className="mb-1">
                                                                                                        <Col>
                                                                                                            {renderLabel("cargo_total_weight"+"_"+index.toString(), data.cargo_total_weight, data.t_cargo_total_weight)}
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                </Col>
                                                                                            </Row>
                                                                                        </FormGroup>
                                                                                    </Col>
                                                                                    <Col xl="6" className="col-12">
                                                                                        <FormGroup className="mb-1">
                                                                                            <Row>
                                                                                                <Col xl="5" className="pr-0 pt-1 col-3">
                                                                                                    <Label className="mb-0">Total Volume</Label>
                                                                                                </Col>
                                                                                                <Col>
                                                                                                    <Row className="mb-1">
                                                                                                        <Col>
                                                                                                            {renderLabel("cargo_total_volume"+"_"+index.toString(), data.cargo_total_volume, data.t_cargo_total_volume)}
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                </Col>
                                                                                            </Row>
                                                                                        </FormGroup>
                                                                                    </Col>
                                                                                </Row>  
                                                                            </Col>  
                                                                            <hr className="mt-0" />
                                                                            <Col xl="6">
                                                                                <Row>
                                                                                    <Col>
                                                                                    {(data.mark.length > 0) &&
                                                                                        data.mark.map((element,key)=>
                                                                                            <Card className="no-transition mb-2" style={{border:'1px solid silver'}} key={key}>
                                                                                                <CardHeader className="pt-1 pb-1">
                                                                                                    <Row>
                                                                                                        <Col className="col-6">
                                                                                                            <Label className="mt-2" style={{fontWeight:'bold',fontSize:'15px',color:'#696969'}}>{key+1}. Mark & No</Label>
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                </CardHeader>
                                                                                                <CardBody className="pt-2 pb-3">
                                                                                                    <Row className="mb-1">
                                                                                                        <Col>
                                                                                                            {renderLabel("cargo_total_weight"+"_"+index.toString(), element.mark_desc1, element.t_mark_desc1)}
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                    <Row className="mb-1">
                                                                                                        <Col>
                                                                                                            {renderLabel("cargo_total_weight"+"_"+index.toString(), element.mark_desc2, element.t_mark_desc2)}
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                    <Row className="mb-1">
                                                                                                        <Col>
                                                                                                            {renderLabel("cargo_total_weight"+"_"+index.toString(), element.mark_desc3, element.t_mark_desc3)}
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                    <Row className="mb-1">
                                                                                                        <Col>
                                                                                                            {renderLabel("cargo_total_weight"+"_"+index.toString(), element.mark_desc4, element.t_mark_desc4)}
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                    <Row className="mb-1">
                                                                                                        <Col>
                                                                                                            {renderLabel("cargo_total_weight"+"_"+index.toString(), element.mark_desc5, element.t_mark_desc5)}
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                    <Row className="mb-1">
                                                                                                        <Col>
                                                                                                            {renderLabel("cargo_total_weight"+"_"+index.toString(), element.mark_desc6, element.t_mark_desc6)}
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                    <Row className="mb-1">
                                                                                                        <Col>
                                                                                                            {renderLabel("cargo_total_weight"+"_"+index.toString(), element.mark_desc7, element.t_mark_desc7)}
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                    <Row className="mb-1">
                                                                                                        <Col>
                                                                                                            {renderLabel("cargo_total_weight"+"_"+index.toString(), element.mark_desc8, element.t_mark_desc8)}
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                    <Row className="mb-1">
                                                                                                        <Col>
                                                                                                            {renderLabel("cargo_total_weight"+"_"+index.toString(), element.mark_desc9, element.t_mark_desc9)}
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                    <Row className="mb-1">
                                                                                                        <Col>
                                                                                                            {renderLabel("cargo_total_weight"+"_"+index.toString(), element.mark_desc10, element.t_mark_desc10)}
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                </CardBody>
                                                                                            </Card>
                                                                                        )}
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                            <Col xl="6">
                                                                                <Row>
                                                                                    <Col>
                                                                                    {(data.goods.length > 0) &&
                                                                                        data.goods.map((element,key)=>
                                                                                            <Card className="no-transition mb-2" style={{border:'1px solid silver'}} key={key}>
                                                                                                <CardHeader className="pt-1 pb-1">
                                                                                                    <Row>
                                                                                                        <Col className="col-6">
                                                                                                            <Label className="mt-2" style={{fontWeight:'bold',fontSize:'15px',color:'#696969'}}>{key+1}. Cargo Description</Label>
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                </CardHeader>
                                                                                                <CardBody className="pt-2 pb-3">
                                                                                                    <Row className="mb-1">
                                                                                                        <Col>
                                                                                                            {renderLabel("cargo_total_weight"+"_"+index.toString(), element.goods_desc1, element.t_goods_desc1)}
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                    <Row className="mb-1">
                                                                                                        <Col>
                                                                                                            {renderLabel("cargo_total_weight"+"_"+index.toString(), element.goods_desc2, element.t_goods_desc2)}
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                    <Row className="mb-1">
                                                                                                        <Col>
                                                                                                            {renderLabel("cargo_total_weight"+"_"+index.toString(), element.goods_desc3, element.t_goods_desc3)}
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                    <Row className="mb-1">
                                                                                                        <Col>
                                                                                                            {renderLabel("cargo_total_weight"+"_"+index.toString(), element.goods_desc4, element.t_goods_desc4)}
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                    <Row className="mb-1">
                                                                                                        <Col>
                                                                                                            {renderLabel("cargo_total_weight"+"_"+index.toString(), element.goods_desc5, element.t_goods_desc5)}
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                </CardBody>
                                                                                            </Card>
                                                                                        )}
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                        </Row>
                                                                    ))}
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                        </Collapse>    
                                                    </CardBody>
                                                    <div className="text-center" onClick={() => setColl(prevState => ({...prevState, cargo:!coll.cargo}))}>
                                                        <div>
                                                            <Button className="p-0" color="link" id="cargomore" onClick={() => setColl(prevState => ({...prevState, cargo:!coll.cargo}))} style={{height:'21px',marginBottom:'4px',width:'100%'}}>
                                                                {coll.cargo?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
                                                            </Button>
                                                            <UncontrolledTooltip delay={0} target="cargomore">{coll.cargo?'Close':'Open'}</UncontrolledTooltip>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Col>
                                    {/* CONTAINER */}
                                    <Col xl="12" lg="12" id="container">
                                        <Row>
                                            <Col xl="12" lg="12">
                                                <Card style={{border:'1px solid silver',borderRadius:'10px'}}>
                                                    {/* <CardHeader className="bg-white"> */}
                                                    <CardBody className="pt-3 pb-0" >
                                                        <Row className="pb-4">
                                                            <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>CONTAINER</Col>
                                                        </Row>
                                                        {/* 보이는 영역 */}
                                                        <Collapse isOpen={coll.container}>
                                                            <hr className="mt-0"/>
                                                            <Row>
                                                                <Col xl="12" lg="12" md="12">
                                                                    <FormGroup className="mb-1">
                                                                    {cntr.map((cntr, index)=>(
                                                                        <Row key={index.toString()}>
                                                                            <Col>
                                                                                <Card className="no-transition" style={{border:'1px solid silver'}}> 
                                                                                    <CardHeader className="pt-1 pb-1">
                                                                                        <Row>
                                                                                            <Col className="col-6">
                                                                                                <Label className="mt-2" style={{fontWeight:'bold',fontSize:'15px',color:'#696969'}}>{cntr.cntr_no}</Label>
                                                                                            </Col>
                                                                                        </Row>
                                                                                    </CardHeader>
                                                                                    <CardBody className="pt-1 pb-1">
                                                                                        <Row>
                                                                                            <Col xl="2" lg="2" className="col-12">
                                                                                                <FormGroup className="mb-1">
                                                                                                    <Label className="mb-0">Cntr No</Label>
                                                                                                    <Row className="mb-1">
                                                                                                        <Col>
                                                                                                            {renderLabel("cntr_no"+"_"+index.toString(), cntr.cntr_no, cntr.t_cntr_no)}
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                </FormGroup>	
                                                                                            </Col>
                                                                                            <Col xl="3" lg="3" md="12">
                                                                                                <Row>
                                                                                                    <Col xl="7" lg="7" md="7" className="col-7 pr-1">
                                                                                                        <FormGroup  className="mb-1">
                                                                                                            <Label className="mb-0">Size/Type</Label>
                                                                                                            <Row className="mb-1">
                                                                                                                <Col>
                                                                                                                    {renderLabel("cntr_code"+"_"+index.toString(), cntr.cntr_code, cntr.t_cntr_code)}
                                                                                                                </Col>
                                                                                                            </Row>
                                                                                                        </FormGroup>	
                                                                                                    </Col>
                                                                                                    <Col xl="5" lg="5" md="5" className="col-5 pl-1">
                                                                                                        <FormGroup  className="mb-1">
                                                                                                            <Label className="mb-0">Cntr Own</Label>
                                                                                                            <Row className="mb-1">
                                                                                                                <Col>
                                                                                                                    {renderLabel("cntr_hands"+"_"+index.toString(), cntr.cntr_hands, cntr.t_cntr_hands)}
                                                                                                                </Col>
                                                                                                            </Row>
                                                                                                        </FormGroup>
                                                                                                    </Col>
                                                                                                </Row>	
                                                                                            </Col>
                                                                                            <Col xl="7" lg="7" md="12">
                                                                                                <Row>
                                                                                                    <Col xl="4" lg="4" md="4" className="col-4 pr-1">
                                                                                                        <FormGroup  className="mb-1">
                                                                                                            <Label className="mb-0">Consolidated</Label>
                                                                                                            <Row className="mb-1">
                                                                                                                <Col>
                                                                                                                    {renderLabel("cntr_consolidated_yn"+"_"+index.toString(), cntr.cntr_consolidated_yn, cntr.t_cntr_consolidated_yn)}
                                                                                                                </Col>
                                                                                                            </Row>
                                                                                                        </FormGroup>
                                                                                                    </Col>
                                                                                                    <Col xl="4" lg="4" md="4" className="col-4 pl-1">
                                                                                                        <FormGroup  className="mb-1">
                                                                                                            <Label className="mb-0">Total Weight</Label>
                                                                                                            <Row className="mb-1">
                                                                                                                <Col>
                                                                                                                    {renderLabel("cntr_total_weight"+"_"+index.toString(), cntr.cntr_total_weight, cntr.t_cntr_total_weight)}
                                                                                                                </Col>
                                                                                                            </Row>
                                                                                                        </FormGroup>
                                                                                                    </Col>
                                                                                                    <Col xl="4" lg="4" md="4" className="col-4 pl-1">
                                                                                                        <FormGroup  className="mb-1">
                                                                                                            <Label className="mb-0">Total Volume</Label>
                                                                                                            <Row className="mb-1">
                                                                                                                <Col>
                                                                                                                    {renderLabel("t_cntr_total_volume"+"_"+index.toString(), cntr.t_cntr_total_volume, cntr.t_cntr_total_volume)}
                                                                                                                </Col>
                                                                                                            </Row>
                                                                                                        </FormGroup>
                                                                                                    </Col>
                                                                                                </Row>	
                                                                                            </Col>
                                                                                            <Col xl="12" lg="12" md="12">
                                                                                                <Row>
                                                                                                    <Col xl="4" lg="4" md="4" className="col-4 pr-1">
                                                                                                        <FormGroup  className="mb-1">
                                                                                                            <Label className="mb-0">Seal No</Label>
                                                                                                            <Row className="mb-1">
                                                                                                                <Col>
                                                                                                                    {renderLabel("cntr_seal1"+"_"+index.toString(), cntr.cntr_seal1, cntr.t_cntr_seal)}
                                                                                                                </Col>
                                                                                                            </Row>
                                                                                                        </FormGroup>
                                                                                                    </Col>
                                                                                                    <Col xl="8" lg="8" md="8" className="col-8 pl-1">
                                                                                                        <Row>
                                                                                                            <Col xl="6" lg="6" md="6" className="col-6 pr-1">
                                                                                                                <FormGroup  className="mb-1">
                                                                                                                    <Label className="mb-0"></Label>
                                                                                                                    <Row className="mb-1">
                                                                                                                        <Col>
                                                                                                                            {renderLabel("cntr_seal2"+"_"+index.toString(), cntr.cntr_seal2, cntr.t_cntr_seal2)}
                                                                                                                        </Col>
                                                                                                                    </Row>
                                                                                                                </FormGroup>	
                                                                                                            </Col>
                                                                                                            <Col xl="6" lg="6" md="6" className="col-6 pl-1">
                                                                                                                <FormGroup  className="mb-1">
                                                                                                                    <Label className="mb-0"></Label>
                                                                                                                    <Row className="mb-1">
                                                                                                                        <Col>
                                                                                                                            {renderLabel("cntr_seal3"+"_"+index.toString(), cntr.cntr_seal3, cntr.t_cntr_seal3)}
                                                                                                                        </Col>
                                                                                                                    </Row>
                                                                                                                </FormGroup>
                                                                                                            </Col>
                                                                                                        </Row>
                                                                                                    </Col>
                                                                                                </Row>	
                                                                                            </Col>
                                                                                        </Row>
                                                                                    </CardBody>
                                                                                </Card>
                                                                            </Col>
                                                                        </Row>
                                                                    ))}
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Collapse>
                                                    <div className="text-center" onClick={() => setColl(prevState => ({...prevState, container:!coll.container}))}>
                                                        <div>
                                                            <Button className="p-0" color="link" id="cntrmore" onClick={() => setColl(prevState => ({...prevState, container:!coll.container}))} style={{height:'21px',marginBottom:'4px',width:'100%'}}>
                                                                {coll.container?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
                                                            </Button>
                                                            <UncontrolledTooltip delay={0} target="cntrmore">{coll.container?'Close':'Open'}</UncontrolledTooltip>
                                                        </div>
                                                    </div>
                                                    </CardBody>
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
                <form id="reportForm" name="reportForm" >
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
        <FooterWeidong />
    </>
    );
}

