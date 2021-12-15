/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, CardBody, FormGroup,Label,Input, Card,Table}
     from "reactstrap";
//import axios from 'axios';
import Select from "react-select";

export default function Bookmark(props) {

  	const {bookmark,titleProps} = props;
  	useEffect(() => {
	  	setTitleRelation(titleProps);
	},[titleProps]);

	// modal 창을 위한 state
	//const [coll, setColl] = useState(false);
	//const [open, setOpen] = useState(false);
	const [titleRelation, setTitleRelation] = useState({});

	const fncOnchangeRelation =(value,name)=> { 
		var list={};
		if(name === 'BOOKING') {
			if(value) {
				list={...list,'booking_label':value.label,'booking_value':value.value};
			}else {
				list={...list,'booking_label':'','booking_value':''};
			}
		} else if(name === 'SCHEDULE') {
			if(value) {
				list={...list,'schedule_label':value.label,'schedule_value':value.value};
			}else {
				list={...list,'schedule_label':'','schedule_value':''};
			}
		//} else if(name === 'CARRIER') {
		//	  list={...list,'carrier_label':value.label,'carrier_value':value.value};
		} else if(name === 'SHIPPER') {
			if(value) {
				list={...list,'shipper_label':value.label,'shipper_value':value.value};
			}else {
				list={...list,'shipper_label':'','shipper_value':''};
			}
		} else if(name === 'CONSIGNEE') {
			if(value) {
				list={...list,'consignee_label':value.label,'consignee_value':value.value};
			}else {
				list={...list,'consignee_label':'','consignee_value':''};
			}
		} else if(name === 'NOTIFY') {
			if(value) {
				list={...list,'notify_label':value.label,'notify_value':value.value};
			}else {
				list={...list,'notify_label':'','notify_value':''};
			}
		} else if(name === 'CARGO') {
			if(value) {
				list={...list,'cargo_label':value.label,'cargo_value':value.value};
			}else {
				list={...list,'cargo_label':'','cargo_value':''};
			}
		} else if(name === 'C_SHIPPER') {
			if(value) {
				list={...list,'c_shipper_label':value.label,'c_shipper_value':value.value};
			}else {
				list={...list,'c_shipper_label':'','c_shipper_value':''};
			}
		} else if(name === 'C_CONSIGNEE') {
			if(value) {
				list={...list,'c_consignee_label':value.label,'c_consignee_value':value.value};
			}else {
				list={...list,'c_consignee_label':'','c_consignee_value':''};
			}
		} else if(name === 'C_NOTIFY') {
			if(value) {
				list={...list,'c_notify_label':value.label,'c_notify_value':value.value};
			}else {
				list={...list,'c_notify_label':'','c_notify_value':''};
			}
		}
		setTitleRelation({...titleRelation,...list});
		props.insertProps({...titleRelation,...list});
	} 
	
	const fncOnChange = (value,name) => {
		setTitleRelation({...titleRelation,[name]:value});
	}
	
	const fncSelectBookmark = (data)=> { 
		props.selectProps(data);
		
	}
	
	const fncOnBlur =()=>{
		props.insertProps(titleRelation);
	}
	
	const onPropsDelete=(data)=>{
		props.deleteProps(data);
	}
  
  	return (
		<Row className="mb-3">
          	<Col xl="4" lg="4" md="12">
              	<FormGroup style={{height:'400px',overflow:'auto'}} className="mb-0">
              		<Label className="mb-0">Bookmark List</Label>
					<CardBody className="bg-white p-0">
						<Table className="mb-0" responsive hover size="sm">
							<thead>
								<tr>
									<td className="p-2 bg-info">Name</td>
								</tr>
							</thead>
							<tbody>
							{(bookmark.length > 0) && bookmark.map((element,key)=>{
								return(
									<tr scope="row" key={key} onClick={()=>fncSelectBookmark(element)}
										style={element.bookmark_seq===titleRelation.bookmark_seq?{backgroundColor:'aliceblue'}:{backgroundColor:''}}>
										<td >{element.bookmark_name}</td>
									</tr>
								)
							})}
							</tbody>
						</Table>
					</CardBody>
                </FormGroup>
			</Col>
			<Col xl="8" lg="8" md="12">
				<Label className="mb-0">Bookmark</Label>
				<Card style={{zIndex:'70'}} className="card-raised card-form-horizontal no-transition mb-0">
					<CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>
						<Row className="pb-2">
							<Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>
								Bookmark Name
							</Col>
							<Col>
								<Row>
									<Col className="col-10 pr-0">
										<Input
											type="text" 
											name="bookmark_name" 
											id="bookmark_name"
											maxLength="35"
											value={titleRelation.bookmark_name?titleRelation.bookmark_name:''}
											onChange={(e)=>fncOnChange(e.target.value, 'bookmark_name')}
											onBlur={()=>fncOnBlur()}/>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row className="pb-2">
							<Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>
								BOOKING
							</Col>
							<Col>
								<Row>
									<Col className="col-10 pr-0">
										<Select
											className="react-select react-select-primary"
											classNamePrefix="react-select"
											name="BOOKING"
											value={{
													value:titleRelation.booking_value?titleRelation.booking_value:'',
													label:titleRelation.booking_label?titleRelation.booking_label:'사용안함',
												}}
											onChange={(value)=>fncOnchangeRelation(value?value:null, 'BOOKING')}
											options={props.booking}
											placeholder="사용안함"
											isClearable={titleRelation.booking_value?true:false}/>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row className="pb-2">
							<Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>
								SCHEDULE
							</Col>
							<Col>
								<Row>
									<Col className="col-10 pr-0">
										<Select
											className="react-select react-select-primary"
											classNamePrefix="react-select"
											name="SCHEDULE"
											value={{
												value:titleRelation.schedule_value?titleRelation.schedule_value:'',
												label:titleRelation.schedule_label?titleRelation.schedule_label:'사용안함',
											}}
											onChange={(value)=>fncOnchangeRelation(value?value:null, 'SCHEDULE')}
											options={props.schedule}
											placeholder="사용안함"
											isClearable={titleRelation.schedule_value?true:false}/>
									</Col>
								</Row>
							</Col>
						</Row>
						{/* <Row className="pb-2">
								<Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>CARRIER
								</Col>
								<Col>
									<Row>
										<Col className="col-10 pr-0">
											<Select
												className="react-select react-select-primary"
												classNamePrefix="react-select"
												name="CARRIER"
												value={{
													value:titleRelation.carrier_value?titleRelation.carrier_value:'',
													label:titleRelation.carrier_label?titleRelation.carrier_label:'사용안함',
												}}
												onChange={(value)=>fncOnchangeRelation(value?value:null, 'CARRIER')}
												options={props.carrier}
												placeholder="사용안함"
											/>
										</Col>
									</Row>
								</Col>
							</Row>*/}
						<Row className="pb-2">
							<Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>
								SHIPPER
							</Col>
							<Col>
								<Row>
									<Col className="col-10 pr-0">
										<Select
											className="react-select react-select-primary"
											classNamePrefix="react-select"
											name="SHIPPER"
											value={{
												value:titleRelation.shipper_value?titleRelation.shipper_value:'',
												label:titleRelation.shipper_label?titleRelation.shipper_label:'사용안함',
											}}
											onChange={(value)=>fncOnchangeRelation(value?value:null, 'SHIPPER')}
											options={props.shipper}
											placeholder="사용안함"
											isClearable={titleRelation.shipper_value?true:false}/>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row className="pb-2">
							<Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>
								CONSIGNEE
							</Col>
							<Col>
								<Row>
									<Col className="col-10 pr-0">
										<Select
											className="react-select react-select-primary"
											classNamePrefix="react-select"
											name="CONSIGNEE"
											value={{
												value:titleRelation.consignee_value?titleRelation.consignee_value:'',
												label:titleRelation.consignee_label?titleRelation.consignee_label:'사용안함',
											}}
											onChange={(value)=>fncOnchangeRelation(value?value:null, 'CONSIGNEE')}
											options={props.consignee}
											placeholder="사용안함"
											isClearable={titleRelation.consignee_value?true:false}/>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row className="pb-2">
							<Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>
								NOTIFY
							</Col>
							<Col>
								<Row>
									<Col className="col-10 pr-0">
										<Select
											className="react-select react-select-primary"
											classNamePrefix="react-select"
											name="NOTIFY"
											value={{
												value:titleRelation.notify_value?titleRelation.notify_value:'',
												label:titleRelation.notify_label?titleRelation.notify_label:'사용안함',
											}}
											onChange={(value)=>fncOnchangeRelation(value?value:null, 'NOTIFY')}
											options={props.notify}
											placeholder="사용안함"
											isClearable={titleRelation.notify_value?true:false}/>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row className="pb-2">
							<Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>
								CARGO
							</Col>
							<Col>
								<Row>
									<Col className="col-10 pr-0">
										<Select
											className="react-select react-select-primary"
											classNamePrefix="react-select"
											name="CARGO"
											value={{
												value:titleRelation.cargo_value?titleRelation.cargo_value:'',
												label:titleRelation.cargo_label?titleRelation.cargo_label:'사용안함',
											}}
											onChange={(value)=>fncOnchangeRelation(value?value:null, 'CARGO')}
											options={props.cargo}
											placeholder="사용안함"
											isClearable={titleRelation.cargo_value?true:false}/>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row className="pb-2">
							<Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>
								CCAM SHIPPER
							</Col>
							<Col>
								<Row>
									<Col className="col-10 pr-0">
										<Select
											className="react-select react-select-primary"
											classNamePrefix="react-select"
											name="C_SHIPPER"
											value={{
												value:titleRelation.c_shipper_value?titleRelation.c_shipper_value:'',
												label:titleRelation.c_shipper_label?titleRelation.c_shipper_label:'사용안함',
											}}
											onChange={(value)=>fncOnchangeRelation(value?value:null, 'C_SHIPPER')}
											options={props.shipper}
											placeholder="사용안함"
											isClearable={titleRelation.c_shipper_value?true:false}/>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row className="pb-2">
							<Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>
								CCAM CONSIGNEE
							</Col>
							<Col>
								<Row>
									<Col className="col-10 pr-0">
										<Select
											className="react-select react-select-primary"
											classNamePrefix="react-select"
											name="C_CONSIGNEE"
											value={{
												value:titleRelation.c_consignee_value?titleRelation.c_consignee_value:'',
												label:titleRelation.c_consignee_label?titleRelation.c_consignee_label:'사용안함',
											}}
											onChange={(value)=>fncOnchangeRelation(value?value:null, 'C_CONSIGNEE')}
											options={props.consignee}
											placeholder="사용안함"
											isClearable={titleRelation.c_consignee_value?true:false}/>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row className="pb-2">
							<Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>
								CCAM NOTIFY
							</Col>
							<Col>
								<Row>
									<Col className="col-10 pr-0">
										<Select
											className="react-select react-select-primary"
											classNamePrefix="react-select"
											name="C_NOTIFY"
											value={{
												value:titleRelation.c_notify_value?titleRelation.c_notify_value:'',
												label:titleRelation.c_notify_label?titleRelation.c_notify_label:'사용안함',
											}}
											onChange={(value)=>fncOnchangeRelation(value?value:null, 'C_NOTIFY')}
											options={props.notify}
											placeholder="사용안함"
											isClearable={titleRelation.c_notify_value?true:false}/>
									</Col>
								</Row>
							</Col>
						</Row>
					</CardBody>
				</Card>
			</Col>
		</Row>
	);
}