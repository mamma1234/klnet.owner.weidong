import React from "react";

// reactstrap components
// import {
// } from "reactstrap";

// core components
import WeidongNavbar from "components/Navbars/WeidongNavbar.js";
import WeidongPageHeader from "components/Headers/WeidongPageHeader.js";
import FooterWeidong from "components/Footers/FooterWeidong.js";

function Index() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index-page");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
    };
  });
  return (
    <>
      <WeidongNavbar/>
      <WeidongPageHeader/>
      <FooterWeidong />
    </>
  );
}

export default Index;
