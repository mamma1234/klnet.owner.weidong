import React,{useEffect} from "react";
//import axios from "axios";
// reactstrap components
// import {
// } from "reactstrap";

// core components
import WeidongNavbar from "components/Navbars/WeidongNavbar.js";
import WeidongPageHeader from "components/Headers/WeidongPageHeader.js";
import FooterWeidong from "components/Footers/FooterWeidong.js";
import WeidongNotice from "components/Notice/NoticeNew.js"
//import {reflesh,login,logOut} from "assets/common/isAuthenticated.js";
//import AlertModal from 'components/Modals/Alert.js';
//import * as valid from 'components/common/validation.js';
//import {observer} from 'mobx-react-lite';
//import UserStore from "store/UserStore.js";

function Index(props) {
	//console.log("props1:",props.location.search);
 // console.log("props2:",props.location.search.slice(6,));
  const [errCode,setErrCode] = React.useState(props.location.search?props.location.search.slice(6,)||null:null);
  //document.documentElement.classList.remove("nav-open");

/*  React.useEffect(() => {	  
    document.body.classList.add("index-page");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
    };
  });*/
  useEffect(()=> {
    props.fncClickMenu('메인 화면')
  },[])

  return (
    <>
      <WeidongNavbar {...props} errcode={errCode} clearCode={()=>setErrCode("")} />
      <WeidongPageHeader {...props}/>
      <WeidongNotice {...props}/>
      <FooterWeidong />

    </>
  );
}
//);

export default Index;
