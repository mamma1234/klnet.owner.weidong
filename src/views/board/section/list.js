import React, { useState, useEffect } from 'react';
import {Row, Col, CardBody, ListGroup, ListGroupItem, Button, Collapse, Badge, Input, InputGroup, InputGroupAddon, InputGroupText, Modal} from "reactstrap";
import axios from "axios";
import AddBoard from 'views/board/section/write'
import Filesaver from 'file-saver';
function ListItem(props) {
    const [value, setValue] = useState(props.value);
    const [open ,setOpen] = useState(false);
    const [user,setUser]= useState(props.user);
    
    useEffect(() => {
        setValue(props.value);
    },[props.value])
    useEffect(() => {
      setUser(props.user)
    },[props.user]);
    useEffect(() => {
        if(value.board_id===props.num) {
            setOpen(true)
        }else {
            setOpen(false);
        }
    },[props.num])
    useEffect(() => {
        if(open) {
            axios.post("/api/updateBoardHits",{board_id:value.board_id}).then(
                res=>{
                    
                    if(res.data === 1) {
                        setValue(prevState => {
                            return {...prevState, hit_count:String(Number(prevState.hit_count)+1)}
                        });
                    }
                }
            )
        }
    },[open])
    
    const onButtonClick = () => {
        if(value.board_id===props.num) {
            props.openNum("")
        }else {
            props.openNum(value.board_id);
        }
    }
    const fileDownload = (value) => {
    
        axios.post("/api/boardFIleDownLoad",{fileName:value.file_name,filePath:value.file_path},{responseType:"arraybuffer"}).then(
            res => {
            Filesaver.saveAs(new Blob([res.data]),value.real_file_name)
            });
    }
    return (
            <Col>
                <Row onClick={() => onButtonClick()}>
                    <Col xl="1" lg="1" md="1" sm="1" xs="1">
                        <span>{value.num}{value.new_notice==='Y'&&<Badge pill color="warning">N</Badge>}</span>
                    </Col>
                    <Col xl="8" lg="8" md="8" sm="8" xs="8">
                        <span>{value.title}{value.attach_files && <i className="fa fa-file-text"/>}</span>
                    </Col>
                    <Col xl="2" lg="2" md="2" sm="2" xs="2">
                        <span>{value.insert_date}</span>
                    </Col>
                    <Col xl="1" lg="1" md="1" sm="1" xs="1">
                        <Button onClick={() => onButtonClick() } close><i className={open===true?"fa fa-minus":"fa fa-plus"} color="black"/></Button>
                    </Col>
                </Row>
                <Collapse isOpen={open}>
                    <Row style={{borderTop:'solid 1px'}}>
                        <Col>
                            <CardBody>
                                <Col>
                                    <Row>
                                        <Col xl="4" lg="4" md="4" sm="4" xs="4">
                                            <Row>
                                                <Col style={{textAlignLast:'right'}}>
                                                    <span style={{fontWeight:'bold'}}>작성자</span>
                                                </Col>
                                                <Col>
                                                    <span>{value.author_name}</span>
                                                </Col>
                                            </Row>
                                            
                                        </Col>
                                        <Col xl="4" lg="4" md="4" sm="4" xs="4">
                                            <Row>
                                                <Col style={{textAlignLast:'right'}}>
                                                    <span style={{fontWeight:'bold'}}>조회수</span>
                                                </Col>
                                                <Col>
                                                    <span>{value.hit_count}</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xl="4" lg="4" md="4" sm="4" xs="4">
                                            {
                                                user.user?(
                                                <Row>
                                                <Col style={{textAlignLast:'right'}}>
                                                    {
                                                    (value.user_no===user.user.user_no)&&
                                                    <Button onClick={()=> props.rowClick(value)} size="sm" color="primary" outline>수정</Button>
                                                    }
                                                </Col>
                                                <Col style={{textAlignLast:'left'}}>
                                                    {
                                                    (value.user_no===user.user.user_no)&&
                                                    <Button onClick={()=> props.ConfirmOn(value)} size="sm" color="default" outline>삭제</Button>
                                                    }
                                                </Col>
                                            </Row>
                                                ):null
                                            }
                                            
                                        </Col>
                                    </Row>
                                    <Row>
                                        <CardBody>
                                            <Col>
                                                <Row>
                                                    <Col>
                                                        <div dangerouslySetInnerHTML={{__html:value.content}}/>
                                                    </Col>
                                                </Row>
                                                {value.attach_files &&  <>
                                                    <Row>
                                                        <Col>
                                                            <hr style={{borderTop:'solid 1px'}}></hr>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            {value.attach_files.map((element,idx) => {
                                                                return(
                                                                    <Button color="default" outline size="sm" key={idx} onClick={()=> fileDownload(element)}>
                                                                        {element.real_file_name}
                                                                    </Button>
                                                                )
                                                            })}
                                                        </Col>
                                                    </Row>
                                                </> }
                                            </Col>
                                        </CardBody>
                                    </Row>
                                </Col>
                            </CardBody>
                        </Col>
                    </Row>
                </Collapse>
            </Col>
        
    )
}


