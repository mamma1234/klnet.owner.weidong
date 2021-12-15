
import React,{useEffect} from 'react';
// import { CSSTransition } from 'react-transition-group';
import WeidongNavbar from "components/Navbars/WeidongNavbar.js";
import WeidongHeader from "components/Headers/WeidongHeader.js";
import FooterWeidong from "components/Footers/FooterWeidong.js";
// sections for this page
//import NewBooking from "./sections/NewBooking.js";
import BookingMain from "./sections/BookingMain.js";


// import Modal from 'react-modal';
function App(props) {
  // const [age, setAge] = React.useState('');
  // const [visible, setVisible] = React.useState(false);
  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };
  // const modalStyles = {
  //   overlay: {
  //     backgroundColor: '#000000',
  //   },
  // };
  // const gridClick = () => {
  //   setVisible(true)
  // }
  // const handleClose = () => {
  //   setVisible(false)
  // }
  
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
  useEffect(() => {
    props.fncClickMenu('부킹 작성')
  
  },[]);
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
      {/* <NewBooking />  */}
      <BookingMain />
      <FooterWeidong/>
    </div>
  );
}


export default App;

