/*eslint-disable*/
import React from "react";
// reactstrap components
import {
  Button,
  FormGroup,
  Modal,
  Input,Row,Col,Label
} from "reactstrap";
import Tabs from "components/Taps/Taps.js";

function RegisterPage(props) {
  // modals states

  // carousel states and functions
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
 
  return (
    <>
        <Modal
          isOpen={props.openRegister}
          toggle={() => props.setOpenRegister(false)}
          className="modal-register"
        >
          <div className="modal-header no-border-header text-center">
            <button
              className="close"
              type="button"
              onClick={() => props.setOpenRegister(false)}
            >×
            </button>
            <h6 className="text-muted">Welcome</h6>
            <h3 className="modal-title">WEIDONG REGISTER PAGE</h3>
            <p>Create your account free and secure</p>
          </div>
          <div className="modal-body pl-4 pr-4">
              <Tabs
                tabvalue={1}
                taps={[{body:(
                <div>
                    <h5>사업자등록</h5>
                    <Row>
                        <Col xl="9" className="col-9">
                              <FormGroup>
                                <Label  className="mb-0">사업자등록</Label> 
                                  <Row>
                                      <Col xl="3" className="col-12 pr-1">
                                                <Input type="text" name="comNo1" id="comNo1" placeholder="" />
                                      </Col>
                                      <Col xl="2" className="col-2 pl-1 pr-1">
                                                <Input type="text" name="comNo2" id="comNo2" placeholder="" />
                                       </Col>
                                       <Col xl="7" className="col-7 pl-1">
                                          <Input type="text" name="comNo3" id="comNo3" placeholder="" />
                                      </Col>
                                  </Row>  
                              </FormGroup>
                            </Col>
                         <Col xl="3" className="col-3">
                                        <FormGroup className="pt-3 mt-1 mb-2">
                                            <Button color="default">Search</Button>
                                        </FormGroup>
                         </Col>
                    </Row>
                </div>)},
                       {body:(
                       <div>
                         <h5>사업자정보 등록</h5>
                       </div>)},
                       {body:(
                       <div>
                         담당자정보 등록
                       </div>)}]}
              />
             
            </div>
        </Modal>
    </>
  );
}

export default RegisterPage;
