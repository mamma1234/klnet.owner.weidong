/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect, forwardRef } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
     Button,FormGroup,Label, Card,  UncontrolledTooltip,FormFeedback} from "reactstrap";
import Select from "react-select";
import ScheduleBookmark from './ScheduleBookmark.js';
import Schedule from './Schedule.js';
import axios from 'axios';
import moment from 'moment';
//import ReactDatetime from "react-datetime";
import InputValid from "components/CustomInput/InputValid.js";

	let scheduleData = {};

	const ScheduleCard = forwardRef((props,scheduleFocus) => {

		const {bookmark,loadData,openWindow,user} = props;
		// Collapse Flag
		const [coll, setColl] = useState(false);
		const [bookmarkView, setBookmarkView] = useState(false);
		// modal 창을 위한 state
		const [open, setOpen] = useState(false);
		const [schedule, setSchedule] = useState(props.loadData);
		const [propsData, setPropsData] = useState([]);
		// const [startEnd,setStartEnd] = React.useState("default");
		/*  const [sPort, setSPort] = React.useState([]);
		const [ePort, setEPort] = React.useState([]);*/
		//const [getPort, setGetPort] = React.useState([]);
		const [modalTitle, setModalTitle] = useState("Schedule Info");
		const [lineVesselList ,setLineVesselList] = useState([]);
		const [outLinePortList, setOutLinePortList] = useState([]);
		// IN LINE PORT
		const [inLinePortList, setInLinePortList] = useState([]);
		const [fdpPortCodeList,setFdpPortCodeList] = useState([]);
		const [searchFdp, setSearchFdp] = useState("");
		const startData = [
			{label:'인천 -> 위해',value:'1'},
			{label:'인천 -> 청호',value:'2'},
			{label:'평택 -> 청도',value:'3'},
			{label:'경인 -> 천진',value:'4'},
			{label:'인천 -> 장기항',value:'5'},
			{label:'인천 -> 태창',value:'6'}
		];
	useEffect(() => {
		if(user) {
			setSchedule({...loadData,'sch_bl_issue_name':loadData.sch_bl_issue_name?loadData.sch_bl_issue_name:'SEOUL, KOREA'});
			/*   axios.post("/shipper/getLinePortCode",{ line:'WDFC',inyn:'N',outyn:'Y'},{})								
				.then(res => setSPort(res.data)); 
				
				axios.post("/shipper/getLinePortCode",{ line:'WDFC',inyn:'Y',outyn:'N'},{})								
				.then(res => setEPort(res.data));*/
			
			let params = {
					line_code: 'WDFC',
					key: 'out'
				}
			selectLinePort(params);
			// 위동 PORT 목록조회
			params = {
				line_code: 'WDFC',
				key: 'in'
			}
			selectLinePort(params);
			
		/*  axios.post("/shipper/getLinePortCode",{ line:'WDFC'},{}).then(res => 
				setGetPort(res.data));*/
		// let params = { line_code: 'WDFC'}
			selectLineCodeVesselName(params);
		}
		/* return () => {
				console.log('cleanup');
			};*/
			if( !loadData.sch_fdp ) {
				selectFdpCodePortList({
					prot_code: null
				});
			} else {
				if( schedule.sch_fdp !== loadData.sch_fdp ){
					//FDP의 경우 전체 Port조회
					selectFdpCodePortList({
						port_code:loadData.sch_fdp
					});
				}
			}
	},[loadData]);
	
	useEffect(() => {
		setColl(openWindow);
	},[openWindow]);

    useEffect(()=>{

        if( searchFdp ) {
            selectFdpCodePortList({
                port_code: searchFdp
            });
        }
    },[searchFdp]);
	const toggle = (params) => {
		
		if(params==='B') {
			setModalTitle("Schedule BookMark");
			setPropsData({...loadData,'schedule_bookmark_name':'','schedule_bookmark_seq':'',sch_vessel_name:schedule.sch_vessel_name,
					sch_vessel_code:schedule.sch_vessel_code,
					sch_vessel_voyage:schedule.sch_vessel_voyage,
					sch_pol:schedule.sch_pol,
					sch_pol_name:schedule.sch_pol_name,
					sch_pod:schedule.sch_pod,
					sch_pod_name:schedule.sch_pod_name,
					sch_pld:schedule.sch_pld,
					sch_pld_name:schedule.sch_pld_name,
					sch_bl_issue_name:schedule.sch_bl_issue_name,
					sch_por:schedule.sch_por,
					sch_por_name:schedule.sch_por_name,
					sch_fdp:schedule.sch_fdp,
					sch_fdp_name:schedule.sch_fdp_name,
					sch_srd:schedule.sch_srd});
			scheduleData=loadData; //console.log(loadData);
			setBookmarkView(true);
		} else {
			setModalTitle("Schedule Info");
			setPropsData(loadData);
			scheduleData=loadData;
			setBookmarkView(false);
		}
		setOpen(!open);
	}

	const selectLinePort = (params) => {
		axios.post("/shipper/selectLinePort",{ params },{}).then(res=>{
			if( 'out' === params.key ) {
				setOutLinePortList(res.data);
			} else if ( 'in' === params.key ) {
				setInLinePortList(res.data);
			}
		});
	}
  
	const selectLineCodeVesselName = (params) => {
		axios.post("/shipper/selectLineCodeVesselName",{ params },{}).then(res=>{
			setLineVesselList(res.data);
		});
	}

	const selectFdpCodePortList = (params)=>{
        axios.post("/shipper/selectFdpCodePortList",{ params },{}).then(res=>{
            setFdpPortCodeList(res.data);
        });
    }
  
    // 자식의 Data 적용
	const onBookMarkData = (data) => {
		scheduleData = data;
	}
	
	const onApplyData = ()=> {
		setOpen(!open);
		setSchedule(scheduleData);
		props.mergeData(scheduleData);
		setColl(true);
		//props.setWindow(true);
	}
	

	
	const onSaveBookmark =()=> {
		if(scheduleData.schedule_bookmark_name !==null && scheduleData.schedule_bookmark_name !=="") {
			axios.post("/shipper/setUserSchBookmark",{user_no:props.user?props.user.user_no:'',data:scheduleData},{}).then(res => {
				props.onLoadData("sc");
				if(scheduleData.schedule_bookmark_seq){
					props.onAlert("success","작성한 BOOKMARK 가 수정 되었습니다.");
				}else{
					props.onAlert("success","작성한 BOOKMARK 가 저장 되었습니다.");
				}
	  	  	});
		} else {
			props.onAlert("error","schedule_bookmark_name 는 필수 입력 항목 입니다.");
		}
	}
	
	const onBookMarkDelete = () => {
		if(scheduleData && scheduleData.schedule_bookmark_seq) {
			axios.post("/shipper/setUserSchBookmarkDel",{user_no:props.user?props.user.user_no:'',data:scheduleData},{}).then(res => {
				onInitData();
				props.onLoadData("sc");
				props.onAlert("success","선택한 BOOKMARK 가 삭제 되었습니다.");
			});
		} else {
			props.onAlert("error","삭제 할 BOOKMARK를 선택해주세요.");
		}
		
	}
	
	const onChangeSchedule =(value)=> {
		if(value) {
			setSchedule({...schedule,'schedule_bookmark_seq':value.value,'schedule_bookmark_name':value.label,...value});

			axios.post("/shipper/getUserSchBookmark",{user_no:props.user?props.user.user_no:'',seq:value.value},{}).then(response => {// console.log("bookmark:",res.data[0]);
				axios.post("/shipper/getWdSchCal",{sch_vessel_name: response.data[0].sch_vessel_name, startport: response.data[0].sch_pol, endport:response.data[0].sch_pod, eta: response.data[0].sch_eta?response.data[0].sch_eta:moment(new Date()).format('YYYYMMDD') ,week:'1 week', line_code:'WDFC'},{}).then(res => { 
					if(res.data[0]) {
						const scheduleData = {
							label:res.data[0].label?res.data[0].label:schedule.label,
							sch_bl_issue_name:res.data[0].sch_bl_issue_name?res.data[0].sch_bl_issue_name:schedule.sch_bl_issue_name,
							sch_eta:res.data[0].sch_eta?res.data[0].sch_eta:schedule.sch_eta,
							sch_etd:res.data[0].sch_etd?res.data[0].sch_etd:schedule.sch_etd,
							sch_fdp:res.data[0].sch_fdp?res.data[0].sch_fdp:schedule.sch_fdp,
							sch_fdp_name:res.data[0].sch_fdp_name?res.data[0].sch_fdp_name:schedule.sch_fdp_name,
							sch_line_code:res.data[0].sch_line_code?res.data[0].sch_line_code:schedule.sch_line_code,
							sch_pld:res.data[0].sch_pld?res.data[0].sch_pld:schedule.sch_pld,
							sch_pld_name:res.data[0].sch_pld_name?res.data[0].sch_pld_name:schedule.sch_pld_name,
							sch_pod:res.data[0].sch_pod?res.data[0].sch_pod:schedule.sch_pod,
							sch_pod_name:res.data[0].sch_pod_name?res.data[0].sch_pod_name:schedule.sch_pod_name,
							sch_pol:res.data[0].sch_pol?res.data[0].sch_pol:schedule.sch_pol,
							sch_pol_name:res.data[0].sch_pol_name?res.data[0].sch_pol_name:schedule.sch_pol_name,
							sch_por:res.data[0].sch_por?res.data[0].sch_por:schedule.sch_por,
							sch_por_name:res.data[0].sch_por_name?res.data[0].sch_por_name:schedule.sch_por_name,
							sch_vessel_code:res.data[0].sch_vessel_code?res.data[0].sch_vessel_code:schedule.sch_vessel_code,
							sch_vessel_name:res.data[0].sch_vessel_name?res.data[0].sch_vessel_name:schedule.sch_vessel_name,
							schedule_bookmark_name:res.data[0].schedule_bookmark_name?res.data[0].schedule_bookmark_name:schedule.schedule_bookmark_name,
							schedule_bookmark_seq: res.data[0].schedule_bookmark_seq?res.data[0].schedule_bookmark_seq:schedule.schedule_bookmark_seq,
							value:res.data[0].value?res.data[0].value:schedule.value,
						}


						const mergeData = Object.assign(schedule,scheduleData);
						setSchedule({...mergeData,'schedule_bookmark_seq':value.value,'schedule_bookmark_name':value.label});
						props.mergeData({...mergeData,'schedule_bookmark_seq':value.value,'schedule_bookmark_name':value.label});
						setColl(true);
						//props.setWindow(true);
					} else {
						const scheduleData = {
							label:response.data[0].label?response.data[0].label:schedule.label,
							sch_bl_issue_name:response.data[0].sch_bl_issue_name?response.data[0].sch_bl_issue_name:schedule.sch_bl_issue_name,
							sch_eta:response.data[0].sch_eta?response.data[0].sch_eta:schedule.sch_eta,
							sch_etd:response.data[0].sch_etd?response.data[0].sch_etd:schedule.sch_etd,
							sch_fdp:response.data[0].sch_fdp?response.data[0].sch_fdp:schedule.sch_fdp,
							sch_fdp_name:response.data[0].sch_fdp_name?response.data[0].sch_fdp_name:schedule.sch_fdp_name,
							sch_line_code:response.data[0].sch_line_code?response.data[0].sch_line_code:schedule.sch_line_code,
							sch_pld:response.data[0].sch_pld?response.data[0].sch_pld:schedule.sch_pld,
							sch_pld_name:response.data[0].sch_pld_name?response.data[0].sch_pld_name:schedule.sch_pld_name,
							sch_pod:response.data[0].sch_pod?response.data[0].sch_pod:schedule.sch_pod,
							sch_pod_name:response.data[0].sch_pod_name?response.data[0].sch_pod_name:schedule.sch_pod_name,
							sch_pol:response.data[0].sch_pol?response.data[0].sch_pol:schedule.sch_pol,
							sch_pol_name:response.data[0].sch_pol_name?response.data[0].sch_pol_name:schedule.sch_pol_name,
							sch_por:response.data[0].sch_por?response.data[0].sch_por:schedule.sch_por,
							sch_por_name:response.data[0].sch_por_name?response.data[0].sch_por_name:schedule.sch_por_name,
							sch_vessel_code:response.data[0].sch_vessel_code?response.data[0].sch_vessel_code:schedule.sch_vessel_code,
							sch_vessel_name:response.data[0].sch_vessel_name?response.data[0].sch_vessel_name:schedule.sch_vessel_name,
							schedule_bookmark_name:response.data[0].schedule_bookmark_name?response.data[0].schedule_bookmark_name:schedule.schedule_bookmark_name,
							schedule_bookmark_seq: response.data[0].schedule_bookmark_seq?response.data[0].schedule_bookmark_seq:schedule.schedule_bookmark_seq,
							value:response.data[0].value?response.data[0].value:schedule.value,
						}
						const mergeData = Object.assign(schedule,scheduleData);
						setSchedule({...mergeData,'schedule_bookmark_seq':value.value,'schedule_bookmark_name':value.label});
						props.mergeData({...schedule,'schedule_bookmark_seq':value.value,'schedule_bookmark_name':value.label,...value});
						setColl(true);
						// props.setWindow(true);
					}
				});
			});
		}else {
			const scheduleData = {
				label:null,
				sch_bl_issue_name:null,
				sch_eta:null,
				sch_etd:null,
				sch_fdp:null,
				sch_fdp_name:null,
				sch_line_code:null,
				sch_pld:null,
				sch_pld_name:null,
				sch_pod:null,
				sch_pod_name:null,
				sch_pol:null,
				sch_pol_name:null,
				sch_por:null,
				sch_por_name:null,
				sch_vessel_code:null,
				sch_vessel_name:null,
				schedule_bookmark_name:null,
				schedule_bookmark_seq:null,
				value:null,
			}
			setSchedule(scheduleData);
			props.mergeData(scheduleData);
		}
	}
	
	const onInitData = () => {
		scheduleData=null;
		setPropsData({...propsData,'schedule_bookmark_name':'','schedule_bookmark_seq':'','sch_vessel_name':'',
			'sch_vessel_code':'',
			'sch_vessel_voyage':'',
			'sch_pol':'',
			'sch_pol_name':'',
			'sch_pod':'',
			'sch_pod_name':'',
			'sch_pld':'',
			'sch_pld_name':'',
			'sch_bl_issue_name':'',
			'sch_por':'',
			'sch_por_name':'',
			'sch_fdp':'',
			'sch_fdp_name':'',
			'sch_srd':''});
	}
	
	const onChangeVal = ( value, key ) => {

		// e.preventDefault();
		if( 'sch_pol' === key ) {
			outLinePortList.map((element, key ) => {
				if( value == element.port_code ) {
					//setSchedule({...schedule, ['sch_pol']:value , ['sch_pol_name']:element.port_name});
					props.mergeData({...schedule, ['sch_pol']:value.toUpperCase() , ['sch_pol_name']:element.port_name.toUpperCase()});
				}
			});
		}
		if( 'sch_por' === key ) {
			outLinePortList.map((element, key ) => {
				if( value == element.port_code ) {
					//setSchedule({...schedule, ['sch_por']:value , ['sch_por_name']:element.port_name});
					props.mergeData({...schedule, ['sch_por']:value.toUpperCase() , ['sch_por_name']:element.port_name.toUpperCase()});
				}
			});
		}
		if( 'sch_pod' === key ) {
			inLinePortList.map((element, key ) => {
				if( value == element.port_code ) {
					//setSchedule({...schedule, ['sch_pod']:value , ['sch_pod_name']:element.port_name});
					props.mergeData({...schedule, ['sch_pod']:value.toUpperCase() , ['sch_pod_name']:element.port_name.toUpperCase()});
				}
			});
		}
		if( 'sch_pld' === key ) {
			inLinePortList.map((element, key ) => {
				if( value == element.port_code ) {
					//setSchedule({...schedule, ['sch_pld']:value , ['sch_pld_name']:element.port_name});
					props.mergeData({...schedule, ['sch_pld']:value.toUpperCase() , ['sch_pld_name']:element.port_name.toUpperCase()});
				}
			});
		}
		if( 'sch_fdp' === key ) {
			fdpPortCodeList.map((element, key ) => {
				if( value == element.port_code ) {
					//setSchedule({...schedule, ['sch_fdp']:value , ['sch_fdp_name']:element.port_name});
					props.mergeData({...schedule, ['sch_fdp']:value.toUpperCase() , ['sch_fdp_name']:element.port_name.toUpperCase()});
				}
			});
		}
		
	}
	  
/*	  const onChangeVal =(label,value) => {

		  let code = value;
	
		 if(value) {
			 axios.post("/shipper/getLinePortCode",{ line:'WDFC',code:code},{})						
		  	  	.then(res => {		  	
		  	  		         if( res.data.length > 0 ) {
		  	  		            let list = {...schedule,[label]:code,[label+"_name"]:res.data[0].port_name};
		  	  			        setSchedule(list);
		  	  			        props.mergeData(list);
		  	  		         }
		  	  			
		  	  	});;
		 	}
	  }*/
	  
	const onHandleReturnVal = (event,name) => {
		let list = {...schedule, [name]:event.target.value.toUpperCase()};
		setSchedule(list);
	}
	
	const onPropsReturn = ()=> {
		props.mergeData(schedule);
	}
	
	const onSaveData = () => {
		props.mergeData(schedule);
	}
	const fncOnKeyDown=(e)=>{
        const inputValue = e.replace(/\W/g,'');
        // console.log(e.keyCode, e, searchFdp)
        setSearchFdp( inputValue )
    }
/*		const onHandleReturnDate = (date) => {
			  let list = {...schedule, 'sch_srd':moment(date).format('YYYYMMDD')};
			  setSchedule(list);
			  props.mergeData(list);
		  }*/
	  
  	return (
    <>
        <Row id="Schedule">
            <Col xl="12" lg="12">
	            <Card style={{zIndex:'10',border:'1px solid silver',borderRadius:'10px'}}>
	            	<CardBody className="pt-3 pb-0">  
		                <Row className="pb-2">
		                   <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>SCHEDULE
			                   <Button className="pl-1" color="link" id="shlview" onClick={toggle.bind(this, 'S')}><i className="fa fa-pencil-square-o fa-2x"/></Button>
						       <UncontrolledTooltip delay={0} target="shlview">Input</UncontrolledTooltip>
					       </Col>
		                   <Col>
						        <Row>
					           		<Col className="col-10 pr-0">
							           	<Select
									        className="react-select react-select-primary"
									        classNamePrefix="react-select"
									        name="carrierbookmark"
									        value={{value:schedule.schedule_bookmark_seq?schedule.schedule_bookmark_seq:'',label:schedule.schedule_bookmark_name?schedule.schedule_bookmark_name:''}}
									        onChange={(value)=>onChangeSchedule(value)}
									        options={bookmark}
									        placeholder="선택"
							           		ref={scheduleFocus}
											isClearable={schedule.schedule_bookmark_seq?true:false}/>
									 </Col>
									 <Col className="col-2 pl-auto pr-auto">
									 	<Button className="pl-0 pr-0" color="link" id="shlbookmark" onClick={toggle.bind(this, 'B')}><i className="fa fa-bookmark-o fa-2x" /></Button>
									    <UncontrolledTooltip delay={0} target="shlbookmark">Bookmark</UncontrolledTooltip>
									 </Col>		
							   </Row>
						    </Col>
						</Row>
				        <Collapse isOpen={coll}>
				        {/* <div style={divider}/> */}
				            {/* 보이는 영역 */}
							<hr className="mt-0"/>

							<Row style={{fontSize:'12px'}}>
								<Col xl="12" lg="12" md="12">
									<FormGroup className="mb-1">
										<Row>
											<Col className="pr-0 pt-1 col-3">
												<Label className="mb-0">Vessel/Voy</Label>
											</Col>
											<Col className="pl-0">
												<Row>
													<Col className="col-7 pr-1">
														<Select
															className="customSelect react-select-primary"
															classNamePrefix="customSelect"
															//className="react-select react-select-primary"
															//classNamePrefix="react-select"
															name="sch_vessel_name"
															value={{
																value:schedule.sch_vessel_name?schedule.sch_vessel_name:'',
																label:schedule.sch_vessel_name?schedule.sch_vessel_name:'선택'
															}}
															onChange={(value)=>{setSchedule({...schedule,'sch_vessel_name':value.value,'vsl_type':value.vsl_type});
																		props.mergeData({...schedule,'sch_vessel_name':value.value,'vsl_type':value.vsl_type});}}
															options={lineVesselList}
															styles={{
																control: provided => ({...provided,border:!schedule.sch_vessel_name?'1px solid red':''}),
																//indicatorsContainer: provided => ({...provided,height:'40px'})
															}}
														/>
														<InputValid 
															type="hidden"
															name="sch_vessel_name"
															id="sch_vessel_name"
															maxLength="35"
															bsSize="sm"
															value={schedule.sch_vessel_name?schedule.sch_vessel_name:''}
															// onChange={(e)=>onHandleReturnVal(e, 'sch_fdp_name')}
															onBlur={onPropsReturn}
															validtype="text"
															required={true} 
															feedid="schedule"
														/>
														
													</Col>
													<Col className="text-center pl-0 pr-0 pt-1">/
													</Col>
													<Col className="col-4 pl-1">
														{/*<Input bsSize="sm" type="text" name="voyage" id="voyage" placeholder="" value={schedule.sch_vessel_voyage?schedule.sch_vessel_voyage:''}
														invalid={!schedule.sch_vessel_voyage?true:false}
														onChange = {(event)=>onHandleReturnVal(event,'sch_vessel_voyage')}
														onBlur={onPropsReturn}
													/>
														<FormFeedback>{props.validation.REQ_MSG}</FormFeedback>*/}
														<InputValid 
															type="text"
															name="sch_vessel_voyage"
															id="sch_vessel_voyage"
															maxLength="17"
															bsSize="sm"
															value={schedule.sch_vessel_voyage?schedule.sch_vessel_voyage:''}
															onChange={(e)=>onHandleReturnVal(e, 'sch_vessel_voyage')}
															onBlur={onPropsReturn}
															validtype="text"
															required={true} 
															feedid="schedule"/>
													</Col>
												</Row>
											</Col>
										</Row>
									</FormGroup> 
								</Col>
								{/* <Col xl="12" lg="12" md="12">
									<FormGroup>
										<Row>
											<Col className="pr-0 pt-1 col-3"><Label className="mb-0">On Board Date</Label></Col>
											<Col className="pl-0">
												<InputGroup className="date pl-0 pr-0" id="etd">
													<ReactDatetime	
														inputProps={{
														className: "form-control form-control-sm",
														//placeholder: "",
														}}
														dateFormat="YYYY-MM-DD"
														timeFormat={false}
														closeOnSelect={true}
														//value={schedule.sch_srd?moment(schedule.sch_srd).format('YYYY-MM-DD'):new Date()}
														value={schedule.sch_srd?moment(schedule.sch_srd).format('YYYY-MM-DD'):null}
														// onChange={date=>setSchedule({...schedule,'sch_srd':Moment(date).format('YYYYMMDD')})}
														onChange={date=>onHandleReturnDate(date)}
														onBlur={onPropsReturn}
													/>
													<InputGroupAddon addonType="append">
														<InputGroupText>
															<span className="glyphicon glyphicon-calendar">
															<i className="fa fa-calendar" />
															</span>
														</InputGroupText>
													</InputGroupAddon>
												</InputGroup>
											</Col>
										</Row>
										</FormGroup>
								</Col> */}
								<Col xl="12" lg="12" md="12">
									<FormGroup className="mb-1">
										<Row>
											<Col className="pr-0 pt-1 col-3">
												<Label className="mb-0">POL</Label>
											</Col>
											<Col className="pl-0">
												<Row>
													<Col xl="4" className="col-4 pr-1">
														<Select
															className="customSelect"
															classNamePrefix="customSelect"
															name="sch_pol"
															placeholder=""
															value={{value:schedule.sch_pol?schedule.sch_pol:'',
															label:schedule.sch_pol?
																(outLinePortList.findIndex(x=>x.value===schedule.sch_pol)>=0)?
																		outLinePortList[outLinePortList.findIndex(x=>x.value===schedule.sch_pol)].label:
																	'선택':'선택'
															}}
															onChange = {(value)=>onChangeVal(value.value,'sch_pol')}
															options={outLinePortList}
																styles={{
																	control: provided => ({...provided,border:!schedule.sch_pol?'1px solid red':'' }),
																	indicatorContainer: provided => ({...provided,color:''})
																}}/>
														{/*<Input className="pt-0 pb-0" bsSize="sm" type="select"  value={schedule.sch_pol?schedule.sch_pol:''}
														onChange={(event)=>onChangeVal('sch_pol',event)}>
															<option value="">선택</option>
															{outLinePortList.length?outLinePortList.map((data,key) =>
															<option key={"s_"+key} value={data.port_code}>{data.port_code}</option>
															):<></>}
															</Input>*/}
													</Col>
													<Col className={schedule.sch_srd?"col-6 pl-1":"col-8 pl-1"}>
													{/*<Input bsSize="sm" type="text" name="sch_por_name" id="sch_por_name" placeholder="" value={schedule.sch_pol_name?schedule.sch_pol_name:''} 
														invalid={!schedule.sch_pol_name?true:false}
														onChange = {(event)=>onHandleReturnVal(event,'sch_pol_name')} 
														onBlur={onPropsReturn}
														/>*/}
														<FormFeedback>{props.validation.REQ_MSG}</FormFeedback>
														<InputValid 
															type="text"
															name="sch_pol_name"
															id="sch_pol_name"
															maxLength="35"
															bsSize="sm"
															value={schedule.sch_pol_name?schedule.sch_pol_name:''}
															onChange={(e)=>onHandleReturnVal(e, 'sch_pol_name')}
															onBlur={onPropsReturn}
															validtype="text"
															required={true} 
															feedid="schedule"
														/>
													</Col>
													{(schedule.sch_srd) &&
													<Col xl="2" className="col-2 pl-1">
														<Label className="mt-2">{schedule.sch_srd?moment(schedule.sch_srd).format('MM-DD'):''}</Label>
													</Col>}
												</Row>
											</Col>
										</Row>
									</FormGroup> 
								</Col>
								<Col xl="12" lg="12" md="12">
									<FormGroup className="mb-1">
										<Row>
											<Col className="pr-0 pt-1 col-3">
												<Label className="mb-0">Place Of Receipt</Label>
											</Col>
											<Col className="pl-0">
												<Row>
													<Col xl="5" className="col-5 pr-1">
														<Select
															className="customSelect"
															classNamePrefix="customSelect"
															name="sch_por"
															value={{value:schedule.sch_por?schedule.sch_por:'',
															label:schedule.sch_por?
																(outLinePortList.findIndex(x=>x.value===schedule.sch_por)>=0)?
																		outLinePortList[outLinePortList.findIndex(x=>x.value===schedule.sch_por)].label:
																	'선택':'선택'
															}}
															onChange = {(value)=>onChangeVal(value.value,'sch_por')}
															options={outLinePortList}
																styles={{
																	indicatorContainer: provided => ({...provided,color:''})
																}}
														/>
														{/* <Input className="pt-0 pb-0" bsSize="sm" type="select"  value={schedule.sch_por?schedule.sch_por:''}
															onChange={(event)=>onChangeVal('sch_por',event)}>
																<option value="">선택</option>
																{outLinePortList.length?outLinePortList.map((data,key) =>
																<option key={"s_"+key} value={data.port_code}>{data.port_code}</option>
																):<></>}
																</Input>*/}
													</Col>
													<Col xl="7" className="col-7 pl-1">
														{/*<Input bsSize="sm" type="text" name="sch_por_name" id="sch_por_name" placeholder="" value={schedule.sch_por_name?schedule.sch_por_name:''} 
														onChange = {(event)=>onHandleReturnVal(event,'sch_por_name')} 
														onBlur={onPropsReturn}
														/>*/}
														<InputValid 
															type="text"
															name="sch_por_name"
															id="sch_por_name"
															maxLength="35"
															bsSize="sm"
															value={schedule.sch_por_name?schedule.sch_por_name:''}
															onChange={(e)=>onHandleReturnVal(e, 'sch_por_name')}
															onBlur={onPropsReturn}
															validtype="text"
															required={false} 
															feedid="schedule"
														/>
													</Col>
												</Row>
											</Col>
										</Row>
									</FormGroup> 
								</Col>
								<Col xl="12" lg="12" md="12">
									<FormGroup className="mb-1">
										<Row>
											<Col className="pr-0 pt-1 col-3">
												<Label className="mb-0">POD</Label>
											</Col>
											<Col className="pl-0">
												<Row>
													<Col xl="4" className="col-4 pr-1">
														<Select
															className="customSelect"
															classNamePrefix="customSelect"
															name="sch_pod"
															placeholder=""
															value={{value:schedule.sch_pod?schedule.sch_pod:'',
															label:schedule.sch_pod?
																(inLinePortList.findIndex(x=>x.value===schedule.sch_pod)>=0)?
																		inLinePortList[inLinePortList.findIndex(x=>x.value===schedule.sch_pod)].label:
																	'선택':'선택'
															}}
															onChange = {(value)=>onChangeVal(value.value,'sch_pod')}
															options={inLinePortList}
																styles={{
																	control: provided => ({...provided,border:!schedule.sch_pod?'1px solid red':'' }),
																	indicatorContainer: provided => ({...provided,color:''})
																}}
														/>
													{/*  <Input className="pt-0 pb-0" bsSize="sm" type="select"  value={schedule.sch_pod?schedule.sch_pod:''}
														onChange={(event)=>onChangeVal('sch_pod',event)}>
															<option value="">선택</option>
															{inLinePortList.length?inLinePortList.map((data,key) =>
															<option key={"s_"+key} value={data.port_code}>{data.port_code}</option>
															):<></>}
															</Input>*/}
													</Col>
													<Col className={schedule.sch_eta?"col-6 pl-1":"col-8 pl-1"}>
														{/*<Input bsSize="sm" type="text" name="sch_pod_name" id="sch_pod_name" placeholder="" value={schedule.sch_pod_name?schedule.sch_pod_name:''} 
														onChange = {(event)=>onHandleReturnVal(event,'sch_pod_name')} 
														invalid={!schedule.sch_pod_name?true:false}
														onBlur={onPropsReturn}
														/>
															<FormFeedback>{props.validation.REQ_MSG}</FormFeedback>*/}
														<InputValid 
															type="text"
															name="sch_pod_name"
															id="sch_pod_name"
															maxLength="35"
															bsSize="sm"
															value={schedule.sch_pod_name?schedule.sch_pod_name:''}
															onChange={(e)=>onHandleReturnVal(e, 'sch_pod_name')}
															onBlur={onPropsReturn}
															validtype="text"
															required={true} 
															feedid="schedule"
														/>
													</Col>{(schedule.sch_eta) &&
													<Col xl="2" className="col-2 pl-1">
														<Label className="mt-2">{schedule.sch_eta?moment(schedule.sch_eta).format('MM-DD'):''}</Label>
													</Col>}
												</Row>
											</Col>
										</Row>
									</FormGroup> 
								</Col>
								<Col xl="12" lg="12" md="12">
									<FormGroup className="mb-1">
										<Row>
											<Col className="pr-0 pt-1 col-3">
												<Label className="mb-0">Place Of Delivery</Label>
											</Col>
											<Col className="pl-0">
												<Row>
													<Col xl="5" className="col-5 pr-1">
														<Select
															className="customSelect"
															classNamePrefix="customSelect"
															name="sch_pld"
															value={{value:schedule.sch_pld?schedule.sch_pld:'',
															label:schedule.sch_pld?
																(inLinePortList.findIndex(x=>x.value===schedule.sch_pld)>=0)?
																		inLinePortList[inLinePortList.findIndex(x=>x.value===schedule.sch_pld)].label:
																	'선택':'선택'
															}}
															onChange = {(value)=>onChangeVal(value.value,'sch_pld')}
															options={inLinePortList}
																styles={{
																	indicatorContainer: provided => ({...provided,color:''})
																}}
														/>
														{/* <Input className="pt-0 pb-0" bsSize="sm" type="select"  value={schedule.sch_pld?schedule.sch_pld:''}
															onChange={(event)=>onChangeVal('sch_pld',event)}>
																<option value="">선택</option>
																{inLinePortList.length?inLinePortList.map((data,key) =>
																<option key={"s_"+key} value={data.port_code}>{data.port_code}</option>
																):<></>}
																</Input>*/}
													</Col>
													<Col xl="7" className="col-7 pl-1">
														{/*<Input bsSize="sm" type="text" name="sch_pld_name" id="sch_pld_name" placeholder="" value={schedule.sch_pld_name?schedule.sch_pld_name:''} 
														onChange = {(event)=>onHandleReturnVal(event,'sch_pld_name')} 
														onBlur={onPropsReturn}
														/>*/}
														<InputValid 
															type="text"
															name="sch_pld_name"
															id="sch_pld_name"
															maxLength="35"
															bsSize="sm"
															value={schedule.sch_pld_name?schedule.sch_pld_name:''}
															onChange={(e)=>onHandleReturnVal(e, 'sch_pld_name')}
															onBlur={onPropsReturn}
															validtype="text"
															required={false} 
															feedid="schedule"/>
													</Col>
												</Row>
											</Col>
										</Row>
									</FormGroup> 
								</Col>
								<Col xl="12" lg="12" md="12">
									<FormGroup className="mb-1">
										<Row>
											<Col className="pr-0 pt-1 col-3">
												<Label className="mb-0">Final Des</Label>
											</Col>
											<Col className="pl-0">
												<Row>
													<Col xl="5" className="col-5 pr-1">
														<Select
															cachedOptions
															defaultOptions
															className="customSelect"
															classNamePrefix="customSelect"
															//className="react-select react-select-primary"
															//classNamePrefix="react-select"
															name="sch_fdp"
															id="select_sch_fdp"
															value={{
																value:schedule.sch_fdp?schedule.sch_fdp:'',
																label:schedule.sch_fdp?(fdpPortCodeList.findIndex(x=>x.value===schedule.sch_fdp)>=0)?fdpPortCodeList[fdpPortCodeList.findIndex(x=>x.value===schedule.sch_fdp)].port_code:'선택':'선택'
															}}
															onChange={(value)=>onChangeVal(value.value,'sch_fdp')}
															options={fdpPortCodeList}
															onInputChange={fncOnKeyDown}
														/>
													</Col>
													<Col xl="7" className="col-7 pl-1">
														{/*<Input bsSize="sm" type="text" name="sch_fdp_name" id="sch_fdp_name" placeholder="" value={schedule.sch_fdp_name?schedule.sch_fdp_name:''} 
														onChange = {(event)=>onHandleReturnVal(event,'sch_fdp_name')} 
														onBlur={onPropsReturn}
														/>*/}
														<InputValid 
															type="text"
															name="sch_fdp_name"
															id="sch_fdp_name"
															maxLength="35"
															bsSize="sm"
															value={schedule.sch_fdp_name?schedule.sch_fdp_name:''}
															onChange={(e)=>onHandleReturnVal(e, 'sch_fdp_name')}
															onBlur={onPropsReturn}
															validtype="text"
															required={false} 
															feedid="schedule"
														/>
													</Col>
												</Row>
											</Col>
										</Row>
									</FormGroup> 
								</Col>
								<Col xl="12" lg="12" md="12">
									<FormGroup className="mb-1">
										<Row>
											<Col xl="3" className="pr-0 pt-1 col-3">
												<Label className="mb-0" >Place Of B/L Issue</Label>
											</Col>
											<Col xl="9" className="pl-0 col-9">
												{/*<Input  type="text" bsSize="sm" name="sch_bl_issue_name" id="sch_bl_issue_name" 
												value={schedule.sch_bl_issue_name?schedule.sch_bl_issue_name:''} onChange={(event)=>onHandleReturnVal(event,'sch_bl_issue_name')} 
												onBlur={onPropsReturn}
												/>	*/}
												<InputValid 
													type="text"
													name="sch_bl_issue_name"
													id="sch_bl_issue_name"
													maxLength="35"
													bsSize="sm"
													value={schedule.sch_bl_issue_name?schedule.sch_bl_issue_name:''}
													onChange={(e)=>onHandleReturnVal(e, 'sch_bl_issue_name')}
													onBlur={onPropsReturn}
													validtype="text"
													required={false} 
													feedid="schedule"/>
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
							//outline
							id="shlmore"
							onClick={() => setColl(!coll)}
							style={{height:'21px',marginBottom:'4px',width:'100%'}}>
							{coll?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
						</Button>
						<UncontrolledTooltip delay={0} target="shlmore">{coll?'Close':'Open'}</UncontrolledTooltip>
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
		<Modal isOpen={open} toggle={toggle} className="pt-0" size="xl">
			<ModalHeader toggle={toggle} className="pt-3 pb-3">{modalTitle}</ModalHeader>
				<ModalBody className="p-3">
					{bookmarkView?
						<ScheduleBookmark bookmark={bookmark} loadData={propsData} onPropsSchBookmark={onBookMarkData} onPropsSchDeleteBookmark={onBookMarkDelete} getVsl={lineVesselList} 
					outLinePortList={outLinePortList} inLinePortList={inLinePortList} onAlert={props.onAlert}/>
					:
						<Schedule
							loadData={propsData} propsData={onBookMarkData}  outLinePortList={outLinePortList} inLinePortList={inLinePortList} getVsl={lineVesselList} onAlert={props.onAlert}/>
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

export default ScheduleCard;



