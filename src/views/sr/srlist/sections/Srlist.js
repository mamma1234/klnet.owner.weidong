import React, { useState, useEffect } from 'react';
import {Row, Col, FormGroup,Label,Input, Card, CardTitle, CardSubtitle, CardBody, CardFooter, Button, UncontrolledTooltip,Modal} from "reactstrap";
import Moment from 'moment';
import axios from "axios";
import AlertMessage from "components/Alert/AlertMessage.js";
import {CustomDatePicker} from 'components/CustomInput/CustomInput.js';
import { Link } from "react-router-dom";
import * as validation from 'components/common/validation.js';

export default function SrList (props) {
  const [toDate,setToDate] = useState(Moment(new Date()).subtract(7,'days'));
  const [endDate,setEndDate] = useState(new Date);
  const [data, setData] = useState([]);
  const [num, setNum] = useState(1);
  const [message,setMessage] = useState("");
  const [alertOpen,setAlertOpen] = useState(false);
  const [srNo, setSrNo] = useState("");
  const [totCnt, setTotCnt] = useState(0);
  const [font, setFont] = useState("success");
  const [isBottom, setBottom] = useState(false);
  const [moreTodate, setMoreTodate] = useState(Moment(new Date()).subtract(7,'days'));
  const [moreEndDate,setMoreEndDate] = useState(new Date);
  const [moreSrNo, setMoreSrNo] = useState("");
  const [modalMsg, setModalMsg] = useState(null);
  const {user}=props;

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
      setMoreSrNo(srNo);
      if(toDate>endDate){
        setFont("danger");
        setAlertOpen(true);
        setMessage(validation.DATE_MSG);
        return false;
      }
      axios.post("/shipper/selectSrList",
      {
        userNo:user?user.user_no:'',
        sr_no:srNo,
        toDate:toDate,
        endDate:endDate,
        num:1,
        lineCode: "WDFC"
      }).then(
        res => {
          if(res.statusText==="OK") {
            //console.log(res.data)
            if(res.data.length > 0) {
  
              setFont("success");
              setTotCnt(res.data[0].tot_cnt);
              setData(res.data);
              setAlertOpen(true);
              setMessage(validation.OK_CHECK_MSG);
            }else {

              setFont("danger");
              setData([]);
              setTotCnt(0);
              setAlertOpen(true);
              setMessage(validation.FAIL_CHECK_MSG);
            }
          }
        } 
      )
    }
  }

  const onScrolltoTop =() => {
    window.scrollTo(0,0);
  }

  const onMore = (param) => {
	
    if(user){
      if((param-1) !== Number(data[0].tot_page)) {
        setNum(param);
   
        axios.post("/shipper/selectSrList",
        {
          userNo:user?user.user_no:'',
          bkg_no:moreSrNo,
          toDate:moreTodate,
          endDate:moreEndDate,
          num:param,
          lineCode: "WDFC"})
        .then(res => (setData([...data,...res.data])));
      }else {
        setFont("warning");
      
        setAlertOpen(true);
        setMessage(validation.LAST_PAGE_MSG);
      }
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
				    <h5>선택한 Request 문서 [{vVal.sr_no}]를 삭제 하시겠습니까?</h5>
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
		  props.onAlert("error","전송 된  SR 문서는 삭제 할수 없습니다.");
		  return false;
	  }  
  }
  
  const fncDeleteRow=(seq,vVal)=>{

	  axios.post("/shipper/deleteSrList",{user_no:user?user.user_no:'', data:vVal})
      .then(res => { 	  data.splice(seq,1);
	  					  setTotCnt(totCnt-1);
	            
	                      setModalMsg(null);
	                      props.onAlert("success",vVal.sr_no+"이 정상 삭제 되었습니다.");});
  }
  
  function TableList (props) {
	  const {propsData,indexs} = props;

	  return (
	           <Row  className="table_tb table_tb--hover border-bottom pb-3 table_th--rows">
	                <div className="table_tb--no text-center pt-3 pl-1 pr-1">
	                    <Button
	                    className="btn-link"
	                    color="danger"
	                    data-toggle="tooltip"
	                    id={"remove_"+indexs}
	                    size="sm"
	                    type="button"
	                    style={{marginBottom:'0'}}
	                    onClick={()=>props.deleteRows(indexs,propsData)}
	                  >
	                    <i className="fa fa-times" />
	                  </Button>
	                  <UncontrolledTooltip
	                    delay={0}
	                    placement="top"
	                    target={"remove_"+indexs}
	                  >
	                    Remove
	                  </UncontrolledTooltip>
	                </div>
	                <Col>
	                  <Row className='table_tb--rows'>
	                    <Col className=" text-center pt-3" xs='6' md='4' xl='2'>
	                    <Link  to={{pathname: `/srnew`, state:{user_no:propsData.user_no, sr_no:propsData.sr_no, sr_date:propsData.sr_date}}}>
	                    <Button 
	                    className="btn-link"
	                    color="primary"
	                    type="button"
	                    size="sm"
	                    >     {propsData.sr_no}</Button></Link></Col>
	                    <Col className=" text-center pt-3" xs='3' md='2' xl='1'>{propsData.sr_date_format}</Col>
	                    <Col className=" text-center pt-3" xs='3' md='2' xl='1'>{propsData.status_name}</Col>
	                    <Col className=" text-center pt-3" xs='3' md='2' xl='1'>{propsData.send_date_format}</Col>
	                    <Col className=" text-center pt-3 pl-0 pr-0" xs='3' md='2' xl='1'>
	                    {propsData.res_mbl_no?<Link to={{pathname: `/bl`,
	                        state:{user_no:propsData.user_no?propsData.user_no:null,
	                        	   mbl_no: propsData.res_mbl_no?propsData.res_mbl_no:null,
	                               issue_date: propsData.res_issue_date?propsData.res_issue_date:null
	                               }}}>
	                        <Button 
	                          className="btn-link"
	                          color="primary"
	                          type="button"
	                          size="sm"
	                          >     
	                          {propsData.res_mbl_no}
	                        </Button>
	                      </Link>:<></>}
	                    </Col>
	                    <Col className=" text-center pt-3" xs='3' md='2' xl='1'>{propsData.res_issue_date_format}</Col>
	                    <Col className=" text-center pt-3" xs='3' md='2' xl='1'>{propsData.sch_vessel_name}<br/>{propsData.sch_vessel_voyage?'('+propsData.sch_vessel_voyage+')':''}</Col>
	                    <Col className=" text-center pt-3" xs='3' md='2' xl='1'><span data-html="true" data-toggle="tooltip" title={propsData.sch_pol_name} >{propsData.sch_pol}<br/>{propsData.sch_srd_format?"("+propsData.sch_srd_format+")":''}</span></Col>
	                    <Col className=" text-center pt-3" xs='3' md='2' xl='1'><span data-html="true" data-toggle="tooltip" title={propsData.sch_pod_name} >{propsData.sch_pod}<br/>{propsData.sch_eta_format?"("+propsData.sch_eta_format+")":''}</span></Col>
	                    <Col className=" text-center pt-3" xs='3' md='2' xl='1'>{propsData.cargo_pack_qty}</Col>
	                    <Col className=" text-center pt-3" xs='3' md='2' xl='1'>{propsData.cntr_count==="0"?"":propsData.cntr_count}</Col>
	                  </Row>
	                </Col>
	                
	              </Row>
	  )
	}


  return (
      <>{modalMsg}
      {/* var colWidths = ['xs', 'sm', 'md', 'lg', 'xl']; */}
      <Col className="ml-auto mr-auto mt-4" sm="11">               
          <Card className="card-raised card-form-horizontal no-transition mb-4" id="card">             
            <CardTitle>
              <div className='search_option'>
                <Col xl={{size:'5', offset:'5'}} className='search_option--calendar'>
                  <FormGroup row>                               
                    <Label className='search_option--calendar--text'>SR일자</Label>                       
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
                      SR NUMBER
                    </Col>
                    <Col className='search_option--number--input'>
                    <Input                                 
                      type="text" 
                      id="bknum"
                      placeholder="SR Number"
                      maxLength="50"
                      value={srNo}
                      onChange={(e)=>setSrNo(e.target.value)}/>
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
                <Link to={{pathname: `/srnew`, state:{user_no:props.user?props.user.user_no:'', sr_no:'', sr_date:'',doc_new:'Y'}}}>
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
              <CardBody className=" result_table">
                <Row className="table_th bg-light border-top" >
                  <div className='table_th--no border-right border-left border-bottom'>#
                  </div> 
                  <Col>
                    <Row >                 
                      <Col xs='6' md='4' xl='2' className="table_th--text">SR NO </Col>
                      <Col xs='3' md='2' xl='1' className="table_th--text">SR DATE</Col>
                      <Col xs='3' md='2' xl='1' className="table_th--text">STATUS</Col>
                      <Col xs='3' md='2' xl='1' className="table_th--text">SEND DATE</Col>
                      <Col xs='3' md='2' xl='1' className="table_th--text">MBL NO</Col>
                      <Col xs='3' md='2' xl='1' className="table_th--text">RES ISSUE DATE</Col>
                      <Col xs='3' md='2' xl='1' className="table_th--text">SCH VSL NAME</Col>  
                      <Col xs='3' md='2' xl='1' className="table_th--text">POL</Col>
                      <Col xs='3' md='2' xl='1' className="table_th--text">POD</Col>
                      <Col xs='3' md='2' xl='1' className="table_th--text">CARGO PACK QTY</Col>
                      <Col xs='3' md='2' xl='1' className="table_th--text">CNTR</Col>    
                    </Row>
                  </Col>                       
                </Row>
                {data.length>0?
                		data.map((value,index)=> (
                				<TableList key={index} indexs={index} propsData={value} deleteRows={(seq,value)=>onDeleteRows(seq,value)}/>
                		)):<></>} 

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
                {isBottom&&
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
      
     {/* <AlertMessage 
        message={message}
        isOpen={alertOpen}
        isClose={handleClose}
        // fontColor={font}   //선택사항
        alertColor={font} //선택사항
        timeOut={2000} //선택사항
        ></AlertMessage>*/}
    </>
  )
}




             