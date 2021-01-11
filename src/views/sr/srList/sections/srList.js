import React from "react";

// reactstrap components
import {
  Row,
  Col,
  Table,
  Button,
  Container,
  Form,
//   Progress,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
//   Collapse,
} from "reactstrap";
import ReactDatetime from "react-datetime";

export default function Dashboard(props) {
//   const [collapses1, setCollapses1] = React.useState(false);

  return (
    <div className="main">
      <div className="section">
        <Form>
          <Container>
            <Row>
              <Col>
                <h3 className="text-left mb-3">SR List</h3>
              </Col>
            </Row>
            <Row>
              <Col xl="11" lg="10" className="col-12">
                <Row>
                  <Col xl="2" lg="2" className="col-12">
                    <FormGroup className="mb-2">
                      <Label for="carrier" className="mb-0">
                        Carrier
                      </Label>
                      <Input type="select" name="carrier" id="carrier">
                        <option>APL</option>
                        <option>CMA</option>
                        <option>KMD</option>
                        <option>SKR</option>
                        <option>ZIM</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xl="2" lg="2" className="col-12">
                    <FormGroup className="mb-2">
                      <Label className="mb-0">Booking No</Label>
                      <Input type="text" name="BkNo" id="BkNo" />
                    </FormGroup>
                  </Col>
                  <Col xl="2" lg="3" className="col-12">
                    <FormGroup className="mb-2">
                      <Label className="mb-0">VESSEL</Label>
                      <Input type="text" name="vsl" id="vsl" />
                    </FormGroup>
                  </Col>
                  <Col xl="2" lg="3" className="col-12">
                    <FormGroup className="mb-2">
                      <Label className="mb-0">VOYAGE</Label>
                      <Input type="text" name="vsl" id="vsl" />
                    </FormGroup>
                  </Col>
                  <Col xl="2" lg="2" className="col-12">
                    <Label className="mb-0">REQ DATE</Label>
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
                  <Col xl="2" lg="2">
                    <FormGroup className="mb-2">
                      <Label for="carrier" className="mb-0">
                        State
                      </Label>
                      <Input type="select" name="status" id="status">
                        <option>REQUEST</option>
                        <option>REVISION</option>
                        <option>CONFIRM</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col xl="1" lg="2" className="col-12 text-right">
                <FormGroup className="pt-3 mt-1 mb-2">
                  <Button color="default">Search</Button>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xl="12" className="col-12 text-right">
                <FormGroup className="mt-1 mb-2">
                  <Button color="default" className="pt-1 pb-1">
                    SAVE
                  </Button>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th />
                    <th>Carrier</th>
                    <th>VESSEL</th>
                    <th>VOYAGE</th>
                    <th>BKG NO</th>
                    <th className="text-right">REQ_DATE</th>
                    <th className="text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">1</td>
                    <td>
                      <FormGroup check>
                        <Label check>
                          <Input defaultValue="" type="checkbox" />
                          <span className="form-check-sign" />
                        </Label>
                      </FormGroup>
                    </td>
                    <td>KMD</td>
                    <td>TEST123</td>
                    <td>KMTU20201203001232</td>
                    <td>KMTU20201203001232</td>
                    <td className="text-right">2020-12-01 12:00</td>
                    <td className="text-right text-danger">CONFIRM</td>
                  </tr>
                  <tr>
                    <td className="text-center">2</td>
                    <td>
                      <FormGroup check>
                        <Label check>
                          <Input defaultValue="" type="checkbox" />
                          <span className="form-check-sign" />
                        </Label>
                      </FormGroup>
                    </td>
                    <td>SKR</td>
                    <td>TEST123</td>
                    <td>SNKO202012030023212</td>
                    <td>SNKO202012030023212</td>
                    <td className="text-right">2020-12-02 08:39</td>
                    <td className="text-right text-success">REQUEST</td>
                  </tr>
                  <tr>
                    <td className="text-center">3</td>
                    <td>
                      <FormGroup check>
                        <Label check>
                          <Input defaultValue="" type="checkbox" />
                          <span className="form-check-sign" />
                        </Label>
                      </FormGroup>
                    </td>
                    <td>APL</td>
                    <td>TEST123</td>
                    <td>APLU2020120322111232</td>
                    <td>APLU2020120322111232</td>
                    <td className="text-right">2020-12-03 09:00</td>
                    <td className="text-right text-success">REQUEST</td>
                  </tr>
                  <tr>
                    <td className="text-center">4</td>
                    <td>
                      <FormGroup check>
                        <Label check>
                          <Input defaultValue="" type="checkbox" />
                          <span className="form-check-sign" />
                        </Label>
                      </FormGroup>
                    </td>
                    <td>KMD</td>
                    <td>TEST123</td>
                    <td>KMTU20201203001232</td>
                    <td>KMTU20201203001232</td>
                    <td className="text-right">2020-12-01 12:00</td>
                    <td className="text-right text-success">REQUEST</td>
                  </tr>
                  <tr>
                    <td colspan="8" className="text-center">
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
