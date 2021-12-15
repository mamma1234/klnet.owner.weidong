import React,{useRef, useState, useEffect,PureCompoenet} from "react";
// reactstrap components
import { Row,Col,Card, Button,CardBody ,Form,
    // Progress,
    Input,
    Collapse,CardHeader,ButtonGroup,FormGroup, ListGroup,ListGroupItem, Badge, Alert, Toast, ToastHeader, CustomInput, Popover, PopoverHeader, PopoverBody} from "reactstrap";
import {CustomDatePicker} from 'components/CustomInput/CustomInput.js';
//import 'semantic-ui-css/semantic.min.css'
import 'semantic-ui-css/semantic.min.css'
import AlertMessage from "components/Alert/AlertMessage.js";
import axios from "axios"
import './dashboard.css'
import Switch from "react-bootstrap-switch";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCoffee} from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select';
const styles = {
  headerFontStyle:{
    fontSize:'15px',
    color:'#696969',
    fontWeight:'600',
    
  },
  gridTitle:{
    fontSize:'20px',
    color:'#696969',
    fontWeight:'bold'
  },
  progressText:{
    fontSize:'15px',
    color:'black',
    fontWeight:'bold',
    fontWeight:'600',
  },
  gridCard:{
    width:'100%',
    // minHeight:'100%'
  },
  gridTitleRow:{
    textAlignLast:'center',
    width:'100%'
  },
  listText:{
    fontSize:'13px',
    color:'#696969',
  }

};

