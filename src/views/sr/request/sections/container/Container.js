/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col, CardBody,FormGroup,Label,Input, Card,FormFeedback,Badge,
	InputGroup,InputGroupAddon,InputGroupText} from "reactstrap";
import * as validation from 'components/common/validation.js';
import axios from 'axios';
import Select from "react-select";
import InputValid from "components/CustomInput/InputValid.js";
export default function Container(props) { //console.log("cntr:",props)

	const {cntrData,codelist,size,bkgdata,checked,pack} = props;
	const [selectVal,setSelectVal] = React.useState("");
	const [cntr, setCntr] = useState({});
	//const [bkgNo, setBkgNo] = useState("");
	const vgmList = [{value:'SM1',label:'방법1'},{value:'SM2',label:'방법2'}]
	  
  	useEffect(() => {
    	setCntr({
			...cntrData,
			'cntr_res_bkg_no':cntrData.cntr_res_bkg_no?cntrData.cntr_res_bkg_no:bkgdata,
			'cntr_yn':cntrData.cntr_yn?cntrData.cntr_yn:props.checked?'Y':'N',
			'cntr_verifying_type':props.cntrData.cntr_verifying_type?props.cntrData.cntr_verifying_type:'SM2'
		});
  	},[cntrData]);
	useEffect(() => {
	    if(cntr.cntr_no && (cntr.cntr_verifying_type && cntr.cntr_verifying_type === 'SM2') && props.loadData.vsl_type === '41' && cntr.cntr_weight && cntr.cntr_vgm) {
	        let total = parseInt(cntr.cntr_weight)+parseInt(cntr.cntr_vgm);
	    	var list = {...cntr,'cntr_total_weight':String(total)};
	    	setCntr(list);
	    	props.propsData(list);
		}
	},[props.loadData.vsl_type]); 

	
/*  useEffect(() => {
	    //setCntr({...cntr,'cntr_res_bkg_no':props.bkgdata});
	    props.propsData({...cntrData,'cntr_res_bkg_no':props.bkgdata});
	  },[bkgdata]); */
  
/*  useEffect(() => {
	    //setCntr({...cntr,'cntr_res_bkg_no':props.bkgdata});
	    props.propsData({...cntrData,'cntr_yn':props.checked?'Y':'N'});
	  },[checked]); */
  

  

	const onHandleReturnValHan = (event,name) => {
		//if(!validation.validationHangle(event.target.value.toUpperCase())) {
		let list = {...cntr, [name]:event.target.value.toUpperCase()};
		setCntr(list);	
		// }
	}
 
	const onHandleReturnVal = (event,name) => {
		var list = {...cntr, [name]:event.target.value.toUpperCase()};
		setCntr(list);	
		
	}
 
	const onHandleCheckReturnVal = (data,name) => {
		let list = {...cntr, [name]:data.toUpperCase()};
		setCntr(list);
		props.propsData(list); 
	}
 
	const onChangeCntrReturnVal = (value,name) => {
		
		let list = {...cntr, [name]:value};
		setCntr(list);
		props.propsData(list); 
		
	}
 
	const onChangeCntrReturnValVgm = async(value,name) => {
		var list;
		var vVal = value; 
		if(cntr.cntr_no && vVal === 'SM2' && props.loadData.vsl_type === '41' && cntr.cntr_weight) { 
			if(!cntr.cntr_vgm) {
				const vgm = await onSelectWeidongVgm(); 
				if( props.loadData.vsl_type === '41') { 
					list = {...cntr,'cntr_total_weight':parseInt(cntr.cntr_weight?cntr.cntr_weight:0) + parseInt(vgm?vgm:0),'cntr_vgm':vgm, [name]:vVal}
				} else {
					list = {...cntr,'cntr_vgm':vgm,[name]:vVal}
				}
			} else {
				if(props.loadData.vsl_type === '41') {
					list = {...cntr,'cntr_total_weight':parseInt(cntr.cntr_weight) + parseInt(cntr.cntr_vgm),[name]:vVal};
				} else {
					list = {...cntr,[name]:vVal};
				}
			} 
		} else {
			list = {...cntr,[name]:vVal};
		}
		setCntr(list);
		props.propsData(list);  
	}
  
	const onPropsReturn = ()=> {
		props.propsData(cntr);
	}
  
    
	const onSelectWeidongVgm = async() => {
		return await axios.post("/shipper/getUserCntrWeightInfo",{user_no:props.user?props.user.user_no:'',line_code:'WDFC',cntr_no:cntr.cntr_no},{}).then(res => {
			var vgm;
			if(res.data) {  
				vgm = res.data.vgm;
			} else {	
				vgm = null;
			}
		return vgm;
		}); 
	}
  
	const onDeleteCntr =(data) => {
		props.deleteRow(data);
	}

	const onBlurCntrNo = async()=> {  
		var list;
		//계측 방법 2 경우 VGM 총 중량 자동 계산 (계측방법 2+weight+컨테이너 번호)
		if(cntr.cntr_no && (cntr.cntr_verifying_type && cntr.cntr_verifying_type === 'SM2') && cntr.cntr_weight) {
			if(!cntr.cntr_vgm) {
				const vgm = await onSelectWeidongVgm();
				if(props.loadData.vsl_type === '41') {  
					list = {...cntr,'cntr_total_weight':parseInt(cntr.cntr_weight) + parseInt(vgm),'cntr_vgm':vgm};
				} else {
					list = {...cntr,'cntr_vgm':vgm};
				}
			} else {
				if(props.loadData.vsl_type === '41') { 
					list = {...cntr,'cntr_total_weight':parseInt(cntr.cntr_weight) + parseInt(cntr.cntr_vgm)};
				} else {
					list=cntr;
				}
			}
		} else {
			list = cntr;
		}

		setCntr(list);
		props.propsData(list);  
	}
    
	const onBlurProps = ()=>{
		props.propsData(cntr);
	}

	  
	const onChangeCntrBookmark = (value) =>{
		setSelectVal(value);
		axios.post("/shipper/getUserCntrBookmark",{user_no:props.user?props.user.user_no:'',seq:value}).then(res => {  
			setCntr({...res.data[0],'cntr_yn':cntr.cntr_yn?cntr.cntr_yn:checked?'Y':'N'}); 
			props.propsData({...res.data[0],'cntr_yn':cntr.cntr_yn?cntr.cntr_yn:checked?'Y':'N'});	            	    
		});
	}
	  

  
  	return (
		<Card className="no-transition mb-2" style={{border:'1px solid silver',zIndex:props.zindex}}> 	   
			<CardBody className="pt-0 pb-3">
				<Row>
					<Col className="pb-2 pr-2">
				     	<button
			              className="close mt-1"
			              type="button"
			              onClick={(cntr) => onDeleteCntr(cntr)}
			            >×</button>
			      	</Col>
				</Row>
				<Row>
					<Col xl="0" className="col-0 pl-2 mt-auto mb-auto">
						<FormGroup check style={{height:'69px'}}>
							<Label check>
							<Input 
								type="checkbox"  
								checked={cntr.cntr_yn==="Y"?true:false} 
								onChange = {()=>onHandleCheckReturnVal(cntr.cntr_yn==="Y"?"N":"Y",'cntr_yn')}/>
								<span className="form-check-sign"/>
							</Label>
						</FormGroup>
					</Col>
					<Col>
						<Row>
							<Col xl="4" lg="4" md="6">
								<FormGroup className="mb-1">
									<Select
										className="customSelect bg-white"
										classNamePrefix="customSelect"
										name="cargo_mark_bookmark_seq"
										value={{value:selectVal?selectVal:'',
												label:selectVal?(props.bookmarkoption.findIndex(x=>x.value===selectVal)>=0)?props.bookmarkoption[props.bookmarkoption.findIndex(x=>x.value===selectVal)].label:'선택':'선택'
										}}
										//onChange={(value)=>setBooking({...booking,'trans_service_code':value.value})}
										onChange = {(value)=>onChangeCntrBookmark(value.value,'cargo_mark_bookmark_seq')}
										//onBlur={(e)=>props.fncBookingParent(booking)}
										options={props.bookmarkoption}
										styles={{
											control: provided => ({...provided,minHeight:!size?'40px':'28px',height:!size?'40px':'28px'}),
											indicatorsContainer: provided => ({...provided,height:!size?'40px':'28px'})
										}}/>
							
										{/*<Input type="select" bsSize={size} value={selectVal}
											onChange={(event)=>onChangeCntrBookmark(event)}>
											//invalid={!cntr.cntr_code?true:false}
										<option value="">선택</option>
										{props.bookmarkoption && props.bookmarkoption.length >0?
												props.bookmarkoption.map((data,key)=>
												<option key={"bk_"+key} value={data.value}>{data.label}</option>
												):<></>}
										</Input>
											<FormFeedback>{validation.REQ_MSG}</FormFeedback>*/}
								</FormGroup>	
							</Col>
						</Row>
						<Row>
							<Col xl="2" className="col-12">
								<FormGroup className="mb-1">
									<Label className="mb-0">Container No</Label>
									<InputValid 
										type="text"
										name="cntr_no"
										id="cntr_no"
										maxLength="11"
										bsSize={size}
										value={cntr.cntr_no?cntr.cntr_no:''}
										onChange={(e)=>onHandleReturnVal(e, 'cntr_no')}
										onBlur={onBlurCntrNo}
										validtype="engNumber"
										required={true} 
										feedid="container"
									/>
								</FormGroup>	
							</Col>
							<Col xl="2" className="col-12">
								<FormGroup className="mb-1">
									<Label className="mb-0">Seal No</Label>
									<InputValid 
										type="text"
										name="cntr_seal"
										id="cntr_seal"
										maxLength="10"
										bsSize={size}
										value={cntr.cntr_seal?cntr.cntr_seal:''}
										onChange={(e)=>onHandleReturnVal(e, 'cntr_seal')}
										onBlur={onBlurProps}
										validtype="text"
										required={true} 
										feedid="container"
									/>
								</FormGroup>
							</Col>
							<Col xl="2" className="col-12">
								<FormGroup className="mb-1">
									<Label className="mb-0">Size/Type</Label>
									<Select
										className="customSelect"
										classNamePrefix="customSelect"
										name="cntr_code"
										placeholder=""
										value={{value:cntr.cntr_code?cntr.cntr_code:'',
										label:cntr.cntr_code?
											(codelist.findIndex(x=>x.value===cntr.cntr_code)>=0)?
													codelist[codelist.findIndex(x=>x.value===cntr.cntr_code)].label:
												'선택':'선택'
										}}
										getOptionLabel = {options=>options.label+" ["+options.value+"] "}
										onChange = {(value)=>onChangeCntrReturnVal(value.value,'cntr_code')}
										options={codelist}
										styles={{
											control: provided => ({...provided,border:!cntr.cntr_code?'1px solid red':'',minHeight:!size?'40px':'',height:!size?'40px':''}),
											indicatorsContainer: provided => ({...provided,height:!size?'40px':''})
										}}
									/>
									<InputValid 
										hidden
										name="cntr_code"
										id="cntr_code"
										placeholder=""
										maxLength="4"
										bsSize="sm"
										value={cntr.cntr_code?cntr.cntr_code:''}
										validtype="text"
										required={true} 
										readOnly
										feedid="container"
									/>
								{/*<Input type="select" bsSize={size} value={cntr.cntr_code?cntr.cntr_code:''}
									onChange={(event)=>onChangeCntrReturnVal(event,'cntr_code')}
									invalid={!cntr.cntr_code?true:false}>
								<option value="">선택</option>
								{codelist.length>0?codelist.map((data,key)=>
									<option key={key} value={data.cntr_code}>{data.cntr_code_name}</option>
								):<></>}
								</Input>
									<FormFeedback feedid="container">{validation.REQ_MSG}</FormFeedback>*/}
								</FormGroup>	
							</Col>
							<Col xl="2" className="col-12">
								<FormGroup className="mb-1">
									<Label className="mb-0">Weight</Label>
									{/* <InputValid 
										type="text"
										name="cntr_weight"
										id="cntr_weight"
										maxLength="18"
										bsSize={size}
										value={cntr.cntr_weight?cntr.cntr_weight:''}
										onChange={(e)=>onHandleReturnVal(e, 'cntr_weight')}
										onBlur={onBlurProps}
										validtype="number"
										required={true} 
										inputgrouptext="KG"
										feedid="container"
									/> */}
									<InputGroup >
										<Input type="number" bsSize={size} name="cntr_weight" id="cntr_weight" placeholder="" value={cntr.cntr_weight?cntr.cntr_weight:''}
											onChange = {(event)=>onHandleReturnValHan(event,'cntr_weight')}
										onBlur={onBlurCntrNo} invalid={!cntr.cntr_weight?true:false} maxLength="18"/>
										<InputGroupAddon addonType="append">
										<InputGroupText className="p-1" style={{border:!cntr.cntr_weight?'1px solid red':'',borderRadius:'0 4px 4px 0'}}>kg</InputGroupText>
										</InputGroupAddon>
										<FormFeedback feedid="container">{validation.REQ_MSG}</FormFeedback>
									</InputGroup>
								</FormGroup>
							</Col>
							{/*<Col xl="2"  className="col-6">
								<FormGroup>
									<Label className="mb-0">Volume</Label>
									<InputGroup >
										<Input type="number" bsSize={size} name="cntr_total_volume" id="cntr_total_volume" placeholder="" value={cntr.cntr_total_volume?cntr.cntr_total_volume:''}
											onChange = {(event)=>onHandleReturnValHan(event,'cntr_total_volume')}
										onBlur={onPropsReturn} //invalid={!cntr.cntr_total_volume?true:false} 
											maxLength="18"/>
										<InputGroupAddon addonType="append">
										<InputGroupText className="p-1" >CBM</InputGroupText>
										</InputGroupAddon>
										{/FormFeedback feedid="container">{validation.REQ_MSG}</FormFeedback>*
										</InputGroup>
								</FormGroup>
							</Col>	*/}
							<Col xl="4" className="col-12">
								<FormGroup className="mb-1">
									<Label className="mb-0">Package</Label>
									<Row>
										<Col className="col-8 pr-1">
											<Select
												className="customSelect"
												classNamePrefix="customSelect"
												name="cntr_carton_code"
												placeholder=""
												value={{value:cntr.cntr_carton_code?cntr.cntr_carton_code:'',
														label:cntr.cntr_carton_code?
														(pack.findIndex(x=>x.value===cntr.cntr_carton_code)>=0)?
																pack[pack.findIndex(x=>x.value===cntr.cntr_carton_code)].label:
															'선택':'선택'
												}}
												onChange = {(value)=>onChangeCntrReturnVal(value.value,'cntr_carton_code')}
												options={pack}
												getOptionLabel = {options=>options.label+" ["+options.value+"] "}
												styles={{
													control: provided => ({...provided,border:!cntr.cntr_carton_code?'1px solid red':'',minHeight:!size?'40px':'',height:!size?'40px':''}),
													indicatorsContainer: provided => ({...provided,height:!size?'40px':''})
												}}
											/>
											<InputValid 
												hidden
												name="cntr_carton_code"
												id="cntr_carton_code"
												placeholder=""
												maxLength="2"
												bsSize="sm"
												value={cntr.cntr_carton_code?cntr.cntr_carton_code:''}
												validtype="text"
												required={true} 
												readOnly
												feedid="container"
											/>
											{/*<Input type="select" bsSize={size} className="pt-0 pb-0" value={cntr.cntr_carton_code?cntr.cntr_carton_code:''} 
											onChange = {(event)=>onChangeCntrReturnVal(event,'cntr_carton_code')}
											invalid={(!cntr.cntr_carton_qty || !cntr.cntr_carton_qty)?true:false} >
												<option value="">선택</option>
												{pack.length>0?pack.map((data,key) => 
													<option key={key} value={data.cargo_pack_type}>{data.cargo_pack_type_desc+" ["+data.cargo_pack_type+"]"}</option>):<></>}
												</Input>
												<FormFeedback feedid="container">{validation.REQ_MSG}</FormFeedback>*/}
										</Col>
										<Col className="col-4 pl-1">
											<InputValid 
												type="text"
												name="cntr_carton_qty"
												id="cntr_carton_qty"
												maxLength="8"
												bsSize={size}
												value={cntr.cntr_carton_qty?cntr.cntr_carton_qty:''}
												onChange={(e)=>onHandleReturnVal(e, 'cntr_carton_qty')}
												onBlur={onPropsReturn}
												validtype="number"
												required={true} 
												feedid="container"
											/>
										</Col>
									</Row>
								</FormGroup>
							</Col>
							{/* {(!props.loadData.vsl_type || props.loadData.vsl_type && props.loadData.vsl_type === '41') &&
							<Col xl="8" lg="8" md="12" className="col-12">
								<Row>
									<Col xl="1">
										<Badge className="mr-1" color="default" pill>VGM</Badge>
									</Col>
									<Col>
										<Row>
											<Col xl="3">
												<FormGroup className="mb-1">
													<Label className="mb-0">Verifying Type</Label>
													<Select
														className="customSelect"
														classNamePrefix="customSelect"
														name="cntr_verifying_type"
														value={{value:cntr.cntr_verifying_type ?cntr.cntr_verifying_type :'',
														label:cntr.cntr_verifying_type?
															(vgmList.findIndex(x=>x.value===cntr.cntr_verifying_type)>=0)?
																	vgmList[vgmList.findIndex(x=>x.value===cntr.cntr_verifying_type)].label:
																'선택':'선택'
														}}
														onChange = {(value)=>onChangeCntrReturnValVgm(value.value,'cntr_verifying_type')}
														options={vgmList}
														styles={{
															control: provided => ({...provided,border:(props.loadData.vsl_type && props.loadData.vsl_type === '41') && !cntr.cntr_verifying_type?'1px solid red':'',minHeight:!size?'40px':'',height:!size?'40px':''}),
															indicatorsContainer: provided => ({...provided,height:!size?'40px':''})
														}}
													/>
													<InputValid 
														hidden
														name="cntr_verifying_type"
														id="cntr_verifying_type"
														maxLength="3"
														bsSize="sm"
														value={cntr.cntr_verifying_type?cntr.cntr_verifying_type:''}
														validtype="text"
														required={(props.loadData.vsl_type && props.loadData.vsl_type === '41') && !cntr.cntr_verifying_type?true:false} 
														readOnly
														feedid="container"
													/>
												</FormGroup>
											</Col>
											<Col xl="3">
												<FormGroup className="mb-1">
													<Label className="mb-0">BkgNo</Label>
													<InputValid 
														type="text"
														name="cntr_res_bkg_no"
														id="cntr_res_bkg_no"
														placeholder=""
														maxLength="35"
														bsSize={size}
														value={cntr.cntr_res_bkg_no?cntr.cntr_res_bkg_no:''}
														onChange={(e)=>onHandleReturnVal(e, 'cntr_res_bkg_no')}
														onBlur={onBlurProps}
														validtype="text"
														required={(props.loadData.vsl_type && props.loadData.vsl_type === '41')?true:false} 
														feedid="container"
													/>
												</FormGroup>
											</Col>
											<Col xl="3">
											<FormGroup className="mb-1">
												<Label className="mb-0">PIC Name</Label>
													<InputValid 
														type="text"
														name="cntr_auth_user_name"
														id="cntr_auth_user_name"
														maxLength="35"
														bsSize={size}
														value={cntr.cntr_auth_user_name?cntr.cntr_auth_user_name:''}
														onChange={(e)=>onHandleReturnVal(e, 'cntr_auth_user_name')}
														onBlur={onBlurProps}
														validtype="text"
														required={(props.loadData.vsl_type && props.loadData.vsl_type === '41')?true:false} 
														feedid="container"
													/>
												</FormGroup>
											</Col>
											<Col xl="3" className="col-12">
												<FormGroup className="mb-1">
													<Label className="mb-0">TotalWeight</Label>
													<InputGroup >
														<Input 
															type="number" bsSize={size} name="cntr_total_weight" id="cntr_total_weight" placeholder="" value={cntr.cntr_total_weight?cntr.cntr_total_weight:''}
															onChange = {(event)=>onHandleReturnValHan(event,'cntr_total_weight')}
															onBlur={onPropsReturn}  invalid={(props.loadData.vsl_type && props.loadData.vsl_type === '41') && !cntr.cntr_total_weight?true:false} maxLength="18"/>
															<InputGroupAddon addonType="append">
																<InputGroupText className="p-1" style={{border:(props.loadData.vsl_type && props.loadData.vsl_type === '41') &&!cntr.cntr_total_weight?'1px solid red':'',borderRadius:'0 4px 4px 0'}}>kg</InputGroupText>
															</InputGroupAddon>
															<FormFeedback feedid="container">{validation.REQ_MSG}</FormFeedback>
													</InputGroup>
												</FormGroup>
											</Col>
										</Row>
									</Col>
								</Row>
							</Col>} */}
						</Row>	
					</Col>
				</Row>
			</CardBody>
		</Card>
    );
}
