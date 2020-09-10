import Cookies from 'universal-cookie';



class cookiesAPI {

    constructor() {
        this.cookies = new Cookies();
    }

    //PARAMS:
    //inputs:
    //outputs: -> the authtoken/refresh token stored in the cookies
    getAuthTokenInCookies() {

        const authToken = this.cookies.get("authToken");

        if(authToken) {
            return authToken;
        }

        //for testing purposes, return a fake authtoken
        return "0";
    }

    setAuthTokenInCookies(authToken) {

        console.log("setting authtoken to: ", authToken);

        const dt = new Date();

        dt.setMinutes(dt.getMinutes() + 60);
        
        this.cookies.set("authToken", authToken, {
            //httpOnly: true,
            expires: dt
        });

    }

}



export default new cookiesAPI();