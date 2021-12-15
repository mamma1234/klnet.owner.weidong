import React,{ useState, useEffect} from "react";
// reactstrap components

import { Row,Col,Card,CardHeader, Button, Input, Collapse,FormGroup, UncontrolledTooltip,Badge, Label, Popover, PopoverHeader, PopoverBody} from "reactstrap";
import {CustomDatePicker} from 'components/CustomInput/CustomInput.js';
//import 'semantic-ui-css/semantic.min.css'
import 'semantic-ui-css/semantic.min.css'
//import AlertMessage from "components/Alert/AlertMessage.js";
import axios from "axios"
//import './dashboard.css'
import Switch from "react-bootstrap-switch";
import Select from 'react-select';
import Moment from 'moment';
import NewRow from "./NewRow.js"
import * as validation from 'components/common/validation.js';

const styles = {
  headerFontStyle:{
    fontSize:'15px',
    color:'#696969',
    fontWeight:'600',
    
  },
  gridTitle:{
    fontSize:'1.3rem',
    color:'#696969',
    fontWeight:'bold'
  },
  progressText:{
    fontSize:'1rem',
    color:'black',
    fontWeight:'bold',
    fontWeight:'600',
  },
  gridCard:{
    width:'100%',
    padding:'15px'
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
    //const [message,setMessage] = useState("");
    //const [alertOpen,setAlertOpen] = useState(false);
    //const [font, setFont] = useState("success");
    const [data,setData] = useState([]);
    
    const [bookingList,setBookingList]= useState([]);
    // const element=useRef();
    const [refreshBool, setRefreshBool]= useState(false);
    const [timeOut,setTimeout] = useState(60000);
    const [popoverOpen,setPopoverPoen]=useState(false);
    const [searchDate,setSearchDate] = useState(false);
    const [toDate,setToDate] = useState(Moment(new Date()).subtract(7,'days'));
    const [endDate,setEndDate] = useState(new Date);
    const [bkgSaveOn,setBkgSaveOn]= useState(true);
    const [bkgSendOn,setBkgSendOn]= useState(true);
    const [bkgConfirmOn,setBkgConfirmOn]= useState(true);
    const [mtPickupOn, setMtPickupOn] = useState(true);
    const [dropOffOn, setDropOffOn] = useState(true);
    const [mfcsOn, setMfcsOn] = useState(true);
    const [srSaveOn,setSrSaveOn] = useState(true);
    const [srSendOn,setSrSendOn] = useState(true);
    const [blConfirmOn,setBlConfirmOn]= useState(true);
    const [nowDate,setNowDate] = useState(Moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
    const [viewWidth,setViewWidth] = useState('12.5%');
    const [waiting,setWaiting] = useState(false);
    const [mfcsSum, setmfCsSum] = useState(0);
    const {user} = props;
    useEffect(()=>{
      if(user){
      setWaiting(true);
      changeWidth();
      if(toDate>endDate){
        //setFont("danger");
        //setAlertOpen(true);
        //setMessage(validation.DATE_MSG);
        props.onAlert("error",validation.DATE_MSG);
        return setWaiting(false);
      }
        axios.post("/api/selectDashboard",
        {
          userNo:user?user:'',
          bkgList:cSelected,
          toDate:toDate,
          endDate:endDate,
          lineCode: 'WDFC',
          stats:{
            bkgSave:bkgSaveOn,
            bkgSend:bkgSendOn,
            bkgConfirm:bkgConfirmOn,
            mtStats:mtPickupOn,
            dropStats:dropOffOn,
            mfcsStats:mfcsOn,
            srSave:srSaveOn,
            srStats:srSendOn,
            blStats:blConfirmOn
          }
        }).then(res => {
          if(res.statusText==="OK") {
            if(res.data.length > 0) {
              setData(res.data);
              setmfCsSum(0);
              setNowDate(Moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
              //setAlertOpen(true);
              //setFont("success");
              //setMessage(validation.OK_CHECK_MSG);
              props.onAlert("success",validation.OK_CHECK_MSG);
              // props.onAlert("success","조회가 완료되었습니다.");
            }else {
              setData([]);
              setmfCsSum(0);
              setNowDate(Moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
              //setAlertOpen(true);
              //setFont("danger");
              //setMessage(validation.FAIL_CHECK_MSG);
              props.onAlert("error",validation.FAIL_CHECK_MSG);
              // props.onAlert("error","조회결과가 없습니다.");
            }
            setWaiting(false);
          }
        });
        axios.post("/api/selectGroupbkg",{userNo:user?user:'', toDate:toDate, endDate:endDate,}).then(res => {
          if(res.statusText==="OK") {
            setBookingList(res.data)
          }
        });
        setWaiting(false)
      }else{
        //setAlertOpen(true);
        //setFont("danger");
        //setMessage(validation.NO_USER_MSG);
        props.onAlert("error",validation.NO_USER_MSG);
      }
    },[user,bkgSaveOn,bkgSendOn,bkgConfirmOn, srSaveOn,srSendOn, blConfirmOn, dropOffOn, mtPickupOn, mfcsOn ,endDate,toDate,cSelected]);

    useEffect(() => {
      if(user){
        if(!refreshBool)return;
          const timeout = setInterval(()=>{
            axios.post("/api/selectDashboard",{userNo:user?user:'', bkgList:cSelected, toDate:toDate, endDate:endDate, searchDateflag:searchDate, searchDate:rselected, stats:{bkgSave:bkgSaveOn, bkgSend:bkgSendOn, bkgConfirm:bkgConfirmOn, mtStats:mtPickupOn, dropStats:dropOffOn, mfcsStats:mfcsOn, srSave:srSaveOn, srStats:srSendOn,blStats:blConfirmOn}}).then(
              res => {
                if(res.statusText==="OK") {
                  
                  if(res.data.length > 0) {
                    setData(res.data);
                    setmfCsSum(0)
                  }else {
                    setData([]);
                    setmfCsSum(0)
                  }
                  setNowDate(Moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
                }
            });
          },timeOut);
      
      return () => clearInterval(timeout)
      }
    },[refreshBool,data])

    const timeSettingToggle = () => setPopoverPoen(!popoverOpen);

/*    const handleClose = () => {
      setAlertOpen(false);
    }*/
    
    const onSum = (param) => {
      if(param) {
        setmfCsSum(prev=>prev+1);
      }
    }
    const changeWidth = () => {
      let sum = 0;

      if(bkgSaveOn) {
        sum=sum+1
      }
      if(bkgSendOn) {
        sum=sum+1
      }
      if(bkgConfirmOn) {
        sum=sum+1
      }
      if(mtPickupOn) {
        sum=sum+1
      }
      if(dropOffOn) {
        sum=sum+1
      }
      if(srSaveOn) {
        sum=sum+1
      }
      if(srSendOn) {
        sum=sum+1
      }
      if(blConfirmOn) {
        sum=sum+1
      }
      if(mfcsOn) {
        sum=sum+1
      }
      
      switch(sum) {
        case 0:
          setViewWidth('0%');
          break;
        case 1:
          setViewWidth('100%');
          break;
        case 2:
          setViewWidth('50%');
          break;
        case 3:
          setViewWidth('33.33%');
          break;
        case 4:
          setViewWidth('25%');
          break;
        case 5:
          setViewWidth('20%');
          break;
        case 6:
          setViewWidth('16.66%');
          break;
        case 7:
          setViewWidth('14.28%');
          break;
        case 8:
          setViewWidth('12.5%');
          break;
        case 9:
          setViewWidth('11.1%');
          break;
      }
    }
    return (
      <>
        <Col className="ml-auto mr-auto mt-3" xl="11" lg="11" md="11" sm="11" xs="11">
          <div style={{position:'fixed',width:'35px',right:'0',top:'10'}}>
            {/* <Button 
              className="btn-just-icon"
              type="button" 
              color="default" 
              onClick={()=> openFullScreen()}
              style={{borderRadius:'5px 0 0 5px'}}>
              <i id="fullScreen" onClick={()=> openFullScreen()} className="fa fa-arrows-alt text-white"/>
            </Button>
            <UncontrolledTooltip delay={0} target="fullScreen">전체화면</UncontrolledTooltip> */}
            <Button 
              className="btn-just-icon"
              type="button" 
              color="default" 
              id="timeSetting"
              style={{borderRadius:'5px 0 0 5px'}} >
              <i className={refreshBool?"fa fa-refresh fa-spin fa-2x text-white":"fa fa-refresh fa-2x text-white"}></i>
            </Button>
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
          </div>
          <Row>
            <Col xs="12" md="12" sm="12" className="text-center">
              <Card className="no-transition">
                <Collapse isOpen={isOpen}>
                  <CardHeader className="bg-white">
                      <Row>
                        <Col xl="5" lg="5" sm="12" md="6">
                          <Row>
                            <div style={{maxWidth:'15%',}}>
                              <FormGroup style={{paddingTop:'50%'}}>
                                <Label/>
                                <span style={{marginLeft:'5px', }}>부킹일자 </span>
                              </FormGroup>
                            </div>
                            <div style={{width:'40%'}}>
                              <FormGroup style={{ marginLeft:'5px'}}>
                                <Label/>
                                <CustomDatePicker
                                  style={{zIndex:9999}}
                                  id="startDate"
                                  dateFormat="YYYY-MM-DD"
                                  timeFormat={false}
                                  value={toDate}
                                  onChange={(date)=>setToDate(date)}/>
                              </FormGroup>
                            </div>
                            <div style={{width:'5%'}}>
                              <FormGroup style={{paddingTop:'30px'}}>
                                <Label/>
                                <span>&nbsp;~</span>
                              </FormGroup>
                            </div>
                            <div style={{width:'40%'}}>
                              <FormGroup style={{ marginLeft:'5px'}}>
                                <Label/>
                                <CustomDatePicker
                                  id="endDate"
                                  dateFormat="YYYY-MM-DD"
                                  timeFormat={false}
                                  value={endDate}
                                  onChange={(date)=>setEndDate(date)}/>
                              </FormGroup>
                            </div>
                          </Row>
                        </Col>
                        <Col xl="2" lg="2" sm="12" md="6">
                          <FormGroup>
                            <Label/>
                              <Select
                                className="react-select"
                                isMulti
                                options={bookingList}
                                placeholder="BKG NUMBER"
                                value={cSelected}
                                style={{minWidth:'100%'}}
                                closeMenuOnSelect={false}
                                onChange={(e) => setCSelected(e)}
                                styles={{
                                  menu: provided => ({...provided, zIndex:9999}),
                                  
                                }}
                              />
                          </FormGroup>  
                        </Col>
                        <Col xl="5" lg="5" md="12" sm="12" xs="12" className="mt-3">
                          <Row>
                            <Col xl="4" lg="4" md="4" sm="12" xs="12">
                              <Row>
                                <Col xl="4" lg="4" md="4" sm="4" xs="4">
                                  <Button id="bkgsave2" className="btn-just-icon" size="lg" color={bkgSaveOn?"primary":"default"} onClick={()=> setBkgSaveOn(!bkgSaveOn)}>
                                    <i className="fa fa-floppy-o"/>
                                    <UncontrolledTooltip delay={0} target="bkgsave2">부킹저장</UncontrolledTooltip>
                                  </Button>
                                </Col>
                                <Col xl="4" lg="4" md="4" sm="4" xs="4">
                                  <Button id="bkgsend2" className="btn-just-icon" size="lg" color={bkgSendOn?"primary":"default"} onClick={()=> setBkgSendOn(!bkgSendOn)}>
                                    <i className="fa fa-paper-plane-o"/>
                                    <UncontrolledTooltip delay={0} target="bkgsend2">부킹전송</UncontrolledTooltip>
                                  </Button>
                                </Col>
                                <Col xl="4" lg="4" md="4" sm="4" xs="4">
                                  <Button id="bkgconfirm2" className="btn-just-icon" size="lg" color={bkgConfirmOn?"primary":"default"} onClick={()=> setBkgConfirmOn(!bkgConfirmOn)}>
                                    <i className="fa fa-pencil-square-o"/>
                                    <UncontrolledTooltip delay={0} target="bkgconfirm2">부킹컨펌</UncontrolledTooltip>
                                  </Button>
                                </Col>
                              </Row>
                            </Col>   
                          <Col xl="4" lg="4" md="4" sm="12"  xs="12">
                            <Row>
                              <Col xl="4" lg="4" md="4" sm="4" xs="4">
                                <Button id="pickup" className="btn-just-icon" size="lg" color={mtPickupOn?"primary":"default"} onClick={()=> setMtPickupOn(!mtPickupOn)}>
                                  <i className="fa fa-truck"/>
                                </Button>
                                <UncontrolledTooltip delay={0} target="pickup">PICK UP</UncontrolledTooltip>
                              </Col>  
                              <Col xl="4" lg="4" md="4" sm="4" xs="4">
                                <Button id="dropoff" className="btn-just-icon" size="lg" color={dropOffOn?"primary":"default"} onClick={()=> setDropOffOn(!dropOffOn)}>
                                  <i className="fa fa-ship"/>
                                </Button>
                                <UncontrolledTooltip delay={0} target="dropoff">DROP OFF</UncontrolledTooltip>
                              </Col>
                              <Col xl="4" lg="4" md="4" sm="4" xs="4">
                                <Button id="srsave2" className="btn-just-icon" size="lg" color={srSaveOn?"primary":"default"} onClick={()=> setSrSaveOn(!srSaveOn)}>
                                  <i className="fa fa-floppy-o"/>
                                  <UncontrolledTooltip delay={0} target="srsave2">SR 저장</UncontrolledTooltip>
                                </Button>
                              </Col>
                            </Row>
                          </Col>
                          <Col xl="4" lg="4" md="4" sm="12"  xs="12">
                            <Row>
                              <Col xl="4" lg="4" md="4" sm="4" xs="4">
                                  <Button id="srsend2" className="btn-just-icon" size="lg" color={srSendOn?"primary":"default"} onClick={()=> setSrSendOn(!srSendOn)}>
                                    <i className="fa fa-file-text-o"/>
                                  </Button>
                                  <UncontrolledTooltip delay={0} target="srsend2">SR 전송</UncontrolledTooltip>
                              </Col>
                              <Col xl="4" lg="4" md="4" sm="4" xs="4">
                                <Button id="blreciver2" className="btn-just-icon" size="lg" color={blConfirmOn?"primary":"default"} onClick={()=> setBlConfirmOn(!blConfirmOn)}>
                                  <i className="fa fa-file-o"/>
                                </Button>
                                <UncontrolledTooltip delay={0} target="blreciver2">BL수신</UncontrolledTooltip>
                              </Col>              
                              <Col xl="4" lg="4" md="4" sm="4" xs="4">
                                <Button id="mfcs" className="btn-just-icon" size="lg" color={mfcsOn?"primary":"default"} onClick={()=> setMfcsOn(!mfcsOn)}>
                                  <i className="fa fa-clipboard"/>
                                </Button>
                                <UncontrolledTooltip delay={0} target="mfcs">적하목록취합</UncontrolledTooltip>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </CardHeader>
                </Collapse>
              </Card>
              <Col  style={{textAlignLast:'right'}}>
                  <Button 
                      className="btn-just-icon"
                      type="button" 
                      color="default" 
                      onClick={()=> setIsOpen(!isOpen)}
                      style={{borderRadius:'5px'}} >
                      <i id="append" onClick={()=> setIsOpen(!isOpen)} className={isOpen?"fa fa-minus fa-2x text-white":"fa fa-plus fa-2x text-white"}/>
                  </Button>
                  <UncontrolledTooltip delay={0} target="append">{isOpen?"close":"open"}</UncontrolledTooltip>
              </Col>
            </Col>
          </Row>
        
        <Col className="ml-auto mr-auto mt-3"></Col>
          <Row>
            <Col>
              <span style={styles.headerFontStyle}>최근 업데이트 시간 : {String(nowDate)}</span>
            </Col>
          </Row>
          {/* <div ref={element}> */}
          <div>
          {
            data.length > 0 ?(
              <>
               
               {waiting===false?(
               <>
                <Row xl="12" lg="12" md="12" sm="12" xs="12" style={{margin:'1em 0'}} className="border solid 1px">
                  {bkgSaveOn &&
                    <Col style={{maxWidth:viewWidth}} className="border-left">
                      <Row>
                        <Col xl="12" lg="12" md="12" sm="12" xs="12">
                          <Row>
                            <Col className="text-center">
                              <span style={styles.progressText}>{data[0].p.save_count_sum}&nbsp;/&nbsp;{data[0].p.total_count}</span>                            
                            </Col>
                          </Row>
                          {data.length!==0&&
                          <Row xl="12" lg="12" md="12" sm="12" xs="12">
                            <Col className="text-center">
                              <Badge color="primary"><span style={styles.progressText}>BKG SAVE</span></Badge>
                            </Col>
                          </Row>}
                        </Col>
                      </Row>
                    </Col>}
                      
                  {bkgSendOn &&
                    <Col style={{maxWidth:viewWidth}} className="border-left">
                      <Row>
                        <Col xl="12" lg="12" md="12" sm="12" xs="12">
                          <Row>
                            <Col className="text-center">
                              <span style={styles.progressText}>{data[0].p.send_count_sum}/{data[0].p.total_count}</span>
                            </Col>
                          </Row>
                          {data.length!==0 &&
                            <Row>
                              <Col className="text-center">
                                <Badge color="primary"><span style={styles.progressText}>BKG SEND</span></Badge>
                              </Col>
                            </Row>}
                        </Col>
                      </Row>
                    </Col>}
                  {bkgConfirmOn &&
                    <Col style={{maxWidth:viewWidth}} className="border-left">
                      <Row>
                        <Col xl="12" lg="12" md="12" sm="12" xs="12">
                          <Row>
                            <Col className="text-center">
                              <span style={styles.progressText}>{data[0].p.confirm_count_sum}/{data[0].p.total_count}</span>
                            </Col>  
                          </Row>
                          {data.length!==0 &&
                          <Row>
                            <Col className="text-center">
                              <Badge color="primary"><span style={styles.progressText}>CONFIRM</span></Badge>  
                            </Col>
                          </Row>}
                        </Col>
                      </Row>
                    </Col>}
                  {mtPickupOn &&
                    <Col style={{maxWidth:viewWidth}} className="border-left">
                      <Row>
                        <Col xl="12" lg="12" md="12" sm="12" xs="12">
                          <Row>
                            <Col className="text-center">
                              <span style={styles.progressText}>{data[0].p.pick_up_count}/{data[0].p.total_count}</span>
                            </Col>
                          </Row>
                          {data.length!==0 &&
                          <Row>
                            <Col className="text-center">
                              <Badge color="primary"><span style={styles.progressText}>PICKUP</span></Badge>
                            </Col>
                          </Row>}
                        </Col>
                      </Row>
                    </Col>}
                  {dropOffOn &&
                    <Col style={{maxWidth:viewWidth}} className="border-left">
                      <Row>
                        <Col xl="12" lg="12" md="12" sm="12" xs="12">
                          <Row>
                            <Col className="text-center">
                              <span style={styles.progressText}>{data[0].p.drop_off_count}/{data[0].p.total_count}</span>
                            </Col>
                          </Row>
                          {data.length!==0 &&
                          <Row>
                            <Col className="text-center">
                              <Badge color="primary"><span style={styles.progressText}>DROPOFF</span></Badge>
                            </Col>
                          </Row>}
                        </Col>
                      </Row>
                    </Col>}
                  {srSaveOn &&
                    <Col style={{maxWidth:viewWidth}} className="border-left">
                      <Row>
                        <Col xl="12" lg="12" md="12" sm="12" xs="12">
                          <Row>
                            <Col className="text-center">
                              <span style={styles.progressText}>{data[0].p.sr_save_count_sum}/{data[0].p.total_count}</span>
                            </Col>
                          </Row>
                          {data.length!==0 &&
                          <Row>
                            <Col className="text-center">
                              <Badge color="primary"><span style={styles.progressText}>SR-SAVE</span></Badge>
                            </Col>
                          </Row>}
                        </Col>
                      </Row>
                    </Col>}  
                  {srSendOn &&
                    <Col style={{maxWidth:viewWidth}} className="border-left">
                      <Row>
                        <Col xl="12" lg="12" md="12" sm="12" xs="12">
                          <Row>
                            <Col className="text-center">
                              <span style={styles.progressText}>{data[0].p.sr_send_count_sum}/{data[0].p.total_count}</span>
                            </Col>
                          </Row>
                          {data.length!==0 &&
                          <Row>
                            <Col className="text-center">
                              <Badge color="primary"><span style={styles.progressText}>SR-SEND</span></Badge>
                            </Col>
                          </Row>}
                        </Col>
                      </Row>
                    </Col>}
                  {blConfirmOn &&
                    <Col style={{maxWidth:viewWidth}} className="border-left">
                      <Row>
                        <Col xl="12" lg="12" md="12" sm="12" xs="12">
                          <Row>
                            <Col className="text-center">
                              <span style={styles.progressText}>{data[0].p.bl_count}/{data[0].p.total_count}</span>
                            </Col>
                          </Row>
                          {data.length!==0 &&
                          <Row>
                            <Col className="text-center">
                              <Badge color="primary"><span style={styles.progressText}>BL</span></Badge>
                            </Col>
                          </Row>}
                        </Col>
                      </Row>
                    </Col>}
                  {mfcsOn &&
                    <Col style={{maxWidth:viewWidth}} className="border-left">
                      <Row>
                        <Col xl="12" lg="12" md="12" sm="12" xs="12">
                          <Row>
                            <Col className="text-center">
                              <span style={styles.progressText}>{mfcsSum}/{data[0].p.total_count}</span>
                            </Col>
                          </Row>
                          {data.length!==0 &&
                          <Row className="text-center">
                            <Col className="text-center">
                              <Badge color="primary"><span style={styles.progressText}>MFCS</span></Badge>
                            </Col>
                          </Row>}
                        </Col>
                      </Row>
                    </Col>}
                  </Row>
                 {data.map((value,index) => {
                   return(
                      <NewRow 
                        key={index} 
                        parameter={value}
                        user={props} 
                        index={index}
                        state={{save:bkgSaveOn,send:bkgSendOn,confirm:bkgConfirmOn,pickup:mtPickupOn,drop:dropOffOn,srsave:srSaveOn,srsend:srSendOn,bl:blConfirmOn,mfcs:mfcsOn}}
                        viewWidth={viewWidth}
                        sum={(param) => onSum(param)}/>
                     )})}
                 </>
                 ):(
                 <>
                   <div className="info" >
                     <div className="icon icon-youtube">
                       <i className="fa fa-spinner fa-pulse fa-fw text-secondary"></i>
                     </div>
                     <div className="description">
                       <h4 className="info-title">Searching....</h4>
                       <p>Searching. Please wait</p>
                     </div>
                   </div>
                 </>)}
             </>
            ):(
              <div className="info" >
                <div className="icon icon-youtube">
                  <i className="nc-icon nc-simple-remove"></i>
                </div>
                <div className="description">
                  <h4 className="info-title">No Search Results.</h4>
                  <p>By Setting Different Search Conditions</p>
                </div>
              </div>
            )
          }
          </div>
        </Col>
        {/*}<AlertMessage 
          message={message}
          isOpen={alertOpen}
          isClose={handleClose}
          // fontColor={"black"}   //선택사항
          alertColor={font} //선택사항
          timeOut={2000} //선택사항
          ></AlertMessage>*/}
    </>
  );
}

