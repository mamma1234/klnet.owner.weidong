
import React from 'react';
import WeidongNavbar from "components/Navbars/WeidongNavbar.js";
import WeidongHeader from "components/Headers/WeidongHeader.js";
import FooterWeidong from "components/Footers/FooterWeidong.js";
// sections for this page
import BookingList from "./sections/list/BookingList.js";
import {Button, UncontrolledTooltip} from "reactstrap";
import { Link } from "react-router-dom";
function App(props) {
  document.documentElement.classList.remove("nav-open");
  // function that is being called on scroll of the page
  const checkScroll = () => {
    // it takes all the elements that have the .add-animation class on them
    const componentPosition = document.getElementsByClassName("add-animation");
    const scrollPosition = window.pageYOffset;
    for (var i = 0; i < componentPosition.length; i++) {
      var rec =
        componentPosition[i].getBoundingClientRect().top + window.scrollY + 100;
      // when the element with the .add-animation is in the scroll view,
      // the .animated class gets added to it, so it creates a nice fade in animation
      if (scrollPosition + window.innerHeight >= rec) {
        componentPosition[i].classList.add("animated");
        // when the element with the .add-animation is not in the scroll view,
        // the .animated class gets removed from it, so it creates a nice fade out animation
      } else if (scrollPosition + window.innerHeight * 0.8 < rec) {
        componentPosition[i].classList.remove("animated");
      }
    }
  };

  React.useEffect(() => {
    //document.body.classList.add("presentation-page");
    window.addEventListener("scroll", checkScroll);
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("presentation-page");
      window.removeEventListener("scroll", checkScroll);
    };
  });
  
  return (
    <div>
      <WeidongNavbar/>
      <WeidongHeader/>   
      <BookingList />
      <div style={{position:'fixed', right:'50px', bottom:'30px','zIndex': 1}}>
        <Link to={{pathname: `/booking`, state: {user_no:'', bkg_no:'', bkg_date:''}}}>
          <Button size="sm" id="new" className="btn-round" color="info">
            <i className="fa fa-plus">
            </i>
            NEW
          </Button>
        </Link>
        <UncontrolledTooltip delay={0} target="new">Create Booking</UncontrolledTooltip>
      </div>  
      <FooterWeidong/>
    </div>
  );
}
export default App;

