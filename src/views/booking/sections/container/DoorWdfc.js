import React, { useState, useEffect } from 'react';
import { Row, Col, CardHeader, Collapse,FormGroup,Label, Card, CardBody } from "reactstrap";
import Moment from 'moment';
import InputValid from 'components/CustomInput/InputValid.js';

const DoorWdfc = (props) => {

    const [door, setDoor] = useState({});
    const [booking, setBooking] = useState({});
    //const [transSelfList, setTransSelfList] = useState([
     //   {value:'Y', label:'자가운송'},
    //    {value:'N', label:'라인운송'},
   // ]);
    const [doorInpt, setDoorInput] = useState(false);
    const {openType} = props;

    // useEffect(() => {
    //     let yyyy = door.cntr_door_date_yyyy;
    //     console.log(yyyy);
    //     let time = door.cntr_door_date_time?door.cntr_door_date_time:'00';
    //     let min = door.cntr_door_date_min?door.cntr_door_date_min:'00';
    //     let date = Moment(yyyy);
    //     console.log("<<<>>>>>>",date, date.isValid())
    //     if( date.isValid() ) {
    //         setDoor({...door, ['cntr_door_date']:yyyy+time+min});
    //         props.fncOnBlurDoor( {...door, ['cntr_door_date']:yyyy+time+min} );
    //     }
    // },[door.cntr_door_date_yyyy]);

    // useEffect(() => {
    //     let yyyy = door.cntr_door_date_yyyy
    //     let time = door.cntr_door_date_time?door.cntr_door_date_time:'00';
    //     let min = door.cntr_door_date_min?door.cntr_door_date_min:'00';
    //     let date = Moment(yyyy);
    //     if( date.isValid() ) {
    //         setDoor({...door, ['cntr_door_date']:yyyy+time+min});
    //         props.fncOnBlurDoor( {...door, ['cntr_door_date']:yyyy+time+min} );
    //     }
    // },[door.cntr_door_date_time]);

    // useEffect(() => {
    //     let yyyy = door.cntr_door_date_yyyy
    //     let time = door.cntr_door_date_time?door.cntr_door_date_time:'00';
    //     let min = door.cntr_door_date_min?door.cntr_door_date_min:'00';
    //     let date = Moment(yyyy);
    //     if( date.isValid() ) {
    //         setDoor({...door, ['cntr_door_date']:yyyy+time+min});
    //         props.fncOnBlurDoor( {...door, ['cntr_door_date']:yyyy+time+min} );
    //     }
    // },[door.cntr_door_date_min]);

    useEffect(() => {
        if( props.door ) {
            setDoor(props.door);
        }
    },[props.door]);
    useEffect(() => {
        if( props.booking ) {
            setBooking(props.booking);
        }
    },[props.booking]);
    useEffect(() => {
        if( "BOOK" === openType ) {
            setDoorInput( true );
        } else {
            if( props.booking.trans_self_yn ) {
                if( "Y" === props.booking.trans_self_yn ) {
                    setDoorInput( false );
                } else if ( "N" === props.booking.trans_self_yn ) {
                    setDoorInput( true );
                }
            }
        }
    },[props.booking.trans_self_yn]);

    function pad(data, size) {
        var s = String(data);
        while(s.length < (size || 2 )) {s = "0"+s}
        return s;
    }

    // const fncOnChangeDate =(value, key)=> {
    //     let date = Moment(value);
    //     if( date.isValid() ) {
    //         let formatDate = date.format('YYYYMMDD');
    //         let formatName = date.format('YYYY-MM-DD');
    //         setDoor({...door, ['cntr_door_date_yyyy']:formatDate});
    //         props.fncOnBlurDoor( {...door, ['cntr_door_date_yyyy']:formatDate} );
    //     }
    // }

    const fncOnPressDateTime =(e) => {
        if( "Backspace" === e.key ) {
            setDoor({...door, ['cntr_door_date_name']:null, ['cntr_door_date']:null});
            props.fncOnBlurDoor({...door, ['cntr_door_date_name']:null, ['cntr_door_date']:null});   
        }
    }
    const fncOnChangeDateTime =(data, key)=> {
        let value = '';
        if( data ) {
            value = data.replace(/[^0-9]/g, '');
            if( value.length === 12 ) {
                let dateTime = Moment(value,'YYYYMMDDHHmm');
                if( dateTime.isValid() ) {
                    setDoor({
                        ...door,
                        ['cntr_door_date_name']:dateTime.format('YYYY-MM-DD HH:mm'),
                        ['cntr_door_date']:dateTime.format('YYYYMMDDHHmm')
                    });
                } else {
                    setDoor({
                        ...door,
                        ['cntr_door_date_name']:value,
                        ['cntr_door_date']:value
                    });
                }
            } else {
                setDoor({
                    ...door,
                    ['cntr_door_date_name']:value,
                    ['cntr_door_date']:value,
                });
            }
        } else {
            setDoor({
                ...door,
                ['cntr_door_date_name']:null,
                ['cntr_door_date']:null,

            });
        }
    }


    const fncOnChange =(e, key)=> {
        setDoor({...door, [key]:e.target.value.toUpperCase()});
    }

    const fncOnBlur =(e)=> {
        props.fncOnBlurDoor( door );
    }


    return (
        <React.Fragment>
            <Col>
                <Row>
                    <Col>
                        <Label className="mt-2" style={{fontWeight:'bold',fontSize:'15px',color:'#696969'}}>Door</Label>
                    </Col>
                </Row>
                <Card className="no-transition" style={{border:'1px solid silver'}}>
                    <CardHeader className="pt-1 pb-1">
                        <Row>
                            <Label className="mt-2 ml-3" style={{fontWeight:'bold',fontSize:'15px',color:'#696969'}}>{("BOOK" === openType)?"Door Bookmark":("Y" === booking.trans_self_yn)?"자가운송":("N" === booking.trans_self_yn)?"라인운송":''}</Label>
                        </Row>
                    </CardHeader>
                    <CardBody className="pt-3 pb-0">
                        <Collapse isOpen={doorInpt}>
                            <Row>
                                {"BOOK" === openType ?<></>:
                                <Col xl="4" lg="4" md="12">
                                    <FormGroup>
                                        <Label className="mb-0">배차 오더 일시</Label>
                                        <InputValid 
                                            type="text"
                                            name="date_test"
                                            id="date_test"
                                            // bsSize={("MAIN"===openType)?'sm':null}
                                            placeholder="날짜 및 시간을입력하세요. (예: 202101011300)"
                                            maxLength="16"
                                            value={door.cntr_door_date_name?door.cntr_door_date_name:''}
                                            onChange={(e)=>fncOnChangeDateTime(e.target.value, 'cntr_door_date_name')}
                                            onKeyDown={(e)=>fncOnPressDateTime(e)}
                                            onBlur={(e) => {fncOnBlur(e)}}
                                            validtype="yyyymmddhhmm"
                                            required={("BOOK"===openType)?false:doorInpt?true:false}
                                            feedid="container"
                                            autoComplete="off"
                                        />
                                    </FormGroup>
                                </Col>}
                                <Col xl="4" lg="4" md="12">
                                    <FormGroup>
                                        <Label className="mb-0">담당자명</Label>
                                        <InputValid 
                                            type="text"
                                            name="cntr_door_user_name"
                                            id="cntr_door_user_name"
                                            // bsSize={("MAIN"===openType)?'sm':null}
                                            placeholder=""
                                            maxLength="17"
                                            value={door.cntr_door_user_name?door.cntr_door_user_name:''}
                                            onChange={(e)=>fncOnChange(e, 'cntr_door_user_name')}
                                            onBlur={(e) => {fncOnBlur(e)}}
                                            validtype="text"
                                            required={false}
                                            feedid="container"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col xl="4" lg="4" md="12">
                                    <FormGroup>
                                        <Label className="mb-0">Tel</Label>
                                        <InputValid 
                                            type="text"
                                            name="cntr_door_user_tel"
                                            id="cntr_door_user_tel"
                                            // bsSize={("MAIN"===openType)?'sm':null}
                                            placeholder=""
                                            maxLength="25"
                                            value={door.cntr_door_user_tel?door.cntr_door_user_tel:''}
                                            onChange={(e)=>fncOnChange(e, 'cntr_door_user_tel')}
                                            onBlur={(e) => {fncOnBlur(e)}}
                                            validtype="tel"
                                            required={false}
                                            feedid="container"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col xl="6" lg="6" md="12">
                                    <FormGroup className="mb-1">
                                        <Label className="mb-0">Door Address</Label>
                                        <InputValid 
                                            type="text"
                                            name="cntr_door_address1"
                                            id="cntr_door_address1"
                                            bsSize={("MAIN"===openType)?'sm':null}
                                            placeholder=""
                                            maxLength="35"
                                            style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                            value={door.cntr_door_address1?door.cntr_door_address1:''}
                                            onChange={(e)=>fncOnChange(e, 'cntr_door_address1')}
                                            onBlur={(e) => {fncOnBlur(e)}}
                                            validtype="text"
                                            required={!door.cntr_door_address1&&(door.cntr_door_address2||door.cntr_door_address3)?true:false}
                                            feedid="container"
                                        />
                                        <InputValid 
                                            type="text"
                                            name="cntr_door_address2"
                                            id="cntr_door_address2"
                                            bsSize={("MAIN"===openType)?'sm':null}
                                            placeholder=""
                                            maxLength="35"
                                            style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                            value={door.cntr_door_address2?door.cntr_door_address2:''}
                                            onChange={(e)=>fncOnChange(e, 'cntr_door_address2')}
                                            onBlur={(e) => {fncOnBlur(e)}}
                                            validtype="text"
                                            required={false}
                                            feedid="container"
                                        />
                                        <InputValid 
                                            type="text"
                                            name="cntr_door_address3"
                                            id="cntr_door_address3"
                                            bsSize={("MAIN"===openType)?'sm':null}
                                            placeholder=""
                                            maxLength="35"
                                            style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                            value={door.cntr_door_address3?door.cntr_door_address3:''}
                                            onChange={(e)=>fncOnChange(e, 'cntr_door_address3')}
                                            onBlur={(e) => {fncOnBlur(e)}}
                                            validtype="text"
                                            required={false}
                                            feedid="container"
                                        />
                                        {/* <InputValid 
                                            type="text"
                                            name="cntr_door_address4"
                                            id="cntr_door_address4"
                                            bsSize={("MAIN"===openType)?'sm':null}
                                            placeholder=""
                                            maxLength="35"
                                            style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                            value={door.cntr_door_address4?door.cntr_door_address4:''}
                                            onChange={(e)=>fncOnChange(e, 'cntr_door_address4')}
                                            onBlur={(e) => {fncOnBlur(e)}}
                                            validtype="text"
                                            required={false}
                                            feedid="container"
                                        />
                                        <InputValid 
                                            type="text"
                                            name="cntr_door_address5"
                                            id="cntr_door_address5"
                                            bsSize={("MAIN"===openType)?'sm':null}
                                            placeholder=""
                                            maxLength="35"
                                            style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                            value={door.cntr_door_address5?door.cntr_door_address5:''}
                                            onChange={(e)=>fncOnChange(e, 'cntr_door_address5')}
                                            onBlur={(e) => {fncOnBlur(e)}}
                                            validtype="text"
                                            required={false}
                                            feedid="container"
                                        /> */}
                                    </FormGroup>
                                </Col>
                                <Col xl="6" lg="6" md="12">
                                    <FormGroup className="mb-5">
                                        <Label className="mb-0">Remark</Label>
                                        <InputValid 
                                            type="text"
                                            name="cntr_remark1"
                                            id="cntr_remark1"
                                            bsSize={("MAIN"===openType)?'sm':null}
                                            placeholder=""
                                            maxLength="60"
                                            style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                            value={door.cntr_remark1?door.cntr_remark1:''}
                                            onChange={(e)=>fncOnChange(e, 'cntr_remark1')}
                                            onBlur={(e) => {fncOnBlur(e)}}
                                            validtype="text"
                                            required={!door.cntr_remark1&&(door.cntr_remark2||door.cntr_remark3)?true:false}
                                            feedid="container"
                                        />
                                        <InputValid 
                                            type="text"
                                            name="cntr_remark2"
                                            id="cntr_remark2"
                                            bsSize={("MAIN"===openType)?'sm':null}
                                            placeholder=""
                                            maxLength="60"
                                            style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                            value={door.cntr_remark2?door.cntr_remark2:''}
                                            onChange={(e)=>fncOnChange(e, 'cntr_remark2')}
                                            onBlur={(e) => {fncOnBlur(e)}}
                                            validtype="text"
                                            required={false}
                                            feedid="container"
                                        />
                                        <InputValid 
                                            type="text"
                                            name="cntr_remark3"
                                            id="cntr_remark3"
                                            bsSize={("MAIN"===openType)?'sm':null}
                                            placeholder=""
                                            maxLength="60"
                                            style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                            value={door.cntr_remark3?door.cntr_remark3:''}
                                            onChange={(e)=>fncOnChange(e, 'cntr_remark3')}
                                            onBlur={(e) => {fncOnBlur(e)}}
                                            validtype="text"
                                            required={false}
                                            feedid="container"
                                        />
                                        {/* <InputValid 
                                            type="text"
                                            name="cntr_remark4"
                                            id="cntr_remark4"
                                            bsSize={("MAIN"===openType)?'sm':null}
                                            placeholder=""
                                            maxLength="70"
                                            style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                            value={door.cntr_remark4?door.cntr_remark4:''}
                                            onChange={(e)=>fncOnChange(e, 'cntr_remark4')}
                                            onBlur={(e) => {fncOnBlur(e)}}
                                            validtype="text"
                                            required={false}
                                            feedid="container"
                                        />
                                        <InputValid 
                                            type="text"
                                            name="cntr_remark5"
                                            id="cntr_remark5"
                                            bsSize={("MAIN"===openType)?'sm':null}
                                            placeholder=""
                                            maxLength="70"
                                            style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                            value={door.cntr_remark5?door.cntr_remark5:''}
                                            onChange={(e)=>fncOnChange(e, 'cntr_remark5')}
                                            onBlur={(e) => {fncOnBlur(e)}}
                                            validtype="text"
                                            required={false}
                                            feedid="container"
                                        /> */}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Collapse>

                        <Collapse isOpen={!doorInpt}>
                            <Row>
                                <Col xl="12" lg="12" md="12">
                                    <FormGroup className="mb-5">
                                        <Label className="mb-0">Remark</Label>
                                        <InputValid 
                                            type="text"
                                            name="cntr_remark1"
                                            id="cntr_remark1"
                                            bsSize={("MAIN"===openType)?'sm':null}
                                            placeholder=""
                                            maxLength="60"
                                            style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                            value={door.cntr_remark1?door.cntr_remark1:''}
                                            onChange={(e)=>fncOnChange(e, 'cntr_remark1')}
                                            onBlur={(e) => {fncOnBlur(e)}}
                                            validtype="text"
                                            required={!door.cntr_remark1&&(door.cntr_remark2||door.cntr_remark3)?true:false}
                                            feedid="container"
                                        />
                                        <InputValid 
                                            type="text"
                                            name="cntr_remark2"
                                            id="cntr_remark2"
                                            bsSize={("MAIN"===openType)?'sm':null}
                                            placeholder=""
                                            maxLength="60"
                                            style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                            value={door.cntr_remark2?door.cntr_remark2:''}
                                            onChange={(e)=>fncOnChange(e, 'cntr_remark2')}
                                            onBlur={(e) => {fncOnBlur(e)}}
                                            validtype="text"
                                            required={false}
                                            feedid="container"
                                        />
                                        <InputValid 
                                            type="text"
                                            name="cntr_remark3"
                                            id="cntr_remark3"
                                            bsSize={("MAIN"===openType)?'sm':null}
                                            placeholder=""
                                            maxLength="60"
                                            style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                            value={door.cntr_remark3?door.cntr_remark3:''}
                                            onChange={(e)=>fncOnChange(e, 'cntr_remark3')}
                                            onBlur={(e) => {fncOnBlur(e)}}
                                            validtype="text"
                                            required={false}
                                            feedid="container"
                                        />
                                        {/* <InputValid 
                                            type="text"
                                            name="cntr_remark4"
                                            id="cntr_remark4"
                                            bsSize={("MAIN"===openType)?'sm':null}
                                            placeholder=""
                                            maxLength="70"
                                            style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                            value={door.cntr_remark4?door.cntr_remark4:''}
                                            onChange={(e)=>fncOnChange(e, 'cntr_remark4')}
                                            onBlur={(e) => {fncOnBlur(e)}}
                                            validtype="text"
                                            required={false}
                                            feedid="container"
                                        />
                                        <InputValid 
                                            type="text"
                                            name="cntr_remark5"
                                            id="cntr_remark5"
                                            bsSize={("MAIN"===openType)?'sm':null}
                                            placeholder=""
                                            maxLength="70"
                                            style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                                            value={door.cntr_remark5?door.cntr_remark5:''}
                                            onChange={(e)=>fncOnChange(e, 'cntr_remark5')}
                                            onBlur={(e) => {fncOnBlur(e)}}
                                            validtype="text"
                                            required={false}
                                            feedid="container"
                                        /> */}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Collapse>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
}

export default DoorWdfc;