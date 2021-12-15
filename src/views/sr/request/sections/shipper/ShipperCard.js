/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
     Button,FormGroup,Label,Card,UncontrolledTooltip} from "reactstrap";
import Select from "react-select";
import ShipperBookmark from './ShipperBookmark.js';
import Shipper from './Shipper.js';
import axios from 'axios';
import InputValid from "components/CustomInput/InputValid.js";
let shipperData = {};

const ShipperCard = React.forwardRef((props,shipperFocus) => {

	const {bookmark,loadData,openWindow,validation} = props;

	// Collapse Flag
	const [coll, setColl] = useState(false);
	const [bookmarkView, setBookmarkView] = useState(false);
	// modal 창을 위한 state
	const [open, setOpen] = useState(false);
	//const [openAlert, setOpenAlert] = useState(false);
	//const [color, setColor] = React.useState("");
	//const [message, setMessage] = React.useState("");
	//const [nestedModal, setNestedModal] = useState(false);
	//const [closeAll, setCloseAll] = useState(false);
	const [shipper, setShipper] = useState([]);
	const [propsData, setPropsData] = useState([]);
	const [modalTitle, setModalTitle] = useState("Shipper Info");
	//const [shipperCompanyList, setShipperCompanyList] = useState([]);
	//const [isLoading,setIsLoading] = React.useState(false);
	
  
	useEffect(() => {
		setShipper(loadData);
	},[loadData]);
	  
/*	  useEffect(() => { 
			if(props.user) {
				setIsLoading(true);
				selectShipperCompanyListByUser();
			}		    
	},[props.user]);*/
	  
	useEffect(() => {
		setColl(openWindow);
	},[openWindow]);
	  
  	const toggle = (params) => {
      
		if(params==='B') {
			setModalTitle("Shipper BookMark");
			props.onLoadData("sh");
			setPropsData({...loadData,'shipper_bookmark_seq':'','shipper_bookmark_name':'','shp_code':shipper.shp_code,'shp_name1':shipper.shp_name1,
					'shp_name2':shipper.shp_name2,
					'shp_address1':shipper.shp_address1,
					'shp_address2':shipper.shp_address2,
					'shp_address3':shipper.shp_address3,
					'shp_address4':shipper.shp_address4,
					'shp_address5':shipper.shp_address5,
					'shp_user_name':'',
					'shp_user_tel':'',
					'sch_user_fax':'',
					'sch_user_dep1':'',
					'sch_user_email':''});
			shipperData=loadData;
			setBookmarkView(true);
		} else {
			setModalTitle("Shipper Info");
			setPropsData(loadData);
			shipperData=loadData;
			setBookmarkView(false);
		}
		setOpen(!open);
	}
  
	/*const selectShipperCompanyListByUser =()=>{
		axios.post(
			"/shipper/selectShipperCompanyListByUser"
			,{user_no: props.user?props.user.user_no:'',}
		).then(
			res=>{    
						if(res.data.length === 1) {
						onSetShipperData(res.data);
						setShipperCompanyList(res.data);
					} else {
						setShipperCompanyList(res.data);
					}
						setIsLoading(false);
				
			}
		);
	}*/
    // 자식의 Data 적용
	const onBookMarkData = (data) => {
		shipperData = data;
		
	}
	
	const onApplyData = ()=> {
		setOpen(!open);
		setShipper(shipperData);
		props.mergeData(shipperData);
		setColl(true);	
	}

	
	const onSaveBookmark =()=> {
		if(shipperData.shipper_bookmark_name !==null && shipperData.shipper_bookmark_name !=="") {

			axios.post("/shipper/setUserShpBookmark",{user_no:props.user?props.user.user_no:'',data:shipperData},{}).then(res => {
				props.onLoadData("sh");
				if(shipperData.shipper_bookmark_seq) {
					props.onAlert("success","작성한 BOOKMARK 가 수정 되었습니다.");
				} else {
					props.onAlert("success","작성한 BOOKMARK 가 저장 되었습니다.");
				}
	  	  	});
		} else {
			props.onAlert("error","shipper_bookmark_name 는 필수 입력 항목 입니다.");
		}
	}

	
	const onChangeShp =(value)=> {
		if(value) {

			if(value.value>0) {
				axios.post("/shipper/getUserShpBookmark",{user_no:props.user?props.user.user_no:'',seq:value.value},{}).then(res => {
					if(res.data[0]) {
						const shipperData = {
							label:res.data[0].label?res.data[0].label:shipper.label,
							value:res.data[0].value?res.data[0].value:shipper.value,
							shp_address1:res.data[0].shp_address1?res.data[0].shp_address1:shipper.shp_address1,
							shp_address2:res.data[0].shp_address1?res.data[0].shp_address2:shipper.shp_address2,
							shp_address3:res.data[0].shp_address1?res.data[0].shp_address3:shipper.shp_address3,
							shp_address4:res.data[0].shp_address1?res.data[0].shp_address4:shipper.shp_address4,
							shp_address5:res.data[0].shp_address1?res.data[0].shp_address5:shipper.shp_address5,
							shp_code:res.data[0].shp_code?res.data[0].shp_code:shipper.shp_code,
							shp_country_code:res.data[0].shp_country_code?res.data[0].shp_country_code:shipper.shp_country_code,
							shp_name1:res.data[0].shp_name1?res.data[0].shp_name1:shipper.shp_name1,
							shp_name2:res.data[0].shp_name1?res.data[0].shp_name2:shipper.shp_name2,
							shp_un_code:res.data[0].shp_un_code?res.data[0].shp_un_code:shipper.shp_un_code,
							shp_user_name:res.data[0].shp_user_name?res.data[0].shp_user_name:shipper.shp_user_name,
							shp_user_tel:res.data[0].shp_user_tel?res.data[0].shp_user_tel:shipper.shp_user_tel,
						}
						const mergeData = Object.assign(shipper,shipperData);	  
						setShipper({...mergeData,'shipper_bookmark_seq':value.value,'shipper_bookmark_name':value.label});
						props.mergeData({...mergeData,'shipper_bookmark_seq':value.value,'shipper_bookmark_name':value.label});
						setColl(true);
					}else {
						setShipper({...shipper,'shipper_bookmark_seq':value.value,'shipper_bookmark_name':value.label});
					}
									
				});
			}
		}else {
			const list = {
				label:null,
				value:null,
				shp_address1:null,
				shp_address2:null,
				shp_address3:null,
				shp_address4:null,
				shp_address5:null,
				shp_code:null,
				shp_country_code:null,
				shp_name1:null,
				shp_name2:null,
				shp_un_code:null,
				shp_user_name:null,
				shp_user_tel:null,
			}
			setShipper(list);
			props.mergeData(list);
		}
	}
	
	const onInitData = () => {
		shipperData=null;
		shipperData= {...propsData,'shipper_bookmark_seq':'','shipper_bookmark_name':'','shp_code':'','shp_name1':'',
				'shp_name2':'',
				'shp_address1':'',
				'shp_address2':'',
				'shp_address3':'',
				'shp_address4':'',
				'shp_address5':'',
				'shp_user_name':'',
				'shp_user_tel':'',
				'sch_user_fax':'',
				'sch_user_dep1':'',
				'sch_user_email':''};
		setPropsData(shipperData);
	}
	
	
	const onBookMarkDelete = (data) => { console.log("delete data:",shipperData);
		if(shipperData && shipperData.shipper_bookmark_seq) {
			axios.post("/shipper/setUserShpBookmarkDel",{user_no:props.user?props.user.user_no:'',data:shipperData},{})								
			.then(res => {onInitData();
						props.onLoadData("sh");
						props.onAlert("success","선택한 BOOKMARK 가 삭제 되었습니다.");
			});
		} else {
			props.onAlert("error","삭제 할 BOOKMARK를 선택해주세요.");
		}
		
	}

	const onHandleReturnVal = (event,name) => {
	    	  let list = {...shipper, [name]:event.target.value.toUpperCase()};
	    	  setShipper(list);
	  }
	
	
	const onPropsReturn = ()=> {
		props.mergeData(shipper);
	  }
	
	/*const onSetShipperData = (e)=> {

		var shp_name1,shp_name2 = '';
	    var address1,address2,address3,address4,address5 = '';
	
		if(props.validation.getByte(e.company_name) > 35) {
	  		 
	  		var data = e.company_name;
	  		var space = 0;
	  		var space_name = 1;
	  		
	  		
	  		for(var i=1;i<= data.length ; i++ ) {
	  			
	  	
	  			if(props.validation.getByte(data.substring(space,i)) <= 35) { 
	  				
	  			    if (space_name === 1) { 
	  			    	shp_name1 = data.substring(space,i);
	  			    } else {
	  			    	shp_name2 = data.substring(space,i);
	  			    }
	  			} else {
	  				space = i-1;
	  				space_name++;
	  			}
	  		}

	  	 } else {
	  		shp_name1 = e.company_name;
	  	 }
		
	  	 if(props.validation.getByte(e.address) > 35) {
	  		 
	  		var data = e.address;
	  		var space = 0;
	  		var space_address = 1;
	  		
	  		
	  		for(var i=1;i<= data.length ; i++ ) {
	  			
	  	
	  			if(props.validation.getByte(data.substring(space,i)) <= 35) { 
	  				
	  			    if (space_address === 1) { 
	  			    	address1 = data.substring(space,i);
	  			    } else if (space_address === 2) { 
	  			    	address2 = data.substring(space,i);
	  			    } else if (space_address === 3) { 
	  			    	address3 = data.substring(space,i);
	  			    } else if (space_address === 4) { 
	  			    	address4 = data.substring(space,i);
	  			    } else {
	  			    	address5 = data.substring(space,i);
	  			    }
	  			} else {
	  				space = i-1;
	  				space_address++;
	  			}
	  		}

	  	 } else {
	  		address1 = e.address;
	  	 }

	  		setShipper({...shipper,'shp_code':e.company_id,'shp_name1':shp_name1,'shp_name2':shp_name2,'shp_address1':address1,'shp_address2':address2,'shp_address3':address3,'shp_address4':address4,'shp_address5':address5});
	  		props.mergeData({...shipper,'shp_code':e.company_id,'shp_name1':shp_name1,'shp_name2':shp_name2,'shp_address1':address1,'shp_address2':address2,'shp_address3':address3,'shp_address4':address4,'shp_address5':address5});

	}*/
	
  return (
    <>
        <Row id="Shipper">
            <Col xl="12" lg="12">
	            <Card style={{zIndex:'9',border:'1px solid silver',borderRadius:'10px'}}>
	            <CardBody className="pt-3 pb-0" >  
                	<Row className="pb-4" style={{marginBottom:'5px'}}>
                		<Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>SHIPPER
	                		<Button className="pl-1" color="link" id="shpview" onClick={toggle.bind(this, 'S')}><i className="fa fa-pencil-square-o fa-2x"/></Button>
	  			            <UncontrolledTooltip delay={0} target="shpview">Input</UncontrolledTooltip>
	  			         </Col>
	                     <Col>
	                     	<Row>
	  	                   		<Col className="col-10 pr-0">
			  	                   	<Select
								        className="react-select react-select-primary"
								        classNamePrefix="react-select"
								        name="carrierbookmark"
								        value={{value:shipper.shipper_bookmark_seq?shipper.shipper_bookmark_seq:'',label:shipper.shipper_bookmark_name?shipper.shipper_bookmark_name:''}}
								        onChange={(value)=>onChangeShp(value)}
								        options={bookmark}
								        placeholder="선택"
			  	                        ref={shipperFocus}
										isClearable={shipper.shipper_bookmark_seq?true:false}/>
	  						 </Col>
	  						 <Col className="col-2 pl-auto pr-auto">
	  						 	<Button className="pl-0 pr-0" color="link" id="shpbookmark" onClick={toggle.bind(this, 'B')}><i className="fa fa-bookmark-o fa-2x" /></Button>
	  						    <UncontrolledTooltip delay={0} target="shpbookmark">Bookmark</UncontrolledTooltip>
	  						  </Col>			
	  					   </Row>
	  	              </Col>
	  	           </Row>
					<Collapse isOpen={coll} className="pb-1"> 
						<hr className="mt-0"/>
							<Row style={{fontSize:'12px'}}>
									{/*<Col xl="12" lg="12" md="12">
										<FormGroup className="mb-1">
											<Label className="mb-0">Shipper</Label>
											<Select
												className="customSelect"
												classNamePrefix="customSelect"
												name="shp_code"
												placeholder=""
												isLoading={isLoading}
												value={{value:shipper.shp_code?shipper.shp_code:'',
														label:shipper.shp_code?
															(shipperCompanyList.findIndex(x=>x.value===shipper.shp_code)>=0)?
															shipperCompanyList[shipperCompanyList.findIndex(x=>x.value===shipper.shp_code)].label:
																'선택':'선택'
												}}
												onChange={(e) => onSetShipperData(e)}
												options={shipperCompanyList}
												styles={{
													control: provided => ({...provided,border:!shipper.shp_code?'1px solid red':''}),
													indicatorContainer: provided => ({...provided,color:''})
												}}
												/>
												<InputValid 
													type="hidden"
													name="shp_code"
													id="shp_code"
													placeholder=""
													maxLength="35"
													bsSize="sm"
													value={shipper.shp_code?shipper.shp_code:''}
													// onChange={(e)=>onHandleReturnVal(e, 'sch_fdp_name')}
													//onBlur={onPropsReturn}
													validtype="text"
													required={true}
												/>
										</FormGroup>
									</Col>*/}
									<Col xl="12" lg="12" md="12">
									<FormGroup className="mb-1">
										<Row>
											<Col className="pr-0 pt-1 col-2"><Label className="mb-0">Name</Label></Col>
											<Col>
												<InputValid 
												type="text"
												bsSize="sm"
												name="shp_name1"
												id="shp_name1"
												placeholder=""
												maxLength="35"
												value={shipper.shp_name1?shipper.shp_name1:''}
												onChange={(e)=>onHandleReturnVal(e, 'shp_name1')}
												onBlur={onPropsReturn}
												validtype="text" 
												required={true}
												feedid="shipper"
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
												name="shp_name2"
												id="shp_name2"
												placeholder=""
												maxLength="35"
												value={shipper.shp_name2?shipper.shp_name2:''}
												onChange={(e)=>onHandleReturnVal(e, 'shp_name2')}
												onBlur={onPropsReturn}
												validtype="text" 
												required={false}
											feedid="shipper"
											/>
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
													name="shp_address1"
													id="shp_address1"
													placeholder=""
													maxLength="35"
													value={shipper.shp_address1?shipper.shp_address1:''}
													onChange={(e)=>onHandleReturnVal(e, 'shp_address1')}
													onBlur={onPropsReturn}
													validtype="text" 
													required={true}
													feedid="shipper"
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
													name="shp_address2"
													id="shp_address2"
													placeholder=""
													maxLength="35"
													value={shipper.shp_address2?shipper.shp_address2:''}
													onChange={(e)=>onHandleReturnVal(e, 'shp_address2')}
													onBlur={onPropsReturn}
													validtype="text" 
													required={false}
													feedid="shipper"
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
													name="shp_address3"
													id="shp_address3"
													placeholder=""
													maxLength="35"
													value={shipper.shp_address3?shipper.shp_address3:''}
													onChange={(e)=>onHandleReturnVal(e, 'shp_address3')}
													onBlur={onPropsReturn}
													validtype="text" 
													required={false}
													feedid="shipper"
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
													name="shp_address4"
													id="shp_address4"
													placeholder=""
													maxLength="35"
													value={shipper.shp_address4?shipper.shp_address4:''}
													onChange={(e)=>onHandleReturnVal(e, 'shp_address4')}
													onBlur={onPropsReturn}
													validtype="text" 
													required={false}
													feedid="shipper"
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
												name="shp_address5"
												id="shp_address5"
												placeholder=""
												maxLength="35"
												value={shipper.shp_address5?shipper.shp_address5:''}
												onChange={(e)=>onHandleReturnVal(e, 'shp_address5')}
												onBlur={onPropsReturn}
												validtype="text" 
												required={false}
												feedid="shipper"
											/>
										</Col>
										</Row>
								</FormGroup>
							</Col>
									{/*<Col xl="12" lg="12" md="12">
									<FormGroup className="mb-1">
										<Row>
											<Col className="pr-0 pt-1 col-2"><Label className="mb-0">Name</Label></Col>
											<Col>
												<InputValid 
												type="text"
												bsSize="sm"
												name="shp_name1"
												id="shp_name1"
												placeholder=""
												maxLength="35"
												value={shipper.shp_name1?shipper.shp_name1:''}
												onChange={(e)=>onHandleReturnVal(e, 'shp_name1')}
												onBlur={onPropsReturn}
												validtype="text" 
												required={true}
												feedid="shipper"
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
												name="shp_name2"
												id="shp_name2"
												placeholder=""
												maxLength="35"
												value={shipper.shp_name2?shipper.shp_name2:''}
												onChange={(e)=>onHandleReturnVal(e, 'shp_name2')}
												onBlur={onPropsReturn}
												validtype="text" 
												required={false}
											feedid="shipper"
											/>
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
														name="shp_address1"
														id="shp_address1"
														placeholder=""
														maxLength="35"
														value={shipper.shp_address1?shipper.shp_address1:''}
														onChange={(e)=>onHandleReturnVal(e, 'shp_address1')}
														onBlur={onPropsReturn}
														validtype="text" 
														required={true}
													feedid="shipper"
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
														name="shp_address2"
														id="shp_address2"
														placeholder=""
														maxLength="35"
														value={shipper.shp_address2?shipper.shp_address2:''}
														onChange={(e)=>onHandleReturnVal(e, 'shp_address2')}
														onBlur={onPropsReturn}
														validtype="text" 
														required={false}
													feedid="shipper"
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
														name="shp_address3"
														id="shp_address3"
														placeholder=""
														maxLength="35"
														value={shipper.shp_address3?shipper.shp_address3:''}
														onChange={(e)=>onHandleReturnVal(e, 'shp_address3')}
														onBlur={onPropsReturn}
														validtype="text" 
														required={false}
													feedid="shipper"
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
														name="shp_address4"
														id="shp_address4"
														placeholder=""
														maxLength="35"
														value={shipper.shp_address4?shipper.shp_address4:''}
														onChange={(e)=>onHandleReturnVal(e, 'shp_address4')}
														onBlur={onPropsReturn}
														validtype="text" 
														required={false}
													feedid="shipper"
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
														name="shp_address5"
														id="shp_address5"
														placeholder=""
														maxLength="35"
														value={shipper.shp_address5?shipper.shp_address5:''}
														onChange={(e)=>onHandleReturnVal(e, 'shp_address5')}
														onBlur={onPropsReturn}
														validtype="text" 
														required={false}
													feedid="shipper"
													/>
												</Col>
												</Row>
										</FormGroup>
									</Col>*/}
								</Row>
					</Collapse>
				</CardBody>
				<Col className="text-center col-12 p-0" onClick={() => setColl(!coll)}>      
						<Button
							className="p-0"
							color="link"
							id="shpmore"
							onClick={() => setColl(!coll)}
							style={{height:'21px',marginBottom:'4px',width:'100%'}}
						>
						{coll?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
						</Button>
						<UncontrolledTooltip delay={0} target="shpmore">{coll?'Close':'Open'}</UncontrolledTooltip>
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
        <Modal isOpen={open} toggle={toggle} className="pt-0" size="lg">
            <ModalHeader toggle={toggle} className="pt-3 pb-3">{modalTitle}</ModalHeader>
                <ModalBody className="p-3">
                    {bookmarkView?
                    	<ShipperBookmark type="B" loadFormData={propsData} onPropsShBookmark={onBookMarkData}  onPropsShDeleteBookmark={onBookMarkDelete}
                        {...props} />
                    :
                        <Shipper type="I" loadFormData={propsData} propsData={onBookMarkData}  {...props} 
                    	/>
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

export default ShipperCard;



