/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect } from 'react';
import { Row, Col, FormGroup,Label,Button} from "reactstrap";
//import * as validation from 'components/common/validation.js';
import InputValid from "components/CustomInput/InputValid.js";

const Notify = (props) => {
	
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
		    var list = {...notifyData,'c_noti_name1':'SAME AS CONSIGNEE'};
		    setNotifyData(list);
		    props.propsData(list);
		}
	}
	const onCopyProps=()=>{
		var list = {c_noti_name1:loadFormData.noti_name1,c_noti_name2:loadFormData.noti_name2,c_noti_address1:loadFormData.noti_address1,
				    c_noti_address2:loadFormData.noti_address2,c_noti_address3:loadFormData.noti_address3,c_noti_address4:loadFormData.noti_address4,
				    c_noti_address5:loadFormData.noti_address5}
		props.mergeData(list);
		//props.onAlert("success","Notify 데이터가 복사 되었습니다.");
	}
  
  return (
    <>
        <Col className="col-12 text-right pr-0">
            {/* <Button className="btn-link pr-0 pt-0 pb-0 pr-1" color="info" type="button" size="sm" onClick={onCopyData}>
            same as consignee
            </Button> */}
            <Button color="default" type="button" className="btn-link pr-0 pt-0 pb-0" onClick={()=>onCopyProps()}
          	>Copy Notify</Button>
        </Col> 
    <Row>
    <Col xl="5" lg="5" md="12">
        <FormGroup>
            <Label className="mb-0">상호1</Label>
	            <InputValid 
		            type="text"
		           // bsSize="sm"
		            name="c_noti_name1"
		            id="c_noti_name1"
		            placeholder=""
		            maxLength="35"
		            value={notifyData.c_noti_name1?notifyData.c_noti_name1:''}
		            onChange={(e)=>onHandleReturnVal(e, 'c_noti_name1')}
		            onBlur={onPropsReturn}
		            validtype="text" 
		            required={type==="B"?false:false}
	            	feedid="notify2"
		        />
        </FormGroup>
    </Col>
    <Col xl="5" lg="5" md="12">
        <FormGroup>
            <Label className="mb-0">상호2</Label>
	            <InputValid 
		            type="text"
		            name="c_noti_name2"
		            id="c_noti_name2"
		            placeholder=""
		            maxLength="35"
		            value={notifyData.c_noti_name2?notifyData.c_noti_name2:''}
		            onChange={(e)=>onHandleReturnVal(e, 'c_noti_name2')}
		            onBlur={onPropsReturn}
		            validtype="text" 
		            required={false}
	            feedid="notify2"
		        />
        </FormGroup>
    </Col>   
    <Col xl="6" lg="6" md="12">
	<FormGroup>
	    <Label className="mb-0">담당자이름</Label>
	    <InputValid 
	    type="text"
	    name="c_noti_user_name"
	    id="c_noti_user_name"
	    placeholder=""
	    maxLength="17"
	    value={notifyData.c_noti_user_name?notifyData.c_noti_user_name:''}
	    onChange={(e)=>onHandleReturnVal(e, 'c_noti_user_name')}
	    onBlur={onPropsReturn}
	    validtype="text" 
	    required={false}
	   feedid="notify2"
	/>
	</FormGroup>
</Col>    
</Row>
<Row>
<Col xl="6" lg="6" md="6">
    <FormGroup>
        <Label className="mb-0">주소1</Label>
        <InputValid 
            type="text"
           // bsSize="sm"
            name="c_noti_address1"
            id="c_noti_address1"
            placeholder=""
            maxLength="35"
            value={notifyData.c_noti_address1?notifyData.c_noti_address1:''}
            onChange={(e)=>onHandleReturnVal(e, 'c_noti_address1')}
            onBlur={onPropsReturn}
            validtype="text" 
            required={type==="B"?false:false}
        />
        </FormGroup>
</Col>
<Col xl="6" lg="6" md="6">
    <FormGroup>
        <Label className="mb-0">주소2</Label>
            <InputValid 
	            type="text"
	           // bsSize="sm"
	            name="c_noti_address2"
	            id="c_noti_address2"
	            placeholder=""
	            maxLength="35"
	            value={notifyData.c_noti_address2?notifyData.c_noti_address2:''}
	            onChange={(e)=>onHandleReturnVal(e, 'c_noti_address2')}
	            onBlur={onPropsReturn}
	            validtype="text" 
	            required={false}
	        />
    </FormGroup>
</Col>
<Col xl="6" lg="6" md="6">
    <FormGroup>
        <Label className="mb-0">주소3</Label>
            <InputValid 
	            type="text"
	           // bsSize="sm"
	            name="c_noti_address3"
	            id="c_noti_address3"
	            placeholder=""
	            maxLength="35"
	            value={notifyData.c_noti_address3?notifyData.c_noti_address3:''}
	            onChange={(e)=>onHandleReturnVal(e, 'c_noti_address3')}
	            onBlur={onPropsReturn}
	            validtype="text" 
	            required={false}
	        />
    </FormGroup>
</Col>
<Col xl="6" lg="6" md="6">
    <FormGroup>
        <Label className="mb-0">주소4</Label>
            <InputValid 
	            type="text"
	           // bsSize="sm"
	            name="c_noti_address4"
	            id="c_noti_address4"
	            placeholder=""
	            maxLength="35"
	            value={notifyData.c_noti_address4?notifyData.c_noti_address4:''}
	            onChange={(e)=>onHandleReturnVal(e, 'c_noti_address4')}
	            onBlur={onPropsReturn}
	            validtype="text" 
	            required={false}
	        />
       {/* <Input type="text" name="c_noti_address4" id="c_noti_address4" placeholder="" 
        	value={notifyData.c_noti_address4} maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'c_noti_address4')} onBlur={onPropsReturn}	
        />*/}
    </FormGroup>
</Col>
<Col xl="6" lg="6" md="6">
<FormGroup>
    <Label className="mb-0">주소5</Label>
    <InputValid 
        type="text"
       // bsSize="sm"
        name="c_noti_address5"
        id="c_noti_address5"
        placeholder=""
        maxLength="35"
        value={notifyData.c_noti_address5?notifyData.c_noti_address5:''}
        onChange={(e)=>onHandleReturnVal(e, 'c_noti_address5')}
        onBlur={onPropsReturn}
        validtype="text" 
        required={false}
    />
    {/*<Input type="text" name="c_noti_address5" id="c_noti_address5" placeholder="" 
    	value={notifyData.c_noti_address5} maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'c_noti_address5')} onBlur={onPropsReturn}	
    />*/}
</FormGroup>
</Col>
</Row>
<Row>
	    
	<Col xl="6" lg="6" md="12">
		<FormGroup>
		    <Label className="mb-0">연락처</Label>
		    <InputValid 
		    type="text"
		    name="c_noti_user_tel"
		    id="c_noti_user_tel"
		    placeholder=""
		    maxLength="35"
		    value={notifyData.c_noti_user_tel?notifyData.c_noti_user_tel:''}
		    onChange={(e)=>onHandleReturnVal(e, 'c_noti_user_tel')}
		    onBlur={onPropsReturn}
		    validtype="text" 
		    required={false}
		   feedid="notify2"
		/>
		</FormGroup>
	</Col> 
	<Col xl="6" lg="6" md="12">
		<FormGroup>
		    <Label className="mb-0">사업자코드</Label>
			    <InputValid 
				    type="text"
				    name="c_noti_code"
				    id="c_noti_code"
				    placeholder=""
				    maxLength="18"
				    value={notifyData.c_noti_code?notifyData.c_noti_code:''}
				    onChange={(e)=>onHandleReturnVal(e, 'c_noti_code')}
				    onBlur={onPropsReturn}
				    validtype="text" 
				    required={false}
				   feedid="notify2"
				/>
		</FormGroup>
	</Col>
	<Col xl="6" lg="6" md="12">
		<FormGroup>
		    <Label className="mb-0">국가코드</Label>
			    <InputValid 
				    type="text"
				    name="c_noti_country_code"
				    id="c_noti_country_code"
				    placeholder=""
				    maxLength="2"
				    value={notifyData.c_noti_country_code?notifyData.c_noti_country_code:''}
				    onChange={(e)=>onHandleReturnVal(e, 'c_noti_country_code')}
				    onBlur={onPropsReturn}
				    validtype="text" 
				    required={false}
				   feedid="notify2"
				/>
		</FormGroup>
	</Col>
</Row>
        
    </>
    );
}

export default Notify;