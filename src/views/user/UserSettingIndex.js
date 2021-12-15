
import React, { useEffect } from "react";

// reactstrap components

// core components
import WeidongNavbar from "components/Navbars/WeidongNavbar.js";
import FooterWeidong from "components/Footers/FooterWeidong.js";
import User from "./UserSection/UserSection.js";


export default function Setting(props) {
  //document.documentElement.classList.remove("nav-open");
  
  useEffect(()=> {
    props.fncClickMenu('유저 프로필')
  },[])
  return (
    <div id="General">
      <WeidongNavbar {...props}  />
      <div className="bg-white page-header page-header-xss"/>
      <User {...props}/>
      <FooterWeidong />
    </div>
  );
}