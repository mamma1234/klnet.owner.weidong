/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col, FormGroup,Label,Input,Button,Collapse,FormText,FormFeedback} from "reactstrap";
import Select from "react-select";
//import ReactDatetime from "react-datetime";
import {Calendar,momentLocalizer} from 'react-big-calendar';
import Moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import * as validation from 'components/common/validation.js';

const localizer = momentLocalizer(Moment);

const Schedule = (props) => {
	
	const {loadData,bookmark,getPort,getVsl,outLinePortList,inLinePortList} = props;
	const [schedule, setSchedule] = useState({});
	//const [defaultSelect, setDefaultSelect] = React.useState(null);
	const [coll ,setColl] = React.useState(false);
	const [calendarData,setCalendarData] = React.useState([]);
	// const [startPort,setStartPort] = React.useState("");
	//const [endPort,setEndPort] = React.useState("");
	// const [open1,setOpen1] = React.useState(false);
	// const [open2,setOpen2] = React.useState(false);
	// const [open3,setOpen3] = React.useState(false);
	// const [open4,setOpen4] = React.useState(false);
	// const [open5,setOpen5] = React.useState(false);
	const [selectButton, setSelectButton] = React.useState("");
	const [routePort,setRoutePort] = React.useState([]);
	let startPort;
	let endPort;
  
	useEffect(()=>{
		axios.post("/shipper/getLineRoute",{ line_code:'WDFC'}).then(res => setRoutePort(res.data));   
		setSchedule(loadData);
		
	},[loadData]);


/*  const [sPort, setSPort] = React.useState([]);
  const [ePort, setEPort] = React.useState([]);*/
  
  	const selectedEvent = (event,e) => { 
		let list = {...schedule,sch_vessel_name:event.sch_vessel_name,sch_vessel_voyage:event.sch_vessel_voyage,sch_vessel_code:event.sch_vessel_code,
					vsl_type:event.vsl_type,sch_pol:event.sch_pol,sch_pol_name:event.sch_pol_name,
					sch_pod:event.sch_pod,sch_pod_name:event.sch_pod_name};
		setSchedule(list);
		props.propsData(list);
		setColl(false);
	};

	const onHandleStartDate = (start,end) => { 
		var startVal;
		var endVal;
		if(start && end) {
			startVal = start;
			endVal = end;
			setSelectButton(startVal+endVal);
		} else {
			startVal =null;
			endVal =null;
			setSelectButton("ALL");
		}
		startPort = startVal;
		endPort = endVal;

		axios.post("/shipper/getWdSchCal",{ startport:startVal,endport:endVal,eta:Moment(new Date()).format('YYYYMMDD'),week:'5 week', line_code:'WDFC'},{}).then(res => {
			setColl(true);
			if(res.data && res.data.length > 0) {
				setCalendarData(res.data); //console.log("rs:",res.data)
			} else {
				setCalendarData([]);
				props.onAlert("error","조회된 (스케쥴) 정보가 없습니다.");
			}
		});	
	}
	
	const onHandleReturnVal = (event,name) => {
		let list = {...schedule, [name]:event.target.value.toUpperCase()};
		setSchedule(list); 
	}
  
 /* const onHandleReturnDate = (date) => {
	  let list = {...schedule, 'sch_srd':Moment(date).format('YYYYMMDD')};
	  setSchedule(list); 
	  props.propsData(list);
  }*/
  
	const onPropsReturn = ()=> {
		// setOpen1(false);
		//setOpen2(false);
		//setOpen3(false);
		//setOpen4(false);
		//setOpen5(false);
		props.propsData(schedule);
	}

  	const CustomToolbar =(toolbar) => {
		const goToBack=()=> {
			var vDate = new Date();
			vDate.setMonth(toolbar.date.getMonth() -1);
			vDate.setDate('01');

			axios.post("/shipper/getWdSchCal",{ startport:startPort,endport:endPort,eta:Moment(vDate).format('YYYYMMDD'),week:'5 week', line_code:'WDFC'},{}).then(res => {
				setColl(true);
				if(res.data && res.data.length > 0) {
					setCalendarData(res.data); //console.log("rs:",res.data)
				} else {
					// setCalendarData([]);
					props.onAlert("error","조회된 (스케쥴) 정보가 없습니다.");
				}
				
			});	
			toolbar.date.setMonth(toolbar.date.getMonth() -1);
			toolbar.onNavigate('Back');
		}
		
		const goToNext=()=> {
			var vDate = new Date();
			vDate.setMonth(toolbar.date.getMonth() +1);
			vDate.setDate('01');
			axios.post("/shipper/getWdSchCal",{ startport:startPort,endport:endPort,eta:Moment(vDate).format('YYYYMMDD'),week:'5 week', line_code:'WDFC'},{}).then(res => {
				setColl(true);
				if(res.data && res.data.length > 0) {
					setCalendarData(res.data); //console.log("rs:",res.data)
				} else {
					//  setCalendarData([]);
					props.onAlert("error","조회된 (스케쥴) 정보가 없습니다.");
				}
				
			});
			toolbar.date.setMonth(toolbar.date.getMonth() +1);
			toolbar.onNavigate('Next');
		}
		const goToCurrent=()=> {
			const now = new Date();
		
			if(now.getMonth() !== toolbar.date.getMonth() ) {
				var vDate = now;
				vDate.setDate('01');
				
				axios.post("/shipper/getWdSchCal",{ startport:startPort,endport:endPort,eta:Moment(vDate).format('YYYYMMDD'),week:'5 week', line_code:'WDFC'},{}).then(res => {
					setColl(true);
					if(res.data && res.data.length > 0) {
						setCalendarData(res.data); //console.log("rs:",res.data)
					} else {
						//setCalendarData([]);
						props.onAlert("error","조회된 (스케쥴) 정보가 없습니다.");
					}
				});
			}
			toolbar.date.setMonth(now.getMonth());
			toolbar.date.setYear(now.getFullYear());
			toolbar.onNavigate('ToDay');
		}
	
		const label =()=>{
			const date = Moment(toolbar.date);
			return (
				<h2><b>{date.format('YYYY')+" / "+date.format('MM')}</b></h2>	  
			);
		};
	
		return (
			<div style={{width:'87%',display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',marginBottom:'10px',fontSize:'16px'}}>	
				<div>
					<Button style={{border:'solid 1px #DDD'}} color="default" outline size="sm" type="button" className="mr-1" onClick={goToCurrent}>Today</Button>
					<Button style={{border:'solid 1px #DDD'}} color="default" outline size="sm" type="button" className="mr-1" onClick={goToBack}>Back</Button>
					<Button style={{border:'solid 1px #DDD'}} color="default" outline size="sm" type="button" className="mr-1" onClick={goToNext}>Next</Button>
				</div>
				<label style={{textAlign:'center',padding:'0 10px',flexGrow:'1'}}>{label()}</label>
			</div>		  		
		);
	}
	  
  	return (
    	<>
    	{bookmark?
			<Row>
	    		<Col xl="6" lg="6" md="12">
					<FormGroup>
						<Label className="mb-0">BookMark Name</Label>
						<Input type="text" name="schedule_bookmark_name" id="schedule_bookmark_name" placeholder="" 
							invalid={!schedule.schedule_bookmark_name?true:false}
							value={schedule.schedule_bookmark_name} 
							onChange = {(event)=>onHandleReturnVal(event,'schedule_bookmark_name')} 
							onBlur={onPropsReturn}/>
						<FormFeedback>{validation.REQ_MSG}</FormFeedback> 
					</FormGroup>
	    		</Col>
	 		</Row>:
			<Row>
				<Col className="col-12 mb-2">
					<div className="text-center">
						<Button className="mt-1 mr-1 p-0" color={selectButton==="ALL"?"info":"default"} type="button" onClick={()=>onHandleStartDate('','')}>전체{' '}</Button>
						{(routePort.length > 0) &&
							routePort.map((data,key)=> {
								return(
									<Button 
										key={"sch_"+key} 
										className="mt-1 mr-1 p-0"
										color={selectButton===data.start_port_code+data.end_port_code?"info":"default"} 
										type="button" 
										onClick={()=>onHandleStartDate(data.start_port_code,data.end_port_code)}>{data.start_port_kr_name}->{data.end_port_kr_name+' '}
									</Button>
								)
							})
						}
					</div>
				</Col>
				<Col className="col-12 mb-2">
					<Collapse isOpen={coll}>
						<Calendar
							selectable
							popup
							localizer={localizer}
							events={calendarData}
							startAccessor="start"
							endAccessor="end"
							style={{ height: 370 }}
							defaultDate={new Date()} 
							showAllEvents="true"
							views={["month"]}
							components={{toolbar:CustomToolbar}}
							onSelectEvent={(event,e) => selectedEvent(event,e)}
							eventPropGetter={(event)=>{
								if(event && event.vsl_type === '41') {
									return {className:"bg-warning",style:{fontSize:'1px',paddingTop:'0',paddingBottom:'0'}}
								} else {
									return {className:"bg-info",style:{fontSize:'1px',paddingTop:'0',paddingBottom:'0'}}
								}
							}}
						/>
					</Collapse>
				</Col>
			</Row>}
    		<Row>
				<Col xl="6" lg="6" md="12">
					<FormGroup>
						<Label className="mb-0">VESSEL</Label>

						{/*      <Input type="text" name="vsl_name" id="vsl_name" placeholder="" value={schedule.sch_vessel_name?schedule.sch_vessel_name:''}
								invalid={!bookmark&&!schedule.sch_vessel_name?true:false}
								onChange = {(event)=>onHandleReturnVal(event,'sch_vessel_name')}
								onBlur={onPropsReturn}
								/>
								<FormFeedback>{validation.REQ_MSG}</FormFeedback>*/}
							
								
						<Select
							//className="customSelect react-select-primary"
							//classNamePrefix="customSelect"
							className="customSelect react-select-primary"
							classNamePrefix="customSelect"
							name="vsl_name"
							value={{
								value:schedule.sch_vessel_name?schedule.sch_vessel_name:null,
								label:schedule.sch_vessel_name?schedule.sch_vessel_name:'선택'
							}}
							onChange={(value)=>{setSchedule({...schedule,'sch_vessel_name':value.value,'vsl_type':value.vsl_type});
															props.propsData({...schedule,'sch_vessel_name':value.value,'vsl_type':value.vsl_type});}}
							options={getVsl}
							styles={{
								control: provided => ({...provided,border:!bookmark&&!schedule.sch_vessel_name?'1px solid red':'',minHeight:'40px',height:'40px'}),
								indicatorsContainer: provided => ({...provided,height:'40px'})
							}}
						/>{(!bookmark&&!schedule.sch_vessel_name) &&<FormText className="text-danger">필수</FormText>} 
					</FormGroup>
				</Col>
				<Col xl="6" lg="6" md="12">
					<Row>

					{/* <Col xl="6" lg="6" md="6" className="col-6">
							<FormGroup>
								<Label className="mb-0">VOYAGE</Label>
								<Input type="text" name="voyage" id="voyage" placeholder="voyage number..." value={schedule.sch_vessel_voyage?schedule.sch_vessel_voyage:''}
								invalid={!bookmark&&!schedule.sch_vessel_voyage?true:false}
								onChange = {(event)=>onHandleReturnVal(event,'sch_vessel_voyage')}
								onBlur={onPropsReturn}
								/>
								<FormFeedback>{validation.REQ_MSG}</FormFeedback>
							</FormGroup>
						</Col> */}


					{/*<Col xl="6" lg="6" md="6" className="col-6">
						<FormGroup>
							<Label className="mb-0">ON BOARD DATE</Label>
							<InputGroup className="date" id="etd">
								<ReactDatetime
									inputProps={{
									className: "form-control",
									placeholder: "on Board Date",
									}}
									dateFormat="YYYY-MM-DD"
									timeFormat={false}
									closeOnSelect={true}
									//value={schedule.sch_srd?Moment(schedule.sch_srd).format('YYYY-MM-DD'):new Date()}
									value={schedule.sch_srd?Moment(schedule.sch_srd).format('YYYY-MM-DD'):null}
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
							<FormFeedback>{validation.REQ_MSG}</FormFeedback>
						</FormGroup>
					</Col>*/}
					</Row>
				</Col>
        
				<Col xl="6" lg="6" md="12">
					<FormGroup>
						<Col className="col-12 p-0">
							<Label className="mb-0">PLACE OF RECEIPT</Label>
							<Row>
								<Col xl="5" className="col-5 pr-1">
									<Select
										className="react-select react-select-primary"
										classNamePrefix="react-select"
										name="sch_por"
										value={{value:schedule.sch_por?schedule.sch_por:null,label:schedule.sch_por?schedule.sch_por:'선택'}}
										onChange={(value)=>setSchedule({...schedule,'sch_por':value.value,'sch_por_name':value.port_name})}
										onBlur={onPropsReturn}
										options={outLinePortList}
										//placeholder={placeholder}
										/>
								</Col>
								<Col xl="7" className="col-7 pl-1">
									<Input 
										type="text" name="sch_por_name" id="sch_por_name" value={schedule.sch_por_name?schedule.sch_por_name:''} 
										onChange = {(event)=>onHandleReturnVal(event,'sch_por_name')} 
										onBlur={onPropsReturn}/>
								</Col>
							</Row>
						</Col>
					</FormGroup>
				</Col>
			
				<Col xl="6" lg="6" md="12">
					<FormGroup>
						<Col className="col-12 p-0">
							<Label className="mb-0">POL</Label>		 
							<Row>
								<Col xl="5" className="col-5 pr-1">
									<Select
										className="react-select react-select-primary"
										classNamePrefix="react-select"
										name="sch_pol"
										value={{value:schedule.sch_pol?schedule.sch_pol:'',label:schedule.sch_pol?schedule.sch_pol:'전체'}}
										onChange={(value)=>setSchedule({...schedule,'sch_pol':value.value,'sch_pol_name':value.port_name})}
										options={outLinePortList}
										onBlur={onPropsReturn}
										//placeholder={placeholder}
										/>
								</Col>
								<Col xl="7" className="col-7 pl-1">
									<Input type="text" name="sch_pol_name" id="sch_pol_name" placeholder="" value={schedule.sch_pol_name?schedule.sch_pol_name:''}
									invalid={!bookmark&&!schedule.sch_pol_name?true:false}
									onChange = {(event)=>onHandleReturnVal(event,'sch_pol_name')} 
									onBlur={onPropsReturn}/>
									<FormFeedback>{validation.REQ_MSG}</FormFeedback>
								</Col>
								{(!bookmark && schedule.sch_srd) &&
								<Col xl="2" className="col-2 pl-1">
									<Label className="mt-2">{schedule.sch_srd?Moment(schedule.sch_srd).format('MM-DD'):''}</Label>
								</Col>}
							</Row>
						</Col>
					</FormGroup>
				</Col>
				<Col xl="6" lg="6" md="12">
					<FormGroup>
						<Col className="col-12 p-0">
							<Label className="mb-0">Place of Delivery</Label>
							<Row>
								<Col xl="5" className="col-5 pr-1">
									<Select
										className="react-select react-select-primary"
										classNamePrefix="react-select"
										name="sch_pld"
										value={{value:schedule.sch_pld?schedule.sch_pld:'',label:schedule.sch_pld?schedule.sch_pld:'전체'}}
										onChange={(value)=>setSchedule({...schedule,'sch_pld':value.value,'sch_pld_name':value.port_name})}
										options={inLinePortList}
										onBlur={onPropsReturn}
										//placeholder={placeholder}
										/>
								</Col>
								<Col xl="7" className="col-7 pl-1">
									<Input 
										type="text" name="sch_pld_name" id="sch_pld_name" value={schedule.sch_pld_name?schedule.sch_pld_name:''} 
										onChange = {(event)=>onHandleReturnVal(event,'sch_pld_name')} 
										onBlur={onPropsReturn}/>
								</Col>
							</Row>
						</Col>
					</FormGroup>
				</Col>
				<Col xl="6" lg="6" md="12">
					<FormGroup>
						<Col className="col-12 p-0">
							<Label className="mb-0">POD</Label>
							<Row>
								<Col xl="5" className="col-5 pr-1">
									<Select
										className="react-select react-select-primary"
										classNamePrefix="react-select"
										name="sch_pod"
										value={{value:schedule.sch_pod?schedule.sch_pod:'',label:schedule.sch_pod?schedule.sch_pod:'전체'}}
										onChange={(value)=>setSchedule({...schedule,'sch_pod':value.value,'sch_pod_name':value.port_name})}
										options={inLinePortList}
										onBlur={onPropsReturn}
										//placeholder={placeholder}
									/>
								</Col>
								<Col xl="7" className="col-7 pl-1">
									<Input type="text" name="sch_pod_name" id="sch_pod_name" value={schedule.sch_pod_name?schedule.sch_pod_name:''} 
										onChange = {(event)=>onHandleReturnVal(event,'sch_pod_name')} 
										invalid={!bookmark&&!schedule.sch_pod_name?true:false}
										onBlur={onPropsReturn}/>
									<FormFeedback>{validation.REQ_MSG}</FormFeedback>
								</Col>
									{(!bookmark && schedule.sch_eta) &&
								<Col xl="2" className="col-2 pl-1">
									<Label className="mt-2">{schedule.sch_eta?Moment(schedule.sch_eta).format('MM-DD'):''}</Label>
								</Col>}
							</Row>
						</Col>
					</FormGroup>
				</Col>
    		</Row>
			<Row>
				<Col xl="6" lg="6" md="12">
					<FormGroup>
						<Label className="mb-0">Place of B/L Issue</Label>
						<Input type="text" name="sch_pob" id="sch_pob" value={schedule.sch_bl_issue_name?schedule.sch_bl_issue_name:''} 
							onChange = {(event)=>onHandleReturnVal(event,'sch_bl_issue_name')}
							onBlur={onPropsReturn}
						/>
					</FormGroup>
				</Col>
				<Col xl="6" lg="6" md="12">
					<FormGroup>
						<Col className="col-12 p-0">
							<Label className="mb-0">Final Destination</Label>
							<Row>
								<Col xl="5" className="col-5 pr-1">
									<Select
										className="react-select react-select-primary"
										classNamePrefix="react-select"
										name="sch_fdp"
										value={{value:schedule.sch_fdp,label:schedule.sch_fdp}}
										onChange={(value)=>setSchedule({...schedule,'sch_fdp':value.value,'sch_fdp_name':value.port_name})}
										options={inLinePortList}
										onBlur={onPropsReturn}
										//placeholder={placeholder}
									/>
								</Col>
								<Col xl="7" className="col-7 pl-1">
									<Input type="text" name="sch_fdp_name" id="sch_fdp_name" value={schedule.sch_fdp_name?schedule.sch_fdp_name:''}
										onChange = {(event)=>onHandleReturnVal(event,'sch_fdp_name')} 
										onBlur={onPropsReturn}/>
								</Col>
							</Row>
						</Col>
					</FormGroup>
				</Col>
			</Row>
		</>
    );
}

export default Schedule;