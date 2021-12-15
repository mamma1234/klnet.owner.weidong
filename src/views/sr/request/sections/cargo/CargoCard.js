/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect, forwardRef } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
     Button,FormGroup,Label,Input, Card, UncontrolledTooltip,FormFeedback,UncontrolledPopover,
    InputGroup,InputGroupAddon,InputGroupText} from "reactstrap";
import Select from "react-select";
//import AlertModal from 'components/Modals/Alert.js';
import CargoBookmark from './CargoBookmark.js';
import HsCode from './HsCodePopup.js';
import Cargo from './Cargo.js';
//import Mark from './Mark.js';
//import Goods from './Goods.js';
import GoodsArea from './GoodsArea.js';
import MarkArea from './MarkArea.js';


import axios from 'axios';
import InputValid from "components/CustomInput/InputValid.js";
let cargoData = {};
let markData = {};
let goodsData = {};


const CargoCard = forwardRef((props,cargoFocus) => {

	const {bookmark,loadData,bookmark2,openWindow,validation} = props;
	const [cargo, setCargo] = useState([]);
	const [propsData, setPropsData] = useState([]);
	// Collapse Flag
	const [coll, setColl] = useState(false);
	// modal 창을 위한 state
	const [open, setOpen] = useState(false);
	const [modalTitle, setModalTitle] = useState("Cargo Info");
	//const [markList,setMarkList] = React.useState([]);
	//const [goodsList,setGoodsList] = React.useState([]);
	const [packCodeList,setPackCodeList] = useState([]);
	
	// 전체화면 css 적용을 위한 state
	const [bookmarkView, setBookmarkView] = useState(false);
	//const [bookmarkList, setBookmarkList] = useState([]);
	const [hsCodeList,setHsCodeList] = useState([]);
	const [tap, setTap] = useState("1");
	
	useEffect(() => { 
		setCargo(loadData);
	},[loadData]);
	
	useEffect(() => {
		setColl(openWindow);
	},[openWindow]);
	
	useEffect(() => {
		
		if(props.user) {
			codePackage();
			hsCodeSearch();
		}
	},[props.user]);

 	const toggle = (params) => {
		if(params==='B') {
			setModalTitle("Cargo BookMark");
			props.onLoadData("cg");
			/*setPropsData({...loadData,'cargo_bookmark_name':'','cargo_bookmark_seq':'','cargo_pack_qty':'','cargo_pack_type':'','cargo_hs_code':'',
									'cargo_total_weight':'','cargo_total_volume':'',
									'marklist':{},
									'goodlist':{},'mark_desc':'','cargo_mark_bookmark_name':'','cargo_mark_bookmark_seq':'',
									'goods_desc':'','cargo_goods_bookmark_name':'','cargo_goods_bookmark_seq':''});*/
			setPropsData({...loadData,'cargo_bookmark_name':'','cargo_bookmark_seq':'','cargo_pack_qty':cargo.cargo_pack_qty,
							cargo_pack_type:cargo.cargo_pack_type,cargo_hs_code:cargo.cargo_hs_code,
							cargo_total_weight:cargo.cargo_total_weight,cargo_total_volume:cargo.cargo_total_volume,'mark_desc':'','goods_desc':''});
			cargoData=loadData;
			setBookmarkView(true);
		} else {
			setModalTitle("Cargo Info");
			setPropsData(loadData);
			cargoData=loadData;
			setBookmarkView(false);
		}
		setOpen(!open);
  	}
  
	const codePackage =()=> {
		axios.post("/shipper/selectLineCodeCargoPackType",{params:{'line_code':'WDFC'}},{}).then(res => {
			setPackCodeList(res.data)
		});	
	}

	const hsCodeSearch=()=>{
		axios.post("/shipper/getHsCodeGroupInfo").then(res =>setHsCodeList(res.data));
	}

  
	const onInitData = () => {
		if(bookmarkView) {
			setPropsData({...propsData,'cargo_bookmark_name':'','cargo_bookmark_seq':'','cargo_pack_qty':'','cargo_pack_type':'',
				'cargo_hs_code':'','cargo_total_weight':'','cargo_total_volume':'',
				'mark_desc':'','cargo_mark_bookmark_name':'','cargo_mark_bookmark_seq':'',
				//'marklist':{'cargo_mark_bookmark_name':'','cargo_mark_bookmark_seq':'','mark_desc1':'','mark_desc2':'','mark_desc3':'','mark_desc4':'','mark_desc5':''},
				'goods_desc':'','cargo_goods_bookmark_name':'','cargo_goods_bookmark_seq':''
				//'goodlist':{'cargo_goods_bookmark_name':'','cargo_goods_bookmark_seq':'','goods_desc1':'','goods_desc2':'','goods_desc3':'','goods_desc4':'','goods_desc5':''}
					});
		} else {
			setPropsData({...propsData,'cargo_bookmark_name':'','cargo_bookmark_seq':'','cargo_pack_qty':'','cargo_pack_type':'',
				'cargo_hs_code':'','cargo_total_weight':'','cargo_total_volume':'','mark_desc':'','cargo_mark_bookmark_seq':'','cargo_mark_bookmark_name':'',
				//'marklist':[{'cargo_mark_bookmark_seq':'','mark_desc1':'NO MARK','mark_desc2':'','mark_desc3':'','mark_desc4':'','mark_desc5':''}],
				//'goodlist':[{'cargo_goods_bookmark_seq':'','goods_desc1':'','goods_desc2':'','goods_desc3':'','goods_desc4':'','goods_desc5':''}]
				'goods_desc':''});
		}
	}
  
  	const onSaveBookmark =()=> {

		if(tap === "1") {
			if(cargoData.cargo_bookmark_name !==null && cargoData.cargo_bookmark_name !=="") {	
	            
				axios.post("/shipper/setUserCargoBookmark",{user_no:props.user?props.user.user_no:'',data:cargoData},{}).then(res => {
					props.onLoadData("cg");
					if(cargoData.cargo_bookmark_seq) {
						props.onAlert("success","작성한 BOOKMARK 가 수정 되었습니다.");
					} else {
						props.onAlert("success","작성한 BOOKMARK 가 저장 되었습니다.");  
					}
		  	  	});
			}/* else {
				props.onAlert("error","cargo_bookmark_name 는 필수 입력항목 입니다.");
			}*/
		} else if (tap === "2") {
			
			if(markData.cargo_mark_bookmark_name !==null && markData.cargo_mark_bookmark_name !=="") {
				axios.post("/shipper/setUserMarkBookmark",{user_no:props.user?props.user.user_no:'',data:markData},{}).then(res => {
					props.onLoadData("mk");
					if(markData.cargo_mark_bookmark_seq) {
						props.onAlert("success","작성한 BOOKMARK 가 수정 되었습니다.");
					}  else {
						props.onAlert("success","작성한 BOOKMARK 가 저장 되었습니다.");
					}
		  	  	});
			}/* else {
				props.onAlert("error","cargo_mark_bookmark_name 는 필수 입력항목 입니다.");
			}*/
		} else if( tap === "3") {
			if(goodsData.cargo_goods_bookmark_name !==null && goodsData.cargo_goods_bookmark_name !=="") {
				
				axios.post("/shipper/setUserGoodsBookmark",{user_no:props.user?props.user.user_no:'',data:goodsData},{}).then(res => {
					props.onLoadData("gs");
					if(goodsData.cargo_goods_bookmark_seq) {
						props.onAlert("success","작성한 BOOKMARK 가 수정 되었습니다.");
					} else {
						props.onAlert("success","작성한 BOOKMARK 가 저장 되었습니다.");
					}
		  	  	});
			}/* else {
				props.onAlert("error","cargo_goods_bookmark_name 는 필수 입력항목 입니다.");
			}*/
		} else {
			console.log("ERROR");
		}
	}

  
	const onChangeTap = (tap)=> {
		if(tap ==="1") {
			setTap("1");
			props.onLoadData("cg");
		} else if(tap ==="2"){
			setTap("2");
			props.onLoadData("mk");
		} else {
			setTap("3");
			props.onLoadData("gs");
		}
	}

	const onDelteCargo =()=>{
		if(tap === "1") {
			if(cargoData && cargoData.cargo_bookmark_seq) {
				axios.post("/shipper/setUserCargoBookmarkDel",{user_no:props.user?props.user.user_no:'',data:cargoData},{}).then(res => {
					onInitData();
					props.onLoadData("cg");
					props.onAlert("success","선택한 BOOKMARK 가 삭제 되었습니다.");
				});
			} else {
				props.onAlert("error","삭제 할 BOOKMARK를 선택해주세요.");
			}
		} else if(tap === "2") {
			if(markData && markData.cargo_mark_bookmark_seq) {
				axios.post("/shipper/setUserMarkBookmarkDel",{user_no:props.user?props.user.user_no:'',data:markData},{}).then(res => {
					onInitData();
					props.onLoadData("mk");
					props.onAlert("success","선택한 BOOKMARK 가 삭제 되었습니다.");
				});
			} else {
				props.onAlert("error","삭제 할 BOOKMARK를 선택해주세요.");
			}
		} else { 
			if(goodsData && goodsData.cargo_goods_bookmark_seq) {
				axios.post("/shipper/setUserGoodsBookmarkDel",{user_no:props.user?props.user.user_no:'',data:goodsData},{}).then(res => {
					onInitData();
					props.onLoadData("gs");
					props.onAlert("success","선택한 BOOKMARK 가 삭제 되었습니다.");
				});
			} else {
				props.onAlert("error","삭제 할 BOOKMARK를 선택해주세요.");
			}
		}
	}
	
	const onChangeCargo =(value)=> {
		if(value) {

			setCargo({...cargo,'cargo_bookmark_seq':value.value,'cargo_bookmark_name':value.label});
			if(value.value > 0) {
				axios.post("/shipper/getUserCargoBookmark",{user_no:props.user?props.user.user_no:'',seq:value.value},{}).then(res => {
					const list = {
						cargo_attached_yn:res.data.cargo_attached_yn?res.data.cargo_attached_yn:cargo.cargo_attached_yn,
						cargo_coastal_yn:res.data.cargo_coastal_yn?res.data.cargo_coastal_yn:cargo.cargo_coastal_yn,
						cargo_frozen_temp:res.data.cargo_frozen_temp?res.data.cargo_frozen_temp:cargo.cargo_frozen_temp,
						cargo_frozen_temp_unit:res.data.cargo_frozen_temp_unit?res.data.cargo_frozen_temp_unit:cargo.cargo_frozen_temp_unit,
						cargo_goods_bookmark_name:res.data.cargo_goods_bookmark_name?res.data.cargo_goods_bookmark_name:cargo.cargo_goods_bookmark_name,
						cargo_goods_bookmark_seq:res.data.cargo_goods_bookmark_seq?res.data.cargo_goods_bookmark_seq:cargo.cargo_goods_bookmark_seq,
						cargo_handling_code:res.data.cargo_handling_code?res.data.cargo_handling_code:cargo.cargo_handling_code,
						cargo_handling_frozen:res.data.cargo_handling_frozen?res.data.cargo_handling_frozen:cargo.cargo_handling_frozen,
						cargo_hs_code:res.data.cargo_hs_code?res.data.cargo_hs_code:cargo.cargo_hs_code,
						cargo_item_hs_code:res.data.cargo_item_hs_code?res.data.cargo_item_hs_code:cargo.cargo_item_hs_code,
						cargo_pack_qty: res.data.cargo_pack_qty?res.data.cargo_pack_qty:cargo.cargo_pack_qty,
						cargo_pack_type: res.data.cargo_pack_type?res.data.cargo_pack_type:cargo.cargo_pack_type,
						cargo_temp: res.data.cargo_temp?res.data.cargo_temp:cargo.cargo_temp,
						cargo_temp_unit: res.data.cargo_temp_unit?res.data.cargo_temp_unit:cargo.cargo_temp_unit,
						cargo_total_volume:res.data.cargo_total_volume?res.data.cargo_total_volume:cargo.cargo_total_volume,
						cargo_total_weight:res.data.cargo_total_weight?res.data.cargo_total_weight:cargo.cargo_total_weight,
						cargo_weight: res.data.cargo_weight?res.data.cargo_weight:cargo.cargo_weight,
						goods_desc:res.data.goods_desc?res.data.goods_desc:cargo.goods_desc,
						goods_yn:res.data.goods_yn?res.data.goods_yn:cargo.goods_yn,
						mark_desc:res.data.mark_desc?res.data.mark_desc:cargo.mark_desc,
						mark_yn: res.data.mark_yn?res.data.mark_yn:cargo.mark_yn,
						
					}
					const mergeData = Object.assign(cargo,list);	  
					setCargo({...mergeData,'cargo_bookmark_seq':value.value,'cargo_bookmark_name':value.label});
					props.mergeData({...mergeData,'cargo_bookmark_seq':value.value,'cargo_bookmark_name':value.label});
					setColl(true);

					// setCargo({...cargo,...res.data});
					// //setMarkList(res.data.marklist?res.data.marklist.length>0?res.data.marklist:[{}]:[{}]);
					// //setGoodsList(res.data.goodlist?res.data.goodlist.length>0?res.data.goodlist:[{}]:[{}]);
					// props.mergeData({...cargo,...res.data});
					// setColl(true);
					//props.setWindow(true);
				});
			}
		}else {
			if( cargo.cargo_bookmark_seq) {

                setCargo({...cargo
					,'cargo_bookmark_seq':null
					,'cargo_bookmark_name':null
                    ,'cargo_attached_yn': null
                    ,'cargo_coastal_yn': null
                    ,'cargo_frozen_temp': null
                    ,'cargo_frozen_temp_unit': null
                    ,'cargo_goods_bookmark_name': null
                    ,'cargo_goods_bookmark_seq': null
                    ,'cargo_handling_code': null
                    ,'cargo_handling_frozen': null
                    ,'cargo_hs_code': null
					,'cargo_item_hs_code': null
					,'cargo_pack_qty':null
					,'cargo_pack_type':null
					,'cargo_temp':null
					,'cargo_temp_unit':null
					,'cargo_total_volume':null
					,'cargo_total_weight':null
					,'cargo_weight':null
					,'goods_desc':null
					,'goods_yn':null
					,'mark_desc':null
					,'mark_yn':null
                });
				props.mergeData({
					...cargo
					,'cargo_bookmark_seq':null
					,'cargo_bookmark_name':null
					,'cargo_attached_yn': null
                    ,'cargo_coastal_yn': null
                    ,'cargo_frozen_temp': null
                    ,'cargo_frozen_temp_unit': null
                    ,'cargo_goods_bookmark_name': null
                    ,'cargo_goods_bookmark_seq': null
                    ,'cargo_handling_code': null
                    ,'cargo_handling_frozen': null
                    ,'cargo_hs_code': null
					,'cargo_item_hs_code': null
					,'cargo_pack_qty':null
					,'cargo_pack_type':null
					,'cargo_temp':null
					,'cargo_temp_unit':null
					,'cargo_total_volume':null
					,'cargo_total_weight':null
					,'cargo_weight':null
					,'goods_desc':null
					,'goods_yn':null
					,'mark_desc':null
					,'mark_yn':null
				});
            }
		}
	}	
	  // 자식의 Data 적용
	const onBookMarkData = (step,data) => {
		if(step === "1") {
			cargoData = data;	
		} else if(step === "2") {
			markData = data;
		} else { //console.log(">>>>",data);
			goodsData = data;
		}
		
	}
  
  //button event
	const onApplyData = ()=> {
			setOpen(!open);
			const mergeData = Object.assign(cargo,cargoData);
			setCargo(mergeData);
			props.mergeData(mergeData);
			setColl(true);
	}
	// onChange evnet
	const onChangeReturnVal = (event,name) => {
		//  if(name === 'cargo_hs_code') {
		//	  if(!validation.validationHangle(event.target.value.toUpperCase())) {
			//	  let list = {...cargo, [name]:event.target.value.toUpperCase()};
				//  setCargo(list);
			//}
		// } else {
			let list = {...cargo, [name]:event.target.value.toUpperCase()};
			setCargo(list);
		//}	  
	}
	const onChangeReturnVal2 = (value,name) => { 
		let list = {...cargo, [name]:value};
		setCargo(list);
		props.mergeData(list);
	}
	// onBlur event 
	const onPropsReturn = ()=> {
			props.mergeData(cargo);
	}
	// detail onBlur event
	// const onDataMerge =(key,name,data) => { //console.log(">>>>>>name:",name,key,data);
	//	    let list;
	/*        if(name === "mark") {
				list = markList;
				list[key] = data;

				setMarkList(list);
				setCargo({...cargo,'marklist':list});
				props.mergeData({...cargo,'marklist':list});
				
			} else {
				list = goodsList;
				list[key] = data;
				setGoodsList(list);
				setCargo({...cargo,'goodlist':list});
				props.mergeData({...cargo,'goodlist':list});
			}*/
			

		//    	list = markList;
		//    	list[key] = data;
				//const mergeData = Object.assign(cargo,{'marklist':list});
				
		//		setMarkList(list);
		//		setCargo({...cargo,'marklist':list});
		//		props.mergeData({...cargo,'marklist':list});
				
	// }
	//21.05.06 변경
	const onDataMarkMerge =(data) => { 
			
			//setMarkList(data);
			setCargo({...cargo,...data});
			props.mergeData({...cargo,...data}); 
	}
	//21.05.06 변경
	const onDataGoodsMerge =(data) => { 
			
			//setGoodsList(data);
			setCargo({...cargo,...data});
			props.mergeData({...cargo,...data}); 
	}
	
	//detail onClick event
	/* const onDataDelete =(key,name) => {
			let list;
		if(name === "mark") {
			if(markList.length>1) {
				list = markList;
				if(key > -1) {list.splice(key,1);} else {console.log("error:",key);} 
				setMarkList([...list]);     
			} else {
				setMarkList([{'cargo_mark_bookmark_seq':'','cargo_seq':cargo.cargo_seq,'mark_seq':'1','mark_desc1':'','mark_desc2':'','mark_desc3':'','mark_desc4':'','mark_desc5':''}]);
			}
			
		} else {
			if(goodsList.length>1) {
				list = goodsList;
				if(key > -1) {list.splice(key,1);} else {console.log("error:",key);} 
				setGoodsList([...list]);     
			} else {
				setGoodsList([{'cargo_goods_bookmark_seq':'','cargo_seq':cargo.cargo_seq,'goods_seq':'1','goods_desc1':'','goods_desc2':'','goods_desc3':'','goods_desc4':'','goods_desc5':''}]);
			}
		}
		
	}
	
	const onAddMark =()=> {
			setMarkList([...markList,{'mark_seq':markList.length>0?markList.length+1:markList.length}]);
	}

	const onAddGoods =()=> {
		setGoodsList([...goodsList,{'goods_seq':goodsList.length>0?goodsList.length+1:goodsList.length}]);
	}*/
		
	return (
    <>
        <Row id="Cargo">
            <Col xl="12" lg="12">
	            <Card style={{zIndex:'6',border:'1px solid silver',borderRadius:'10px'}}>
	            	<CardBody className="pt-3 pb-0" >  
	            		<Row className="pb-2">
							<Col xl="2" className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>
								CARGO
								<Button className="pl-1" color="link" id="cargoview" onClick={toggle.bind(this, 'S')}><i className="fa fa-pencil-square-o fa-2x"/></Button>
								<UncontrolledTooltip delay={0} target="cargoview">Input</UncontrolledTooltip>
							</Col>
							<Col xl="6" className="mt-4 mb-0">
								<span style={{fontWeight:'bold',color:'red',fontSize:'14px'}} >*수량 중량 변경시 CONTAINER 정보변경 필</span>
							</Col>
							<Col>
								<Row>
									<Col className="col-10 pr-0">
										<Select
											className="react-select react-select-primary"
											classNamePrefix="react-select"
											name="carrierbookmark"
											value={{value:cargo.cargo_bookmark_seq?cargo.cargo_bookmark_seq:'',label:cargo.cargo_bookmark_name?cargo.cargo_bookmark_name:''}}
											onChange={(value)=>onChangeCargo(value)}
											options={bookmark}
											ref={cargoFocus}
											placeholder="선택"
											isClearable={cargo.cargo_bookmark_seq?true:false}
										/>
									</Col>
									<Col className="col-2 pl-auto pr-auto">
										<Button className="pl-0 pr-0" color="link" id="cargobookmark" onClick={toggle.bind(this, 'B')}><i className="fa fa-bookmark-o fa-2x" /></Button>
										<UncontrolledTooltip delay={0} target="cargobookmark">Bookmark</UncontrolledTooltip>
									</Col>
								</Row>
							</Col>
           				</Row>
						<Collapse isOpen={coll} className="mb-1">
							<hr className="mt-0"/>
							<Row style={{fontSize:'12px'}}>
								<Col xl="3" lg="12" md="12">
									<FormGroup className="mb-1">
										<Row>
											<Col xl="4" className="pr-0 pt-1 col-3">
												<Label className="mb-0">HS CODE</Label>
												<i id="hscode" className="fa fa-search fa-2X" style={{cursor:'pointer'}}/>
												<UncontrolledPopover className="popover-container" trigger="legacy" placement="right-start" target="hscode" style={{zIndex:'9999'}}>
													<HsCode onHsCodeData={hsCodeList} onSetHsCode={(data)=>{setCargo({...cargo, 'cargo_hs_code':data}); props.mergeData({...cargo, 'cargo_hs_code':data});}} {...props}/>
												</UncontrolledPopover>
											</Col>
											<Col>
													{/* <Input 
														type="text" 
														bsSize="sm" 
														name="cargo_hs_code" 
														id="cargo_hs_code"
														invalid={!cargo.cargo_hs_code?true:false}
														value={cargo.cargo_hs_code?cargo.cargo_hs_code:''} 
														onChange = {(event)=>onChangeReturnVal(event,'cargo_hs_code')} 
														onBlur={onPropsReturn}
														maxLength="6"
														required

													/> */}
												<InputValid 
													type="text"
													name="cargo_hs_code"
													id="cargo_hs_code"
													maxLength="6"
													minLength="6"
													bsSize="sm"
													value={cargo.cargo_hs_code?cargo.cargo_hs_code:''}
													onChange={(e)=>onChangeReturnVal(e, 'cargo_hs_code')}
													onBlur={onPropsReturn}
													validtype="number"
													required={true} 
													feedid="cargo"
												/>
													{/* <InputGroupAddon addonType="append">
														<InputGroupText id= "hscode" className="pl-1 pr-1" style={{border:!cargo.cargo_hs_code?'1px solid red':'',borderRadius:'0 4px 4px 0'}}><i className="fa fa-search fa-2X" /></InputGroupText>
													</InputGroupAddon>
													<FormFeedback>{validation.REQ_MSG}</FormFeedback>
												</InputGroup>
												<UncontrolledPopover className="popover-container" trigger="legacy" placement="right-start" target="hscode" style={{zIndex:'9999'}}>
													<HsCode onHsCodeData={hsCodeList} onSetHsCode={(data)=>{setCargo({...cargo, 'cargo_hs_code':data}); props.mergeData({...cargo, 'cargo_hs_code':data});}} {...props}/>
												</UncontrolledPopover>   */}
											</Col>
										</Row>
									</FormGroup>
								</Col>
								<Col xl="4" lg="12" md="12">
									<FormGroup>
										<Row>
											<Col xl="2" className="pr-0 pt-1 col-3">
												<Label className="mb-0">Package</Label>
											</Col>
											<Col>
												<Row>
													<Col className="col-8 pr-1" style={{zIndex:'2'}}>
														<Select
															className="customSelect"
															classNamePrefix="customSelect"
															name="cargo_pack_type"
															value={{value:cargo.cargo_pack_type?cargo.cargo_pack_type:'',
															label:cargo.cargo_pack_type?
																(packCodeList.findIndex(x=>x.value===cargo.cargo_pack_type)>=0)?
																		packCodeList[packCodeList.findIndex(x=>x.value===cargo.cargo_pack_type)].label:
																	'선택':'선택'
															}}
															getOptionLabel = {options=>options.label+" ["+options.value+"] "}
															//onChange={(value)=>setBooking({...booking,'trans_service_code':value.value})}
															onChange = {(value)=>onChangeReturnVal2(value.value,'cargo_pack_type')}
															//onBlur={(e)=>props.fncBookingParent(booking)}
															options={packCodeList}
																styles={{
																	control: provided => ({...provided,border:!cargo.cargo_pack_type?'1px solid red':'' }),
																	indicatorContainer: provided => ({...provided,color:''})
																}}
														/>
														{/*<Input type="select" bsSize="sm" className="pt-0 pb-0" value={cargo.cargo_pack_type?cargo.cargo_pack_type:''} 
														onChange = {(event)=>onChangeReturnVal2(event,'cargo_pack_type')}
														invalid={!cargo.cargo_pack_type?true:false} >
															<option value="">선택</option>
															{packCodeList.length>0?packCodeList.map((data,key) => <option key={key} value={data.cargo_pack_type}>{data.cargo_pack_type_desc+" ["+data.cargo_pack_type+"]"}</option>):<></>}
														</Input>
														<FormFeedback feedid="cargo">{validation.REQ_MSG}</FormFeedback>*/}
														<InputValid 
															hidden
															type="text"
															name="cargo_pack_type"
															id="cargo_pack_type"
															maxLength="2"
															bsSize="sm"
															value={cargo.cargo_pack_type?cargo.cargo_pack_type:''}
															validtype="text"
															required={true} 
															feedid="cargo"
															readOnly
														/>
													</Col>
													<Col className="col-4 pl-1">
														<InputValid 
															type="text"
															name="cargo_pack_qty"
															id="cargo_pack_qty"
															maxLength="8"
															bsSize="sm"
															value={cargo.cargo_pack_qty?cargo.cargo_pack_qty:''}
															onChange={(e)=>onChangeReturnVal(e, 'cargo_pack_qty')}
															onBlur={onPropsReturn}
															validtype="number"
															required={true} 
															feedid="cargo"
														/>
														{/*<Input type="number" bsSize="sm" name="cargo_pack_qty" id="cargo_pack_qty" placeholder="" value={cargo.cargo_pack_qty?cargo.cargo_pack_qty:''}
														onChange = {(event)=>onChangeReturnVal(event,'cargo_pack_qty')} onBlur={onPropsReturn} invalid={!cargo.cargo_pack_qty?true:false}
														maxLength="8"
															/>*/}
													</Col>
												</Row>
											</Col>
										</Row>
									</FormGroup>
								</Col>
								<Col xl="5" lg="12" md="12">
									<Row>
										<Col xl="6" className="col-12">
											<FormGroup className="mb-1">
												<Row>
													<Col xl="4" className="pr-0 pt-1 col-3">
														<Label className="mb-0">Weight</Label>
													</Col>
													<Col>
														{/* <InputValid 
															type="text" 
															bsSize="sm" 
															name="cargo_total_weight"
															id="cargo_total_weight"
															maxLength="18"
															bsSize="sm"
															validtype="number"
															invalid={!cargo.cargo_total_weight?true:false}
															value={cargo.cargo_total_weight?cargo.cargo_total_weight:''} 
															onChange = {(event)=>onChangeReturnVal(event,'cargo_total_weight')} 
															onBlur={onPropsReturn}
															feedid="cargo"
															inputgrouptext="KG"
														/> */}
														<InputGroup >
															<Input 
																type="number" bsSize="sm" name="cargo_total_weight" id="cargo_total_weight" placeholder=""
																invalid={!cargo.cargo_total_weight?true:false}
																value={cargo.cargo_total_weight?cargo.cargo_total_weight:''} onChange = {(event)=>onChangeReturnVal(event,'cargo_total_weight')} 
																onBlur={onPropsReturn} maxLength="18"/>
															<InputGroupAddon addonType="append">
																<InputGroupText className="p-1" style={{border:!cargo.cargo_total_weight?'1px solid red':'',borderRadius:'0 4px 4px 0'}}>kg</InputGroupText>
															</InputGroupAddon>
															<FormFeedback feedid="cargo">{validation.REQ_MSG}</FormFeedback>	
														</InputGroup>
													</Col>
												</Row>
											</FormGroup>
										</Col>
										<Col xl="6" className="col-12">
											<FormGroup className="mb-1">
												<Row>
													<Col xl="4" className="pr-0 pt-1 col-3">
														<Label className="mb-0">Volume</Label>
													</Col>
													<Col>
														<InputGroup >
															<Input 
																type="number" bsSize="sm" name="cargo_total_volume" id="cargo_total_volume" placeholder=""
																invalid={!cargo.cargo_total_volume?true:false}
																value={cargo.cargo_total_volume?cargo.cargo_total_volume:''} onChange = {(event)=>onChangeReturnVal(event,'cargo_total_volume')} 
																onBlur={onPropsReturn} maxLength="18"
															/>
															<InputGroupAddon addonType="append">
																<InputGroupText className="p-1" style={{border:!cargo.cargo_total_volume?'1px solid red':'',borderRadius:'0 4px 4px 0'}}>CBM</InputGroupText>
															</InputGroupAddon>
															<FormFeedback feedid="cargo">{validation.REQ_MSG}</FormFeedback>
														</InputGroup>
														{/* <InputValid 
															type="text" 
															bsSize="sm" 
															name="cargo_total_volume"
															id="cargo_total_volume"
															maxLength="18"
															bsSize="sm"
															validtype="number"
															invalid={!cargo.cargo_total_volume?true:false}
															value={cargo.cargo_total_volume?cargo.cargo_total_volume:''} 
															onChange = {(event)=>onChangeReturnVal(event,'cargo_total_volume')} 
															onBlur={onPropsReturn}
															feedid="cargo"
															inputgrouptext="CBM"
														/> */}
													</Col>
												</Row>
											</FormGroup>
										</Col>
									</Row>  
								</Col>  
							</Row>
							<hr className="mt-2 mb-2" />
							<Row>
								<Col xl="4">
									<Row>
										<Col>
											<Label className="mt-2" style={{fontWeight:'bold',fontSize:'15px',color:'#696969'}}>Mark & No</Label>
										</Col>
								{/*     <Col>
										<ButtonGroup className="pull-right pr-2">
											<Button
												className="pt-0 pb-0"
												color="default"
												outline
												size="sm"
												onClick={onAddMark}
											>추가
											</Button>
										</ButtonGroup>
										</Col>*/}
									</Row>
									<Row>
										<Col>
										{/*	{markList.length >0 ? 
													markList.map((element,key)=>
														<Mark key={key} loadData={element} bookmark={bookmark2} 
														propsData={(data)=>onDataMerge(key,'mark',data)}
														propsDelete={()=>onDataDelete(key,'mark')}
														validation={validation}
														onAlert={props.onAlert} user={props.user}
														/>):<></>
														}*/}
											<MarkArea   bookmark={bookmark2}
														propsMarkData={(data)=>onDataMarkMerge(data)} 
														mark={props.loadData}
														viewType="CARD"
														{...props} />
										</Col>
									</Row>
								</Col>
								<Col xl="8">
									<Row>
										<Col>
											<Label className="mt-2" style={{fontWeight:'bold',fontSize:'15px',color:'#696969'}}>Cargo Description</Label>
										</Col>
									{ /* <Col>
										<ButtonGroup className="pull-right pr-2">
											<Button
												className="pt-0 pb-0"
												color="default"
												outline
												size="sm"
												onClick={onAddGoods}
											>추가
											</Button>
										</ButtonGroup>
										</Col>*/}
									</Row>
									<Row>
										<Col>
													{/*{goodsList.length >0 ? 
													goodsList.map((element,key)=>
														<Goods key={key} loadData={element} bookmark={bookmark3} 
														//propsData={(data)=>onDataMerge(key,'goods',data)}
														propsData={(data)=>onDataGoodsMerge(data)}
														propsDelete={()=>onDataDelete(key,'goods')}
														validation={validation}
														onAlert={props.onAlert} user={props.user}
														/>):<></>
														}*/}
											<GoodsArea //bookmark={bookmark3}
												propsGoodsData={(data)=>onDataGoodsMerge(data)} goods={props.loadData} {...props} />
											
										</Col>
									</Row>
								</Col>
							</Row>
						</Collapse>
					</CardBody>
					<Col className="text-center col-12 p-0" onClick={() => setColl(!coll)}>       
						<Button
							className="p-0"
							color="link"
							id="cargomore"
							onClick={() => setColl(!coll)}
							style={{height:'21px',marginBottom:'4px',width:'100%'}}>
							{coll?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
						</Button>
						<UncontrolledTooltip delay={0} target="cargomore">{coll?'Close':'Open'}</UncontrolledTooltip>
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
			<ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
				<ModalBody className="pt-0 pb-0">
					<CardBody className="p-0 bg-white">

					{bookmarkView?
						<CargoBookmark 
					
									pack={packCodeList}
									bookmarkProps={propsData} 
									view={bookmarkView}
									onHsCodeData={hsCodeList}
									onChangeTap={onChangeTap} 
									onPropsCargoBookmark={(step,data)=>onBookMarkData(step,data)} 
									//onPropsCargoDeleteBookmark={onBookMarkCargoDelete}
									//onPropsMarkDeleteBookmark={onBookMarkMarkDelete}
									//onPropsGoodsDeleteBookmark={onBookMarkGoodsDelete}
									{...props}
					/>
					:
						<Cargo cargoProps={propsData} onHsCodeData={hsCodeList} propsData={(data)=>onBookMarkData("1",data)} 
									pack={packCodeList} view ={bookmarkView} {...props} />
					} 
					</CardBody>
				</ModalBody>
			<ModalFooter>
			<Button color="primary" onClick={onInitData}>NEW</Button>{' '}
			{bookmarkView?
				<>
					<Button color="primary" onClick={onSaveBookmark}>SAVE</Button>
					<Button color="primary" onClick={onDelteCargo}>DELETE</Button>
				</>:<Button color="primary" onClick={onApplyData}>APPLY</Button>}{' '}
				<Button color="secondary" onClick={()=>setOpen(!open)}>CANCLE</Button>
			</ModalFooter>
		</Modal>
	</>
    );
});

export default CargoCard;