/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect } from 'react';
import { Row, Col, FormGroup,Label,Input,FormFeedback } from "reactstrap";
import InputValid from "components/CustomInput/InputValid.js";

const Consignee = (props) => {
	
 const {bookmark,loadData,validation,type} = props;	
 const [consigneeData,setConsigneeData] = React.useState([]);
 
  useEffect(() => {
    setConsigneeData(loadData);
  },[loadData]);

  const onHandleReturnVal = (event,name) => {
	  
	  let list = {...consigneeData, [name]:event.target.value.toUpperCase()};
	  setConsigneeData(list);
  }
  
  const onPropsReturn = ()=> {
	  props.propsData(consigneeData);
  }
  
  return (
    <>
    {bookmark?<Row>
	        <Col xl="6" lg="6" md="12">
		        <FormGroup>
		            <Label className="mb-0"><font color="red">*</font>BookMark Name</Label>
		            <Input type="text" name="cons_bookmark_name" id="cons_bookmark_name" placeholder=""
		                invalid={!consigneeData.consignee_bookmark_name?true:false}
		            	value={consigneeData.consignee_bookmark_name} 
		            onChange = {(event)=>onHandleReturnVal(event,'consignee_bookmark_name')} 
		            onBlur={onPropsReturn}
		            	/>
		            <FormFeedback>{validation.REQ_MSG}</FormFeedback>
		            </FormGroup>
	        </Col>
	     </Row>:<></>}
		    <Row>
			    <Col xl="5" lg="5" md="12">
			        <FormGroup>
			            <Label className="mb-0">Name1</Label>
				            <InputValid 
				                type="text"
				                //bsSize="sm"
				                name="cons_name1"
				                id="cons_name1"
				                placeholder=""
				                maxLength="35"
				                value={consigneeData.cons_name1?consigneeData.cons_name1:''}
				                onChange={(e)=>onHandleReturnVal(e, 'cons_name1')}
				                onBlur={onPropsReturn}
				                validtype="text" 
				                required={!bookmark?true:false}
				            	feedid="consignee"	
				            />
			            {/*<Input type="text" name="cons_name1" id="cons_name1" placeholder=""
			            	invalid={!bookmark&&!consigneeData.cons_name1?true:false}
			            	value={consigneeData.cons_name1} onChange = {(event)=>onHandleReturnVal(event,'cons_name1')} onBlur={onPropsReturn}
			            	/>
			            <FormFeedback>{validation.REQ_MSG}</FormFeedback>*/}
			        </FormGroup>
			    </Col>
			    <Col xl="5" lg="5" md="12">
			        <FormGroup>
			            <Label className="mb-0">Name2</Label>
				            <InputValid 
				                type="text"
				                //bsSize="sm"
				                name="cons_name2"
				                id="cons_name2"
				                placeholder=""
				                maxLength="35"
				                value={consigneeData.cons_name2?consigneeData.cons_name2:''}
				                onChange={(e)=>onHandleReturnVal(e, 'cons_name2')}
				                onBlur={onPropsReturn}
				                validtype="text" 
				                required={false}
				            	feedid="consignee"
				            />
			           {/* <Input type="text" name="cons_name2" id="cons_name2" placeholder=""
			            	value={consigneeData.cons_name2} onChange = {(event)=>onHandleReturnVal(event,'cons_name2')} onBlur={onPropsReturn}
			            	/>*/}
			        </FormGroup>
			    </Col>        
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">Address1</Label>
	                    <InputValid 
			                type="text"
			                //bsSize="sm"
			                name="cons_address1"
			                id="cons_address1"
			                placeholder=""
			                maxLength="35"
			                value={consigneeData.cons_address1?consigneeData.cons_address1:''}
			                onChange={(e)=>onHandleReturnVal(e, 'cons_address1')}
			                onBlur={onPropsReturn}
			                validtype="text" 
			                required={!bookmark?true:false}
	                    	feedid="consignee"
			            />
                   {/* <Input type="text" name="cons_address1" id="cons_address1" placeholder=""
                    	invalid={!bookmark&&!consigneeData.cons_address1?true:false}
                    	value={consigneeData.cons_address1} maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'cons_address1')} onBlur={onPropsReturn}
                    />
                    <FormFeedback>{validation.REQ_MSG}</FormFeedback>*/}
                    </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">Address2</Label>
                    <InputValid 
		                type="text"
		                //bsSize="sm"
		                name="cons_address2"
		                id="cons_address2"
		                placeholder=""
		                maxLength="35"
		                value={consigneeData.cons_address2?consigneeData.cons_address2:''}
		                onChange={(e)=>onHandleReturnVal(e, 'cons_address2')}
		                onBlur={onPropsReturn}
		                validtype="text" 
		                required={false}
                    	feedid="consignee"
		            />
                  {/*  <Input type="text" name="cons_address2" id="cons_address2" placeholder="" 
                    	value={consigneeData.cons_address2} maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'cons_address2')} onBlur={onPropsReturn}	
                    />*/}
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="6">
	            <FormGroup>
	                <Label className="mb-0">Address3</Label>
	                <InputValid 
		                type="text"
		                //bsSize="sm"
		                name="cons_address3"
		                id="cons_address3"
		                placeholder=""
		                maxLength="35"
		                value={consigneeData.cons_address3?consigneeData.cons_address3:''}
		                onChange={(e)=>onHandleReturnVal(e, 'cons_address3')}
		                onBlur={onPropsReturn}
		                validtype="text" 
		                required={false}
	                	feedid="consignee"
		            />
	             {/*   <Input type="text" name="cons_address3" id="cons_address3" placeholder="" 
	                	value={consigneeData.cons_address3} maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'cons_address3')} onBlur={onPropsReturn}	
	                />*/}
	            </FormGroup>
	        </Col>
	        <Col xl="6" lg="6" md="6">
		        <FormGroup>
		            <Label className="mb-0">Address4</Label>
		            <InputValid 
		                type="text"
		                //bsSize="sm"
		                name="cons_address4"
		                id="cons_address4"
		                placeholder=""
		                maxLength="35"
		                value={consigneeData.cons_address4?consigneeData.cons_address4:''}
		                onChange={(e)=>onHandleReturnVal(e, 'cons_address4')}
		                onBlur={onPropsReturn}
		                validtype="text" 
		                required={false}
		            	feedid="consignee"		            
		            />
		          {/*  <Input type="text" name="cons_address4" id="cons_address4" placeholder="" 
		            	value={consigneeData.cons_address4}  maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'cons_address4')} onBlur={onPropsReturn}	
		            />*/}
		        </FormGroup>
		    </Col>
		    <Col xl="6" lg="6" md="6">
		    <FormGroup>
		        <Label className="mb-0">Address5</Label>
		        <InputValid 
	                type="text"
	                //bsSize="sm"
	                name="cons_address5"
	                id="cons_address5"
	                placeholder=""
	                maxLength="35"
	                value={consigneeData.cons_address5?consigneeData.cons_address5:''}
	                onChange={(e)=>onHandleReturnVal(e, 'cons_address5')}
	                onBlur={onPropsReturn}
	                validtype="text" 
	                required={false}
		        	feedid="consignee"
	            />
		     {/*   <Input type="text" name="cons_address5" id="cons_address5" placeholder="" 
		        	value={consigneeData.cons_address5}  maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'cons_address5')} onBlur={onPropsReturn}	
		        />*/}
		    </FormGroup>
		</Col>
        </Row>
        {bookmark && type === "C"?
    			<Row>
    			<Col xl="6" lg="6" md="6">
    			    <FormGroup className="mb-2">
    			    <Label className="mb-0">담당자명</Label>
    			    <InputValid 
    	                type="text"
    	                //bsSize="sm"
    	                name="cons_user_name"
    	                id="cons_user_name"
    	                placeholder=""
    	                maxLength="17"
    	                value={consigneeData.cons_user_name?consigneeData.cons_user_name:''}
    	                onChange={(e)=>onHandleReturnVal(e, 'cons_user_name')}
    	                onBlur={onPropsReturn}
    	                validtype="text" 
    	                required={false}
    			        feedid="consignee"
    	            />
    			        	</FormGroup>
    			</Col>
    			<Col xl="6" lg="6" md="6">
    		    <FormGroup className="mb-2">
    		    <Label className="mb-0">연락처</Label>
    		    <InputValid 
                    type="text"
                    //bsSize="sm"
                    name="cons_user_tel"
                    id="cons_user_tel"
                    placeholder=""
                    maxLength="25"
                    value={consigneeData.cons_user_tel?consigneeData.cons_user_tel:''}
                    onChange={(e)=>onHandleReturnVal(e, 'cons_user_tel')}
                    onBlur={onPropsReturn}
                    validtype="text" 
                    required={false}
    		        feedid="consignee"
                />
    		</FormGroup>
    		</Col>
    		<Col xl="6" lg="6" md="6">
    		    <FormGroup className="mb-2">
    		    <Label className="mb-0">사업자코드</Label>
    		    <InputValid 
    	            type="text"
    	            //bsSize="sm"
    	            name="cons_code"
    	            id="cons_code"
    	            placeholder=""
    	            maxLength="18"
    	            value={consigneeData.cons_code?consigneeData.cons_code:''}
    	            onChange={(e)=>onHandleReturnVal(e, 'cons_code')}
    	            onBlur={onPropsReturn}
    	            validtype="text" 
    	            required={false}
    		        feedid="consignee"
    	        />
    		</FormGroup>
    		</Col>
    		<Col xl="6" lg="6" md="6">
    		    <FormGroup className="mb-2">
    		    <Label className="mb-0">국가코드</Label>
    		    <InputValid 
    	            type="text"
    	            //bsSize="sm"
    	            name="cons_country_code"
    	            id="cons_country_code"
    	            placeholder=""
    	            maxLength="2"
    	            value={consigneeData.cons_country_code?consigneeData.cons_country_code:''}
    	            onChange={(e)=>onHandleReturnVal(e, 'cons_country_code')}
    	            onBlur={onPropsReturn}
    	            validtype="text" 
    	            required={false}
    		        feedid="consignee"
    	        />
    		</FormGroup>
    		</Col></Row>:<></>}
    </>
    );
}

export default Consignee;