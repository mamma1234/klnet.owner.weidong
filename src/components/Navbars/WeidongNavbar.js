import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
// import classnames from "classnames";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  // Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  // NavItem,
  Nav,
  Container,
  UncontrolledTooltip,
  // Row,Col
} from "reactstrap";
// core components
import WeidingAuth from "components/Navbars/WeidongAuthNavbar.js";
import LoginModal from "components/Modals/LoginPage.js";
import RegisterModal from "components/Modals/RegisterPage.js";
import CompanyInfo from "components/Map/Minimap.js";
function WeidongNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [bodyClick, setBodyClick] = React.useState(false);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [login, setLogin] = React.useState(false);
  const [register, setRegister] = React.useState(false);
  const [company, setCompany] = React.useState(false);
  React.useEffect(() => {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
    
    const updateNavbarColor = () => {
      console.log("height:",document.documentElement.scrollTop);
      if (
        document.documentElement.scrollTop > 140 ||
        document.body.scrollTop > 140
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 100 ||
        document.body.scrollTop < 100
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
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
        className={"fixed-top pt-0"}
        expand="lg"
        id="navbar-main"
        style={{borderBottom:'1px solid #0098e1',backgroundImage:
        "url(" + require("assets/img/bg_header_wrap.gif") + ")"}}
      >
        <Container>
          <div  className="container" style={{top:'0',position:'absolute'}}>
            <WeidingAuth openLogin={()=>setLogin(!login)}
                          openRegister={()=>setRegister(!register)}
                          openCompany ={() => setCompany(!company)}/>
          </div>
          <div className="navbar-translate" style={{marginTop:'30px'}} >
            <NavbarBrand className="p-0 m-0" id="navbar-brand" to="/weidongIndex" tag={Link} >
              <img alt="logo" src={require("assets/img/logo.gif")}/>
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
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse navbar isOpen={collapseOpen} style={{paddingTop:'40px'}}>
                        <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle className="mr-2 mt-2" nav to="/dashboard" tag={Link} style={{fontSize:'15px',color:'#444444'}}>
                            DASHBOARD
                          </DropdownToggle>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle className="mr-2 mt-2"  style={{fontSize:'15px',color:'#444444'}} caret nav>
                            BOOKING
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-info" right>
                            <DropdownItem to="/booking" tag={Link}>
                              Booking Sample1
                            </DropdownItem>
                            <DropdownItem to="/booking2" tag={Link}>
                              Booking Sample2
                            </DropdownItem>
                              <DropdownItem to="/booking3" tag={Link}>
                              Booking Sample3
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle className="mr-2 mt-2"  style={{fontSize:'15px',color:'#444444'}} caret nav>
                            SR
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-info" right>
                            <DropdownItem to="/srnew" tag={Link}>
                              SR Request
                            </DropdownItem>
                            <DropdownItem to="/srlist" tag={Link}>
                              SR list
                            </DropdownItem>
                            <DropdownItem to="/error-404" tag={Link}>
                              BL REPORT
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown> 
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle className="mr-2 mt-2"  nav to="/schedule" tag={Link} style={{fontSize:'15px',color:'#444444'}}>
                            SCHEDULE
                          </DropdownToggle>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle className="mr-2 mt-2"  nav to="/error-404" tag={Link} style={{fontSize:'15px',color:'#444444'}}>
                            INVOICE
                          </DropdownToggle>
                        </UncontrolledDropdown>
                      </Nav>
          </Collapse>
        </Container>
      </Navbar>
      {/*login modal*/}
      <LoginModal 
          openLogin={login}
          setOpenLogin={(e)=>setLogin(e)}
        />
      {/*login modal*/}
      <RegisterModal 
          openRegister={register}
          setOpenRegister={(e)=>setRegister(e)}
        />
        <CompanyInfo 
        openCompany={company}
        setOpenCompany={(e)=>setCompany(e)}/>
    </>
  );
}

export default WeidongNavbar;
