/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, FormGroup,Input,Card,CardHeader,CardBody} from "reactstrap";
//import AlertModal from 'components/Modals/Alert.js';
import axios from 'axios';
//import InputValid from "components/CustomInput/InputValid.js";

const Goods = (props) => {
	
  const {loadData,bookmark,view,validation} = props;	

  useEffect(() => {
	  setGoodsData(loadData);
  },[loadData]);

  const [goodsData, setGoodsData] = useState({});

 // const onHandleReturnVal = (event,name) => { 
	  //if(validation.getByte(event.target.value) < 36) {
   // 	  let list = {...goodsData, [name]:event.target.value};
   // 	  setGoodsData(list);
     // } else {
    	//  props.onAlert("error",validation.EXCD_MSG+"(35 Byte)");
     // }
   // }
  
  const onPropsReturn = ()=> {
  	  props.propsData(goodsData);
    }
  
  const onDeleteGoods =(goodsData)=>{
	  props.propsDelete(goodsData);
  }
  
  const onChangeGoods =(event)=> {

      if(event.target.value > 0) {
			axios.post("/shipper/getUserGoodsBookmark",{user_no:props.user?props.user.user_no:'',seq:event.target.value},{})								
		  	.then(res => {  		  		
		  	               var data;
		  		           if(res.data[0].goods_desc1) {
		  		        	 data = res.data[0].goods_desc1+('\n');
		  		           }
			  		       if(res.data[0].goods_desc2) {
			  		       	 data +=res.data[0].goods_desc2+('\n');
			  		       }
				  		   if(res.data[0].goods_desc3) {
				  		   	 data += res.data[0].goods_desc3+('\n');
				  		   }
					  	   if(res.data[0].goods_desc4) {
				  		   	 data += res.data[0].goods_desc4+('\n');
				  		   }
					  	   if(res.data[0].goods_desc5) {
				  		     data += res.data[0].goods_desc5;
				  		   }
		  
		  		          setGoodsData({'goods_desc':data});
		  		          props.propsData({'goods_desc':data});
		  	              });
      } else {
   
    	  setGoodsData([]);
      }
  }
  
  const textareaLimit = (text) =>{
	  let lines = text.split('\n');
	  for(let i=0;i<lines.length;i++) {

		  //console.log(i,"번쨰 length:",lines[i].length," Byte는:",props.validation.getByte(lines[i]));
		  //console.log("value:",lines[i]);
		  
		  //if(lines[i].length <= limitval)  continue;
		  if(props.validation.getByte(lines[i]) <= 80)  continue;
		 // console.log(">>>>> over length:",lines[i].length);
		  let j=0;
		  const lineLen = lines[i].length-1;
		  let space = lineLen;
		  while(j++ <= lineLen) {
			  if(lines[i].charAt(j) === ' ') space = j;
		  }
		  
		  lines[i+1] = lines[i].substring(space) + (lines[i+1] || "");
		  lines[i]=lines[i].substring(0,space);
	  }
	  setGoodsData({...goodsData, 'goods_desc':lines.join('\n')});
  }
  
  return (
    <>
	    <Card className="no-transition mb-2" style={{border:'1px solid silver'}}>
		    <CardHeader className="pt-1 pb-1">
		      <Row>
		      	<Col className="col-6">
			      	<Input type="select" className="pt-0 pb-0" style={{height:'28px'}}
		      		  value={goodsData.cargo_goods_bookmark_seq?goodsData.cargo_goods_bookmark_seq:''} 
			      	  onChange={(event)=>onChangeGoods(event)}>
		      		  <option value="">선택</option>
			      		{bookmark.length>0?bookmark.map((element,key)=>
			      			<option key={key} value={element.cargo_goods_bookmark_seq}>{element.cargo_goods_bookmark_name}</option>
			      		):<></>}
		      	    </Input>
	      	    </Col>
		      	<Col><button
	        className="close"
	            type="button"
	            	onClick={(goodsData)=>onDeleteGoods(goodsData)}
	          >×</button></Col>
		      </Row>
		    </CardHeader>
		 
		    <CardBody className="pt-2 pb-3">
  
		    <Row style={{height:'200px',overflow:'auto'}}>
		    	<Col xl="0" className="col-0 pl-0 pr-0 text-center" style={{paddingTop:'10px',width:'30px'}}>
		    	{goodsData.goods_desc?goodsData.goods_desc.split("\n").map((data,key)=>
		    																	{return (<div style={{backgroundColor:key+1<17?'yellow':'white'}}>{key+1}</div>)}):1}
		    	</Col>
		    	<Col className="p-0"> <FormGroup className="mb-0" >
				     <Input style={{lineHeight:'1.4',overflow:'hidden',resize:'unset'}}
		             className="border-input"
		             placeholder="수정중 입니다."
		             rows={goodsData.goods_desc?goodsData.goods_desc.split("\n").length>6?goodsData.goods_desc.split("\n").length:9:9}
		             type="textarea"
		             value={goodsData.goods_desc?goodsData.goods_desc:''}
		             onChange={(event)=>textareaLimit(event.target.value)}
				     onBlur={onPropsReturn}
		           />
		          </FormGroup>
		        </Col>
	         </Row>
	         
	         <div>line:{goodsData.goods_desc?goodsData.goods_desc.split("\n").length:0} {' / '}
	              byte:{props.validation.getByte(goodsData.goods_desc?goodsData.goods_desc.split("\n")[goodsData.goods_desc?goodsData.goods_desc.split("\n").length-1:0]:'')}</div>
   
	  	</CardBody>
		 
	  </Card>
    </>
    );
}

export default Goods;