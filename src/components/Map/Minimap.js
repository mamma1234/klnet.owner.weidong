/*eslint-disable*/
import React from "react";
// reactstrap components
import {
  Button,
  FormGroup,
  ModalBody,
  Modal,
  Input,
  ModalHeader,
  Row,Col,Label,Table,Card,CardImg,CardBody,CardText,CardTitle
} from "reactstrap";
import shipList from './test.json'
import {compose,withProps,withState,withHandlers} from 'recompose';
import {GoogleMap, withGoogleMap, withScriptjs, Marker, InfoWindow} from 'react-google-maps';
import SubMap from './Submap.js';



function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
}


const Map = compose(
    
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD7fmL2oueevYipMnjdfYGeOjZLyF1y6Xw",
        loadingElement: <div style={{height:`100%`}}/>,
        containerElement: <div style={{width:'100%', height:`80vh`}}/>,
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
        ref={props.onMapMounted}
        defaultOptions={{
            scrollwheel:true,
            zoomControl:true,
            disableDefaultUI:true,
            mapTypeControl:false,
            styles:[],
            zoomControlOptions: {
                position: window.google.maps.ControlPosition.RIGHT_CENTER
            }
        }}
        defaultTilt={15}
        options={{
            scrollwheel:true,
            zoomControl:true,
            disableDefaultUI:true,
            mapTypeControl:false,
            styles:[],
            zoomControlOptions: {
                position: window.google.maps.ControlPosition.RIGHT_CENTER
            }
        }}
        defaultZoom={6}
        defaultCenter={props.center}
        onDragEnd={props.onDragEnd}>
        {shipList.response.length !== 0 ? (shipList.response.map((data,index) => {
        if(data.position !=null) {
            return(
                <Marker
                    key={index}
                    draggable={false}
                    position={{lat:data.position.latitude, lng:data.position.longitude}}
                    icon={{
                        url:require('assets/img/newvessel.png'),
                        size:{
                            width
                            :(data.position.courseOverGround > 0 && data.position.courseOverGround <= 15)?props.shipRotate.rotate1.width
                            :(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.rotate2.width
                            :(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.rotate3.width
                            :(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.rotate4.width
                            :(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.rotate5.width
                            :(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.rotate6.width
                            :(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.rotate7.width
                            :(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.rotate8.width
                            :(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.rotate9.width
                            :(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.rotate10.width
                            :(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.rotate11.width
                            :(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.rotate12.width
                            :(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.rotate13.width
                            :(data.position.courseOverGround > 195 && data.position.courseOverGround <= 210)?props.shipRotate.rotate14.width
                            :(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.rotate15.width
                            :(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.rotate16.width
                            :(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.rotate17.width
                            :(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.rotate18.width
                            :(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.rotate19.width
                            :(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.rotate20.width
                            :(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.rotate21.width
                            :(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.rotate22.width
                            :(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.rotate23.width
                            :(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.rotate24.width
                            :props.shipRotate.rotate0.width,
                            height
                            :(data.position.courseOverGround > 0 && data.position.courseOverGround <= 15)?props.shipRotate.rotate1.height
                            :(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.rotate2.height
                            :(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.rotate3.height
                            :(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.rotate4.height
                            :(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.rotate5.height
                            :(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.rotate6.height
                            :(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.rotate7.height
                            :(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.rotate8.height
                            :(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.rotate9.height
                            :(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.rotate10.height
                            :(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.rotate11.height
                            :(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.rotate12.height
                            :(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.rotate13.height
                            :(data.position.courseOverGround > 195 && data.position.courseOverGround <= 210)?props.shipRotate.rotate14.height
                            :(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.rotate15.height
                            :(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.rotate16.height
                            :(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.rotate17.height
                            :(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.rotate18.height
                            :(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.rotate19.height
                            :(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.rotate20.height
                            :(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.rotate21.height
                            :(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.rotate22.height
                            :(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.rotate23.height
                            :(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.rotate24.height
                            :props.shipRotate.rotate0.height,

                        },
                        origin:{
                            x
                            :(data.position.courseOverGround > 0 && data.position.courseOverGround <= 15)?props.shipRotate.rotate1.x
                            :(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.rotate2.x
                            :(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.rotate3.x
                            :(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.rotate4.x
                            :(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.rotate5.x
                            :(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.rotate6.x
                            :(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.rotate7.x
                            :(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.rotate8.x
                            :(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.rotate9.x
                            :(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.rotate10.x
                            :(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.rotate11.x
                            :(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.rotate12.x
                            :(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.rotate13.x
                            :(data.position.courseOverGround > 195 && data.position.courseOverGround <= 210)?props.shipRotate.rotate14.x
                            :(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.rotate15.x
                            :(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.rotate16.x
                            :(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.rotate17.x
                            :(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.rotate18.x
                            :(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.rotate19.x
                            :(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.rotate20.x
                            :(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.rotate21.x
                            :(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.rotate22.x
                            :(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.rotate23.x
                            :(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.rotate24.x
                            :props.shipRotate.rotate0.x,
                        y
                        :(data.position.courseOverGround > 0 && data.position.courseOverGround <= 15)?props.shipRotate.rotate1.y
                        :(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.rotate2.y
                        :(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.rotate3.y
                        :(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.rotate4.y
                        :(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.rotate5.y
                        :(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.rotate6.y
                        :(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.rotate7.y
                        :(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.rotate8.y
                        :(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.rotate9.y
                        :(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.rotate10.y
                        :(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.rotate11.y
                        :(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.rotate12.y
                        :(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.rotate13.y
                        :(data.position.courseOverGround > 195 && data.position.courseOverGround <= 210)?props.shipRotate.rotate14.y
                        :(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.rotate15.y
                        :(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.rotate16.y
                        :(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.rotate17.y
                        :(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.rotate18.y
                        :(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.rotate19.y
                        :(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.rotate20.y
                        :(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.rotate21.y
                        :(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.rotate22.y
                        :(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.rotate23.y
                        :(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.rotate24.y
                        :props.shipRotate.rotate0.y,
                        }
                    }}
                    onMouseOver={() => {if(!props.isInfoOpen){props.onInfoState(true,data.shipName);console.log(props.shipName)}}}
                    onMouseOut={() => {if(props.isInfoOpen){props.onInfoState(false,data.shipName);console.log(props.shipName)}}}
                    // onClick={() => {if(!props.isInfoOpen){props.onInfoState(true,data.shipName);console.log(props.shipName)}}}
                    >
                    {props.isInfoOpen && (data.shipName === props.shipName) && (
                        <InfoWindow
                            position={{lat:data.position.latitude, lng:data.position.longitude}}>
                       <div>
                            <CardBody>
                                <CardTitle tag="h5">{data.shipName}</CardTitle>
                                <CardText>
                                    2020/10/16 00:00 (장가항)
                                </CardText>
                                 <CardText>
                                    <small className="text-muted">Last update : {timeForToday(data.position.timestamp)}</small>
                                </CardText>
                                
                            </CardBody>
                            <SubMap parameter={data}></SubMap>
                        </div>
                        


                        </InfoWindow>
                    )

                    }
                    
                </Marker>
            )
        }
    })):null}
    </GoogleMap>
));


function LoginPage(props) {
  // modals states

  // carousel states and functions
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const [classic, setClassic] = React.useState(false);
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
        <Modal
            isOpen={props.openCompany}
            toggle={() => props.setOpenCompany(false)}
            size={"lg"}
            backdrop={true} 
            keyboard={true}>
         <Row>
            <Col xl="12" lg="12">
                <Map
                    shipRotate={shipRotate}/>  
            </Col>
        </Row>
            

        </Modal>
    </>
  );
}

export default LoginPage;
