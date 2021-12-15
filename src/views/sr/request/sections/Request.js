import React,{useState, useEffect, useRef} from "react";
import {
	Row,
  	Col,
//   Card,
  	CardBody,
  	//CardHeader,
  	Container,
 	// Form,FormGroup,UncontrolledDropdown,ButtonGroup,DropdownToggle,DropdownMenu,DropdownItem,CardFooter,
  	Button,UncontrolledTooltip,Modal,Collapse,Input,FormFeedback,Card,Badge,Form
} from "reactstrap";
//import * as validation from 'components/common/validationation.js';
import ScheduleCard from './schedule/ScheduleCard.js';
//import CarrierCard from './carrier/CarrierCard.js';
import ShipperCard from './shipper/ShipperCard.js';
import NotifyCard from "./notify/NotifyCard.js";
import ConsigneeCard from "./consignee/ConsigneeCard.js";
import CCAM_ShipperCard from './ccam/shipper/ShipperCard.js';
import CCAM_NotifyCard from "./ccam/notify/NotifyCard.js";
import CCAM_ConsigneeCard from "./ccam/consignee/ConsigneeCard.js";
import ContainerCard from "./container/ContainerCard.js";
import SrTitleCard from "./title/SrTitleCard.js";
import OthersCard from "./other/OthersCard.js";
import CargoCard from "./cargo/CargoCard.js";
import DeclareCard from "./declare/DeclareCard.js";
import Switch from "react-bootstrap-switch";
import axios from 'axios';
import InputValid from "components/CustomInput/InputValid.js";

