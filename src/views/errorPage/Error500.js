import React from "react";

// reactstrap components
import { Button, Container, Row } from "reactstrap";
import queryString from 'query-string';

// core components
import WeidongNavbar from "components/Navbars/WeidongNavbar.js";
import WeidongHeader from "components/Headers/WeidongHeader.js";
import FooterWeidong from "components/Footers/FooterWeidong.js";

function Error500() {
  const query = queryString.parse(window.location.search);
	
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("error-500");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("error-500");
    };
  });
  return (
    <>
      <WeidongNavbar />
      <WeidongHeader />
      <div
        className="background-img"
        style={{
          backgroundImage:
            "url(" +
            require("assets/img/sections/the-how-photographer.jpg") +
            ")",
        }}
      >
        <div className="filter" />
        <Container>
          <Row>
            <h1 className="title">
               500 <br />
              <p className="error-msg">
                We're sorry, but something went wrong. We are working an fixing
                this. <br />
                Please refresh the page in a couple of seconds.<br/>
                Error Message: {query.message}
              </p>
            </h1>
          </Row>
        </Container>
      </div>
      <FooterWeidong />
    </>
  );
}

export default Error500;
