/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    ButtonGroup, Button,FormGroup,Label,Input, Card, CardHeader, CardTitle, CardText} from "reactstrap";
// import BookingTemplate from './BookingTemplate';



const TranslateTemplate = (props) => {
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
  const [booking, setBooking] = useState({
      trans_self_yn: 'N',
      trans_name1: 'SAMSONG ELECTRONICS INC.',
      trans_name2: 'SAMSONG ELECTRONICS INC.',
      trans_code: 'SGE',
      trans_user_name: 'KIM KIL DONG',
      trans_user_tel: '02-2315-2318',
      trans_user_email: 'kildong@samsong.co.kr',
      trans_user_fax: '02-211-2458',
      trans_fac_area_name: 'AREA NAME',
      trans_fac_name: 'CARD',
      trans_remart: '부재중 경비실에 맡겨주세요.'
  });
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
                            <Label className="mb-0">TRANSLATE</Label>
                            {/* <i className="nc-icon nc-bullet-list-67" onClick={() => setOpen1(!open1)} /> */}
                            <Input type="select" name="Translate" id="Translate">
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
                            <CardTitle>자가운송 : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.trans_self_yn}</CardText>
                            <CardTitle>Name : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.trans_name1}</CardText>
                            <CardTitle>Translate Code : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.trans_code}</CardText>
                            <CardTitle>Name : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.trans_user_name}</CardText>
                            <CardTitle>Tel : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.trans_user_tel}</CardText>
                            <CardTitle>E-mail : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.trans_user_email}</CardText>
                            <CardTitle>Fax : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.trans_user_fax}</CardText>
                            <CardTitle>공장 지역 명 : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.trans_fac_area_name}</CardText>
                            <CardTitle>공장 명 : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.trans_fac_name}</CardText>
                            <CardTitle>Remark : </CardTitle>
                            <CardText tag="h5" className="font-weight-bold">{booking.trans_remart}</CardText>
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
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="lg">
            <ModalHeader toggle={toggle}>Translate</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <Row>
                            <Col xl="6" lg="6" md="6">
                                <FormGroup>
                                    <Label className="mb-0">자가운송</Label>
                                    <Input type="select" name="trans_self_yn" id="trans_self_yn" placeholder="Y" value={booking.trans_self_yn}>
                                        <option>Y</option>
                                        <option>N</option>
                                    </Input>
                                </FormGroup>
                            </Col>

                            <Col xl="6" lg="6" md="6">
                                <FormGroup>
                                    <Label className="mb-0">Translate Code</Label>
                                    <Input type="text" name="trans_code" id="trans_code" placeholder="Translate Code" value={booking.trans_code} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Translate Name1</Label>
                                    <Input type="text" name="trans_name1" id="trans_name1" placeholder="Translate Code" value={booking.trans_code} />
                                </FormGroup>
                            </Col>
                            <Col xl="6" lg="6" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Translate Name2</Label>
                                    <Input type="text" name="trans_name1" id="trans_name2" placeholder="Translate Name2" value={booking.trans_name2}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl="12" lg="12" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Name</Label>
                                    <Input type="text" name="trans_user_name" id="trans_user_name" placeholder="Name" value={booking.trans_user_name} />
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Tel</Label>
                                    <Input type="text" name="trans_user_tel" id="trans_user_tel" placeholder="Tel" value={booking.trans_user_tel} />
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">E-mail</Label>
                                    <Input type="text" name="trans_user_email" id="trans_user_email" placeholder="E-mail" value={booking.trans_user_email} />
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Fax</Label>
                                    <Input type="text" name="trans_user_fax" id="trans_user_fax" placeholder="Fax" value={booking.trans_user_fax} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl="4" lg="4" md="12">
                                <FormGroup>
                                    <Label className="mb-0">공장 지역명</Label>
                                    <Input type="text" name="trans_fac_area_name" id="trans_fac_area_name" placeholder="공장 지역명" value={booking.trans_fac_area_name} />
                                </FormGroup>
                            </Col>
                            <Col xl="8" lg="8" md="12">
                                <FormGroup>
                                    <Label className="mb-0">공장명</Label>
                                    <Input type="text" name="trans_fac_name" id="trans_fac_name" placeholder="공장명" value={booking.trans_fac_name} />
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12" md="12">
                                <FormGroup>
                                    <Label className="mb-0">Remark</Label>
                                    <Input type="text" name="trans_remark" id="trans_remark" placeholder="Remark" value={booking.trans_remark} />
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

export default TranslateTemplate;