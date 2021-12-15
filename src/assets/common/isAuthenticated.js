import React from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const onSetHeader = (token) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


export const login = async (data) => {
	let vVal;
    await axios.post("/auth/login", {id : data.id, pw : data.password})
	  .then(res => {
		  const {token,user} = res.data;
		  onSetHeader(token);
		  vVal= user;
	  }).catch(err => {
		  onSetHeader('');
		  vVal = null;
	      console.log(err); 
	  });
	return vVal;
}

export const logOut = async (data) => {
let vVal;
	await axios.post("/auth/weidongout")
	  .then(res => {
		  const {token,user} = res.data;
		  onSetHeader(token);
		  vVal= user;
	  }).catch(err => {
		  onSetHeader('');
		  vVal = null;
	      console.log(err); 
	  });
return vVal;
}


export const reflesh = async () => {
	let vVal;
	await axios.get("/auth/refresh").then(res => {
		  const {token,user} = res.data;
		  onSetHeader(token); console.log(">>>>>re",user);
		  vVal= user;
	   })
    .catch(err => {
    	 onSetHeader('');
    	 vVal= '';
  	  console.log(err);
  	  });
	return vVal;
}