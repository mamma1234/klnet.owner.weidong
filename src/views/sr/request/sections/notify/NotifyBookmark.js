/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, CardBody, FormGroup,Table}
     from "reactstrap";
import Notify from "./Notify.js";


const NotifyBookmark = (props) => {
	
	const {bookmark,loadFormData,validation} = props;	

		useEffect(() => {
			setNotify(loadFormData);
		},[loadFormData]);

	// modal 창을 위한 state
	//const [coll, setColl] = useState(false);
	//const [open, setOpen] = useState(false);

	const [notify, setNotify] = useState({});

	
	const onPropsNtBookmark =(data) =>{
		setNotify(data);
		props.onPropsNtBookmark(data);
	}
	
	// const onPropsNtDeleteBookmark =(data) =>{
	//	  setNotify({});
	//	  props.onPropsNtDeleteBookmark(data);
	//  }
  
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
									<td className="p-2 bg-info">Notify Name</td>
								</tr>
							</thead>
							<tbody>
							{bookmark.map((element,key)=>{
								// console.log(cntrList, key, element)
								return(
									<tr scope="row" key={key} onClick={()=>onPropsNtBookmark(element)} style={element.notify_bookmark_seq===notify.notify_bookmark_seq?{backgroundColor:'aliceblue'}:{backgroundColor:''}}>
										<td className="p-2">{key+1}</td>
										<td className="p-2">{element.notify_bookmark_name}</td>
										<td className="p-2">{element.noti_user_name}</td>
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
       <Notify type={props.type} loadFormData={notify} bookmark={bookmark} propsData={onPropsNtBookmark} onAlert={props.onAlert}  validation={validation}/>
   </>
    );
}

export default NotifyBookmark;