
//Need to make an auth object that will login user, logout user, and return whether the user is authenticated

class Auth {
    constructor(props) {

        this.isAuthenticated=false;
        this.authToken=0;
        this.refreshToken=0;
    }

    login(cb, username, password) {
        //send api username and password to recieve auth token
        if(username==="searock35" && password==="coocie343") {
            console.log("Passed")
            this.isAuthenticated=true;
            this.authToken="1234";
            this.refreshToken="1244";
            cb();
        } else {
            console.log("failed", username, password);
            this.isAuthenticated=false;
            console.log("Incorrect username and password");
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