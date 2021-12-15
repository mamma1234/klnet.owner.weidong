/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col,FormGroup,Label,Input, Button, ListGroup, ListGroupItem} from "reactstrap";
import axios from 'axios';

const Goods = (props) => {

    const [goodsBookmarkList, setGoodsBookmarkList] = useState([]);
    const [bookmark, setBookmark] = useState([])
    const [goodsRelationList, setGoodsRelationList] = useState([{'key':1}]);

    useEffect(() => {
        // console.log(props)
        setGoodsBookmarkList(props.goodsBookmarkList);
        // Cargo 와 Goods 관계 목록
        if( props.goodsRelationList.length > 0 ) {
            setGoodsRelationList(props.goodsRelationList);
        } else {
            setGoodsRelationList([{'key':1}]);
        }
    },[props]);

    const fncSelectBookmark=(e, index)=>{
        // Bookmark 정보를 세팅해주고
        goodsBookmarkList.map((element, key)=>{
            if( e.target.value == element.cargo_goods_bookmark_seq) {
                // Bookmark 정보를 먼저 입력한 후
                setBookmark({...bookmark
                    ,'user_no':element.user_no
                    ,'cargo_goods_bookmark_seq':element.cargo_goods_bookmark_seq
                    ,'cargo_goods_bookmark_name':element.cargo_goods_bookmark_name
                    ,'goods_desc1':element.goods_desc1
                    ,'goods_desc2':element.goods_desc2
                    ,'goods_desc3':element.goods_desc3
                    ,'goods_desc4':element.goods_desc4
                    ,'goods_desc5':element.goods_desc5
                });
                // Goods 목록에 입력한다
                let row = goodsRelationList[index];
                row = {...bookmark
                    ,'user_no':element.user_no
                    ,'cargo_goods_bookmark_seq':element.cargo_goods_bookmark_seq
                    ,'cargo_goods_bookmark_name':element.cargo_goods_bookmark_name
                    ,'goods_desc1':element.goods_desc1
                    ,'goods_desc2':element.goods_desc2
                    ,'goods_desc3':element.goods_desc3
                    ,'goods_desc4':element.goods_desc4
                    ,'goods_desc5':element.goods_desc5
                };
                goodsRelationList[index] = row;
                setGoodsRelationList([...goodsRelationList]);
                props.fncOnBlurGoodsRelation(goodsRelationList);
            }
        });
    }

    // 수정된 내용은 Cargo Goods 목록 저장
    const fncOnChangeGoods =(e, index, key)=> {
        e.preventDefault();
        let row = goodsRelationList[index];
        row[key] = e.target.value;
        goodsRelationList[index] = row;
        setGoodsRelationList([...goodsRelationList]);
    }
    // 완료된 내용은 부모로 전달
    const fncOnBlurGoodsRelation = (e) => {
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
        } else if (goodsRelationList.length == 1) {
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
                        <Row>
                            <Col className="col-0 pt-3 mt-3 text-center" xl="0">Goods {index+1}.
                            </Col>
                            <Col xl="12" lg="12">
                                <FormGroup>
                                    <Input type="text"
                                        name="goods_desc1"
                                        id="goods_desc1"
                                        placeholder="Desc1"
                                        maxLength="80"
                                        value={data.goods_desc1?data.goods_desc1:''}
                                        onChange={(e)=>fncOnChangeGoods(e, index, 'goods_desc1')}
                                        onBlur={(e)=>fncOnBlurGoodsRelation(e)}
                                        />
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12">
                                <FormGroup>
                                    <Input type="text"
                                        name="goods_desc2"
                                        id="goods_desc2"
                                        placeholder="Desc2"
                                        maxLength="80"
                                        value={data.goods_desc2?data.goods_desc2:''}
                                        onChange={(e)=>fncOnChangeGoods(e, index, 'goods_desc2')}
                                        onBlur={(e)=>fncOnBlurGoodsRelation(e)}
                                        />
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12">
                                <FormGroup>
                                    <Input type="text"
                                        name="goods_desc3"
                                        id="goods_desc3"
                                        placeholder="Desc3"
                                        maxLength="80"
                                        value={data.goods_desc3?data.goods_desc3:''}
                                        onChange={(e)=>fncOnChangeGoods(e, index, 'goods_desc3')}
                                        onBlur={(e)=>fncOnBlurGoodsRelation(e)}
                                        />
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12">
                                <FormGroup>
                                    <Input type="text"
                                        name="goods_desc4"
                                        id="goods_desc4"
                                        placeholder="Desc4"
                                        maxLength="80"
                                        value={data.goods_desc4?data.goods_desc4:''}
                                        onChange={(e)=>fncOnChangeGoods(e, index, 'goods_desc4')}
                                        onBlur={(e)=>fncOnBlurGoodsRelation(e)}
                                        />
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12">
                                <FormGroup>
                                    <Input type="text"
                                        name="goods_desc5"
                                        id="goods_desc5"
                                        placeholder="Desc5"
                                        maxLength="80"
                                        value={data.goods_desc5?data.goods_desc5:''}
                                        onChange={(e)=>fncOnChangeGoods(e, index, 'goods_desc5')}
                                        onBlur={(e)=>fncOnBlurGoodsRelation(e)}
                                        />
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

export default Goods;