export default function SrRequest( props ) {

	const {user,validation} = props;
	const [allOpen,setAllOpen] = useState(true);
	const [carrierOpen,setCarrierOpen] = useState(false);
	const [shpOpen,setShpOpen] = useState(true);
	const [consOpen,setConsOpen] = useState(true);
	const [notiOpen,setNotiOpen] = useState(true);
	const [shp2Open,setShp2Open] = useState(true);
	const [cons2Open,setCons2Open] = useState(true);
	const [noti2Open,setNoti2Open] = useState(true);
	const [otherOpen,setOtherOpen] = useState(true);
	const [cargoOpen,setCargoOpen] = useState(true);
	const [schOpen,setSchOpen] = useState(true);
	const [cntrOpen,setCntrOpen] = useState(true);
	const [decOpen,setDecOpen] = useState(true);
	const [userTitleBookmarkList,setUserTitleBookmarkList] = useState([]);
	const [userLineBookmarkList,setUserLineBookmarkList] = useState([]);
	const [userShpBookmarkList,setUserShpBookmarkList] = useState([]);
	const [userConsBookmarkList,setUserConsBookmarkList] = useState([]);
	const [userNotiBookmarkList,setUserNotiBookmarkList] = useState([]);
	const [userSchBookmarkList,setUserSchBookmarkList] = useState([]);
	const [userCargoBookmarkList,setUserCargoBookmarkList] = useState([]);	
	const [userMarkBookmarkList,setUserMarkBookmarkList] = useState([]);
	const [userGoodsBookmarkList,setUserGoodsBookmarkList] = useState([]);
	const [userOtherBookmarkList,setUserOtherBookmarkList] = useState([]);
	const [userCntrBookmarkList,setUserCntrBookmarkList] = useState([]);
	const [userDeclareBookmarkList,setUserDeclareBookmarkList] = useState([]);
    // FocusTarget 어느건지
    const [focusTarget, setFocusTarget] = useState("");
    const bookingFocus = useRef(null);
    const scheduleFocus = useRef(null);
    const shipperFocus = useRef(null);
    const consigneeFocus = useRef(null);
    const notifyFocus = useRef(null);
    const cargoFocus = useRef(null);
    const cntrFocus = useRef(null);
    const declareFocus = useRef(null);
    const cShipperFocus = useRef(null);
    const cConsFocus = useRef(null);
    const cNotifyFocus = useRef(null);
	//alert
	const [modalMsg, setModalMsg] = useState("");
	const [modalStats, setModalStats] = useState("");
	
	const [srData,setSrData] = useState([]);
	const [open, setOpen] = useState(false);
	const [autoSelf, setAutoSelf] = useState(true);
	const [dupYn, setDupYn] = useState(false);
	const [newSr, setNewSr] = useState("");
	//const [newSrDupCheck, setNewSrDupCheck] = useState(false);
	const [topView, setTopView] = useState(false);
	const [conSamec, setConSamec] = useState(true);

	
	const [param, setParam] = useState({user_no: props.location.state && props.location.state.user_no?props.location.state.user_no|| '' :user?user.user_no:null, 
            sr_no: props.location.state && props.location.state.sr_no  ? props.location.state.sr_no || '' : null,  
            sr_date: props.location.state && props.location.state.sr_date ? props.location.state.sr_date || '' : null,
            doc_new: props.location.state && props.location.state.doc_new ? props.location.state.doc_new || '' : null,
            res_bkg_no: props.location.state && props.location.state.res_bkg_no?props.location.state.res_bkg_no || '':null,
            /*sch_vessel_name: props.location.state && props.location.state.sch_vessel_name?props.location.state.sch_vessel_name || '':null,
            sch_vessel_voyage: props.location.state && props.location.state.sch_vessel_voyage?props.location.state.sch_vessel_voyage || '':null,
            sch_pol: props.location.state && props.location.state.sch_pol?props.location.state.sch_pol || '':null,
            sch_pol_name: props.location.state && props.location.state.sch_pol_name?props.location.state.sch_pol_name || '':null,
            sch_pod: props.location.state && props.location.state.sch_pod?props.location.state.sch_pod || '':null,
            sch_pod_name: props.location.state && props.location.state.sch_pod_name?props.location.state.sch_pod_name || '':null,*/
            confirm_yn:props.location.state && props.location.state.confirm_yn?props.location.state.confirm_yn || '':null
	});
 
	useEffect(() => {
		const updateListData = () => {

			let scrollTop = Math.max(document.documentElement.scrollTop,document.body.scrollTop);
			//Scroll 화면 하단 Check 
			if((Math.round(scrollTop) > 199)) {
				setTopView(true);  
			} else {
				setTopView(false);
			}
		    	
		}
		window.addEventListener("scroll", updateListData);
		      
		return function cleanup() {
			window.removeEventListener("scroll", updateListData);
		};
	});
	  
	useEffect(() => {

		if(user) { 
			/*onLoadTitleBookmark(); // title
		    onLoadLineBookmark();
			onLoadShBookmark();
			onLoadConsBookmark();		
			onLoadNotiBookmark();
			onLoadCargobookmark();
			onLoadMarkbookmark();
			onLoadGoodsbookmark();
			onLoadOtherbookmark();
			onLoadSchedulebookmark();
			onLoadCntrbookmark();
			onLoadDecbookmark();*/
			onBookmark(user);
		}
	},[user]);
	
	
	useEffect(()=>{

		/* if(param.user_no) {
			onBookmark(param);
		}*/ //console.log("param:",param);
		
		if (param && !param.sr_no && param.doc_new === 'Y') { //console.log("new sr");
			autoSrNumberCreate(false);
		} else if (param && param.res_bkg_no && param.confirm_yn === 'Y') { //컴펌 링크
			//sr 있을 경우
			//console.log("link res bkg no");
			if(param.sr_no && param.sr_date) {
				getSRDataSelect(param);
			} else { 
				axios.post("/shipper/setUserSrBkgInit",{user_no:user?user.user_no:'',bkg_no:param.res_bkg_no, klnet_id:user?user.klnet_id:''}).then(res => { 
					let cons = {};
					if(conSamec) {
						if(!res.data.noti_name1) {
							// cons = {'noti_name1':'SAME AS CONSIGNEE','noti_name2':'','noti_address1':'',
							// 'noti_address2':'','noti_address3':'',
							// 'noti_address4':'','noti_address5':''};	
							cons = {'noti_name1':'','noti_name2':'','noti_address1':'',
							'noti_address2':'','noti_address3':'',
							'noti_address4':'','noti_address5':''};
						}
					}
					let data = {...res.data,...cons,goods_desc:trans_goods_descriptin(res.data.trans_service_code,srData.goods_desc)};
					//  let data = {...res.data,goods_desc:trans_goods_descriptin(res.data.trans_service_code,srData.goods_desc)};
					//console.log("data:",data);
					setSrData(data);	 		
				});
			}
		} else if (param && param.sr_no && (!param.confirm_yn || param.confirm_yn !== 'N')) {
			//console.log("select sr");
			getSRDataSelect(param);
		} /*else {
			getSRDataSelect();
		}*/
    },[param]);

	const keyPress =(key)=> {
	    // const keyCode = e.keyCode;
	    // console.log("KEY : ",key.key)
	    if( key.key === 'F2' ) {
	        // e.preventDefault();
	        // if( !checkDown ) {
	        //     checkDown=true;
	            // console.log("keydown")
			if( !focusTarget ) {
				setFocusTarget("booking");
			} else if( "booking" === focusTarget ) {
				setFocusTarget("schedule");
			} else if( "schedule" === focusTarget ) {
				setFocusTarget("shipper");
			} else if( "shipper" === focusTarget ) {
				setFocusTarget("consignee");
			} else if( "consignee" === focusTarget ) {
				setFocusTarget("notify");
			} else if( "notify" === focusTarget ) {
				setFocusTarget("cargo");
			} else if( "cargo" === focusTarget ) {
				setFocusTarget("container");
			} else if( "container" === focusTarget ) {
				if('N' === srData.hbl_yn ) {
					setFocusTarget("declare");
				} else {
					setFocusTarget("c_shipper");
				}
			} else if( "declare" === focusTarget ) {
				setFocusTarget("c_shipper");
			} else if( "c_shipper" === focusTarget ) {
				setFocusTarget("c_consignee");
			} else if( "c_consignee" === focusTarget ) {
				setFocusTarget("c_notify");
			} else if( "c_notify" === focusTarget ) {
				setFocusTarget(null);
			}
	        // }
	    }
	}

	useEffect(()=>{
	    window.addEventListener("keydown", keyPress);
	    return () => {
	        window.removeEventListener("keydown", keyPress);
	    }
	})

	useEffect(()=>{
	    if( "booking" === focusTarget ) {
	        bookingFocus.current.focus();
	    } else if ( "schedule" === focusTarget ) {
	        scheduleFocus.current.focus();
	    } else if ( "shipper" === focusTarget ) {
	        shipperFocus.current.focus();
	    } else if ( "consignee" === focusTarget ) {
	        consigneeFocus.current.focus();
	    } else if ( "notify" === focusTarget ) {
	        notifyFocus.current.focus();
	    } else if ( "cargo" === focusTarget ) {
	        cargoFocus.current.focus();
	    } else if ( "container" === focusTarget ) {
	        cntrFocus.current.focus();
	    } else if ( "declare" === focusTarget ) {
	    	declareFocus.current.focus();
	    } else if ( "c_shipper" === focusTarget ) {
	        cShipperFocus.current.focus();
	    } else if ( "c_consignee" === focusTarget ) {
	        cConsFocus.current.focus();
	    } else if ( "c_notify" === focusTarget ) {
	        cNotifyFocus.current.focus();
	    }
	}, [focusTarget]);
	
/*	useEffect(()=>{
	    props.fncClickMenu("NAV_SR")
	}, []);*/

	
	// select Goods function
	
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
	
    const onBookmark =(data)=>{
    	axios.post("/shipper/getUserBookmark",{user_no:data?data.user_no:''}).then(res => {
  	  		setUserTitleBookmarkList(res.data.totalList);
  	  	    setUserLineBookmarkList(res.data.carrierList);
  	  	    setUserShpBookmarkList(res.data.shipperList);
  	  	    setUserConsBookmarkList(res.data.consList);
  	  	    setUserNotiBookmarkList(res.data.notiList);
  	  	    setUserCargoBookmarkList(res.data.cargoList);
  	  	    setUserOtherBookmarkList(res.data.bookingList);
  	  	    setUserSchBookmarkList(res.data.scheduleList);
  	  	    setUserCntrBookmarkList(res.data.cntrList);
  	  	    setUserDeclareBookmarkList(res.data.decList);
  	  	    setUserMarkBookmarkList(res.data.markList);
  	  	    setUserGoodsBookmarkList(res.data.goodsList);
  	  	});
    }

	const onLoadTitleBookmark =() => {
		axios.post("/shipper/getUserTitleBookmark",{user_no:user?user.user_no:''}).then(res => {
			setUserTitleBookmarkList(res.data)});
    }
	
	const onLoadLineBookmark =() => {
		axios.post("/shipper/getUserLineBookmark",{user_no:user?user.user_no:''}).then(res => {
			setUserLineBookmarkList(res.data)});			
	}
	
	const onLoadShBookmark =() => {
		axios.post("/shipper/getUserShpBookmark",{user_no:user?user.user_no:''}).then(res => {
			setUserShpBookmarkList(res.data)});
	}
	
	const onLoadConsBookmark =() => {
		axios.post("/shipper/getUserConsBookmark",{user_no:user?user.user_no:''}).then(res => {
			setUserConsBookmarkList(res.data)});	
		
	}
	
	const onLoadNotiBookmark=()=>{
		axios.post("/shipper/getUserNotiBookmark",{user_no:user?user.user_no:''}).then(res => {
			setUserNotiBookmarkList(res.data)});	
		
	}
	
	const onLoadCargobookmark=()=>{
		axios.post("/shipper/getUserCargoBookmark",{user_no:user?user.user_no:''}).then(res => {
			setUserCargoBookmarkList(res.data)});	
	}
	
	const onLoadMarkbookmark=()=>{
		axios.post("/shipper/getUserMarkBookmark",{user_no:user?user.user_no:''}).then(res => {
			setUserMarkBookmarkList(res.data)});	
	}
	
	const onLoadGoodsbookmark=()=>{
		axios.post("/shipper/getUserGoodsBookmark",{user_no:user?user.user_no:''}).then(res => {
			setUserGoodsBookmarkList(res.data)});	
	}
	const onLoadOtherbookmark=()=>{
		axios.post("/shipper/getUserOtherBookmark",{user_no:user?user.user_no:''}).then(res => {
			setUserOtherBookmarkList(res.data)});	
	}
	const onLoadSchedulebookmark=()=>{
		axios.post("/shipper/getUserSchBookmark",{user_no:user?user.user_no:''}).then(res => {
			setUserSchBookmarkList(res.data)});	
	}	
	const onLoadCntrbookmark=()=>{
		axios.post("/shipper/getUserCntrBookmark",{user_no:user?user.user_no:''}).then(res => {
			setUserCntrBookmarkList(res.data)});
	}	
	const onLoadDecbookmark=()=>{
		axios.post("/shipper/getUserDeclareBookmark",{user_no:user?user.user_no:''}).then(res => {
			setUserDeclareBookmarkList(res.data)});
	}		

	const getSRDataSelect = (param) => {
        axios.post("/shipper/getUserSrDataList",{user_no :param.user_no?param.user_no:user?user.user_no:'',data:param,link:param?param.sr_no?'Y':'N':'N',list:'N'}).then(res =>{
			if(res.data) {
				if(res.data.length === 0 ){
					props.onAlert("error","조회된 값이 없습니다.");
				}else {
					if(res.data.status_cud !== 'D') {
						let cons = {};
						if(conSamec) {
							if(!res.data.noti_name1) {
								cons = {'noti_name1':'','noti_name2':'','noti_address1':'',
								'noti_address2':'','noti_address3':'',
								'noti_address4':'','noti_address5':''};
								// cons = {'noti_name1':'SAME AS CONSIGNEE','noti_name2':'','noti_address1':'',
								// 'noti_address2':'','noti_address3':'',
								// 'noti_address4':'','noti_address5':''};	
							}
						}
						let data = {...res.data,...cons,goods_desc:trans_goods_descriptin(res.data.trans_service_code,res.data.goods_desc)};
						//  let data = {...res.data,goods_desc:trans_goods_descriptin(res.data.trans_service_code,res.data.goods_desc)};
						setSrData(data);
					}else {
						props.onAlert("error","삭제된 문서는 조회 하실 수 없습니다. 목록 재조회 하시기 바랍니다.");
						window.location.href="/srlist";
	
					}
				}
				
			}else {
				props.onAlert("error","찾을 수 없는 SR문서입니다.");
			}
			
		});
    }
	
	const dataHandler = (data) => {
		setSrData({...srData,...data});
	}
	// SR 저장 
	const dataSave = () => {
	// 1. 자리수 체크 
		if( !props.validation.fncValidationMaxLength() ) {
            fncOpenCardInvalidMaxLength();
            props.onAlert("info","입력가능을(를) 확인 후 다시 저장 하세요.");
            return false;
        }
		if(!srData.sr_no) {
    		props.onAlert("error","sr_no 는 필수 입력항목 입니다. New 버튼을 통해 신규 번호를 입력 하세요.");
			return false;
		} 	// if(srData.status_cus === 'RA') { 
			// 	props.onAlert("danger","승인된 상태에서는 저장/전송이 불가합니다.")
			// 	return false;
			// }
		axios.post("/shipper/setUserSRDataList",{user_no:user?user.user_no:'',data:srData},{}).then(res => {
			if(res.data.code==="S") {
				props.onAlert("success","작성한 데이터가 저장 되었습니다.");	
			}else {
				props.onAlert("error",res.data.data);
			}
		})
		// } else {
		// 	props.onAlert("error","마감된 SR 문서는 수정 할 수 없습니다.");
		// }
	}
	
	const onLoadBookmark=(gubun)=>{
		if(gubun === "sh") {
			onLoadShBookmark();
		} else if (gubun === "ca") {
			onLoadLineBookmark();
		} else if (gubun === "cs") {
			onLoadConsBookmark();
		} else if (gubun === "nt") {
			onLoadNotiBookmark();
		} else if (gubun === "cg") {
			onLoadCargobookmark();
		} else if (gubun === "mk") {
			onLoadMarkbookmark();
		} else if (gubun === "gs") {
			onLoadGoodsbookmark();
		} else if (gubun === "ot") {
			onLoadOtherbookmark();
		} else if (gubun === "sc") {
			onLoadSchedulebookmark();
		} else if (gubun === "ct") {
			onLoadCntrbookmark();
		} else if (gubun === "dc") {
			onLoadDecbookmark();
		}else if (gubun === "tt") {
			onLoadTitleBookmark();
		}
		
		
	}

	/* 저장 및 문서 전송 */
	const fncOnDocSend = () => {
	    
	    if(modalStats==="NORMAL") {
	        if( !user.sr_recipient ) {
	            props.onAlert("error", validation.NO_SR_RECIPIENT);
	            return false;
	        } else {
	        	axios.post("/shipper/getUserSrDocInit",{user_no :user?user.user_no:'',sr_no:newSr, lineCode:'WDFC'}).then(res => {
					setSrData({...res.data,'bkglist':[]});
					setOpen(!open);
				});
	        }
	    } else if(modalStats==="PART") {

			if( !props.validation.fncValidationMaxLength() ) {
				fncOpenCardInvalidMaxLength();
				props.onAlert("info","입력가능을(를) 확인 후 다시 저장 하세요.");
				return false;
			}
			if(!srData.sr_no) {
				props.onAlert("error","sr_no 는 필수 입력항목 입니다. New 버튼을 통해 신규 번호를 입력 하세요.");
				return false;
			} 	// if(srData.status_cus === 'RA') { 
				// 	props.onAlert("danger","승인된 상태에서는 저장/전송이 불가합니다.")
				// 	return false;
				// }
			setOpen(!open);
			axios.post("/shipper/setUserSRDataList",{user_no:user?user.user_no:'',data:srData},{}).then(res => {
				if(res.data.code==="S") {
					axios.post("/shipper/setUserSrParkBl",{user_no : user?user.user_no:'',data:srData}).then(res => {
						if(res.data.code==="S") {
							setSrData(res.data.data);
							setAllOpen(!allOpen);
							setShpOpen(!allOpen);
							setConsOpen(!allOpen);
							setNotiOpen(!allOpen);
							setOtherOpen(!allOpen);
							setCargoOpen(!allOpen);
							setSchOpen(!allOpen);
							setCntrOpen(!allOpen);
							setDecOpen(!allOpen);
							setShp2Open(!allOpen);
							setCons2Open(!allOpen);
							setNoti2Open(!allOpen);    
							props.onAlert("success","작성한 SR의 PART B/L이 분할 되었습니다.");
						}else {
							props.onAlert("error",res.data.data);
						}
						
					}); 

				}else {
					props.onAlert("error",res.data.data);
					
				}
			})

	    } else if(modalStats==="DELETE") { 
	    	setOpen(false);
	    	// 상태 조회
	    	if('FA' === srData.status_cus) {
				props.onAlert("danger","BL 확정된  SR문서는 삭제 하실수 없습니다.");
				return false;
	    	} else if ('S9' === srData.status_cus || 'RA' === srData.status_cus) {
				props.onAlert("danger","전송 또는 승인 된  SR문서는 삭제 하실수 없습니다.");
				return false;
	    	} else {
	    	    //문서 상태 확인
	    		axios.post("/shipper/getUserSrDataList",{user_no :param.user_no?param.user_no:user?user.user_no:'',data:srData,link:'N',list:'N'}).then(res =>{
	    			var status = res.data.status_cus;
    				if(srData.status_cus !== status) {
    					props.onAlert("danger","해당 SR문서는 삭제 하실수 없습니다. 다시 조회 후 상태를 확인해 주세요.");
						return false;
    				} else {
    					axios.post("/shipper/deleteSrList",{user_no:user?user.user_no:'', data:srData}).then(res => {
							props.onAlert("success","작성한 SR ["+srData.sr_no+"] 가 삭제되었습니다. SR목록 화면으로 전환 됩니다."); 
							window.location.href="/srlist";
						});
    				}
	    		});
	    	}
	    } else {
	    	//문서 전송 ( 저장 )
	    	setOpen(!open);
	    	// if(srData.status_cus === 'FA') {
			// 	props.onAlert("danger","BL 확정으로 SR을 전송 하실 수 없습니다.")
			// 	return false;
	    	// }
	    	axios.post("/shipper/setUserSRDataList",{user_no:user?user.user_no:'',data:srData}).then(res => {
				if(res.data.code==="E") {
					props.onAlert("error",res.data.data);
					return false;
				}
		  	  	if( !validation.fncValidation() ) {
                	fncOpenCardInvalid();
                	props.onAlert("danger","필수값 또는 입력가능을(를) 확인 후 다시 전송 하세요.")
                	return false;
            	} else {	
					axios.post("/shipper/setSendDocSr",{user_no:user?user.user_no:'',klnet_id:user?user.klnet_id:'',data:srData,status:modalStats}).then(res => {
						if(res.data === 'success' ) {
							props.onAlert("success",modalStats==="CANCEL"?"작성한 SR "+srData.sr_no+" 문서를 취소전송 하였습니다.":"작성한 SR "+srData.sr_no+" 문서를 전송 하였습니다.");
							setSrData({...srData,status_cus:'S9'});
						} else {
							props.onAlert("error",res.data);
						}
					}).catch(err => {
						if(err.response.status === 400) {
							const data = err.response.data;
							let message = "";
							if( data.service_code ) {
								setOtherOpen(true);
								message += data.service_code;
							}
							if( data.vessel_name || data.route) {
								setSchOpen(true);
								if( data.vessel_name )
									message += "\n"+data.vessel_name;
								if( data.route )
									message += "\n"+data.route;
							}
							if( data.cargo_pack_type ) {
								setCargoOpen(true);
								message = "\n"+data.cargo_pack_type;
							}
							if( data.vgm ) {
								setDecOpen(true);
								message += "\n"+data.vgm;
							}
							if( data.declare ) {
								message += "\n"+data.declare;
							}
							if ( data.originator) {
								message += "\n"+data.originator;
							}
							if( message ) {
								props.onAlert('error', message );
								return false;
							}
	                             
						}
					});
					/*.catch(err => {
						if(err.response.status === 500) {
						let url = "/error-500?message="+err.response.statusText;
						props.history.push(url);
					} else if(err.response.status === 419) {
							//props.refresh();
					} else {
						console.log(err);	
					}
				})*/
		/*	} else {
				setOpen(!open);
			}*/
	  	  		}
			});
		}
	}
	//필수 체크
	const fncOpenCardInvalid =()=>{ //console.log("필수값 체크");
        if( validation.fncFeedIdInvalid('booking') ) {
        	setOtherOpen(true);
        }
        if( validation.fncFeedIdInvalid('schedule') ) {
        	setSchOpen(true);
        }
        if( validation.fncFeedIdInvalid('shipper') ) {
        	setShpOpen(true);
        }
        if( validation.fncFeedIdInvalid('consignee') ) {
        	setConsOpen(true);
        }
        if( validation.fncFeedIdInvalid('notify') ) {
        	setNotiOpen(true);
        }
        if( validation.fncFeedIdInvalid('cargo') ) {
        	setCargoOpen(true);
        }
        if( validation.fncFeedIdInvalid('container') ) {
        	setCntrOpen(true);
        }
     
        if( srData.hbl_yn ==='N' && validation.fncFeedIdInvalid('declare') ) {
        	setDecOpen(true);
        }
    }
	// 자리수 체크 
    const fncOpenCardInvalidMaxLength =()=>{

    	//console.log("fncOpenCardInvalidMaxLength");
       	if( validation.fncFeedIdInvalidMaxLength('booking') ) {
    	   setOtherOpen(true);
        }

        if( validation.fncFeedIdInvalidMaxLength('schedule') ) {
        	setSchOpen(true);
        }
/*        if( validation.fncFeedIdInvalidMaxLength('carrier') ) {
            setOpenCarrier(true);
        }*/
        if( validation.fncFeedIdInvalidMaxLength('shipper') ) {
        	setShpOpen(true);
        }
        if( validation.fncFeedIdInvalidMaxLength('consignee') ) {
        	setConsOpen(true);
        }
        if( validation.fncFeedIdInvalidMaxLength('notify') ) {
        	setNotiOpen(true);
        }
        if( validation.fncFeedIdInvalidMaxLength('cargo') ) {
        	setCargoOpen(true);
        }
        if( validation.fncFeedIdInvalidMaxLength('container') ) {
        	setCntrOpen(true);
        }
        if( validation.fncFeedIdInvalidMaxLength('declare') ) {
        	setDecOpen(true);
        }
    }
	const autoSrNumberCreate =(msgyn) =>{ 
		if(user) {
			if( !user.sr_recipient ) {
				props.onAlert("error", validation.NO_SR_RECIPIENT);
				return false;
			} else {
				axios.post("/shipper/getUserSrDocInit",{user_no : user?user.user_no:'',klnet_id:user?user.klnet_id:'', lineCode:'WDFC'}).then(res => {
					setSrData({...res.data,'bkglist':[]});
					if(msgyn) {
						props.onAlert("success","신규 SR번호를 생성하였습니다.");
					}
				});
			}
		} else {
			return false;
		}
	}
	const resetShippingRequest=()=> {
		if(autoSelf) {
			//자동생성
			autoSrNumberCreate(true);
		} else { 
			//수동생성
			if(!newSr) {
				props.onAlert("error","직접 생성할 SR번호를 입력해주세요.");
				return false;
			} else {
					
				if(dupYn) {
					selfSrNumberCreate();
				} else {
					props.onAlert("error","SR 중복확인 버튼을 눌러주세요.");
				}
			}
		}
	}
	
	const selfSrNumberCreate = () => {

	   	if( validation.fncFeedIdInvalid('sr_main') ) {
			props.onAlert("error","SR 번호를 확인해주세요.");  
	   	} else {
			axios.post("/shipper/getUserNewSrDupCheck",{sr_no:newSr}).then(res => {
				if(!res.data) {
			    	setDupYn(true);
			 		setModalStats("NORMAL");
					setModalMsg("["+newSr+"] 신규번호로 작성하시겠습니까?");
					setOpen(!open);	
				} else {
					props.onAlert("error","["+newSr+"] 번호는 이미 사용중입니다. 다른번호를 입력 해주세요.");
				}
		
			});
	   	}
	}
	
	const onDocSend = (name) => {
		let msg ="";
		
		if(!srData.sr_no) {
    		props.onAlert("error","sr_no 는 필수 입력항목 입니다. New 버튼을 통해 신규 번호를 입력 하세요.");
    	} else {
    		setAllOpen(false);
			setShpOpen(false);
			setConsOpen(false);
			setNotiOpen(false);
			setOtherOpen(false);
			setCargoOpen(false);
			setSchOpen(false);
			setCntrOpen(false);
			setDecOpen(false);
			setShp2Open(false);
			setCons2Open(false);
			setNoti2Open(false);
			
			if(name === "SEND") {
				
			    if(srData.part_bl && srData.part_bl ==='Y') {
			    	msg= "작성한 SR ["+srData.sr_no+"] 을 전송 하시겠습니까? (PART B/L)";
			    } else {
			    	msg= "작성한 SR ["+srData.sr_no+"] 을 전송 하시겠습니까?";
			    }
				setModalStats("SEND");
			} else if(name === "DELETE") {
				msg= "작성한 SR ["+srData.sr_no+"] 을  삭제 하시겠습니까?삭제한 경우 재 조회가 불가합니다.";
				setModalStats("DELETE");
			} else {
				msg= "작성한 SR ["+srData.sr_no+"] 을 취소전송 하시겠습니까?";
				setModalStats("CANCEL");
			}
			setModalMsg(msg);
			setOpen(!open);
    	}
		
	}
	
	const fncDupCheckBkgNo = (e) => {
		setNewSr(e.target.value);
		if(e.target.value){
			setDupYn(false);
		}
	}
	
	const fncReportViewer = ()=>{
		if( !(srData.user_no && srData.sr_no && srData.sr_date ) ) { 
			props.onAlert("error","SR 먼저 조회 하세요.");
			return false;
		}

		var obj = new Object();
		obj.user_no = srData.user_no;
		obj.sr_no = srData.sr_no;
		obj.sr_date = srData.sr_date;
		var json = JSON.stringify(obj);

		let form = document.reportForm;
		form.action = '/shipper/reportViewer';
		form.target = 'popReport'; // window.open() 의 두번째 변수와 동일해야.
		form.file_id.value = 'weidong_sr';
		form.file_path.value = 'WEIDONG';
		form.name.value = 'FILENAME';
		form.connection.value = 'pgsql';
		form.parameters.value = json;
		window.open('', 'popReport', 'width=1050px, height=850px');
		form.submit();
	}
	  
	const partBl = () => {
		if(!srData.sr_no) {
			props.onAlert("error","sr_no 는 필수 입력항목 입니다. New 버튼을 통해 신규 번호를 입력 하세요.");
			return false;
		}
		if(srData.part_bl === 'Y') {
			props.onAlert("error","해당 SR 건은 PART B/L 로 분할 할 수 없습니다.");
			return false;
		}
		if(!srData.res_bkg_no) {
			props.onAlert("error","Booking No 먼저 선택해주세요.");
			return false;
		}
		setModalMsg("작성한 SR ["+srData.sr_no+"] 을 PART B/L로 분할 하시겠습니까?");
		setModalStats("PART");
		setOpen(!open);
	}

    return (
        <>
        	<div className="section section-white">	
        		<Form>
        			<Container>
        				<CardBody className="pt-2 pb-2 bg-white">
		        			<Row>
					            <Col className="ml-auto mr-auto" xl="12" lg="12" md="12" sm="12" >
						            <h1 
										className="mt-1 text-start" 
										style={{
						                background:
						                    "url(" + require("assets/img/bu_contitle_bar.gif") + ") no-repeat"
										}}>
										<small>Request (Shipping)</small>
						            </h1>
					            </Col>
							</Row>
							<Row className="mt-0" >
					         	<Col className="text-right">
						         	<label className="mt-2 mb-0 mr-2" >
										<Switch
											onColor="info" 
											offColor="success"
											onText="AUTO"
											offText="SELF" 
											defaultValue={true} 
											//value={switchVal} 
											onChange={(e)=>setAutoSelf(!autoSelf)} 
										/>
						            </label>
						            {(!srData.part_bl || srData.part_bl ==='N')  && srData.sr_no && srData.res_bkg_no?<Button id="split" color="default" outline type="button" className="mr-1" onClick={partBl}>SPLIT
						            		<UncontrolledTooltip delay={0} target="split">B/L분할</UncontrolledTooltip></Button>
					         		:<></>}
						         	<Button id="srnew" color="default" outline type="button" className="mr-1" onClick={resetShippingRequest}>NEW</Button>
					         		<UncontrolledTooltip delay={0} target="srnew">새문서</UncontrolledTooltip>
					         		<Button id="report" color="default" outline type="button" className="mr-1" onClick={()=>fncReportViewer()}>PREVIEW</Button>
		                                <UncontrolledTooltip delay={0} target="report">PREVIEW</UncontrolledTooltip>
						         	<Button id="srview" color="default" outline type="button" className="mr-1" onClick={dataSave}>SAVE</Button>
					         		<UncontrolledTooltip delay={0} target="srview">임시저장</UncontrolledTooltip>
					         		<Button id="srsend" color="default" outline type="button" className="mr-1" onClick={()=>onDocSend('SEND')}>SEND</Button>
					                	<UncontrolledTooltip delay={0} target="srsend">SR문서 전송</UncontrolledTooltip>
					                <Button id="srdel" color="default" outline type="button" className="mr-1" onClick={()=>onDocSend('DELETE')}>DELETE</Button>
						            <UncontrolledTooltip delay={0} target="srdel">SR문서 삭제</UncontrolledTooltip>
		                              
				                </Col>
				             </Row>
				             <Collapse isOpen={!autoSelf}>
		                        <Row className="mt-2">
	                            	<Col xl="4" lg="4" md="4" className="col-12 ml-auto">
	                                    <Row className="mt-2">
	                                        <Col xl="8" lg="8" md="8" className="col-8 pr-0 ml-auto ">
	                                            <InputValid 
		            		                        name="sr_c_no"
		            		                        id="sr_c_no"
													placeholder="직접 생성할 SR번호 입력"
		            		                        maxLength="15"
		            		                        //bsSize={size}
		            		                        value={newSr}
	                                            	onChange={(e)=>fncDupCheckBkgNo(e)}
		            		                        validtype="engNumber"
		            		                        required={!autoSelf?true:false} 
		            		                        feedid="sr_main"
		            		                    />
	                                        </Col>
	                                        <Col xl="4" lg="4" md="4" className="col-4">
	                                        	<Button id="srNum" color="danger" outline type="button" className="mr-1" onClick={selfSrNumberCreate}>중복확인</Button>
	                                        </Col>
	                                    </Row>
	                                </Col>
	                            </Row>
	                        </Collapse>
				            <hr className="mt-2"/>
	                        <Row>
		                        <Col xl="12" lg="12" className="pl-4 pr-4">
		                            <SrTitleCard 
										bookmark={userTitleBookmarkList} 
										booking={userOtherBookmarkList}
										schedule={userSchBookmarkList}
										carrier={userLineBookmarkList}
										shipper={userShpBookmarkList}
										consignee={userConsBookmarkList}
										notify={userNotiBookmarkList}
										cargo={userCargoBookmarkList} 
										loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark} {...props}/>
		                        </Col>
	                        </Row>
	                        <Row>
	                        	<Col xl="6" className="col-12">
	                        		<OthersCard openWindow={otherOpen}  bookmark={userOtherBookmarkList}  loadData={srData} 
	                        		            mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark} 
	                        	                samec={conSamec} ref={bookingFocus} {...props}/>
	                        	</Col>
	                        	<Col xl="6" className="col-12">
	                        		<ScheduleCard bookmark={userSchBookmarkList} loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark}
	                        		openWindow={schOpen}  ref={scheduleFocus} {...props}/>
	                        	</Col>	                        	
	                        </Row>
	                        <Row>
	                        	<Col xl="6" className="col-12">
	                        	{/*<CarrierCard bookmark={userLineBookmarkList} loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark} openWindow={carrierOpen}  {...props}/>*/ }
	                        		<ShipperCard bookmark={userShpBookmarkList} loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark} 
	                        				openWindow={shpOpen} ref={shipperFocus}
	                        				{...props}/>
	                        	</Col>
	                        	<Col xl="6" className="col-12">
	                        	
	                        		<ConsigneeCard bookmark={userConsBookmarkList} loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark} 
	                        		openWindow={consOpen}   samec={conSamec} onSetSamec={()=>setConSamec(!conSamec)} ref={consigneeFocus} {...props}/>
	                        	</Col>	                       	
                        	</Row>
	                        <Row>
	                        	<Col xl="6" className="col-12">
									<NotifyCard bookmark={userNotiBookmarkList} loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark}
												openWindow={notiOpen}  ref={notifyFocus} {...props}/>
								</Col>              	
	                    	</Row>
	                        
			                <Row>
				                <Col>
					                <CargoCard 
										bookmark={userCargoBookmarkList} 
		            	                bookmark2={userMarkBookmarkList}
		            	                bookmark3={userGoodsBookmarkList} 
		            	                loadData={srData} 
		            	                mergeData={(data)=>dataHandler(data)} 
		            	                onLoadData={onLoadBookmark}
		            	    			openWindow={cargoOpen} 
					                    ref={cargoFocus}
					                    {...props}/>
				                </Col>
				            </Row>
			                <Row>
				                <Col>
				                	<ContainerCard  bookmark={userCntrBookmarkList} loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark} 
				                					openWindow={cntrOpen} ref={cntrFocus}  {...props} />
				                </Col>
				            </Row>
			                <Row>
			                {(srData && srData.hbl_yn ==='N') &&
			                <Col>
			                	<DeclareCard  bookmark={userDeclareBookmarkList} loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark} 
			                	openWindow={decOpen}  ref={declareFocus} {...props} />
			                </Col>}
			            </Row>	
			            <Row>
				            <Col xl="12">
			                	<Badge className="ml-2" color="info" style={{fontSize:'17px'}} pill>CCAM</Badge>
			                	<hr className="mt-1" />
			                	<Row>
			                		<Col xl="6">
			                			<CCAM_ShipperCard bookmark={userShpBookmarkList} loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark} 
			                			 openWindow={shp2Open} ref={cShipperFocus} {...props}/>
			                		</Col>
			                		<Col xl="6">
			                			<CCAM_ConsigneeCard bookmark={userConsBookmarkList} loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark} 
			                			 openWindow={cons2Open} samec={conSamec} onSetSamec={()=>setConSamec(!conSamec)} ref={cConsFocus}  {...props}/>
			                		</Col>
			                		<Col xl="6">
			                			<CCAM_NotifyCard bookmark={userNotiBookmarkList} loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark}
			                			 openWindow={noti2Open} ref={cNotifyFocus} {...props}/>
			                		</Col>
			                	</Row>
			                </Col>
			            </Row>
						<Row>
							<Card className="no-transition mb-0 rounded-0" style={{zIndex:'30',position:'fixed',right:'0.5%',top:'25%'}}>
								<CardBody className="pl-1 pr-1 pt-2 pb-0 text-center"> 
									<Button
										color="link"
										size="sm"
										type="button" 
										className="pl-1 pr-1"
										onClick={(e)=>{e.preventDefault();onDocSend('SEND');}}>SEND
									</Button>
									<hr className="m-0 " />
									<Button
										color="link"
										size="sm"
										type="button" 
										className="pl-1 pr-1"
										onClick={(e)=>{e.preventDefault();dataSave();}}>SAVE
									</Button>
									<hr className="m-0" />
									<Button
										color="link"
										size="sm"
										type="button" className="pl-1 pr-1"
										onClick={(e) => {
											e.preventDefault();
											setAllOpen(!allOpen);
											setShpOpen(!allOpen);
											setConsOpen(!allOpen);
											setNotiOpen(!allOpen);
											setOtherOpen(!allOpen);
											setCargoOpen(!allOpen);
											setSchOpen(!allOpen);
											setCntrOpen(!allOpen);
											setDecOpen(!allOpen);
											setShp2Open(!allOpen);
											setCons2Open(!allOpen);
											setNoti2Open(!allOpen);
										}}>
										{allOpen?'Close':'Open'}
									</Button>
								</CardBody>
							</Card>             
                            <nav id="cd-vertical-nav" style={{zIndex:'15'}}>
								<ul>
                            		<li>
										<a 
											data-number="1"
											//href="#projects"
											onClick={(e) => {
												e.preventDefault();
												setOtherOpen(!otherOpen);
												document.getElementById("Others").scrollIntoView({
												behavior: "smooth",
												block: "start",
												inline: "nearest",
												});
											}}>
											<span className="cd-dot bg-secondary" />
											<span className="cd-label">Booking</span>
	                            		</a>
	                        		</li>
                            		<li>
										<a 
											data-number="2"
											//href="#projects"
											onClick={(e) => {
												e.preventDefault();
												document.getElementById("Schedule").scrollIntoView({
												behavior: "smooth",
												block: "start",
												inline: "nearest",
												});
											}}>
											<span className="cd-dot bg-secondary" />
											<span className="cd-label">Schedule</span>
										</a>
									</li>
									{/* <li>
										<a 
											data-number="3"
											//href="#features"
											onClick={(e) => {
												e.preventDefault();
												setCarrierOpen(!carrierOpen);
												document.getElementById("Carrier").scrollIntoView({
												behavior: "smooth",
												block: "start",
												inline: "nearest",
												});
											}}>
											<span className="cd-dot bg-secondary" />
											<span className="cd-label">Carrier</span>
										</a>
									</li> */}
									<li>
										<a 
											data-number="4"
											//href="#features"
											onClick={(e) => {
												e.preventDefault();
												setShpOpen(!shpOpen);
												document.getElementById("Shipper").scrollIntoView({
												behavior: "smooth",
												block: "start",
												inline: "nearest",
												});
											}}>
											<span className="cd-dot bg-secondary" />
											<span className="cd-label">Shipper</span>
										</a>
                          		  	</li>
                            		<li>
										<a 
											data-number="5"
											//href="#features"
											onClick={(e) => {
												e.preventDefault();
												document.getElementById("Consignee").scrollIntoView({
												behavior: "smooth",
												block: "start",
												inline: "nearest",
												});
											}}>
											<span className="cd-dot bg-secondary" />
											<span className="cd-label">Consignee</span>
                                		</a>
									</li>
									<li>
										<a 
											data-number="6"
											//href="#teams"
											onClick={(e) => {
												e.preventDefault();
												document.getElementById("Notify").scrollIntoView({
												behavior: "smooth",
												block: "start",
												inline: "nearest",});
											}}>
											<span className="cd-dot bg-secondary" />
											<span className="cd-label">Notify</span>
										</a>
                            		</li>
                            		<li>
										<a
											data-number="7"
											//href="#projects"
											onClick={(e) => {
												e.preventDefault();
												document.getElementById("Cargo").scrollIntoView({
												behavior: "smooth",
												block: "start",
												inline: "nearest",});
											}}>
											<span className="cd-dot bg-secondary" />
											<span className="cd-label">Cargo</span>
										</a>
                            </li>

                            <li>
                                <a 
                                data-number="8"
                                //href="#projects"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("Container").scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                    inline: "nearest",
                                    });
                                }}
                                >
                                <span className="cd-dot bg-secondary" />
                                <span className="cd-label">Container</span>
                                </a>
                            </li>
							{(srData.hbl_yn ==='N' && decOpen) &&
							<li>
								<a 
									data-number="9"
									//href="#projects"
									onClick={(e) => {
									e.preventDefault();
									document.getElementById("Declare").scrollIntoView({
									behavior: "smooth",
									block: "start",
									inline: "nearest",
									});
								}}
								>
									<span className="cd-dot bg-secondary" />
									<span className="cd-label">Declare</span>
								</a>
							</li>
							}
                            
                            
						</ul>
					</nav>
					{topView?
						<Button className="mb-1 pt-1 pb-1" style={{zIndex:'100',position:'fixed',right:'3%',top:'86%'}}
						color="neutral" size="sm"
						//outline
						type="button" 
						onClick={(e) => {
									e.preventDefault();
									document.getElementById("General").scrollIntoView({
									behavior: "smooth",
									block: "start",
									inline: "nearest",
									});
								}}
						>
						<i className="fa fa-angle-double-up fa-3x" /><br/><span style={{position:'absolute',top:'64%',right:'15%',fontSize:'1px'}}>Top</span>
						</Button> :<></>}
                    </Row>
				</CardBody>
			</Container>
		</Form>
	</div>

		{/* 모달 팝업 영역 
			xs : 한 줄
			sm : 576px 에서 다음 줄로 넘어감
			md : 768px
			lg : 992px
			xl : 1200px
			fluid : 뷰포트 전체의 너비
			*/}
		<Modal
			//size="sm"
			isOpen={open}
			//toggle={() => setOpen(false)}
			>
		<div className="modal-header no-border-header">
			<button
			className="close"
			type="button"
			onClick={() => setOpen(false)}
			>×</button>
		</div>
		<div className="modal-body text-center pl-0 pr-0">
			<h5>{modalMsg}</h5>
		</div>
		<div className="modal-footer">
			<div className="left-side">
				<Button className="btn-link" color="danger" type="button" onClick={fncOnDocSend}>Yes</Button>
			</div>
			<div className="divider" />
			<div className="right-side">
				<Button className="btn-link" color="default" type="button" onClick={() => setOpen(false)}>No</Button>
			</div>
		</div>
		</Modal>
		<form id="reportForm" name="reportForm" >
			<input type="hidden" name="system_id"   value="plismplus" />
			<input type="hidden" name="user_id"     value="M000008" />
			<input type="hidden" name="file_type"   value="pdf" />
			<input type="hidden" name="file_id"     value="" />
			<input type="hidden" name="file_path"   value="" />
			<input type="hidden" name="name"        value="" />
			<input type="hidden" name="connection"  value="pgsql" />
			<input type="hidden" name="parameters" id="parameters"/>
		</form>
	</> 
        
    )
}


//SR 스플릿 부분 수정
