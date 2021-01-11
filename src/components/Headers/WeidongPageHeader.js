import React from "react";

// reactstrap components

// core components
// import { Container } from "reactstrap";

function LandingPageHeader() {
	 let pageHeader = React.createRef();

	  React.useEffect(() => {
	    if (window.innerWidth > 991) {
	      const updateScroll = () => {
	        let windowScrollTop = window.pageYOffset / 3;
	        pageHeader.current.style.transform =
	          "translate3d(0," + windowScrollTop + "px,0)";
	      };
	      window.addEventListener("scroll", updateScroll);
	      return function cleanup() {
	        window.removeEventListener("scroll", updateScroll);
	      };
	    }
	  });
  
  return (
    <>
      <div
        className="bg-white page-header"
        ref={pageHeader}
        style={{
          backgroundImage:
          "url(" + require("assets/img/img_shipdata3.jpg") + ")",minHeight:'78vh'
        }}
        >
      </div>
    </>
  );
}

export default LandingPageHeader;
