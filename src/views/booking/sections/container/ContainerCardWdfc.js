/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect, forwardRef } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse, UncontrolledTooltip,
    Button,Input, Card, Label, ButtonGroup, FormGroup} from "reactstrap";
import axios from 'axios';
import moment from 'moment';
import Select, {components} from "react-select";
import DoorWdfc from './DoorWdfc.js';
import {ContainerWdfc} from "./ContainerWdfc.js";
import ContainerBookmarkWdfc from "./ContainerBookmarkWdfc.js";


const ContainerCardWdfc = forwardRef((props, containerFocus) => {
    // Collapse Flag
    const [coll, setColl] = useState(false);
    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    // Container Bookmark List  
    const [containerBookmarkList, setContainerBookmarkList] = useState([]);
    // Special Bookmark List
    const [specialBookmarkList, setSpecialBookmarkList] = useState([]);
    // Container List
    const [containerList, setContainerList] = useState([]);
    // Container Special List
    const [containerSpecialList, setContainerSpecialList] = useState([]);
    // Container SpecialRelationList
    const [specialBookmarkRelationList, setSpecialBookmarkRelationList] = useState([]);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    const [booking, setBooking] = useState({});
    const [allCheck,setAllCheck] = useState(true);
    const [cntrCheck,setCntrCheck] = useState(true);
    // Door 입력 정보 Weidong의 경우 단건처리이기에 이렇게 처리합니다.
    const [door, setDoor] = useState({});
    const [serviceCode, setServiceCode] = useState('');
    const {user, dangerTrue} = props;

    useEffect(() => {
        if( user && user.user_no ) {
            selectBookingSpecialBookmark();
        }
    },[user]);

    useEffect(()=>{
        setColl(props.openWindow);
    },[props.openWindow]);

    // useEffect(() => {
    //     // cntr_selected_yn === Y 이면 
    //     // selected 박스로 선택한건 바로 입력해준다.
    //     // if( containerList.length > 0 ) {
    //     //     containerList.map((element, key)=>{
    //     //         if( "Y" === element.cntr_selected_yn ) {
    //     //             fncSaveContainerList();     
    //     //         }
    //     //     });

    //     // }

    //     // etd 변경되면 container 정보에 픽업데이트 etd-1 세팅
    //     if( props.booking.sch_etd ) {
    //         // console.log("CNTR_ ETD 작업 ",props.booking.sch_etd);
    //         let list = containerList;
    //         // console.log("containerList >>>", containerList.length )
    //         containerList.map((data,key)=> {
    //             // console.log("DDATA : ", data.cntr_pick_up_cy_date)
    //             // if( !data.cntr_pick_up_cy_date ) {
    //                 const date = props.booking.sch_etd;
    //                 // console.log("PICKUP CY ",data.cntr_pick_up_cy_date, moment(date).subtract(1,'d').format('YYYYMMDD'))
    //                 list[key] = Object.assign(data,
    //                     {'cntr_pick_up_cy_date':moment(date).subtract(1,'d').format('YYYYMMDD')},
    //                     {'cntr_pick_up_cy_date_name':moment(date).subtract(1,'d').format('YYYY-MM-DD')},);
    //             // }
    //         });
    //         // console.log(list)
    //         setContainerList(list);
    //         props.fncContainerParent(list);
    //     } else {
    //         props.fncContainerParent(containerList);
    //         // console.log("containerList <<<<<<<",door)
    //     }
    //     if( containerList.length >= 0) {
    //         setDoor(containerList[0]);
    //     }
    // },[containerList]);

    useEffect(() => {
        props.fncContainerSpecialParent(containerSpecialList);
    },[containerSpecialList]);

    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        
        // 전체북마크로 수정하는 경우
        // console.log(props.booking.bookmark_yn, props.booking.bookmark_seq)
        if( "Y" === props.booking.bookmark_yn && props.booking.bookmark_seq ) {
            if( props.booking.container_bookmark_seq ) {
                containerBookmarkList.map((element, key)=>{
                    if( props.booking.container_bookmark_seq == element.container_bookmark_seq) {
                        // console.log(element)
                        // select로 새로운 document를 세팅한다
                        // 기존 Booking 정보
                        // console.log(">>>>>>>>>>>>>>>>",booking)
                        setBooking({...booking
                            ,'container_bookmark_seq':element.container_bookmark_seq
                            ,'container_bookmark_name':element.container_bookmark_name
                            ,'cntr_selected_yn':'Y'
                        });


                        if( 0 < containerList.length ) {
                            const cntr = containerList[0];
                            
                            setContainerList([{
                                'cntr_seq':1
                                ,'container_bookmark_seq': element.container_bookmark_seq
                                ,'container_bookmark_name': element.container_bookmark_name
                                ,'cntr_code': element.cntr_code?element.cntr_code:cntr.cntr_code
                                ,'cntr_frozen_tmp': element.cntr_frozen_tmp?element.cntr_frozen_tmp:cntr.cntr_frozen_tmp
                                ,'cntr_qty': element.cntr_qty?element.cntr_qty:cntr.cntr_qty
                                ,'cntr_soc_yn':element.cntr_soc_yn?element.cntr_soc_yn:cntr.cntr_soc_yn
                                ,'cntr_empty_yn': element.cntr_empty_yn?element.cntr_empty_yn:cntr.cntr_empty_yn
                                ,'cntr_frozen_fc': element.cntr_frozen_fc?element.cntr_frozen_fc:cntr.cntr_frozen_fc
                                ,'cntr_frozen_tmp_unit': element.cntr_frozen_tmp_unit?element.cntr_frozen_tmp_unit:cntr.cntr_frozen_tmp_unit
                                ,'cntr_pick_up_cy_address1': element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address1:cntr.cntr_pick_up_cy_address1
                                ,'cntr_pick_up_cy_address2': element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address2:cntr.cntr_pick_up_cy_address2
                                ,'cntr_pick_up_cy_address3': element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address3:cntr.cntr_pick_up_cy_address3
                                ,'cntr_pick_up_cy_address4': element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address4:cntr.cntr_pick_up_cy_address4
                                ,'cntr_pick_up_cy_address5': element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address5:cntr.cntr_pick_up_cy_address5
                                ,'cntr_pick_up_cy_code': element.cntr_pick_up_cy_code?element.cntr_pick_up_cy_code:cntr.cntr_pick_up_cy_code
                                ,'cntr_pick_up_cy_name1': element.cntr_pick_up_cy_name1?element.cntr_pick_up_cy_name1:cntr.cntr_pick_up_cy_name1
                                ,'cntr_pick_up_cy_name2': element.cntr_pick_up_cy_name1?element.cntr_pick_up_cy_name2:cntr.cntr_pick_up_cy_name2
                                ,'cntr_pick_up_cy_user_email': element.cntr_pick_up_cy_user_email?element.cntr_pick_up_cy_user_email:cntr.cntr_pick_up_cy_user_email
                                ,'cntr_pick_up_cy_user_fax': element.cntr_pick_up_cy_user_fax?element.cntr_pick_up_cy_user_fax:cntr.cntr_pick_up_cy_user_fax
                                ,'cntr_pick_up_cy_user_name': element.cntr_pick_up_cy_user_name?element.cntr_pick_up_cy_user_name:cntr.cntr_pick_up_cy_user_name
                                ,'cntr_pick_up_cy_user_tel': element.cntr_pick_up_cy_user_tel?element.cntr_pick_up_cy_user_tel:cntr.cntr_pick_up_cy_user_tel
                                ,'cntr_pick_up_cy_date': element.cntr_pick_up_cy_date?element.cntr_pick_up_cy_date:cntr.cntr_pick_up_cy_date
                                ,'cntr_pick_up_cy_date_name': element.cntr_pick_up_cy_date_name?element.cntr_pick_up_cy_date_name:cntr.cntr_pick_up_cy_date_name
                                ,'cntr_pre_cooling':element.cntr_pre_cooling?element.cntr_pre_cooling:cntr.cntr_pre_cooling
                                ,'cntr_seal_no': element.cntr_seal_no?element.cntr_seal_no:cntr.cntr_seal_no
                                ,'cntr_size':element.cntr_size?element.cntr_size:cntr.cntr_size
                                ,'cntr_special_type':element.cntr_special_type?element.cntr_special_type:cntr.cntr_special_type
                                ,'cntr_type':element.cntr_type?element.cntr_type:cntr.cntr_type
                                ,'cntr_vent_open':element.cntr_vent_open?element.cntr_vent_open:cntr.cntr_vent_open
                                ,'cntr_width':element.cntr_width?element.cntr_width:cntr.cntr_width
                                ,'cntr_selected_yn':'Y'
                                ,'cntr_yn': 'Y'
                                , 'cntr_door_code':element.cntr_door_code?element.cntr_door_code:cntr.cntr_door_code
                                , 'cntr_door_name1':element.cntr_door_name1?element.cntr_door_name1:cntr.cntr_door_name1
                                , 'cntr_door_name2':element.cntr_door_name1?element.cntr_door_name2:cntr.cntr_door_name2
                                , 'cntr_door_date':element.cntr_door_date?element.cntr_door_date:cntr.cntr_door_date
                                , 'cntr_door_date_name':element.cntr_door_date_name?element.cntr_door_date_name:cntr.cntr_door_date_name
                                , 'cntr_door_user_name':element.cntr_door_user_name?element.cntr_door_user_name:cntr.cntr_door_user_name
                                , 'cntr_door_user_dept':element.cntr_door_user_dept?element.cntr_door_user_dept:cntr.cntr_door_user_dept
                                , 'cntr_door_user_fax':element.cntr_door_user_fax?element.cntr_door_user_fax:cntr.cntr_door_user_fax
                                , 'cntr_door_user_tel':element.cntr_door_user_tel?element.cntr_door_user_tel:cntr.cntr_door_user_tel
                                , 'cntr_door_user_email':element.cntr_door_user_email?element.cntr_door_user_email:cntr.cntr_door_user_email
                                , 'cntr_door_address1':element.cntr_door_address1?element.cntr_door_address1:cntr.cntr_door_address1
                                , 'cntr_door_address2':element.cntr_door_address1?element.cntr_door_address2:cntr.cntr_door_address2
                                , 'cntr_door_address3':element.cntr_door_address1?element.cntr_door_address3:cntr.cntr_door_address3
                                , 'cntr_door_address4':element.cntr_door_address1?element.cntr_door_address4:cntr.cntr_door_address4
                                , 'cntr_door_address5':element.cntr_door_address1?element.cntr_door_address5:cntr.cntr_door_address5
                                , 'cntr_remark1':element.cntr_remark1?element.cntr_remark1:cntr.cntr_remark1
                                , 'cntr_remark2':element.cntr_remark1?element.cntr_remark2:cntr.cntr_remark2
                                , 'cntr_remark3':element.cntr_remark1?element.cntr_remark3:cntr.cntr_remark3
                                , 'cntr_remark4':element.cntr_remark1?element.cntr_remark4:cntr.cntr_remark4
                                , 'cntr_remark5':element.cntr_remark1?element.cntr_remark5:cntr.cntr_remark5
                            }]);
                            props.fncContainerParent([{
                                'cntr_seq':1
                                ,'container_bookmark_seq': element.container_bookmark_seq
                                ,'container_bookmark_name': element.container_bookmark_name
                                ,'cntr_code': element.cntr_code?element.cntr_code:cntr.cntr_code
                                ,'cntr_frozen_tmp': element.cntr_frozen_tmp?element.cntr_frozen_tmp:cntr.cntr_frozen_tmp
                                ,'cntr_qty': element.cntr_qty?element.cntr_qty:cntr.cntr_qty
                                ,'cntr_soc_yn':element.cntr_soc_yn?element.cntr_soc_yn:cntr.cntr_soc_yn
                                ,'cntr_empty_yn': element.cntr_empty_yn?element.cntr_empty_yn:cntr.cntr_empty_yn
                                ,'cntr_frozen_fc': element.cntr_frozen_fc?element.cntr_frozen_fc:cntr.cntr_frozen_fc
                                ,'cntr_frozen_tmp_unit': element.cntr_frozen_tmp_unit?element.cntr_frozen_tmp_unit:cntr.cntr_frozen_tmp_unit
                                ,'cntr_pick_up_cy_address1': element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address1:cntr.cntr_pick_up_cy_address1
                                ,'cntr_pick_up_cy_address2': element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address2:cntr.cntr_pick_up_cy_address2
                                ,'cntr_pick_up_cy_address3': element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address3:cntr.cntr_pick_up_cy_address3
                                ,'cntr_pick_up_cy_address4': element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address4:cntr.cntr_pick_up_cy_address4
                                ,'cntr_pick_up_cy_address5': element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address5:cntr.cntr_pick_up_cy_address5
                                ,'cntr_pick_up_cy_code': element.cntr_pick_up_cy_code?element.cntr_pick_up_cy_code:cntr.cntr_pick_up_cy_code
                                ,'cntr_pick_up_cy_name1': element.cntr_pick_up_cy_name1?element.cntr_pick_up_cy_name1:cntr.cntr_pick_up_cy_name1
                                ,'cntr_pick_up_cy_name2': element.cntr_pick_up_cy_name1?element.cntr_pick_up_cy_name2:cntr.cntr_pick_up_cy_name2
                                ,'cntr_pick_up_cy_user_email': element.cntr_pick_up_cy_user_email?element.cntr_pick_up_cy_user_email:cntr.cntr_pick_up_cy_user_email
                                ,'cntr_pick_up_cy_user_fax': element.cntr_pick_up_cy_user_fax?element.cntr_pick_up_cy_user_fax:cntr.cntr_pick_up_cy_user_fax
                                ,'cntr_pick_up_cy_user_name': element.cntr_pick_up_cy_user_name?element.cntr_pick_up_cy_user_name:cntr.cntr_pick_up_cy_user_name
                                ,'cntr_pick_up_cy_user_tel': element.cntr_pick_up_cy_user_tel?element.cntr_pick_up_cy_user_tel:cntr.cntr_pick_up_cy_user_tel
                                ,'cntr_pick_up_cy_date': element.cntr_pick_up_cy_date?element.cntr_pick_up_cy_date:cntr.cntr_pick_up_cy_date
                                ,'cntr_pick_up_cy_date_name': element.cntr_pick_up_cy_date_name?element.cntr_pick_up_cy_date_name:cntr.cntr_pick_up_cy_date_name
                                ,'cntr_pre_cooling':element.cntr_pre_cooling?element.cntr_pre_cooling:cntr.cntr_pre_cooling
                                ,'cntr_seal_no': element.cntr_seal_no?element.cntr_seal_no:cntr.cntr_seal_no
                                ,'cntr_size':element.cntr_size?element.cntr_size:cntr.cntr_size
                                ,'cntr_special_type':element.cntr_special_type?element.cntr_special_type:cntr.cntr_special_type
                                ,'cntr_type':element.cntr_type?element.cntr_type:cntr.cntr_type
                                ,'cntr_vent_open':element.cntr_vent_open?element.cntr_vent_open:cntr.cntr_vent_open
                                ,'cntr_width':element.cntr_width?element.cntr_width:cntr.cntr_width
                                ,'cntr_selected_yn':'Y'
                                ,'cntr_yn': 'Y'
                                , 'cntr_door_code':element.cntr_door_code?element.cntr_door_code:cntr.cntr_door_code
                                , 'cntr_door_name1':element.cntr_door_name1?element.cntr_door_name1:cntr.cntr_door_name1
                                , 'cntr_door_name2':element.cntr_door_name1?element.cntr_door_name2:cntr.cntr_door_name2
                                , 'cntr_door_date':element.cntr_door_date?element.cntr_door_date:cntr.cntr_door_date
                                , 'cntr_door_date_name':element.cntr_door_date_name?element.cntr_door_date_name:cntr.cntr_door_date_name
                                , 'cntr_door_user_name':element.cntr_door_user_name?element.cntr_door_user_name:cntr.cntr_door_user_name
                                , 'cntr_door_user_dept':element.cntr_door_user_dept?element.cntr_door_user_dept:cntr.cntr_door_user_dept
                                , 'cntr_door_user_fax':element.cntr_door_user_fax?element.cntr_door_user_fax:cntr.cntr_door_user_fax
                                , 'cntr_door_user_tel':element.cntr_door_user_tel?element.cntr_door_user_tel:cntr.cntr_door_user_tel
                                , 'cntr_door_user_email':element.cntr_door_user_email?element.cntr_door_user_email:cntr.cntr_door_user_email
                                , 'cntr_door_address1':element.cntr_door_address1?element.cntr_door_address1:cntr.cntr_door_address1
                                , 'cntr_door_address2':element.cntr_door_address1?element.cntr_door_address2:cntr.cntr_door_address2
                                , 'cntr_door_address3':element.cntr_door_address1?element.cntr_door_address3:cntr.cntr_door_address3
                                , 'cntr_door_address4':element.cntr_door_address1?element.cntr_door_address4:cntr.cntr_door_address4
                                , 'cntr_door_address5':element.cntr_door_address1?element.cntr_door_address5:cntr.cntr_door_address5
                                , 'cntr_remark1':element.cntr_remark1?element.cntr_remark1:cntr.cntr_remark1
                                , 'cntr_remark2':element.cntr_remark1?element.cntr_remark2:cntr.cntr_remark2
                                , 'cntr_remark3':element.cntr_remark1?element.cntr_remark3:cntr.cntr_remark3
                                , 'cntr_remark4':element.cntr_remark1?element.cntr_remark4:cntr.cntr_remark4
                                , 'cntr_remark5':element.cntr_remark1?element.cntr_remark5:cntr.cntr_remark5
                            }]);



                            // door 입력
                            setDoor({
                                ...door
                                , 'cntr_door_user_name':("N" === props.booking.trans_self_yn )?element.cntr_door_user_name?element.cntr_door_user_name:door.cntr_door_user_name:null
                                , 'cntr_door_user_tel':("N" === props.booking.trans_self_yn )?element.cntr_door_user_tel?element.cntr_door_user_tel:door.cntr_door_user_tel:null
                                , 'cntr_door_address1':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address1:door.cntr_door_address1:null
                                , 'cntr_door_address2':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address2:door.cntr_door_address2:null
                                , 'cntr_door_address3':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address3:door.cntr_door_address3:null
                                , 'cntr_door_address4':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address4:door.cntr_door_address4:null
                                , 'cntr_door_address5':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address5:door.cntr_door_address5:null

                                , 'cntr_remark1':element.cntr_remark1?element.cntr_remark1:door.cntr_remark1
                                , 'cntr_remark2':element.cntr_remark1?element.cntr_remark2:door.cntr_remark2
                                , 'cntr_remark3':element.cntr_remark1?element.cntr_remark3:door.cntr_remark3
                                , 'cntr_remark4':element.cntr_remark1?element.cntr_remark4:door.cntr_remark4
                                , 'cntr_remark5':element.cntr_remark1?element.cntr_remark5:door.cntr_remark5
                            });
                            props.fncDoorParent({
                                ...door
                                , 'cntr_door_user_name':("N" === props.booking.trans_self_yn )?element.cntr_door_user_name?element.cntr_door_user_name:door.cntr_door_user_name:null
                                , 'cntr_door_user_tel':("N" === props.booking.trans_self_yn )?element.cntr_door_user_tel?element.cntr_door_user_tel:door.cntr_door_user_tel:null
                                , 'cntr_door_address1':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address1:door.cntr_door_address1:null
                                , 'cntr_door_address2':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address2:door.cntr_door_address2:null
                                , 'cntr_door_address3':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address3:door.cntr_door_address3:null
                                , 'cntr_door_address4':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address4:door.cntr_door_address4:null
                                , 'cntr_door_address5':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address5:door.cntr_door_address5:null

                                , 'cntr_remark1':element.cntr_remark1?element.cntr_remark1:door.cntr_remark1
                                , 'cntr_remark2':element.cntr_remark1?element.cntr_remark2:door.cntr_remark2
                                , 'cntr_remark3':element.cntr_remark1?element.cntr_remark3:door.cntr_remark3
                                , 'cntr_remark4':element.cntr_remark1?element.cntr_remark4:door.cntr_remark4
                                , 'cntr_remark5':element.cntr_remark1?element.cntr_remark5:door.cntr_remark5
                            });

                        } else {
                            setContainerList([{
                                'cntr_seq':1
                                ,'container_bookmark_seq': element.container_bookmark_seq
                                ,'container_bookmark_name': element.container_bookmark_name
                                ,'cntr_code': element.cntr_code
                                ,'cntr_frozen_tmp':element.cntr_frozen_tmp
                                ,'cntr_qty':element.cntr_qty
                                ,'cntr_soc_yn':element.cntr_soc_yn
                                ,'cntr_empty_yn':element.cntr_empty_yn
                                ,'cntr_frozen_fc':element.cntr_frozen_fc
                                ,'cntr_frozen_tmp_unit':element.cntr_frozen_tmp_unit
                                ,'cntr_pick_up_cy_address1':element.cntr_pick_up_cy_address1
                                ,'cntr_pick_up_cy_address2':element.cntr_pick_up_cy_address2
                                ,'cntr_pick_up_cy_address3':element.cntr_pick_up_cy_address3
                                ,'cntr_pick_up_cy_address4':element.cntr_pick_up_cy_address4
                                ,'cntr_pick_up_cy_address5':element.cntr_pick_up_cy_address5
                                ,'cntr_pick_up_cy_code':element.cntr_pick_up_cy_code
                                ,'cntr_pick_up_cy_name1':element.cntr_pick_up_cy_name1
                                ,'cntr_pick_up_cy_name2':element.cntr_pick_up_cy_name2
                                ,'cntr_pick_up_cy_user_email':element.cntr_pick_up_cy_user_email
                                ,'cntr_pick_up_cy_user_fax':element.cntr_pick_up_cy_user_fax
                                ,'cntr_pick_up_cy_user_name':element.cntr_pick_up_cy_user_name
                                ,'cntr_pick_up_cy_user_tel':element.cntr_pick_up_cy_user_tel
                                ,'cntr_pick_up_cy_date':element.cntr_pick_up_cy_date
                                ,'cntr_pre_cooling':element.cntr_pre_cooling
                                ,'cntr_seal_no':element.cntr_seal_no
                                // ,'cntr_seq':element.cntr_seq
                                ,'cntr_size':element.cntr_size
                                ,'cntr_special_type':element.cntr_special_type
                                ,'cntr_type':element.cntr_type
                                ,'cntr_vent_open':element.cntr_vent_open
                                ,'cntr_width':element.cntr_width
                                ,'cntr_selected_yn':'Y'
                                ,'cntr_yn': 'Y'
                                , 'cntr_door_code':element.cntr_door_code, 'cntr_door_name1':element.cntr_door_name1, 'cntr_door_name2':element.cntr_door_name2
                                , 'cntr_door_date':element.cntr_door_date, 'cntr_door_date_name':element.cntr_door_date_name
                                , 'cntr_door_user_name':element.cntr_door_user_name
                                , 'cntr_door_user_dept':element.cntr_door_user_dept, 'cntr_door_user_fax':element.cntr_door_user_fax
                                , 'cntr_door_user_tel':element.cntr_door_user_tel, 'cntr_door_user_email':element.cntr_door_user_email
                                , 'cntr_door_address1':element.cntr_door_address1, 'cntr_door_address2':element.cntr_door_address2, 'cntr_door_address3':element.cntr_door_address3, 'cntr_door_address4':element.cntr_door_address4, 'cntr_door_address5':element.cntr_door_address5
                                , 'cntr_remark1':element.cntr_remark1, 'cntr_remark2':element.cntr_remark2, 'cntr_remark3':element.cntr_remark3, 'cntr_remark4':element.cntr_remark4, 'cntr_remark5':element.cntr_remark5
                            }]);
                            props.fncContainerParent([{
                                'cntr_seq':1
                                ,'container_bookmark_seq':element.container_bookmark_seq
                                ,'container_bookmark_name':element.container_bookmark_name
                                ,'cntr_code':element.cntr_code
                                ,'cntr_empty_yn':element.cntr_empty_yn
                                ,'cntr_frozen_fc':element.cntr_frozen_fc
                                ,'cntr_frozen_tmp':element.cntr_frozen_tmp
                                ,'cntr_frozen_tmp_unit':element.cntr_frozen_tmp_unit
                                ,'cntr_pick_up_cy_address1':element.cntr_pick_up_cy_address1
                                ,'cntr_pick_up_cy_address2':element.cntr_pick_up_cy_address2
                                ,'cntr_pick_up_cy_address3':element.cntr_pick_up_cy_address3
                                ,'cntr_pick_up_cy_address4':element.cntr_pick_up_cy_address4
                                ,'cntr_pick_up_cy_address5':element.cntr_pick_up_cy_address5
                                ,'cntr_pick_up_cy_code':element.cntr_pick_up_cy_code
                                ,'cntr_pick_up_cy_name1':element.cntr_pick_up_cy_name1
                                ,'cntr_pick_up_cy_name2':element.cntr_pick_up_cy_name2
                                ,'cntr_pick_up_cy_user_email':element.cntr_pick_up_cy_user_email
                                ,'cntr_pick_up_cy_user_fax':element.cntr_pick_up_cy_user_fax
                                ,'cntr_pick_up_cy_user_name':element.cntr_pick_up_cy_user_name
                                ,'cntr_pick_up_cy_user_tel':element.cntr_pick_up_cy_user_tel
                                ,'cntr_pick_up_cy_date':element.cntr_pick_up_cy_date
                                ,'cntr_pre_cooling':element.cntr_pre_cooling
                                ,'cntr_qty':element.cntr_qty
                                ,'cntr_seal_no':element.cntr_seal_no
                                // ,'cntr_seq':element.cntr_seq
                                ,'cntr_size':element.cntr_size
                                ,'cntr_soc_yn':element.cntr_soc_yn
                                ,'cntr_special_type':element.cntr_special_type
                                ,'cntr_type':element.cntr_type
                                ,'cntr_vent_open':element.cntr_vent_open
                                ,'cntr_width':element.cntr_width
                                ,'cntr_selected_yn':'Y'
                                ,'cntr_yn': 'Y'
                                , 'cntr_door_code':element.cntr_door_code, 'cntr_door_name1':element.cntr_door_name1, 'cntr_door_name2':element.cntr_door_name2
                                , 'cntr_door_date':element.cntr_door_date, 'cntr_door_date_name':element.cntr_door_date_name
                                , 'cntr_door_user_name':element.cntr_door_user_name
                                , 'cntr_door_user_dept':element.cntr_door_user_dept, 'cntr_door_user_fax':element.cntr_door_user_fax
                                , 'cntr_door_user_tel':element.cntr_door_user_tel, 'cntr_door_user_email':element.cntr_door_user_email
                                , 'cntr_door_address1':element.cntr_door_address1, 'cntr_door_address2':element.cntr_door_address2, 'cntr_door_address3':element.cntr_door_address3, 'cntr_door_address4':element.cntr_door_address4, 'cntr_door_address5':element.cntr_door_address5
                                , 'cntr_remark1':element.cntr_remark1, 'cntr_remark2':element.cntr_remark2, 'cntr_remark3':element.cntr_remark3, 'cntr_remark4':element.cntr_remark4, 'cntr_remark5':element.cntr_remark5
                            }]);
                        }

                        // door 입력
                        setDoor({
                            ...door
                            , 'cntr_door_user_name':("N" === props.booking.trans_self_yn )?element.cntr_door_user_name:null
                            , 'cntr_door_user_tel':("N" === props.booking.trans_self_yn )?element.cntr_door_user_tel:null
                            , 'cntr_door_address1':("N" === props.booking.trans_self_yn )?element.cntr_door_address1:null
                            , 'cntr_door_address2':("N" === props.booking.trans_self_yn )?element.cntr_door_address1:null
                            , 'cntr_door_address3':("N" === props.booking.trans_self_yn )?element.cntr_door_address1:null
                            , 'cntr_door_address4':("N" === props.booking.trans_self_yn )?element.cntr_door_address1:null
                            , 'cntr_door_address5':("N" === props.booking.trans_self_yn )?element.cntr_door_address1:null

                            , 'cntr_remark1':element.cntr_remark1?element.cntr_remark1:null
                            , 'cntr_remark2':element.cntr_remark1?element.cntr_remark2:null
                            , 'cntr_remark3':element.cntr_remark1?element.cntr_remark3:null
                            , 'cntr_remark4':element.cntr_remark1?element.cntr_remark4:null
                            , 'cntr_remark5':element.cntr_remark1?element.cntr_remark5:null
                        });
                        props.fncDoorParent({
                            ...door
                            , 'cntr_door_user_name':("N" === props.booking.trans_self_yn )?element.cntr_door_user_name:null
                            , 'cntr_door_user_tel':("N" === props.booking.trans_self_yn )?element.cntr_door_user_tel:null
                            , 'cntr_door_address1':("N" === props.booking.trans_self_yn )?element.cntr_door_address1:null
                            , 'cntr_door_address2':("N" === props.booking.trans_self_yn )?element.cntr_door_address1:null
                            , 'cntr_door_address3':("N" === props.booking.trans_self_yn )?element.cntr_door_address1:null
                            , 'cntr_door_address4':("N" === props.booking.trans_self_yn )?element.cntr_door_address1:null
                            , 'cntr_door_address5':("N" === props.booking.trans_self_yn )?element.cntr_door_address1:null

                            , 'cntr_remark1':element.cntr_remark1?element.cntr_remark1:null
                            , 'cntr_remark2':element.cntr_remark1?element.cntr_remark2:null
                            , 'cntr_remark3':element.cntr_remark1?element.cntr_remark3:null
                            , 'cntr_remark4':element.cntr_remark1?element.cntr_remark4:null
                            , 'cntr_remark5':element.cntr_remark1?element.cntr_remark5:null
                        });
                        element.cntr_seq=1;
                        // selectBookingContainerSpecialBookmarkRelation(element);
                    }
                })
            }
            setContainerSpecialList([ {'key':'1', 'cntr_seq':1}]);
        } else if ( "D" === props.booking.bookmark_yn ){
            setBooking({...booking
                ,'container_bookmark_seq': null
                ,'container_bookmark_name': null
                ,'cntr_selected_yn':'N'
            });


            let list = containerList;

            containerList.map((data,index)=> {
                if( "Y" === data.cntr_yn ) {
                    list[index] = {...data
                        ,'container_bookmark_seq': null
                        ,'container_bookmark_name': null
                        ,'cntr_code': null
                        ,'cntr_frozen_tmp': null
                        ,'cntr_qty': null
                        ,'cntr_soc_yn': 'N'
                        ,'cntr_empty_yn': null
                        ,'cntr_frozen_fc': null
                        ,'cntr_frozen_tmp_unit': null
                        ,'cntr_pick_up_cy_address1': null
                        ,'cntr_pick_up_cy_address2': null
                        ,'cntr_pick_up_cy_address3': null
                        ,'cntr_pick_up_cy_address4': null
                        ,'cntr_pick_up_cy_address5': null
                        ,'cntr_pick_up_cy_code': null
                        ,'cntr_pick_up_cy_name1': null
                        ,'cntr_pick_up_cy_name2': null
                        ,'cntr_pick_up_cy_user_email': null
                        ,'cntr_pick_up_cy_user_fax': null
                        ,'cntr_pick_up_cy_user_name': null
                        ,'cntr_pick_up_cy_user_tel': null
                        ,'cntr_pick_up_cy_date': null
                        ,'cntr_pick_up_cy_date_name': null
                        ,'cntr_pre_cooling': null
                        ,'cntr_seal_no': null
                        ,'cntr_size': null
                        ,'cntr_special_type': null
                        ,'cntr_type': null
                        ,'cntr_vent_open': null
                        ,'cntr_width': null
                        ,'cntr_selected_yn':'N'
                        ,'cntr_yn': 'Y'
                        , 'cntr_door_code': null
                        , 'cntr_door_name1': null
                        , 'cntr_door_name2': null
                        , 'cntr_door_date': null
                        , 'cntr_door_date_name': null
                        , 'cntr_door_user_name': null
                        , 'cntr_door_user_dept': null
                        , 'cntr_door_user_fax': null
                        , 'cntr_door_user_tel': null
                        , 'cntr_door_user_email': null
                        , 'cntr_door_address1': null
                        , 'cntr_door_address2': null
                        , 'cntr_door_address3': null
                        , 'cntr_door_address4': null
                        , 'cntr_door_address5': null
                        , 'cntr_remark1': null
                        , 'cntr_remark2': null
                        , 'cntr_remark3': null
                        , 'cntr_remark4': null
                        , 'cntr_remark5': null
                    };
                }
            });
            // console.log(list)
            setContainerList(list);
            props.fncContainerParent(list);
            setDoor({});
            props.fncDoorParent(door);
        } else {

            // etd 변경되면 container 정보에 픽업데이트 etd-1 세팅
            if( props.booking.sch_etd ) {
                // console.log("CNTR_ ETD 작업 ",props.booking.sch_etd);
                let list = containerList;
                // console.log("containerList >>>", containerList.length )
                containerList.map((data,key)=> {
                    // console.log("DDATA : ", data.cntr_pick_up_cy_date)
                    // if( !data.cntr_pick_up_cy_date ) {
                        const date = props.booking.sch_etd;
                        // console.log("PICKUP CY ",data.cntr_pick_up_cy_date, moment(date).subtract(1,'d').format('YYYYMMDD'))
                        // list[key] = Object.assign(data, {'cntr_pick_up_cy_date':moment(date).subtract(1,'d').format('YYYYMMDD')});
                        if( !data.cntr_pick_up_cy_date ) {
                            list[key] = {...data
                                , 'cntr_pick_up_cy_date':moment(date).subtract(1,'d').format('YYYYMMDD')
                                , 'cntr_pick_up_cy_date_name':moment(date).subtract(1,'d').format('YYYY-MM-DD')}
                        }
                    // }
                });
                // console.log(list)
                setContainerList(list);
                props.fncContainerParent(list);
            }

            // console.log("props:",props.booking);
            let bkg_no = props.booking.bkg_no;
            let bkg_date = props.booking.bkg_date;
            let status_cus = props.booking.status_cus;
            let sc_no = props.booking.sc_no;
            let user_no = props.booking.user_no;

            // container Bookmark seq
            let container_bookmark_seq = props.booking.container_bookmark_seq;
            let init_container_bookmark_seq = props.booking.init_container_bookmark_seq;

            setBooking({...booking, 'bkg_no':bkg_no, 'bkg_date':bkg_date
                , 'status_cus':status_cus, 'sc_no':sc_no, 'user_no':user_no
                , 'container_bookmark_seq':container_bookmark_seq
                , 'init_container_bookmark_seq':init_container_bookmark_seq
            }); // 초기화 bookmark seq 값

            // 최초 조회하기
            if( booking.bkg_no != props.booking.bkg_no ) {
                if( props.booking.bkg_no && props.booking.bkg_date && props.booking.user_no ) {
                    selectContainerOfBooking(props.booking);
                    selectContainerSpecialOfBooking(props.booking);
                }
                // selectCargoOfBooking(props.booking);
            }
        }
    },[props.booking]);
    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        setContainerBookmarkList(props.containerBookmarkList);
    },[props.containerBookmarkList]);

        // 20210809 servicecode 변경에 따라 CFS 일경우 항목 변경
    // VESSEL 명 , POL, POD 변경에 따라 바뀌어야 한다.
    useEffect(() => {
        if( props.booking.trans_service_code ) {
            setServiceCode(props.booking.trans_service_code);
        }
    },[props.booking.trans_service_code]);

    // 메인 화면에서 select 선택한 경우
    const fncSelectContainer = (e)=>{
        if( e ) {
            if( 1 > e.value ) {
                // setBooking({});
                if ( coll ) {
                    setColl(!coll)
                }
            // 그외 데이터인 경우
            } else {
                const element = containerBookmarkList.find(element=> element.container_bookmark_seq === e.value);
                setBooking({...booking
                    ,'container_bookmark_seq':element.container_bookmark_seq
                    ,'container_bookmark_name':element.container_bookmark_name
                    ,'cntr_selected_yn':'Y'
                });
    
    
                let list = containerList;
    
                containerList.map((data,index)=> {
                    if( "Y" === data.cntr_yn ) {
                        console.log(">>>>>>>>",element)
                        list[index] = {...data
                            ,'cntr_code': element.cntr_code?element.cntr_code:data.cntr_code
                            ,'cntr_frozen_tmp': element.cntr_frozen_tmp?element.cntr_frozen_tmp:data.cntr_frozen_tmp
                            ,'cntr_qty': element.cntr_qty?element.cntr_qty:data.cntr_qty
                            ,'cntr_soc_yn':element.cntr_soc_yn?element.cntr_soc_yn:data.cntr_soc_yn
                            ,'cntr_empty_yn': element.cntr_empty_yn?element.cntr_empty_yn:data.cntr_empty_yn
                            ,'cntr_frozen_fc': element.cntr_frozen_fc?element.cntr_frozen_fc:data.cntr_frozen_fc
                            ,'cntr_frozen_tmp_unit': element.cntr_frozen_tmp_unit?element.cntr_frozen_tmp_unit:data.cntr_frozen_tmp_unit
                            ,'cntr_pick_up_cy_address1': element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address1:data.cntr_pick_up_cy_address1
                            ,'cntr_pick_up_cy_address2': element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address2:data.cntr_pick_up_cy_address2
                            ,'cntr_pick_up_cy_address3': element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address3:data.cntr_pick_up_cy_address3
                            ,'cntr_pick_up_cy_address4': element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address4:data.cntr_pick_up_cy_address4
                            ,'cntr_pick_up_cy_address5': element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address5:data.cntr_pick_up_cy_address5
                            ,'cntr_pick_up_cy_code': element.cntr_pick_up_cy_code?element.cntr_pick_up_cy_code:data.cntr_pick_up_cy_code
                            ,'cntr_pick_up_cy_name1': element.cntr_pick_up_cy_name1?element.cntr_pick_up_cy_name1:data.cntr_pick_up_cy_name1
                            ,'cntr_pick_up_cy_name2': element.cntr_pick_up_cy_name1?element.cntr_pick_up_cy_name2:data.cntr_pick_up_cy_name2
                            ,'cntr_pick_up_cy_user_email': element.cntr_pick_up_cy_user_email?element.cntr_pick_up_cy_user_email:data.cntr_pick_up_cy_user_email
                            ,'cntr_pick_up_cy_user_fax': element.cntr_pick_up_cy_user_fax?element.cntr_pick_up_cy_user_fax:data.cntr_pick_up_cy_user_fax
                            ,'cntr_pick_up_cy_user_name': element.cntr_pick_up_cy_user_name?element.cntr_pick_up_cy_user_name:data.cntr_pick_up_cy_user_name
                            ,'cntr_pick_up_cy_user_tel': element.cntr_pick_up_cy_user_tel?element.cntr_pick_up_cy_user_tel:data.cntr_pick_up_cy_user_tel
                            ,'cntr_pick_up_cy_date': element.cntr_pick_up_cy_date?element.cntr_pick_up_cy_date:data.cntr_pick_up_cy_date
                            ,'cntr_pick_up_cy_date_name': element.cntr_pick_up_cy_date_name?element.cntr_pick_up_cy_date_name:data.cntr_pick_up_cy_date_name
                            ,'cntr_pre_cooling':element.cntr_pre_cooling?element.cntr_pre_cooling:data.cntr_pre_cooling
                            ,'cntr_seal_no': element.cntr_seal_no?element.cntr_seal_no:data.cntr_seal_no
                            ,'cntr_size':element.cntr_size?element.cntr_size:data.cntr_size
                            ,'cntr_special_type':element.cntr_special_type?element.cntr_special_type:data.cntr_special_type
                            ,'cntr_type':element.cntr_type?element.cntr_type:data.cntr_type
                            ,'cntr_vent_open':element.cntr_vent_open?element.cntr_vent_open:data.cntr_vent_open
                            ,'cntr_width':element.cntr_width?element.cntr_width:data.cntr_width
                            ,'cntr_selected_yn':'Y'
                            ,'cntr_yn': 'Y'
                            , 'cntr_door_code':("N" === props.booking.trans_self_yn )?element.cntr_door_code?element.cntr_door_code:data.cntr_door_code:null
                            , 'cntr_door_name1':("N" === props.booking.trans_self_yn )?element.cntr_door_name1?element.cntr_door_name1:data.cntr_door_name1:null
                            , 'cntr_door_name2':("N" === props.booking.trans_self_yn )?element.cntr_door_name1?element.cntr_door_name2:data.cntr_door_name2:null
                            , 'cntr_door_date':("N" === props.booking.trans_self_yn )?element.cntr_door_date?element.cntr_door_date:data.cntr_door_date:null
                            , 'cntr_door_date_name':("N" === props.booking.trans_self_yn )?element.cntr_door_date_name?element.cntr_door_date_name:data.cntr_door_date_name:null
                            , 'cntr_door_user_name':("N" === props.booking.trans_self_yn )?element.cntr_door_user_name?element.cntr_door_user_name:data.cntr_door_user_name:null
                            , 'cntr_door_user_dept':("N" === props.booking.trans_self_yn )?element.cntr_door_user_dept?element.cntr_door_user_dept:data.cntr_door_user_dept:null
                            , 'cntr_door_user_fax':("N" === props.booking.trans_self_yn )?element.cntr_door_user_fax?element.cntr_door_user_fax:data.cntr_door_user_fax:null
                            , 'cntr_door_user_tel':("N" === props.booking.trans_self_yn )?element.cntr_door_user_tel?element.cntr_door_user_tel:data.cntr_door_user_tel:null
                            , 'cntr_door_user_email':("N" === props.booking.trans_self_yn )?element.cntr_door_user_email?element.cntr_door_user_email:data.cntr_door_user_email:null
                            , 'cntr_door_address1':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address1:data.cntr_door_address1:null
                            , 'cntr_door_address2':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address2:data.cntr_door_address2:null
                            , 'cntr_door_address3':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address3:data.cntr_door_address3:null
                            , 'cntr_door_address4':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address4:data.cntr_door_address4:null
                            , 'cntr_door_address5':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address5:data.cntr_door_address5:null
                            , 'cntr_remark1':element.cntr_remark1?element.cntr_remark1:data.cntr_remark1
                            , 'cntr_remark2':element.cntr_remark1?element.cntr_remark2:data.cntr_remark2
                            , 'cntr_remark3':element.cntr_remark1?element.cntr_remark3:data.cntr_remark3
                            , 'cntr_remark4':element.cntr_remark1?element.cntr_remark4:data.cntr_remark4
                            , 'cntr_remark5':element.cntr_remark1?element.cntr_remark5:data.cntr_remark5
                        };
                    }
                });
                console.log(list)
                setContainerList([...list]);
                props.fncContainerParent([...list]);
                
                
                // door 입력
                setDoor({
                    ...door
                    , 'cntr_door_user_name':("N" === props.booking.trans_self_yn )?element.cntr_door_user_name?element.cntr_door_user_name:door.cntr_door_user_name:null
                    , 'cntr_door_user_tel':("N" === props.booking.trans_self_yn )?element.cntr_door_user_tel?element.cntr_door_user_tel:door.cntr_door_user_tel:null
                    , 'cntr_door_address1':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address1:door.cntr_door_address1:null
                    , 'cntr_door_address2':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address2:door.cntr_door_address2:null
                    , 'cntr_door_address3':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address3:door.cntr_door_address3:null
                    , 'cntr_door_address4':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address4:door.cntr_door_address4:null
                    , 'cntr_door_address5':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address5:door.cntr_door_address5:null

                    , 'cntr_remark1':element.cntr_remark1?element.cntr_remark1:door.cntr_remark1
                    , 'cntr_remark2':element.cntr_remark1?element.cntr_remark2:door.cntr_remark2
                    , 'cntr_remark3':element.cntr_remark1?element.cntr_remark3:door.cntr_remark3
                    , 'cntr_remark4':element.cntr_remark1?element.cntr_remark4:door.cntr_remark4
                    , 'cntr_remark5':element.cntr_remark1?element.cntr_remark5:door.cntr_remark5
                });
                props.fncDoorParent({
                    ...door
                    , 'cntr_door_user_name':("N" === props.booking.trans_self_yn )?element.cntr_door_user_name?element.cntr_door_user_name:door.cntr_door_user_name:null
                    , 'cntr_door_user_tel':("N" === props.booking.trans_self_yn )?element.cntr_door_user_tel?element.cntr_door_user_tel:door.cntr_door_user_tel:null
                    , 'cntr_door_address1':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address1:door.cntr_door_address1:null
                    , 'cntr_door_address2':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address2:door.cntr_door_address2:null
                    , 'cntr_door_address3':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address3:door.cntr_door_address3:null
                    , 'cntr_door_address4':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address4:door.cntr_door_address4:null
                    , 'cntr_door_address5':("N" === props.booking.trans_self_yn )?element.cntr_door_address1?element.cntr_door_address5:door.cntr_door_address5:null

                    , 'cntr_remark1':element.cntr_remark1?element.cntr_remark1:door.cntr_remark1
                    , 'cntr_remark2':element.cntr_remark1?element.cntr_remark2:door.cntr_remark2
                    , 'cntr_remark3':element.cntr_remark1?element.cntr_remark3:door.cntr_remark3
                    , 'cntr_remark4':element.cntr_remark1?element.cntr_remark4:door.cntr_remark4
                    , 'cntr_remark5':element.cntr_remark1?element.cntr_remark5:door.cntr_remark5
                });
                if ( !coll ) {
                    setColl(!coll);
                }
            }
        } else {
            if( booking.container_bookmark_seq ) {
                setBooking({...booking
                    ,'container_bookmark_seq': null
                    ,'container_bookmark_name': null
                    ,'cntr_selected_yn':'N'
                });
    
    
                let list = containerList;
    
                containerList.map((data,index)=> {
                    if( "Y" === data.cntr_yn ) {
                        list[index] = {...data
                            ,'container_bookmark_seq': null
                            ,'container_bookmark_name': null
                            ,'cntr_code': null
                            ,'cntr_frozen_tmp': null
                            ,'cntr_qty': null
                            ,'cntr_soc_yn': 'N'
                            ,'cntr_empty_yn': null
                            ,'cntr_frozen_fc': null
                            ,'cntr_frozen_tmp_unit': null
                            ,'cntr_pick_up_cy_address1': null
                            ,'cntr_pick_up_cy_address2': null
                            ,'cntr_pick_up_cy_address3': null
                            ,'cntr_pick_up_cy_address4': null
                            ,'cntr_pick_up_cy_address5': null
                            ,'cntr_pick_up_cy_code': null
                            ,'cntr_pick_up_cy_name1': null
                            ,'cntr_pick_up_cy_name2': null
                            ,'cntr_pick_up_cy_user_email': null
                            ,'cntr_pick_up_cy_user_fax': null
                            ,'cntr_pick_up_cy_user_name': null
                            ,'cntr_pick_up_cy_user_tel': null
                            ,'cntr_pick_up_cy_date': null
                            ,'cntr_pick_up_cy_date_name': null
                            ,'cntr_pre_cooling': null
                            ,'cntr_seal_no': null
                            ,'cntr_size': null
                            ,'cntr_special_type': null
                            ,'cntr_type': null
                            ,'cntr_vent_open': null
                            ,'cntr_width': null
                            ,'cntr_selected_yn':'N'
                            ,'cntr_yn': 'Y'
                            , 'cntr_door_code': null
                            , 'cntr_door_name1': null
                            , 'cntr_door_name2': null
                            , 'cntr_door_date': null
                            , 'cntr_door_date_name': null
                            , 'cntr_door_user_name': null
                            , 'cntr_door_user_dept': null
                            , 'cntr_door_user_fax': null
                            , 'cntr_door_user_tel': null
                            , 'cntr_door_user_email': null
                            , 'cntr_door_address1': null
                            , 'cntr_door_address2': null
                            , 'cntr_door_address3': null
                            , 'cntr_door_address4': null
                            , 'cntr_door_address5': null
                            , 'cntr_remark1': null
                            , 'cntr_remark2': null
                            , 'cntr_remark3': null
                            , 'cntr_remark4': null
                            , 'cntr_remark5': null
                        };
                    }
                });
                // console.log(list)
                setContainerList(list);
                props.fncContainerParent(list);
                setDoor({});
                props.fncDoorParent({});
            }

        }
    }

    // Card 팝업 화면에서 select 선택한 경우
    const fncSelectContainerList=(e, index)=>{
        // console.log("몇번째 컨테이너 인가요?",index);
        if( e ) {
            // 이미 추가된 Bookmark 인 경우 제어
            let chDup = false;
            containerList.forEach(function(n){
                if( n.container_bookmark_seq == e.value ) {
                    chDup = true;
                    return;
                }
            });
            if( chDup ) {
                props.onNotiAlert("danger", "Bookmark 는 이미 추가되었습니다.");
                return false;
            }

            let bookmark = {}
            // Container 목록과 일치하는 index 찾기
            containerList.map((element, key)=>{
                // Container의 목록과 일치한다면
                if( key == index ) {
                    // console.log( key, index )
                    // Bookmark 정보에서 일치하는거 찾기
                    containerBookmarkList.map((row, i)=>{
                        if( e.value == row.container_bookmark_seq ) {
                            // bookmark 정보를 담아둬서 door에 넣을때 사용
                            bookmark = row;

                            if( element.cntr_seq ) {
                                row.cntr_seq = element.cntr_seq;
                            } else {
                                row.cntr_seq = index+1;
                            }
                            // 찾은걸 list에 넣어주자.
                            containerList[key] = {
                                ...element
                                ,'container_bookmark_seq': row.container_bookmark_seq
                                ,'container_bookmark_name': row.container_bookmark_name
                                ,'cntr_code': row.cntr_code?row.cntr_code:element.cntr_code
                                ,'cntr_frozen_tmp': row.cntr_frozen_tmp?row.cntr_frozen_tmp:element.cntr_frozen_tmp
                                ,'cntr_qty': row.cntr_qty?row.cntr_qty:element.cntr_qty
                                ,'cntr_soc_yn':row.cntr_soc_yn?row.cntr_soc_yn:element.cntr_soc_yn
                                ,'cntr_empty_yn': row.cntr_empty_yn?row.cntr_empty_yn:element.cntr_empty_yn
                                ,'cntr_frozen_fc': row.cntr_frozen_fc?row.cntr_frozen_fc:element.cntr_frozen_fc
                                ,'cntr_frozen_tmp_unit': row.cntr_frozen_tmp_unit?row.cntr_frozen_tmp_unit:element.cntr_frozen_tmp_unit
                                ,'cntr_pick_up_cy_address1': row.cntr_pick_up_cy_address1?row.cntr_pick_up_cy_address1:element.cntr_pick_up_cy_address1
                                ,'cntr_pick_up_cy_address2': row.cntr_pick_up_cy_address1?row.cntr_pick_up_cy_address2:element.cntr_pick_up_cy_address2
                                ,'cntr_pick_up_cy_address3': row.cntr_pick_up_cy_address1?row.cntr_pick_up_cy_address3:element.cntr_pick_up_cy_address3
                                ,'cntr_pick_up_cy_address4': row.cntr_pick_up_cy_address1?row.cntr_pick_up_cy_address4:element.cntr_pick_up_cy_address4
                                ,'cntr_pick_up_cy_address5': row.cntr_pick_up_cy_address1?row.cntr_pick_up_cy_address5:element.cntr_pick_up_cy_address5
                                ,'cntr_pick_up_cy_code': row.cntr_pick_up_cy_code?row.cntr_pick_up_cy_code:element.cntr_pick_up_cy_code
                                ,'cntr_pick_up_cy_name1': row.cntr_pick_up_cy_name1?row.cntr_pick_up_cy_name1:element.cntr_pick_up_cy_name1
                                ,'cntr_pick_up_cy_name2': row.cntr_pick_up_cy_name1?row.cntr_pick_up_cy_name2:element.cntr_pick_up_cy_name2
                                ,'cntr_pick_up_cy_user_email': row.cntr_pick_up_cy_user_email?row.cntr_pick_up_cy_user_email:element.cntr_pick_up_cy_user_email
                                ,'cntr_pick_up_cy_user_fax': row.cntr_pick_up_cy_user_fax?row.cntr_pick_up_cy_user_fax:element.cntr_pick_up_cy_user_fax
                                ,'cntr_pick_up_cy_user_name': row.cntr_pick_up_cy_user_name?row.cntr_pick_up_cy_user_name:element.cntr_pick_up_cy_user_name
                                ,'cntr_pick_up_cy_user_tel': row.cntr_pick_up_cy_user_tel?row.cntr_pick_up_cy_user_tel:element.cntr_pick_up_cy_user_tel
                                ,'cntr_pick_up_cy_date': row.cntr_pick_up_cy_date?row.cntr_pick_up_cy_date:element.cntr_pick_up_cy_date
                                ,'cntr_pick_up_cy_date_name': row.cntr_pick_up_cy_date_name?row.cntr_pick_up_cy_date_name:element.cntr_pick_up_cy_date_name
                                ,'cntr_pre_cooling':row.cntr_pre_cooling?row.cntr_pre_cooling:element.cntr_pre_cooling
                                ,'cntr_seal_no': row.cntr_seal_no?row.cntr_seal_no:element.cntr_seal_no
                                ,'cntr_size':row.cntr_size?row.cntr_size:element.cntr_size
                                ,'cntr_special_type':row.cntr_special_type?row.cntr_special_type:element.cntr_special_type
                                ,'cntr_type':row.cntr_type?row.cntr_type:element.cntr_type
                                ,'cntr_vent_open':row.cntr_vent_open?row.cntr_vent_open:element.cntr_vent_open
                                ,'cntr_width':row.cntr_width?row.cntr_width:element.cntr_width
                                ,'cntr_selected_yn':'Y'
                                ,'cntr_yn': 'Y'
                                , 'cntr_door_code':("N" === props.booking.trans_self_yn )?row.cntr_door_code?row.cntr_door_code:element.cntr_door_code:null
                                , 'cntr_door_name1':("N" === props.booking.trans_self_yn )?row.cntr_door_name1?row.cntr_door_name1:element.cntr_door_name1:null
                                , 'cntr_door_name2':("N" === props.booking.trans_self_yn )?row.cntr_door_name1?row.cntr_door_name2:element.cntr_door_name2:null
                                , 'cntr_door_date':("N" === props.booking.trans_self_yn )?row.cntr_door_date?row.cntr_door_date:element.cntr_door_date:null
                                , 'cntr_door_date_name':("N" === props.booking.trans_self_yn )?row.cntr_door_date_name?row.cntr_door_date_name:element.cntr_door_date_name:null
                                , 'cntr_door_user_name':("N" === props.booking.trans_self_yn )?row.cntr_door_user_name?row.cntr_door_user_name:element.cntr_door_user_name:null
                                , 'cntr_door_user_dept':("N" === props.booking.trans_self_yn )?row.cntr_door_user_dept?row.cntr_door_user_dept:element.cntr_door_user_dept:null
                                , 'cntr_door_user_fax':("N" === props.booking.trans_self_yn )?row.cntr_door_user_fax?row.cntr_door_user_fax:element.cntr_door_user_fax:null
                                , 'cntr_door_user_tel':("N" === props.booking.trans_self_yn )?row.cntr_door_user_tel?row.cntr_door_user_tel:element.cntr_door_user_tel:null
                                , 'cntr_door_user_email':("N" === props.booking.trans_self_yn )?row.cntr_door_user_email?row.cntr_door_user_email:element.cntr_door_user_email:null
                                , 'cntr_door_address1':("N" === props.booking.trans_self_yn )?row.cntr_door_address1?row.cntr_door_address1:element.cntr_door_address1:null
                                , 'cntr_door_address2':("N" === props.booking.trans_self_yn )?row.cntr_door_address1?row.cntr_door_address2:element.cntr_door_address2:null
                                , 'cntr_door_address3':("N" === props.booking.trans_self_yn )?row.cntr_door_address1?row.cntr_door_address3:element.cntr_door_address3:null
                                , 'cntr_door_address4':("N" === props.booking.trans_self_yn )?row.cntr_door_address1?row.cntr_door_address4:element.cntr_door_address4:null
                                , 'cntr_door_address5':("N" === props.booking.trans_self_yn )?row.cntr_door_address1?row.cntr_door_address5:element.cntr_door_address5:null
                                , 'cntr_remark1':row.cntr_remark1?row.cntr_remark1:element.cntr_remark1
                                , 'cntr_remark2':row.cntr_remark1?row.cntr_remark2:element.cntr_remark2
                                , 'cntr_remark3':row.cntr_remark1?row.cntr_remark3:element.cntr_remark3
                                , 'cntr_remark4':row.cntr_remark1?row.cntr_remark4:element.cntr_remark4
                                , 'cntr_remark5':row.cntr_remark1?row.cntr_remark5:element.cntr_remark5
                                }
                                // Bookmark에서 Container와 연결된 Special Relation 정보도 넣어주자.
                            selectBookingContainerSpecialBookmarkRelation(row);
                        }
                    });
                }
            });
    
            setContainerList([...containerList]);

            // door 입력
            setDoor({
                ...door
                , 'cntr_door_user_name':("N" === props.booking.trans_self_yn )?bookmark.cntr_door_user_name?bookmark.cntr_door_user_name:door.cntr_door_user_name:null
                , 'cntr_door_user_tel':("N" === props.booking.trans_self_yn )?bookmark.cntr_door_user_tel?bookmark.cntr_door_user_tel:door.cntr_door_user_tel:null
                , 'cntr_door_address1':("N" === props.booking.trans_self_yn )?bookmark.cntr_door_address1?bookmark.cntr_door_address1:door.cntr_door_address1:null
                , 'cntr_door_address2':("N" === props.booking.trans_self_yn )?bookmark.cntr_door_address1?bookmark.cntr_door_address2:door.cntr_door_address2:null
                , 'cntr_door_address3':("N" === props.booking.trans_self_yn )?bookmark.cntr_door_address1?bookmark.cntr_door_address3:door.cntr_door_address3:null
                , 'cntr_door_address4':("N" === props.booking.trans_self_yn )?bookmark.cntr_door_address1?bookmark.cntr_door_address4:door.cntr_door_address4:null
                , 'cntr_door_address5':("N" === props.booking.trans_self_yn )?bookmark.cntr_door_address1?bookmark.cntr_door_address5:door.cntr_door_address5:null

                , 'cntr_remark1':bookmark.cntr_remark1?bookmark.cntr_remark1:door.cntr_remark1
                , 'cntr_remark2':bookmark.cntr_remark1?bookmark.cntr_remark2:door.cntr_remark2
                , 'cntr_remark3':bookmark.cntr_remark1?bookmark.cntr_remark3:door.cntr_remark3
                , 'cntr_remark4':bookmark.cntr_remark1?bookmark.cntr_remark4:door.cntr_remark4
                , 'cntr_remark5':bookmark.cntr_remark1?bookmark.cntr_remark5:door.cntr_remark5
            });
            props.fncDoorParent({
                ...door
                , 'cntr_door_user_name':("N" === props.booking.trans_self_yn )?bookmark.cntr_door_user_name?bookmark.cntr_door_user_name:door.cntr_door_user_name:null
                , 'cntr_door_user_tel':("N" === props.booking.trans_self_yn )?bookmark.cntr_door_user_tel?bookmark.cntr_door_user_tel:door.cntr_door_user_tel:null
                , 'cntr_door_address1':("N" === props.booking.trans_self_yn )?bookmark.cntr_door_address1?bookmark.cntr_door_address1:door.cntr_door_address1:null
                , 'cntr_door_address2':("N" === props.booking.trans_self_yn )?bookmark.cntr_door_address1?bookmark.cntr_door_address2:door.cntr_door_address2:null
                , 'cntr_door_address3':("N" === props.booking.trans_self_yn )?bookmark.cntr_door_address1?bookmark.cntr_door_address3:door.cntr_door_address3:null
                , 'cntr_door_address4':("N" === props.booking.trans_self_yn )?bookmark.cntr_door_address1?bookmark.cntr_door_address4:door.cntr_door_address4:null
                , 'cntr_door_address5':("N" === props.booking.trans_self_yn )?bookmark.cntr_door_address1?bookmark.cntr_door_address5:door.cntr_door_address5:null

                , 'cntr_remark1':bookmark.cntr_remark1?bookmark.cntr_remark1:door.cntr_remark1
                , 'cntr_remark2':bookmark.cntr_remark1?bookmark.cntr_remark2:door.cntr_remark2
                , 'cntr_remark3':bookmark.cntr_remark1?bookmark.cntr_remark3:door.cntr_remark3
                , 'cntr_remark4':bookmark.cntr_remark1?bookmark.cntr_remark4:door.cntr_remark4
                , 'cntr_remark5':bookmark.cntr_remark1?bookmark.cntr_remark5:door.cntr_remark5
            });
        } else {
            // Container 목록과 일치하는 index 찾기
            containerList.map((element, key)=>{
                // Container의 목록과 일치한다면
                if( key == index ) {
                    // console.log( key, index )
                    // Bookmark 정보에서 일치하는거 찾기
                    containerBookmarkList.map((row, i)=>{
                        if( element.cntr_seq ) {
                            row.cntr_seq = element.cntr_seq;
                        } else {
                            row.cntr_seq = index+1;
                        }
                        // 찾은걸 list에 넣어주자.
                        containerList[key] = {
                            ...element
                            ,'container_bookmark_seq': null
                            ,'container_bookmark_name': null
                            ,'cntr_code': null
                            ,'cntr_frozen_tmp': null
                            ,'cntr_qty': null
                            ,'cntr_soc_yn': 'N'
                            ,'cntr_empty_yn': null
                            ,'cntr_frozen_fc': null
                            ,'cntr_frozen_tmp_unit': null
                            ,'cntr_pick_up_cy_address1': null
                            ,'cntr_pick_up_cy_address2': null
                            ,'cntr_pick_up_cy_address3': null
                            ,'cntr_pick_up_cy_address4': null
                            ,'cntr_pick_up_cy_address5': null
                            ,'cntr_pick_up_cy_code': null
                            ,'cntr_pick_up_cy_name1': null
                            ,'cntr_pick_up_cy_name2': null
                            ,'cntr_pick_up_cy_user_email': null
                            ,'cntr_pick_up_cy_user_fax': null
                            ,'cntr_pick_up_cy_user_name': null
                            ,'cntr_pick_up_cy_user_tel': null
                            ,'cntr_pick_up_cy_date': null
                            ,'cntr_pick_up_cy_date_name': null
                            ,'cntr_pre_cooling': null
                            ,'cntr_seal_no': null
                            ,'cntr_size': null
                            ,'cntr_special_type': null
                            ,'cntr_type': null
                            ,'cntr_vent_open': null
                            ,'cntr_width': null
                            ,'cntr_selected_yn':'N'
                            ,'cntr_yn': 'Y'
                            , 'cntr_door_code': null
                            , 'cntr_door_name1': null
                            , 'cntr_door_name2': null
                            , 'cntr_door_date': null
                            , 'cntr_door_date_name': null
                            , 'cntr_door_user_name': null
                            , 'cntr_door_user_dept': null
                            , 'cntr_door_user_fax': null
                            , 'cntr_door_user_tel': null
                            , 'cntr_door_user_email': null
                            , 'cntr_door_address1': null
                            , 'cntr_door_address2': null
                            , 'cntr_door_address3': null
                            , 'cntr_door_address4': null
                            , 'cntr_door_address5': null
                            , 'cntr_remark1': null
                            , 'cntr_remark2': null
                            , 'cntr_remark3': null
                            , 'cntr_remark4': null
                            , 'cntr_remark5': null
                        }
                    });
                }
            });
    
            setContainerList([...containerList]);

            setDoor({});
            props.fncDoorParent({});
        }
    }


    const selectBookingSpecialBookmark=()=>{
        axios.post(
            "/shipper/selectBookingSpecialBookmark"
            ,{ user_no: user?user.user_no:null
            }
            ,{}
        ).then(
            res => {
                setSpecialBookmarkList(res.data);
            }
        );
    }

    // Container Booking 정보 조회
    const selectContainerOfBooking=(booking)=>{
        axios.post(
            "/shipper/selectContainerOfBooking"
            ,{ user_no: user?user.user_no:null
                , booking
            }
            ,{}
        ).then(
            res => {
                // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",res.data)
                if( props.booking.sch_etd ) {
                    // console.log("CNTR_ ETD 작업 ",props.booking.sch_etd);
                    let list = res.data;
                    // console.log("containerList >>>", containerList.length )
                    res.data.map((data,key)=> {
                        // console.log("DDATA : ", data.cntr_pick_up_cy_date)
                        // if( !data.cntr_pick_up_cy_date ) {
                            const date = props.booking.sch_etd;
                            // console.log("PICKUP CY ",data.cntr_pick_up_cy_date, moment(date).subtract(1,'d').format('YYYYMMDD'))
                            if( !(data.cntr_pick_up_cy_date )) {
                                list[key] = Object.assign(data,
                                    {'cntr_pick_up_cy_date':moment(date).subtract(1,'d').format('YYYYMMDD')},
                                    {'cntr_pick_up_cy_date_name':moment(date).subtract(1,'d').format('YYYY-MM-DD')},);

                            }
                    });
                    // console.log(list)
                    setContainerList(list);
                    props.fncContainerParent(list);
                } else {
                    setContainerList(res.data);
                    props.fncContainerParent(res.data);
                    // console.log("containerList <<<<<<<",door)
                }
                if( res.data.length >= 0) {
                    setDoor(res.data[0]);
                }
                // setContainerList(res.data);
            }
        );
    }

    // Container Special Booking 정보 조회
    const selectContainerSpecialOfBooking=(booking)=>{
        axios.post(
            "/shipper/selectContainerSpecialOfBooking"
            ,{ user_no: user?user.user_no:null
                , booking
            }
            ,{}
        ).then(
            res => {
                // console.log(">>>>>>>>>>>>>>>",res.data)
                if( res.data.length === 0 ) {
                    setContainerSpecialList([{'key':1, 'cntr_seq':1}]);
                } else {
                    setContainerSpecialList(res.data);
                }
            }
        );
    }

    // Container Special Relation Bookmark 조회
    const selectBookingContainerSpecialBookmarkRelation = (container) => {
        axios.post(
            "/shipper/selectBookingContainerSpecialBookmarkRelation"
            ,{ 
            user_no: user?user.user_no:null,
            container
        }
            ,{}
        ).then(
            res => {
                // console.log("container  ",container);
                // console.log(container.cntr_seq);
                for( let i =containerSpecialList.length; i > 0; i-- ) {

                    // console.log(i, containerSpecialList.length);
                    let row = containerSpecialList[i-1];
                    // console.log(row.cntr_seq ," CNTR SEQ ", container.cntr_seq);
                    if( row.cntr_seq == container.cntr_seq ) {
                        containerSpecialList.splice(i-1, 1);
                    }
                }
                let data = res.data;
                // console.log("1 length ",data.length)
                if( 0 === data.length ) {
                    // console.log(containerSpecialList.length);
                    // setContainerSpecialList([...containerSpecialList, {'key':'1', 'cntr_seq':container.cntr_seq}]);
                } else {         

                    // Bookmark Relation 정보에 cntr_seq 값을 넣어준다.
                    data.map((element, key)=>{
                        element.cntr_seq = container.cntr_seq;
                        // console.log(element);
                        // Container Specail 목록에 넣어준다.
                        containerSpecialList.push(element);
                    });
                    // console.log("containerSpecialList  ",containerSpecialList);
                    setContainerSpecialList([...containerSpecialList]);
                }
            }
        );
    }

    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }

    const onAddContainer=()=>{
        let maxCntrSeq = 0;
        containerList.map((row, i)=>{
            if( maxCntrSeq < parseInt(row.cntr_seq) ) {
                maxCntrSeq = parseInt(row.cntr_seq);
            }
        });
        if( 999 < maxCntrSeq ) {
            props.onNotiAlert("danger", "더이상 추가할 수 없습니다.")
            return false;
        }
        // console.log("MAX = ",maxCntrSeq);
        setContainerList([...containerList,{'key': parseInt(maxCntrSeq)+1, 'cntr_seq': parseInt(maxCntrSeq)+1, 'cntr_yn': (allCheck?'Y':'N'), 'cntr_soc_yn':'N'}]);
        setContainerSpecialList([...containerSpecialList,{'key':parseInt(maxCntrSeq)+1, 'cntr_seq':parseInt(maxCntrSeq)+1, 'cntr_yn': (allCheck?'Y':'N'),'cntr_soc_yn':'N'}]);
    }
    
    const onDelContainer=(index)=>{
        // 어느 컨테이너가 삭제되었는지 cntr_seq 값을 뽑는다.
        let cntr_seq = containerList[index].cntr_seq;
        // console.log("CNTR SEQ", cntr_seq)
        if( containerList.length === 1 ) {
            setContainerList([{'key':1, 'cntr_seq':1, 'cntr_yn': (allCheck?'Y':'N')}])
        } else {
            const cntrIdx = containerList.findIndex(function(item){return item.cntr_seq === cntr_seq });
            //  Splice의 경우 return값이 아닌 splice 처리후 적용
            if(cntrIdx > -1) containerList.splice(cntrIdx,1);
            setContainerList([...containerList]);
            
            const specialIdx = containerSpecialList.findIndex(function(item){return item.cntr_seq === cntr_seq });
            containerSpecialList.splice(specialIdx,1);
            //  Splice의 경우 return값이 아닌 splice 처리후 적용
            if(specialIdx > -1) setContainerSpecialList([...containerSpecialList]);
        }
        
    }
    // Special 목록 삭제
    const onDelSpecial=(special)=>{
        // 어느 컨테이너가 삭제되었는지 cntr_seq 값을 뽑는다.
        let cntr_seq = special.cntr_seq;
        let special_seq = special.special_seq;

        if(containerSpecialList.length === 1) {
            setContainerSpecialList([{'key':1, 'cntr_seq':cntr_seq,'special_seq':1}])
        } else {
            // console.log("cntr_seq",cntr_seq,"special_seq",special_seq)
            const specialIdx = containerSpecialList.findIndex(function(item){return item.cntr_seq === cntr_seq && item.special_seq === special_seq });
            containerSpecialList.splice(specialIdx,1);
            //  Splice의 경우 return값이 아닌 splice 처리후 적용
            if(specialIdx > -1) setContainerSpecialList([...containerSpecialList]);
        }
    }

    // 컨테이너 자식에게 받은 정보
    const fncOnBlurContainer=(index, container)=>{
        // console.log("3>>>> ",index, container)
        containerList[index] = container;
        setContainerList([...containerList]);
        props.fncContainerParent([...containerList]);
    }
    // 컨테이너 자식에게 받은 정보
    const fncOnBlurSpecialList=(specialList)=>{
        // console.log(key, container)
        // containerList[index] = container;
        setContainerSpecialList([...specialList]);
    }
    // Door 입력란 자식에게 받은 정보
    const fncOnBlurDoor=(door)=>{
        // Door 에 값을 넣어준다.
        setDoor(door);

        // Door 값은 Container 목록 중 0번째 정보를 가져오므로 관련된 정보에 넣어준다.
        let list = containerList;
        containerList.map((data,key)=> {
            if( key === 0 || key === '0' ) {
                list[key] = {...data,
                    'cntr_door_code':door.cntr_door_code, 'cntr_door_name1':door.cntr_door_name1, 'cntr_door_name2':door.cntr_door_name2,
                    'cntr_door_date':door.cntr_door_date, 'cntr_door_date_name':door.cntr_door_date_name, 'cntr_door_user_name':door.cntr_door_user_name,
                    'cntr_door_user_dept':door.cntr_door_user_dept, 'cntr_door_user_fax':door.cntr_door_user_fax,
                    'cntr_door_user_tel':door.cntr_door_user_tel, 'cntr_door_user_email':door.cntr_door_user_email,
                    'cntr_door_address1':door.cntr_door_address1, 'cntr_door_address2':door.cntr_door_address2, 'cntr_door_address3':door.cntr_door_address3, 'cntr_door_address4':door.cntr_door_address4, 'cntr_door_address5':door.cntr_door_address5,
                    'cntr_remark1':door.cntr_remark1, 'cntr_remark2':door.cntr_remark2, 'cntr_remark3':door.cntr_remark3, 'cntr_remark4':door.cntr_remark4, 'cntr_remark5':door.cntr_remark5
                }
            }
        });
        setContainerList(list);

        // Door 부모에도 넣어준다.
        props.fncDoorParent(door);
    }

    const fncValidation=(element)=>{
        // console.log(element)
        if( !element.cntr_code ) return false;
        if( !element.cntr_pick_up_cy_code ) return false;
        if( !element.cntr_pick_up_cy_date) return false;
        if( !element.cntr_qty ) return false;
        return true;
    }
    // 컨테이너 저장
    const fncSaveContainerList=(e)=>{
        // console.log("containerList>",containerList);
        // console.log("containerSpecialList>",containerSpecialList);
        let checkVal = false;
        for( let i=0; i<containerList.length; i++ ) {
            checkVal = fncValidation(containerList[i]);
            if( !checkVal ) break;
        }
        // containerList.map((element, key)=>{
            //     checkVal = validation(element);
            //     if( !checkVal ) break;
            // });
        // console.log(checkVal);
        if( !checkVal ) return false;
        axios.post(
            "/shipper/saveContainerOfBooking"
            ,{ user_no: user?user.user_no:null
                , booking
                , containerList
                , containerSpecialList
            }
            ,{}
        ).then(
            res => {
                // onDismiss("success", "정상 처리 되었습니다.");
                // 최초 조회하기
                selectContainerOfBooking(booking);
                selectContainerSpecialOfBooking(booking);
                setBooking({...booking, 'cntr_selected_yn':'N'});
            }
        );
    }


    const onContainerCheck =()=> {
        let list = containerList;
        let vVal = 'N';
        if(allCheck) {
            vVal = 'N';
        } else {
            vVal = 'Y';
        }
        containerList.map((data,key)=> {
            list[key] = {...data,'cntr_yn':vVal}
        });
        setContainerList(list);
        setAllCheck(!allCheck);
    }

    const fncCheckBoxOnChange =(element)=> {
        let list = containerList;
        // console.log( element )
        containerList.map((data,key)=> {
            if( element.cntr_seq == data.cntr_seq ) {
                // console.log( element.cntr_seq, data.cntr_seq )
                list[key] = {...data,'cntr_yn': (element.cntr_yn === 'Y'?'N':'Y')}
                // console.log(list[key])
            }
        });
        setContainerList(list);
        setCntrCheck(!cntrCheck);
    }

    const onDownloadHandle = () => {
        axios.post("/loc/downloadCfsExcel",{},{responseType:'arraybuffer',headers:{'Content-Type':'application/json','Accept':'application/xlsx'}})
            .then(res => { 
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href=url;
                link.setAttribute('download','CFS 물품 입고서 양식_영진_선광_DNW.xlsx');
                document.body.appendChild(link);
                link.click();
            });
    
    }

    const MenuList = ({children, ...props}) => {
        return(
        <components.MenuList {...props}>
            {
                Array.isArray(children)
                ?children.slice(0, props.selectProps?.maxOptions)
                :children
            }
        </components.MenuList>
        );
    }

  return (
    <>
        <Row id="Container">
            <Col xl="12" lg="12">
                <Card >
                    <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>
                        <Row className="pb-2">
                            <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>CONTAINER
                                <Button className="pl-1" color="link" id="lineview" onClick={toggle.bind(this, 'S')}><i className="fa fa-pencil-square-o fa-2x"/></Button>
                                <UncontrolledTooltip delay={0} target="lineview">Input</UncontrolledTooltip>
                            </Col>
                            <Col>
                                <Row id="bookmarkselect">
                                    <Col className="col-10 pr-0">
                                        <Select
                                            className="react-select react-select-primary"
                                            classNamePrefix="react-select"
                                            name="cargoBookmark"
                                            isOpen={(e)=>console.log(e)}
                                            value={{
                                                value:booking.container_bookmark_seq?booking.container_bookmark_seq:'',
                                                label:booking.container_bookmark_name?booking.container_bookmark_name:'선택'
                                            }}
                                            onChange={(e)=>fncSelectContainer(e?e:null)}
                                            options={containerBookmarkList}
                                            placeholder={"선택"}
                                            ref={containerFocus}
                                            styles={{
                                                control: provided => ({...provided,maxHeight:'3px' }),
                                                indicatorsContainer: provided => ({...provided,height:'3px'})
                                           }}
                                           isClearable={booking.container_bookmark_seq?true:false}
                                        />
                                    </Col>
                                    <Col className="col-2 pl-auto pr-auto">
                                        <ContainerBookmarkWdfc
                                            containerBookmarkList={containerBookmarkList}
                                            specialBookmarkList={specialBookmarkList}
                                            selectBookingContainerBookmark={props.selectBookingContainerBookmark}
                                            selectBookingSpecialBookmark={selectBookingSpecialBookmark}
                                            onAlert={props.onAlert}
                                            {...props}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Collapse isOpen={coll} id="cntr_roop">
                            <Col xl="12" className="mb-2 col-10">
                                <Row>
                                    <Col className="pr-0">
                                        <FormGroup check className="mt-2">
                                        <Label check>
                                        <Input defaultValue="" type="checkbox"  checked={allCheck} 
                                            onChange = {()=>onContainerCheck()}
                                            />전체
                                            <span className="form-check-sign" />
                                        </Label>
                                        </FormGroup>
                                    </Col>
                                    {'3' === serviceCode?
                                    <Col className="pl-auto pr-auto pr-0">
                                        <ButtonGroup className="pull-right">
                                            <Button
                                                className="pt-0 pb-0"
                                                color="default"
                                                data-toggle="tooltip"
                                                outline
                                                id="addCntr"
                                                size="sm"
                                                type="button"
                                                onClick={onDownloadHandle}
                                            >CFS 입고지 양식
                                            </Button>
                                        </ButtonGroup>
                                    </Col> :<></>}
                                </Row>
                            </Col>
                            <hr className="mt-0"/>
                            <Col className="col-12 mb-3 ml-auto mr-auto" >
                                { (containerList.length>0)?containerList.map((element, key)=>{
                                    return (
                                        <Row key={key} >
                                            
                                            <Col>
                                                <ButtonGroup className="pull-right pr-2">
                                                    <Button
                                                        className="pt-0 pb-0"
                                                        color="default"
                                                        data-toggle="tooltip"
                                                        outline
                                                        id="addCntr"
                                                        size="sm"
                                                        type="button"
                                                        onClick={onAddContainer}
                                                    >추가
                                                    </Button>
                                                </ButtonGroup>
                                            </Col>
                                            <Col xl="12" lg="12">
                                                <Row>
                                                    <Col xl="0" className="col-0 pl-2 mt-auto mb-auto">
                                                        <FormGroup check style={{height:'69px'}}>
                                                            <Label check>
                                                            <Input defaultValue="" type="checkbox"  
                                                                name="cntr_check"
                                                                checked={element.cntr_yn?element.cntr_yn==="Y"?true:false:null}
                                                                onChange = {()=>fncCheckBoxOnChange(element)}
                                                            />
                                                            <span className="form-check-sign" />
                                                            </Label>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col>
                                                        <Row>
                                                            <ContainerWdfc
                                                                index={key}
                                                                zIndex={20-key}
                                                                container={element}
                                                                containerBookmarkList={containerBookmarkList}
                                                                containerSpecialList={containerSpecialList}
                                                                specialBookmarkList={specialBookmarkList}
                                                                fncOnBlurContainer={fncOnBlurContainer}
                                                                fncOnBlurSpecialList={fncOnBlurSpecialList}
                                                                onDelContainer={onDelContainer}
                                                                onDelSpecial={onDelSpecial}
                                                                openType={"MAIN"}
                                                                fncSelectContainerList={fncSelectContainerList}
                                                                booking={props.booking}
                                                                {...props}
                                                                />
                                                        </Row>
                                                        
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    )
                                }):<></>}
                            </Col>
                            <Row style={{paddingTop:'25px'}}>
                                <DoorWdfc 
                                    zIndex={1}
                                    door={door}
                                    booking={booking}
                                    openType={"MAIN"}
                                    fncOnBlurDoor={fncOnBlurDoor}
                                    {...props}
                                />
                            </Row>
                        </Collapse>
                        <div className="text-center" onClick={() => setColl(!coll)}>
                            <div>
                                <Button className="p-0" color="link" id="linemore" onClick={() => setColl(!coll)} style={{height:'21px'}}>
                                    {coll?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
                                </Button>
                                <UncontrolledTooltip delay={0} target="linemore">{coll?'Close':'Open'}</UncontrolledTooltip>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        {/* 모달 팝업 영역 
        xs : 한 줄
        sm : 576px 에서 다음 줄로 넘어감
        md : 768px
        lg : 992px
        xl : 1200px
        fluid : 뷰포트 전체의 너비
        */}
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="xl">
            <ModalHeader toggle={toggle}>Container</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody >
                        <Col className="col-12 mb-3 ml-auto mr-auto">
                            {(containerList.length>0)?containerList.map((element, key)=>{
                                return (
                                    <Row key={key} style={{ marginBottom:'10px'}}>
                                        <Col className="pb-1">
                                            <ButtonGroup className="pull-right pr-2">
                                                <Button
                                                    className="pt-0 pb-0"
                                                    color="default"
                                                    data-toggle="tooltip"
                                                    outline
                                                    id="addCntr"
                                                    size="sm"
                                                    type="button"
                                                    onClick={onAddContainer}
                                                >추가
                                                </Button>
                                            </ButtonGroup>
                                        </Col>
                                        <Col xl="12" lg="12">
                                            <ContainerWdfc
                                                index={key}
                                                container={element}
                                                containerSpecialList={containerSpecialList}
                                                containerBookmarkList={containerBookmarkList}
                                                specialBookmarkList={specialBookmarkList}
                                                fncOnBlurContainer={fncOnBlurContainer}
                                                fncOnBlurSpecialList={fncOnBlurSpecialList}
                                                onDelContainer={onDelContainer}
                                                onDelSpecial={onDelSpecial}
                                                openType={"CARD"}
                                                fncSelectContainerList={fncSelectContainerList}
                                                {...props}
                                            />
                                        </Col>
                                    </Row>
                                )
                            }):<></>}
                            <Row>
                                <DoorWdfc
                                    door={door}
                                    booking={booking}
                                    openType={"CARD"}
                                    fncOnBlurDoor={fncOnBlurDoor}
                                    {...props}
                                />
                            </Row>
                        </Col>
                    </CardBody>
                </ModalBody>
            <ModalFooter>
                {/* <Button color="primary" onClick={fncSaveContainerList}>Save</Button>{' '} */}
                <Button color="primary" onClick={toggle}>Apply</Button>{' '}
                {/* <Button color="secondary" onClick={toggle}>Cancel</Button> */}
            </ModalFooter>
        </Modal>
    </>
    );
});

export default ContainerCardWdfc;