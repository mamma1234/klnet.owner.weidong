/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect,useState } from 'react';
import { Row, Col, FormGroup,Label,Button} from "reactstrap";
import InputValid from "components/CustomInput/InputValid.js";

const Consignee = (props) => {
	
 const {loadData} = props;	
 const [consigneeData,setConsigneeData] = useState([]);
 
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
  
	const onCopyProps=()=>{
		var list = {c_cons_name1:loadData.cons_name1,c_cons_name2:loadData.cons_name2,c_cons_address1:loadData.cons_address1,
				    c_cons_address2:loadData.cons_address2,c_cons_address3:loadData.cons_address3,c_cons_address4:loadData.cons_address4,
				    c_cons_address5:loadData.cons_address5
				}
		props.mergeData(list);
		//props.onAlert("success","Consignee 데이터가 복사 되었습니다.");
	}
	
  return (
    <>
    <Row>
    <Col className="col-12 text-right pr-0 mr-1">
    <Button className="btn-link pr-0 pt-0 pb-0" color="default" type="button" size="sm" onClick={()=>onCopyProps()}>
     Copy Consignee
    </Button>
</Col> 
</Row>

		    <Row>
			    <Col xl="5" lg="5" md="12">
			        <FormGroup>
			            <Label className="mb-0">상호1</Label>
				            <InputValid 
				                type="text"
				                //bsSize="sm"
				                name="c_cons_name1"
				                id="c_cons_name1"
				                placeholder=""
				                maxLength="35"
				                value={consigneeData.c_cons_name1?consigneeData.c_cons_name1:''}
				                onChange={(e)=>onHandleReturnVal(e, 'c_cons_name1')}
				                onBlur={onPropsReturn}
				                validtype="text" 
				                required={true}
				            feedid="consignee2"
				            />
			        </FormGroup>
			    </Col>
			    <Col xl="5" lg="5" md="12">
			        <FormGroup>
			            <Label className="mb-0">상호2</Label>
				            <InputValid 
				                type="text"
				                //bsSize="sm"
				                name="c_cons_name2"
				                id="c_cons_name2"
				                placeholder=""
				                maxLength="35"
				                value={consigneeData.c_cons_name2?consigneeData.c_cons_name2:''}
				                onChange={(e)=>onHandleReturnVal(e, 'c_cons_name2')}
				                onBlur={onPropsReturn}
				                validtype="text" 
				                required={false}
				            feedid="consignee2"
				            />
			        </FormGroup>
			    </Col> 
			    <Col xl="6" lg="6" md="12">
				<FormGroup>
				    <Label className="mb-0">담당자이름</Label>
				    <InputValid 
				    type="text"
				    name="c_cons_user_name"
				    id="c_cons_user_name"
				    placeholder=""
				    maxLength="17"
				    value={consigneeData.c_cons_user_name?consigneeData.c_cons_user_name:''}
				    onChange={(e)=>onHandleReturnVal(e, 'c_cons_user_name')}
				    onBlur={onPropsReturn}
				    validtype="text" 
				    required={true}
				   feedid="consignee2"
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
			                //bsSize="sm"
			                name="c_cons_address1"
			                id="c_cons_address1"
			                placeholder=""
			                maxLength="35"
			                value={consigneeData.c_cons_address1?consigneeData.c_cons_address1:''}
			                onChange={(e)=>onHandleReturnVal(e, 'c_cons_address1')}
			                onBlur={onPropsReturn}
			                validtype="text" 
			                required={true}
	                    feedid="consignee2"
			            />
                    </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="6">
                <FormGroup>
                    <Label className="mb-0">주소2</Label>
                    <InputValid 
		                type="text"
		                //bsSize="sm"
		                name="c_cons_address2"
		                id="c_cons_address2"
		                placeholder=""
		                maxLength="35"
		                value={consigneeData.c_cons_address2?consigneeData.c_cons_address2:''}
		                onChange={(e)=>onHandleReturnVal(e, 'c_cons_address2')}
		                onBlur={onPropsReturn}
		                validtype="text" 
		                required={false}
                    feedid="consignee2"
		            />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="6">
	            <FormGroup>
	                <Label className="mb-0">주소3</Label>
	                <InputValid 
		                type="text"
		                //bsSize="sm"
		                name="c_cons_address3"
		                id="c_cons_address3"
		                placeholder=""
		                maxLength="35"
		                value={consigneeData.c_cons_address3?consigneeData.c_cons_address3:''}
		                onChange={(e)=>onHandleReturnVal(e, 'c_cons_address3')}
		                onBlur={onPropsReturn}
		                validtype="text" 
		                required={false}
	                feedid="consignee2"
		            />
	            </FormGroup>
	        </Col>
	        <Col xl="6" lg="6" md="6">
		        <FormGroup>
		            <Label className="mb-0">주소4</Label>
		            <InputValid 
		                type="text"
		                //bsSize="sm"
		                name="c_cons_address4"
		                id="c_cons_address4"
		                placeholder=""
		                maxLength="35"
		                value={consigneeData.c_cons_address4?consigneeData.c_cons_address4:''}
		                onChange={(e)=>onHandleReturnVal(e, 'c_cons_address4')}
		                onBlur={onPropsReturn}
		                validtype="text" 
		                required={false}
		            feedid="consignee2"
		            />
		        </FormGroup>
		    </Col>
		    <Col xl="6" lg="6" md="6">
		    <FormGroup>
		        <Label className="mb-0">주소5</Label>
		        <InputValid 
	                type="text"
	                //bsSize="sm"
	                name="c_cons_address5"
	                id="c_cons_address5"
	                placeholder=""
	                maxLength="35"
	                value={consigneeData.c_cons_address5?consigneeData.c_cons_address5:''}
	                onChange={(e)=>onHandleReturnVal(e, 'c_cons_address5')}
	                onBlur={onPropsReturn}
	                validtype="text" 
	                required={false}
		        feedid="consignee2"
	            />
		    </FormGroup>
		</Col>
        </Row>
			<Row>
			 
			<Col xl="6" lg="6" md="12">
				<FormGroup>
				    <Label className="mb-0">연락처</Label>
				    <InputValid 
				    type="text"
				    name="c_cons_user_tel"
				    id="c_cons_user_tel"
				    placeholder=""
				    maxLength="35"
				    value={consigneeData.c_cons_user_tel?consigneeData.c_cons_user_tel:''}
				    onChange={(e)=>onHandleReturnVal(e, 'c_cons_user_tel')}
				    onBlur={onPropsReturn}
				    validtype="text" 
				    required={true}
				   feedid="consignee2"
				/>
				</FormGroup>
			</Col> 
			<Col xl="6" lg="6" md="12">
				<FormGroup>
				    <Label className="mb-0">사업자코드</Label>
					    <InputValid 
						    type="text"
						    name="c_cons_code"
						    id="c_cons_code"
						    placeholder=""
						    maxLength="18"
						    value={consigneeData.c_cons_code?consigneeData.c_cons_code:''}
						    onChange={(e)=>onHandleReturnVal(e, 'c_cons_code')}
						    onBlur={onPropsReturn}
						    validtype="text" 
						    required={true}
						   feedid="consignee2"
						/>
				</FormGroup>
			</Col>
			<Col xl="6" lg="6" md="12">
				<FormGroup>
				    <Label className="mb-0">국가코드</Label>
					    <InputValid 
						    type="text"
						    name="c_cons_country_code"
						    id="c_cons_country_code"
						    placeholder=""
						    maxLength="2"
						    value={consigneeData.c_cons_country_code?consigneeData.c_cons_country_code:''}
						    onChange={(e)=>onHandleReturnVal(e, 'c_cons_country_code')}
						    onBlur={onPropsReturn}
						    validtype="text" 
						    required={true}
						   feedid="consignee2"
						/>
				</FormGroup>
			</Col>
		</Row>
        
        
    </>
    );
}

export default Consignee;