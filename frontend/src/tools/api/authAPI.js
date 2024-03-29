import getDefaultUser from "../getDefaultUser";
import cookiesAPI from "./cookiesAPI";
import axios from "axios";
import restURL from "./restURL";

/**
 * Need to make an auth object that will login user, logout user, and return whether the user is authenticated.
 *  To verify that a user is "logged in", use isAuth().
 *  To verify that a logged in user has a valid token, use checkUser()
 *  To get a default user, use getDefaultUser
 */
class Auth {
    constructor() {
        this.authToken = cookiesAPI.getToken();
        this.userId = cookiesAPI.getUserId();

        // Info about the current user will be held in the API, with just the username in the context.
        this.currentUser = getDefaultUser();
    }

    getDefaultUser() {
        return getDefaultUser();
    }

    isAuth() {
        return this.currentUser.isAuth;
    }

    getAuthHeader() {
        if (this.isAuth()) {
            return { headers: { Authorization: "Token " + this.authToken } }
        } else {
            return {}
        }
    }

    /**
     * Get user information based on cookies that are set in browser.
     * Sets the current user in the auth API to the returned user if success.
     * Returns either the new user or the stable error
     */
    refreshUser() {
        /* try and get new user information based on current token. Returns user if good or response if bad */
        return new Promise((resolve, reject) => {
            if (this.authToken === "0")
                return reject({ status: 401, detail: "No authtoken" });

            axios
                .get(restURL + "/customers/get-with-token/", {
                    headers: {
                        Authorization: "Token " + this.authToken,
                    },
                })
                .then((response) => {
                    let data = {
                        ...response.data,
                        isAuth: true,
                    };
                    this.currentUser = data;
                    return resolve(data);
                })
                .catch((err) => {
                    if (err.response) reject(err.response);
                    else reject({ status: 0 });
                });
        });
    }

    /**
     * Check that current user matches stored authtoken.
     * Returns either the response if successful or the stable error
     */
    checkUser() {
        return new Promise((resolve, reject) => {
            if (this.authToken === "0")
                return reject({
                    response: { status: 401, detail: "No authtoken" },
                });
            axios
                .get(restURL + "/customers/verify-user/" + this.userId, {
                    headers: {
                        Authorization: "Token " + this.authToken,
                    },
                })
                .then((response) => resolve(response))
                .catch((err) => {
                    if (err.response) reject(err.response);
                    else reject({ status: 0 });
                });
        });
    }

    /**
     * Sends the server a request for an API token for a given username and password.
     * Returns the exact server response with a stabilized error (includes data.token, data.user_id, and status)
     * @param {string} username The username to use for login
     * @param {string} password The user's password
     */
    getNewAuthToken(username, password) {
        return new Promise((resolve, reject) => {
            axios
                .post(restURL + "/auth/", {
                    username: username,
                    password: password,
                })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    if (error.response) reject(error.response);
                    else reject({ status: 0 });
                });
        });
    }

    /**
     * Login a user (e.g. get a new authtoken and get all user info)
     * Returns the new user if successful, the stable error if unsuccessful.
     * Also sets token and ID in cookies if successful
     * @param {string} username The username to login with
     * @param {string} password The user's password
     */
    login(username, password) {
        return new Promise((resolve, reject) => {
            this.getNewAuthToken(username, password)
                .then((response) => {
                    this.authToken = response.data.token;
                    this.userId = response.data.user_id;
                    this.refreshUser()
                        .then((user) => {
                            cookiesAPI.setToken(this.authToken);
                            cookiesAPI.setUserId(this.userId);
                            resolve(this.currentUser);
                        })
                        .catch((err) => {
                            this.authToken = "0";
                            this.userId = "0";
                            reject(err);
                        });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * Logout the user, e.g. set token to 0 and reset user info to default user.
     * Returns the default username for context change.
     */
    logout() {
        this.authToken = "0"; // 0 being null authtoken
        this.userId = "0";
        this.user = getDefaultUser();
        cookiesAPI.setToken(this.authToken);
        cookiesAPI.setUserId(this.userId);

        return this.user.username;
    }

    /**
     * Register a user given the appropriate information. Sends the user through a POST to the REST API as is.
     * Returns (promise) the new user on success (to be used for the context), returns a stable error on failure.
     * @param newUser The user info to be posted to the server for registration.
     */
    register(newUser) {
        return new Promise((resolve, reject) => {

            if (!newUser.locality || !newUser.user)
                return reject({ status: 400, detail: "Bad format." });

            axios
                .post(restURL + "/customers/", newUser)
                .then(() => {
                    this.login(newUser.user.username, newUser.user.password)
                        .then(user => {
                            resolve(user)
                        })
                        .catch((err) => reject(err))
                })
                .catch(err => reject(err));
        })
    }
}

export default new Auth();
