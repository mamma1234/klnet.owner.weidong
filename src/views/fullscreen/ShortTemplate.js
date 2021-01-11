/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import 'assets/css/App.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    ButtonGroup, Button,FormGroup,Label,Input, Card, CardHeader, CardTitle, CardText} from "reactstrap";
// import BookingTemplate from './BookingTemplate';



const ShortTemplate = (props) => {
//   const {
//     Template,
//     title
//   } = props;

  useEffect(() => {
    console.log("렌더링 될 때마다 수행");
  },[]);

//   const divider = {
//     width: "100%",
//     borderTop: "1px solid",
//     paddingTop: "10px",
//     paddingBottom: "10px",
//   };

  // modal 창을 위한 state
  const [coll, setColl] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = (params) => {
      (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
      setOpen(!open);
  }
  // 중요내용 부모/자식 공유를 위한 state
  const [vessel, setVessel] = React.useState("WEST SIDE");
  const [voyage, setVoyage] = React.useState("52/W"); 
  const [term, setTerm] = React.useState("CY -> CY");
  const [pol, setPol] = React.useState("KRPUS");
  const [etd, setEtd] = React.useState("20201225");
  const [pod, setPod] = React.useState("CNCHH");
  const [eta, setEta] = React.useState("20210110");
  // 전체화면 css 적용을 위한 state
  const [clsNm, setClsNm] = useState("");
  return (
    <>
    <Row>
        <Col xl="12" lg="12">
            <Card className="no-transition">
                <CardHeader className="bg-white">
                    <FormGroup>
                    <ButtonGroup className="pull-right">
                        {coll ?
                            <Button close aria-label="Cancel" onClick={() => setColl(!coll)}>
                                <span aria-hidden>&ndash;</span>
                            </Button>
                            :
                            <Button close aria-label="Cancel" onClick={() => setColl(!coll)}>
                                <span aria-hidden>+</span>
                            </Button>
                        }
                        <Button close aria-label="Cancel" onClick={toggle.bind(this, 'S')}>
                            <span aria-hidden>&#9635;</span>
                        </Button>
                        <Button close aria-label="Cancel" onClick={toggle.bind(this, 'F')}>
                            <span aria-hidden>&#9726;</span>
                        </Button>
                    </ButtonGroup>
                        <Label className="mb-0">SCHEDULE</Label>
                        {/* <i className="nc-icon nc-bullet-list-67" onClick={() => setOpen1(!open1)} /> */}
                        <Input type="select" name="carrier" id="carrier">
                            <option>KRPUS to CNCHH</option>
                            <option>KRKAN to CNCHH</option>
                            <option>KRINC to CNCHH</option>
                        </Input>
                    </FormGroup>
                </CardHeader>
            </Card>
        </Col>
    </Row>
        <Collapse isOpen={coll}>
        {/* <div style={divider}/> */}
            {/* 보이는 영역 */}
            <Card>
                <CardBody onClick={toggle.bind(this, 'S')}>
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
        </Collapse>
            {/* <Row>
                <Col xl="12" lg="12">
                    <FormGroup>
                        <Label className="mb-0">LINE</Label> 
                        <Input type="select" name="Team" id="Team"
                        value={ip2}
                        onChange={(e)=>{setIp2(e.target.value)}}>
                            <option>WDFC</option>
                        </Input>  
                    </FormGroup>                           
                </Col>
                <Col xl="12" lg="12">
                    <FormGroup>
                        <Label className="mb-0">BKG NO</Label> 
                        <Input type="text" 
                            name="contractNumber"
                            id="contractNumber"
                            placeholder="Enter Number..."
                            value={ip1}
                            onChange={(e)=>{setIp1(e.target.value)}}/>
                    </FormGroup>   
                </Col>
                <Col xl="12" lg="12">
                    <FormGroup>
                        <Label className="mb-0">VESSEL</Label> 
                        <Input type="text"
                            name="contractNumber"
                            id="contractNumber"
                            placeholder="Enter Number..."
                            value={ip3}
                            onChange={(e)=>{setIp3(e.target.value)}}/>
                </FormGroup>                          
                </Col>
                <Col xl="12" lg="12">
                    <FormGroup>
                        <Label className="mb-0">VOYAGE</Label> 
                        <Input type="text"
                            name="contractNumber"
                            id="contractNumber"
                            placeholder="Enter Number..."
                            value={ip4}
                            onChange={(e)=>{setIp4(e.target.value)}}/>
                </FormGroup>                          
                </Col> 
            </Row> */}


        {/* 모달 팝업 영역 
        xs : 한 줄
        sm : 576px 에서 다음 줄로 넘어감
        md : 768px
        lg : 992px
        xl : 1200px
        fluid : 뷰포트 전체의 너비
        */}
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="lg">
            <ModalHeader toggle={toggle}>Schedule</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
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
                    <Row className ="bg-light">
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
                    </CardBody>
                </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>
    );
}

export default ShortTemplate;