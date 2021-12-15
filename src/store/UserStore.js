import {makeAutoObservable, observable, computed, action, autorun,configure} from "mobx"
import axios from 'axios'
configure({enforceActions:'never'});

let timer;
function countdown(e) {
    let expTime = e.exp;
    // console.log(expTime)
    let currentTime = Math.floor(Date.now() / 1000)
    let leftTime = expTime - currentTime - 60;
    if (timerStore.autoRenew && leftTime < 1) {
        // console.log('verifyUserCall', leftTime)
        userStore.verifyUser()
        clearInterval(timer);
    } else if (leftTime < 1) {        
        // console.log('leftTime ')
        userStore.logout();
        clearInterval(timer);
          return
    }
    let hours = Math.floor(leftTime / 3600 % 24)
    let minutes = Math.floor(leftTime / 60 % 60)
    let seconds = Math.floor(leftTime % 60)
    if (expTime) {
        timerStore.hoursSpan = (hours < 10? hours < 1? '00': `0${hours}`: hours)
        timerStore.minutesSpan = (minutes < 10? minutes < 1? '00': `0${minutes}`: minutes)
        timerStore.secondsSpan = (seconds < 10? seconds < 1? '00': `0${seconds}`: seconds)
    }
    timerStore.timer = ` ${timerStore.hoursSpan}:${timerStore.minutesSpan}:${timerStore.secondsSpan} `
}



class UserStore {
    // accesstoken = window.localStorage.getItem('accesstoken') || null;
    // username = null;
    user = JSON.parse(window.localStorage.getItem('LocalUser')) || null;
    admin= window.localStorage.getItem('admin')?JSON.parse(window.localStorage.getItem('admin')) :false
    constructor() {
        makeAutoObservable(this, {
            // accesstoken: observable,
            user: observable,
            admin:observable,
            sessionIn:action,
            sessionOut:action,
            setting: action,
            logout: action,
            verifyUser:action,
            getUser:computed,
            // getToken:computed,
        },{autoBind:true})
    }

    logout() {
        if(!userStore.admin){
        axios
            .post("/auth/logout")
            .then(res => {
                userStore.user = null;
                window.localStorage.clear();
                clearInterval(timer);
            })
            .catch(err => {
                console.log(err);
            });
        }else{
            userStore.sessionOut()
        }
    }
    setting(token, user) {
        // this.accesstoken = token;
        this.user = user;
    }
    verifyUser() {
        axios
            .get("/auth/verify")
            .then(res => {
                if (res.data) {
                    // console.log('verify>>', res.data)
                    userStore.user = res.data.user;
                    window.localStorage.setItem('LocalUser', JSON.stringify(res.data.user));
                    timerStore.getTimer(userStore.getUser)
                } else {
                    // console.log('logout>>')
                    userStore.logout()
                }
            })
            .catch(err => {
                console.log(err);
            });

    }
    sessionIn(){
        userStore.admin= userStore.user
        window.localStorage.setItem('admin',window.localStorage.getItem('LocalUser'))
    }
    sessionOut(){
        console.log('out')
        axios
            .post("/auth/logout",{sessionOut:'admin'})
            .then(res => {
                userStore.user = userStore.admin;
                userStore.admin=false;
                window.localStorage.clear();
                clearInterval(timer);
                window.location.href = "/";
            })
            .catch(err => {
                console.log(err);
            });
    }
    get getUser() {
        return this.user
    }
    set setUser(user) {
        this.user = user;
        // console.log('>>setUser',user)
        window.localStorage.setItem('LocalUser', JSON.stringify(this.user));
    }

    // set setToken(token) {
    //     this.accesstoken = token;
    //     window.localStorage.setItem('accesstoken', this.accesstoken);
    // }
    // get getToken() {
    //     return this.accesstoken;
    // }
}


class TimerStore {
    user = userStore.getUser
    hoursSpan= '00'
    minutesSpan= '00'
    secondsSpan= '00'
    autoRenew= JSON.parse(window.localStorage.getItem('autoRenew')) || true
    timer= ' 00:00:00 '

    constructor() {
        makeAutoObservable(this, {
            user: observable,
            hoursSpan: observable,
            minutesSpan: observable,
            secondsSpan: observable,
            autoRenew: observable,
            timer:observable,
            getTimer:action,
            getAutoRenew:computed
        })
    }

    get getAutoRenew() {
        return this.autoRenew;
    }
    set setAutoRenew(e) {
        //    console.log('setAutoLogin',e )
        window.localStorage.setItem('autoRenew', JSON.stringify(e))
        this.autoRenew = e
    }
    getTimer(e){
        // console.log(e)
        if (e) {
            timer = setInterval(action(countdown), 1000, e)
        } else {
            clearInterval(timer);
        }
    }
}

const userStore =  new UserStore();
const timerStore =  new TimerStore();
autorun(async() => {
    // console.log('userStore.verifyUser')
     userStore.verifyUser()
})

// export default UserStore;
export {userStore, timerStore};
// export default createContext(new UserStore());