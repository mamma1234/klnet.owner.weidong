/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, CardBody, FormGroup,Table}
     from "reactstrap";
import Consignee from "./Consignee.js";
//import axios from 'axios';


const ConsigneeBookmark = (props) => {
	
  const {bookmark,loadData,validation} = props;	

  useEffect(() => {
	    setConsignee(loadData);
	  },[loadData]);
  
  // modal 창을 위한 state
  //const [coll, setColl] = useState(false);
  //const [open, setOpen] = useState(false);
  const [consignee, setConsignee] = useState({});
 
  
  const onPropsConsBookmark =(data) =>{
	  setConsignee(data);
	  props.onPropsConsBookmark(data);
  }
  
 // const onPropsConsDeleteBookmark =(data) =>{
//	  setConsignee({});
//	  props.onPropsConsDeleteBookmark(data);
 // }
  
  return (
    <>
        <Row>
        	<Col>BookMark List</Col>
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
	                                                <td className="p-2 bg-info">Consignee Name</td>
	                                            </tr>
	                                        </thead>
	                                        <tbody>
	                                        {bookmark.map((element,key)=>{
	                                            return(
	                                                <tr scope="row" key={key} onClick={()=>onPropsConsBookmark(element)}
													style={element.consignee_bookmark_seq===consignee.consignee_bookmark_seq?{backgroundColor:'aliceblue'}:{backgroundColor:''}}>
	                                                    <td className="p-2" >{key+1}</td>
	                                                    <td className="p-2" >{element.consignee_bookmark_name}</td>
	                                                    <td className="p-2" >{element.cons_user_name}</td>
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
            <Col>BookMark Input</Col>
       </Row>
       <hr className="m-2"/>
       <Consignee type={props.type} loadData={consignee} bookmark={bookmark} propsData={onPropsConsBookmark} validation={validation}/>
   </>
    );
}

export default ConsigneeBookmark;