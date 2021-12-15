/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
     Button,FormGroup,Label,Input, Card, UncontrolledTooltip,FormFeedback} from "reactstrap";
import Select from "react-select";
import CarrierBookmark from './CarrierBookmark.js';
import Carrier from './Carrier.js';
import axios from 'axios';
import InputValid from "components/CustomInput/InputValid.js";

let carrierData = {};

const CarrierCard = (props) => {

  const {bookmark,loadData,openWindow,validation} = props;

  // Collapse Flag
  const [coll, setColl] = useState(false);
  const [bookmarkView, setBookmarkView] = useState(false);
  // modal 창을 위한 state
  const [open, setOpen] = useState(false);
  

 // const [nestedModal, setNestedModal] = useState(false);
 // const [closeAll, setCloseAll] = useState(false);
  const [carrier, setCarrier] = useState([]);
  const [propsData, setPropsData] = useState([]);
  const [modalTitle, setModalTitle] = useState("Carrier Info");
  
  
	  useEffect(() => {
		    setCarrier(loadData);
		  },[loadData]);
	  
	  useEffect(() => {
		    setColl(openWindow);
		  },[openWindow]);
	  
  const toggle = (params) => {
      
	  if(params==='B') {
		  setClsNm('');
		  setModalTitle("Carrier BookMark");
		  props.onLoadData("sh");
		  setPropsData({...loadData,'line_bookmark_seq':'','line_bookmark_name':'','line_name1':'',
				'line_name2':'',
				'line_address1':'',
				'line_address2':'',
				'line_address3':'',
				'line_address4':'',
				'line_address5':'','line_payment_type':''});
		  carrierData=loadData;
		  setBookmarkView(true);
	  } else {
		  setClsNm('');
		  setModalTitle("Carrier Info");
		  setPropsData(loadData);
		  carrierData=loadData;
		  setBookmarkView(false);
	  }
      setOpen(!open);
  }
 
  const [clsNm, setClsNm] = useState("");
  
    // 자식의 Data 적용
	const onBookMarkData = (data) => {
		carrierData = data;
		
	}
	
	const onApplyData = ()=> {
		setOpen(!open);
		setCarrier(carrierData);
		props.mergeData(carrierData);
		setColl(true);	
	}
	
	
	const onSaveBookmark =()=> {

		
		if((carrierData.line_bookmark_name !=null || carrierData.line_bookmark_name !="")) {

			axios.post("/shipper/setUserLineBookmark",{user_no:props.user?props.user.user_no:'',data:carrierData},{})								
	  	  	.then(res => {
	  	  	              props.onLoadData("ca");
	  	  				  props.onAlert("success","정상 등록 되었습니다.");
	  	  	});
		} else {
			props.onAlert("error","line_bookmark_name는 필수 입력 항목 입니다.");
		}
	}
	

	
	const onChangeLine =(value)=> {

		setCarrier({...carrier,'line_bookmark_seq':value.value,'line_bookmark_name':value.label});
		
		axios.post("/shipper/getUserLineBookmark",{user_no:props.user?props.user.user_no:'',seq:value.value},{})								
  	  	.then(res => {
  	  				    const mergeData = Object.assign(carrier,res.data[0]);
  	  				    setCarrier(mergeData);
  	  					props.mergeData(mergeData);
  	  				    setColl(true);
  	  	});
	}
	
	const onInitData = () => {
		
		carrierData= {...propsData,'line_bookmark_seq':'','line_bookmark_name':'','line_name1':'',
				'line_name2':'',
				'line_address1':'',
				'line_address2':'',
				'line_address3':'',
				'line_address4':'',
				'line_address5':'',};
		setPropsData(carrierData);
	}
	
	
	const onBookMarkDelete = (data) => {

		axios.post("/shipper/setUserLineBookmarkDel",{user_no:props.user?props.user.user_no:'',data:data},{})								
  	  	.then(res => {
  	  				  props.onLoadData("ca");
  	  				  props.onAlert("success","선택한 BOOKMARK 가 삭제 되었습니다.");
  	  	});
		
	}
	
/*	const onSaveData = () => {
			props.mergeData(carrierData);
	}*/
	
	const onHandleReturnVal = (event,name) => {
		
	      
	      if(validation.getByte(event.target.value) < 36) {
	    	  let list = {...carrier, [name]:event.target.value};
			  setCarrier(list);
	      } else {
	    	  props.onAlert("error",validation.EXCD_MSG+"(35 Byte)");
	      }
		    
	  }
	
	
	const onPropsReturn = ()=> {
		props.mergeData(carrier);
	  }
	
	  const onHandleSelectReturnVal = (event,name) => {
	  	  
	  	  let list = {...carrier, [name]:event.target.value};
		  	setCarrier(list);
		  	props.mergeData(list);
	   }
	
  return (
    <>
        <Row id="Carrier">
            <Col xl="12" lg="12">
	            <Card style={{zIndex:'8'}}>
	            <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>  
                	<Row className="pb-2">
                		<Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>CARRIER
                			<Button className="pl-1" color="link" id="lineview" onClick={toggle.bind(this, 'S')}><i className="fa fa-pencil-square-o fa-2x"/></Button>
	  			            <UncontrolledTooltip delay={0} target="lineview">Input</UncontrolledTooltip>
	  			         </Col>
	                     <Col>
	                     	<Row>
	  	                   		<Col className="col-10 pr-0">
			  	                   	 <Select
								        className="react-select react-select-primary"
								        classNamePrefix="react-select"
								        name="carrierbookmark"
								        value={{value:carrier.line_bookmark_seq,label:carrier.line_bookmark_name}}
								        onChange={(value)=>onChangeLine(value)}
								        options={bookmark}
								        placeholder={"선택"}
								    />
	  						 </Col>
	  						 <Col className="col-2 pl-auto pr-auto">
	  						 	<Button className="pl-0 pr-0" color="link" id="linebookmark" onClick={toggle.bind(this, 'B')}><i className="fa fa-bookmark-o fa-2x" /></Button>
	  						    <UncontrolledTooltip delay={0} target="linebookmark">Bookmark</UncontrolledTooltip>
	  						  </Col>			
	  					   </Row>
	  	              </Col>
	  	              </Row>
				        <Collapse isOpen={coll} className="pb-1"> 
				        	<hr className="mt-0"/>
				        		<Row style={{fontSize:'12px'}}>
				        		<Col xl="12" lg="12" md="12">
			                    <FormGroup className="mb-1">
			                        <Row>
			                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0">Name</Label></Col>
			                        	<Col>
			        		            <InputValid 
			                            type="text"
			                            bsSize="sm"
			                            name="line_name1"
			                            id="line_name1"
			                            placeholder=""
			                            maxLength="35"
			                            value={carrier.line_name1?carrier.line_name1:''}
			                            onChange={(e)=>onHandleReturnVal(e, 'line_name1')}
			                            onBlur={onPropsReturn}
			                            validtype="text" 
			                            required={true}
			                        />
			                        
			                            	{/*<Input type="text" bsSize="sm" name="line_name1" id="line_name1" placeholder=""
				                        	invalid={!carrier.line_name1?true:false}
				                        	value={carrier.line_name1?carrier.line_name1:''} onChange = {(event)=>onHandleReturnVal(event,'line_name1')} 
				                        	onBlur={onPropsReturn}
				                        	/>
				                        	<FormFeedback>{validation.REQ_MSG}</FormFeedback>
*/}			                            	
			                            </Col>
			                        </Row>
			                     </FormGroup>
			                </Col>
		                	<Col xl="12" lg="12" md="12">
			                    <FormGroup className="mb-1">
			                        <Row>
			                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0"></Label></Col>
			                        	<Col>
			        		            <InputValid 
				                            type="text"
				                            bsSize="sm"
				                            name="line_name2"
				                            id="line_name2"
				                            placeholder=""
				                            maxLength="35"
				                            value={carrier.line_name2?carrier.line_name2:''}
				                            onChange={(e)=>onHandleReturnVal(e, 'line_name2')}
				                            onBlur={onPropsReturn}
				                            validtype="text" 
				                            required={false}
				                        />
			                            	{/*<Input type="text" bsSize="sm" name="line_name2" id="line_name2" placeholder=""
				                        	value={carrier.line_name2?carrier.line_name2:''} onChange = {(event)=>onHandleReturnVal(event,'line_name2')} 
				                        	onBlur={onPropsReturn}
				                        	/>
*/}			                            </Col>
			                        </Row>
			                     </FormGroup>
			                </Col> 
			                <Col xl="12" lg="12" md="12">
		                    <FormGroup className="mb-1">
		                        <Row>
		                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0">Ocean Freight</Label></Col>
		                        	<Col>
			                        	<Input type="select"  bsSize="sm" className="pt-0 pb-0" value={carrier.line_payment_type?carrier.line_payment_type:''} 
			                        			onChange = {(event)=>onHandleSelectReturnVal(event,'line_payment_type')}
			                        	        invalid={!carrier.line_payment_type?true:false}
			                        	>
							                <option value="">선택</option>
							                <option value="P">PREPAID</option>
								      		<option value="C">COLLECTED</option>
								         </Input>
		                            <FormFeedback>{validation.REQ_MSG}</FormFeedback>	
		                            </Col>
		                        </Row>
		                     </FormGroup>
		                </Col>
				    	        <Col xl="12" lg="12" md="12">
				    	            <FormGroup className="mb-1">
					    	            <Row>
				                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0">Address</Label></Col>
				                        	<Col>
				                        	<InputValid 
					                            type="text"
					                            bsSize="sm"
					                            name="line_address1"
					                            id="line_address1"
					                            placeholder=""
					                            maxLength="35"
					                            value={carrier.line_address1?carrier.line_address1:''}
					                            onChange={(e)=>onHandleReturnVal(e, 'line_address1')}
					                            onBlur={onPropsReturn}
					                            validtype="text" 
					                            required={true}
					                        />
					                        
					                        	{/*<Input bsSize="sm" type="text" name="line_address1" id="line_address1" placeholder=""
					                        		invalid={!carrier.line_address1?true:false}
						    	                	value={carrier.line_address1?carrier.line_address1:''}  
					                        	     onChange = {(event)=>onHandleReturnVal(event,'line_address1')} onBlur={onPropsReturn}
						    	                /> <FormFeedback>{validation.REQ_MSG}</FormFeedback>	
*/}					                        	
					                        	</Col>
					                     </Row>
				    	            </FormGroup>
				    	        </Col>
				    	        <Col xl="12" lg="12" md="12">
				    	            <FormGroup className="mb-1">
					    	            <Row>
				                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0"></Label></Col>
				                        	<Col>
				                        	<InputValid 
					                            type="text"
					                            bsSize="sm"
					                            name="line_address2"
					                            id="line_address2"
					                            placeholder=""
					                            maxLength="35"
					                            value={carrier.line_address2?carrier.line_address2:''}
					                            onChange={(e)=>onHandleReturnVal(e, 'line_address2')}
					                            onBlur={onPropsReturn}
					                            validtype="text" 
					                            required={false}
					                        />
					                        	{/*<Input bsSize="sm" type="text" name="line_address2" id="line_address2" placeholder="" 
						    	                	value={carrier.line_address2?carrier.line_address2:''}  
					                        	 onChange = {(event)=>onHandleReturnVal(event,'line_address2')} onBlur={onPropsReturn}	
						    	                />*/}
					                        </Col>
					                     </Row>
				    	            </FormGroup>
				    	        </Col>
				    	        <Col xl="12" lg="12" md="12">
				    	            <FormGroup className="mb-1">
					    	            <Row>
				                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0"></Label></Col>
				                        	<Col>
				                        	<InputValid 
					                            type="text"
					                            bsSize="sm"
					                            name="line_address3"
					                            id="line_address3"
					                            placeholder=""
					                            maxLength="35"
					                            value={carrier.line_address3?carrier.line_address3:''}
					                            onChange={(e)=>onHandleReturnVal(e, 'line_address3')}
					                            onBlur={onPropsReturn}
					                            validtype="text" 
					                            required={false}
					                        />
					                        {	/*<Input bsSize="sm" type="text" name="line_address3" id="line_address3" placeholder="" 
						    	                	value={carrier.line_address3?carrier.line_address3:''}  
					                        	 onChange = {(event)=>onHandleReturnVal(event,'line_address3')} onBlur={onPropsReturn}	
						    	                />
*/	}				                        </Col>
					                     </Row>
				    	            </FormGroup>
				    	        </Col>
				    	        <Col xl="12" lg="12" md="12">
				    	            <FormGroup className="mb-1">
					    	            <Row>
				                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0"></Label></Col>
				                        	<Col>
				                        	<InputValid 
					                            type="text"
					                            bsSize="sm"
					                            name="line_address4"
					                            id="line_address4"
					                            placeholder=""
					                            maxLength="35"
					                            value={carrier.line_address4?carrier.line_address4:''}
					                            onChange={(e)=>onHandleReturnVal(e, 'line_address4')}
					                            onBlur={onPropsReturn}
					                            validtype="text" 
					                            required={false}
					                        />
					                        	{/*<Input bsSize="sm" type="text" name="line_address4" id="line_address4" placeholder="" 
						    	                	value={carrier.line_address4?carrier.line_address4:''}  
					                        	 onChange = {(event)=>onHandleReturnVal(event,'line_address4')} onBlur={onPropsReturn}	
						    	                />*/}
					                        </Col>
					                     </Row>
				    	            </FormGroup>
				    	        </Col>
				    	        <Col xl="12" lg="12" md="12">
				    	            <FormGroup className="mb-1">
					    	            <Row>
				                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0"></Label></Col>
				                        	<Col >
				                        	<InputValid 
					                            type="text"
					                            bsSize="sm"
					                            name="line_address5"
					                            id="line_address5"
					                            placeholder=""
					                            maxLength="35"
					                            value={carrier.line_address5?carrier.line_address5:''}
					                            onChange={(e)=>onHandleReturnVal(e, 'line_address5')}
					                            onBlur={onPropsReturn}
					                            validtype="text" 
					                            required={false}
					                        />
					                        	{/*<Input bsSize="sm" type="text" name="line_address5" id="line_address5" placeholder="" 
						    	                	value={carrier.line_address5?carrier.line_address5:''}  
					                        	 onChange = {(event)=>onHandleReturnVal(event,'line_address5')} onBlur={onPropsReturn}	
						    	                />
*/	}				                        </Col>
					                     </Row>
				    	            </FormGroup>
				    	        </Col>
				    	    </Row>
				        </Collapse>
				          <div className="text-center" onClick={() => setColl(!coll)}>
			              	<div>         
			                    <Button className="p-0" color="link" id="linemore" onClick={() => setColl(!coll)} style={{height:'21px'}}>
			                     {coll?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
					            </Button>
					            <UncontrolledTooltip delay={0} target="linemore">{coll?'Close':'Open'}</UncontrolledTooltip>
				            </div>
			            </div>
		            </CardBody>
		          </Card>    
            </Col>
        </Row>

        {/* 모달 팝업 영역 
        xs : 한 줄
        sm : 576px 에서 다음 줄로 넘어감
        md : 768px
        lg : 992px
        xl : 1200px
        fluid : 뷰포트 전체의 너비
        */}
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="lg" className="pt-0">
            <ModalHeader toggle={toggle} className="pt-3 pb-3">{modalTitle}</ModalHeader>
                <ModalBody className={clsNm}>
                    {bookmarkView?
                    	<CarrierBookmark bookmark={bookmark} loadFormData={propsData} onPropsLineBookmark={onBookMarkData} onPropsLineDeleteBookmark={onBookMarkDelete} {...props} />
                    :
                        <Carrier type="I" loadFormData={propsData} propsData={onBookMarkData} {...props} />
                     } 
                </ModalBody>
            <ModalFooter>
            <Button color="secondary" onClick={onInitData}>NEW</Button>{' '}
            {bookmarkView?<Button color="primary" onClick={onSaveBookmark}>SAVE</Button>:<Button color="primary" onClick={onApplyData}>APPLY</Button>}{' '}
                <Button color="secondary" onClick={()=>setOpen(!open)}>CANCLE</Button>
            </ModalFooter>
        </Modal>   
    </>
    );
}

export default CarrierCard;



