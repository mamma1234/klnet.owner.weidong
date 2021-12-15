import React,{useState, useEffect} from "react";
import {Row, Col, CardBody, FormGroup, Label, Input} from "reactstrap";

function BookingTemplate(props) {
    

    useEffect(() => {
        console.log("렌더링 될 때마다 수행");
      },[props.vessel]);

    return(
        <Row>
            <Col xl="6" lg="6">
                <FormGroup>
                    <Label className="mb-0">BOOKING NO</Label> 
                    <Input type="text" 
                        name="contractNumber"
                        id="contractNumber"
                        placeholder="Enter Number..."
                        value={props.bkgNo}
                        onChange={(e)=>{props.setBkgNo(e.target.value)}}/>
                </FormGroup>                              
            </Col>
            <Col xl="6" lg="6">
                <FormGroup>
                    <Label className="mb-0">SERVICE TYPE</Label> 
                    <Input type="select" name="Team" id="Team" value={props.selector}
                    onChange={(e)=>{props.setSelector(e.target.value)}}>
                        <option>CY->CY</option>
                        <option>CY->CFS</option>
                        <option>CFS->CY</option>
                        <option>CFS->CFS</option>
                        <option>DOOR TO DOOR</option>
                        <option>OTHERS</option>
                        <option>CY->DOOR</option>
                        <option>CFS->DOOR</option>
                    </Input>  
            </FormGroup>                          
            </Col>
            <Col xl="6" lg="6">
                <FormGroup>
                    <Label className="mb-0">ORDER NO</Label> 
                    <Input type="text"
                        name="contractNumber"
                        id="contractNumber"
                        placeholder="Enter Number..."
                        value={props.orderNo}
                        onChange={(e)=>{props.setOrderNo(e.target.value)}}/>
            </FormGroup>                          
            </Col>
            <Col xl="6" lg="6">
                <FormGroup>
                    <Label className="mb-0">BKG DATE</Label> 
                    <Input type="text" 
                        name="contractNumber"
                        id="contractNumber"
                        placeholder="Enter Number..."
                        value={props.bkgDate}
                        onChange={(e)=>{props.setBkgDate(e.target.value)}}/>   
            </FormGroup>                          
            </Col>
            <Col xl="6" lg="6">
                <FormGroup>
                    <Label className="mb-0">VESSEL</Label> 
                    <Input type="text"
                        name="contractNumber"
                        id="contractNumber"
                        placeholder="Enter Number..."
                        value={props.vessel}
                        onChange={(e)=>{props.setVessel(e.target.value)}}/>
            </FormGroup>                          
            </Col>
            <Col xl="6" lg="6">
                <FormGroup>
                    <Label className="mb-0">VOYAGE</Label> 
                    <Input type="text"
                        name="contractNumber"
                        id="contractNumber"
                        placeholder="Enter Number..."
                        value={props.voyage}
                        onChange={(e)=>{props.setVoyage(e.target.value)}}/>
                </FormGroup>                          
            </Col>
            <Col xl="12" lg="12" sm="12">
                <Row>
                    <Col className="col-4" xl="6" lg="6">
                        <FormGroup>
                            <Label  className="mb-0">STATUS</Label> 
                            <Input type="text"
                                name="contractNumber"
                                id="contractNumber"
                                placeholder="Enter Number..."
                                value={props.status}
                                onChange={(e)=>{props.setStatus(e.target.value)}}/>
                        </FormGroup>
                    </Col>
                    <Col className="col-3" xl="6" lg="6">
                        <FormGroup>
                            <Label  className="mb-0">REMARK</Label> 
                            <Input type="text"
                                name="contractNumber"
                                id="contractNumber"
                                placeholder="Enter Number..."
                                value={props.remark}
                                onChange={(e)=>{props.setRemark(e.target.value)}}/>
                        </FormGroup>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default BookingTemplate;