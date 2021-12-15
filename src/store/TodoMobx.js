import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Button, FormGroup, Label, Input, 
    UncontrolledTooltip, Form, Container, CardBody, Card, 
    Collapse} from "reactstrap";
import axios from 'axios';
import {observer} from 'mobx-react-lite';
import UserStore from "store/UserStore.js";

// export default function ConfirmIndex(props) {
function TodoMobx(props) {
// const TodoMobx = observer((props) => {    
    // const store = props.store;

const store = useContext(UserStore);


  const [login, setLogin] = useState();
  

  useEffect(() => {
    console.log('useEffect onload');

    // if (store.user === null) {
    //   setLogin(true);
    // }



    return function cleanup() {
        console.log('useEffect unload');
    };
  }, []);

  const selectLogIn = ( ) => {


    store.setting('todomobx_token', {username:'todomobx', usertype:'C'});

    // axios.post("/auth/login", {id : 'test0', password : 'test0',})
    // .then(res => {
    //   console.log(res.data);
    //     // if (res.data.message) {
    //     //   alert(res.data.message);
    //     // } else {	
    //     //   if(res.data.token) {
    //     //     auth.setAuthHeader(res.data);
    //     //     props.onClose(res.data.user);
    //     //   }		        		
    //     // }

    //     store.setting(res.data.token, res.data.user);
    //     // setLogin(true);
    // })
    // .catch(err => {
    //     console.log(err);
    //       // if (err.response.data.error) {
    //       //   alert(err.response.data.error);
    //       // }
    // })

    

    // store.clear();
    // console.log('store=',store);
  }  
  const selectLogOut = ( ) => {
    store.logout();
    // setLogin(false);
    // store.clear();
    // console.log('store=',store);
  }  

  


  return (
    <Form>
    <Container>
        <CardBody className="pt-2 pb-2 bg-white">
            <Row>
                <Col className="ml-auto mr-auto" xl="10" lg="10" md="10" sm="10">
                    <h4 className="mt-1 text-center">
                        <small>Confirm</small>
                    </h4>
                </Col>
            </Row>
            <Row className="mt-2">
                            <Col className="text-right">
                                <Button id="bkg_search" color="info" outline type="button" className="mr-1" onClick={selectLogIn}>로그인</Button>
                                <UncontrolledTooltip delay={0} target="bkg_search">조회</UncontrolledTooltip>
                            </Col>
            </Row>            
            <Row className="mt-2">
                            <Col className="text-right">
                                <Button id="bkg_search" color="info" outline type="button" className="mr-1" onClick={selectLogOut}>로그아웃</Button>
                                <UncontrolledTooltip delay={0} target="bkg_search">조회</UncontrolledTooltip>
                            </Col>
            </Row>            
        </CardBody>
    </Container>
    </Form>
  );
}
// );

export default TodoMobx;