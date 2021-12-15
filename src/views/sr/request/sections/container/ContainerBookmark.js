/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect, useState} from 'react';
import { Row,Col, CardBody, Button,FormGroup,Label,Input, Card, Table,UncontrolledTooltip,
	Badge,InputGroupText,InputGroupAddon,InputGroup}
     from "reactstrap";
//import Container from "./Container.js";
//import { ExcelRenderer } from "react-excel-renderer";
import InputValid from "components/CustomInput/InputValid.js";

const ContainerBookmark = (props) => {

/*	useEffect(() => {
	    //console.log("ContainerbookmarkList 렌더링 될 때마다 수행",pack);
	   // setCntrList([{'cntr_seq':0}]);
	  },[loadData]);*/

  // modal 창을 위한 state
  //const [coll, setColl] = useState(false);
  //const [open, setOpen] = useState(false);
  //const [cntrList, setCntrList] = useState([]);

  	const {bookmark,code,pack,init} = props;
	useEffect(() => {
		setBookmarkList({'container_bookmark_name':''})
	},[init])


	  

  	const [bookmarkList, setBookmarkList] = useState({'container_bookmark_name':''});

  
	const onHandleReturnVal = (event,name) => {
		
		let list = {...bookmarkList, [name]:event.target.value};
		setBookmarkList(list);  
	}

	const onHandleReturnValHan = (event,name) => {
		// if(!props.validation.validationHangle(event.target.value.toUpperCase())) {
		let list = {...bookmarkList, [name]:event.target.value.toUpperCase()};
		setBookmarkList(list);	
		// }
	}

	const onChangeCntrReturnVal = (event,name) => {
		
		let list = {...bookmarkList, [name]:event.target.value};
		setBookmarkList(list);
		props.propsData(list);	  
	}

	const onPropsReturn = ()=> {
		props.propsData(bookmarkList);
	}

	const onPropsbookmarkList =(data) =>{
		setBookmarkList(data);
		props.propsData(data);
	}
	
 //const onPropsCntrbookmarkDelete =(data) =>{
//	 setBookmarkList({});
//	 props.onPropsCntrbookmarkDelete(data);
 // }

  return (
    <>
        <Row>
        	<Col>bookmarkList List</Col>
        </Row>
        <Row className="mb-3">
			<Col xl="12" lg="12" md="12">
				<FormGroup style={{height:'150px',overflow:'auto'}} className="mb-0">
					<CardBody className="bg-white p-0">
						<Table className="mb-0" responsive hover size="sm">
							<thead>
								<tr>
									<td className="p-2 bg-info">No.</td>
									<td className="p-2 bg-info">Bookmark Name</td>
								</tr>
							</thead>
							<tbody>
							{bookmark.map((element,key)=>{
								// console.log(cntrList, key, element)
								return(
									<tr scope="row" key={key} onClick={()=>onPropsbookmarkList(element)}
										style={element.container_bookmark_seq===bookmarkList.container_bookmark_seq?{backgroundColor:'aliceblue'}:{backgroundColor:''}}>
										<td className="p-2">{key+1}</td>
										<td className="p-2">{element.container_bookmark_name}</td>
									</tr>
								)
							})}
							</tbody>
						</Table>
					</CardBody>
				</FormGroup>
			</Col>
		</Row>  
       	<Row>
            <Col>bookmarkList Input</Col>
       	</Row>
       	<hr className="m-2"/>
		<Row>
       		<Col xl="3" lg="3" md="12">
				<FormGroup>
					<Label className="mb-0">Bookmark Name</Label>
					<InputValid 
						type="text"
						name="cntr_seal"
						id="cntr_seal"
						placeholder=""
						maxLength="50"
						//bsSize={size}
						value={bookmarkList.container_bookmark_name?bookmarkList.container_bookmark_name:''}
						onChange={(event)=>onHandleReturnValHan(event,'container_bookmark_name')}
						onBlur={onPropsReturn}
						validtype="text"
						required={false} 
						feedid="container"/>
				</FormGroup>		
			</Col>
			<Col xl="2" lg="2" md="12">
				<FormGroup>
					<Label className="mb-0">Seal No</Label>
					<InputValid 
				        type="text"
				        name="cntr_seal"
				        id="cntr_seal"
				        placeholder=""
				        maxLength="30"
				        //bsSize={size}
				        value={bookmarkList.cntr_seal?bookmarkList.cntr_seal:''}
				        onChange={(event)=>onHandleReturnValHan(event,'cntr_seal')}
				        onBlur={onPropsReturn}
				        validtype="text"
				        required={false} 
				        feedid="container"
				    />
				</FormGroup>		
			</Col>
			<Col xl="3" lg="3" md="12">
				<FormGroup>
					<Label className="mb-0">Size/Type</Label>
					<Input 
						type="select" 
						value={bookmarkList.cntr_code?bookmarkList.cntr_code:''}
						onChange={(event)=>onChangeCntrReturnVal(event,'cntr_code')}>
						<option value="">선택</option>
						{(code.length > 0 ) && code.map((data,key)=>
							<option key={key} value={data.cntr_code}>{data.cntr_code_name}</option>
						)}
					</Input>
				</FormGroup>		
			</Col>
			<Col xl="2" lg="2" md="12">
				<FormGroup>
					<Label className="mb-0">Weight</Label>
					<InputValid 
				        type="text"
				        name="cntr_weight"
				        id="cntr_weight"
				        maxLength="8"
				        //bsSize={size}
				        value={bookmarkList.cntr_weight?bookmarkList.cntr_weight:''}
				        onChange={(event)=>onHandleReturnValHan(event,'cntr_weight')}
				        onBlur={onPropsReturn}
				        validtype="number"
				        required={false}
				        feedid="container"/>
				       </FormGroup>
				  </Col>
				<Col xl="2" lg="2" md="6" className="col-6">
					<FormGroup>
						<Label className="mb-0">Volume</Label>
						<InputValid 
					        type="text"
					        name="cntr_total_volume"
					        id="cntr_total_volume"
					        placeholder=""
					        maxLength="18"
					        //bsSize={size}
					        value={bookmarkList.cntr_total_volume?bookmarkList.cntr_total_volume:''}
					        onChange={(event)=>onHandleReturnValHan(event,'cntr_total_volume')}
					        onBlur={onPropsReturn}
					        validtype="number"
					        required={false} 
					        feedid="container"
					    />
				
					</FormGroup>
				</Col>
				    <Col xl="4" className="col-12">
						<FormGroup>
				            	<Label className="mb-0">Package</Label>
								    <Row>
								    	<Col className="col-8 pr-1">
									    	<Input type="select" className="pt-0 pb-0" value={bookmarkList.cntr_carton_code?bookmarkList.cntr_carton_code:''} 
									    	onChange = {(event)=>onChangeCntrReturnVal(event,'cntr_carton_code')}
									    	//invalid={(!cntr.cntr_carton_qty || !cntr.cntr_carton_qty)?true:false} 
									    	>
									      		<option value="">선택</option>
									      		{pack.length>0?pack.map((data,key) => 
									      			<option key={key} value={data.cargo_pack_type}>{data.cargo_pack_type_desc+" ["+data.cargo_pack_type+"]"}</option>):<></>}
									          </Input>
									          
								    	</Col>
								    	<Col className="col-4 pl-1">
									      	<InputValid 
						                        type="text"
						                        name="cntr_carton_qty"
						                        id="cntr_carton_qty"
						                        placeholder=""
						                        maxLength="18"
						                        value={bookmarkList.cntr_carton_qty?bookmarkList.cntr_carton_qty:''}
						                        onChange={(e)=>onHandleReturnVal(e, 'cntr_carton_qty')}
						                        onBlur={onPropsReturn}
						                        validtype="number"
						                        required={false} 
						                        feedid="container"
						                    />
								    	</Col>
								    </Row>
						</FormGroup>
					</Col>
					<Col>
					    <Row>
							<Col xl="1"><Badge className="mr-1" color="default" pill>VGM</Badge></Col>
							<Col>
								<Row>
									<Col xl="3">
										<FormGroup>
						    				<Label className="mb-0">Verifying Type</Label>
						    				<Input type="select" className="pt-0 pb-0" value={bookmarkList.cntr_verifying_type ?bookmarkList.cntr_verifying_type :''} 
									    	onChange = {(event)=>onChangeCntrReturnVal(event,'cntr_verifying_type')}>
									      		<option value="">선택</option>
									      		<option value="SM1">방법1</option>
									      		<option value="SM2">방법2</option>
									          </Input>
						        		</FormGroup>
						            </Col>
									<Col xl="3">
										<FormGroup>
						    				<Label className="mb-0">BkgNo</Label>
						        				<InputValid 
						                            type="text"
						                            name="cntr_res_bkg_no"
						                            id="cntr_res_bkg_no"
						                            placeholder=""
						                            maxLength="35"
						                            value={bookmarkList.cntr_res_bkg_no?bookmarkList.cntr_res_bkg_no:''}
						                            onChange={(e)=>onHandleReturnVal(e, 'cntr_res_bkg_no')}
						                            onBlur={onPropsReturn}
						                            validtype="text"
						                            required={false} 
						                            feedid="container"
						                        />
						        		</FormGroup>
						            </Col>
						            <Col xl="3">
						                <FormGroup>
										<Label className="mb-0">PIC Name</Label>
						        				<InputValid 
						                            type="text"
						                            name="cntr_auth_user_name"
						                            id="cntr_auth_user_name"
						                            placeholder=""
						                            maxLength="35"
						                            value={bookmarkList.cntr_auth_user_name?bookmarkList.cntr_auth_user_name:''}
						                            onChange={(e)=>onHandleReturnVal(e, 'cntr_auth_user_name')}
						                            onBlur={onPropsReturn}
						                            validtype="text"
						                            required={false} 
						                            feedid="container"
						                        />
						                </FormGroup>
						            </Col>
						            <Col xl="3" className="col-3">
							            <FormGroup>
										<Label className="mb-0">TotalWeight</Label>
							    				<InputGroup >
								   	        	<Input type="number" name="cntr_total_weight" id="cntr_total_weight" placeholder="" 
								   	        		value={bookmarkList.cntr_total_weight?bookmarkList.cntr_total_weight:''}
													 onChange = {(event)=>onHandleReturnValHan(event,'cntr_total_weight')}
												     onBlur={onPropsReturn}  
								   	        	      maxLength="18"/>
												    	  <InputGroupAddon addonType="append">
							                            <InputGroupText className="p-1">kg</InputGroupText>
							                          </InputGroupAddon>
								   	        	  </InputGroup>
							            </FormGroup>
							        </Col>
						        </Row>
						    </Col>
					    </Row>
			    </Col>
	 {/*<Col xl="2" lg="2" md="2" className="col-6 pr-2">
			<FormGroup>
	        	<Label className="mb-0">BkgNo</Label>
	        	<Input type="text" name="cntr_res_bkg_no" id="cntr_res_bkg_no" placeholder="" value={bookmarkList.cntr_res_bkg_no?bookmarkList.cntr_res_bkg_no:''}
	        	onChange = {(event)=>onHandleReturnValHan(event,'cntr_res_bkg_no')}
	            onBlur={onPropsReturn}
	        	/>
	    	</FormGroup>	
		</Col>*/}

	</Row>
   </>
    );
}

export default ContainerBookmark;