/*eslint-disable*/
import React,{useState,useEffect, useRef} from "react";
// reactstrap components
import {
  Button,
  Modal,
  Input,
  FormGroup,
} from "reactstrap";
import axios from 'axios'
import {observer} from 'mobx-react-lite';
import { userStore } from 'store/UserStore.js';

const ChangeSessionModal= observer((props) =>{
  const [open,setOpen] = useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  useEffect(() => {
    if(!open) {
      document.getElementById("id").focus();
    }

    return function cleanup() {
        setEmail('');
        setPassword("");
    };
  }, [open]);

  const onModalClose = () => {
    setOpen(true);
    setEmail('');
    setPassword("");
     props.setOpenSessionModal(false)
  }
 
  const fncOnKeyPress = (e) => {
    if("Enter" === e.key && (email !== undefined && password !== undefined) ) {
        onSubmit();
    }
  }
  const onSubmit=(event)=> {

    if(event) {
        event.preventDefault();
    }
	email&&password&&props.adminRole == 'Y' ?
		axios.post("/auth/changeSession",{ userid:email ,adminKey:password, isAuthenticated: props.adminRole} )
		.then(res => {
			console.log(res)
			if (res.data.goChangeSession==true ){
				userStore.sessionIn()
				window.location.href = "/";
			}else{
				res.data.error?alert(res.data.error):alert('세션변경실패') 
			}			
		})
		.catch(err => {
			console.log(err);
			//window.location.href = "/Landing";
		})
	: alert('권한이 없습니다')
  }
  
  return (
    <>
      <Modal
        isOpen={props.openSessionModal}
        toggle={() => onModalClose()}
        className="modal-login">
        <div className="modal-header no-border-header text-center">
            <button
                className="close"
                type="button"
                onClick={() => props.setOpenSessionModal(false)}
            >
                <span>×</span>
            </button>
            <h3 className="modal-title text-center">세션 전환</h3>
        </div>
        <div className="modal-body">
            <FormGroup>
                <label>아이디</label>
                <Input id="id" name="id" placeholder="" type="text" value={email} onChange={(e)=> setEmail(e.target.value.toUpperCase())}  
                // onKeyUp={onKeyUp}
                />
            
            </FormGroup>
            <FormGroup className="mb-2">
                <label>관리자 비밀번호</label>
                <Input id="pw" name="pw" 
                placeholder=""
                type="password"
                onChange={(e)=>{setPassword(e.target.value.toUpperCase());}}
                onKeyPress ={(e)=>fncOnKeyPress(e)}
                value={password}
                />
                
            </FormGroup>
            </div>
            <div className="modal-body">
                <Button block className="btn-round" color="default"  onClick={onSubmit} >
                    세션 전환 로그인
                </Button>
            </div>
     
    </Modal>
    </>
  );
}
)
export default ChangeSessionModal;
