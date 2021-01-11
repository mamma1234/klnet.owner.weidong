/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    ButtonGroup, Button,FormGroup,Label,Input, Card, CardHeader, Table, CardTitle} from "reactstrap";
// import BookingTemplate from './BookingTemplate';



const CargoTemplate = (props) => {
//   const {
//     Template,
//     title
//   } = props;

  useEffect(() => {
    console.log("렌더링 될 때마다 수행");
  },[]);

  // Collapse Flag
  const [coll, setColl] = useState(false);

  // modal 창을 위한 state
  const [open, setOpen] = useState(false);
  const toggle = (params) => {
      (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
      setOpen(!open);
  }
  const [cntrList, setCntrList] = useState([{
      cntr_size: '20',
      cntr_type: 'Dry',
      cntr_qty: '1',
      cntr_length: '50',
      cntr_width: '400',
      cntr_height: '600',
      cntr_frozen_tmp: 'AABB',
      cntr_frozen_tmp_unit: 'AAS',
      cntr_forzen_fc: 'FCCCC',
      cntr_soc_yn: 'N',
      seal_no: 'A1234111',
      cntr_pick_up_cy_code: 'GWCT',
      cntr_pick_up_cy_address1: 'UNION TRANSPORT CY1',
      cntr_pick_up_cy_address2: 'UNION TRANSPORT CY2',
      cntr_pick_up_cy_address3: 'UNION TRANSPORT CY3',
      cntr_pick_up_cy_address4: 'UNION TRANSPORT CY4',
      cntr_pick_up_cy_address5: 'UNION TRANSPORT CY5',
      cntr_pick_up_cy_name1: 'EUNJI',
      cntr_pick_up_cy_name2: 'EUNJI2',
      cntr_pick_up_date: '2021-02-05',
      cntr_empty_yn: 'N',
      cntr_special_type: 'N',
      cntr_code: ''
  },
  {
    cntr_size: '40',
    cntr_type: 'HIGH CBUE',
    cntr_qty: '3',
    cntr_length: '30',
    cntr_width: '200',
    cntr_height: '100',
    cntr_frozen_tmp: 'BASV',
    cntr_frozen_tmp_unit: 'AASD',
    cntr_forzen_fc: 'FC',
    cntr_soc_yn: 'Y',
    seal_no: 'A1234112',
    cntr_pick_up_cy_code: 'GWCT',
    cntr_pick_up_cy_address1: 'UNION TRANSPORT CY1',
    cntr_pick_up_cy_address2: 'UNION TRANSPORT CY2',
    cntr_pick_up_cy_address3: 'UNION TRANSPORT CY3',
    cntr_pick_up_cy_address4: 'UNION TRANSPORT CY4',
    cntr_pick_up_cy_address5: 'UNION TRANSPORT CY5',
    cntr_pick_up_cy_name1: 'EUNJI',
    cntr_pick_up_cy_name2: 'EUNJI2',
    cntr_pick_up_date: '2021-02-05',
    cntr_empty_yn: 'N',
    cntr_special_type: 'N',
    cntr_code: ''
    }]);
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
                            <Label className="mb-0">Container</Label>
                            {/* <i className="nc-icon nc-bullet-list-67" onClick={() => setOpen1(!open1)} /> */}
                            <Input type="select" name="Cargo" id="Cargo">
                                <option>SAMSONG ELECTRONICS</option>
                                <option>LG ELECTRONICS</option>
                            </Input>
                        </FormGroup>
                    </CardHeader>
                </Card>
            </Col>
        </Row>
        {/* 보이는 영역 */}
            <Row>
                <Col xl="12" lg="12">
                    <Collapse isOpen={coll}>
                        <Card>
                            <CardBody onClick={toggle.bind(this, 'S')}>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>SIZE</th>
                                            <th>TYPE</th>
                                            <th>QTY</th>
                                            <th>PICK UP CY</th>
                                            <th>PICK UP CY NAME</th>
                                            <th>PICK UP DATE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cntrList.map((element,key)=>{
                                            // console.log(cntrList, key, element)
                                            return(
                                                <tr scope="row" key={key} hover>
                                                    <td>{element.cntr_size}</td>
                                                    <td>{element.cntr_type}</td>
                                                    <td>{element.cntr_qty}</td>
                                                    <td>{element.cntr_pick_up_cy_code}</td>
                                                    <td>{element.cntr_pick_up_cy_name1}</td>
                                                    <td>{element.cntr_pick_up_date}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Collapse>
                </Col>
            </Row>


        {/* 모달 팝업 영역 
        xs : 한 줄
        sm : 576px 에서 다음 줄로 넘어감
        md : 768px
        lg : 992px
        xl : 1200px
        fluid : 뷰포트 전체의 너비
        */}
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="xl">
            <ModalHeader toggle={toggle}>Cargo</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <Row>
                            {cntrList.map((element, key)=>{
                                return (
                                <Card body>
                                    <Row>
                                        <Col xl="3" lg="3" md="6">
                                            <FormGroup>
                                                <Label className="mb-0">SZIE</Label>
                                                <Input type="select" name="cntr_size" id="cntr_size" placeholder="Y" value={element.cntr_size}>
                                                    <option>선택</option>
                                                    <option>20</option>
                                                    <option>40</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col xl="3" lg="3" md="6">
                                            <FormGroup>
                                                <Label className="mb-0">TYPE</Label>
                                                <Input type="select" name="cntr_type" id="cntr_type" placeholder="" value={element.cntr_type}>
                                                    <option>선택</option>
                                                    <option>Dry</option>
                                                    <option>HIGH CUBE</option>
                                                    <option>REEFER</option>
                                                    <option>REEFER HIGH CUBE</option>
                                                    <option>TANK</option>
                                                    <option>OPEN TOP</option>
                                                    <option>FLAT RACT</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col xl="3" lg="3" md="6">
                                            <FormGroup>
                                                <Label className="mb-0">QTY</Label>
                                                <Input type="text" name="cntr_qty" id="cntr_qty" placeholder="QTY" value={element.cntr_qty} />
                                            </FormGroup>
                                        </Col>
                                        <Col xl="3" lg="3" md="6">
                                            <FormGroup>
                                                <Label className="mb-0">SOC</Label>
                                                <Input type="select" name="cargo_type" id="cargo_type" placeholder="Y" value={element.cntr_soc_yn}>
                                                    <option>선택</option>
                                                    <option>Y</option>
                                                    <option>N</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl="3" lg="3" md="6">
                                            <FormGroup>
                                                <Label className="mb-0">SEAL NO</Label>
                                                <Input type="text" name="seal_no" id="seal_no" placeholder="SEAL NO" value={element.seal_no} />
                                            </FormGroup>
                                        </Col>
                                        <Col xl="3" lg="3" md="6">
                                            <FormGroup>
                                                <Label className="mb-0">LENGTH</Label>
                                                <Input type="text" name="cntr_length" id="cntr_length" placeholder="LENGTH" value={element.cntr_length} />
                                            </FormGroup>
                                        </Col>
                                        <Col xl="3" lg="3" md="6">
                                            <FormGroup>
                                                <Label className="mb-0">WIDTH</Label>
                                                <Input type="text" name="cntr_width" id="cntr_width" placeholder="WIDTH" value={element.cntr_width} />
                                            </FormGroup>
                                        </Col>
                                        <Col xl="3" lg="3" md="6">
                                            <FormGroup>
                                                <Label className="mb-0">HEIGHT</Label>
                                                <Input type="text" name="cntr_height" id="cntr_height" placeholder="HEIGHT" value={element.cntr_height} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl="2" lg="4" md="6">
                                            <FormGroup>
                                                <Label className="mb-0">FROZEN TMP</Label>
                                                <Input type="text" name="cntr_frozen_tmp" id="cntr_frozen_tmp" placeholder="FROZEN TMP" value={element.cntr_frozen_tmp} />
                                            </FormGroup>
                                        </Col>
                                        <Col xl="2" lg="4" md="6">
                                            <FormGroup>
                                                <Label className="mb-0">FROZEN UIT</Label>
                                                <Input type="text" name="cntr_frozen_unit" id="cntr_frozen_unit" placeholder="FROZEN UNIT" value={element.cntr_frozen_unit} />
                                            </FormGroup>
                                        </Col>
                                        <Col xl="2" lg="4" md="6">
                                            <FormGroup>
                                                <Label className="mb-0">FROZEN FC</Label>
                                                <Input type="text" name="cntr_frozen_fc" id="cntr_frozen_fc" placeholder="FROZEN FC" value={element.cntr_frozen_fc} />
                                            </FormGroup>
                                        </Col>
                                        <Col xl="2" lg="4" md="6">
                                            <FormGroup>
                                                <Label className="mb-0">EMPTY</Label>
                                                <Input type="select" name="cntr_empty_yn" id="cntr_empty_yn" placeholder="EMPTY YN" value={element.cntr_empty_yn}>
                                                    <option>선택</option>
                                                    <option>Y</option>
                                                    <option>N</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col xl="2" lg="4" md="6">
                                            <FormGroup>
                                                <Label className="mb-0">SPECIAL TYPE</Label>
                                                <Input type="text" name="cntr_special_type" id="cntr_special_type" placeholder="SPECIAL TYPE" value={element.cntr_special_type} />
                                            </FormGroup>
                                        </Col>
                                        <Col xl="2" lg="4" md="6">
                                            <FormGroup>
                                                <Label className="mb-0">CODE</Label>
                                                <Input type="text" name="cntr_code" id="cntr_code" placeholder="CNTR CODE" value={element.cntr_code} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl="3" lg="6" md="6">
                                            <FormGroup>
                                                <Label className="mb-0">PICK UP CY CODE</Label>
                                                <Input type="text" name="cntr_pick_up_cy_code" id="cntr_pick_up_cy_code" placeholder="PICK UP CY CODE" value={element.cntr_pick_up_cy_code} />
                                            </FormGroup>
                                        </Col>
                                        <Col xl="3" lg="6" md="6">
                                            <FormGroup>
                                                <Label className="mb-0">CY NAME1</Label>
                                                <Input type="text" name="cntr_pick_up_cy_name1" id="cntr_pick_up_cy_name1" placeholder="CY NAME1" value={element.cntr_pick_up_cy_name1} />
                                            </FormGroup>
                                        </Col>
                                        <Col xl="3" lg="6" md="6">
                                            <FormGroup>
                                                <Label className="mb-0">CY NAME2</Label>
                                                <Input type="text" name="cntr_pick_up_cy_name2" id="cntr_pick_up_cy_name2" placeholder="CY NAME2" value={element.cntr_pick_up_cy_name2} />
                                            </FormGroup>
                                        </Col>
                                        <Col xl="3" lg="6" md="6">
                                            <FormGroup>
                                                <Label className="mb-0">PICK UP DATE</Label>
                                                <Input type="text" name="cntr_pick_up_date" id="cntr_pick_up_date" placeholder="PICK UP DATE" value={element.cntr_pick_up_date} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl="6" lg="6" md="6">
                                            <FormGroup>
                                                <Label className="mb-0">PICK UP CY ADDRESS1</Label>
                                                <Input type="textarea" name="cntr_pick_up_cy_address1" id="cntr_pick_up_cy_address1" placeholder="PICK UP CY ADDRESS1" value={element.cntr_pick_up_cy_address1} className="text-area-2" maxLength="50"/>
                                            </FormGroup>
                                        </Col>
                                        <Col xl="6" lg="6" md="6">
                                            <FormGroup>
                                                <Label className="mb-0">PICK UP CY ADDRESS2</Label>
                                                <Input type="textarea" name="cntr_pick_up_cy_address2" id="cntr_pick_up_cy_address2" placeholder="PICK UP CY ADDRESS2" value={element.cntr_pick_up_cy_address2} className="text-area-2" maxLength="50"/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Card>
                                )
                            })}
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

export default CargoTemplate;