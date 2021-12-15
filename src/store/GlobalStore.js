 import {createContext} from 'react'
// import {decorate, observable, computed} from "mobx"
//import {makeObservable, observable, computed, action} from "mobx"
import {makeAutoObservable, observable, computed, action, autorun} from "mobx"

class GlobalStore {
    token = null;
    username = null;
    user = null;

    // constructor(token, username) {
    //     makeAutoObservable(this, {
    //         token: observable,
    //         name: computed,
    //         clear: action
    //     })
    //     this.token = token;
    //     this.username = username;       
    // }

    constructor() {
        makeAutoObservable(this, {
            token: observable,
            username: observable,
            user: observable,
            getusername: computed,
            setting: action,
            logout: action,
        })

        autorun(()=>{
            console.log("autorun", this);
            this.username=this.user && this.user.username  ?  this.user.username || null : null;

            // console.log("WeidongNavbar effect", store)
        });
    }

    get getusername() {
         return this.username;
    }

    logout() {
        this.token=null;
        this.username=null;
        this.user=null;

    }

    setting(token, user) {
        this.token=token;
        this.user=user;
    }
}
      
// const userStore =  new UserStore('1', '2');

export default GlobalStore;