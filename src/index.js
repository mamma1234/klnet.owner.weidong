/*!

=========================================================
* Paper Kit PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-pro-react
* Copyright 2020 Creative Tim (http://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, {useContext} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
// import "assets/css/paper-kit.min.css";
import "assets/demo/demo.css";
import "assets/demo/react-demo.css";
import "assets/css/selectBox.css";
import 'assets/css/HsCode.css';
import 'assets/css/dashboard.css';
import 'assets/css/snackbar.css'
import 'assets/css/style.css';
import 'assets/css/m.style.css';
import App from "./app.js";

// pages
/*import WeidongIndex from "views/Weidong_Index.js";
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
import Report from "components/Report/Report.js";
import CompSectionSetting from "views/user/CompIndex.js";*/
// others

//import UserStore from "store/UserStore.js";
//import TodoMobx from "store/TodoMobx.js";
//import TodoMobx2 from "store/TodoMobx2.js";

//import GlobalStore from "store/GlobalStore.js";
//import GlobalTodo from "store/GlobalTodo.js";
//import GlobalTodo2 from "store/GlobalTodo2.js";
/*

const NoMatch = (arg) => {
  console.log(arg);
  return (
  <h3>Not Found Page</h3>
  );
}*/

//const store = new UserStore();

// const store = useContext(UserStore);
// console.log("userStore=", userStore);

// const store = new UserStore();

//const trans = {pass:"data"};



// axios.interceptors.request.use(
//   async config => {
//     console.log('axios.interceptors.request');			
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

import {observer} from 'mobx-react-lite';
// import {UserStore} from 'store/UserStore.js';

// const userStore = new UserStore();


ReactDOM.render(<App />,document.getElementById("root"));
// ReactDOM.render(<App userStore={userStore} />,document.getElementById("root"));
