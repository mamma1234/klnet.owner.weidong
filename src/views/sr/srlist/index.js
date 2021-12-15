import React from "react";

// reactstrap components

// core components
import WeidongNavbar from "components/Navbars/WeidongNavbar.js";
import WeidongHeader from "components/Headers/WeidongHeader.js";
import FooterWeidong from "components/Footers/FooterWeidong.js";
import {Button, UncontrolledTooltip} from "reactstrap";
// sections for this page
import Srlist from "./sections/Srlist.js";
import { Link } from "react-router-dom";

//import AlertModal from 'components/Modals/Alert.js';
// sections for this page
//import {observer} from 'mobx-react-lite';
//import UserStore from "store/UserStore.js";
//import * as valid from 'components/common/validation.js';
//import {isVerify} from "assets/common/isAuthenticated.js";
//import axios from "axios";



function BookingIndex(props) {
//const SRIndex = observer(({store,...props})=>{   
  //const [user,setUser] =  React.useState("");
  //const [isAuth,setIsAuth] =  React.useState(false);
  //const store = React.useContext(UserStore);
  //const [user,setUser] = React.useState("");

  
  //document.documentElement.classList.remove("nav-open");
  // function that is being called on scroll of the page

  return (
    <>
      <WeidongNavbar  {...props} />
      <WeidongHeader />
      <Srlist {...props}/>
      <div style={{position:'fixed', right:'50px', bottom:'30px','zIndex': 1}}>
        <Link to={{pathname:`/srnew`, state:{user_no:props.user?props.user.user_no:'', sr_no:'', sr_date:'', docnew:'Y'}}}>
          <Button size="sm" id="newsr" className="btn-round" color="info">
            <i className="fa fa-plus">
            </i>
            NEW
          </Button>
          <UncontrolledTooltip delay={0} target="newsr">Create SR</UncontrolledTooltip>
        </Link>
      </div>  
      <FooterWeidong />

    </>
  );
}

export default BookingIndex;
