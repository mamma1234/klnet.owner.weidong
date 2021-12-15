/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, CardBody, Label, CardHeader, ButtonGroup} from "reactstrap";
import InputValid from "components/CustomInput/InputValid.js";
import Select from "react-select";

const GoodsWdfc = (props) => {

    const [goodsBookmarkList, setGoodsBookmarkList] = useState([]);
    const [bookmark, setBookmark] = useState([])
    const [goodsRelationList, setGoodsRelationList] = useState([{'key':1}]);
    const [openType, setOpenType] = useState("");

    useEffect(() => {
        // console.log(props)
        setGoodsBookmarkList(props.goodsBookmarkList);
        // Cargo 와 Goods 관계 목록
        if( props.goodsRelationList.length > 0 ) {
            setGoodsRelationList(props.goodsRelationList);
        } else {
            setGoodsRelationList([{'key':1}]);
        }
        setOpenType(props.openType);
    },[props]);

    const fncSelectBookmark=(e, index)=>{
        if( e ) {
            // Bookmark 정보를 세팅해주고
            goodsBookmarkList.map((element, key)=>{
                if( e.value == element.cargo_goods_bookmark_seq) {
                    // console.log(e.target.value, element.cargo_goods_bookmark_seq, element)
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
                    props.fncOnBlurGoodsRelation([...goodsRelationList]);
                }
            });
        } else {
            if( bookmark.cargo_goods_bookmark_seq) {
                // console.log(e.target.value, element.cargo_goods_bookmark_seq, element)
                // Bookmark 정보를 먼저 입력한 후
                setBookmark({...bookmark
                    ,'user_no':bookmark.user_no
                    ,'cargo_goods_bookmark_seq': null
                    ,'cargo_goods_bookmark_name': null
                    ,'goods_desc1': null
                    ,'goods_desc2': null
                    ,'goods_desc3': null
                    ,'goods_desc4': null
                    ,'goods_desc5': null
                });
                // Goods 목록에 입력한다
                let row = goodsRelationList[index];
                row = {...bookmark
                    ,'user_no': bookmark.user_no
                    ,'cargo_goods_bookmark_seq': null
                    ,'cargo_goods_bookmark_name': null
                    ,'goods_desc1': null
                    ,'goods_desc2': null
                    ,'goods_desc3': null
                    ,'goods_desc4': null
                    ,'goods_desc5': null
                };
                goodsRelationList[index] = row;
                setGoodsRelationList([...goodsRelationList]);
                props.fncOnBlurGoodsRelation([...goodsRelationList]);
            }
        }
    }

    // 수정된 내용은 Cargo Goods 목록 저장
    const fncOnChangeGoods =(e, index, key)=> {
        // e.preventDefault();
        let row = goodsRelationList[index];
        row[key] = e.target.value.toUpperCase();
        goodsRelationList[index] = row;
        setGoodsRelationList([...goodsRelationList]);
        props.fncOnBlurGoodsRelation( [...goodsRelationList] );
    }
    // 완료된 내용은 부모로 전달
    const fncOnBlurGoodsRelation = (e) => {
        // e.preventDefault();
        props.fncOnBlurGoodsRelation( [...goodsRelationList] );
    }

    const onAddCargo = ()=>{
        setGoodsRelationList([...goodsRelationList,{'key':goodsRelationList.length+1}]);
    }
    const onDelCargo = (key)=>{
        // console.log("KEY ",key);
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
        // if(goodsRelationList.length > 1) {
        //     setGoodsRelationList(goodsRelationList.slice(0,goodsRelationList.length-1));
        //     props.fncOnBlurGoodsRelation( goodsRelationList.slice(0,goodsRelationList.length-1) );
        // } else if (goodsRelationList.length == 1) {
        //     setGoodsRelationList([{'key':1}]);
        // }
    }

  return (
    <>
        <Row>
            <Col xl="12" lg="12">
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
                                        {/* <Input type="select"
                                            // style={{height:'35px',fonztSize:'10px',border:'0',borderBottom:'1px solid silver',borderRadius:'0',textAlignLast:'center'}}
                                            onChange={(e) => {
                                                fncSelectBookmark(e, index)
                                            }}
                                            bsSize={("MAIN"===openType)?'sm':null}
                                            className={("MAIN"===openType)?"pt-0 pb-0":null}
                                            value={data.cargo_goods_bookmark_seq?data.cargo_goods_bookmark_seq:'0'}
                                            >
                                            <option key={0} value={'0'}>
                                                선택
                                            </option>
                                            {(goodsBookmarkList.length>0)?goodsBookmarkList.map((element,i)=>{
                                                return(
                                                    <option key={"goods"+i} value={element.cargo_goods_bookmark_seq}>
                                                        {element.cargo_goods_bookmark_name}
                                                    </option>
                                                )
                                            })
                                            :<></>}
                                        </Input> */}


                                        <Select
                                            className="customSelect"
                                            classNamePrefix="customSelect"
                                            //className="react-select react-select-primary"
                                            //classNamePrefix="react-select"
                                            id={index+"_cargo_goods_bookmark"}
                                            name="cargo_goods_bookmark"
                                            placeholder=""
                                            value={{value:data.cargo_goods_bookmark_seq?data.cargo_goods_bookmark_seq:'',
                                                    label:data.cargo_goods_bookmark_seq?goodsBookmarkList[goodsBookmarkList.findIndex(x=>x.value===data.cargo_goods_bookmark_seq)].label:'선택'}
                                            }
                                            onChange={(value)=>fncSelectBookmark(value, index)}
                                            options={goodsBookmarkList}
                                            isClearable={data.cargo_goods_bookmark_seq?true:false}
                                            // styles={{
                                            //     control: provided => ({...provided,border:!booking.trans_service_code?'1px solid red':'' }),
                                            //     indicatorContainer: provided => ({...provided,color:''})
                                            // }}
                                            />

                                    </Col>
                                    <Col><button
                                    className="close"
                                        type="button"
                                        onClick={() => onDelCargo(index)}
                                        >×</button></Col>
                                </Row>
                            </CardHeader>
                            <CardBody className="pt-0 pb-3">
                                {/* <Input type="text"
                                    name="goods_desc1"
                                    id="goods_desc1"
                                    placeholder=""
                                    maxLength="80"
                                    bsSize={("MAIN"===openType)?'sm':null}
                                    style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                    value={data.goods_desc1?data.goods_desc1:''}
                                    onChange={(e)=>fncOnChangeGoods(e, index, 'goods_desc1')}
                                    onBlur={(e)=>fncOnBlurGoodsRelation(e)}
                                    /> */}
                                <InputValid 
                                    type="text"
                                    name="goods_desc1"
                                    id={index+"_goods_desc1"}
                                    placeholder=""
                                    maxLength="80"
                                    bsSize={("MAIN"===openType)?'sm':null}
                                    style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                    value={data.goods_desc1?data.goods_desc1:''}
                                    onChange={(e)=>fncOnChangeGoods(e, index, 'goods_desc1')}
                                    // onBlur={(e) => {fncOnBlurGoodsRelation(e)}}
                                    validtype="text"
                                    required={!data.goods_desc1&&(data.goods_desc2||data.goods_desc3||data.goods_desc4||data.goods_desc5)?true:false} 
                                    feedid="cargo"
                                />
                                {/* <Input type="text"
                                    name="goods_desc2"
                                    id="goods_desc2"
                                    placeholder=""
                                    maxLength="80"
                                    bsSize={("MAIN"===openType)?'sm':null}
                                    style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                    value={data.goods_desc2?data.goods_desc2:''}
                                    onChange={(e)=>fncOnChangeGoods(e, index, 'goods_desc2')}
                                    onBlur={(e)=>fncOnBlurGoodsRelation(e)}
                                    /> */}
                                <InputValid 
                                    type="text"
                                    name="goods_desc2"
                                    id={index+"_goods_desc2"}
                                    placeholder=""
                                    maxLength="80"
                                    bsSize={("MAIN"===openType)?'sm':null}
                                    style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                    value={data.goods_desc2?data.goods_desc2:''}
                                    onChange={(e)=>fncOnChangeGoods(e, index, 'goods_desc2')}
                                    // onBlur={(e) => {fncOnBlurGoodsRelation(e)}}
                                    validtype="text"
                                    required={false} 
                                    feedid="cargo"
                                />
                                {/* <Input type="text"
                                    name="goods_desc3"
                                    id="goods_desc3"
                                    placeholder=""
                                    maxLength="80"
                                    bsSize={("MAIN"===openType)?'sm':null}
                                    style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                    value={data.goods_desc3?data.goods_desc3:''}
                                    onChange={(e)=>fncOnChangeGoods(e, index, 'goods_desc3')}
                                    onBlur={(e)=>fncOnBlurGoodsRelation(e)}
                                    /> */}
                                <InputValid 
                                    type="text"
                                    id={index+"_goods_desc3"}
                                    id="goods_desc3"
                                    placeholder=""
                                    maxLength="80"
                                    bsSize={("MAIN"===openType)?'sm':null}
                                    style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                    value={data.goods_desc3?data.goods_desc3:''}
                                    onChange={(e)=>fncOnChangeGoods(e, index, 'goods_desc3')}
                                    // onBlur={(e) => {fncOnBlurGoodsRelation(e)}}
                                    validtype="text"
                                    required={false} 
                                    feedid="cargo"
                                />
                                {/* <Input type="text"
                                    name="goods_desc4"
                                    id="goods_desc4"
                                    placeholder=""
                                    maxLength="80"
                                    bsSize={("MAIN"===openType)?'sm':null}
                                    style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                    value={data.goods_desc4?data.goods_desc4:''}
                                    onChange={(e)=>fncOnChangeGoods(e, index, 'goods_desc4')}
                                    onBlur={(e)=>fncOnBlurGoodsRelation(e)}
                                    /> */}
                                <InputValid 
                                    type="text"
                                    id={index+"_goods_desc4"}
                                    id="goods_desc4"
                                    placeholder=""
                                    maxLength="80"
                                    bsSize={("MAIN"===openType)?'sm':null}
                                    style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                    value={data.goods_desc4?data.goods_desc4:''}
                                    onChange={(e)=>fncOnChangeGoods(e, index, 'goods_desc4')}
                                    // onBlur={(e) => {fncOnBlurGoodsRelation(e)}}
                                    validtype="text"
                                    required={false} 
                                    feedid="cargo"
                                />
                                {/* <Input type="text"
                                    name="goods_desc5"
                                    id="goods_desc5"
                                    placeholder=""
                                    maxLength="80"
                                    bsSize={("MAIN"===openType)?'sm':null}
                                    style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                    value={data.goods_desc5?data.goods_desc5:''}
                                    onChange={(e)=>fncOnChangeGoods(e, index, 'goods_desc5')}
                                    onBlur={(e)=>fncOnBlurGoodsRelation(e)}
                                    /> */}
                                <InputValid 
                                    type="text"
                                    id={index+"_goods_desc5"}
                                    id="goods_desc5"
                                    placeholder=""
                                    maxLength="80"
                                    bsSize={("MAIN"===openType)?'sm':null}
                                    style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                    value={data.goods_desc5?data.goods_desc5:''}
                                    onChange={(e)=>fncOnChangeGoods(e, index, 'goods_desc5')}
                                    // onBlur={(e)=>fncOnBlurGoodsRelation(e)}
                                    validtype="text"
                                    required={false} 
                                    feedid="cargo"
                                />
                            </CardBody>
                        </Card>
                        )}
                    </Col>
                </Row>
            </Col>
        </Row>
    </>
    );
}

export default GoodsWdfc;