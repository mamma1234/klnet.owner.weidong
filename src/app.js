import React, {useContext, useEffect,useCallback} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import axios from "axios";
//import { Alert, Container,Fade } from "reactstrap";
import AlertMessage from "components/Alert/AlertMessage.js";
import WeidongIndex from "views/Weidong_Index.js";
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import Sections from "views/Sections.js";
import Presentation from "views/Presentation.js";
import AboutUs from "views/examples/AboutUs.js";
import AddProduct from "views/examples/AddProduct.js";
import BlogPost from "views/examples/BlogPost.js";
import BlogPosts from "views/examples/BlogPosts.js";
import ContactUs from "views/examples/ContactUs.js";
import Discover from "views/examples/Discover.js";
import Ecommerce from "views/examples/Ecommerce.js";
import Error404 from "views/examples/Error404.js";
import Error422 from "views/examples/Error422.js";
import Error500 from "views/errorPage/Error500.js";
import LandingPage from "views/examples/LandingPage.js";
import LoginPage from "views/examples/LoginPage.js";
import ProductPage from "views/examples/ProductPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import SearchWithSidebar from "views/examples/SearchWithSidebar.js";
import Settings from "views/examples/Settings.js";
import BoardMain from "views/board/index"
import TwitterRedesign from "views/examples/TwitterRedesign.js";
// import Bookings from "views/bookings/bookingReq/index.js";
import BookingList from "views/booking/indexList.js";
// weidong booking
import Booking from "views/booking/index.js";
// import Bookings2 from "views/bookings/bookingReq/index2.js";
// import Bookings3 from "views/bookings3/index.js";
import Dashboard from "views/dashboard/index.js";
import Map from "views/Map/MapView.js";
import Schedule from "views/schedule/index.js";
import SRNew from "views/sr/request/index.js";
import SRList from "views/sr/srlist/index.js";
import FullScreenMain from  "views/fullscreen/index.js";
import Confirm from "views/confirm/index.js";
import ConfirmList from "views/confirm/indexList.js";
import Bl from "views/bl/index.js";
import BlList from "views/bl/indexList.js";
import CompSectionSetting from "views/user/CompIndex.js";
import UserSetting from "views/user/UserSettingIndex.js";
import UserMessage from "views/user/UserMessageIndex.js";
import * as valid from 'components/common/validation.js';
import AlertNotiMessage from 'components/Modals/Alert.js';
import Certify from 'components/User/Certify.js';
import PwChange from 'components/User/PwChange.js';
import LoginErrorPage from 'components/User/LoginErrorMenu.js';
import FindId from 'components/User/FindId.js';
import FindPw from 'components/User/FindPw.js';
import Sitemap from 'views/sitemap/weidongSitemap.js';
import Axios from 'axios'
//import {Spinner} from "reactstrap";

import {observer,useObserver} from 'mobx-react-lite';
// import UserTodo from 'store/UserTodo.js';
import { userStore, timerStore } from 'store/UserStore.js';
// const userStore = new UserStore();

