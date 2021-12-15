/*eslint-disable*/
import React,{useState,useEffect} from "react";
// reactstrap components
import {
  CardBody,Row,Col,Button,Input
} from "reactstrap";
import axios from "axios";


export default function MyProfile(props) {
  //  const [data,setData] = useState([]);
    const [hsCodeList,setHsCodeList] = useState([]);
    const [hsCodeDetailList,setHsCodeDetailList] = useState([]);
    //const [settingColor,setSettingColor] = useState("border-success");
    const [inputVal,setInputVal] = useState("");
    const [searchVal,setSearchVal] = useState("");
    const [nextUi,setnextUi] = useState(false);
   
    useEffect(() => {
    	setHsCodeList(props.onHsCodeData);
  	  },[props.onHsCodeData]);
    
    const onClickHscode = (data)=>{
             setnextUi(!nextUi);
        	 axios.post("/shipper/getHsCodeItemInfo",{code:data.group_code})
        	 	  .then(res => setHsCodeDetailList(res.data));
    }
    
    
    
    return (
        <>

                <div
                    >
                    <CardBody>
                    	<Col className="col-12">
                    	{!nextUi?<Row>
                    		<Col className="ml-auto col-4">
                    		<Input type="text" bsSize="sm" name="searchCode" id="searchCode" placeholder="" 
                    			onChange={(e)=>setSearchVal(e.target.value)}
                    		    onKeyPress ={(e)=>"Enter" === e.key?setInputVal(searchVal):null} />
					          </Col>
					          <Col className="col-4">
						          <Button block color="default" size="sm" onClick={()=>setInputVal(searchVal)}>Search</Button>
					          </Col>
					     </Row>:
					    	 <Row className="ml-auto" style={{writingMode:'vertical-lr'}}>
					     		<Button
			              className="pt-1 pb-1 mr-1"
				              //variant="link"
				              color="primary" size="sm"
                              onClick={()=>setnextUi(false)}
				            >뒤로
				            </Button></Row>}
					     <Row className="mt-2">
					     	<Col className="col-12" style={{overflow:'auto',height:'400px'}}>
					     		{!nextUi?
					     		<Row >
						     		{hsCodeList && hsCodeList.length>0?hsCodeList.map((data,key)=>
						     			<Col className="col-1 text-center pl-0 pr-0 border-secondary"
						     				style={{margin:'1px',border:inputVal?data.group_name_kr.replace(/(\s*)/g,"").includes(inputVal)?'2px solid':'1px solid':'1px solid'}} key={"hs_"+key} onClick={()=>onClickHscode(data)}>
						     			{data.group_name_kr}
						     			</Col>
						     		): <Col className="col-12">조회된 자료가 존재하지 않습니다.</Col>}
						     		</Row>:<></>}
					     		{nextUi?
					     	
					     			<Row>
						     			<Col className="col-3 pl-0 pr-0 border-top border-left border-right border-bottom bg-info">HSCODE</Col>
						     			<Col className="col-9 pl-0 pr-0 border-top border-left border-right border-bottom bg-info">HS품목해설</Col>
						     	   </Row>:<></>
					     		}
					     		{nextUi?hsCodeDetailList && hsCodeDetailList.length>0?hsCodeDetailList.map((data,key)=><Row key={"hsdetail_"+key}>
					     		<Col className="col-3 pl-0 pr-0 border-top border-left border-right border-bottom border-secondary" >
					     		<Button
					              className="btn-link mr-1 p-0 border-0"
					              //variant="link"
					              color="primary"
                                  onClick={()=>props.onSetHsCode(data.item_code)}
					            >{data.item_code}
					            </Button>
					            </Col>
				     			<Col className="col-9 pl-0 pr-0 border-top border-left border-right border-bottom border-secondary" >{data.item_name_kr}</Col>
				     			</Row>
				     			
				     		     ): <Col className="col-12">조회된 자료가 존재하지 않습니다.</Col>:<></>
					     		
					     		
					     		}
					     		
					     		<Row>
					     		
					     		</Row>
					     	</Col>
					     </Row>
					   </Col>
                    </CardBody>
            </div>
            
        </>
    );
}

