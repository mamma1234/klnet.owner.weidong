/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect } from 'react';
import { Row, Col, FormGroup,Label,Input,FormFeedback } from "reactstrap";
import InputValid from "components/CustomInput/InputValid.js";

const Carrier = (props) => {
	
 const {bookmark,loadFormData,validation,type} = props;	 
 const [lineData,setLineData] = React.useState([]);
 
  useEffect(() => {
	  setLineData(loadFormData);
  },[loadFormData]);


  const onHandleReturnVal = (event,name) => {
	  if(validation.getByte(event.target.value) < 36) {
	  let list = {...lineData, [name]:event.target.value};
	  setLineData(list);  
  } else {
	  props.onAlert("error",validation.EXCD_MSG+"(35 Byte)");
  }
	  
  }
  
  const onPropsReturn = ()=> {
	  props.propsData(lineData);
  }
  
  const onHandleSelectReturnVal = (event,name) => {
  	  
  	  let list = {...lineData, [name]:event.target.value};
  	  setLineData(list);
  	  props.propsData(list);	  
   }
  
  return (
    <>
    {type==="B"?<Row>
	        <Col xl="6" lg="6" md="12">
		        <FormGroup>
		            <Label className="mb-0">BookMark Name</Label>
		            <Input type="text" name="line_bookmark_name" id="line_bookmark_name" placeholder="" 
		            	invalid={!lineData.line_bookmark_name?true:false}
		            	value={lineData.line_bookmark_name} 
		            onChange = {(event)=>onHandleReturnVal(event,'line_bookmark_name')} 
		            onBlur={onPropsReturn}
		            	/>
		            <FormFeedback>{validation.REQ_MSG}</FormFeedback>	
		        </FormGroup>
	        </Col>
	     </Row>:<></>}
        <Row>
            <Col xl="5" lg="5" md="12">
                <FormGroup>
                    <Label className="mb-0">Carrier Name1</Label>
                    <InputValid 
	                    type="text"
	                    //bsSize="sm"
	                    name="line_name1"
	                    id="line_name1"
	                    placeholder=""
	                    maxLength="35"
	                    value={lineData.line_name1?lineData.line_name1:''}
	                    onChange={(e)=>onHandleReturnVal(e, 'line_name1')}
	                    onBlur={onPropsReturn}
	                    validtype="text" 
	                    required={type==="B"?false:true}
	                />
                  { /* <Input type="text" name="line_name1" id="line_name1" placeholder=""
                    	invalid={!bookmark&&!lineData.line_name1?true:false}
                    	value={lineData.line_name1} onChange = {(event)=>onHandleReturnVal(event,'line_name1')} onBlur={onPropsReturn}
                    	/>
                    <FormFeedback>{validation.REQ_MSG}</FormFeedback>	*/}
                </FormGroup>
            </Col>
            <Col xl="5" lg="5" md="12">
	            <FormGroup>
	                <Label className="mb-0">Carrier Name2</Label>
                    <InputValid 
	                    type="text"
	                    //bsSize="sm"
	                    name="line_name1"
	                    id="line_name1"
	                    placeholder=""
	                    maxLength="35"
	                    value={lineData.line_name2?lineData.line_name2:''}
	                    onChange={(e)=>onHandleReturnVal(e, 'line_name2')}
	                    onBlur={onPropsReturn}
	                    validtype="text" 
	                    required={false}
	                />
                    {/*<Input type="text" name="line_name2" id="line_name2" placeholder=""
	                	value={lineData.line_name2} onChange = {(event)=>onHandleReturnVal(event,'line_name2')} onBlur={onPropsReturn}
	                	/>*/}
	            </FormGroup>
            </Col>    
            <Col xl="5" lg="5" md="12">
	        <FormGroup>
	            	<Label className="mb-0">Ocean Freight</Label>
	                <Input type="select" value={lineData.line_payment_type} onChange = {(event)=>onHandleSelectReturnVal(event,'line_payment_type')}
	                invalid={!bookmark&&!lineData.line_payment_type?true:false}
	                	>
			                <option value="">선택</option>
			                <option value="P">PREPAID</option>
				      		<option value="C">COLLECTED</option>
				         </Input>
	                <FormFeedback>{validation.REQ_MSG}</FormFeedback>	
	         </FormGroup>
	    </Col>
	    </Row>

	    <Row>
	        <Col xl="6" lg="6" md="6">
	            <FormGroup>
	                <Label className="mb-0">Address1</Label>
                    <InputValid 
	                    type="text"
	                    //bsSize="sm"
	                    name="line_address1"
	                    id="line_address1"
	                    placeholder=""
	                    maxLength="35"
	                    value={lineData.line_address1?lineData.line_address1:''}
	                    onChange={(e)=>onHandleReturnVal(e, 'line_address1')}
	                    onBlur={onPropsReturn}
	                    validtype="text" 
	                    required={type==="B"?false:true}
	                />
                    {/* <Input type="text" name="line_address1" id="line_address1" placeholder=""
	                	invalid={!bookmark&&!lineData.line_address1?true:false}
	                	value={lineData.line_address1}  maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'line_address1')} onBlur={onPropsReturn}
	                />
	                <FormFeedback>{validation.REQ_MSG}</FormFeedback>	*/}
	            </FormGroup>
	        </Col>
	        <Col xl="6" lg="6" md="6">
	            <FormGroup>
	                <Label className="mb-0">Address2</Label>
                    <InputValid 
	                    type="text"
	                    //bsSize="sm"
	                    name="line_address2"
	                    id="line_address2"
	                    placeholder=""
	                    maxLength="35"
	                    value={lineData.line_address2?lineData.line_address2:''}
	                    onChange={(e)=>onHandleReturnVal(e, 'line_address2')}
	                    onBlur={onPropsReturn}
	                    validtype="text" 
	                    required={false}
	                />
                    {/*<Input type="text" name="line_address2" id="line_address2" placeholder="" 
	                	value={lineData.line_address2}  maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'line_address2')} onBlur={onPropsReturn}	
	                />*/}
	            </FormGroup>
	        </Col>
	        <Col xl="6" lg="6" md="6">
	            <FormGroup>
	                <Label className="mb-0">Address3</Label>
                    <InputValid 
	                    type="text"
	                    //bsSize="sm"
	                    name="line_name1"
	                    id="line_name1"
	                    placeholder=""
	                    maxLength="35"
	                    value={lineData.line_address3?lineData.line_address3:''}
	                    onChange={(e)=>onHandleReturnVal(e, 'line_address3')}
	                    onBlur={onPropsReturn}
	                    validtype="text" 
	                    required={false}
	                />
                    {/*  <Input type="text" name="line_address3" id="line_address3" placeholder="" 
	                	value={lineData.line_address3}  maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'line_address3')} onBlur={onPropsReturn}	
	                />*/}
	            </FormGroup>
	        </Col>
	        <Col xl="6" lg="6" md="6">
	        <FormGroup>
	            <Label className="mb-0">Address4</Label>
                <InputValid 
	                type="text"
	                //bsSize="sm"
	                name="line_address4"
	                id="line_address4"
	                placeholder=""
	                maxLength="35"
	                value={lineData.line_address4?lineData.line_address4:''}
	                onChange={(e)=>onHandleReturnVal(e, 'line_address4')}
	                onBlur={onPropsReturn}
	                validtype="text" 
	                required={false}
	            />
                {/*<Input type="text" name="line_address4" id="line_address4" placeholder="" 
	            	value={lineData.line_address4}  maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'line_address4')} onBlur={onPropsReturn}	
	            />*/}
	        </FormGroup>
			    </Col>
			    <Col xl="6" lg="6" md="6">
			    <FormGroup>
			    <Label className="mb-0">Address5</Label>
                <InputValid 
	                type="text"
	                //bsSize="sm"
	                name="line_address5"
	                id="line_address5"
	                placeholder=""
	                maxLength="35"
	                value={lineData.line_address5?lineData.line_address5:''}
	                onChange={(e)=>onHandleReturnVal(e, 'line_address5')}
	                onBlur={onPropsReturn}
	                validtype="text" 
	                required={false}
	            />
			    {/*<Input type="text" name="line_address5" id="line_address5" placeholder="" 
			    	value={lineData.line_address5}  maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'line_address5')} onBlur={onPropsReturn}	
			    />*/}
			</FormGroup>
			</Col>
	    </Row>
    </>
    );
}

export default Carrier;