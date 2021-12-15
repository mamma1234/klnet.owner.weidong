import React from "react";

// reactstrap components
import {
    Row, Col, 
    // NavItem, NavLink, 
    Table,
    // Nav, TabContent,
    Card, 
    // CardImg, 
    CardText, CardBody, CardHeader, Collapse,CardTitle,
    Button, Container, Form, FormGroup, Label, Input, DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem, ButtonGroup
} from "reactstrap";
import Modal from "./BookingModal.js";

export default function NewBooking(props) {

    // const [collapses, setCollapses] = React.useState([]);
    // const [classic, setClassic] = React.useState(false);
    // const [openPopUp, setOpenPopUp] = React.useState(false);
    const [popUpTitle, setPopUpTitle] = React.useState(null);
    const [popUpConText, setPopUpConText] = React.useState(null);
    const [visible, setVisible] = React.useState(false);
    const [consigneeName, setConsigneeName] = React.useState("UNITED KLNET");
    const [consigneeCode, setConsigneeCode] = React.useState("UNKLNET");
    const [personIncharge, setPersonIncharge] = React.useState("JAMES");
    const [tel, setTel] = React.useState("02-7394-1985");
    const [address, setAddress] = React.useState("서울특별시 강남구 역삼로 153");
    const [email, setEmail] = React.useState("MOVESKILL@KLNET.CO.KR");
    const [fax, setFax] = React.useState("02-7394-0555");
    const [dept, setDept] = React.useState("미주 수출");
    const [shipperName, setShipperName] = React.useState("RG ELECTRONICS INC.");
    const [shipperId, setShipperId] = React.useState("RGE");
    const [shipperPic, setShipperPic] = React.useState("KIM KIL DONG");
    const [shipperTel, setShipperTel] = React.useState("02-3706-5114");
    const [shipperEmail, setShipperEmail] = React.useState("ADMIN@HDMU.COM");
    const [shipperFax, setShipperFax] = React.useState("02-992-2321");
    const [shipperAddress, setShipperAddress] = React.useState("RG ELETRONICS INC RG TWIN TOWERS");
    const [fwName, setFwName] = React.useState("PANTOS LOGSTICS.,LTD.");
    const [fwCode, setFwCode] = React.useState("PANTOS");
    const [fwPic, setFwPic] = React.useState("JANG KIL DONG");
    const [fwTel, setFwTel] = React.useState("02-3706-5114");
    const [fwEmail, setFwEmail] = React.useState("JANG@PANTOS.COM");
    const [fwFax, setFwFax] = React.useState("02-992-2321");
    const [fwAddress, setFwAddress] = React.useState("PANTOS LOGSTICS.,LTD. SEOUL YEOUI-DAERO, ");
    const [carrierKname, setCarrierKname] = React.useState("현대상선(주)");
    const [carrierName, setCarrierName] = React.useState("HMM");
    const [carrierCode, setCarrierCode] = React.useState("HDMU");
    const [carrierTel, setCarrierTel] = React.useState("02-3706-5114");
    const [carrierEmail, setCarrierEmail] = React.useState("ADMIN@HDMU.COM");
    const [carrierFax, setCarrierFax] = React.useState("02-734-8496");
    const [manager, setManager] = React.useState("홍길동");
    const [carrierAddress, setCairrerAddress] = React.useState("서울특별시 종로구 율곡로 194 현대그룹빌딩");
    const [conSize, setConSize] = React.useState("20");
    const [conType, setConType] = React.useState("DRY");
    const [socYN, setSocYN] = React.useState(false);
    const [specialYN, setSpecialYN] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);
    const [open6, setOpen6] = React.useState(false);
    const [clsNm, setClsNm] = React.useState("");
    const [vessel, setVessel] = React.useState("WEST SIDE");
    const [voyage, setVoyage] = React.useState("52/W");
    const [term, setTerm] = React.useState("CY -> CY");
    const [pol, setPol] = React.useState("KRPUS");
    const [etd, setEtd] = React.useState("20201225");
    const [pod, setPod] = React.useState("CNCHH");
    const [eta, setEta] = React.useState("20210110");


    const divider = {

        width: '100%',
        borderTop: '1px solid',
        paddingTop: '10px',
        paddingBottom: '10px'
    }
    const scheduleModal = (dvCd) => {
        // dcCd S: 일반, F: FullScreen
        (dvCd === 'F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setVisible(true);
        setPopUpTitle("SCHEDULE");
        setPopUpConText(
            <>
                <Row>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="select" name="carrier" id="carrier">
                                <option>CY -> CY</option>
                                <option>CY -> CFS</option>
                                <option>CFS -> CY</option>
                                <option>DOOR TO DOOR</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="VESSEL" defaultValue={vessel} onChange={(e) => setVessel(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="VOYAGE" defaultValue={voyage} onChange={(e) => setVoyage(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <div style={divider} />
                <Row>
                    <Col xl="3" lg="3">
                        <FormGroup>
                            <Input type="text" placeholder="POL" defaultValue={pol} onChange={(e) => setPol(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col xl="3" lg="3">
                        <FormGroup>
                            <Input type="text" placeholder="ETD" defaultValue={etd} onChange={(e) => setEtd(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col xl="3" lg="3">
                        <FormGroup>
                            <Input type="text" placeholder="POD" defaultValue={pod} onChange={(e) => setPod(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col xl="3" lg="3">
                        <FormGroup>
                            <Input type="text" placeholder="ETA" defaultValue={eta} onChange={(e) => setEta(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <div style={divider} />
                <Row>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="GrossWeight(KG)" defaultValue=""/>
                        </FormGroup>
                    </Col>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Payment Type" defaultValue=""/>
                        </FormGroup>
                    </Col>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="select" name="carrier" id="carrier">
                                <option>PREPAID</option>
                                <option>COLLECT</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Package Qty" defaultValue=""/>
                        </FormGroup>
                    </Col>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Pacakge Type" defaultValue=""/>
                        </FormGroup>
                    </Col>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Remark" defaultValue=""/>
                        </FormGroup>
                    </Col>
                </Row>
            </>

        )
    }
    const carrierModal = (dvCd) => {
        // dcCd S: 일반, F: FullScreen
        (dvCd === 'F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setVisible(true);
        setPopUpTitle("CARRIER");
        setPopUpConText(
            <>

                <Row>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Carrier Code" defaultValue={carrierCode} onChange={(e) => setCarrierCode(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Carrier Name" defaultValue={carrierName} onChange={(e) => setCarrierName(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Carrier Korean Name" defaultValue={carrierKname} onChange={(e) => setCarrierKname(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <div style={divider} />
                <Row>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Tel" defaultValue={carrierTel} onChange={(e) => setCarrierTel(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Email" defaultValue={carrierEmail} onChange={(e) => setCarrierEmail(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Fax" defaultValue={carrierFax} onChange={(e) => setCarrierFax(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <div style={divider} />
                <Row>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Manager" defaultValue={manager} onChange={(e) => setManager(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col xl="8" lg="8">
                        <FormGroup>
                            <Input type="text" placeholder="Address" defaultValue={carrierAddress} onChange={(e) => setCairrerAddress(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
            </>


        )
    }
    const conTypeModal = (dvCd) => {
        // dcCd S: 일반, F: FullScreen
        (dvCd === 'F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setVisible(true);
        setPopUpTitle("CONTAINER");
        setPopUpConText(
            <>

                <Row>
                    <Col xl="3" lg="3">
                        <FormGroup>
                            <UncontrolledDropdown>
                                <ButtonGroup>
                                    <Button style={{ backgroundColor: '#ffffff' }} type="button">
                                        {conSize}
                                    </Button>
                                    <DropdownToggle
                                        aria-expanded={false}
                                        aria-haspopup={true}
                                        caret
                                        className="dropdown-toggle-split"
                                        color="default"
                                        data-toggle="dropdown"
                                        type="button">
                                        <span className="sr-only">Toggle Dropdown</span>
                                    </DropdownToggle>
                                </ButtonGroup>
                                <DropdownMenu aria-labelledby="dropdownMenuButton">
                                    <DropdownItem href="#pablo" onClick={e => { conSize(e.target.text) }}>
                                        20
                                    </DropdownItem>
                                    <DropdownItem href="#pablo" onClick={e => { conSize(e.target.text) }}>
                                        40
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </FormGroup>
                    </Col>
                    <Col xl="3" lg="3">
                        <UncontrolledDropdown>
                            <ButtonGroup >
                                <Button style={{ backgroundColor: '#ffffff' }} type="button">
                                    {conType}
                                </Button>
                                <DropdownToggle
                                    aria-expanded={false}
                                    aria-haspopup={true}
                                    caret
                                    className="dropdown-toggle-split"
                                    color="default"
                                    data-toggle="dropdown"
                                    type="button">
                                    <span className="sr-only">Toggle Dropdown</span>
                                </DropdownToggle>
                            </ButtonGroup>
                            <DropdownMenu aria-labelledby="dropdownMenuButton">
                                <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                                    DRY
                                </DropdownItem>
                                <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                                    REFFER
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Col>
                    <Col xl="3" lg="3">
                        <FormGroup check>
                            <Label className="mb-0">SOC</Label>
                                <Label check>
                                    <Input defaultValue="" type="checkbox" onClick={setSocYN(true)} />
                                    <span className="form-check-sign" />
                                </Label>
                        </FormGroup>
                    </Col>
                    <Col xl="3" lg="3">
                        <FormGroup check>
                            <Label className="mb-0">특수화물</Label>
                                <Label check>
                                    <Input defaultValue="" type="checkbox" onClick={setSpecialYN(true)} />
                                    <span className="form-check-sign" />
                                </Label>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                <Table hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th scope="row">SIZE</th>
                        <th scope="row">TYPE</th>
                        <th scope="row">QTY</th>
                        <th scope="row">Pickup Date</th>
                        <th scope="row">Pickup Place</th>
                        <th scope="row">Person/Tel</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th >1</th>
                        <td>20</td>
                        <td>DRY</td>
                        <td>1</td>
                        <td>20200110</td>
                        <td>CHCNN</td>
                        <td>HONG/020-1211-2322</td>
                        </tr>
                        <tr>
                        <th >2</th>
                        <td>40</td>
                        <td>REEFER</td>
                        <td>2</td>
                        <td>20200110</td>
                        <td>CHCNN</td>
                        <td>HONG/020-1211-2322</td>
                        </tr>
                        <tr>
                        <th >3</th>
                        <td>45</td>
                        <td>HIGH CUBE</td>
                        <td>1</td>
                        <td>20200110</td>
                        <td>CHCNN</td>
                        <td>HONG/020-1211-2322</td>
                        </tr>
                    </tbody>
                    </Table>
                    </Row>
            </>


        )
    }

    const shipperModal = (dvCd) => {
        // dcCd S: 일반, F: FullScreen
        (dvCd === 'F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setVisible(true);
        setPopUpTitle("SHIPPER");
        setPopUpConText(
            <>

                <Row>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Shipper Name" defaultValue={shipperName} onChange={(e) => setShipperName(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Shipper ID" defaultValue={shipperId} onChange={(e) => setCarrierName(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Person in Charge" defaultValue={shipperPic} onChange={(e) => setShipperPic(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <div style={divider} />
                <Row>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Tel" defaultValue={shipperTel} onChange={(e) => setShipperTel(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Email" defaultValue={shipperEmail} onChange={(e) => setShipperEmail(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Fax" defaultValue={shipperFax} onChange={(e) => setShipperFax(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <div style={divider} />
                <Row>
                    <Col xl="12" lg="12">
                        <FormGroup>
                            <Input type="text" placeholder="Address" defaultValue={shipperAddress} onChange={(e) => setShipperAddress(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
            </>


        )
    }

    const fowarderModal = (dvCd) => {
        // dcCd S: 일반, F: FullScreen
        (dvCd === 'F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setVisible(true);
        setPopUpTitle("FOWARDER");
        setPopUpConText(
            <>

                <Row>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Forwarder Name" defaultValue={fwName} onChange={(e) => setFwName(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Forwarder Code" defaultValue={fwCode} onChange={(e) => setFwCode(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Person in Charge" defaultValue={fwPic} onChange={(e) => setFwPic(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <div style={divider} />
                <Row>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Tel" defaultValue={fwTel} onChange={(e) => setFwTel(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Email" defaultValue={fwEmail} onChange={(e) => setFwEmail(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Fax" defaultValue={fwFax} onChange={(e) => setFwFax(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <div style={divider} />
                <Row>
                    <Col xl="12" lg="12">
                        <FormGroup>
                            <Input type="text" placeholder="Address" defaultValue={fwAddress} onChange={(e) => setFwAddress(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
            </>


        )
    }

    const consigneeModal = (dvCd) => {
        // dcCd S: 일반, F: FullScreen
        (dvCd === 'F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setVisible(true);
        setPopUpTitle("CONSIGNEE");
        setPopUpConText(
            <>

                <Row>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Consignee Name" defaultValue={consigneeName} onChange={(e) => setConsigneeName(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Consignee Code" defaultValue={consigneeCode} onChange={(e) => setConsigneeName(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Person in Charge" defaultValue={personIncharge} onChange={(e) => setPersonIncharge(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <div style={divider} />
                <Row>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Tel" defaultValue={tel} onChange={(e) => setTel(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col xl="4" lg="4">
                        <FormGroup>
                            <Input type="text" placeholder="Fax" defaultValue={fax} onChange={(e) => setFax(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <div style={divider} />
                <Row>
                    <Col xl="12" lg="12">
                        <FormGroup>
                            <Input type="text" placeholder="Address" defaultValue={address} onChange={(e) => setAddress(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
            </>


        )
    }

    return (
        <div className="main" id="Schedule">
            <div className="section">
                <Form>
                    <Container>
                        <CardHeader className="bg-light"  >
                            <FormGroup >
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
                                            KRPUS to CHCNN Template
                                    </DropdownItem>
                                        <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                                            KRPUS to JPTYO Template
                                    </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>
                        </CardHeader>
                        <CardBody className="bg-light" >
                            <Row>
                                <Col xl="4" lg="6">
                                    <FormGroup>
                                        <div>
                                            <Card className="no-transition">
                                                <CardHeader className="bg-white">
                                                    <FormGroup>
                                                    <ButtonGroup className="pull-right">
                                                        {open1 ?
                                                            <Button close aria-label="Cancel" onClick={() => setOpen1(!open1)}>
                                                                <span aria-hidden>&ndash;</span>
                                                            </Button>
                                                            :
                                                            <Button close aria-label="Cancel" onClick={() => setOpen1(!open1)}>
                                                                <span aria-hidden>+</span>
                                                            </Button>
                                                        }
                                                        <Button close aria-label="Cancel" onClick={scheduleModal.bind(this, 'S')}>
                                                            <span aria-hidden>&#9635;</span>
                                                        </Button>
                                                        <Button close aria-label="Cancel" onClick={scheduleModal.bind(this, 'F')}>
                                                            <span aria-hidden>&#9726;</span>
                                                        </Button>


                                                    </ButtonGroup>
                                                        <Label className="mb-0">SCHEDULE</Label>
                                                        {/* <i className="nc-icon nc-bullet-list-67" onClick={() => setOpen1(!open1)} /> */}
                                                        <Input type="select" name="carrier" id="carrier">
                                                            <option>KRPUS to CNCHH</option>
                                                            <option>KRKAN to JPTYO</option>
                                                            <option>KRINC to CNCHH</option>
                                                        </Input>

                                                    </FormGroup>

                                                </CardHeader>
                                                <Collapse isOpen={open1}>
                                                    {/* <Button onClick={scheduleModal} color="neutral"> */}

                                                        <CardBody>
                                                            <Row>
                                                                <Col xl="12" lg="12">
                                                                    <Card>
                                                                        <CardBody onClick={scheduleModal.bind(this, 'S')}>
                                                                        <CardTitle>Term : </CardTitle>
                                                                        <CardText tag="h5" className="font-weight-bold">{term}</CardText>
                                                                        <CardTitle>Vessel : </CardTitle>
                                                                        <CardText tag="h5" className="font-weight-bold">{vessel}</CardText>
                                                                        <CardTitle>Voyage : </CardTitle>
                                                                        <CardText tag="h5" className="font-weight-bold">{voyage}</CardText>
                                                                        <CardTitle>POL : </CardTitle>
                                                                        <CardText tag="h5" className="font-weight-bold">{pol}</CardText>
                                                                        <CardTitle>ETD : </CardTitle>
                                                                        <CardText tag="h5" className="font-weight-bold">{etd}</CardText>
                                                                        <CardTitle>POD : </CardTitle>
                                                                        <CardText tag="h5" className="font-weight-bold">{pod}</CardText>
                                                                        <CardTitle>ETA : </CardTitle>
                                                                        <CardText tag="h5" className="font-weight-bold">{eta}</CardText>
                                                                        </CardBody>
                                                                    </Card>
                                                                </Col>
                                                            </Row>
                                                        </CardBody>

                                                    {/* </Button> */}
                                                </Collapse>

                                            </Card>
                                        </div>

                                    </FormGroup>
                                </Col>
                                <Col xl="4" lg="6" id="Carrier">
                                    <FormGroup>
                                        <Card id={1} className="no-transition">
                                            <CardHeader className="bg-white">

                                                <FormGroup>
                                                    <ButtonGroup className="pull-right">
                                                        {open2 ?
                                                            <Button close aria-label="Cancel" onClick={() => setOpen2(!open2)}>
                                                                <span aria-hidden>&ndash;</span>
                                                            </Button>
                                                            :
                                                            <Button close aria-label="Cancel" onClick={() => setOpen2(!open2)}>
                                                                <span aria-hidden>+</span>
                                                            </Button>
                                                        }
                                                        <Button close aria-label="Cancel" onClick={carrierModal.bind(this, 'S')}>
                                                            <span aria-hidden>&#9635;</span>
                                                        </Button>
                                                        <Button close aria-label="Cancel" onClick={carrierModal.bind(this, 'F')}>
                                                            <span aria-hidden>&#9726;</span>
                                                        </Button>

                                                    </ButtonGroup>
                                                    <Label className="mb-0">CARRIER</Label>
                                                    {/* <i className="nc-icon nc-bullet-list-67" onClick={() => setOpen2(!open2)}/> */}
                                                    <Input type="select" name="carrier" id="carrier">
                                                        <option>현대상선(주)</option>
                                                        <option>씨엠에이씨지엠</option>
                                                        <option>장금상선(주)</option>
                                                        <option>남성해운주식회사</option>
                                                    </Input>
                                                </FormGroup>
                                            </CardHeader>
                                            <Collapse isOpen={open2}>
                                                {/* <Button onClick={carrierModal} color="neutral"> */}
                                                <CardBody color="neutral">
                                                    <Row>
                                                        <Col xl="12" lg="12">
                                                            <Card>
                                                                <CardBody onClick={carrierModal.bind(this, 'S')}>
                                                                <CardTitle>Carrier Name : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{carrierName}</CardText>
                                                                <CardTitle>Carrier Code : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{carrierCode}</CardText>
                                                                <CardTitle>Carrier KName : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{carrierKname}</CardText>
                                                                <CardTitle>Tel : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{carrierTel}</CardText>
                                                                <CardTitle>Email : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{carrierEmail}</CardText>
                                                                <CardTitle>Fax : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{carrierFax}</CardText>
                                                                <CardTitle>Manager : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{manager}</CardText>
                                                                <CardTitle>Address : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{carrierAddress}</CardText>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                                {/* </Button> */}
                                            </Collapse>
                                        </Card>


                                    </FormGroup>
                                </Col>
                                <Col xl="4" lg="6" id="Container">
                                    <FormGroup>
                                        <Card id={2} className="no-transition">
                                            <CardHeader className="bg-white">

                                                <FormGroup>
                                                    <ButtonGroup className="pull-right">
                                                        {open3 ?
                                                            <Button close aria-label="Cancel" onClick={() => setOpen3(!open3)}>
                                                                <span aria-hidden>&ndash;</span>
                                                            </Button>
                                                            :
                                                            <Button close aria-label="Cancel" onClick={() => setOpen3(!open3)}>
                                                                <span aria-hidden>+</span>
                                                            </Button>
                                                        }
                                                        <Button close aria-label="Cancel" onClick={conTypeModal.bind(this, 'S')}>
                                                            <span aria-hidden>&#9635;</span>
                                                        </Button>
                                                        <Button close aria-label="Cancel" onClick={conTypeModal.bind(this, 'F')}>
                                                            <span aria-hidden>&#9726;</span>
                                                        </Button>

                                                    </ButtonGroup>
                                                    <Label className="mb-0">CONTAINER</Label>
                                                    {/* <i className="nc-icon nc-bullet-list-67" onClick={() => setOpen3(!open3)} /> */}
                                                    <Input type="select" name="container" id="container">
                                                        <option>20D</option>
                                                        <option>40D</option>
                                                    </Input>
                                                </FormGroup>
                                            </CardHeader>
                                            <Collapse isOpen={open3}>
                                                {/* <Button onClick={conTypeModal} color="neutral"> */}
                                                    <CardBody>
                                                        <Row>
                                                            <Col xl="12" lg="12">
                                                                {/* <FormGroup>
                                                                    <Label className="mb-0">SIZE : </Label><span>{conSize}</span>
                                                                </FormGroup> */}
                                                            <Card>
                                                                <CardBody onClick={conTypeModal.bind(this, 'S')}>
                                                                <Table hover>
                                                                    <thead>
                                                                        <tr>
                                                                        <th scope="row">SIZE</th>
                                                                        <th scope="row">QTY</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                        <td>20</td>
                                                                        <td>1</td>
                                                                        </tr>
                                                                        <tr>
                                                                        <td>40</td>
                                                                        <td>2</td>
                                                                        </tr>
                                                                        <tr>
                                                                        <td>45</td>
                                                                        <td>1</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </Table>
                                                            </CardBody>
                                                            </Card>
                                                            </Col>
                                                            {/* <Col xl="12" lg="12">
                                                                <FormGroup>
                                                                    <Label className="mb-0">TYPE : </Label><span>{conType}</span>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col xl="12" lg="12">
                                                                <FormGroup>
                                                                    <Label className="mb-0">SOC : </Label><span>{socYN === true ? "Y" : "N"}</span>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col xl="12" lg="12">
                                                                <FormGroup>
                                                                    <Label className="mb-0">SPECIAL : </Label><span>{specialYN === true ? "Y" : "N"}</span>
                                                                </FormGroup>
                                                            </Col> */}
                                                        </Row>
                                                    </CardBody>
                                                {/* </Button> */}
                                            </Collapse>
                                        </Card>


                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl="4" lg="6" id="Shipper">
                                    <FormGroup>
                                        <Card id={3} className="no-transition">
                                            <CardHeader className="bg-white">
                                                <FormGroup>
                                                    <ButtonGroup className="pull-right">
                                                        {open4 ?
                                                            <Button close aria-label="Cancel" onClick={() => setOpen4(!open4)}>
                                                                <span aria-hidden>&ndash;</span>
                                                            </Button>
                                                            :
                                                            <Button close aria-label="Cancel" onClick={() => setOpen4(!open4)}>
                                                                <span aria-hidden>+</span>
                                                            </Button>
                                                        }
                                                        <Button close aria-label="Cancel" onClick={shipperModal.bind(this, 'S')}>
                                                            <span aria-hidden>&#9635;</span>
                                                        </Button>
                                                        <Button close aria-label="Cancel" onClick={shipperModal.bind(this, 'F')}>
                                                            <span aria-hidden>&#9726;</span>
                                                        </Button>

                                                    </ButtonGroup>
                                                    <Label className="mb-0">SHIPPER</Label>
                                                    {/* <i className="nc-icon nc-bullet-list-67" onClick={() => setOpen4(!open4)} /> */}
                                                    <Input type="select" name="carrier" id="carrier">
                                                        <option>RG ELECTRONICS.</option>
                                                        <option></option>
                                                        <option></option>
                                                    </Input>
                                                </FormGroup>
                                            </CardHeader>
                                            <Collapse isOpen={open4}>
                                                {/* <Button onClick={scheduleModal} color="neutral"> */}
                                                    <CardBody>
                                                        <Row>
                                                            <Col xl="12" lg="12">
                                                            <Card>
                                                                <CardBody onClick={shipperModal.bind(this, 'S')}>
                                                                <CardTitle>Shipper Name : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{shipperName}</CardText>
                                                                <CardTitle>Shipper ID : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{shipperId}</CardText>
                                                                <CardTitle>Person in Charge : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{shipperPic}</CardText>
                                                                <CardTitle>Tel : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{shipperTel}</CardText>
                                                                <CardTitle>Email : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{shipperEmail}</CardText>
                                                                <CardTitle>Fax : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{shipperFax}</CardText>
                                                                <CardTitle>Address : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{shipperAddress}</CardText>
                                                                </CardBody>
                                                            </Card>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                {/* </Button> */}
                                            </Collapse>
                                        </Card>


                                    </FormGroup>
                                </Col>
                                <Col xl="4" lg="6" id="Forwarder">
                                    <FormGroup>
                                        <Card id={4} className="no-transition">
                                            <CardHeader className="bg-white">

                                                <FormGroup>
                                                    <ButtonGroup className="pull-right">
                                                        {open5 ?
                                                            <Button close aria-label="Cancel" onClick={() => setOpen5(!open5)}>
                                                                <span aria-hidden>&ndash;</span>
                                                            </Button>
                                                            :
                                                            <Button close aria-label="Cancel" onClick={() => setOpen5(!open5)}>
                                                                <span aria-hidden>+</span>
                                                            </Button>
                                                        }
                                                        <Button close aria-label="Cancel" onClick={fowarderModal.bind(this, 'S')}>
                                                            <span aria-hidden>&#9635;</span>
                                                        </Button>
                                                        <Button close aria-label="Cancel" onClick={fowarderModal.bind(this, 'F')}>
                                                            <span aria-hidden>&#9726;</span>
                                                        </Button>

                                                    </ButtonGroup>
                                                    <Label className="mb-0">FORWARDER</Label>
                                                    {/* <i className="nc-icon nc-bullet-list-67" onClick={() => setOpen5(!open5)} /> */}
                                                    <Input type="select" name="carrier" id="carrier">
                                                        <option>PANTOS</option>
                                                    </Input>
                                                </FormGroup>
                                            </CardHeader>
                                            <Collapse isOpen={open5}>
                                                {/* <Button onClick={scheduleModal} color="neutral"> */}
                                                    <CardBody>
                                                        <Row>
                                                            <Col xl="12" lg="12">
                                                            <Card>
                                                                <CardBody onClick={fowarderModal.bind(this, 'S')}>
                                                                <CardTitle>Forwarder Name : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{fwName}</CardText>
                                                                <CardTitle>Forwarder Code : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{fwCode}</CardText>
                                                                <CardTitle>Person in Charge : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{fwPic}</CardText>
                                                                <CardTitle>Tel : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{fwTel}</CardText>
                                                                <CardTitle>Email : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{fwEmail}</CardText>
                                                                <CardTitle>Fax : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{fwFax}</CardText>
                                                                <CardTitle>Address : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{fwAddress}</CardText>
                                                                </CardBody>
                                                            </Card>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                {/* </Button> */}
                                            </Collapse>
                                        </Card>


                                    </FormGroup>
                                </Col>
                                <Col xl="4" lg="6" id="Consignee">
                                    <FormGroup>
                                        <Card id={5} className="no-transition">
                                            <CardHeader className="bg-white">

                                                <FormGroup>
                                                    <ButtonGroup className="pull-right">
                                                        {open6 ?
                                                            <Button close aria-label="Cancel" onClick={() => setOpen6(!open6)}>
                                                                <span aria-hidden>&ndash;</span>
                                                            </Button>
                                                            :
                                                            <Button close aria-label="Cancel" onClick={() => setOpen6(!open6)}>
                                                                <span aria-hidden>+</span>
                                                            </Button>
                                                        }
                                                        <Button close aria-label="Cancel" onClick={consigneeModal.bind(this, 'S')}>
                                                            <span aria-hidden>&#9635;</span>
                                                        </Button>
                                                        <Button close aria-label="Cancel" onClick={consigneeModal.bind(this, 'F')}>
                                                            <span aria-hidden>&#9726;</span>
                                                        </Button>

                                                    </ButtonGroup>
                                                    <Label className="mb-0">CONSIGNEE</Label>
                                                    {/* <i className="nc-icon nc-bullet-list-67" onClick={() => setOpen6(!open6)} /> */}
                                                    <Input type="select" name="carrier" id="carrier">
                                                        <option>UNITED KLNET</option>
                                                        <option>CHINA TEMP</option>
                                                        <option>SAMSONG</option>
                                                    </Input>
                                                </FormGroup>
                                            </CardHeader>
                                            <Collapse isOpen={open6}>
                                                {/* <Button onClick={scheduleModal} color="neutral"> */}
                                                    <CardBody>
                                                        <Row>
                                                            <Col xl="12" lg="12">
                                                            <Card>
                                                                <CardBody onClick={consigneeModal.bind(this, 'S')}>
                                                                <CardTitle>Consignee Name : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{consigneeName}</CardText>
                                                                <CardTitle>Consignee Code : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{consigneeCode}</CardText>
                                                                <CardTitle>Person in Charge : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{personIncharge}</CardText>
                                                                <CardTitle>Tel : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{tel}</CardText>
                                                                <CardTitle>Email : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{email}</CardText>
                                                                <CardTitle>Fax : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{fax}</CardText>
                                                                <CardTitle>Dept : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{dept}</CardText>
                                                                <CardTitle>Address : </CardTitle>
                                                                <CardText tag="h5" className="font-weight-bold">{address}</CardText>
                                                                </CardBody>
                                                            </Card>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                {/* </Button> */}
                                            </Collapse>
                                        </Card>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                        <Row>
                        <nav id="cd-vertical-nav">
                        <ul>
                        <li>
                            <a href="#!"
                            data-number="1"
                            //href="#headers"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("Schedule").scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                                inline: "nearest",
                                });
                            }}
                            >
                            <span className="cd-dot bg-secondary" />
                            <span className="cd-label">Schedule</span>
                            </a>
                        </li>
                        <li>
                            <a href="#!"
                            data-number="2"
                            //href="#features"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("Carrier").scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                                inline: "nearest",
                                });
                            }}
                            >
                            <span className="cd-dot bg-secondary" />
                            <span className="cd-label">Carrier</span>
                            </a>
                        </li>
                        <li>
                            <a href="#!"
                            data-number="3"
                            //href="#teams"
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
                        <li>
                            <a href="#!"
                            data-number="4"
                            //href="#projects"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("Shipper").scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                                inline: "nearest",
                                });
                            }}
                            >
                            <span className="cd-dot bg-secondary" />
                            <span className="cd-label">Shipper</span>
                            </a>
                        </li>
                        <li>
                        <a href="#!"
                        data-number="5"
                        //href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("Forwarder").scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                            inline: "nearest",
                            });
                        }}
                        >
                        <span className="cd-dot bg-secondary" />
                        <span className="cd-label">Forwarder</span>
                        </a>
                    </li>  
                    <li>
                    <a href="#!"
                    data-number="6"
                    //href="#projects"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("Consignee").scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                        inline: "nearest",
                        });
                    }}
                    >
                    <span className="cd-dot bg-secondary" />
                    <span className="cd-label">Consignee</span>
                    </a>
                </li>   
                        </ul>
                    </nav>
                </Row>
                    </Container>
                </Form>
                <Modal
                    isOpen={visible}
                    title={popUpTitle}
                    context={popUpConText}
                    clsNm={clsNm}
                    close={() => setVisible(false)}>
                </Modal>

            </div>
        </div>
    );
}





// isOpen: _propTypes.default.bool,
//   autoFocus: _propTypes.default.bool,
//   centered: _propTypes.default.bool,
//   scrollable: _propTypes.default.bool,
//   size: _propTypes.default.string,
//   toggle: _propTypes.default.func,
//   keyboard: _propTypes.default.bool,
//   role: _propTypes.default.string,
//   labelledBy: _propTypes.default.string,
//   backdrop: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['static'])]),
//   onEnter: _propTypes.default.func,
//   onExit: _propTypes.default.func,
//   onOpened: _propTypes.default.func,
//   onClosed: _propTypes.default.func,
//   children: _propTypes.default.node,
//   className: _propTypes.default.string,
//   wrapClassName: _propTypes.default.string,
//   modalClassName: _propTypes.default.string,
//   backdropClassName: _propTypes.default.string,
//   contentClassName: _propTypes.default.string,
//   external: _propTypes.default.node,
//   fade: _propTypes.default.bool,
//   cssModule: _propTypes.default.object,
//   zIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
//   backdropTransition: FadePropTypes,
//   modalTransition: FadePropTypes,
//   innerRef: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string, _propTypes.default.func]),
//   unmountOnClose: _propTypes.default.bool,
//   returnFocusAfterClose: _propTypes.default.bool