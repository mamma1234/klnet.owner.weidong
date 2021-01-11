/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    ButtonGroup, Button,FormGroup,Label,Input, Card, CardHeader, Table, CardTitle} from "reactstrap";
// import BookingTemplate from './BookingTemplate';



const SpecialTemplate = (props) => {
//   const {
//     Template,
//     title
//   } = props;

  useEffect(() => {
    // console.log("렌더링 될 때마다 수행");
  },[]);

  // Collapse Flag
  const [coll, setColl] = useState(false);

  // modal 창을 위한 state
  const [open, setOpen] = useState(false);
  const toggle = (params) => {
      (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
      setOpen(!open);
  }
  const [cntrList, setCntrList] = useState([
  {
    cntr_seq: '',
    owner_no: '',
    bkg_no: '',
    bkg_date: '',
    user_no: '',
    container_bookmark_seq: '',
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
    cntr_special_type: 'Y',
    cntr_code: '',
    cntr_special_list: [
        {
            special_seq: '',
            cntr_seq: '',
            owner_no: '',
            bkg_no: '',
            bkg_date: '',
            user_no: '',
            container_special_bookmark_seq: '',
            special_undg: '',
            special_imdg: '',
            special_ignition: '',
            special_ignition_type: '',
            special_out_pack_type: '',
            special_out_pack_cnt: '',
            special_out_pack_grade: '',
            special_gross_weight: '',
            special_net_weight: '',
            special_attach_list: [
                {
                    attach_seq: '',
                    speical_seq: '',
                    cntr_seq: '',
                    owner_no: '',
                    bkg_no: '',
                    bkg_date: '',
                    attach_type: '',
                    attach_absolute_path: '',
                    attach_physical_name: '',
                    attach_real_name: '',
                    insert_date: '',
                    update_date: ''
                }
            ]
        }
    ]
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
                            <Label className="mb-0">Container Special</Label>
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
                                        <Col xl="3" lg="3" md="3">
                                            <FormGroup>
                                                <Label className="mb-0">SIZE</Label>
                                                <Input type="text" name="cntr_size" id="cntr_size" placeholder="SIZE" value={element.cntr_size} />
                                            </FormGroup>
                                        </Col>
                                        <Col xl="3" lg="3" md="3">
                                            <FormGroup>
                                                <Label className="mb-0">TYPE</Label>
                                                <Input type="text" name="cntr_type" id="cntr_type" placeholder="" value={element.cntr_type} />
                                            </FormGroup>
                                        </Col>
                                        <Col xl="3" lg="3" md="3">
                                            <FormGroup>
                                                <Label className="mb-0">QTY</Label>
                                                <Input type="text" name="cntr_qty" id="cntr_qty" placeholder="QTY" value={element.cntr_qty} />
                                            </FormGroup>
                                        </Col>
                                        <Col xl="3" lg="3" md="3">
                                            <FormGroup>
                                                <Label className="mb-0">SOC</Label>
                                                <Input type="text" name="cntr_soc_yn" id="cntr_soc_yn" placeholder="Y" value={element.cntr_soc_yn} />
                                            </FormGroup>
                                        </Col>
                                        <Card body>
                                        {element.cntr_special_list.map((special, sKey)=>{
                                            return(
                                                <Row>
                                                    <Col xl="2" lg="2" md="3">
                                                        <FormGroup>
                                                            <Label className="mb-0">UNDG</Label>
                                                            <Input type="text" name="special_undg" id="special_undg" placeholder="UNDG" value={special.speical_undg} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col xl="2" lg="2" md="3">
                                                        <FormGroup>
                                                            <Label className="mb-0">IMDG</Label>
                                                            <Input type="text" name="special_imdg" id="special_imdg" placeholder="IMDG" value={special.speical_imdg} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col xl="2" lg="2" md="3">
                                                        <FormGroup>
                                                            <Label className="mb-0">IGNITION</Label>
                                                            <Input type="text" name="special_iginition" id="special_iginition" placeholder="IGNINITION" value={special.speical_ignition} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col xl="2" lg="2" md="3">
                                                        <FormGroup>
                                                            <Label className="mb-0">IGNITION TYPE</Label>
                                                            <Input type="text" name="special_iginition_type" id="special_ignition_type" placeholder="IGNITION TYPE" value={special.speical_ignition_type} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col xl="2" lg="2" md="3">
                                                        <FormGroup>
                                                            <Label className="mb-0">GROSS WEIGHT</Label>
                                                            <Input type="text" name="special_gross_weight" id="special_gross_weight" placeholder="GROSS WEIGHT" value={special.special_gross_weight} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col xl="2" lg="2" md="3">
                                                        <FormGroup>
                                                            <Label className="mb-0">NET WEIGHT</Label>
                                                            <Input type="text" name="special_net_weight" id="special_net_weight" placeholder="NET WEIGHT" value={special.special_net_weight} />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            )
                                        })}
                                    </Card>
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

export default SpecialTemplate;