/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col,FormGroup,Label,Input, Button, ListGroup, ListGroupItem} from "reactstrap";
import axios from 'axios';

const GoodsBookmark = (props) => {

    const [goods, setGoods] = useState({});

    useEffect(() => {
        setGoods(props.goods);
    },[props]);

    // 수정된 내용은 Cargo Goods 목록 저장
    const fncOnChange =(e, key)=> {
        e.preventDefault();
        setGoods({...goods, [key]:e.target.value});
    }
    // 완료된 내용은 부모로 전달
    const fncOnBlurGoods = (e) => {
        e.preventDefault();
        props.fncOnBlurGoods( goods );
    }
  return (
    <>
        <Row>
            <Col className="col-12" xl="12" lg="12">
                <Row>
                    <Col xl="12" lg="12">
                        <FormGroup>
                            <Label className="mb-0">Bookmark Name</Label>
                            <Input type="text"
                                name="cargo_goods_bookmark_name"
                                id="cargo_goods_bookmark_name"
                                placeholder="Bookmark"
                                value={goods.cargo_goods_bookmark_name?goods.cargo_goods_bookmark_name:''}
                                onChange={(e)=>fncOnChange(e, 'cargo_goods_bookmark_name')}
                                onBlur={(e)=>fncOnBlurGoods(e)}
                                />
                        </FormGroup>
                    </Col>
                    <Col xl="12" lg="12">
                        <FormGroup>
                            <Label className="mb-0">Goods</Label>
                            <Input type="text"
                                name="goods_desc1"
                                id="goods_desc1"
                                placeholder="Desc1"
                                value={goods.goods_desc1?goods.goods_desc1:''}
                                onChange={(e)=>fncOnChange(e, 'goods_desc1')}
                                onBlur={(e)=>fncOnBlurGoods(e)}
                                />
                        </FormGroup>
                    </Col>
                    <Col xl="12" lg="12">
                        <FormGroup>
                            <Input type="text"
                                name="goods_desc2"
                                id="goods_desc2"
                                placeholder="Desc2"
                                value={goods.goods_desc2?goods.goods_desc2:''}
                                onChange={(e)=>fncOnChange(e, 'goods_desc2')}
                                onBlur={(e)=>fncOnBlurGoods(e)}
                                />
                        </FormGroup>
                    </Col>
                    <Col xl="12" lg="12">
                        <FormGroup>
                            <Input type="text"
                                name="goods_desc3"
                                id="goods_desc3"
                                placeholder="Desc3"
                                value={goods.goods_desc3?goods.goods_desc3:''}
                                onChange={(e)=>fncOnChange(e, 'goods_desc3')}
                                onBlur={(e)=>fncOnBlurGoods(e)}
                                />
                        </FormGroup>
                    </Col>
                    <Col xl="12" lg="12">
                        <FormGroup>
                            <Input type="text"
                                name="goods_desc4"
                                id="goods_desc4"
                                placeholder="Desc4"
                                value={goods.goods_desc4?goods.goods_desc4:''}
                                onChange={(e)=>fncOnChange(e, 'goods_desc4')}
                                onBlur={(e)=>fncOnBlurGoods(e)}
                                />
                        </FormGroup>
                    </Col>
                    <Col xl="12" lg="12">
                        <FormGroup>
                            <Input type="text"
                                name="goods_desc5"
                                id="goods_desc5"
                                placeholder="Desc5"
                                value={goods.goods_desc5?goods.goods_desc5:''}
                                onChange={(e)=>fncOnChange(e, 'goods_desc5')}
                                onBlur={(e)=>fncOnBlurGoods(e)}
                                />
                        </FormGroup>
                    </Col>
                </Row>
            </Col>
        </Row>
    </>
    );
}

export default GoodsBookmark;