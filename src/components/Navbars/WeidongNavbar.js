import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";
// core components

function ColorNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [bodyClick, setBodyClick] = React.useState(false);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [login, setLogin] = React.useState(false);
  React.useEffect(() => {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 499 ||
        document.body.scrollTop > 499
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 500 ||
        document.body.scrollTop < 500
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  
  const logo = require("assets/img/sections/logo.gif");
  return (
    <>
      {bodyClick ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setBodyClick(false);
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar
	    style={{paddingTop:'10px',marginTop:'25px'}}
        className={classnames("fixed-top", navbarColor)}
        expand="lg"
        id="navbar-main"
      >
        <Container>
          <div className="navbar-translate" >
            <NavbarBrand id="navbar-brand" to="/index" tag={Link} style={{paddingTop:'0',paddingBottom:'0',color:'#66615b'}}>
              <img src={logo} />위동항운
            </NavbarBrand>
            <UncontrolledTooltip placement="bottom" target="navbar-brand">
              WEIDONG FERRY
            </UncontrolledTooltip>
            <button
              className="navbar-toggler"
              id="navigation"
              type="button"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setBodyClick(true);
                setCollapseOpen(true);
              }}
            >
			  <span className="navbar-toggler-bar bar1" style={{backgroundColor:'black'}}/>
              <span className="navbar-toggler-bar bar2" style={{backgroundColor:'black'}}/>
              <span className="navbar-toggler-bar bar3" style={{backgroundColor:'black'}}/>
            </button>
          </div>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar >
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="mr-2" color="default" caret nav style={{color:'#66615b'}}>
                  회사소개
                </DropdownToggle>
                <DropdownMenu className="dropdown-danger" right>
                  <DropdownItem to="/intro" tag={Link}>
                    회사연혁
                  </DropdownItem>
                  <DropdownItem to="/index" tag={Link}>
                    조직도
                  </DropdownItem>
                  <DropdownItem to="/index" tag={Link}>
                    경영목표
                  </DropdownItem>
                  <DropdownItem to="/index" tag={Link}>
                    안전약속
                  </DropdownItem>
                  <DropdownItem to="/index" tag={Link}>
                    위동전시관
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
			  <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="mr-2" color="default" caret nav style={{color:'#66615b'}}>
                  운항일정
                </DropdownToggle>
                <DropdownMenu className="dropdown-danger" right>
                  <DropdownItem to="/index" tag={Link}>
                    운항일정조회
                  </DropdownItem>
                </DropdownMenu>
				<DropdownMenu className="dropdown-danger" right>
                  <DropdownItem to="/index" tag={Link}>
                    선박입출항정보
                  </DropdownItem>
                  <DropdownItem to="/index" tag={Link}>
                    선박안내
                  </DropdownItem>
                  <DropdownItem to="/index" tag={Link}>
                    기본운항일정
                  </DropdownItem>
                  <DropdownItem to="/index" tag={Link}>
                    월간운항일정
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
			  <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="mr-2" color="default" caret nav style={{color:'#66615b'}}>
                  수출입안내
                </DropdownToggle>
                <DropdownMenu className="dropdown-danger" right>
                  <DropdownItem to="/index" tag={Link}>
                    수출안내
                  </DropdownItem>
				  <DropdownItem to="/index" tag={Link}>
                    수입안내
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
			  <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="mr-2" color="default" caret nav style={{color:'#66615b'}}>
                  화물서비스
                </DropdownToggle>
                <DropdownMenu className="dropdown-danger" right>
                  <DropdownItem to="/index" tag={Link}>
                    전자상거래화물서비스
                  </DropdownItem>
				  <DropdownItem to="/index" tag={Link}>
                    복화운송서비스
                  </DropdownItem>
				  <DropdownItem to="/index" tag={Link}>
                    특수운송서비스
                  </DropdownItem>
				  <DropdownItem to="/index" tag={Link}>
                    BULK화물서비스
                  </DropdownItem>
				  <DropdownItem to="/index" tag={Link}>
                    서식자료실
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
			  <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="mr-2" color="default" caret nav style={{color:'#66615b'}}>
                  e-Service
                </DropdownToggle>
                <DropdownMenu className="dropdown-danger" right>
                  <DropdownItem to="/index" tag={Link}>
                    수출업무
                  </DropdownItem>
				  <DropdownItem to="/index" tag={Link}>
                    수입업무
                  </DropdownItem>
				  <DropdownItem to="/index" tag={Link}>
                    전자세금계산서
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
			 <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="mr-2" color="default" caret nav style={{color:'#66615b'}}>
                  컨테이너
                </DropdownToggle>
                <DropdownMenu className="dropdown-danger" right>
                  <DropdownItem to="/index" tag={Link}>
                    특수컨테이너
                  </DropdownItem>
				   <DropdownItem to="/index" tag={Link}>
                    칸테이너규격
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
			  
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorNavbar;
