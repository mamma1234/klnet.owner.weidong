/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col,
     Button,FormGroup, Label,Input, FormFeedback,InputGroup,InputGroupAddon,InputGroupText,UncontrolledTooltip} from "reactstrap";
import * as validation from 'components/common/validation.js';
import TitleBookmark from './TitleBookmark.js';
import axios from "axios";
import moment from 'moment';
//import ReactDatetime from "react-datetime";
import Select from "react-select";
//var bookmark = {}; 

const SRTItleCard = (props) => {
	
	
  	const {loadData,bookmark} = props;
	// modal 창을 위한 state
	// const [coll, setColl] = useState(true);
	const [open, setOpen] = useState(false);
	// const [visible, setVisible] = useState(false);
	// const [color, setColor] = useState("success");
	// const [message, setMessage] = useState("정상 처리되었습니다.");
	const [sr, setSr] = useState([]);
	//const [modalTitle, setModalTitle] = useState("SR Bookmark");
	const [propsData, setPropsData] = useState({}); 
	const [bookmarkData,setBookmarkData] =useState({});
	
	useEffect(() => {
		setSr(loadData);
	},[loadData]);
	
  
 	const toggle = (params) => {
		setBookmarkData({});
		onInitData();
		props.onLoadData("tt");
		setOpen(!open);
  	}
 
   
  	const fncOnChange = (e, key) => {
        e.preventDefault();
        let list = {...sr, [key]:e.target.value};
        setSr(list);      
  	}

 // const fncOnKeyPressSR = (e) => {
 //    if( "Enter" === e.key  && (loadData.sr_no != sr.sr_no)) {
 //   	 getSRInfo();
 //    }
 // }
  
	const fncOnBlur =(e)=> {
		props.mergeData(sr);  
	}
	const trans_goods_descriptin = (transCode,goodsData) => {
		
		let returnValue;
		
		if("1" === transCode) {
			if(goodsData) {
				var goodsSplit = goodsData.split('\n');
				if("SHIPPER'S LOAD. COUNT & SEAL" === goodsSplit[0]) {
					goodsSplit[0] = "SHIPPER'S LOAD. COUNT & SEAL";
					goodsSplit[1] = "SAID TO CONTAIN :";
					goodsData = goodsSplit.join('\n');
				} else if ("SAID TO CONTAIN :" === goodsSplit[0]) {
					goodsSplit[0] = "\n";
					goodsData = goodsSplit.join('\n');
				} else {
					goodsData = "\n\n"+goodsSplit.join('\n');
				}
				var goodsDesc = goodsData.split('\n');
				goodsDesc[0] = "SHIPPER'S LOAD. COUNT & SEAL";
				goodsDesc[1] = "SAID TO CONTAIN :";
				returnValue = goodsDesc.join('\n');
			} else {
				returnValue = "SHIPPER'S LOAD. COUNT & SEAL\nSAID TO CONTAIN :\n";
			}
		} else if("3" === transCode) {
			if(goodsData) {
				var goodsSplit = goodsData.split('\n');
				if("SAID TO CONTAIN :" === goodsSplit[0]) {
					goodsSplit[0] = "SAID TO CONTAIN :";
				} else if ("SHIPPER'S LOAD. COUNT & SEAL" === goodsSplit[0]) {
					goodsSplit[0] ="SAID TO CONTAIN :";
					goodsSplit.splice(1,1);
					goodsData = goodsSplit.join('\n');
				} else {
					goodsData = "\n"+goodsSplit.join('\n');
				}
				var goodsDesc = goodsData.split('\n');
				goodsDesc[0] = "SAID TO CONTAIN :";
				returnValue = goodsDesc.join('\n');
			} else {
				returnValue = "SAID TO CONTAIN :\n";
			} 
		} else {
			returnValue =goodsData;
		}
		return returnValue;
	}
	 
 /* const getSRInfo=()=> {
	  axios.post("/shipper/getUserSrDataList",{user_no : props.user?props.user.user_no:'',data:{'sr_no':sr.sr_no},link:'N',list:'N'},{}
      ).then(res => {
                     setSr(res.data);
                     props.mergeData(res.data);
      }
      );
  }*/
  
	const onChangeTitle =(data)=>{
		if(data) {
			// setSr({...sr,'bookmark_seq':data.value,'bookmark_name':data.label});
			
			axios.post("/shipper/setUserSrBookmarkDataList",{user_no : props.user?props.user.user_no:'',seq:data.value},{}).then(res => {

				const list = {
					bl_type:res.data.bl_type?res.data.bl_type:sr.bl_type,
					c_cons_address1:res.data.c_cons_address1?res.data.c_cons_address1:sr.c_cons_address1,
					c_cons_address2:res.data.c_cons_address1?res.data.c_cons_address2:sr.c_cons_address2,
					c_cons_address3:res.data.c_cons_address1?res.data.c_cons_address3:sr.c_cons_address3,
					c_cons_address4:res.data.c_cons_address1?res.data.c_cons_address4:sr.c_cons_address4,
					c_cons_address5:res.data.c_cons_address1?res.data.c_cons_address5:sr.c_cons_address5,
					c_cons_name1:res.data.c_cons_name1?res.data.c_cons_name1:sr.c_cons_name1,
					c_cons_name2:res.data.c_cons_name1?res.data.c_cons_name2:sr.c_cons_name2,
					c_cons_user_name:res.data.c_cons_user_name?res.data.c_cons_user_name:sr.c_cons_user_name,
					c_cons_user_tel:res.data.c_cons_user_tel?res.data.c_cons_user_tel:sr.c_cons_user_tel,
					c_cons_code:res.data.c_cons_code?res.data.c_cons_code:sr.c_cons_code,
					c_cons_country_code:res.data.c_cons_country_code?res.data.c_cons_country_code:sr.c_cons_country_code,
					c_noti_address1:res.data.c_noti_address1?res.data.c_noti_address1:sr.c_noti_address1,
					c_noti_address2:res.data.c_noti_address1?res.data.c_noti_address2:sr.c_noti_address2,
					c_noti_address3:res.data.c_noti_address1?res.data.c_noti_address3:sr.c_noti_address3,
					c_noti_address4:res.data.c_noti_address1?res.data.c_noti_address4:sr.c_noti_address4,
					c_noti_address5:res.data.c_noti_address1?res.data.c_noti_address5:sr.c_noti_address5,
					c_noti_name1:res.data.c_noti_name1?res.data.c_noti_name1:sr.c_noti_name1,
					c_noti_name2:res.data.c_noti_name1?res.data.c_noti_name2:sr.c_noti_name2,
					c_noti_user_tel:res.data.c_noti_user_tel?res.data.c_noti_user_tel:sr.c_noti_user_tel,
					c_noti_user_name:res.data.c_noti_user_name?res.data.c_noti_user_name:sr.c_noti_user_name,
					c_noti_country_code:res.data.c_noti_country_code?res.data.c_noti_country_code:sr.c_noti_country_code,
					c_noti_code:res.data.c_noti_code?res.data.c_noti_code:sr.c_noti_code,
					c_shp_user_name:res.data.c_shp_user_name?res.data.c_shp_user_name:sr.c_shp_user_name,
					c_shp_user_tel:res.data.c_shp_user_tel?res.data.c_shp_user_tel:sr.c_shp_user_tel,
					c_shp_code:res.data.c_shp_code?res.data.c_shp_code:sr.c_shp_code,
					c_shp_country_code:res.data.c_shp_country_code?res.data.c_shp_country_code:sr.c_shp_country_code,



					c_shp_address1:res.data.c_shp_address1?res.data.c_shp_address1:sr.c_shp_address1,
					c_shp_address2:res.data.c_shp_address1?res.data.c_shp_address2:sr.c_shp_address2,
					c_shp_address3:res.data.c_shp_address1?res.data.c_shp_address3:sr.c_shp_address3,
					c_shp_address4:res.data.c_shp_address1?res.data.c_shp_address4:sr.c_shp_address4,
					c_shp_address5:res.data.c_shp_address1?res.data.c_shp_address5:sr.c_shp_address5,
					c_shp_name1:res.data.c_shp_name1?res.data.c_shp_name1:sr.c_shp_name1,
					c_shp_name2:res.data.c_shp_name1?res.data.c_shp_name2:sr.c_shp_name2,
					shp_address1:res.data.shp_address1?res.data.shp_address1:sr.shp_address1,
					shp_address2:res.data.shp_address1?res.data.shp_address2:sr.shp_address2,
					shp_address3:res.data.shp_address1?res.data.shp_address3:sr.shp_address3,
					shp_address4:res.data.shp_address1?res.data.shp_address4:sr.shp_address4,
					shp_address5:res.data.shp_address1?res.data.shp_address5:sr.shp_address5,
					cons_address1:res.data.cons_address1?res.data.cons_address1:sr.cons_address1,
					cons_address2:res.data.cons_address1?res.data.cons_address2:sr.cons_address2,
					cons_address3:res.data.cons_address1?res.data.cons_address3:sr.cons_address3,
					cons_address4:res.data.cons_address1?res.data.cons_address4:sr.cons_address4,
					cons_address5:res.data.cons_address1?res.data.cons_address5:sr.cons_address5,
					cons_name1:res.data.cons_name1?res.data.cons_name1:sr.cons_name1,
					cons_name2:res.data.cons_name1?res.data.cons_name2:sr.cons_name2,
					cargo_class:res.data.cargo_class?res.data.cargo_class:sr.cargo_class,
					cargo_hs_code:res.data.cargo_hs_code?res.data.cargo_hs_code:sr.cargo_hs_code,
					cargo_pack_qty:res.data.cargo_pack_qty?res.data.cargo_pack_qty:sr.cargo_pack_qty,
					cargo_pack_type:res.data.cargo_pack_type?res.data.cargo_pack_type:sr.cargo_pack_type,
					cargo_total_volume:res.data.cargo_total_volume?res.data.cargo_total_volume:sr.cargo_total_volume,
					cargo_total_weight:res.data.cargo_total_weight?res.data.cargo_total_weight:sr.cargo_total_weight,
					document_no:res.data.document_no?res.data.document_no:sr.document_no,
					goodlist:res.data.goodlist?res.data.goodlist:sr.goodlist,
					hbl_yn:res.data.hbl_yn?res.data.hbl_yn:sr.hbl_yn,
					invoice_no:res.data.invoice_no?res.data.invoice_no:sr.invoice_no,
					lc_expiry_date:res.data.lc_expiry_date?res.data.lc_expiry_date:sr.lc_expiry_date,
					lc_no:res.data.lc_no?res.data.lc_no:sr.lc_no,
					lc_yn:res.data.lc_yn?res.data.lc_yn:sr.lc_yn,
					line_payment_type:res.data.line_payment_type?res.data.line_payment_type:sr.line_payment_type,
					line_user_dept:res.data.line_user_dept?res.data.line_user_dept:sr.line_user_dept,
					line_user_email:res.data.line_user_email?res.data.line_user_email:sr.line_user_email,
					line_user_name:res.data.line_user_name?res.data.line_user_name:sr.line_user_name,
					line_user_tel:res.data.line_user_tel?res.data.line_user_tel:sr.line_user_tel,
					line_address1:res.data.line_address1?res.data.line_address1:sr.line_address1,
					line_address2:res.data.line_address1?res.data.line_address2:sr.line_address2,
					line_address3:res.data.line_address1?res.data.line_address3:sr.line_address3,
					line_address4:res.data.line_address1?res.data.line_address4:sr.line_address4,
					line_address5:res.data.line_address1?res.data.line_address5:sr.line_address5,
					noti_address1:res.data.noti_address1?res.data.noti_address1:sr.noti_address1,
					noti_address2:res.data.noti_address1?res.data.noti_address2:sr.noti_address2,
					noti_address3:res.data.noti_address1?res.data.noti_address3:sr.noti_address3,
					noti_address4:res.data.noti_address1?res.data.noti_address4:sr.noti_address4,
					noti_address5:res.data.noti_address1?res.data.noti_address5:sr.noti_address5,
					line_name1:res.data.line_name1?res.data.line_name1:sr.line_name1,
					line_name2:res.data.line_name1?res.data.line_name2:sr.line_name2,
					noti_name1:res.data.noti_name1?res.data.noti_name1:sr.noti_name1,
					noti_name2:res.data.noti_name1?res.data.noti_name2:sr.noti_name2,
					marklist:res.data.marklist?res.data.marklist:sr.marklist,
					part_sr_qty:res.data.part_sr_qty?res.data.part_sr_qty:sr.part_sr_qty,
					po_no:res.data.po_no?res.data.po_no:sr.po_no,
					remark1:res.data.remark1?res.data.remark1:sr.remark1,
					remark2:res.data.remark2?res.data.remark2:sr.remark2,
					remark3:res.data.remark3?res.data.remark3:sr.remark3,
					remark4:res.data.remark4?res.data.remark4:sr.remark4,
					remark5:res.data.remark5?res.data.remark5:sr.remark5,
					sc_no:res.data.sc_no?res.data.sc_no:sr.sc_no,
					sch_barge_onboard_date:res.data.sch_barge_onboard_date?res.data.sch_barge_onboard_date:sr.sch_barge_onboard_date,
					sch_bl_issue_name:res.data.sch_bl_issue_name?res.data.sch_bl_issue_name:sr.sch_bl_issue_name,
					remasch_etark5:res.data.sch_eta?res.data.sch_eta:sr.sch_eta,
					sch_etd:res.data.sch_etd?res.data.sch_etd:sr.sch_etd,
					sch_fdp:res.data.sch_fdp?res.data.sch_fdp:sr.sch_fdp,
					sch_fdp_name:res.data.sch_fdp_name?res.data.sch_fdp_name:sr.sch_fdp_name,
					sch_feeder_vessel_name:res.data.sch_feeder_vessel_name?res.data.sch_feeder_vessel_name:sr.sch_feeder_vessel_name,
					sch_feeder_vessel_voyage:res.data.sch_feeder_vessel_voyage?res.data.sch_feeder_vessel_voyage:sr.sch_feeder_vessel_voyage,
					sch_line_code:res.data.sch_line_code?res.data.sch_line_code:sr.sch_line_code,
					sch_pld:res.data.sch_pld?res.data.sch_pld:sr.sch_pld,
					sch_pld_name:res.data.sch_pld_name?res.data.sch_pld_name:sr.sch_pld_name,
					sch_pod:res.data.sch_pod?res.data.sch_pod:sr.sch_pod,
					sch_pod_name:res.data.sch_pod_name?res.data.sch_pod_name:sr.sch_pod_name,
					sch_pol:res.data.sch_pol?res.data.sch_pol:sr.sch_pol,
					sch_pol_name:res.data.sch_pol_name?res.data.sch_pol_name:sr.sch_pol_name,
					sch_por:res.data.sch_por?res.data.sch_por:sr.sch_por,
					sch_por_name:res.data.sch_por_name?res.data.sch_por_name:sr.sch_por_name,
					sch_vessel_code:res.data.sch_vessel_code?res.data.sch_vessel_code:sr.sch_vessel_code,
					sch_vessel_name:res.data.sch_vessel_name?res.data.sch_vessel_name:sr.sch_vessel_name,
					sch_vessel_voyage:res.data.sch_vessel_voyage?res.data.sch_vessel_voyage:sr.sch_vessel_voyage,
					shp_name1:res.data.shp_name1?res.data.shp_name1:sr.shp_name1,
					shp_name2:res.data.shp_name1?res.data.shp_name2:sr.shp_name2,
					sr_amount:res.data.sr_amount?res.data.sr_amount:sr.sr_amount,
					trans_service_code:res.data.trans_service_code?res.data.trans_service_code:sr.trans_service_code,
					mark_desc:res.data.mark_desc?res.data.mark_desc:sr.mark_desc,
					goods_desc:res.data.goods_desc?trans_goods_descriptin(res.data.trans_service_code,res.data.goods_desc):trans_goods_descriptin(sr.trans_service_code,sr.goods_desc),
					goods_yn:res.data.goods_yn?res.data.goods_yn:sr.goods_yn,
					mark_yn:res.data.mark_yn?res.data.mark_yn:sr.mark_yn,
					c_consignee_bookmark_name:res.data.c_consignee_bookmark_name,
					c_consignee_bookmark_seq:res.data.c_consignee_bookmark_seq,
					c_notify_bookmark_name:res.data.c_notify_bookmark_name,
					c_notify_bookmark_seq:res.data.c_notify_bookmark_seq,
					c_shipper_bookmark_name:res.data.c_shipper_bookmark_name,
					c_shipper_bookmark_seq:res.data.c_shipper_bookmark_seq,
					cargo_bookmark_name:res.data.cargo_bookmark_name,
					cargo_bookmark_seq:res.data.cargo_bookmark_seq,
					cargo_mark_bookmark_name:res.data.cargo_mark_bookmark_name,
					cargo_mark_bookmark_seq:res.data.cargo_mark_bookmark_seq,
					cargo_goods_bookmark_name:res.data.cargo_goods_bookmark_name,
					cargo_goods_bookmark_seq:res.data.cargo_goods_bookmark_seq,
					consignee_bookmark_name:res.data.consignee_bookmark_name,
					consignee_bookmark_seq:res.data.consignee_bookmark_seq,
					schedule_bookmark_name:res.data.schedule_bookmark_name,
					schedule_bookmark_seq:res.data.schedule_bookmark_seq,
					shipper_bookmark_name:res.data.shipper_bookmark_name,
					shipper_bookmark_seq:res.data.shipper_bookmark_seq,
					line_bookmark_name:res.data.line_bookmark_name,
					line_bookmark_seq:res.data.line_bookmark_seq,
					notify_bookmark_name:res.data.notify_bookmark_name,
					notify_bookmark_seq:res.data.notify_bookmark_seq,
					label:res.data.label,
					value:res.data.value,
					other_bookmark_name:res.data.other_bookmark_name,
					other_bookmark_seq:res.data.other_bookmark_seq,
					bookmark_seq:data.value,
					bookmark_name:data.label

				}



				const mergeData = Object.assign(sr,list);	  
				setSr({...mergeData});
				props.mergeData({...mergeData});
			})
		}else {
			const list = {
				bl_type:null,
				c_cons_address1:null,
				c_cons_address2:null,
				c_cons_address3:null,
				c_cons_address4:null,
				c_cons_address5:null,
				c_cons_name1:null,
				c_cons_name2:null,
				c_noti_address1:null,
				c_noti_address2:null,
				c_noti_address3:null,
				c_noti_address4:null,
				c_noti_address5:null,
				c_noti_name1:null,
				c_noti_name2:null,
				c_shp_address1:null,
				c_shp_address2:null,
				c_shp_address3:null,
				c_shp_address4:null,
				c_shp_address5:null,
				c_shp_name1:null,
				c_shp_name2:null,
				shp_address1:null,
				shp_address2:null,
				shp_address3:null,
				shp_address4:null,
				shp_address5:null,
				cons_address1:null,
				cons_address2:null,
				cons_address3:null,
				cons_address4:null,
				cons_address5:null,
				cons_name1:null,
				cons_name2:null,
				cargo_class:null,
				cargo_hs_code:null,
				cargo_pack_qty:null,
				cargo_pack_type:null,
				cargo_total_volume:null,
				cargo_total_weight:null,
				cargo_bookmark_name:null,
				cargo_bookmark_seq:null,
				cargo_mark_bookmark_name:null,
				cargo_mark_bookmark_seq:null,
				cargo_goods_bookmark_name:null,
				cargo_goods_bookmark_seq:null,
				goods_desc:null,
				mark_desc:null,
				document_no:null,
				goodlist:null,
				hbl_yn:null,
				invoice_no:null,
				lc_expiry_date:null,
				lc_no:null,
				lc_yn:null,
				line_payment_type:null,
				line_user_dept:null,
				line_user_email:null,
				line_user_name:null,
				line_user_tel:null,
				line_address1:null,
				line_address2:null,
				line_address3:null,
				line_address4:null,
				line_address5:null,
				line_name1:null,
				line_name2:null,
				noti_address1:null,
				noti_address2:null,
				noti_address3:null,
				noti_address4:null,
				noti_address5:null,
				noti_name1:null,
				noti_name2:null,
				marklist:null,
				part_sr_qty:null,
				po_no:null,
				remark1:null,
				remark2:null,
				remark3:null,
				remark4:null,
				remark5:null,
				sc_no:null,
				sch_barge_onboard_date:null,
				sch_bl_issue_name:null,
				remasch_etark5:null,
				sch_etd:null,
				sch_fdp:null,
				sch_fdp_name:null,
				sch_feeder_vessel_name:null,
				sch_feeder_vessel_voyage:null,
				sch_line_code:null,
				sch_pld:null,
				sch_pld_name:null,
				sch_pod:null,
				sch_pod_name:null,
				sch_pol:null,
				sch_pol_name:null,
				sch_por:null,
				sch_por_name:null,
				sch_vessel_code:null,
				sch_vessel_name:null,
				sch_vessel_voyage:null,
				shp_name1:null,
				shp_name2:null,
				sr_amount:null,
				trans_service_code:null,
				value:null,
				c_consignee_bookmark_name:null,
				c_consignee_bookmark_seq:null,
				c_notify_bookmark_name:null,
				c_notify_bookmark_seq:null,
				c_shipper_bookmark_name:null,
				c_shipper_bookmark_seq:null,
				argo_bookmark_name:null,
				cargo_bookmark_seq:null,
				consignee_bookmark_name:null,
				consignee_bookmark_seq:null,
				schedule_bookmark_name:null,
				schedule_bookmark_seq:null,
				shipper_bookmark_name:null,
				shipper_bookmark_seq:null,
				line_bookmark_name:null,
				line_bookmark_seq:null,
				otify_bookmark_name:null,
				notify_bookmark_seq:null,
				label:null,
				other_bookmark_name:null,
				other_bookmark_seq:null,
				bookmark_seq:null,
				bookmark_name:null,
				notify_bookmark_name:null,
				notify_bookmark_seq:null,
				value:null
			}
			props.mergeData(list);	
			setSr(list);
		}
	}
  
	const onInitData = () => {
		setBookmarkData(null);
		setPropsData({'bookmark_name':'','booking_label':'사용안함','booking_value':'','schedule_label':'사용안함','schedule_value':'',
						'carrier_label':'사용안함','carrier_value':'','shipper_label':'사용안함','shipper_value':'','consignee_label':'사용안함',
						'consignee_value':'','notify_label':'사용안함','notify_value':'','cargo_label':'사용안함','cargo_value':'',
						'c_shipper_label':'사용안함','c_shipper_value':'','c_consignee_label':'사용안함','c_consignee_value':'','c_notify_label':'사용안함','c_notify_value':''});		
	}

  
	//선택
	const onSelectProps = (data)=> {
		axios.post("/shipper/getSRbookmarkRelation",{user_no: props.user?props.user.user_no:'',seq: data.bookmark_seq}).then(res=>{
			var list = data;
			res.data.map((data)=>{
				if(data.reference_type === 'BOOKING'){
					list = {...list,'booking_label':data.label,'booking_value':data.reference_seq};
				} else if(data.reference_type === 'SCHEDULE'){
					list = {...list,'schedule_label':data.label,'schedule_value':data.reference_seq};
				} else if(data.reference_type === 'CARRIER'){
					list = {...list,'carrier_label':data.label,'carrier_value':data.reference_seq};
				} else if(data.reference_type === 'SHIPPER'){
					list = {...list,'shipper_label':data.label,'shipper_value':data.reference_seq};
				} else if(data.reference_type === 'CONSIGNEE'){
					list = {...list,'consignee_label':data.label,'consignee_value':data.reference_seq};
				} else if(data.reference_type === 'NOTIFY'){
					list = {...list,'notify_label':data.label,'notify_value':data.reference_seq};
				} else if(data.reference_type === 'CARGO'){
					list = {...list,'cargo_label':data.label,'cargo_value':data.reference_seq};
				} else if(data.reference_type === 'C_SHIPPER'){
					list = {...list,'c_shipper_label':data.label,'c_shipper_value':data.reference_seq};
				} else if(data.reference_type === 'C_CONSIGNEE'){
					list = {...list,'c_consignee_label':data.label,'c_consignee_value':data.reference_seq};
				} else if(data.reference_type === 'C_NOTIFY'){
					list = {...list,'c_notify_label':data.label,'c_notify_value':data.reference_seq};
				}			
			});
			setPropsData(list);
			setBookmarkData(list);
		});
	}
  	//북마크 등록
	const onInsertProps = (data) => { 
		setBookmarkData(data);
	}
	//북마크 삭제
	const onDeleteProps = ()=> { 
		if(bookmarkData && bookmarkData.bookmark_seq !==undefined) {
			axios.post("/shipper/setUserTitleBookmarkDel",{user_no:props.user?props.user.user_no:'',seq: bookmarkData?bookmarkData.bookmark_seq:''}).then(res=>{ onInitData(); 
				props.onLoadData("tt");
				props.onAlert("success","선택한 BOOKMARK 가 삭제 되었습니다.");
						
			});
		} else {
			props.onAlert("error","삭제 할 BOOKMARK를 선택해주세요.");
		}
	}
	//북마크 DB 등록
	const onInsertBookmark =()=>{

		if(bookmarkData && (bookmarkData.bookmark_name !== undefined && bookmarkData.bookmark_name !== '')) {
			axios.post("/shipper/setUserTitleBookmark",{user_no:props.user?props.user.user_no:'',data: bookmarkData}).then(res=>{  props.onLoadData("tt");
				if(bookmarkData.bookmark_seq) {
					props.onAlert("success","작성한 BOOKMARK 가 수정 되었습니다.");
				} else {
					props.onAlert("success","작성한 BOOKMARK 가 저장 되었습니다.");
				}
			});
		}
	}
  
	return (
		<>
				<Row>
				
					<Col xl="3" lg="3" md="12">
						<FormGroup>
							<Label className="mb-0">SR Number</Label>
							<Input type="text" name="sr_no" id="sr_no" placeholder="" value={sr.sr_no?sr.sr_no:''} maxLength="15"
								invalid={!sr.sr_no?true:false}
								onChange={(e)=>fncOnChange(e, 'sr_no')}
								onBlur={(e)=>fncOnBlur(e)}
								disabled
								style={{border:sr.part_bl && sr.part_bl === 'Y'?'2px solid green':''}}/>
							<FormFeedback>{validation.REQ_MSG}</FormFeedback>
						</FormGroup>
					</Col>  
					<Col xl="2" lg="2" md="12">
						<FormGroup>
							<Label className="mb-0">SR Date</Label>
							<InputGroup className="date" id="etd">
								<Input type="text" name="sr_date" id="sr_date"
								value={sr.sr_date?moment(sr.sr_date).format('YYYY-MM-DD'):moment(new Date()).format('YYYY-MM-DD')}
									disabled
									/>
								<InputGroupAddon addonType="append">
									<InputGroupText>
										<span className="glyphicon glyphicon-calendar">
										<i className="fa fa-calendar" />
										</span>
									</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
							<FormFeedback>{validation.REQ_MSG}</FormFeedback>
						</FormGroup>
					</Col>
					
						{sr.status_cus?
							<Col xl="2" lg="2" md="12" className="mr-auto">
							<FormGroup>
								<Label className="mb-0">Status</Label>
								<Input type="select" name="status_cus" id="status_cus" placeholder="현재 상태"
									value={sr.status_cus?sr.status_cus:''}
									readOnly>
									<option value="NO">저장</option>
									<option value="S0">저장</option>
									<option value="S9">전송</option>
									<option value="S4">정정전송</option>
									<option value="S1">취소전송</option>
									<option value="RA">승인</option>
									<option value="RJ">거절</option>
									<option value="CC">취소승인</option>
									<option value="RC">승인취소</option>
									<option value="FA">BL확정</option>
									<option value="SF">확정요청</option>
								</Input>
							</FormGroup>
						</Col>:null}
						<Col xl="4" lg="4" className="col-12 ml-auto mr-0 mb-3">
							<Row>
								<Col className="col-10 pr-0 ml-auto"   style={{zIndex:'13'}}>
									<Label className="mb-0"/>
										<Select 
											className="react-select react-select-primary"
											classNamePrefix="react-select"
											name="all_bookmark"
											value={{value:sr.bookmark_seq?sr.bookmark_seq:'',label:sr.bookmark_name?sr.bookmark_name:''}}
											onChange={(value)=>onChangeTitle(value)}
											options={bookmark}
											placeholder="선택"
											isClearable={sr.bookmark_seq?true:false}/>
								</Col>
								<Col className="col-2 pl-auto pr-auto pt-3">
									<Button className="pl-0 pr-0" color="link" id="Allbookmark" onClick={toggle}><i className="fa fa-bookmark-o fa-2x" /></Button>
									<UncontrolledTooltip delay={0} target="Allbookmark">Bookmark</UncontrolledTooltip>
								</Col>			
						</Row>
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
					<Modal isOpen={open} toggle={toggle} className="pt-0" size="lg">
						<ModalHeader toggle={toggle} className="pt-3 pb-3">SR Bookmark</ModalHeader>
							<ModalBody className="p-3">
									<TitleBookmark 
												titleProps={propsData} 
												selectProps={(data)=>onSelectProps(data)}
												insertProps={(data)=>onInsertProps(data)}
												{...props} 
									/>
							</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={onInitData}>NEW</Button>{' '}
							<Button color="primary" onClick={onInsertBookmark}>SAVE</Button>{' '}
							<Button color="primary" onClick={onDeleteProps}>DELETE</Button>{' '}
							<Button color="secondary" onClick={()=>setOpen(!open)}>CANCLE</Button>
						</ModalFooter>
					</Modal>
				
		</>
    );
}

export default SRTItleCard;