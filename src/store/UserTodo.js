import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Button, FormGroup, Label, Input, 
    UncontrolledTooltip, Form, Container, CardBody, Card, 
    Collapse} from "reactstrap";
import {observer} from 'mobx-react-lite';

const UserTodo = observer(({userStore,...props}) => {  
  // console.log('UserTodo props:', props);
  // console.log('userStore:', userStore);
  // console.log('userStore.user:', userStore.user);
  // console.log('userStore.user.user_name:', userStore.user.user_name);

  // const [name, setName] = useState("");

  useEffect(() => {
    console.log('useEffect onload');

    // if (store.user === null) {
    //   setLogin(true);
    // }



    return function cleanup() {
        console.log('useEffect unload');
    };
  }, []);
  
  // const setUserName = () => {
  //   userStore.setUser({ ...userStore.user, user_name:name});
  // }

  const onChangeName = (e) => {
    // setName(e.target.value);
    console.log('Name:', e.target.value);
    userStore.setUser({ ...userStore.user, user_name:e.target.value});
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
                    <h4>GlobalStore:{userStore.user?userStore.user.user_name:"Not Login"}</h4>
                    {/* <h4>GlobalStore->Stats:{name}</h4>
                    <h4>ContextStore:{gstore.username}</h4>
                    <h4>ContextStore->Stats:{gname}</h4> */}
                    {/* <Button id="bkg_search" color="info" outline type="button" className="mr-1" onClick={setMobx}>설정</Button>
                    <Button id="bkg_search" color="info" outline type="button" className="mr-1" onClick={getMobx}>조회</Button> */}
                    <input type="text" name="Name" value={userStore.user?userStore.user.user_name:"Not Login"} onChange={onChangeName} />
                    {/* <Button id="bkg_search" color="info" outline type="button" className="mr-1" onClick={setUserName}>Name 수정</Button> */}
                </Col>
            </Row>
        </CardBody>
    </Container>
    </Form>
  );
}
);

export default UserTodo;