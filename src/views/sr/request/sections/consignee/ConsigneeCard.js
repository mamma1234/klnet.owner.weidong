/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect, forwardRef } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
     Button,FormGroup,Label,Input, Card,   UncontrolledTooltip} from "reactstrap";
import Select from "react-select";
//import AlertModal from 'components/Modals/Alert.js';
import ConsigneeBookmark from './ConsigneeBookmark.js';
import Consignee from './Consignee.js';
import axios from 'axios';
import InputValid from "components/CustomInput/InputValid.js";
let consigneeData = {};

const ConsigneeCard = forwardRef((props,consigneeFocus) => {


	const {bookmark,loadData,openWindow,validation,samec} = props;

	// Collapse Flag
	const [coll, setColl] = useState(false);
	const [bookmarkView, setBookmarkView] = useState(false);
	const [propsData, setPropsData] = useState([]);
	// modal 창을 위한 state
	const [open, setOpen] = useState(false);
	const [consignee, setConsignee] = useState([]);
	const [clsNm, setClsNm] = useState("");
	const [modalTitle, setModalTitle] = useState("Consignee Info");
  
	useEffect(() => {
		setConsignee(loadData);
		},[loadData]);
	
	useEffect(() => {
		setColl(openWindow);
	},[openWindow]);


	const toggle = (params) => {
		
		if(params==='B') {
			setClsNm('');
			setModalTitle("Consignee BookMark");
			props.onLoadData("cs");
			setPropsData({...loadData,'consignee_bookmark_seq':'','consignee_bookmark_name':'',cons_code:consignee.cons_code,cons_name1:consignee.cons_name1,
			cons_name2:consignee.cons_name2,
			cons_address1:consignee.cons_address1,
			cons_address2:consignee.cons_address2,
			cons_address3:consignee.cons_address3,
			cons_address4:consignee.cons_address4,
			cons_address5:consignee.cons_address5,
			cons_user_name:consignee.cons_user_name,
			cons_user_tel:consignee.cons_user_tel});
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

    // 자식의 Data 적용
	const onBookMarkData = (data) => {
		consigneeData = data;
	}
	
	const onApplyData = () => {
		setOpen(!open);
		var data = consigneeData;
		if(props.samec) {
			var cons = {'noti_name1':data.cons_name1,'noti_name2':data.cons_name2,'noti_address1':data.cons_address1,
						'noti_address2':data.cons_address2,'noti_address3':data.cons_address3,
						'noti_address4':data.cons_address4,'noti_address5':data.cons_address5};
			data = {...consigneeData,...cons};
		}
		setConsignee(data);
		props.mergeData(data);
		setColl(true);
	}


	const onSaveBookmark =()=> {

		
		if((consigneeData.consignee_bookmark_name !==null && consigneeData.consignee_bookmark_name !=="") ) {

			axios.post("/shipper/setUserConsBookmark",{user_no:props.user?props.user.user_no:'',data:consigneeData},{}).then(res => {
				props.onLoadData("cs");
				if(consigneeData.consignee_bookmark_seq) {
					props.onAlert("success","작성한 BOOKMARK 가 수정 되었습니다.");
				} else {
					props.onAlert("success","작성한 BOOKMARK 가 등록 되었습니다.");  
				}  
	  	  	});
		}
	}
	const onChangeConsignee =(value)=> {
		if(value) {
			setConsignee({...consignee,'consignee_bookmark_seq':value.value,'consignee_bookmark_name':value.label});
			if(value.value > 0) {
				axios.post("/shipper/getUserConsBookmark",{user_no:props.user?props.user.user_no:'',seq:value.value},{}).then(res => {
					const list = {
						cons_address1:res.data[0].cons_address1?res.data[0].cons_address1:consignee.cons_address1,
						cons_address2:res.data[0].cons_address1?res.data[0].cons_address2:consignee.cons_address2,
						cons_address3:res.data[0].cons_address1?res.data[0].cons_address3:consignee.cons_address3,
						cons_address4:res.data[0].cons_address1?res.data[0].cons_address4:consignee.cons_address4,
						cons_address5:res.data[0].cons_address1?res.data[0].cons_address5:consignee.cons_address5,
						cons_name1:res.data[0].cons_name1?res.data[0].cons_name1:consignee.cons_name1,
						cons_name2:res.data[0].cons_name1?res.data[0].cons_name2:consignee.cons_name2,
						cons_user_dept:res.data[0].cons_user_dept?res.data[0].cons_user_dept:consignee.cons_user_dept,
						cons_user_email:res.data[0].cons_user_email?res.data[0].cons_user_email:consignee.cons_user_email,
						cons_user_fax:res.data[0].cons_user_fax?res.data[0].cons_user_fax:consignee.cons_user_fax,	
					};
					const mergeData = Object.assign(consignee,list);	  
					setConsignee({...mergeData,'consignee_bookmark_seq':value.value,'consignee_bookmark_name':value.label});
					props.mergeData({...mergeData,'consignee_bookmark_seq':value.value,'consignee_bookmark_name':value.label});
					setColl(true);
				});
			}
		}else {
			const list = {
				...consignee,
				consignee_bookmark_seq:null,
				consignee_bookmark_name:null,
				cons_address1:null,
				cons_address2:null,
				cons_address3:null,
				cons_address4:null,
				cons_address5:null,
				cons_name1:null,
				cons_name2:null,
				cons_user_dept:null,
				cons_user_email:null,
				cons_user_fax:null,
			};
			setConsignee(list);
			props.mergeData(list);
		}
	}
	
	
	const onInitData = () => {
		consigneeData=null;
		consigneeData ={...propsData,'consignee_bookmark_seq':'','consignee_bookmark_name':'','cons_code':'',
				'cons_name1':'',
				'cons_address1':'',
				'cons_address2':'',
				'cons_address3':'',
				'cons_address4':'',
				'cons_address5':'',
				'cons_user_name':'',
				'cons_user_tel':'',
				'cons_user_fax':'',
				'cons_user_dep1':''};
		setPropsData(consigneeData);
	}
	
	const onBookMarkDelete = (data) => {
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
	
/*	const onSaveData = () => {
		props.mergeData(consignee);
	}*/
	
	const onHandleReturnVal = (event,name) => {
		  let list = {...consignee, [name]:event.target.value.toUpperCase()};
		  setConsignee(list);  
	  }
	
	
	const onPropsReturn = ()=> {
		
		var data = consignee;
		if(props.samec) {
			var cons = {'noti_name1':'SAME AS CONSIGNEE'};
			data = {...consignee,...cons};
		}
		props.mergeData(data);
	  }
	
	const onConsSamec = ()=>{
		props.onSetSamec();
	}
	
  	return (
    <>
        <Row id="Consignee">
            <Col xl="12" lg="12">
	            <Card style={{zIndex:'8',border:'1px solid silver',borderRadius:'10px'}}>
	            	<CardBody className="pt-3 pb-0">  
						<Row>
							<Col xl="5" className="mt-2 mb-0 pr-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>CONSIGNEE
								<Button className="pl-1" color="link" id="consview" onClick={toggle.bind(this, 'S')}>
									<i className="fa fa-pencil-square-o fa-2x"/>
								</Button>
								<UncontrolledTooltip delay={0} target="consview">Input</UncontrolledTooltip>
							</Col>
							<Col>
								<Row>
									<Col className="col-10 pr-0">
										<Select
											className="react-select react-select-primary"
											classNamePrefix="react-select"
											name="carrierbookmark"
											value={{value:consignee.consignee_bookmark_seq?consignee.consignee_bookmark_seq:'',label:consignee.consignee_bookmark_name?consignee.consignee_bookmark_name:''}}
											onChange={(value)=>onChangeConsignee(value)}
											options={bookmark}
											placeholder="선택"
											ref={consigneeFocus}
											isClearable={consignee.consignee_bookmark_seq?true:false}/>
									</Col>
									<Col className="col-2 pl-auto pr-auto">
										<Button className="pl-0 pr-0" color="link" id="consbookmark" onClick={toggle.bind(this, 'B')}><i className="fa fa-bookmark-o fa-2x" /></Button>
										<UncontrolledTooltip delay={0} target="consbookmark">Bookmark</UncontrolledTooltip>
									</Col>			
								</Row>
							</Col>
						</Row>
						{/* <Col className="col-12 text-right pr-0">
							<FormGroup check className="mb-0">
							<Label check className="p1-1">
								<Input type="checkbox" checked={props.samec}
								onChange = {()=>onConsSamec()}
								/> 	               
							<span className="form-check-sign" />
									<Button className="btn-link pl-0 pr-0 pt-0 pb-0 border-0" color="info" type="button" size="sm" // onClick={onCopyData}
										>same as notify</Button>
							</Label>
						</FormGroup>

						</Col> */}
						<Collapse isOpen={coll}>
						{/* <div style={divider}/> */}
							{/* 보이는 영역 */}
							<hr className="mt-0"/>
							<Row>
								<Col xl="12" lg="12" md="12">
									<FormGroup className="mb-1">
										<Row>
											<Col className="pr-0 pt-1 col-2">
												<Label className="mb-0">Name</Label>
											</Col>
											<Col>
												<InputValid 
													type="text"
													bsSize="sm"
													name="cons_name1"
													id="cons_name1"
													maxLength="35"
													value={consignee.cons_name1?consignee.cons_name1:''}
													onChange={(e)=>onHandleReturnVal(e, 'cons_name1')}
													onBlur={onPropsReturn}
													validtype="text" 
													required={true}
													feedid="consignee"
												/>
												{/*	 	<Input type="text" bsSize="sm" name="cons_name1" id="cons_name1" placeholder=""
														invalid={!consignee.cons_name1?true:false}
														value={consignee.cons_name1?consignee.cons_name1:''} onChange = {(event)=>onHandleReturnVal(event,'cons_name1')} 
														onBlur={onPropsReturn}
													/>
												<FormFeedback>{validation.REQ_MSG}</FormFeedback>	*/}
											</Col>
										</Row>
									</FormGroup>
								</Col>
								<Col xl="12" lg="12" md="12">
									<FormGroup className="mb-1">
										<Row>
											<Col className="pr-0 pt-1 col-2">
												<Label className="mb-0"></Label>
											</Col>
											<Col>
												<InputValid 
													type="text"
													bsSize="sm"
													name="cons_name2"
													id="cons_name2"
													maxLength="35"
													value={consignee.cons_name2?consignee.cons_name2:''}
													onChange={(e)=>onHandleReturnVal(e, 'cons_name2')}
													onBlur={onPropsReturn}
													validtype="text" 
													required={false}
													feedid="consignee"
												/>
												{/*	 	<Input type="text" bsSize="sm" name="cons_name2" id="cons_name2" placeholder=""
												value={consignee.cons_name2?consignee.cons_name2:''} onChange = {(event)=>onHandleReturnVal(event,'cons_name2')} 
												onBlur={onPropsReturn}
												/>*/}
											</Col>
										</Row>
									</FormGroup>
								</Col> 
								<Col xl="12" lg="12" md="12">
									<FormGroup className="mb-1">
										<Row>
											<Col className="pr-0 pt-1 col-2">
												<Label className="mb-0">Address</Label>
											</Col>
											<Col>
												<InputValid 
													type="text"
													bsSize="sm"
													name="cons_address1"
													id="cons_address1"
													maxLength="35"
													value={consignee.cons_address1?consignee.cons_address1:''}
													onChange={(e)=>onHandleReturnVal(e, 'cons_address1')}
													onBlur={onPropsReturn}
													validtype="text" 
													required={true}
													feedid="consignee"
												/>
												{/*		<Input bsSize="sm" type="text" name="cons_address1" id="cons_address1" placeholder=""
													invalid={!consignee.cons_address1?true:false}
													value={consignee.cons_address1?consignee.cons_address1:''}  
												maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'cons_address1')} onBlur={onPropsReturn}
												/>
												<FormFeedback>{validation.REQ_MSG}</FormFeedback>*/}
											</Col>
										</Row>
									</FormGroup>
								</Col>
								<Col xl="12" lg="12" md="12">
									<FormGroup className="mb-1">
										<Row>
											<Col className="pr-0 pt-1 col-2">
												<Label className="mb-0"></Label>
											</Col>
											<Col>
												<InputValid 
													type="text"
													bsSize="sm"
													name="cons_address2"
													id="cons_address2"
													maxLength="35"
													value={consignee.cons_address2?consignee.cons_address2:''}
													onChange={(e)=>onHandleReturnVal(e, 'cons_address2')}
													onBlur={onPropsReturn}
													validtype="text" 
													required={false}
													feedid="consignee"
												/>
												{/*		<Input bsSize="sm" type="text" name="cons_address2" id="cons_address2" placeholder="" 
													value={consignee.cons_address2?consignee.cons_address2:''}  
												maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'cons_address2')} onBlur={onPropsReturn}	
												/>*/}
											</Col>
										</Row>
									</FormGroup>
								</Col>
								<Col xl="12" lg="12" md="12">
									<FormGroup className="mb-1">
										<Row>
											<Col className="pr-0 pt-1 col-2">
												<Label className="mb-0"></Label>
											</Col>
											<Col>
												<InputValid 
													type="text"
													bsSize="sm"
													name="cons_address3"
													id="cons_address3"
													maxLength="35"
													value={consignee.cons_address3?consignee.cons_address3:''}
													onChange={(e)=>onHandleReturnVal(e, 'cons_address3')}
													onBlur={onPropsReturn}
													validtype="text" 
													required={false}
													feedid="consignee"
												/>
												{/*		<Input bsSize="sm" type="text" name="cons_address3" id="cons_address3" placeholder="" 
													value={consignee.cons_address3?consignee.cons_address3:''}  
												maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'cons_address3')} onBlur={onPropsReturn}	
												/>*/}
											</Col>
										</Row>
									</FormGroup>
								</Col>
								<Col xl="12" lg="12" md="12">
									<FormGroup className="mb-1">
										<Row>
											<Col className="pr-0 pt-1 col-2">
												<Label className="mb-0"></Label>
											</Col>
											<Col>
												<InputValid 
													type="text"
													bsSize="sm"
													name="cons_address4"
													id="cons_address4"
													maxLength="35"
													value={consignee.cons_address4?consignee.cons_address4:''}
													onChange={(e)=>onHandleReturnVal(e, 'cons_address4')}
													onBlur={onPropsReturn}
													validtype="text" 
													required={false}
													feedid="consignee"
												/>
												{/*	<Input bsSize="sm" type="text" name="cons_address4" id="cons_address4" placeholder="" 
													value={consignee.cons_address4?consignee.cons_address4:''}  
												maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'cons_address4')} onBlur={onPropsReturn}	
												/>*/}
											</Col>
										</Row>
									</FormGroup>
								</Col>
								<Col xl="12" lg="12" md="12">
									<FormGroup className="mb-1">
										<Row>
											<Col className="pr-0 pt-1 col-2">
												<Label className="mb-0"></Label>
											</Col>
											<Col >
												<InputValid 
													type="text"
													bsSize="sm"
													name="cons_address5"
													id="cons_address5"
													maxLength="35"
													value={consignee.cons_address5?consignee.cons_address5:''}
													onChange={(e)=>onHandleReturnVal(e, 'cons_address5')}
													onBlur={onPropsReturn}
													validtype="text" 
													required={false}
													feedid="consignee"
												/>
											{/*	<Input bsSize="sm" type="text" name="cons_address5" id="cons_address5" placeholder="" 
													value={consignee.cons_address5?consignee.cons_address5:''}  
												maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'cons_address5')} onBlur={onPropsReturn}	
												/>*/}
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
							onClick={() => setColl(!coll)}
							style={{height:'21px',marginBottom:'4px',width:'100%'}}>{coll?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
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
					<ConsigneeBookmark 
						bookmark={bookmark} 
						loadData={propsData} 
						onPropsConsBookmark={onBookMarkData} 
						onPropsConsDeleteBookmark={onBookMarkDelete} 
						validation={validation}/>
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
			</>:<Button color="primary" onClick={onApplyData}>APPLY</Button>}{' '}
			<Button color="secondary" onClick={()=>setOpen(!open)}>CANCLE</Button>
		</ModalFooter>
	</Modal>
    </>
    );
});

export default ConsigneeCard;



