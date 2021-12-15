/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect } from 'react';
import { Row, Col, FormGroup,Label,Button} from "reactstrap";
//import * as validation from 'components/common/validation.js';
import InputValid from "components/CustomInput/InputValid.js";

export default function Notify(props) {
		
	const {loadFormData,type} = props;	
	const [notifyData,setNotifyData] = React.useState([]);
	
	useEffect(() => {
		setNotifyData(loadFormData);
	},[loadFormData]);

	const onHandleReturnVal = (event,name) => {
		// if(validation.getByte(event.target.value) < 36) {
			let list = {...notifyData, [name]:event.target.value.toUpperCase()};
			setNotifyData(list);
		// } else {
		//	  props.onAlert("error",validation.EXCD_MSG+"(35 Byte)");
		// }
	}
	
	const onPropsReturn = ()=> {
		props.propsData(notifyData);
	}
	
	const onCopyData =()=> {
		if(loadFormData) {
			var list = {...notifyData,'noti_name1':'SAME AS CONSIGNEE'};
			setNotifyData(list);
			props.propsData(list);
		}
	}
	
	return (
	<>
    {type==="B"||type==="C"?
		<Row>
			<Col xl="6" lg="6" md="12">
				<FormGroup>
					<Label className="mb-0"><font color="red">*</font>BookMark Name</Label>
					<InputValid 
						type="text"
						// bsSize="sm"
						name="noti_bookmark_name"
						id="noti_bookmark_name"
						maxLength="35"
						value={notifyData.notify_bookmark_name?notifyData.notify_bookmark_name:''}
						onChange={(e)=>onHandleReturnVal(e, 'notify_bookmark_name')}
						onBlur={onPropsReturn}
						validtype="text" 
						required={true}
						feedid="notify"
					/>
					{/*<Input type="text" name="noti_bookmark_name" id="noti_bookmark_name" placeholder="" 
						invalid={!notifyData.notify_bookmark_name?true:false}
						value={notifyData.notify_bookmark_name} 
					onChange = {(event)=>onHandleReturnVal(event,'notify_bookmark_name')} 
					onBlur={onPropsReturn}
						/>
					<FormFeedback>{validation.REQ_MSG}</FormFeedback>*/}
				</FormGroup>
			</Col>
		</Row>:
		<Row>
			<Col className="col-12 text-right pr-0">
				<Button className="btn-link pr-0 pt-0 pb-0" color="info" type="button" size="sm" onClick={onCopyData}>
	         	same as consignee
	         	</Button>
	     	</Col> 
		</Row>}
    	<Row>
    		<Col xl="5" lg="5" md="12">
				<FormGroup>
					<Label className="mb-0">Name1</Label>
						<InputValid 
							type="text"
						// bsSize="sm"
							name="noti_name1"
							id="noti_name1"
							maxLength="35"
							value={notifyData.noti_name1?notifyData.noti_name1:''}
							onChange={(e)=>onHandleReturnVal(e, 'noti_name1')}
							onBlur={onPropsReturn}
							validtype="text" 
							required={type==="B"?false:true}
							feedid="notify"
						/>
						{/*<Input type="text" name="noti_name1" id="noti_name1" placeholder=""
						invalid={!bookmark&&!notifyData.noti_name1?true:false}
						value={notifyData.noti_name1} onChange = {(event)=>onHandleReturnVal(event,'noti_name1')} onBlur={onPropsReturn}
						/>
					<FormFeedback>{validation.REQ_MSG}</FormFeedback>*/}
				</FormGroup>
    		</Col>
			<Col xl="5" lg="5" md="12">
				<FormGroup>
					<Label className="mb-0">Name2</Label>
						<InputValid 
							type="text"
						// bsSize="sm"
							name="noti_name2"
							id="noti_name2"
							maxLength="35"
							value={notifyData.noti_name2?notifyData.noti_name2:''}
							onChange={(e)=>onHandleReturnVal(e, 'noti_name2')}
							onBlur={onPropsReturn}
							validtype="text" 
							required={false}
							feedid="notify"
						/>
				{/* <Input type="text" name="noti_name2" id="noti_name2" placeholder=""
						value={notifyData.noti_name2} onChange = {(event)=>onHandleReturnVal(event,'noti_name2')} onBlur={onPropsReturn}
						/>*/}
				</FormGroup>
			</Col>        
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">Address1</Label>
    	            <InputValid 
			            type="text"
			           // bsSize="sm"
			            name="noti_address1"
			            id="noti_address1"
			            maxLength="35"
			            value={notifyData.noti_address1?notifyData.noti_address1:''}
			            onChange={(e)=>onHandleReturnVal(e, 'noti_address1')}
			            onBlur={onPropsReturn}
			            validtype="text" 
			            required={type==="B"?false:true}
    	            	feedid="notify"
			        />
    	            {/* <Input type="text" name="noti_address1" id="noti_address1" placeholder="" 
                    	invalid={!bookmark&&!notifyData.noti_address1?true:false}
                    	value={notifyData.noti_address1} maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'noti_address1')} onBlur={onPropsReturn}
                    />
                    <FormFeedback>{validation.REQ_MSG}</FormFeedback>*/}
                    </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">Address2</Label>
	    	            <InputValid 
				            type="text"
				           // bsSize="sm"
				            name="noti_address2"
				            id="noti_address2"
				            maxLength="35"
				            value={notifyData.noti_address2?notifyData.noti_address2:''}
				            onChange={(e)=>onHandleReturnVal(e, 'noti_address2')}
				            onBlur={onPropsReturn}
				            validtype="text" 
				            required={false}
	    	            feedid="notify"
				        />
	    	            {/* <Input type="text" name="noti_address2" id="noti_address2" placeholder="" 
                    	value={notifyData.noti_address2} maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'noti_address2')} onBlur={onPropsReturn}	
                    />*/}
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="6">
	            <FormGroup>
	                <Label className="mb-0">Address3</Label>
			            <InputValid 
				            type="text"
				           // bsSize="sm"
				            name="noti_address3"
				            id="noti_address3"
				            maxLength="35"
				            value={notifyData.noti_address3?notifyData.noti_address3:''}
				            onChange={(e)=>onHandleReturnVal(e, 'noti_address3')}
				            onBlur={onPropsReturn}
				            validtype="text" 
				            required={false}
			            	feedid="notify"
				        />
	               {/* <Input type="text" name="noti_address3" id="noti_address3" placeholder="" 
	                	value={notifyData.noti_address3} maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'noti_address3')} onBlur={onPropsReturn}	
	                />*/}
	            </FormGroup>
	        </Col>
	        <Col xl="6" lg="6" md="6">
		        <FormGroup>
		            <Label className="mb-0">Address4</Label>
			            <InputValid 
				            type="text"
				           // bsSize="sm"
				            name="noti_address4"
				            id="noti_address4"
				            maxLength="35"
				            value={notifyData.noti_address4?notifyData.noti_address4:''}
				            onChange={(e)=>onHandleReturnVal(e, 'noti_address4')}
				            onBlur={onPropsReturn}
				            validtype="text" 
				            required={false}
			            feedid="notify"
				        />
		           {/* <Input type="text" name="noti_address4" id="noti_address4" placeholder="" 
		            	value={notifyData.noti_address4} maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'noti_address4')} onBlur={onPropsReturn}	
		            />*/}
		        </FormGroup>
		    </Col>
		    <Col xl="6" lg="6" md="6">
				<FormGroup>
					<Label className="mb-0">Address5</Label>
					<InputValid 
						type="text"
					// bsSize="sm"
						name="noti_address5"
						id="noti_address5"
						maxLength="35"
						value={notifyData.noti_address5?notifyData.noti_address5:''}
						onChange={(e)=>onHandleReturnVal(e, 'noti_address5')}
						onBlur={onPropsReturn}
						validtype="text" 
						required={false}
						feedid="notify"
					/>
					{/*<Input type="text" name="noti_address5" id="noti_address5" placeholder="" 
						value={notifyData.noti_address5} maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'noti_address5')} onBlur={onPropsReturn}	
					/>*/}
				</FormGroup>
			</Col>
        </Row>
        {(type==="C") &&
		<Row>
			<Col xl="6" lg="6" md="6">
				<FormGroup className="mb-2">
        		    <Label className="mb-0">담당자명</Label>
        		    <InputValid 
                        type="text"
                        //bsSize="sm"
                        name="noti_user_name"
                        id="noti_user_name"
                        maxLength="17"
                        value={notifyData.noti_user_name?notifyData.noti_user_name:''}
                        onChange={(e)=>onHandleReturnVal(e, 'noti_user_name')}
                        onBlur={onPropsReturn}
                        validtype="text" 
                        required={false}
        		        feedid="notify"/>
				</FormGroup>
			</Col>
			<Col xl="6" lg="6" md="6">
        	    <FormGroup className="mb-2">
					<Label className="mb-0">연락처</Label>
					<InputValid 
						type="text"
						//bsSize="sm"
						name="noti_user_tel"
						id="noti_user_tel"
						maxLength="25"
						value={notifyData.noti_user_tel?notifyData.noti_user_tel:''}
						onChange={(e)=>onHandleReturnVal(e, 'noti_user_tel')}
						onBlur={onPropsReturn}
						validtype="text" 
						required={false}
						feedid="notify"/>
				</FormGroup>
        	</Col>
        	<Col xl="6" lg="6" md="6">
        	    <FormGroup className="mb-2">
					<Label className="mb-0">사업자코드</Label>
					<InputValid 
						type="text"
						//bsSize="sm"
						name="noti_code"
						id="noti_code"
						maxLength="18"
						value={notifyData.noti_code?notifyData.noti_code:''}
						onChange={(e)=>onHandleReturnVal(e, 'noti_code')}
						onBlur={onPropsReturn}
						validtype="text" 
						required={false}
						feedid="notify"/>
        		</FormGroup>
        	</Col>
        	<Col xl="6" lg="6" md="6">
        	    <FormGroup className="mb-2">
					<Label className="mb-0">국가코드</Label>
					<InputValid 
						type="text"
						//bsSize="sm"
						name="noti_country_code"
						id="noti_country_code"
						maxLength="2"
						value={notifyData.noti_country_code?notifyData.noti_country_code:''}
						onChange={(e)=>onHandleReturnVal(e, 'noti_country_code')}
						onBlur={onPropsReturn}
						validtype="text" 
						required={false}
						feedid="notify"/>
				</FormGroup>
			</Col>
		</Row>}
    </>
    );
}