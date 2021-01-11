import React from "react";

// reactstrap components
import { Row,Col,Table, Button,Container ,Form,
    // Progress,
    FormGroup,Label,Input,InputGroup,InputGroupAddon,InputGroupText,Collapse} from "reactstrap";
import ReactDatetime from "react-datetime";
import Stepper from 'react-stepper-horizontal';

export default function Dashboard (props) {

    const [collapses1, setCollapses1] = React.useState(false);
    const host = window.location.href.split(window.location.pathname)[0];

    return(
        <div className="main">
            <div className="section">
                <Form>
                    <Container>
                        <Row>
                            <Col>
                                <h3 className="text-left mb-3">Booking DashBoard.</h3>
                            </Col>
                        </Row>
                        <Row>
                                    <Col xl="2" lg="2" className="col-12">
                                        <FormGroup className="mb-2">
                                            <Label for="carrier" className="mb-0" >Carrier</Label> 
                                            <Input type="select" name="carrier" id="carrier">
                                                <option>APL</option>
                                                <option>CMA</option>
                                                <option>KMD</option>
                                                <option>SKR</option>
                                                <option>ZIM</option>
                                            </Input>
                                        </FormGroup> 
                                    </Col>
                                    <Col xl="3" lg="3" className="col-12">
                                        <FormGroup className="mb-2">
                                            <Label className="mb-0">Req Booking No</Label> 
                                            <Input type="text" name="ReqBkNo" id="ReqBkNo"  />   
                                        </FormGroup>
                                    </Col>
                                    <Col xl="3" lg ="3" className="col-12">
                                        <FormGroup className="mb-2">
                                            <Label className="mb-0">Carrier Booking No</Label> 
                                            <Input type="text" name="carrierBkno" id="carrierBkno"  />   
                                        </FormGroup>
                                    </Col>
                                    <Col xl="3" lg="3" className="col-12">
                                        <Label className="mb-0">DATE</Label> 
                                        <FormGroup>
                                            <InputGroup className="date" id="datetimepicker">
                                                <ReactDatetime
                                                    inputProps={{
                                                    className: "form-control",
                                                    placeholder: "Datetime Picker Here",
                                                    }}
                                                    dateFormat="YYYY-MM-DD"
                                                    timeFormat={false}
                                                />
                                                <InputGroupAddon addonType="append">
                                                    <InputGroupText>
                                                        <span className="glyphicon glyphicon-calendar">
                                                            <i className="fa fa-calendar" />
                                                        </span>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col xl="1" lg ="1" className="col-12 text-right pr-0 pl-0">
                                        <FormGroup className="pt-3 mt-1 mb-2">
                                            <Button color="default">Search</Button>
                                        </FormGroup>
                                    </Col>
                        </Row>
                        <Row>
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th className="text-center">#</th>
                                    <th>CARRIER</th>
                                    <th>Req BkNo</th>
                                    <th>Carrier BkNo</th>
                                    <th>State Date</th>
                                    <th>ACTION</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr onClick={()=>setCollapses1(!collapses1)}>
                                    <td className="text-center">1</td>
                                    <td>CMA</td>
                                    <td>CMA20201201122</td>
                                    <td>CMA20201201122</td>
                                    <td>2020-12-01</td>
                                    <td>
                                        <Stepper steps={ [{title: 'Booking',href:host+'/booking'},
                                          {title: 'Send',href:host+'/bookinglist'},
                                          {title: 'Confirm',href:host+'/bookinglist'},
                                          {title: 'SR',href:host+'/srnew'},
                                          {title: 'BL',href:host+'/error-404'},
                                          {title: 'INVOICE',href:host+'/error-404'}] } 
                                            activeStep={1} 
                                            activeColor="#66615B"
                                            completeColor="#66615B"
                                            circleFontSize={1}
                                            size={20}
                                            titleFontSize={12}
                                            circleTop={0}
                                            />
                                    </td>
                                </tr>
                                <tr>
                                    <th className="p-0 border-top-0" colspan="6">
                                        <Collapse isOpen={collapses1}>
                                           <div>
                                               <Table>
                                                   <thead>
                                                       <tr>
                                                            <th>VOL</th>
                                                            <th>VOYAGE</th>
                                                            <th>POL</th>
                                                            <th>FINAL DISTINATION</th>
                                                            <th>ETD</th>
                                                            <th>20`</th>
                                                            <th>40`</th>
                                                            <th>40H`</th>
                                                       </tr>
                                                    </thead>
                                                    <tbody>
                                                       <tr>
                                                           <td>TIAN REN</td>
                                                           <td>1234W</td>
                                                           <td>INCHEON,KOREA REPUBLIC OF</td>
                                                           <td>TIANJINXINGANG,CHINA</td>
                                                           <td>2020-12-10</td>
                                                           <td>0</td>
                                                           <td>1</td>
                                                           <td>0</td>
                                                       </tr>
                                                   </tbody>
                                               </Table>
                                               
                                            </div>
                                        </Collapse>
                                    </th> 
                                </tr>
                                    
                               
                                <tr>
                                    <td className="text-center">2</td>
                                    <td>CMA</td>
                                    <td>CMA20201201123</td>
                                    <td>CMA20201201123</td>
                                    <td>2020-12-01</td>
                                    <td>
                                        <Stepper steps={ [{title: 'Booking',href:host+'/booking'},
                                          {title: 'Send',href:host+'/bookinglist'},
                                          {title: 'Confirm',href:host+'/bookinglist'},
                                          {title: 'SR',href:host+'/srnew'},
                                          {title: 'BL',href:host+'/error-404'},
                                          {title: 'INVOICE',href:host+'/error-404'}] } 
                                            activeStep={0} 
                                            activeColor="#66615B"
                                            completeColor="#66615B"
                                            circleFontSize={1}
                                            size={20}
                                            titleFontSize={12}
                                            circleTop={0}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">3</td>
                                    <td>ZIM</td>
                                    <td>ZIM20201201124</td>
                                    <td>ZIM20201201124</td>
                                    <td>2020-12-01</td>
                                    <td>
                                        <Stepper steps={ [{title: 'Booking',href:host+'/booking'},
                                          {title: 'Send',href:host+'/bookinglist'},
                                          {title: 'Confirm',href:host+'/bookinglist'},
                                          {title: 'SR',href:host+'/srnew'},
                                          {title: 'BL',href:host+'/error-404'},
                                          {title: 'INVOICE',href:host+'/error-404'}
                                          ] } 
                                            activeStep={2} 
                                            activeColor="#66615B"
                                            completeColor="#66615B"
                                            circleFontSize={1}
                                            size={20}
                                            titleFontSize={12}
                                            circleTop={0}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">4</td>
                                    <td>APL</td>
                                    <td>APL20201201124</td>
                                    <td>APL20201201124</td>
                                    <td>2020-12-01</td>
                                    <td>
                                        <Stepper steps={ [{title: 'Booking',href:host+'/booking'},
                                          {title: 'Send',href:host+'/bookinglist'},
                                          {title: 'Confirm',href:host+'/bookinglist'},
                                          {title: 'SR',href:host+'/srnew'},
                                          {title: 'BL',href:host+'/error-404'},
                                          {title: 'INVOICE',href:host+'/error-404'}] } 
                                            activeStep={5} 
                                            activeColor="#66615B"
                                            completeColor="#66615B"
                                            circleFontSize={1}
                                            size={20}
                                            titleFontSize={12}
                                            circleTop={0}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="6" className="text-center">
                                        <FormGroup className="pt-3 mt-1 mb-2">
                                            <Button color="default">more</Button>
                                        </FormGroup>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Row>
                    </Container>
                </Form>
            </div>
        </div>
    );
}