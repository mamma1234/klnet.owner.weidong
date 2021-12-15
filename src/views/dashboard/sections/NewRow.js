import React,{useState, useEffect} from "react";
// reactstrap components

import { Link } from "react-router-dom";

import { Row,Col,Card, Badge} from "reactstrap";
//import 'semantic-ui-css/semantic.min.css'
import 'semantic-ui-css/semantic.min.css'
import axios from "axios"
// import './dashboard.css'
import * as validation from 'components/common/validation.js';
const styles = {
    headerFontStyle:{
      fontSize:'15px',
      color:'#696969',
      fontWeight:'600',
      
    },
    gridTitle:{
      fontSize:'20px',
      color:'#696969',
      fontWeight:'bold'
    },
    progressText:{
      fontSize:'15px',
      color:'black',
      fontWeight:'bold',
    },
    gridCard:{
      zIndex:0,
      width:'100%',
      padding:'15px'
      // minHeight:'100%'
    },
    gridTitleRow:{
      textAlignLast:'center',
      width:'100%'
    },
    listText:{
      fontSize:'13px',
      color:'#696969',
    }
  
  };

export default function NewRow (props) {
    const [value, setValue] = useState(props.parameter!==null?props.parameter:[]);
    const [state, setState] = useState(props.state!==null?props.state:null);
    const [viewWidth,setViewWidth] = useState(props.viewWidth!==null?props.viewWidth:'12.5%');
    useEffect(() => {
        setValue(props.parameter!==null?props.parameter:[]);
        setState(props.state!==null?props.state:null);
        setViewWidth(props.viewWidth!==null?props.viewWidth:'12.5%');
        
    },[props]);
    return(
        <Row xl="12" lg="12" md="12" sm="12" xs="12">
            <Card className="no-transition" style={styles.gridCard}>
                <Row xl="12" lg="12" md="12" sm="12" xs="12" style={{margin:'1em 0'}} className="border solid 1px">
                    {/* BKG SAVE 단계 */}
                    {state.save &&
                    <Col style={{maxWidth:viewWidth}} className={value.p.status1===null?"step":"next"}>
                        {(value.p.user_no !== null&&value.p.bkg_no!==null&&value.p.bkg_date!=null&&value.p.status1!==null)?(
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <Link  to={{pathname: `/booking`, state: {user_no:value.p.user_no, bkg_no:value.p.bkg_no, bkg_date:value.p.bkg_date}}}>
                                            <i className={value.p.status1===null?"fa fa-floppy-o fa-3x text-secondary":"fa fa-floppy-o fa-3x text-primary"}/>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link  to={{pathname: `/booking`, state: {user_no:value.p.user_no, bkg_no:value.p.bkg_no, bkg_date:value.p.bkg_date}}}>
                                            <Badge color="primary">BKG SAVE</Badge>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link  to={{pathname: `/booking`, state: {user_no:value.p.user_no, bkg_no:value.p.bkg_no, bkg_date:value.p.bkg_date}}}>
                                            <span style={styles.progressText}>{value.p.bkg_no}</span>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link  to={{pathname: `/booking`, state: {user_no:value.p.user_no, bkg_no:value.p.bkg_no, bkg_date:value.p.bkg_date}}}>
                                            <span style={styles.progressText}>{value.p.status1}</span>
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>):
                        (<Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <i className={value.p.status1===null?"fa fa-floppy-o fa-3x text-secondary":"fa fa-floppy-o fa-3x text-primary"}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Badge color="primary">BKG SAVE</Badge>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <span style={styles.progressText}>{value.p.bkg_no}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <span style={styles.progressText}>{value.p.status1}</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>)}
                    </Col>}
                    
                    {/* BKG SEND 단계 */}
                    {state.send &&
                    <Col style={{maxWidth:viewWidth}} className={value.p.status2===null?"step":"next"}>
                        {(value.p.user_no !== null&&value.p.bkg_no!==null&&value.p.bkg_date!=null&&value.p.status2!==null)?(
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <Link to={{pathname: `/booking`, state: {user_no:value.p.user_no, bkg_no:value.p.bkg_no, bkg_date:value.p.bkg_date}}}>
                                            <i className={value.p.status2===null?"fa fa-paper-plane-o fa-3x text-secondary":"fa fa-paper-plane-o fa-3x text-primary"}/>   
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/booking`, state: {user_no:value.p.user_no, bkg_no:value.p.bkg_no, bkg_date:value.p.bkg_date}}}>
                                            <Badge className="ml-2 mr-2" color="primary">BKG SEND</Badge>&nbsp;<Badge color="primary">{value.p.status_cnt2}</Badge> 
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/booking`, state: {user_no:value.p.user_no, bkg_no:value.p.bkg_no, bkg_date:value.p.bkg_date}}}>
                                            <span style={styles.progressText}>{value.p.bkg_no}</span>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/booking`, state: {user_no:value.p.user_no, bkg_no:value.p.bkg_no, bkg_date:value.p.bkg_date}}}>
                                        <span style={styles.progressText}>{value.p.status2} </span>
                                        
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>):(
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <i className={value.p.status2===null?"fa fa-paper-plane-o fa-3x text-secondary":"fa fa-paper-plane-o fa-3x text-primary"}/>  
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Badge className="ml-2 mr-2" color="primary">BKG SEND</Badge>
                                        <Badge color="primary">{value.p.status_cnt2}</Badge>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>)}
                    </Col>}
                    {/* BKG 컨펌단계 */}
                    {state.confirm &&
                    <Col style={{maxWidth:viewWidth}} className={value.p.status3===null?"step":"next"}>
                        {(value.p.user_no !== null&&value.p.res_bkg_no!==null&&value.p.res_confirm_date!=null&&value.p.status3!==null)? (
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <Link to={{pathname: `/confirm`, state:{user_no:value.p.user_no, res_bkg_no:value.p.res_bkg_no, res_confirm_date:value.p.res_confirm_date}}}>
                                            <i className={
                                                value.p.status_name3==="Confirm"?"fa fa-check text-primary fa-3x"
                                                :value.p.status_name3==="Reject"?"fa fa-ban text-danger fa-3x"
                                                :value.p.status_name3==="Cancel"?"fa fa-ban text-danger fa-3x"
                                                :"fa fa-ellipsis-h fa-3x text-secondary"}/>
                                        </Link> 
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/confirm`, state:{user_no:value.p.user_no, res_bkg_no:value.p.res_bkg_no, res_confirm_date:value.p.res_confirm_date}}}>
                                            <Badge color="primary">{value.p.status_name3}</Badge>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/confirm`, state:{user_no:value.p.user_no, res_bkg_no:value.p.res_bkg_no, res_confirm_date:value.p.res_confirm_date}}}>
                                            <span style={styles.progressText}>{value.p.res_bkg_no}</span>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/confirm`, state:{user_no:value.p.user_no, res_bkg_no:value.p.res_bkg_no, res_confirm_date:value.p.res_confirm_date}}}>
                                            <span style={styles.progressText}>
                                                {value.p.status3} 
                                            </span>
                                        </Link>
                                    </Col>
                                </Row>
                                {(value.p.status_name3==="Confirm" && value.p.sr_no === null ) &&
                                <Row>
                                    <Col className="text-center">
                                        <Link 
                                            to={{
                                                pathname: `/srnew`, 
                                                state:{
                                                    res_bkg_no: value.p.res_bkg_no?value.p.res_bkg_no:null,
                                                    user_no: value.p.user_no?value.p.user_no:null,
                                                    sr_no:value.p.sr_no?value.p.sr_no:null, 
                                                    sr_date:value.p.sr_date?value.p.sr_date:null,
                                                    confirm_yn:'Y'
                                                    }
                                                }}>
                                            <Badge className="ml-2 mr-2">SR작성</Badge>
                                        </Link>
                                    </Col>
                                </Row>}
                            </Col>
                        </Row>):(
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <i className="fa fa-ellipsis-h fa-3x text-secondary"/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Badge color="primary">WAITING FOR CONFIRM</Badge>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>)}
                    </Col>}
                    {/* PICK UP 단계 */}
                    {state.pickup &&
                    <Col style={{maxWidth:viewWidth}} className={value.p.pick_up_time===null?"step":"next"}>
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <i className={value.p.pick_up_time===null?"fa fa-truck fa-3x text-secondary":"fa fa-truck fa-3x text-primary"}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Badge className="ml-2 mr-2" color="primary">EMPTY PICK UP</Badge>
                                    </Col>
                                </Row>
                                {value.p.pick_up_time!==null &&
                                <Row>
                                    <Col className="text-center">
                                        <span style={styles.progressText}>{value.p.pick_up_time_f}</span>
                                    </Col>
                                </Row>}
                            </Col>
                        </Row>    
                    </Col>}
                    {/* DROP OFF 단계 */}
                    {state.drop &&
                    <Col style={{maxWidth:viewWidth}} className={value.p.drop_off_time===null?"step":"next"}>
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <i className={value.p.drop_off_time===null?"fa fa-ship fa-3x text-secondary":"fa fa-ship fa-3x text-primary"}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Badge className="ml-2 mr-2" color="primary">DROP OFF</Badge>
                                    </Col>
                                </Row>
                                {value.p.drop_off_time!==null &&
                                <Row>
                                    <Col className="text-center">
                                        <span style={styles.progressText}>{value.p.drop_off_time_f}</span>
                                    </Col>
                                </Row>}
                            </Col>
                        </Row>
                    </Col>}
                     {/* SR 저장단계 */}
                    {state.srsave &&
                    <Col style={{maxWidth:viewWidth}} className={value.p.sr_no === null?"step":"next"}>
                        {(value.p.user_no !== null&&value.p.sr_no!==null)?(
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <Link to={{pathname: `/srnew`, 
                                            state:{
                                                    res_bkg_no: value.p.res_bkg_no?value.p.res_bkg_no:null,
                                                    user_no: value.p.user_no?value.p.user_no:null,
                                                    sr_no:value.p.sr_no?value.p.sr_no:null, 
                                                    sr_date:value.p.sr_date?value.p.sr_date:null,
                                                    confirm_yn:'Y'
                                                }
                                            }}>
                                            <i className={value.p.sr_no === null?"fa fa-floppy-o fa-3x text-secondary":"fa fa-floppy-o fa-3x text-primary"}/>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Badge className="ml-2 mr-2" color="primary">SR SAVE</Badge>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/srnew`, 
                                            state:{
                                                    res_bkg_no: value.p.res_bkg_no?value.p.res_bkg_no:null,
                                                    user_no: value.p.user_no?value.p.user_no:null,
                                                    sr_no:value.p.sr_no?value.p.sr_no:null, 
                                                    sr_date:value.p.sr_date?value.p.sr_date:null,
                                                    confirm_yn:'Y'
                                                }
                                            }}>
                                            <span style={styles.progressText}>{value.p.sr_no}</span>
                                        </Link>
                                    </Col>
                                </Row>
                                {(value.p.status_name3==="Confirm" && value.p.sr_no === null) &&
                                <Row>
                                    <Col className="text-center">
                                        <Link 
                                            to={{
                                                pathname: `/srnew`, 
                                                state:{
                                                    res_bkg_no: value.p.res_bkg_no?value.p.res_bkg_no:null,
                                                    user_no: value.p.user_no?value.p.user_no:null,
                                                    sr_no:value.p.sr_no?value.p.sr_no:null, 
                                                    sr_date:value.p.sr_date?value.p.sr_date:null,
                                                    confirm_yn:'Y'
                                                    }
                                                }}><Badge className="ml-2 mr-2">SR WRITE</Badge>
                                        </Link>
                                    </Col>
                                </Row>}
                            </Col>
                        </Row>):(
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <i className={value.p.sr_no === null?"fa fa-floppy-o fa-3x text-secondary":"fa fa-floppy-o fa-3x text-primary"}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Badge className="ml-2 mr-2" color="primary">SR SAVE</Badge>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>)}
                    </Col>}
                    {/* SR 전송단계 */}
                    {state.srsend &&
                    <Col style={{maxWidth:viewWidth}} className={value.p.status4===null?"step":"next"}>
                        {(value.p.user_no !== null&&value.p.sr_no!==null&&value.p.sr_date!=null&&value.p.status4!==null)?(
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <Link to={{pathname: `/srnew`, state:{user_no:value.p.user_no, sr_no:value.p.sr_no, sr_date:value.p.sr_date}}}>
                                            <i className={value.p.status4===null?"fa fa-file-text-o fa-3x text-secondary":"fa fa-file-text-o fa-3x text-primary"}/>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/srnew`, state:{user_no:value.p.user_no, sr_no:value.p.sr_no, sr_date:value.p.sr_date}}}>
                                            <Badge className="ml-2 mr-2" color="primary">SR SEND</Badge><Badge color="primary">{value.p.status_cnt4}</Badge>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/srnew`, state:{user_no:value.p.user_no, sr_no:value.p.sr_no, sr_date:value.p.sr_date}}}>
                                            <span style={styles.progressText}>{value.p.sr_no}</span>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/srnew`, state:{user_no:value.p.user_no, sr_no:value.p.sr_no, sr_date:value.p.sr_date}}}>
                                            <span style={styles.progressText}>
                                                {value.p.status4} 
                                            </span>
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>):(
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <i className={value.p.status4===null?"fa fa-file-text-o fa-3x text-secondary":"fa fa-file-text-o fa-3x text-primary"}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Badge className="ml-2 mr-2" color="primary">SR SEND</Badge>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>)}
                    </Col>}
                    {/* BL단계 */}
                    {state.bl &&
                    <Col style={{maxWidth:viewWidth}} className={value.p.status5===null?"step nowrap":"next nowrap"}>
                    {(value.p.user_no !== null&&value.p.mbl_no!==null&&value.p.issue_date!==null&&value.p.status5!==null)?(
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <Link to={{pathname: `/bl`, state: {user_no:value.p.user_no, mbl_no:value.p.mbl_no, issue_date:value.p.issue_date}}}>
                                            <i className={value.p.status5===null?"fa fa-ellipsis-h fa-3x text-secondary":"fa fa-check fa-3x text-primary"}/>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/bl`, state: {user_no:value.p.user_no, mbl_no:value.p.mbl_no, issue_date:value.p.issue_date}}}>
                                            <Badge className="ml-2" color="primary">BL</Badge>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/bl`, state: {user_no:value.p.user_no, mbl_no:value.p.mbl_no, issue_date:value.p.issue_date}}}>
                                            <span style={styles.progressText}>{value.p.mbl_no}</span>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/bl`, state: {user_no:value.p.user_no, mbl_no:value.p.mbl_no, issue_date:value.p.issue_date}}}>
                                            <span style={styles.progressText}>
                                                {value.p.status5} 
                                            </span>
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>):(
                        <Row>
                            <Col>
                                <Row>
                                    <Col>
                                        <i className={value.p.status5===null?"fa fa-ellipsis-h fa-3x text-secondary":"fa fa-check fa-3x text-primary"}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Badge className="ml-2" color="primary">BL</Badge>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>)}
                    </Col>}
                   {/*mfcs단계 */}
                   {state.mfcs &&
                    <Col style={{maxWidth:viewWidth}} className={value.o.length === 0?"laststep":"lastnext"}>
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <i className={value.o.length === 0?"fa fa-clipboard fa-3x text-secondary":"fa fa-clipboard fa-3x text-primary"}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Badge className="ml-2 mr-2" color="primary">MFCS</Badge>
                                    </Col>
                                </Row>
                                {(value.o.length > 0 ) &&
                                <Row>
                                    <Col className="text-center">
                                        <span style={styles.progressText}>{value.o[0].DPT_DATE_X?value.o[0].DPT_DATE_X:""}</span>
                                    </Col>
                                </Row>}
                                {(value.o.length > 0 ) &&
                                <Row>
                                    <Col>
                                        <span style={styles.progressText}>{value.o[0].STATUS_NAME?value.o[0].STATUS_NAME:""}</span>
                                    </Col>
                                </Row>}
                            </Col>
                        </Row>
                    </Col>}
                </Row>
            </Card>
        </Row>
    )
}