export default function Dashboard (props) {
    const [rselected,setRSelected] = useState(null);
    const [cSelected, setCSelected] = useState([]);
    const [isOpen, setIsOpen] = useState(true);
    const [message,setMessage] = useState("");
    const [alertOpen,setAlertOpen] = useState(false);
    const [data,setData] = useState([]);
    const [bookingList,setBookingList]= useState([]);
    const [bkgNo, setBkgNo] = useState("");
    const element=useRef();
    const [refreshBool, setRefreshBool]= useState(false)
    const [progress,setProgress] = useState(100);
    const [timeOut,setTimeout] = useState(60000);
    const [popoverOpen,setPopoverPoen]=useState(false);
    const [searchDate,setSearchDate] = useState(false);
    const [toDate,setToDate] = useState(null)
    const [endDate,setEndDate] = useState(null)

    useEffect(()=>{
      axios.post("/api/selectDashboard",{})								
     .then(res => {
        if(res.statusText==="OK") {
          console.log("res.data >>>>>",res.data);
          setData(res.data)
        }
     });
     axios.post("/api/selectGroupbkg",{})
     .then(res => {
      if(res.statusText==="OK") {
        console.log("res.data >>>>>",res.data);
        setBookingList(res.data)
      }
   });
   },[]);


   useEffect(() => {
     if(!refreshBool)return;
       const timeout = setInterval(()=>{
        axios.post("/api/selectDashboard",{bkgList:cSelected, toDate:toDate, endDate:endDate, searchDateflag:searchDate, searchDate:rselected})								
        .then(res => {
           if(res.statusText==="OK") {
             console.log("res.data >>>>>",res.data);
             setData(res.data)
           }
        });


        // axios.post("/api/selectGroupbkg",{}).then(
        //   res => {
        //   if(res.statusText==="OK") {
        //     console.log("res.data >>>>>",res.data);
        //     const tempList = bookingList.concat(res.data);
        //     console.log(tempList)
        //     setBookingList(tempList.filter((item,pos) => tempList.indexOf((item)===pos)))
        //     console.log(bookingList)
        //   }
        // }
        // );





       },3000);
     return () => clearInterval(timeout)
   },[refreshBool,data])


   const onBkgAdd = () => {
    const index = cSelected.indexOf(bkgNo);
    if(index < 0) {
      const bkgIndex = bookingList.map((element) => {
        return element['bkg_no']
      }).indexOf(bkgNo);
      if(bkgIndex > 0 ) {
        cSelected.push(bkgNo);
      }else {
        setAlertOpen(true);
        setMessage("해당 부킹번호가 존재하지 않습니다.");
      }
    }else {
      cSelected.splice(index,1);
    }
    setCSelected([...cSelected])
    
   }
    const onCheckbox = (selected) => {
      if(selected === 0 ){
        setCSelected([])
      }else {
        const index = cSelected.indexOf(selected);
        console.log(index)
        if(index < 0) {
          cSelected.push(selected);
        }else {
          cSelected.splice(index,1);
        }
        setCSelected([...cSelected])
        console.log(cSelected);
      } 
    }
    const openFullScreen = () => {
      if(element.current) {
        if(element.current.requestFullscreen) {
          element.current.requestFullscreen();
        }else if(element.current.mozRequestFullScreen) {
          element.current.mozRequestFullScreen();
        }else if(element.current.webkitRequestFullscreen) {
          element.current.webkitRequestFullscreen();
        }else if(element.current.msRequestFullscreen) {
          element.current.msRequestFullscreen();
        }
      }
    }
    const timeSettingToggle = () => setPopoverPoen(!popoverOpen);
    const handleClose = () => {
      setAlertOpen(false);
    }

    const buttonAlertOpen = () => {
      setRefreshBool(!refreshBool);
    }

    const onChangeRange = (e) => {
      setProgress(e);
    }

    return(
      <>
        <Col className="ml-auto mr-auto mt-3" xs="11" md="11" sm="11">
          <Row>
            <Col xs="12" md="10" sm="10">
              <Collapse isOpen={isOpen}>
                <Row>
                <Col xs="12" md="4" sm="4" xl="4">
                  <Card className="no-transition">
                    <CardHeader>
                      <Row>
                        <Col xs="4" md="4" sm="4"><span style={styles.headerFontStyle}>부킹번호</span></Col>
                        <Col xs="6" md="6" sm="6"><Input size="sm" type="text" value={bkgNo} onChange={(e)=>setBkgNo(e.target.value)}></Input></Col>
                        <Col xs="2" md="2" sm="2"><Button size="sm" onClick={()=> onBkgAdd()}>ADD</Button></Col>
                      </Row>
                    </CardHeader>
                    <CardBody style={{padding:'0px'}}>
                      <div style={{maxHeight:'120px', overflow:'auto'}}>
                        <ButtonGroup style={{width:'100%'}} size="sm" vertical>
                          <Button color={cSelected.length===0?"primary":"link"} onClick={()=> {onCheckbox(0);}} style={{textAlignLast:'left'}}><i className="fa fa-angle-right"/><span style={styles.headerFontStyle}>전체</span></Button>
                            {bookingList.map((value,index) => {
                              return(
                                <Button color={cSelected.includes(value.bkg_no)?"primary":"link"} onClick={()=> onCheckbox(value.bkg_no)} style={{textAlignLast:'left'}}><i className="fa fa-angle-right"/><span style={styles.headerFontStyle}>{value.bkg_no}</span></Button>
                              )})
                            }
                        </ButtonGroup>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col xs="12" md="4" sm="4" xl="4">
                  <Card className="no-transition">
                    <CardHeader>
                      <Row>
                        <Col xs="10" md="10" sm="10"><span style={styles.headerFontStyle}>조회일자</span></Col>
                        <Col xs="2" md="2" sm="2">
                          <Button id="search1" size="sm"><i className="fa fa-calendar text-secandary"></i>
                          <Popover trigger="hover" placement="bottom" isOpen={searchDate} target="search1" toggle={()=>setSearchDate(!searchDate)} >
                            <PopoverHeader>
                                <span style={styles.headerFontStyle}>조회 날짜 지정</span>
                              </PopoverHeader>
                                <PopoverBody>
                                  <Col>
                                    <Row>
                                      <CustomDatePicker
                                          title="시작일"
                                          id="startDate"
                                          dateFormat="YYYY-MM-DD"
                                          timeFormat={false}
                                          placeholder="TEST"
                                          value={toDate}
                                          onChange={(date)=>setToDate(date)}
                                        />
                                    </Row>
                                    <Row>
                                      <CustomDatePicker
                                        id="endDate"
                                        title="종료일"
                                        dateFormat="YYYY-MM-DD"
                                        timeFormat={false}
                                        value={endDate}
                                        onChange={(date)=>setEndDate(date)}
                                      />
                                    </Row>
                                  </Col>
                                </PopoverBody>
                              </Popover>
                              </Button>
                        </Col>
                      </Row>
                    </CardHeader>
                    <CardBody style={{padding:'0px'}}>
                      <div style={{maxHeight:'120px', overflow:'auto'}}>
                        <ButtonGroup style={{width:'100%'}} size="sm" vertical>
                          <Button color={rselected==='A'?"primary":"link"} onClick={()=> setRSelected('A')}  style={{textAlignLast:'left'}}><i className="fa fa-angle-right"/><span style={styles.headerFontStyle}>전체</span></Button>
                          <Button color={rselected==='D'?"primary":"link"} onClick={()=> setRSelected('D')}  style={{textAlignLast:'left'}}><i className="fa fa-angle-right"/><span style={styles.headerFontStyle}>To Day</span></Button>
                          <Button color={rselected==='W'?"primary":"link"} onClick={()=> setRSelected('W')}  style={{textAlignLast:'left'}}><i className="fa fa-angle-right"/><span style={styles.headerFontStyle}>To Week</span></Button>
                          <Button color={rselected==='M'?"primary":"link"} onClick={()=> setRSelected('M')}  style={{textAlignLast:'left'}}><i className="fa fa-angle-right"/><span style={styles.headerFontStyle}>To Month</span></Button>
                          <Button color={rselected==='Y'?"primary":"link"} onClick={()=> setRSelected('Y')}  style={{textAlignLast:'left'}}><i className="fa fa-angle-right"/><span style={styles.headerFontStyle}>To Year</span></Button>
                        </ButtonGroup>     
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col xs="12" md="4" sm="4" xl="4" >
                  <Card className="no-transition">
                    <CardHeader style={{minHeight:'54.06px'}}><span style={styles.headerFontStyle}>진행 상태</span></CardHeader>
                    <CardBody style={{padding:'5px'}}>
                      <Row style={{maxHeight:'120px', overflow:'auto'}}>
                        <Col>
                          <i className="fa fa-floppy-o fa-4x text-primary"/>
                        </Col>
                        <Col>
                          <i className={progress>23?"fa fa-paper-plane-o fa-4x text-primary":""}/>
                        </Col>
                        <Col>
                          <i className={progress>45?"fa fa-pencil-square-o fa-4x text-primary":""}/>
                        </Col>
                        <Col>
                          <i className={progress>67?"fa fa-file-text-o fa-4x text-primary":""}/>
                        </Col>
                        <Col>
                          <i className={progress>89?"fa fa-file-o fa-4x text-primary":""}/>
                        </Col>              
                      </Row>
                      <Row>
                        <Col>
                          <Input type="range" step={20} onChange={(e) => {onChangeRange(e.target.value)}}value={progress}></Input>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                </Row>
              </Collapse>
            </Col>
            <Col xs="12" md="2" sm="2">
              <Row>
                <Button color="primary" outline onClick={()=> setIsOpen(!isOpen)}><i className={isOpen?"fa fa-angle-up fa-2x":"fa fa-angle-down fa-2x"}></i></Button>
                <Button color="primary" outline onClick={()=> openFullScreen()}><i className="fa fa-arrows-alt fa-2x"></i></Button>
                <Button color="primary" id ="timeSetting" outline><i className={refreshBool?"fa fa-refresh fa-spin fa-2x":"fa fa-refresh fa-2x"}></i>
                            <Popover trigger="hover" placement="bottom" isOpen={popoverOpen} target="timeSetting" toggle={timeSettingToggle}>
                              <PopoverHeader>
                                <span style={styles.headerFontStyle}>갱신 주기 설정</span>
                              </PopoverHeader>
                                <PopoverBody>
                                  <div className="social-line">
                                    <Row>
                                      <Col xs="5">
                                        <Input type="number" min={1} onChange={(e) => setTimeout(e.target.value * 60000)} value={timeOut/60000}max={60}></Input>
                                      </Col>
                                      <Col xs="1" style={{padding:'0px'}}><span style={styles.headerFontStyle}>분</span></Col>
                                      <Col xs="6" style={{padding:'0px'}}>
                                        <label>
                                          <Switch
                                            defaultValue={refreshBool}
                                            value={refreshBool}
                                            onChange={(e,v)=>setRefreshBool(v)}
                                            offColor="success"
                                            offText={
                                              <i className="nc-icon nc-simple-remove" />
                                            }
                                            onColor="success"
                                            onText={<i className="nc-icon nc-check-2" />}
                                          />
                                        </label>
                                      </Col>
                                    </Row>
                                  </div>
                                </PopoverBody>
                              </Popover>
                </Button>
              </Row>
            </Col>
          </Row>
          
        </Col>
        
        <Col className="ml-auto mr-auto mt-3" xs="11" md="11" sm="11">
          <div ref={element} style={{width:'100%',height:'100%',overflow:'auto', backgroundColor:'white'}}>
            
              {
                data.map((value,index) => {
                  
                  return (
                    <Row xs="12" md="12" sm="12" style={{display:progress <= value.value-1 ? "none" : ""}}>
                      <Card className="no-transition" style={styles.gridCard}>
                        <Row xs="12" md="12" sm="12">
                          <Col xs="12" md="12" sm="12">
                            <Row className="steps" style={{width:'100%'}}>
                              <div style={{maxWidth:'20%'}} className={value.status1===null?"step":"active"}>
                                <Col xs="3" md="3" sm="3">
                                    <i className="fa fa-floppy-o text-secondary fa-3x"/>
                                </Col>
                                <Col xs="9" md="9" sm="9" className="nowarp">
                                  <Row>
                                    <Badge color="primary">BKG SAVE</Badge>
                                  </Row>
                                  <Row>
                                    <Col>
                                    <Row>
                                    <span style={styles.progressText}>부킹 번호 : {value.bkg_no}</span>
                                    </Row>
                                    <Row>
                                    <span style={styles.progressText}>작성 시간 : {value.status1}</span>
                                    </Row>
                                    </Col>
                                    
                                  </Row>
                                </Col>
                              </div>
                              <div style={{maxWidth:'20%'}} className={value.status2===null?"step":"active"}>
                                <Col xs="4" md="4" sm="4">
                                    <i className="fa fa-paper-plane-o fa-3x text-secondary"/>
                                </Col>
                                <Col xs="8" md="8" sm="8" className="nowarp">
                                  <Row>
                                    <Badge color="primary">BKG SEND</Badge>
                                  </Row>
                                  {value.status2!==null?(
                                    <div>
                                    <Row>
                                    <span style={styles.progressText}>전송 일 : {value.status2}</span>
                                  </Row>
                                  {value.status_cnt2!==null?(
                                  <Row>
                                    <Badge color="default">전송횟수:{value.status_cnt2}</Badge>
                                  </Row>
                                  ):null}
                                  </div>
                                  ):(null)}
                                  
                                </Col>
                                
                              </div>
                              <div style={{maxWidth:'20%'}} className={value.status3===null?"step":"active"}>
                                <Col xs="4" md="4" sm="4" className="info info-horizontal">
                                  <div className="icon icon-primary">
                                    <i className={value.status_name3==="Confirm"?"fa fa-check text-secandary":value.status_name3==="Reject"?"fa fa-ban text-danger":"fa fa-spinner fa-pulse fa-fw text-secondary"}/>
                                  </div>
                                </Col>
                                <Col  xs="8" md="8" sm="8" className="nowarp">
                                  {value.status3===null?(
                                    <Row>
                                      <Badge color="primary">WAITING FOR CONFIRM</Badge>
                                    </Row>):
                                    (<div>
                                      <Row>
                                        <Badge color="primary">{value.status_name3}</Badge>
                                      </Row>
                                      <Row>
                                        <span style={styles.progressText}>{value.status3}</span>
                                      </Row>
                                      <Row>
                                        <span style={styles.progressText}>상태 : {value.status_name3}</span>
                                      </Row>
                                    </div>)}
                                  
                                  </Col>
                              </div>



                              <div style={{maxWidth:'20%'}} className={value.status4===null?"step":"active"}>
                                <Col xs="4" md="4" sm="4">
                                  <i className="fa fa-file-text-o fa-3x text-secondary"/>
                                </Col>
                                <Col xs="8" md="8" sm="8" className="nowarp">
                                  <Row>
                                    <Badge className="ml-2" color="primary">SR</Badge>
                                  </Row>
                                  {value.status4!==null?(
                                    <div>
                                    <Row>
                                    <span style={styles.progressText}>전송 일 : {value.status4}</span>
                                  </Row>
                                  {value.status_cnt4!==null?(
                                  <Row>
                                    <Badge color="default">전송횟수:{value.status_cnt4}</Badge>
                                  </Row>
                                  ):null}
                                  </div>
                                  ):(null)}
                                </Col>
                              </div>



                              <div style={{maxWidth:'20%'}} className={value.status5===null?"step nowrap":"active nowrap"}>
                                <Col xs="4" md="4" sm="4" className="info info-horizontal">
                                  <div className="icon icon-primary">
                                    <i className={value.status5===null?"fa fa-spinner fa-pulse fa-fw text-secondary":"fa fa-check text-secandary"}/>
                                  </div>
                                </Col>
                                <Col  xs="8" md="8" sm="8">
                                  <Row>
                                  <Badge className="ml-2" color="primary">BL</Badge>
                                  </Row>
                                  <Row>
                                    <span style={styles.progressText}>{value.status5}</span>
                                  </Row>
                                  </Col>
                              </div>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                  </Row>
                  )
                })
              }
             

          </div>
        </Col>
        <AlertMessage 
          message={message}
          isOpen={alertOpen}
          isClose={handleClose}
          // fontColor={"black"}   //선택사항
          // alertColor={"success"} //선택사항
          // timeOut={2000} //선택사항
          ></AlertMessage>
    </>
    );
}

