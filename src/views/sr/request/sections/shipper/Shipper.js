/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect } from 'react';
import { Row,Col, FormGroup,Label} from "reactstrap";
//import * as validation from 'components/common/validation.js';
import InputValid from "components/CustomInput/InputValid.js";
//import Select from "react-select";
//import axios from 'axios';

const Shipper = (props) => {
 const {loadFormData,type} = props;	
 const [shipperData,setShipperData] = React.useState([]);
 
  useEffect(() => {
    setShipperData(loadFormData);
  },[loadFormData]);


  const onHandleReturnVal = (event,name) => {
    	  let list = {...shipperData, [name]:event.target.value.toUpperCase()};
    	  setShipperData(list);
  }
  
	  const onPropsReturn = ()=> {
		  props.propsData(shipperData);
	  }
  	
	/*const onSetShipperData = (e)=> { 

		var shp_name1,shp_name2 = '';
	    var address1,address2,address3,address4,address5 = '';
	
		if(props.validation.getByte(e.company_name) > 35) {
	  		 
	  		var data = e.company_name;
	  		var space = 0;
	  		var space_name = 1;
	  		
	  		
	  		for(var i=1;i<= data.length ; i++ ) {
	  			
	  	
	  			if(props.validation.getByte(data.substring(space,i)) <= 35) { 
	  				
	  			    if (space_name === 1) { 
	  			    	shp_name1 = data.substring(space,i);
	  			    } else {
	  			    	shp_name2 = data.substring(space,i);
	  			    }
	  			} else {
	  				space = i-1;
	  				space_name++;
	  			}
	  		}

	  	 } else {
	  		shp_name1 = e.company_name;
	  	 }

		
	  	 if(props.validation.getByte(e.address) > 35) {
	  		 
	  		var data = e.address;
	  		var space = 0;
	  		var space_address = 1;
	  		
	  		
	  		for(var i=1;i<= data.length ; i++ ) {
	  			
	  	
	  			if(props.validation.getByte(data.substring(space,i)) <= 35) { 
	  				
	  			    if (space_address === 1) { 
	  			    	address1 = data.substring(space,i);
	  			    } else if (space_address === 2) { 
	  			    	address2 = data.substring(space,i);
	  			    } else if (space_address === 3) { 
	  			    	address3 = data.substring(space,i);
	  			    } else if (space_address === 4) { 
	  			    	address4 = data.substring(space,i);
	  			    } else {
	  			    	address5 = data.substring(space,i);
	  			    }
	  			} else {
	  				space = i-1;
	  				space_address++;
	  			}
	  		}

	  	 } else {
	  		address1 = e.address;
	  	 }

	  	    setShipperData({...shipperData,'shp_code':e.company_id,'shp_name1':shp_name1,'shp_name2':shp_name2,'shp_address1':address1,'shp_address2':address2,'shp_address3':address3,'shp_address4':address4,'shp_address5':address5});
	  	    props.propsData({...shipperData,'shp_code':e.company_id,'shp_name1':shp_name1,'shp_name2':shp_name2,'shp_address1':address1,'shp_address2':address2,'shp_address3':address3,'shp_address4':address4,'shp_address5':address5});

	}*/
  
  return (
    <>
    {type==="B" || type==="C"?<Row>
	        <Col xl="6" lg="6" md="12">
		        <FormGroup className="mb-2">
		            <Label className="mb-0">BookMark Name</Label>
		            <InputValid 
		                type="text"
		                //bsSize="sm"
		                name="shipper_bookmark_name"
		                id="shipper_bookmark_name"
		                placeholder=""
		                maxLength="35"
		                value={shipperData.shipper_bookmark_name?shipperData.shipper_bookmark_name:''}
		                onChange={(e)=>onHandleReturnVal(e, 'shipper_bookmark_name')}
		                onBlur={onPropsReturn}
		                validtype="text" 
		                required={true}
		                feedid="shipper"
		            />
		           {/* <Input type="text" name="shp_bookmark_name" id="shp_bookmark_name" placeholder="" 
                	    invalid={!shipperData.shipper_bookmark_name?true:false}
		            	value={shipperData.shipper_bookmark_name} 
		            onChange = {(event)=>onHandleReturnVal(event,'shipper_bookmark_name')} 
		            onBlur={onPropsReturn}
		            	/>
		            <FormFeedback>{validation.REQ_MSG}</FormFeedback>*/}
		        </FormGroup>
	        </Col>
	     </Row>:<></>}
        {/*type !== "C"?<Row>
			<Col xl="12" lg="12" md="12">
		        <FormGroup>
		            <Label className="mb-0">Shipper</Label>
		            <Select
		                className="customSelect"
		                classNamePrefix="customSelect"
		                name="shp_code"
		                placeholder=""
		                value={{value:shipperData.shp_code?shipperData.shp_code:'',
		                        label:shipperData.shp_code?
		                            (props.shipperCompanyList.findIndex(x=>x.value===shipperData.shp_code)>=0)?
		                            		props.shipperCompanyList[props.shipperCompanyList.findIndex(x=>x.value===shipperData.shp_code)].label:
		                                '선택':
		                            '선택'
		                }}
		                onChange={(e) => onSetShipperData(e)}
		                options={props.shipperCompanyList}
		                styles={{
		                	control: provided => ({...provided,border:type!=="B"&&!shipperData.shp_code?'1px solid red':'',minHeight:'40px',height:'40px'}),
		                	indicatorsContainer: provided => ({...provided,height:'40px'})
		                }}
		                />
		        </FormGroup>
		    </Col></Row>:<></>*/}
        <Row>
		    <Col xl="5" lg="5" md="12">
	        <FormGroup className="mb-2">
	            <Label className="mb-0">Name1</Label>
	            <InputValid 
	                type="text"
	                //bsSize="sm"
	                name="shp_name1"
	                id="shp_name1"
	                placeholder=""
	                maxLength="35"
	                value={shipperData.shp_name1?shipperData.shp_name1:''}
	                onChange={(e)=>onHandleReturnVal(e, 'shp_name1')}
	                onBlur={onPropsReturn}
	                validtype="text" 
	                required={type==="B"?false:true}
	            feedid="shipper"
	            />  
	        </FormGroup>
	    </Col>
	    <Col xl="5" lg="5" md="12">
	        <FormGroup className="mb-2">
	            <Label className="mb-0">Name2</Label>
	            <InputValid 
	                type="text"
	                //bsSize="sm"
	                name="shp_name2"
	                id="shp_name2"
	                placeholder=""
	                maxLength="35"
	                value={shipperData.shp_name2?shipperData.shp_name2:''}
	                onChange={(e)=>onHandleReturnVal(e, 'shp_name2')}
	                onBlur={onPropsReturn}
	                validtype="text" 
	                required={false}
	            feedid="shipper"
	            />
	
	        </FormGroup>
	    </Col>
        <Col xl="6" lg="6" md="6">
            <FormGroup className="mb-2">
                <Label className="mb-0">Address1</Label>
                <InputValid 
	                type="text"
	                //bsSize="sm"
	                name="shp_address1"
	                id="shp_address1"
	                placeholder=""
	                maxLength="35"
	                value={shipperData.shp_address1?shipperData.shp_address1:''}
	                onChange={(e)=>onHandleReturnVal(e, 'shp_address1')}
	                onBlur={onPropsReturn}
	                validtype="text" 
	                required={type==="B"?false:true}
                feedid="shipper"
	            />	                
            </FormGroup>
        </Col>
        <Col xl="6" lg="6" md="6">
            <FormGroup className="mb-2">
                <Label className="mb-0">Address2</Label>
                <InputValid 
	                type="text"
	                //bsSize="sm"
	                name="shp_address2"
	                id="shp_address2"
	                placeholder=""
	                maxLength="35"
	                value={shipperData.shp_address2?shipperData.shp_address2:''}
	                onChange={(e)=>onHandleReturnVal(e, 'shp_address2')}
	                onBlur={onPropsReturn}
	                validtype="text" 
	                required={false}
                feedid="shipper"
	            />
            </FormGroup>
        </Col>
        <Col xl="6" lg="6" md="6">
            <FormGroup>
                <Label className="mb-0">Address3</Label>
                <InputValid 
	                type="text"
	                //bsSize="sm"
	                name="shp_address3"
	                id="shp_address3"
	                placeholder=""
	                maxLength="35"
	                value={shipperData.shp_address3?shipperData.shp_address3:''}
	                onChange={(e)=>onHandleReturnVal(e, 'shp_address3')}
	                onBlur={onPropsReturn}
	                validtype="text" 
	                required={false}
	            />
            </FormGroup>
        </Col>
        <Col xl="6" lg="6" md="6">
        <FormGroup className="mb-2">
            <Label className="mb-0">Address4</Label>
            <InputValid 
                type="text"
                //bsSize="sm"
                name="shp_address4"
                id="shp_address4"
                placeholder=""
                maxLength="35"
                value={shipperData.shp_address4?shipperData.shp_address4:''}
                onChange={(e)=>onHandleReturnVal(e, 'shp_address4')}
                onBlur={onPropsReturn}
                validtype="text" 
                required={false}
            feedid="shipper"
            />
        </FormGroup>
		    </Col>
		    <Col xl="6" lg="6" md="6">
		    <FormGroup className="mb-2">
		    <Label className="mb-0">Address5</Label>
		    <InputValid 
                type="text"
                //bsSize="sm"
                name="shp_address5"
                id="shp_address5"
                placeholder=""
                maxLength="35"
                value={shipperData.shp_address5?shipperData.shp_address5:''}
                onChange={(e)=>onHandleReturnVal(e, 'shp_address5')}
                onBlur={onPropsReturn}
                validtype="text" 
                required={false}
		    feedid="shipper"
            />
		</FormGroup>
		</Col>
      </Row>
      {type === "C"?
  		    <Row>
  				<Col xl="6" lg="6" md="6">
  					    <FormGroup className="mb-2">
  					    <Label className="mb-0">담당자명</Label>
  					    <InputValid 
  			                type="text"
  			                //bsSize="sm"
  			                name="shp_user_name"
  			                id="shp_user_name"
  			                placeholder=""
  			                maxLength="17"
  			                value={shipperData.shp_user_name?shipperData.shp_user_name:''}
  			                onChange={(e)=>onHandleReturnVal(e, 'shp_user_name')}
  			                onBlur={onPropsReturn}
  			                validtype="text" 
  			                required={false}
  					        feedid="shipper"
  			            />
  					  </FormGroup>
  					</Col>
  					<Col xl="6" lg="6" md="6">
  				    <FormGroup className="mb-2">
  				    <Label className="mb-0">연락처</Label>
  				    <InputValid 
  		                type="text"
  		                //bsSize="sm"
  		                name="shp_user_tel"
  		                id="shp_user_tel"
  		                placeholder=""
  		                maxLength="35"
  		                value={shipperData.shp_user_tel?shipperData.shp_user_tel:''}
  		                onChange={(e)=>onHandleReturnVal(e, 'shp_user_tel')}
  		                onBlur={onPropsReturn}
  		                validtype="text" 
  		                required={false}
  				        feedid="shipper"
  		            />
  				</FormGroup>
  				</Col>
  				<Col xl="6" lg="6" md="6">
  				    <FormGroup className="mb-2">
  				    <Label className="mb-0">사업자코드</Label>
  				    <InputValid 
  			            type="text"
  			            //bsSize="sm"
  			            name="shp_code"
  			            id="shp_code"
  			            placeholder=""
  			            maxLength="18"
  			            value={shipperData.shp_code?shipperData.shp_code:''}
  			            onChange={(e)=>onHandleReturnVal(e, 'shp_code')}
  			            onBlur={onPropsReturn}
  			            validtype="text" 
  			            required={false}
  				        feedid="shipper"
  			        />
  				</FormGroup>
  				</Col>
  				<Col xl="6" lg="6" md="6">
  				    <FormGroup className="mb-2">
  				    <Label className="mb-0">국가코드</Label>
  				    <InputValid 
  			            type="text"
  			            //bsSize="sm"
  			            name="shp_country_code"
  			            id="shp_country_code"
  			            placeholder=""
  			            maxLength="2"
  			            value={shipperData.shp_country_code?shipperData.shp_country_code:''}
  			            onChange={(e)=>onHandleReturnVal(e, 'shp_country_code')}
  			            onBlur={onPropsReturn}
  			            validtype="text" 
  			            required={false}
  				        feedid="shipper"
  			        />
  				</FormGroup>
  				</Col>
  				</Row>:<></>}
    </>
    );
}

export default Shipper;