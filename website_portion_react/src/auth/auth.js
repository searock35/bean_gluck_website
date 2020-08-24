import getDefaultUser from "../common/getDefaultUser";

//Need to make an auth object that will login user, logout user, and return whether the user is authenticated
class Auth {
    constructor(props) {
        this.isAuthenticated=false;
        this.authToken=0;
        this.refreshToken=0;

        //placeholder returned user. In the future, will scrape user info from database using username and password
        this.customUser = {
            username: 'searock35',
            email: 'searock35@gmail.com',
            userId: '7174190584',
            schoolId: '01220420',
            schoolName: 'Messiah University',
            isAuth: true
        }
    }

    refreshUser(cb, authToken) {
        //make server request for user information. If the server denies, do not update user information.
        
    }
    getNewAuthToken(cb, refreshToken) {
        //send server refreshToken to gather new authtoken.
        this.authToken="1234"
    }

    login(cb, username, password) {
        //send api username and password to recieve auth token
        if(username==="searock35" && password==="coocie343") {
            console.log("Passed")
            this.isAuthenticated=true;

            //An authtoken and refreshtoken have been generated for current user.
            this.authToken="1234";
            this.refreshToken="2345";

            cb();


            return(this.customUser);

        } else {
            this.isAuthenticated=false;
            console.log("Incorrect username and password");
            return(getDefaultUser())
        }
 
    }

    logout(cb) {
        this.isAuthenticated=false;
        cb();
    }

    isAuth() {
        return this.isAuthenticated;
    }
}

export default new Auth();