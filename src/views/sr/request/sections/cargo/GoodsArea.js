/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, FormGroup,Input,Card,CardHeader,CardBody,FormFeedback} from "reactstrap";
//import AlertModal from 'components/Modals/Alert.js';
import axios from 'axios';
//import InputValid from "components/CustomInput/InputValid.js";
import Select from "react-select";

export default function Goods(props) {
	
	const {goods,bookmark3,validation} = props;	
	const [goodsData, setGoodsData] = useState({});
  
	useEffect(() => {
		setGoodsData(goods);
	},[goods]);

	useEffect(()=> {
		onPropsReturn()
	},[goodsData.trans_service_code])

  	const onHandleReturnVal = (event,name) => { 
		let list = {...goodsData, [name]:event.target.value.toUpperCase()};
		setGoodsData(list);
    }
  
	const onPropsReturn = ()=> {
		let list = goodsData;
		let goods = list.goods_desc;
		if(list && "1" === list.trans_service_code) {
			if(goods) {
				var goodsSplit = goods.split('\n');
				if("SHIPPER'S LOAD. COUNT & SEAL" === goodsSplit[0]) {
					goodsSplit[0] = "SHIPPER'S LOAD. COUNT & SEAL";
					goodsSplit[1] = "SAID TO CONTAIN :";
					goods = goodsSplit.join('\n');
				} else if ("SAID TO CONTAIN :" === goodsSplit[0]) {
					goodsSplit[0] = "\n";
					goods = goodsSplit.join('\n');
				} else {
					goods = "\n\n"+goodsSplit.join('\n');
				}
				var goodsDesc = goods.split('\n');
				goodsDesc[0] = "SHIPPER'S LOAD. COUNT & SEAL";
				goodsDesc[1] = "SAID TO CONTAIN :";
				list = {...list, goods_desc:goodsDesc.join('\n')};					  
			} else {
				list = {...list, goods_desc:"SHIPPER'S LOAD. COUNT & SEAL\nSAID TO CONTAIN :\n"};
			}
		} else if(list && "3" === list.trans_service_code){
			if(goods) {
				var goodsSplit = goods.split('\n');
				if("SAID TO CONTAIN :" === goodsSplit[0]) {
					goodsSplit[0] = "SAID TO CONTAIN :";
				} else if ("SHIPPER'S LOAD. COUNT & SEAL" === goodsSplit[0]) {
					goodsSplit[0] ="SAID TO CONTAIN :";
					goodsSplit.splice(1,1);
					goods = goodsSplit.join('\n');
				} else {
					goods = "\n"+goodsSplit.join('\n');
				}
				var goodsDesc = goods.split('\n');
				goodsDesc[0] = "SAID TO CONTAIN :";
				list = {...list, goods_desc:goodsDesc.join('\n')};					  
			} else {
				list = {...list, goods_desc:"SAID TO CONTAIN :\n"};
			} 
		} 
		props.propsGoodsData(list);  
	}

	const onChangeGoods =(value)=> {
		if(value) {
			if(value.value > 0) {
				axios.post("/shipper/getUserGoodsBookmark",{user_no:props.user?props.user.user_no:'',seq:value.value},{}).then(res => { 
					var list;
					if("1" === goodsData.trans_service_code) {
						list = {...res.data[0],goods_desc:"SHIPPER'S LOAD. COUNT & SEAL\nSAID TO CONTAIN :\n"+res.data[0].goods_desc};
					} else if("3" === goodsData.trans_service_code) {
						list = {...res.data[0],goods_desc:"SAID TO CONTAIN :\n"+res.data[0].goods_desc};
					} else {
						list = res.data[0];
					}
					props.propsGoodsData(list);
					});
			} else {
				setGoodsData([]);
			}
		}else {
			var list;
			if("1" === goodsData.trans_service_code) {
				list = {
					...goodsData,
					goods_desc:"SHIPPER'S LOAD. COUNT & SEAL\nSAID TO CONTAIN :\n",
					cargo_goods_bookmark_seq:null,
					cargo_goods_bookmark_name:null,};
			} else if("3" === goodsData.trans_service_code) {
				list = {
					...goodsData,
					goods_desc:"SAID TO CONTAIN :\n",
					cargo_goods_bookmark_seq:null,
					cargo_goods_bookmark_name:null,
				};
			} else {
				list = {
					...goodsData,
					'goods_desc':null,
					'cargo_goods_bookmark_seq':null,
					'cargo_goods_bookmark_name':null
				}
			}
			setGoodsData({list});
			props.propsGoodsData(list);
		}
	}
  
	const textareaLimit = (text) => {  //console.log(text);
		if(!text) { 
			if("1" === goodsData.trans_service_code) {
				props.propsGoodsData({...goodsData, goods_desc:"SHIPPER'S LOAD. COUNT & SEAL\nSAID TO CONTAIN :\n"});
			} else if("3" === goodsData.trans_service_code) {
				props.propsGoodsData({...goodsData, goods_desc:"SAID TO CONTAIN :\n"});
			}
		}
		let lines = text.split('\n');
		for(let i=0;i<lines.length;i++) {
			if( props.validation.getByte(lines[i]) <= 80)  continue;
				let j=0;
				const lineLen = lines[i].length;
				let space = lineLen;

				while(j++ <= lineLen) {
					var lengthData= lines[i].substring(0,j);
					if(props.validation.getByte(lengthData) <= 80) { 
						space = lengthData.length;
					}
				}
				lines[i+1] = lines[i].substring(space+1) + (lines[i+1] || "");
				lines[i]=lines[i].substring(0,space);
		}
		setGoodsData({...goodsData, goods_desc:lines.join('\n')});
	}
  
	return (
		<>
			<Card className="no-transition mb-2" style={{border:'1px solid silver'}}>
			{(!props.relation) &&
				<CardHeader className="pt-1 pb-1">
					<Row>
						<Col xl="6" className="col-12">
							<Select
								className="customSelect bg-white"
								classNamePrefix="customSelect"
								name="cargo_goods_bookmark_seq"
								placeholder=""
								value={{value:goodsData.cargo_goods_bookmark_seq?goodsData.cargo_goods_bookmark_seq:'',
								label:goodsData.cargo_goods_bookmark_seq?
									(bookmark3.findIndex(x=>x.value===goodsData.cargo_goods_bookmark_seq)>=0)?
											bookmark3[bookmark3.findIndex(x=>x.value===goodsData.cargo_goods_bookmark_seq)].label:
										'선택':'선택'
								}}
								onChange = {(value)=>onChangeGoods(value,'cargo_goods_bookmark_seq')}
								options={bookmark3}
								isClearable={goodsData.cargo_goods_bookmark_seq?true:false}/>
						</Col>
					</Row>
				</CardHeader>}
				<CardBody className="pt-2 pb-3">
					<Row style={{height:goodsData.goods_desc?'200px':'220px',overflow:'auto'}}>
						<Col xl="0" className="col-0 pl-0 pr-0 text-center" style={{paddingTop:'10px',width:'30px'}}>
						{goodsData.goods_desc?goodsData.goods_desc.split("\n").map((data,key)=>{
							return (
								<div key={"g_"+key}style={{backgroundColor:key+1<16?'yellow':'white',height:'19px'}}>{key+1}</div>)}
							):1}
						</Col>
						<Col className="p-0">
							<FormGroup className="mb-0" >
								<Input style={{lineHeight:'1.4',overflow:'hidden',resize:'unset',paddingRight:'4px',paddingLeft:'4px',textTransform:'uppercase'}}
									disabled={props.view &&!props.relation ?true:false} 
									// invalid={!props.view && !goodsData.goods_desc?true:false}
									invalid={!props.view && !goodsData.goods_desc?true:!validation.EDICharsetCheck(goodsData.goods_desc)?true:false}
									className="border-input"
									rows={goodsData.goods_desc?goodsData.goods_desc.split("\n").length>6?goodsData.goods_desc.split("\n").length:9:9}
									type="textarea"
									value={goodsData.goods_desc?goodsData.goods_desc:''}
									onChange={(event)=>textareaLimit(event.target.value.replace(/\t/g," "))}
									onBlur={onPropsReturn}/>
								{/* <FormFeedback feedid="cargo">{validation.REQ_MSG}</FormFeedback> */}
								<FormFeedback feedid="cargo">{
									!validation.EDICharsetCheck(goodsData.goods_desc)?validation.EDICheckText(goodsData.goods_desc):validation.REQ_MSG}
								</FormFeedback>
							</FormGroup>
						</Col>
					</Row>
					<div>line:{goodsData.goods_desc?goodsData.goods_desc.split("\n").length:0} {' / '}
						 byte:{props.validation.getByte(goodsData.goods_desc?goodsData.goods_desc.split("\n")[goodsData.goods_desc?goodsData.goods_desc.split("\n").length-1:0]:'')}
					</div>
				</CardBody>
			</Card>
		</>
	);
}

