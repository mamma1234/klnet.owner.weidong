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
import WeidongNavbar from "components/Navbars/WeidongNavbar.js";

function ShpBookingRegisterPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("settings-page");
    // window.scrollTo(0, 0);
    // document.body.scrollTop = 0;
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
  const setCarrierSelect = carrier => {
    console.log("collapses:", collapses);
    setCollapses(["carrier"]);
    setSingleSelect(carrier);
  };
  const setShipperSelect = shipper => {
    console.log("collapses:", collapses);
    setCollapses(["shipper"]);
    setSingleSelect(shipper);
  };
  const setForwarderSelect = forwarder => {
    console.log("collapses:", collapses);
    setCollapses(["forwarder"]);
    setSingleSelect(forwarder);
  };
  const setConsigneeSelect = consignee => {
    console.log("collapses:", collapses);
    setCollapses(["consignee"]);
    setSingleSelect(consignee);
  };



  const clickCollapse = collapse => {
    setCollapses([collapse]);
  };
  const clickUnCollapse = collapse => {
    setCollapses([]);
  };

  const [rSelected, setRSelected] = React.useState(null);

  return (
    <>
      <WeidongNavbar />
      <div className="wrapper">
        <div className="profile-content section">
          <Container>
            <Row>
              {/* <Col className="ml-auto mr-auto" xl="6" lg="8" md="8" sm="10" xs="10"> */}
              <Col className="ml-auto mr-auto" >
                <Form className="settings-form">
                <FormGroup> 
                    <label><h3>General</h3></label>
                    <h5 className="mb-0 panel-title">
                      <Row>
                        <Col className="" xl="3" lg="3" md="3" sm="4" xs="4">
                          <Input
                            className="border-input"
                            placeholder="Shipper Booking Number"
                            type="text"
                          />
                        </Col>
                        <Col className="" xl="3" lg="3" md="3" sm="4" xs="4">
                          <Input
                            className="border-input"
                            placeholder="SC Number"
                            type="text"
                          />
                        </Col>
                        <Col className="" xl="3" lg="3" md="3" sm="4" xs="4">
                          <Input
                            className="border-input"
                            placeholder="Carrier Booking Number"
                            type="text"
                          />
                        </Col>
                      </Row>
                    </h5>
                    
                </FormGroup>
                <FormGroup>                
                    <label><h3>Carrier</h3></label>
                      {/* <CardHeader  id="headingOne" role="tab"> */}
                        <h5 className="mb-0 panel-title">
                          <Row>
                            <Col className="" xl="4" lg="6" md="6" sm="8" xs="8">
                              <Select
                                  className="react-select react-select-primary"
                                  classNamePrefix="react-select"
                                  name="singleSelect"
                                  value={singleSelect}
                                  onChange={value => setCarrierSelect(value)}
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
                            <Col xl="1" lg="1" md="1" sm="1" xs="1">                                              
                              <a
                                aria-expanded={collapses.includes("carrier")}
                                className="collapsed"
                                data-parent="#accordion"
                                href="#pablo"
                                id="collapseZero"
                                onClick={e => {
                                  e.preventDefault();
                                  changeCollapse("carrier");
                                }}
                              >
                                <i className="nc-icon nc-minimal-down" />
                              </a>
                            </Col>
                          </Row>
                        </h5>
                      {/* </CardHeader> */}
                      <Collapse isOpen={collapses.includes("carrier")}>
                        {/* <CardBody> */}
                          <Row >
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Shipper Name</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Carrier Name"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Shipper Code</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Carrier Code"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Person in Charge</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Person in Charge"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Person in Charge</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Tel"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Person in Charge</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Email"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Person in Charge</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Fax"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Person in Charge</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Dept"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="12" lg="12" md="12" sm="12" xs="12">
                                {/* <label>Address</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Address"
                                  type="text"
                                />
                            </Col>
                          </Row>
                        {/* </CardBody> */}
                      </Collapse>
                    {/* </Card> */}
                  </FormGroup>      
                    {/* <Card className="no-transition"> */}
                  <FormGroup>                
                    <label><h3>Shipper</h3></label>
                      {/* <CardHeader  id="headingOne" role="tab"> */}
                        <h5 className="mb-0 panel-title">
                          <Row>
                            <Col className="" xl="4" lg="6" md="6" sm="8" xs="8">
                              <Select
                                  className="react-select react-select-primary"
                                  classNamePrefix="react-select"
                                  name="singleSelect"
                                  value={singleSelect}
                                  onChange={value => setShipperSelect(value)}
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
                            <Col xl="1" lg="1" md="1" sm="1" xs="1">                                              
                              <a
                                aria-expanded={collapses.includes("shipper")}
                                className="collapsed"
                                data-parent="#accordion"
                                href="#pablo"
                                id="collapseOne"
                                onClick={e => {
                                  e.preventDefault();
                                  changeCollapse("shipper");
                                }}
                              >
                                <i className="nc-icon nc-minimal-down" />
                              </a>
                            </Col>
                          </Row>
                        </h5>
                      {/* </CardHeader> */}
                      <Collapse isOpen={collapses.includes("shipper")}>
                        {/* <CardBody> */}
                          <Row >
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Shipper Name</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Shipper Name"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Shipper Code</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Shipper Code"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Person in Charge</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Person in Charge"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Person in Charge</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Tel"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Person in Charge</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Email"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Person in Charge</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Fax"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Person in Charge</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Dept"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="12" lg="12" md="12" sm="12" xs="12">
                                {/* <label>Address</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Address"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="9" lg="9" md="9" sm="9" xs="9">
                                {/* <label>Address</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Payment"
                                  type="text"
                                />
                            </Col>
                          </Row>
                        {/* </CardBody> */}
                      </Collapse>
                    {/* </Card> */}
                  </FormGroup>                  

                  <FormGroup>                
                    <label><h3>Forwarder</h3></label>
                    {/* <Card className="no-transition"> */}
                      {/* <CardHeader className="card-collapse bg-white" id="headingTwo" role="tab"> */}
                        <h5 className="mb-0 panel-title">
                          <Row>
                            <Col className="" xl="4" lg="6" md="6" sm="8" xs="8">
                              <Select
                                  className="react-select react-select-primary"
                                  classNamePrefix="react-select"
                                  name="singleSelect"
                                  value={singleSelect}
                                  onChange={value => setForwarderSelect(value)}
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
                            <Col xl="1" lg="1" md="1" sm="1" xs="1">                                              
                              <a
                                aria-expanded={collapses.includes("forwarder")}
                                className="collapsed"
                                data-parent="#accordion"
                                href="#pablo"
                                id="collapseTwo"
                                onClick={e => {
                                  e.preventDefault();
                                  changeCollapse("forwarder");
                                }}
                              >
                                <i className="nc-icon nc-minimal-down" />
                              </a>
                            </Col>
                          </Row>
                        </h5>
                      {/* </CardHeader> */}
                      <Collapse isOpen={collapses.includes("forwarder")}>
                        {/* <CardBody> */}
                          <Row>
                          <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Shipper Name</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Forwarder Name"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Shipper Code</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Forwarder Code"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Person in Charge</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Person in Charge"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Person in Charge</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Tel"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Person in Charge</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Email"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Person in Charge</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Fax"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Person in Charge</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Dept"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="12" lg="12" md="12" sm="12" xs="12">
                                {/* <label>Address</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Address"
                                  type="text"
                                />
                            </Col>
                          </Row>
                        {/* </CardBody> */}
                      </Collapse>
                    {/* </Card> */}
                  </FormGroup>

                  <FormGroup>                
                    <label><h3>Consignee</h3></label>
                    {/* <Card className="no-transition"> */}
                      {/* <CardHeader className="card-collapse bg-white" id="headingTree" role="tab"> */}
                        <h5 className="mb-0 panel-title">
                          <Row>
                            <Col className="" xl="4" lg="6" md="6" sm="8" xs="8">
                              <Select
                                  className="react-select react-select-primary"
                                  classNamePrefix="react-select"
                                  name="singleSelect"
                                  value={singleSelect}
                                  onChange={value => setConsigneeSelect(value)}
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
                            <Col xl="1" lg="1" md="1" sm="1" xs="1">                                              
                              <a
                                aria-expanded={collapses.includes("consignee")}
                                className="collapsed"
                                data-parent="#accordion"
                                href="#pablo"
                                id="collapseThree"
                                onClick={e => {
                                  e.preventDefault();
                                  changeCollapse("consignee");
                                }}
                              >
                                <i className="nc-icon nc-minimal-down" />
                              </a>
                            </Col>
                          </Row>
                        </h5>
                      {/* </CardHeader> */}
                      <Collapse isOpen={collapses.includes("consignee")}>
                        {/* <CardBody> */}
                          <Row>
                          <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Shipper Name</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Consignee Name"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Shipper Code</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Consignee Code"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Person in Charge</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Person in Charge"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Person in Charge</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Tel"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Person in Charge</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Email"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Person in Charge</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Fax"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="3" lg="3" md="3" sm="4" xs="4">
                                {/* <label>Person in Charge</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Dept"
                                  type="text"
                                />
                            </Col>
                            <Col className="mt-3" xl="12" lg="12" md="12" sm="12" xs="12">
                                {/* <label>Address</label> */}
                                <Input
                                  className="border-input"
                                  placeholder="Address"
                                  type="text"
                                />
                            </Col>
                          </Row>
                        {/* </CardBody> */}
                      </Collapse>
                  </FormGroup>
                    {/* </Card> */}

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

                  <Button color="primary" onClick={() => clickCollapse("shipper")} active={rSelected === 1}>Collapse </Button>

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
