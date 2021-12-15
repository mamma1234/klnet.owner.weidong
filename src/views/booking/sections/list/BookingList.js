import React, { useState, useEffect } from 'react';
import {Row, Col, FormGroup,Label,Input, Card, CardTitle, CardBody, CardFooter, Button, UncontrolledTooltip,Table,Modal} from "reactstrap";
import Moment from 'moment';
import axios from "axios";
import AlertMessage from "components/Alert/AlertMessage.js";
import {CustomDatePicker} from 'components/CustomInput/CustomInput.js';
import CardSubtitle from 'reactstrap/lib/CardSubtitle';
import { Link } from "react-router-dom";
import * as validation from 'components/common/validation.js';

export default function BookingList (props) {
  const [toDate,setToDate] = useState(Moment(new Date()).subtract(7,'days'));
  const [endDate,setEndDate] = useState(new Date);
  const [data, setData] = useState([]);
  const [num, setNum] = useState(1);
  const [message,setMessage] = useState("");
  const [alertOpen,setAlertOpen] = useState(false);
  const [bookingNumber, setBookingNumber] = useState("");
  const [totCnt, setTotCnt] = useState(0);
  const [font, setFont] = useState("success");
  const [isBottom, setBottom] = useState(false);
  const [moreTodate, setMoreTodate] = useState(Moment(new Date()).subtract(7,'days'));
  const [moreEndDate,setMoreEndDate] = useState(new Date);
  const [moreBookingNumber, setMorebookingNumber] = useState("");
  const [modalMsg, setModalMsg] = useState(null);
  
  const {user}=props;
  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return function cleanup() {
      document.removeEventListener("scroll", onScroll);
    };	    
  }, []);

  useEffect(() => {
    //console.log(">>>>>>>>>>>>>>>>>>>",user)
    //console.log("toDate:", toDate, " endDate : ", endDate," bookingNumber:", bookingNumber)
    onSubmit();
   // console.log("sssss")
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
      setMorebookingNumber(bookingNumber);
      if(toDate>endDate){
        setAlertOpen(true);
        setFont("danger");
        setMessage(validation.DATE_MSG);
        return false;
      }
      axios.post(
        "/shipper/selectBookingList",
        {userNo:user?user:''
        , bkg_no:bookingNumber
        ,toDate:toDate
        ,endDate:endDate
        , num:1
      ,lineCode:'WDFC'}).then(
        res => {
          if(res.statusText==="OK") {
            if(res.data.length > 0) {
              setTotCnt(res.data[0].tot_cnt);
              console.log(res.data)
              setData(res.data);
              setAlertOpen(true);
              setFont("success");
              setMessage(validation.OK_CHECK_MSG);
            }else {
              setData([]);
              setTotCnt(0);
              setAlertOpen(true);            
              setFont("danger");
              setMessage(validation.FAIL_CHECK_MSG);
            }
          }
        } 
      )
    }else{
      setAlertOpen(true);
      setFont("danger")
      setMessage(validation.NO_USER_MSG);
      //props.onAlert("danger",validation.NO_USER_MSG);
    }
  }
  const onScrolltoTop =() => {
    window.scrollTo(0,0);
  }
  const onMore = (param) => {
    if(user){
      if((param-1) !== Number(data[0].tot_page)) {
        setNum(param);
        axios.post("/shipper/selectBookingList",{userNo:user?user:'', bkg_no:moreBookingNumber,toDate:moreTodate,endDate:moreEndDate, lineCode:'WDFC', num:param})
        .then(res => (setData([...data,...res.data])));
      }else {
        setAlertOpen(true);
        setFont("warning");
        setMessage(validation.LAST_PAGE_MSG);
      }
    }else{
      setAlertOpen(true);
      setFont("danger");
      setMessage(validation.NO_USER_MSG);
    }
  }

  const handleClose = () => {
    setAlertOpen(false);
  }
  
