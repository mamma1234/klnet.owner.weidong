import React, { useState, useEffect } from 'react';
import {Row, Col, FormGroup,Label,Input, Card, CardTitle, CardBody, CardFooter, Button, UncontrolledTooltip} from "reactstrap";
import Moment from 'moment';
import axios from "axios";
import AlertMessage from "components/Alert/AlertMessage.js";
import {CustomDatePicker} from 'components/CustomInput/CustomInput.js';
import CardSubtitle from 'reactstrap/lib/CardSubtitle';
import { Link } from "react-router-dom";
const styles = {
    normalGird:{
      fontSize:'16px',
      color:'#696969',
      fontWeight:'bold',
    },
    cardTitle:{
      fontSize:'16px',
      color:'#696969',
    }
  };

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
  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    onSubmit()
    return function cleanup() {
      document.removeEventListener("scroll", onScroll);
    };	    
  }, []);




  
  function onScroll(){
    const view = document.getElementById('card');
    
    
    if(view.getBoundingClientRect().bottom <= window.innerHeight) {
      setBottom(true);
    }else {
      setBottom(false);
    }
  }
  const onSubmit = () => {
    setNum(1);
    setMoreTodate(toDate);
    setMoreEndDate(endDate);
    setMorebookingNumber(bookingNumber);
    axios.post("/api/selectBookingList",{bkg_no:bookingNumber,toDate:toDate,endDate:endDate, num:1}).then(
      res => {
        if(res.statusText==="OK") {

          if(res.data.length > 0) {
            setFont("success")
            setTotCnt(res.data[0].tot_cnt);
            setData(res.data);
            setAlertOpen(true);
            
            setMessage("조회가 완료되었습니다.");
          }else {
            setFont("danger")
            setData([]);
            setTotCnt(0);
            
            setAlertOpen(true);
            setMessage("조회 결과가 없습니다.");
          }
        }
      } 
    )

  }
  const onScrolltoTop =() => {
    window.scrollTo(0,0);
  }
  const onMore = (param) => {
    
    if((param-1) !== Number(data[0].tot_page)) {
      setNum(param);
      axios.post("/api/selectBookingList",{bkg_no:moreBookingNumber,toDate:moreTodate,endDate:moreEndDate, num:param})
      .then(res => (setData([...data,...res.data])));
    }else {
      setFont("warning")
      setAlertOpen(true);
      setMessage("마지막 페이지입니다.");
    }
  }

  const handleClose = () => {
    setAlertOpen(false);
  }
  const linkToDetail = (param) => {
    console.log(param)
  }
    return (
        <>
        {/* var colWidths = ['xs', 'sm', 'md', 'lg', 'xl']; */}
            <Col className="ml-auto mr-auto mt-4" xs="11" md="11" sm="11">
               
                <Card className="card-raised card-form-horizontal no-transition mb-4" id="card">
                    <CardTitle>
                      <Col>
                        <Row>
                          <Col xl="5" lg="6" sm="12" md="12">
                            <Row>
                              <div style={{maxWidth:'15%',}}>
                                <FormGroup style={{paddingTop:'50%'}}>
                                  <Label/>
                                  <span style={{marginLeft:'5px', fontSize:'16px',fontWeight:'bold' }}>부킹일자 </span>
                                </FormGroup>
                              </div>
                              <div style={{width:'40%'}}>
                                <FormGroup style={{ marginLeft:'5px', fontSize:'16px',fontWeight:'bold' }}>
                                  <Label/>
                                  <CustomDatePicker
                                      id="startDate"
                                      dateFormat="YYYY-MM-DD"
                                      timeFormat={false}
                                      value={toDate}
                                      onChange={(date)=>setToDate(date)}/>
                                </FormGroup>
                              </div>
                              <div style={{width:'5%'}}>
                                <FormGroup style={{paddingTop:'30px', fontSize:'16px',fontWeight:'bold' }}>
                                  <Label/>
                                  <span> ~ </span>
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
                          <Col xl="3" lg="3" sm="12" md="12">
                            <FormGroup>
                              <Label className="mb-0" style={{fontSize:'16px',fontWeight:'bold' }}>BOOKING NUMBER</Label>
                              <Input 
                                type="text" 
                                id="bknum"
                                placeholder="Booking Number"
                                maxLength="50"
                                value={bookingNumber}
                                onChange={(e)=>setBookingNumber(e.target.value)}/>
                            </FormGroup>
                          </Col>
                          <Col xl="2" lg="1" sm="12" md="12">
                          </Col>
                          <Col xl="2" lg="2" sm="12" md="12">
                            <FormGroup className="pt-3" >
                              <Label/>
                              <Button
                                style={{minWidth:'100%',float:'right'}}
                                color="info"
                                size="lg"
                                onClick={()=>onSubmit()}>SEARCH</Button>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                    </CardTitle>
                    <CardSubtitle className="text-right pr-3 pt-2">
                      
                      <div>
                        <span style={styles.normalGird}>[ Data Count: {data.length}건 / {totCnt}건 ]</span>
                          <Link to={{pathname: `/booking`, state: {user_no:'', bkg_no:'', bkg_date:''}}}>
                            <Button color="info" id="new" outline type="button" size="sm" className="ml-3" outline>
                              <i className="fa fa-plus">
                              </i>
                              NEW
                            </Button>
                          </Link>
                          <UncontrolledTooltip delay={0} target="new">Create Booking</UncontrolledTooltip>
                      </div>
                    </CardSubtitle>
                    <CardBody className="pt-2 pb-2">
                      <Row className="bg-light pb-2 pt-2 hover-overlay">
                        <Col xl="3" lg="4" md="6" sm="12"  xs="12">
                          <Row>
                            <Col className="text-center pt-3 border-right" xl="3" lg="3" md="3" sm="3"  xs="3" style={styles.normalGird}>#</Col>
                            <Col className="text-center pt-3 border-right" xl="3" lg="3" md="3" sm="3"  xs="3" style={styles.normalGird}>BKG NO </Col>
                            <Col className="text-center pt-3 border-right" xl="3" lg="3" md="3" sm="3"  xs="3" style={styles.normalGird}>BKG DATE</Col>
                            <Col className="text-center pt-3 border-right" xl="3" lg="3" md="3" sm="3"  xs="3" style={styles.normalGird}>STATUS CUS</Col>
                            
                          </Row>
                        </Col>
                        <Col xl="3" lg="4" md="6" sm="12"  xs="12">
                          <Row>
                            
                            <Col className="text-center pt-3 border-right" xl="3" lg="3" md="3" sm="3"  xs="3" style={styles.normalGird}>RES BKG NO</Col>
                            <Col className="text-center pt-3 border-right" xl="3" lg="3" md="3" sm="3"  xs="3" style={styles.normalGird}>RES CONFIRM DATE</Col>
                            <Col className="text-center pt-3 border-right" xl="3" lg="3" md="3" sm="3"  xs="3" style={styles.normalGird}>SCH VESSEL NAME</Col>
                            <Col className="text-center pt-3 border-right" xl="3" lg="3" md="3" sm="3"  xs="3" style={styles.normalGird}>LINE NAME1</Col>
                          </Row>
                        </Col>
                        <Col xl="3" lg="4" md="6" sm="12"  xs="12">
                          <Row>
                            <Col className="text-center pt-3 border-right" xl="4" lg="4" md="4" sm="4"  xs="4" style={styles.normalGird}>SCH POL</Col>
                            <Col className="text-center pt-3 border-right" xl="4" lg="4" md="4" sm="4"  xs="4" style={styles.normalGird}>SCH POD</Col>
                            <Col className="text-center pt-3 border-right" xl="4" lg="4" md="4" sm="4"  xs="4" style={styles.normalGird}>SCH ETD</Col>
                            
                          </Row>
                        </Col>
                        <Col xl="3" lg="4" md="6" sm="12"  xs="12">
                          <Row>
                            <Col className="text-center pt-3 border-right" xl="4" lg="4" md="4" sm="4"  xs="4" style={styles.normalGird}>SEND DATE</Col>
                            <Col className="text-center pt-3 border-right" xl="4" lg="4" md="4" sm="4"  xs="4" style={styles.normalGird}>CARGO PACK QTY</Col>
                            <Col className="text-center pt-3 border-right" xl="4" lg="4" md="4" sm="4"  xs="4" style={styles.normalGird}>CNTR QTY</Col>
                          </Row>
                        </Col>
                      </Row>
                      {
                        data.length > 0 &&
                          <>
                              {data.map((value,index) => {
                                return(
                                  <Link key={index} to={{pathname: `/booking`, state: {user_no:value.user_no, bkg_no:value.bkg_no, bkg_date:value.bkg_date}}}>
                                    <Row  className="border-bottom pb-3">
                                      <Col xl="3" lg="4" md="6" sm="12"  xs="12">
                                        <Row>
                                          <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3"  xs="3">{value.rownum}</Col>
                                          <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3"  xs="3">{value.bkg_no}</Col>
                                          <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3"  xs="3">{value.bkg_date_format}</Col>
                                          <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3"  xs="3">{value.status_name}</Col>
                                        </Row>
                                      </Col>
                                      <Col xl="3" lg="4" md="6" sm="12"  xs="12">
                                        <Row>
                                          <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3"  xs="3">{value.res_bkg_no}</Col>
                                          <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3"  xs="3">{value.res_confirm_date}</Col>
                                          <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3"  xs="3">{value.sch_vessel_name}</Col>
                                          <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3"  xs="3">{value.line_name1}</Col>
                                        </Row>
                                      </Col>
                                      <Col xl="3" lg="4" md="6" sm="12"  xs="12">
                                        <Row>
                                          <Col className=" text-center pt-3" xl="4" lg="4" md="4" sm="4"  xs="4"><span data-html="true" data-toggle="tooltip" title={value.sch_pol_name} >{value.sch_pol}</span>
                                          </Col>
                                          <Col className=" text-center pt-3" xl="4" lg="4" md="4" sm="4"  xs="4"><span data-html="true" data-toggle="tooltip" title={value.sch_pod_name} >{value.sch_pod}</span>
                                          </Col>
                                          <Col className=" text-center pt-3" xl="4" lg="4" md="4" sm="4"  xs="4">{value.sch_etd}</Col>
                                          
                                        </Row>
                                      </Col>
                                      <Col xl="3" lg="4" md="6" sm="12"  xs="12">
                                        <Row>
                                          <Col className=" text-center pt-3" xl="4" lg="4" md="4" sm="4"  xs="4">{value.send_date_format}</Col>
                                          <Col className=" text-center pt-3" xl="4" lg="4" md="4" sm="4"  xs="4">{value.cargo_pack_qty}</Col>
                                          <Col className=" text-center pt-3" xl="4" lg="4" md="4" sm="4"  xs="4">{value.cntr_qty}</Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                </Link>
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




             