import React from "react";
// import { Link } from "react-router-dom";
// nodejs library that concatenates strings
// import classnames from "classnames";
// JavaScript plugin that hides or shows a component based on your scroll
// import Headroom from "headroom.js";
// reactstrap components
// import Select from "react-select";
import {
  Button,
  //   Navbar,
  //   NavItem,
  //   Nav,
//   FormGroup,
  ButtonDropdown,
  DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
} from "reactstrap";
// core components

// const selectOptions = [
//     {value:"",label:"LANGUAGE"},
//     {value:"K",label:"KOREA"},
//     {value:"C",label:"CHINESE"},
//     {value:"E",label:"ENGLISH"},
// ]

function WeidongAuthNavbar(props) {
//   const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
//   const [dropdownOpen, setDropdownOpen] = React.useState(false);
//   const [langTitle,setLangTitle] = React.useState("LANGUAGE");

  return (
      
    <div className="float-right">
        <Button
            className="pt-0 pb-0 mt-0 mb-0 text-dark"
            size="sm"
            onClick={()=>props.openLogin(!props.openLogin)}
            style={{backgroundColor:'transparent',border:'0',fontFamliy:'굴림',fontSize:'11px',color:'#666'}}
        >로그인
        </Button>
        <Button
            className="pt-0 pb-0 mt-0 mb-0 text-dark"
            size="sm"
            onClick={()=>props.openRegister(!props.openRegister)}
            style={{backgroundColor:'transparent',border:'0',fontFamliy:'굴림',fontSize:'11px',color:'#666'}}
        >회원가입
        </Button>
        <Button
            className="pt-0 pb-0 mt-0 mb-0 text-dark"
            size="sm"
            onClick={()=>props.openCompany(!props.openCompany)}
            style={{backgroundColor:'transparent',border:'0',fontFamliy:'굴림',fontSize:'11px',color:'#666'}}
        >미니맵
        </Button>
        <Button
            className="pt-0 pb-0 mt-0 mb-0 text-dark"
            size="sm"
            //onClick={()=>setRegister(!register)}
            style={{backgroundColor:'transparent',border:'0',fontFamliy:'굴림',fontSize:'11px',color:'#666'}}
        >사이트맵
        </Button>
        <ButtonDropdown>
            <DropdownToggle size="sm" className="mt-0 mb-0 mr-0 border-0 rounded-0" style={{backgroundColor:'#0098e1',paddingTop:'5px'}}
            	href="https://www.weidong.com/index.do?lang=ko_KR"
            	target="_blank">여객사이트</DropdownToggle>
        </ButtonDropdown>
        <ButtonDropdown>
        <DropdownToggle size="sm" className="mt-0 mb-0 mr-0 ml-0 border-0 rounded-0" style={{backgroundColor:'#0098e1',paddingTop:'5px'}}
        	href="https://www.cargo.weidong.com/index.do?lang=ko_KR"
        	target="_blank">화물사이트</DropdownToggle>
         </ButtonDropdown>
        {/* <ButtonDropdown isOpen={dropdownOpen} toggle={()=>setDropdownOpen(!dropdownOpen)} >
            <DropdownToggle caret size="sm" className="mt-0 mb-0 ml-0 border-0 rounded-0" style={{paddingTop:'5px',backgroundColor:'#333'}}>{langTitle}</DropdownToggle>
            <DropdownMenu className="mt-0" style={{minWidth:'6rem'}}>
                <DropdownItem className="p-0 pl-2 rounded-0" style={{backgroundColor:'#333',color:'#ffffff'}} onClick={()=>setLangTitle("KOREA")}>KOREA</DropdownItem>
                <DropdownItem className="p-0 pl-2 rounded-0" style={{backgroundColor:'#333',color:'#ffffff'}} onClick={()=>setLangTitle("CHINESE")}>CHINESE</DropdownItem>
                <DropdownItem className="p-0 pl-2 rounded-0" style={{backgroundColor:'#333',color:'#ffffff'}} onClick={()=>setLangTitle("ENGLISH")}>ENGLISH</DropdownItem>
            </DropdownMenu>
        </ButtonDropdown> */}
    </div>
  );
}

export default WeidongAuthNavbar;
