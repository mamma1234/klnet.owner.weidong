/*eslint-disable*/
import React from "react";
import {compose,withProps,withState,withHandlers} from 'recompose';
import {GoogleMap, withGoogleMap, withScriptjs, Marker, InfoWindow} from 'react-google-maps';





const Map = compose(
    
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD7fmL2oueevYipMnjdfYGeOjZLyF1y6Xw",
        loadingElement: <div style={{height:`100%`}}/>,
        containerElement: <div style={{width:'100%', height:`20vh`}}/>,
        mapElement: <div style={{height:`100%`}}/>,
    }),
    withState('zoom','onZoomChange',6),
    withState('center','onCenterChange',{lat:37.127, lng:124.1111}),
    withState('isInfoOpen','onInfoState',false),
    withState('shipName','onShipNameChange',""),
    withHandlers(() => {
        
        const refs = {
            map: undefined,
        }
        return {
            onMapMounted: () => ref => {
                refs.map = ref
            },
            onDragEnd: ({onCenterChange}) => () => {
                onCenterChange(refs.map.getCenter());
            },
            onInfoState: ({onInfoState, onShipNameChange}) => (param, shipNm) => {
                onInfoState(param);
                onShipNameChange(shipNm);
                console.log(shipNm)
            }

        }
    }),

    withScriptjs,
    withGoogleMap,
    
)(props => (
    <GoogleMap
        defaultZoom={10}
        defaultOptions={{
            scrollwheel:true,
            zoomControl:true,
            disableDefaultUI:true,
            mapTypeControl:false,
            zoomControlOptions: {
                position: window.google.maps.ControlPosition.RIGHT_CENTER
            }
        }}
        options={{
            scrollwheel:true,
            zoomControl:true,
            disableDefaultUI:true,
            mapTypeControl:false,
            zoomControlOptions: {
                position: window.google.maps.ControlPosition.RIGHT_CENTER
            }
        }}
        mapTypeId={window.google.maps.MapTypeId.HYBRID}
        defaultCenter={{lat:props.lat,lng:props.lng}}
        onDragEnd={props.onDragEnd}>


        <Marker
            draggable={false}
            position={{lat:props.lat, lng:props.lng}}
            icon={{
                url:require('assets/img/newvessel.png'),
                size:{
                    width
                    :(props.rotate > 0 && props.rotate <= 15)?props.shipRotate.rotate1.width
                    :(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.rotate2.width
                    :(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.rotate3.width
                    :(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.rotate4.width
                    :(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.rotate5.width
                    :(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.rotate6.width
                    :(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.rotate7.width
                    :(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.rotate8.width
                    :(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.rotate9.width
                    :(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.rotate10.width
                    :(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.rotate11.width
                    :(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.rotate12.width
                    :(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.rotate13.width
                    :(props.rotate > 195 && props.rotate <= 210)?props.shipRotate.rotate14.width
                    :(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.rotate15.width
                    :(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.rotate16.width
                    :(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.rotate17.width
                    :(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.rotate18.width
                    :(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.rotate19.width
                    :(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.rotate20.width
                    :(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.rotate21.width
                    :(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.rotate22.width
                    :(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.rotate23.width
                    :(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.rotate24.width
                    :props.shipRotate.rotate0.width,
                    height
                    :(props.rotate > 0 && props.rotate <= 15)?props.shipRotate.rotate1.height
                    :(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.rotate2.height
                    :(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.rotate3.height
                    :(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.rotate4.height
                    :(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.rotate5.height
                    :(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.rotate6.height
                    :(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.rotate7.height
                    :(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.rotate8.height
                    :(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.rotate9.height
                    :(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.rotate10.height
                    :(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.rotate11.height
                    :(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.rotate12.height
                    :(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.rotate13.height
                    :(props.rotate > 195 && props.rotate <= 210)?props.shipRotate.rotate14.height
                    :(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.rotate15.height
                    :(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.rotate16.height
                    :(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.rotate17.height
                    :(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.rotate18.height
                    :(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.rotate19.height
                    :(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.rotate20.height
                    :(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.rotate21.height
                    :(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.rotate22.height
                    :(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.rotate23.height
                    :(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.rotate24.height
                    :props.shipRotate.rotate0.height,

                },
                origin:{
                    x
                    :(props.rotate > 0 && props.rotate <= 15)?props.shipRotate.rotate1.x
                    :(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.rotate2.x
                    :(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.rotate3.x
                    :(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.rotate4.x
                    :(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.rotate5.x
                    :(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.rotate6.x
                    :(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.rotate7.x
                    :(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.rotate8.x
                    :(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.rotate9.x
                    :(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.rotate10.x
                    :(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.rotate11.x
                    :(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.rotate12.x
                    :(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.rotate13.x
                    :(props.rotate > 195 && props.rotate <= 210)?props.shipRotate.rotate14.x
                    :(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.rotate15.x
                    :(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.rotate16.x
                    :(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.rotate17.x
                    :(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.rotate18.x
                    :(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.rotate19.x
                    :(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.rotate20.x
                    :(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.rotate21.x
                    :(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.rotate22.x
                    :(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.rotate23.x
                    :(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.rotate24.x
                    :props.shipRotate.rotate0.x,
                y
                :(props.rotate > 0 && props.rotate <= 15)?props.shipRotate.rotate1.y
                :(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.rotate2.y
                :(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.rotate3.y
                :(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.rotate4.y
                :(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.rotate5.y
                :(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.rotate6.y
                :(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.rotate7.y
                :(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.rotate8.y
                :(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.rotate9.y
                :(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.rotate10.y
                :(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.rotate11.y
                :(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.rotate12.y
                :(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.rotate13.y
                :(props.rotate > 195 && props.rotate <= 210)?props.shipRotate.rotate14.y
                :(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.rotate15.y
                :(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.rotate16.y
                :(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.rotate17.y
                :(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.rotate18.y
                :(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.rotate19.y
                :(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.rotate20.y
                :(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.rotate21.y
                :(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.rotate22.y
                :(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.rotate23.y
                :(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.rotate24.y
                :props.shipRotate.rotate0.y,
                }
            }}>
        </Marker>
    </GoogleMap>
));


function LoginPage(props) {
  // modals states

  // carousel states and functions
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const [classic, setClassic] = React.useState(false);
  const [parameter] = React.useState(props);

  const [shipRotate] = React.useState({
    rotate0:{x:5,y:5,width:20,height:21},
    rotate1:{x:5,y:36,width:20,height:62},
    rotate2:{x:5,y:108,width:35,height:65},
    rotate3:{x:5,y:183,width:48,height:63},
    rotate4:{x:5,y:256,width:57,height:57},
    rotate5:{x:5,y:323,width:63,height:48},
    rotate6:{x:5,y:381,width:65,height:35},
    rotate7:{x:5,y:426,width:62,height:20},
    rotate8:{x:5,y:456,width:65,height:35},
    rotate9:{x:5,y:501,width:63,height:48},
    rotate10:{x:5,y:559,width:57,height:57},
    rotate11:{x:5,y:626,width:48,height:63},
    rotate12:{x:5,y:699,width:35,height:65},
    rotate13:{x:5,y:774,width:20,height:62},
    rotate14:{x:5,y:846,width:35,height:65},
    rotate15:{x:5,y:921,width:48,height:63},
    rotate16:{x:5,y:994,width:57,height:57},
    rotate17:{x:5,y:1061,width:63,height:48},
    rotate18:{x:5,y:1119,width:65,height:35},
    rotate19:{x:5,y:1164,width:62,height:20},
    rotate20:{x:5,y:1194,width:65,height:35},
    rotate21:{x:5,y:1239,width:63,height:48},
    rotate22:{x:5,y:1297,width:57,height:57},
    rotate23:{x:5,y:1364,width:48,height:63},
    rotate24:{x:5,y:1437,width:35,height:65},
    
})





  return (
    <>
        <Map
            shipRotate={shipRotate}
            lat={props.parameter.position.latitude}
            lng={props.parameter.position.longitude}
            rotate={props.parameter.position.courseOverGround}
        />
    </>
  );
}

export default LoginPage;
