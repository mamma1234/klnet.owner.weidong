import React from "react";
import {

	  CardBody,
	  Container,Col,Row

	} from "reactstrap";
// reactstrap components
// import {
// } from "reactstrap";

// core components
import WeidongNavbar from "components/Navbars/WeidongNavbar.js";
import WeidongHeader from "components/Headers/WeidongHeader.js";
import FooterWeidong from "components/Footers/FooterWeidong.js";
import axios from "axios";

axios.defaults.withCredentials = true;

function Profile(props) {
  console.log(">>>index props:",props);
	
  const [authData,setAuthData] = React.useState();
  const [userData,setUserData] = React.useState([]);
  // refresh token create
  React.useEffect(() => {	
 	 refresh();
  },[]);
  
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {	  
    document.body.classList.add("profile");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile");
    };
  });
 
  const refresh = () =>{
	  axios.get("/auth/refresh").then(res => {
		  const {token,user} = res.data;
		  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		  axios.defaults.withCredentials = true;
		  setAuthData(user);
		  
		//   axios.post("/com/getUserInfo",{userno:user.userno})
		//     .then(res => {setUserData(res.data)})
		//     //.then(res => console.log(">>>>>>>>>>>>>>>>>>>>>>>>",JSON.stringify(res.data[0])))
		//     .catch(err => {
		// 	    alert(err);
		// 	});
		  
		  
	   })
      .catch(err => {
    	  axios.defaults.headers.common['Authorization'] = ``;
		  axios.defaults.withCredentials = true;
    	  setAuthData();
    	  console.log(err);})
  }
   //access token create
  const auth = (data) => {
      if(data) {
		  const {token,user} = data;
		  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		  axios.defaults.withCredentials = true;
		  setAuthData(user);
      } else {
    	  axios.defaults.headers.common['Authorization'] = ``;
		  axios.defaults.withCredentials = true;
    	  setAuthData();
      }
  }
  
  return (
    <>
      <WeidongNavbar {...props} auth = {auth} authData={authData}/>
      <WeidongHeader />
      <div className="section section-white">	
			<Container>
				<CardBody className="pt-2 pb-2 bg-white">
      			<Row>
			            <Col className="ml-auto mr-auto" xl="10" lg="10" md="10" sm="10">
				            <h3 className="mt-1 text-center">
				            	<small>Profile</small>
				            </h3>
			            </Col>
			    </Row>
			    <Row>
			          {userData.map((data,key)=>
			          	<Col key={key}>{data.user_no} / {data.user_name}</Col>
			          )}
			    </Row>
			    </CardBody>
			 </Container>
      </div>
      <FooterWeidong />
    </>
  );
}

export default Profile;
