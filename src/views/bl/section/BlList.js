import React, { useState, useEffect } from 'react';
import {Row, Col, FormGroup,Label,Input, Card, CardTitle, CardSubtitle, CardBody, CardFooter, Button, UncontrolledTooltip} from "reactstrap";
import Moment from 'moment';
import axios from "axios";
import AlertMessage from "components/Alert/AlertMessage.js";
import {CustomDatePicker} from 'components/CustomInput/CustomInput.js';
import { Link } from "react-router-dom";
import * as validation from 'components/common/validation.js';

export default function BlList (props) {
  
  const [toDate,setToDate] = useState(Moment(new Date()).subtract(7,'days'));
  const [endDate,setEndDate] = useState(Moment(new Date()).add(21,'days'));
  const [data, setData] = useState([]);
  const [num, setNum] = useState(1);
  const [message,setMessage] = useState("");
  const [alertOpen,setAlertOpen] = useState(false);
  const [blNumber, setBlNumber] = useState("");
  const [totCnt, setTotCnt] = useState(0);
  const [font, setFont] = useState("success");
  const [isBottom, setBottom] = useState(false);
  const [moreTodate, setMoreTodate] = useState(Moment(new Date()).subtract(7,'days'));
  const [moreEndDate,setMoreEndDate] = useState(Moment(new Date()).add(21,'days'));
  const [moreblNumber, setMoreblNumber] = useState("");
  const {user} = props;

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return function cleanup() {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    onSubmit();
  }, [user]);

  function onScroll(){
    const view = document.getElementById('card');
    if(view.getBoundingClientRect().bottom <= window.innerHeight) {
      setBottom(true);
    }else {
      setBottom(false);
    }
  }

  const onSubmit = () => {
    if(user){
      setNum(1);
      setMoreTodate(toDate);
      setMoreEndDate(endDate);
      setMoreblNumber(blNumber);
      if(toDate>endDate){
        //setFont("danger");
        //setAlertOpen(true);
        //setMessage(validation.DATE_MSG);
        props.onAlert("error",validation.DATE_MSG); 
        return false;
      }
      axios.post("/shipper/selectBlList",{
        userNo:user?user:'',
        bl_no:blNumber,
        toDate:toDate,
        endDate:endDate,
        num:1,
        lineCode: "WDFC"}).then(
        res => {
          if(res.statusText==="OK") {
            //console.log(res.data);
            if(res.data.length > 0) {
              setTotCnt(res.data[0].tot_cnt);
              setData(res.data);
              //setAlertOpen(true);
              //setFont("success");
              //setMessage(validation.OK_CHECK_MSG);
              props.onAlert("success",validation.OK_CHECK_MSG);
            }else {
              setData([]);
              setTotCnt(0);
              //setAlertOpen(true);
              //setFont("danger");
              //setMessage(validation.FAIL_CHECK_MSG);
              props.onAlert("error",validation.FAIL_CHECK_MSG);
            }
          }
        } 
      )
    }else{
      //setAlertOpen(true);
      //setFont("danger");
     // setMessage(validation.NO_USER_MSG);
      props.onAlert("error",validation.NO_USER_MSG);
    }
  }

  const onScrolltoTop =() => {
    window.scrollTo(0,0);
  }

  const onMore = (param) => { //console.log(">>>more:",param)
    if(user){
      if((param-1) !== Number(data[0].tot_page)) {
        setNum(param);
        axios.post("/shipper/selectBlList",
        {
          userNo:user?user:'',
          bl_no:blNumber,
          toDate:toDate,
          endDate:endDate,
          num:param,
          lineCode: "WDFC"
        })
        .then(res => setData([...data,...res.data]));
      }else {
        //setAlertOpen(true);
        //setFont("warning");
        //setMessage(validation.LAST_PAGE_MSG);
        props.onAlert("error",validation.LAST_PAGE_MSG);
      }
    }else{
      //setAlertOpen(true);
      //setFont("danger");
      //setMessage(validation.NO_USER_MSG);
      props.onAlert("error",validation.NO_USER_MSG);
    }
  }

  const handleClose = () => {
    setAlertOpen(false);
  }
  
  const confitmShpBlDown =(path,name)=> { 
	  var filepath =  '/DATA2/BLIMAGE/'+path+'/';
	  axios.post("/api/boardFIleDownLoad",{filePath:filepath,fileName:name},{responseType:'arraybuffer',headers:{'Content-Type':'application/json','Accept':'application/pdf'}})
	  .then(res => { 
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
      {/* var colWidths = ['xs', 'sm', 'md', 'lg', 'xl']; */}
          <Col className="ml-auto mr-auto mt-4" xs="11">
              <Card className="card-raised card-form-horizontal no-transition mb-4" id="card">
                <CardTitle>
                  <div className='search_option'>
                    <Col xl={{size:'5', offset:'5'}} className='search_option--calendar'>
                      <FormGroup row>
                        <Label className='search_option--calendar--text'>선적일자</Label>
                        <Col>
                          <CustomDatePicker
                            id="startDate"
                            dateFormat="YYYY-MM-DD"
                            timeFormat={false}
                            value={toDate}
                            onChange={(date)=>setToDate(date)}/>
                        </Col>
                        <div className='search_option--calendar--text'>
                          ~
                        </div>
                        <Col>
                          <CustomDatePicker
                            id="endDate"
                            dateFormat="YYYY-MM-DD"
                            timeFormat={false}
                            value={endDate}
                            onChange={(date)=>setEndDate(date)}/>
                        </Col>
                      </FormGroup>  
                    </Col>
                    <Col xl='3' className='search_option--number'>
                        <FormGroup row className='search_option--number--formGroup' >
                          <Col className='search_option--number--text'>
                          BL NUMBER                          
                          </Col>
                          <Col className='search_option--number--input'>
                            <Input 
                              type="text" 
                              id="bknum"
                              placeholder="BL Number"
                              maxLength="50"
                              value={blNumber}
                              onChange={(e)=>setBlNumber(e.target.value)}/>
                          </Col>
                        </FormGroup>
                      </Col>
                    </div>
                  </CardTitle>
                  <div className='result_option'>
                    <CardSubtitle className="text-left result_count">
                      <span>[ Data Count: {data.length}건 / {totCnt}건 ]</span>
                    </CardSubtitle>
                    <Button
                        color="info"
                        className='search_option--search'
                        onClick={()=>onSubmit()}>SEARCH</Button>  
                  </div>
                  <CardBody className="result_table" >
                    <Row className="table_th bg-light border-top">
                      <div className='table_th--no border-right border-left border-bottom'>#
                      </div> 
                      <Col>
                        <Row >
                          <Col md="4" xs="12">
                            <Row className='table_th--rows'>
                              <Col className="table_th--text" xs="4">MBL NO</Col>
                              <Col className="table_th--text" xs="4">MRN</Col>
                              <Col className="table_th--text" xs="4">SR NO</Col>
                              
                            </Row>
                          </Col>
                          <Col md="4" xs="12">
                            <Row className='table_th--rows'>
                              <Col className="table_th--text" xs="6">VESSEL NAME</Col>
                              <Col className="table_th--text" xs="3">POL</Col>
                              <Col className="table_th--text" xs="3">POD</Col>
                            </Row>
                          </Col>
                          <Col md="4" xs="12">
                            <Row className='table_th--rows'>
                              <Col className="table_th--text" xs="4">ODB</Col>
                              <Col className="table_th--text" xs="4">BL CNTR</Col>
                              <Col className="table_th--text" xs="4">BL DOWN</Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    {data.length > 0 &&
                    <>
                      {data.map((value,key) => {
                        return(
                        
                          <Row  key={key} className="table_tb table_tb--hover border-bottom pb-3">
                            <div className="table_tb--no text-center pt-3 pl-1 pr-1">{value.rownum}
                            </div>
                            <Col>
                              <Row>
                                <Col md="4" xs="12">
                                  <Row className='table_tb--rows'>
                                    <Col className=" text-center pt-3 pl-0 pr-0" xs="4">
                                    	<Link key={key} to={{pathname: `/bl`, state: {user_no:value.user_no, mbl_no:value.mbl_no, issue_date:value.issue_date}}}>
                                    	<Button
	                                        className="btn-link"
	                                        color="primary"
	                                        type="button"
	                                        size="sm"
	                                        >{value.mbl_no}
	                                        </Button></Link>
                                    </Col>
                                    <Col className=" text-center pt-3" xs="4">{value.mrn}</Col>
                                    <Col className=" text-center pt-3" xs="4">
                                    <Link key={key} to={{pathname: `/srnew`,
                                        state:{user_no:props.user?props.user.user_no:null,
                                        sr_no:value.sr_no?value.sr_no:null,
                                        sr_date:value.sr_date?value.sr_date:null,confirm_yn:'Y'		  
                                      }}}>
                                          <Button
                                          className="btn-link"
                                          color="primary"
                                          type="button"
                                          size="sm"
                                          >     
                                          {value.sr_no}
                                          </Button>
                                      </Link>
                                      </Col>
                                  </Row>
                                </Col>
                                <Col md="4" xs="12">
                                  <Row className='table_tb--rows'>
                                    <Col className=" text-center pt-3" xs="6">{value.sch_vessel_name}<br/>{value.sch_vessel_voyage ? '('+value.sch_vessel_voyage+')':''}</Col>
                                    <Col className=" text-center pt-3" xs="3"><span data-html="true" data-toggle="tooltip" title={value.sch_pol_name} >{value.sch_pol}</span></Col>
                                    <Col className=" text-center pt-3" xs="3"><span data-html="true" data-toggle="tooltip" title={value.sch_pod_name} >{value.sch_pod}</span></Col>
                                  </Row>
                                </Col>
                                <Col md="4" xs="12">
                                  <Row className='table_tb--rows'>
                                    <Col className=" text-center pt-3" xs="4">{value.sch_obd_format}</Col>
                                    <Col className=" text-center pt-3" xs="4">{value.cntr_count}</Col>
                                    <Col className=" text-center pt-3" xs="4">
                                    	{((value.status_cus === 'FA' || value.status_cus === 'RA') && value.imagebl_path && value.imagebl_name) &&
                                        <Button
                                          className="btn-link"
                                          color="primary"
                                          type="button"
                                          onClick={()=>confitmShpBlDown(value.imagebl_path,value.imagebl_name)}
                                          size="sm"
                                          > DownLoad
                                        </Button>}
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        );
                      })}
                    </>}
                  </CardBody>
                  <CardFooter className="text-center">
                    {data.length > 0 &&
                      <Button
                      size="lg"
                      className="btn-round"
                      onClick={() => {
                        onMore(num + 1);
                      }}
                      color="primary">
                      <span>More&nbsp;{num}&nbsp;/&nbsp;{data.length!==0?data[0].tot_page:"0"}</span>
                      </Button>}
                    {isBottom &&
                      <Button
                      style={{float:'right'}}
                      size="sm"
                      id="scrollTop"
                      onClick={() => {onScrolltoTop()}}
                      color="link">
                      <i className="fa fa-chevron-circle-up fa-2x"></i>
                      <UncontrolledTooltip delay={0} target="scrollTop">TOP</UncontrolledTooltip>
                    </Button>}
                  </CardFooter>
              </Card>   
          </Col>
          <AlertMessage 
            message={message}
            isOpen={alertOpen}
            isClose={handleClose}
            // fontColor={font}   //선택사항
            alertColor={font} //선택사항
            timeOut={2000} //선택사항
            ></AlertMessage>
      </>
  )
}




