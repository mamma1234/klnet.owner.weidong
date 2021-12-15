/*eslint-disable*/
import React,{useState,useEffect} from "react";
// reactstrap components
import {
  CardBody,Row,Col,Button,Badge,Container
} from "reactstrap";
import axios from "axios";
import {Link} from "react-router-dom";
import * as validation from 'components/common/validation.js';

export default function MyProfile(props) {


    const styles={
        threeTag:{
            fontSize:'18px',
            fontWeight:'bold',
        }
    }



    const [data,setData] = useState([]);
    const [myInfo, setMyInfo] = useState(null);
    useEffect(() => {
// console.log(props.user)
        if(props.user.klnet_id) {
            axios.post("/com/getCompanyInfo",{klnetId:props.user.klnet_id}).then(
                res=> {
                    if(res.statusText==="OK") {
                        if(res.data.length > 0) {
                            // console.log(res.data[0])
                            setData(res.data[0]);
                        }else {
                            setData([]);
                        }
                    }else {
                        setData([]);
                    }
                }
            )
        }

        return function cleanup() {
          console.log('cleanup');
    
        };
      },[]);

    return (
        <>
        {props.user &&
            <CardBody>
                <Container>
                    <Col className="mw-100 text-black bg-white">
                        <Row className="border-bottom mt-2"  style={{justifyContent: 'space-between'}}>
                            <Col xs="8" className="text-left pb-1">
                                <span style={styles.threeTag}>내 정보</span>
                            </Col>
                            <Col  xs="4" className="text-right">
                                <Link to={{pathname: `/usersetting`,}}>
                                    <Button outline className="btn-neutral" style={{color:'black' ,padding:'0'}}><i className="fa fa-cog text-black"/><span className="text-black">계정 관리</span></Button>
                                </Link>
                            </Col>
                        </Row>
                        <Row className="mt-3" style={{textAlign: 'start'}}>
                            <Col xs="4" >
                                <span style={{fontSize:'16px',fontWeight:'bold'}}className="card-category pb-1">아이디</span>
                            </Col>
                            <Col xs="8">
                                <span style={{fontSize:'16px'}} className="card-category pb-1">{props.user.local_id}</span>
                            </Col>
                        </Row>
                        <Row className="mt-2 mb-3 pb-3 border-bottom " style={{textAlign: 'start'}}>
                            <Col xs="4">
                                <span style={{fontSize:'16px',fontWeight:'bold'}}className="card-category pb-1">이메일</span>
                            </Col>
                            <Col xs="8">
                                <span style={{fontSize:'16px'}} className="card-category pb-1">{props.user.user_email.toUpperCase()}</span>
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col>
                                <Row className="pb-3">
                                    <Col xl="4" sm="4" md="4" lg="4" xl="4">
                                        <span style={{fontSize:'17px'}}className="card-category pb-1">연락처</span>
                                    </Col>
                                    <Col xl="8" sm="8" md="8" lg="8" xl="8">
                                        <span style={{fontSize:'17px'}} className="card-category pb-1">{validation.TELFormatter(props.user.user_phone)}</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row> */}
                        {/* <Row>
                            <Col className="text-center border-bottom">
                                <Link to={{pathname: `/usersetting`,}}>
                                    <Button outline className="btn-rotate btn-round mb-2" style={{color:'black'}}><i className="fa fa-cog text-black"/><span className="text-black">Account Setting</span></Button>
                                </Link>
                            </Col>
                        </Row> */}
                        <Row >
                            <Col sm="12"className="text-left pb-2">
                                {/* <Link to={{pathname: `/setting`,}}> */}
                                    <span style={styles.threeTag}>내 업체 및 담당업무</span>
                                {/* </Link> */}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="ml-2 mr-2 pl-2 pr-2">
                                {props.user.klnet_id==="KLDUMY01"?(
                                <Button style={{width:'100%', color:'black' ,padding:'13px'}} color="link" outline onClick={()=>props.openCompany()}>
                                   <span style={{fontSize:"17px"}}>업체 등록이 필요합니다.</span>
                                </Button>
                                ):(
                                <Link to={{pathname: `/setting`,state:data}}>
                                    <Button style={{width:'100%', color:'black'}} color="link" outline>
                                        <Row>
                                            <Col xs="3" className="d-flex align-items-center justify-content-center">
                                                <Badge>
                                                    {data.KLNET_ID}
                                                </Badge>
                                            </Col>
                                            <Col xs="7">
                                                <span style={{fontSize:"17px"}}>
                                                    {data.CNAME_KR}
                                                    </span>
                                            </Col>
                                        </Row>
                                    </Button>
                                </Link>  
                                )}
                                
                            </Col>
                        </Row>
                        <Row  className="pt-1">
                            <Col style={{display:'flex',justifyContent: 'flex-end'}}>
                                <Button className="text-left"style={{ color:'black' ,padding:'0'}} color="link" onClick={()=>props.openCompany()} ><i className="fa fa-user-plus"/><span>업체 검색</span></Button>
                                {props.user.role == 'Y' ?<Button className="text-right"style={{ color:'black'}} color="link" onClick={()=>props.openSessionModal()} ><i className="fa fa-star"></i><span>세션전환</span></Button>
                                :null}
                            </Col>
                        </Row>
                    </Col>
                </Container>
            </CardBody>
            }
        </>
    );
}

