import React from "react";

// reactstrap components
import { Row,Col,NavItem,
    NavLink,Card,
    Nav, TabContent,ButtonDropdown,DropdownToggle,DropdownItem,DropdownMenu,
    TabPane, Button,Container ,Form,FormGroup,Label,Input,InputGroup,InputGroupAddon,InputGroupText} from "reactstrap";
    import ReactDatetime from "react-datetime";
import ModalForm from "./CustomModal.js";
// import CheckTable from "./CustomCheckTable.js";
import CardHeader from "reactstrap/lib/CardHeader";
import CardBody from "reactstrap/lib/CardBody";


export default function NewBooking (props) {

    // const [collapses, setCollapses] = React.useState([]);
    const [classic, setClassic] = React.useState(false);
    const [openPopUp,setOpenPopUp] = React.useState(false);
    const [popUpTitle,setPopUpTitle] = React.useState(null);
    const [popUpConText,setPopUpConText] = React.useState(null);

    const [hTabs, setHTabs] = React.useState("1");
    
    const [cntrList,setCntrList] = React.useState([['1']]);
    const [cargoList,setCargoList] = React.useState([['1']]);

    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [dropdownOpen2, setDropdownOpen2] = React.useState(false);
    const [dropdownOpen3, setDropdownOpen3] = React.useState(false);

    // const toggle = () => setDropdownOpen(!dropdownOpen);

    const [stepFav,setStepFav] = React.useState("Favorite Load");
    const [stepFav2,setStepFav2] = React.useState("Favorite Load");
    const [stepFav3,setStepFav3] = React.useState("Favorite Load");

    // const changeCollapse = (collapse) => {
    //   if (collapses.includes(collapse)) {
    //     setCollapses(collapses.filter((prop) => prop !== collapse));
    //   } else {
    //     setCollapses([...collapses, collapse]);
    //   }
    // };

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
                    <Row >
                        <Col>
                            <h3 className="text-left mb-3">Create Booking Request</h3>
                            <h5>Please check the schedule first when Request for booking.</h5>
                        </Col>
                    </Row>
                    <div className="nav-tabs-navigation">
                <div className="nav-tabs-wrapper">
                  <Nav id="tabs" role="tablist" tabs>
                    <NavItem>
                      <NavLink
                        className={hTabs === "1" ? "active" : ""}
                        onClick={() => {
                          setHTabs("1");
                        }}
                      >
                        Schedule
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={hTabs === "2" ? "active" : ""}
                        onClick={() => {
                          setHTabs("2");
                        }}
                      >
                        Partes
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={hTabs === "3" ? "active" : ""}
                        onClick={() => {
                          setHTabs("3");
                        }}
                      >
                       Cargo&Container 
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={hTabs === "4" ? "active" : ""}
                        onClick={() => {
                          setHTabs("4");
                        }}
                      >
                        Send
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </div>
              <TabContent className="text-start" activeTab={"hTabs" + hTabs}>
                <TabPane tabId="hTabs1">
                    <Row>
                        <Col>                            
                            <h5>Step 1. Schedule</h5>
                        </Col>
                    </Row>
                    <Row className="text-right">
                            <Col>
                                <FormGroup>
                                   <ButtonDropdown isOpen={dropdownOpen} toggle={()=>setDropdownOpen(!dropdownOpen)}>
                                            <DropdownToggle caret size="sm" className="p-1 mr-1">
                                            {stepFav}
                                            </DropdownToggle>
                                            <DropdownMenu className="mt-0">
                                                <DropdownItem className="p-1 rounded-0" onClick={()=>setStepFav('Group1')}>Group1</DropdownItem>
                                                <DropdownItem className="p-1 rounded-0" onClick={()=>{setStepFav('ALL Group1');setHTabs("4");}}>ALL Group1</DropdownItem>
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
                    <Row className="pb-3">
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
                                <Input type="text" name="contractNumber" id="contractNumber" placeholder="Enter Number..." />   
                            </FormGroup>                          
                        </Col>
                        <Col xl="4" lg="4" md="4">
                            <FormGroup className="mb-2">
                                <Label className="mb-0">Shipper Booking Number{" "}</Label> 
                                <Input type="text" name="shipperBooking" id="shipperBooking" placeholder="Enter Number..." />   
                            </FormGroup>                          
                        </Col> 
                    </Row>


                   
                    <Row>
                        <Col className="col-12" xl="12" lg="12" sm="12">
                            <h5 className="mb-0">Schedule Details</h5>
                        </Col>
                        <Col className="col-12" xl="12" lg="12" sm="12">
                            <hr className="mt-0 mb-2"/>
                        </Col>
                        <Col className="text-right col-12" xl="12" lg="12" sm="12">
                            <FormGroup className="mb-0">
                                <Button color="default">Schedule  Link</Button>
                            </FormGroup>
                        </Col>
                        <Col xl="4" lg="4" md="4">
                                <FormGroup>
                                    <Label className="mb-0">Vessel</Label> 
                                    <Input type="text" name="contractNumber" id="contractNumber" placeholder="" />
                                </FormGroup>                              
                        </Col>
                        <Col xl="4" lg="4" md="4">
                                <FormGroup>
                                    <Label className="mb-0">VOYAGE</Label> 
                                    <Input type="text" name="voyageNumber" id="voyageNumber" placeholder="" />
                                </FormGroup>                              
                        </Col>
                        <Col xl="4" lg="4" md="4">
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
                        <Col xl="4" lg="4" md="6">
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
                        <Col xl="4" lg="4" md="6">
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
                        <Col xl="4" lg="4" md="6">
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
                        <Col xl="4" lg="4" md="6">
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
                    <Row className="text-right">
                            <Col>
                                <FormGroup>
                                    <Button
                                        className="mr-1"
                                        color="default"
                                        >
                                        초기화
                                    </Button>
                                    <Button //className="btn-move-right btn-round" 
                                    color="default" onClick={() => {setHTabs("2");}}>
                                        다음 
                                    </Button>
                                </FormGroup>
                            </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="hTabs2">
                    <Row>
                        <Col>                            
                            <h5>Step 2. Partes</h5>
                        </Col>
                    </Row>
                    <Row className="text-right">
                            <Col>
                                <FormGroup>
                                    <ButtonDropdown isOpen={dropdownOpen2} toggle={()=>setDropdownOpen2(!dropdownOpen2)}>
                                            <DropdownToggle caret size="sm" className="p-1 mr-1">
                                            {stepFav2}
                                            </DropdownToggle>
                                            <DropdownMenu className="mt-0">
                                                <DropdownItem className="p-1 rounded-0" onClick={()=>setStepFav2("Group1")}>Group1</DropdownItem>
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
                    <Row>
                        <Col className="col-12" xl="12" lg="12" sm="12">
                            <h5 className="mb-0">Shipper</h5>
                        </Col>
                        <Col className="col-12" xl="12" lg="12" sm="12">
                            <hr className="mt-0"/>
                        </Col>
                        <Col xl="4" lg="4" md="5">
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
                        <Col xl="4" lg="4" md="7">
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
                        <Col xl="4" lg="4" md="6">
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
                        <Col xl="4" lg="4" md="6">
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
                    <Row>
                        <Col className="col-12" xl="12" lg="12" sm="12">
                            <h5 className="mb-0">Forwarder(Booking Company)</h5>
                        </Col>
                        <Col className="col-12" xl="12" lg="12" sm="12">
                            <hr className="mt-0"/>
                        </Col>
                        <Col xl="4" lg="4" md="5">
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
                        <Col xl="4" lg="4" md="7">
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
                        <Col xl="4" lg="4" md="6">
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
                        <Col xl="4" lg="4" md="6">
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
                    <Row>
                        <Col className="col-12" xl="12" lg="12" sm="12">
                            <h5 className="mb-0">Consignee</h5>
                        </Col>
                        <Col className="col-12" xl="12" lg="12" sm="12">
                            <hr className="mt-0"/>
                        </Col>
                        <Col xl="4" lg="4" md="5">
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
                        <Col xl="4" lg="4" md="7">
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
                        <Col xl="4" lg="4" md="6">
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
                        <Col xl="4" lg="4" md="6">
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
                    <Row className="text-right">
                        <Col>
                            <FormGroup>
                                <Button
                                    className="mr-1"
                                    color="default"
                                    onClick={() => {setHTabs("1");}}
                                    >Back
                                </Button>
                                <Button //className="btn-move-right btn-round" 
                                    color="default" onClick={() => {setHTabs("3");}}>
                                     Next
                                </Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="hTabs3">
                    <Row>
                        <Col>                            
                            <h5>Step 3. Cargo Info.</h5>
                        </Col>
                    </Row>
                    <Row className="text-right">
                            <Col>
                                <FormGroup>
                                    <ButtonDropdown isOpen={dropdownOpen3} toggle={()=>setDropdownOpen3(!dropdownOpen3)}>
                                            <DropdownToggle caret size="sm" className="p-1 mr-1">
                                            {stepFav3}
                                            </DropdownToggle>
                                            <DropdownMenu className="mt-0">
                                                <DropdownItem className="p-1 rounded-0" onClick={()=>setStepFav3("Group1")}>Group1</DropdownItem>
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
                    <Row>
                        <Col className="col-12" xl="12" lg="12" sm="12">
                                <h5 className="mb-0">Cargo</h5>
                        </Col>
                        <Col className="col-12" xl="12" lg="12" sm="12">
                                <hr className="mt-0 mb-2"/>
                        </Col>
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
                                        <Col className="col-12" xl="3" lg="3" md="6">
                                            <FormGroup>
                                                <Label  className="mb-0">ITEM</Label> 
                                                <Input type="text" name="item" id="item" placeholder="Item" />   
                                            </FormGroup>
                                        </Col>
                                        <Col className="col-12" xl="2" lg="2" md="5">
                                                        <FormGroup>
                                                            <Label  className="mb-0">HS CODE</Label> 
                                                            <Input type="text" name="hscode" id="hscode" placeholder="Search Code/Description" />   
                                                        </FormGroup>
                                        </Col>
                                        <Col className="col-8" xl="2" lg="2" md="4">
                                                        <FormGroup>
                                                            <Label  className="mb-0">TOTAL WEIGHT</Label> 
                                                            <Input type="text" name="totweight" id="totweight" placeholder="Enter Number..." />   
                                                        </FormGroup>
                                        </Col>
                                        <Col className="col-4" xl="1" lg="2" md="3">
                                            <FormGroup>
                                                <Label className="mb-0">단위</Label> 
                                                <Input className="pl-1" type="select" name="unit" id="unit">
                                                    <option>KG</option>
                                                    <option>LBS</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col className="col-12" xl="2" lg="2" md="5">
                                            <FormGroup>
                                                <Label  className="mb-0">운임지불</Label> 
                                                <Input type="text" name="contractNumber" id="contractNumber" placeholder="" />   
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </li>)}
                            </ui>             
                        </Col>
                    </Row>
                    <Row>
                        
                        <Col className="col-12" xl="12" lg="12" sm="12">
                            <h5 className="mb-0">Container</h5>
                        </Col>
                        <Col className="col-12" xl="12" lg="12" sm="12">
                            <hr className="mt-0 mb-2"/>
                        </Col>
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
                                        <Col className="col-12" xl="3" lg="3" md="4">
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
                                        <Col className="col-5" xl="1" lg="1" md="3">
                                            <FormGroup>
                                                <Label className="mb-0">Count</Label> 
                                                <Input type="text" name="ConCount" id="ConCount" placeholder="0" />
                                            </FormGroup>
                                        </Col>
                                        <Col className="col-7" xl="2" lg="3" md="4">
                                            <Row>
                                                <Col md="4" className="col-6 text-center">
                                                    <Label className="mb-0">SOC</Label> 
                                                    <FormGroup check>
                                                        <Label check className="ml-1 mb-1">
                                                            <Input defaultValue="" type="checkbox" onClick={() => setClassic(true)} />
                                                            <span className="form-check-sign" />
                                                        </Label>
                                                    </FormGroup>
                                                </Col>
                                                <Col md="8" className="col-6 text-center">
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
                                        <Col xl="2" lg="2" md="6">
                                            <FormGroup>
                                                <Label className="mb-0">PICK UP 지역</Label> 
                                                <Input type="text" name="contractNumber" id="contractNumber" placeholder="" />
                                            </FormGroup>
                                        </Col>
                                        <Col xl="2" lg="2" md="6">
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
                                            <h5 className="mb-0">Trucker</h5>
                                        </Col>
                                        <Col className="col-12" xl="12" lg="12" sm="12">
                                            <hr className="mt-0 mb-2"/>
                                        </Col>
                                        <Col className="col-3" xl="2" lg="2" md="2">
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
                                            <Col className="col-12" xl="3" lg="3" md="5">
                                                <FormGroup>
                                                        <Label className="mb-0">담당자</Label> 
                                                        <Input type="text" name="contractNumber" id="contractNumber" placeholder="담당자명" />
                                                </FormGroup>
                                            </Col>
                                            <Col className="col-12" xl="3" lg="3" md="6">
                                                <FormGroup>
                                                        <Label className="mb-0">연락처</Label> 
                                                        <Input type="text" name="contractNumber" id="contractNumber" placeholder="연락처" />
                                                </FormGroup>
                                            </Col>
                                            <Col className="col-12" xl="6" lg="6" md="6">
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
                    <Row className="text-right">
                        <Col>
                            <FormGroup>
                                <Button
                                    className="mr-1"
                                    color="default"
                                    onClick={() => {setHTabs("2");}}
                                    >
                                        Back
                                </Button>
                                <Button //className="btn-move-right btn-round" 
                                    color="default" onClick={() => {setHTabs("4");}}>
                                     Next
                                </Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </TabPane>
                
                <TabPane tabId="hTabs4">
                    <Row>
                        <Col>                            
                            <h5>Step 4. Booking Request Summary.</h5>
                        </Col>
                    </Row>
                    <Card className="no-transition rounded-0" id="Partes">
                        <CardHeader className="pt-1 pb-0 pl-1">
                            <Col className="col-12" xl="12" lg="12" sm="12">
                                <Row>
                                    <Col className="text-left"><h5 className="mb-0">General Details</h5>
                                    </Col>
                                    <Col className="text-right">
                                        <FormGroup className="mb-1">
                                            <Button className="pt-0 pb-0" color="default" onClick={() => {setHTabs("1");}}>수정</Button>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                        </CardHeader>
                        <CardBody className="pt-2 pb-2">
                            <Row>
                                <Col xl="3" lg="3">
                                    <Row>
                                        <Col xl="9" lg="9" className="col-4 pr-1">
                                            <Label className="pt-1 mb-0">Carrier/Booking Agent:</Label> 
                                        </Col>
                                        <Col xl="3" lg="3" className="col-8 font-weight-bold pt-1"><span >APL</span></Col>
                                    </Row>                          
                                </Col>
                                <Col xl="4" lg="4">
                                    <Row>
                                        <Col xl="4" lg="4" className="col-3 pr-1">
                                            <Label className="pt-1 mb-0" >SC NUMBER:</Label> 
                                        </Col>
                                        <Col xl="8" lg="8" className="col-8 font-weight-bold pt-1"><span >SC2020120700001S</span></Col>
                                    </Row>                          
                                </Col>
                                <Col xl="5" lg="5">
                                    <Row>
                                        <Col xl="6" lg="6" className="col-5 pr-1">
                                            <Label className="pt-1 mb-0">Shipper Booking Number:</Label> 
                                        </Col>
                                        <Col xl="6" lg="6" className="col-7 font-weight-bold pt-1"><span >WDF2020120700001</span></Col>
                                    </Row>                          
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>                                                  
                    <Card className="no-transition  rounded-0">
                        <CardHeader className="pt-1 pb-0 pl-1">
                            <Col className="col-12" xl="12" lg="12" sm="12">
                                <Row>
                                    <Col className="text-left"><h5 className="mb-0">Partes</h5>
                                    </Col>
                                    <Col className="text-right">
                                        <FormGroup className="mb-1">
                                            <Button className="pt-0 pb-0" color="default" onClick={() => {setHTabs("2");}}>수정</Button>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                        </CardHeader>
                        <CardBody className="pt-3 pb-0">
                            <Row>
                                <Col xl="4" className="pl-1 pr-1">
                                    <Card className="no-transition rounded-0">
                                        <CardHeader className="pt-1 pb-1"><h6 className="mb-0">Shipper</h6></CardHeader>                                 
                                    <CardBody className="p-2">
                                        <Row>
                                            <Col xl="3" className="col-4 mb-1">
                                                <Label className="pt-1 mb-0" >Name:</Label> 
                                            </Col>
                                            <Col xl="9" className="col-8 font-weight-bold pt-1"><span ></span></Col>
                                        </Row>
                                        <Row>
                                            <Col xl="3" className="col-4 mb-1">
                                                <Label className="pt-1 mb-0" >PIC:</Label> 
                                            </Col>
                                            <Col xl="9" className="col-8 font-weight-bold pt-1"><span ></span></Col>
                                        </Row> 
                                        <Row>
                                            <Col xl="3" className="col-4 mb-1">
                                                <Label className="pt-1 mb-0" >Phone:</Label> 
                                            </Col>
                                            <Col xl="9" className="col-8 font-weight-bold pt-1"><span ></span></Col>
                                        </Row>
                                        <Row>
                                            <Col xl="3" className="col-4 mb-1">
                                                <Label className="pt-1 mb-0" >Email:</Label> 
                                            </Col>
                                            <Col xl="9" className="col-8 font-weight-bold pt-1"><span ></span></Col>
                                        </Row> 
                                        <Row>
                                            <Col xl="3" className="col-4 mb-1">
                                                <Label className="pt-1 mb-0" >Address:</Label> 
                                            </Col>
                                            <Col xl="9" className="col-8 font-weight-bold pt-1"><span ></span></Col>
                                        </Row>                                          
                                    </CardBody>
                                    </Card>
                                </Col>                                                
                                <Col xl="4" className="pl-1 pr-1">
                                    <Card className="no-transition rounded-0">
                                        <CardHeader className="pt-1 pb-1"><h6 className="mb-0">Booking Company(Forwarder)</h6></CardHeader>                                 
                                    <CardBody className="p-2">
                                        <Row>
                                            <Col xl="3" className="col-4 mb-1">
                                                <Label className="pt-1 mb-0" >Name:</Label> 
                                            </Col>
                                            <Col xl="9" className="col-8 font-weight-bold pt-1"><span>홍길동</span></Col>
                                        </Row>
                                        <Row>
                                            <Col xl="3" className="col-4 mb-1">
                                                <Label className="pt-1 mb-0" >PIC:</Label> 
                                            </Col>
                                            <Col xl="9" className="col-8 font-weight-bold pt-1"><span>케이엘넷</span></Col>
                                        </Row> 
                                        <Row>
                                            <Col xl="3" className="col-4 mb-1">
                                                <Label className="pt-1 mb-0" >Phone:</Label> 
                                            </Col>
                                            <Col xl="9" className="col-8 font-weight-bold pt-1"><span>010-1234-1234</span></Col>
                                        </Row>
                                        <Row>
                                            <Col xl="3" className="col-4 mb-1">
                                                <Label className="pt-1 mb-0" >Email:</Label> 
                                            </Col>
                                            <Col xl="9" className="col-8 font-weight-bold pt-1"><span >test001@klnet.co.kr</span></Col>
                                        </Row> 
                                        <Row>
                                            <Col xl="2" className="col-4 mb-1">
                                                <Label className="pt-1 mb-0" >Address:</Label> 
                                            </Col>
                                            <Col xl="10" className="col-8 font-weight-bold pt-1"><span >서울시 역삼동 케이엘넷 빌딩 2층</span></Col>
                                        </Row>                                          
                                    </CardBody>
                                    </Card>
                                </Col>
                                <Col xl="4" className="pl-1 pr-1">
                                    <Card className="no-transition rounded-0">
                                        <CardHeader className="pt-1 pb-1"><h6 className="mb-0">Consignee</h6></CardHeader>                                 
                                    <CardBody className="p-2">
                                        <Row>
                                            <Col xl="3" className="col-4 mb-1">
                                                <Label className="pt-1 mb-0" >Name:</Label> 
                                            </Col>
                                            <Col xl="9" className="col-8 font-weight-bold pt-1"><span ></span></Col>
                                        </Row>
                                        <Row>
                                            <Col xl="3" className="col-4 mb-1">
                                                <Label className="pt-1 mb-0" >PIC:</Label> 
                                            </Col>
                                            <Col xl="9" className="col-8 font-weight-bold pt-1"><span ></span></Col>
                                        </Row> 
                                        <Row>
                                            <Col xl="3" className="col-4 mb-1">
                                                <Label className="pt-1 mb-0" >Phone:</Label> 
                                            </Col>
                                            <Col xl="9" className="col-8 font-weight-bold pt-1"><span ></span></Col>
                                        </Row>
                                        <Row>
                                            <Col xl="3" className="col-4 mb-1">
                                                <Label className="pt-1 mb-0" >Email:</Label> 
                                            </Col>
                                            <Col xl="9" className="col-8 font-weight-bold pt-1"><span ></span></Col>
                                        </Row> 
                                        <Row>
                                            <Col xl="3" className="col-4 mb-1">
                                                <Label className="pt-1 mb-0" >Address:</Label> 
                                            </Col>
                                            <Col xl="9" className="col-8 font-weight-bold pt-1"><span ></span></Col>
                                        </Row>                                          
                                    </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <Card className="no-transition rounded-0">
                        <CardHeader className="pt-1 pb-0 pl-1">
                            <Col className="col-12" xl="12" lg="12" sm="12">
                                <Row>
                                    <Col className="text-left"><h5 className="mb-0">Schedule Details</h5>
                                    </Col>
                                    <Col className="text-right">
                                        <FormGroup className="mb-1">
                                            <Button className="pt-0 pb-0" color="default" onClick={() => {setHTabs("3");}}>수정</Button>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col xl="8">
                                    <Row>
                                        <Col>
                                            <Row>
                                                <Col xl="3" className="col-4 mb-1">
                                                    <Label className="pt-1 mb-0" >Vessel:</Label> 
                                                </Col>
                                                <Col xl="9" className="col-8 font-weight-bold pt-1"><span >TEST010</span></Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Col xl="3" className="col-4 mb-1">
                                                    <Label className="pt-1 mb-0" >VOYAGE:</Label> 
                                                </Col>
                                                <Col xl="9" className="col-8 font-weight-bold pt-1"><span >211W</span></Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl="3" className="col-4 mb-1">
                                            <Label className="pt-1 mb-0" >TERM:</Label> 
                                        </Col>
                                        <Col xl="9" className="col-8 font-weight-bold pt-1"><span >CY->CY</span></Col>
                                    </Row>
                                    <Row>
                                        <Col xl="2" className="col-2 mb-1">
                                            <Label className="pt-1 mb-0" >POL:</Label> 
                                        </Col>
                                        <Col className="col-10 mb-1">
                                            <Row>
                                                <Col xl="3" className="col-3 font-weight-bold pt-1">
                                                    <span >KRPUS</span> 
                                                </Col>
                                                <Col xl="9" className="col-9 font-weight-bold pt-1"><span >BUSAN,KOREA,REPUBLIC OF</span></Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl="2" className="col-2 mb-1">
                                            <Label className="pt-1 mb-0" >POD:</Label> 
                                        </Col>
                                        <Col className="col-10 mb-1">
                                            <Row>
                                                <Col xl="3" className="col-3 font-weight-bold pt-1">
                                                    <span >KRPUS</span> 
                                                </Col>
                                                <Col xl="9" className="col-9 font-weight-bold pt-1"><span >BUSAN,KOREA,REPUBLIC OF</span></Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xl="4">
                                    <CardBody>
                                        <Row>
                                            <Col xl="3" className="col-4 mb-1">
                                                <Label className="pt-1 mb-0" >ETD:</Label> 
                                            </Col>
                                            <Col xl="9" className="col-8 font-weight-bold pt-1"><span >20201231</span></Col>
                                        </Row>
                                        <Row>
                                            <Col xl="3" className="col-4 mb-1">
                                                <Label className="pt-1 mb-0" >ETA:</Label> 
                                            </Col>
                                            <Col xl="9" className="col-8 font-weight-bold pt-1"><span >20201230</span></Col>
                                        </Row>
                                    </CardBody>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card> 
                    <Card className="no-transition rounded-0" id="Cargo">
                        <CardHeader className="pt-1 pb-0 pl-1">
                            <Col className="col-12" xl="12" lg="12" sm="12">
                                <Row>
                                    <Col className="text-left"><h5 className="mb-0">Cargo</h5>
                                    </Col>
                                    <Col className="text-right">
                                        <FormGroup className="mb-1">
                                            <Button className="pt-0 pb-0" color="default" onClick={() => {setHTabs("3");}}>수정</Button>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                        </CardHeader>
                        <CardBody className="pt-2 pb-2">
                            <Row>
                                <Col xl="12">
                                    <ui className="list-group list-group-flush">
                                    {cargoList.map((data,index,key) =>
                                        <li className="list-group-item p-1">
                                            <Row className="pl-2 pr-2">
                                                <Col xl="0" className="col-0 pt-1 text-center">{index+1}.</Col>
                                                <Col className="col-6" xl="3" lg="3">
                                                    <Row>
                                                        <Col xl="4" className="col-4 mb-1">
                                                            <Label className="pt-1 mb-0" >ITEM:</Label> 
                                                        </Col>
                                                        <Col xl="8" className="col-8 font-weight-bold pt-1"><span >testitem</span></Col>
                                                    </Row>
                                                </Col>
                                                <Col className="col-5" xl="2" lg="2">
                                                    <Row>
                                                        <Col xl="8" lg="8" className="col-6 mb-1">
                                                            <Label className="pt-1 mb-0" >HS CODE:</Label> 
                                                        </Col>
                                                        <Col xl="4" lg="4" className="col-6 font-weight-bold pt-1 pl-1 pr-0"><span >HSSA</span></Col>
                                                    </Row>
                                                </Col>
                                                <Col className="col-6" xl="3" lg="3">
                                                    <Row>
                                                        <Col xl="7" className="col-7 mb-1">
                                                            <Label className="pt-1 mb-0" >TOTAL WEIGHT:</Label> 
                                                        </Col>
                                                        <Col xl="5" className="col-5 font-weight-bold pl-1 pr-0 pt-1"><span >2111.1 KG</span></Col>
                                                    </Row>
                                                </Col>
                                                <Col className="col-6" xl="3" lg="3">
                                                    <Row>
                                                        <Col xl="5" className="col-6 mb-1">
                                                            <Label className="pt-1 mb-0" >운임지불:</Label> 
                                                        </Col>
                                                        <Col xl="7" className="col-6 font-weight-bold pt-1"><span ></span></Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </li>)}
                                    </ui>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <Card className="no-transition rounded-0" id="Container">
                        <CardHeader className="pt-1 pb-0 pl-1">
                            <Col className="col-12" xl="12" lg="12" sm="12">
                                <Row>
                                    <Col className="text-left"><h5 className="mb-0">Conatiner</h5>
                                    </Col>
                                    <Col className="text-right">
                                        <FormGroup className="mb-1">
                                            <Button className="pt-0 pb-0" color="default" onClick={() => {setHTabs("3");}}>수정</Button>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                        </CardHeader>  
                        <CardBody className="pt-2 pb-0">
                            <ui className="list-group list-group-flush">
                                <Card className="no-transition rounded-0">
                                    <CardBody className="pt-0 pb-0">
                                        <Row>
                                            <Col className="col-0 pt-1 text-center" xl="0">1.
                                            </Col>
                                            <Col className="col-6" xl="3" lg="3">
                                                <Row>
                                                    <Col xl="4" className="col-4 mb-1">
                                                        <Label className="pt-1 mb-0" >SIZE/TYPE:</Label> 
                                                    </Col>
                                                    <Col xl="8" className="col-8 font-weight-bold pt-1"><span>20`DRY</span></Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-5" xl="2" lg="2">
                                                <Row>
                                                    <Col xl="4" className="col-4 mb-1">
                                                        <Label className="pt-1 mb-0" >COUNT:</Label> 
                                                    </Col>
                                                    <Col xl="8" className="col-8 font-weight-bold pt-1"><span>5</span></Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-6" xl="3" lg="3">
                                                <Row>
                                                    <Col xl="6" lg="7" className="col-6 mb-1">
                                                        <Label className="pt-1 mb-0" >PICK UP지역:</Label> 
                                                    </Col>
                                                    <Col xl="6" lg="5" className="col-6 font-weight-bold pt-1"><span>부산</span></Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-6" xl="3" lg="3">
                                                <Row>
                                                    <Col xl="7" className="col-7 mb-1">
                                                        <Label className="pt-1 mb-0" >PICK UP DATE:</Label> 
                                                    </Col>
                                                    <Col xl="5" className="col-5 font-weight-bold pr-0 pt-1"><span>20201222</span></Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row id="Trucker">
                                            <Col className="col-12" xl="12" lg="12" sm="12">
                                                <hr className="mt-1 mb-1"/>
                                            </Col>
                                            <Col className="col-12 text-left" xl="12" lg="12" sm="12">
                                                <h5 className="mt-0">Trucker</h5>
                                            </Col>
                                            <Col className="col-5" xl="3" lg="3">
                                                <Row>
                                                    <Col xl="5" className="col-6 mb-1">
                                                        <Label className="pt-1 mb-0" >운송구분:</Label> 
                                                    </Col>
                                                    <Col xl="7" className="col-6 font-weight-bold pt-1"><span>자가</span></Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-6" xl="3" lg="3">
                                                <Row>
                                                    <Col xl="5" className="col-7 mb-1">
                                                        <Label className="pt-1 mb-0" >운송사명:</Label> 
                                                    </Col>
                                                    <Col xl="7" className="col-5 font-weight-bold pt-1"><span>케이엘넷</span></Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-6" xl="3" lg="3">
                                                <Row>
                                                    <Col xl="4" className="col-5 mb-1 pr-0">
                                                        <Label className="pt-1 mb-0" >담당자:</Label> 
                                                    </Col>
                                                    <Col xl="8" className="col-7 font-weight-bold pt-1"><span>홍길동</span></Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-6" xl="3" lg="3">
                                                <Row>
                                                    <Col xl="4"  lg="4" className="col-5 mb-1 pr-0">
                                                        <Label className="pt-1 mb-0" >연락처:</Label> 
                                                    </Col>
                                                    <Col xl="8" lg="8" className="col-7 font-weight-bold pt-1"><span>010-1234-1234</span></Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-7" xl="3" lg="3">
                                                <Row>
                                                    <Col xl="5" className="col-5 mb-1 pr-0">
                                                        <Label className="pt-1 mb-0" >작업지주소:</Label> 
                                                    </Col>
                                                    <Col xl="7" className="col-7 font-weight-bold pt-1"><span>부산</span></Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-5" xl="3" lg="3">
                                                <Row>
                                                    <Col xl="4" className="col-5 mb-1 pr-0">
                                                        <Label className="pt-1 mb-0" >작업일:</Label> 
                                                    </Col>
                                                    <Col xl="8" className="col-7 font-weight-bold pt-1"><span></span></Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-6" xl="3" lg="3">
                                                <Row>
                                                    <Col xl="5" className="col-5 mb-1 pr-0">
                                                        <Label className="pt-1 mb-0" >PICK UP CY:</Label> 
                                                    </Col>
                                                    <Col xl="7" className="col-7 font-weight-bold pt-1"><span>부산</span></Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-6" xl="3" lg="3">
                                                <Row>
                                                    <Col xl="4" className="col-4 mb-1 pr-0">
                                                        <Label className="pt-1 mb-0" >반입지:</Label> 
                                                    </Col>
                                                    <Col xl="8" className="col-8 font-weight-bold pt-1"><span>부산신항</span></Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                                <Card className="no-transition rounded-0">
                                    <CardBody className="pt-0 pb-0">
                                        <Row>
                                            <Col className="col-0 pt-1 text-center" xl="0">2.
                                            </Col>
                                            <Col className="col-6" xl="3" lg="3">
                                                <Row>
                                                    <Col xl="4" className="col-4 mb-1">
                                                        <Label className="pt-1 mb-0" >SIZE/TYPE:</Label> 
                                                    </Col>
                                                    <Col xl="8" className="col-8 font-weight-bold pt-1"><span>20`REEFER</span></Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-5" xl="2" lg="2">
                                                <Row>
                                                    <Col xl="4" className="col-4 mb-1">
                                                        <Label className="pt-1 mb-0" >COUNT:</Label> 
                                                    </Col>
                                                    <Col xl="8" className="col-8 font-weight-bold pt-1"><span>5</span></Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-6" xl="3" lg="3">
                                                <Row>
                                                    <Col xl="6" lg="7" md="7" className="col-6 mb-1">
                                                        <Label className="pt-1 mb-0" >PICK UP지역:</Label> 
                                                    </Col>
                                                    <Col xl="6" lg="5" md="5" className="col-6 font-weight-bold pt-1"><span>부산</span></Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-6" xl="3" lg="3">
                                                <Row>
                                                    <Col xl="6" className="col-6 mb-1 pr-0">
                                                        <Label className="pt-1 mb-0" >PICK UP DATE:</Label> 
                                                    </Col>
                                                    <Col xl="6" className="col-6 font-weight-bold pt-1"><span>20201222</span></Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-6" xl="2" lg="2">
                                                <Row>
                                                    <Col xl="6" lg="6" md="6" className="col-4 mb-1">
                                                        <Label className="pt-1 mb-0" >온도:</Label> 
                                                    </Col>
                                                    <Col xl="6" lg="6" md="6" className="col-8 font-weight-bold pt-1"><span>-5℃</span></Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row id="Trucker">
                                            <Col className="col-12" xl="12" lg="12" sm="12">
                                                <hr className="mt-1 mb-1"/>
                                            </Col>
                                            <Col className="col-12 text-left" xl="12" lg="12" sm="12">
                                                <h5 className="mt-0">Trucker</h5>
                                            </Col>
                                            <Col className="col-5" xl="3" lg="3">
                                                <Row>
                                                    <Col xl="5" className="col-6 mb-1">
                                                        <Label className="pt-1 mb-0" >운송구분:</Label> 
                                                    </Col>
                                                    <Col xl="7" className="col-6 font-weight-bold pt-1"><span>자가</span></Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-6" xl="3" lg="3">
                                                <Row>
                                                    <Col xl="5" className="col-5 mb-1">
                                                        <Label className="pt-1 mb-0" >운송사명:</Label> 
                                                    </Col>
                                                    <Col xl="7" className="col-7 font-weight-bold pt-1"><span>케이엘넷</span></Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-6" xl="3" lg="3">
                                                <Row>
                                                    <Col xl="4" className="col-5 mb-1 pr-0">
                                                        <Label className="pt-1 mb-0" >담당자:</Label> 
                                                    </Col>
                                                    <Col xl="8" className="col-7 font-weight-bold pt-1"><span>홍길동</span></Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-6" xl="3" lg="3">
                                                <Row>
                                                    <Col xl="4" lg="4" md="4" className="col-5 mb-1 pr-0">
                                                        <Label className="pt-1 mb-0" >연락처:</Label> 
                                                    </Col>
                                                    <Col xl="8" lg="8" className="col-7 font-weight-bold pt-1"><span>010-1234-1234</span></Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-7" xl="3" lg="3">
                                                <Row>
                                                    <Col xl="5" className="col-5 mb-1 pr-0">
                                                        <Label className="pt-1 mb-0" >작업지주소:</Label> 
                                                    </Col>
                                                    <Col xl="7" className="col-7 font-weight-bold pt-1"><span>부산</span></Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-5" xl="3" lg="3">
                                                <Row>
                                                    <Col xl="4" className="col-5 mb-1 pr-0">
                                                        <Label className="pt-1 mb-0" >작업일:</Label> 
                                                    </Col>
                                                    <Col xl="8" className="col-7 font-weight-bold pt-1"><span></span></Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-6" xl="3" lg="3">
                                                <Row>
                                                    <Col xl="5" className="col-5 mb-1 pr-0">
                                                        <Label className="pt-1 mb-0" >PICK UP CY:</Label> 
                                                    </Col>
                                                    <Col xl="7" className="col-7 font-weight-bold pt-1"><span>부산</span></Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-6" xl="3" lg="3">
                                                <Row>
                                                    <Col xl="4" className="col-4 mb-1 pr-0">
                                                        <Label className="pt-1 mb-0" >반입지:</Label> 
                                                    </Col>
                                                    <Col xl="8" className="col-8 font-weight-bold pt-1"><span>부산신항</span></Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </ui>
                        </CardBody>                      
                    </Card>
                    
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
                                    document.getElementById("Partes").scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                    inline: "nearest",
                                    });
                                }}
                                >
                                <span className="cd-dot bg-secondary" />
                                <span className="cd-label">Partes</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!"
                                data-number="3"
                                //href="#teams"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("Cargo").scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                    inline: "nearest",
                                    });
                                }}
                                >
                                <span className="cd-dot bg-secondary" />
                                <span className="cd-label">Cargo</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!"
                                data-number="4"
                                //href="#projects"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("Container").scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                    inline: "nearest",
                                    });
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
                                        <Button className="mr-1" color="default">
                                        Save As
                                        </Button>
                                        <Button className="btn-magnify mr-1" color="default">
                                        SR
                                        </Button>
                                        <Button className="mr-1" color="default">
                                        Send
                                        </Button>
                                        <Button //className="btn-magnify btn-round mr-1" 
                                        color="default">
                                        Cancle
                                        </Button>
                                    </FormGroup>
                                </Col>
                    </Row>
                        </TabPane>
                    </TabContent>
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