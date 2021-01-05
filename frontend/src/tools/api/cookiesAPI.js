import Cookies from 'universal-cookie';

class cookiesAPI {

    constructor() {
        this.cookies = new Cookies();
    }

    getToken() {

        const authToken = this.cookies.get("authToken");

        if(authToken) {
            return authToken;
        } 
       
        return "0";
    }

    setToken(authToken) {

        const dt = new Date();
        dt.setMinutes(dt.getMinutes() + 60);
        
        this.cookies.set("authToken", authToken, {
            //httpOnly: true,
            expires: dt,
            sameSite: "lax",
        });

    }

    getUserId() {
        const id = this.cookies.get("userId");
        if (id) 
            return id;
        return "0";
    }

    setUserId(id) {
        this.cookies.set("userId", id, {
           sameSite: "lax", 
        })
    }

}



export default new cookiesAPI();