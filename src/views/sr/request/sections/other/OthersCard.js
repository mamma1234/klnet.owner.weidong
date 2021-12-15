/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
     Button,FormGroup,Label,Card, UncontrolledTooltip,FormText} from "reactstrap";
import Select from "react-select";
import OthersBookmark from './OthersBookmark.js';
import Others from './Others.js';
import axios from 'axios';
//import * as validation from 'components/common/validation.js';
import InputValid from "components/CustomInput/InputValid.js";

let othersData = {};

const OthersCard = React.forwardRef((props,bookingFocus) => {

	const {bookmark,loadData,openWindow} = props;
	const [others, setOthers] = useState([]);
	const [propsData, setPropsData] = useState({});
	const [bkgData, setBkgData] = useState([]);
	const [bookmarkView, setBookmarkView] = useState(false);
	const [modalTitle, setModalTitle] = useState("Booking Info");
	const [coll, setColl] = useState(false);
	const [open, setOpen] = useState(false);
	const [serviceList, setServiceList] = useState([]);
	const blTypeList = [{value:'5',label:'ORIGINAL B/L'},{value:'3',label:'SURRENDER B/L'}];

	const hblList = [{value:'Y',label:'Yes'},{value:'N',label:'No'}];
	const linePaymentList = [{value:'P',label:'PREPAID'},{value:'C',label:'COLLECT'}];
   
	useEffect(() => { 
		setOthers(loadData);
		if(props.user) {
			axios.post("/shipper/selectLineCodeServiceType",{ params:{line_code:'WDFC'} }).then(res => setServiceList(res.data));
		}
	},[loadData]);
	
	useEffect(() => {
			setColl(openWindow);
			if(openWindow) {
				getUserBookingList();
			}
		},[openWindow]);
	
	const toggle = (params) => {
	
	if(params==='B') {
		setModalTitle("Booking BookMark");
		props.onLoadData("ot");
	/*	  setPropsData({'other_bookmark_name':'','other_bookmark_seq':'','sc_no':'',
				'document_no':'',
				'trans_service_code':'',
				'bl_type':'',
				'line_payment_type':'',
				'hbl_yn':'',
				'remark1':'',
				'remark2':''});*/ //console.log("others.trans_service_code:",others.trans_service_code)
		setPropsData({other_bookmark_name:'',other_bookmark_seq:'',sc_no:others.sc_no,
					trans_service_code:others.trans_service_code,
					bl_type:others.bl_type,
					line_payment_type:others.line_payment_type,
					hbl_yn:others.hbl_yn});
		othersData=loadData;
		setBookmarkView(true);
	} else {
		setModalTitle("Booking Info");
		setPropsData(loadData);
		othersData=loadData;
		setBookmarkView(false);
		getUserBookingList(loadData);
	}
	setOpen(!open);
	}
  
  // 전체화면 css 적용을 위한 state
  
	const getUserBookingList = (data) => {
		if(props.user) {
			axios.post("/shipper/getUserBookingInfo",{user_no:props.user?props.user.user_no:'',bkg_no:'',lineCode:'WDFC'},{}).then(res => {
				setBkgData(res.data);
			});
		}
			
	}
  
	const onInitData = () => {
		othersData=null;
		setPropsData({'other_bookmark_name':'','other_bookmark_seq':'','sc_no':'',
			//'document_no':'',
			'trans_service_code':'',
			'bl_type':'',
			'line_payment_type':'',
			'hbl_yn':''
			});
	
	}
  
	const onBookMarkDelete = () => {
		if(othersData && othersData.other_bookmark_seq) {
			axios.post("/shipper/setUserOtherBookmarkDel",{user_no:props.user?props.user.user_no:'',data:othersData},{})								
			.then(res => {onInitData();
						props.onLoadData("ot");
						props.onAlert("success","선택한 BOOKMARK 가 삭제되었습니다.");
			});
		} else {
			props.onAlert("error","삭제 할 BOOKMARK를 선택해주세요.");
		}
		
	}
	
    // 자식의 Data 적용
	const onBookMarkData = (data) => {
		othersData = data;	
	}
	
	//const onApplyData = async ()=> {
	const onApplyData = ()=> {

	        let data;
	        data = {...othersData,goods_desc:fnc_transGoods(othersData.trans_service_code,othersData.goods_desc)}
			setOpen(!open);
			setOthers(data);
			props.mergeData(data);
			setColl(true);
	}
	
	const onSaveBookmark =()=> {

		if(othersData.other_bookmark_name !==null && othersData.other_bookmark_name !=="") {

			axios.post("/shipper/setUserOthersBookmark",{user_no:props.user?props.user.user_no:'',data:othersData},{})								
	  	  	.then(res => {props.onLoadData("ot");
	  	  	if(othersData.other_bookmark_seq) {
	  	  		props.onAlert("success","작성한 BOOKMARK 가 수정되었습니다.");
	  	  	} else {
	  	  		props.onAlert("success","작성한 BOOKMARK 가 저장되었습니다.");
	  	  	}
	  	  
	  	  	});
		} else {
			props.onAlert("error","other_bookmark_name 는 필수 입력 항목 입니다.");
		}
	}

	const onChangeOthers =(value)=> {
		if(value) {
			setOthers({...others,'other_bookmark_seq':value.value,'other_bookmark_name':value.label});

			if(value.value > 0) {
				axios.post("/shipper/getUserOtherBookmark",{user_no:props.user?props.user.user_no:'',seq:value.value},{}).then(res => {

					const newOhter={
						bl_type:res.data[0].bl_type?res.data[0].bl_type:others.bl_type,
						cargo_class:res.data[0].cargo_class?res.data[0].cargo_class:others.cargo_class,
						document_no:res.data[0].document_no?res.data[0].document_no:others.document_no,
						hbl_yn:res.data[0].hbl_yn?res.data[0].hbl_yn:others.hbl_yn,
						invoice_no: res.data[0].invoice_no?res.data[0].invoice_no:others.invoice_no,
						label:res.data[0].label?res.data[0].label:others.label,
						lc_expiry_date:res.data[0].lc_expiry_date?res.data[0].lc_expiry_date:others.lc_expiry_date,
						lc_no:res.data[0].lc_no?res.data[0].lc_no:others.lc_no,
						lc_yn:res.data[0].lc_yn?res.data[0].lc_yn:others.lc_yn,
						line_payment_type:res.data[0].line_payment_type?res.data[0].line_payment_type:others.line_payment_type,
						org_bl_need_yn:res.data[0].org_bl_need_yn?res.data[0].org_bl_need_yn:others.org_bl_need_yn,
						other_bookmark_name:res.data[0].other_bookmark_name?res.data[0].other_bookmark_name:others.other_bookmark_name,
						other_bookmark_seq:res.data[0].other_bookmark_seq?res.data[0].other_bookmark_seq:others.other_bookmark_seq,
						part_sr_qty:res.data[0].part_sr_qty?res.data[0].part_sr_qty:others.part_sr_qty,
						po_no:res.data[0].po_no?res.data[0].po_no:others.po_no,
						remark1:res.data[0].remark1?res.data[0].remark1:others.remark1,
						remark2:res.data[0].remark2?res.data[0].remark2:others.remark2,
						remark3:res.data[0].remark3?res.data[0].remark3:others.remark3,
						remark4:res.data[0].remark4?res.data[0].remark4:others.remark4,
						remark5:res.data[0].remark5?res.data[0].remark5:others.remark5,
						sc_no:res.data[0].sc_no?res.data[0].sc_no:others.sc_no,
						sr_amount:res.data[0].sr_amount?res.data[0].sr_amount:others.sr_amount,
						trans_service_code:res.data[0].trans_service_code?res.data[0].trans_service_code:others.trans_service_code,
						value:res.data[0].value?res.data[0].value:others.value,
					}
					const mergeData = Object.assign(others,newOhter);
					setOthers(mergeData);
					props.mergeData(newOhter);
					setColl(true);
					//props.setWindow(true);
				});
			}
		}else {
			const list={
				bl_type:null,
				cargo_class:null,
				document_no:null,
				hbl_yn:null,
				invoice_no:null,
				label:null,
				lc_expiry_date:null,
				lc_no:null,
				lc_yn:null,
				line_payment_type:null,
				org_bl_need_yn:null,
				other_bookmark_name:null,
				other_bookmark_seq:null,
				part_sr_qty:null,
				po_no:null,
				remark1:null,
				remark2:null,
				remark3:null,
				remark4:null,
				remark5:null,
				sc_no:null,
				sr_amount:null,
				trans_service_code:null,
				value:null,
				other_bookmark_seq:null,
				other_bookmark_name:null
			}
			setOthers(list);
			props.mergeData(list);
		}
	}

	const onHandleReturnVal = (event,name) => { 
		//if(validation.getByte(event.target.value) < 36) {
			//if(!validation.validationHangle(event.target.value.toUpperCase())) {
				let list = {...others, [name]:event.target.value.toUpperCase()};
				setOthers(list);
		//  }
		//} else {
		//  props.onAlert("error",validation.EXCD_MSG+"(35 Byte)");
		//}
	}
	  
	const fnc_transGoods = (trans,goods) => {
		
		let goods_data = goods;
		let returnValue;
		
		if("1" === trans) {
			if(goods) {
				var goodsSplit = goods_data.split('\n');
				if("SHIPPER'S LOAD. COUNT & SEAL" === goodsSplit[0]) {
					goodsSplit[0] = "SHIPPER'S LOAD. COUNT & SEAL";
					goodsSplit[1] = "SAID TO CONTAIN :";
					goods_data = goodsSplit.join('\n');
				} else if ("SAID TO CONTAIN :" === goodsSplit[0]) {
					goodsSplit[0] = "\n";
					goods_data = goodsSplit.join('\n');
				} else {
					goods_data = "\n\n"+goodsSplit.join('\n');
				}
				var goodsDesc = goods_data.split('\n');
				goodsDesc[0] = "SHIPPER'S LOAD. COUNT & SEAL";
				goodsDesc[1] = "SAID TO CONTAIN :";
				returnValue = goodsDesc.join('\n');					  
			} else {
				returnValue = "SHIPPER'S LOAD. COUNT & SEAL\nSAID TO CONTAIN :\n";
			}
		} else if("3" === trans) {
			if(goods) {
				var goodsSplit = goods_data.split('\n');
				if("SAID TO CONTAIN :" === goodsSplit[0]) {
					goodsSplit[0] = "SAID TO CONTAIN :";
				} else if ("SHIPPER'S LOAD. COUNT & SEAL" === goodsSplit[0]) {
					goodsSplit[0] ="SAID TO CONTAIN :";
					goodsSplit.splice(1,1);
					goods_data = goodsSplit.join('\n');
				} else {
					goods_data = "\n"+goodsSplit.join('\n');
				}
				var goodsDesc = goods_data.split('\n');
				goodsDesc[0] = "SAID TO CONTAIN :";
				returnValue = goodsDesc.join('\n');					  
			} else {
				returnValue = "SAID TO CONTAIN :\n";
			} 
		}
		
		return returnValue;
	}
	  
	const onHandleSelectReturnVal = (value,name) => {

		let list;
		if('trans_service_code' === name) {
			var goodsData = others.goods_desc;
			list = {...others, [name]:value, goods_desc:fnc_transGoods(value,others.goods_desc)};
		} else {
			list = {...others, [name]:value};
		}
		setOthers(list);	
		props.mergeData(list);

	}
	
	const onPropsReturn = ()=> {
		props.mergeData(others);
	}

	  
	const onBlurBooking = () => {  
		if(loadData.res_bkg_no != others.res_bkg_no) {
			getBkgInfo();
		}
	}  
	
	const getBkgInfo=(list,bkgNo,bkglist)=>{
		axios.post("/shipper/getUserBookingInfo",{user_no:props.user?props.user.user_no:'',bkg_no:bkgNo,lineCode:'WDFC'},{}).then(res => { 
			if(res.data.length > 0 ) { //console.log("res.data:",res.data);
				let cons = {};
				
				if(props.samec) {
					
					cons = {'noti_name1':res.data[0].cons_name1,'noti_name2':res.data[0].cons_name2,'noti_address1':res.data[0].cons_address1,
								'noti_address2':res.data[0].cons_address2,'noti_address3':res.data[0].cons_address3,
								'noti_address4':res.data[0].cons_address4,'noti_address5':res.data[0].cons_address5};
				}
				let data = {...list,...res.data[0],'sch_srd':res.data[0].sch_etd,'bk_link':'Y','bkglist':bkglist,...cons};
				
				let trans_service_code = res.data[0].trans_service_code;
				
				if(trans_service_code){
					var goodsData = others.goods_desc; //console.log("goodsData:",goodsData)
						
						if("1" === trans_service_code) {
							if(goodsData) {
								
								var goodsSplit = goodsData.split('\n');
								if("SHIPPER'S LOAD. COUNT & SEAL" === goodsSplit[0]) {
									goodsSplit[0] = "SHIPPER'S LOAD. COUNT & SEAL";
									goodsSplit[1] = "SAID TO CONTAIN :";
									goodsData = goodsSplit.join('\n');
								} else if ("SAID TO CONTAIN :" === goodsSplit[0]) {
									goodsSplit[0] = "\n";
									goodsData = goodsSplit.join('\n');
								} else {
									goodsData = "\n\n"+goodsSplit.join('\n');
								}
								var goodsDesc = goodsData.split('\n');
								goodsDesc[0] = "SHIPPER'S LOAD. COUNT & SEAL";
								goodsDesc[1] = "SAID TO CONTAIN :";
								data = {...data,goods_desc:goodsDesc.join('\n')}
							} else {
								data = {...data,goods_desc:"SHIPPER'S LOAD. COUNT & SEAL\nSAID TO CONTAIN :\n"}
							}
						} else {
							if(goodsData) {
								var goodsSplit = goodsData.split('\n');
								if("SAID TO CONTAIN :" === goodsSplit[0]) {
									goodsSplit[0] = "SAID TO CONTAIN :";
								} else if ("SHIPPER'S LOAD. COUNT & SEAL" === goodsSplit[0]) {
									goodsSplit[0] ="SAID TO CONTAIN :";
									goodsSplit.splice(1,1);
									goodsData = goodsSplit.join('\n');
								} else {
									goodsData = "\n"+goodsSplit.join('\n');
								}
								var goodsDesc = goodsData.split('\n');
								goodsDesc[0] = "SAID TO CONTAIN :";	
								data = {...data,goods_desc:goodsDesc.join('\n')}
							} else {
								data = {...data,goods_desc:"SAID TO CONTAIN :\n"}
							} 
						}
				} 
				setOthers(data);	
				props.mergeData(data);
			} else {
				let data = {...list,'res_bkg_no':bkgNo,'bk_link':'N','bkglist':bkglist};
				setOthers(data);	
				props.mergeData(data);
			}
		}); 
	}
	
	const onChangeBookings = async(value)=>{
		let bkg_no;
		let list;
		if(value) {
			
			if(value.length>0) {
				value.map((data,key)=> {bkg_no=data.value});
				list = value;
			} else {
				list = [value];
				bkg_no = value.res_bkg_no;
			}
			if(bkg_no) {
				await getBkgInfo(others,bkg_no,list);
			}	  	  
		} else {
			setOthers({...others,'bkglist':value});	
			props.mergeData({...others,'bkglist':value});
		}
	}

	  
  	return (
    	<>
			<Row id="Others">
				<Col xl="12" lg="12">
					<Card style={{zIndex:'11',border:'1px solid silver',borderRadius:'10px'}}>
						<CardBody className="pt-3 pb-0">  
							<Row className="pb-2">
								<Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>BOOKING
									<Button
										className="pl-1"
										color="link"
										//outline
										id="otview"
										onClick={toggle.bind(this, 'S')}
										//style={{position:'relative',backgroundColor:'white'}}
									>
										<i className="fa fa-pencil-square-o fa-2x"/>
									</Button>
									<UncontrolledTooltip delay={0} target="otview">Input</UncontrolledTooltip>
								</Col>
								<Col>
									<Row>
										<Col className="col-10 pr-0">
											<Select
												className="react-select react-select-primary"
												classNamePrefix="react-select"
												name="bookingbookmark"
												value={{value:others.other_bookmark_seq?others.other_bookmark_seq:'',label:others.other_bookmark_name?others.other_bookmark_name:''}}
												onChange={(value)=>onChangeOthers(value)}
												options={bookmark}
												placeholder="선택"
												ref={bookingFocus}
												isClearable={others.other_bookmark_seq?true:false}/>
										</Col>
										<Col className="col-2 pl-auto pr-auto">
											<Button className="pl-0 pr-0" color="link" id="otbookmark" onClick={toggle.bind(this, 'B')}><i className="fa fa-bookmark-o fa-2x" /></Button>
											<UncontrolledTooltip delay={0} target="otbookmark">Bookmark</UncontrolledTooltip>
										</Col>
									</Row>
								</Col>
							</Row>
							<Collapse isOpen={coll}>
								<hr className="mt-0"/>
								<Row style={{fontSize:'12px'}}>
									<Col className="col-12">
										<FormGroup className="mb-1">
											<Row>
												<Col xl="1" className="col-2" style={{marginRight:'6px'}}>
													<Label className="mb-0">Bkg&nbsp;No</Label>
												</Col>
												<Col>
													<Select
														className="customSelect react-select-primary"
														classNamePrefix="customSelect"
														name="bkg_no"
														placeholder={bkgData.length<1?"Confirm Booking no data":"선택"}
														value={others.bkglist}
														onChange={(value)=>onChangeBookings(value)}                          
														options={bkgData}
														getOptionLabel={(option)=>option.sr_status?option.label+" [ SR"+option.sr_status+"]":option.label}
														styles={{
																control: provided => ({...provided,border:!others.res_bkg_no?'1px solid red':others.part_bl && others.part_bl === 'Y'?'2px solid green':'' }),
																indicatorContainer: provided => ({...provided,color:''})
															}}
														isDisabled = {others.part_bl && others.part_bl === 'Y'?true:false}/>
													<InputValid 
														type="hidden"
														bsSize="sm"
														name="res_bkg_no"
														id="res_bkg_no"
														maxLength="15"
														value={others.res_bkg_no?others.res_bkg_no:''}
														validtype="text" 
														required={true}
														feedid="booking"/>
														{ /* <Select
															className="react-select"
																//isMulti
																options={bkgData}
																placeholder="BKG NUMBER"
																value={others.bkglist}	
																//closeMenuOnSelect={false}
																onChange={(value)=>onChangeBookings(value)}
																styles={{
																menu: provided => ({...provided, zIndex:9999}),
																	control: provided => ({...provided,minHeight:'31px' }),
																	indicatorsContainer: provided => ({...provided,height:'31px'})
																}}
															/>
														*/}	
													{(others.bk_link === 'Y')&&<FormText className="text-success">Booking info Apply</FormText>}
													{(others.part_bl === 'Y')&&<FormText className="text-success">Part B/L</FormText>}
												</Col>
											</Row>
										</FormGroup>
									</Col>
									<Col>
									<FormGroup className="mb-1">
										<Row>
											<Col xl="2" className="col-2 pr-0">
												<Label className="mb-0">SC Number</Label>
											</Col>
											<Col style={{paddingTop:'2px'}}>
												<InputValid 
													type="text"
													bsSize="sm"
													name="sc_no"
													id="sc_no"
													maxLength="12"
													value={others.sc_no?others.sc_no:''}
													onChange={(e)=>onHandleReturnVal(e, 'sc_no')}
													onBlur={onPropsReturn}
													validtype="text" 
													required={false}
													feedid="booking"/>
											</Col>
										</Row>
									</FormGroup>
								</Col>
								
								<Col xl="5" lg="12" md="12">
									<FormGroup className="mb-1">
										<Row>
											<Col xl="3" className="pr-0 pt-1 col-2">
												<Label className="mb-0">BL&nbsp;Type</Label>
											</Col>
											<Col>
												<Select
													className="customSelect"
													classNamePrefix="customSelect"
													//className="react-select react-select-primary"
													//classNamePrefix="react-select"
													name="bl_type"
													value={{value:others.bl_type?others.bl_type:'',
													label:others.bl_type?
														(blTypeList.findIndex(x=>x.value===others.bl_type)>=0)?
														blTypeList[blTypeList.findIndex(x=>x.value===others.bl_type)].label:
															'선택':'선택'
													}}
													//onChange={(value)=>setBooking({...booking,'trans_service_code':value.value})}
													onChange = {(value)=>onHandleSelectReturnVal(value.value,'bl_type')}
													//onBlur={(e)=>props.fncBookingParent(booking)}
													options={blTypeList}
														styles={{
															control: provided => ({...provided,border:!others.bl_type?'1px solid red':'' }),
															indicatorContainer: provided => ({...provided,color:''})
														}}/>
												<InputValid 
													hidden
													name="bl_type"
													id="bl_type"
													placeholder=""
													maxLength="1"
													bsSize="sm"
													value={others.bl_type?others.bl_type:''}
													//onChange={(e)=>onHandleReturnVal(e, 'sch_fdp_name')}
													//onBlur={onPropsReturn}
													validtype="text"
													required={true} 
													readOnly
													feedid="booking"/>
													{/*	<Input type="select"  bsSize="sm" className="pt-0 pb-0" value={others.bl_type?others.bl_type:''} 
														onChange = {(event)=>onHandleSelectReturnVal(event,'bl_type')}
														invalid={!others.bl_type?true:false}
														>
															<option value="">선택</option>
															<option value="1">ORIGINAL B/L</option>
															<option value="2">SURRENDER B/L</option>
														</Input>
													<FormFeedback feedid="booking">{validation.REQ_MSG}</FormFeedback>	*/}
											</Col>
										</Row>
									</FormGroup>
								</Col>
								<Col xl="7" lg="12" md="12">
									<FormGroup className="mb-1">
										<Row>
											<Col xl="2" className="pr-0 pt-1 col-2">
												<Label className="mb-0">Term</Label>
											</Col>
											<Col>
												<Select
													className="customSelect"
													classNamePrefix="customSelect"
													//className="react-select react-select-primary"
													//classNamePrefix="react-select"
													name="trans_service_code"
													value={{value:others.trans_service_code?others.trans_service_code:'',
													label:others.trans_service_code?
														(serviceList.findIndex(x=>x.value===others.trans_service_code)>=0)?
																serviceList[serviceList.findIndex(x=>x.value===others.trans_service_code)].label:
															'선택':'선택'
													}}
													onChange = {(value)=>onHandleSelectReturnVal(value.value,'trans_service_code')}
													options={serviceList}
														styles={{
															control: provided => ({...provided,border:!others.trans_service_code?'1px solid red':'' }),
															indicatorContainer: provided => ({...provided,color:''})
														}}
												/>
												<InputValid 
													hidden
													name="trans_service_code"
													id="trans_service_code"
													placeholder=""
													maxLength="1"
													bsSize="sm"
													value={others.trans_service_code?others.trans_service_code:''}
													validtype="text"
													required={true} 
													readOnly
													feedid="booking"/>
													{/*<Input bsSize="sm" className="pt-0 pb-0" type="select" value={others.trans_service_code?others.trans_service_code:''} onChange = {(event)=>onHandleSelectReturnVal(event,'trans_service_code')}
													invalid={!others.trans_service_code?true:false}>
															<option value="">선택</option>
															{(serviceList.length>0)?serviceList.map((element,key)=>{
																return(
																	<option key={key} value={element.service_code}>
																		{element.service_type}
																	</option>
																)
															})
															:<></>}
														</Input>
													<FormFeedback feedid="booking">{validation.REQ_MSG}</FormFeedback>*/}	
											</Col>
										</Row>
									</FormGroup>
								</Col>		
								<Col xl="5" lg="12" md="12">
									<FormGroup className="mb-1">
										<Row>
											<Col xl="3" className="pr-0 pt-1 col-2">
												<Label className="mb-0">H-BL</Label>
											</Col>
											<Col>
												<Select
													className="customSelect"
													classNamePrefix="customSelect"
													//className="react-select react-select-primary"
													//classNamePrefix="react-select"
													name="hbl_yn"
													value={{value:others.hbl_yn?others.hbl_yn:'',
													label:others.hbl_yn?
														(hblList.findIndex(x=>x.value===others.hbl_yn)>=0)?
																hblList[hblList.findIndex(x=>x.value===others.hbl_yn)].label:
															'선택':'선택'
													}}
													onChange = {(value)=>onHandleSelectReturnVal(value.value,'hbl_yn')}
													options={hblList}
														styles={{
															control: provided => ({...provided,border:!others.hbl_yn?'1px solid red':'' }),
															indicatorContainer: provided => ({...provided,color:''})
														}}
												/>
												<InputValid 
													hidden
													name="hbl_yn"
													id="hbl_yn"
													placeholder=""
													maxLength="1"
													bsSize="sm"
													value={others.hbl_yn?others.hbl_yn:''}
													validtype="text"
													required={true} 
													readOnly
													feedid="booking"/>
											{/* <Input type="select"  bsSize="sm" className="pt-0 pb-0" value={others.hbl_yn?others.hbl_yn:''} onChange = {(event)=>onHandleSelectReturnVal(event,'hbl_yn')}
											invalid={!others.hbl_yn?true:false} >
												<option value="">선택</option>
												<option value="N">No</option>
												<option value="Y">Yes</option>
											</Input>
											<FormFeedback feedid="booking">{validation.REQ_MSG}</FormFeedback>	*/}
											</Col>
										</Row>
									</FormGroup>
								</Col>
								<Col xl="7" lg="12" md="12">
									<FormGroup className="mb-1">
										<Row>
											<Col className="pr-0 col-2">
												<Label className="mb-0">Ocean Freight</Label>
											</Col>
											<Col style={{paddingTop:'2px'}}>
												<Select
													className="customSelect"
													classNamePrefix="customSelect"
													//className="react-select react-select-primary"
													//classNamePrefix="react-select"
													name="line_payment_type"
													value={{value:others.line_payment_type?others.line_payment_type:'',
													label:others.line_payment_type?
														(linePaymentList.findIndex(x=>x.value===others.line_payment_type)>=0)?
																linePaymentList[linePaymentList.findIndex(x=>x.value===others.line_payment_type)].label:
															'선택':'선택'
													}}
													onChange = {(value)=>onHandleSelectReturnVal(value.value,'line_payment_type')}
													options={linePaymentList}
														styles={{
															control: provided => ({...provided,border:!others.line_payment_type?'1px solid red':'' }),
															indicatorContainer: provided => ({...provided,color:''})
														}}/>
												<InputValid 
													hidden
													name="line_payment_type"
													id="line_payment_type"
													placeholder=""
													maxLength="1"
													bsSize="sm"
													value={others.line_payment_type?others.line_payment_type:''}
													validtype="text"
													required={true} 
													readOnly
													feedid="booking"/>
													{/*<Input type="select"  bsSize="sm" className="pt-0 pb-0" value={others.line_payment_type?others.line_payment_type:''} 
															onChange = {(event)=>onHandleSelectReturnVal(event,'line_payment_type')}
															invalid={!others.line_payment_type?true:false}
													>
														<option value="">선택</option>
														<option value="P">PREPAID</option>
														<option value="C">COLLECTED</option>
													</Input>
												<FormFeedback feedid="booking">{validation.REQ_MSG}</FormFeedback>	*/}
											</Col>
										</Row>
									</FormGroup>
								</Col>	          
							</Row>   	
						</Collapse>
					</CardBody>
					<Col className="text-center col-12 p-0" onClick={() => {setColl(!coll);if(!coll){getUserBookingList(loadData);}}}>        
						<Button
							className="p-0"
							color="link"
							//outline
							id="otmore"
							onClick={() => {setColl(!coll);if(!coll){getUserBookingList(loadData);}}}
							style={{height:'21px',marginBottom:'4px',width:'100%'}}>
							{coll?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
						</Button>
						<UncontrolledTooltip delay={0} target="otmore">{coll?'Close':'Open'}</UncontrolledTooltip>
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
					<OthersBookmark bookmark={bookmark} loadFormData={propsData} onPropsOtBookmark={onBookMarkData} onPropsOtDeleteBookmark={onBookMarkDelete} term = {serviceList} {...props} />	
					:
					<Others type="I" loadFormData={propsData} bkgData={bkgData} propsData={onBookMarkData} term = {serviceList} {...props} />
					}

				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={onInitData}>NEW</Button>{' '}
					{bookmarkView?
						<>
							<Button color="primary" onClick={onSaveBookmark}>SAVE</Button>
							<Button color="primary" onClick={onBookMarkDelete}>DELETE</Button>
						</>:
							<Button color="primary" onClick={onApplyData}>APPLY</Button>}{' '}
					<Button color="secondary" onClick={()=>setOpen(!open)}>CANCLE</Button>
						
				</ModalFooter>
			</Modal>
    	</>
    );
});

export default OthersCard;