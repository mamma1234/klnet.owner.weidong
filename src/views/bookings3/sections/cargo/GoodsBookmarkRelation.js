/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col,FormGroup,Label,Input, Button, ListGroup, ListGroupItem, CardText, CardTitle} from "reactstrap";
import axios from 'axios';

const GoodsBookmarkRelation = (props) => {

    const [goods, setGoods] = useState({});
    // Goods BookMark List
    const [goodsBookmarkList, setGoodsBookmarkList] = useState([]);
    // Cargo 와 Goods 관계 목록
    const [goodsRelationList, setGoodsRelationList] = useState([{'key':1}]);

    useEffect(() => {
        // Goods Bookmark List
        setGoodsBookmarkList(props.goodsBookmarkList);
        // Cargo 와 Goods 관계 목록
        if( props.goodsRelationList.length > 0 ) {
            setGoodsRelationList(props.goodsRelationList);
        } else {
            setGoodsRelationList([{'key':1}]);
        }
    },[props]);

    // 콤보박스 Bookmark 선택할 경우
    const fncSelectBookmark = (e, index) => {
        // Cargo와 Bookmark Relation 정보에 선택한 정보를 입력한다.
        goodsRelationList.map((element, key)=>{
            // Cargo와 Bookmark Relation과 동일한 콤보박스 위치를 찾는다.
            if( key == index ) {
                // Goods Bookmark 목록을 뒤져서
                goodsBookmarkList.map(( row, i )=> {
                    // 어느걸 선택했는지를 찾는다.
                    if( e.target.value == row.cargo_goods_bookmark_seq ) {
                        // 찾은 row를 Relation 정보에 넣는다.
                        goodsRelationList[key] = row;
                    } 
                });
                // 해당 정보를 Relation에 입력한다
                setGoodsRelationList([...goodsRelationList]);
                props.fncOnBlurGoodsRelation([...goodsRelationList]);
            }
        });
        // goodsRelationList.map((element, key)=>{
        //     if( e.target.value == element.cargo_goods_bookmark_seq) {
        //         // Bookmark 정보를 먼저 입력한 후
        //         setBookmark({...bookmark
        //             ,'user_no':element.user_no
        //             ,'cargo_goods_bookmark_seq':element.cargo_goods_bookmark_seq
        //             ,'cargo_goods_bookmark_name':element.cargo_goods_bookmark_name
        //             ,'goods_desc1':element.goods_desc1
        //             ,'goods_desc2':element.goods_desc2
        //             ,'goods_desc3':element.goods_desc3
        //             ,'goods_desc4':element.goods_desc4
        //             ,'goods_desc5':element.goods_desc5
        //         });
        //         // Goods 목록에 입력한다
        //         // let row = goodsList[index];
        //         // row = {...bookmark
        //         //     ,'user_no':element.user_no
        //         //     ,'cargo_goods_bookmark_seq':element.cargo_goods_bookmark_seq
        //         //     ,'cargo_goods_bookmark_name':element.cargo_goods_bookmark_name
        //         //     ,'goods_desc1':element.goods_desc1
        //         //     ,'goods_desc2':element.goods_desc2
        //         //     ,'goods_desc3':element.goods_desc3
        //         //     ,'goods_desc4':element.goods_desc4
        //         //     ,'goods_desc5':element.goods_desc5
        //         // };
        //         // goodsList[index] = row;
        //         // setGoodsRelationList([...goodsList]);
        //         // props.fncOnBlurGoods(goodsList);
        //     }
        // });
    }
    // 완료된 내용은 부모로 전달
    const fncOnBlurGoods = (e) => {
        e.preventDefault();
        props.fncOnBlurGoodsRelation( goodsRelationList );
    }
    const onAddCargo = ()=>{
        setGoodsRelationList([...goodsRelationList,{'key':2}]);
    }
    const onDelCargo = ()=>{
        if(goodsRelationList.length > 1) {
            setGoodsRelationList(goodsRelationList.slice(0,goodsRelationList.length-1));
            props.fncOnBlurGoodsRelation( goodsRelationList.slice(0,goodsRelationList.length-1) );
        } else if (goodsRelationList.length == 1){
            setGoodsRelationList([{'key':1}]);
            props.fncOnBlurGoodsRelation( [{'key':1}] );
        }
    }
  return (
    <>
        <Row>
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
                <ListGroup className="list-group list-group-flush">
                    {goodsRelationList.map((data,index,key) =>
                        <ListGroupItem className="list-group-item pt-2" key={index}>
                            <Row>
                            <Input type="select"
                                style={{height:'35px',fonztSize:'10px',border:'0',borderBottom:'1px solid silver',borderRadius:'0',textAlignLast:'center'}}
                                onChange={(e) => {
                                    fncSelectBookmark(e, index)
                                }}
                                value={data.cargo_goods_bookmark_seq?data.cargo_goods_bookmark_seq:'0'}
                                >
                                <option key={0} value={'0'}>
                                    선택
                                </option>
                                {(goodsBookmarkList.length>0)?goodsBookmarkList.map((element,key)=>{
                                    return(
                                        <option key={key} value={element.cargo_goods_bookmark_seq}>
                                            {element.cargo_goods_bookmark_name}
                                        </option>
                                    )
                                })
                                :<></>}
                            </Input>
                            <Col xl="12" lg="12">
                                <FormGroup>
                                    <CardTitle>Desc1 : </CardTitle>
                                    <CardText className="font-weight-bold">{data.goods_desc1}</CardText>
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12">
                                <FormGroup>
                                    <CardTitle>Desc2 : </CardTitle>
                                    <CardText className="font-weight-bold">{data.goods_desc2}</CardText>
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12">
                                <FormGroup>
                                    <CardTitle>Desc3 : </CardTitle>
                                    <CardText className="font-weight-bold">{data.goods_desc3}</CardText>
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12">
                                <FormGroup>
                                    <CardTitle>Desc4 : </CardTitle>
                                    <CardText className="font-weight-bold">{data.goods_desc4}</CardText>
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12">
                                <FormGroup>
                                    <CardTitle>Desc5 : </CardTitle>
                                    <CardText className="font-weight-bold">{data.goods_desc5}</CardText>
                                </FormGroup>
                            </Col>
                        </Row>
                    </ListGroupItem>
                    )}
                </ListGroup>
            </Col>
        </Row>
    </>
    );
}

export default GoodsBookmarkRelation;