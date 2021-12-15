/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect, forwardRef} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    ButtonGroup, Button,FormGroup,Label,Input, Card, UncontrolledTooltip,CustomInput,FormText} from "reactstrap";
//import Switch from "react-bootstrap-switch";
import Declare from "./Declare.js";
import DeclareBookmark from "./DeclareBookmark.js";
import axios from 'axios';
import { ExcelRenderer } from "react-excel-renderer";
//import * as validation from 'components/common/validation.js';
import Select from "react-select";
import Moment from 'moment';
//import Filesaver from 'file-saver';

let cntr;

const ContainerCard = forwardRef((props,declareFocus) => {
	const {bookmark,loadData,openWindow} = props;
	// Collapse Flag
	const [coll, setColl] = useState(false);
	// modal 창을 위한 state
	const [open, setOpen] = useState(false);
	//const [cntrSztp,setCntrSztp] = React.useState([]);
	//const [cntrCnt,setCntrCnt] = React.useState([]);
	const [bkgNo,setBkgNo] = useState("");
	const [declareBookmark,setDeclareBookmark] = useState([]);
	const [declare,setDeclare] = useState([]);
	const [declareInput,setDeclareInput] = useState([{}]);
	const [packCodeList,setPackCodeList] = useState([]);
	const [bookmarkView, setBookmarkView] = useState(false);
	const [bookmarkData, setBookmarkData] = useState([]);
	const [modalTitle, setModalTitle] = useState("Export lisence Info");
	const [switchVal,setSwitchVal] =useState(true);
	const [selectVal,setSelectVal] =useState({'value':'','label':'선택'});
	const [allCheck,setAllCheck] = useState(true);
	const [allCheckI,setAllCheckI] = useState(true);
	const [openSpecial, setOpenSpecial] = useState(false);
	const [deceBookmark, setDeceBookmark] = useState({});
	const [fileUploadYn,setFileUploadYn] = useState(null);
	const [fileUploadMsg,setFileUploadMsg] = useState("");
	const [cntrList, setCntrList] = useState([]);
	const [cntrSingleList, setCntrSingleList] = useState([]); //single window
	// 전체화면 css 적용을 위한 state
	const [cntrBookmark, setCntrBookmark] = useState([]);
  
	useEffect(() => {
		//setDeclare(loadData.declarelist?loadData.declarelist.length>0?loadData.declarelist:[{}]:[{}]);
		if(loadData.declarelist && loadData.declarelist.length>0) { 
			setDeclare(loadData.declarelist);
		} else {
			setDeclare([{'bookmark_checked':'Y'}]);
		}
	},[loadData]);
  
	useEffect(() => {
		setColl(openWindow);
	},[openWindow]);
	  
	useEffect(() => {
		if(props.user) {codePackage();}
	},[props.user]);

	const toggleSpecial = () => setOpenSpecial(!openSpecial);
  	const toggle = (params) => {

		if(params==='B') {
			setModalTitle("Export lisence BookMark");
			setBookmarkData({'declare_bookmark_name':'','declare_bookmark_seq':'','declare_num':'','declare_div_load_yn':'','declare_pack_set_code':'',
				'declare_div_load_no':'','declare_goods_desc':'','declare_pack_num':'','declare_pack_type':'','declare_weight':'','declare_pack_set_num':'',
				'declare_pack_set_type':'','declare_customs_date':Moment(new Date()).format('YYYYMMDD')});
			props.onLoadData("ct");
			setBookmarkView(true);
		} else {
			setModalTitle("Declare Info");
			setDeclareInput([...declare]);
			setAllCheckI(allCheck);
			props.onLoadData("ct");
			setBookmarkView(false);
		}
	  	setOpen(!open);
  	}

  	const onInitData = () => {
		//setDeclareInput([{}]);
		setBookmarkData({'declare_bookmark_name':'','declare_bookmark_seq':'','declare_num':'','declare_div_load_yn':'','declare_pack_set_code':'',
			'declare_div_load_no':'','declare_goods_desc':'','declare_pack_num':'','declare_pack_type':'','declare_weight':'','declare_pack_set_num':'',
			'declare_pack_set_type':'','declare_customs_date':Moment(new Date()).format('YYYYMMDD')});
	}
  
  	const codePackage =()=> {
		axios.post("/shipper/selectLineCodeCargoPackType",{params:{'line_code':'WDFC'}},{}).then(res => {
			setPackCodeList(res.data)
		});
	}
 
  
  	// bookmark insert
  	const onSaveBookmark =() =>{
	  	//console.log("data:",bookmarkData);
		if(bookmarkData.declare_bookmark_name !== null && bookmarkData.declare_bookmark_name !=='') {

			axios.post("/shipper/setUserDeclareBookmark",{user_no:props.user?props.user.user_no:'',data:bookmarkData},{}).then(res => {
				props.onLoadData("dc");
				if(bookmarkData.declare_bookmark_seq) {
					props.onAlert("success","작성한 BOOKMARK가 수정 되었습니다.");
				} else {
					props.onAlert("success","작성한 BOOKMARK가 저장 되었습니다.");
				}
			});
		}
	}
  //main View
  	const onDeclareList =(key,data) => {
	  	let list = declare;
	  	list[key] = data; 
	  	setDeclare(list); 
	  	props.mergeData({'declarelist':list});
  	}
  
	const onAddCntr =()=> {
		setDeclare([...declare,{'bookmark_checked':allCheck?'Y':'N'}]);
	}
  
  	const onDeleteRow =(key,data) => { 
		if(declare.length > 1) {
			let list = declare;
			if(key > -1) {
				list.splice(key,1);
			}
			setDeclare([...list]);
            props.mergeData({'declarelist':list});
	    } else {
	        let list ={'declare_seq':1,'declare_num':'','declare_div_load_yn':'','declare_pack_set_code':'','declare_div_load_no':'','declare_goods_desc':'','declare_pack_num':'','declare_pack_type':'','declare_weight':'','declare_pack_set_num':'','declare_pack_set_type':'','declare_customs_date':''};
	        setDeclare([list]);
	    	props.mergeData({'declarelist':list});
	    }
  	}
  
  	// single View
	const onCntrSingleList =(key,data) => { 
		let list = declareInput;
		list[key] = data;
		setDeclareInput(list); 
	}
	const onAddSingleCntr =()=> {
		setDeclareInput([...declareInput,{'declare_seq':declareInput.length}]);
	}
	const onDeleteSingleRow =(key,data) => {
		if(declareInput.length > 1) {
			let list = declareInput;
			if(key > -1) {
				list.splice(key,1);
			} else {
				console.log(">>>>",key);
			} 
			setDeclareInput([...list]);
		} else {
			let list ={'declare_seq':1,'declare_num':'','declare_div_load_yn':'','declare_pack_set_code':'','declare_div_load_no':'','declare_goods_desc':'','declare_pack_num':'','declare_pack_type':'','declare_weight':'','declare_pack_set_num':'','declare_pack_set_type':'','declare_customs_date':''};
			setDeclareInput([list]);
		}
	}
  
	// apply button event
	const onApplyData = () => { 
		props.mergeData({'declarelist':declareInput});
		setAllCheck(allCheckI);
		setDeclare(declareInput);
		setOpen(!open);
		setColl(true);
		//props.setWindow(true);
	}

	  
/*	  const onView=()=>{
		  setColl(!coll);
	  }*/
	  
	  
	const onBookMarkData = (data) => {
		setBookmarkData(data);
	}
	  

  // Cancle window	  
	const onCancleWindow =()=>{ 
		setSelectVal({'value':'','label':'선택'});
		if(!bookmarkView){
			setDeclareInput(declare);
		}
		setOpen(!open);  
	}
  
  	const onBookDeclareDelete = (data) => {

		if(bookmarkData && bookmarkData.declare_bookmark_seq) {
			axios.post("/shipper/setUserDeclareBookmarkDel",{user_no:props.user?props.user.user_no:'',data:bookmarkData},{}).then(res => {
				onInitData();
				props.onLoadData("dc");
				props.onAlert("success","선택한 BOOKMARK 가 삭제 되었습니다.");
			});	
		} else {
			props.onAlert("error","삭제 할 BOOKMARK를 선택해주세요.");
		}
	}
  
  	const onChangeDeclare = (value,name) =>{
		if(value) {
			//setSelectVal({'value':value.value,'label':value.label});
			//console.log("declare:",declare);
			//1. 선택값 전달 
			setDeclareBookmark({'value':value.value,'label':value.label});
			//2. 선택값 체크 
			var view ='N';
			if(name === 'card') {
				if(declare.length > 0 && value.value !== '0') { 
					declare.map((data)=> {
						if((allCheck && !data.bookmark_checked) || (allCheck && data.bookmark_checked === 'Y')) {
							view = 'Y';
						}});
					
					if( view === 'Y') {
						axios.post("/shipper/getUserDeclareBookmark",{user_no:props.user?props.user.user_no:'',seq:value.value},{}).then(res => { 
							let declare_data_merge = declare;
							declare.map((data,key) => {
								if((allCheck && !data.bookmark_checked) || (allCheck && data.bookmark_checked === 'Y')) {
									declare_data_merge[key] = {
										...data[key],
										'bookmark_checked':'Y',
										'declare_num':res.data[0].declare_num?res.data[0].declare_num:data.declare_num,
										'declare_div_load_yn':res.data[0].declare_div_load_yn?res.data[0].declare_div_load_yn:data.declare_div_load_yn,
										'declare_pack_set_code':res.data[0].declare_pack_set_code?res.data[0].declare_pack_set_code:data.declare_pack_set_code,
										'declare_div_load_no':res.data[0].declare_div_load_no?res.data[0].declare_div_load_no:data.declare_div_load_no,
										'declare_goods_desc':res.data[0].declare_goods_desc?res.data[0].declare_goods_desc:data.declare_goods_desc,
										'declare_pack_num':res.data[0].declare_pack_num?res.data[0].declare_pack_num:data.declare_pack_num,
										'declare_pack_type':res.data[0].declare_pack_type?res.data[0].declare_pack_type:data.declare_pack_type,
										'declare_weight':res.data[0].declare_weight?res.data[0].declare_weight:data.declare_weight,
										'declare_pack_set_num':res.data[0].declare_pack_set_num?res.data[0].declare_pack_set_num:data.declare_pack_set_num,
										'declare_pack_set_type':res.data[0].declare_pack_set_type?res.data[0].declare_pack_set_type:data.declare_pack_set_num,
										'declare_customs_date':res.data[0].declare_customs_date?res.data[0].declare_customs_date:data.declare_customs_date,
									}
								}
							});
							props.mergeData({'declarelist':declare});
							setDeclare(declare_data_merge);
							setColl(true);
							//props.setWindow(true);
						});
					} else {
						setDeclareBookmark({'value':'0','label':''});
						props.onAlert("error","BookMark 적용 할 대상을 선택해주세요.");
					}
				} 
			} else {
				if(declareInput.length>0 && value.value !== '0') {
					declareInput.map((data)=> {
						if((allCheckI && !data.bookmark_checked) || (allCheckI && data.bookmark_checked === 'Y')) {
							view = 'Y';
					}});
					if(view === 'Y') {
						axios.post("/shipper/getUserDeclareBookmark",{user_no:props.user?props.user.user_no:'',seq:value.value},{}).then(res => { 
							let declare_data_merge = declareInput;
							declareInput.map((data,key) => {
								if((allCheckI && !data.bookmark_checked) || (allCheckI && data.bookmark_checked === 'Y')) {
									declare_data_merge[key] = {
										...data[key],
										'bookmark_checked':'Y',
										'declare_num':res.data[0].declare_num?res.data[0].declare_num:data.declare_num,
										'declare_div_load_yn':res.data[0].declare_div_load_yn?res.data[0].declare_div_load_yn:data.declare_div_load_yn,
										'declare_pack_set_code':res.data[0].declare_pack_set_code?res.data[0].declare_pack_set_code:data.declare_pack_set_code,
										'declare_div_load_no':res.data[0].declare_div_load_no?res.data[0].declare_div_load_no:data.declare_div_load_no,
										'declare_goods_desc':res.data[0].declare_goods_desc?res.data[0].declare_goods_desc:data.declare_goods_desc,
										'declare_pack_num':res.data[0].declare_pack_num?res.data[0].declare_pack_num:data.declare_pack_num,
										'declare_pack_type':res.data[0].declare_pack_type?res.data[0].declare_pack_type:data.declare_pack_type,
										'declare_weight':res.data[0].declare_weight?res.data[0].declare_weight:data.declare_weight,
										'declare_pack_set_num':res.data[0].declare_pack_set_num?res.data[0].declare_pack_set_num:data.declare_pack_set_num,
										'declare_pack_set_type':res.data[0].declare_pack_set_type?res.data[0].declare_pack_set_type:data.declare_pack_set_num,
										'declare_customs_date':res.data[0].declare_customs_date?res.data[0].declare_customs_date:data.declare_customs_date,
									}
								}
			
							});
							//props.mergeData({'declarelist':declare});
							setDeclareInput(declare_data_merge);
							//setColl(true);		    
						});
					} else {
						//setDeclareBookmark({'value':'0','label':''});
						props.onAlert("error","BookMark 적용 할 대상을 선택해주세요.");
					}
				} 
			}
		}else {
			setDeclareBookmark({'value':null,'label':null});
			let list = declare;
			let listMerge=list;
			list.map((data,key)=>{//console.log("LL:",res.data[0]);
				if(data.bookmark_checked === "Y") {
					listMerge[key] = {...list[key],'bookmark_checked':'Y'};
					listMerge[key] = {...list[key],'declare_num':null};
					listMerge[key] = {...list[key],'declare_div_load_yn':null};
					listMerge[key] = {...list[key],'declare_pack_set_code':null};
					listMerge[key] = {...list[key],'declare_div_load_no':null};
					listMerge[key] = {...list[key],'declare_goods_desc':null};
					listMerge[key] = {...list[key],'declare_pack_num':null};
					listMerge[key] = {...list[key],'declare_pack_type':null};
					listMerge[key] = {...list[key],'declare_weight':null};
					listMerge[key] = {...list[key],'declare_pack_set_num':null};
					listMerge[key] = {...list[key],'declare_pack_set_type':null};
					listMerge[key] = {...list[key],'declare_customs_date':null};
				}
			});
			setDeclareInput(listMerge);
			props.mergeData({'declarelist':listMerge});



		}
	}
  
  	const onAllCheck =()=> { 
		let list = declare;
		var vVal = 'N';
		if(allCheck) {
			vVal = 'N';
		} else {
			vVal = 'Y';
		}
		declare.map((data,key)=>
		list[key] = {...data,'bookmark_checked':vVal});
		setDeclare(list);
		setAllCheck(!allCheck);
	}
	const onAllCheckI =()=> { 
		let list = declareInput;
		var vVal = 'N';
		if(allCheckI) {
			vVal = 'N';
		} else {
			vVal = 'Y';
		}
		declareInput.map((data,key)=>
		list[key] = {...data,'bookmark_checked':vVal});
		setDeclareInput(list);
		setAllCheckI(!allCheckI);
	}
  
  
	const onFileupload = (event,name) => {

		let fileObj = event.target.files[0];
		setFileUploadYn(fileObj);

		if (!fileObj) {
			setFileUploadYn(null);
			setFileUploadMsg(null);
			props.onAlert("error","No file uploaded");
			return false; 
		}
			
		if (!(fileObj.type === "application/vnd.ms-excel" || fileObj.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ) ) { 
			props.onAlert("error","nknown file format. Only Excel files are uploaded!");
			return false; 
		}
			
		//just pass the fileObj as parameter 
		ExcelRenderer(fileObj, (err, resp) => {

			let newRows = [];
			let ErrRows = [];
				
			if (err) { 
				alert(err); 
			} else {

				if(resp.rows.slice(1).length > 0 && resp.rows.slice(1).length <= 999) {
					resp.rows.slice(1).map((data,key)=> {
						
						if(data[0]!== undefined) {
							var seq = 1;
							var dNum = data[0]?String(data[0]).toUpperCase():'';
							var pType = data[1]?String(data[1]).toUpperCase():'';
							var pNum = data[2]?String(data[2]):'';
							var weight = data[3]?String(data[3]):'';
							var load_yn = data[4]?String(data[4]).toUpperCase():'';
							var load_no = data[5]?String(data[5]):'';
							var set_code = data[6]?String(data[6]).toUpperCase():'';
							var pack_set_type = data[7]?String(data[7]).toUpperCase():'';
							var set_num = data[8]?String(data[8]):'';

							
							newRows.push({
								declare_seq:seq,
								declare_num:dNum,
								declare_pack_type:pType,
								declare_pack_num:pNum,
								declare_weight:weight,
								declare_div_load_yn:load_yn,
								declare_div_load_no:load_no,
								declare_pack_set_code:set_code,
								declare_pack_set_type:pack_set_type,
								declare_pack_set_num:set_num,
								bookmark_checked:'Y'
							});
							seq++;
						} else {
							var seq = 1;
							ErrRows.push({'declare_seq':seq,'declare_num':data[0]});
							seq++;
						}
						
					});
					if(name ==='MAIN') {
						setDeclare(newRows);
						setColl(true);
						//props.setWindow(true);
					} else {
						setDeclareInput(newRows);
					}
					props.mergeData({'declarelist':newRows});
					var msg = resp.rows.slice(1).length+" 건 데이터가 업로드 되었습니다("+newRows.length+"건 성공/"+ErrRows.length+"건 에러)";
					setFileUploadMsg("["+newRows.length+"건 성공 / "+ErrRows.length+"건 에러] Upload Success! ");
					props.onAlert("success",msg);
				} else {
					props.onAlert("error","Row Data 가 존재 하지 않거나 갯수(999) 를 초과 하였습니다. ");
				}
			}

		});

	}; 
	
	const onDownloadHandle = () => {
		
		/* axios.post("/loc/downloadSample",{service:'D'}).then(
			res => {
			Filesaver.saveAs(new Blob([res.data]),"declare_sample.xlsx")
			});*/
		
		axios.post("/loc/downloadSample",{service:'D'},{responseType:'arraybuffer',headers:{'Content-Type':'application/json','Accept':'application/xlsx'}}).then(res => { 
			const url = window.URL.createObjectURL(new Blob([res.data]));
			const link = document.createElement('a');
			link.href=url;
			link.setAttribute('download','declare_sample.xlsx');
			document.body.appendChild(link);
			link.click();
		});
		    
	}
    
  	return (
		<>
	    <Row id="Declare">
		    <Col xl="12" lg="12">
		        <Card style={{zIndex:'4',border:'1px solid silver',borderRadius:'10px'}}>
					<CardBody className="pt-3 pb-0" >  
						<Row className="pb-2">
							<Col xl="8" className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>EXPORT LISENCE
								<Button className="pl-1" color="link" id="declareview" onClick={toggle.bind(this, 'S')}><i className="fa fa-pencil-square-o fa-2x"/></Button>
								<UncontrolledTooltip delay={0} target="declareview">Input</UncontrolledTooltip>
							</Col>
							<Col>
								<Row>
									<Col className="col-10 pr-0" style={{zIndex:'100000'}}>
										<Select 
											className="react-select react-select-primary"
											classNamePrefix="react-select"
											name="declarebookmark"
											value={{value:declareBookmark.value,label:declareBookmark.label}}
											onChange={(value)=>onChangeDeclare(value,'card')}
											options={bookmark}
											placeholder="선택"
											ref={declareFocus}
											isClearable={declareBookmark.value?true:false}/>
									</Col>
									<Col className="col-2 pl-auto pr-auto">
										<Button className="pl-0 pr-0" color="link" id="declarebookmark" onClick={toggle.bind(this, 'B')}><i className="fa fa-bookmark-o fa-2x" /></Button>
										<UncontrolledTooltip delay={0} target="declarebookmark">Bookmark</UncontrolledTooltip>
									</Col>			
								</Row>
							</Col>
		   				</Row>
						<Collapse isOpen={coll}>
						{/* <div style={divider}/> */}
							{/* 보이는 영역 */}
							<hr className="mt-0"/>
							<Row>
								<Col xl="6" className="mr-auto mb-2 col-12">
									<Row>
										<Col xl="2" className="col-2 ml-2 mr-0 pr-0">
											<FormGroup check className="mt-2">
												<Label check style={{paddingLeft:'28px'}}>
												<Input
													type="checkbox"  checked={allCheck} 
													onChange = {()=>onAllCheck()}/>전체
													<span className="form-check-sign" />
												</Label>
											</FormGroup>
										</Col>
										<Col xl="8" className="col-8 pr-0">
											<FormGroup className="mb-0">
												<CustomInput 
													type="file" 
													id="fileupload_declare" 
													name="fileupload_declare" 
													onChange={(event)=>onFileupload(event,'MAIN')}/>
												<FormText>Excel File Upload (*.xlsx)&nbsp;&nbsp;&nbsp;<font color="green">{fileUploadYn?fileUploadMsg:''}</font></FormText>
											</FormGroup>
										</Col>
										<Col className="col-1 ml-2 pl-0">
											<Button className="btn-link p-0" color="default" onClick={onDownloadHandle}><i className="fa fa-file-excel-o fa-2x" /><span style={{fontSize:'1px'}}>SAMPLE</span></Button>
										</Col>
									</Row>
								</Col>
								<Col className="pt-0 pb-2">
									<ButtonGroup className="pull-right">
										<Button className="pt-0 pb-0" color="default" outline size="sm" onClick={onAddCntr}>추가</Button>
									</ButtonGroup>
								</Col>
							</Row>
							<Row>
								<Col>
								{(declare.length > 0) && 
									declare.map((element, key)=>{
										return (
											<Declare 
												key={key} 
												zindex={declare.length-key}
												codelist={packCodeList}
												size="sm"
												view="Y"
												checked={allCheck}
												loadFormData={element}
												deleteRow={(data)=>onDeleteRow(key,data)} 
												propsData={(data)=>onDeclareList(key,data)} {...props} />
										);
									})}
								</Col>
		      		 		</Row>
		        		</Collapse>
					</CardBody>
					<Col className="text-center col-12 p-0" onClick={() => setColl(!coll)}>        
						<Button
							className="p-0"
							color="link"
							id="cntrmore"
							onClick={() => setColl(!coll)}
							style={{height:'21px',marginBottom:'4px',width:'100%'}}>
							{coll?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
						</Button>
						<UncontrolledTooltip delay={0} target="cntrmore">{coll?'Close':'Open'}</UncontrolledTooltip>
					</Col>
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
		<Modal isOpen={open} toggle={toggle} size="xl">
			<ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
				<ModalBody>
				{bookmarkView?
					<DeclareBookmark 
						bookmark = {bookmark} 
						loadFormData={bookmarkData} 
					// code={cntrSztp} 
						pack={packCodeList}
						propsData = {onBookMarkData}
						onPropsDeclarebookmarkDelete={onBookDeclareDelete} {...props}
					/>
					:<>
						<Row className="mb-2">
							<Col xl="4" className="ml-auto col-12 pr-0" style={{zIndex: declareInput.length+1}}>
								<Select 
									className="react-select react-select-primary"
									classNamePrefix="react-select"
									name="declarebookmark"
									//value={{value:declareBookmark.value,label:declareBookmark.label}}
									onChange={(value)=>onChangeDeclare(value,'input')}
									options={bookmark}
									placeholder="선택"/>
							</Col>
						</Row>
						<Row>
							<Col xl="6" className="mr-auto mb-2 col-12">
								<Row>
									<Col xl="2" className="col-3 ml-2 mr-0 pr-0">
										<FormGroup check className="mt-2">
											<Label check>
												<Input 
													type="checkbox"
													checked={allCheckI} 
													onChange = {()=>onAllCheckI()}
													/>전체
												<span className="form-check-sign" />
											</Label>
										</FormGroup>
									</Col>
									<Col xl="8" className="col-8 pr-0">
											<FormGroup className="mb-0">
											<CustomInput type="file" id="fileupload_declare2" name="fileupload_declare2" onChange={(event)=>onFileupload(event,'INPUT')}
												/>
											<FormText>Excel File Upload (*.xlsx)</FormText>
											</FormGroup>
									</Col>
									<Col className="col-1 ml-2 pl-0">
										<Button className="btn-link p-0" color="default" onClick={onDownloadHandle}><i className="fa fa-file-excel-o fa-2x" /><span style={{fontSize:'1px'}}>SAMPLE</span></Button>
									</Col>
								</Row>
							</Col>
							<Col className="pt-0 pb-2">
								<ButtonGroup className="pull-right">
									<Button className="pt-0 pb-0" color="default" outline size="sm" onClick={onAddSingleCntr}>추가</Button>
								</ButtonGroup>
							</Col>
						</Row>
						<Row>
							{(declareInput.length > 0) && declareInput.map((element, key)=>{
								return (
									<Declare 
										key={key} 
										zindex={declareInput.length-key}
										checked={allCheck}
										codelist={packCodeList}
										loadFormData={element}
										deleteRow={(data)=>onDeleteSingleRow(key,data)} 
										propsData={(data)=>onCntrSingleList(key,data)} 
										{...props}/>
								);
							})} 
						</Row>
					</>}
					
			</ModalBody>
			
			<ModalFooter>
				<Button color="primary" onClick={onInitData}>NEW</Button>{' '}
				{bookmarkView?
					<>
						<Button color="primary" onClick={onSaveBookmark}>SAVE</Button>
						<Button color="primary" onClick={onBookDeclareDelete}>DELETE</Button>
					</>
				:<Button color="primary" onClick={()=>onApplyData()}>APPLY</Button>}{' '}
				<Button color="secondary" onClick={onCancleWindow}>CANCLE</Button>
			</ModalFooter>
		</Modal>
		</>
	);
});

export default ContainerCard;