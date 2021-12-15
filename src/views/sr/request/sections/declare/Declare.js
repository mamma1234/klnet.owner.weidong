/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect, createRef } from 'react';
import { Row, Col, CardBody, Button,FormGroup,Label,Input, Card,FormFeedback,InputGroupAddon,InputGroupText,InputGroup } from "reactstrap";
import * as validation from 'components/common/validation.js';
import axios from 'axios';
//import Moment from 'moment';
import Select from "react-select";
import InputValid from "components/CustomInput/InputValid.js";


export default function Declare(props) {
	const fileInput = createRef();
	const {loadFormData,codelist,size} = props;
	const [file, setFile] = useState(null);
	const [declare, setDeclare] = useState({});
	/*  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
	    props.avatar ? defaultAvatar : defaultImage
	  );*/

	useEffect(() => {
		setDeclare({
			...loadFormData,
			bookmark_checked:loadFormData.bookmark_checked?loadFormData.bookmark_checked:props.checked?'Y':'N',
			declare_div_load_yn:loadFormData.declare_div_load_yn?loadFormData.declare_div_load_yn:'N',
			declare_pack_type:'GT'
		});
		// if(declare.declare_div_load_yn) {
		// 	setDeclare({...loadFormData,'bookmark_checked':loadFormData.bookmark_checked?loadFormData.bookmark_checked:props.checked?'Y':'N'});
		// }else {
			
		// }
		setFile(loadFormData.declare_file_seq?loadFormData.declare_file_seq:null);
		//setFileName(loadFormData.declare_file_name);
	},[loadFormData]);
  

  	
  	//const [fileName, setFileName] = useState("");
  
	const onHandleReturnVal = (event,name) => {
		// if(!validation.validationHangle(event.target.value.toUpperCase())) {
		let list = {...declare, [name]:event.target.value.toUpperCase()};
		setDeclare(list);	
		// }
	}
 
	const onHandleCheckReturnVal2 = (data,name) => {
		let list = {...declare, [name]:data};
		setDeclare(list);
		props.propsData(list); 
	}
	
	const onHandleCheckReturnVal = (event,name) => {
		
		let list = {...declare, [name]:event.target.value};
		setDeclare(list);
		props.propsData(list);  
	}
	/*const onHandleReturnDate = (date) => {
		let list = {...declare, 'declare_customs_date':Moment(date).format('YYYYMMDD')};
		setDeclare(list); 
		props.propsData(list);
	}*/
  
	const onPropsReturn = ()=> {
		props.propsData(declare);
	}
	
	const onDeleteDeclare =(data) => {
		props.deleteRow(data);
	}
  
  	const onChangeDeclare=(value)=>{

	  	// let list = {...declare, ...value};


	  	const list = {
			declare_customs_date:value.declare_customs_date?value.declare_customs_date:declare.declare_customs_date,
			declare_div_load_no:value.declare_div_load_no?value.declare_div_load_no:declare.declare_div_load_no,
			declare_div_load_yn:value.declare_div_load_yn?value.declare_div_load_yn:declare.declare_div_load_yn,
			declare_goods_desc:value.declare_goods_desc?value.declare_goods_desc:declare.declare_goods_desc,
			declare_num:value.declare_num?value.declare_num:declare.declare_num,
			declare_pack_num:value.declare_pack_num?value.declare_pack_num:declare.declare_pack_num,
			declare_pack_set_code:value.declare_pack_set_code?value.declare_pack_set_code:declare.declare_pack_set_code,
			declare_pack_set_num:value.declare_pack_set_num?value.declare_pack_set_num:declare.declare_pack_set_num,
			declare_pack_set_type:value.declare_pack_set_type?value.declare_pack_set_type:declare.declare_pack_set_type,
			declare_pack_type:value.declare_pack_type?value.declare_pack_type:declare.declare_pack_type,
			declare_weight:value.declare_weight?value.declare_weight:declare.declare_weight,
			label:value.label?value.label:declare.label,
			declare_div_load_no:value.declare_div_load_no?value.declare_div_load_no:declare.declare_div_load_no,
	};
	const mergeData = Object.assign(declare,list);
	setDeclare({...mergeData,'declare_bookmark_seq':value.declare_bookmark_seq,'declare_bookmark_name':value.declare_bookmark_name});
	props.propsData({...mergeData,'declare_bookmark_seq':value.declare_bookmark_seq,'declare_bookmark_name':value.declare_bookmark_name});	

  }
  
  
	const handleImageChange = (e) => {
		e.preventDefault();
	
		let reader = new FileReader();
		let file = e.target.files[0];

		if(file && file.type !== 'application/pdf') {
			props.onAlert('error', '수출신고필증 업로드는 pdf 만 가능합니다.' );
			return false;
		}
		if(file) {
			const formData = new FormData(); 
			//setFileName(file.name);
			formData.append("user_no",props.user?props.user.user_no:'');
			formData.append("sr_no",declare.sr_no?declare.sr_no:'');
			formData.append("sr_date",declare.sr_date?declare.sr_date:'');
			formData.append("file_size",e.target.files[0].size);
			formData.append("file",e.target.files[0]);

			axios.post("/shipper/declareSavefile",formData).then(res => { 
				if(res.data && res.data.success === 1) {
					reader.onloadend = () => {
					setFile(file);
					};
					reader.readAsDataURL(file);
					setDeclare({...declare,'declare_file_seq':res.data.result[0].file_seq,'declare_file_name':res.data.result[0].view_file_name});
					props.propsData({...declare,'declare_file_seq':res.data.result[0].file_seq,'declare_file_name':res.data.result[0].view_file_name});
				}
			});	
		}
	};
  
	const handleClick = () => {
			fileInput.current.click();
	};
	//파일 삭제
	const handleRemove = (data) => { 
		axios.post("/shipper/DeclareFileDelete",{data:data}).then(
				res => {setFile(null);
						//setFileName("");
		});
	}; 
	//파일 download
	const handleFileView = (data)=>{
		axios.post("/shipper/DeclareFileView",{data:data},{responseType:'arraybuffer',headers:{'Content-Type':'application/json','Accept':'application/pdf'}})
		.then(res => {
			const url = window.URL.createObjectURL(new Blob([res.data]));
			const link = document.createElement('a');
			link.href=url;
			link.setAttribute('download',data.declare_file_name);
			document.body.appendChild(link);
			link.click();
		});
	}
	
  	return (

    	<Card className="no-transition mb-2" style={{border:'1px solid silver',zIndex:props.zindex}}> 	   
			<CardBody className="pt-0 pb-3">
				<Row>
					<Col className="pr-1">
				      	<button
							className="close mt-1"
							type="button"
							onClick={(declare) => onDeleteDeclare(declare)}>×</button>
			        </Col>
				</Row>
				<Row>
			        <Col xl="0" className="col-0 pl-2 mt-auto mb-auto">
		              	<FormGroup check style={{height:'69px'}}>
		                	<Label check>
		                  	<Input 
							  	type="checkbox"
							  	checked={declare.bookmark_checked==="Y"?true:false}
		                  		onChange = {()=>onHandleCheckReturnVal2(declare.bookmark_checked==="Y"?"N":"Y",'bookmark_checked')}/>
		                  		<span className="form-check-sign" />
		                	</Label>
		              	</FormGroup>
			        </Col>
                    <Col>
                    	<Row>
	                        <Col xl="4" className="col-12 pt-2">
			               		<Select 
							        className={size?"customSelect react-select-primary":"react-select react-select-primary"}
							        classNamePrefix={size?"customSelect":"react-select"}
							        name="declarebookmark"
							        value={{value:declare.declare_bookmark_seq?declare.declare_bookmark_seq:'',label:declare.declare_bookmark_name?declare.declare_bookmark_name:'선택'}}
							        onChange={(value)=>onChangeDeclare(value)}
							        options={props.bookmark}
							        placeholder="선택"/>
							</Col>
							{!file && 
							<Col xl="2" className="pt-2 col-12">
								<FormGroup>
									<Label className="mb-0"></Label>
									<Button 
										style={{width:'100%'}}
										className="p-1"
										color="default"
										outline
										onClick={handleClick}>
										수출신고필증첨부
									</Button>
									<div>File Upload (*.pdf)</div>
								</FormGroup>
							</Col>}
	               		</Row>
                    	<Row className="pt-1">
	 		        		<Col xl="2" className="col-12">
				      			<FormGroup className="mb-0">
				      				<Label className="mb-0">수출면장번호</Label>
									<InputValid 
										type="text"
										name="declare_num"
										id="declare_num"
										maxLength="19"
										bsSize={size}
										value={declare.declare_num?declare.declare_num:''}
										onChange={(e)=>onHandleReturnVal(e, 'declare_num')}
										onBlur={onPropsReturn}
										validtype="engNumber"
										required={props.loadData.hbl_yn ==='N'?true:false} 
										feedid="declare"/>
			      				</FormGroup>
		          			</Col>
		          			<Col xl="3" lg="3" md="12">
						 		<FormGroup>
						    		<Label className="mb-0">포장유형,개수</Label>
									<Row>
										<Col className="col-8 pr-1">
											<Select
												className="customSelect"
												classNamePrefix="customSelect"
												name="declare_pack_type_select"
												value={{value:declare.declare_pack_type?declare.declare_pack_type:'',
														label:declare.declare_pack_type?(codelist.findIndex(x=>x.value===declare.declare_pack_type)>=0)?codelist[codelist.findIndex(x=>x.value===declare.declare_pack_type)].label:'선택':'선택'}}
												onChange = {() => props.onAlert('error', '포장유형은 변경 불가능합니다.' )
														// (value)=>onHandleCheckReturnVal2(value.value,'declare_pack_type')
												}
												options={codelist}
												// isSearchable={false}
												getOptionLabel = {options=>options.label+" ["+options.value+"] "}
												styles={{
													control: provided => ({...provided,border:!declare.declare_pack_type?'1px solid red':'',minHeight:!size?'40px':'',height:!size?'40px':''}),
													indicatorsContainer: provided => ({...provided,height:!size?'40px':''})
												}}/>
											<InputValid 
												hidden
												name="declare_pack_type"
												id="declare_pack_type"
												maxLength="2"
												bsSize="sm"
												value={declare.declare_pack_type?declare.declare_pack_type:''}
												validtype="text"
												required={props.loadData.hbl_yn ==='N'?true:false} 
												readOnly
												feedid="declare"/>
										{/*
												<Input type="select" bsSize={size} value={declare.declare_pack_type?declare.declare_pack_type:''} 
										onChange = {(event)=>onHandleCheckReturnVal(event,'declare_pack_type')}
										value={declare.declare_pack_type?declare.declare_pack_type:''}
										>
											<option value="">선택</option>
											{codelist.length>0?codelist.map((data,key) => <option key={key} value={data.cargo_pack_type}>{data.cargo_pack_type_desc+" ["+data.cargo_pack_type+"]"}</option>):<></>}
											</Input> */}
										</Col>
										<Col className="col-4 pl-1">
											<InputValid 
												type="text"
												name="declare_pack_num"
												id="declare_pack_num"
												maxLength="4"
												bsSize={size}
												value={declare.declare_pack_num?declare.declare_pack_num:''}
												onChange={(e)=>onHandleReturnVal(e, 'declare_pack_num')}
												onBlur={onPropsReturn}
												validtype="number"
												required={props.loadData.hbl_yn ==='N'?true:false} 
												feedid="declare"
											/>					    
										</Col>
									</Row>
								</FormGroup>
							</Col>
							<Col xl="2" lg="2" md="12">
								{/* <FormGroup className="mb-0">
				      				<Label className="mb-0">중량</Label>
									<InputValid 
										type="text"
										name="declare_weight"
										id="declare_weight"
										maxLength="18"
										bsSize={size}
										value={declare.declare_weight?declare.declare_weight:''}
										onChange = {(event)=>onHandleReturnVal(event,'declare_weight')}
										onBlur={onPropsReturn}
										validtype="number"
										required={props.loadData.hbl_yn ==='N'?true:false} 
										inputgrouptext="KG"
										feedid="declare"/>
			      				</FormGroup>	 */}
								  <FormGroup>
									<Label className="mb-0">중량</Label>
									<InputGroup >
									<Input type="text" name="declare_weight" id="declare_weight" placeholder="" bsSize={size} maxLength="18"
										invalid={!declare.declare_weight?true:false}
										value={declare.declare_weight?declare.declare_weight:''}
										onChange = {(event)=>onHandleReturnVal(event,'declare_weight')}  onBlur={onPropsReturn}
										/>
										<InputGroupAddon addonType="append">
										<InputGroupText className="p-1" style={{border:!declare.declare_weight?'1px solid red':'',borderRadius:'0 4px 4px 0'}}>kg</InputGroupText>
										</InputGroupAddon>
										<FormFeedback feedid="declare">{validation.REQ_MSG}</FormFeedback>
										</InputGroup>
								</FormGroup>		
							</Col>
							<Col xl="2" className="col-6">
								<FormGroup>
									<Label className="mb-0">분할선적여부</Label>
										<Input className="pl-2" type="select" bsSize={size} value={declare.declare_div_load_yn?declare.declare_div_load_yn:'N'} onChange = {(event)=>onHandleCheckReturnVal(event,'declare_div_load_yn')}>
											{/* <option value="">선택</option> */}
											<option value="N">N</option>
											<option value="Y">Y</option>
										</Input>
								</FormGroup>		
							</Col>
							<Col xl="2" className="col-6">
								<FormGroup>
									<Label className="mb-0">분할선적차수</Label>
									<InputValid 
										type="text"
										name="declare_div_load_no"
										id="declare_div_load_no"
										maxLength="2"
										bsSize={size}
										value={declare.declare_div_load_no?declare.declare_div_load_no:''}
										onChange={(e)=>onHandleReturnVal(e, 'declare_div_load_no')}
										onBlur={onPropsReturn}
										validtype="number"
										required={declare.declare_div_load_yn && declare.declare_div_load_yn ==='Y'?true:false} 
										feedid="declare"/>
								</FormGroup>		
							</Col>
							<Col xl="2" lg="2" md="12">
								<FormGroup>
									<Label className="mb-0">동시포장코드</Label>
									<InputValid 
										type="text"
										name="declare_pack_set_code"
										id="declare_pack_set_code"
										maxLength="1"
										bsSize={size}
										value={declare.declare_pack_set_code?declare.declare_pack_set_code:''}
										onChange={(e)=>onHandleReturnVal(e, 'declare_pack_set_code')}
										onBlur={onPropsReturn}
										validtype="english"
										required={false} 
										feedid="declare"/>
								</FormGroup>		
							</Col> 
							<Col xl="3" lg="3" md="12">
								<FormGroup>
									<Label className="mb-0">동시포장유형,개수</Label>
										<Row>
											<Col className="col-8 pr-1">
												<Select
													className="customSelect"
													classNamePrefix="customSelect"
													name="declare_pack_set_type_select"
													value={{value:declare.declare_pack_set_type?declare.declare_pack_set_type:'',
															label:declare.declare_pack_set_type?(codelist.findIndex(x=>x.value===declare.declare_pack_set_type)>=0)?codelist[codelist.findIndex(x=>x.value===declare.declare_pack_set_type)].label:'선택':'선택'}}
													onChange = {(value)=>onHandleCheckReturnVal2(value.value,'declare_pack_set_type')}
													options={codelist}
													getOptionLabel = {options=>options.label+" ["+options.value+"] "}
													styles={{
														control: provided => ({...provided,border:declare.declare_pack_set_num && !declare.declare_pack_set_type?'1px solid red':'',minHeight:!size?'40px':'',height:!size?'40px':''}),
														indicatorsContainer: provided => ({...provided,height:!size?'40px':''})
													}}/>
												<InputValid 
													hidden
													name="declare_pack_set_type"
													id="declare_pack_set_type"
													maxLength="2"
													bsSize="sm"
													value={declare.declare_pack_set_type?declare.declare_pack_set_type:''}
													validtype="text"
													required={declare.declare_pack_set_num?true:false} 
													readOnly
													feedid="declare"/>
												{/*<Input type="select" bsSize={size} value={declare.declare_pack_set_type?declare.declare_pack_set_type:''}
												invalid={declare.declare_pack_set_code && !declare.declare_pack_set_type?true:false}
												onChange = {(event)=>onHandleCheckReturnVal(event,'declare_pack_set_type')}
												value={declare.declare_pack_set_type?declare.declare_pack_set_type:''}
												>
													<option value="">선택</option>
													{codelist.length>0?codelist.map((data,key) => <option key={key} value={data.cargo_pack_type}>{data.cargo_pack_type_desc+" ["+data.cargo_pack_type+"]"}</option>):<></>}
												</Input>
												<FormFeedback feedid="declare">{validation.REQ_MSG}</FormFeedback>*/}
											</Col>
											<Col className="col-4 pl-1">
												<InputValid 
													type="text"
													name="declare_pack_set_num"
													id="declare_pack_set_num"
													maxLength="8"
													bsSize={size}
													value={declare.declare_pack_set_num?declare.declare_pack_set_num:''}
													onChange={(e)=>onHandleReturnVal(e, 'declare_pack_set_num')}
													onBlur={onPropsReturn}
													validtype="number"
													required={declare.declare_pack_set_type?true:false} 
													feedid="declare"/>
											</Col>
										</Row>
									</FormGroup>
								</Col>
				
							{/* <Col xl="2" lg="2" md="12">
									<FormGroup>
									<Label className="mb-0">중량</Label>
									<InputGroup >
									<Input type="text" name="declare_weight" id="declare_weight" placeholder="" bsSize={size} maxLength="18"
										value={declare.declare_weight?declare.declare_weight:''}
										onChange = {(event)=>onHandleReturnVal(event,'declare_weight')}  onBlur={onPropsReturn}
										/>
										<InputGroupAddon addonType="append">
											<InputGroupText className="p-1">kg</InputGroupText>
										</InputGroupAddon>
										</InputGroup>
								</FormGroup>		
							</Col>
							
								
							<Col xl="5" lg="5" md="12">
								<FormGroup>
									<Label className="mb-0">품명</Label>
									<InputValid 
										type="text"
										name="declare_goods_desc"
										id="declare_goods_desc"
										placeholder=""
										maxLength="35"
										bsSize={size}
										value={declare.declare_goods_desc?declare.declare_goods_desc:''}
										onChange={(e)=>onHandleReturnVal(e, 'declare_goods_desc')}
										onBlur={onPropsReturn}
										validtype="text"
										required={props.loadData.hbl_yn ==='N'?true:false} 
										feedid="declare"
									/>
								</FormGroup>		
							</Col>*/}
							{file && 
							<Col className="text-right">
								<FormGroup>
									<Label className="mt-4 mb-0 text-right pr-2">*파일첨부: 
										<Button 
											className="btn-link" 
											style={{paddingLeft:'8px',textDecorationLine:'underline',color:'blue'}} 
											onClick={()=>handleFileView(declare)}>{declare.declare_file_name}
										</Button>
										<button 
											color="danger"
											className="close pr-2 pt-2"
											type="button"
											onClick={()=>handleRemove(declare)}><i className="fa fa-trash" style={{color:'red'}}/></button>
									</Label>
								</FormGroup>
							</Col>}
						</Row>
							</Col>
							<div className="fileinput mt-1 mb-1">
								<input type="file" onChange={handleImageChange} ref={fileInput} />
							</div>
				</Row>
			</CardBody>
		</Card>
    );
}
