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

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/react-demo.css";
// pages
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
import Error500 from "views/examples/Error500.js";
import LandingPage from "views/examples/LandingPage.js";
import LoginPage from "views/examples/LoginPage.js";
import ProductPage from "views/examples/ProductPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import SearchWithSidebar from "views/examples/SearchWithSidebar.js";
import Settings from "views/examples/Settings.js";
import TwitterRedesign from "views/examples/TwitterRedesign.js";
import Bookings from "views/bookings/bookingReq/index.js";
import Bookings2 from "views/bookings/bookingReq/index2.js";
import Bookings3 from "views/bookings3/index.js";
import BookingList from "views/bookings/bookingList/index.js";
import Dashboard from "views/dashboard/index.js";
import Schedule from "views/schedule/index.js";
import SRNew from "views/sr/request/index.js";
import SRList from "views/sr/srList/index.js";
import FullScreenMain from  "views/fullscreen/index.js"
// others

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/index" render={(props) => <Index {...props} />} />
      <Route
        path="/weidongIndex"
        render={(props) => <WeidongIndex {...props} />}
      />
      <Route
        path="/nucleo-icons"
        render={(props) => <NucleoIcons {...props} />}
      />
      <Route
        path="/fullscreen"
        render={(props) => <FullScreenMain {...props} />}
      />
      <Route
        path="/schedule"
        render={(props) => <Schedule {...props} />}
      />
      <Route
        path="/srlist"
        render={(props) => <SRList {...props} />}
      />
      <Route
        path="/srnew"
        render={(props) => <SRNew {...props} />}
      />
      <Route
        path="/bookinglist"
        render={(props) => <BookingList {...props} />}
      />
      <Route
        path="/dashboard"
        render={(props) => <Dashboard {...props} />}
      />
      <Route
        path="/booking"
        render={(props) => <Bookings {...props} />}
      />
      <Route
        path="/booking2"
        render={(props) => <Bookings2 {...props} />}
      />
      <Route
        path="/booking3"
        render={(props) => <Bookings3 {...props} />}
      />
      <Route path="/sections" render={(props) => <Sections {...props} />} />
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
      />
      <Redirect to="/weidongIndex" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
