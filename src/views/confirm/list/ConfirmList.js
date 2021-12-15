import React, { useState, useEffect } from 'react';
import {Row, Col, FormGroup,Label,Input, Card, CardTitle, CardSubtitle, CardBody, CardFooter, Button, UncontrolledTooltip} from "reactstrap";
import Moment from 'moment';
import axios from "axios";
import AlertMessage from "components/Alert/AlertMessage.js";
import {CustomDatePicker} from 'components/CustomInput/CustomInput.js';
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
      setMorebookingNumber(bookingNumber);
      if(toDate>endDate){
        setFont("danger");
        setAlertOpen(true);
        setMessage(validation.DATE_MSG);
        return false;
      }
      axios.post("/shipper/selectShpConfirmList"
      ,{
        userNo:user?user:'',
        bkg_no:bookingNumber,
        toDate:toDate,endDate:endDate,
        num:1,
        lineCode: "WDFC"
      }).then(
        res => {
          if(res.statusText==="OK") {
            console.log(res.data);
            if(res.data.length > 0) {
              setTotCnt(res.data[0].tot_cnt);
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
    }
  }

  const onScrolltoTop =() => {
    window.scrollTo(0,0);
  }

  const onMore = (param) => {
    if(user){
      if((param-1) !== Number(data[0].tot_page)) {
        setNum(param);
        axios.post("/shipper/selectShpConfirmList",
        {
          userNo:user?user:'',
          bkg_no:moreBookingNumber,
          toDate:moreTodate,
          endDate:moreEndDate,
          num:param,
          lineCode: "WDFC"})
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

  return (
    <>
    {/* var colWidths = ['xs', 'sm', 'md', 'lg', 'xl']; */}
      <Col className="ml-auto mr-auto mt-4" xs="11">
          <Card className="card-raised card-form-horizontal no-transition mb-4" id="card">
              <CardTitle>
                <div className='search_option'>
                  <Col xl={{size:'5', offset:'5'}} className='search_option--calendar'>
                    <FormGroup row>
                      <Label className='search_option--calendar--text'>컨펌일자</Label>
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
                <CardSubtitle className="text-left result_count">
                  <span>[ Data Count: {data.length}건 / {totCnt}건 ]</span>
                </CardSubtitle>
                <Button
                  color="info"
                  className='search_option--search'
                  onClick={()=>onSubmit()}>SEARCH</Button>  
              </div>                    
              <CardBody className="result_table">
                <Row className="table_th bg-light border-top" >
                  <div className='table_th--no border-right border-left border-bottom'>#
                  </div> 
                  <Col>
                    <Row >
                    <Col md="4" xs="12">
                      <Row className='table_th--rows'>
                        <Col className="table_th--text" xs="4">BKG NO </Col>
                        <Col className="table_th--text" xs="4">CONFIRM DATE</Col>
                        <Col className="table_th--text" xs="4">VESSEL</Col>
                        
                      </Row>
                    </Col>
                    <Col md="4" xs="12">
                      <Row className='table_th--rows'>
                        {/* <Col className="text-center pt-3 border-right" xl="3" lg="3" md="3" sm="3"  xs="3" style={styles.normalGird}>BKG NO</Col> */}
                        {/* <Col className="text-center pt-3 border-right" xl="3" lg="3" md="3" sm="3"  xs="3" style={styles.normalGird}>BKG DATE</Col> */}
                        {/* <Col className="text-center pt-3 border-right" xl="4" lg="4" md="4" sm="4"  xs="4" style={styles.normalGird}>SHP NAME</Col> */}
                        <Col className="table_th--text" xs="3" >POL</Col>
                        <Col className="table_th--text" xs="3" >POD</Col>
                        <Col className="table_th--text" xs="3" >LED</Col>
                        <Col className="table_th--text" xs="3" >DCT</Col>
                      </Row>
                    </Col>
                    <Col md="4" xs="12">
                      <Row className='table_th--rows'>
                        <Col className="table_th--text" xs="4" >CCT</Col>
                        <Col className="table_th--text" xs="4" >REQ BKG</Col>
                        <Col className="table_th--text" xs="4" >SR</Col>
                      </Row>
                    </Col>
                    {/* <Col xl="3" lg="4" md="6" sm="12"  xs="12">
                      <Row>
                        <Col className="text-center pt-3 border-right" xl="2" lg="2" md="2" sm="2"  xs="2" style={styles.normalGird}>CARGO</Col>
                        <Col className="text-center pt-3 border-right" xl="2" lg="2" md="2" sm="2"  xs="2" style={styles.normalGird}>CNTR</Col>
                        <Col className="text-center pt-3 border-right" xl="3" lg="3" md="3" sm="3"  xs="3" style={styles.normalGird}>PICK CY</Col>
                        <Col className="text-center pt-3 border-right" xl="3" lg="3" md="3" sm="3"  xs="3" style={styles.normalGird}>DROP CY</Col>
                        <Col className="text-center pt-3 border-right" xl="2" lg="2" md="2" sm="2"  xs="2" style={styles.normalGird}>SR</Col>
                      </Row>
                    </Col> */}
                    </Row></Col>
                </Row>
                {data.length > 0 &&
                  <>
                    {data.map((value,index) => {
                      return(
                        <>
                          <Link key={"rows_"+index} to={{pathname: `/confirm`, state:{user_no:value.user_no, res_bkg_no:value.res_bkg_no, res_confirm_date:value.res_confirm_date}}}>
                            <Row  className="table_tb table_tb--hover border-bottom pb-3">
                              <div className="table_tb--no text-center pt-3 pl-1 pr-1">
                                {value.rownum}
                              </div>
                              <Col>
                                <Row>
                                  <Col md="4" xs="12">
                                    <Row className='table_tb--rows'>
                                      <Col className="text-center pt-3" xs="4">{value.res_bkg_no}</Col>
                                      <Col className="text-center pt-3" xs="4">{value.res_confirm_date_format}</Col>
                                      <Col className="text-center pt-3" xs="4">{value.sch_vessel_name}<br/>{value.sch_vessel_voyage?'('+value.sch_vessel_voyage+')':''}</Col>
                                    </Row>
                                  </Col>
                                  <Col md="4" xs="12">
                                    <Row className='table_tb--rows'>
                                      {/* <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3"  xs="3">{value.bkg_no}</Col> */}
                                      {/* <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3"  xs="3">{value.bkg_date_format}</Col> */}
                                      {/* <Col className=" text-center pt-3" xl="4" lg="4" md="4" sm="4"  xs="4">{value.shp_name1}</Col> */}
                                      <Col className="text-center pt-3" xs="3"><span data-html="true" data-toggle="tooltip" title={value.sch_pol_name} >{value.sch_pol}<br/>{value.sch_etd?'('+Moment(value.sch_etd).format('MM-DD')+')':null}</span></Col>
                                      <Col className="text-center pt-3" xs="3"><span data-html="true" data-toggle="tooltip" title={value.sch_pod_name} >{value.sch_pod}<br/>{value.sch_eta?'('+Moment(value.sch_eta).format('MM-DD')+')':null}</span></Col>
                                      <Col className="text-center pt-3" xs="3">{value.sch_led_format}</Col>
                                      <Col className="text-center pt-3" xs="3">{value.sch_dct_format}</Col>
                                    </Row>
                                  </Col>{value.res_bkg_date}
                                  <Col md="4" xs="12">
                                    <Row className='table_tb--rows'>
                                      <Col className="text-center pt-3" xs="4">{value.sch_cct_format}</Col>
                                      <Col className="text-center pt-3" xs="4">
                                        <Link key={"bkg_"+index} to={{pathname: `/booking`,
                                          state:{
                                            bkg_no: value.req_bkg_no?value.req_bkg_no:null,
                                            user_no: value.user_no?value.user_no:null,
                                            bkg_date: value.req_bkg_date?value.req_bkg_date:null,
                                            new_yn:'N'
                                        }}}>
                                            <Button
                                            className="btn-link"
                                            color="primary"
                                            type="button"
                                            size="sm"
                                            >     
                                            {value.req_bkg_no}
                                            </Button>
                                        </Link>
                                      </Col>
                                      <Col className="text-center pt-3" xs="4">
                                        <Link key={"sr_"+index} to={{pathname: `/srnew`,
                                          state:{
                                            res_bkg_no: value.res_bkg_no?value.res_bkg_no:null,
                                            user_no: value.user_no?value.user_no:null,
                                            sr_no:value.sr_no?value.sr_no:null, sr_date:value.sr_date?value.sr_date:null,
                                            confirm_yn:'Y'
                                        }}}>
                                            <Button
                                            className="btn-link"
                                            color="primary"
                                            type="button"
                                            size="sm"
                                            >     
                                            {value.sr_no?value.sr_no:'NEW'}
                                            </Button>
                                        </Link>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Link>
                        </>
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
