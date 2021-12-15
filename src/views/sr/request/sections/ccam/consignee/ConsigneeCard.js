/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
     Button,FormGroup,Label,Card, UncontrolledTooltip} from "reactstrap";
import Select from "react-select";
//import AlertModal from 'components/Modals/Alert.js';
import ConsigneeBookmark from '../../consignee/ConsigneeBookmark.js';
import Consignee from './Consignee.js';
import axios from 'axios';
import InputValid from "components/CustomInput/InputValid.js";
let consigneeData = {};

const ConsigneeCard = React.forwardRef((props,cConsFocus) => {
		

	const {bookmark,loadData,openWindow,validation,samec} = props;

	// Collapse Flag
	const [coll, setColl] = useState(false);
	const [bookmarkView, setBookmarkView] = useState(false);
	const [propsData, setPropsData] = useState([]);
	// modal 창을 위한 state
	const [open, setOpen] = useState(false);
	const [consignee, setConsignee] = useState([]);
	//const [openAlert, setOpenAlert] = useState(false);
	//const [conSamec, setConSamec] = useState(true);
	//const [consBookMark, setConsBookMark] = useState([]);
	
	const [modalTitle, setModalTitle] = useState("Consignee Info");
  
	useEffect(() => {
		setConsignee(loadData);
		   // props.mergeData({'cons_samec':conSamec});
	},[loadData]);
	  
	useEffect(() => {
		setColl(openWindow);
	},[openWindow]);
/*	  useEffect(() => {
		  setConSamec(samec);
	  },[samec]);*/

	const toggle = (params) => {
		
		if(params==='B') {
			setClsNm('');
			setModalTitle("Consignee BookMark");
			props.onLoadData("cs");
			setPropsData({...loadData,cons_bookmark_seq:'',consignee_bookmark_name:'',cons_code:consignee.c_cons_code,cons_name1:consignee.c_cons_name1,
					cons_name2:consignee.c_cons_name2,
					cons_address1:consignee.c_cons_address1,
					cons_address2:consignee.c_cons_address2,
					cons_address3:consignee.c_cons_address3,
					cons_address4:consignee.c_cons_address4,
					cons_address5:consignee.c_cons_address5,
					cons_user_name:consignee.c_cons_user_name,
					cons_user_tel:consignee.c_cons_user_tel,
					cons_country_code:consignee.c_cons_country_code});
			consigneeData=loadData;
			setBookmarkView(true);
		} else {
			setClsNm('');
			setModalTitle("Consignee Info");
			setPropsData(loadData);
			consigneeData=loadData;
			setBookmarkView(false);
		}
		setOpen(!open);
	}

  	const [clsNm, setClsNm] = useState("");
  
    // 자식의 Data 적용
	const onBookMarkData = (data) => {
		consigneeData = data;
	}
	
	const onApplyData = ()=> {
		setOpen(!open);
		var data = consigneeData;
		if(props.samec) {
			var cons = {'c_noti_name1':data.c_cons_name1,'c_noti_name2':data.c_cons_name2,'c_noti_address1':data.c_cons_address1,
						'c_noti_address2':data.c_cons_address2,'c_noti_address3':data.c_cons_address3,
						'c_noti_address4':data.c_cons_address4,'c_noti_address5':data.c_cons_address5};
			data = {...consigneeData,...cons};
		}
		setConsignee(data);
		props.mergeData(data);
		setColl(true);
		//props.setWindow(true);
	}


	const onSaveBookmark =()=> {

		if((consigneeData.consignee_bookmark_name !==null && consigneeData.consignee_bookmark_name !=="") ) {

			axios.post("/shipper/setUserConsBookmark",{user_no:props.user?props.user.user_no:'',data:consigneeData},{}).then(res => {
				props.onLoadData("cs");
				props.onAlert("success","작성한 BOOKMARK 가 등록 되었습니다.");
	  	                 
	  	  	});
		} else {
			props.onAlert("error","consignee_bookmark_name 는 필수 입력 항목 입니다.");
		}
	}
	
	const onChangeConsignee =(value)=> {

		if(value) {
			setConsignee({...consignee,'c_consignee_bookmark_seq':value.value,'c_consignee_bookmark_name':value.label});
			if(value.value > 0){
				axios.post("/shipper/getUserConsBookmark",{user_no:props.user?props.user.user_no:'',seq:value.value},{}).then(res => { 
					const list = {
						c_cons_name1:res.data[0].cons_name1?res.data[0].cons_name1:consignee.c_cons_name1,
						c_cons_name2:res.data[0].cons_name1?res.data[0].cons_name2:consignee.c_cons_name2,
						c_cons_user_name:res.data[0].cons_user_name?res.data[0].cons_user_name:consignee.c_cons_user_name,
						c_cons_user_tel:res.data[0].cons_user_tel?res.data[0].cons_user_tel:consignee.c_cons_user_tel,
						c_cons_code:res.data[0].cons_code?res.data[0].cons_code:consignee.c_cons_code,
						c_cons_country_code:res.data[0].cons_country_code?res.data[0].cons_country_code:consignee.c_cons_country_code,
						c_cons_address1:res.data[0].cons_address1?res.data[0].cons_address1:consignee.c_cons_address1,
						c_cons_address2:res.data[0].cons_address1?res.data[0].cons_address2:consignee.c_cons_address2,
						c_cons_address3:res.data[0].cons_address1?res.data[0].cons_address3:consignee.c_cons_address3,
						c_cons_address4:res.data[0].cons_address1?res.data[0].cons_address4:consignee.c_cons_address4,
						c_cons_address5:res.data[0].cons_address1?res.data[0].cons_address5:consignee.c_cons_address5,
					};
					const mergeData = Object.assign(consignee,list);	  
					setConsignee({...mergeData,'c_consignee_bookmark_seq':res.data[0].consignee_bookmark_seq,'c_consignee_bookmark_name':res.data[0].consignee_bookmark_name});
					props.mergeData({...mergeData,'c_consignee_bookmark_seq':res.data[0].consignee_bookmark_seq,'c_consignee_bookmark_name':res.data[0].consignee_bookmark_name});
					setColl(true);
				});
			}
		}else {
			setConsignee({
				...consignee,
				c_consignee_bookmark_seq:null,
				c_consignee_bookmark_name:null,
				c_cons_name1:null,
				c_cons_name2:null,
				c_cons_user_name:null,
				c_cons_user_tel:null,
				c_cons_code:null,
				c_cons_country_code:null,
				c_cons_address1:null,
				c_cons_address2:null,
				c_cons_address3:null,
				c_cons_address4:null,
				c_cons_address5:null,
			});
			props.mergeData({
				...consignee,
				c_consignee_bookmark_seq:null,
				c_consignee_bookmark_name:null,
				c_cons_name1:null,
				c_cons_name2:null,
				c_cons_user_name:null,
				c_cons_user_tel:null,
				c_cons_code:null,
				c_cons_country_code:null,
				c_cons_address1:null,
				c_cons_address2:null,
				c_cons_address3:null,
				c_cons_address4:null,
				c_cons_address5:null,
			});
		}
	}
	
	
	const onInitData = () => {
		consigneeData = null;
		consigneeData ={...propsData,'consignee_bookmark_seq':'','consignee_bookmark_name':'','cons_code':'','cons_name1':'',
				'cons_name2':'',
				'cons_address1':'',
				'cons_address2':'',
				'cons_address3':'',
				'cons_address4':'',
				'cons_address5':'',
				'cons_user_name':'',
				'cons_user_tel':'',
				'cons_user_fax':'',
				'cons_user_dep1':'',
				'cons_country_code':''};
		setPropsData(consigneeData);
	}
	
	const onBookMarkDelete = () => {
		if(consigneeData && consigneeData.consignee_bookmark_seq) {
			axios.post("/shipper/setUserConsBookmarkDel",{user_no:props.user?props.user.user_no:'',data:consigneeData},{}).then(res => {
				onInitData();
				props.onLoadData("cs");
				props.onAlert("success","선택한 BOOKMARK 가 삭제 되었습니다.");
			});
		} else {
			props.onAlert("error","삭제 할 BOOKMARK를 선택해주세요.");
		}
		
	}
	
	//const onSaveData = () => {
	//	props.mergeData(consignee);
	//}
	
	const onHandleReturnVal = (event,name) => {
		let list = {...consignee, [name]:event.target.value.toUpperCase()};
		setConsignee(list);  
	}
	
	
	const onPropsReturn = ()=> {
		
		var data = consignee;
		//if(props.samec) {
		//	var cons = {'c_noti_name1':'SAME AS CONSIGNEE'};
		//	data = {...consignee,...cons};
		//}
		props.mergeData(data);
	}
	
	//const onConsSamec = ()=>{
//		props.onSetSamec();
	//}
	
	const onCopyProps=()=>{
		var list = {c_cons_name1:loadData.cons_name1,c_cons_name2:loadData.cons_name2,c_cons_address1:loadData.cons_address1,
				    c_cons_address2:loadData.cons_address2,c_cons_address3:loadData.cons_address3,c_cons_address4:loadData.cons_address4,
				    c_cons_address5:loadData.cons_address5}
		props.mergeData(list);
		//props.onAlert("success","Consignee 데이터가 복사 되었습니다.");
	}
	
  	return (
    <>
        <Row id="Consignee">
            <Col xl="12" lg="12">
	            <Card style={{zIndex:'2',border:'1px solid silver',borderRadius:'10px'}}>
	            	<CardBody className="pt-3 pb-0" >  
	            	<Row>
		               <Col xl="5" className="mt-2 mb-0 pr-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>CONSIGNEE
		               <Button className="pl-1" color="link" id="consview" onClick={toggle.bind(this, 'S')}><i className="fa fa-pencil-square-o fa-2x"/></Button>
 			            <UncontrolledTooltip delay={0} target="consview">Input</UncontrolledTooltip>
 			         </Col>
                    <Col>
                    	<Row>
 	                   		<Col className="col-10 pr-0">
		 	                   	<Select
							        className="react-select react-select-primary"
							        classNamePrefix="react-select"
							        name="carrierbookmark"
							        value={{value:consignee.c_consignee_bookmark_seq?consignee.c_consignee_bookmark_seq:'',label:consignee.c_consignee_bookmark_name?consignee.c_consignee_bookmark_name:''}}
							        onChange={(value)=>onChangeConsignee(value)}
							        options={bookmark}
							        placeholder="선택"
		 	                        ref={cConsFocus}
									isClearable={consignee.c_consignee_bookmark_seq?true:false}/>
 						 </Col>
 						 <Col className="col-2 pl-auto pr-auto">
 						 	<Button className="pl-0 pr-0" color="link" id="consbookmark" onClick={toggle.bind(this, 'B')}><i className="fa fa-bookmark-o fa-2x" /></Button>
 						    <UncontrolledTooltip delay={0} target="consbookmark">Bookmark</UncontrolledTooltip>
 						  </Col>			
 					   </Row>
 	              </Col>
 	           </Row>
	    	    <Col className="col-12 text-right pr-0">
		    	  
	                <Label check className="p1-1">	               
	                  <span className="form-check-sign" />
	                	  <Button color="default"  type="button" className="btn-link pr-0 pt-0 pb-0" onClick={()=>onCopyProps()}>Copy Consignee</Button>
	                </Label>

	            </Col>
				        <Collapse isOpen={coll}>
				        {/* <div style={divider}/> */}
				            {/* 보이는 영역 */}
				            	<hr className="mt-0"/>
				            		<Row >
				        		<Col xl="12" lg="12" md="12">
				                    <FormGroup className="mb-1">
				                        <Row>
				                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0">상호</Label></Col>
				                        	<Col>
				                        	<InputValid 
					    		                type="text"
					    		                bsSize="sm"
					    		                name="c_cons_name1"
					    		                id="c_cons_name1"
					    		                placeholder=""
					    		                maxLength="35"
					    		                value={consignee.c_cons_name1?consignee.c_cons_name1:''}
					    		                onChange={(e)=>onHandleReturnVal(e, 'c_cons_name1')}
					    		                onBlur={onPropsReturn}
					    		                validtype="text" 
					    		                required={true}
					    		            />
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
						    		                name="c_cons_name2"
						    		                id="c_cons_name2"
						    		                placeholder=""
						    		                maxLength="35"
						    		                value={consignee.c_cons_name2?consignee.c_cons_name2:''}
						    		                onChange={(e)=>onHandleReturnVal(e, 'c_cons_name2')}
						    		                onBlur={onPropsReturn}
						    		                validtype="text" 
						    		                required={false}
						    		            />
				                            </Col>
				                        </Row>
				                     </FormGroup>
				                </Col> 
					              <Col xl="6" lg="6" md="6">
				    	            <FormGroup className="mb-1">
					    	            <Row>
				                        	<Col className="pr-0 pt-1 col-4"><Label className="mb-0">담당자이름</Label></Col>
				                        	<Col>
					                        	<InputValid 
						         	                type="text"
						         	                bsSize="sm"
						         	                name="c_cons_user_name"
						         	                id="c_cons_user_name"
						         	                placeholder=""
						         	                maxLength="17"
						         	                value={consignee.c_cons_user_name?consignee.c_cons_user_name:''}
						         	                onChange={(e)=>onHandleReturnVal(e, 'c_cons_user_name')}
						         	                onBlur={onPropsReturn}
						         	                validtype="text" 
						         	                required={true}
						         	               feedid="shipper2"
						         	            />
					                        	</Col>
					                     </Row>
				    	            </FormGroup>
				    	        </Col>
				    	        <Col xl="12" lg="12" md="12">
			    	            <FormGroup className="mb-1">
				    	            <Row>
			                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0">주소</Label></Col>
			                        	<Col>
				                        	<InputValid 
					    		                type="text"
					    		                bsSize="sm"
					    		                name="c_cons_address1"
					    		                id="c_cons_address1"
					    		                placeholder=""
					    		                maxLength="35"
					    		                value={consignee.c_cons_address1?consignee.c_cons_address1:''}
					    		                onChange={(e)=>onHandleReturnVal(e, 'c_cons_address1')}
					    		                onBlur={onPropsReturn}
					    		                validtype="text" 
					    		                required={true}
					    		            />
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
					    		                name="c_cons_address2"
					    		                id="c_cons_address2"
					    		                placeholder=""
					    		                maxLength="35"
					    		                value={consignee.c_cons_address2?consignee.c_cons_address2:''}
					    		                onChange={(e)=>onHandleReturnVal(e, 'c_cons_address2')}
					    		                onBlur={onPropsReturn}
					    		                validtype="text" 
					    		                required={false}
					    		            />
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
					    		                name="c_cons_address3"
					    		                id="c_cons_address3"
					    		                placeholder=""
					    		                maxLength="35"
					    		                value={consignee.c_cons_address3?consignee.c_cons_address3:''}
					    		                onChange={(e)=>onHandleReturnVal(e, 'c_cons_address3')}
					    		                onBlur={onPropsReturn}
					    		                validtype="text" 
					    		                required={false}
					    		            />
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
					    		                name="c_cons_address4"
					    		                id="c_cons_address4"
					    		                placeholder=""
					    		                maxLength="35"
					    		                value={consignee.c_cons_address4?consignee.c_cons_address4:''}
					    		                onChange={(e)=>onHandleReturnVal(e, 'c_cons_address4')}
					    		                onBlur={onPropsReturn}
					    		                validtype="text" 
					    		                required={false}
					    		            />
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
					    		                name="c_cons_address5"
					    		                id="c_cons_address5"
					    		                placeholder=""
					    		                maxLength="35"
					    		                value={consignee.c_cons_address5?consignee.c_cons_address5:''}
					    		                onChange={(e)=>onHandleReturnVal(e, 'c_cons_address5')}
					    		                onBlur={onPropsReturn}
					    		                validtype="text" 
					    		                required={false}
					    		            />
				                        </Col>
				                     </Row>
			    	            </FormGroup>
			    	        </Col>
				    	        <Col xl="6" lg="6" md="6">
				    	            <FormGroup className="mb-1">
					    	            <Row>
				                        	<Col className="pr-0 pt-1 col-4"><Label className="mb-0">연락처</Label></Col>
				                        	<Col>
					                        	<InputValid 
						         	                type="text"
						         	                bsSize="sm"
						         	                name="c_cons_user_tel"
						         	                id="c_cons_user_tel"
						         	                placeholder=""
						         	                maxLength="35"
						         	                value={consignee.c_cons_user_tel?consignee.c_cons_user_tel:''}
						         	                onChange={(e)=>onHandleReturnVal(e, 'c_cons_user_tel')}
						         	                onBlur={onPropsReturn}
						         	                validtype="tel" 
						         	                required={true}
						         	               feedid="shipper2"
						         	            />
					                        	</Col>
					                     </Row>
				    	            </FormGroup>
				    	        </Col>
				    	        <Col xl="6" lg="6" md="6">
				    	            <FormGroup className="mb-1">
					    	            <Row>
				                        	<Col className="pr-0 pt-1 col-4"><Label className="mb-0">사업자코드</Label></Col>
				                        	<Col>
					                        	<InputValid 
						         	                type="text"
						         	                bsSize="sm"
						         	                name="c_cons_code"
						         	                id="c_cons_code"
						         	                placeholder=""
						         	                maxLength="18"
						         	                value={consignee.c_cons_code?consignee.c_cons_code:''}
						         	                onChange={(e)=>onHandleReturnVal(e, 'c_cons_code')}
						         	                onBlur={onPropsReturn}
						         	                validtype="text" 
						         	                required={true}
						         	               feedid="shipper2"
						         	            />
					                        	</Col>
					                     </Row>
				    	            </FormGroup>
				    	        </Col>
				    	        <Col xl="6" lg="6" md="6">
				    	            <FormGroup className="mb-1">
					    	            <Row>
				                        	<Col className="pr-0 pt-1 col-4"><Label className="mb-0">국가코드</Label></Col>
				                        	<Col>
					                        	<InputValid 
						         	                type="text"
						         	                bsSize="sm"
						         	                name="c_cons_country_code"
						         	                id="c_cons_country_code"
						         	                placeholder=""
						         	                maxLength="2"
						         	                value={consignee.c_cons_country_code?consignee.c_cons_country_code:''}
						         	                onChange={(e)=>onHandleReturnVal(e, 'c_cons_country_code')}
						         	                onBlur={onPropsReturn}
						         	                validtype="text" 
						         	                required={true}
						         	               feedid="shipper2"
						         	            />
					                        	</Col>
					                     </Row>
				    	            </FormGroup>
				    	        </Col>
					    	        
					    	    </Row>
				        </Collapse>
				        </CardBody>
				        <Col className="text-center col-12 p-0" onClick={() => setColl(!coll)}>          
			                    <Button
					              className="p-0"
					              color="link"
					              id="consmore"
					              onClick={() =>setColl(!coll)}
			                    style={{height:'21px',marginBottom:'4px',width:'100%'}}
					          >
			                   {coll?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
					          </Button>
					          <UncontrolledTooltip delay={0} target="consmore">{coll?'Close':'Open'}</UncontrolledTooltip>
					          </Col>
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
        <Modal isOpen={open} toggle={toggle} className={clsNm+" pt-0"} size="lg">
            <ModalHeader toggle={toggle} className="pt-3 pb-3">{modalTitle}</ModalHeader>
                <ModalBody className={clsNm}>
                    {bookmarkView?
                    	<ConsigneeBookmark type="C" bookmark={bookmark} loadData={propsData} onPropsConsBookmark={onBookMarkData} onPropsConsDeleteBookmark={onBookMarkDelete} validation={validation}/>
                    :
                        <Consignee
                            loadData={propsData} propsData={onBookMarkData} validation={validation}/>
                     } 
                </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={onInitData}>NEW</Button>{' '}
            {bookmarkView?
				<>
					<Button color="primary" onClick={onSaveBookmark}>SAVE</Button>
					<Button color="primary" onClick={onBookMarkDelete}>DELETE</Button>
				</>
			:<Button color="primary" onClick={onApplyData}>APPLY</Button>}{' '}
                <Button color="secondary" onClick={()=>setOpen(!open)}>CANCLE</Button>
            </ModalFooter>
        </Modal>
    </>
    );
});

export default ConsigneeCard;



