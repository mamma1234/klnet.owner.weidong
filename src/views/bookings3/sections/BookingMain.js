import React from "react";
import {
  Row,
  Col,
//   Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  FormGroup,
  UncontrolledDropdown,
  ButtonGroup,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import BookingTemplate from './BookingTemplate.js';
import ScheduleTemplate from './ScheduleTemplate.js';
import CarrierTemplate from './CarrierTemplate.js';
import ShipperTemplate from './ShipperTemplate.js';
import DocumentTemplate from "./DocumentTemplate.js";
import ForwarderTemplate from "./ForwarderTemplate.js";
import ConsigneeTemplate from "./ConsigneeTemplate.js";
import TranslateTemplate from "./TransTemplate.js";
import CargoTemplate from "./CargoTemplate.js";
import ContainerTemplate from "./ContainerTemplate.js";
import SpecialTemplate from "./SpecialTemplate.js";
import './Booking.css';
import 'assets/css/App.css';
// import mainEvent from './js/main.js';
// import $ from 'jquery';
// window.$ = window.jQuery = jQuery;
// const popTest = require('./index.html')
function BookingMain( props ) {    
    return (
        <div className="main">
            <div className="section">
                <Form className="mt-2">
                    <Container>
                        <CardHeader className="bg-white">
                            <FormGroup>
                                <UncontrolledDropdown>
                                    <ButtonGroup style={{ width: '100%' }}>
                                         <DropdownToggle
                                            aria-expanded={true}
                                            aria-haspopup={true}
                                            caret={true}
                                            className="dropdown-toggle-split"
                                            color="primary"
                                            data-toggle="dropdown"
                                            type="button">
                                            <span>FAVORITE BOOKING</span>
                                            <span className="sr-only">Toggle Dropdown</span>
                                        </DropdownToggle>
                                    </ButtonGroup>
                                    <DropdownMenu style={{ width: '100%' }} aria-labelledby="dropdownMenuButton">
                                        <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                                            KRPUS to CHCNN
                                    </DropdownItem>
                                        <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                                            My Booking1
                                    </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>
                        </CardHeader>
                        <CardBody className="pt-2 pb-2 bg-white">
                            <Row>
                                <Col xl="4" lg="6">
                                    <BookingTemplate/>
                                </Col>
                                <Col xl="4" lg="6">
                                    <ScheduleTemplate/>
                                </Col>
                                <Col xl="4" lg="6">
                                    <DocumentTemplate/>
                                </Col>
                                <Col xl="4" lg="6">
                                    <ShipperTemplate/>
                                </Col>
                                <Col xl="4" lg="6">
                                    <ForwarderTemplate/>
                                </Col>
                                <Col xl="4" lg="6">
                                    <ConsigneeTemplate/>
                                </Col>
                                <Col xl="4" lg="6">
                                    <CarrierTemplate/>
                                </Col>
                                <Col xl="4" lg="6">
                                    <CargoTemplate/>
                                </Col>
                                <Col xl="4" lg="6">
                                    <TranslateTemplate/>
                                </Col>
                                <Col xl="6" lg="12">
                                    <ContainerTemplate/>
                                </Col>
                                <Col xl="6" lg="12">
                                    <SpecialTemplate/>
                                </Col>
                            </Row>
                        </CardBody>
                    </Container>
                </Form>
            </div>
        </div>
    )
}

export default BookingMain;