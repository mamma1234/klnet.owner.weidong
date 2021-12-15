import React from "react";
// reactstrap components
import {
    Label,
    FormGroup,
    Input,
    Table,
  } from "reactstrap";

export default function CustomTables (props) {
    const {tableHeader,tableDetail} = props;

    return (
        <div>
            <Table responsive>
                <thead>
                  <tr>
                      {tableHeader.map((data,key) => 
                        <th key={key}>{data}</th>
                      )} 
                  </tr>
                </thead>
                <tbody>
                    {tableDetail.map((prop,key) => 
                        <tr key={key}>
                            {prop.map((data,index,key) => 
                                index === 0?
                                <td key={key}>
                                    <FormGroup check>
                                        <Label check>
                                        <Input defaultValue="" type="checkbox" />
                                        <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                </td>
                                :
                                <td key={key}>{data}</td>

                            )}
                    </tr>
                    )}
                </tbody>
              </Table>
              </div>
    );
}