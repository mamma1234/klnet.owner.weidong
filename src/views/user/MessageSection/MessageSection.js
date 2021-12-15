import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import {Row, Col, Card, Container, CardBody, FormGroup, Label, Input,Button,Alert} from "reactstrap";
import axios from "axios";
import moment from 'moment';
import {CustomDatePicker} from 'components/CustomInput/CustomInput.js';

/*const styles = {
    headerText: {
        fontSize:'16px',
        color:'#5f6368',
        fontFamily:'Roboto,Arial,sans-serif',
        marginBottom:'5px'

    },bodyText:{
        fontSize:'19px',
        color:'#5f6368',
        fontFamily:'Roboto,Arial,sans-serif',
        marginBottom:'5px'

    }
}*/
var curPage = 1;
export default function UserSection(props) {
   // const history = useHistory();
    const from = new Date();
    const [fromDate,setFromDate] = React.useState(from.setDate(from.getDate()-10));
    const [toDate,setToDate] = React.useState(new Date());
    const [message,setMessage] = React.useState("");
    const [msgData,setMsgData] = React.useState([]);
    const [totalCnt,setTotalCnt] = React.useState(0);

    useEffect(()=> {
       if(props.user) {
    	    curPage=1;
        	onReadUserMessage(props.user.user_no);
       }
       /* }else {
            alert('페이지 접근 권한이 없습니다.');
            props.history.push('/weidongIndex');
        }*/
    },[props.user])

    const onReadMessage = (data,flag) => {
    	if(msgData.length > 0) {
    		axios.post("/shipper/setUserReadMeassage",{user_no:props.user?props.user.user_no:'',data:{'seq':data,'flag':flag}})
    		.then(res =>{onReadUserMessage();});
    	}
    }
    
    const onReadUserMessage = () => {
  	  axios.post("/shipper/getUserMessage",{user_no:props.user?props.user.user_no:'',from:moment(fromDate).format('YYYYMMDD'),to:moment(toDate).format('YYYYMMDD'),message:message,curpage:curPage})
        .then(res => {
                 var data = res.data;
                 if(data) {
                 			if(Number(curPage) > 1 ) {
                 				setMsgData([...msgData,...data]);
                 			} else {
                 				setMsgData(data);
                 			}
                 			setTotalCnt(Number(data.length>0?data[0].total_count:0))
                 } else {
                   setMsgData([]);
                   setTotalCnt(0);
                 }
        });
    }
    
    const onHandleNext =(total) => {
    	if(Number(curPage) !== Number(total)) {
	    	curPage++;
	    	onReadUserMessage();
    	}
    }
    
    return (
       <>	
        <div className="section section-white">	
            <Container>
 
                    <Row>
                        <Col className="ml-auto mr-auto mb-3 pb-3" xl="12">
                            <span style={{fontSize:'24px',fontWeight:'bold', color:'#333333'}} className="mt-5 text-center">
                                MESSAGE
                            </span>
                        </Col>
                    </Row>
                    <Card className="card-raised card-form-horizontal no-transition position-static">
	                    <CardBody >
		                    <Row className="mr-4 ml-4 pr-2 pl-2 mt-2">
	                    	<Col xl="3">
		        		        <FormGroup className="mb-2">
		    		            	<Label className="mb-0">From</Label>
		    		            	<CustomDatePicker
		    	                      id="toDate"
		    	                      dateFormat="YYYY-MM-DD"
		    	                      timeFormat={false}
		    	                      value={fromDate}
		    	                      onChange={(date)=>setFromDate(date)}
		    	                      />
		    		            </FormGroup>
		    		        </Col>
		                    	<Col xl="3">
			        		        <FormGroup className="mb-2">
			    		            	<Label className="mb-0">To</Label>
			    		            	<CustomDatePicker
			    	                      id="toDate"
			    	                      dateFormat="YYYY-MM-DD"
			    	                      timeFormat={false}
			    	                      value={toDate}
			    	                      onChange={(date)=>setToDate(date)}
			    	                      />
			    		            </FormGroup>
			    		        </Col>
			    		        <Col xl="4">
				    		        <FormGroup className="mb-2">
					            		<Label className="mb-0">Message</Label>
					            		<Input type="text" name="message" id="message" placeholder=""  onChange = {(event)=>setMessage(event.target.value)} value={message}
				    		            />
					            		</FormGroup>
					            </Col>
					            <Col className="ml-auto mt-auto mb-auto text-right">
					                <Button className="btn-magnify btn-round mr-1" color="default" onClick={()=>{curPage=1;setMsgData([]);onReadUserMessage()}}>
					                  <i className="nc-icon nc-zoom-split mr-1" />
					                  Search
					                </Button>
					            </Col>
		                    </Row>
	                    </CardBody>
                    </Card>
                    <Row className="mr-2 ml-2 mt-2">
                    	<Col className="col-2 pt-2 pb-2 text-left"> Total Cnt : {totalCnt} 건 </Col>
                   {/* 	<Col className="col-2 pt-2 pb-2 ml-auto text-right">
	                    	 <Button className="btn-link" color="info" type="button" onClick={()=>onReadMessage(null,'A')}>
	                    	 All Read
	                       </Button>
                          </Col>*/}
                    </Row>  
                    <Card className="card-raised card-form-horizontal no-transition position-static">
	                    <CardBody >
		                    <Row className="mr-4 ml-4 pr-2 pl-2 mt-2">
		                        	{msgData.length > 0? msgData.map((data,key)=> (
		                        	<Col xl="12" className="text-left pr-0 pl-0 pb-1">
				                        <Alert
				                        className="alert-with-icon mb-1"
				                        color={data.read_yn ==="N"?"info":"secondary"}
				                        //isOpen={alertDanger}
				                        >
				                        <Container>
				                          <div className="alert-wrapper">
				                            <div className="message text-dark">
				                              <i className="nc-icon nc-bell-55 pr-2" />{data.message}
				                              <br />
				                              <span className="time pl-4" style={{fontSize:'12px'}}>*Reg Date:{moment(data.message_insert_date).format('YYYY-MM-DD hh:mm')} {' *Read Date:'} {data.read_date}</span>
				                            </div>
				                          </div>
				                        </Container>
				                      </Alert>
			                      </Col>
		                        	)):<Col xl="12"> No message </Col>}
		                          {msgData.length > 0?
		                        		  <Col xl="12" className="text-center">
					                          <Button className="btn-round mr-1" color="default" outline type="button" onClick={(()=>onHandleNext(msgData[0].tot_page))}>NEXT{' '}{curPage+"/"+msgData[0].tot_page}</Button>
		                          		  </Col>:<></>}
		                        </Row>
	                        </CardBody>
                        </Card>
            </Container>
        </div>
        </>
        
    )
}




             