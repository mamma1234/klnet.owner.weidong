/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, CardBody, FormGroup, Table} from "reactstrap";
import Others from "./Others.js";
//import axios from 'axios';
//import Moment from 'moment';

const OthersBookmark = (props) => {
	const {bookmark,loadFormData,term} = props;
  useEffect(() => {
    setOthers(loadFormData);
  },[loadFormData]);

  // modal 창을 위한 state
  //const [coll, setColl] = useState(false);
  const [open, setOpen] = useState(false);
  const [others, setOthers] = useState({});
  
  const toggle = (params) => {
      (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
      setOpen(!open);
  }
  // 전체화면 css 적용을 위한 state
  const [clsNm, setClsNm] = useState("");
  
  const onPropsOtBookmark =(data) =>{
	  setOthers(data);
	  props.onPropsOtBookmark(data);
  }
  
  //const onBookMarkDelete =(data)=> {
//	  props.onPropsOtDeleteBookmark(data);
  //}
  
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
		                                                <td className="p-2 bg-info">SC Number</td>
		                                            </tr>
		                                        </thead>
		                                        <tbody>
		                                        {bookmark.map((element,key)=>{
		                                            return(
		                                                <tr scope="row" key={key} onClick={()=>onPropsOtBookmark(element)}
															style={element.other_bookmark_seq===others.other_bookmark_seq?{backgroundColor:'aliceblue'}:{backgroundColor:''}}>
		                                                    <td className="p-2">{key+1}</td>
		                                                    <td className="p-2">{element.other_bookmark_name}</td>
		                                                    <td className="p-2">{element.sc_no}</td>
		                                                </tr>
		                                            )
		                                        })}
		                                        </tbody>
		                                    </Table>
		                               </CardBody>
	                            </FormGroup>
	                        </Col>
	                    </Row>

	       <hr className="m-2"/>
	    	   <Others type="B" loadFormData={others} bookmark={bookmark} propsData={onPropsOtBookmark} onAlert={props.onAlert} term={term}/>
    </>
    );
}

export default OthersBookmark;