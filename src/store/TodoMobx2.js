import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Button, FormGroup, Label, Input, 
    UncontrolledTooltip, Form, Container, CardBody, Card, 
    Collapse} from "reactstrap";

import {observer} from 'mobx-react-lite';
import UserStore from "store/UserStore.js";

// export default function ConfirmIndex(props) {
    
function TodoMobx2(props) {
// const TodoMobx2 = observer((props) => {   
    // const store = props.store;

    const store = useContext(UserStore);

    console.log("store=", store);
// const TodoMobx2 = observer(({store}, ...props) => {    
    console.log('props=',props);
    // console.log('store2=',store);

  const [confirm, setConfirm] = useState({});
  const [cargo, setCargo] = useState([]);
  const [cntr, setCntr] = useState([]);


  useEffect(() => {
    console.log('useEffect onload');

    return function cleanup() {
        console.log('useEffect unload');
    };
  }, []);

  const selectShpConfirm = ( ) => {
    store.setting('todomobx2_token', {username:'todomobx2', usertype:'C'});
    // store.clear();
    console.log('store=',store);
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
                                <Button id="bkg_search" color="info" outline type="button" className="mr-1" onClick={selectShpConfirm}>SEARCH</Button>
                                <UncontrolledTooltip delay={0} target="bkg_search">조회</UncontrolledTooltip>
                            </Col>
            </Row>            
        </CardBody>
    </Container>
    </Form>
  );
}
// );

export default TodoMobx2;