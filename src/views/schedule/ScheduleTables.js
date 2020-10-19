import React from "react";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Label,
  FormGroup,
  Input,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components

function ScheduleTables() {
  return (
    <>
      <div className="section section-gray">
        <Container className="tim-container">
          <div className="title">
            <h3>Tables</h3>
          </div>
          <Row>
            <Col className="ml-auto mr-auto" md="8">
              <h4 className="title">
                <small>페리선 실시간 운항정보(2020/10/13)</small>
              </h4>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="text-center">선명</th>
                    <th>선박코드</th>
                    <th>항차</th>
                    <th>출발일시(현지시간기준)</th>
                    <th className="text-right">도착일시(현지시간기준)</th>
                    <th className="text-right">상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">NEW GOLDEN BRIDGE V</td>
                    <td>GBF</td>
                    <td>2435E</td>
                    <td className="text-right">2020/10/12 17:30(청도)</td>
                    <td className="td-actions text-right">2020/10/13 11:50 (인천)</td>
					<td>도착</td>
                  </tr>
                  <tr>
                    <td className="text-center">NEW GOLDEN BRIDGE V</td>
                    <td>GBF</td>
                    <td>2436W</td>
                    <td className="text-right">2020/10/13 18:30 (인천)</td>
                    <td className="td-actions text-right">2020/10/14 09:00 (청도)</td>
					<td>.......</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col className="ml-auto mr-auto" md="8">
              <h4 className="title">
                <small>화물선 실시간 운항정보 (2020/10/13)</small>
              </h4>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="text-center">선명</th>
                    <th>선박코드</th>
                    <th>항차</th>
                    <th>출발일시(현지시간기준)</th>
                    <th className="text-right">도착일시(현지시간기준)</th>
                    <th className="text-right">상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">MV.BEI HAI</td>
                    <td>MBH</td>
                    <td>0295W</td>
                    <td className="text-right">2020/10/13 00:00 (인천)</td>
                    <td className="td-actions text-right">2020/10/16 00:00 (장가항)</td>
					<td>운항중</td>
                  </tr>
                  <tr>
                    <td className="text-center">MV.BEI HAI</td>
                    <td>MBH</td>
                    <td>0295W</td>
                    <td className="text-right">2020/10/13 00:00 (인천)</td>
                    <td className="td-actions text-right">2020/10/17 00:00 (태창)</td>
					<td>운항중</td>
                  </tr>
				  <tr>
                    <td className="text-center">REVERENCE</td>
                    <td>REV</td>
                    <td>1730E</td>
                    <td className="text-right">2020/10/12 03:00 (청도)</td>
                    <td className="td-actions text-right">2020/10/13 03:00 (인천)</td>
					<td>도착</td>
                  </tr>
				  <tr>
                    <td className="text-center">REVERENCE</td>
                    <td>REV</td>
                    <td>1731W</td>
                    <td className="text-right">2020/10/13 00:00 (인천)</td>
                    <td className="td-actions text-right">2020/10/14 00:00 (청도)</td>
					<td>운항중</td>
                  </tr>
				  <tr>
                    <td className="text-center">HANSUNG INCHEON</td>
                    <td>MHI</td>
                    <td>2681E</td>
                    <td className="text-right">2020/10/12 21:00 (위해)</td>
                    <td className="td-actions text-right">2020/10/13 13:00 (인천)</td>
					<td>운항중</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ScheduleTables;
