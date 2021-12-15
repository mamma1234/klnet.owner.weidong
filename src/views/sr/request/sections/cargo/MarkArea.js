/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, FormGroup,Input,Card,CardHeader,CardBody, FormFeedback} from "reactstrap";
//import AlertModal from 'components/Modals/Alert.js';
import axios from 'axios';
//import InputValid from "components/CustomInput/InputValid.js";
import Select from "react-select";
export default function Goods(props){
	
	const {mark,bookmark2,validation} = props;	

	useEffect(() => {
		setMarkData(mark);
	},[mark]);

	const [markData, setMarkData] = useState({});

	const onPropsReturn = ()=> {
		props.propsMarkData(markData);
		}
	
	const onChangeMark =(value)=> {
		if(value) {
			if(value.value > 0) {
				axios.post("/shipper/getUserMarkBookmark",{user_no:props.user?props.user.user_no:'',seq:value.value},{}).then(res => {
					setMarkData(res.data[0]);
					props.propsMarkData(res.data[0]);
				});
			} else {
				setMarkData([]);
				props.propsMarkData([]);
			}
		}else {
			setMarkData({
				...markData,
				'mark_desc':null,
				'cargo_mark_bookmark_seq':null,
				'cargo_mark_bookmark_name':null
			});
			props.propsMarkData({
				...markData,
				'mark_desc':null,
				'cargo_mark_bookmark_seq':null,
				'cargo_mark_bookmark_name':null
			});
		}
	}
	
	const textareaLimit = (text) =>{
		let lines = text.split('\n');
		for(let i=0;i<lines.length;i++) {

			if( props.validation.getByte(lines[i]) <= 35)  continue;

			let j=0;
			const lineLen = lines[i].length;
			let space = lineLen;
			while(j++ <= lineLen) {
				var lengthData= lines[i].substring(0,j);
				if(props.validation.getByte(lengthData) <= 35) {
					space = lengthData.length;
				}
			}

			lines[i+1] = lines[i].substring(space+1) + (lines[i+1] || "");
			lines[i]=lines[i].substring(0,space);
		}
		setMarkData({...markData, 'mark_desc':lines.join('\n')});
	}
	
	return (
		<>
			<Card className="no-transition mb-2" style={{border:'1px solid silver'}}>
			{(!props.relation)&&
				<CardHeader className="pt-1 pb-1">
					<Row>
						<Col xl={props.viewType ==="CARD"?"12":"6"} className="col-12">
							<Select
								className="customSelect bg-white"
								classNamePrefix="customSelect"
								name="cargo_mark_bookmark_seq"
								placeholder=""
								value={{value:markData.cargo_mark_bookmark_seq?markData.cargo_mark_bookmark_seq:'',
								label:markData.cargo_mark_bookmark_seq?
									(bookmark2.findIndex(x=>x.value===markData.cargo_mark_bookmark_seq)>=0)?
											bookmark2[bookmark2.findIndex(x=>x.value===markData.cargo_mark_bookmark_seq)].label:
										'선택':'선택'
								}}
								onChange = {(value)=>onChangeMark(value)}
								options={bookmark2}
								isClearable={markData.cargo_mark_bookmark_seq?true:false}
							/>
						
						</Col>
					</Row>
				</CardHeader>}
				<CardBody className="pt-2 pb-3">
					<Row style={{height:'200px',overflow:'auto'}}>
						{/*<Col xl="0" className="col-0 pl-0 pr-0 text-center" style={{paddingTop:'10px',width:'30px'}}>
						{markData.mark_desc?markData.mark_desc.split("\n").map((data,key)=>
							{return (<div key={"g_"+key}>{key+1}</div>)}):1}
						</Col>*/}
						<Col className="p-0"> 
							<FormGroup className="mb-0" >
								<Input 
									style={{lineHeight:'1.4',overflow:'hidden',resize:'unset',paddingRight:'4px',paddingLeft:'4px',textTransform:'uppercase'}}
									disabled={props.view &&!props.relation ?true:false} //invalid={!markData.goods_desc?true:false}
									className="border-input"
									rows={markData.mark_desc?markData.mark_desc.split("\n").length>6?markData.mark_desc.split("\n").length:9:9}
									// 
									invalid={!validation.EDICharsetCheck(markData.mark_desc)?true:false}
									// 
									type="textarea"
									value={markData.mark_desc?markData.mark_desc:''}
									onChange={(event)=>textareaLimit(event.target.value.replace(/\t/g," "))}
									onBlur={onPropsReturn}/>
									{/*  */}
								<FormFeedback feedid="cargo">{
									!validation.EDICharsetCheck(markData.mark_desc)?validation.EDICheckText(markData.mark_desc):""
								}
								</FormFeedback>
								{/*  */}
							</FormGroup>
						</Col>
					</Row>         
					<div>line:{markData.mark_desc?markData.mark_desc.split("\n").length:0} {' / '}byte:{props.validation.getByte(markData.mark_desc?markData.mark_desc.split("\n")[markData.mark_desc?markData.mark_desc.split("\n").length-1:0]:'')}</div>
				</CardBody>
			</Card>
		</>
	);
}
