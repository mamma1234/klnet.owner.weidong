import React from "react";

// reactstrap components
import {
  Row,
  Col,
//   Card,
//   CardImg,
//   CardText,
//   CardBody,
//   CardHeader,
//   CardTitle,
//   CardSubtitle,
  Button,
  Container,
  Form,
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
import ModalForm from "views/bookings/bookingReq/sections/CustomModal.js";
// import CheckTable from "views/bookings/bookingReq/sections/CustomCheckTable.js";


export default function NewBooking (props) {

    const [collapses, setCollapses] = React.useState([]);
    const [classic, setClassic] = React.useState(false);
    const [openPopUp,setOpenPopUp] = React.useState(false);
    const [popUpTitle,setPopUpTitle] = React.useState(null);
    const [popUpConText,setPopUpConText] = React.useState(null);
    
    const [cntrList,setCntrList] = React.useState([['1']]);
    const [cargoList,setCargoList] = React.useState([['1']]);

    const [dropdownOpen1, setDropdownOpen1] = React.useState(false);
    const [dropdownOpen2, setDropdownOpen2] = React.useState(false);
    const [dropdownOpen3, setDropdownOpen3] = React.useState(false);
    const [dropdownOpen4, setDropdownOpen4] = React.useState(false);
    const [dropdownOpen5, setDropdownOpen5] = React.useState(false);
    const [dropdownOpen6, setDropdownOpen6] = React.useState(false);
    const [dropdownOpen7, setDropdownOpen7] = React.useState(false);

    const [fabtnName,setFabtnName] = React.useState("Favorite Load");

    const [fabtn1,setFabtn1] = React.useState("Group DropDown");
    const [fabtn2,setFabtn2] = React.useState("Group DropDown");
    const [fabtn3,setFabtn3] = React.useState("Group DropDown");
    const [fabtn4,setFabtn4] = React.useState("Group DropDown");
    const [fabtn5,setFabtn5] = React.useState("Group DropDown");
    const [fabtn6,setFabtn6] = React.useState("Group DropDown");

    const changeCollapse = (collapse) => {
      if (collapses.includes(collapse)) {
        setCollapses(collapses.filter((prop) => prop !== collapse));
      } else {
        setCollapses([...collapses, collapse]);
      }
    };

    // const onOpenScPopUp = () => {
    //     setOpenPopUp(true);
    //     setPopUpTitle("SC NUMBER FAVORITE LIST");
    //     setPopUpConText(
    //             <div>
    //                <CheckTable
    //                 tableHeader={["CHECK","SC NUMBER","COM NAME"]}
    //                 tableDetail={[["","123123ABSASA","위동-삼성전자"],["","MSCDU123","MSC-LG화학"]]}/>
    //             </div>
    //     );
    // }

    // const onOpenPartPopUp = () => {
    //     setOpenPopUp(true);
    //     setPopUpTitle("PART FAVORITE LIST");
    //     setPopUpConText(
    //             <div>
    //                <CheckTable
    //                 tableHeader={["CHECK","NAME","PIC","PHONE","E-MAIL","ADDRESS"]}
    //                 tableDetail={[["","SAMSUNG","LEE","010-1234-1234","abc@email.com","SEOUL"],
    //                             ["","LG","PSD","010-5678-5678","abc@email.com","BUSAN"],
    //                             ["","SK","GLEE","010-3211-4321","abc@email.com","SEOUL"]]}/>
    //             </div>
    //     );
    // }

    // const onOpenTruckPopUp = () => {
    //     setOpenPopUp(true);
    //     setPopUpTitle("TRUCKER FAVORITE LIST");
    //     setPopUpConText(
    //             <div>
    //                <CheckTable
    //                 tableHeader={["CHECK","운송구분","운송사명","담당자","PHONE","ADDRESS"]}
    //                 tableDetail={[["","자가","운송사1","홍길동1","010-1234-1234","서울시"],
    //                             ["","라인","운송사2","홍길동2","010-5678-5678","경기도"],
    //                             ["","자가","운송사3","홍길동3","010-3211-4321","부산"]]}/>
    //             </div>
    //     );
    // }

    const onOpenSpPopUp = () => {
        setOpenPopUp(true);
        setPopUpTitle("Special Container Check Info");
        setPopUpConText(
                <>
                   <Row>
                       <Col><h5 className="text-left">OOG</h5></Col>
                       <Col>
                            <Row>
                                <Col><Label>길이</Label></Col>
                                <Col><Input type="text" name="length" id="length" placeholder="CM" /></Col>
                            </Row>
                            <Row>
                                <Col><Label>너비</Label></Col>
                                <Col><Input type="text" name="width" id="width" placeholder="CM" /></Col>
                            </Row>
                            <Row>
                                <Col><Label>높이</Label></Col>
                                <Col><Input type="text" name="height" id="height" placeholder="CM" /></Col>
                            </Row>
                       </Col>
                   </Row>
                </>
        );
    }

    const onAddCntr =() => {
        setCntrList([...cntrList,['2']]);
    }

    const onDelCntr =() => {
        if(cntrList.length > 1) {
            setCntrList(cntrList.slice(0,cntrList.length-1));
        }
    }

    const onAddCargo =() => {
        setCargoList([...cargoList,['2']]);
    }

    const onDelCargo =() => {
        if(cargoList.length > 1) {
            setCargoList(cargoList.slice(0,cargoList.length-1));
        }
    }

    

    return(
        <div className="main" id="General">
            <div className="section">
            <Form>
                <Container>
                    <Row id="Shipper">
                        <Col>
                            <h3 className="text-left mb-3">Create Booking Request</h3>
                        </Col>
                    </Row>
                    <Row className="text-right" >
                            <Col>
                                <FormGroup>
                                    <ButtonDropdown isOpen={dropdownOpen1} toggle={()=>setDropdownOpen1(!dropdownOpen1)}>
                                            <DropdownToggle caret size="sm" className="p-1 mr-1">
                                            {fabtnName}
                                            </DropdownToggle>
                                            <DropdownMenu className="mt-0">
                                                <DropdownItem className="p-1 rounded-0" onClick={()=>setFabtnName("Group1")}>Group1</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem className="p-1 rounded-0">Group Add</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
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
                        <Col xl="4" lg="4" md="4">
                            <FormGroup className="mb-2">
                                <Label for="carrier" className="mb-0" >Carrier/Booking Agent</Label> 
                                <Input type="select" name="carrier" id="carrier">
                                    <option>APL</option>
                                    <option>CMA</option>
                                    <option>KMD</option>
                                    <option>SKR</option>
                                    <option>ZIM</option>
                                </Input>
                            </FormGroup>                              
                        </Col>
                        <Col xl="4" lg="4" md="4">
                            <FormGroup className="mb-2">
                                <Label className="mb-0">SC NUMBER{" "}</Label> 
                                <Input type="text" name="scnumber" id="scnumber" placeholder="Enter Number..." />   
                            </FormGroup>                          
                        </Col>
                        <Col xl="4" lg="4" md="4">
                            <FormGroup className="mb-2">
                                <Label className="mb-0">Shipper Booking Number{" "}</Label> 
                                <Input type="text" name="shipperBooking" id="shipperBooking" placeholder="Enter Number..." />   
                            </FormGroup>                          
                        </Col> 
                    </Row>
                    <Row id="Forwarder">
                        <Col className="col-12" xl="12" lg="12" sm="12">
                            <Row>
                                <Col xl="2" lg="2" md="2" className="col-2 pr-0">
                                    <h5 className="mb-1">Shipper</h5>
                                </Col>
                                <Col xl="2" lg="2" md="2" className="col-2 text-left">
                                    <ButtonDropdown isOpen={dropdownOpen2} toggle={()=>setDropdownOpen2(!dropdownOpen2)}>
                                        <DropdownToggle caret size="sm" className="p-0">
                                            {fabtn1}
                                        </DropdownToggle>
                                        <DropdownMenu className="mt-0">
                                            <DropdownItem className="p-1 rounded-0" onClick={()=>{setFabtn1("Group1");setCollapses([1]);}}>Group1</DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem className="p-1 rounded-0">Group Add</DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown> 
                                </Col>
                                <Col xl="8" lg="8" md="8" className="col-8 text-right" onClick={(e) => {
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
                        <Col xl="4" lg="4" md="4">
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
                        <Col xl="4" lg="4" md="4">
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
                        <Col xl="4" lg="4" md="4">
                                                <FormGroup>
                                                    <Label className="mb-0">Phone</Label>
                                                    <Input
                                                        className="pt-1 pb-1"
                                                        defaultValue=""
                                                        placeholder="Phone"
                                                        type="text"
                                                    />
                                                </FormGroup>
                        </Col>
                        <Col xl="4" lg="4" md="4">
                                                <FormGroup>
                                                    <Label className="mb-0">Email</Label>
                                                    <Input
                                                        className="pt-1 pb-1"
                                                        defaultValue=""
                                                        placeholder="Email"
                                                        type="text"
                                                    />
                                                </FormGroup>
                        </Col>
                        <Col xl="5" lg="5" md="5">
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
                                <Col xl="4" lg="4" md="5" className="col-6 pr-0">
                                    <h5 className="mb-1">Forwarder(Booking Company)</h5>
                                </Col>
                                <Col xl="2" lg="2" md="2" className="col-2 text-left">
                                    <ButtonDropdown isOpen={dropdownOpen3} toggle={()=>setDropdownOpen3(!dropdownOpen3)}>
                                        <DropdownToggle caret size="sm" className="p-0">
                                            {fabtn2}
                                        </DropdownToggle>
                                        <DropdownMenu className="mt-0">
                                            <DropdownItem className="p-1 rounded-0" onClick={()=>{setFabtn2("Group1");setCollapses([2]);}}>Group1</DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem className="p-1 rounded-0">Group Add</DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown> 
                                </Col>
                                <Col xl="6" lg="6" md="5" className="col-4 text-right" onClick={(e) => {
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
                        <Col xl="4" lg="4" md="4">
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
                        <Col xl="4" lg="4" md="4">
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
                        <Col xl="4" lg="4" md="4">
                                                <FormGroup>
                                                    <Label className="mb-0">Phone</Label>
                                                    <Input
                                                        className="pt-1 pb-1"
                                                        defaultValue=""
                                                        placeholder="Phone"
                                                        type="text"
                                                    />
                                                </FormGroup>
                        </Col>
                        <Col xl="4" lg="4" md="4">
                                                <FormGroup>
                                                    <Label className="mb-0">Email</Label>
                                                    <Input
                                                        className="pt-1 pb-1"
                                                        defaultValue=""
                                                        placeholder="Email"
                                                        type="text"
                                                    />
                                                </FormGroup>
                        </Col>
                        <Col xl="5" lg="5" md="5">
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
                    <Row id="Consignee">
                        <Col className="col-12" xl="12" lg="12" sm="12">
                            <Row id="Schedule">
                                <Col xl="2" lg="2" md="2" className="col-2 pr-0">
                                    <h5 className="mb-1">Consignee</h5>
                                </Col>
                                <Col xl="2" lg="2" md="2" className="col-2 text-left">
                                    <ButtonDropdown isOpen={dropdownOpen4} toggle={()=>setDropdownOpen4(!dropdownOpen4)}>
                                        <DropdownToggle caret size="sm" className="p-0">
                                            {fabtn3}
                                        </DropdownToggle>
                                        <DropdownMenu className="mt-0">
                                            <DropdownItem className="p-1 rounded-0" onClick={()=>{setFabtn3("Group1");setCollapses([3])}}>Group1</DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem className="p-1 rounded-0">Group Add</DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown> 
                                </Col>
                                <Col xl="8" lg="8" md="8" className="col-8 text-right" onClick={(e) => {
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
                    <Row >
                        <Col xl="4" lg="4" md="4">
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
                        <Col xl="4" lg="4" md="4">
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
                        <Col xl="4" lg="4" md="4">
                                                <FormGroup>
                                                    <Label className="mb-0">Phone</Label>
                                                    <Input
                                                        className="pt-1 pb-1"
                                                        defaultValue=""
                                                        placeholder="Phone"
                                                        type="text"
                                                    />
                                                </FormGroup>
                        </Col>
                        <Col xl="4" lg="4" md="4">
                                                <FormGroup>
                                                    <Label className="mb-0">Email</Label>
                                                    <Input
                                                        className="pt-1 pb-1"
                                                        defaultValue=""
                                                        placeholder="Email"
                                                        type="text"
                                                    />
                                                </FormGroup>
                        </Col>
                        <Col xl="5" lg="5" md="5">
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
                        <Col xl="2" lg="2" md="3" className="col-4 pr-0">
                                    <h5 className="mb-1">Schedule Detail</h5>
                        </Col>
                        <Col xl="2" lg="2" md="2" className="col-2 text-left">
                                    <ButtonDropdown isOpen={dropdownOpen5} toggle={()=>setDropdownOpen5(!dropdownOpen5)}>
                                        <DropdownToggle caret size="sm" className="p-0">
                                            {fabtn4}
                                        </DropdownToggle>
                                        <DropdownMenu className="mt-0">
                                            <DropdownItem className="p-1 rounded-0" onClick={()=>{setFabtn4("Group1");setCollapses([4]);}}>Group1</DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem className="p-1 rounded-0">Group Add</DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown> 
                        </Col>
                        <Col xl="8" lg="8" md="7" className="col-6 text-right" onClick={(e) => {
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
                            <Col className="text-right col-12" xl="12" lg="12" sm="12">
                                <FormGroup className="mb-0">
                                    <Button color="default">Schedule Link</Button>
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="4">
                                    <FormGroup>
                                        <Label className="mb-0">Vessel</Label> 
                                        <Input type="text" name="vessel" id="vessel" placeholder="" />
                                    </FormGroup>                              
                            </Col>
                            <Col xl="4" lg="4" md="4">
                                    <FormGroup>
                                        <Label className="mb-0">VOYAGE</Label> 
                                        <Input type="text" name="voyage" id="voyage" placeholder="" />
                                    </FormGroup>                              
                            </Col>
                            <Col xl="4" lg="4" md="4">
                                    <FormGroup>
                                        <Label className="mb-0">Term</Label> 
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
                            <Col xl="4" lg="4" md="4">
                                <Label className="mb-0">ETA</Label> 
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
                            <Col xl="4" lg="4" md="4">
                                <Label className="mb-0">ETD</Label> 
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
                            <Col xl="4" lg="4" md="4">
                                <FormGroup>
                                            <Label className="mb-0">POL</Label>
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
                            <Col xl="4" lg="4" md="4">
                            <FormGroup>
                                            <Label className="mb-0">POD</Label>
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
                        </Row>
                    </Collapse>
                    <Row id="Cargo">
                        <Col xl="1" lg="1" md="2" className="col-2 pr-0">
                                    <h5 className="mb-1">Cargo</h5>
                        </Col>
                        <Col xl="2" lg="2" md="2" className="col-2 text-left">
                                    <ButtonDropdown isOpen={dropdownOpen6} toggle={()=>setDropdownOpen6(!dropdownOpen6)}>
                                        <DropdownToggle caret size="sm" className="p-0">
                                            {fabtn5}
                                        </DropdownToggle>
                                        <DropdownMenu className="mt-0">
                                            <DropdownItem className="p-1 rounded-0" onClick={()=>{setFabtn5("Group1");setCollapses([5]);}}>Group1</DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem className="p-1 rounded-0">Group Add</DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown> 
                        </Col>
                        <Col xl="9" lg="9" md="8" className="col-8 text-right" onClick={(e) => {
                                        e.preventDefault();
                                        changeCollapse(5);
                                        }}>
                                    <a 
                                        aria-expanded={collapses.includes(5)}
                                        className="collapsed"
                                        data-parent="#accordion"
                                        href="#pablo"
                                        id="collapse3"
                                        
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
                        <Col className="col-12 text-right" xl="12" lg="12">
                                        <Button
                                            className="p-0 mr-1"
                                            color="default"
                                            outline
                                            size="sm"
                                            onClick={onAddCargo}
                                        >
                                        <i className="fa fa-plus" />
                                        </Button>
                                        <Button
                                            className="p-0"
                                            color="default"
                                            size="sm"
                                            outline
                                            onClick={onDelCargo}
                                        >
                                        <i className="fa fa-minus" />
                                        </Button>
                        </Col>
                        <Col className="col-12" xl="12" lg="12">
                            <ui className="list-group list-group-flush">
                                {cargoList.map((data,index,key) =>
                                <li className="list-group-item pt-2">
                                    <Row>
                                        <Col className="col-0 pt-3 mt-3 text-center" xl="0">{index+1}.
                                        </Col>
                                        <Col className="col-4" xl="3" lg="3">
                                            <FormGroup>
                                                <Label  className="mb-0">ITEM</Label> 
                                                <Input type="text" name="item" id="item" placeholder="Item" />   
                                            </FormGroup>
                                        </Col>
                                        <Col className="col-3" xl="2" lg="2">
                                                        <FormGroup>
                                                            <Label  className="mb-0">HS CODE</Label> 
                                                            <Input type="text" name="hscode" id="hscode" placeholder="Search Code/Description" />   
                                                        </FormGroup>
                                        </Col>
                                        <Col className="col-4" xl="2" lg="2">
                                                        <FormGroup>
                                                            <Label  className="mb-0">TOTAL WEIGHT</Label> 
                                                            <Input type="text" name="totweight" id="totweight" placeholder="Enter Number..." />   
                                                        </FormGroup>
                                        </Col>
                                        <Col className="col-3" xl="1" lg="1">
                                            <FormGroup>
                                                <Label className="mb-0">단위</Label> 
                                                <Input className="pl-1" type="select" name="unit" id="unit">
                                                    <option>KG</option>
                                                    <option>LBS</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col className="col-4" xl="2" lg="2">
                                                        <FormGroup>
                                                            <Label  className="mb-0">운임지불</Label> 
                                                            <Input type="text" name="contractNumber" id="contractNumber" placeholder="Enter Number..." />   
                                                        </FormGroup>
                                        </Col>
                                    </Row>
                                </li>)}
                            </ui>             
                        </Col>
                    </Row>
                    </Collapse>
                    <Row id="Container">
                        <Col xl="1" lg="2" md="2" className="col-2 pr-0">
                            <h5 className="mb-1">Container</h5>
                        </Col>
                        <Col xl="2" lg="2" md="2" className="col-2 text-left">
                                    <ButtonDropdown isOpen={dropdownOpen7} toggle={()=>setDropdownOpen7(!dropdownOpen7)}>
                                        <DropdownToggle caret size="sm" className="p-0">
                                            {fabtn6}
                                        </DropdownToggle>
                                        <DropdownMenu className="mt-0">
                                            <DropdownItem className="p-1 rounded-0" onClick={()=>{setFabtn6("Group1");setCollapses([6]);}}>Group1</DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem className="p-1 rounded-0">Group Add</DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown> 
                        </Col>
                        <Col xl="9" lg="8" md="8" className="col-8 text-right" onClick={(e) => {
                                        e.preventDefault();
                                        changeCollapse(6);
                                        }}>
                                    <a 
                                        aria-expanded={collapses.includes(6)}
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
                    <Collapse isOpen={collapses.includes(6)}>
                    <Row>
                        <Col className="col-12 text-right" xl="12" lg="12">
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
                        <Col className="col-12" xl="12" lg="12">
                            <ui className="list-group list-group-flush">
                                {cntrList.map((data,index,key) =>
                                <li className="list-group-item pt-2">
                                    <Row>
                                        <Col className="col-0 pt-3 mt-3 text-center" xl="0">{index+1}.
                                        </Col>
                                        <Col xl="3" lg="3" md="3">
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
                                        <Col className="col-4" xl="2" lg="2" md="2">
                                            <FormGroup>
                                                <Label className="mb-0">Count</Label> 
                                                <Input type="text" name="ConCount" id="ConCount" placeholder="0" />
                                            </FormGroup>
                                        </Col>
                                        <Col className="col-7" xl="2" lg="2" md="4">
                                            <Row>
                                                <Col xl="5" className="col-6 text-center">
                                                    <Label className="mb-0">SOC</Label> 
                                                    <FormGroup check>
                                                        <Label check className="ml-1 mb-1">
                                                            <Input defaultValue="" type="checkbox" onClick={() => setClassic(true)} />
                                                            <span className="form-check-sign" />
                                                        </Label>
                                                    </FormGroup>
                                                </Col>
                                                <Col xl="7" className="col-6 text-center">
                                                    <Label className="mb-0">특수화물</Label> 
                                                    <FormGroup check>
                                                        <Label check className="ml-3 mb-1">
                                                            <Input defaultValue="" type="checkbox" onClick={onOpenSpPopUp}/>
                                                            <span className="form-check-sign" />
                                                        </Label>
                                                    </FormGroup>
                                                </Col>
                                            </Row>    
                                        </Col>

                                        <Col xl="2" lg="2" md="4">
                                            <FormGroup>
                                                <Label className="mb-0">PICK UP 지역</Label> 
                                                <Input type="text" name="contractNumber" id="contractNumber" placeholder="" />
                                            </FormGroup>
                                        </Col>
                                        <Col xl="2" lg="2" md="4">
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
                                        <Col xl="12">
                                            <Row>
                                                <Col xl="1" className="col-7 pr-0">
                                                    <h5 className="mb-1">Trucker</h5>
                                                </Col>
                                                <Col className="col-12" xl="12" lg="12" sm="12">
                                                    <hr className="mt-0"/>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col className="col-3" xl="2" lg="2" md="3">
                                            <FormGroup>
                                                        <Label className="mb-0">운송사구분</Label> 
                                                        <Input type="select" name="carrier" id="carrier">
                                                            <option>자가</option>
                                                            <option>지정</option>
                                                        </Input>
                                                </FormGroup>
                                        </Col>
                                        <Col className="col-9" xl="4" lg="4" md="5">
                                                <FormGroup>
                                                        <Label className="mb-0">운송사명</Label> 
                                                        <Input type="text" name="contractNumber" id="contractNumber" placeholder="운송사명" />
                                                </FormGroup>
                                            </Col>
                                            <Col className="col-12" xl="3" lg="3" md="4">
                                                <FormGroup>
                                                        <Label className="mb-0">담당자</Label> 
                                                        <Input type="text" name="contractNumber" id="contractNumber" placeholder="담당자명" />
                                                </FormGroup>
                                            </Col>
                                            <Col className="col-12" xl="3" lg="3" md="5">
                                                <FormGroup>
                                                        <Label className="mb-0">연락처</Label> 
                                                        <Input type="text" name="contractNumber" id="contractNumber" placeholder="연락처" />
                                                </FormGroup>
                                            </Col>
                                            <Col className="col-12" xl="6" lg="6" md="7">
                                                <FormGroup>
                                                        <Label className="mb-0">작업지주소</Label> 
                                                        <Input type="text" name="contractNumber" id="contractNumber" placeholder="주소" />
                                                </FormGroup>
                                            </Col>
                                            <Col className="col-12" xl="2" lg="2" md="6">
                                                        <Label className="mb-0">작업일</Label> 
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
                                            <Col className="col-12" xl="2" lg="2" md="6">
                                                <FormGroup>
                                                        <Label className="mb-0">PICK UP CY</Label> 
                                                        <Input type="text" name="contractNumber" id="contractNumber" placeholder="Enter Number..." />
                                                </FormGroup>
                                            </Col>
                                            <Col className="col-12" xl="2" lg="2" md="6">
                                                <FormGroup>
                                                        <Label className="mb-0">반입지</Label> 
                                                        <Input type="text" name="contractNumber" id="contractNumber" placeholder="Enter Number..." />
                                                </FormGroup>
                                            </Col>
                                    </Row>
                                </li>)}
                            </ui>             
                        </Col>
                    </Row>
                    </Collapse>
                    <Row>
                            <nav id="cd-vertical-nav">
                            <ul>
                            <li>
                                <a href="#!"
                                data-number="1"
                                //href="#headers"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("General").scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                    inline: "nearest",
                                    });
                                }}
                                >
                                <span className="cd-dot bg-secondary" />
                                <span className="cd-label">General</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!"
                                data-number="2"
                                //href="#features"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("Shipper").scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                    inline: "nearest",
                                    });
                                    setCollapses([1]);
                                }}
                                >
                                <span className="cd-dot bg-secondary" />
                                <span className="cd-label">Shipper</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!"
                                data-number="3"
                                //href="#features"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("Forwarder").scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                    inline: "nearest",
                                    });
                                    setCollapses([2]);
                                }}
                                >
                                <span className="cd-dot bg-secondary" />
                                <span className="cd-label">Forwarder</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!"
                                data-number="4"
                                //href="#features"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("Consignee").scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                    inline: "nearest",
                                    });
                                    setCollapses([3]);
                                }}
                                >
                                <span className="cd-dot bg-secondary" />
                                <span className="cd-label">Consignee</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!"
                                data-number="5"
                                //href="#teams"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("Schedule").scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                    inline: "nearest",
                                    });
                                    setCollapses([4]);

                                }}
                                >
                                <span className="cd-dot bg-secondary" />
                                <span className="cd-label">Schedule</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!"
                                data-number="6"
                                //href="#projects"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("Cargo").scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                    inline: "nearest",
                                    });
                                    setCollapses([5]);
                                }}
                                >
                                <span className="cd-dot bg-secondary" />
                                <span className="cd-label">Cargo</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!"
                                data-number="7"
                                //href="#projects"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("Container").scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                    inline: "nearest",
                                    });
                                    setCollapses([6]);
                                }}
                                >
                                <span className="cd-dot bg-secondary" />
                                <span className="cd-label">Container</span>
                                </a>
                            </li>
                            
                            </ul>
                        </nav>
                    </Row>
                <Row className="text-right">
                        <Col>
                            <FormGroup>
                                <Button className="btn-magnify mr-1" color="default">
                                Save As
                                </Button>
                                <Button className="btn-magnify mr-1" color="default">
                                SR
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
            </Form>
            <ModalForm
            open={openPopUp}
            close={()=>setOpenPopUp(false)}
            title={popUpTitle}
            context={popUpConText}
            />
        </div>
        </div>
    );
}