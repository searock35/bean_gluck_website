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
            if (this.authToken === "0") return reject("No authtoken");

            axios.get(restURL + "/customers/get-with-token/", {
                headers: {
                    Authorization: "Token " + this.authToken
                }
            })
                .then((response) => {
                    let data = {
                        ...response.data,
                        isAuth: true
                    };
                    return resolve(data); 
                })
                .catch(err => {
                    this.authToken = "0";
                    return reject(err);
                })

        })


    }

    /* Check that current user matches stored authtoken */
    checkUser() {

        return new Promise((resolve, reject) => {
            axios.get(restURL + "/customers/verify-user/" + this.userId, {
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
            axios.post(restURL + "/auth/", {
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

    //Login will send resulting user through the callback function
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

    // Send new user through callback
    logout(cb) {
        this.authToken = "0"; // 0 being null authtoken
        cookiesAPI.setAuthTokenInCookies(this.authToken);
        
        cb(getDefaultUser);
    }

    // Send new user with callback
    // Info: {user: {username, password, email, first_name, last_name}, school:<pk>, grad_year, locality: {city, state, zip_code}, majors: [<pk>]}
    register(cb, info) {
        axios.post(restURL + '/customers/', info)
            .then((user) => cb(user))
            .catch((err) => cb(err))
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