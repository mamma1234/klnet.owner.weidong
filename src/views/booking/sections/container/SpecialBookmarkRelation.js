/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col,FormGroup,Input, Button, ListGroup, ListGroupItem, ButtonGroup
    , Label, UncontrolledTooltip} from "reactstrap";
const SpeicalBookmarkRelation = (props) => {

    // Special BookMark List
    const [specialBookmarkList, setSpecialBookmarkList] = useState([]);
    // Container 와 Special 관계 목록
    const [specialBookmarkRelationList, setSpecialBookmarkRelationList] = useState([{'key':1}]);

    useEffect(() => {
        // Special Bookmark List
        // console.log(props.specialBookmarkRelationList)
        setSpecialBookmarkList(props.specialBookmarkList);
        // Container 와 Special 관계 목록
        if( props.specialBookmarkRelationList.length > 0 ) {
            setSpecialBookmarkRelationList(props.specialBookmarkRelationList);
        } else {
            setSpecialBookmarkRelationList([{'key':1}]);
        }
    },[props]);

    // 콤보박스 Bookmark 선택할 경우
    const fncSelectBookmark = (e, index) => {
        // Container와 Bookmark Relation 정보에 선택한 정보를 입력한다.
        specialBookmarkRelationList.map((element, key)=>{
            // Container와 Bookmark Relation과 동일한 콤보박스 위치를 찾는다.
            if( key == index ) {
                // Special Bookmark 목록을 뒤져서
                specialBookmarkList.map(( row, i )=> {
                    // 어느걸 선택했는지를 찾는다.
                    if( e.target.value == row.container_special_bookmark_seq ) {
                        // console.log("row > ",row)
                        // 찾은 row를 Relation 정보에 넣는다.
                        specialBookmarkRelationList[key] = row;
                    } 
                });
                // console.log(specialBookmarkRelationList);
                // 해당 정보를 Relation에 입력한다
                setSpecialBookmarkRelationList([...specialBookmarkRelationList]);
                props.fncOnBlurSpecialRelation([...specialBookmarkRelationList]);
            }
        });
        
    }
    // 완료된 내용은 부모로 전달
    const fncOnBlurSpecial = (e) => {
        e.preventDefault();
        props.fncOnBlurSpecialRelation( specialBookmarkRelationList );
    }
    const onAddSpecial = ()=>{
        setSpecialBookmarkRelationList([...specialBookmarkRelationList,{'key':2}]);
    }
    const onDelSpecial =()=>{
        console.log(specialBookmarkRelationList.length);

        if(specialBookmarkRelationList.length > 1) {
            setSpecialBookmarkRelationList(specialBookmarkRelationList.slice(0,specialBookmarkRelationList.length-1));
            props.fncOnBlurSpecialRelation( specialBookmarkRelationList.slice(0,specialBookmarkRelationList.length-1) );
        } else if (specialBookmarkRelationList.length == 1){
            setSpecialBookmarkRelationList([{'key':1}]);
            props.fncOnBlurSpecialRelation( [{'key':1}] );
        }
    }
  return (
    <>
        <Row className="pt-3">
            <Col className="col-12 text-right" xl="12" lg="12">
                {/* <Button
                    className="p-0 mr-1"
                    color="default"
                    outline
                    size="sm"
                    onClick={onAddSpecial}
                    >
                    <i className="fa fa-plus" />
                </Button> */}
                <ButtonGroup className="pull-right pr-2">
                <Button
	                  className="mb-0"
	                  color="default"
	                  data-toggle="tooltip"
	                  id="removeCntr"
                      size="sm"
                      outline
	                  type="button"
	                  //style={{marginBottom:'0'}}
	                  onClick={onDelSpecial}
	                >
	                  Special 항목 지우기
                </Button>
                </ButtonGroup>
                <UncontrolledTooltip
                    delay={0}
                    placement="top"
                    target="removeCntr"
                >
                    Special 항목 지우기
                </UncontrolledTooltip>
            </Col>
            <Col className="col-12" xl="12" lg="12">
                <ListGroup className="list-group list-group-flush">
                    {specialBookmarkRelationList.map((data,index) =>
                        <ListGroupItem className="list-group-item pt-2" key={index}>
                            <Row>
                            <Col xl="4" lg="4">
                            <Label>Special </Label>
                            <Input type="select"
                                // style={{height:'35px',fonztSize:'10px',border:'0',borderBottom:'1px solid silver',borderRadius:'0',textAlignLast:'center'}}
                                onChange={(e) => {
                                    fncSelectBookmark(e, index)
                                }}
                                value={data.container_special_bookmark_seq?data.container_special_bookmark_seq:'0'}
                                >
                                <option key={0} value={'0'}>
                                    선택
                                </option>
                                {(specialBookmarkList.length>0)?specialBookmarkList.map((element,key)=>{
                                    return(
                                        <option key={key} value={element.container_special_bookmark_seq}>
                                            {element.container_special_bookmark_name}
                                        </option>
                                    )
                                })
                                :<></>}
                            </Input>
                            </Col>
                            <Col xl="4" lg="4">
                                <FormGroup>
                                    <Label>UNDG</Label>
                                    <Label className="form-control mb-0"  id={'special_undg'}>{data.special_undg?data.special_undg:''}</Label>
                                </FormGroup>
                            </Col>
                            <Col xl="4" lg="4">
                                <FormGroup>
                                    <Label>INDG</Label>
                                    <Label className="form-control mb-0"  id={'special_imdg'}>{data.special_imdg?data.special_imdg:''}</Label>
                                </FormGroup>
                            </Col>
                            {/* <Row xl="6" lg="6" sm="12">
                                <CardBody>
                                    <CardTitle>UNDG : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{data.special_undg}</CardText>
                                    <CardTitle>IGNITION : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{data.special_ignition}</CardText>
                                    <CardTitle>GROSS WEIGHT : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{data.special_gross_weight}</CardText>
                                    <CardTitle>OUT PACK TYPE : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{data.special_out_pack_type}</CardText>
                                    <CardTitle>OUT PACK GRADE : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{data.special_out_pack_grade}</CardText>
                                    <CardTitle>TECH NAME : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{data.special_tech_name}</CardText>
                                    <CardTitle>SHIPPING NAME : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{data.special_shipping_name}</CardText>
                                </CardBody>
                                <CardBody>
                                    <CardTitle>INDG : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{data.special_imdg}</CardText>
                                    <CardTitle>IGNITION TYPE : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{data.special_ignition_type}</CardText>
                                    <CardTitle>NET WEIGHT : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{data.special_net_weight}</CardText>
                                    <CardTitle>OUT PACK COUNT : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{data.special_out_pack_cnt}</CardText>
                                    <CardTitle>PACK GROUP : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{data.special_pack_group}</CardText>
                                    <CardTitle>POLLUTANT : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{data.special_pollutant}</CardText>
                                    <CardTitle>USER NAME : </CardTitle>
                                    <CardText tag="h5" className="font-weight-bold">{data.special_user_name}</CardText>
                                </CardBody>
                            </Row> */}
                        </Row>
                    </ListGroupItem>
                    )}
                </ListGroup>
            </Col>
        </Row>
    </>
    );
}

export default SpeicalBookmarkRelation;