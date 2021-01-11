/*eslint-disable*/
import React from "react";
// reactstrap components
import {
  Button,
  FormGroup,
  Modal,
  Input,
  Row,Col,Label
} from "reactstrap";

function LoginPage(props) {
  // modals states

  // carousel states and functions
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const [classic, setClassic] = React.useState(false);
 
  return (
    <>
        <Modal
                isOpen={props.openLogin}
                toggle={() => props.setOpenLogin(false)}
                className="modal-login"
              >
                <div className="modal-header no-border-header text-center">
                  <button
                    className="close"
                    type="button"
                    onClick={() => props.setOpenLogin(false)}
                  >
                    <span>×</span>
                  </button>
                  <h6 className="text-muted">Welcome</h6>
                  <h3 className="modal-title text-center">WEIDONG FERRY</h3>
                  <p>Log in to your account</p>
                </div>
                <div className="modal-body">
                  <FormGroup>
                    <label>Id</label>
                    <Input defaultValue="" placeholder="id" type="text" />
                  </FormGroup>
                  <FormGroup>
                    <label>Password</label>
                    <Input
                      defaultValue=""
                      placeholder="Password"
                      type="password"
                    />
                  </FormGroup>
                  <Row>
                      <Col xl="4">
                          <FormGroup check>
                              <Label check>
                                <Input defaultValue="" type="checkbox" onClick={() => setClassic(true)} />
                                <span className="form-check-sign" /><font size="2" color="#66615B" className="font-weight-bold">ID SAVE</font>
                              </Label>
                          </FormGroup>
                      </Col>
                      <Col xl="5">
                        <FormGroup>
                            <Button color="link p-0 font-weight-bold">id / pw Find</Button>
                        </FormGroup>
                      </Col>
                      <Col xl="3">
                        <FormGroup>
                            <Button color="link p-0 font-weight-bold">REGISTER</Button>
                        </FormGroup>
                      </Col>
                  </Row>
                  <Button block  color="default">
                    Log in
                  </Button>
                </div>
                <div className="modal-footer no-border-footer">
                  
                </div>
        </Modal>
    </>
  );
}

export default LoginPage;
