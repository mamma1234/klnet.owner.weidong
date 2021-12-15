import React from "react";
import Map           from "components/Map/Minimap.js"
import WeidongNavbar from "components/Navbars/WeidongNavbar.js";
import WeidongHeader from "components/Headers/WeidongHeader.js";
import FooterWeidong from "components/Footers/FooterWeidong.js";

export default function MapView(props) {
  return (
    <>

        <WeidongNavbar {...props}/>
        <WeidongHeader />
        <Map style={{marginTop:'24px', paddingTop:'24px'}} {...props}/>
        <FooterWeidong />
        
    </>
  );
}
