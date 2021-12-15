/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col,ButtonGroup,Input, Button, Card, CardHeader, CardBody, Label} from "reactstrap";
import AlertModal from 'components/Modals/Alert.js';

const GoodsBookmarkRelationWdfc = (props) => {

    const [goods, setGoods] = useState({});
    // Goods BookMark List
    const [goodsBookmarkList, setGoodsBookmarkList] = useState([]);
    // Cargo 와 Goods 관계 목록
    const [goodsRelationList, setGoodsRelationList] = useState([{'key':1}]);
    // Alert을 위한 state
    const [openAlert, setOpenAlert] = useState(false);
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");

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
        let chDup = false;
        goodsRelationList.forEach(function(n){
            if( n.cargo_goods_bookmark_seq == e.target.value ) {
                chDup = true;
                return;
            }
        });
        if( chDup ) {
            onAlert("danger", "Bookmark는 이미 추가되었습니다.");
            return false;
        }
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
        setGoodsRelationList([...goodsRelationList,{'key':goodsRelationList.length+1}]);
        props.fncOnBlurGoodsRelation([...goodsRelationList,{'key':goodsRelationList.length+1}]);
    }
    const onDelCargo = (key)=>{
        // 어느 컨테이너가 삭제되었는지 cntr_seq 값을 뽑는다.
        // let cntr_seq = containerList[index].cntr_seq;
        
        if( goodsRelationList.length === 1 ) {
            setGoodsRelationList([{'key':1}]);
            props.fncOnBlurGoodsRelation( [{'key':1}] );
        } else {
            // const cntrIdx = goodsRelationList.findIndex(function(item){return item.cntr_seq === cntr_seq });
            //  Splice의 경우 return값이 아닌 splice 처리후 적용
            if(key > -1) goodsRelationList.splice(key,1);
            setGoodsRelationList([...goodsRelationList]);
            props.fncOnBlurGoodsRelation([...goodsRelationList]);
        }
    }

    // Alert 메세지 팝업
    const onAlert = (status,meassge)=> {
        setOpenAlert(!openAlert);
        setStatus(status);
        setMessage(meassge);
    }
  return (
    <>
        <Row>
            <Col>
                <Label className="mt-2" style={{fontWeight:'bold',fontSize:'15px',color:'#696969'}}>Goods</Label>
            </Col>
            <Col>
                <ButtonGroup className="pull-right pr-2">
                    <Button
                        className="pt-0 pb-0"
                        color="default"
                        outline
                        size="sm"
                        onClick={onAddCargo}
                    >추가
                    </Button>
                </ButtonGroup>
            </Col>
        </Row>
        <Row>
                <Col>
                    {goodsRelationList.map((data,index) =>
                    <Card className="no-transition" style={{border:'1px solid silver'}} key={index}>
                        <CardHeader className="pt-1 pb-1">
                            <Row>
                                <Col className="col-6">
                                    <Input type="select"
                                        // style={{height:'35px',fonztSize:'10px',border:'0',borderBottom:'1px solid silver',borderRadius:'0',textAlignLast:'center'}}
                                        onChange={(e) => {
                                            fncSelectBookmark(e, index)
                                        }}
                                        // bsSize={("MAIN"===openType)?'sm':null}
                                        className="pt-0 pb-0"
                                        value={data.cargo_goods_bookmark_seq?data.cargo_goods_bookmark_seq:'0'}
                                        >
                                        <option key={0} value={'0'}>
                                            사용안함
                                        </option>
                                        {(goodsBookmarkList.length>0)?goodsBookmarkList.map((element,i)=>{
                                            return(
                                                <option key={"goods"+i} value={element.cargo_goods_bookmark_seq}>
                                                    {element.cargo_goods_bookmark_name}
                                                </option>
                                            )
                                        })
                                        :<></>}
                                    </Input>
                                </Col>
                                <Col><button
                                className="close"
                                    type="button"
                                    onClick={() => onDelCargo(index)}
                                    >×</button></Col>
                            </Row>
                        </CardHeader>
                        <CardBody className="pt-3 pb-3">
                            <Label className="form-control-sm form-control mb-0"  id={'goods_desc1'}>{data.goods_desc1?data.goods_desc1:''}</Label>
                            <Label className="form-control-sm form-control mb-0"  id={'goods_desc2'}>{data.goods_desc2?data.goods_desc2:''}</Label>
                            <Label className="form-control-sm form-control mb-0"  id={'goods_desc3'}>{data.goods_desc3?data.goods_desc3:''}</Label>
                            <Label className="form-control-sm form-control mb-0"  id={'goods_desc4'}>{data.goods_desc4?data.goods_desc4:''}</Label>
                            <Label className="form-control-sm form-control mb-0"  id={'goods_desc5'}>{data.goods_desc5?data.goods_desc5:''}</Label>
                            {/* <CardText className="font-weight-bold">{data.goods_desc1?data.goods_desc1:''}</CardText>
                            <CardText className="font-weight-bold">{data.goods_desc2?data.goods_desc2:''}</CardText>
                            <CardText className="font-weight-bold">{data.goods_desc3?data.goods_desc3:''}</CardText>
                            <CardText className="font-weight-bold">{data.goods_desc4?data.goods_desc4:''}</CardText>
                            <CardText className="font-weight-bold">{data.goods_desc5?data.goods_desc5:''}</CardText> */}
                            {/* <Input type="text"
                                name="goods_desc1"
                                id="goods_desc1"
                                placeholder=""
                                maxLength="80"
                                // bsSize={("MAIN"===openType)?'sm':null}
                                style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                defaultValue={data.goods_desc1?data.goods_desc1:''}
                                readOnly
                                // onChange={(e)=>fncOnChangeGoods(e, index, 'goods_desc1')}
                                // onBlur={(e)=>fncOnBlurGoodsRelation(e)}
                                />
                            <Input type="text"
                                name="goods_desc2"
                                id="goods_desc2"
                                placeholder=""
                                maxLength="80"
                                // bsSize={("MAIN"===openType)?'sm':null}
                                style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                defaultValue={data.goods_desc2?data.goods_desc2:''}
                                readOnly
                                // onChange={(e)=>fncOnChangeGoods(e, index, 'goods_desc2')}
                                // onBlur={(e)=>fncOnBlurGoodsRelation(e)}
                                />
                            <Input type="text"
                                name="goods_desc3"
                                id="goods_desc3"
                                placeholder=""
                                maxLength="80"
                                // bsSize={("MAIN"===openType)?'sm':null}
                                style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                defaultValue={data.goods_desc3?data.goods_desc3:''}
                                readOnly
                                // onChange={(e)=>fncOnChangeGoods(e, index, 'goods_desc3')}
                                // onBlur={(e)=>fncOnBlurGoodsRelation(e)}
                                />
                            <Input type="text"
                                name="goods_desc4"
                                id="goods_desc4"
                                placeholder=""
                                maxLength="80"
                                // bsSize={("MAIN"===openType)?'sm':null}
                                style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                defaultValue={data.goods_desc4?data.goods_desc4:''}
                                readOnly
                                // onChange={(e)=>fncOnChangeGoods(e, index, 'goods_desc4')}
                                // onBlur={(e)=>fncOnBlurGoodsRelation(e)}
                                />
                            <Input type="text"
                                name="goods_desc5"
                                id="goods_desc5"
                                placeholder=""
                                maxLength="80"
                                // bsSize={("MAIN"===openType)?'sm':null}
                                style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                defaultValue={data.goods_desc5?data.goods_desc5:''}
                                readOnly
                                // onChange={(e)=>fncOnChangeGoods(e, index, 'goods_desc5')}
                                // onBlur={(e)=>fncOnBlurGoodsRelation(e)}
                                /> */}
                        </CardBody>
                    </Card>
                    )}
                </Col>
            </Row>
        {/* </Row> */}
        <AlertModal 
            open={openAlert}
            close={()=>setOpenAlert(false)}
            status ={status}
            message = {message} />
    </>
    );
}

export default GoodsBookmarkRelationWdfc;