import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Button, FormGroup, Label, Input, 
    UncontrolledTooltip, Form, Container, CardBody, Card, 
    Collapse} from "reactstrap";
import axios from 'axios';
import {observer} from 'mobx-react-lite';
import ContextStore from "store/ContextStore.js";
import GlobalChildTodo from "./GlobalChildTodo.js"

// export default function ConfirmIndex(props) {
// function GlobalTodo(props) {
const GlobalTodo = observer(({store,...props}) => {  
  console.log('props:', props);
  console.log('store:', store);
    // const store = props.store;

  const gstore = useContext(ContextStore);

  console.log('gstore:', gstore);

  const [name, setName] = useState();
  
  const [gname, setGname] = useState();


  useEffect(() => {
    console.log('useEffect onload');

    // if (store.user === null) {
    //   setLogin(true);
    // }



    return function cleanup() {
        console.log('useEffect unload');
    };
  }, []);

  const setMobx = ( ) => {

    store.setting('todomobx_token', {username:'global1', usertype:'C'});
    gstore.setting('todomobx_token', {username:'global1', usertype:'C'});
    // store.setting('todomobx_token', {username:'todomobx', usertype:'C'});

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
  const getMobx = ( ) => {
    // store.logout();
    // setLogin(false);
    // store.clear();
    // console.log('store=',store);
    setName(store.username);
    setGname(gstore.username);
  }  

  


  return (
    <Form>
    <Container>
        <CardBody className="pt-2 pb-2 bg-white">
            <Row>
                <Col className="ml-auto mr-auto" xl="10" lg="10" md="10" sm="10">
                    <h4 className="mt-1 text-center">
                        <small>global1</small>
                    </h4>
                    <h4>GlobalStore:{store.username}</h4>
                    <h4>GlobalStore->Stats:{name}</h4>
                    <h4>ContextStore:{gstore.username}</h4>
                    <h4>ContextStore->Stats:{gname}</h4>
                    <Button id="bkg_search" color="info" outline type="button" className="mr-1" onClick={setMobx}>설정</Button>
                    <Button id="bkg_search" color="info" outline type="button" className="mr-1" onClick={getMobx}>조회</Button>
                </Col>
            </Row>
            <GlobalChildTodo store={store} data1="1" data2="2"></GlobalChildTodo>    
        </CardBody>
    </Container>
    </Form>
  );
}
);

export default GlobalTodo;