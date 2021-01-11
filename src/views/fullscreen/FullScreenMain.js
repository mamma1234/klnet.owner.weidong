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
// import ShortTemplate from './ShortTemplate.js';
import CarrierTemplate from './CarrierTemplate.js';
import ShipperTemplate from './ShipperTemplate.js';

// import mainEvent from './js/main.js';
// import $ from 'jquery';
// window.$ = window.jQuery = jQuery;
// const popTest = require('./index.html')
function AddressTest( props ) {    
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
                            <Row xl="4" lg="4">
                            {/* <Col xl="4" lg="4">
                                Template나눠서 개발하는 경우
                                <FullScreenDialog
                                    Template={BookingTemplate}
                                    title="부킹 TEMPLATE"/>
                                <BookingTemplate/>
                            </Col> */}
                            {/* <Col xl="4" lg="4">
                                Template 나누지 않고 개발하는 경우
                                <ScheduleTemplate/>
                                <BookingTemplate/>
                            </Col> */}
                            <Col xl="4" lg="4">
                                {/* 중요 내용만 보이는 경우 */}
                                {/* <ShortTemplate/> */}
                            </Col>
                            <Col xl="4" lg="4">
                                {/* 중요 내용만 보이는 경우 */}
                                <CarrierTemplate/>
                            </Col>
                            <Col xl="4" lg="4">
                                {/* 중요 내용만 보이는 경우 */}
                                <ShipperTemplate/>
                            </Col>
                            </Row>
                        </CardBody>
                    </Container>
                </Form>
            </div>
        </div>
    )
}

export default AddressTest;