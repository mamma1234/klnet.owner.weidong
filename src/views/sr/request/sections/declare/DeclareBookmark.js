/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, CardBody, FormGroup,Label,Input, Table
	,InputGroupAddon,InputGroupText,InputGroup}
     from "reactstrap";
//import Declare from "./Declare.js";
//import { ExcelRenderer } from "react-excel-renderer";
//import Moment from 'moment';
//import ReactDatetime from "react-datetime";
import InputValid from "components/CustomInput/InputValid.js";
const DeclareBookmark = (props) => {
	
  const {bookmark,loadFormData,pack} = props;	

	useEffect(() => {
		setBookmarkList(loadFormData); 
	  },[loadFormData]);

  // modal 창을 위한 state
  //const [coll, setColl] = useState(false);
  //const [open, setOpen] = useState(false);
  //const [declare, setDeclare] = useState([]);

  const [bookmarkList, setBookmarkList] = useState({});

  
const onHandleReturnVal = (event,name) => {
	  
	  let list = {...bookmarkList, [name]:event.target.value};
	  setBookmarkList(list);  
  }

const onChangeDecReturnVal = (event,name) => {
	  
	  let list = {...bookmarkList, [name]:event.target.value};
	  setBookmarkList(list);
	  props.propsData(list);	  
}

/*const onHandleReturnDate = (date) => {
	  let list = {...bookmarkList, 'declare_customs_date':Moment(date).format('YYYYMMDD')};
	  setBookmarkList(list); 
	  props.propsData(list);
}*/
const onPropsReturn = ()=> {
	  props.propsData(bookmarkList);
  }

  const onPropsbookmarkList =(data) =>{
	  setBookmarkList(data);
	  props.propsData(data);
  }
  
//  const onPropsDeclarebookmarkDelete =(data) =>{
//	  setBookmarkList({}); 
//	 props.onPropsDeclarebookmarkDelete(data);
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
	                                                <td className="p-2 bg-info">Declare Num</td>
	                                            </tr>
	                                        </thead>
	                                        <tbody>
	                                        {bookmark.map((element,key)=>{
	                                            // console.log(declare, key, element)
	                                            return(
	                                                <tr scope="row" key={key} onClick={()=>onPropsbookmarkList(element)}
													style={element.declare_bookmark_seq===bookmarkList.declare_bookmark_seq?{backgroundColor:'aliceblue'}:{backgroundColor:''}} >
	                                                    <td className="p-2">{key+1}</td>
	                                                    <td className="p-2">{element.declare_bookmark_name}</td>
	                                                    <td className="p-2">{element.declare_num}</td>
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
	                name="declare_bookmark_name"
	                id="declare_bookmark_name"
	                placeholder=""
	                maxLength="35"
	                value={bookmarkList.declare_bookmark_name?bookmarkList.declare_bookmark_name:''}
	                onChange={(e)=>onHandleReturnVal(e, 'declare_bookmark_name')}
	                onBlur={onPropsReturn}
	                validtype="text"
	                required={true} 
	                feedid="declare"
	            />
	       </FormGroup>		
       	</Col>
       	{	/* <Col xl="3" lg="3" md="12">
			<FormGroup>
		 	<Label className="mb-0">수출면장번호</Label>
	    	<InputValid 
	            type="text"
	            name="declare_num"
	            id="declare_num"
	            placeholder=""
	            maxLength="35"
	            value={bookmarkList.declare_num?bookmarkList.declare_num:''}
	            onChange={(e)=>onHandleReturnVal(e, 'declare_num')}
	            onBlur={onPropsReturn}
	            validtype="text"
	            required={false} 
	            feedid="declare"
	        />
		 <Input type="text" name="declare_num" id="declare_num" placeholder=""  value={bookmarkList.declare_num?bookmarkList.declare_num:''}
		 	    onChange = {(event)=>onHandleReturnVal(event,'declare_num')}
		      onBlur={onPropsReturn}
		 	/>
		 </FormGroup>		
		</Col>*/}
        <Col xl="3" lg="3" md="12">
		<FormGroup>
		    <Label className="mb-0">포장유형,개수</Label>
		    <Row>
		    	<Col className="col-8 pr-1">
			    	<Input type="select" value={bookmarkList.declare_pack_type} onChange = {(event)=>onHandleReturnVal(event,'declare_pack_type')}
			    	 //invalid={!view&&!bookmarkList.cargo_pack_type?true:false}
			        >
			      		<option value="">선택</option>
			      		{pack.length>0?pack.map((data,key) => 
						  	<option key ={key} value={data.cargo_pack_type}>{data.cargo_pack_type_desc+" ["+data.cargo_pack_type+"]"}</option>):
							  <></>}
			          </Input>
			  
		    	</Col>
		    	<Col className="col-4 pl-1">
		      	<InputValid 
		            type="text"
		            name="declare_pack_num"
		            id="declare_pack_num"
		            placeholder=""
		            maxLength="8"
		            value={bookmarkList.declare_pack_num?bookmarkList.declare_pack_num:''}
		            onChange={(e)=>onHandleReturnVal(e, 'declare_pack_num')}
		            onBlur={onPropsReturn}
		            validtype="number"
		            required={false} 
		            feedid="declare"
		        />
			    {/*	<Input type="text" name="declare_pack_num" id="declare_pack_num" placeholder="" value={bookmarkList.declare_pack_num?bookmarkList.declare_pack_num:''}
				    onChange = {(event)=>onHandleReturnVal(event,'declare_pack_num')} onBlur={onPropsReturn} //invalid={!view&&!bookmarkList.declare_pack_num?true:false}
			    	/>
*/	}				    
		    	</Col>
		    </Row>
		</FormGroup>
</Col>
<Col xl="2" lg="2" md="12">
<FormGroup>
	<Label className="mb-0">중량</Label>
	<InputGroup >
	<Input type="text" name="declare_weight" id="declare_weight" placeholder="" maxLength="18"
		value={bookmarkList.declare_weight?bookmarkList.declare_weight:''}
		onChange = {(event)=>onHandleReturnVal(event,'declare_weight')}  onBlur={onPropsReturn}
		/>
		<InputGroupAddon addonType="append">
        <InputGroupText className="p-1">kg</InputGroupText>
      </InputGroupAddon>
		</InputGroup>
</FormGroup>		
</Col>
       <Col xl="2" lg="2" md="12">
			<FormGroup>
	        	<Label className="mb-0">분할선적여부</Label>
	        	<Input type="select" 
		          value={bookmarkList.declare_div_load_yn?bookmarkList.declare_div_load_yn:'N'}
	              onChange={(event)=>onChangeDecReturnVal(event,'declare_div_load_yn')}
		        >
		      		{/* <option value="">선택</option> */}
		      		<option value="N">N</option>
		      		<option value="Y">Y</option>
		          </Input>
	        </FormGroup>		
       </Col>
		  <Col xl="2" lg="2" md="12">
			<FormGroup>
			 	<Label className="mb-0">분할선적차수</Label>
			   	<InputValid 
		            type="text"
		            name="declare_div_load_no"
		            id="declare_div_load_no"
		            placeholder=""
		            maxLength="2"
		            value={bookmarkList.declare_div_load_no?bookmarkList.declare_div_load_no:''}
		            onChange={(e)=>onHandleReturnVal(e, 'declare_div_load_no')}
		            onBlur={onPropsReturn}
		            validtype="number"
		            required={false} 
		            feedid="declare"
		        />
			 	{/*<Input type="text" name="declare_div_load_no" id="declare_div_load_no" placeholder=""  value={bookmarkList.declare_div_load_no?bookmarkList.declare_div_load_no:''}
			 	    onChange = {(event)=>onHandleReturnVal(event,'declare_div_load_no')} maxLength="2"
			      onBlur={onPropsReturn}
			 	/>
*/}			 </FormGroup>		
			</Col>
       <Col xl="2" lg="2" md="12">
			<FormGroup>
		       	<Label className="mb-0">동시포장코드</Label>
		       	<InputValid 
	                type="text"
	                name="declare_pack_set_code"
	                id="declare_pack_set_code"
	                placeholder=""
	                maxLength="1"
	                value={bookmarkList.declare_pack_set_code?bookmarkList.declare_pack_set_code:''}
	                onChange={(e)=>onHandleReturnVal(e, 'declare_pack_set_code')}
	                onBlur={onPropsReturn}
	                validtype="english"
	                required={false} 
	                feedid="declare"
	            />
		       {/*	<Input type="text" name="declare_pack_set_code" id="declare_pack_set_code" placeholder=""  value={bookmarkList.declare_pack_set_code?bookmarkList.declare_pack_set_code:''}
		 	    onChange = {(event)=>onHandleReturnVal(event,'declare_pack_set_code')} maxLength="1"
		      onBlur={onPropsReturn}/>*/}
		 	
	        </FormGroup>		
       </Col>    
       <Col xl="3" lg="3" md="12">
		<FormGroup>
		    <Label className="mb-0">동시포장유형,개수</Label>
		    <Row>
		    	<Col className="col-8 pr-1">
			    	<Input type="select" value={bookmarkList.declare_pack_set_type?bookmarkList.declare_pack_set_type:''} onChange = {(event)=>onHandleReturnVal(event,'declare_pack_set_type')}
			    	 //invalid={!view&&!bookmarkList.cargo_pack_type?true:false}
			        >
			      		<option value="">선택</option>
			      		{pack.length>0?pack.map((data,key) => <option value={data.cargo_pack_type}>{data.cargo_pack_type_desc+" ["+data.cargo_pack_type+"]"}</option>):<></>}
			          </Input>
			 
		    	</Col>
		    	<Col className="col-4 pl-1">
		      	<InputValid 
		            type="text"
		            name="declare_pack_set_num"
		            id="declare_pack_set_num"
		            placeholder=""
		            maxLength="8"
		            value={bookmarkList.declare_pack_set_num?bookmarkList.declare_pack_set_num:''}
		            onChange={(e)=>onHandleReturnVal(e, 'declare_pack_set_num')}
		            onBlur={onPropsReturn}
		            validtype="number"
		            required={false} 
		            feedid="declare"
		        />
			    {/*	<Input type="text" name="declare_pack_set_num" id="declare_pack_set_num" placeholder="" value={bookmarkList.declare_pack_set_num?bookmarkList.declare_pack_set_num:''}
				    onChange = {(event)=>onHandleReturnVal(event,'declare_pack_set_num')} onBlur={onPropsReturn} //invalid={!view&&!bookmarkList.declare_pack_set_num?true:false}
			    	/>
*/}			    	
		    	</Col>
		    </Row>
		</FormGroup>
	</Col>
      
			
	   {/* <Col xl="2" lg="2" md="12">
			<FormGroup>
	       	<Label className="mb-0">중량</Label>
	       	<InputGroup >
	       	<Input type="text" name="declare_weight" id="declare_weight" placeholder="" maxLength="18"
	       		value={bookmarkList.declare_weight?bookmarkList.declare_weight:''}
	       		onChange = {(event)=>onHandleReturnVal(event,'declare_weight')}  onBlur={onPropsReturn}
	       		/>
	       		<InputGroupAddon addonType="append">
                    <InputGroupText className="p-1">kg</InputGroupText>
                  </InputGroupAddon>
	       		</InputGroup>
	      	<Input type="text" name="declare_weight" id="declare_weight" placeholder="" value={bookmarkList.declare_weight?bookmarkList.declare_weight:''} 
	       	  onChange = {(event)=>onHandleReturnVal(event,'declare_weight')}
	             onBlur={onPropsReturn}
	       		/>
	       </FormGroup>		
	  </Col>
	  
	<Col xl="3" lg="3" className="col-12">
	    <FormGroup>
	        <Label className="mb-0">통관일자</Label>
	        <InputGroup className="date" id="etd">
	            <ReactDatetime
	                inputProps={{
	                className: "form-control",
	                placeholder: "Customs Date",
	                }}
	                dateFormat="YYYY-MM-DD"
	                timeFormat={false}
	                closeOnSelect={true}
	                 value={bookmarkList.declare_customs_date?Moment(bookmarkList.declare_customs_date).format('YYYY-MM-DD'):Moment(new Date()).format('YYYY-MM-DD')}
	                 onChange={date=>onHandleReturnDate(date)}
	            />
	            <InputGroupAddon addonType="append">
	                <InputGroupText>
	                    <span className="glyphicon glyphicon-calendar">
	                    <i className="fa fa-calendar" />
	                    </span>
	                </InputGroupText>
	            </InputGroupAddon>
	        </InputGroup>
	    </FormGroup>
	</Col>
	<Col xl="5" lg="5" md="12">
		<FormGroup>
		 	<Label className="mb-0">품명</Label>
	      	<InputValid 
	            type="text"
	            name="declare_goods_desc"
	            id="declare_goods_desc"
	            placeholder=""
	            maxLength="35"
	            value={bookmarkList.declare_goods_desc?bookmarkList.declare_goods_desc:''}
	            onChange={(e)=>onHandleReturnVal(e, 'declare_goods_desc')}
	            onBlur={onPropsReturn}
	            validtype="text"
	            required={false} 
	            feedid="declare"
	        />
		 	<Input type="text" name="declare_goods_desc" id="declare_goods_desc" placeholder=""  value={bookmarkList.declare_goods_desc?bookmarkList.declare_goods_desc:''}
		 	    onChange = {(event)=>onHandleReturnVal(event,'declare_goods_desc')}
		      onBlur={onPropsReturn}
		 	/>
	 </FormGroup>		
	</Col>*/}	
	</Row>
   </>
    );
}

export default DeclareBookmark;