
//Need to make an auth object that will login user, logout user, and return whether the user is authenticated

class Auth {
    constructor(props) {
        
        const defaultUser = {
            username: 'Guest',
            email: '',
            id: '0',
        }
        
        this.myUser = {
            username: 'Searock35',
            email: 'searock35@gmail.com',
            id: '46843',
        }
          
        this.currentUser = {...defaultUser}

        this.isAuthenticated=false;
        this.authToken=0;
        this.refreshToken=0;

        this.authStateTrackRequests=[];
    }

    updateStates(newAuthState) {
        this.authStateTrackRequests.forEach((authStateCallback) => authStateCallback(newAuthState));
    }

    login(cb, username, password) {
        //send api username and password to recieve auth token
        if(username==="searock35" && password==="coocie343") {
            console.log("Passed")
            this.isAuthenticated=true;
            this.updateStates(true);
            this.authToken="1234";
            this.refreshToken="1244";
            this.currentUser = {...this.myUser};
            cb();
        } else {
            console.log("failed", username, password);
            this.isAuthenticated=false;
            console.log("Incorrect username and password");
        }
 
    }

    logout(cb) {
        this.isAuthenticated=false;
        this.updateStates(false);
        cb();
    }

    isAuth() {
        return this.isAuthenticated;
    }

    getUser() {
        return this.currentUser;
    }

    addStateManager(cb) {
        this.authStateTrackRequests.push(cb);
    }
}

export default new Auth();