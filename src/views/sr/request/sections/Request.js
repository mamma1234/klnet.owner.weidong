import React from "react";

// reactstrap components
import {
  Row,
  Col,
//   Table,
  Button,
  Container,
//   Form,
//   UncontrolledTooltip,
  FormGroup,
  Label,
  Input,
  Collapse,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
    import ReactDatetime from "react-datetime";


export default function NewBooking (props) {

    const [collapses, setCollapses] = React.useState([]);
    // const [classic, setClassic] = React.useState(false);
    // const [openPopUp,setOpenPopUp] = React.useState(false);
    // const [popUpTitle,setPopUpTitle] = React.useState(null);
    // const [popUpConText,setPopUpConText] = React.useState(null);
    
    const [cntrList,setCntrList] = React.useState([['1']]);
    // const [cargoList,setCargoList] = React.useState([['1']]);

    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [dropdownOpen2, setDropdownOpen2] = React.useState(false);
    const [dropdownOpen3, setDropdownOpen3] = React.useState(false);
    const [dropdownOpen4, setDropdownOpen4] = React.useState(false);
    const [dropdownOpen5, setDropdownOpen5] = React.useState(false);

    const toggle = () => setDropdownOpen(!dropdownOpen);
    const toggle2 = () => setDropdownOpen2(!dropdownOpen2);
    const toggle3 = () => setDropdownOpen3(!dropdownOpen3);
    const toggle4 = () => setDropdownOpen4(!dropdownOpen4);
    const toggle5 = () => setDropdownOpen5(!dropdownOpen5);

    const changeCollapse = (collapse) => {
      if (collapses.includes(collapse)) {
        setCollapses(collapses.filter((prop) => prop !== collapse));
      } else {
        setCollapses([...collapses, collapse]);
      }
    };

    const onAddCntr =() => {
        setCntrList([...cntrList,['2']]);
    }

    const onDelCntr =() => {
        if(cntrList.length > 1) {
            setCntrList(cntrList.slice(0,cntrList.length-1));
        }
    }

    // const onAddCargo =() => {
    //     setCargoList([...cargoList,['2']]);
    // }

    // const onDelCargo =() => {
    //     if(cargoList.length > 1) {
    //         setCargoList(cargoList.slice(0,cargoList.length-1));
    //     }
    // }

    return(
        <div className="main">
            <div className="section">
                    <Container>
                        <Row>
                            <Col>
                                <h3 className="text-left mb-3">SHIPPING REQUEST.</h3>
                            </Col>
                        </Row>
                        <Row className="text-right">
                            <Col>
                                <FormGroup>
                                    <Button
                                        className="mr-1"
                                        color="default"
                                        size="sm"
                                    >
                                    Favorite Load
                                    </Button>
                                    <Button //className="btn-move-right btn-round" 
                                    color="default"
                                    size="sm">
                                    Favorite Add 
                                    </Button>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col className="col-12" xl="12" lg="12" sm="12">
                                <h5 className="mb-0">General Details</h5>
                            </Col>
                            <Col className="col-12" xl="12" lg="12" sm="12">
                                <hr className="mt-0"/>
                            </Col>
                            <Col xl="3" lg="3">
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
                            <Col xl="3" lg="3">
                                <FormGroup className="mb-2">
                                    <Label className="mb-0">BOOKING NO{" "}</Label> 
                                    <Input type="text" name="scnumber" id="scnumber" placeholder="Enter Number..." />   
                                </FormGroup>                          
                            </Col>
                            <Col xl="3" lg="3">
                                <FormGroup className="mb-2">
                                    <Label className="mb-0">SERVICE CONTRACT NUMBER{" "}</Label> 
                                    <Input type="text" name="shipperBooking" id="shipperBooking" placeholder="Enter Number..." />   
                                </FormGroup>                          
                            </Col>
                            <Col xl="3" lg="3">
                                <FormGroup className="mb-2">
                                    <Label className="mb-0">SHIPPER REFERENCE NUMBER{" "}</Label> 
                                    <Input type="text" name="shipperBooking" id="shipperBooking" placeholder="Enter Number..." />   
                                </FormGroup>                          
                            </Col>
                            <Col xl="3" lg="3" className="col-12">
                                <FormGroup>
                                    <Label className="mb-0">Team</Label> 
                                    <Input type="select" name="Team" id="Team">
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
                            <Col xl="2" lg="2" className="col-12">
                                <FormGroup>
                                    <Label className="mb-0">B/L Type</Label>
                                    <Input className="pt-1 pb-1" type="text" placeholder="" />
                                </FormGroup>
                            </Col> 
                            <Col xl="2" lg="2" className="col-12">
                                <FormGroup>
                                    <Label className="mb-0">Ocean Freight</Label>
                                    <Input className="pt-1 pb-1" type="text" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xl="2" lg="2" className="col-12">
                                <FormGroup>
                                    <Label className="mb-0">House B/L 유무</Label>
                                    <Input className="pt-1 pb-1" type="text" placeholder="" />
                                </FormGroup>
                            </Col> 
                            <Col xl="3" lg="3" className="col-12">
                                <Label className="mb-0">PICK UP DATE</Label> 
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
                        </Row>
                        <Row>
                            <Col className="col-12" xl="12" lg="12" sm="12">
                                <Row>
                                    <Col xl="1" className="col-2 pr-0">
                                        <h5 className="mb-1">Shipper</h5>
                                    </Col>
                                    <Col xl="2" className="col-4 text-left">
                                        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                                            <DropdownToggle caret size="sm" className="p-0">
                                                Group Dropdown
                                            </DropdownToggle>
                                            <DropdownMenu className="mt-0">
                                                <DropdownItem className="p-1 rounded-0">Group1</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem className="p-1 rounded-0">Group Add</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown> 
                                    </Col>
                                    <Col xl="9" className="col-6 text-right" onClick={(e) => {
                                            e.preventDefault();
                                            changeCollapse(1);
                                            }}>
                                        <a 
                                            aria-expanded={collapses.includes(1)}
                                            className="collapsed"
                                            data-parent="#accordion"
                                            href="#pablo"
                                            id="collapseOne"
                                            
                                        >
                                        <i className="nc-icon nc-minimal-down" />
                                        </a>
                                    </Col>
                                </Row>   
                            </Col>
                            <Col className="col-12" xl="12" lg="12" sm="12">
                                <hr className="mt-0"/>
                            </Col>
                        </Row>
                        <Collapse isOpen={collapses.includes(1)}>
                            <Row>
                                <Col xl="4" lg="4">
                                    <FormGroup>
                                        <Label className="mb-0">Name</Label>
                                        <Input
                                            className="pt-1 pb-1"
                                            defaultValue=""
                                            placeholder="Name"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col xl="4" lg="4">
                                    <FormGroup>
                                        <Label className="mb-0">PIC</Label>
                                        <Input
                                            className="pt-1 pb-1"
                                            defaultValue=""
                                            placeholder="PIC"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col xl="4" lg="4">
                                    <FormGroup>
                                        <Label className="mb-0">TEL</Label>
                                        <Input
                                            className="pt-1 pb-1"
                                            defaultValue=""
                                            placeholder="tel"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col xl="4" lg="4">
                                    <FormGroup>
                                        <Label className="mb-0">VAT</Label>
                                        <Input
                                            className="pt-1 pb-1"
                                            defaultValue=""
                                            placeholder="vat"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col xl="5" lg="5">
                                    <FormGroup>
                                        <Label className="mb-0">Address</Label>
                                        <Input
                                            className="pt-1 pb-1"
                                            defaultValue=""
                                            placeholder="Address"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Collapse>
                        <Row>
                            <Col className="col-12" xl="12" lg="12" sm="12">
                                <Row>
                                    <Col xl="1" className="col-2">
                                        <h5 className="mb-1">Consignee</h5>
                                    </Col>
                                    <Col xl="2" className="col-4 text-left pr-0 pl-4">
                                        <ButtonDropdown isOpen={dropdownOpen2} toggle={toggle2}>
                                            <DropdownToggle caret size="sm" className="p-0">
                                                Group Dropdown
                                            </DropdownToggle>
                                            <DropdownMenu className="mt-0">
                                                <DropdownItem className="p-1 rounded-0">Group1</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem className="p-1 rounded-0">Group Add</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown> 
                                    </Col>
                                    <Col xl="9" className="col-6 text-right" onClick={(e) => {
                                            e.preventDefault();
                                            changeCollapse(2);
                                            }}>
                                        <a 
                                            aria-expanded={collapses.includes(2)}
                                            className="collapsed"
                                            data-parent="#accordion"
                                            href="#pablo"
                                            id="collapseOne"
                                            
                                        >
                                        <i className="nc-icon nc-minimal-down" />
                                        </a>
                                    </Col>
                                </Row>   
                            </Col>
                            <Col className="col-12" xl="12" lg="12" sm="12">
                                <hr className="mt-0"/>
                            </Col>
                        </Row>
                        <Collapse isOpen={collapses.includes(2)}>
                        <Row>
                            <Col xl="4" lg="4">
                                                    <FormGroup>
                                                        <Label className="mb-0">Name</Label>
                                                        <Input
                                                            className="pt-1 pb-1"
                                                            defaultValue=""
                                                            placeholder="Name"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                            </Col>
                            <Col xl="4" lg="4">
                                                    <FormGroup>
                                                        <Label className="mb-0">PIC</Label>
                                                        <Input
                                                            className="pt-1 pb-1"
                                                            defaultValue=""
                                                            placeholder="PIC"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                            </Col>
                            <Col xl="4" lg="4">
                                                    <FormGroup>
                                                        <Label className="mb-0">TEL</Label>
                                                        <Input
                                                            className="pt-1 pb-1"
                                                            defaultValue=""
                                                            placeholder="tel"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                            </Col>
                            <Col xl="4" lg="4">
                                                    <FormGroup>
                                                        <Label className="mb-0">USCI</Label>
                                                        <Input
                                                            className="pt-1 pb-1"
                                                            defaultValue=""
                                                            placeholder="usci"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                            </Col>
                            <Col xl="5" lg="5">
                                <FormGroup>
                                    <Label className="mb-0">Address</Label>
                                    <Input
                                        className="pt-1 pb-1"
                                        defaultValue=""
                                        placeholder="Address"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                            </Row>
                        </Collapse>
                        <Row>
                            <Col className="col-12" xl="12" lg="12" sm="12">
                                <Row>
                                    <Col xl="2" className="col-3 pr-0">
                                        <h5 className="mb-1">Notify Party</h5>
                                    </Col>
                                    <Col xl="2" className="col-4 text-left">
                                        <ButtonDropdown isOpen={dropdownOpen3} toggle={toggle3}>
                                            <DropdownToggle caret size="sm" className="p-0">
                                                Group Dropdown
                                            </DropdownToggle>
                                            <DropdownMenu className="mt-0">
                                                <DropdownItem className="p-1 rounded-0">Group1</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem className="p-1 rounded-0">Group Add</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown> 
                                    </Col>
                                    <Col xl="8" className="col-5 text-right" onClick={(e) => {
                                            e.preventDefault();
                                            changeCollapse(3);
                                            }}>
                                        <a 
                                            aria-expanded={collapses.includes(3)}
                                            className="collapsed"
                                            data-parent="#accordion"
                                            href="#pablo"
                                            id="collapseOne"
                                            
                                        >
                                        <i className="nc-icon nc-minimal-down" />
                                        </a>
                                    </Col>
                                </Row>   
                            </Col>
                            <Col className="col-12" xl="12" lg="12" sm="12">
                                <hr className="mt-0"/>
                            </Col>
                        </Row>
                        <Collapse isOpen={collapses.includes(3)}>
                        <Row>
                            <Col xl="4" lg="4">
                                                    <FormGroup>
                                                        <Label className="mb-0">Name</Label>
                                                        <Input
                                                            className="pt-1 pb-1"
                                                            defaultValue=""
                                                            placeholder="Name"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                            </Col>
                            <Col xl="4" lg="4">
                                                    <FormGroup>
                                                        <Label className="mb-0">PIC</Label>
                                                        <Input
                                                            className="pt-1 pb-1"
                                                            defaultValue=""
                                                            placeholder="PIC"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                            </Col>
                            <Col xl="4" lg="4">
                                                    <FormGroup>
                                                        <Label className="mb-0">TEL</Label>
                                                        <Input
                                                            className="pt-1 pb-1"
                                                            defaultValue=""
                                                            placeholder="tel"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                            </Col>
                            <Col xl="4" lg="4">
                                <FormGroup>
                                    <Label className="mb-0">USCI</Label>
                                    <Input
                                        className="pt-1 pb-1"
                                        defaultValue=""
                                        placeholder="usci"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                            <Col xl="5" lg="5">
                                <FormGroup>
                                    <Label className="mb-0">Address</Label>
                                    <Input
                                        className="pt-1 pb-1"
                                        defaultValue=""
                                        placeholder="Address"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                            </Row>
                        </Collapse>
                        <Row>
                            <Col xl="1" className="col-2 pr-0">
                                        <h5 className="mb-1">Transport</h5>
                            </Col>
                            <Col xl="2" className="col-4 text-left">
                                        <ButtonDropdown isOpen={dropdownOpen4} toggle={toggle4}>
                                            <DropdownToggle caret size="sm" className="p-0">
                                                Group Dropdown
                                            </DropdownToggle>
                                            <DropdownMenu className="mt-0">
                                                <DropdownItem className="p-1 rounded-0">Group1</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem className="p-1 rounded-0">Group Add</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown> 
                            </Col>
                            <Col xl="9" className="col-6 text-right" onClick={(e) => {
                                            e.preventDefault();
                                            changeCollapse(4);
                                            }}>
                                        <a 
                                            aria-expanded={collapses.includes(4)}
                                            className="collapsed"
                                            data-parent="#accordion"
                                            href="#pablo"
                                            id="collapse2"
                                            
                                        >
                                        <i className="nc-icon nc-minimal-down" />
                                        </a>
                            </Col>
                            <Col className="col-12" xl="12" lg="12" sm="12">
                                <hr className="mt-0"/>
                            </Col>
                        </Row>
                        <Collapse isOpen={collapses.includes(4)}>
                            <Row>
                                <Col xl="3" lg="3">
                                        <FormGroup>
                                            <Label className="mb-0">Vessel</Label> 
                                            <Input type="text" name="vessel" id="vessel" placeholder="" />
                                        </FormGroup>                              
                                </Col>
                                <Col xl="2" lg="2">
                                    <FormGroup> 
                                            <Label className="mb-0">VOYAGE</Label> 
                                            <Input type="text" name="voyage" id="voyage" placeholder="" />
                                    </FormGroup>                        
                                </Col>
                                <Col xl="4" lg="4">
                                    <FormGroup>
                                            <Label className="mb-0">Place of B/L Issue</Label> 
                                            <Input type="text" name="pobi" id="pobi" placeholder="" />
                                    </FormGroup>                        
                                </Col>
                                <Col xl="4" lg="4">
                                    <FormGroup>
                                            <Label className="mb-0">Place of Receipt</Label>
                                            <Row>
                                                <Col xl="4" className="col-3 pr-1">
                                                <Input type="text" name="porCode" id="porCode" placeholder="" />
                                                </Col>
                                                <Col xl="8" className="col-9 pl-1">
                                                <Input type="text" name="porName" id="porName" placeholder="" />
                                                </Col>
                                            </Row>
                                    </FormGroup>                        
                                </Col>
                                <Col xl="4" lg="4">
                                    <FormGroup>
                                            <Label className="mb-0">Port of Loading</Label>
                                            <Row>
                                                <Col xl="4" className="col-3 pr-1">
                                                <Input type="text" name="polCode" id="polCode" placeholder="" />
                                                </Col>
                                                <Col xl="8" className="col-9 pl-1">
                                                <Input type="text" name="polName" id="polName" placeholder="" />
                                                </Col>
                                            </Row> 
                                    </FormGroup>                        
                                </Col>
                                <Col xl="4" lg="4">
                                    <FormGroup>
                                            <Label className="mb-0">Port of Discharge</Label>
                                            <Row>
                                                <Col xl="4" className="col-3 pr-1">
                                                <Input type="text" name="podCode" id="podCode" placeholder="" />
                                                </Col>
                                                <Col xl="8" className="col-9 pl-1">
                                                <Input type="text" name="podName" id="podName" placeholder="" />
                                                </Col>
                                            </Row> 
                                    </FormGroup>                        
                                </Col>
                                <Col xl="4" lg="4">
                                    <FormGroup>
                                            <Label className="mb-0">Port of Delivery</Label>
                                            <Row>
                                                <Col xl="4" className="col-3 pr-1">
                                                <Input type="text" name="polCode" id="polCode" placeholder="" />
                                                </Col>
                                                <Col xl="8" className="col-9 pl-1">
                                                <Input type="text" name="polName" id="polName" placeholder="" />
                                                </Col>
                                            </Row> 
                                    </FormGroup>                        
                                </Col>
                                <Col xl="4" lg="4">
                                    <FormGroup>
                                            <Label className="mb-0">Final Destination(For Merchant Redference)</Label>
                                            <Row>
                                                <Col xl="4" className="col-3 pr-1">
                                                <Input type="text" name="finalCode" id="finalCode" placeholder="" />
                                                </Col>
                                                <Col xl="8" className="col-9 pl-1">
                                                <Input type="text" name="finalName" id="finalName" placeholder="" />
                                                </Col>
                                            </Row> 
                                    </FormGroup>                        
                                </Col>

                            </Row>
                        </Collapse> 
                        <Row>
                            <Col xl="2" className="col-4 pr-0">
                                <h5 className="mb-1">Cargo & Container</h5>
                            </Col>
                            <Col xl="2" className="col-4 text-left">
                                        <ButtonDropdown isOpen={dropdownOpen5} toggle={toggle5}>
                                            <DropdownToggle caret size="sm" className="p-0">
                                                Group Dropdown
                                            </DropdownToggle>
                                            <DropdownMenu className="mt-0">
                                                <DropdownItem className="p-1 rounded-0">Group1</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem className="p-1 rounded-0">Group Add</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown> 
                            </Col>
                            <Col xl="8" className="col-4 text-right" onClick={(e) => {
                                            e.preventDefault();
                                            changeCollapse(5);
                                            }}>
                                        <a 
                                            aria-expanded={collapses.includes(5)}
                                            className="collapsed"
                                            data-parent="#accordion"
                                            href="#pablo"
                                            id="collapse4"
                                            
                                        >
                                        <i className="nc-icon nc-minimal-down" />
                                        </a>
                            </Col>
                            <Col className="col-12" xl="12" lg="12" sm="12">
                                <hr className="mt-0"/>
                            </Col>
                        </Row>
                        <Collapse isOpen={collapses.includes(5)}>
                        <Row>
                            <Col className="col-12" xl="12" lg="12" sm="12">
                                    <h5 className="mb-3">Cargo</h5>
                            </Col>
                            <Col className="col-4" xl="3" lg="3">
                                <FormGroup>
                                    <Label  className="mb-0">대표 HS CODE</Label> 
                                    <Input type="text" name="totHscode" id="totHscode" placeholder="hscode" />   
                                </FormGroup>
                            </Col>
                            <Col className="col-3" xl="2" lg="2">
                                <FormGroup>
                                    <Label  className="mb-0">Total Package</Label> 
                                    <Input type="text" name="totPackage" id="totPackage" placeholder="" />   
                                </FormGroup>
                            </Col>
                            <Col className="col-3" xl="2" lg="2">
                                <FormGroup>
                                    <Label  className="mb-0">Total Measure</Label> 
                                    <Input type="text" name="totMeasure" id="totMeasure" placeholder="" /> 
                                </FormGroup>
                            </Col>
                            <Col className="col-3" xl="2" lg="2">
                                <FormGroup>
                                    <Label  className="mb-0">Total Gross Weight</Label> 
                                    <Input type="text" name="totWeight" id="totWeight" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12" className="col-12">
                                <Row>
                                    <Col className="col-2 text-left" xl="2" lg="2">
                                    <h5 className="mb-1">Container</h5>
                                    </Col>
                                    <Col className="col-10 text-right" xl="10" lg="10">
                                            <Button
                                                className="p-0 mr-1"
                                                color="default"
                                                size="sm"
                                            >Excel Upload
                                            </Button>
                                            <Button
                                                className="p-0 mr-1"
                                                color="default"
                                                outline
                                                size="sm"
                                                onClick={onAddCntr}
                                            >
                                            <i className="fa fa-plus" />
                                            </Button>
                                            <Button
                                                className="p-0"
                                                color="default"
                                                size="sm"
                                                outline
                                                onClick={onDelCntr}
                                            >
                                            <i className="fa fa-minus" />
                                            </Button>
                                    </Col>
                                </Row>
                            </Col>
                            
                            <Col className="col-12" xl="12" lg="12">
                                <ui className="list-group list-group-flush">
                                    {cntrList.map((data,index,key) =>
                                    <li className="list-group-item pt-2">
                                        <Row>
                                            <Col className="col-0 pt-3 mt-3 text-center" xl="0">{index+1}.
                                            </Col>
                                            <Col className="col-4" xl="3">
                                                <FormGroup>
                                                    <Label className="mb-0">Container No</Label> 
                                                    <Input type="text" name="cntrNo" id="cntrNo" placeholder="Enter Number..." />
                                                </FormGroup>
                                            </Col>
                                            <Col xl="2">
                                                <FormGroup>
                                                <Label className="mb-0">Size/Type</Label> 
                                                <Input className="pl-1" type="select" name="carrier" id="carrier">
                                                    <option>20`DRY</option>
                                                    <option>40`DRY</option>
                                                    <option>40`HQ</option>
                                                    <option>20`REEFER</option>
                                                    <option>40`REEFER</option>
                                                    <option>40`HIGH REEFER</option>
                                                    <option>20`OPEN TOP</option>
                                                    <option>40`OPEN TOP</option>
                                                    <option>20`FLAT RACK</option>
                                                    <option>40`FLAT RACK</option>
                                                    <option>20`TANK</option>
                                                    <option>40`TANK</option>
                                                </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col className="col-4" xl="2">
                                                <FormGroup>
                                                    <Label className="mb-0">Seal No</Label> 
                                                    <Input type="text" name="sealNo" id="sealNo" placeholder="" />
                                                </FormGroup>
                                            </Col>
                                            <Col className="col-4" xl="2">
                                                <FormGroup>
                                                    <Label className="mb-0">Weight</Label> 
                                                    <Input type="text" name="weight" id="weight" placeholder="0" />
                                                </FormGroup>
                                            </Col>
                                            <Col className="col-4" xl="2">
                                                <FormGroup>
                                                    <Label className="mb-0">Volume</Label> 
                                                    <Input type="text" name="volume" id="volume" placeholder="" />
                                                </FormGroup>
                                            </Col>
                                            <Col className="col-4" xl="2">
                                                <FormGroup>
                                                    <Label className="mb-0">Packing Type</Label> 
                                                    <Input type="text" name="pType" id="pType" placeholder="" />
                                                </FormGroup>
                                            </Col>
                                            <Col className="col-4" xl="2">
                                                <FormGroup>
                                                    <Label className="mb-0">No of Packing</Label> 
                                                    <Input type="text" name="noPack" id="noPack" placeholder="0" />
                                                </FormGroup>
                                            </Col>
                                            <Col className="col-4" xl="2">
                                                <FormGroup>
                                                    <Label className="mb-0">HS CODE</Label> 
                                                    <Input type="text" name="hscode" id="hscode" placeholder="" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </li>)}
                                </ui>             
                            </Col>
                        </Row>
                        </Collapse>  
                        <Row>
                            <Col xl="6">
                                <Label className="mb-0">Mark & No</Label>
                                <Input
                                    className="border-input"
                                    placeholder="This is a textarea with border. Here can be your nice text"
                                    rows="4"
                                    type="textarea"
                                />
                            </Col>
                            <Col xl="6">
                                <Label className="mb-0">Cargo Description</Label>
                                <Input
                                    className="border-input"
                                    placeholder="This is a textarea with border. Here can be your nice text"
                                    rows="4"
                                    type="textarea"
                                />
                            </Col>                           
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label className="mb-0">IMDG</Label> 
                                    <Input type="text" name="imdg" id="imdg" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className="mb-0">UN NUMBER</Label> 
                                    <Input type="text" name="unNum" id="unNum" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className="mb-0">면장번호</Label> 
                                    <Input type="text" name="mNum" id="mNum" placeholder="" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="pt-2 text-right">
                            <Col>
                                <FormGroup>
                                    <Button className="btn-magnify mr-1" color="default">
                                    Save As
                                    </Button>
                                    <Button className="btn-magnify mr-1" color="default">
                                    Send
                                    </Button>
                                    <Button className="btn-magnify mr-1" color="default">
                                    Close
                                    </Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Container>
            </div>
        </div>
    );
}