const onDeleteRows = (seq,vVal) => {
	  
	  console.log("onDeleteRows click:",vVal,"row:",seq);
	  

	  
	  if(vVal && (vVal.status_cus === "NO" ||  vVal.status_cus === "S0") ) {

		  setModalMsg(<Modal
				  	//size="sm"
				  	isOpen={true}
				   //toggle={() => setOpen(false)}
				   >
				  <div className="modal-header no-border-header">
				    <button
				      className="close"
				      type="button"
				      onClick={() => setModalMsg(null)}
				    >×</button>
				  </div>
				  <div className="modal-body text-center pl-0 pr-0">
				    <h5>선택한 Request 문서 [{vVal.bkg_no}]를 삭제 하시겠습니까?</h5>
				  </div>
				  <div className="modal-footer">
				    <div className="left-side">
				        <Button className="btn-link" color="danger" type="button" onClick={()=>fncDeleteRow(seq,vVal)}>Yes</Button>
				    </div>
				    <div className="divider" />
				    <div className="right-side">
				        <Button className="btn-link" color="default" type="button" onClick={() => setModalMsg(null)}>No</Button>
				    </div>
				  </div>
				</Modal>);

	  } else {
		  props.onAlert("error","전송 된  Booking 문서는 삭제 할수 없습니다.");
		  return false;
	  }  
  }

	const fncDeleteRow=(seq,vVal)=>{
	
		  axios.post("/shipper/deleteBooking",{user_no:user?user.user_no:'', booking:vVal})
	    .then(res => { 	      data.splice(seq,1);
		  					  setTotCnt(totCnt-1);
		          
		                      setModalMsg(null);
		                      props.onAlert("success",vVal.bkg_no+"이 정상 삭제 되었습니다.");});
	}

    return (
        <>
        {/* var colWidths = ['xs', 'sm', 'md', 'lg', 'xl']; */}
            <Col className="ml-auto mr-auto mt-4" xs="11">    
            {modalMsg}
                <Card className="card-raised card-form-horizontal no-transition mb-4" id="card">
                    <CardTitle>
                      <div className='search_option'>
                        <Col xl={{size:'5', offset:'5'}} className='search_option--calendar'>
                          <FormGroup row>
                            <Label className='search_option--calendar--text'>부킹일자</Label>
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
                            <Col className='search_option--number--text col-4'>
                              BOOKING NUMBER
                            </Col>
                            <Col className='search_option--number--input col-8'>
                              <Input 
                                type="text" 
                                id="bknum"
                                placeholder="Booking Number"
                                maxLength="50"
                                value={bookingNumber}
                                onChange={(e)=>setBookingNumber(e.target.value)}/>
                            </Col>
                          </FormGroup> 
                        </Col>                  
                      </div>
                    </CardTitle>
                    <div className='result_option'>
                      <CardSubtitle className="result_count text-left">                      
                        <span>[ Data Count: {data.length}건 / {totCnt}건 ]</span>
                      </CardSubtitle>
                      <div className='search_option--new'>
                        <Link to={{pathname: `/booking`, state: {user_no:'', bkg_no:'', bkg_date:'', new_yn:'Y'}}}>
                          <Button color="info" id="new" type="button" outline>
                            <i className="fa fa-plus">
                            </i>
                            NEW
                          </Button>
                        </Link>
                        <UncontrolledTooltip delay={0} target="new">Create Booking</UncontrolledTooltip>
                        <Button
                              color="info"
                              className='search_option--search'
                              onClick={()=>onSubmit()}>SEARCH</Button>  
                      </div>
                    </div>
                    <CardBody className="result_table">
                      <Row className="table_th bg-light border-top" >
                        <div className='table_th--no border-right border-left border-bottom'>#
                        </div> 
                        <Col>
                          <Row >
                            <Col xl="3" md="6" xs="12">
                              <Row className='table_th--rows'>
                                <Col className="table_th--text" xs="8">REQ BKG NO</Col>
                                <Col className="table_th--text" xs="4">REQ BKG DATE</Col>                
                              </Row>                          
                            </Col>
                            <Col xl="3" md="6" xs="12">
                              <Row className='table_th--rows'>
                                <Col className="table_th--text" xs="3">STATUS</Col>
                                <Col className="table_th--text" xs="5">BKG NO</Col>
                                <Col className="table_th--text" xs="4">CONFIRM DATE</Col>
                              </Row>
                            </Col>
                            <Col xl="3" md="6" xs="12">
                              <Row className='table_th--rows'>
                                <Col className="table_th--text" xs="6">VESSEL</Col>
                                <Col className="table_th--text" xs="3">POL</Col>
                                <Col className="table_th--text" xs="3">POD</Col>
                              </Row>
                            </Col>
                            <Col xl="3" md="6" xs="12">
                              <Row className='table_th--rows'>
                                <Col className="table_th--text" xs="6">SEND DATE</Col>
                                <Col className="table_th--text" xs="3">CARGO</Col>
                                <Col className="table_th--text" xs="3">CNTR</Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      {data.length > 0 &&
                        <>
                          {data.map((value,key) => {
                            return(
                             
                                <Row key={key} className="table_tb table_tb--hover border-bottom pb-3">
	                                <div key={"child_"+key} className="table_tb--no text-center pt-3 pl-1 pr-1">
		        	                    <Button
		        	                    className="btn-link"
		        	                    color="danger"
		        	                    data-toggle="tooltip"
		        	                    id={"remove_"+key}
		        	                    size="sm"
		        	                    type="button"
		        	                    style={{marginBottom:'0'}}
		        	                    onClick={()=>onDeleteRows(key,value)}
		        	                  >
		        	                    <i className="fa fa-times" />
		        	                  </Button>
		        	                  <UncontrolledTooltip
		        	                    delay={0}
		        	                    placement="top"
		        	                    target={"remove_"+key}
		        	                  >
		        	                    Remove
		        	                  </UncontrolledTooltip>
		        	                </div>
                                  <Col>
                                    <Row >
                                      <Col xl="3" md="6" xs="12">
                                        <Row className='table_tb--rows'>
                                          <Col className=" text-center pt-3" xs="8">
                                          <Link  to={{pathname: `/booking`, state: {user_no:value.user_no, bkg_no:value.bkg_no, bkg_date:value.bkg_date, new_yn:'N'}}}> 
                                          <Button 
	                  	                    className="btn-link"
	                  	                    color="primary"
	                  	                    type="button"
	                  	                    size="sm"
	                  	                    id={"remove_"+value.bkg_no}
                  	                      > 
                                          {value.bkg_no}
                                          </Button>
		                  	                  <UncontrolledTooltip
				        	                    delay={0}
				        	                    placement="top"
				        	                    target={"remove_"+value.bkg_no}
				        	                  >
		                  	                {value.bkg_no} 부킹문서 상세보기
				        	                  </UncontrolledTooltip>
		        	                    </Link>
                                          </Col>
                                          <Col className=" text-center pt-3" xs="4">{value.bkg_date_format}</Col>
                                        </Row>
                                      </Col>
                                      <Col xl="3" md="6" xs="12">
                                        <Row className='table_tb--rows'>
                                          <Col className=" text-center pt-3" xs="3" >{value.status_name}</Col>
                                          <Col className=" text-center pt-3" xs="5">{value.res_bkg_no?
                                            <Link key={"rowscon_"+key} to={{pathname: `/confirm`, state:{user_no:value.user_no, res_bkg_no:value.res_bkg_no, res_confirm_date:value.res_confirm_date}}}>
                                            <Button
                                            className="btn-link"
                                            color="primary"
                                            type="button"
                                            size="sm"
                                            >     
                                            {value.res_bkg_no}
                                            </Button>
                                            </Link>
                                            :<></>}
                                          </Col>
                                          <Col className=" text-center pt-3" xs="4">{value.res_confirm_date_format}</Col>
                                        </Row>
                                      </Col>
                                      <Col xl="3" md="6" xs="12">
                                        <Row className='table_tb--rows'>
                                          <Col className=" text-center pt-3" xs="6">{value.sch_vessel_name}<br/>{value.sch_vessel_voyage?'('+value.sch_vessel_voyage+')':''}</Col>
                                          <Col className=" text-center pt-3" xs="3"><span data-html="true" data-toggle="tooltip" title={value.sch_pol_name} >{value.sch_pol}<br/>{value.sch_etd ? '('+Moment(value.sch_etd).format('MM-DD')+')':''} </span>
                                          </Col>
                                          <Col className=" text-center pt-3" xs="3"><span data-html="true" data-toggle="tooltip" title={value.sch_pod_name} >{value.sch_pod}<br/>{value.sch_eta ? '('+Moment(value.sch_eta).format('MM-DD')+')':''}</span>
                                          </Col>
                                          {/* <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3"  xs="3">{}</Col>
                                          <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3"  xs="3">{}</Col> */}
                                        </Row>
                                      </Col>
                                      <Col xl="3" md="6" xs="12">
                                        <Row className='table_tb--rows'>
                                          <Col className=" text-center pt-3" xs="6">{value.send_date_format}</Col>
                                          <Col className=" text-center pt-3" xs="3">{value.cargo_pack_qty}</Col>
                                          <Col className=" text-center pt-3" xs="3">{value.cntr_qty}</Col>
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
            {/*<AlertMessage 
              message={message}
              isOpen={alertOpen}
              isClose={handleClose}
              // fontColor={font}   //선택사항
              alertColor={font} //선택사항
              timeOut={2000} //선택사항
              />*/}
        </>
    )
}