export default function BoardList(props) { 
    const [data, setData] = useState([]);
    const [num, setNum] = useState(0);
    const [gubun, setGubun] = useState("0");
    const [keyword,setKeyWord] = useState("");
    const [Write, setWrite] = useState(false);
    const [user, setUser] = useState("");
    const [rowData,setRowData] = useState(null);
    const [ConfirmOpen,setConFirmOpen] = useState(false);
    const [deleteData, setDeleteData] = useState(null);
    const [writeButtonView, setWriteButtonView] = useState(false)
    useEffect(() => {
        props.fncClickMenu('게시판')
        onSearch();
    },[]);

    useEffect(() => {
        if(props.location.state) {
            setNum(props.location.state.param.board_id);
        }
    },[props.location]);
    useEffect(()=> {
      setUser(props)
    },[props]);

    useEffect(()=> {
        
        if(user.user) {
            if(user) {
                axios.post("/com/writeAuthority",{}).then(
                    res=> {
                        if(res.statusText ==="OK") {
                            if(res.data.length > 0) {
                                res.data.forEach(element => {
                                    if(element.KLNET_ID === user.user.klnet_id) {
                                        setWriteButtonView(true);
                                    }
                                });
                            }else {
                                setWriteButtonView(false);
                            }
                        }else {
                            setWriteButtonView(false);
                        }
                    }
                )
            }else {
                setWriteButtonView(false);
            }
        }else {
            setWriteButtonView(false);
        }
    },[user.user])
    useEffect(()=> {
        onSearch();
        if(Write) {
            setRowData(null);
        }
    },[Write]);
    

    const onSearch = () => {
        setData([])
        axios.post("/api/notice",{service:'weidong', gubun:gubun, keyword:keyword}).then(
            res=> {
                if(res.statusText ==="OK") {
                    if(res.data.length > 0) {
                        setData(res.data);
                    }else {
                        setData([]);
                    }
                }
            }
        )
    };

    const onWrite = () => {
        if(props.user) {
            setWrite(true)
        }
    };

    const onRowClick = (data) => {
        setRowData(data);
        setWrite(true);
    };

    const onConfirmOpen = (data) => {
        setDeleteData(data);
        setConFirmOpen(true);
    };

    const onConfirm = () => {
        axios.post("/com/deleteBoardWithFile",{param:deleteData}).then(
            res=> {
                if(res.statusText ==="OK") {
                    if(res.data==="success"){

                        props.onAlert('success','삭제가 완료 되었습니다.');
                        onSearch();
                    }
                }
            }
        )
        setConFirmOpen(false);
    }

    return(
        <>
        <Col className="ml-auto mr-auto mt-3" xl="9" lg="9" md="9" sm="9" xs="9">
            <Row>
                <Col>
                    <CardBody style={{marginTop:'3%',textAlignLast:'center'}}><h4>NOTICE<i className="fa fa-bullhorn" aria-hidden="true"/></h4></CardBody>
                </Col>
            </Row>
            {!Write?(
                <>
                    <Row>
                        <Col className="ml-3 mb-3" xl="5" lg="5" md="5" sm="5" xs="5">
                            <Row>
                                <Col style={{padding:0}} xl="4" lg="4" md="4" sm="4" xs="4">
                                    <Input value={gubun} onChange={(e) => setGubun(e.target.value)} type="select" style={{fontSize:'8px'}}>
                                        <option value="0">구분</option>
                                        <option value="1">제목+내용</option>
                                        <option value="2">작성자</option>
                                    </Input>
                                </Col>
                                <Col>
                                    <InputGroup style={{padding:0}}>
                                        <Input value={keyword} onChange={(e) => {setKeyWord(e.target.value)}} type="text"/>
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText>
                                                <Button close onClick = {() => onSearch()}><i className="fa fa-search"/></Button>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ListGroup>
                                <ListGroupItem>
                                    <Col>
                                        <Row>
                                            <Col xl="1" lg="1" md="1" sm="1" xs="1">
                                                <span>순번</span>
                                            </Col>
                                                
                                            <Col xl="8" lg="8" md="8" sm="8" xs="8">
                                                <span>제목</span>
                                            </Col>
                                            <Col xl="2" lg="2" md="2" sm="2" xs="2">
                                                <span>작성일</span>
                                            </Col>
                                            <Col xl="1" lg="1" md="1" sm="1" xs="1">
                                                
                                            </Col>
                                        </Row>
                                    </Col>
                                </ListGroupItem>
                                {data.length > 0 &&
                                    <>
                                    {data.map((value,index) => {
                                        return(
                                            <ListGroupItem key={index} action>
                                                <ListItem value={value} openNum={(e) => setNum(e)} num={num} user={user} rowClick={(data)=> onRowClick(data)} ConfirmOn={(data)=> onConfirmOpen(data)} />
                                            </ListGroupItem>
                                        )
                                    })}
                                </>}
                            </ListGroup>
                        </Col>
                                
                    </Row>
                    {writeButtonView &&
                    <Row>
                        <Col className="ml-auto mt-1">
                            <Button style={{float:'right', color:'black'}} color="secondary" onClick={()=> onWrite()} outline><i className="fa fa-pencil-square-o"/>글쓰기</Button>
                        </Col>
                    </Row>}
                        
                </>
            ):(
                <AddBoard goToList={() => setWrite(false)} onAlert={props.onAlert} rowData={rowData} user={user}/>
            )}
                    
            </Col>
            <Modal
                size="sm"
                isOpen={ConfirmOpen}
                toggle={() => setConFirmOpen(false)}
            >
                <div className="modal-header no-border-header">
                <button
                    className="close"
                    type="button"
                    onClick={() => setConFirmOpen(false)}
                >×</button>
                </div>
                <div className="modal-body text-center pl-0 pr-0">
                <h5>해당 공지를 삭제 하시겠습니까?</h5>
                </div>
                <div className="modal-footer">
                <div className="left-side">
                <Button className="btn-link" color="danger" type="button" onClick={()=> {onConfirm()}}>Yes</Button>
                </div>
                <div className="divider" />
                <div className="right-side">
                    <Button
                    className="btn-link"
                    color="default"
                    type="button"
                    onClick={() => setConFirmOpen(false)}
                    >
                    No
                    </Button>
                </div>
                </div>
            </Modal>
        </>
    )
}