import React, { useState, useEffect } from 'react';
import {Row, Col, Container, CardBody, Form} from "reactstrap";
import axios from "axios";
import AlertMessage from "components/Alert/AlertMessage.js";
import Company from './CompanyList.js'

export default function CompSection (props) {
    const [message] = useState("");
    const [alertOpen,setAlertOpen] = useState(false);
    const [font] = useState("success");
    const [compList, setCompList] = useState([]);
    useEffect(() => {
        props.fncClickMenu('NAV_COMPANY')
        onCompSearch();
    
        return function cleanup() {

        };	    
    }, [props]);
    const onCompSearch = () => {
        if(props.user){
            if(props.user.klnet_id){
                axios.post("/com/getCompanyInfo",{klnetId:props.user.klnet_id}).then(
                    res=> {
                    if(res.statusText==="OK") {
                        if(res.data.length>0){
                            setCompList(res.data);
                        }else {
                            setCompList([]);
                        }
                        
                    }
                }
            )
            }   
        }
    }





    const handleClose = () => {
        setAlertOpen(false);
    }
    return (
        <>
            <Form>
                <Container>
                    <CardBody className="pt-2 pb-2 bg-white">

                        <Row>
                            <Col className="ml-auto mr-auto" xl="10" lg="10" md="10" sm="10">
                                <h2 className="mt-5 text-center">
                                    COMPANY
                                </h2>
                            </Col>
                            <Col xl="12" lg="12" className="pl-4 pr-4">
                                <Row>
                                    {compList.length > 0 &&
                                        <Col xl="12" lg="12" md="12">
                                            {compList.map((value,index) => {
                                                return(
                                                    <Company user={props.user} key={index} value={value} index={index}/>)})}
                                            
                                        </Col>}
                                </Row>
                            </Col>
                        </Row>
                    </CardBody>
                </Container>
            </Form>
            <AlertMessage 
              message={message}
              isOpen={alertOpen}
              isClose={handleClose}
              // fontColor={font}   //선택사항
              alertColor={font} //선택사항
              timeOut={2000} //선택사항
              ></AlertMessage>
        </>
    )
}




             