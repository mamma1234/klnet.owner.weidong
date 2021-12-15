/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect } from 'react';
import { Row,Col, FormGroup,Label,Input,FormFeedback,FormText } from "reactstrap";
import * as validation from 'components/common/validation.js';
import Select from 'react-select';
import InputValid from "components/CustomInput/InputValid.js";
import axios from 'axios';


const Others = (props) => {

	const {bookmark,loadFormData,bkgData,type,term} = props;	
	const [othersData,setOthersData] = React.useState([]);
	const blTypeList = [{value:'5',label:'ORIGINAL B/L'},{value:'3',label:'SURRENDER B/L'}];
	const hblList = [{value:'Y',label:'Yes'},{value:'N',label:'No'}];
	const linePaymentList = [{value:'P',label:'PREPAID'},{value:'C',label:'COLLECT'}];
	


	useEffect(() => {
	    setOthersData(loadFormData);
	},[loadFormData]);

 	const onHandleReturnVal = (event,name) => {

		//if(validation.getByte(event.target.value) < 36) {
		let list = {...othersData, [name]:event.target.value.toUpperCase()};
		setOthersData(list);
     // } else {
    //	  props.onAlert("error",validation.EXCD_MSG+"(35 Byte)");
      //}
  	}
 
 	const onHandleSelectReturnVal = (value,name) => {
		let list = {...othersData, [name]:value};
	  	setOthersData(list);
	  	props.propsData(list);	  
 	}
  
  	const onPropsReturn = ()=> {
	  	props.propsData(othersData);
  	}
  
/*  const onChangeBookings =(value)=>{
     
     setOthersData({...othersData,'bkglist':value});	
     props.propsData({...othersData,'bkglist':value});

  }*/
  	const onChangeBookings = async(value)=>{
		let bkg_no;
		let list;
		if(value) {
			if(value.length>0) {
				value.map((data,key)=> {bkg_no=data.value});
				list = value;
			} else {
				list = [value];
				bkg_no = value.res_bkg_no;
			}
			if(bkg_no) {
				await getBkgInfo(othersData,bkg_no,list);
			}	  	  
		} else {
			setOthersData({...othersData,'bkglist':value});	
			props.propsData({...othersData,'bkglist':value});
		}
  	}
  
	const getBkgInfo=(list,bkgNo,bkglist)=>{
		axios.post("/shipper/getUserBookingInfo",{user_no:props.user?props.user.user_no:'',bkg_no:bkgNo,lineCode:'WDFC'},{})								
		.then(res => { 
				if(res.data.length > 0 ) {   
					let cons = {};
					//console.log(props.samec);
					if(props.samec) {
						
						cons = {'noti_name1':res.data[0].cons_name1,'noti_name2':res.data[0].cons_name2,'noti_address1':res.data[0].cons_address1,
									'noti_address2':res.data[0].cons_address2,'noti_address3':res.data[0].cons_address3,
									'noti_address4':res.data[0].cons_address4,'noti_address5':res.data[0].cons_address5};
					}
					
					let data = {...list,...res.data[0],'sch_srd':res.data[0].sch_etd,'bk_link':'Y','bkglist':bkglist,...cons};
					setOthersData(data);	
					props.propsData(data);
				} else {
					let data = {...list,'res_bkg_no':bkgNo,'bk_link':'N','bkglist':bkglist};
					setOthersData(data);	
					props.propsData(data);
				}
		}); 
	}
  
  return (
    <>
		<Row>
		{type==="B"?
			<Col xl="6" lg="6" md="12">
				<FormGroup>
					<Label className="mb-0">BookMark Name</Label>
					<Input 
						type="text" 
						name="other_bookmark_name" 
						id="other_bookmark_name" 
						invalid={bookmark&&!othersData.other_bookmark_name?true:false}
						value={othersData.other_bookmark_name} 
						onChange = {(event)=>onHandleReturnVal(event,'other_bookmark_name')} 
						onBlur={onPropsReturn}/>
					<FormFeedback>{validation.REQ_MSG}</FormFeedback>	
				</FormGroup>
		    </Col>:
			<Col xl="12" lg="12" md="12">
			   <FormGroup>
					<Label className="mb-0">Booking No</Label>	 
			{/*       <Select
                className="react-select"
                //isMulti
                options={bkgData}
                placeholder="BKG SELECT..."
                value={othersData.bkglist}
                style={{minWidth:'100%'}}
               // closeMenuOnSelect={false}
               // onChange={(e) => {console.log(e)}}
			    onChange={(value)=>onChangeBookings(value)}   
                styles={{
                  menu: provided => ({...provided, zIndex:9999})
                }}
              />
*/}              		<Select
							className="customSelect react-select-primary"
							classNamePrefix="customSelect"
							name="bkg_no"
							//placeholder=""
							placeholder={bkgData.length<1?"Confirm Booking no data":"선택"}
							value={othersData.bkglist}
							getOptionLabel={(option)=>option.sr_status?option.label+" [ SR"+option.sr_status+"]":option.label}
							onChange={(value)=>onChangeBookings(value)}                          
							options={bkgData}
							styles={{
								control: provided => ({...provided,border:!othersData.res_bkg_no?'1px solid red':othersData.part_bl && othersData.part_bl === 'Y'?'2px solid green':'' ,
										minHeight:'40px',height:'40px' }),
								//   control: provided => ({...provided,minHeight:'31px' }),
									indicatorsContainer: provided => ({...provided,height:'40px'})
							}}
							isDisabled = {othersData.part_bl && othersData.part_bl === 'Y'?true:false}
						/>
					                        	
                    {!othersData.res_bkg_no?<FormText className="text-danger">필수</FormText>:<></>}
			        {othersData.sr_bk_merge ==='Y'?<FormText className="text-success">Booking info Apply</FormText>:<></>}
			        {othersData.part_bl ==='Y'?<FormText className="text-success">Part B/L</FormText>:<></>}
			   </FormGroup>
			</Col>}
		 </Row>
        <Row> 
        
	        <Col xl="6" lg="6" md="6">
		        {/*<FormGroup>
		            <Label className="mb-0">Contract No
		            </Label>
		            <Input type="text" name="sc_no" id="sc_no" placeholder="" value={othersData.sc_no} invalid={!bookmark&&!othersData.sc_no?true:false}
			            onChange = {(event)=>onHandleReturnVal(event,'sc_no')} 
			            onBlur={onPropsReturn}/>
		            <FormFeedback>{validation.REQ_MSG}</FormFeedback>
		            */}
		        <FormGroup>
	            <Label className="mb-0">SC Number
	            </Label>
		            <InputValid 
                    type="text"
                    //bsSize="sm"
                    name="sc_no"
                    id="sc_no"
                    placeholder=""
                    maxLength="15"
                    value={othersData.sc_no?othersData.sc_no:''}
                    onChange={(e)=>onHandleReturnVal(e, 'sc_no')}
                    onBlur={onPropsReturn}
                    validtype="text" 
                    required={false}
                />
		            </FormGroup>   
	        </Col>
{/*		    <Col xl="6" lg="6" md="6">
			    <FormGroup>
			        <Label className="mb-0">Shipper Refernece Number</Label>
			        <Input type="text" name="document_no" id="document_no" placeholder="" value={othersData.document_no} onChange = {(event)=>onHandleReturnVal(event,'document_no')} 
		            onBlur={onPropsReturn}/>
			    </FormGroup>
	        </Col>*/}
	        <Col xl="6" lg="6" md="12" className="col-12">
			       		 <FormGroup>
					            <Label className="mb-0">Term</Label>
					            <Select
	                                className="customSelect"
	                                classNamePrefix="customSelect"
	                                name="trans_service_code1"
	                                placeholder=""
	                                value={{
										value:othersData.trans_service_code?othersData.trans_service_code:'',
	                                	label:othersData.trans_service_code?(term.findIndex(x=>x.value===othersData.trans_service_code)>=0)?term[term.findIndex(x=>x.value===othersData.trans_service_code)].label:'선택':'선택'
									}}
	                        	    onChange = {(value)=>onHandleSelectReturnVal(value.value,'trans_service_code')}
	                                options={term}
	                                    styles={{
	                                        control: provided => ({...provided,border:type!=="B"&&!othersData.trans_service_code?'1px solid red':'',minHeight:'40px',height:'40px' }),
	                                        indicatorsContainer: provided => ({...provided,height:'40px'})
	                                    }}
	                            />
						        <InputValid 
	                                    hidden
	                                    name="trans_service_code"
	                                    id="trans_service_code"
	                                    placeholder=""
	                                    maxLength="1"
	                                    bsSize="sm"
	                                    value={othersData.trans_service_code?othersData.trans_service_code:''}
	                                    validtype="text"
	                                    required={type!=="B"?true:false} 
	                        	        readOnly
	                                    feedid="booking"
	                                />
					           {/* <Input type="select" onChange = {(event)=>onHandleSelectReturnVal(event,'trans_service_code')}
					            	invalid={!bookmark&&!othersData.trans_service_code?true:false}
					            value={othersData.trans_service_code}>
							      		<option value="">선택</option>
							      		{(term.length>0)?term.map((element,key)=>{
				                            return(
				                                <option key={key} value={element.service_code}>
				                                    {element.service_type}
				                                </option>
				                            )
				                        })
				                        :<></>}
							          </Input>
							    <FormFeedback>{validation.REQ_MSG}</FormFeedback>*/}	 
					      </FormGroup>
			</Col>
	        <Col xl="6" lg="6" md="12" className="col-12">
		        		 <FormGroup>
				            <Label className="mb-0">BL_TYPE</Label>
				            <Select
	                            className="customSelect"
	                            classNamePrefix="customSelect"
	                            name="bl_type1"
	                            placeholder=""
	                            value={{value:othersData.bl_type?othersData.bl_type:'',
	                            label:othersData.bl_type?
	                                (blTypeList.findIndex(x=>x.value===othersData.bl_type)>=0)?
	                                		blTypeList[blTypeList.findIndex(x=>x.value===othersData.bl_type)].label:
	                                    '선택':'선택'
	                            }}
	                    	    onChange = {(value)=>onHandleSelectReturnVal(value.value,'bl_type')}
	                            options={blTypeList}
	                                styles={{
	                                    control: provided => ({...provided,border:type!=="B"&&!othersData.bl_type?'1px solid red':'',minHeight:'40px',height:'40px' }),
	                                    indicatorsContainer: provided => ({...provided,height:'40px'})
	                                }}
	                        />
					        <InputValid 
	                                hidden
	                                name="bl_type"
	                                id="bl_type"
	                                placeholder=""
	                                maxLength="1"
	                                bsSize="sm"
	                                value={othersData.bl_type?othersData.bl_type:''}
	                                validtype="text"
	                                required={type!=="B"?true:false} 
	                    	        readOnly
	                                feedid="booking"
	                            />
				         {/*   <Input type="select" value={othersData.bl_type} onChange = {(event)=>onHandleSelectReturnVal(event,'bl_type')} invalid={!bookmark&&!othersData.bl_type?true:false}>
						      		<option value="">선택</option>
						      		<option value="1">ORIGINAL B/L</option>
						      		<option value="2">SURRENDER B/L</option>
						          </Input>
						          <FormFeedback>{validation.REQ_MSG}</FormFeedback>	*/}
				        </FormGroup>
	        		</Col>
	        <Col xl="6" lg="6" md="12" className="col-12">
		        		<FormGroup>
			            <Label className="mb-0">HOUSE B/L 유무</Label>
			            <Select
	                        className="customSelect"
	                        classNamePrefix="customSelect"
	                        name="hbl_yn"
	                        placeholder=""
	                        value={{value:othersData.hbl_yn?othersData.hbl_yn:'',
	                        label:othersData.hbl_yn?
	                            (hblList.findIndex(x=>x.value===othersData.hbl_yn)>=0)?
	                            		hblList[hblList.findIndex(x=>x.value===othersData.hbl_yn)].label:
	                                '선택':'선택'
	                        }}
	                	    onChange = {(value)=>onHandleSelectReturnVal(value.value,'hbl_yn')}
	                        options={hblList}
	                            styles={{
	                                control: provided => ({...provided,border:type!=="B"&&!othersData.hbl_yn?'1px solid red':'',minHeight:'40px',height:'40px' }),
	                                indicatorsContainer: provided => ({...provided,height:'40px'})
	                            }}
	                    />
				        <InputValid 
	                            hidden
	                            name="hbl_yn"
	                            id="hbl_yn"
	                            placeholder=""
	                            maxLength="1"
	                            bsSize="sm"
	                            value={othersData.hbl_yn?othersData.hbl_yn:''}
	                            validtype="text"
	                            required={type!=="B"?true:false} 
	                	        readOnly
	                            feedid="booking"
	                        />
			          { /* <Input type="select" value={othersData.hbl_yn?othersData.hbl_yn:''}  invalid={!bookmark&&!othersData.hbl_yn?true:false} onChange = {(event)=>onHandleSelectReturnVal(event,'hbl_yn')}>
			                <option value="">선택</option>
			                <option value="N">No</option>
				      		<option value="Y">Yes</option>
				         </Input>
				         <FormFeedback>{validation.REQ_MSG}</FormFeedback>	*/}
				         </FormGroup>
	        </Col> 
	        <Col xl="6" lg="6" md="12" className="col-12">
	    		<FormGroup>
	            <Label className="mb-0">Ocean Freight</Label>
	            <Select
	                className="customSelect"
	                classNamePrefix="customSelect"
	                name="line_payment_type"
	                placeholder=""
	                value={{value:othersData.line_payment_type?othersData.line_payment_type:'',
	                label:othersData.line_payment_type?
	                    (linePaymentList.findIndex(x=>x.value===othersData.line_payment_type)>=0)?
	                    		linePaymentList[linePaymentList.findIndex(x=>x.value===othersData.line_payment_type)].label:
	                        '선택':'선택'
	                }}
	        	    onChange = {(value)=>onHandleSelectReturnVal(value.value,'line_payment_type')}
	                options={linePaymentList}
	                    styles={{
	                        control: provided => ({...provided,border:type!=="B"&&!othersData.line_payment_type?'1px solid red':'',minHeight:'40px',height:'40px' }),
	                        indicatorsContainer: provided => ({...provided,height:'40px'})
	                    }}
	            />
		        <InputValid 
	                    hidden
	                    name="line_payment_type"
	                    id="line_payment_type"
	                    placeholder=""
	                    maxLength="1"
	                    bsSize="sm"
	                    value={othersData.line_payment_type?othersData.line_payment_type:''}
	                    validtype="text"
	                    required={type!=="B"?true:false} 
	        	        readOnly
	                    feedid="booking"
	                />
		          {/*  <Input type="select" className="pt-0 pb-0" value={othersData.line_payment_type?othersData.line_payment_type:''} 
						onChange = {(event)=>onHandleSelectReturnVal(event,'line_payment_type')}
				        invalid={!bookmark&&!othersData.line_payment_type?true:false}
		            >
				        <option value="">선택</option>
				        <option value="P">PREPAID</option>
				  		<option value="C">COLLECTED</option>
				     </Input>
				     <FormFeedback>{validation.REQ_MSG}</FormFeedback>*/	}
	         </FormGroup>
</Col>
        </Row>
       
    </>
    );
}

export default Others;