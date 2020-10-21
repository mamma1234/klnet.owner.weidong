import React from "react";
// react plugin used to create switch buttons
import Switch from "react-bootstrap-switch";
// reactstrap components
import {
  Button,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Collapse,
  UncontrolledCollapse
} from "reactstrap";
import Select from "react-select";


function ShpBookingRegisterPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("settings-page");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("settings-page");
    };
  });

  const [collapses, setCollapses] = React.useState([]);
  const changeCollapse = collapse => {
    if (collapses.includes(collapse)) {
      setCollapses(collapses.filter(prop => prop !== collapse));
    } else {
      setCollapses([...collapses, collapse]);
    }
  }; 

  const [singleSelect, setSingleSelect] = React.useState([]);

  const clickCollapse = collapse => {
    setCollapses([1]);
  };


  const clickUnCollapse = collapse => {
    setCollapses([]);
  };

  const [rSelected, setRSelected] = React.useState(null);

  return (
    <>
 
      <div className="wrapper">
        <div className="profile-content section">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="6">
                <Form className="settings-form">
                  <FormGroup>
                  
                    <label>Shipper</label>
                    {/* <Card className="no-transition"> */}
                      {/* <CardHeader className="card-collapse bg-white" id="headingOne" role="tab"> */}
                        <h5 className="mb-0 panel-title">
                          <Row>
                            <Col md="6" sm="6">
                              <Select
                                  className="react-select react-select-primary"
                                  classNamePrefix="react-select"
                                  name="singleSelect"
                                  value={singleSelect}
                                  onChange={value => setSingleSelect(value)}
                                  options={[
                                    {
                                      value: "",
                                      label: "Single Option",
                                      isDisabled: true
                                    },
                                    { value: "2", label: "Foobar" },
                                    { value: "3", label: "Is great" },
                                    { value: "4", label: "가나다" }
                                  ]}
                                  placeholder="Single Select"
                              />            

                            </Col>
                            <Col>                                              
                              <a
                                aria-expanded={collapses.includes(1)}
                                className="collapsed"
                                data-parent="#accordion"
                                href="#pablo"
                                id="collapseOne"
                                onClick={e => {
                                  e.preventDefault();
                                  changeCollapse(1);
                                }}
                              >
                                <i className="nc-icon nc-minimal-down" />
                              </a>
                            </Col>
                          </Row>
                        </h5>
                      {/* </CardHeader> */}
                      <Collapse isOpen={collapses.includes(1)}>
                        <CardBody>
                          <Row>
                            <Col md="6" sm="6">
                              <FormGroup>
                                <label>Name</label>
                                <Input
                                  className="border-input"
                                  placeholder="Shipper Name"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6" sm="6">
                              <FormGroup>
                                <label>Code</label>
                                <Input
                                  className="border-input"
                                  placeholder="Shipper Code"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </CardBody>
                      </Collapse>
                    {/* </Card> */}
                  </FormGroup>                  

                  <div className="text-center">
                    <Button
                      className="btn-wd btn-round"
                      color="info"
                      type="submit"
                    >
                      Save
                    </Button>
                  </div>

                  <Button color="primary" onClick={() => setRSelected(1)} active={rSelected === 1}>One</Button>

                  <Button color="primary" onClick={() => clickCollapse(1)} active={rSelected === 1}>Collapse </Button>

                  <Button color="primary" onClick={() => clickUnCollapse(1)} active={rSelected === 1}>UnCollapse </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ShpBookingRegisterPage;
