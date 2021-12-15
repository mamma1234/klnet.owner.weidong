import React, { useState, useEffect } from 'react';
import {Row, Col,  CardBody} from "reactstrap";
import axios from "axios";
import AlertMessage from "components/Alert/AlertMessage.js";
import Card from 'reactstrap/lib/Card';
//import CardFooter from 'reactstrap/lib/CardFooter';
import { //Link, useLocation, 
    useHistory } from "react-router-dom";
import * as validation from 'components/common/validation.js';
const styles = {
    normalGird:{
      fontSize:'20px',
      color:'#696969',
      fontWeight:'bold',
    },
    cardTitle:{
      fontSize:'16px',
      color:'#696969',
    }
  };

export default function CompanyList(props) {
    const history = useHistory();
    const [value, setValue] = useState(props.value);
    const [index, setIndex] = useState(props.index);
    const [data,setData] = useState([])
    const [user,setUser] = useState(props.user);
    //const [ConfirmOpen,setConFirmOpen] = useState(false);
    //const [confirmMessage, setConfirmMessage]= useState("");
   // const [deleteState,setDeleteState] = useState([]);
    const [message,setMessage] = useState("");
    const [alertOpen,setAlertOpen] = useState(false);
    const [font, setFont] = useState("success");
    useEffect(() => {
        setUser(props.user)
        setValue(props.value);
        setIndex(props.index);
        onsubmit();
        return function cleanup() {

        };
    }, [props]);
    const handleClose = () => {
        setAlertOpen(false);
    }



    const onsubmit = () => {
        if(props.user&&props.user.klnet_id){
            console.log(props.user.klnet_id)
            axios.post('/com/checkWDFCLineCompany',{param:props.user.klnet_id, lineCode:'WDFC'}).then(
                res=> {
                    console.log(res.data)
                    if(res.statusText==="OK") {
                        if(res.data.length>0){
                            setData(res.data)
                        }else {
                            setData([])
                        }
                        
                    }
                }
            )
        }
        // 
        
    }
    
    return(
        <div>
            <Card className="card-just-text card-raised card-form-horizontal no-transition mb-4">
                <CardBody>
                    <span style={{fontSize:'20px', fontWeight:'bold'}}>{value.CNAME_KR}</span>
                </CardBody>
                <Row className="mb-4">
                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="text-center">
                        <span style={styles.normalGird}>영문명</span>
                    </Col>
                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="text-center border-right">
                        <span style={styles.cardTitle}>{value.CNAME_EN}</span>
                    </Col>
                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="text-center">
                        <span style={styles.normalGird}>MASTER</span>
                    </Col>
                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="text-center">
                        <span style={styles.cardTitle}>{value.COMP_CEO?validation.NameReplace(value.COMP_CEO):""}</span>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="text-center">
                        <span style={styles.normalGird}>업종</span>
                    </Col>
                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="text-center border-right">
                        <span style={styles.cardTitle}>{value.COMP_CLASS}</span>
                    </Col>

                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="text-center">
                        <span style={styles.normalGird}>업태</span>
                    </Col>
                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="text-center">
                        <span style={styles.cardTitle}>{value.COMP_TYPE}</span>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="text-center border-right">
                        <span style={styles.normalGird}>주소</span>
                    </Col>
                    <Col xs="9" xl="9" lg="9" md="9" sm="9" className="text-left">
                        <span style={styles.cardTitle}>{value.COMP_ADDR}</span>
                    </Col>
                </Row>
                {
                    data.length > 0 ? (
                        <>
                            {
                                data.map((value,index) => {
                                    return(
                                        <Row className="mb-4">
                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="text-center border-right">
                                                <span style={styles.normalGird}>화주</span>
                                            </Col>
                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="text-left">
                                                <span style={styles.cardTitle}>{value.shipper_yn}</span>
                                            </Col>
                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="text-center border-right">
                                                <span style={styles.normalGird}>포워더</span>
                                            </Col>
                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="text-left">
                                                <span style={styles.cardTitle}>{value.forwarder_yn}</span>
                                            </Col>
                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="text-center border-right">
                                                <span style={styles.normalGird}>파트너코드</span>
                                            </Col>
                                            <Col xs="2" xl="2" lg="2" md="2" sm="2" className="text-left">
                                                <span style={styles.cardTitle}>{value.partner_code}</span>
                                            </Col>
                                        </Row>
                                    )
                                })
                            }
                        </>

                    ):null
                }
                
            </Card>
         
            <AlertMessage 
              message={message}
              isOpen={alertOpen}
              isClose={handleClose}
              // fontColor={font}   //선택사항
              alertColor={font} //선택사항
              timeOut={2000} //선택사항
            />
        </div>
    )
}