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
  UncontrolledCollapse,
  ButtonGroup
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
  const setScheduleSelect = schedule => {
    console.log("collapses:", collapses);
    setCollapses(["schedule"]);
    setSingleSelect(schedule);
  }
  const setTransportSelect = transport => {
    console.log("collapses:", collapses);
    setCollapses(["transport"]);
    setSingleSelect(transport);
  }
  const setContainerSelect = container => {
    console.log("collapses:", collapses);
    setCollapses(["container"]);
    setSingleSelect(container);
  }




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
                    <label><h3>Schedule</h3></label>
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
                                  onChange={value => setScheduleSelect(value)}
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
                                aria-expanded={collapses.includes("schedule")}
                                className="collapsed"
                                data-parent="#accordion"
                                href="#pablo"
                                id="collapseThree"
                                onClick={e => {
                                  e.preventDefault();
                                  changeCollapse("schedule");
                                }}
                              >
                                <i className="nc-icon nc-minimal-down" />
                              </a>
                            </Col>
                          </Row>
                        </h5>
                      {/* </CardHeader> */}
                      <Collapse isOpen={collapses.includes("schedule")}>
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


                  <FormGroup>                
                    <label><h3>Container</h3></label>
                      {/* <CardHeader  id="headingOne" role="tab"> */}
                        <h5 className="mb-0 panel-title">
                          <Row>
                            <Col className="" xl="4" lg="6" md="6" sm="8" xs="8">
                              <Select
                                  className="react-select react-select-primary"
                                  classNamePrefix="react-select"
                                  name="singleSelect"
                                  value={singleSelect}
                                  onChange={value => setContainerSelect(value)}
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
                                aria-expanded={collapses.includes("container")}
                                className="collapsed"
                                data-parent="#accordion"
                                href="#pablo"
                                id="collapseZero"
                                onClick={e => {
                                  e.preventDefault();
                                  changeCollapse("container");
                                }}
                              >
                                <i className="nc-icon nc-minimal-down" />
                              </a>
                            </Col>
                          </Row>
                        </h5>
                      {/* </CardHeader> */}
                      <Collapse isOpen={collapses.includes("container")}>
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

                  <FormGroup>                
                    <label><h3>Transport</h3></label>
                      {/* <CardHeader  id="headingOne" role="tab"> */}
                        <h5 className="mb-0 panel-title">
                          <Row>
                            <Col className="" xl="4" lg="6" md="6" sm="8" xs="8">
                              <Select
                                  className="react-select react-select-primary"
                                  classNamePrefix="react-select"
                                  name="singleSelect"
                                  value={singleSelect}
                                  onChange={value => setTransportSelect(value)}
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
                                aria-expanded={collapses.includes("transport")}
                                className="collapsed"
                                data-parent="#accordion"
                                href="#pablo"
                                id="collapseZero"
                                onClick={e => {
                                  e.preventDefault();
                                  changeCollapse("transport");
                                }}
                              >
                                <i className="nc-icon nc-minimal-down" />
                              </a>
                            </Col>
                          </Row>
                        </h5>
                      {/* </CardHeader> */}
                      <Collapse isOpen={collapses.includes("transport")}>
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

                  {/* <div className="text-center">
                    <Button
                      className="btn-wd btn-round"
                      color="info"
                      type="submit"
                    >
                      Save
                    </Button>
                  </div> */}
                  <Row>
                    <Col className="" xl="4" lg="6" md="6" sm="8" xs="8">
                          <Button color="secondary" onClick={() => alert('save')} >Save</Button>         
                    </Col>
                    <Col xl="1" lg="1" md="1" sm="1" xs="1">
                          <Button color="secondary" onClick={() => alert('send')} >Send</Button>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col className="" xl="1" lg="1" md="1" sm="1" xs="1">
                      <ButtonGroup color="secondary" >
                          <Button onClick={() => alert('save')} >Save</Button>         
                          <Button onClick={() => alert('send')} >Send</Button>
                      </ButtonGroup>
                    </Col>
                  </Row> */}
                  <Row><Col>
                  <Button color="primary" onClick={() => setRSelected(1)} active={rSelected === 1}>One</Button>

                  <Button color="primary" onClick={() => clickCollapse("shipper")} active={rSelected === 1}>Collapse </Button>

                  <Button color="primary" onClick={() => clickUnCollapse(1)} active={rSelected === 1}>UnCollapse </Button>
                  </Col></Row>
                 

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
