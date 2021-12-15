import React, { useEffect } from "react";
// reactstrap components
// core components
import WeidongNavbar from "components/Navbars/WeidongNavbar.js";
import FooterWeidong from "components/Footers/FooterWeidong.js";
import Message from "./MessageSection/MessageSection.js";

export default function Setting(props) {
  document.documentElement.classList.remove("nav-open");
  // function that is being called on scroll of the page
  useEffect(()=> {
    props.fncClickMenu('유저 메시지')
  },[])
  return (
    <div id="General">
      <WeidongNavbar {...props}  />
      <div className="bg-white page-header page-header-xss"/>
      <Message {...props}/>
      <FooterWeidong />
    </div>
  );
}