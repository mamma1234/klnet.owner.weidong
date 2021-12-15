/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect } from 'react';
import { Row, Col, FormGroup,Label,Button} from "reactstrap";
//import * as validation from 'components/common/validation.js';
import InputValid from "components/CustomInput/InputValid.js";

export default function Shipper(props) {

	const {loadFormData,type} = props;	
	const [shipperData,setShipperData] = React.useState([]);
 
	useEffect(() => {
		setShipperData(loadFormData);
	},[loadFormData]);


	const onHandleReturnVal = (event,name) => {
		// if(validation.getByte(event.target.value) < 36) {
		let list = {...shipperData, [name]:event.target.value.toUpperCase()};
		setShipperData(list);
		//  } else {
		//	  props.onAlert("error",validation.EXCD_MSG+"(35 Byte)");
		//  }
	}
  
	const onPropsReturn = ()=> {
		props.propsData(shipperData);
	}
	const onCopyProps=()=>{
		var list = {c_shp_name1:loadFormData.shp_name1,c_shp_name2:loadFormData.noti_name2,c_shp_address1:loadFormData.shp_address1,
				    c_shp_address2:loadFormData.shp_address2,c_shp_address3:loadFormData.shp_address3,c_shp_address4:loadFormData.shp_address4,
				    c_shp_address5:loadFormData.shp_address5}
		props.mergeData(list);
		//props.onAlert("success","Shipper 데이터가 복사 되었습니다.");
	}
  
  	return (
    	<>
			<Row>
				<Col className="col-12 text-right pr-4">
					<Button className="btn-link pr-0 pt-0 pb-0" color="default" type="button" size="sm" onClick={()=>onCopyProps()}>
					Copy Shipper
					</Button>
				</Col> 
			</Row>
        	<Row>
				<Col xl="5" lg="5" md="12">
					<FormGroup className="mb-2">
						<Label className="mb-0">상호1</Label>
						<InputValid 
							type="text"
							//bsSize="sm"
							name="c_shp_name1"
							id="c_shp_name1"
							maxLength="35"
							value={shipperData.c_shp_name1?shipperData.c_shp_name1:''}
							onChange={(e)=>onHandleReturnVal(e, 'c_shp_name1')}
							onBlur={onPropsReturn}
							validtype="text" 
							required={type==="B"?false:true}/>
					</FormGroup>
				</Col>
				<Col xl="5" lg="5" md="12">
					<FormGroup className="mb-2">
						<Label className="mb-0">상호2</Label>
						<InputValid 
							type="text"
							//bsSize="sm"
							name="c_shp_name2"
							id="c_shp_name2"
							maxLength="35"
							value={shipperData.c_shp_name2?shipperData.c_shp_name2:''}
							onChange={(e)=>onHandleReturnVal(e, 'c_shp_name2')}
							onBlur={onPropsReturn}
							validtype="text" 
							required={false}
							feedid="shipper2"/>
					</FormGroup>
				</Col>
				<Col xl="6" lg="6" md="6">
					<FormGroup className="mb-2">
						<Label className="mb-0">담당자이름</Label>
						<InputValid 
							type="text"
							//bsSize="sm"
							name="c_shp_user_name"
							id="c_shp_user_name"
							maxLength="17"
							value={shipperData.c_shp_user_name?shipperData.c_shp_user_name:''}
							onChange={(e)=>onHandleReturnVal(e, 'c_shp_user_name')}
							onBlur={onPropsReturn}
							validtype="text" 
							required={type==="B"?false:true}
							feedid="shipper2"/>
					</FormGroup>
				</Col>
	    	</Row>
			<Row>
				<Col xl="6" lg="6" md="6">
					<FormGroup className="mb-2">
						<Label className="mb-0">주소1</Label>
						<InputValid 
							type="text"
							//bsSize="sm"
							name="c_shp_address1"
							id="c_shp_address1"
							placeholder=""
							maxLength="35"
							value={shipperData.c_shp_address1?shipperData.c_shp_address1:''}
							onChange={(e)=>onHandleReturnVal(e, 'c_shp_address1')}
							onBlur={onPropsReturn}
							validtype="text" 
							required={type==="B"?false:true}
							feedid="shipper2"
						/>
					</FormGroup>
				</Col>
				<Col xl="6" lg="6" md="6">
					<FormGroup className="mb-2">
						<Label className="mb-0">주소2</Label>
						<InputValid 
							type="text"
							//bsSize="sm"
							name="c_shp_address2"
							id="c_shp_address2"
							maxLength="35"
							value={shipperData.c_shp_address2?shipperData.c_shp_address2:''}
							onChange={(e)=>onHandleReturnVal(e, 'c_shp_address2')}
							onBlur={onPropsReturn}
							validtype="text" 
							required={false}
							feedid="shipper2"/>
					</FormGroup>
				</Col>
				<Col xl="6" lg="6" md="6">
					<FormGroup>
						<Label className="mb-0">주소3</Label>
						<InputValid 
							type="text"
							//bsSize="sm"
							name="c_shp_address3"
							id="c_shp_address3"
							maxLength="35"
							value={shipperData.c_shp_address3?shipperData.c_shp_address3:''}
							onChange={(e)=>onHandleReturnVal(e, 'c_shp_address3')}
							onBlur={onPropsReturn}
							validtype="text" 
							required={false}
							feedid="shipper2"/>
					</FormGroup>
				</Col>
				<Col xl="6" lg="6" md="6">
					<FormGroup className="mb-2">
						<Label className="mb-0">주소4</Label>
						<InputValid 
							type="text"
							//bsSize="sm"
							name="c_shp_address4"
							id="c_shp_address4"
							maxLength="35"
							value={shipperData.c_shp_address4?shipperData.c_shp_address4:''}
							onChange={(e)=>onHandleReturnVal(e, 'c_shp_address4')}
							onBlur={onPropsReturn}
							validtype="text" 
							required={false}
							feedid="shipper2"/>
					</FormGroup>
				</Col>
				<Col xl="6" lg="6" md="6">
					<FormGroup className="mb-2">
						<Label className="mb-0">주소5</Label>
						<InputValid 
							type="text"
							//bsSize="sm"
							name="c_shp_address5"
							id="c_shp_address5"
							placeholder=""
							maxLength="35"
							value={shipperData.c_shp_address5?shipperData.c_shp_address5:''}
							onChange={(e)=>onHandleReturnVal(e, 'c_shp_address5')}
							onBlur={onPropsReturn}
							validtype="text" 
							required={false}
							feedid="shipper2"/>
					</FormGroup>
				</Col>
			</Row>
			<Row>
				<Col xl="6" lg="6" md="6">
					<FormGroup className="mb-2">
						<Label className="mb-0">연락처</Label>
						<InputValid 
							type="text"
							//bsSize="sm"
							name="c_shp_user_tel"
							id="c_shp_user_tel"
							maxLength="25"
							value={shipperData.c_shp_user_tel?shipperData.c_shp_user_tel:''}
							onChange={(e)=>onHandleReturnVal(e, 'c_shp_user_tel')}
							onBlur={onPropsReturn}
							validtype="text" 
							required={type==="B"?false:true}
							feedid="shipper2"/>
					</FormGroup>
				</Col>
				<Col xl="6" lg="6" md="6">
					<FormGroup className="mb-2">
						<Label className="mb-0">사업자코드</Label>
						<InputValid 
							type="text"
							//bsSize="sm"
							name="c_shp_code"
							id="c_shp_code"
							maxLength="18"
							value={shipperData.c_shp_code?shipperData.c_shp_code:''}
							onChange={(e)=>onHandleReturnVal(e, 'c_shp_code')}
							onBlur={onPropsReturn}
							validtype="text" 
							required={type==="B"?false:true}
							feedid="shipper2"/>
					</FormGroup>
				</Col>
				<Col xl="6" lg="6" md="6">
					<FormGroup className="mb-2">
						<Label className="mb-0">국가코드</Label>
						<InputValid 
							type="text"
							//bsSize="sm"
							name="c_shp_country_code"
							id="c_shp_country_code"
							maxLength="2"
							value={shipperData.c_shp_country_code?shipperData.c_shp_country_code:''}
							onChange={(e)=>onHandleReturnVal(e, 'c_shp_country_code')}
							onBlur={onPropsReturn}
							validtype="text" 
							required={type==="B"?false:true}
							feedid="shipper2"/>
					</FormGroup>
				</Col>
			</Row>
	   </>
    );
}