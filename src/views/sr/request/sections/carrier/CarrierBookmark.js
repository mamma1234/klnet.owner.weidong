/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, CardBody, Button,FormGroup,Card, Table,UncontrolledTooltip}
     from "reactstrap";
import Carrier from "./Carrier.js";
//import axios from 'axios';


const CarrierBookmark = (props) => {
	
  const {bookmark,loadFormData,validation} = props;
  
  useEffect(() => {
	  setCarrier(loadFormData);
	  },[loadFormData]);

  // modal 창을 위한 state
  const [coll, setColl] = useState(false);
  const [open, setOpen] = useState(false);
  const [carrier, setCarrier] = useState({});
  
  
  const onPropsLineBookmark =(data) =>{
	  setCarrier(data);
	  props.onPropsLineBookmark(data);
  }
  
  const onPropsLineDeleteBookmark =(data) =>{
	 
	  props.onPropsLineDeleteBookmark(data);
  }
  
  return (
    <>
        <Row>
        	<Col>BookMark List</Col>
        </Row>
        <Row className="mb-3">
                        <Col xl="12" lg="12" md="12">
                            <FormGroup style={{height:'150px',overflow:'auto'}} className="mb-0">
                            	<Card className="card-raised card-form-horizontal no-transition mb-0">
                            		<CardBody className="bg-white p-0">
	                                    <Table className="mb-0" responsive hover size="sm">
	                                        <thead>
	                                            <tr>
	                                                <td className="p-2 bg-info">No.</td>
	                                                <td className="p-2 bg-info">Bookmark Name</td>
	                                                <td className="p-2 bg-info">Carrier Name</td>
	                                                <td className="p-2 bg-info">Action</td>
	                                            </tr>
	                                        </thead>
	                                        <tbody>
	                                        {bookmark.map((element,key)=>{
	                                            // console.log(cntrList, key, element)
	                                            return(
	                                                <tr scope="row" key={key} onClick={()=>{onPropsLineBookmark(element)}}>
	                                                    <td className="p-2">{key+1}</td>
	                                                    <td className="p-2">{element.line_bookmark_name}</td>
	                                                    <td className="p-2">{element.line_name1}</td>
	                                                    <td className="td-actions p-1">
				                                        <Button
				                                          className="btn-link"
				                                          color="danger"
				                                          data-toggle="tooltip"
				                                          id={"remove"+key}
				                                          size="sm"
				                                          type="button"
				                                          style={{marginBottom:'0'}}
				                                          onClick={()=>{onPropsLineDeleteBookmark(element)}}
				                                        >
				                                          <i className="fa fa-times" />
				                                        </Button>
				                                        <UncontrolledTooltip
				                                          delay={0}
				                                          placement="top"
				                                          target={"remove"+key}
				                                        >
				                                          Remove
				                                        </UncontrolledTooltip>
				                                      </td>
	                                                </tr>
	                                            )
	                                        })}
	                                        </tbody>
	                                    </Table>
	                               </CardBody>
                                </Card>
                            </FormGroup>
                        </Col>
                    </Row>
                    
       <Row>
            <Col>BookMark Input</Col>
       </Row>
       <hr className="m-2"/>
       <Carrier type="B" loadFormData={carrier} bookmark={bookmark} propsData={onPropsLineBookmark} onAlert={props.onAlert} validation={validation}/>
   </>
    );
}

export default CarrierBookmark;