/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, FormGroup,Card,CardHeader,CardBody } from "reactstrap";
import axios from 'axios';
import Select from "react-select";
import InputValid from "components/CustomInput/InputValid.js";
const Mark = (props) => { //console.log(">props:",props.bookmark);
  	const {loadData,bookmark,view,validation} = props;	

	useEffect(() => {
		setMarkData({...loadData,'mark_desc1':loadData.mark_desc1?loadData.mark_desc1:'NO MARK'});
	},[loadData]);

  	const [markData, setMarkData] = useState({});
  	//const [colsOpen, setColsOpen] = useState(false);
	const onHandleReturnVal = (event,name) => { 
		// if(validation.getByte(event.target.value) < 36) {
			let list = {...markData, [name]:event.target.value};
			setMarkData(list);
		// } else {
		//	  props.onAlert("error",validation.EXCD_MSG+"(35 Byte)");
		//  }
	  
    }
  
	const onPropsReturn = ()=> {
		props.propsData(markData);
    }
  
  	const onDeleteMark =(markData)=>{
	  	props.propsDelete(markData);
  	}
  
  	const onChangeMark =(value)=> {
    	// setMarkData({...markData,'cargo_mark_bookmark_seq':event.target.value})
      	if(value > 0) {
			axios.post("/shipper/getUserMarkBookmark",{user_no:props.user?props.user.user_no:'',seq:value},{}).then(res => {
				setMarkData(res.data[0]);
				props.propsData(res.data[0]);
			});
      	} else {
    		setMarkData([]);
      	}
  	}
  
  	return (
    	<>
	    	<Card className="no-transition mb-2" style={{border:'1px solid silver'}}>
		    	<CardHeader className="pt-1 pb-1">
		      		<Row>
		      			<Col className="col-6">
							<Select
								className="customSelect bg-white"
								classNamePrefix="customSelect"
								name="cargo_pack_type"
								placeholder=""
								value={{value:markData.cargo_mark_bookmark_seq?markData.cargo_mark_bookmark_seq:'',
								label:markData.cargo_mark_bookmark_seq?
									(bookmark.findIndex(x=>x.value===markData.cargo_mark_bookmark_seq)>=0)?
											bookmark[bookmark.findIndex(x=>x.value===markData.cargo_mark_bookmark_seq)].label:
										'선택':'선택'
								}}
								//onChange={(value)=>setBooking({...booking,'trans_service_code':value.value})}
								onChange = {(value)=>onChangeMark(value.value,'cargo_mark_bookmark_seq')}
								//onBlur={(e)=>props.fncBookingParent(booking)}
								options={bookmark}
							/>
							{/*<Input type="select" className="pt-0 pb-0" style={{height:'28px'}}
							value={markData.cargo_mark_bookmark_seq?markData.cargo_mark_bookmark_seq:''} 
							onChange={(event)=>onChangeMark(event)}>
							<option value="">선택</option>
								{bookmark.length>0?bookmark.map((element,key)=>
									<option key={key} value={element.cargo_mark_bookmark_seq}>{element.cargo_mark_bookmark_name}</option>
								):<></>}
							</Input>*/}
		      			</Col>
		      			<Col>
						  	<button
	        					className="close"
								type="button"
								onClick={(markData)=>onDeleteMark(markData)}
							>×</button></Col>
		      		</Row>
		    	</CardHeader>
			    <CardBody className="pt-4 pb-2">
			    	<div style={{height:view?'':'212px'}}>
			    		<FormGroup className="mb-0">
							<InputValid 
								type="text"
								name="mark_desc1"
								id="mark_desc1"
								maxLength="35"
								bsSize="sm"
								value={markData.mark_desc1?markData.mark_desc1:''}
								onChange={(e)=>onHandleReturnVal(e, 'mark_desc1')}
								onBlur={onPropsReturn}
								validtype="text"
								style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
								required={false} 
								feedid="cargo"
								disabled={view?true:false}/>
				  		</FormGroup>
						<FormGroup className="mb-0">
							<InputValid 
								type="text"
								name="mark_desc2"
								id="mark_desc2"
								maxLength="35"
								bsSize="sm"
								value={markData.mark_desc2?markData.mark_desc2:''}
								onChange={(e)=>onHandleReturnVal(e, 'mark_desc2')}
								onBlur={onPropsReturn}
								validtype="text"
								style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
								required={false} 
								feedid="cargo"
								disabled={view?true:false}/>	
				  		</FormGroup>
					    <FormGroup className="mb-0">
			            	<InputValid 
								type="text"
								name="mark_desc3"
								id="mark_desc3"
								maxLength="35"
								bsSize="sm"
								value={markData.mark_desc3?markData.mark_desc3:''}
								onChange={(e)=>onHandleReturnVal(e, 'mark_desc3')}
								onBlur={onPropsReturn}
								validtype="text"
								style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
								required={false} 
								feedid="cargo"
								disabled={view?true:false}/>
						</FormGroup>
						<FormGroup className="mb-0">
							<InputValid 
								type="text"
								name="mark_desc4"
								id="mark_desc4"
								maxLength="35"
								bsSize="sm"
								value={markData.mark_desc4?markData.mark_desc4:''}
								onChange={(e)=>onHandleReturnVal(e, 'mark_desc4')}
								onBlur={onPropsReturn}
								validtype="text"
								style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
								required={false} 
								feedid="cargo"
								disabled={view?true:false}/>
						</FormGroup>
						<FormGroup className="mb-0">
							<InputValid 
								type="text"
								name="mark_desc5"
								id="mark_desc5"
								maxLength="35"
								bsSize="sm"
								value={markData.mark_desc5?markData.mark_desc5:''}
								onChange={(e)=>onHandleReturnVal(e, 'mark_desc5')}
								onBlur={onPropsReturn}
								validtype="text"
								style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
								required={false} 
								feedid="cargo"
								disabled={view?true:false}/>
						</FormGroup>
					</div>
		  		</CardBody>
	  		</Card> 
    	</>
    );
}

export default Mark;