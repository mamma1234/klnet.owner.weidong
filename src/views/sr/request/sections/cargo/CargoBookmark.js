/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState,useEffect } from 'react';
import { Row,Col, CardBody, FormGroup, Table,
    TabContent, TabPane, Nav, NavItem, NavLink,Label } from "reactstrap";
import Cargo from "./Cargo.js";
import GoodsArea from "./GoodsArea.js";
import MarkArea from "./MarkArea.js";
import axios from 'axios';
//import HsCode from './HsCodePopup.js';
import InputValid from "components/CustomInput/InputValid.js";

const CargoBookmark = (props) => {

	const {bookmark,bookmarkProps,bookmark2,bookmark3,pack} =props;

	// modal 창을 위한 state
	// const [coll, setColl] = useState(false);
	//const [open, setOpen] = useState(false);

	//const [activeTab, setActiveTab] = useState('1');
	const [hTabs, setHTabs] = useState("1");
	
	/*const clickTab = (tab) => {
		if(activeTab !== tab ) setActiveTab(tab);
	}
	
	const toggle = (params) => {
		setOpen(!open);
	}*/
	// const [forwarder, setForwarder] = useState({});

	// 전체화면 css 적용을 위한 state
	// const [clsNm, setClsNm] = useState("");
	
	//const [openAlert, setOpenAlert] = useState(false);
	//const [status, setStatus] = React.useState("");
	//const [message, setMessage] = React.useState("");

	const [cargo,setCargo] = useState({});
	const [mark,setMark] = useState({});
	const [goods,setGoods] = useState({});
	
	useEffect(() => {
		setCargo(bookmarkProps); 
		setMark(bookmarkProps);
		setGoods(bookmarkProps);
	},[bookmarkProps]);

	
	const onHandleSetTap = (data) => {
		if(data === "1") {
			setCargo(bookmarkProps);
		} else if(data === "2") {
			setMark({}); 
		} else {
			setGoods({});
		}
		
		setHTabs(data);
		props.onChangeTap(data);
	}
	
	const onClickSelected = (tap,data) => { 

		if(tap === "1") {

			axios.post("/shipper/getUserCargoRelation",{user_no:props.user?props.user.user_no:'',seq:data.cargo_bookmark_seq},{}).then(res => { 
				const mergeData = Object.assign(data,res.data);
				setCargo(mergeData);
				props.onPropsCargoBookmark(tap,mergeData);
			});
		} else if( tap === "2") {
			setMark(data);
			props.onPropsCargoBookmark(tap,data);
		} else {
			setGoods(data);
			props.onPropsCargoBookmark(tap,data);
		} 
	}
  
  	const onHandleReturnVal = (event,name) => { 
		if (hTabs === "2") {
			let list = {...mark, [name]:event.target.value.toUpperCase()};
			setMark(list);
		} else {
			let list = {...goods, [name]:event.target.value.toUpperCase()};
			setGoods(list);
		}
  	}
  
  	const onPropsCargoBookmark =(data) =>{ 
		if( hTabs === "1") {
			setCargo(data);
		  	props.onPropsCargoBookmark(hTabs,data); 
	  	} else if (hTabs === "2") {
		  	props.onPropsCargoBookmark(hTabs,mark); 
	  	} else if (hTabs ==="3") {
		  	props.onPropsCargoBookmark(hTabs,goods); 
	  	} else {
		  	console.log("error");
	  	}
	}
  
	/*const onPropsCargoDeleteBookmark =(data) =>{	 
		props.onPropsCargoDeleteBookmark(data);
	}
  
	const onPropsMarkDeleteBookmark =(data) =>{	 
		props.onPropsMarkDeleteBookmark(data);
	}
	
	const onPropsGoodsDeleteBookmark =(data) =>{	 
		props.onPropsGoodsDeleteBookmark(data);
	}
	*/
  	//21.05.06 변경
	const onDataGoodsMerge =(data) => { 
		let list = {...goods, ...data};
		setGoods(list);
		props.onPropsCargoBookmark("3",list);
	}
	const onDataMarkMerge =(data) => {  
		let list = {...mark, ...data};
		setMark(list);
		props.onPropsCargoBookmark("2",list);
	}
  
  	return (
    	<>
	    	<div className="nav-tabs-navigation text-left mb-3">
		    	<div className="nav-tabs-wrapper">
		      		<Nav id="tabs" role="tablist" tabs>
		        		<NavItem>
							<NavLink
								className={hTabs === "1" ? "active" : ""}
								onClick={() => onHandleSetTap("1")}>
		            			Cargo
		          			</NavLink>
		        		</NavItem>
		        		<NavItem>
							<NavLink
								className={hTabs === "2" ? "active" : ""}
								onClick={() => onHandleSetTap("2")}>
									Mark
							</NavLink>
						</NavItem>
		        		<NavItem>
							<NavLink
								className={hTabs === "3" ? "active" : ""}
								onClick={() => onHandleSetTap("3")}>
									Goods
							</NavLink>
		        		</NavItem>
		      		</Nav>
		    	</div>
		  	</div>
		  	<TabContent activeTab={"hTabs" + hTabs}>
	          	<TabPane tabId="hTabs1">
		          	<Row className="m-0">
	              		<Col>Cargo BookMark List</Col>
	              	</Row>
			      	<Row className="m-0">
			          	<Col xl="12" lg="12" md="12" className="p-0">
			              	<FormGroup style={{height:'150px',overflow:'auto'}} className="mb-0">
			                	<CardBody className="bg-white p-0">
									<Table className="mb-0" responsive hover size="sm">
										<thead>
											<tr>
												<td className="p-2 bg-info">No.</td>
												<td className="p-2 bg-info">Bookmark Name</td>
												<td className="p-2 bg-info">MARK</td>
												<td className="p-2 bg-info">GOODS</td>
											</tr>
										</thead>
										<tbody>
										{(bookmark.length > 0 ) && bookmark.map((data,key) =>
											<tr key={key} onClick={()=>onClickSelected("1",data)} style={data.cargo_bookmark_seq===cargo.cargo_bookmark_seq?{backgroundColor:'aliceblue'}:{backgroundColor:''}}>
												<td className="p-1">{key+1}</td>
												<td className="p-1">{data.cargo_bookmark_name}</td>
												<td className="p-1">{data.mark_yn}</td>
												<td className="p-1">{data.goods_yn}</td>
											</tr>
										)}
			                            </tbody>
									</Table>
								</CardBody>
			              	</FormGroup>
			          	</Col>
			      	</Row>
			      	<hr/>
			      	<Cargo cargoProps={cargo} view={true} relation={false} propsData={onPropsCargoBookmark} pack={pack} {...props}/> 
				</TabPane>
	          	<TabPane tabId="hTabs2">
					<Row className="m-0">
	              		<Col>Marks BookMark List</Col>
		          	</Row>
		          	{/* <CardBody className="pt-2 pb-2 bg-white"> */}
		          	<Row className="m-0">
		              	<Col xl="12" lg="12" md="12">
							<FormGroup style={{height:'150px',overflow:'auto'}} className="mb-0">
								<CardBody className="bg-white p-0">
									<Table className="mb-0" responsive size="sm">
										<thead>
											<tr>
												<td className="p-2 bg-info">No.</td>
												<td className="p-2 bg-info">Bookmark Name</td>
											</tr>
										</thead>
										<tbody>
										{(bookmark2.length > 0 ) && bookmark2.map((data,key) =>
											<tr key={key} onClick={()=>onClickSelected("2",data)} style={data.cargo_mark_bookmark_seq===mark.cargo_mark_bookmark_seq?{backgroundColor:'aliceblue'}:{backgroundColor:''}}>
												<td className="p-1" >{key+1}</td>
												<td className="p-1" >{data.cargo_mark_bookmark_name}</td>
											</tr>
										)}
										</tbody>
									</Table>
								</CardBody>
		                  	</FormGroup>
		              	</Col>
		          	</Row>
		          	<hr/>
			        <Row>
					    <Col xl="5" lg="5" md="12">
							<FormGroup>
								<Label className="mb-0">Bookmark Name</Label>
									{/*					        
									<Input type="text" name="cargo_mark_bookmark_name" id="cargo_mark_bookmark_name" placeholder=""  className="mb-1"
									invalid={!mark.cargo_mark_bookmark_name?true:false}
									value={mark.cargo_mark_bookmark_name?mark.cargo_mark_bookmark_name:''} 
									onChange = {(event)=>onHandleReturnVal(event,'cargo_mark_bookmark_name')} onBlur={onPropsCargoBookmark}
									/>*/}
								<InputValid 
									type="text"
									name="cargo_mark_bookmark_name"
									id="cargo_mark_bookmark_name"
									maxLength="35"
									//bsSize={size}
									value={mark.cargo_mark_bookmark_name?mark.cargo_mark_bookmark_name:''}
									onChange={(e)=>onHandleReturnVal(e, 'cargo_mark_bookmark_name')}
									onBlur={onPropsCargoBookmark}
									validtype="text"
									required={true} 
									feedid="cargo"/>
								</FormGroup>
					    </Col>
							{/*<Col xl="12" lg="12" md="12">
								<FormGroup>
									<Label className="mb-0">Description 1</Label>
									<InputValid 
										type="text"
										name="mark_desc1"
										id="mark_desc1"
										placeholder=""
										maxLength="35"
										//bsSize={size}
										value={mark.mark_desc1?mark.mark_desc1:''}
										onChange={(e)=>onHandleReturnVal(e, 'mark_desc1')}
										onBlur={onPropsCargoBookmark}
										validtype="text"
										required={false} 
										feedid="cargo"
									/>
									{<Input type="text" name="mark_desc1" id="mark_desc1" placeholder=""  className="mb-1" rows={1} value={} 
									onChange = {(event)=>onHandleReturnVal(event,'mark_desc1')} onBlur={onPropsCargoBookmark}/>}
									</FormGroup>
							</Col>
							<Col xl="12" lg="12" md="12"><FormGroup>
									<Label className="mb-0">Description 2</Label>
									<InputValid 
										type="text"
										name="mark_desc2"
										id="mark_desc2"
										placeholder=""
										maxLength="35"
										//bsSize={size}
										value={mark.mark_desc2?mark.mark_desc2:''}
										onChange={(e)=>onHandleReturnVal(e, 'mark_desc2')}
										onBlur={onPropsCargoBookmark}
										validtype="text"
										required={false} 
										feedid="cargo"
									/>
								{ <Input type="text" name="mark_desc2" id="mark_desc2" placeholder=""  className="mb-1" rows={1} value={mark.mark_desc2?mark.mark_desc2:''} 
									onChange = {(event)=>onHandleReturnVal(event,'mark_desc2')} onBlur={onPropsCargoBookmark}/>}</FormGroup>
							</Col>
							<Col xl="12" lg="12" md="12"><FormGroup>
									<Label className="mb-0">Description 3</Label>
									<InputValid 
										type="text"
										name="mark_desc3"
										id="mark_desc3"
										placeholder=""
										maxLength="35"
										//bsSize={size}
										value={mark.mark_desc3?mark.mark_desc3:''}
										onChange={(e)=>onHandleReturnVal(e, 'mark_desc3')}
										onBlur={onPropsCargoBookmark}
										validtype="text"
										required={false} 
										feedid="cargo"
									/>
									{<Input type="text" name="mark_desc3" id="mark_desc3" placeholder=""  className="mb-1" rows={1} value={mark.mark_desc3?mark.mark_desc3:''} 
									onChange = {(event)=>onHandleReturnVal(event,'mark_desc3')} onBlur={onPropsCargoBookmark}/>}</FormGroup>
							</Col>
							<Col xl="12" lg="12" md="12"><FormGroup>
									<Label className="mb-0">Description 4</Label>
									<InputValid 
										type="text"
										name="mark_desc4"
										id="mark_desc4"
										placeholder=""
										maxLength="35"
										//bsSize={size}
										value={mark.mark_desc4?mark.mark_desc4:''}
										onChange={(e)=>onHandleReturnVal(e, 'mark_desc4')}
										onBlur={onPropsCargoBookmark}
										validtype="text"
										required={false} 
										feedid="cargo"
									/>
									{<Input type="text" name="mark_desc4" id="mark_desc4" placeholder=""  className="mb-1" rows={1} value={mark.mark_desc4?mark.mark_desc4:''} 
									onChange = {(event)=>onHandleReturnVal(event,'mark_desc4')} onBlur={onPropsCargoBookmark}/>}</FormGroup>
							</Col>
							<Col xl="12" lg="12" md="12"><FormGroup>
									<Label className="mb-0">Description 5</Label>
									<InputValid 
										type="text"
										name="mark_desc5"
										id="mark_desc5"
										placeholder=""
										maxLength="35"
										//bsSize={size}
										value={mark.mark_desc5?mark.mark_desc5:''}
										onChange={(e)=>onHandleReturnVal(e, 'mark_desc5')}
										onBlur={onPropsCargoBookmark}
										validtype="text"
										required={false} 
										feedid="cargo"
									/>
									{<Input type="text" name="mark_desc5" id="mark_desc5" placeholder=""  className="mb-1" rows={1} value={mark.mark_desc5?mark.mark_desc5:''} 
									onChange = {(event)=>onHandleReturnVal(event,'mark_desc5')} onBlur={onPropsCargoBookmark}/>}
											</FormGroup>
							</Col>		*/}
						<Col xl="12" lg="12" md="12">
							<Label className="mb-0">Mark&No</Label>
							<MarkArea view={false} //bookmark={bookmark3}
								propsMarkData={(data)=>onDataMarkMerge(data)}   mark={mark}
								relation={true}
								{...props} />
						</Col>
					</Row>
				</TabPane>
				<TabPane tabId="hTabs3">
					<Row className="m-0">
						<Col>Goods BookMark List</Col>
					</Row>
					{/* <CardBody className="pt-2 pb-2 bg-white"> */}
					<Row className="m-0">
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
										{(bookmark3.length > 0 ) && bookmark3.map((data,key) =>
											<tr key={key} onClick={()=>onClickSelected("3",data)} style={data.cargo_goods_bookmark_seq===goods.cargo_goods_bookmark_seq?{backgroundColor:'aliceblue'}:{backgroundColor:''}}>
												<td className="p-1" >{key+1}</td>
												<td className="p-1" >{data.cargo_goods_bookmark_name}</td>
											</tr>
										)}
										</tbody>
									</Table>
								</CardBody>
							</FormGroup>
						</Col>
					</Row>
					<hr/>
					<Row>
						<Col xl="5" lg="5" md="12">
							<Label className="mb-0">Bookmark Name</Label>
							<InputValid 
								type="text"
								name="cargo_goods_bookmark_name"
								id="cargo_goods_bookmark_name"
								maxLength="35"
								//bsSize={size}
								value={goods.cargo_goods_bookmark_name?goods.cargo_goods_bookmark_name:''}
								onChange={(e)=>onHandleReturnVal(e, 'cargo_goods_bookmark_name')}
								onBlur={onPropsCargoBookmark}
								validtype="text"
								required={true} 
								feedid="cargo"
							/>
							{/* <Input type="text" name="cargo_goods_bookmark_name" id="cargo_goods_bookmark_name" placeholder=""  className="mb-1" value={goods.cargo_goods_bookmark_name} 
								onChange = {(event)=>onHandleReturnVal(event,'cargo_goods_bookmark_name')} onBlur={onPropsCargoBookmark} 
								invalid={!goods.cargo_goods_bookmark_name?true:false}
								/>*/}
						</Col>
					{/*	<Col xl="12" lg="12" md="12">
							<Label className="mb-0">Description 1</Label>
							<Input type="text" name="goods_desc1" id="goods_desc1" placeholder=""  className="mb-1" value={goods.goods_desc1?goods.goods_desc1:''} 
							onChange = {(event)=>onHandleReturnVal(event,'goods_desc1')} onBlur={onPropsCargoBookmark}/>
						</Col>
						<Col xl="12" lg="12" md="12">
								<Label className="mb-0">Description 2</Label>
								<Input type="text" name="goods_desc2" id="goods_desc2" placeholder=""  className="mb-1" value={goods.goods_desc2?goods.goods_desc2:''} 
								onChange = {(event)=>onHandleReturnVal(event,'goods_desc2')} onBlur={onPropsCargoBookmark}/>
						</Col>
						<Col xl="12" lg="12" md="12">
								<Label className="mb-0">Description 3</Label>
								<Input type="text" name="goods_desc3" id="goods_desc3" placeholder=""  className="mb-1" value={goods.goods_desc3?goods.goods_desc3:''} 
								onChange = {(event)=>onHandleReturnVal(event,'goods_desc3')} onBlur={onPropsCargoBookmark}/>
						</Col>
						<Col xl="12" lg="12" md="12">
								<Label className="mb-0">Description 4</Label>
								<Input type="text" name="goods_desc4" id="goods_desc4" placeholder=""  className="mb-1" value={goods.goods_desc4?goods.goods_desc4:''} 
								onChange = {(event)=>onHandleReturnVal(event,'goods_desc4')} onBlur={onPropsCargoBookmark}/>
						</Col>
						<Col xl="12" lg="12" md="12">
								<Label className="mb-0">Description 5</Label>
								<Input type="text" name="goods_desc5" id="goods_desc5" placeholder=""  className="mb-1" value={goods.goods_desc5?goods.goods_desc5:''} 
								onChange = {(event)=>onHandleReturnVal(event,'goods_desc5')} onBlur={onPropsCargoBookmark}/>
						</Col>*/}
						<Col xl="12" lg="12" md="12">
							<Label className="mb-0">Description</Label>
							<GoodsArea 
								view={true} 
								//bookmark={bookmark3}
								propsGoodsData={(data)=>onDataGoodsMerge(data)} relation={true}  goods={goods} {...props} />
						</Col>
					</Row> 
				</TabPane>
			</TabContent>
    		</>
    	);
}

export default CargoBookmark;