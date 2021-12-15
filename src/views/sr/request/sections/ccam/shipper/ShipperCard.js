/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
     Button,FormGroup,Label, Card,UncontrolledTooltip} from "reactstrap";
import Select from "react-select";
import ShipperBookmark from '../../shipper/ShipperBookmark.js';
import Shipper from './Shipper.js';
import axios from 'axios';
import InputValid from "components/CustomInput/InputValid.js";
let shipperData = {};

const ShipperCard = React.forwardRef((props,cShipperFocus) => {

	const {bookmark,loadData,openWindow,validation} = props;

	// Collapse Flag
	const [coll, setColl] = useState(false);
	const [bookmarkView, setBookmarkView] = useState(false);
	// modal 창을 위한 state
	const [open, setOpen] = useState(false);
	//const [openAlert, setOpenAlert] = useState(false);

	//const [message, setMessage] = React.useState("");
	//const [nestedModal, setNestedModal] = useState(false);
	//const [closeAll, setCloseAll] = useState(false);
	const [shipper, setShipper] = useState([]);
	const [propsData, setPropsData] = useState([]);
	const [modalTitle, setModalTitle] = useState("Shipper Info");
	
  
	useEffect(() => {
		setShipper(loadData);
		},[loadData]);
	
	useEffect(() => { 
		setColl(openWindow);
		},[openWindow]);
	
	const toggle = (params) => {
		
		if(params==='B') {
			setModalTitle("Shipper BookMark");
			props.onLoadData("sh"); 
			setPropsData({...propsData,'shipper_bookmark_seq':'','shipper_bookmark_name':'',shp_code:shipper.c_shp_code,shp_name1:shipper.c_shp_name1,
							shp_name2:shipper.c_shp_name2,shp_address1:shipper.c_shp_address1,shp_address2:shipper.c_shp_address2,
							shp_address3:shipper.c_shp_address3,shp_address4:shipper.c_shp_address4,shp_address5:shipper.c_shp_address5,
							shp_user_name:shipper.c_shp_user_name,shp_user_tel:shipper.c_shp_user_tel,shp_country_code:shipper.c_shp_country_code,
							});
			shipperData=loadData;
			setBookmarkView(true);
		} else {
			setModalTitle("Shipper Info");
			setPropsData(loadData);
			shipperData=loadData;
			setBookmarkView(false);
		}
		setOpen(!open);
	}
  
    // 자식의 Data 적용
	const onBookMarkData = (data) => {
		shipperData = data;
		
	}
	
	const onApplyData = ()=> {
		
		//if(shipperValidation(shipperData)) {
			setOpen(!open);
			setShipper(shipperData);
			props.mergeData(shipperData);
			setColl(true);	
			//props.setWindow(true);
		//}	
	}

	
	const onSaveBookmark =()=> {

		
		if(shipperData.shipper_bookmark_name !==null && shipperData.shipper_bookmark_name !=="") {

			axios.post("/shipper/setUserShpBookmark",{user_no:props.user?props.user.user_no:'',data:shipperData},{})								
	  	  	.then(res => {
	  	  	              props.onLoadData("sh");
	  	  	              props.onAlert("success","작성한 BOOKMARK 가 저장 되었습니다.");
	  	  	});
		} else {
			props.onAlert("error","shipper_bookmark_name 는 필수 입력 항목 입니다.");
		}
	}

	
	const onChangeShp =(value)=> {

		if(value) {
			setShipper({...shipper,'c_shipper_bookmark_seq':value.value,'c_shipper_bookmark_name':value.label});
			
			if(value.value>0) {
				axios.post("/shipper/getUserShpBookmark",{user_no:props.user?props.user.user_no:'',seq:value.value},{}).then(res => {
					console.log(res.data[0])
					const list = {
						c_shp_name1:res.data[0].shp_name1?res.data[0].shp_name1:shipper.c_shp_name1,
						c_shp_name2:res.data[0].shp_name1?res.data[0].shp_name2:shipper.c_shp_name2,
						c_shp_user_name:res.data[0].shp_user_name?res.data[0].shp_user_name:shipper.c_shp_user_name,
						c_shp_user_tel:res.data[0].shp_user_tel?res.data[0].shp_user_tel:shipper.c_shp_user_tel,
						c_shp_code:res.data[0].shp_code?res.data[0].shp_code:shipper.c_shp_code,
						c_shp_country_code:res.data[0].shp_country_code?res.data[0].shp_country_code:shipper.c_shp_country_code,
						c_shp_address1:res.data[0].shp_address1?res.data[0].shp_address1:shipper.c_shp_address1,
						c_shp_address2:res.data[0].shp_address1?res.data[0].shp_address2:shipper.c_shp_address2,
						c_shp_address3:res.data[0].shp_address1?res.data[0].shp_address3:shipper.c_shp_address3,
						c_shp_address4:res.data[0].shp_address1?res.data[0].shp_address4:shipper.c_shp_address4,
						c_shp_address5:res.data[0].shp_address1?res.data[0].shp_address5:shipper.c_shp_address5,
					};
					const mergeData = Object.assign(shipper,list);	  
					setShipper({...mergeData,'c_shipper_bookmark_seq':res.data[0].shipper_bookmark_seq,'c_shipper_bookmark_name':res.data[0].shipper_bookmark_name});
					props.mergeData({...mergeData,'c_shipper_bookmark_seq':res.data[0].shipper_bookmark_seq,'c_shipper_bookmark_name':res.data[0].shipper_bookmark_name});
					setColl(true);
				});
			}
		}else {
			const list = {
				...shipper,
				c_shp_name1:null,
				c_shp_name2:null,
				c_shp_user_name:null,
				c_shp_user_tel:null,
				c_shp_code:null,
				c_shp_country_code:null,
				c_shp_address1:null,
				c_shp_address2:null,
				c_shp_address3:null,
				c_shp_address4:null,
				c_shp_address5:null,
			}
			setShipper(list);
			props.mergeData(list);
		}
	}
	
	const onInitData = () => {
		if(bookmarkView) {
			shipperData=null;
			shipperData= {
				...propsData,
				'shipper_bookmark_seq':'',
				'shipper_bookmark_name':'',
				'shp_code':'',
				'shp_name1':'',
				'shp_name2':'',
				'shp_address1':'',
				'shp_address2':'',
				'shp_address3':'',
				'shp_address4':'',
				'shp_address5':'',
				'shp_user_name':'',
				'shp_user_tel':'',
				'shp_country_code':'',
				'sch_user_dep1':'',
				'sch_user_email':''};
		} else {
			shipperData= {
				...propsData,
				'c_shipper_bookmark_seq':'',
				'c_shipper_bookmark_name':'',
				'c_shp_code':'',
				'shp_name1':'',
				'c_shp_name2':'',
				'c_shp_address1':'',
				'c_shp_address2':'',
				'c_shp_address3':'',
				'c_shp_address4':'',
				'c_shp_address5':'',
				'c_shp_user_name':'',
				'c_shp_user_tel':'',
				'c_shp_country_code':'',
				'sch_user_dep1':'',
				'sch_user_email':''};
			}
			setPropsData(shipperData);
	}
	
	
	const onBookMarkDelete = () => {
		if(shipperData && shipperData.shipper_bookmark_seq) {
			axios.post("/shipper/setUserShpBookmarkDel",{user_no:props.user?props.user.user_no:'',data:shipperData},{}).then(res => {
				onInitData();
				props.onLoadData("sh");
				props.onAlert("success","선택한 BOOKMARK 가 삭제 되었습니다.");
			});
		} else {
			props.onAlert("error","삭제 할 BOOKMARK를 선택해주세요.");
		}
		
	}
	
	//const onSaveData = () => {
	//	props.mergeData(shipper);
	//}
	
	const onHandleReturnVal = (event,name) => {
	  //    if(validation.getByte(event.target.value) < 36) {
		let list = {...shipper, [name]:event.target.value.toUpperCase()};
		setShipper(list);
	     // } else {
	    //	  props.onAlert("error",validation.EXCD_MSG+"(35 Byte)");
	     // }
	      
	}
	
	
	const onPropsReturn = ()=> {
		props.mergeData(shipper);
	}
	
	const onCopyProps=()=>{
		var list = {c_shp_name1:loadData.shp_name1,c_shp_name2:loadData.shp_name2,c_shp_address1:loadData.shp_address1,
				    c_shp_address2:loadData.shp_address2,c_shp_address3:loadData.shp_address3,c_shp_address4:loadData.shp_address4,
				    c_shp_address5:loadData.shp_address5}
		props.mergeData(list);
		//props.onAlert("success","Shipper 데이터가 복사 되었습니다.");
	}
	
	return (
    	<>
        <Row id="Shipper">
            <Col xl="12" lg="12">
	            <Card style={{zIndex:'3',border:'1px solid silver',borderRadius:'10px'}}>
	            <CardBody className="pt-3 pb-0" >  
                	<Row>
                		<Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>SHIPPER
	                		<Button className="pl-1" color="link" id="shpview" onClick={toggle.bind(this, 'S')}><i className="fa fa-pencil-square-o fa-2x"/></Button>
	  			            <UncontrolledTooltip delay={0} target="shpview">Input</UncontrolledTooltip>
	  			         </Col>
	                     <Col>
	                     	<Row>
	  	                   		<Col className="col-10 pr-0">
			  	                   	<Select
								        className="react-select react-select-primary"
								        classNamePrefix="react-select"
								        name="carrierbookmark"
								        value={{value:shipper.c_shipper_bookmark_seq?shipper.c_shipper_bookmark_seq:'',label:shipper.c_shipper_bookmark_name?shipper.c_shipper_bookmark_name:''}}
								        onChange={(value)=>onChangeShp(value)}
								        options={bookmark}
								        placeholder="선택"
	  	                   				ref={cShipperFocus}
										isClearable={shipper.c_shipper_bookmark_seq?true:false}/>
	  						 </Col>
	  						 <Col className="col-2 pl-auto pr-auto">
	  						 	<Button className="pl-0 pr-0" color="link" id="c_shpbookmark" onClick={toggle.bind(this, 'B')}><i className="fa fa-bookmark-o fa-2x" /></Button>
	  						    <UncontrolledTooltip delay={0} target="c_shpbookmark">Bookmark</UncontrolledTooltip>
	  						  </Col>			
	  					   </Row>
	  	              </Col>
	  	           </Row>
	  	    	    <Col className="col-12 text-right pr-0">
		    	    	<Button color="default" type="button" className="btn-link pr-0 pt-0 pb-0" onClick={()=>onCopyProps()}>Copy Shipper</Button>
		            </Col>
				        <Collapse isOpen={coll} className="pb-1"> 
				        	<hr className="mt-0"/>
				        		<Row style={{fontSize:'12px'}}>
					        		<Col xl="12" lg="12" md="12">
					                    <FormGroup className="mb-1">
					                        <Row>
					                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0">상호</Label></Col>
					                        	<Col>
					                        	 <InputValid 
						         	                type="text"
						         	                bsSize="sm"
						         	                name="c_shp_name1"
						         	                id="c_shp_name1"
						         	                placeholder=""
						         	                maxLength="35"
						         	                value={shipper.c_shp_name1?shipper.c_shp_name1:''}
						         	                onChange={(e)=>onHandleReturnVal(e, 'c_shp_name1')}
						         	                onBlur={onPropsReturn}
						         	                validtype="text" 
						         	                required={true}
						         	                feedid="shipper2"
						         	            />
					                            </Col>
					                        </Row>
					                     </FormGroup>
					                </Col>
				                	<Col xl="12" lg="12" md="12">
					                    <FormGroup className="mb-1">
					                        <Row>
					                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0"></Label></Col>
					                        	<Col>
					                        	<InputValid 
						         	                type="text"
						         	                bsSize="sm"
						         	                name="c_shp_name2"
						         	                id="c_shp_name2"
						         	                placeholder=""
						         	                maxLength="35"
						         	                value={shipper.c_shp_name2?shipper.c_shp_name2:''}
						         	                onChange={(e)=>onHandleReturnVal(e, 'c_shp_name2')}
						         	                onBlur={onPropsReturn}
						         	                validtype="text" 
						         	                required={false}
						         	               feedid="shipper2"
						         	            />
					                            </Col>
					                        </Row>
					                     </FormGroup>
					                </Col> 
					                <Col xl="6" lg="6" md="6">
					    	            <FormGroup className="mb-1">
						    	            <Row>
					                        	<Col className="pr-0 pt-1 col-4"><Label className="mb-0">담당자이름</Label></Col>
					                        	<Col>
						                        	<InputValid 
							         	                type="text"
							         	                bsSize="sm"
							         	                name="shp_user_name"
							         	                id="shp_user_name"
							         	                placeholder=""
							         	                maxLength="17"
							         	                value={shipper.c_shp_user_name?shipper.c_shp_user_name:''}
							         	                onChange={(e)=>onHandleReturnVal(e, 'c_shp_user_name')}
							         	                onBlur={onPropsReturn}
							         	                validtype="text" 
							         	                required={true}
							         	               feedid="shipper2"
							         	            />
						                        	</Col>
						                     </Row>
					    	            </FormGroup>
					    	        </Col>
					    	        <Col xl="12" lg="12" md="12">
				    	            <FormGroup className="mb-1">
					    	            <Row>
				                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0">주소</Label></Col>
				                        	<Col>
					                        	<InputValid 
						         	                type="text"
						         	                bsSize="sm"
						         	                name="c_shp_address1"
						         	                id="c_shp_address1"
						         	                placeholder=""
						         	                maxLength="35"
						         	                value={shipper.c_shp_address1?shipper.c_shp_address1:''}
						         	                onChange={(e)=>onHandleReturnVal(e, 'c_shp_address1')}
						         	                onBlur={onPropsReturn}
						         	                validtype="text" 
						         	                required={true}
						         	               feedid="shipper2"
						         	            />
					                        	</Col>
					                     </Row>
				    	            </FormGroup>
				    	        </Col>
				    	        <Col xl="12" lg="12" md="12">
				    	            <FormGroup className="mb-1">
					    	            <Row>
				                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0"></Label></Col>
				                        	<Col>
					                        	<InputValid 
						         	                type="text"
						         	                bsSize="sm"
						         	                name="c_shp_address2"
						         	                id="c_shp_address2"
						         	                placeholder=""
						         	                maxLength="35"
						         	                value={shipper.c_shp_address2?shipper.c_shp_address2:''}
						         	                onChange={(e)=>onHandleReturnVal(e, 'c_shp_address2')}
						         	                onBlur={onPropsReturn}
						         	                validtype="text" 
						         	                required={false}
						         	               feedid="shipper2"
						         	            />
					                        </Col>
					                     </Row>
				    	            </FormGroup>
				    	        </Col>
				    	        <Col xl="12" lg="12" md="12">
				    	            <FormGroup className="mb-1">
					    	            <Row>
				                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0"></Label></Col>
				                        	<Col>
					                        	<InputValid 
						         	                type="text"
						         	                bsSize="sm"
						         	                name="c_shp_address3"
						         	                id="c_shp_address3"
						         	                placeholder=""
						         	                maxLength="35"
						         	                value={shipper.c_shp_address3?shipper.c_shp_address3:''}
						         	                onChange={(e)=>onHandleReturnVal(e, 'c_shp_address3')}
						         	                onBlur={onPropsReturn}
						         	                validtype="text" 
						         	                required={false}
						         	               feedid="shipper2"
						         	            />
					                        </Col>
					                     </Row>
				    	            </FormGroup>
				    	        </Col>
				    	        <Col xl="12" lg="12" md="12">
				    	            <FormGroup className="mb-1">
					    	            <Row>
				                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0"></Label></Col>
				                        	<Col>
					                        	<InputValid 
						         	                type="text"
						         	                bsSize="sm"
						         	                name="c_shp_address4"
						         	                id="c_shp_address4"
						         	                placeholder=""
						         	                maxLength="35"
						         	                value={shipper.c_shp_address4?shipper.c_shp_address4:''}
						         	                onChange={(e)=>onHandleReturnVal(e, 'c_shp_address4')}
						         	                onBlur={onPropsReturn}
						         	                validtype="text" 
						         	                required={false}
						         	               feedid="shipper2"
						         	            />
					                        </Col>
					                     </Row>
				    	            </FormGroup>
				    	        </Col>
				    	        <Col xl="12" lg="12" md="12">
				    	            <FormGroup className="mb-1">
					    	            <Row>
				                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0"></Label></Col>
				                        	<Col >
					                        	<InputValid 
						         	                type="text"
						         	                bsSize="sm"
						         	                name="c_shp_address5"
						         	                id="c_shp_address5"
						         	                placeholder=""
						         	                maxLength="35"
						         	                value={shipper.c_shp_address5?shipper.c_shp_address5:''}
						         	                onChange={(e)=>onHandleReturnVal(e, 'c_shp_address5')}
						         	                onBlur={onPropsReturn}
						         	                validtype="text" 
						         	                required={false}
						         	                feedid="shipper2"
						         	            />
					                        </Col>
					                     </Row>
				    	            </FormGroup>
				    	        </Col>
					    	        <Col xl="6" lg="6" md="6">
					    	            <FormGroup className="mb-1">
						    	            <Row>
					                        	<Col className="pr-0 pt-1 col-4"><Label className="mb-0">연락처</Label></Col>
					                        	<Col>
						                        	<InputValid 
							         	                type="text"
							         	                bsSize="sm"
							         	                name="c_shp_user_tel"
							         	                id="c_shp_user_tel"
							         	                placeholder=""
							         	                maxLength="35"
							         	                value={shipper.c_shp_user_tel?shipper.c_shp_user_tel:''}
							         	                onChange={(e)=>onHandleReturnVal(e, 'c_shp_user_tel')}
							         	                onBlur={onPropsReturn}
							         	                validtype="text"	
							         	                required={true}
							         	               feedid="shipper2"
							         	            />
						                        	</Col>
						                     </Row>
					    	            </FormGroup>
					    	        </Col>
					    	        <Col xl="6" lg="6" md="6">
					    	            <FormGroup className="mb-1">
						    	            <Row>
					                        	<Col className="pr-0 pt-1 col-4"><Label className="mb-0">사업자코드</Label></Col>
					                        	<Col>
						                        	<InputValid 
							         	                type="text"
							         	                bsSize="sm"
							         	                name="c_shp_code"
							         	                id="c_shp_code"
							         	                placeholder=""
							         	                maxLength="18"
							         	                value={shipper.c_shp_code?shipper.c_shp_code:''}
							         	                onChange={(e)=>onHandleReturnVal(e, 'c_shp_code')}
							         	                onBlur={onPropsReturn}
							         	                validtype="text" 
							         	                required={true}
							         	               feedid="shipper2"
							         	            />
						                        	</Col>
						                     </Row>
					    	            </FormGroup>
					    	        </Col>
					    	        <Col xl="6" lg="6" md="6">
					    	            <FormGroup className="mb-1">
						    	            <Row>
					                        	<Col className="pr-0 pt-1 col-4"><Label className="mb-0">국가코드</Label></Col>
					                        	<Col>
						                        	<InputValid 
							         	                type="text"
							         	                bsSize="sm"
							         	                name="c_shp_country_code"
							         	                id="c_shp_country_code"
							         	                placeholder=""
							         	                maxLength="2"
							         	                value={shipper.c_shp_country_code?shipper.c_shp_country_code:''}
							         	                onChange={(e)=>onHandleReturnVal(e, 'c_shp_country_code')}
							         	                onBlur={onPropsReturn}
							         	                validtype="text" 
							         	                required={true}
							         	               feedid="shipper2"
							         	            />
						                        	</Col>
						                     </Row>
					    	            </FormGroup>
					    	        </Col>
						    	        
						    	    </Row>
				        </Collapse>
				        </CardBody>
				        <Col className="text-center col-12 p-0" onClick={() => setColl(!coll)}>  
			                    <Button
					              className="p-0"
					              color="link"
					              id="shpmore"
					              onClick={() => setColl(!coll)}
			                    style={{height:'21px',marginBottom:'4px',width:'100%'}}
					          >
			                   {coll?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
					          </Button>
					          <UncontrolledTooltip delay={0} target="shpmore">{coll?'Close':'Open'}</UncontrolledTooltip>
					          </Col>
		          </Card>    
            </Col>
        </Row>

        {/* 모달 팝업 영역 
        xs : 한 줄
        sm : 576px 에서 다음 줄로 넘어감
        md : 768px
        lg : 992px
        xl : 1200px
        fluid : 뷰포트 전체의 너비
        */}
        <Modal isOpen={open} toggle={toggle} className="pt-0" size="lg">
            <ModalHeader toggle={toggle} className="pt-3 pb-3">{modalTitle}</ModalHeader>
                <ModalBody className="p-3">
                    {bookmarkView?
                    	<ShipperBookmark type="C" loadFormData={propsData} onPropsShBookmark={onBookMarkData} onPropsShDeleteBookmark={onBookMarkDelete}
                        {...props} />
                    :
                        <Shipper type="I" loadFormData={propsData} propsData={onBookMarkData} {...props} 
                    	/>
                     } 
                </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={onInitData}>NEW</Button>{' '}
            {bookmarkView?
				<>
					<Button color="primary" onClick={onSaveBookmark}>SAVE</Button>
					<Button color="primary" onClick={onBookMarkDelete}>DELETE</Button>
				</>
			:<Button color="primary" onClick={onApplyData}>APPLY</Button>}{' '}
                <Button color="secondary" onClick={()=>setOpen(!open)}>CANCLE</Button>
            </ModalFooter>
        </Modal>
    </>
    );
});

export default ShipperCard;