const App = (props) => {  
	const [open,setOpen] =  React.useState(false);
	const [isAuth,setIsAuth] =  React.useState(false);
	const [openAlert, setOpenAlert] = React.useState(false);
	const [alertSuccess, setAlertSuccess] = React.useState(true);
	const [status, setStatus] = React.useState("");
	const [message, setMessage] = React.useState("");	 
	const [openNotiMessage, setOpenNotiMessage] = React.useState("");
	const [clickMenu, setClickMenu] = React.useState("");
	const [autoRenew, setAutoRenew] = React.useState(timerStore.autoRenew);

	const setUser =  (data)=>{
		userStore.user =data
	}
	const user =useObserver( ()=>{
		return  userStore.user
	  })
	const isLogOut = useCallback(()=>{
		userStore.logout()
	  },[])

	useEffect(()=> {
		Axios.post('/api/menuAccessLog',{user:user?user.user_no:'GUEST',path:window.location.pathname,name:clickMenu})
	},[window.location.pathname])
	

	React.useEffect(() => {
// const userStore =  new UserStore('1', '2');
		axios.interceptors.response.use(function (response) {
			// console.log('=============>response',response.config.url);
			  return response;
		  }, function (error) {
			// const originalRequest = error.config;
				if(error&&error.response){
					if(error.response.status === 403) {	
						userStore.logout()
						setOpen(false);
						setUser(null);//setIsAuth(false);
						onAlert("error",valid.NOTLOGIN_MSG+" [code:"+error.response.status+"]");
					} else if(error.response.status === 401) {
						userStore.logout()
						setOpen(false);
						setUser(null);
						console.log("error Code:",error.response.status);
					} else if(error.response.status === 419) {
						userStore.logout()
						setOpen(true);
						onAlert("error",valid.TOKEN_EXPIRED_MSG+" [code:"+error.response.status+"]");
					} else if(error.response.status === 500) {
						setOpen(false);
						onAlert("error",valid.ERR_MSG+" [code:"+error.response.status+"]");
					} else if(error.response.status === 400) {
						setOpen(false);
						onAlert("error",valid.ERR_MSG+" [code:"+error.response.status+"]");
					} else {
						setOpen(false);
						onAlert("error",valid.ERR_MSG+" [code:"+error.response.status+"]");
						console.log("error:",error);
					}
				}
				return Promise.reject(error);
			  }
		);		
	},[]);

	const onAlert = (status,meassge)=> {
		setOpenAlert(!openAlert);
		setStatus(status);
		setMessage(meassge);
	}
	   
	const NoMatch = (arg) => {
		console.log(arg);
		return (
			<h3>Not Found Page</h3>
		);
	}
	const onNotiAlert = (status,meassge)=> {
		setOpenNotiMessage(true);
		setStatus(status);
		setMessage(meassge);
		setTimeout( function(){
			setOpenNotiMessage(false);
		}, 2000)
	}
	const fncOpenMessage =(open)=> {
		setOpenNotiMessage(open);
	}

	const fncClickMenu =( menu )=> {
		if( menu ) {
			setClickMenu(menu)
		}
	}
	// const onAutoLogin = ()=>{
	// 	setAutoLogin(!autoLogin); 
	// }	

	// const onTest = () => {
	// 	Axios.post('/api/menuAccessLog',{user:user?user.user_no:'GUEST',path:window.location.pathname,name:clickMenu});
	// }

  	return (
		<>
			<BrowserRouter>
		    	<Switch>
		    		{/*<Route path="/index" render={(props) => <Index user={user} logOut={isLogOut} setUser={(data)=>setUser(data)} validation={valid} onAlert={onAlert} setLogin={open} onNotiAlert={onNotiAlert} {...props} />} />*/}
					<Route
						exact path="/"
						render={(props) => <WeidongIndex userStore={userStore} user={user} logOut={isLogOut} setUser={setUser} validation={valid} onAlert={onAlert} setLogin={open} fncClickMenu={fncClickMenu} onNotiAlert={onNotiAlert}  
						autoRenew= {autoRenew} setAutoRenew={setAutoRenew}   {...props} />}
					/> 
				{/* <Route path="/UserTodo" render={(props) => <UserTodo userStore={userStore} user={user} logOut={isLogOut} setUser={setUser} validation={valid} onAlert={onAlert} setLogin={open} onNotiAlert={onNotiAlert} fncClickMenu={fncClickMenu} clickMenu={clickMenu} setAutoLogin={setAutoLogin}    autoLogin= {autoLogin} {...props} />} />  */}

				<Route
		        exact path="/weidongIndex"
		        render={(props) => <WeidongIndex  userStore={userStore} user={user} logOut={isLogOut} setUser={setUser} validation={valid} onAlert={onAlert} setLogin={open} onNotiAlert={onNotiAlert} fncClickMenu={fncClickMenu} clickMenu={clickMenu}
				autoRenew= {autoRenew} setAutoRenew={setAutoRenew}    {...props} />}
		      />
		      <Route
		        path="/schedule"
		        render={(props) => <Schedule userStore={userStore} user={user} logOut={isLogOut} setUser={setUser} validation={valid} onAlert={onAlert} setLogin={open} onNotiAlert={onNotiAlert} fncClickMenu={fncClickMenu} clickMenu={clickMenu} setAutoRenew={setAutoRenew}    autoRenew= {autoRenew} {...props} />}
		      />
		      <Route
		        path="/srlist"
		        render={(props) => <SRList user={user} logOut={isLogOut} setUser={setUser} validation={valid} onAlert={onAlert} setLogin={open} onNotiAlert={onNotiAlert} fncClickMenu={fncClickMenu} clickMenu={clickMenu} setAutoRenew={setAutoRenew}    autoRenew= {autoRenew} {...props} />}
		      />
		      <Route
		        path="/srnew"
		        render={(props) => <SRNew user={user} logOut={isLogOut} setUser={setUser} validation={valid} onAlert={onAlert} setLogin={open} onNotiAlert={onNotiAlert} fncClickMenu={fncClickMenu} clickMenu={clickMenu} setAutoRenew={setAutoRenew}    autoRenew= {autoRenew} {...props} />}
		      />
		     <Route
		        path="/vslocation"
		        render={(props) => <Map user={user} logOut={isLogOut} setUser={setUser} validation={valid} onAlert={onAlert} setLogin={open} onNotiAlert={onNotiAlert} fncClickMenu={fncClickMenu} clickMenu={clickMenu} setAutoRenew={setAutoRenew}    autoRenew= {autoRenew} {...props}/>}
		      />

		   
		   <Route
		        path="/dashboard"
		        render={(props) => <Dashboard user={user} logOut={isLogOut} setUser={setUser} validation={valid} onAlert={onAlert} setLogin={open} onNotiAlert={onNotiAlert} fncClickMenu={fncClickMenu} clickMenu={clickMenu} setAutoRenew={setAutoRenew}    autoRenew= {autoRenew} {...props} />}
		      />
		      <Route
		        path="/booking"
		        render={(props) => <Booking user={user} logOut={isLogOut} setUser={setUser} validation={valid} onAlert={onAlert} setLogin={open} onNotiAlert={onNotiAlert} fncClickMenu={fncClickMenu} clickMenu={clickMenu} setAutoRenew={setAutoRenew}    autoRenew= {autoRenew} {...props} />}
		      />
		      {/* <Route
		        path="/booking2"
		        render={(props) => <Bookings2 {...props} />}
		      /> 
		      {/* <Route
		        path="/booking3"
		        render={(props) => <Bookings3 {...props} />}
		      /> */}
		      <Route
		        path="/bookinglist"
		        render={(props) => <BookingList user={user} logOut={isLogOut} setUser={setUser} validation={valid} onAlert={onAlert} setLogin={open} onNotiAlert={onNotiAlert} fncClickMenu={fncClickMenu} clickMenu={clickMenu} setAutoRenew={setAutoRenew}    autoRenew= {autoRenew} {...props} />}
		      />

		        {/* <Route path="/sections" render={(props) => <Sections {...props} />} />
		      <Route
		        path="/presentation"
		        render={(props) => <Presentation {...props} />}
		      />
		      <Route path="/about-us" render={(props) => <AboutUs {...props} />} />
		      <Route
		        path="/add-product"
		        render={(props) => <AddProduct {...props} />}
		      />
		      <Route path="/blog-post" render={(props) => <BlogPost {...props} />} />
		      <Route path="/blog-posts" render={(props) => <BlogPosts {...props} />} />
		      <Route path="/contact-us" render={(props) => <ContactUs {...props} />} />
		      <Route path="/discover" render={(props) => <Discover {...props} />} />
		      <Route path="/e-commerce" render={(props) => <Ecommerce {...props} />} />
		      <Route path="/error-404" render={(props) => <Error404 {...props} />} />
		      <Route path="/error-422" render={(props) => <Error422 {...props} />} />
		      <Route path="/error-500" render={(props) => <Error500 {...props} />} />
		      <Route
		        path="/landing-page"
		        render={(props) => <LandingPage {...props} />}
		      />
		      <Route path="/login-page" render={(props) => <LoginPage {...props} />} />
		      <Route
		        path="/product-page"
		        render={(props) => <ProductPage {...props} />}
		      />
		      <Route
		        path="/profile-page"
		        render={(props) => <ProfilePage {...props} />}
		      />
		      <Route
		        path="/register-page"
		        render={(props) => <RegisterPage {...props} />}
		      />
		      <Route
		        path="/search-with-sidebar"
		        render={(props) => <SearchWithSidebar {...props} />}
		      />
		      <Route path="/settings" render={(props) => <Settings {...props} />} />
		      <Route
		        path="/twitter-redesign"
		        render={(props) => <TwitterRedesign {...props} />}
		      />*/}
		      <Route
		        path="/confirm"
		        render={(props) => <Confirm user={user} logOut={isLogOut} setUser={setUser} validation={valid} onAlert={onAlert}  setLogin={open} onNotiAlert={onNotiAlert} fncClickMenu={fncClickMenu} clickMenu={clickMenu} setAutoRenew={setAutoRenew}    autoRenew= {autoRenew} {...props} />}
		      />      
		      <Route
		        path="/confirmlist"
		        render={(props) => <ConfirmList user={user} logOut={isLogOut} setUser={setUser} validation={valid} onAlert={onAlert}  setLogin={open} onNotiAlert={onNotiAlert} fncClickMenu={fncClickMenu} clickMenu={clickMenu} setAutoRenew={setAutoRenew}    autoRenew= {autoRenew} {...props} />}
		      />   

		      <Route
		        path="/bl"
		        render={(props) => <Bl user={user} logOut={isLogOut} setUser={setUser} validation={valid} onAlert={onAlert}  setLogin={open} onNotiAlert={onNotiAlert} fncClickMenu={fncClickMenu} clickMenu={clickMenu} setAutoRenew={setAutoRenew}    autoRenew= {autoRenew} {...props} />}
		      />
		      <Route
		        path="/bllist"
		        render={(props) => <BlList user={user} logOut={isLogOut} setUser={setUser} validation={valid} onAlert={onAlert} setLogin={open} onNotiAlert={onNotiAlert} fncClickMenu={fncClickMenu} clickMenu={clickMenu} setAutoRenew={setAutoRenew}    autoRenew= {autoRenew} {...props} />}
		      />
			  <Route path="/usersetting"
		        render={(props) => <UserSetting user={user} logOut={isLogOut} setUser={setUser} validation={valid} onAlert={onAlert} setLogin={open} onNotiAlert={onNotiAlert} fncClickMenu={fncClickMenu} clickMenu={clickMenu} setAutoRenew={setAutoRenew}    autoRenew= {autoRenew} {...props}/>}
		      />
		      <Route path="/usermessage"
		        render={(props) => <UserMessage user={user} logOut={isLogOut} setUser={setUser} validation={valid} onAlert={onAlert} setLogin={open} onNotiAlert={onNotiAlert} fncClickMenu={fncClickMenu} clickMenu={clickMenu} setAutoRenew={setAutoRenew}    autoRenew= {autoRenew} {...props}/>}
		      />
		      <Route path="/setting"
		        render={(props) => <CompSectionSetting user={user} logOut={isLogOut} setUser={setUser} validation={valid} onAlert={onAlert} setLogin={open} onNotiAlert={onNotiAlert} fncClickMenu={fncClickMenu} clickMenu={clickMenu} setAutoRenew={setAutoRenew}    autoRenew= {autoRenew} {...props}/>}
		      />
			  <Route path="/notice"
		        render={(props) => <BoardMain user={user} logOut={isLogOut} setUser={setUser} validation={valid} onAlert={onAlert} setLogin={open} onNotiAlert={onNotiAlert} fncClickMenu={fncClickMenu} clickMenu={clickMenu} setAutoRenew={setAutoRenew}    autoRenew= {autoRenew} {...props}/>}
		      />
			  <Route path="/return_certify" 
			  	render={(props) => <Certify {...props}/>}/>
		  	  <Route path="/password" 
			  	render={(props) => <PwChange user={user} logOut={isLogOut} setUser={setUser} validation={valid} onAlert={onAlert} setLogin={open} onNotiAlert={onNotiAlert} fncClickMenu={fncClickMenu} clickMenu={clickMenu} setAutoRenew={setAutoRenew}    autoRenew= {autoRenew} {...props}/>}/>
			  <Route path="/account" 
			  	render={(props) => <LoginErrorPage validation={valid} onAlert={onAlert} onNotiAlert={onNotiAlert} fncClickMenu={fncClickMenu} clickMenu={clickMenu} {...props}/>}/>
			  <Route path="/findid" 	
			  	render={(props) => <FindId validation={valid} onAlert={onAlert} onNotiAlert={onNotiAlert} fncClickMenu={fncClickMenu} clickMenu={clickMenu} {...props}/>}/>
			  <Route path="/findpw" 	
			  	render={(props) => <FindPw validation={valid} onAlert={onAlert} onNotiAlert={onNotiAlert} fncClickMenu={fncClickMenu} clickMenu={clickMenu} {...props}/>}/>
				<Route
		        exact path="/sitemap"
		        render={(props) => <Sitemap user={user} logOut={isLogOut} setUser={setUser} validation={valid} onAlert={onAlert} setLogin={open} onNotiAlert={onNotiAlert} fncClickMenu={fncClickMenu} clickMenu={clickMenu} {...props} />}
		      />
			  <Route path="*" component={NoMatch} />
			  <Redirect from="/" to="/weidongIndex" />
		    </Switch>
		      
		  </BrowserRouter>

		  <AlertNotiMessage 
			open={openNotiMessage}
			close={()=>setOpenNotiMessage(!openNotiMessage)}
			status ={status ==="success"?status:"danger"}
			message = {message}
			fncOpenMessage={fncOpenMessage} 
			/> 

		
		  <AlertMessage 
	        message={message}
	        isOpen={openAlert}
	        isClose={()=>setOpenAlert(!openAlert)}
	        // fontColor={font}   //선택사항
	        alertColor={status ==="success"?status:"danger"} //선택사항  //primary, secondary, success, danger, warning, info, light, dark
	        timeOut={2000} //선택사항
	        >
		  </AlertMessage>
		
		</>
  )
}


export default observer(App);