import getDefaultUser from "../common/getDefaultUser";
import getTokenFromCookies from "./getTokenFromCookies";
import Cookies from 'universal-cookie';


//**********************TODO: ADD SERVER API IMPLEMENTATION */
//Need to make an auth object that will login user, logout user, and return whether the user is authenticated
class Auth {
    constructor(props) {
        //TEMPORARY. Currently used in place of an API to test if the user's key is correct

        this.authToken = 0;
        this.refreshToken = getTokenFromCookies;

        //placeholder returned user. In the future, will scrape user info from database using username and password
        this.testUser = {
            username: 'searock35',
            email: 'searock35@gmail.com',
            userId: '7174190584',
            schoolId: '01220420',
            schoolName: 'Messiah University',
            isAuth: true
        }
    }

    //Store the authtoken in user cookies
    storeAuthTokenInCookies() {

        const cookies = new Cookies();

        cookies.set('authToken', this.authToken, {
        httpOnly: true,
        path: '/',
        //MUST SET EXPIRATION
    });
    }

    //Make server request for user information. If the server denies, return default user information.
    refreshUser(cb) {

        //TEMP FUNCTION
        if (this.authToken === "01220420") {
            //for now, return custom user
            cb(this.testUser);
        
        } else {
            cb(getDefaultUser());
        }

        
        
    }

    getNewAuthToken() {
        //send server refreshToken to gather new authtoken.
        if(this.refreshToken === "1562") {
            this.authToken="01220420";
        }

        this.storeAuthTokenInCookies();
    }

    //Login will send new user through the callback function
    login(cb, username, password) {
        //send api username and password to recieve auth token
        if(username==="searock35" && password==="coocie343") {
            console.log("Passed")

            //An authtoken and refreshtoken have been generated for current user.
            this.authToken="01220420";
            this.refreshToken="1562";

            //TODO: Return actual user
            cb(this.customUser);

        } else {
            this.isAuthenticated=false;
            console.log("Incorrect username and password");
            return(getDefaultUser())
        }
 
    }

    //Logs out user, by sending authtoken with proper request for the authtoken and associated user to be unvalidated
    logout(cb) {
        //call to API to change/remove authtoken validation for current user. Simply, send authtoken to API to have it de-registered

        //API Call here: send authtoken, API should return whether it was succesful.
        //THEN
        this.authToken = "0"; //0 being null authtoken
        cb();
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