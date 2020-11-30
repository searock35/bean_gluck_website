import getDefaultUser from "../getDefaultUser";
import cookiesAPI from "./cookiesAPI";
import axios from "axios";
import restURL from "./restURL";


//Need to make an auth object that will login user, logout user, and return whether the user is authenticated
class Auth {
    constructor() {
        this.authToken = cookiesAPI.getToken();
        this.userId = cookiesAPI.getUserId();
    }

    getDefaultUser() {
        return getDefaultUser()
    }

    refreshUser() {
        /* try and get new user information based on current token) */
        return new Promise((resolve, reject) => {
            if (this.authToken === "0") reject();

            axios.get(restURL + "/get-user-with-token/", {
                headers: {
                    Authorization: "Token " + this.authToken
                }
            })
                .then((response) => {
                    let data = {
                        ...response.data,
                        isAuth: true
                    };
                    resolve(data); 
                })
                .catch(err => {
                    reject(err);
                })

        })


    }

    /* Check that current user matches stored authtoken */
    checkUser() {

        return new Promise((resolve, reject) => {
            axios.get(restURL + "/verify-user/" + this.userId, {
                headers: {
                    Authorization: "Token " + this.authToken
                }
            })
                .then((user) => resolve(user))
                .catch((err) => reject(err))
        })
    }

    getNewAuthToken(username, password) {
        return new Promise((resolve, reject) => {
            axios.post(restURL + "/get-auth-token/", {
                username: username,
                password: password
            })
                .then((response) => {
                    this.authToken = response.data.token;
                    this.userId = response.data.user_id;
                    cookiesAPI.setToken(this.authToken)
                    cookiesAPI.setUserId(this.userId)
                    resolve() 
                })
                .catch((err) => {
                    console.log(err);
                    reject()
                })
        })
    }

    //Login will send new user through the callback function
    login(cb, email, password) {
        this.getNewAuthToken(email, password)
            .then(() => {
                console.log("success!", this.authToken)
                this.refreshUser()
                    .then((user) => {
                        cb(user)
                    })
                    .catch(() => {
                        cb(getDefaultUser())
                    })
            })
            .catch(() => cb(getDefaultUser()))
    }

    //Logs out user, by sending authtoken with proper request for the authtoken and associated user to be unvalidated
    logout(cb) {
        //call to API to change/remove authtoken validation for current user. Simply, send authtoken to API to have it de-registered

        //API Call here: send authtoken, API should return whether it was succesful.
        //THEN
        this.authToken = "0"; //0 being null authtoken
        cookiesAPI.setAuthTokenInCookies(this.authToken);
        
        cb(getDefaultUser);
    }

    register(cb) {
        //call to API to create a new user, with a return to make sure the registration info is valid.
        //in the future, use API to figure out if user is successfully created then return true. Else, return false.
        var didPass = true;

        if(didPass) {
            console.log("registered");
            this.authToken = "01220420";
            cookiesAPI.setAuthTokenInCookies(this.authToken);
            cb(this.testUser);
        } else {
            return didPass;
        }
    }

    //Check to see if user is still authenticated, using server API in the future.
    isAuth() {
        //in future, verify that authToken is valid using userID and authtoken to server API
        if(this.authToken === "01220420") {
            return true;
        } else {
            return false
        }

    }
}

export default new Auth();