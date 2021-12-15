import React, {useState, createRef, useEffect} from "react";
import {Row, Col, UncontrolledTooltip, Input, Button, Badge, Tooltip} from "reactstrap";

import Editor from 'react-rte'

import * as validation from 'components/common/validation.js';
import axios from "axios";
import {CustomDatePicker} from 'components/CustomInput/CustomInput.js';
                      
const toolbarConfig = {
    display: ['INLINE_STYLE_BUTTONS','BLOCK_TYPE_BUTTONS','LINK_BUTTONS','BLOCK_TYPE_DROPDOWN','HISTORY_BUTTONS'],
    INLINE_STYLE_BUTTONS:[
        {label:'Bold',style:'BOLD',className:'custom-css-class'},
        {label:'Italic',style:'ITALIC'},
        {label:'Underline',style:'UNDERLINE'},
    ],
    BLOCK_TYPE_DROPDOWN: [
        {label:'Normal',style:'unstyled'},
        {label:'Heading Large',style:'header-one'},
        {label:'Heading Medium',style:'header-two'},
        {label:'Heading Small',style:'header-three'},
    ],
    BLOCK_TYPE_BUTTONS:[
        {label:'UL',style:'unordered-list-item'},
        {label:'OL',style:'ordered-list-item'},
        
    ]
}
export default function BoardWrite(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState(Editor.createEmptyValue());
    const [boardId, setBoardId] = useState("");
    const [files, setFiles] = useState([]); 
    const [user,setUser] = useState(props.user);
    const [tooltipOpen,setTooltipOpen] = useState(false);
    const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate()+7)))
    const fileInput = createRef();

    
    useEffect(()=> {
        setUser(props.user)
        if(props.rowData) {
            console.log(props.rowData)
            setContent(Editor.createValueFromString(props.rowData.content,'html'));
            setTitle(props.rowData.title);
            setBoardId(props.rowData.board_id);
            setEndDate(props.rowData.board_to);
            if(props.rowData.attach_files) {
                setFiles(props.rowData.attach_files.map((value,index)=> {return {name:value.real_file_name,boardId:value.board_id,seq:value.board_file_seq,rename:value.file_name,path:value.file_path}}))
            }
        }
    },[]);
    
    const handleClick = () => {
        if(files.length===2) {
            props.onAlert("error", "첨부파일은 최대 2개 까지 업로드 가능합니다.");
            return;
        }
        fileInput.current.click();
    };
    const handleImageChange = (e) => {
        
        e.preventDefault();
        
        if(!e.target.files[0]) {
            return false;
        }

        if(!/\.(hwp|doc|docx|ppt|pptx|xls|xlsx|txt|csv|jpg|jpeg|gif|png|bmp|pdf)$/i.test(e.target.files[0].name)) {
            props.onAlert('error', '적절하지 않은 파일 형식입니다.' );
            return false;
        }
        
        if(e.target.files[0].size > 200000) {
            props.onAlert('error', '파일의 크기가 너무 큽니다.' );
            return false;
        }
        props.onAlert('success', '업로드 완료' );
        setFiles([...files,e.target.files[0]])
    };
    const saveNotice = () => {
        if(user.user){
            if(title.length === 0) {
                props.onAlert('error', '제목을 입력해주세요.' );
                return;
            }
            if(content.length === 0) {
                props.onAlert('error', '내용을 입력해주세요.' );
                return
            }

            axios.post("/com/saveNotice", {
                 userno:user.user.user_no
                ,username:user.user.user_name
                ,title:title
                ,content:content.toString('html')
                ,weidong:true
                ,boardId:boardId
                ,boardEnd:endDate
            }).then(
                res=> {
                    if(res.statusText ==="OK") {
                        if(res.data) {
                            if(files) {
                                const formData = new FormData();
                                formData.append("boardId",res.data.board_id);
                                formData.append("userno", user.user.user_no);
                                formData.append("file1",files[0]);
                                formData.append("file2",files[1]);
                                axios.post("/com/saveNoticeFiles",formData).then(
                                    res=>{
                                        if(res.statusText==="OK") {
                                            if(res.data && res.data.success === 1) {
                                                props.onAlert('success','저장이 완료 되었습니다.');
                                                props.goToList();
                                            }else {
                                                props.onAlert('error',res.data.result);
                                            }
                                        }
                                    }
                                )
                            }else {
                                props.onAlert('success','저장이 완료 되었습니다.');
                                props.goToList();
                            }
                        }
                    }else {
                        props.onAlert('error','지금은 저장 할 수 없습니다.')
                    }
                }
            )
        }
    }      
    const handleRemove = (num) => {
        if(files[num-1].rename) {
            axios.post('/com/boardFileDelete',{param:files[num-1]}).then(
                res => {
                    if(res.statusText==="OK") {
                        if(res.data==="success") {
                            props.onAlert('success','삭제가 완료되었습니다.');
                            setFiles(files.filter((value,index)=> index === num))
                        }else {
                            props.onAlert('error',res.data);
                        }
                    }
                }
            )
        }else {
            setFiles(files.filter((value,index)=> index === num))
        }
        


        fileInput.current.value = null;
    };
    const onChangeDate = (date) => {
        if(date < new Date()) {
            props.onAlert('error','과거 날짜 혹은 오늘날짜로 설정 하실 수 없습니다.');
            return;
        }

        setEndDate(date);
    }
    return(
        <>
        
            <Row>
                <Col className="ml-4" style={{borderBottom:'solid 1px'}}>
                    <i id="back" className="fa fa-angle-left fa-2x mb-3" onClick={()=> props.goToList()}/>
                    <UncontrolledTooltip placement="bottom" target="back">
                        목록으로
                    </UncontrolledTooltip>
                </Col>

            </Row>
            <Row className="mt-4">
                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                    <Input placeholder="제목" value={title} onChange={(e)=>setTitle(e.target.value)}></Input>
                </Col>
                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                    <Row>
                        <Col className='search_option--number--text' xl="3" lg="3" md="3" sm="3" xs="3">
                            공지 기간
                        </Col>
                        <Col xl="9" lg="9" md="9" sm="9" xs="9">
                            <CustomDatePicker
                                id="endDate"
                                dateFormat="YYYY-MM-DD"
                                timeFormat={false}
                                value={endDate}
                                onChange={(date)=>onChangeDate(date)}/>
                        </Col>
                    </Row>
                </Col>
                <Col xl="4" lg="4" md="6" sm="6" xs="12">
                    <Row>
                        <Col xl="6" lg="6" md="6" sm="6" xs="6">
                            <input style={{display:'none'}} type="file" onChange={handleImageChange} ref={fileInput} />
                            <Button
                                id="btn1"
                                className="btn-round"
                                color="default"
                                outline
                                onClick={handleClick}>
                                    첨부 파일
                            </Button>
                            <Tooltip placement="top" isOpen={tooltipOpen} target="btn1" toggle={() => setTooltipOpen(!tooltipOpen)}>
                                <Col>
                                    <Row>
                                        <Col>
                                            <span style={{fontWeight:'bold', fontSize:'1rem'}}>허용 파일</span><span> : hwp, doc, docx, ppt, pptx, xls, xlsx, txt, csv, jpg, jpeg, gif, png, bmp, pdf </span>
                                            <br></br>
                                            <span style={{fontWeight:'bold', fontSize:'1rem'}}>파일 크기 제한</span><span> : 20MB</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Tooltip>
                        </Col>
                        <Col xl="6" lg="6" md="6" sm="6" xs="6">
                            {
                                files.map((value,index) => {
                                    return(
                                        <Row key={index}>
                                            <Col xl="12" lg="12" md="12" sm="12" xs="12">
                                                <Badge>{validation.textLengthOverCut(value.name,15,'....')}</Badge>
                                                <Button
                                                    color="danger"
                                                    className="btn-round btn-link"
                                                    onClick={() => handleRemove(index+1)}>
                                                    <i className="fa fa-times" />
                                                </Button>
                                            </Col>
                                        </Row>
                                    )
                                })
                            }
                        </Col>
                    </Row>
                    
                </Col>
               
            </Row>
            <Row className="mt-4">
                <Col>
                    <Editor
                        value={content}
                        onChange={(e)=> {setContent(e)}}
                        toolbarConfig={toolbarConfig}>
                    </Editor>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Button onClick = {()=> saveNotice()}>저장</Button>
                </Col>
            </Row>

        </>
    )
}




