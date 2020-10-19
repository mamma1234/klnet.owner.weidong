import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
import Select from "react-select";
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
  Row,
  Col,
  FormGroup,
  Modal,
  Input,
} from "reactstrap";

const selectOptions = [
  { value: "", label: "LANGUAGE", isDisabled: true },
  { value: "K", label: "KOREA" },
  { value: "J", label: "CHINESE" },
  { value: "E", label: "ENGLISH" },
];

// core components

function ColorNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [bodyClick, setBodyClick] = React.useState(false);
  const [collapseOpen, setCollapseOpen] = React.useState(true);
  const [defaultSelect, setDefaultSelect] = React.useState(null);
  const [login, setLogin] = React.useState(false);
  const [register, setRegister] = React.useState(false);
  
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
  
  return (
    <>
      <Navbar
        className={classnames("fixed-top", navbarColor)}
        expand="lg"
        id="navbar-main"
		style={{paddingTop:'0'}}
      >
        <Container>
<Nav className="ml-auto" navbar style={{paddingRight:'20px'}}> 
              <NavItem>
                <Button
				  size="sm"
                  //className="btn-round"
                  //color="danger"
				  onClick={() => setLogin(true)}
				  //style={{marginTop:'5px'}}
				  className="pt-0 pb-0"
                >
                  로그인
                </Button>
				<Button
				  size="sm"
                  //className="btn-round"
                  //color="danger"
                  //href="https://www.creative-tim.com/product/paper-kit-pro-react?ref=pkpr-color-navbar"
                  //target="_blank"
				  onClick={() => setRegister(true)}
				  className="pt-0 pb-0"
                >
                   회원가입
                </Button>
				<Button
				  size="sm"
                  //className="btn-round"
                  //color="danger"
                  //href="https://www.creative-tim.com/product/paper-kit-pro-react?ref=pkpr-color-navbar"
                  //target="_blank"
				  
				  className="pt-0 pb-0"
                >
                   사이트맵
                </Button>
				<Button
				  size="sm"
                  //className="btn-round"
                 // color="danger"
                  //href="https://www.creative-tim.com/product/paper-kit-pro-react?ref=pkpr-color-navbar"
                  target="_blank"
				  className="pt-0 pb-0"
                >
                   여객사이트
                </Button>
              </NavItem>
            </Nav>
        </Container>
				 {/* login modal */}
              <Modal
                isOpen={login}
                toggle={() => setLogin(false)}
                className="modal-register"
              >
                <div className="modal-header no-border-header text-center">
                  <button
                    className="close"
                    type="button"
                    onClick={() => setLogin(false)}
                  >
                    <span>×</span>
                  </button>
                  <h6 className="text-muted">Welcome</h6>
                  <h3 className="modal-title text-center">Paper Kit</h3>
                  <p>Log in to your account</p>
                </div>
                <div className="modal-body">
                  <FormGroup>
                    <label>Email</label>
                    <Input defaultValue="" placeholder="Email" type="text" />
                  </FormGroup>
                  <FormGroup>
                    <label>Password</label>
                    <Input
                      defaultValue=""
                      placeholder="Password"
                      type="password"
                    />
                  </FormGroup>
                  <Button block className="btn-round" color="default">
                    Log in
                  </Button>
                </div>
                <div className="modal-footer no-border-footer">
                  <span className="text-muted text-center">
                    Looking{" "}
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      create an account
                    </a>{" "}
                    ?
                  </span>
                </div>
              </Modal>
			  {/* register modal */}
              <Modal
                isOpen={register}
                toggle={() => setRegister(false)}
                className="modal-register"
              >
                <div className="modal-header no-border-header text-center">
                  <button
                    className="close"
                    type="button"
                    onClick={() => setRegister(false)}
                  >
                    ×
                  </button>
                  <h6 className="text-muted">Welcome</h6>
                  <h3 className="modal-title">Paper Kit</h3>
                  <p>Create your account free and secure</p>
                </div>
                <div className="modal-body">
                  <Button block className="btn-round" color="default">
                    Sign Up with Email
                  </Button>
                  <Button block className="btn-round" color="default">
                    Connect with Facebook
                  </Button>
                  <Button block className="btn-round" color="default">
                    Connect with Twitter
                  </Button>
                  <Button
                    block
                    className="btn-round btn-simple"
                    color="info"
                    type="button"
                  >
                    Sign In with Email
                  </Button>
                </div>
                <div className="modal-footer no-border-footer" />
              </Modal>
              {/* END MODALS */}
      </Navbar>
    </>
  );
}

export default ColorNavbar;
